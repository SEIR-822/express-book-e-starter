const express = require('express')
const router = express.Router()
const Bookmark = require('../models/Bookmark')

// Index: GET all the bookmarks
router.get('/', (req, res, next) => {
	// 1. Get all of the bookmarks from the DB
    Bookmark.find({})
	// 2. Send them back to the client as JSON
    .then((bookmarks) => res.json(bookmarks))
	// 3. If there's an error pass it on!
    .catch(next)
});

// Show: Get a Bookmark by ID
router.get('/:id', async (req, res, next) => {
    try {
        const bookmark = await Bookmark.findById(req.params.id)
        res.json(bookmark)
    } catch (err) {
        next(err)
    }
})

module.exports = router