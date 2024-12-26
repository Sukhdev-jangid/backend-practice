const express = require('express');

const app = express();

const router1 = express.Router();
const router2 = express.Router();
const router3 = express.Router();
const router4 = express.Router();
const router5 = express.Router();


const m1 =(req,res,cb)=>{console.log('m1'); cb();};
const m2 =(req,res,cb)=>{console.log('m2'); cb();};
const m3 =(req,res,cb)=>{console.log('m3'); cb();};
const m4 =(req,res,cb)=>{console.log('m4'); cb();};
const m5 =(req,res,cb)=>{console.log('m5'); cb();};
const m6 =(req,res,cb)=>{console.log('m6'); cb();};

app.use(m1);
router1.use(m2);
router2.use(m3);
router3.use(m4);
router4.use(m5,m6);
router5.use(m6);

router1.get('/r1',(req,res)=>{res.send("response 1")});
router1.get('/r2',(req,res)=>{res.send("response 2")});
router1.get('/r3',(req,res)=>{res.send("response 3")});
router1.get('/r4',(req,res)=>{res.send("response 4")});
router2.get('/r5',(req,res)=>{res.send("response 5")});
router2.get('/r6',(req,res)=>{res.send("response 6")});
router2.get('/r7',(req,res)=>{res.send("response 7")});
router2.get('/r8',(req,res)=>{res.send("response 8")});
router3.get('/r9',(req,res)=>{res.send("response 9")});
router3.get('/r10',(req,res)=>{res.send("response 10")});
router3.get('/r11',(req,res)=>{res.send("response 11")});
router3.get('/r12',(req,res)=>{res.send("response 12")});
router4.get('/r13',(req,res)=>{res.send("response 13")});
router4.get('/r14',(req,res)=>{res.send("response 14")});
router4.get('/r15',(req,res)=>{res.send("response 15")});
router5.get('/r16',(req,res)=>{res.send("response 16")});
router5.get('/r17',(req,res)=>{res.send("response 17")});
router5.get('/r18',(req,res)=>{res.send("response 18")});
router5.get('/r19',(req,res)=>{res.send("response 19")});
router5.get('/r20',(req,res)=>{res.send("response 20")});


app.use('/type1',router1);
app.use('/type2',router2);
app.use('/type3',router3);
app.use('/type4',router4);
app.use('/type5',router5);

app.listen(4500,()=>{
    console.log("server is running on port 4500")
})