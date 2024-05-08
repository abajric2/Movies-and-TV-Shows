import { Dispatch, SetStateAction } from 'react';

export interface AppContextValue {
  activeTab: ActiveTab;
  setActiveTab: Dispatch<SetStateAction<ActiveTab>>;
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
}

export interface AppContextProviderProps {
  children: React.ReactNode;
}

export type ActiveTab = 'movies' | 'tvShows';
