const express = require('express')

const app = express();

app.get('/',(req,res)=>{res.send('sulh')})
app.post('/create-post',(req,res)=>{res.send('create-post')})
app.get('/create-post',(req,res)=>{res.send('create-post')})

app.listen(4500);