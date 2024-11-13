import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from '../utils/FontContext';

const PopupModal = ({ visible, onPlay, modalType }) => {
  const { fontsLoaded } = useFonts();
  const navigation = useNavigation();

  let imageTitle, buttonText, onPressAction;

  if (modalType === 'paused') {
    imageTitle = require('../../assets/images/modal/pause.png');
    buttonText = 'Continue';
    onPressAction = onPlay;
  } else if (modalType === 'win') {
    imageTitle = require('../../assets/images/modal/win.png');
    buttonText = 'Restart';
    onPressAction = onPlay;
  } else if (modalType === 'timeout') {
    imageTitle = require('../../assets/images/modal/time.png');
    buttonText = 'Get time';
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
            {/* Изображение, которое меняется в зависимости от modalType */}
            <Image source={imageTitle} style={styles.imageTitle} />
            
            {/* Кнопка с текстом и действием, которое меняется в зависимости от modalType */}
            <TouchableOpacity style={styles.mainButton} onPress={onPressAction}>
              <Image source={require('../../assets/images/modal/button.png')} style={styles.buttonImage} />
              <Text style={[styles.buttonText, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>
                {buttonText}
              </Text>
            </TouchableOpacity>

            <View style={styles.bottomButtonsContainer}>
              {/* Кнопки для перехода в домашнюю страницу и настройки */}
              <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Home")}>
                <Image source={require('../../assets/images/modal/home.png')} style={styles.iconImage} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Settings")}>
                <Image source={require('../../assets/images/modal/setting.png')} style={styles.iconImage} />
              </TouchableOpacity>
            </View>
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
    top: -10,
    resizeMode: 'contain',
  },
  mainButton: {
    position: 'absolute',
    top: 130,
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
