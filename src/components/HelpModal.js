import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from '../utils/FontContext';
import { useSound } from '../utils/SoundProvider';

const HelpModal = ({ visible, onPlay, title }) => {
  const { isSoundOn, playClickSound } = useSound();
  const { fontsLoaded } = useFonts();

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.overlay}>
        <ImageBackground
          source={require('../../assets/images/modal/bgModal.png')}
          style={styles.bgContainer}
          imageStyle={styles.bgImage}
        >
          <View style={styles.modalContent}>
            <Text style={[styles.buttonText, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>
                {title}
            </Text>
            <TouchableOpacity 
            style={styles.mainButton} 
            onPress={() => {
              onPlay()
              isSoundOn && playClickSound()
            }
            }>
              <Image source={require('../../assets/images/modal/ok.png')} style={styles.buttonImage} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default HelpModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#2A2A2A99',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgContainer: {
    width: 350,
    height: 360,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  modalContent: {
    width: 250,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButton: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  buttonImage: {
    resizeMode: 'contain',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 32, 
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 60, 
  },
});

