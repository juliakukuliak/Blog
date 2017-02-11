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