/**
 * Created by falvojr on 13/10/15.
 */
(function () {
    'use strict';

    angular.module('app')
        .controller('CarouselController', CarouselController);

    CarouselController.$inject = ['$scope', 'CoreService', 'API'];

    /* @ngInject */
    function CarouselController($scope, coreService, API) {
        var vm = this;
        vm.title = 'ControllerName';

        activate();

        ////////////////

        function activate() {
            $scope.w = window.innerWidth;
            $scope.h = window.innerHeight;

            var promise = coreService.getDropboxImages();
            promise.then(successCallback, errorCallback);
        }

        function successCallback(resp) {
            $scope.images = resp.data;
        }

        function errorCallback(error) {
            $scope.images = [];
            console.error(error);
        }
    }
})();




