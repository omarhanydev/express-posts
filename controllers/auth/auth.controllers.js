module.exports = (req, res, next) => {
    if (!req.session.is_logged_in) {
        res.redirect('/')
    } else {
        next()
    }
}