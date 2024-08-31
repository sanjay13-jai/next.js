import { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context
interface SearchContextType {
    searchData: any;
    setSearchData: (data: any) => void;
}

// Create the context with an empty default value
export const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Create a provider component
export const SearchWrapper = ({ children }: { children: ReactNode }) => {
    const [searchData, setSearchData] = useState<any>(null);

    return (
        <SearchContext.Provider value={{ searchData, setSearchData }}>
            {children}
        </SearchContext.Provider>
    );
};

// Custom hook to use the SearchContext
export function useSearchContext() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearchContext must be used within a SearchWrapper");
    }
    return context;
}

export default SearchContext;
