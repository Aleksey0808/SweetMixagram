import React, { useEffect } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { useFonts } from '../utils/FontContext';
import { useCoins } from '../utils/CoinsProvider';
import { useSound } from '../utils/SoundProvider';

const LevelScreen = ({ navigation }) => {
  const { isSoundOn, playClickSound } = useSound();
  const { fontsLoaded } = useFonts();
  const { coins } = useCoins();
  return (
       <ImageBackground
        source={require('../../assets/images/bg/levelBg.jpg')}
        style={styles.bgContainer}
      >
          <Header title={'Select difficulty'} icon={true} onPause={() => navigation.goBack()} />
        <View style={styles.container}>
          <View style={styles.buttonsContainer}>
          <TouchableOpacity 
          style={styles.wrapperButton}
           onPress={() => {
            navigation.navigate("Game", { level: 'easy' })
            isSoundOn && playClickSound()
           }
          }
           >
            <Image source={require('../../assets/images/elements/easy.png')} style={styles.imgButton} />
              <Text style={[styles.textButton, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.wrapperButton} 
          onPress={() => {
            isSoundOn && playClickSound()
            navigation.navigate("Game", { level: 'normal' })
          }
            }
          disabled={coins <= 100}
          >
            {coins >= 100 ? 
              <Image source={require('../../assets/images/elements/normal.png')} style={styles.imgButton} />
              :
              <>
              <Image source={require('../../assets/images/elements/disable.png')} style={styles.imgButton} />
              <Image source={require('../../assets/images/elements/coin.png')} style={styles.levelCoin} />
              </>
            }
              <Text style={[styles.textButton, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.wrapperButton} 
          onPress={() => {
            isSoundOn && playClickSound()
            navigation.navigate("Game", { level: 'hard' })
          }
          }
          disabled={coins <= 200}
          >
          {coins >= 100 ? 
              <Image source={require('../../assets/images/elements/hard.png')} style={styles.imgButton} />
              :
              <>
              <Image source={require('../../assets/images/elements/disable.png')} style={styles.imgButton} />
              <Image source={require('../../assets/images/elements/coin200.png')} style={styles.levelCoin} />
              </>
            }
              <Text style={[styles.textButton, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>Hard</Text>
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

export default LevelScreen;
