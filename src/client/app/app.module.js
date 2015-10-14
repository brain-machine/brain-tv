/**
 * Created by falvojr on 13/10/15.
 */
(function () {
    'use strict';

    angular.module('app', [ ])
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
            $scope.uri = "http://lorempixel.com";
            $scope.folders = [
                'abstract',
                'animals',
                'business',
                'cats',
                'city',
                'food',
                'night',
                'life',
                'fashion',
                'people',
                'nature',
                'sports',
                'technics',
                'transport'
            ];

            var promise = coreService.getDropboxImages();
            promise.then(successCallback, errorCallback);
        }

        function successCallback(resp) {
            $scope.images = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

            $scope.currentFolder = $scope.folders[0];
            $scope.selectFolder = function (folder) {
                $scope.currentFolder = folder;
            };
            $scope.activeFolder = function (folder) {
                return (folder === $scope.currentFolder) ? 'active' : '';
            };
        }

        function errorCallback(resp) {

        }
    }
})();




