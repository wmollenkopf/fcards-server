const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const options = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "fcuser",
    password: "type_user_password_here",
    database: "lang_flash_cards"
  }
};
const knex = require("knex")(options);

// Used to test that things were set up correctly...
// knex
//   .raw("SELECT VERSION()")
//   .then(version => console.log(version[0][0]))
//   .catch(err => {
//     console.log(err);
//     throw err;
//   })
//   .finally(() => {
//     knex.destroy();
//   });

// Express Init...
const appPort = process.env.port || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Listeners...
app.get("/", (req, res) => {
  try {
    knex.select('*')
      .from('users')
      .on('query', function(data) {
        //app.log(data);
      })
      .then(function(result) {
        res.send(result);
      });
  } catch (ex) {
    res.send(`{error: "An error has occurred: ${ex}"`);
  }

  
});

app.listen(appPort, () => {
  console.log(`app is running on port ${appPort}`);
});
