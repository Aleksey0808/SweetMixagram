import React, { useEffect } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { useFonts } from '../utils/FontContext';
import { useSound } from '../utils/SoundProvider';

const HomeScreen = ({ navigation }) => {
  const { isSoundOn, playClickSound } = useSound();
  const { fontsLoaded } = useFonts();

  return (
       <ImageBackground
        source={require('../../assets/images/bg/bg.jpg')}
        style={styles.bgContainer}
      >
        <View style={styles.container}>
          <TouchableOpacity 
          style={styles.wrapperSetting} 
          onPress={() => {
            navigation.navigate("Settings")
            isSoundOn && playClickSound()
          }
          }>
            <Image source={require('../../assets/images/elements/setting.png')} style={styles.imgButton} />
          </TouchableOpacity>
          <View style={styles.buttonsContainer}>
          <TouchableOpacity 
          style={styles.wrapperButton} 
          onPress={() => {
            navigation.navigate("Level")
            isSoundOn && playClickSound()
          }
          }>
            <Image source={require('../../assets/images/elements/button.png')} style={styles.imgButton} />
              <Text style={[styles.textButton, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.wrapperButton} 
          onPress={() => {
            navigation.navigate("About")
            isSoundOn && playClickSound()
          }
          }>
            <Image source={require('../../assets/images/elements/button.png')} style={styles.imgButton} />
              <Text style={[styles.textButton, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.wrapperButton} 
          onPress={() => {
            navigation.navigate("Game")
            isSoundOn && playClickSound()
          }
          }>
            <Image source={require('../../assets/images/elements/button.png')} style={styles.imgButton} />
              <Text style={[styles.textButton, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>Bonus</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperSetting: {
    position: 'absolute',
    top: 70,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperButton: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgButton: {
    resizeMode: 'contain',
  },
  textButton: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  }
});

export default HomeScreen;
