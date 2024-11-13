import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import wordsData from '../helpers/wordsData';
import PopupModal from '../components/PopupModal';
import { useCoins } from '../utils/CoinsProvider';
import Header from '../components/Header';

const GameScreen = ({route}) => {
  const { level } = route.params;

  const { coins, addCoins, removeCoins } = useCoins();
  const [timer, setTimer] = useState(60);
  const [modalVisible, setModalVisible] = useState(false);
  const [guessedWords, setGuessedWords] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState('');
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [win, setWin] = useState(false);
 
  const currentWordData = wordsData[level][currentWordIndex];


  useEffect(() => {
    if ((paused || timer === 0 || win) && !modalVisible) { 
      setModalVisible(true);
    }
  }, [paused, timer, win, modalVisible]);

  useEffect(() => {
    let interval;
    if (!paused && timer > 0 && !modalVisible) { 
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [paused, timer, modalVisible]); 
  

  useEffect(() => {
    if (currentWordData.words.length === guessedWords.length) {
      setWin(true)
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

    if (normalizedWords.includes(newSelectedLetters) && !guessedWords.includes(newSelectedLetters)) {
      setGuessedWords([...guessedWords, newSelectedLetters]);
      addCoins(10);
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
      removeCoins(10)
      setGuessedWords([...guessedWords, "skip"]);  
    }
  };
  
  const handleHint = () => {
    console.log('Hint')
    const remainingWords = currentWordData.words.filter(word => !guessedWords.includes(word));

    if (remainingWords.length > 0) {
      const hintWord = remainingWords[0];
      removeCoins(10)
      setGuessedWords([...guessedWords, hintWord]);
    } else {
      Alert.alert("Все слова угаданы!");
    }
  };

  const restart = () => {
    setTimer(60);
    setGuessedWords([]);
    setWin(false); 
    setPaused(false);
    clean();
  };
  

  const handleModalAction = () => {
    if (paused) {
      setPaused(false);
      setModalVisible(false); 
    } else if (win) {
      restart(); 
      setModalVisible(false); 
    } else if (timer === 0) {
      restart(); 
      setModalVisible(false); 
    }
  };

  const getModalType = () => {
    if (paused) return 'paused';
    if (win) return 'win';
    if (timer === 0) return 'timeout';
    return null;
  };

  const selectPaused = () => {
    setPaused(!paused);
  };

  return (
    <ImageBackground
      source={
        level === 'easy'
          ? require('../../assets/images/game/easyBg.png') 
          : level === 'normal' 
            ? require('../../assets/images/game/normalBg.jpg') 
            : require('../../assets/images/game/hardBg.jpg')
      }
      style={styles.bgContainer}
    >
      <PopupModal
        visible={modalVisible}
        onPlay={handleModalAction}
        modalType={getModalType()}
      />

      <View style={styles.contentContainer}>
        <Header coins={coins} timer={timer} onPause={selectPaused} />
        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={handleHint} style={styles.iconButton}>
            <Image source={require('../../assets/images/game/hint.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkip} style={styles.iconButton}>
            <Image source={require('../../assets/images/game/skip.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShuffledLetters(shuffleWord(currentWordData.word))} style={styles.iconButton}>
            <Image source={require('../../assets/images/game/mix.png')} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
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
          <TouchableOpacity onPress={clean} style={styles.cleanButton}>
            <Image source={require('../../assets/images/game/clean.png')} style={styles.cleanIcon} />
          </TouchableOpacity>
        </View>
        <FlatList
          numColumns={2}
          data={Array.from({ length: currentWordData.words.length })}
          renderItem={({ item, index }) => (
            <View style={styles.guessedWordItem}>
              <Text style={styles.word}>
                {guessedWords[index] || ''}
              </Text>
        </View>
    )}
    keyExtractor={(item, index) => index.toString()}
    contentContainerStyle={{
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      gap: 10,
    }}
  />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 40,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  iconButton: {
    marginHorizontal: 10,
  },
  iconImage: {
    resizeMode: 'contain',
  },
  lettersContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'space-between',
    marginVertical: 20,
    padding: 15,
    borderRadius: 12,
    borderColor: '#00000026',
    borderWidth: 1,
    backgroundColor: '#f9f9f9',
    width: '80%',
  },
  inputText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  cleanButton: {
    marginLeft: 10,
  },
  cleanIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  word: {
    fontSize: 18,
    color: '#555',
    marginVertical: 4,
    textAlign: 'center',
  },
  guessedWordItem: {
    width: 150,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderColor: '#FF00BB',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  
});

export default GameScreen;