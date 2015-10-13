module.exports = function(app) {

    var express = require('express');
    var fs = require('fs');
    var serveIndex = require('serve-index');

    app.use('/static', express.static('/home/falvojr/Dropbox', { maxAge: 86400000 }));  // provides static access to
    app.use('/static', serveIndex('/home/falvojr/Dropbox', {'icons': true}));

    app.get('/api/dropbox', getDropboxFiles);

    function getDropboxFiles(req, res, next) {
        console.log("Entrou!");
        fs.readdir('/home/falvojr/Dropbox', 'utf8', function (err,data) {
            console.log("Entrou!");
            if (err) throw err;
            res.send("/usr files: " + files);
        });
    }
};