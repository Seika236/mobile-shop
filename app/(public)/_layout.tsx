import React from "react";

import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "@/store/AuthStore";

export default function PublicLayout() {
  const { isAuth } = useAuthStore();

  if (isAuth) {
    return <Redirect href="/(protected)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="login/index" />
      <Stack.Screen name="register/index" />
    </Stack>
  );
}
