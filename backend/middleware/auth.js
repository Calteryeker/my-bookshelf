const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorizathion;

    if(!authHeader){
        console.log("Sem token")
        return res.status(401).send('Error: No token provided');
    }
        
    
    //token format => "Bearer hash"
    const parts = authHeader.split(' ');

    if(!parts.lenght === 2)
        return res.status(401).send('Error: Token error');

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send('Error: Token malformatted');
    
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if(err) 
            return res.status(401).send('Error: Invalid token!');

        userId = decoded.id;

        const userExist = await User.findById(userId).select("-lista_livros")
        if(!userExist)
            return res.status(404).send("Error: User not found!");
        req.userId = userId

        return next();

    });

};