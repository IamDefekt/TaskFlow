const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken"); 
const User = require("../models/User"); 

 
exports.register = async (req, res) => { 
  try { 
    const {email, password} = req.body 
    const hashedPassword = await bcrypt.hash(password, 10) 
    await User.create({email,password: hashedPassword}) 
    res.status(201).json({ message: 'Utilisateur créé avec succès !', user: {email} }); 
  } 
  catch (error) { 
    res.status(500).json({error: error.message}) 
  } 
} 

exports.login = async (req, res) => { 
  try { 
    const {email, password} = req.body; 
    const user = await User.findOne({email}); 
 
    if (!user) { 
      return res.status(401).json( 
        {message: "Utilisateur non trouvé"}); 
    } 
 
    const validPassword = await bcrypt.compare( 
      password, 
      user.password 
          ); 
 
    if (!validPassword) { 
      return res.status(401).json( 
        {message: "Mot de passe incorrect"}); 
    } 
 
    const token = jwt.sign( 
      {id: user._id}, 
      process.env.JWT_SECRET, 
      {expiresIn: "24h"} 
    ); 
    res.json({token}); 
  } 
  catch (error) { 
    res.status(500).json({error: error.message}); 
  } 
}
