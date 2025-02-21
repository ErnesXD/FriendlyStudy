// useTimer.js
import { useState, useEffect } from "react";
import { useQuotes } from "../lib/Utils";
import { Audio } from "expo-av";
export function useTimer(initialDuration, setModalVisible) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(initialDuration);
  const { getRandomQuote } = useQuotes();
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    if (!isRunning) return;

    const startTime = Date.now();
    const endTime =
      startTime +
      (duration.hours * 3600000 +
        duration.minutes * 60000 +
        duration.seconds * 1000);

    const interval = setInterval(() => {
      const remainingTime = endTime - Date.now();
      if (remainingTime <= 0) {
        clearInterval(interval);
        setTime(0);
        setQuote(getRandomQuote());
        setIsRunning(false);
        setModalVisible(true); // Muestra el modal cuando el temporizador llega a cero
      } else {
        setTime(remainingTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, duration]);

  function startTimer() {
    const durationInMs =
      duration.hours * 3600000 +
      duration.minutes * 60000 +
      duration.seconds * 1000;
    setTime(durationInMs);
    setIsRunning(true);
  }

  function stopTimer() {
    setTime(duration);
    setIsRunning(false);
  }

  function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.ceil((ms % 60000) / 1000);

    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  }

  function handleDurationChange({ hours, minutes, seconds }) {
    setDuration({
      hours: hours || 0,
      minutes: minutes || 0,
      seconds: seconds || 0,
    });
  }

  return {
    time,
    isRunning,
    quote,
    duration,
    startTimer,
    formatTime,
    stopTimer,
    handleDurationChange,
    setQuote,
  };
}
export function useSound() {
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/button.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  return { playSound };
}
