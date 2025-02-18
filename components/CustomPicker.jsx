import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const options = [
  { label: "All", value: "all" },
  { label: "Favourites", value: "favourite" },
];

export default function CustomPicker({ onValueChange }) {
  const [selectedValue, setSelectedValue] = useState(options[0].value);
  const [modalVisible, setModalVisible] = useState(false);

  const handleValueChange = (value) => {
    setSelectedValue(value);
    if (onValueChange) {
      let isFavourite;
      if (value === options[0].value) isFavourite = false;
      else isFavourite = true;
      onValueChange(isFavourite); // Llamar al callback cada vez que cambie el valor
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.pickerText}>
          {options.find((opt) => opt.value === selectedValue)?.label}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#1B5E20" />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    handleValueChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: "#A5D6A7",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    width: 125,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  pickerText: {
    fontWeight: "bold",
    color: "#1B5E20",
    fontSize: 16,
    paddingRight: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    width: 200,
  },
  item: {
    padding: 15,
  },
  itemText: {
    fontSize: 18,
    color: "#000",
  },
});
