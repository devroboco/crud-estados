import { Request, Response } from "express";
import bycrypt from "bcrypt";
import * as usuariosModels from "../models/usuarios.models.js";

export async function cadastrar(req: Request, res: Response) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "email ou senha não preenchidos" });
  }

  const emailExistente = await usuariosModels.buscarPorEmail(email);

  if (emailExistente) {
    return res.status(409).json({ message: "email já cadastrado" });
  }

  const hash = await bycrypt.hash(senha, 10);

  const usuarioCriado = await usuariosModels.criar({ email, senha: hash });

  const { _id } = usuarioCriado;

  res.status(201).json({ _id, email });
}
