
const bcrypt = require('bcrypt');
const User = require('../models/User');
const createToken = require('./createToken');

const authenticated = (args) => {
    return new Promise( (resolve, reject) => {
        console.log(args)
        let { email, password } = args.data;
        User.findOne({email})
        .then((user) => {
            if(!user) reject(new Error('El Usuario no existe'))
            bcrypt.compare(password, user.password, (err, isValid) => {
                if(err) reject(new Error('Ocurrio un Error'))
                isValid ? resolve(createToken(user)) : reject(new Error('Credenciales Invalidas'))
            })
        })
        .catch((err) => reject(err))
    })
    
}

module.exports = authenticated;