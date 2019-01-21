const dotenv = require("dotenv").config({ path: "process.env" });
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const options = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "lang_flash_cards"
  }
};
const db = require("knex")(options);

const knexCheckConnection = require('./controllers/connectionCheck');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const flashCards = require('./controllers/flashCards');

// Express Init...
const appPort = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Listeners...
app.get("/", (req, res) => {res.send("Hello World");});
app.get("/decode", (req, res) => {

});

// Setup User
app.post('/signin', signin.handleSignin(db, bcrypt, jwt));
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt,jwt)});

// Modify Cards
app.put('/addcard', (req, res) => {flashCards.handleAdd(req, res, db)});
app.post('/editcard', (req, res) => {flashCards.handleEdit(req, res, db)});
app.delete('/delcard', (req, res) => {flashCards.handleDel(req, res, db)});

// Get Cards
app.post('/getcards', (req, res) => {flashCards.handleGetAll(req, res, db)});

app.listen(appPort, () => {
  console.log(`app is running on port ${appPort}`);
});