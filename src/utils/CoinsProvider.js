import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CoinsContext = createContext();

export const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const loadCoins = async () => {
      const storedCoins = await AsyncStorage.getItem('coins');
      if (storedCoins !== null) {
        setCoins(Number(storedCoins));
      }
    };
    loadCoins();
  }, []);

  const addCoins = async (amount) => {
    setCoins((prev) => {
      const newTotal = prev + amount;
      AsyncStorage.setItem('coins', newTotal.toString());
      return newTotal;
    });
  };

  const removeCoins = async (amount) => {
    setCoins((prev) => {
      const newTotal = Math.max(0, prev - amount);
      AsyncStorage.setItem('coins', newTotal.toString());
      return newTotal;
    });
  };

  return (
    <CoinsContext.Provider value={{ coins, addCoins, removeCoins }}>
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = () => useContext(CoinsContext);
