const express = require('express');
const app = express();
const path = require('node:path');
const port = 3000;
const router = require('../src/routes/routerConfig');
// const userAuth = require();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

//app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(port, ()=>{
  console.log('conexão estabelecida.')
})