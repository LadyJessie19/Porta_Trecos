// Entity Auth

export type LoginApi = {
  token: string;
  name: string;
};

export type LoginUserPayload = {
  email: string;
  password: string;
};

export type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "advertiser" | "candidate";
  isActive?: boolean;
};

export type SuccessPayload = {
  success: boolean;
  message: string;
};

// Entity User

export type Role = "admin" | "advertiser" | "candidate";

export type User = {
  id: number;
  name: string;
  email: string;
  isActive?: boolean;
  role?: Role;
  createdAt: Date;
  updatedAt: Date;
};

export type Users = User[];

export type CreateUser = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUser = Partial<CreateUser>;

export type CurrentUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// Entity Company

export type Company = {
  id: number;
  name: string;
  city: string;
  state: string;
  address: string;
  foundedAt: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Companies = Company[];

export type CreateCompany = {
  name: string;
  city: string;
  state: string;
  address: string;
  foundedAt: string;
  description: string;
};

export type UpdateCompany = Partial<CreateCompany>;

// Entity Tecnology

export type Tecnology = {
  id: number;
  tecName: string;
  creatorsName: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Tecnologies = Tecnology[];

export type CreateTecnology = {
  tecName: string;
  creatorsName: string;
};

export type UpdateTecnology = Partial<CreateTecnology>;

// Entity Vacancy

export type Vacancy = {
  id: number;
  vacancyRole: string;
  wage: number;
  location: string;
  vacancyType: string;
  vacancyDescription: string;
  level: string;
  companyId: number;
  tecnologies: Tecnologies;
  advertiserEmail: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Vacancies = {
  vacancies: Vacancy[];
  page: number;
  pageSize: number;
  quantity: number;
};

export type CreateVacancy = {
  vacancyRole: string;
  wage: number;
  location: string;
  vacancyType: string;
  vacancyDescription: string;
  level: string;
  companyId: number;
  tecnologies: string[];
  advertiserEmail: string;
};

export type UpdateVacancy = Partial<CreateVacancy>;

export type VacancyTecnologyQuantity = {
  name: string;
  vacancies: number;
};

export type GraphicsVacancy = VacancyTecnologyQuantity[];
