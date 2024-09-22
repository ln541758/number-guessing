import { Button, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

export default function Game({ gameVisible, lastDigit, handleRestart }) {
  const [gameStarted, setGameStarted] = useState(false);
  function startGame() {
    setGameStarted(true);
  }

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
            <Text>Game started</Text>
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
    height: 150,
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
  start: {
    alignSelf: "center",
  },
  restart: {
    alignSelf: "flex-end",
    marginBottom: 30,
    marginRight: 10,
  },
});
