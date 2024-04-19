"use client"

import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    //const [isFetch, setIsFetch] = useState(false);
    const [loading, setLoading] = useState(true);
    
    return (
        <GlobalContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);
