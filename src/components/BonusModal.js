import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from '../utils/FontContext';
import { useSound } from '../utils/SoundProvider';

const PopupModal = ({ visible, onPlay, modalType }) => {
  const { isSoundOn, playClickSound } = useSound();
  const { fontsLoaded } = useFonts();
  const navigation = useNavigation();

  let textImage, onPressAction;

  if (modalType === 'hint') {
    textImage = require('../../assets/images/modal/hint.png');
    onPressAction = onPlay;
  } else if (modalType === 'time') {
    textImage = require('../../assets/images/modal/timeWin.png');
    onPressAction = onPlay;
  } else if (modalType === 'lose') {
    textImage = require('../../assets/images/modal/tryAgain.png');
    onPressAction = onPlay;
  }

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.overlay}>
        <ImageBackground
          source={require('../../assets/images/modal/bgModal.png')}
          style={styles.bgContainer}
          imageStyle={styles.bgImage}
        >
          <View style={styles.modalContent}>
            {modalType === 'lose' ? 
            <Image source={ require('../../assets/images/modal/bomb.png')} style={styles.imageBomb} />
          :
          <Image source={ require('../../assets/images/modal/win.png')} style={styles.imageTitle} />
          }
            <Image source={textImage} style={styles.textImage} />
            <TouchableOpacity 
            style={styles.mainButton} 
            onPress={() => {
              onPressAction()
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

export default PopupModal;

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
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  imageTitle: {
    position: 'absolute',
    top: -15,
    resizeMode: 'contain',
  },
  imageBomb: {
    position: 'absolute',
    top: -150,
    resizeMode: 'contain',
  },
  textImage: {
    position: 'absolute',
    top: 80,
    resizeMode: 'contain',
  },
  mainButton: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
  buttonImage: {
    resizeMode: 'contain',
  },
  buttonText: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    top: 15,
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 100,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    resizeMode: 'contain',
  },
});
