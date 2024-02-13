import { AxiosResponse } from "axios";
import api from "./config";
import { defaultErros } from "./services-utils/defaultErros";
import {
  CreateUserPayload,
  LoginApi,
  LoginUserPayload,
} from "./services-utils/types";

/**
 * Attempts to log in the user and store the token if the credentials are correct.
 * @param payload - An object with email and password fields.
 * @returns true if the user credentials are correct; otherwise, it throws an error.
 */
export const LoginService = async (payload: LoginUserPayload) => {
  try {
    const userData: AxiosResponse<LoginApi> = await api.post(
      "/auth/login",
      payload
    );
    const { token } = userData.data;

    localStorage.setItem("token", token);
    api.defaults.headers.Authorization = token;

    return { token };
  } catch (error) {
    defaultErros(error);
  }
};

/**
 * It creates a user at the database.
 * @param payload is an object with email, password and name fields. Role is an optional field.
 * @returns true if the user is created, otherwise it throws an error.
 */
export const CreateUserService = async (payload: CreateUserPayload) => {
  try {
    const response: AxiosResponse<{ message: string }> = await api.post(
      "/auth/register",
      payload
    );
    if (response.status === 201) {
      return true;
    }
  } catch (error) {
    defaultErros(error);
  }
};
