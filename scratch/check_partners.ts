import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const ClientPartnerSchema = new mongoose.Schema({
  nameAr: String,
  nameEn: String,
  row: Number,
  logoUrl: String,
  logoScale: Number
}, { timestamps: true });

const ClientPartner = mongoose.models.ClientPartner || mongoose.model("ClientPartner", ClientPartnerSchema);

async function check() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const partners = await ClientPartner.find();
  console.log("Partners in DB:", partners.length);
  console.log(partners);
  process.exit(0);
}

check();
