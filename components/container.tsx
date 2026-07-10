import { View } from "react-native";
import { ReactNode } from "react";
import { useTheme } from "@react-navigation/core";

interface Props {
  children: ReactNode;
}

export function Container({ children }: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        paddingHorizontal: 8,
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      {children}
    </View>
  );
}
