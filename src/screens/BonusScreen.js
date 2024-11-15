import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import Header from '../components/Header';
import { useFonts } from '../utils/FontContext';
import { fruitImages } from '../helpers/fruitImages'; 
import Card from '../components/Card';
import BonusModal from '../components/BonusModal';
import { useCoins } from '../utils/CoinsProvider';
import { useTimer } from '../utils/TimerContext';

const { width, height } = Dimensions.get('window');

const getDynamicStyles = () => {
  return height > 749
    ? {
      container: { 
        flex: 1, 
        marginTop: 60, 
        alignItems: 'center' 
    },
    bgText: {
      position: 'absolute',
      bottom: 100,
      width: '100%',
      backgroundColor: '#E81196B2',
    },
    text: {
      textAlign: 'center',
      fontSize: 20,
      color: '#FFFFFF',
      padding: 30,
    },
      }
    : {
      container: { 
        flex: 1, 
        marginTop: height * 0.01, 
        alignItems: 'center' 
    },
    bgText: {
      position: 'absolute',
      bottom: height * 0.01,
      width: '100%',
      backgroundColor: '#E81196B2',
    },
    text: {
      textAlign: 'center',
      fontSize: 20,
      color: '#FFFFFF',
      padding: 5,
      padding: height * 0.01,
    },
      };
};

const BonusScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { fontsLoaded } = useFonts();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isBoardLocked, setIsBoardLocked] = useState(false);
  const [modalType, setModalType] = useState('');
  const [attempts, setAttempts] = useState(5); 
  const { addHint } = useCoins();
  const { setTimer } = useTimer();

  const dynamicStyles = getDynamicStyles();

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (matchedPairs === fruitImages.length) {
      setModalVisible(true);
      setModalType(attempts > 0 ? getRandomBonus() : 'lose');
    } else if (attempts === 0) {
      setModalVisible(true);
      setModalType('lose');
    }

  }, [matchedPairs, attempts]);

  const getRandomBonus = () => {
    const bonuses = ['hint', 'time'];
    return bonuses[Math.floor(Math.random() * bonuses.length)];
  };

  const initializeGame = () => {
    const shuffledCards = [...fruitImages, ...fruitImages]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        id: index,
        image,
        isFlipped: true,
        isMatched: false,
      }));

    setCards(shuffledCards);
    setIsBoardLocked(true);

    setTimeout(() => {
      setCards((prev) => prev.map((card) => ({ ...card, isFlipped: false })));
      setIsBoardLocked(false);
    }, 3000);
  };

  const handleCardPress = (id) => {
    if (isBoardLocked) return;
  
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
  
    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );
  
    if (newFlippedCards.length === 2) {
      setIsBoardLocked(true);
      const [firstId, secondId] = newFlippedCards;
  
      if (cards[firstId].image === cards[secondId].image) {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatchedPairs((prev) => prev + 1);
      } else {
        setAttempts((prev) => prev - 1);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }, 1000);
      }
  
      setTimeout(() => {
        setFlippedCards([]);
        setIsBoardLocked(false);
      }, 1000);
    }
  };
  
  const resetGame = () => {
      if (modalType === 'hint') {
    addHint(1); 
  } else if (modalType === 'time') {
    setTimer(60); 
  } else if (modalType === 'lose') {
    setAttempts(5); 
  }
    setMatchedPairs(0); 
    setFlippedCards([]); 
    initializeGame(); 
    setModalVisible(false);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg/bonusBg.jpg')}
      style={styles.bgContainer}
    >
       <BonusModal
        visible={modalVisible}
        onPlay={resetGame}
        modalType={modalType}
      />

      <Header title={`${attempts}/5`} icon={false} showBackButton={true} onPause={() => navigation.goBack()} />
      <View style={dynamicStyles.container}>
        <View style={styles.boardContainer}>
          <Image
            source={require('../../assets/images/bonus/board.png')}
            style={styles.board}
          />
          <View style={styles.cardsContainer}>
          <FlatList
            data={cards}
            keyExtractor={(item) => item.id.toString()}
            numColumns={4} 
            renderItem={({ item }) => (
                <Card
                isFlipped={item.isFlipped || item.isMatched}
                fruitImage={item.image}
                onPress={() =>
                    !item.isFlipped && !item.isMatched && handleCardPress(item.id)
                }
                />
            )}
            contentContainerStyle={{ 
                justifyContent: 'center', 
                alignItems: 'center', 
                flexGrow: 1 
              }}
            />
          </View>
        </View>
        <View style={dynamicStyles.bgText}>
          <Text style={[dynamicStyles.text, { fontFamily: fontsLoaded ? 'baloo-cyrillic' : 'System' }]}>
            Turn the cards over in pairs and you can get extra time for playing or an extra hint.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgContainer: { 
    flex: 1, 
    resizeMode: 'cover' 
},
  boardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  board: {
    // height: 100,
    resizeMode: 'contain',
  },
  cardsContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default BonusScreen;
