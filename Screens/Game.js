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
import { Gradient } from "../Components/Gradient";
import { useState, useEffect } from "react";
import { Container } from "../Components/Container";
import { Card } from "../Components/Card";
import { SubmitCard } from "../Components/SubmitCard";
import { GuessCard } from "../Components/GuessCard";
import { ImageDisplay } from "../Components/ImageDisplay";
import Colors from "../Components/Colors";
import TextSize from "../Components/TextSize";

export default function Game({ gameVisible, lastDigit, handleRestart }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
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
    }
    if (value === answer) {
      setIsTimerActive(false);
      setIsCorrect(true);
      setResult(`You guessed correct!\nAttempts used: ${5 - guessNumber}`);
    } else {
      resultText(value);
      setIsCorrect(false);
    }

    if (guessNumber === 1) {
      setGuessNumber(0);
      handleReason();
      handleGameOver();
    } else {
      setGuessNumber((prevGuess) => prevGuess - 1);
    }
    if (
      !isNaN(value) &&
      value >= 1 &&
      value <= 100 &&
      value % lastDigit === 0
    ) {
      setShowSubmitCard(true);
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
    setIsTimerActive(true);
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
    setGameStarted(false);
  }

  function submitCard() {
    return (
      <SubmitCard
        result={result}
        isCorrect={isCorrect}
        handleTryAgain={handleTryAgain}
        handleNewGame={handleNewGame}
        answer={answer}
        handleGameOver={handleGameOver}
      />
    );
  }

  function guessCard() {
    return (
      <GuessCard
        lastDigit={lastDigit}
        inputValue={inputValue}
        setInputValue={setInputValue}
        guessNumber={guessNumber}
        hint={hint}
        isHintUsed={isHintUsed}
        useHint={useHint}
        submitGuess={submitGuess}
        secondsLeft={secondsLeft}
        isGameStarted={gameStarted}
        startGame={startGame}
      />
    );
  }

  useEffect(() => {
    let interval = null;
    if (secondsLeft > 0 && !isGameOver && isTimerActive) {
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
      <Container>
        <Gradient colors={[Colors.lightblue, Colors.mediumpurple]} />
        <View style={styles.restart}>
          <Button
            title="Restart"
            onPress={handleRestart}
            color={Colors.dodgerblue}
          />
        </View>
        {!isGameOver ? (showSubmitCard ? submitCard() : guessCard()) : null}
        {isGameOver && isCorrect && submitCard()}
        {isGameOver && !isCorrect && (
          <Card
            style={{
              minHeight: 150,
              width: 300,
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.text}>The game is over!</Text>
            <ImageDisplay
              source={require("../assets/sadsmiley.png")}
              alt={"A sad smiley face"}
            />
            <Text style={styles.text}>{reason}</Text>
            <Button
              title="New Game"
              onPress={handleNewGame}
              color={Colors.blue}
            />
          </Card>
        )}
      </Container>
    </Modal>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: TextSize.title,
    color: Colors.rebeccapurple,
    textAlign: "center",
    marginBottom: 20,
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
});
