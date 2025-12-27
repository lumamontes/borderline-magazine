import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TabsProps {
  defaultTab?: string;
  children: React.ReactNode;
  className?: string;
}

interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabPanelsProps {
  children: React.ReactNode;
  className?: string;
}

interface TabPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
}>({
  activeTab: '',
  setActiveTab: () => {},
});

export const Tabs: React.FC<TabsProps> = ({ defaultTab = '', children, className }) => {
  // Check URL hash on mount to support deep linking
  const getInitialTab = () => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1); // Remove the #
      if (hash === 'contact') return 'contact';
      if (hash === 'about' || hash === '') return defaultTab || 'about';
    }
    return defaultTab || 'about';
  };

  const [activeTab, setActiveTab] = useState(() => getInitialTab());

  // Update tab when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'contact') {
        setActiveTab('contact');
      } else if (hash === 'about' || hash === '') {
        setActiveTab('about');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL hash when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (typeof window !== 'undefined') {
      const newHash = value === 'contact' ? '#contact' : '#about';
      window.history.replaceState(null, '', `${window.location.pathname}${newHash}`);
    }
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabList: React.FC<TabListProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex border-b border-gray-200 mb-6',
        className
      )}
      role="tablist"
    >
      {children}
    </div>
  );
};

export const Tab: React.FC<TabProps> = ({ value, children, className }) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isSelected = activeTab === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      data-selected={isSelected}
      onClick={() => setActiveTab(value)}
      className={cn(
        'px-6 py-3 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px',
        isSelected
          ? 'border-gray-900 text-gray-900'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        className
      )}
    >
      {children}
    </button>
  );
};

export const TabPanels: React.FC<TabPanelsProps> = ({ children, className }) => {
  return <div className={cn('w-full', className)}>{children}</div>;
};

export const TabPanel: React.FC<TabPanelProps> = ({ value, children, className }) => {
  const { activeTab } = React.useContext(TabsContext);

  if (activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      className={cn('w-full', className)}
    >
      {children}
    </div>
  );
};

