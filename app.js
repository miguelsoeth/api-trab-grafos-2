const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const citiesRoutes = require('./routes/cities');
const pathsRoutes = require('./routes/paths');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/cidades', citiesRoutes);
app.use('/caminho-mais-barato', pathsRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
