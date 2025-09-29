const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const AllUsers = await User.find({});
        res.render('users/index.ejs', {
            AllUsers,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        res.render('users/show.ejs', {
            user,
        });

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;