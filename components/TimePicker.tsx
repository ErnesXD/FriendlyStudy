import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Audio } from "expo-av";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface TimePickerProps {
  onDurationChange: (duration: {
    hours: number;
    minutes: number;
    seconds: number;
  }) => void;
  duration: { hours: number; minutes: number; seconds: number };
}

export function TimePicker({ onDurationChange, duration }: TimePickerProps) {
  const hapticImplementation = Platform.OS !== "web" ? Haptics : null;
  const audioImplementation = Platform.OS !== "web" ? Audio : null;
  const [showPicker, setShowPicker] = useState(false);
  const [alarmString, setAlarmString] = useState<string | null>(null);
  const [alarmDuration, setAlarmDuration] = useState({
    hours: 0,
    minutes: 25,
    seconds: 0,
  });

  const formatTime = ({
    hours,
    minutes,
    seconds,
  }: {
    hours?: number;
    minutes?: number;
    seconds?: number;
  }) => {
    const timeParts = [];

    if (hours !== undefined) {
      timeParts.push(hours.toString().padStart(2, "0"));
    }
    if (minutes !== undefined) {
      timeParts.push(minutes.toString().padStart(2, "0"));
    }
    if (seconds !== undefined) {
      timeParts.push(seconds.toString().padStart(2, "0"));
    }

    return timeParts.join(":");
  };

  useEffect(() => {
    setAlarmString(formatTime(duration));
    setAlarmDuration(duration);
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#1B5E20",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity activeOpacity={0.7} onPress={() => setShowPicker(true)}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: "#1B5E20",
            paddingBottom: 0,
            padding: 0,
            position: "relative",
          }}
        >
          {alarmString !== null ? (
            <Text
              style={{
                marginBottom: 20,
                fontSize: 48,
                fontWeight: "bold",
                color: "#C8E6C9",
              }}
            >
              {alarmString}
            </Text>
          ) : null}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPicker(true)}
            style={{
              position: "absolute",
              bottom: 40,
              right: -30,
            }}
          >
            <FontAwesome name="pencil" size={24} color="#C8E6C9" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TimerPickerModal
        initialValue={alarmDuration}
        visible={showPicker}
        setIsVisible={setShowPicker}
        Audio={audioImplementation}
        onConfirm={(pickedDuration) => {
          setAlarmString(formatTime(pickedDuration));
          setAlarmDuration(pickedDuration);
          onDurationChange(pickedDuration);
          setShowPicker(false);
        }}
        modalTitle="Set Timer"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        LinearGradient={LinearGradient}
        Haptics={hapticImplementation}
        styles={{
          theme: "dark",
        }}
        modalProps={{
          overlayOpacity: 0.2,
        }}
      />
    </View>
  );
}
