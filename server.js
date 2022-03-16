import express from "express";
import cors from "cors";

import mongoDB from "./mongoose";
import contact from "./routes/contact";
import { APP_CONFIG } from "./constants";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/contact", contact);

app.listen(APP_CONFIG.PORT, () => {
  console.log("Server started at port", APP_CONFIG.PORT);
});
