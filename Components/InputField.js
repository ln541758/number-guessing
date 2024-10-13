import { View, Text, TextInput, StyleSheet } from "react-native";
import { InputLayout } from "./InputLayout.js";
import  Colors  from "./Colors.js";
import TextSize from "../Components/TextSize";

export function InputField({ label, value, onChangeText, errorMessage }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <InputLayout
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
      {errorMessage && (
        <Text style={styles.error}>{errorMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: TextSize.title,
    color: Colors.rebeccapurple,
    marginBottom: 10,
    marginTop: 30,
  },
  error: {
    fontSize: TextSize.text,
    color: Colors.gray,
  },
});
