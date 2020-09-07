import express from "express";
import movieRoutes from "./movies/movies.route";

const route = express.Router();

route.use("/list", movieRoutes);

export default route;
