const path = require('path');

// charger le fichier à partir de n'importe où 
require("dotenv").config({ path: path.resolve(__dirname, "../.env"), quiet: true });

const express = require('express');
const connectDB = require('./config/database');
const taskRoutes = require("./routes/taskRoutes"); 
const authRoutes = require("./routes/authRoutes");

const commentRoutes = require('./routes/commentRoutes');

const cors = require('cors'); 
const helmet = require("helmet");
const rateLimit = require('express-rate-limit'); 
const swaggerJsdoc = require("swagger-jsdoc"); 
const swaggerUi = require("swagger-ui-express"); 

connectDB();

const app = express();

// Configuration de Swagger 
const options = { 
    definition: { 
        openapi: "3.0.0", 
        info: { 
            title: "API de gestion des tâches", 
            version: "1.0.0", 
            description: "Documentation de l'API pour la gestion des tâches", 
        }, 
        components: { 
            schemas: { 
                Task: { 
                    type: "object", 
                    properties: { 
                        id: { type: "string" },
                        title: { type: "string" },
                        description: { type: "string" },
                        priority: { type: "string", enum: ["low", "medium", "high"] },
                        completed: { type: "boolean" },
                        dueDate: { type: "string", format: "date" },
                        file: { type: "string" },
                    }, 
                }, 
            }, 
        }, 
    }, 
apis: [path.join(__dirname, './routes/*.js')],
}; 
const specs = swaggerJsdoc(options); 

const limiter = rateLimit({      
    windowMs: 10 * 60 * 1000,   // 10 minutes    
    max: 50, // Limite à 50 requêtes 
    message: 'Trop de requêtes, réessayez plus tard.' 
});

app.use(express.json()); 

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            scriptSrc: ["'self'", "'unsafe-inline'"],
            scriptSrcAttr: ["'unsafe-inline'"],
        }
    }
}));

app.use(limiter); 
app.use(cors({origin: "http://localhost:3000"}));

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use('/tasks', commentRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
    console.log("ERREUR GLOBALE:", err.message);
    res.status(500).json({ error: err.message });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); 

module.exports = { app, specs };