(function() {
    'use strict';

    angular
        .module('planApp')
        .controller('calenderController', calenderController);

        calenderController.$inject = ['$scope','$sce'];
    function calenderController($scope,$sce) {
        var calenderCtrl = this;

        calenderCtrl.value = {
            template: "",
            today: {
                year: "",
                month: "",
                weekday: "",
                date: ""
            },
            startDate: ""
        }

        const jquery = require("./../../node_modules/jquery/dist/jquery.min.js");

        init();

        function init(){
            // jquery('.calender-table tbody > tr:last').after($scope.indexCtrl.value.template);
            jquery('.calender-table > thead:last').after($scope.indexCtrl.value.template);
            
            //カレンダーの日付設定
            var today = new Date();
            calenderCtrl.value.today.year = today.getFullYear();
            calenderCtrl.value.today.month = today.getMonth()+1;
            calenderCtrl.value.today.weekday = today.getDay();
            calenderCtrl.value.today.date = today.getDate();

            var weekdayOffset = [6, 0, 1, 2, 3, 4, 5]

            calenderCtrl.value.startDate = calenderCtrl.value.today.date - weekdayOffset[calenderCtrl.value.today.weekday];
            //カレンダー作成
            // var template = "";
            // for(var i=0; i<25; i++){
            //     if(i < 10){
            //         template += "<tr class='calender-time-border'><td class='calender-time'>0" + i + ":00</td>";
            //     }else{
            //         template += "<tr><td class='calender-time'>" + i + ":00</td>";
            //     }
            //     for(var j=0; j<6; j++){
            //         template += "<td class='calender-content'></td>";
            //     }
            //     template += "<td class='calender-content' style='border-right: none;'></td></tr>";

            //     for(var y=0; y<3; y++){
            //         template += "<tr><td class='calender-time'></td>";
            //         for(var z=0; z<6; z++){
            //             template += "<td class='calender-content'></td>";
            //         }
            //         template += "<td class='calender-content' style='border-right: none;'></td></tr>";
            //     }
            // }
            // jquery('.calender-table tbody > tr:last').after(template);
        };


    }
}());