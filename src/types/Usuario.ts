import { ObjectId } from "mongodb";

export interface Usuario {
  _id?: ObjectId;
  email: string;
  senha: string;
}
