const request = require("supertest");
const jwt = require("jsonwebtoken");
const { app } = require("../src/app");

// Token généré à chaque lancement des tests, n'expire jamais
const TOKEN = jwt.sign(
    { id: "69df4ea7bcaf597b44ff8450" },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
);

describe('Task API', () => { 

    let taskId;
 
    it('GET /tasks should return 200', async () => { 
            const res = await request(app)
                .get('/tasks') 
                .set("Authorization", `Bearer ${TOKEN}`);
            expect(res.statusCode).toBe(200); 
        }); 

    it('POST /tasks should create a task', async () => { 
        const res = await request(app) 
            .post('/tasks') 
            .set("Authorization", `Bearer ${TOKEN}`)
            .send({title: 'Je suis un test'}); 

        expect(res.statusCode).toBe(201); 
        expect(res.body.title).toBe('Je suis un test');
        taskId = res.body._id;  
    }); 

    it('DELETE /tasks/:id should delete a task', async () => {
        const res = await request(app)
            .delete(`/tasks/${taskId}`) 
            .set("Authorization", `Bearer ${TOKEN}`);

        expect(res.statusCode).toBe(200); 
    });
 
}); 