posts.controller('AuthController', function($scope, $http, $rootScope) {
		let serviceBase = '/api/auth/';
     $scope.auth = function() {
    	$http.post('/api/auth/login', {'username': $scope.username, 'password': $scope.password}).then(function (results) {	
        console.log(results);
        if (results.data.success) {
        	 $scope.user = "Hello, " + $scope.username + "!";
        	 $rootScope.current_user = $scope.username;
        }
        return results;
    }); 

    };

    $scope.register = function() {
    	$http.post('/api/auth/registration', {'name': $scope.newName, 'username': $scope.newUsername, 'password': $scope.newPassword, 'email': $scope.newEmail}).then(function (results) {	
        console.log(results);
        if (results.data.success) {
        	 $scope.user = "Hello, " + $scope.newUsername + "!";
        	 $rootScope.current_user = $scope.newUsername;
        }
        
        return results;
   		 }); 
    };

    $scope.logout = function() {
    	$http.get('/api/auth/logout').then(function (results) {	
        $rootScope.current_user = ''; 

       return results;
    	}); 
    }

    
});

