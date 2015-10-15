/**
 * Created by falvojr on 13/10/15.
 */
'use strict'

var dataConfig = require('../data/config');
var fs = require('fs');
var gm = require('gm').subClass({ imageMagick: true });

module.exports = function (app) {

    app.get('/api/image/:file', getImage);

    app.get('/api/image', getAllImages);

    function getImage(req, res, next) {
        var heigth = req.query.h;
        var weight = req.query.w;

        console.log(weight + "x" + heigth);
        console.log(req.params.file);

        gm(dataConfig.DROPBOX_DIRECTORY + req.params.file)
            .resize(weight, heigth)
            .stream()
            .pipe(res);
    }

    function getAllImages(req, res, next) {
        fs.readdir(dataConfig.DROPBOX_DIRECTORY, function (err, data) {
            if (err) console.log(err);
            var images = [];
            var id = 0;
            for (var index = 0, size = data.length; index < size; ++index) {
                var fileName = data[index];
                var isDotIgnore = fileName.slice(0, 1) == '.';
                if (!isDotIgnore) {
                    var image = {
                        id: id++,
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
        return req.protocol + '://' + req.get('host') + req.originalUrl + "/";
    }
};