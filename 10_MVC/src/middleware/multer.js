const multer = require("multer");

const uploads = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'files');
        },
        filename: (req, file, cb) => {
            const name = req.body.name.split(' ');
            cb(null, name[0] + Date.now() + Math.floor(Math.random() * 99999) + path.extname(file.originalname));
        }
    })
}).fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]);

module.exports = uploads;