
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const produtoController = require('./controller/produtoController');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/produtos', produtoController);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
