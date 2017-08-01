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
//yield命令用于将程序的执行权移出Generator函数，
//那么就需要一种方法，将执行权再交还给Generator函数。
// 注意措辞,是可以!
//这种方法就是Thunk函数，因为它可以在回调函数里，
//将执行权交还给Generator函数。

//1. 手动管理--------
//var g = gen();
//var r1 = g.next();
//r1.value(function(err, data){
//    if (err) throw err;
//    var r2 = g.next(data);
//    r2.value(function(err, data){
//        if (err) throw err;
//        g.next(data);
//    });
//
//});

//2. 自动管理
function run(fn) {
    var gen = fn();
    function next(err, data) {
        if (err) throw err;
        var result = gen.next(data);
        if (result.done) return;
        result.value(next);//在yield命令后面的必须是Thunk函数。
    }
    next();
}
run(gen);

//Thunk函数并不是Generator函数自动执行的唯一方案。
//因为自动执行的关键是，必须有一种机制，
//自动控制Generator函数的流程，接收和交还程序的执行权。
//回调函数可以做到这一点，Promise 对象也可以做到这一点。