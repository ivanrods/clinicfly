import axios from 'axios';

interface ApiFieldError {
  field: string;
  message: string;
}

interface ApiErrorBody {
  message?: string;
  errors?: ApiFieldError[];
}

export interface ParsedApiError {
  message: string;
  fieldErrors: Record<string, string>;
}

const DEFAULT_ERROR_MESSAGE =
  'Não foi possível concluir a operação. Tente novamente.';

export function parseApiError(
  error: unknown,
  fallback = DEFAULT_ERROR_MESSAGE,
): ParsedApiError {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    if (!error.response) {
      return {
        message: 'Falha de conexão. Verifique sua internet e tente novamente.',
        fieldErrors: {},
      };
    }

    const data = error.response.data;
    const fieldErrors: Record<string, string> = {};

    for (const issue of data?.errors ?? []) {
      if (issue.field && !fieldErrors[issue.field]) {
        fieldErrors[issue.field] = issue.message;
      }
    }

    return {
      message: data?.message ?? fallback,
      fieldErrors,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      fieldErrors: {},
    };
  }

  return {
    message: fallback,
    fieldErrors: {},
  };
}

export function getApiErrorMessage(
  error: unknown,
  fallback = DEFAULT_ERROR_MESSAGE,
): string {
  return parseApiError(error, fallback).message;
}
