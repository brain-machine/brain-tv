/**
 * Created by falvojr on 13/10/15.
 */
'use strict'

var express = require('express')
var serveIndex = require('serve-index')
var serveStatic = require('serve-static')
var fs = require('fs')

var oneDay = 86400000

module.exports = function (app) {

    // provides static access to dropbox folder with one day cache.
    app.use('/api/dropbox', serveStatic('/home/falvojr/Dropbox', {
        maxAge: oneDay
    }));

    app.get('/api/dropbox', getDropboxFiles);

    function getDropboxFiles(req, res, next) {
        fs.readdir('/home/falvojr/Dropbox', function (err, data) {
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