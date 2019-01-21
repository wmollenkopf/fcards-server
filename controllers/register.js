const handleRegister = (req, res, db, bcrypt,jwt) => {
    let newUserId = 0;
    const {
        username,
        password
    } = req.body;
    if (!username || !password) {
        return res.status(400).json(`incorrect form submission`);
    }
    const hash = bcrypt.hashSync(password);
    return db.transaction(function (t) {
        return db("users")
          .transacting(t)
          .insert({
            username: username,
            created_at: new Date()
            })
          .then(function (response) {
            newUserId=response;
            return db('logins')
              .transacting(t)
              .insert({
                user_id: response,
                password: hash,
                })
          })
          .then(t.commit)
          .catch(t.rollback)
      })
      .then(function () {
        if(newUserId>0) {
            // transaction succeeded, data written
            return db.select('*').from('users')
                .where('user_id', '=', newUserId)
                .then(user => {
                    if(user) {
                    const token = jwt.sign({user},process.env.API_SECRET_KEY);
                    res.json({token: token});
                    } else {
                    res.json({error: `Unable to create token.`});
                    }
                    
                })
                .catch(err => res.status(400).json(`unable to get new user: ${err}`))
        } else {
            res.json({token: ``});
        }
      })
      .catch(err => res.status(400).json(`unable to register ${err}`))
}

module.exports = {
    handleRegister: handleRegister
};