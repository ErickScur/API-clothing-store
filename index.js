const express = require('express');
const connection = require('./src/database/database');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./src/routes');
const Image = require('./src/models/Image');

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados");
    })
    .catch((erro) => {
        console.log(erro);
    });
    
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use(routes);

app.get("/health",(req,res)=>{
    res.json({"status":"running"});
});
app.get('/test',(req,res)=>{
    res.render('test');
})

app.listen(8080, ()=>{
    console.log("Servidor rodando");
});

