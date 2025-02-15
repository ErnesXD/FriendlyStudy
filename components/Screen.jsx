import { View } from "react-native";

const { StyleSheet } = require("react-native");

export function Screen({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B5E20", // Verde oscuro elegante
  },
});
