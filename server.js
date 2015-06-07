var JSData = require('js-data');
var DSHttpAdapter = require('js-data-http');

// you can also require "js-data" if you're using AMD/CommonJS
// e.g. var JSData = require('js-data'); var DSHttpAdapter = require('js-data-http');
var store = new JSData.DS();

// register and use http by default for async operations
var adapter = new DSHttpAdapter();
//adapter.defaults.BasePath = "https://td-rest-api.herokuapp.com:443/api/1.0";
//adapter.headers = {
//  Token: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IlZYTWc5SWhsRWhNQU9ZRnMiLCJyZXYiOjAsImV4cCI6IjIwMTUtMDctMDZUMTY6MzQ6MDMrMDA6MDAiLCJkZXYiOiJpVHJhc2gifQ.RemPM9juiFlmdTYUQ2Kbv7DUxdg95_vS2G4brhxRbhE',
//  'X-Company-ID': 'VXMhSIhlEhMAOYFt'
//};
store.registerAdapter('http', adapter, { default: true });

// simplest model definition
var Task = store.defineResource('tasks');

//var task;
//console.log(Task);

// Example CRUD operations with default configuration
// See http://www.js-data.io/docs/dsfind
Task.find(1)
  .then(function (_task) {
    console.log(_task);
  })
  .catch(function(err) {
    console.log(err);
  });

//require('express')().listen(12345);
