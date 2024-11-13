import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useSound } from './path/to/SoundProvider';

const ButtonWithSound = ({ onPress, title }) => {
  const { playClickSound } = useSound();

  return (
    <TouchableOpacity
      onPress={() => {
        playClickSound();
        onPress(); 
      }}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonWithSound;
