import { Request, Response, NextFunction } from "express";
import { verificarToken } from "../utils/jwt.js";

export function autenticar(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "token inexistente" });
  }

  const token = header.split(" ")[1];

  try {
    const payload = verificarToken(token);
    req.usuario = payload;
    next();
  } catch {
    return res.status(401).json({ message: "token incorreto" });
  }
}
