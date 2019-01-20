const handleSignin = (db, bcrypt, jwt) => (req, res) => {
  const {
    username,
    password
  } = req.body;
  if (!username || !password) {
    return res.status(400).json(`incorrect form submission`);
  }
  db.select('logins.user_id','username', 'password').from('logins')
    .join('users', 'logins.user_id', '=', 'users.user_id')
    .where('users.username', '=', username)
    .then(data => {
      //console.log(data);
      const isValid = bcrypt.compareSync(password, data[0].password);
      
      if (isValid) {
        return db.select('*').from('users')
          .where('user_id', '=', data[0].user_id)
          .then(user => {
            if(user) {
              const token = jwt.sign({user},process.env.API_SECRET_KEY);
              res.json({token: token});
            } else {
              res.json({error: `Unable to create token.`});
            }
            
          })
          .catch(err => res.status(400).json(`unable to get user: ${err}`))
      } else {
        res.status(400).json(`wrong credentials`)
      }
    })
    .catch(err => res.status(400).json(`wrong credentials`))
}

module.exports = {
  handleSignin: handleSignin
}