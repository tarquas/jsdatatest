angular.module('todoApp', ['js-data'])
  .config(function (DSProvider) {
    DSProvider.defaults.basePath = "https://td-rest-api.herokuapp.com:443/api/1.0"; // etc.

  })
  .run(function (DS, DSHttpAdapter, $http) {

    DSHttpAdapter.defaults.httpConfig.headers = {
      Authorization: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IlZYTWc5SWhsRWhNQU9ZRnMiLCJyZXYiOjAsImV4cCI6IjIwMTUtMDctMDZUMTY6MzQ6MDMrMDA6MDAiLCJkZXYiOiJpVHJhc2gifQ.RemPM9juiFlmdTYUQ2Kbv7DUxdg95_vS2G4brhxRbhE',
      'X-Company-ID': 'VXMhSIhlEhMAOYFt'
    };

    DSHttpAdapter.defaults.deserialize = function (cfg, res) {
      var data = res.data;
      return (data && data.data) || data;
    };
  })
  .factory('Task', function (DS) {
    // This code won't execute unless you actually
    // inject "Comment" somewhere in your code.
    // Thanks Angular...
    // Some like injecting actual Resource
    // definitions, instead of just "DS"
    return DS.defineResource('tasks');
  });

angular.module('todoApp')
  .controller('TodoListController', function($scope, Task) {
    var todoList = this;
    todoList.todos = [];

    // load tasks from the server
    Task.findAll().then(function (data) {
      // binding TaskCollection to controller
      todoList.todos = Task.getAll();
    }).then(function(){
      Task.create({name: 'demo' + Date.now()}).then(function (data) {
        //Task.get(data.id);
      });
    });


    todoList.addTodo = function() {
      Task.create({name:todoList.todoText}).then(function(){
        todoList.todos = Task.getAll();
        todoList.todoText = '';
      });
    };

    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };

  });