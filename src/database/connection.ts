import { MongoClient, Db } from 'mongodb';

const uri = 'mongodb://localhost:27017'; 
const client = new MongoClient(uri);

let db: Db;

export async function conectar(): Promise<void> {
    await client.connect();
    db = client.db('crud-cidades');
    console.log('Conectado ao banco de dados MongoDB');
}

export function getDb(): Db {
    if (!db) {
        throw new Error('Banco de dados não conectado. Chame conectar() primeiro.');
    }
    return db;
}