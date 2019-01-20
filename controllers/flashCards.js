const pretendUserID = 4;

const handleAdd = (req, res, db) => {
    const {
        sessionKey,
        cardQuestion,
        cardAnswer
    } = req.body;
    if (!sessionKey || !cardQuestion || !cardAnswer) {
        return res.status(400).json(`incorrect format`);
    }

    // TODO: Get userid from express session
    const userId = pretendUserID; // again, this is meant to be from express session, based on the sessionKey passed

    db.transaction(trx => {
            trx.insert({
                    user_id: userId,
                    card_question: cardQuestion,
                    card_answer: cardAnswer
                })
                .into('cards')
                .returning('*')
                .then(card => {
                    res.json(card[0]);
                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
        .catch(err => res.status(400).json(`unable to add card`))
};

const handleEdit = (req, res, db) => {

    const {
        sessionKey,
        cardId,
        cardQuestion,
        cardAnswer
    } = req.body;
    if (!sessionKey || !cardQuestion || !cardAnswer || !cardId) {
        return res.status(400).json(`incorrect format`);
    }

    // TODO: Get userid from express session
    const userId = pretendUserID; // again, this is meant to be from express session, based on the sessionKey passed

    db.transaction(trx => {
            trx.update({
                    card_question: cardQuestion,
                    card_answer: cardAnswer,
                    last_modified: new Date()
                })
                .into('cards')
                .where({card_id: cardId, user_id: userId})
                .returning('*')
                .then(result => {
                    res.json(result && (result)==1);
                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
        .catch(err => res.status(400).json(`unable to edit card ${err}`))
};

const handleDel = (req, res, db) => {
    const {
        sessionKey,
        cardId,
    } = req.body;
    if (!sessionKey || !cardId) {
        return res.status(400).json(`incorrect format`);
    }
    
    // TODO: Get userid from express session
    const userId = pretendUserID; // again, this is meant to be from express session, based on the sessionKey passed
    db.transaction(trx => {
            trx.del()
                .from('cards')
                .where({card_id: cardId, user_id: userId})
                .then(result => {return res.json(result && (result)==1);})
                .then(trx.commit)
                .catch(trx.rollback)
        })
        .catch(err => res.status(400).json(`unable to delete card ${err}`))
};


const handleGetAll = (req, res, db) => {
    const userId = pretendUserID; // again, this is meant to be from express session, based on the sessionKey passed

    const {
        sessionKey
    } = req.body;

    db.select('*')
    .from('cards')
    .where('user_id', '=', userId)
    .then(cards => {
        res.json(cards);
    })

};


module.exports = {
    handleAdd: handleAdd,
    handleEdit: handleEdit,
    handleDel: handleDel,
    handleGetAll: handleGetAll
};