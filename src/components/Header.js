import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useFonts } from '../utils/FontContext';
import { useSound } from '../utils/SoundProvider';

const Header = ({ coins, timer, onPause, title, icon, showBackButton }) => {
  const { isSoundOn, playClickSound } = useSound();
  const { fontsLoaded } = useFonts();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => {
        onPause();
        isSoundOn && playClickSound();
      }} style={styles.pauseButton}>
        {showBackButton ? 
          <Image source={require('../../assets/images/header/back.png')} style={styles.iconImage} /> 
          : icon ? 
          <Image source={require('../../assets/images/header/back.png')} style={styles.iconImage} />
          :
          <Image source={require('../../assets/images/header/pause.png')} style={styles.iconImage} />
        }
      </TouchableOpacity>

      {showBackButton ? (
        <View style={styles.centerContainer}>
          <Image source={require('../../assets/images/header/time.png')} style={styles.timeImage} />
          <Text style={[styles.timer, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>{title}</Text>
        </View>
      ) : (
        icon ? 
          <View style={styles.centerContainer}>
            <Text style={[styles.title, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>{title}</Text>
          </View>
        : 
          <>
            <View style={styles.coinContainer}>
              <Image source={require('../../assets/images/header/bgCoin.png')} style={styles.bgCoin} />
              <Image source={require('../../assets/images/header/coin.png')} style={styles.coinImage} />
              <Text style={[styles.coins, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>{coins}</Text>
            </View>
          
            <View style={styles.timerContainer}>
              <Image source={require('../../assets/images/header/time.png')} style={styles.timeImage} />
              <Text style={[styles.timer, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>{timer}</Text>
            </View>
          </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    backgroundColor: '#AC4DC9CC',
    width: '100%',
    height: 70,
    paddingTop: 10,
    paddingHorizontal: 20,
    marginTop: 60,
  },
  centerContainer: {
    flexDirection: 'row', 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  title: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  pauseButton: {
    position: 'absolute',
    left: 10,
    padding: 10,
    zIndex: 2000,
  },
  iconImage: {
    resizeMode: 'contain',
  },
  coinContainer: {
    position: 'absolute',
    left: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'relative',
  },
  bgCoin: {
    resizeMode: 'contain',
  },
  coinImage: {
    position: 'absolute',
    top: -10,
    left: -20,
    resizeMode: 'contain',
  },
  coins: {
    position: 'absolute',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    left: 40,
  },
  timerContainer: {
    position: 'absolute',
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeImage: {
    resizeMode: 'contain',
  },
  timer: {
    position: 'absolute',
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Header;
