import { Pressable, PressableProps, Text, View } from "react-native";
import { ReactNode } from "react";
import clsx from "clsx";

interface Props extends PressableProps {
  className?: string;
  children: ReactNode;
  type?: "black" | "simple";
}

export function MyButton({
  children,
  className,
  type = "simple",
  ...props
}: Props) {
  const buttonClassByType = {
    simple: "bg-[#47AA52] rounded-lg",
    black: "bg-black rounded-2xl",
  }[type];

  return (
    <Pressable
      {...props}
      className={clsx(
        "self-center mt-3.5  w-full py-3 font-light ",
        buttonClassByType,
        className,
      )}
    >
      <Text className="text-white text-center font-medium text-lg">
        {children}
      </Text>
    </Pressable>
  );
}
