import express from "express";
import v1Route from './v1/index';


const route = express.Router();

route.use("/api/v1", v1Route);

export default route;