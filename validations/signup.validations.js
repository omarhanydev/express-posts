const { check } = require('express-validator')

const handleSignup = [
    check('first_name').isLength({min:3, max: undefined}).isAlpha('en-US'),
    check('last_name').isLength({min:3, max: undefined}).isAlpha('en-US'),
    check('username').isLength({min:3, max: undefined}).isAlpha('en-US'),
    check('email').isEmail(),
    check('password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
]

module.exports.handleSignup = handleSignup