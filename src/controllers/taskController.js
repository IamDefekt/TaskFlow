const Task = require('../models/task');
const fs = require("fs"); 
const path = require("path"); 

exports.createTask = async (req, res) => {
    try {
        const {title} = req.body; 
        const file = req.file ? req.file.filename : null; 
        const task = await Task.create({title, file}); 
        res.status(201).json(task);
    }
    catch (e) {
        res.status(500).json({error: e.message});
    }
}

exports.getTasks = async (req, res) => { 
    try { 
        // Pagination 
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 5; 
    
        // Filtres dynamiques 
        const filter = {}; 
    
        // Exemple : ?completed=true 
        if (req.query.completed !== undefined) {filter.completed = req.query.completed === "true";} 
    
        // Exemple : ?search=course 
        if (req.query.search) { 
            filter.title = { 
                $regex: req.query.search, 
                $options: "i" 
            }; 
        } 
    
        // Requête Mongo 
        const tasks = await Task.find(filter) 
        .skip((page - 1) * limit) 
        .limit(limit); 
    
        res.status(200).json(tasks); 
    
    } 
    catch (error) { 
        res.status(500).json({error: error.message}); 
    } 
}; 

exports.getTasksById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.json(task); 
    }
    catch (e) {
        res.status(500).json({error: e.message});
    }
}

exports.getPriority = async (req, res) => {
    try {
        const tasks = await Task.find({ priority: req.params.priority});
        res.json(tasks);
    }
    catch (e) {
        res.status(500).json({error: e.message});
    }
}

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}
        );
        res.json(task);
    }
    catch (e) {
        res.status(500).json({error: e.message});
    }
}

exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Tâche supprimée'});
    }
    catch (e) {
        res.status(500).json({error: e.message});
    }
}

exports.deleteFile = async (req, res) => { 
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Tâche non trouvée" });

        const filePath = path.join(__dirname, "../uploads", task.file);

        fs.unlink(filePath, async (err) => { 
            if (err) return res.status(500).json({ message: "Erreur suppression" });
            await Task.findByIdAndUpdate(req.params.id, { file: null });
            res.json({ message: "Fichier supprimé" }); 
        }); 
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};