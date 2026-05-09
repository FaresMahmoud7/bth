import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductRequest extends Document {
  name: string;
  phone: string;
  email?: string;
  message: string;
  productName: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductRequestSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: false },
    message: { type: String, required: true },
    productName: { type: String, required: true },
  },
  { timestamps: true }
);

const ProductRequest: Model<IProductRequest> = mongoose.models.ProductRequest || mongoose.model<IProductRequest>('ProductRequest', ProductRequestSchema);

export default ProductRequest;
