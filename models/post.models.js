const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title: String,
    text: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    created_at: Date
})

module.exports = mongoose.model('post', schema)