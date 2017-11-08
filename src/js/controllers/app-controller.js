'use strict';

appController.$inject = ['$scope', 'httpService'];

export default function appController($scope, httpService) {

  $scope.progressBar = {};
  $scope.progressBar.activeBar = "0";
  $scope.init = function(){

    httpService.getResults('./json/bus-services-data.json').then(function(result){
      $scope.busReports = result.data;
    }, function(){

    });

    $scope.toggle = function($event){
      $($event.target).toggleClass('icon-up');
      $($event.target).toggleClass('icon-down');
      setTimeout(function(){
        $($event.target).parents('.bus-reports-container').find('textarea').attr('placeholder', 'Enter notes here');
      }, 200);
    };

    $scope.status = function(value){
      if(value === null){
        return 'Unknown';
      } else if(value > 300){
        return 'Late';
      } else if(value < 0){
        return 'Early';
      } else if(value <= 300){
        return 'On Time';
      } else {
        return 'Unknown';
      }
    };

    $scope.statusClass = function(value){
      if(value === null){
        return 'unknown';
      } else if(value > 300){
        return 'late';
      } else if(value < 0){
        return 'early';
      } else if(value <= 300){
        return 'ontime';
      } else {
        return 'unknown';
      }
    };
  };

}

module.exports = appController;
