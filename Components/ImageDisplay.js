import React from "react";
import { Image, StyleSheet } from "react-native";

export function ImageDisplay({ source, alt }) {
  return (
    <Image
      style={styles.image}
      source={source}
      alt={alt}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignSelf: "center",
  },
});
