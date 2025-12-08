const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../models/Todo');
const { protect } = require('../middleware/auth');

// Middleware para validar ObjectId
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  
  next();
};

// 🔒 Proteger TODAS las rutas con autenticación
router.use(protect);

// GET - Obtener todas las tareas del usuario autenticado
router.get('/', async (req, res) => {
  try {
    // Solo obtener tareas del usuario autenticado
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
});

// POST - Crear nueva tarea
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'El texto es requerido' });
    }

    const newTodo = new Todo({
      text: text.trim(),
      completed: false,
      user: req.user._id, // 🔗 Asociar tarea con usuario autenticado
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
});

// PUT - Actualizar tarea
router.put('/:id', validateObjectId, async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;

    // Verificar que la tarea pertenezca al usuario
    const todo = await Todo.findOne({ _id: id, user: req.user._id });

    if (!todo) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    const updateData = {};
    if (text !== undefined) updateData.text = text.trim();
    if (completed !== undefined) updateData.completed = completed;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updatedTodo);
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    res.status(500).json({ error: 'Error al actualizar la tarea', details: error.message });
  }
});

// DELETE - Eliminar tarea
router.delete('/:id', validateObjectId, async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que la tarea pertenezca al usuario
    const todo = await Todo.findOne({ _id: id, user: req.user._id });

    if (!todo) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    await Todo.findByIdAndDelete(id);

    res.json({ message: 'Tarea eliminada correctamente', todo });
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    res.status(500).json({ error: 'Error al eliminar la tarea', details: error.message });
  }
});

module.exports = router;