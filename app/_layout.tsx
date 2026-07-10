import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./globals.css";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useGlobalStore } from "@/store/GlobalStore";
import { ActivityIndicator, Text, View } from "react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";
import RnToaster from "react-native-toast-message";
import { Container } from "@/components/container";
import { useCheckAuth } from "@/hooks/use-check-auth";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isLoading } = useGlobalStore();
  useCheckAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Загрузка...</Text>
      </View>
    );
  }

  const client = new QueryClient();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={client}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Container>
            <StripeProvider
              publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISH_KEY || ""}
            >
              <Slot />
            </StripeProvider>
          </Container>
          <StatusBar style="auto" />
        </ThemeProvider>
        <RnToaster />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
