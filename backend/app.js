const express = require('express')
const  bodyParser = require('body-parser') ;
const cors = require('cors');
const tarefaController = require('./controllers/tarefaController')
const app = express();
const port = 2024


app.use(cors())
app.use(bodyParser.json())
app.use('/tarefas', tarefaController);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});