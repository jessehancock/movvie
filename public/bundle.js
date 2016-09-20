// INITILIZE APP
// ============================================================
angular.module("app", ['ui.router']).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('search', {
    url: '/',
    templateUrl: './public/views/search.html',
    controller: 'mainCtrl'
  }).state('home', {
    url: '/home',
    templateUrl: './public/views/home.html',
    controller: 'mainCtrl'
  }).state('about', {
    url: '/about',
    templateUrl: './public/views/about.html',
    controller: 'mainCtrl'
  }).state('contact', {
    url: '/contact',
    templateUrl: './public/views/contact.html',
    controller: 'mainCtrl'
  });
}]);
// INITILIZE DIRECTIVE
// ============================================================
angular.module("app").directive('headerDirective', function () {
  return {
    restrict: 'EA',
    templateUrl: './public/views/headerTmpl.html',
    controller: 'mainCtrl'
  };
});
// INITILIZE CONTROLLER
// ============================================================
angular.module("app").controller("mainCtrl", ["$scope", "mainServ", "$state", function ($scope, mainServ, $state) {
  $scope.apiKey = '8ff7b56';

  $scope.moviefunc = function (title) {
    // $state.href("/search", { search: title });
    $('.steve-jobs').hide();
    $('.movies-container').hide();
    $('#loading').show();
    mainServ.getMovie(title).then(function (response) {
      $('.movies-container').show();
      $('#loading').hide();
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

  $(window).load(function () {
    $('#loading').hide();
  });

  $('.clicker').on('click', function () {
    $state.go('search');
    setTimeout(function () {
      var input = document.getElementById('selecter');
      input.focus();
      input.select();
    }, 10);
  });
}]);
// INITILIZE SERVICE
// ============================================================
angular.module("app").service("mainServ", ["$http", "$q", function ($http, $q) {
  // CRUD FUNCTIONS
  // ============================================================
  var searchURL = 'https://www.omdbapi.com/?s=';
  var searchID = 'https://www.omdbapi.com/?i=';

  this.getMovie = function (title) {
    var counter = 1;
    var returnData = [];
    var defer = $q.defer();
    var filterData = function () {
      $http({
        method: 'GET',
        url: searchURL + title + '&type=movie&page=' + counter
      }).then(function (response) {
        if (response.data.Response === "False" || counter === 1) {
          defer.resolve(returnData);
        } else if (response.data.Search.length) {
          var resultsArr = response.data.Search;
          for (var i = resultsArr.length - 1; i > -1; i--) {
            if (resultsArr[i].Poster === 'N/A') resultsArr.splice(i, 1);
          }
          returnData.push(...resultsArr);
        }

        counter++;
        if (counter < 30) {
          filterData();
        } else defer.resolve(returnData);
      });
    };
    filterData();
    return defer.promise;
  };

  this.getDisc = function (id) {
    return $http({
      method: 'GET',
      url: searchID + id + '&tomatoes=true'
    }).then(function (response) {
      console.log(response);
      return response.data;
    });
  };
}]);