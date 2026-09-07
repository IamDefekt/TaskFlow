const Comment = require('../models/comment');
const Task = require('../models/task');

exports.createComment = async (req, res) => {
    try {
        const {content} = req.body; 
        const userId = req.userId;
        const taskId = req.params.id;

        const task = await Task.findById(taskId);
        if (!task) {return res.status(404).json({ message: "Tâche non trouvée" });}

        const comment = await Comment.create({content, userId, taskId}); 
        res.status(201).json(comment);
    }
    catch (e) {
        res.status(500).json({error: e.message});
    }
}

exports.getCommentById = async (req, res) => {
    try {
        const comments = await Comment.find({ taskId: req.params.id });
        res.json(comments);
    }
    catch (e) {
        res.status(500).json({error: e.message});
    }
}

exports.deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Commentaire supprimé'});
    }
    catch (e) {
        res.status(500).json({error: e.message});
    }
}