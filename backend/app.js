const express = require('express');
const app = express();
const postsRoutes = require('./routes/posts');

app.use(express.json()); // pour lire le JSON dans les body
app.use('/api/posts', postsRoutes);

app.listen(3000, () => {
  console.log('Serveur lancé sur http://localhost:3000');
});
