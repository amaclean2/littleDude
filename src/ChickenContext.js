import { createContext, useContext, useState } from "react";

const ChickenContext = createContext();

export const useChickenContext = () => {
    const context = useContext(ChickenContext);

    if (context === undefined) {
        throw new Error('useChickenContext must be used within a ChickenProvider');
    }
    return useContext(ChickenContext);
};

export const ChickenProvider = ({ children }) => {
    let originalChicken = null;

    const setOriginalChicken = (chickenGroup) => {
        originalChicken = chickenGroup;
    }

    return (
        <ChickenContext.Provider
            value={{
                originalChicken,
                setOriginalChicken
            }}
        >
            {children}
        </ChickenContext.Provider>
    );
};