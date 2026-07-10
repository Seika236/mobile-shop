import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import clsx from "clsx";
import { useRouter } from "expo-router";

interface Props {
  title: string;
  isShowCartButton?: boolean;
}

export function Header({ title, isShowCartButton }: Props) {
  const { top } = useSafeAreaInsets();
  const { navigate } = useRouter();

  const onPressCartButton = () => {
    navigate("/cart");
  };

  return (
    <View
      style={{ marginTop: top }}
      className={clsx(
        "flex flex-row px-2 items-center text-xl h-20",
        isShowCartButton && "justify-between",
      )}
    >
      <Text className={"text-white text-2xl"}>{title}</Text>
      {isShowCartButton && (
        <Pressable
          onPress={onPressCartButton}
          className="flex items-center justify-center"
        >
          <Ionicons
            className="w-auto h-10"
            size={28}
            name="cart"
            color={"white"}
          />
        </Pressable>
      )}
    </View>
  );
}
