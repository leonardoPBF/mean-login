const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const app = express();
const auth = require('./routes/auth');


mongoose.connect('mongodb+srv://leonardobf140224:idjWzN3dhCQUNqC7@prueba2.0abaq.mongodb.net/', )
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No se pudo conectar a MongoDB...', err));

app.use(session({
  secret: 's3cr3tK3yTh@t1sV3ryH@rd2Gu3ss',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } // true for https
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', auth);

// Ruta de ejemplo para verificar que el servidor funciona
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
