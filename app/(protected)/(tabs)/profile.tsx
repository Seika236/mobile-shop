import { Text, View } from "react-native";
import { useAuthStore } from "@/store/AuthStore";
import { Avatar } from "@/components/ui/avatar";
import { MyButton } from "@/components/ui/MyButton";
import { useMutation } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";
import { UseToaster } from "@/hooks/use-toaster";
import { useAuthentificationManager } from "@/hooks/use-authentification-manager";

export default function profile() {
  const { user } = useAuthStore();
  const { logoutUser } = useAuthentificationManager();
  const { showErrorToast } = UseToaster();

  const { mutate } = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      logoutUser();
    },
    onError: (error) => {
      console.log(error);
      showErrorToast(error.message);
    },
  });

  return (
    <View className="grid gap-y-4">
      <Avatar />
      <Text className="text-white text-center">{user?.email}</Text>
      <MyButton onPress={() => mutate()}> Logout</MyButton>
    </View>
  );
}
