I have made this project using nodeJs with Typescript, mongoDB , and express.

I have requested the movieAPI's and saved them to database and cached the data for  2 mins which is configurable and can be changed .

Steps to check the working of this project:-

1) Do npm i:- It will install all the dependencies required to run the project.
2) Do npm run start - it will start the application.
3) also run the mongo installed in your system.
4)Then on the postman check the below API:-

on get request: 

http://localhost:5000/public/api/v1/list/movies/

After hitting the API it will list all the movies and also save it to database for defined time.For testing I have given it 2sec.
And following the mongo TTl feature I have achieved this caching feature in the project.

The list which we see in the controller(Postman) is getting through the database.

Use of this application:- This project or the implemented feature can be used where we need to 
implement the caching feature in the web projects.