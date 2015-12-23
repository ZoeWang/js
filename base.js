// 返回给定范围内的随机数
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// 返回给定范围内的随机整数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 合并两个数组
var a = [1,2,3];
var b = [4,5,6];

Array.prototype.push.apply(a, b)
// 或者
a.push.apply(a,b)

// 上面两种写法等同于
a.push(4,5,6)

a
// [1, 2, 3, 4, 5, 6]