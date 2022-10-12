const bookmarks = require('./seeds.json')
const Bookmark = require('../models/Bookmark')

Bookmark.insertMany(bookmarks)
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => process.exit())