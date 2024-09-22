import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Game({ gameVisible }) {
  return (
    <Modal transparent={true} visible={gameVisible} animationType="slide">
      <View style={styles.container}>
        <LinearGradient
          colors={["lightblue", "mediumpurple"]}
          style={styles.background}
        />
        <Text>Game</Text>
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
});
