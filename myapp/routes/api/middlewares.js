const jwt = require('jsonwebtoken');
const config = require('../../local');

let validateToken = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).json({message: 'Authorization header not provided'});
    }

    let [type, token] = req.headers.authorization.split(' ');

    if(type !== 'Bearer'){
        return res.status(401).json({message: 'Token type not supported'});
    }

    if(!token){
        return res.status(401).json({message: 'Token not provided'});
    }

    jwt.verify(token, config.JWT_KEY, (err, decoded) => {
        if(err){
            res.status(401).json({message: 'Invalid token'});
        }
        else{
            req.UserId = decoded.UserId;
            next();
        }
    });
}

module.exports = {
    validateToken
}