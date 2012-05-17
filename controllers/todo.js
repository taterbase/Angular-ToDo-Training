angular.module('app', ['ngResource']).
  config(function($routeProvider){
    $routeProvider.
      when('/list', {controller:TodoCtrl, template: 'views/list.html'}).
      when('/show/:id', {controller:TodoCtrl, template: 'views/show.html'}).
      otherwise({redirectTo:'/list'});
  });

function TodoCtrl($scope, $routeParams) {
  $scope.todos = [
    {text:'learn angular', done:true, id:0},
    {text:'build an angular app', done:false, id:0}];
 $scope.showtodo = $scope.todos[$routeParams.id];
  $scope.addTodo = function() {
    $scope.todos.push({text:$scope.todoText, done:false});
    $scope.todoText = '';
    assignIds($scope);
  };
 
  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };
 
  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
    assignIds($scope);
  };
}

//Helpers

function assignIds ($scope){
  for(var i =0; i< $scope.todos.length; ++i){
    $scope.todos[i].id = i;
  }
}