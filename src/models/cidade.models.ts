import { Cidade } from "../types/Cidade.js";
import { getDb } from "../database/connection.js";
import { Collection } from "mongodb";
import { ObjectId } from "mongodb";

function getCollection(): Collection<Cidade> {
  return getDb().collection<Cidade>("cidades");
}

export async function listarTodas(): Promise<Cidade[]> {
  const collection = getCollection();

  const cidades = await collection.find().toArray();

  return cidades;
}

export async function buscarPorId(id: string): Promise<Cidade | undefined> {
  if (!ObjectId.isValid(id)) {
    return undefined;
  }

  const collection = getCollection();

  const objectId = new ObjectId(id);

  const cidade = await collection.findOne({ _id: objectId });

  return cidade ?? undefined;
}

export async function criar(novaCidade: Omit<Cidade, "_id">): Promise<Cidade> {
  const collection = getCollection();

  const resultado = await collection.insertOne(novaCidade);

  const cidade = { _id: resultado.insertedId, ...novaCidade };

  return cidade;
}

export async function atualizar(
  id: string,
  cidadeAtualizada: Partial<Omit<Cidade, "_id">>,
): Promise<Cidade | undefined> {
  if (!ObjectId.isValid(id)) {
    return undefined;
  }

  const collection = getCollection();
  const objectId = new ObjectId(id);

  const cidade = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: cidadeAtualizada },
    { returnDocument: "after" },
  );

  return cidade ?? undefined;
}

export async function deletar(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) {
    return false;
  }

  const collection = getCollection();

  const objectId = new ObjectId(id);

  const resultado = await collection.deleteOne({ _id: objectId });

  return resultado.deletedCount > 0;
}

export async function contarPorEstado() {
  const collection = getCollection();

  const resultado = await collection
    .aggregate([{ $group: { _id: "$estado", total: { $sum: 1 } } }])
    .toArray();

  return resultado;
}
