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
  function handleRegister(name, email, phone) {
    setUser({ name: name, email: email, phone: phone });
    setConfirmVisible(true);
  }
  function handleCancel() {
    setConfirmVisible(false);
  }
  function handleConfirm() {
    setConfirmVisible(false);
    setGameVisible(true);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Start user={user} handleRegister={handleRegister} />
      <Confirm
        confirmVisible={confirmVisible}
        name={user.name}
        email={user.email}
        phone={user.phone}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
      />
      <Game gameVisible={gameVisible} />
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
