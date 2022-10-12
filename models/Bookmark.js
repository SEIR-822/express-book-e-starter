const mongoose = require('../db/connection')

const BookmarkSchema = new mongoose.Schema({
    title: String,
    url: String
})

const Bookmark = mongoose.model('Bookmark', BookmarkSchema)

module.exports = Bookmark