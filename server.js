const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db = null;
const appPort = process.env.port;

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.send('App is online!');
})


app.listen(appPort, ()=> {
  console.log(`app is running on port ${appPort}`);
})
