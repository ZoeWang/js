
var fs = function (name,callback) {
    console.log("开始读取-"+name+"...");
    setTimeout(function () {
        console.log(`${name}-读取完毕`);
        callback("",name+"-的data")
    },2000)
}
var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs(fileName, function(error, data){
      if (error) reject(error);
        resolve(data);
    });
  });
};

var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
//1. 手动执行
// var g = gen();
// g.next().value.then(function(data){
//   g.next(data).value.then(function(data){
//     g.next(data);
//   });
// })

//2. 自动执行器
function run(gen){
  var g = gen();
  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }
  next();
}

run(gen);