const { app } = require('./app');
const config = require('./config/config');

app.listen(config.port, () => { 
  console.log(`Serveur lancé sur le port ${config.port}`); 
}); 