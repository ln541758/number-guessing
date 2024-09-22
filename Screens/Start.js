import { StyleSheet, Button, Text, TextInput, View, Modal } from "react-native";
import { useState } from "react";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Checkbox from "expo-checkbox";

export default function Start({ user, handleRegister }) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [isChecked, setChecked] = useState(false);

  function validateName() {
    const nameCharecter = /^[a-zA-Z]+$/;
    return name.length >= 2 && nameCharecter.test(name);
  }
  function validateEmail() {
    const emailCharecter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
    return emailCharecter.test(email);
  }
  function validatePhone() {
    const phoneNumber = /^\d{10}$/;
    if (!phoneNumber.test(phone) || phone.length != 10) {
      return false;
    }
    const lastDigit = phone.charAt(phone.length - 1);
    return !(lastDigit === "0" || lastDigit === "1");
  }
  function reset() {
    setName("");
    setEmail("");
    setPhone("");
    setChecked(false);
  }
  function register() {
    if (validateName() && validateEmail() && validatePhone() && isChecked) {
      handleRegister(name, email, phone, isChecked);
    } else {
      alert("Registration failed");
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["lightblue", "mediumpurple"]}
        style={styles.background}
      />
      <Text style={styles.header}>Welcome</Text>
      <View style={styles.card}>
        <View>
          <Text style={styles.label}>Name</Text>
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
        <View>
          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
          />
          {!validateEmail() && email.length > 0 && (
            <Text style={styles.error}>Please enter a valid email</Text>
          )}
        </View>
        <View>
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
          />
          {!validatePhone() && phone.length > 0 && (
            <Text style={styles.error}>Please enter a valid phone</Text>
          )}
        </View>
        <View style={styles.checkbox}>
          <Checkbox value={isChecked} onValueChange={setChecked} />
          <Text style={styles.checkText}>I am not a robot</Text>
        </View>
        <View style={styles.button}>
          <Button title="Reset" onPress={reset} color="mediumvioletred" />
          <Button
            title="Register"
            onPress={register}
            color="blue"
            disabled={!isChecked}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  header: {
    marginTop: 80,
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    color: "blue",
  },
  card: {
    backgroundColor: "darkgray",
    borderRadius: 10,
    height: 500,
    width: 300,
    padding: 20,
    justifyContent: "center",
    marginTop: 80,
    // Android
    elevation: 10,
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  label: {
    fontSize: 20,
    color: "rebeccapurple",
    marginBottom: 10,
    marginTop: 30,
  },
  input: {
    fontWeight: "bold",
    fontSize: 15,
    color: "rebeccapurple",
    borderBottomWidth: 2,
    borderBottomColor: "rebeccapurple",
    paddingBottom: 10,
    textAlign: "center",
  },
  error: {
    fontSize: 15,
    color: "gray",
  },
  checkText: {
    color: "rebeccapurple",
    fontSize: 15,
    marginLeft: 10,
  },
  checkbox: {
    flexDirection: "row",
    marginTop: 50,
    marginBottom: 20,
  },
  button: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
});
