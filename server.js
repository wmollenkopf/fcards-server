const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const options = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "fcuser",
    password: "your_password",
    database: "lang_flash_cards"
  }
};
const db = require("knex")(options);

const knexCheckConnection = require('./controllers/connectionCheck');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const flashCards = require('./controllers/flashCards');

// Express Init...
const appPort = process.env.port || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Listeners...
//app.get("/", (req, res) => {res.send("Hello World");});

// Setup User
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

// Modify Cards
app.post('/addcard', (req, res) => {flashCards.handleAdd(req, res, db)});
app.post('/editcard', (req, res) => {flashCards.handleEdit(req, res, db)});
app.post('/delcard', (req, res) => {flashCards.handleDel(req, res, db)});

// Get Cards
app.get('/getcards', (req, res) => {flashCards.handleGetAll(req, res, db)});

app.listen(appPort, () => {
  console.log(`app is running on port ${appPort}`);
});