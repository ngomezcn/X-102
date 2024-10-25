import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define la forma del contexto
interface HeadingContextType {

    setHeadingAppName: (name: string) => void;
    setIconVisibility: (visible: boolean) => void;
    setHeaderVisibility: (visible: boolean) => void;
    setLeftArrowVisibility: (visible: boolean) => void;

    heading: string;
    isIconVisible: boolean;
    isHeaderVisible: boolean;
    isLeftArrowVisible: boolean;
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
    const [heading, setHeading] = useState<string>("Smart Gate");
    const [isIconVisible, setIconVisible] = useState<boolean>(true);
    const [isHeaderVisible, setHeaderVisible] = useState<boolean>(true);
    const [isLeftArrowVisible, setLeftArrowVisible] = useState<boolean>(true);



    const setHeadingAppName = (name: string) => {
        setHeading(name);
    };

    const setIconVisibility = (visible: boolean) => {
        setIconVisible(visible);
    };

    const setHeaderVisibility = (visible: boolean) => {
        setHeaderVisible(visible);
    };

    const setLeftArrowVisibility = (visible: boolean) => {
        setLeftArrowVisible(visible);
    };

    return (
        <HeadingContext.Provider
            value={{
                setHeadingAppName,
                setIconVisibility,
                setHeaderVisibility,
                setLeftArrowVisibility,
                heading,
                isIconVisible,
                isHeaderVisible,
                isLeftArrowVisible,
            }}
        >
            {children}
        </HeadingContext.Provider>
    );
};
