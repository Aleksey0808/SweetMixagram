import React, { useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, StyleSheet, } from 'react-native';
import { useFonts } from '../utils/FontContext';
import { useSound } from '../utils/SoundProvider';

const WelcomeScreen = ({ navigation }) => {
  const { isSoundOn, playClickSound } = useSound();
  const { fontsLoaded } = useFonts();

  return (
       <ImageBackground
       source={require('../../assets/images/bg/welcomeBg.jpg')}
        style={styles.bgContainer}
      >
        <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../../assets/images/elements/hello.png')} style={styles.image} />
        </View>
        <View style={styles.bgText}>
          <Text style={[styles.text, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>
            Welcome to your daily word puzzle that will improve your vocabulary skills. 
          </Text>
        </View>
          <Image source={require('../../assets/images/elements/girl.png')} style={styles.girlImage} />
          <TouchableOpacity 
          style={styles.wrapperButton} 
          onPress={() => {
            navigation.navigate("Rules")
            isSoundOn && playClickSound()
          }
          }>
            <Image source={require('../../assets/images/elements/helpButton.png')} style={styles.imgButton} />
            <Text style={[styles.textButton, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>Start</Text>
          </TouchableOpacity>
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
  image: {
    position: 'absolute',
    top: 100,
    resizeMode: 'contain',
  },
  bgText: {
    position: 'absolute',
    top: 300,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // height: 120,
    backgroundColor: '#AC4DC9CC',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 400,
    color: '#FFFFFF',
    zIndex: 1000,
    padding: 40,
  },
  girlImage: {
    position: 'absolute',
    bottom: 0,
    left: 0, 
    resizeMode: 'contain',
  },
  wrapperButton: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgButton: {
    resizeMode: 'contain',
  },
  textButton: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default WelcomeScreen;
