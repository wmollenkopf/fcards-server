const jwt = require("jsonwebtoken");
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.API_SECRET_KEY);
        if(decoded) {
            return decoded;
        } else {
            return {};
        }
    } catch (err) {
        // err
        return {
            valid: false,
            error: `Unable to process token.`
        }
    }
}

module.exports = {
    verifyToken: verifyToken
};