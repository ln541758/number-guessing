import React from "react";
import { Text, Button, TextInput, StyleSheet } from "react-native";
import { Card } from "./Card";
import { CustomButton } from "../Components/CustomButton";
import { InputLayout } from "./InputLayout";
import  Colors  from "./Colors";
import TextSize from "../Components/TextSize";

export function GuessCard({
  lastDigit,
  inputValue,
  setInputValue,
  guessNumber,
  hint,
  isHintUsed,
  useHint,
  submitGuess,
  secondsLeft,
}) {
  return (
    <Card
      style={{ minHeight: 150, width: 300, justifyContent: "space-between" }}
    >
      <Text style={styles.text}>
        Guess a number between 1 & 100 that is multiple of {lastDigit}
      </Text>
      <InputLayout
        style={{
          marginTop: 50,
          marginBottom: 50,
          alignSelf: "center",
          width: 50,
        }}
        value={inputValue}
        onChangeText={setInputValue}
      />
      {isHintUsed && <Text style={styles.hint}>{hint}</Text>}
      <Text style={styles.info}>Attempts left: {guessNumber}</Text>
      <Text style={styles.info}>Timer: {secondsLeft}s</Text>
      <CustomButton
        style={{ justifyContent: "space-between", alignItems: "center", marginTop: 50 }}
      >
        <Button
          title="Use a Hint"
          onPress={useHint}
          disabled={isHintUsed}
          color={Colors.blue}
        />
        <Button title="Submit guess" onPress={submitGuess} color={Colors.blue} />
      </CustomButton>
    </Card>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: TextSize.title,
    color: Colors.rebeccapurple,
    textAlign: "center",
    margnBottom: 20,
  },
  hint: {
    fontSize: TextSize.text,
    textAlign: "center",
    marginBottom: 10,
  },
  info: {
    fontSize: TextSize.text,
    color: Colors.dimgray,
    alignSelf: "center",
  },
});
