import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
  nameAr: string;
  nameEn: string;
  type: 'product' | 'project';
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
  {
    nameAr: { type: String, required: true },
    nameEn: { type: String, required: true },
    type: { type: String, enum: ['product', 'project'], required: true },
    image: { type: String },
  },
  { timestamps: true }
);

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
