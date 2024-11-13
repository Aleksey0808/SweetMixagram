import React, { useEffect } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { useFonts } from '../utils/FontContext';

const SettingsScreen = ({ navigation }) => {
  const { fontsLoaded } = useFonts();

  return (
       <ImageBackground
        source={require('../../assets/images/bg/levelBg.jpg')}
        style={styles.bgContainer}
      >
          <Header title={'Settings'}  icon={true} onPause={() => navigation.goBack()} />
        <View style={styles.container}>
          
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
  wrapperButton: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgButton: {
    width: 180,
    height: 65,
    resizeMode: 'contain',
  },
  textButton: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  levelCoin: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1000,
  },
});

export default SettingsScreen;
