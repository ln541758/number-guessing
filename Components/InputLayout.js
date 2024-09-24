import { StyleSheet } from "react-native";
import { TextInput } from "react-native";

export function InputLayout({ style, value, onChangeText }) {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontWeight: "bold",
    fontSize: 15,
    color: "rebeccapurple",
    borderBottomWidth: 2,
    borderBottomColor: "rebeccapurple",
    paddingBottom: 10,
    textAlign: "center",
  },
});
