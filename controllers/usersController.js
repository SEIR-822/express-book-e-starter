const express = require('express')
const router = express.Router()
const User = require('../models/User')

// Index: GET all the Users
router.get('/', (req, res, next) => {
	// 1. Get all of the Users from the DB
    User.find({})
	// 2. Send them back to the client as JSON
    .then((users) => res.json(users))
	// 3. If there's an error pass it on!
    .catch(next)
});

// Show: Get a User by ID
router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (err) {
        next(err)
    }
})

// Create: POST a User
router.post('/', async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        res.status(201).json(newUser)
    } catch (err) {
        next(err)
    }
})

// Update: PUT a User
router.put('/:id', async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json(updatedUser)
    } catch (err) {
        next(err)
    }
})

// Delete: DELETE a User
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.json(deletedUser)
    } catch (err) {
        next(err)
    }
})

module.exports = router