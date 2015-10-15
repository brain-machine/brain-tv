/**
 * Created by falvojr on 13/10/15.
 */
(function (io) {
    'use strict';

    angular.module('app')
        .service('CoreService', CoreService);

    CoreService.$inject = ['$http'];

    /* @ngInject */
    function CoreService($http) {
        this.getDropboxImages = getDropboxImages;
        this.onUpdateImages = onUpdateImages;

        ////////////////

        function getDropboxImages() {
            return $http.get('/api/image');
        }

        function onUpdateImages(event) {
            io.connect("http://localhost:3001").on('update-images', event);
        }
    }

})(io);

