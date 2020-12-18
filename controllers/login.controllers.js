const Users = require('../models/user.models')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const login = (req, res) => {
    const old_form_data = req.flash('form_data')
    const form_errors = req.flash('form_errors')
    const form_data_errors = req.flash('form_data_errors')
    let form_data = []
    if(old_form_data.length) {
        form_data = old_form_data[0]
    } else {
        form_data = {
            email: '',
            password: ''
        }
    }
    res.render('index.ejs', {
        is_logged_in: req.session.is_logged_in,
        form_data_errors,
        form_errors,
        form_data
    })
}

const handlelogin = async (req, res) => {
    const { email, password } = req.body
    const errors = validationResult(req)
    // console.log(errors.array())
    // form validation
    if(errors.isEmpty()){
        // if user found
        const user = await Users.findOne({ email })
        if (user){
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                req.session.user = {
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    full_name: (user.first_name + ' ' + user.last_name),
                    username: user.username
                }
                req.session.is_logged_in = true
                res.redirect('/feed')
            } else { // (invalid password)
                req.flash('form_data_errors', [
                    { param: 'password', msg: 'Wrong password, Please try again'}
                ])
                req.flash('form_data', req.body)
                res.redirect('/')
            }
        } else { // user not found
            req.flash('form_data_errors', [
                { param: 'email', msg: 'Email isn\'t found in our records, Please signup'}
            ])
            req.flash('form_data', req.body)
            res.redirect('/')
        }
    } else { // form validation error
        req.flash('form_errors', errors.array())
        req.flash('form_data', req.body)
        res.redirect('/')
    }
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/')
    })
}

module.exports.login = login
module.exports.handlelogin = handlelogin
module.exports.logout = logout