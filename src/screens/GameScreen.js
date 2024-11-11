import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import wordsData from '../helpers/wordsData';

const GameScreen = () => {
  const [timer, setTimer] = useState(60);
  const [coins, setCoins] = useState(0);
  const [guessedWords, setGuessedWords] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState('');
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [paused, setPaused] = useState(false);
 
  const currentWordData = wordsData.easy[currentWordIndex]

  useEffect(() => {
    let interval;
    if (!paused && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [paused, timer]);

  useEffect(() => {
    if (currentWordIndex === 2 && currentWordData.words.length === guessedWords.length) {
      return  Alert.alert('YOU WIN!');
    }
    setShuffledLetters(shuffleWord(currentWordData.word));
    if (currentWordData.words.length === guessedWords.length) {
      setCurrentWordIndex(currentWordIndex + 1)
      setGuessedWords([])
    }
  }, [guessedWords]);

  const shuffleWord = (word) => {
    return word.split('').sort(() => Math.random() - 0.5);
  };

  const clean = () => {
    setSelectedLetters('')
  }

  const handleLetterPress = (letter) => {
    const newSelectedLetters = selectedLetters + letter;
    setSelectedLetters(newSelectedLetters);

    if (newSelectedLetters.length === currentWordData.words[0].length) {
      handleGuess(newSelectedLetters);
    }
  };

  const handleGuess = (newSelectedLetters) => {
    const normalizedWords = currentWordData.words.map(word => word.toLowerCase());
    console.log('guessedWords', guessedWords.includes(newSelectedLetters))

    if (normalizedWords.includes(newSelectedLetters) && !guessedWords.includes(newSelectedLetters)) {
      setGuessedWords([...guessedWords, newSelectedLetters]);
      setCoins(coins + 10);
      setSelectedLetters('');
    } else if (guessedWords.includes(newSelectedLetters)) {
      Alert.alert('Такое слово уже есть.');
      setSelectedLetters(''); 
    } else {
      Alert.alert('Неверное слово', 'Попробуйте еще раз.');
      setSelectedLetters(''); 
    }
  };

  const handleSkip = () => {
    const wordToSkip = currentWordData.words.find((word) => !guessedWords.includes(word));
    if (wordToSkip) {
      setGuessedWords([...guessedWords, "skip"]);  
    }
  };
  
  const handleHint = () => {
    console.log('Hint')
    const remainingWords = currentWordData.words.filter(word => !guessedWords.includes(word));

    if (remainingWords.length > 0) {
      const hintWord = remainingWords[0];
      setGuessedWords([...guessedWords, hintWord]);
    } else {
      Alert.alert("Все слова угаданы!");
    }
  };

  const selectPaused = () => {
    setPaused(!paused);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20}}>
      <Text style={styles.coins}>Time: {timer}</Text>
        <Text style={styles.coins}>Coins: {coins}</Text>
        <TouchableOpacity onPress={selectPaused}>
        <Text style={styles.coins}>{paused ? 'Resume' : 'Pause'}</Text>
        </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20}}>
          <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipButton}>SKIP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHint}>
          <Text style={styles.hintButton}>hunt</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShuffledLetters(shuffleWord(currentWordData.word))}>
              <Text style={styles.letter}>mix</Text>
        </TouchableOpacity>
        </View>
        

        <FlatList
          data={shuffledLetters}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleLetterPress(item)}>
              <Text style={styles.letter}>
              {item === currentWordData.words ? 'skip' : item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={5}
          contentContainerStyle={styles.lettersContainer}
        />

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>{selectedLetters}</Text>
        </View>
            <TouchableOpacity onPress={() => clean()}>
              <Text style={styles.letter}>clean</Text>
            </TouchableOpacity>

        <View style={styles.guessedWordsContainer}>
        <FlatList
        data={guessedWords}
        renderItem={({ item }) => <Text style={styles.word}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}  
      />

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 10,  
  },
  contentContainer: {
    width: '100%',
    maxWidth: 350, 
    alignItems: 'center',
  },
  coins: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20, 
  },
  lettersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    marginVertical: 20, 
    width: '100%', 
  },
  letter: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 6,
    backgroundColor: '#ececec',
    padding: 12,
    borderRadius: 8,
    textAlign: 'center',
    width: 48,
    height: 48,
    lineHeight: 24,
  },
  letter: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 6,
    backgroundColor: '#ececec',
    padding: 12,
    borderRadius: 8,
    textAlign: 'center',
  
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    padding: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 50,
    backgroundColor: '#f9f9f9',
    width: '80%', 
  },
  inputText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  guessedWordsContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  word: {
    fontSize: 18,
    color: '#555',
    marginVertical: 4,
    textAlign: 'center',
  },
  hintButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 10,
  },
});

export default GameScreen;
