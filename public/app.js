angular.module('todoApp', ['js-data'])
  .config(function (DSProvider) {
    //DSProvider.defaults.basePath = "http://td-rest-api.herokuapp.com:443/api/1.0"; // etc.
    DSProvider.defaults.basePath = "http://192.168.0.103:3000/api/1.0"; // etc.

  })
  .run(function (DS, DSHttpAdapter  ) {

    // @todo: add proper auth
    //DSHttpAdapter.defaults.httpConfig.headers = {
    //  Authorization: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IlZYTWc5SWhsRWhNQU9ZRnMiLCJyZXYiOjAsImV4cCI6IjIwMTUtMDctMDZUMTY6MzQ6MDMrMDA6MDAiLCJkZXYiOiJpVHJhc2gifQ.RemPM9juiFlmdTYUQ2Kbv7DUxdg95_vS2G4brhxRbhE',
    //  'X-Company-ID': 'VXMhSIhlEhMAOYFt'
    //};

    DSHttpAdapter.defaults.httpConfig.headers = {
      Authorization: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IlZXMVRFbFJiOGM0S3g3Z0oiLCJyZXYiOjAsImV4cCI6IjIwMTUtMDctMDlUMTM6NDg6MjkrMDM6MDAiLCJkZXYiOiJpVHJhc2gifQ.n54zUOWArw9fTiNhxvq5QYvLszDt48b9uue8fgkUSic',
      'X-Company-ID': 'VW1TXVRb8c4Kx7gK'
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
