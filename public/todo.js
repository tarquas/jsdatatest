angular.module('todoApp')
  .controller('TodoListController', function ($scope, Task) {
    var todoList = this;
    $scope.todos = [];

    // load tasks from the server
    Task.findAll().then(function (data) {
      // binding TaskCollection to controller
      Task.bindAll(null, $scope, 'todos');
    });

    todoList.addTodo = function () {
      Task.create({name: todoList.todoText}).then(function () {
        todoList.todoText = '';
      });
    };

    todoList.remaining = function () {
      var count = 0;
      angular.forEach($scope.todos, function (todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    todoList.archive = function () {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function (todo) {
        if (!todo.done) {
          $scope.todos.push(todo);
        } else {
          Task.destroy(todo.id);
        }
      });
    };
  });
