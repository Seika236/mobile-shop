import { TabRoutesConstants } from "@/constants/TabRouteConstants";
import { Redirect, Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthStore } from "@/store/AuthStore";
import { Header } from "@/components/header";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function ProtectedLayout() {
  const colorScheme = useColorScheme();
  const { isAuth } = useAuthStore();

  if (!isAuth) {
    return <Redirect href="/(public)/login" />;
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          tabBarButton: HapticTab,
          headerShown: true,
        }}
      >
        {TabRoutesConstants.map((route) => (
          <Tabs.Screen
            key={route.name}
            name={route.name}
            options={{
              header: () => {
                if (route.name === "index") {
                  return <Header title={"Home"} isShowCartButton={true} />;
                }
                return <Header title={route.name} />;
              },
              title: route.title,
              tabBarIcon: route.icon,
            }}
          />
        ))}
      </Tabs>
    </>
  );
}
