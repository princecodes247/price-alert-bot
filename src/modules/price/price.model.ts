import { Schema, Document, model, Types } from "mongoose";
import { ItemTypeEnum } from "./price.type";

export interface IItem extends Document {}

const itemSchema = new Schema({});

export default model<IItem>("Item", itemSchema);
