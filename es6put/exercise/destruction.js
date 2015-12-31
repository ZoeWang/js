define('exercise/destruction', function(require, exports, module) {

// 只要某种数据结构具有Iterator接口，都可以采用数组形式的解构赋值。 ???
"use strict";

var _x;

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var marked0$0 = [fibs].map(regeneratorRuntime.mark);
function fibs() {
  var a, b, _ref;

  return regeneratorRuntime.wrap(function fibs$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        a = 0;
        b = 1;

      case 2:
        if (!true) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 5;
        return a;

      case 5:
        _ref = [b, a + b];
        a = _ref[0];
        b = _ref[1];
        context$1$0.next = 2;
        break;

      case 10:
      case "end":
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

var _fibs = fibs();

var _fibs2 = _slicedToArray(_fibs, 6);

var first = _fibs2[0];
var second = _fibs2[1];
var third = _fibs2[2];
var fourth = _fibs2[3];
var fifth = _fibs2[4];
var sixth = _fibs2[5];

sixth; // 5

// fibs是一个Generator函数，原生具有Iterator接口。解构赋值会依次从这个接口获取值。

// ES6内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。 ???

var _undefined = undefined;
var x = _undefined === undefined ? 1 : _undefined;

x; // 1

var _ref2 = null;
var x = _ref2 === undefined ? 1 : _ref2;

x // null

// 上面代码中，如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。

// 正确的写法
((_x = { x: 1 }, x = _x.x, _x));

// 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
var log = Math.log;
var sin = Math.sin;
var cos = Math.cos;

// 解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
var _true = true;
var s = _true.toString;

//函数add的参数实际上不是一个数组，而是通过解构得到的变量x和y
function add(_ref3) {
  var _ref32 = _slicedToArray(_ref3, 2);

  var x = _ref32[0];
  var y = _ref32[1];

  return x + y;
}

add([1, 2]); // 3

});
