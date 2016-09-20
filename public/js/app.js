// INITILIZE APP
// ============================================================
angular.module("app",['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/search/:search');
	$stateProvider
	.state('search', {
	 url: '/search/:search',
	 templateUrl: './public/views/search.html',
	 controller: 'mainCtrl'
 })
	.state('home', {
    url: '/home',
    templateUrl: './public/views/home.html',
    controller: 'mainCtrl'
   })
  .state('about', {
    url: '/about',
    templateUrl: './public/views/about.html',
    controller: 'mainCtrl'
   })
   .state('contact', {
    url: '/contact',
    templateUrl: './public/views/contact.html',
    controller: 'mainCtrl'
  });
});
