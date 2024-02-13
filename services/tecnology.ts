import { AxiosResponse } from "axios";
import { defaultErros } from "./services-utils/defaultErros";
import {
  Tecnologies,
  Tecnology,
  CreateTecnology,
  UpdateTecnology,
} from "./services-utils/types";
import api from "./config";

const EntityRoute = "/tecnologies";

/**
 * It creates a tecnology at the database, but only if the logged user is an admin.
 * @param payload is an object with tecName and creatorsName attributes.
 * @returns true if the tecnology is created, otherwise it throws an error.
 */
export const CreateTecnologyService = async (payload: CreateTecnology) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not available");
  }
  try {
    const response: AxiosResponse<Tecnology | undefined> = await api.post(
      EntityRoute,
      payload,
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

/**
 * Update a tecnology's information, but only if the logged user is an admin.
 * @param id - The ID of the tecnology to update.
 * @param data - The updated tecnology data.
 * @returns true if the tecnology was updated, otherwise it throws an error.
 */
export const UpdateTecnologyService = async (
  id: number,
  data: UpdateTecnology
): Promise<boolean | undefined> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not available");
  }
  try {
    const response: AxiosResponse<Tecnology> = await api.patch(
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
 * Returns a list of tecnologies.
 * @param name It's an optional parameter. It searches for tecnologies with the given name.
 * @param page It's an optional parameter. Is meant to paginate the tecnologies array.
 * @param size It's an optional parameter. Is meant to place a limit in the tecnologies array.
 * @returns An array of tecnologies from the database.
 */
export const GetAllTecnologiesService = async (
  name?: string,
  page?: number,
  size?: number
): Promise<Tecnologies | undefined> => {

  const params: { [key: string]: any } = {
    name,
    page,
    size,
  };

  Object.keys(params).forEach(
    (key) => params[key] === undefined && delete params[key]
  );

  try {
    const response: AxiosResponse<Tecnologies> = await api.get(EntityRoute, {
      headers: {

      },
      params,
    });
    return response.data;
  } catch (error) {
    defaultErros(error);
  }
};

/**
 * Get a specific tecnology from the database by its ID.
 * @param id - The ID of the tecnology to retrieve.
 * @returns an object with the found tecnology.
 */
export const GetOneTecnologyService = async (
  id: number
): Promise<Tecnology | undefined> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not available");
  }
  try {
    const response: AxiosResponse<Tecnology> = await api.get(
      `${EntityRoute}/${id}/one`,
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
 * delete a tecnology if the logged user is an admin.
 * @param id - The ID of the tecnology to delete.
 * @returns true if the tecnology was succefully deleted.
 */
export const DeleteTecnologyService = async (
  id: number
): Promise<boolean | undefined> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not available");
  }
  try {
    const response: AxiosResponse<Tecnology> = await api.delete(
      `${EntityRoute}/${id}`,
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
 * Searches for the parameter at the tecnologies database.
 * @param name It searches for tecnologies with the given name.
 * @returns An array with the tecnologies that matches with the current name parameter.
 */
export const SearchTecnologyService = async (
  name: string
): Promise<Tecnology | undefined> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not available");
  }

  try {
    const response: AxiosResponse<Tecnology> = await api.get(
      `${EntityRoute}/search`,
      {
        headers: {
          Authorization: `Bearer ${token}` ?? "",
        },
        params: { name },
      }
    );
    return response.data;
  } catch (error) {
    defaultErros(error);
  }
};
