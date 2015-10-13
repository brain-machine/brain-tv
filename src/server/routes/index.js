/**
 * Created by falvojr on 13/10/15.
 */
'use strict'

var dataConfig = require('../data/config');
var serveStatic = require('serve-static')
var fs = require('fs')

var oneDay = 86400000

module.exports = function (app) {

    // provides static access to dropbox folder with one day cache.
    app.use('/api/images', serveStatic(dataConfig.PATH_DROPBOX, {
        maxAge: oneDay
    }));

    app.get('/api/images', getDropboxFiles);

    function getDropboxFiles(req, res, next) {
        fs.readdir(dataConfig.PATH_DROPBOX, function (err, data) {
            if (err) throw err;
            var images = [];
            console.log(data)
            for (var index = 0, size = data.length; index < size; ++index) {
                var fileName = data[index];
                if (fileName.slice(0, 1) != '.') {
                    var image = {
                        name: fileName,
                        path: req.originalUrl + fileName
                    }
                    images.push(image);
                }
            }
            res.send(images);
        });
    }
};