import { config } from "dotenv";

config();

export const {
  DB_URL, DB_NAME, DB_PORT, DB_USER, DB_PASS, DB_HOST,
  NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS,
  LOG_DIR
} = process.env;