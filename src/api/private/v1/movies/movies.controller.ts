import { Request, Response, NextFunction } from "express";
import MovieList from "../../../../appModules/movie.service";
import logger from "../../../../logger";

class MovieController {
  public getMovies(req: Request, res: Response, next: NextFunction) {
    MovieList.getAllMovieList((data: any, err: Error) => {
      if (err) {
        logger.error(" getting the error in controller", err);
      } else {
        if (data === undefined) {
          logger.error("No movies found");
        }
        else{
        return res.status(200).send({
          query: {
            expiryTime: data[0].expireAt
          }, 
            results: data,
            total: data.length   
        });
      }
      return res.status(404).send({
        query: {
          result: "No Movies found",
        }
      })

    }
    });
  }
}

export default new MovieController();
