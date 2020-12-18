const Users = require('../models/user.models')
const Posts = require('../models/post.models')
const DateUtils = require('../utils/DateUtils')

const profile = async (req, res) => {
    let profile = {}
    let posts = await Posts.find({ user: req.session.user._id }).populate('user', '-_id -password -email')
    if(req.params.username === req.session.user.username) {
        profile = req.session.user
        posts = await Posts.find({ user: req.session.user._id }).populate('user', '-_id -password -email')
    } else {
        const currentProfile = await Users.findOne({ username: req.params.username })
        posts = await Posts.find({ user: currentProfile._id }).populate('user', '-_id -password -email')
        if(currentProfile === null){
            res.redirect('/feed')
        } else {
            profile = {
                _id: currentProfile._id,
                first_name: currentProfile.first_name,
                last_name: currentProfile.last_name,
                full_name: (currentProfile.first_name + ' ' + currentProfile.last_name),
                username: currentProfile.username
            }
        }
    }
    res.render('profile.ejs', {
        is_logged_in: req.session.is_logged_in,
        user: req.session.user,
        profile,
        calculateTimeSince: DateUtils.calculateTimeSince,
        posts
    })
}

module.exports.profile = profile