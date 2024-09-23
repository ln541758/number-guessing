import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
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
  const maxMultiplier = Math.floor(100 / lastDigit);
  const multiplier = Math.floor(Math.random() * maxMultiplier) + 1;
  const answer = lastDigit * multiplier;

  function startGame() {
    setGameStarted(true);
    setIsTimerActive(true);
  }

  function useHint() {
    const remain = 4 - guessNumber + 1;
    const numberOfRanges = Math.pow(2, remain);
    const rangeSize = 100 / numberOfRanges;
    for (let i = 0; i < numberOfRanges; i++) {
      const lowerBound = i * rangeSize + 1;
      const upperBound = (i + 1) * rangeSize;
      if (answer >= lowerBound && answer <= upperBound) {
        setHint(
          `The number is between ${Math.floor(lowerBound)} and ${Math.floor(
            upperBound
          )}.`
        );
        break;
      }
    }
    setIsHintUsed(true);
  }

  function submitGuess() {
    const value = parseInt(inputValue);
    if (
      isNaN(value) ||
      value < 1 ||
      value > 100 ||
      guessNumber % lastDigit !== 0
    ) {
      Alert.alert(
        "Invalid number!",
        `Number has to be a multiply of ${lastDigit} and between 1 and 100.`,
        [{ text: "Okay" }]
      );
    }
    if (guessNumber >= 1) {
      setGuessNumber((prevGuess) => prevGuess - 1);
      resultText();
      submitCard();
    }
  }

  function resultText() {
    if (inputValue < answer) {
      setResult("You did not guess correct!\nYou should guess higher.");
    } else if (inputValue > answer) {
      setResult("You did not guess correct!\nYou should guess lower.");
    } else {
      setResult(`You guessed correct!\nAttempts used: ${guessNumber}`);
    }
  }

  function submitCard() {
    <View style={styles.start}>
      <Text style={styles.text}>{result}</Text>
      <Button title="Try Again" onPress={startGame} color="blue" />
      <Button title="End the game" onPress={startGame} color="blue" />
    </View>;
  }
  
  useEffect(() => {
    let interval = null;
    if (secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (secondsLeft === 0 || !isTimerActive) {
      clearInterval(interval);
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
                <Button
                  title="Submit guess"
                  onPress={submitGuess}
                  color="blue"
                />
              </View>
            </View>
          )}
        </View>
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
});
