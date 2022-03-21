const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorizathion;

    if(!authHeader)
        return res.status(401).send('No token provided');
    
    //token format => "Bearer hash"
    const parts = authHeader.split(' ');

    if(!parts.lenght === 2)
        return res.status(401).send('Token error');

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send('Token malformatted');
    
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) 
            return res.status(401).send('Invalid token');

        req.userId = decoded.id;

        return next();

    });

};