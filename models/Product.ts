import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  images: string[];
  descriptionArabic: string;
  descriptionEnglish: string;
  category?: mongoose.Types.ObjectId | string;
  options: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    images: { type: [String], required: true, default: [] },
    descriptionArabic: { type: String, required: true },
    descriptionEnglish: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    options: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
