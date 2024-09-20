import { StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import React from "react";

export default function Start() {
  const [name, setName] = useState("");
  function validateName() {
    const nameCharecter = /^[a-zA-Z]+$/;
    return name.length >= 2 && nameCharecter.test(name);
  }

  return (
    <View style={styles.card}>
      <Text style={styles.text}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      {!validateName() && name.length > 0 && (
        <Text style={styles.error}>Please enter a valid name</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {},
  input: {},
  text: {},
  button: {},
  error: {},
  checkbox: {},
});
