const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const options = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "fcuser",
    password: "mysqlmamba",
    database: "lang_flash_cards"
  }
};
const db = require("knex")(options);

const knexCheckConnection = require('./controllers/connectionCheck');
const signin = require('./controllers/signin');
const register = require('./controllers/register');


// Express Init...
const appPort = process.env.port || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Listeners...
app.get("/", (req, res) => {
  try {
    db
      .select("*")
      .from("users")
      .on("query", function (data) {
        //app.log(data);
      })
      .then(function (result) {
        res.send(result);
      });
  } catch (ex) {
    res.send(`{error: "An error has occurred: ${ex}"`);
  }
});
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt)
})

app.listen(appPort, () => {
  console.log(`app is running on port ${appPort}`);
});