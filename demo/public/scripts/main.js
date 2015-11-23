config({
  ajax: ajaxer,
  baseUrl: 'scripts',
  paths: {
    keyManager: './lib/key-manager/src',
    socketio: '/socket.io/',
    multiplay: '/multiplay'
  }
});

require(['demo'], function(Demo) {
  canvas = document.getElementById('canvas');
  var demo = new Demo(canvas);
  demo.connect();

});
