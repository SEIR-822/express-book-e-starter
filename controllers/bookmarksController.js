const express = require('express')
const router = express.Router()
const Bookmark = require('../models/Bookmark')

// Index: GET all the bookmarks
router.get('/', (req, res, next) => {
	// 1. Get all of the bookmarks from the DB
    Bookmark.find({}).populate('owner')
	// 2. Send them back to the client as JSON
    .then((bookmarks) => res.json(bookmarks))
	// 3. If there's an error pass it on!
    .catch(next)
});

// Show: Get a Bookmark by ID
router.get('/:id', async (req, res, next) => {
    try {
        const bookmark = await Bookmark.findById(req.params.id).populate('owner')
        res.json(bookmark)
    } catch (err) {
        next(err)
    }
})

// Create: POST a Bookmark
router.post('/', async (req, res, next) => {
    try {
        const newBookmark = await Bookmark.create(req.body)
        res.status(201).json(newBookmark)
    } catch (err) {
        next(err)
    }
})

// Update: PUT a Bookmark
router.put('/:id', async (req, res, next) => {
    try {
        const updatedBookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json(updatedBookmark)
    } catch (err) {
        next(err)
    }
})

// Delete: DELETE a Bookmark
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id)
        res.json(deletedBookmark)
    } catch (err) {
        next(err)
    }
})

module.exports = router