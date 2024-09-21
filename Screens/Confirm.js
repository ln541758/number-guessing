import { StyleSheet, Text, Modal, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Confirm({ modalVisible }) {
  return (
    <Modal transparent={true} visible={modalVisible} animationType="slide">
      <LinearGradient
        colors={["lightblue", "mediumpurple"]}
        style={styles.background}
      />
      <View style={styles.modalBackground}>
        <View style={styles.card}>
          <Text>Confirm</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(173, 216, 230, 0.7)",
  },
  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  card: {
    backgroundColor: "darkgray",
    borderRadius: 10,
    height: 300,
    width: 300,
    padding: 20,
    justifyContent: "center",
    // Android
    elevation: 10,
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
});
