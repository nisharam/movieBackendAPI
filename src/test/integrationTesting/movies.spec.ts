import request from "supertest";
import app from "../../app";
import moviesListInDb from "../movieData";
import { movieModel } from "../../appModules/movie.entity";
import * as mongodb from "mongodb";


describe(" calling the api to get the data", () => {
   
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
  
    test.only(' save the data after calling the API', async() => {
      const response = await request(app).get("/public/api/v1/list/movies");
      // expect(response.status).toEqual(200);
      // expect(response.body.results).toHaveProperty("results.title", "Bloodshoot");
      // expect(response.body.results).toMatchObject(moviesListInDb);
      // query: {
      //   // "expiryTime": 30,
      //   "result": moviesListInDb
      // }
      // });
      // console.log('response', response.body);
  })
     
});


 // console.log('body', response.body.result.length);
      // expect(response.body.result.length).toEqual(20);
      // // const movieList = db.collection('movies');

      // const movies = await movieList.findOne(response.body);
      // expect(movies).toEqual(moviesListInDb);
      // console.log('movie list', movies.ops)
    //   expect(response.body).toEqual(moviesListInDb);

//       return await request(app).get("/public/api/v1/list/movies").then
//       (async data => {
//         const movieList = db.collection('movies');
//         const createMovies = await movieList.findOne(data);
//         console.log(' movies created', createMovies);
//         // expect(createMovies).toEqual(data.text);

//       } )

  // }) // console.log('body', response.body.result.length);
      // expect(response.body.result.length).toEqual(20);
      // // const movieList = db.collection('movies');

      // const movies = await movieList.findOne(response.body);
      // expect(movies).toEqual(moviesListInDb);
      // console.log('movie list', movies.ops)
    //   expect(response.body).toEqual(moviesListInDb);

//       return await request(app).get("/public/api/v1/list/movies").then
//       (async data => {
//         const movieList = db.collection('movies');
//         const createMovies = await movieList.findOne(data);
//         console.log(' movies created', createMovies);
//         // expect(createMovies).toEqual(data.text);

//       } )

  // })