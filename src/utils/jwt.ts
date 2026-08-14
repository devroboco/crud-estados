import jwt from "jsonwebtoken";

const segredo = process.env.JWT_SECRET as string;

export function gerarToken(payload: object): string {
  return jwt.sign(payload, segredo, { expiresIn: "1h" });
}

export function verificarToken(token: string) {
  return jwt.verify(token, segredo);
}
