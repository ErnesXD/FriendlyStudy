import { StyleSheet, Text, View } from "react-native";
import { Screen } from "../../components/Screen";
export default function Rewards() {
  return (
    <Screen>
      <Text style={styles.text}>SETTINGS</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
});
