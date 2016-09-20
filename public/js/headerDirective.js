// INITILIZE DIRECTIVE
// ============================================================
angular.module("app").directive('headerDirective', function() {
  return {
    restrict: 'EA',
    templateUrl: './public/views/headerTmpl.html',
    controller: 'mainCtrl'
  };
});
