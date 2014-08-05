'use strict';

var scrumdashB = angular.module('dashboard', []);

scrumdashB.controller('JenkinsDashboardCtrl', function ($scope) {
		
	$scope.init = function init() {
		$scope.scrumberryHost = 'http://scrumberryhost:3000';
	};
	
});
