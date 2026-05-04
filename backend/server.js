import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app.js";
import cloudinary from "cloudinary";
import { connection } from "./database/connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, "./config/config.env");
const result = config({
  path: configPath,
});

if (result.error) {
  console.error("Error loading config:", result.error);
}

// Connect to database after config is loaded
connection();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
