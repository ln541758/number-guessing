import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { Card } from "./Card";
import { ImageDisplay } from "../Components/ImageDisplay";
import Colors from "./Colors";
import TextSize from "../Components/TextSize";

export function SubmitCard({
  result,
  isCorrect,
  handleTryAgain,
  handleNewGame,
  answer,
  handleGameOver,
}) {
  return (
    <Card
      style={{ minHeight: 150, width: 300, justifyContent: "space-between" }}
    >
      <Text style={styles.text}>{result}</Text>
      {!isCorrect ? (
        <View>
          <View style={{ marginBottom: 10 }}>
            <Button
              title="Try Again"
              onPress={handleTryAgain}
              color={Colors.blue}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Button
              title="End the game"
              onPress={handleGameOver}
              color={Colors.blue}
            />
          </View>
        </View>
      ) : (
        <View>
          <ImageDisplay
            source={{ uri: `https://picsum.photos/id/${answer}/100/100` }}
            alt="Random image"
          />
          <Button
            title="New Game"
            onPress={handleNewGame}
            color={Colors.blue}
          />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: TextSize.title,
    color: Colors.rebeccapurple,
    textAlign: "center",
    marginBottom: 20,
  },
});
