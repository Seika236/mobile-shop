import { $api } from "@/http";
import { AuthResponse } from "@/types/responses/CheckAuthResponse";
import { AuthorizationUserRequest } from "@/types/requests/AuthorizationUserRequest";
import { LoginUserRequest } from "@/types/requests/LoginUserRequest";

class AuthService {
  async checkAuth(refresh_token: string): Promise<AuthResponse> {
    const response = await $api.post<AuthResponse>("/auth/refresh-token", {
      refresh_token,
    });
    return response.data;
  }

  async authorization(data: AuthorizationUserRequest): Promise<AuthResponse> {
    const response = await $api.post<AuthResponse>("/auth/register", data);
    return response.data;
  }

  async login(data: LoginUserRequest): Promise<AuthResponse> {
    const response = await $api.post<AuthResponse>("/auth/login", data);
    return response.data;
  }

  async logout(): Promise<void> {
    await $api.post<void>("/auth/logout");
  }
}

export default new AuthService();
