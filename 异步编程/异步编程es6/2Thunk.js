//在JavaScript语言中，Thunk函数替换的不是表达式，
// 而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数。

var readFile = function (name,callback) {
    console.log("开始读取"+name+"...");
    setTimeout(function () {
        console.log(`${name}读取完毕`);
        callback(name+"的data")
    },2000)
}
//1. 正常版本的readFile（多参数版本）
//readFile("filename", function (data) {
//    console.log(data,"ok")
//});

// 2. Thunk版本的readFile（单参数版本）
//var Thunk = function (fileName){
//    return function (callback){
//        readFile(fileName, callback);
//    };
//};
//var readFileThunk = Thunk("filename");
//readFileThunk(function (data) {
//    console.log(data,"ok")
//});

//任何函数，只要参数有回调函数，就能写成Thunk函数的形式

//3. Thunk函数转换器。
//var Thunk = function(fn){
//    return function (){//这里是所有参数,除了最后一个回调
//        var args = Array.prototype.slice.call(arguments);
//        return function (callback){
//            args.push(callback);
//            return fn.apply(this, args);
//        }
//    };
//};
//
//var readFileThunk = Thunk(readFile);
//readFileThunk("filename")(function (data) {
//    console.log(data,"ok")
//});


//4 生产环境用
var thunkify = require('thunkify');
var read = thunkify(readFile);
read('package.json')(function(data){
    console.log(data)
});