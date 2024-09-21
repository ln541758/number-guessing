import { StyleSheet, Text, Modal, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Confirm({ modalVisible, name, email, phone }) {
  return (
    <Modal transparent={true} visible={modalVisible} animationType="slide">
      <View style={styles.container}>
        <LinearGradient
          colors={["rgba(173, 216, 230, 0.75)", "rgba(147, 112, 219, 0.75)"]}
          style={styles.modalBackground}
        />
        <View style={styles.card}>
          <Text style={styles.text}>
            Hello {name}
            {"\n"}Here is the information you entered:{"\n"}
            {email}
            {"\n"}
            {phone}
            {"\n"}If it is not correct, please go back and edit them.
          </Text>
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
  modalBackground: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  card: {
    backgroundColor: "darkgray",
    borderRadius: 10,
    height: 300,
    width: 370,
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
  text: {
    fontSize: 20,
    color: "rebeccapurple",
  },
});
