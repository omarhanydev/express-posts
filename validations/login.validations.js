const { check } = require('express-validator')

const handlelogin = [
    check('email').isEmail(),
    check('password').isLength({min:3, max: undefined})
]

module.exports.handlelogin = handlelogin