import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, FlatList, View, Pressable } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Screen } from "../../components/Screen";
import { useQuotes } from "../../lib/Utils";
import { Ionicons } from "@expo/vector-icons";
import CustomPicker from "../../components/CustomPicker";

export default function Rewards() {
  const { getUnlockedQuotes, setFavouriteQuote } = useQuotes();
  const [unlockedQuotes, setUnlockedQuotes] = useState([]);
  const [favourite, setFavourite] = useState(false);

  const handleValueChange = (newValue) => {
    setFavourite(newValue);
  };

  useFocusEffect(
    useCallback(() => {
      setUnlockedQuotes(
        getUnlockedQuotes().sort((a, b) => new Date(b.date) - new Date(a.date))
      );
    }, [getUnlockedQuotes])
  );

  return (
    <Screen style={styles.screen}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
        }}
      >
        <Text style={styles.title}>Rewards</Text>
        <CustomPicker onValueChange={handleValueChange} />
      </View>

      {unlockedQuotes.length === 0 ? (
        <Text style={styles.noQuotesText}>No unlocked quotes available.</Text>
      ) : (
        <FlatList
          data={
            favourite
              ? unlockedQuotes.filter((quote) => quote.isFavourite)
              : unlockedQuotes
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.author}>{item.author}</Text>
              <Text style={styles.quote}>{item.quote}</Text>
              <Pressable onPress={() => setFavouriteQuote(item)}>
                <Ionicons
                  name={item.isFavourite ? "star" : "star-outline"}
                  size={24}
                  color="#1B5E20"
                />
              </Pressable>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 20,
    fontSize: 32,
    fontWeight: "bold",
    color: "#C8E6C9",
    textAlign: "center",
    marginBottom: 20,
  },
  screen: {
    flex: 1,
    backgroundColor: "#008000",
    padding: 20,
  },
  noQuotesText: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#A5D6A7",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  author: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1B5E20",
    textAlign: "center",
  },
  quote: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#1B5E20",
    textAlign: "center",
    marginTop: 10,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  topText: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
