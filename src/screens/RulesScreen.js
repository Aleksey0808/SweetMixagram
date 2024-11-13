import React, { useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, StyleSheet, } from 'react-native';
import { useFonts } from '../utils/FontContext';

const RulesScreen = ({ navigation }) => {
  const { fontsLoaded } = useFonts();

  return (
       <ImageBackground
       source={require('../../assets/images/bg/rulesBg.jpg')}
        style={styles.bgContainer}
      >
        <View style={styles.container}>
        <View style={styles.bgTextTop}>
          <Text style={[styles.text, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>
          Each round begins with a fresh set of letters. Use these letters to form words by tapping them in sequence. If you’re ever stuck, give the letters a quick shuffle to inspire new ideas! 
          </Text>
        </View>
        <View style={styles.bgText}>
          <Text style={[styles.text, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>
          Complete all the words to move to the next level. The faster you solve each puzzle, the higher your score will climb.
          </Text>
        </View>
        <TouchableOpacity style={styles.wrapperBack} onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/images/elements/helpButton.png')} style={styles.imgButton} />
            <Text style={[styles.textButton, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.wrapperButton} onPress={() => navigation.navigate("Home")}>
            <Image source={require('../../assets/images/elements/helpButton.png')} style={styles.imgButton} />
            <Text style={[styles.textButton, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>Next</Text>
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
  bgTextTop: {
    position: 'absolute',
    top: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // height: 120,
    backgroundColor: '#AC4DC9CC',
  },
  bgText: {
    position: 'absolute',
    bottom: 200,
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
  wrapperButton: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperButton: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperBack: {
    position: 'absolute',
    bottom: 50,
    left: 30,
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

export default RulesScreen;
