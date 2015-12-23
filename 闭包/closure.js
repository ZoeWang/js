// 闭包只能获取包含函数中任何变量的最后一个值
function createFunctions(){
	var result = new Array();

	for(var i=0; i < 10; i++){
		result[i] = function(){
			return i;
		};
	}
	return result;
}
// 每个函数都返回10，因为每个函数的作用域链中都保存着creatFunction()函数的活动对象，
// 所以他们引用的都是同一个变量i，当createFunction()变量返回后，变量i的值是10，
// 此时，每个函数都引用着保存变量i的同一个变量对象，所以每个函数内部i的值都是10
// 我们可以通过创建另一个匿名函数强制让闭包的行为符合预期

function createFunctions(){
	var result = new Array();

	for(var i=0; i < 10; i++){
		result[i] = function(num){
			return function(){
				return num;
			}	
		}(i);
	}
	return result;
}
// 在重写了前面的createFunction()函数后，每个函数就会返回各自不同的索引值，
// 我们没有直接把闭包赋值给数组，而是定义了一个匿名函数，并将立即执行该匿名函数的结果赋值给数组
// 这里的匿名函数有个参数num，也就是最终函数要返回的值。
// 在调用每个匿名函数时，我们传入变量i。
// 由于函数参数是按值传递，所以就会将变量i的当前值复制给参数num，
// 而在这个匿名函数内部，又创建并返回了一个访问num的闭包。
// 这样一来，result数组中得每个函数都有自己num变量的一个副本，因此就可以返回各自不同的数值了

/**
 *关于this对象
 */
// 匿名函数的执行环境具有全局性，因此其this对象通常指向window
var name = "The Window";
var object = {
	name: "My Object",
	getNameFunc:function(){
		return function(){
			return this.name;
		};
	}
};
alert(object.getNameFunc()());	//"The Window" （非严格模式下）


var name = "The Window";
var object = {
	name: "My Object",
	getNameFunc:function(){
		var that = this;
		return function(){
			return that.name;
		};
	}
};
alert(object.getNameFunc()());	//"My Object"


var name = "The Window";
var object = {
	name: "My Object",
	getNameFunc:function(){
		return this.name;
	}
};

object.getName();	//"My Object"
(object,getName)();		//"My Object"
// 加上括号后就好像只是在引用一个函数，但this值得到了维持， object.getName 和 (object.getName)的定义是相同的
(object.getName = object.getName)();	//"The Window"  在非严格模式下
// 先执行了一条赋值语句，然后再调用赋值后的结果，因为这个赋值表达式的值是函数本身，所以this的值不能得到维持，结果返回了“The Window”；

/**
 * 内存泄漏
 */

function assignHandler(){
	var element = document.getElementById("someElement");
	element.onclick = function(){
		alert(element.id);
	}
}

// 创建了一个作为element元素事件处理程序的闭包，这个闭包又创建了一个循环引用。
// 由于匿名函数保存了一个对assignHandler()的活动对象的引用，因此就会导致无法减少element的引用数。
// 只要匿名函数存在，element的引用数至少也是1，因此它所占用的内存就永远不会被回收。

function assignHandler(){
	var element = document.getElementById("someElement");
	var id = element.id;

	element.onclick = function(){
		alert(id);
	};

	element = null;
}

// 通过把element.id 的一个副本保存在一个变量中，并且在闭包总引用该变量消除了循环引用。
// 闭包会引用包含函数的整个活动对象，而其中包含着element.即使闭包不直接引用element，包含函数活动对象中也仍然会保存一个引用
// 因此有必要把element变量设置成null。这样就能够解除对DOM 对象的引用，减少其他引用，保证正常的回收其占用内存

/**
 * 模仿块级作用域（私有作用域）
 */
(function(){
	// 这里是块级作用域
})();

var someFunc = function(){
	// 这里是块级作用域
};
someFunc();

function(){
	// 这里是块级作用域
}();	//出错

// Javascript将function关键字作为一个函数声明的开始，而函数声明后面不能跟圆括号。
// 函数表达式后面可以跟圆括号，要将函数声明转换成函数表达式，只要给他加上一对圆括号即可
(function(){
	// 块级作用域
})();

function outputNumbers(count){
	(function(){
		for(var i=0; i < count; i++){
			alert(i);
		}
	})();

	alert(i);		//导致一个错误
}
// 在匿名函数中定义的任何变量，都会在执行结束时被销毁
// 这个匿名函数是一个闭包，它能够访问包含作用域中得所有变量







