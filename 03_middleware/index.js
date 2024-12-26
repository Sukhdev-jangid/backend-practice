const express = require('express');

const token = '12345';

const app = express();

const checkToken = (req,res,cb) => {
    console.log(req.params);
    if(!req.params.key) return res.send('please send a key');
    if(req.params.key !== token) return res.send("please send a valid key");
    cb();
}

app.get('/:key?', checkToken, (req, res) => {
    res.send("hello world");
});

app.listen(4000, () => {
    console.log("server is running on port 4000");
})