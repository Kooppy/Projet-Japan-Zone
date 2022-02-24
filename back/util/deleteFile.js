/*
 * Delete: One File
 * ****************************/

const fs = require('fs'),
      path = require('path')

exports.deleteFile = (dir, file) => {
    fs.unlink(path.join(dir, file), (err) => {
        if (err) throw err;
    });
}