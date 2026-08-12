import { Request, Response } from 'express';
import * as cidadeModel from '../models/cidade.models.js';

export async function listar(req: Request, res: Response) {
    const cidades = await cidadeModel.listarTodas();
    res.json(cidades);
}

export async function buscar(req: Request, res: Response) {
    const id = req.params.id

    if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Id inválido'});
    }

    const cidade = await cidadeModel.buscarPorId(id);

    if (cidade) {
        res.json(cidade);
    } else {
        res.status(404).json({ message: "Cidade não encontrada" });
    }
}

export async function criar(req: Request, res: Response) {
    const {nome, estado} = req.body;

    if (!nome || !estado) {
        return res.status(400).json({ message: 'Campos nome e estado são obrigatórios' });
    }

    if (typeof nome !== 'string' || typeof estado !== 'string') {
        return res.status(400).json({ message: 'nome e estado devem ser strings' });
    }

    const cidadeCriada = await cidadeModel.criar({ nome, estado });
    res.status(201).json(cidadeCriada);
}

export async function atualizar(req: Request, res: Response) {
    const cidadeAtualizada = req.body;

    const id = req.params.id

    if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Id inválido'});
    }

    const cidade = await cidadeModel.atualizar(id, cidadeAtualizada);
    if (cidade) {
        res.json(cidade);
    } else {
        res.status(404).json({ message: "Cidade não encontrada" });
    }
}

export async function deletar(req: Request, res: Response) {
    const id = req.params.id

    if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Id inválido'});
    }
    
    const sucesso = await cidadeModel.deletar(id);
    if (sucesso) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: "Cidade não encontrada" });
    }
} 