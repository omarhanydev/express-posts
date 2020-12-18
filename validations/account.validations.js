const Users = require('../models/user.models')
const bcrypt = require('bcrypt')
const { check } = require('express-validator')

const handleChangePassword = [
    check('old_password').custom( async (value, { req }) => {
        const user = await Users.findOne({ _id: req.session.user._id })
        const match = await bcrypt.compare(value, user.password)
        if(match) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
    }),
    check('password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    check('confirm_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            return false
        }
        return true;
    })
]

module.exports.handleChangePassword = handleChangePassword