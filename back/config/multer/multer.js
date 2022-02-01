/*
 * Config: Multer
 * ************** */ 

const multer = require('multer'),
      { mkdir } = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const name = { ...req.body};
        let fieldName = '';

        file.fieldname === 'picBlog' ? fieldName = `blog/${name.title.split(' ').join('_')}` : file.fieldname === 'picUser' ? fieldName = `avatar/${name.pseudo.split(' ').join('_')}` : file.fieldname === 'picGallery' ? fieldName = `gallery/${name.title.split(' ').join('_')}` : console.log("rdegre"); ;

        console.log("regregregrregreggreggegergrrg",file);

        callback(null, `./assets/images/${fieldName}`);
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
        console.log(file.size);
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" && file.size ){
            mkdir(`./assets/images/blog/oui`, { recursive: true }, (err) => {
                if (err) throw err;
            }) 
            callback(null, true);
        } else {
            callback(null, false);
        }
    }

})

module.exports = upload;