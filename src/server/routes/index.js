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
    app.use('/api/images', serveStatic(dataConfig.DROPBOX_DIRECTORY, {
        maxAge: oneDay
    }));

    app.get('/api/images', getDropboxFiles);

    function getDropboxFiles(req, res, next) {
        fs.readdir(dataConfig.DROPBOX_DIRECTORY, function (err, data) {
            if (err) throw err;
            var images = [];
            console.log(data)
            for (var index = 0, size = data.length; index < size; ++index) {
                var fileName = data[index];
                var isDotIgnore = fileName.slice(0, 1) == '.';
                if (!isDotIgnore) {
                    var image = {
                        name: getFileWithoutExtension(fileName),
                        url: getFullOriginalUrl(req) + fileName
                    }
                    images.push(image);
                }
            }
            res.send(images);
        });
    }

    function getFileWithoutExtension(fileName) {
        return (/[.]/.exec(fileName)) ? fileName.replace(/\.[^.]+$/, '') : fileName;
    }

    function getFullOriginalUrl(req) {
        return req.protocol + '://' + req.get('host') + req.originalUrl;
    }
};