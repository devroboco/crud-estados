import { getDb } from "../database/connection.js";
import { Usuario } from "../types/Usuario.js";
import { Collection } from "mongodb";

function getCollection(): Collection<Usuario> {
  return getDb().collection<Usuario>("usuarios");
}

export async function criar(usuario: Omit<Usuario, "_id">): Promise<Usuario> {
  const collection = getCollection();

  const resultado = await collection.insertOne(usuario);

  const novoUsuario = { _id: resultado.insertedId, ...usuario };

  return novoUsuario;
}

export async function buscarPorEmail(
  email: string,
): Promise<Usuario | undefined> {
  const collection = getCollection();

  const usuario = await collection.findOne({ email: email });

  return usuario ?? undefined;
}
