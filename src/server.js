require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://cat-todo-lis.netlify.app',  // ⚠️ QUITA la barra final "/"
    /\.netlify\.app$/
  ],
  credentials: true
}));
app.use(express.json());

// Ruta de prueba - MOVER AQUÍ (ANTES de las rutas API)
app.get('/', (req, res) => {
  res.json({ message: 'API de Todo List funcionando' });
});

// Routes - DESPUÉS de la ruta raíz
app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error de conexión a MongoDB:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});