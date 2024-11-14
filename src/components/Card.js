import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSound } from '../utils/SoundProvider';

const Card = ({ isFlipped, fruitImage, onPress }) => {
  const { isSoundOn, playClickSound } = useSound();
  return (
    <TouchableOpacity style={styles.card} onPress={() => {
      isSoundOn && playClickSound()
      onPress()
    }
      
      }>
      <Image
        source={isFlipped ? fruitImage : require('../../assets/images/bonus/non.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 69,
    height: 69,
  },
  image: {
    width: 69,
    height: 69,
    resizeMode: 'contain',
  },
});

export default Card;
