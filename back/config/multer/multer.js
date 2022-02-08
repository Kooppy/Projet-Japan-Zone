/*
 * Config: Multer
 * ************** */

const {
    MulterError
} = require('multer');
const multer = require('multer'),
    {
        mkdir,
        existsSync,
        mkdirSync,
        rmdirSync
    } = require('fs');

let iscorrect = (data) => {
    const name = {
        ...data
    };
    let fieldName = '';


    name.file.fieldname === 'picBlog' ? fieldName = `blog/${name.title.split(' ').join('_')}` : name.file.fieldname === 'picUser' ? fieldName = `avatar/${name.pseudo.split(' ').join('_')}` : name.file.fieldname === 'picGallery' ? fieldName = `gallery/${name.title.split(' ').join('_')}` : console.log("rdegre");

    let dir = `./assets/images/${fieldName}`
    if (!existsSync(dir)) {
        mkdirSync(dir);
        return dir;
    } else {
        return dir;
    }
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log('req multer', req.url)
        // switch (req.url) {
        //     case '/admin':
        //         dir = req.url

        //         break;

        //     case '/admin':

        //         break;

        //     default:
        //         break;
        // }
        let test = {
            ...req.body,
            file
        }
        // const name = { ...req.body};
        // let fieldName = '';

        // file.fieldname === 'picBlog' ? fieldName = `blog/${name.title.split(' ').join('_')}` : file.fieldname === 'picUser' ? fieldName = `avatar/${name.pseudo.split(' ').join('_')}` : file.fieldname === 'picGallery' ? fieldName = `gallery/${name.title.split(' ').join('_')}` : console.log("rdegre"); ;
        req.kakawait = 'kakawait'
        callback(null, iscorrect(test));
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        let completed;
        file.fieldname === 'picBlog' ? completed = Date.now()+"_blog_"+name : file.fieldname === 'picUser' ? fieldName = Date.now()+"_user_"+name : file.fieldname === 'picGallery' ? fieldName = Date.now()+"_gallery_"+name : console.log("rdegre");
        callback(null, completed);
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2000000 // 2 000 000 Bytes
    },
    fileFilter: (req, file, callback) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            callback(null, true);
        } else {
            callback(null, false);
        }
    }
})

module.exports = upload;