const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host: '',
    port: '5432',
    user: '',
    password: '',
    database: ''
  }
});

console.log("start");
try
{
  db.schema.createTable('users', function (table) {
    table.increments();
    table.string('username');
    table.string('password');
    table.timestamps();
  });
}
catch(ex)
{
  throw ex;
}


const appPort = process.env.port || 3000;

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.send('App is online!');
})


app.listen(appPort, ()=> {
  console.log(`app is running on port ${appPort}`);
})
