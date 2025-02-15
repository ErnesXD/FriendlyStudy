import { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "../../components/Screen";
export default function Index() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(25 * 60 * 1000);

  useEffect(() => {
    if (!isRunning) return;

    const startTime = Date.now();
    const endTime = startTime + time;
    const interval = setInterval(() => {
      const remainingTime = endTime - Date.now();

      if (remainingTime <= 0 || !isRunning) {
        clearInterval(interval);
        setTime(0);
        setIsRunning(false);
      } else {
        setTime(remainingTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  function startTimer() {
    setTime(duration);
    setIsRunning(true);
  }

  function stopTimer() {
    setTime(duration);
    setIsRunning(false);
  }

  function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.ceil((ms % 60000) / 1000);
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  }

  return (
    <Screen>
      <Text style={styles.title}>{formatTime(time)}</Text>
      <Pressable onPress={() => (isRunning ? stopTimer() : startTimer())}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            {isRunning ? "Stop" : "Start 25-minute timer"}
          </Text>
        </View>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    fontSize: 48,
    fontWeight: "bold",
    color: "#C8E6C9", // Verde claro suave
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20", // Mismo verde oscuro
  },
  button: {
    backgroundColor: "#A5D6A7", // Verde intermedio atractivo
    width: 250,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});
