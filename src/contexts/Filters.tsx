'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type ChildrenType = {
  children: React.ReactNode;
};

type FiltersType = {
  filters: {
    category: string;
    sort: string;
    search: string;
    searchType: { title: boolean; desc: boolean };
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      category: string;
      sort: string;
      search: string;
      searchType: { title: boolean; desc: boolean };
    }>
  >;
};

const initialValue = {
  category: 'all categories',
  sort: 'earliest',
  search: '',
  searchType: { title: true, desc: false },
};

const initialState = {
  filters: initialValue,
  setFilters: () => {},
};

const FiltersContext = createContext<FiltersType>(initialState);

export default function FiltersProvider({ children }: ChildrenType) {
  const [filters, setFilters] = useState(initialValue);

  useEffect(() => {
    const savedValue = localStorage.getItem('filters');
    if (savedValue) setFilters(JSON.parse(savedValue));
  }, []);

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>{children}</FiltersContext.Provider>
  );
}

export const useFiltersContext = () => useContext(FiltersContext);
