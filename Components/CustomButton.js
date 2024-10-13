import React from "react";
import { View, StyleSheet } from "react-native";

export function CustomButton({ children, style }) {
  return <View style={[styles.button, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
});
