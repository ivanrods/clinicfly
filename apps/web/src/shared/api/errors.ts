import axios from 'axios';

interface ApiErrorBody {
  message?: string;
}

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Não foi possível concluir a operação. Tente novamente.',
): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    if (!error.response) {
      return 'Falha de conexão. Verifique sua internet e tente novamente.';
    }

    return error.response.data?.message ?? fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}
