import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppRoutes } from '@/constants/AppRoutes';

interface HeaderSettings {
    heading: string;
    isIconVisible: boolean;
    isHeaderVisible: boolean;
    isLeftArrowVisible: boolean;
    goBackRoute: string | null; 
}

interface HeadingContextType {
    setHeaderSettings: (headerSettings: HeaderSettings) => void;
    heading: string;
    isIconVisible: boolean;
    isHeaderVisible: boolean;
    isLeftArrowVisible: boolean;
    goBackRoute: string | null; 
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

    const [heading, setHeading] = useState<string>("Gate Link");
    const [isIconVisible, setIconVisible] = useState<boolean>(true);
    const [isHeaderVisible, setHeaderVisible] = useState<boolean>(true);
    const [isLeftArrowVisible, setLeftArrowVisible] = useState<boolean>(true);
    const [goBackRoute, setGoBackRoute] = useState<string | null>(AppRoutes.Access);

    const setHeaderSettings = (headerSettings: HeaderSettings) => {
        setHeading(headerSettings.heading);
        setIconVisible(headerSettings.isIconVisible);
        setHeaderVisible(headerSettings.isHeaderVisible);
        setLeftArrowVisible(headerSettings.isLeftArrowVisible);
        setGoBackRoute(headerSettings.goBackRoute);
    };

    return (
        <HeadingContext.Provider
            value={{
                setHeaderSettings,
                heading,
                isIconVisible,
                isHeaderVisible,
                isLeftArrowVisible,
                goBackRoute,
            }}
        >
            {children}
        </HeadingContext.Provider>
    );
};
