// 只要某种数据结构具有Iterator接口，都可以采用数组形式的解构赋值。 ???
function* fibs() {
  var a = 0;
  var b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

var [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5

// fibs是一个Generator函数，原生具有Iterator接口。解构赋值会依次从这个接口获取值。


// ES6内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。 ???

var [x = 1] = [undefined];
x // 1

var [x = 1] = [null];
x // null

// 上面代码中，如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。

// 正确的写法
({x} = {x: 1});

// 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
let { log, sin, cos } = Math;

// 解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
let {toString: s} = true;

//函数add的参数实际上不是一个数组，而是通过解构得到的变量x和y
function add([x, y]){
  return x + y;
}

add([1, 2]) // 3

