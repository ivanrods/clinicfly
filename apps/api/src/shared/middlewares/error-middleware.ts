import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { UniqueConstraintError } from 'sequelize';
import { AppError } from '../errors/app-error';

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Dados inválidos',
      errors: err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({ message: 'Registro já cadastrado' });
  }

  console.error(err);
  return res.status(500).json({ message: 'Erro interno do servidor' });
}
