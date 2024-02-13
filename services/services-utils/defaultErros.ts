import { isAxiosError } from "axios";

export const defaultErros = (error: unknown) => {
  if (isAxiosError(error)) {
    switch (error.response?.status) {
      case 400:
        throw new Error(
          error.response.data.message ||
            "Houve um erro na requisição. Por favor, verifique os dados enviados."
        );
      case 401:
        throw new Error(
          error.response.data.message ||
            "Você não está logado ou o seu token de autenticação não é válido. Faça o login novamente."
        );
      case 403:
        throw new Error(
          error.response.data.message ||
            "Você não tem permissão para acessar este recurso. Verifique as suas credenciais."
        );
      case 404:
        throw new Error(
          error.response.data.message ||
            "Desculpe, o item que você procura não foi encontrado."
        );
      case 429:
        throw new Error(
          error.response.data.message ||
            "Muitas solicitações. Tente novamente mais tarde."
        );
      case 500:
        throw new Error(
          error.response.data.message ||
            "O servidor encontrou um erro interno. Tente novamente mais tarde."
        );
      default:
        throw new Error(
          "Ocorreu um erro em nossos servidores. Por favor, tente novamente mais tarde."
        );
    }
  }
};
