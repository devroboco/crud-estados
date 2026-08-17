import { Request, Response } from "express";
import { getChannel } from "../database/rabbitmq.js";

export async function gerarRelatorio(req: Request, res: Response) {
  try {
    const channel = getChannel();

    const message = {
      solicitadoPor: req.usuario,
      criadoEm: new Date().toISOString(),
      estadoFiltro: req.body.estado || null,
    };

    const buffer = Buffer.from(JSON.stringify(message));

    channel.sendToQueue("relatorios", buffer);

    res.status(202).json({ message: "relatorio publicado na fila" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao publicar relatório na fila" });
  }
}
