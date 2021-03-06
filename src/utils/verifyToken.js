
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req) => {
    const Authorization = req.headers.authorization;
    if(!Authorization) {
      return req
    } else {
        const formToken = Authorization.replace('JWT ',"");
        const payload = jwt.verify(formToken, process.env.SECRET_KEY)
        if(!payload){return req}
        const user = await User.findOne({_id:payload.id});
        if(!user) return req;
        return {...req, user}
    }   
}

module.exports = verifyToken;