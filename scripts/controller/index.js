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
            style: {
                tag: {}
            },
            selectTag: 0,
            createPlan: {}
        };

        $scope.indexCtrl.method = {
            clickTabBtn: clickTabBtn,
            clickAddBtn: clickAddBtn
        };

        const jquery = require("./../../node_modules/jquery/dist/jquery.min.js");

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

            //カレンダー作成
            var template = "";
            for(var i=0; i<25; i++){
                if(i < 10){
                    template += "<tr class='calender-time-border'><td class='calender-time'>0" + i + ":00</td>";
                }else{
                    template += "<tr class='calender-time-border'><td class='calender-time'>" + i + ":00</td>";
                }
                for(var j=0; j<6; j++){
                    template += "<td class='calender-content'></td>";
                }
                template += "<td class='calender-content' style='border-right: none;'></td></tr>";

                for(var y=0; y<3; y++){
                    template += "<tr><td class='calender-time'></td>";
                    for(var z=0; z<6; z++){
                        template += "<td class='calender-content'></td>";
                    }
                    template += "<td class='calender-content' style='border-right: none;'></td></tr>";
                }
            }
            jquery('.calender-table tbody > tr:last').after(template);

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
            init();
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
            var nthDay = $scope.indexCtrl.value.createPlan.date.getDay();
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
                jquery('.calender-table tbody tr:' + deletetrNthChild[j] + ' td:nth-child(2)').remove();
            }
        }

    }
}());