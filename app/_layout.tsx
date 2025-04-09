import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";
import { StoreProvider } from "../stores/StoreContext";

export default function RootLayout() {
  return (
    <StoreProvider>
      <StatusBar hidden={true} />

      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerShown: false,
          }}
        />
           <Stack.Screen
          name="watch-video/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      </StoreProvider>
  );
}