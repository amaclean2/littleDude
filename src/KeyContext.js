import { createContext, useContext, useState } from "react";

const KeyContext = createContext();

export const useKeyContext = () => {
    const context = useContext(KeyContext);

    if (context === undefined) {
        throw new Error('useKeyContext must be used within a KeyProvider');
    }
    return useContext(KeyContext);
};

export const KeyProvider = ({ children }) => {
    const keyStateMap = {
        forward: false,
        left: false,
        backward: false,
        right: false,
        space: false,
        shift: false
    };

    const updateKeyStateMap = ({ direction, value}) => {
        keyStateMap[direction] = value;
    };

    return (
        <KeyContext.Provider
            value={{
                keyStateMap,
                updateKeyStateMap
            }}
        >
            {children}
        </KeyContext.Provider>
    );
};