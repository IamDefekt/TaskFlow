const Joi = require('joi'); 
 
const userSchema = Joi.object({  
  email: Joi.string().email().required(), 
  password: Joi.string() 
    .min(6) 
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/) 
    .messages({ 
      'string.pattern.base': 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.', 
    }) 
    . required(),
  repeat_password: Joi.ref('password')   
}); 
 

module.exports = (req, res, next) => {
    const { error, value } = userSchema.validate(req.body);
    if (error) {return res.status(400).json({ message: error.details[0].message });}
    req.validatedUser = value;
    next();
};