import mongoose from "mongoose";

const ClientPartnerSchema = new mongoose.Schema({
  nameAr: {
    type: String,
    required: true,
  },
  nameEn: {
    type: String,
    required: true,
  },
  row: {
    type: Number,
    enum: [1, 2],
    default: 1,
  },
  logoUrl: {
    type: String,
    required: false,
  }
}, { timestamps: true });

export default mongoose.models.ClientPartner || mongoose.model("ClientPartner", ClientPartnerSchema);
