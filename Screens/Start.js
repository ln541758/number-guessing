import { StyleSheet, Button, Text, TextInput, View, Modal } from "react-native";
import { useState } from "react";
import React from "react";
import Checkbox from "expo-checkbox";
import { Gradient } from "../Components/Gradient";
import { InputField } from "../Components/InputField";
import { Card } from "../Components/Card";
import { Container } from "../Components/Container";
import { CustomButton } from "../Components/CustomButton";
import Colors from "../Components/Colors";
import TextSize from "../Components/TextSize";

export default function Start({ user, handleRegister }) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [isChecked, setChecked] = useState(user.isChecked || false);

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
    <Container style={{ justifyContent: "flex-start" }}>
      <Gradient colors={[Colors.lightblue, Colors.mediumpurple]} />
      <Text style={styles.header}>Welcome</Text>
      <Card
        style={{
          height: 500,
          width: 300,
          justifyContent: "center",
          marginTop: 80,
        }}
      >
        <InputField
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          errorMessage={
            !validateName() && name.length > 0
              ? "Please enter a valid name"
              : null
          }
        />
        <InputField
          label="Email address"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          errorMessage={
            !validateEmail() && email.length > 0
              ? "Please enter a valid email"
              : null
          }
        />
        <InputField
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          errorMessage={
            !validatePhone() && phone.length > 0
              ? "Please enter a valid phone"
              : null
          }
        />
        <View style={styles.checkbox}>
          <Checkbox value={isChecked} onValueChange={setChecked} />
          <Text style={styles.checkText}>I am not a robot</Text>
        </View>
        <CustomButton>
          <Button
            title="Reset"
            onPress={reset}
            color={Colors.mediumvioletred}
          />
          <Button
            title="Register"
            onPress={register}
            color={Colors.blue}
            disabled={!isChecked}
          />
        </CustomButton>
      </Card>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 80,
    fontSize: TextSize.title,
    fontWeight: "bold",
    alignSelf: "center",
    color: Colors.blue,
  },
  checkText: {
    color: Colors.rebeccapurple,
    fontSize: TextSize.text,
    marginLeft: 10,
  },
  checkbox: {
    flexDirection: "row",
    marginTop: 50,
    marginBottom: 20,
  },
});
