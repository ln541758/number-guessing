import React from 'react';
import { View, StyleSheet } from 'react-native';

export function Container({ children, style }) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", 
  },
});
