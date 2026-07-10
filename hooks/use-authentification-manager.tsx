import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "@/store/AuthStore";
import { IUser } from "@/types/models/IUser";

interface LoginUserProps {
  isAuth: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export function useAuthentificationManager() {
  const { setIsAuth, setAccessToken, setUser } = useAuthStore();
  function loginUser({
    user,
    accessToken,
    refreshToken,
    isAuth,
  }: LoginUserProps) {
    setIsAuth(isAuth);
    setAccessToken(accessToken);
    SecureStore.setItem("refresh_token", refreshToken);
    setUser(user);
  }

  function logoutUser() {
    setIsAuth(false);
    setAccessToken("");
    SecureStore.setItem("refresh_token", "");
    setUser(null);
  }

  return {
    loginUser,
    logoutUser,
  };
}
