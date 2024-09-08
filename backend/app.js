const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const auth = require('./routes/auth');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/mean-login', )
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No se pudo conectar a MongoDB...', err));


app.use(cors());
app.use(express.json());
app.use('/api/auth', auth);


// Ruta de ejemplo para verificar que el servidor funciona
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
