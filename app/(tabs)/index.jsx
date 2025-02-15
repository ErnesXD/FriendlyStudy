import { useState, useEffect } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "../../components/Screen";
import { useQuotes } from "../../lib/Utils";

export default function Index() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(5000);
  const [modalVisible, setModalVisible] = useState(false);
  const { getRandomQuote } = useQuotes();
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    if (!isRunning) return;

    const startTime = Date.now();
    const endTime = startTime + duration;
    const interval = setInterval(() => {
      const remainingTime = endTime - Date.now();
      if (remainingTime <= 0) {
        clearInterval(interval);
        setTime(0);
        setQuote(getRandomQuote());
        setModalVisible(true);
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {quote
                ? `"${quote.quote}" - ${quote.author}`
                : "No quote available"}
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    marginBottom: 20,
    fontSize: 48,
    fontWeight: "bold",
    color: "#C8E6C9",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20",
  },
  button: {
    backgroundColor: "#A5D6A7",
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
