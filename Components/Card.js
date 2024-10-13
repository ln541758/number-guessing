import { View, Text, StyleSheet } from "react-native";

export function Card({ children, style }) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
      backgroundColor: "darkgray",
      borderRadius: 10,
      padding: 20,
      // Android
      elevation: 10,
      // iOS
      shadowColor: "#000",
      shadowOffset: { width: 1, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
    },
});
