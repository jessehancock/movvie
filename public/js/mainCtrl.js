// INITILIZE CONTROLLER
// ============================================================
angular.module("app").controller("mainCtrl", function($scope, mainServ, $state) {
    $scope.apiKey = '8ff7b56';


    $scope.moviefunc = function(title){
      // $state.href("/search", { search: title });
        $('.steve-jobs').hide();
        $('.movies-container').hide();
        $('#loading').show();
      mainServ.getMovie(title).then(function(response){
        $('.movies-container').show();
        $('#loading').hide();
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

    $(window).load(function() {
     $('#loading').hide();
  });

  $('.clicker').on('click',function(){
    $state.go('search');
    setTimeout(function () {
      var input = document.getElementById('selecter');
      input.focus();
      input.select();
    }, 10);
  });


});
