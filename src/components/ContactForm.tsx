import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const STORAGE_KEY = 'borderline-contact-form-data';
const STORAGE_VERSION = '1.0';

interface StoredFormData extends FormData {
  version: string;
  savedAt: string;
}

const saveToLocalStorage = (data: FormData) => {
  if (typeof window === 'undefined') return;
  
  try {
    const dataToStore: StoredFormData = {
      ...data,
      version: STORAGE_VERSION,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
  } catch (error) {
    console.warn('Failed to save form data to localStorage:', error);
  }
};

const loadFromLocalStorage = (): Partial<FormData> | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const parsedData: StoredFormData = JSON.parse(stored);
    
    if (parsedData.version !== STORAGE_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    
    const savedDate = new Date(parsedData.savedAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    if (savedDate < thirtyDaysAgo) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    
    // Return only form data (exclude metadata)
    const { version, savedAt, ...formData } = parsedData;
    return formData;
  } catch (error) {
    console.warn('Failed to load form data from localStorage:', error);
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

const clearLocalStorage = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};


const ContactForm: React.FC = () => {
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDataRestored, setIsDataRestored] = useState(false);

  // Debounced save function using ref
  const debouncedSave = useCallback((data: FormData) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      saveToLocalStorage(data);
    }, 1000);
  }, []);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      setFormData(prevData => ({
        ...prevData,
        ...savedData
      }));
      setIsDataRestored(true);
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);


  // Save form data to localStorage when it changes
  useEffect(() => {
    if (isDataRestored || Object.values(formData).some(value => value !== '' && value !== false)) {
      debouncedSave(formData);
    }
  }, [formData, debouncedSave, isDataRestored]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleClearSavedData = () => {
    clearLocalStorage();
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setIsDataRestored(false);
  };

  const handleSubmit = async () => {
    // Prevent double submission
    console.log('Handle submit called');
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    console.log('Submitting form data:', formData);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value as string);
      });

      console.log('Submitting form data:', formData);

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json',
        }
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const result = await response.json();
      console.log('Response data:', result);

      if (response.ok && result.success) {
        setSubmitStatus('success');
        
        // Clear form data after successful submission
        const clearedData = {
          name: '',
          email: '',
          message: ''
        };
        
        setFormData(clearedData);
        clearLocalStorage();
        
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Error sending message. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Connection error. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
    
    return false;
  };

  return (
    <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      {isDataRestored && (
        <div className="mb-6">
          <button
            type="button"
            onClick={handleClearSavedData}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 underline decoration-gray-400 underline-offset-4 hover:decoration-gray-600"
            title="Clear saved data"
          >
            Clear saved data
          </button>
        </div>
      )}
      
      {submitStatus === 'success' && (
        <div className="mb-12 pb-6 border-b border-gray-300">
          <p className="text-[19px] leading-[1.65] text-[#1a1a1a] font-serif mb-2">Message sent successfully.</p>
          <p className="text-[19px] leading-[1.65] text-gray-600 font-serif">We'll get back to you within 48 hours.</p>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-12 pb-6 border-b border-gray-300">
          <p className="text-[19px] leading-[1.65] text-[#1a1a1a] font-serif mb-2">Error sending message.</p>
          <p className="text-[19px] leading-[1.65] text-gray-600 font-serif">{errorMessage}</p>
        </div>
      )}
      
      <div className="space-y-12">
        <div className="space-y-12">
          <div>
            <label htmlFor="name" className="block text-[19px] font-normal text-[#1a1a1a] mb-4 font-serif">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-[#1a1a1a] transition-colors duration-200 placeholder-gray-400 disabled:bg-transparent disabled:cursor-not-allowed font-serif text-[19px] leading-[1.65] bg-transparent focus:outline-none"
              placeholder="Your full name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-[19px] font-normal text-[#1a1a1a] mb-4 font-serif">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-[#1a1a1a] transition-colors duration-200 placeholder-gray-400 disabled:bg-transparent disabled:cursor-not-allowed font-serif text-[19px] leading-[1.65] bg-transparent focus:outline-none"
              placeholder="your@email.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-[19px] font-normal text-[#1a1a1a] mb-4 font-serif">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey && !isSubmitting) {
                handleSubmit();
              }
            }}
            disabled={isSubmitting}
            className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-[#1a1a1a] transition-colors duration-200 placeholder-gray-400 resize-none disabled:bg-transparent disabled:cursor-not-allowed font-serif text-[19px] leading-[1.65] bg-transparent focus:outline-none"
            placeholder="Write your message here..."
          />
        </div>
        
        <div className="pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={cn(
              "text-[19px] font-normal py-2 px-4 rounded border-b bg-neutral-800 text-white border-[#1a1a1a] transition-colors duration-200 disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed font-serif",
              !isSubmitting && "hover:border-gray-600"
            )}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;