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
                    password: hash,
                    username: username
                })
                .into('users')
                .returning('*')
                .then(user => {
                    res.json(user[0]);
                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
        .catch(err => res.status(400).json(`unable to register`))
}

module.exports = {
    handleRegister: handleRegister
};