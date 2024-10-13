import { Text, StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { TextSize } from "../Components/TextSize";
import TextSize from "../Components/TextSize";

export function ErrorMessage({ message }) {
  return message ? <Text style={styles.error}>{message}</Text> : null;
}

const styles = StyleSheet.create({
  error: {
    fontSize: TextSize.text,
    color: Colors.gray,
  },
});
