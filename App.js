import React, { useEffect, useState } from 'react';
import { View, Modal, Image, TouchableOpacity, Text, StyleSheet, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigations/AppNavigator';
import { CoinsProvider } from './src/utils/CoinsProvider';
import { TimerProvider } from './src/utils/TimerContext';
import { FontProvider } from './src/utils/FontContext';
import { SoundProvider } from './src/utils/SoundProvider';

export default function App() {
    return (
      <TimerProvider>
      <CoinsProvider>
        <FontProvider>
          <SoundProvider>
         <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        </SoundProvider>
        </FontProvider>
      </CoinsProvider>
      </TimerProvider>
    );
  }