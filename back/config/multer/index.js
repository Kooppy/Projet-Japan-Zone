/*
 * Config: Multer
 * ************** */
const multer = require('multer'),
    {
        existsSync,
        mkdirSync
    } = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const { id } = req.params,
              { title, pseudo } = req.body;

        let dir;

        switch (req.url) {
            case `/admin/blog`:
                dir = `./assets/images/blog/${title.split(' ').join('_')}`;

                break;

            case `/admin/gallery`:
                dir = `./assets/images/gallery/${file.fieldname.split(' ').join('_')}`;

                break;

            case `/admin/user/${id}`:
                dir = `./assets/images/avatar/${pseudo.split(' ').join('_')}`;

                break;

            case `/admin/blog/${id}`:
                dir = `./assets/images/blog/${title.split(' ').join('_')}`;

                break;

            default:
                break;
        }
        
        if (!existsSync(dir)) {
            mkdirSync(dir);
        }

        callback(null, dir);
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'),
              { id } = req.params;
        let completed;

        switch (req.url) {
            case `/admin/blog`:
                completed = Date.now()+"_blog_"+name

                break;

            case `/admin/gallery`:
                completed = Date.now()+"_gallery_"+name

                break;

            case `/admin/user/${id}`:
                completed = Date.now()+"_user_"+name

                break;

            case `/admin/blog/${id}`:
                completed = Date.now()+"_blog_"+name

                break;

            default:
                break;
        }
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