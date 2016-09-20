// INITILIZE SERVICE
// ============================================================
angular.module("app").service("mainServ", function($http, $q) {
    // CRUD FUNCTIONS
    // ============================================================
    var searchURL = 'https://www.omdbapi.com/?s=';
    var searchID = 'https://www.omdbapi.com/?i=';


    this.getMovie = function(title) {
      var counter = 1;
      var returnData = [];
      var defer = $q.defer();
      var filterData = function() {
        $http({
          method: 'GET',
          url: searchURL + title + '&type=movie&page=' + counter
        }).then(function(response) {
          if (response.data.Response === "False" || counter === 15) {
            defer.resolve(returnData);
          }
          else if(response.data.Search.length) {
            var resultsArr = response.data.Search;
            for (var i = resultsArr.length - 1; i > -1; i--) {
              if (resultsArr[i].Poster === 'N/A')resultsArr.splice(i, 1);
            }
            returnData.push(...resultsArr);
          }
          counter++;
          if (counter < 16) {
            filterData();
          }
          else defer.resolve(returnData);
        });
      };
    filterData();
    return defer.promise;
};

    this.getDisc = function(id) {
        return $http({
            method: 'GET',
            url: searchID  + id + '&tomatoes=true'
        }).then(function(response) {
            return response.data;
        });
    };

});
