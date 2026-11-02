import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
type AuthenticatedRequest = Request & { user?: string | JwtPayload };

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
