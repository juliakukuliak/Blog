var posts = angular.module('posts', []);
// posts.config(function($routeProvider){
//         $routeProvider.when('/posts',
//         {
//             templateUrl:'public/post-details.html',
//             controller:'PostsController'
//         });
// });
posts.controller('PostsController', function($rootScope, $scope, $http) {
 	$rootScope.editMode = false;
 	var serviceBase = '/api/topic/';
 	
   $http.get("../topics.json")
  	.then(function(response){
  	$scope.post = response.data.topics;
  	
  });

  $scope.delete = function(idx) {
  	$http.delete(serviceBase + idx.name).then(function (results) {	
  		$scope.post.splice(idx, 1);
       return results;
    }); 
	 };


	$scope.add = function() {
		let curr = this;
		$http.post(serviceBase, {'name': curr.name, 'author': $rootScope.current_user, 'text': curr.text, 'date': new Date().toLocaleString() }).then(function (results) { 
				$scope.post.push({'name': curr.name, 'author': $rootScope.current_user, 'text': curr.text, 'date': new Date().toLocaleString() });
	        return results;
	    });   
	};


	$scope.edit = function () {
		$rootScope.editMode = true;
    $scope.newposts = angular.copy( this.posts);
  };

  $scope.save = function () {	
		let post = this.post;
		$http.put(serviceBase + post.name, {'name': $scope.newposts.name, 'author': $scope.newposts.author, 'text': $scope.newposts.text, 'date': new Date().toLocaleString() }).then(function (results) {	
        return results;
    }); 
		let updatedPost = $scope.post.find(function (elem) {
        return elem.id == $scope.newposts.id;
    });
		 if (updatedPost) {
		 	updatedPost.author = $scope.newposts.author;
		 	updatedPost.text = $scope.newposts.text;
		 	updatedPost.name = $scope.newposts.name;
		 	updatedPost.date = new Date().toLocaleString();
		 	$rootScope.editMode = false; 
		 }
    };

 });

posts.directive('posts', function() {
  return {
  	restrict: 'E',
    templateUrl: '../templates/posts.html'
  };
});

posts.directive('login', function() {
  return {
  	restrict: 'E',
    templateUrl: '../templates/login.html'
  };
});

posts.directive('create', function() {
  return {
  	restrict: 'E',
    templateUrl: '../templates/create.html'
  };
});

posts.directive('edit', function() {
  return {
  	restrict: 'E',
    templateUrl: '../templates/edit.html'
  };
});

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

