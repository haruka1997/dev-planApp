(function() {
    'use strict';

    angular
        .module('planApp')
        .controller('indexController', indexController);

    indexController.$inject = ['$scope'];
    function indexController($scope) {
        $scope.indexCtrl = this;

        $scope.indexCtrl.value = {
            flag: {
                isCalenderTab: true,
                isCalenderMenu: true,
            },
        };

        $scope.indexCtrl.method = {
            clickTabBtn: clickTabBtn,
        }

        init();

        function init(){
            $scope.indexCtrl.value.flag.isCalenderMenu = true;
        }

        /**
         * タブボタンクリックメソッド
         * @param {*} btn 
         */
        function clickTabBtn(btn){
            if(btn == 'calender'){
                $scope.indexCtrl.value.flag.isCalenderTab = true;
                window.location.href = './#!/';
            }else{
                $scope.indexCtrl.value.flag.isCalenderTab = false;
                window.location.href = './#!/task';
            }
        }
    }
}());