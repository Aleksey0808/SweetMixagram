import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Header from '../components/Header';
import { useFonts } from '../utils/FontContext';
import { useSound } from '../utils/SoundProvider';

const SettingsScreen = ({ navigation }) => {
  const { fontsLoaded } = useFonts();
  const { isMusicOn, setIsMusicOn, isSoundOn, setIsSoundOn, playClickSound } = useSound(); 

  const handleTermsPress = () => {
    Linking.openURL('https://racketstep.click/aviacloud-terms');
    isSoundOn && playClickSound()
  };

  const handlePrivacyPress = () => {
    Linking.openURL('https://racketstep.click/alviacloud-policy');
    isSoundOn && playClickSound()
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg/levelBg.jpg')}
      style={styles.bgContainer}
    >
      <Header title={'Settings'} icon={true} onPause={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.boardContainer}>
          <Image source={require('../../assets/images/setting/board.png')} style={styles.board} />

          <View style={styles.settingsOverlay}>
            <View style={styles.settingItem}>
              <Text style={[styles.settingText, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>Music</Text>
              <TouchableOpacity onPress={() => {
                setIsMusicOn(!isMusicOn)
                isSoundOn && playClickSound()

              }
                }>
                <Image 
                  source={isMusicOn 
                    ? require('../../assets/images/setting/on.png') 
                    : require('../../assets/images/setting/of.png')
                  } 
                  style={styles.settingIcon} 
                />
              </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
              <Text style={[styles.settingText, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>Sound</Text>
              <TouchableOpacity onPress={() => {
                setIsSoundOn(!isSoundOn)
                isSoundOn && playClickSound();
              }
                }>
                <Image 
                  source={isSoundOn 
                    ? require('../../assets/images/setting/on.png') 
                    : require('../../assets/images/setting/of.png')
                  } 
                  style={styles.settingIcon} 
                />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={handleTermsPress} style={styles.button}>
                <Image source={require('../../assets/images/elements/button.png')} style={styles.buttonImg} />
                <Text style={[styles.buttonText, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>Terms of Use</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handlePrivacyPress} style={styles.button}>
                <Image source={require('../../assets/images/elements/button.png')} style={styles.buttonImg} />
                <Text style={[styles.buttonText, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    marginTop: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  boardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    resizeMode: 'contain',
  },
  settingsOverlay: {
    position: 'absolute',
    top: 50, 
    alignItems: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    gap: 20,
  },
  settingText: {
    fontSize: 37,
    fontWeight: 'bold',
    color: '#fff',
  },
  settingIcon: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  buttonsContainer: {
    marginTop: 20, 
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonImg: {
    resizeMode: 'contain',
  },
  buttonText: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
