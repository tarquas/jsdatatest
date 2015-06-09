angular.module('todoApp', ['js-data'])
  .config(function (DSProvider) {
    DSProvider.defaults.basePath = "https://td-rest-api.herokuapp.com:443/api/1.0"; // etc.

  })
  .run(function (DS, DSHttpAdapter, $http) {

    // @todo: add proper auth
    DSHttpAdapter.defaults.httpConfig.headers = {
      Authorization: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IlZYTWc5SWhsRWhNQU9ZRnMiLCJyZXYiOjAsImV4cCI6IjIwMTUtMDctMDZUMTY6MzQ6MDMrMDA6MDAiLCJkZXYiOiJpVHJhc2gifQ.RemPM9juiFlmdTYUQ2Kbv7DUxdg95_vS2G4brhxRbhE',
      'X-Company-ID': 'VXMhSIhlEhMAOYFt'
    };

    // @todo: refactor
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
