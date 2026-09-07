const express = require("express"); 
const router = express.Router(); 
const upload = require("../middlewares/upload");
 
const taskController = require("../controllers/taskController"); 
const validateTask = require('../middlewares/validateTask');
const authMiddleware = require('../middlewares/authMiddleware');

/** 
 * @swagger 
 * /tasks: 
 *   get: 
 *     summary: Récupère toutes les tâches 
 *     tags: [Tasks] 
 *     responses: 
 *       200: 
 *         description: Liste de toutes les tâches 
 *         content: 
 *           application/json: 
 *             schema: 
 *               type: array 
 *               items: 
 *                 $ref: '#/components/schemas/Task' 
 */ 
router.get("/", authMiddleware, taskController.getTasks); 

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Récupérer les tâches par id
 *     tags: [Tasks]
 *     responses: 
 *       200: 
 *         description: Liste des tâches par id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tâche non trouvée 
 */ 
router.get('/:id', taskController.getTasksById);

/**
 * @swagger
 * /tasks/priority/{priority}:
 *   get:
 *     summary: Récupérer les tâches par priorité
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: priority
 *         required: true
 *         schema:
 *           type: string
 *           enum: [low, medium, high]
 *         description: Niveau de priorité
 *     responses:
 *       200:
 *         description: Liste des tâches par priorité
 *       404:
 *         description: Aucune tâche trouvée
 */
router.get("/priority/:priority", taskController.getPriority);

/** 
 * @swagger 
 * /tasks: 
 *   post: 
 *     summary: Crée une nouvelle tâche 
 *     tags: [Tasks] 
 *     requestBody: 
 *       required: true 
 *       content: 
 *         application/json: 
 *           schema: 
 *             $ref: '#/components/schemas/Task' 
 *     responses: 
 *       201: 
 *         description: Tâche créée avec succès 
 *       400: 
 *         description: Données invalides 
 */ 
router.post("/", authMiddleware, validateTask, taskController.createTask); 

router.post("/upload", authMiddleware, upload.single("file"), taskController.createTask); 
router.post('/upload-multiple', authMiddleware, upload.array('files', 3), (req, res) => {
    const files = req.files.map((f) => f.filename);
    res.json(files);
});

/** 
 * @swagger 
 * /tasks/{id}: 
 *   put: 
 *     summary: Met à jour une tâche par son ID 
 *     tags: [Tasks] 
 *     parameters: 
 *       - in: path 
 *         name: id 
 *         required: true 
 *         schema: 
 *           type: string 
 *         description: ID de la tâche à mettre à jour 
 *     requestBody: 
 *       required: true 
 *       content: 
 *         application/json: 
 *           schema: 
 *             $ref: '#/components/schemas/Task' 
 *     responses: 
 *       200: 
 *         description: Tâche mise à jour avec succès 
 *       404: 
 *         description: Tâche non trouvée 
 */
router.put("/:id", authMiddleware, taskController.updateTask); 

/** 
 * @swagger 
 * /tasks/{id}: 
 *   delete: 
 *     summary: Supprime une tâche par son ID 
 *     tags: [Tasks] 
 *     parameters: 
 *       - in: path 
 *         name: id 
 *         required: true 
 *         schema: 
 *           type: string 
 *         description: ID de la tâche à supprimer 
 *     responses: 
 *       200: 
 *         description: Tâche supprimée avec succès 
 *       404: 
 *         description: Tâche non trouvée 
 */ 
router.delete("/:id", authMiddleware, taskController.deleteTask); 
router.delete("/:id/file", authMiddleware, taskController.deleteFile); 


module.exports = router 