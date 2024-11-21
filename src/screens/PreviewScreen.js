import React, { useEffect } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, Animated, useWindowDimensions } from 'react-native';
import { useFonts } from '../utils/FontContext';
import * as Updates from "expo-updates";


const PreviewScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;
  const { fontsLoaded } = useFonts();
  const dotsOpacity = new Animated.Value(0);

  async function updatetext() {
    const res = await Updates.checkForUpdateAsync();
    if (res.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  }

  useEffect(() => {
    updatetext();
  }, [])

  const startDotsAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotsOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(dotsOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startDotsAnimation();

    const timer = setTimeout(() => {
      navigation.navigate('Welcome');
    }, 6000);

    return () => clearTimeout(timer); 
  }, []);

  return (
       <ImageBackground
       source={require('../../assets/images/bg/previewBg.jpg')}
        style={styles.bgContainer}
      >
        
        <View style={styles.container}>
        <Text style={[styles.loadingText, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>
            Loading
          </Text>
          
          <Animated.Text style={[styles.dotsText, { opacity: dotsOpacity }]}>
            ...
          </Animated.Text>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../../assets/images/elements/girl1.png')} style={styles.girlImage} />
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
  loadingText: {
    position: 'absolute',
    bottom: '10%',
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    zIndex: 1000,
  },
  dotsText: {
    position: 'absolute',
    bottom: '11%',
    left: '65%', 
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    zIndex: 1000,
  },
  girlImage: {
    position: 'absolute',
    bottom: 0,
    // left: '65%', 
    resizeMode: 'contain',
  },
});

export default PreviewScreen;
