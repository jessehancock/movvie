// INITILIZE CONTROLLER
// ============================================================
angular.module("app").controller("mainCtrl", function($scope, mainServ) {
    $scope.apiKey = '8ff7b56';

    $scope.moviefunc = function(title){
      //set background gif
      mainServ.getMovie(title).then(function(response){
        //set background off
        $scope.displayMovies = response;

      });
    };

    $scope.secondfunc = function(id){
    console.log(id);
      mainServ.getDisc(id).then(function(response){
        console.log(response);
        $scope.displayMovie = response;
        });
    };

    $scope.hello = function(input){
      console.log(input);
    };



});
