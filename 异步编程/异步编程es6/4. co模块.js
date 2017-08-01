var readFile = function (name,callback) {
    console.log("开始读取-"+name+"...");
    setTimeout(function () {
        console.log(`${name}-读取完毕`);
        callback("",name+"-的data")
    },2000)
}
var thunkify = require('thunkify');
var readFile = thunkify(readFile);

var gen = function* (){
    var r1 = yield readFile('/etc/fstab');
    console.log("r1",r1.toString());
    var r2 = yield readFile('/etc/shells');
    console.log("r2",r2.toString());
};
var co = require('co');
co(gen).then(function(data){
    console.log("ok",data)
})
//它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。
//（1）回调函数。将异步操作包装成Thunk函数，在回调函数里面交回执行权。
//
//（2）Promise 对象。将异步操作包装成Promise对象，用then方法交回执行权。
//co模块其实就是将两种自动执行器（Thunk函数和Promise对象），包装成一个模块。
//使用co的前提条件是，Generator函数的yield命令后面，只能是Thunk函数或Promise对象。