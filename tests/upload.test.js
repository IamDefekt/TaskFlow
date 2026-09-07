const request = require("supertest"); 
const { app } = require('../src/app');

describe("POST /upload", () => { 
    it("Télécharger un fichier et créer une tâche.", async () => { 
        const res = await request(app) 
        .post("/tasks/upload") 
        .field("title", "Test task") 
        .attach("file", "tests/meme.png"); 
        expect(res.statusCode).toBe(201); 
        expect(res.body).toHaveProperty("file"); 
    }); 
}); 