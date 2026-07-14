import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import FormSchema from "../src/models/FormSchema.model.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/forma_ai");

  const filePath = path.join(__dirname, "../../docs/sample-form-schema.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);

  await FormSchema.findOneAndUpdate({ name: data.name }, data, { upsert: true, new: true });

  console.log(`Seeded form schema: ${data.name}`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
