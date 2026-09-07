const Task = require('../models/task');

exports.createTask = async (data, user) => {
    if (!data || typeof data !== 'object') {
        throw new ValidationError ('Les données de la tâche sont invalides.');
    }
    if (!data.title || data.title.length < 3) {
        throw new Error ('Le titre est un peu court.');
    }
    if (data.dueDate && new Date(data.dueDate) < new Date()) {
        throw new Error ('La date est invalide.');
    }

    return await Task.create ({
        ...data,
        user: user._id
    });
};