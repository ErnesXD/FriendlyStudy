import { useState, useEffect } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  BackHandler,
} from "react-native";
import { Screen } from "../../components/Screen";
import { useQuotes } from "../../lib/Utils";
import { TimePicker } from "../../components/TimePicker";
import { useTimer, useSound, useExit } from "../../hooks/useTimer";
import { usePathname } from "expo-router";

export default function Index() {
  const pathname = usePathname();

  const [modalVisible, setModalVisible] = useState(false);
  const {
    time,
    isRunning,
    quote,
    duration,
    startTimer,
    stopTimer,
    handleDurationChange,
    formatTime,
  } = useTimer(
    {
      hours: 0,
      minutes: 25,
      seconds: 0,
    },
    setModalVisible
  );
  const { setFavouriteQuote } = useQuotes();
  const { playSound } = useSound();
  useExit(isRunning, pathname);
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
            <View style={{ flexDirection: "row", display: "flex" }}>
              <Pressable
                style={[styles.buttonModal]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonModal]}
                onPress={() => {
                  setModalVisible(false);
                  setFavouriteQuote(quote);
                }}
              >
                <Text style={styles.textStyle}>Favourite</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {isRunning ? (
        <Text style={styles.title}>{formatTime(time)}</Text>
      ) : (
        <TimePicker
          onDurationChange={handleDurationChange}
          duration={duration}
        />
      )}
      <Pressable
        onPress={async () => {
          await playSound();
          isRunning ? stopTimer() : startTimer();
        }}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            {isRunning ? "Stop" : "Start timer"}
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
  buttonModal: {
    backgroundColor: "#A5D6A7",
    width: 125,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginLeft: 15,
    marginRight: 15,
  },
});
