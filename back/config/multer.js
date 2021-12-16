/*
 * Config: Multer
 * ************** */ 

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './assets/images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        callback(null, name);
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2000000 // 2 000 000 Bytes
    },
    fileFilter: (req, file, callback) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
            callback(null, true);
        } else {
            callback(null, false);
        }
    }

})

module.exports = upload;