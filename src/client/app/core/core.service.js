/**
 * Created by falvojr on 13/10/15.
 */
(function () {
    'use strict';

    angular.module('app')
        .service('CoreService', CoreService);

    CoreService.$inject = ['$http'];

    /* @ngInject */
    function CoreService($http) {
        this.getDropboxImages = getDropboxImages;

        ////////////////

        function getDropboxImages() {
            return $http.get('/api/image');
        }
    }

})();

