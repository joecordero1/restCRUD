require('dotenv').config();   // ← 1ª línea del archivo
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { keycloak, memoryStore } = require('./middleware/keycloak');
const session = require('express-session');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/restapicrud')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB connection error:", err));

const app = express();

// Configurar sesiones
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

// Inicializar Keycloak
app.use(keycloak.middleware());

// Habilitar CORS
app.use(cors());

// Usar las rutas definidas
app.use('/', routes());

// Iniciar el servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
