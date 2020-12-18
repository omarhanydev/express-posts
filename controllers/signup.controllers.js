const Users = require('../models/user.models')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const signup = (req, res) => {
    const old_form_data = req.flash('form_data')
    const form_errors = req.flash('form_errors')
    const form_data_errors = req.flash('form_data_errors')
    let form_data = []
    if(old_form_data.length) {
        form_data = old_form_data[0]
    } else {
        form_data = {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: ''
        }
    }
    res.render('signup.ejs', {
        is_logged_in: req.session.is_logged_in,
        form_data_errors,
        form_errors,
        form_data
    })
}

const handleSignup = async (req, res) => {
    const { first_name, last_name, username, email, password } = req.body
    const errors = validationResult(req)
    // no validation errors
    if(errors.isEmpty()){
        // check if already registered
        const user = await Users.findOne({ email })
        if (user) { // user was found
            req.flash('form_data_errors', [
                { param: 'email', msg: 'Email was found in our records, Please login'}
            ])
            req.flash('form_data', req.body)
            res.redirect('/signup')
        } else { // user wasnt found
            bcrypt.hash(password, 8, async (err, hash) => {
                await Users.insertMany({
                    first_name,
                    last_name,
                    username,
                    email,
                    password: hash
                }, (err, result) => {
                    if(!err) {
                        req.session.is_logged_in = true
                        req.session.user = {
                            _id: result[0]._id,
                            first_name: result[0].first_name,
                            last_name: result[0].last_name,
                            full_name: (result[0].first_name + ' ' + result[0].last_name),
                            username: result[0].username
                        }
                        res.redirect('/feed')
                    }
                })
            });
        }
    } else { // validation errors found
        req.flash('form_errors', errors.array())
        req.flash('form_data', req.body)
        res.redirect('/signup')
    }
}

module.exports.signup = signup
module.exports.handleSignup = handleSignup