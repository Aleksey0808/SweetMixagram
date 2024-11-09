import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ coins, timer, onPause }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPause} style={styles.pauseButton}>
        <Text style={styles.buttonText}>Pause</Text>
      </TouchableOpacity>
      <Text style={styles.coins}>{coins} 🪙</Text>
      <Text style={styles.timer}>{timer}s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  pauseButton: {
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  coins: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 16,
    color: 'red',
  },
});

export default Header;
