import { Request, Response } from "express";
import * as cidadeModel from "../models/cidade.models.js";
import { getRedisClient } from "../database/redis.js";
import { gerarIdCidade } from "../services/geradorId.js";

export async function listar(req: Request, res: Response) {
  const clientRedis = getRedisClient();

  const cacheCidades = await clientRedis.get("cidades:todas");

  if (cacheCidades) {
    const cidades = JSON.parse(cacheCidades);
    console.log("cache hit");
    res.json(cidades);
    return;
  }

  console.log("cache miss");
  const cidades = await cidadeModel.listarTodas();
  await clientRedis.setEx("cidades:todas", 60, JSON.stringify(cidades));
  res.json(cidades);
}

export async function buscar(req: Request, res: Response) {
  const id = req.params.id;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Id inválido" });
  }

  const cidade = await cidadeModel.buscarPorId(id);

  if (cidade) {
    res.json(cidade);
  } else {
    res.status(404).json({ message: "Cidade não encontrada" });
  }
}

export async function criar(req: Request, res: Response) {
  const { nome, estado } = req.body;

  if (!nome || !estado) {
    return res
      .status(400)
      .json({ message: "Campos nome e estado são obrigatórios" });
  }

  if (typeof nome !== "string" || typeof estado !== "string") {
    return res.status(400).json({ message: "nome e estado devem ser strings" });
  }

  try {
    const id = await gerarIdCidade();

    const cidadeCriada = await cidadeModel.criar({ nome, estado, codigo: id });
    return res.status(201).json(cidadeCriada);
  } catch (error) {
    console.error("Falha ao se comunicar com o gerador de IDs:", error);
    return res.status(502).json({
      message:
        "Não foi possível gerar o código da cidade. O serviço de IDs está indisponível.",
    });
  }
}

export async function atualizar(req: Request, res: Response) {
  const cidadeAtualizada = req.body;

  const id = req.params.id;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Id inválido" });
  }

  const cidade = await cidadeModel.atualizar(id, cidadeAtualizada);
  if (cidade) {
    res.json(cidade);
  } else {
    res.status(404).json({ message: "Cidade não encontrada" });
  }
}

export async function deletar(req: Request, res: Response) {
  const id = req.params.id;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Id inválido" });
  }

  const sucesso = await cidadeModel.deletar(id);
  if (sucesso) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Cidade não encontrada" });
  }
}

export async function contarPorEstado(req: Request, res: Response) {
  try {
    const quantidadeEstado = await cidadeModel.contarPorEstado();

    res.status(200).json(quantidadeEstado);
  } catch {
    res.status(500).json({ message: "erro interno" });
  }
}
