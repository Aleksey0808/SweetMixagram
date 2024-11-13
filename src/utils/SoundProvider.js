import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [music, setMusic] = useState(null);
  const [isMusicOn, setIsMusicOn] = useState(true); 
  const [isSoundOn, setIsSoundOn] = useState(true); 

  const playMusic = async () => {
    if (music) return;  
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/background-music.mp3'),
      { isLooping: true }
    );
    setMusic(sound);
    if (isMusicOn) {
      await sound.playAsync();
    }
  };

  const stopMusic = async () => {
    if (music) {
      await music.stopAsync();
      await music.unloadAsync();
      setMusic(null);
    }
  };

  const playClickSound = async () => {
    if (!isSoundOn) return; 

    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/click-sound.wav')
    );
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate(status => {
      if (status.didJustFinish) {
        sound.unloadAsync(); 
      }
    });
  };

  useEffect(() => {
    if (isMusicOn) {
      playMusic();
    } else {
      stopMusic();
    }

    return () => {
      if (music) music.unloadAsync();
    };
  }, [isMusicOn]);

  return (
    <SoundContext.Provider value={{ playMusic, stopMusic, playClickSound, isMusicOn, setIsMusicOn, isSoundOn, setIsSoundOn }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
