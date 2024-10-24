import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define la forma del contexto
interface HeadingContextType {
    heading: string;
    setHeadingAppName: (name: string) => void;
    toggleIconVisibility: () => void;
    hiddenIcon: boolean;
    isHeaderVisible: boolean;
    hideHeader: () => void;
    showHeader: () => void;
}

// Crea el contexto
const HeadingContext = createContext<HeadingContextType | undefined>(undefined);

// Hook para usar el contexto
export const useHeading = (): HeadingContextType => {
    const context = useContext(HeadingContext);
    if (!context) {
        throw new Error("useHeading debe usarse dentro de un HeadingProvider");
    }
    return context;
};

// Proveedor del contexto
export const HeadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [heading, setHeading] = useState<string>("Acceso");
    const [hiddenIcon, setHiddenIcon] = useState<boolean>(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true); // Estado para controlar la visibilidad del encabezado

    const setHeadingAppName = (name: string) => {
        setHeading(name);
    };

    const toggleIconVisibility = () => {
        setHiddenIcon((prev) => !prev);
    };

    const hideHeader = () => {
        setIsHeaderVisible(false);
    };

    const showHeader = () => {
        setIsHeaderVisible(true);
    };

    return (
        <HeadingContext.Provider
            value={{ heading, setHeadingAppName, toggleIconVisibility, hiddenIcon, isHeaderVisible, hideHeader, showHeader }}
        >
            {children}
        </HeadingContext.Provider>
    );
};
