import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient"; // or `import LinearGradient from "react-native-linear-gradient"`
import { useEffect, useState } from "react";
import * as Haptics from "expo-haptics"; // for haptic feedback
import { View, Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
interface TimePickerProps {
  onDurationChange: (duration: {
    hours: number;
    minutes: number;
    seconds: number;
  }) => void;
  duration: { hours: number; minutes: number; seconds: number };
}

export function TimePicker({ onDurationChange, duration }: TimePickerProps) {
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
        backgroundColor: "#514242",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity activeOpacity={0.7} onPress={() => setShowPicker(true)}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: "#1B5E20",
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
          ></TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TimerPickerModal
        initialValue={alarmDuration}
        visible={showPicker}
        setIsVisible={setShowPicker}
        Audio={Audio}
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
        Haptics={Haptics}
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
