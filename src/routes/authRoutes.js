const express = require("express"); 
const router = express.Router(); 

const authController = require("../controllers/authController"); 
const authMiddleware = require('../middlewares/authMiddleware');
const validateUser = require('../middlewares/validateUser');
// const { register } = require("../controllers/authController");
// const register = require('../../tests/auth.test');

router.post("/register", validateUser, authController.register); 
// router.post("/register", register); 
router.post("/login", authController.login); 
router.get('/profile', authMiddleware, (req, res) => {res.json({message : 'route protégée', userId: req.userId})});

module.exports = router;