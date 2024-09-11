import React, { ReactNode, createContext, useContext, useState } from 'react';

// Define the type for the context value
interface IdContextType {
  docId: string | null;
  setId: (id: string | null) => void;
}

// Create the context with the proper type
const IdContext = createContext<IdContextType | undefined>(undefined);

// Hook to access the context
export const useId = () => {
  const context = useContext(IdContext);
  if (!context) {
    throw new Error('useId must be used within an IdProvider');
  }
  return context;
};

// Define the type for the children prop
interface IdProviderProps {
  children: ReactNode;
}

// Provider component to wrap the app
export const IdProvider: React.FC<IdProviderProps> = ({ children }) => {
  const [docId, setId] = useState<string | null>(null);

  return (
    <IdContext.Provider value={{ docId, setId }}>
      {children}
    </IdContext.Provider>
  );
};
