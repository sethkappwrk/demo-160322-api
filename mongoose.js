import mongoose from "mongoose";

import { APP_CONFIG } from "./constants";

mongoose.connect(APP_CONFIG.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection connected)
db.on(
  "connected",
  console.error.bind(console, "MongoDB connection connected:")
);

// Bind connection to error event (to get notification of connection disconnected)
db.on(
  "disconnected",
  console.error.bind(console, "MongoDB connection disconnected:")
);

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default db;
