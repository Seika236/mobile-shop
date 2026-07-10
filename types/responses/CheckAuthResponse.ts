import { IUser } from "@/types/models/IUser";

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  user: IUser;
};
