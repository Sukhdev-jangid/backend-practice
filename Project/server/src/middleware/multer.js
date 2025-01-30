const multer = require('multer');
const path = require('path');

const storage = (foldername) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./src/files/${foldername}`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + Math.floor(Math.random() * 99999) + path.extname(file.originalname));
    }
});

const multerStorage = (foldername) => multer({ storage: storage(foldername) }).fields([
    {
        name:'thumbnail',
        maxCount:1
    },
    {
        name:'logo',
        maxCount:1
    },
    {
        name:'favicon',
        maxCount:1
    },
    {
        name:'footer_logo',
        maxCount:1
    },
    {
        name: 'secondaryThumbnail',
        maxCount:1
    },
    {
        name:'gallery',
        maxCount:15
    }  
]);

module.exports= multerStorage;