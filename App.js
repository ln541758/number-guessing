import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Start from "./Screens/Start";
import Confirm from "./Screens/Confirm";
import Game from "./Screens/Game";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [gameVisible, setGameVisible] = useState(false);
  const lastDigit = user.phone.charAt(user.phone.length - 1);
  function handleRegister(name, email, phone, isChecked) {
    setUser({ name: name, email: email, phone: phone, isChecked: isChecked });
    setConfirmVisible(true);
  }
  function handleCancel() {
    setConfirmVisible(false);
  }
  function handleConfirm() {
    setConfirmVisible(false);
    setGameVisible(true);
  }
  function handleRestart() {
    setUser({ name: "", email: "", phone: "" });
    setConfirmVisible(false);
    setGameVisible(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {!confirmVisible && !gameVisible && (
        <Start user={user} handleRegister={handleRegister} />
      )}
      {confirmVisible && (
        <Confirm
          confirmVisible={confirmVisible}
          name={user.name}
          email={user.email}
          phone={user.phone}
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
      )}
      {gameVisible && (
        <Game
          gameVisible={gameVisible}
          lastDigit={lastDigit}
          handleRestart={handleRestart}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
