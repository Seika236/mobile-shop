import { Text, TextInput, TextInputProps, View } from "react-native";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import cl from "clsx";

interface Props<T extends FieldValues> extends Omit<
  TextInputProps,
  "onChange" | "onChangeText" | "value"
> {
  control: Control<T>;
  name: FieldPath<T>;
}

export function MyInput<T extends FieldValues>({
  control,
  name,
  className,
  ...props
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <View className={cl("w-full rounded-lg", "bg-white", className)}>
            <TextInput
              autoCapitalize="none"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholderTextColor="#9ca3af"
              className={cl("text-black border text-base px-2 h-12 rounded-lg")}
              {...props}
            ></TextInput>
            {error && <Text className="text-red-600">{error.message}</Text>}
          </View>
        </>
      )}
    />
  );
}
