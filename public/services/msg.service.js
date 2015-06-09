angular.module('todoApp').service('Msg', function ($rootScope, $location, DS) {
  'use strict';
  var socket = io.connect(DS.defaults.basePath, {
    path: '/api/1.0/socket', transports: ['websocket', 'polling']
  });

  socket.on('modify', function(data) {
    console.log(data);
    if (data.method) switch(data.method) {
      case 'insert': DS.find(data.collection, data.insert._id); break;
      case 'update':
      case 'findAndModify': DS.refresh(data.collection, data.query._id); break;
      case 'remove': DS.eject(data.collection, data.query._id); break;
    };
  });

  /*
  socket.on('create', function (data) {
    if (data.ownerId && $rootScope.loggedInUser && $rootScope.loggedInUser.id === data.ownerId) {
      DS.find(data.resource, data.id);
    }
    $rootScope.$broadcast('create', data.resource, data.id, data.ownerId);
  });

  socket.on('update', function (data) {
    if (data.id === 'all' && data.seriesId) {
      angular.forEach(DS.filter(data.resource, {seriesId: data.seriesId}), function (instance) {
        DS.refresh(data.resource, instance.id);
      });
    } else {
      DS.refresh(data.resource, data.id);
    }
    $rootScope.$broadcast('update', data.resource, data.id, data.ownerId);
  });

  socket.on('destroy', function (data) {
    if (data.id === 'all' && data.lessonId) {
      DS.ejectAll(data.resource, {lessonId: data.lessonId});
    } else {
      DS.eject(data.resource, data.id);
    }
    $rootScope.$broadcast('destroy', data.resource, data.id, data.ownerId);
  });*/

  return {};
}).run(function (Msg) {
});
