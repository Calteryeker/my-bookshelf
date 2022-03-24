const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorizathion;

    if(!authHeader)
        return res.status(401).send('Error: No token provided');
    
    //token format => "Bearer hash"
    const parts = authHeader.split(' ');

    if(!parts.lenght === 2)
        return res.status(401).send('Error: Token error');

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send('Error: Token malformatted');
    
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) 
            return res.status(401).send('Error: Invalid token!');

        req.userId = decoded.id;

        return next();

    });

};