import { Stack } from "expo-router";
import { QuotesProvider } from "../lib/Utils";
import { useEffect } from "react";

export default function RootLayout() {
  return (
    <QuotesProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </QuotesProvider>
  );
}
