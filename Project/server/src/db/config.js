const mongoose = require('mongoose');
const {DB_USERNAME,DB_NAME,DB_CLUSTER,DB_PASSWORD} = process.env;

const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}.zz0fj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=${DB_CLUSTER}`;

mongoose.connect(url)
.then(()=>{
    console.log('connected to mongoDB');
})
.catch((err)=>{
    console.log('error connecting to mongoDB',err);
})