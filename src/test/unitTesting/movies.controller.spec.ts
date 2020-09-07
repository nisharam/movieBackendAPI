
import movieCtrl from "../../api/private/v1/movies/movies.controller";
import movieSrvc from "../../appModules/movie.service";
import * as mongodb from "mongodb";
import movieDao from "../../appModules/movie.dao";
import moviesListInDb from "../movieData";
import { movieModel } from "../../appModules/movie.entity";

describe("should call the API and save the data to database", () => {
  let connection;
  let db;
  beforeAll(async () => {
    connection = await mongodb.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
    });
    db = await connection.db("movies");
  });
  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  let moviesFromDb;

  test("should return response", async () => {
    return movieSrvc.getMovies().then((res) => {
      expect(res).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ title: "Bloodshot" }),
        ])
      );
    });
  });

  test(" should have no data inside the database first, when no API is called", async () => {
    const movieAPI = movieDao.getMovie((res) => {
      expect(movieAPI).toEqual(null);
    });
  });

  test(" API called and data gets saved to the database", async () => {
    await movieDao.getMovie((res) => {
      moviesFromDb = res;
    });
    const moviesFromAPI = movieSrvc.getAllMovieList((res) => {
      expect(moviesFromAPI).toEqual(moviesFromDb);
      expect(moviesFromAPI).toHaveLength(20);
    });
  });

  test("Data should be returned from database within TTL", async () => {
    const movieAPI = movieDao.getMovie((res) => {
      expect(movieAPI).toEqual(moviesListInDb);
      jest.useFakeTimers();
      setTimeout(() => {
        expect(movieAPI).toEqual(null);
      }, 20);
    });
  });

  test("API request returns valid response after TTL expiration and check it again fetches from original source and populates intermediate database", () => {
    jest.useFakeTimers();
    setTimeout(() => {
      return movieSrvc.getMovies().then((res) => {
        expect(res).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ title: "Bloodshot" }),
          ])
        );
      });
    }, 20);
    const movieAPI = movieDao.getMovie((res) => {
      expect(movieAPI).toEqual(moviesListInDb);
    });
  });

  test("should have the same response structure", async () => {
    await movieSrvc.getAllMovieList((res, err) => {
      expect(err).toEqual(404);
      expect(res).toHaveProperty("title");
      expect(res).toHaveProperty("population");
      expect(res).toHaveProperty("video");
      expect(res).toHaveProperty("poster_path");
      expect(res).toHaveProperty(" original_language");
      expect(res).toContainEqual({
        popularity: 206.878,
        video: false,
        poster_path: "/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
        id: 338762,
        adult: false,
        backdrop_path: "/ocUrMYbdjknu2TwzMHKT9PBBQRw.jpg",
        original_language: "en",
        original_title: "Bloodshot",
        title: "Bloodshot",
        vote_average: 7.1,
        overview:
          "After he and his wife are murdered, marine Ray Garrison is resurrected by a team of scientists. Enhanced with nanotechnology, he becomes a superhuman, biotech killing machine—'Bloodshot'. As Ray first trains with fellow super-soldiers, he cannot recall anything from his former life. But when his memories flood back and he remembers the man that killed both him and his wife, he breaks out of the facility to get revenge, only to discover that there's more to the conspiracy than he thought.",
        release_date: "2020-03-05",
      });
      expect(res).toHaveLength(20);
    });
  });

  test("check differnt values to be there when the data is expired", async () => {
    return await movieSrvc.getAllMovieList((err, res) => {
      expect(res).toContainEqual({
        _id: "5ec641f6b9f9686b264e687c",
        popularity: 160,
      });
      jest.useFakeTimers();
      setTimeout(() => {
        movieSrvc.getAllMovieList((res) => {
          expect(res).toContainEqual({"_id": "5ec6422fb601196bd5923462",
          "popularity": 160,})
        })
      }, 20)
    });
  });


});
