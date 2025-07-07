var jwt = require('jsonwebtoken');
const JWT_SECRET = 'lovesnotso$ba&d';

const fetchuser = (req, res, next) => {
    const token = req.header('Authorization')?.replace("Bearer ", "");
    if (!token) {
        res.status(401).send({ message: "Please authenticate using a valid token" })
    }
    try {
        const decode = jwt.verify(token, JWT_SECRET);
        req.user = decode.userId;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
};

module.exports = fetchuser; 