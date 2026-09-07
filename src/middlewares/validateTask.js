const Joi = require('joi'); 
 
const taskSchema  = Joi.object ({
    title: Joi.string().min(3).required().messages({
        'string.min' : 'Le titre doit contenir au moins {#limit} caractères.',
        'any.required':'Le titre est requis.'
    }),
    priority: Joi.string().valid('low', 'medium', 'high').messages({
        'any.only': 'La priorité doit être "low", "medium" ou "high".',
    }),
    dueDate: Joi.date().greater('now').messages({
        'date.base': "La date doit être une date valide.",
        'date.greater':"La date doit être ultérieure à aujourd'hui.",
    }),
});
 

module.exports = (req, res, next) => {
    const { error } = taskSchema.validate(req.body);
    if (error) {return res.status(400).json({ message: 'Erreur de validation', details: error.details.map(detail => detail.message) });}
    next();
};