// 1、let <= var 只在代码块内有效

var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10


var a = [];
for(let i=0; i<10; i++){
	a[i] = function() {
		console.log(i);
	};
}
a[6]();  // 6

// 2、不存在变量提升

console.log(foo);	// ReferenceError
typeof foo;   // ReferenceError
let foo = 2;

// 3、TDZ 暂时性死区
//ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些命令，就会报错。

var tmp = 123;
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}

// 4、 不允许重复声明
// et不允许在相同作用域内，重复声明同一个变量。
/*
function func(arg) {
  let arg; // 报错
}
*/

function func(arg) {
  {
    let arg; // 不报错
  }
}

// 常量foo指向一个冻结的对象，所以添加新属性不起作用。

//const foo = Object.freeze({});
// foo.prop = 123; // 不起作用


//将对象彻底冻结的函数 ???

var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, value) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};


// 跨模块常量
/**
 *  
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3

// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
 */




