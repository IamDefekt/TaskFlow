const express = require("express"); 
const router = express.Router(); 

const commentController = require('../services/commentService');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:id/comments', authMiddleware, commentController.getCommentById);
router.post('/:id/comments', authMiddleware, commentController.createComment);
router.delete('/comments/:id', authMiddleware, commentController.deleteComment);

module.exports = router;