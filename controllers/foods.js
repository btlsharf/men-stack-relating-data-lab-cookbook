const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('foods/index.ejs', {
      currentUser: currentUser,         
      foods: currentUser.pantry,  
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/new', async (req, res)=>{
res.render('foods/new.ejs');
});


// with this route, items will be added to the database though it wont be shown to the user
router.post('/', async (req, res)=>{

     try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Push req.body (the new form data object) to the
    // applications array of the current user
    currentUser.pantry.push(req.body);
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the applications index view
    res.redirect(`/users/${currentUser._id}/foods`);
  } 
  catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }

});

router.delete('/:foodId', async (req, res) => {
try {
const currentUser = await User.findById(req.session.user._id);
currentUser.pantry.id(req.params.foodId).deleteOne();
await currentUser.save();
res.redirect(`/users/${currentUser._id}/foods`);

}catch(error) {
    console.log(error);
    res.redirect('/');
}
});

router.get('/:foodId/edit', async (req, res) => {
try{
const currentUser = await User.findById(req.session.user._id);
const food = currentUser.pantry.id(req.params.foodId);
res.render('foods/edit.ejs',{
    food: food,
});
}catch(error) {
    console.log(error);
    res.redirect('/');
}
});

router.put('/:foodId', async (req, res) => {
try{
const currentUser = await User.findById(req.session.user._id);
const food = currentUser.pantry.id(req.params.foodId);
food.set(req.body);
await currentUser.save();
res.redirect(`/users/${currentUser._id}/foods`);
}catch(error){
console.log(error);
res.redirect('/');
}
});


module.exports = router; 