import React, { useEffect, useState } from 'react';
import { View, Modal, Image, TouchableOpacity, Text, StyleSheet, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigations/AppNavigator';
import { CoinsProvider } from './src/utils/CoinsProvider';
import { FontProvider } from './src/utils/FontContext';

export default function App() {
    return (
      <CoinsProvider>
        <FontProvider>
         <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        </FontProvider>
      </CoinsProvider>
    );
  }