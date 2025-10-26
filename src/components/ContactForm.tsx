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
    <div className="bg-white rounded-2xl p-8">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Send a Message</h3>
        {isDataRestored && (
          <button
            onClick={handleClearSavedData}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors duration-200 flex items-center space-x-1"
            title="Clear saved data"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            <span>Clear data</span>
          </button>
        )}
      </div>
      
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p className="text-green-800 font-medium">Message sent successfully!</p>
            </div>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="text-green-600 hover:text-green-800 transition-colors"
              title="Close message"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <p className="text-green-700 text-sm mt-1">We'll get back to you within 48 hours.</p>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-red-800 font-medium">Error sending message</p>
            </div>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="text-red-600 hover:text-red-800 transition-colors"
              title="Close message"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
        </div>
      )}
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Your full name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="your@email.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
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
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Write your message here... (Ctrl+Enter to send)"
          />
        </div>
        
        <div className="pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={cn(
              "w-full font-semibold py-3 px-6 rounded-xl transition-all duration-200 ",
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            )}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </div>
            ) : (
              'Send Message'
            )}
          </button>
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500">
            * Required fields. Your message will be answered within 48 hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;