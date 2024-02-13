import { AxiosResponse } from "axios";
import { defaultErros } from "./services-utils/defaultErros";
import { Vacancies, Vacancy, CreateVacancy, UpdateVacancy, GraphicsVacancy } from "./services-utils/types";
import api from "./config";

const EntityRoute = "/vacancies";

/**
 * It creates a vacancy at the database, but only if the logged user is an advertiser.
 * @param payload is an object with vacancy fields.
 * @returns true if the vacancy is created, otherwise it throws an error.
 */
export const CreateVacancyService = async (payload: CreateVacancy) => {
   const token = localStorage.getItem("token");

   if (!token) {
      throw new Error("Token not available");
   }
   try {
      const response: AxiosResponse<Vacancy | undefined> = await api.post(EntityRoute, payload, {
         headers: {
            Authorization: `Bearer ${token}` ?? "",
         },
      });
      if (response.status === 201) {
         return true;
      }
   } catch (error) {
      defaultErros(error);
   }
};

/**
 * Update a vacancy's information, but only if the logged user is an admin or the advertiser that owns the vacancy.
 * @param id - The ID of the vacancy to update.
 * @param data - The updated vacancy data.
 * @returns true if the vacancy was updated, otherwise it throws an error.
 */
export const UpdateVacancyService = async (id: number, data: UpdateVacancy): Promise<boolean | undefined> => {
   const token = localStorage.getItem("token");

   if (!token) {
      throw new Error("Token not available");
   }
   try {
      const response: AxiosResponse<Vacancy> = await api.patch(`${EntityRoute}/${id}`, data, {
         headers: {
            Authorization: `Bearer ${token}` ?? "",
         },
      });

      if (response.status === 200) {
         return true;
      }
   } catch (error) {
      defaultErros(error);
   }
};

/**
 * Returns a list of vacancies.
 * @param page Optional parameter.
 * @param limit Optional parameter.
 * @param tech Optional parameter.
 * @param role Optional parameter.
 * @param wageMax Optional parameter.
 * @param wageMin Optional parameter.
 * @param type Optional parameter.
 * @param local Optional parameter.
 * @param description Optional parameter.
 * @returns An array of vacancies from the database.
 */
export const GetAllVacanciesService = async (
   page?: number,
   limit?: number,
   tech?: string,
   role?: string,
   wageMax?: number,
   wageMin?: number,
   type?: string,
   local?: string,
   description?: string
): Promise<Vacancies> => {
   const params: { [key: string]: any } = {
      page,
      limit,
      tech,
      role,
      wageMax,
      wageMin,
      type,
      local,
      description,
   };

   Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);

   try {
      const response: AxiosResponse<Vacancies> = await api.get(EntityRoute, {
         headers: {},
         params,
      });
      return response.data;
   } catch (error) {
      defaultErros(error);

      return {
         vacancies: [],
         page: 0,
         pageSize: 0,
         quantity: 0,
      };
   }
};

/**
 * Get a specific vacancy from the database by its ID, company name and/or advertiser name.
 * @param id - The ID of the vacancy to retrieve.
 * @param companyName It's an optional parameter. It searches for vacancies from the given company.
 * @param advertiserName It's an optional parameter. It searches for vacancies from the given advertiser.
 * @returns an object with the found vacancy.
 */
export const GetOneVacancyService = async (id: number, companyName?: string, advertiserName?: string): Promise<Vacancy | undefined> => {
   const token = localStorage.getItem("token");

   if (!token) {
      throw new Error("Token not available");
   }

   const params: { [key: string]: any } = {
      companyName,
      advertiserName,
   };

   Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);

   try {
      const response: AxiosResponse<Vacancy> = await api.get(`${EntityRoute}/${id}`, {
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
 * delete a vacancy if the logged user is an admin or the advertiser that owns the vacancy.
 * @param id - The ID of the vacancy to delete.
 * @returns true if the vacancy was successfully deleted.
 */
export const DeleteVacancyService = async (id: number): Promise<boolean | undefined> => {
   const token = localStorage.getItem("token");

   if (!token) {
      throw new Error("Token not available");
   }
   try {
      const response: AxiosResponse<Vacancy> = await api.delete(`/${EntityRoute}/${id}`, {
         headers: {
            Authorization: `Bearer ${token}` ?? "",
         },
      });
      if (response.status === 200) {
         return true;
      }
   } catch (error) {
      defaultErros(error);
   }
};

/**
 * Retrieves graphics data for vacancies.
 * @returns The graphics data for vacancies.
 */
export const GetDataGraphicsVacanciesService = async (): Promise<GraphicsVacancy | undefined> => {
   try {
      const response: AxiosResponse<GraphicsVacancy> = await api.get(`${EntityRoute}/all/graphics`);

      return response.data;
   } catch (error) {
      defaultErros(error);
   }
};

export const GetPublicVacanciesService = async (
   page?: number,
   limit?: number,
   tech?: string,
   role?: string,
   wageMax?: string,
   wageMin?: string,
   type?: string,
   local?: string,
   description?: string
): Promise<Vacancies | undefined> => {
   try {
      const params: { [key: string]: any } = {
         page,
         limit,
         tech,
         role,
         wageMax,
         wageMin,
         type,
         local,
         description,
      };

      Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);

      const response: AxiosResponse<Vacancies> = await api.get(EntityRoute, {
         params,
      });

      return response.data;
   } catch (error) {
      defaultErros(error);
   }
};
