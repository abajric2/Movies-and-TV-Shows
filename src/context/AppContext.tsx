import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppContextValue, AppContextProviderProps, ActiveTab } from '../types/AppContextTypes';

export const AppContext = createContext<AppContextValue>({
  activeTab: 'tvShows',
  setActiveTab: () => {},
  searchInput: '',
  setSearchInput: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    const storedActiveTab = sessionStorage.getItem('activeTab');
    return storedActiveTab ? (storedActiveTab as ActiveTab) : 'tvShows';
  });
  const [searchInput, setSearchInput] = useState<string>(() => {
    const storedSearchInput = sessionStorage.getItem('searchInput');
    return storedSearchInput || '';
  });

  useEffect(() => {
    sessionStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    sessionStorage.setItem('searchInput', searchInput);
  }, [searchInput]);

  return (
    <AppContext.Provider value={{ activeTab, setActiveTab, searchInput, setSearchInput }}>
      {children}
    </AppContext.Provider>
  );
};
