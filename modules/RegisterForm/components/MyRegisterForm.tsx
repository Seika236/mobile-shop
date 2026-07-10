import { Text, View } from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpFormData } from "@/modules/LoginForm/types/schemas/SingUpSchema";
import { MyButton } from "@/components/ui/MyButton";
import { Link } from "expo-router";
import { MyInput } from "@/components/ui/MyInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "@/modules/RegisterForm/types/schemas/SingInSchema";
import { useMutation } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";
import { UseToaster } from "@/hooks/use-toaster";
import { useEffect } from "react";
import { useAuthentificationManager } from "@/hooks/use-authentification-manager";

export function MyRegisterForm() {
  const { showSuccessToast, showErrorToast } = UseToaster();
  const { loginUser } = useAuthentificationManager();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(SignInSchema),
  });

  useEffect(() => {
    showSuccessToast("skldjfsdkjf");
  }, []);

  const { mutate } = useMutation({
    mutationFn: AuthService.authorization,
    onSuccess: (auth) => {
      loginUser({
        isAuth: true,
        refreshToken: auth.refresh_token,
        accessToken: auth.access_token,
        user: auth.user,
      });
    },
    onError: (error) => {
      console.log(error);
      showErrorToast(error.message);
    },
  });

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    mutate({ name: "User", ...data });
  };
  return (
    <View className="flex justify-center items-center w-full h-full bg-zinc-100 px-12">
      <Text className="text-black text-4xl mb-6">Authorization</Text>

      <View className="flex flex-col gap-3 w-full">
        <MyInput
          keyboardType={"email-address"}
          control={control}
          name={"email"}
          placeholder={"email"}
        />
        <MyInput
          control={control}
          name={"password"}
          placeholder={"password"}
          secureTextEntry={true}
        />
      </View>

      <MyButton onPress={handleSubmit(onSubmit)}>Submit</MyButton>

      <View className="flex flex-row gap-x-1 mt-5">
        <Text>have an account?</Text>

        <Link href={"/(public)/login"} className="text-green-600">
          login
        </Link>
      </View>
    </View>
  );
}
