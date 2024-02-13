import { AxiosResponse } from "axios";
import { defaultErros } from "./services-utils/defaultErros";
import {
  Companies,
  Company,
  CreateCompany,
  UpdateCompany,
} from "./services-utils/types";
import api from "./config";

const EntityRoute = "/companies";

/**
 * It creates a company at the database, but only if the logged user is an admin.
 * @param payload is an object with company fields.
 * @returns true if the company is created, otherwise it throws an error.
 */
export const CreateCompanyService = async (payload: CreateCompany) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not available");
  }
  try {
    const response: AxiosResponse<Company | undefined> = await api.post(
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
 * Update a company's information, but only if the logged user is an admin.
 * @param id - The ID of the company to update.
 * @param data - The updated company data.
 * @returns true if the company was updated, otherwise it throws an error.
 */
export const UpdateCompanyService = async (
  id: number,
  data: UpdateCompany
): Promise<boolean | undefined> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not available");
  }
  try {
    const response: AxiosResponse<Company> = await api.patch(
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
 * Returns a list of companies.
 * @param name It's an optional parameter. It searches for companies with the given name.
 * @param page It's an optional parameter. Is meant to paginate the companies array.
 * @param size It's an optional parameter. Is meant to place a limit in the companies array.
 * @returns An array of companies from the database.
 */
export const GetAllCompaniesService = async (
  name?: string,
  page?: number,
  size?: number
): Promise<Companies | undefined> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not available");
  }

  const params: { [key: string]: any } = {
    name,
    page,
    size,
  };

  Object.keys(params).forEach(
    (key) => params[key] === undefined && delete params[key]
  );

  try {
    const response: AxiosResponse<Companies> = await api.get(EntityRoute, {
      headers: {
        Authorization: `Bearer ${token}` ?? "",
      },
      params,
    });
    return response.data;
  } catch (error) {
    defaultErros(error);
  }
};

/**
 * Get a specific company from the database by its ID.
 * @param id - The ID of the company to retrieve.
 * @returns an object with the found company.
 */
export const GetOneCompanyService = async (
  id: number
): Promise<Company | undefined> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not available");
  }
  try {
    const response: AxiosResponse<Company> = await api.get(
      `${EntityRoute}/${id}/vacancies`,
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
 * delete a company if the logged user is an admin.
 * @param id - The ID of the company to delete.
 * @returns true if the company was succefully deleted.
 */
export const DeleteCompanyService = async (
  id: number
): Promise<boolean | undefined> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not available");
  }
  try {
    const response: AxiosResponse<Company> = await api.delete(
      `/${EntityRoute}/${id}`,
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
