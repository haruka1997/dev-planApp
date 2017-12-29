(function() {
    'use strict';

    angular
        .module('planApp')
        .controller('taskController', taskController);

        taskController.$inject = ['$scope'];
    function taskController($scope) {
        var taskCtrl = this;
    }
}());