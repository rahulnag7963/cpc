import React, {createContext, useContext, useEffect, useState} from 'react';


const getInfo = createContext();


const GetCryptoInfo = ({children}) => {
    const [currentMoney, newMoney] = useState("CAD");
    const [Symbol, newSymbol] = useState("$")
    
    useEffect(() => {
    if(currentMoney === "CAD" || currentMoney === "USD") {newSymbol("$");}
    else if(currentMoney === "EUR") {newSymbol("€");}
    else if(currentMoney === "JPY"){newSymbol("¥");}
    }, [currentMoney]);
    
    return (
    <getInfo.Provider value = {{currentMoney, newMoney, Symbol}}>
        {children}
    </getInfo.Provider>
    )
}
//rafce
//
export default GetCryptoInfo;

export const InfoState = () => {
    return useContext(getInfo);
};


