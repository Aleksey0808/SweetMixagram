import React, { useEffect } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, Animated, Easing } from 'react-native';

const PreviewScreen = ({ navigation }) => {

  return (
       <ImageBackground
       source={require('../../assets/images/bg/bg.jpg')}
        style={styles.bgContainer}
      >
        <View style={styles.container}>
         <Text>PreviewScreen</Text>
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
});

export default PreviewScreen;
