import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Popup = ({ onPlayBonus }) => {
  return (
    <View style={styles.popup}>
      <Text style={styles.title}>Time's up!</Text>
      <TouchableOpacity onPress={onPlayBonus} style={styles.button}>
        <Text>Play Bonus Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
});

export default Popup;
