const express = require('express');
const app = express();
const port = 3000;
const router = require('./services/routerConfig');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(port, ()=>{
  console.log('conexão estabelecida.')
})