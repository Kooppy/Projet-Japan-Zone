/*
 * Config: Sharp
 * ************** */

const sharp = require('sharp'),
      { deleteFile } = require('../../util/deleteFile');

module.exports = (req, res, next) => {
    if(req.file) {
        let pathSharp, quality, width, height, fit

        pathSharp = `${req.file.destination}/`;
        switch (req.url) {
            case `/admin/blog`:
                fit = sharp.fit.cover
                height= 400
                witdh= 400
                quality= 100

                break;

            case `/admin/gallery`:
                fit = sharp.fit.cover
                height= 400
                witdh= 400
                quality= 100

                break;

            case `/admin/user/${id}`:
                fit = sharp.fit.cover
                height= 400
                witdh= 400
                quality= 100

                break;

            case `/admin/blog/${id}`:
                fit = sharp.fit.cover
                height= 400
                witdh= 400
                quality= 100

                break;

            default:
                break;
        }

        console.log(req.file.filename);

        sharp(req.file.path).resize({ fit: fit, height: height, width: width})
                            .webp({quality: quality})
                            .toFile(pathSharp + req.file.filename.split('.').slice(0, -1).join('.') + ".webp")
                            .then(() => {
                                

                                deleteFile(req.file.destination, req.file.filename);
                            })

        req.file.path = `${pathSharp}${req.file.filename.split('.').slice(0, -1).join('.')}.webp`;

        next(); 
    } else {
        next();
    }
}