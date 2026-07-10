import { useEffect } from "react";
import AuthService from "@/services/AuthService";
import { useGlobalStore } from "@/store/GlobalStore";
import * as SecureStore from "expo-secure-store";
import { useAuthentificationManager } from "@/hooks/use-authentification-manager";

export function useCheckAuth() {
  const { setIsLoading } = useGlobalStore();
  const { loginUser, logoutUser } = useAuthentificationManager();
  async function checkAuth() {
    setIsLoading(true);
    try {
      const refresh_token = SecureStore.getItem("refresh_token");
      const response = await AuthService.checkAuth(refresh_token || "");
      loginUser({
        isAuth: true,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        user: response.user,
      });
    } catch (e) {
      console.log(e);
      logoutUser();
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);
}
