'use strict';

var scrumdashB = angular.module('dashboard', []);

scrumdashB.controller('JenkinsDashboardCtrl', function ($scope) {
		
	$scope.init = function init() {
		//var socket = io('http://localhost/');
		$scope.connected = true
	};

	
});
