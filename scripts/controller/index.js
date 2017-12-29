(function() {
    'use strict';

    angular
        .module('planApp')
        .controller('indexController', indexController);

    indexController.$inject = ['$scope'];
    function indexController($scope) {
        $scope.indexCtrl = this;
    }
}());