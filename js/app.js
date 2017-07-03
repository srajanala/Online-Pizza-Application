'use strict';

var app = angular.module('pizza', ['ngRoute', 'ngResource']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'js/pizza/pizza.html',
			controller: 'PizzaCtrl'
		})
		.when('/purchase', {
			templateUrl: 'js/purchase/purchase.html',
			controller: 'PurchaseCtrl'
		})
		.when('/about-me', {
			templateUrl: 'js/nav/about-me.html'
		})
		.when('/vieworders', {
			templateUrl: 'js/vieworder/vieworders.php',
			controller: 'ViewOrderController'
		})
		.when('/reportview', {
			templateUrl: 'js/report/report.php',
			controller: 'reportController'
		})
		.otherwise({
			redirectTo: '/'
		});
});