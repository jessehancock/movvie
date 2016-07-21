// INITILIZE CONTROLLER
// ============================================================
angular.module("app").controller("mainCtrl", function($scope, mainServ) {
    $scope.apiKey = '8ff7b56';

    $scope.moviefunc = function(title){
      mainServ.getMovie(title).then(function(response){
        $scope.displayMovies = response;

      });
    };

    $scope.secondfunc = function(id){
    console.log(id);
      mainServ.getDisc(id).then(function(response){
        console.log(response)
        $scope.displayMovie = response;
        });
    };



});
