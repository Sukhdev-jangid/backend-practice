const { default: mongoose } = require("mongoose");

const url = `mongodb+srv://${process.env.DB_USERNMAE}:${process.env.DB_PASSWORD}@sukhdev0.zz0fj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER}`;
mongoose.connect(url)
    .then(() => {
        console.log('connect to database');
    })
    .catch(err => {
        console.log(err.message);
    });