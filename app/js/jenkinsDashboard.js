'use strict';

angular.module('dashboard').directive('jenkinsDashboard', function () {
	
    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: './app/views/jenkinsDashboard.html',
        link: function (scope, elem, attrs) {
    		
        	var alarmsCount = 0, socket;
        	
    		scope.alarmingJobs = [];
    		scope.alarmsCount = 0;
    		scope.jenkinsInError = false;
    		scope.connected = false;
    		
    		scope.addJobInAlarm = function (job) {
    			var index = scope.alarmingJobs.indexOf(job.name);
    		    if (index < 0) {
    		    	scope.alarmsCount++;
        			scope.alarmingJobs.push(job.name);   	
    		    }	
    			scope.jenkinsInError = (scope.alarmsCount>0);			
    		};
    		
    		scope.removeJobInAlarm = function (job) {   			
    		    var index = scope.alarmingJobs.indexOf(job.name);
    		    if (index > -1) {
    		    	scope.alarmsCount--;
    		        scope.alarmingJobs.splice(index, 1);
    		    }
    			scope.jenkinsInError = (scope.alarmsCount>0);			
    		};
    		
       		try {
    			socket = io.connect(scope.scrumberryHost);
    		} catch (err) {
    			console.log('Error, cannot connect to '+scope.scrumberryHost + ' : '+err.message)
    		}
    		
    		if (socket !== undefined) {
        		socket.on('connect', function() {
        			scope.connected = true;
        		});
        		
        		socket.on('JENKINS_JOB_STATUS_CHANGE', function(event) {
        			if (event.data.lastBuild.number == event.data.lastFailedBuild.number) {
        				scope.addJobInAlarm(event.data);
        			} else {
        				scope.removeJobInAlarm(event.data);
        			}
        			scope.$apply();
        		});   			
    		}
    		
        }
      };
    });