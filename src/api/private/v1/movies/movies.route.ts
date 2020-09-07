import express from "express";
import movieCtrlr from './movies.controller';

const router = express.Router();

router.use('/movies', movieCtrlr.getMovies);
export default router;