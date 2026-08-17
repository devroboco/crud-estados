import { ObjectId } from "mongodb";

export interface Cidade {
  _id?: ObjectId;
  nome: string;
  estado: string;
  codigo: string;
}
