"use client";
import React from "react";

import { createContext, useContext, useState } from "react";

// Create Context object.
interface FilterContextProps {
  categories: string[];
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}
export const FilterContext = createContext<FilterContextProps | undefined>(
  undefined,
);

const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<string[]>(["All"]);
  const categories = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];
  return (
    <FilterContext.Provider value={{ categories, filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
export default FilterProvider;

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
