import React, { createContext, useContext, useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import Papa from "papaparse";
import { Asset } from "expo-asset";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Modelo de Quote
class Quote {
  constructor(author, quote) {
    this.author = author || "Anonymous";
    this.quote = quote;
    this.unlocked = false;
    this.date = undefined;
    this.isFavourite = false;
  }
}
const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("AsyncStorage cleared successfully!");
  } catch (error) {
    console.error("Failed to clear AsyncStorage:", error);
  }
};
// Función para guardar en AsyncStorage
const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("@quotes", JSON.stringify(value));
  } catch (e) {
    console.error("Error saving data", e);
  }
};

// Función para obtener datos de AsyncStorage
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("@quotes");
    return value ? JSON.parse(value) : [];
  } catch (e) {
    console.error("Error reading value", e);
    return [];
  }
};

// Cargar quotes desde CSV
async function loadQuotes() {
  try {
    let fileContent;

    if (Platform.OS === "web") {
      const response = await fetch("/quotes.csv");
      fileContent = await response.text();
    } else {
      const asset = Asset.fromModule(require("../assets/quotes.csv"));
      await asset.downloadAsync();
      const assetUri = asset.localUri || asset.uri;
      const fileUri = FileSystem.documentDirectory + "quotes.csv";

      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        await FileSystem.copyAsync({
          from: assetUri,
          to: fileUri,
        });
      }
      fileContent = await FileSystem.readAsStringAsync(fileUri);
    }

    const { data } = Papa.parse(fileContent, { header: true });
    return data.map((row) => new Quote(row.Author, row.Quote));
  } catch (error) {
    console.error("Error loading quotes:", error);
    return [];
  }
}

// Crear contexto
const QuotesContext = createContext();

// Proveedor del contexto
export function QuotesProvider({ children }) {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    //clearAsyncStorage();
    getData().then((storedQuotes) => {
      if (storedQuotes.length > 0) {
        setQuotes(storedQuotes);
      } else {
        loadQuotes().then((loadedQuotes) => {
          setQuotes(loadedQuotes);
          storeData(loadedQuotes);
        });
      }
    });
  }, []);

  function getRandomQuote() {
    const lockedQuotes = quotes.filter((quote) => !quote.unlocked);
    if (lockedQuotes.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * lockedQuotes.length);
    const randomQuote = {
      ...lockedQuotes[randomIndex],
      unlocked: true,
      date: new Date(),
    };

    setQuotes((prevQuotes) => {
      const updatedQuotes = prevQuotes.map((quote) =>
        quote === lockedQuotes[randomIndex] ? randomQuote : quote
      );
      storeData(updatedQuotes);
      return updatedQuotes;
    });

    return randomQuote;
  }

  function getUnlockedQuotes() {
    return quotes.filter((quote) => quote.unlocked);
  }
  function setFavouriteQuote(quote) {
    setQuotes((prevQuotes) => {
      const updatedQuotes = prevQuotes.map((q) =>
        q === quote ? { ...q, isFavourite: !q.isFavourite } : q
      );
      storeData(updatedQuotes);
      return updatedQuotes;
    });
  }
  function getFavouriteQuotes() {
    return quotes.filter((quote) => quote.favourite);
  }
  return (
    <QuotesContext.Provider
      value={{
        quotes,
        getRandomQuote,
        getUnlockedQuotes,
        setFavouriteQuote,
        getFavouriteQuotes,
      }}
    >
      {children}
    </QuotesContext.Provider>
  );
}

// Hook para usar el contexto
export function useQuotes() {
  return useContext(QuotesContext);
}
