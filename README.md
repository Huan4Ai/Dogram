# Dogram
## What is Dogram?
Dogram is a clone of Instagram. Dogram is a website to share about pictures of dogs.
![1](https://user-images.githubusercontent.com/75101720/143784433-bc7387ac-a117-42a9-bc5d-34122c745f46.jpg)

## Live Link
https://ha-dogram.herokuapp.com/

## Technologies Used
* Javascript
* HTML/CSS
* Node.js
* Express
* PostgreSQL
* Sequelize
* React
* Redux
* AWS S3
* Heroku

## Developing
To run this application locally for development, you'll need to:

`git clone` this repo<br/>
`cd` into the local repo<br/>
`cd` into the backend folder and `npm install`<br/>
Create your own `.env` file in the backend based on the `.env.example` there<br/>
Create a user that matches the only you identified in your `.env` file in PostgreSQL<br/>
Run `npx dotenv sequelize db:create` to create the database<br/>
If the sequelize module is not found, try running `npx dotenv sequelize-cli db:create` and replace `sequelize` with `sequelize-cli` for the rest of these commands<br/>
Run `npx dotenv sequelize db:migrate` to run the migrations<br/>
Run `npx dotenv sequelize db:seed:all` to seed the database<br/>
Open another terminal and `cd` into the frontend directory and `npm install` there<br/>
Run `npm start` in your backend and then another `npm start` in your frontend.<br/>
The React server will open up a browser window with the correct address, and you can begin your work from there.<br/>
If you are planning on developing, please make a branch for your changes instead of writing directly to master.<br/>
