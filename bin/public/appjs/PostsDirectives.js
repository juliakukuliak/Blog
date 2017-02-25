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