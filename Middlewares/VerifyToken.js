const Jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        Jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err){
                return res.status(403).json("Token is not valid");
            }
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("You are not authenticated");
    }
}

module.exports = verifyToken;