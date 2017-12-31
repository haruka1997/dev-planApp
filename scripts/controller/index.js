import { calenderTemplate } from "./calenderTemplate";

(function() {
    'use strict';

    angular
        .module('planApp')
        .controller('indexController', indexController);

    indexController.$inject = ['$scope', '$location'];
    function indexController($scope, $location) {
        $scope.indexCtrl = this;

        $scope.indexCtrl.value = {
            flag: {
                isCalenderTab: true,
                isCalenderMenu: true,
            },
            style: {
                tag: {},
                allDay: true
            },
            selectTag: 0,
            createPlan: {},
            template: ""
        };

        $scope.indexCtrl.method = {
            clickTabBtn: clickTabBtn,
            clickAddBtn: clickAddBtn,
            changeAllday:changeAllday
        };

        const jquery = require("./../../node_modules/jquery/dist/jquery.min.js");

        $scope.indexCtrl.value.template = require('./calenderTemplate');

        init();

        function init(){
            $scope.indexCtrl.value.flag.isCalenderMenu = true;

            //タグ色
            $scope.indexCtrl.value.style.tag = [
                [{backgroundColor: '#FFEBEE'}, {backgroundColor: '#E1F5FE'}, {backgroundColor: '#E8F5E9'}], //none
                [{backgroundColor: '#EF5350'}, {backgroundColor: '#E1F5FE'}, {backgroundColor: '#E8F5E9'}], //red
                [{backgroundColor: '#FFEBEE'}, {backgroundColor: '#29B6F6'}, {backgroundColor: '#E8F5E9'}], //blue
                [{backgroundColor: '#FFEBEE'}, {backgroundColor: '#E1F5FE'}, {backgroundColor: '#66BB6A'}]  //green
            ];

        }

        /**
         * タブボタンクリックメソッド
         * @param {*} btn 
         */
        function clickTabBtn(btn){
            console.log(btn)
            if(btn == 'calender'){
                $scope.indexCtrl.value.flag.isCalenderTab = true;
                $location.path('/');
            }else{
                $scope.indexCtrl.value.flag.isCalenderTab = false;
                $location.path('/task');
            }
        }

        /**
         * 追加ボタンクリックメソッド
         */
        function clickAddBtn(){
            //タグ色の設定
            $scope.indexCtrl.value.createPlan.tag = $scope.indexCtrl.value.selectTag;
            var startHour = Number($scope.indexCtrl.value.createPlan.startTime.getHours());
            var startMinute = Number($scope.indexCtrl.value.createPlan.startTime.getMinutes());
            startMinute = Math.floor(startMinute / 15) * 15;
            var tdNthChild = '';
            var trNthChild = '';
            var rowspan = '';

            //どの行に予定を追加するか調整
            var nthDay = $scope.indexCtrl.value.createPlan.startDate.getDay();
            if(nthDay == 0){ //日曜日
                tdNthChild = 'nth-child(' + 8 + ')';
            }else{          //その他
                tdNthChild = 'nth-child(' + Number(nthDay+1) + ')';
            }

            //どの列に予定を追加するか調整
            var nthHour = startHour * 4 + 2;
            nthHour += startMinute / 15;
            trNthChild = 'nth-child(' + nthHour + ')';

            //rowspanの設定
            var gapMinute = ($scope.indexCtrl.value.createPlan.finishTime.getTime() - $scope.indexCtrl.value.createPlan.startTime.getTime()) / 60000;
            rowspan = gapMinute / 15;

            //削除するtrの設定
            var deletetrNthChild = [];
            for(var i=1; i<rowspan; i++){
                deletetrNthChild.push('nth-child(' + Number(nthHour+i) + ')');
            }

            //時間の表示形式の設定
            if(startHour < 10){
                startHour = '0' + startHour;
            }
            if(startMinute < 10){
                startMinute = '0' + startMinute;
            }

            //タグ(id)の設定
            var id = '';
            if($scope.indexCtrl.value.createPlan.tag == 1){
                id = 'red';
            }else if($scope.indexCtrl.value.createPlan.tag == 2){
                id = 'blue';
            }else if($scope.indexCtrl.value.createPlan.tag == 3){
                id = 'green';
            }

            //予定の追加
            jquery('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).html(startHour + ":" + startMinute + ' ' +$scope.indexCtrl.value.createPlan.name);
            jquery('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).attr('id', id);
            jquery('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).attr('rowspan', rowspan);
            //trの削除
            for(var j=0; j<deletetrNthChild.length; j++){
                jquery('.calender-table tbody:' + deletetrNthChild[j] + ' td:nth-child(2)').remove();
            }

            //カレンダーテンプレートの更新
            var template = "";
            template = jquery('.calender-table tbody').html();
            $scope.indexCtrl.value.template = '<tbody>' + template + '</tbody>';
        }

        function changeAllday(value){
            console.log(value)
        }

    }
}());