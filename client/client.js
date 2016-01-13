var app = angular.module('ourApp', []);

app.controller('mainController', ['$scope', '$http', function($scope, $http){
    $scope.student_name = "";
    $scope.date_completed = new Date();
    $scope.assignment_number = 1;
    $scope.score = 100;
    $scope.assignmentsList = {};

    $scope.addAssignment = function(){

        var sendData = {};
        sendData.student_name = $scope.student_name;
        sendData.date_completed = $scope.date_completed;
        sendData.assignment_number = $scope.assignment_number;
        sendData.score = $scope.score;

        $http.post('/newAssignment', sendData).then(function(res){      //
        console.log();
      });
    };

    setInterval(function(){
        $http.get('/assignment').then(function(res){
            if (res.data != $scope.assignmentsList){
                $scope.assignmentsList = res.data;
                console.log($scope.assignmentsList);
            }
            //console.log(res.data);
        });
    }, 5000);
}]);