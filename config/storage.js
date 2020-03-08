const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './uploads');
    },
    filename: (req, res, cb) => {
        cb(null, res.fieldname + '-' + Date.now() + path.extname(res.originalname));
    }
})

module.exports = storage;