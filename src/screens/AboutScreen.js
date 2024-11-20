import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Header from '../components/Header';
import { useFonts } from '../utils/FontContext';

const AboutScreen = ({ navigation }) => {
  const { fontsLoaded } = useFonts();

  return (
    <ImageBackground
      source={require('../../assets/images/bg/levelBg.jpg')}
      style={styles.bgContainer}
    >
      <Header title={'Settings'} icon={true} onPause={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.boardContainer}>
          <Image source={require('../../assets/images/about/board.png')} style={styles.board} />
          <View style={styles.textWrapper}>
              <Text style={[styles.text, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>
                Each round begins with a fresh set of letters. Use these letters 
                to form words by tapping them 
                in sequence. If you’re ever stuck, give the letters a quick shuffle 
                to inspire new ideas!
                Complete all the words to move 
                to the next level. The faster 
                you solve each puzzle, the higher your score will climb.
                Ready to put your vocabulary to the test? Let’s get started!
            </Text>
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
  textWrapper: {
    position: 'absolute',
    width: 280, 
    paddingHorizontal: 10,
    top: 30, 
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 400,
    color: '#fff',
    lineHeight: 30,
  },
});

export default AboutScreen;
