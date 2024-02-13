import { AxiosResponse } from "axios";
import api from "./config";
import { CurrentUser, UpdateUser, User, Users } from "./services-utils/types";
import { defaultErros } from "./services-utils/defaultErros";

const EntityRoute = "/users";

/**
 * Returns a list of users.
 * @returns An array of users from the database.
 */
export const GetAllUsersService = async (): Promise<Users | undefined> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not available");
  }
  try {
    const response: AxiosResponse<Users> = await api.get(EntityRoute, {
      headers: {
        Authorization: `Bearer ${token}` ?? "",
      },
    });
    return response.data;
  } catch (error) {
    defaultErros(error);
  }
};

/**
 * Returns a user from the database.
 * @param id - The ID of the user to retrieve.
 * @returns An object with the user's details.
 */
export const GetOneUserService = async (
  id: number
): Promise<User | undefined> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not available");
  }
  try {
    const response: AxiosResponse<User> = await api.get(
      `${EntityRoute}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}` ?? "",
        },
      }
    );

    return response.data;
  } catch (error) {
    defaultErros(error);
  }
};

/**
 * Returns the profile of the currently logged-in user.
 * @returns An object with the current user's profile.
 */
export const ProfileUserService = async (): Promise<
  CurrentUser | undefined
> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not available");
  }
  try {
    const response: AxiosResponse<CurrentUser> = await api.get(
      `${EntityRoute}/me/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}` ?? "",
        },
      }
    );

    return response.data;
  } catch (error) {
    defaultErros(error);
  }
};

/**
 * Update a user's information.
 * @param id - The ID of the user to update.
 * @param data - The updated user data.
 * @returns true if the user's details was updated. Otherwise, returns false.
 */
export const UpdateUserService = async (
  id: number,
  data: UpdateUser
): Promise<boolean | undefined> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not available");
  }
  try {
    const response: AxiosResponse<User> = await api.patch(
      `${EntityRoute}/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}` ?? "",
        },
      }
    );

    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    defaultErros(error);
  }
};

/**
 * Soft-delete a user (isActive: false).
 * @param id - The ID of the user to soft-delete.
 * @returns true if the user's was soft-deleted. Otherwise, returns false.
 */
export const SoftDeleteUserService = async (
  id: number
): Promise<boolean | undefined> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not available");
  }
  try {
    const response: AxiosResponse<User> = await api.delete(
      `${EntityRoute}/${id}/soft-delete`,
      {
        headers: {
          Authorization: `Bearer ${token}` ?? "",
        },
      }
    );

    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    defaultErros(error);
  }
};

/**
 * Restore a soft-deleted user.
 * @param id - The ID of the user to restore.
 * @returns true indicating the success of the restoration.
 */
export const RestoreUserService = async (
  id: number
): Promise<boolean | undefined> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not available");
  }

  try {
    const response: AxiosResponse<User> = await api.post(
      `${EntityRoute}/${id}/restore`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}` ?? "",
        },
      }
    );

    if (response.status === 201) {
      return true;
    }
  } catch (error) {
    defaultErros(error);
  }
};
