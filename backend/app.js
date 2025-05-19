const express = require('express');
const app = express();
const postsRoutes = require('./routes/posts');
const cors = require('cors');

app.use(cors()); // pour autoriser le frontend à appeler l'API
app.use('/api/posts', postsRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));