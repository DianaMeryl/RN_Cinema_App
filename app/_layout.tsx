import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";
import { StoreProvider } from "../stores/StoreContext";
import { Text } from 'react-native';

export default function RootLayout() {
  return (
    <StoreProvider>
      <StatusBar hidden={true} />

      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          //   headerTitle: () => (
          //     <Text style={{
          //       fontSize: 28,
          //       fontWeight: 'bold',
          //       color: '#9bddff',
          //       textAlign: 'center',
          //       textAlignVertical: 'center',
          //       width: '100%',
          //       textTransform: 'uppercase',
          //     }}>
          //       Cinema
          //     </Text>
          //   ),
          //   headerStyle: {
          //     backgroundColor: "#800080", 
          // },
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