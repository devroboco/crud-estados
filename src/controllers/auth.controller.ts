import { Request, Response } from "express";
import * as usuariosModels from "../models/usuarios.models.js";
import bycrypt from "bcrypt";
import { gerarToken } from "../utils/jwt.js";

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;

  const usuario = await usuariosModels.buscarPorEmail(email);

  if (!usuario) {
    return res.status(401).json({ message: "informações inválidas" });
  }

  const senhaCorreta = await bycrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    return res.status(401).json({ message: "informações inválidas" });
  }

  const token = gerarToken({ id: usuario._id, email: usuario.email });

  return res.status(200).json({ token });
}
