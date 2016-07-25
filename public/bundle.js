
// INITILIZE APP
// ============================================================
angular.module("app", []);
// INITILIZE CONTROLLER
// ============================================================
angular.module("app").controller("mainCtrl", ["$scope", "mainServ", function ($scope, mainServ) {
  $scope.apiKey = '8ff7b56';

  $scope.moviefunc = function (title) {
    //set background gif
    mainServ.getMovie(title).then(function (response) {
      //set background off
      $scope.displayMovies = response;
    });
  };

  $scope.secondfunc = function (id) {
    console.log(id);
    mainServ.getDisc(id).then(function (response) {
      console.log(response);
      $scope.displayMovie = response;
    });
  };

  $scope.hello = function (input) {
    console.log(input);
  };
}]);
// INITILIZE SERVICE
// ============================================================
angular.module("app").service("mainServ", ["$http", "$q", function ($http, $q) {
  // CRUD FUNCTIONS
  // ============================================================
  var searchURL = 'http://www.omdbapi.com/?s=';
  var searchID = 'http://www.omdbapi.com/?i=';

  this.getMovie = function (title) {
    var counter = 1;
    var returnData = [];
    var defer = $q.defer();
    var filterData = function () {
      $http({
        method: 'GET',
        url: searchURL + title + '&type=movie&page=' + counter
      }).then(function (response) {
        if (response.data.Response === "False") {
          console.log(counter, returnData);
          defer.resolve(returnData);
        }
        if (response.data.Search.length) {
          console.log(response.data);
          var resultsArr = response.data.Search;
          for (var i = resultsArr.length - 1; i > -1; i--) {
            if (resultsArr[i].Poster === 'N/A') resultsArr.splice(i, 1);
          }
          returnData.push(...resultsArr);
        }
        counter++;
        filterData();
      });
    };
    filterData();
    return defer.promise;
  };

  this.getDisc = function (id) {
    return $http({
      method: 'GET',
      url: searchID + id
    }).then(function (response) {
      console.log(response);
      return response.data;
    });
  };

  // OTHER FUNCTIONS
  // ============================================================
}]);