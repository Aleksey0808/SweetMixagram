import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import wordsData from '../helpers/wordsData';

const GameScreen = () => {
  const [coins, setCoins] = useState(0);
  const [life, setLife] = useState(3);
  const [guessedWords, setGuessedWords] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState('');
  const [shuffledLetters, setShuffledLetters] = useState([]);
  // console.log('selectedLetters', selectedLetters)
  console.log('guessedWords', guessedWords)

  // Берем первый элемент уровня `easy`
  const currentWordData = wordsData.easy[0];
  // const res = currentWordData.words.map(word => word.toLowerCase())
  // console.log(res.includes(selectedLetters))

  useEffect(() => {
    // Перемешиваем буквы текущего слова
    setShuffledLetters(shuffleWord(currentWordData.word));
  }, []);

  const shuffleWord = (word) => {
    return word.split('').sort(() => Math.random() - 0.5);
  };

  const handleLetterPress = (letter) => {
    const newSelectedLetters = selectedLetters + letter;
    console.log('newSelectedLetters', newSelectedLetters)
    setSelectedLetters(newSelectedLetters);
    
    // console.log('new', newSelectedLetters.length)
    // console.log('current', currentWordData.words[0].length)

    // Проверяем слово, если длина совпадает с допустимой
    if (newSelectedLetters.length === currentWordData.words[0].length) {
      handleGuess(newSelectedLetters);
    }
  };

  const handleGuess = (newSelectedLetters) => {
    const normalizedInput = selectedLetters.toLowerCase();
    const normalizedWords = currentWordData.words.map(word => word.toLowerCase());
    console.log('guessedWords', guessedWords.includes(newSelectedLetters))

    if (normalizedWords.includes(newSelectedLetters) && !guessedWords.includes(newSelectedLetters)) {
    // if (normalizedWords.includes(newSelectedLetters)) {
      setGuessedWords([...guessedWords, newSelectedLetters]);
      setCoins(coins + 10);
      setSelectedLetters('');
    } else if (guessedWords.includes(newSelectedLetters)) {
      Alert.alert('Такое слово уже есть.');
      setLife(life - 1)
      setSelectedLetters(''); 
    } else {
      Alert.alert('Неверное слово', 'Попробуйте еще раз.');
      setLife(life - 1)
      setSelectedLetters(''); 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.coins}>Coins: {coins}</Text>
        <Text style={styles.coins}>Life: {life}</Text>

        <FlatList
          data={shuffledLetters}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleLetterPress(item)}>
              <Text style={styles.letter}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={5}
          contentContainerStyle={styles.lettersContainer}
        />

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>{selectedLetters}</Text>
        </View>

        <View style={styles.guessedWordsContainer}>
          <FlatList
            data={guessedWords}
            renderItem={({ item }) => <Text style={styles.word}>{item}</Text>}
            keyExtractor={(item) => item}
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
});

export default GameScreen;
