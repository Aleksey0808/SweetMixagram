import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useFonts } from '../utils/FontContext';

const Header = ({ coins, timer, onPause, title, icon }) => {
  const { fontsLoaded } = useFonts();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPause} style={styles.pauseButton}>
        {icon ? <Image source={require('../../assets/images/header/back.png')} style={styles.iconImage} />
        :
        <Image source={require('../../assets/images/header/pause.png')} style={styles.iconImage} />
        }
      </TouchableOpacity>

      {icon ? 
      <View style={styles.centerContainer}>
        <Text style={[styles.title, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>{title}</Text>
      </View>
      :
      <>
        <View style={styles.coinContainer}>
          <Image source={require('../../assets/images/header/bgCoin.png')} style={styles.bgCoin} />
          <Image source={require('../../assets/images/header/coin.png')} style={styles.coinImage} />
          <Text style={styles.coins}>{coins}</Text>
        </View>
      
      <View style={styles.timerContainer}>
        <Image source={require('../../assets/images/header/time.png')} style={styles.timeImage} />
        <Text style={styles.timer}>00:{timer}</Text>
      </View>
    </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#AC4DC9CC',
    width: '100%',
    height: 70,
    paddingTop: 10,
    paddingHorizontal: 20,
    marginTop: 60,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  title: {
    // textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  pauseButton: {
    padding: 10,
  },
  iconImage: {
    resizeMode: 'contain',
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bgCoin: {
    resizeMode: 'contain',
  },
  coinImage: {
    position: 'absolute',
    left: 0,
    resizeMode: 'contain',
  },
  coins: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    left: 40,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  timeImage: {
    resizeMode: 'contain',
  },
  timer: {
    position: 'absolute',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Header;
