# TaskFlow

> Exercice réalisé en cours dans le cadre de ma formation Développeur Web et Web Mobile.

API REST de gestion de tâches développée en Node.js/Express/MongoDB, avec authentification JWT, upload de fichiers et documentation Swagger.

## Fonctionnalités

- Inscription / connexion avec authentification JWT
- CRUD complet sur les tâches (création, lecture, mise à jour, suppression)
- Filtrage des tâches par priorité
- Ajout de commentaires sur une tâche
- Upload de fichiers (simple et multiple) via Multer
- Validation des données avec Joi
- Documentation interactive de l'API via Swagger
- Sécurité : Helmet, rate limiting, CORS
- Tests automatisés (Jest / Supertest)

## Stack technique

- Node.js / Express
- MongoDB / Mongoose
- JWT (jsonwebtoken) + bcrypt
- Joi (validation)
- Multer (upload de fichiers)
- Swagger (swagger-jsdoc / swagger-ui-express)
- Jest / Supertest (tests)



⚠️ Projet nécessitant une base de données MongoDB (non fournie) — non lançable en l'état.

## Documentation de l'API

Une fois le serveur lancé, la documentation Swagger est disponible sur :
`http://localhost:3000/api-docs`

## Tests

⚠️ Les tests utilisent une vraie base MongoDB (celle définie dans `MONGO_URI`).