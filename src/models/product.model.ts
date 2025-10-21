import { Document, model, Model, Schema, Types } from "mongoose";

// Interface
export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

// Schema
const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 500,
    },
    price: { type: Number, required: true, default: 0, min: 0 },
    image: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    stock: { type: Number, required: true, default: 0, min: 0 },
  },
  { timestamps: true, versionKey: false }
);

export default model<IProduct, Model<IProduct>>("Product", ProductSchema);
