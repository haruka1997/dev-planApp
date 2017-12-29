(function () {
    'use strict';

    // ルーティング設定
    angular
        .module('planApp',['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
    	$routeProvider
    	.when('/',{
    		templateUrl: './views/calender.html',
    		controller: 'calenderController',
            controllerAs: 'calenderCtrl',
        })
        .when('/task',{
    		templateUrl: './views/task.html',
    		controller: 'taskController',
            controllerAs: 'taskCtrl',
        })
    	.otherwise({
    		redirectTo: '/'
    	});
        }])
}());
