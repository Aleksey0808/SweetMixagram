import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CoinsContext = createContext();

export const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState(0);
  const [hints, setHints] = useState(3);

  useEffect(() => {
    const loadCoinsAndHints = async () => {
      const storedCoins = await AsyncStorage.getItem('coins');
      if (storedCoins !== null) {
        setCoins(Number(storedCoins));
      }
      const storedHints = await AsyncStorage.getItem('hints');
      if (storedHints !== null) {
        setHints(Number(storedHints));
      }
    };
    loadCoinsAndHints();
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

  const addHint = async () => {
    setHints((prev) => {
      const newTotal = prev + 1;
      AsyncStorage.setItem('hints', newTotal.toString());
      return newTotal;
    });
  };

  const useHint = async () => {
    setHints((prev) => {
      const newTotal = Math.max(0, prev - 1);
      AsyncStorage.setItem('hints', newTotal.toString());
      return newTotal;
    });
  };

  return (
    <CoinsContext.Provider value={{ coins, addCoins, removeCoins, hints, addHint, useHint }}>
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = () => useContext(CoinsContext);
