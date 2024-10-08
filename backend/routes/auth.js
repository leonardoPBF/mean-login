const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Usuario ya existe' });

    user = new User({ name, email, password });
    await user.save();

    const payload = { user: { id: user.id }};
    jwt.sign(payload, 'secret', { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const payload = { user: { id: user.id }};
    const token = jwt.sign(payload, 'secret', { expiresIn: '10h' });

    if (!req.session) {
      req.session = {}; // Inicializa `req.session` si es `undefined`
    }
    req.session.user = { id: user.id, name: user.name, email: user.email }; //manejo de sesión
    res.json({ token, user: req.session.user });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Logout de usuario
router.post('/logout', async (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ msg: 'Error al cerrar sesión' });
      }
      res.json({ msg: 'Sesión cerrada' });
    });
  } else {
    res.status(400).json({ msg: 'No hay sesión activa' });
  }
});



module.exports = router;
