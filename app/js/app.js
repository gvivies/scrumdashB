'use strict';

var scrumdashB = angular.module('dashboard', []);

scrumdashB.controller('JenkinsDashboardCtrl', function ($scope) {
		
	$scope.init = function init() {
		$scope.scrumberryHost = 'http://192.168.1.134:3000';
	};
	
});
