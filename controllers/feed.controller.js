const Posts = require('../models/post.models')
const DateUtils = require('../utils/DateUtils')

const feed = async (req, res) => {
    const posts = await Posts.find({}).populate('user', '-_id -password -email')
    res.render('feed.ejs', {
        is_logged_in: req.session.is_logged_in,
        user: req.session.user,
        calculateTimeSince: DateUtils.calculateTimeSince,
        posts
    })
}

const handleAddPost = async (req, res) => {
    const { title, text } = req.body
    const created_at = DateUtils.calculateUtcDate(new Date())
    await Posts.insertMany({ title, text, user: req.session.user._id, created_at })
    res.redirect('/feed')
}

module.exports.feed = feed
module.exports.handleAddPost = handleAddPost