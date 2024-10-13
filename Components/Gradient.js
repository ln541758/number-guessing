import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export function Gradient({colors}) {
  return (
    <LinearGradient
      colors={colors}
      style={styles.background}
    />
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});
