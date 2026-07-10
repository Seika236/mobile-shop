import axios from "axios";
import { authStore } from "@/store/AuthStore";
import * as SecureStore from "expo-secure-store";
import { AuthResponse } from "@/types/responses/CheckAuthResponse";

export const $api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

$api.interceptors.request.use((config) => {
  const { accessToken } = authStore.getState();
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      const { setAccessToken, setIsAuth, setUser } = authStore.getState();

      try {
        const refreshToken = SecureStore.getItem("refresh_token");

        if (!refreshToken) {
          setIsAuth(false);
          setUser(null);
          return Promise.reject(error);
        }

        const response = await axios.post<AuthResponse>(
          "http://192.168.43.97:8080/api/auth/refresh-token",
          { refreshToken },
        );

        setUser(response.data.user);
        setAccessToken(response.data.access_token);
        SecureStore.setItem("refresh_token", response.data.refresh_token);
        originalRequest.headers["Authorization"] =
          `Bearer ${response.data.access_token}`;
        return $api(originalRequest);
      } catch (error) {
        setIsAuth(false);
        setUser(null);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
