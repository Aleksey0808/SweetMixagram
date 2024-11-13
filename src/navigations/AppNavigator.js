import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PreviewScreen from '../screens/PreviewScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RulesScreen from '../screens/RulesScreen';
import LevelScreen from '../screens/LevelScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Preview" component={PreviewScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Rules" component={RulesScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="Level" component={LevelScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;