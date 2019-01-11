const handleRegister = (req, res, db, bcrypt) => {
    const {
        username,
        password
    } = req.body;
    if (!username || !password) {
        return res.status(400).json(`incorrect form submission`);
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
            trx.insert({
                username: username,
                created_at: new Date()
                })
                .into('users')
                .returning('user_id')
                .then((user )=> {
                    return trx('logins')
                        .returning('*')
                        .insert({
                            user_id: user[0],
                            password: hash,
                        })
                        .then(user => {
                            res.json(user[0]);
                        })
                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
        .catch(err => res.status(400).json(`unable to register ${err}`))
}

module.exports = {
    handleRegister: handleRegister
};