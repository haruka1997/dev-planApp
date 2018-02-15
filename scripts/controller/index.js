import { calenderTemplate } from "./calenderTemplate";

(function() {
    'use strict';

    angular
        .module('planApp')
        .controller('indexController', indexController);

    indexController.$inject = ['$scope', '$location','$compile'];
    function indexController($scope, $location, $compile) {
        $scope.indexCtrl = this;

        $scope.indexCtrl.value = {
            flag: {
                isCalenderTab: true,
                isCalenderMenu: true,
                isDetailPlan: false //予定を編集中かどうか
            },
            style: {
                tag: {},
                allDay: true
            },
            selectTag: 0,
            createPlan: {},
            detailPlan: {},
            template: ""
        };

        $scope.indexCtrl.method = {
            clickTabBtn: clickTabBtn,
            clickAddBtn: clickAddBtn,
            clickPlan: clickPlan,
            clickDetailPlan:clickDetailPlan,
            clickDeletePlan: clickDeletePlan
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
            if(btn == 'calender'){
                $scope.indexCtrl.value.flag.isCalenderTab = true;
                $location.path('/');
            }else{
                $scope.indexCtrl.value.flag.isCalenderTab = false;
                $location.path('/task');
            }
        }

        /**
         * 追加ボタンクリックメソッド(予定の追加処理)
         */
        function clickAddBtn(){
            //タグ色の設定
            $scope.indexCtrl.value.createPlan.tag = $scope.indexCtrl.value.selectTag; //選択したタグの取得
            var startHour = Number($scope.indexCtrl.value.createPlan.startTime.getHours()); //開始時
            var startMinute = Number($scope.indexCtrl.value.createPlan.startTime.getMinutes()); //開始分
            startMinute = Math.floor(startMinute / 15) * 15; //開始分を15分刻みで切り捨て
            var tdNthChild = ''; //どの曜日に予定を追加するかを設定 (例：nth-child(2) => 月曜日)
            var trNthChild = ''; //どの時間に予定を追加するかを設定(例：nth-child(1) => 0時)
            var rowspan = ''; //結合するマス数 (例：15分間 => 1)

            /**
             * どの列に予定を追加するか調整
             */
            var nthDay = $scope.indexCtrl.value.createPlan.startDate.getDay(); //開始曜日(0:日曜, 1:月曜...)
            if(nthDay == 0){ //日曜日の場合
                tdNthChild = 'nth-child(' + 8 + ')'; //8列目(日曜日の列)に設定
            }else{          //その他
                tdNthChild = 'nth-child(' + Number(nthDay+1) + ')'; //曜日値 + 1列目に設定(例：月曜 => 1+1=2列目)
            }

            /**
             * どの行に予定を追加するか調整 
             */
            var nthHour = startHour * 4 + 2; //例：0時 => 2行目
            nthHour += startMinute / 15; //例：30分 => +2行目
            trNthChild = 'nth-child(' + nthHour + ')'; //例：0時30分 => 4行目 から予定を追加する

            /**
             * rowspanの設定
             */ 
            //終了時間 - 開始時間の分を取得(例：00:30〜01:00 => 30)
            var gapMinute = ($scope.indexCtrl.value.createPlan.finishTime.getTime() - $scope.indexCtrl.value.createPlan.startTime.getTime()) / 60000;
            rowspan = gapMinute / 15; //例：30分間 => 2行分結合する

            /**
             * 削除する行の設定(結合した分だけ行を削除する)
             */
            var deletetrNthChild = []; //削除する行の配列
            for(var i=1; i<rowspan-1; i++){ //rowspanした分だけ
                deletetrNthChild.push('nth-child(' + Number(nthHour+i) + ')'); //削除する行の情報を配列に格納
            }

            /**
             * 時間の表示形式の設定(10以下は0埋め処理)
             */ 
            if(startHour < 10){
                startHour = '0' + startHour;
            }
            if(startMinute < 10){
                startMinute = '0' + startMinute;
            }

            /**
             * タグ(id)の設定
             */ 
            var id = ''; //タグのid
            if($scope.indexCtrl.value.createPlan.tag == 1){
                id = 'red';
            }else if($scope.indexCtrl.value.createPlan.tag == 2){
                id = 'blue';
            }else if($scope.indexCtrl.value.createPlan.tag == 3){
                id = 'green';
            }

            /**
             * 予定の追加
             */ 
            //予定を追加する対象行列に時間と予定名を追加
            jquery('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).html(startHour + ":" + startMinute + ' ' +$scope.indexCtrl.value.createPlan.name);
            jquery('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).attr('id', id); //idを付与(タグごとに色分けするため)
            jquery('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).attr('ng-click', 'indexCtrl.method.clickPlan()'); //クリックイベントを付与
            $compile(jquery('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild))($scope); //クリックイベントが作動するようにコンパイル
            jquery('.calender-table tbody tr:' + trNthChild + ' td:' + tdNthChild).attr('rowspan', rowspan);  //rowspanの設定

            /**
             * 行の削除
             */ 
            for(var j=0; j<deletetrNthChild.length; j++){ //削除する行分
                jquery('.calender-table tbody tr:' + deletetrNthChild[j] + ' td:' + tdNthChild).remove(); //対象要素を削除
            }

            /**
             * カレンダーテンプレートの更新
             */ 
            var template = ""; //更新用のカレンダーテンプレート
            template = jquery('.calender-table tbody').html(); //上記で作成したテーブル要素をテンプレートに格納
            $scope.indexCtrl.value.template = '<tbody>' + template + '</tbody>'; //カレンダーテンプレートの更新
        }

        /** 
         * カレンダー内にある予定をクリックした時のイベント
         * 詳細モーダル上に予定名、開始日・時刻、終了日・時刻、タグ、メモを表示
         */
        function clickPlan(){
            $scope.indexCtrl.value.flag.isDetailPlan = true; //予定を詳細表示中にする

            //横タブメニューの表示
            jquery('.mdl-layout__drawer').addClass('is-visible');
            jquery('.mdl-layout__obfuscator').addClass('is-visible'); 

            //クリックした予定の情報を表示
        }

        /** 
         * 予定の編集を選択した時の処理メソッド
         */
        function clickDetailPlan(){
           
        }
        
        /**
         * 予定の削除を選択した時の処理メソッド
         */
        function clickDeletePlan(){

        }

    }
}());