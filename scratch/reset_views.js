import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env
dotenv.config({ path: path.join(__dirname, '../.env') });

async function resetViews() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI not found in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;
    
    const result = await db.collection('pageviews').deleteMany({});
    console.log(`Successfully deleted ${result.deletedCount} page view records.`);
    
    process.exit(0);
  } catch (error) {
    console.error("Error resetting views:", error);
    process.exit(1);
  }
}

resetViews();
