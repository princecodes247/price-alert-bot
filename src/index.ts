import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
const app = express();

import cors from "cors";
import corsOptions from "./config/corsOptions";
import sgMail from "@sendgrid/mail";
import cookieParser from "cookie-parser";
import connectToDatabase from "./utils/connectToDatabase";
import routes from "./routes";
import { PORT } from "./config";

/* Sendgrid implementation */
sgMail.setApiKey("SENDGRID_API_KEY");

// Cross Origin Resource Sharing
app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Health Check");
});

const httpServer = createServer(app);

routes(app);

connectToDatabase(() => {
  console.log(`Running on ${process.env.NODE_ENV} mode`);

  httpServer.listen(PORT);

  console.log(`Server running on port ${PORT}`);
});
