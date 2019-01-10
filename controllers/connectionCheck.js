// Used to test that things were set up correctly...

const handleRegister = (req, res, db) => {
    db
  .raw("SELECT VERSION()")
  .then(version => console.log(version[0][0]))
  .catch(err => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
    res.send('It works');
  });
}

module.exports = {
    handleRegister: handleRegister
};