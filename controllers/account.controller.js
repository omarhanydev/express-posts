const Users = require('../models/user.models')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const account = (req, res) => {
    const old_form_data = req.flash('form_data')
    const form_errors = req.flash('form_errors')
    // console.log(old_form_data)
    // console.log(form_errors)
    let form_data = []
    if(old_form_data.length) {
        form_data = old_form_data[0]
    } else {
        form_data = {
            old_password: '',
            password: '',
            confirm_password: ''
        }
    }
    res.render('account.ejs', {
        is_logged_in: req.session.is_logged_in,
        user: req.session.user,
        form_errors,
        form_data
    })
}

const handleChangePassword = async (req, res) => {
    const { old_password, password, confirm_password } = req.body
    const errors = validationResult(req)
    if (errors.isEmpty()) {    
        bcrypt.hash(password, 7, async(err, hash) => {
            await Users.findByIdAndUpdate( req.session.user._id , {
                    password: hash
                }
            )
            res.redirect('/feed')
        });
    } else {
        req.flash('form_errors', errors.array())
        req.flash('form_data', req.body)
        res.redirect('/account')
    }
}

module.exports.account = account
module.exports.handleChangePassword = handleChangePassword