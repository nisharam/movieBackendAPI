import express from "express";
import bodyParser from "body-parser";
import v1 from "./api/private/index";
import moongoose from "mongoose";
import logger from './logger';


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

moongoose
  .connect(
    "mongodb://localhost:27017/movies",
    { useNewUrlParser: true },
  )
  .catch((err) => {
    logger.info(" error connecting to database", err);
  });




app.use("/public", v1 );


export default app;