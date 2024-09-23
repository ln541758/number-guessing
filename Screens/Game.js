import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Image,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";

export default function Game({ gameVisible, lastDigit, handleRestart }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [guessNumber, setGuessNumber] = useState(4);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [hint, setHint] = useState("");
  const [isHintUsed, setIsHintUsed] = useState(false);
  const [showSubmitCard, setShowSubmitCard] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answer, setAnswer] = useState(generateNewAnswer());
  const [reason, setReason] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  function generateNewAnswer() {
    const maxMultiplier = Math.floor(100 / lastDigit);
    const multiplier = Math.floor(Math.random() * maxMultiplier) + 1;
    return lastDigit * multiplier;
  }

  function startGame() {
    setGameStarted(true);
    setIsTimerActive(true);
  }

  function useHint() {
    if (answer >= 51 && answer <= 100) {
      setHint("The number is between 51 and 100");
    } else if (answer >= 1 && answer <= 50) {
      setHint("The number is between 1 and 50");
    }
    setIsHintUsed(true);
  }

  function submitGuess() {
    const value = parseInt(inputValue);
    if (isNaN(value) || value < 1 || value > 100 || value % lastDigit !== 0) {
      Alert.alert(
        "Invalid number!",
        `Number has to be a multiply of ${lastDigit} and between 1 and 100.`,
        [{ text: "Okay" }]
      );
    } else {
      setShowSubmitCard(true);
    }
    if (value === answer) {
      setIsCorrect(true);
      setResult(`You guessed correct!\nAttempts used: ${5 - guessNumber}`);
      return;
    } else {
      resultText(value);
    }

    if (guessNumber === 1) {
      setGuessNumber(0);
      handleReason();
      handleGameOver();
    } else {
      setGuessNumber((prevGuess) => prevGuess - 1);
    }
  }

  function resultText() {
    const value = parseInt(inputValue);
    if (value < answer) {
      setResult("You did not guess correct!\nYou should guess higher.");
    } else if (value > answer) {
      setResult("You did not guess correct!\nYou should guess lower.");
    }
  }

  function handleTryAgain() {
    setInputValue("");
    setShowSubmitCard(false);
  }

  function handleReason() {
    if (guessNumber === 1) {
      setReason("You are out of attempts");
    } else if (secondsLeft === 0) {
      setReason("You are out of time");
    }
  }

  function handleGameOver() {
    setIsGameOver(true);
  }

  function handleNewGame() {
    setSecondsLeft(60);
    setIsTimerActive(false);
    setGuessNumber(4);
    setInputValue("");
    setResult("");
    setHint("");
    setIsHintUsed(false);
    setShowSubmitCard(false);
    setIsCorrect(false);
    setAnswer(generateNewAnswer());
    setReason("");
    setIsGameOver(false);
  }

  function submitCard() {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{result}</Text>
        {!isCorrect ? (
          <View>
            <Button title="Try Again" onPress={handleTryAgain} color="blue" />
            <Button
              title="End the game"
              onPress={handleGameOver}
              color="blue"
            />
          </View>
        ) : (
          <View>
            <Image
              style={styles.image}
              source={{ uri: `https://picsum.photos/id/${answer}/100/100` }}
              alt={"Random image"}
            />
            <Button title="New Game" onPress={handleNewGame} color="blue" />
          </View>
        )}
      </View>
    );
  }

  function guessCard() {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>
          Guess a number between 1 & 100 that is multiple of {lastDigit}
        </Text>
        {!gameStarted ? (
          <View style={styles.start}>
            <Button title="Start" onPress={startGame} color="blue" />
          </View>
        ) : (
          <View>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
            />
            {isHintUsed && <Text style={styles.hint}>{hint}</Text>}
            <Text style={styles.info}>Attempts left: {guessNumber}</Text>
            <Text style={styles.info}>Timer: {secondsLeft}s</Text>
            <View style={styles.start}>
              <Button
                title="Use a Hint"
                onPress={useHint}
                color="blue"
                disabled={isHintUsed}
              />
              <Button title="Submit guess" onPress={submitGuess} color="blue" />
            </View>
          </View>
        )}
      </View>
    );
  }

  useEffect(() => {
    let interval = null;
    if (secondsLeft > 0 && !isGameOver) {
      interval = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (secondsLeft === 0 || !isTimerActive || isGameOver) {
      clearInterval(interval);
      setShowSubmitCard(false);
      handleReason();
      handleGameOver();
    }
    return () => clearInterval(interval);
  }, [secondsLeft, isTimerActive]);

  return (
    <Modal transparent={true} visible={gameVisible} animationType="slide">
      <View style={styles.container}>
        <LinearGradient
          colors={["lightblue", "mediumpurple"]}
          style={styles.background}
        />
        <View style={styles.restart}>
          <Button title="Restart" onPress={handleRestart} color="dodgerblue" />
        </View>
        {!isGameOver ? (showSubmitCard ? submitCard() : guessCard()) : null}
        {isGameOver && (
          <View style={styles.card}>
            <Text style={styles.text}>The game is over!</Text>
            <Image
              style={styles.image}
              source={require("../assets/sadsmiley.png")}
              alt={"A sad smiley face"}
            />
            <Text style={styles.text}>{reason}</Text>
            <Button title="New Game" onPress={handleNewGame} color="blue" />
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  card: {
    backgroundColor: "darkgray",
    borderRadius: 10,
    minHeight: 150,
    width: 300,
    padding: 20,
    justifyContent: "space-between",
    // Android
    elevation: 10,
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  text: {
    fontSize: 20,
    color: "rebeccapurple",
    textAlign: "center",
    marginBottom: 20,
  },
  hint: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
  },
  start: {
    alignSelf: "center",
    marginTop: 30,
  },
  restart: {
    alignSelf: "flex-end",
    marginBottom: 30,
    marginRight: 10,
  },
  input: {
    fontWeight: "bold",
    fontSize: 15,
    color: "rebeccapurple",
    borderBottomWidth: 2,
    borderBlockColor: "rebeccapurple",
    marginTop: 50,
    marginBottom: 50,
    paddingBottom: 10,
    alignSelf: "center",
    textAlign: "center",
    width: 50,
  },
  info: {
    fontSize: 15,
    color: "dimgray",
    alignSelf: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignSelf: "center",
  },
});
