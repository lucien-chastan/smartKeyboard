var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var robot = require("robotjs");
var os = require('os');
var ifaces = os.networkInterfaces();


app.get('/', function (req, res) {
    res.sendFile(__dirname+'/index.html');
});


io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('key', function (msg) {
        robot.keyTap(msg);
    });
    
    socket.on('macro', function (msg) {
        var keys = msg.split('_');
        
//        keys.forEach(function (key) {
//           robot.keyToggle(key, 'down');
//        });
        robot.keyTap(keys[1], keys[0]);
        //robot.keyTap(msg);
    });
    
    socket.on('mouse', function (msg){      
        robot.mouseClick(left, true)
    });
});


//'use strict';

var localIp;

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      localIp = iface.address;
    } else {
      // this interface has only one ipv4 adress
      localIp = iface.address;
    }
    ++alias;
  });
});


http.listen(3000, function () {
    console.log('The server is running. \nThe keyboard is available at '+localIp+':3000');
});



//
//
//var fs = require('fs');
//
//function sortDirectory(path, files, callback, i, dir) {
//    if (!i) {i = 0;}                                            //Init
//    if (!dir) {dir = [];}
//    if(i < files.length) {                                      //For all files
//        fs.lstat(path + '\\' + files[i], function (err, stat) { //Get stats of the file
//            if(err) {
//                console.log(err);
//            }
//            if(stat.isDirectory()) {                            //Check if directory
//                dir.push(files[i]);                             //If so, ad it to the list
//            }
//            sortDirectory(callback, i + 1, dir);                //Iterate
//        });
//    } else {
//        callback(dir);                                          //Once all files have been tested, return
//    }
//}
//
//function listDirectory(path, callback) {
//    fs.readdir(path, function (err, files) {                    //List all files in the target directory
//        if(err) {
//            callback(err);                                      //Abort if error
//        } else {
//            sortDirectory(path, files, function (dir) {         //Get only directory
//                callback(dir);
//            });
//        }
//    })
//}
//
//listDirectory('C:\\My\\Test\\Directory', function (dir) {
//    console.log('There is ' + dir.length + ' directories: ' + dir);
//});
