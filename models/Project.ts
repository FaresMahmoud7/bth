import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  name: string;
  images: string[];
  descriptionArabic: string;
  descriptionEnglish: string;
  category?: mongoose.Types.ObjectId | string;
  options: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
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

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
