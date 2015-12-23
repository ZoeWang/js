/**
 * JavaScript 共4种调用模式：方法调用模式、函数调用模式、构造器调用模式 和 apply调用模式
 * 任何类型的值 都可以传递给参数
 */

// 方法调用模式

// 创建myObject. 它有一个value 属性和一个 increment 方法。
// increment 方法接受一个可选的参数，如果参数不是数字，那么默认使用数字1.

var myObject = {
	value: 0;
	increment: function(inc) {
		this.value += typeof inc === 'number' ? inc : 1;
	}
};

myObject.increment();
document.writeln(myObject.value);	// 1

myObject.increment(2);
document.writeln(myObject.value);	// 3

// 当函数被保存为对象的一个属性时，即成为方法。当一个方法被调用时，this被绑定到该对象
// 注：通过this 可取的它们所属对象的上下文的方法称为公共方法。

// 函数调用模式

// 当函数被当做一个函数被调用时，this被绑定到全局对象 即 window

// 给 myObject 增加一个double 方法
myObject.double = function (){
	var that = this;	// 解决方法

	var helper = function(){
		that.value = add(that.value, that.value);
	};

	helper();	//以函数的形式调用 helper.
};

// 以方法的形式调用double.
myObject.double();
document.writeln(myObject.getValue());			//6

// 构造器调用模式

// 创建一个名为Quo 的构造函数，它构造一个带有status 属性的对象
var Quo = function (string) {
	this.status = string;
};

// 给Quo 的所有实例提供一个名为 get_status 的公共方法
Quo.prototype.get_status = function() {
	return this.status;
};

// 构造一个Quo 实例
var myQuo = new Quo("confused");
document.writeln(myQuo.get_status());	// 令人困惑
// 结合new 前缀调用的函数被称为构造器函数，它们保存在以大写格式命名的变量里


// Apply 调用模式
// apply 方法接收两个参数。第一个 将被绑定给this的值，第二个是一个参数数组
// 构造一个包含两个数字的数组，并将它们相加
var array = [3, 4];
var sum = add.apply(null, array);	// sum 值为7

// 构造一个包含 status 成员的对象
var statusObject = {
	status: 'A-OK'
};

// statusObject 并没有继承自 Quo.prototype, 但我们可以在 statusObject 上调
// 用get_status 方法、尽管 statusObject 并没有一个名为get_status 的方法

var status = Quo.prototype.get_status.apply(statusObject);	// status 值为‘A-OK’

/**
 *  4.4 参数
 */
arguments
// 构造一个将很多个值相加的函数

//注意该函数内部定义的变量sum 不会与函数外部定义的sum产生冲突
//该函数只会看到内部的那个变量
var sum = function(){
	var i, sum = 0;
	for(i = 0; i<arguments.length; i += 1) {
		sum += arguments[i];
	}
	return sum;
};

document.writeln(sum(4,18,15,23,42));	// 108
// arguments 类数组对象，有 length 属性，没有 array 的所有方法

/**
 * 一个函数总有返回一个值，如果没有指定返回值，则返回undefined
 */

/**
 * 异常
 */
var add = function(a, b){
	if(typeof a !== 'number' || typeof b !== 'number') {
		throw {
			name: 'TypeError',
			message: 'add needs numbers'
		};
	}
	return a + b;
}
//throw 语句中断函数的执行，它应该抛出一个exception 对象，该对象包含可识别异常类型的 
// name 属性和一个描述性的 message 属性。你也可以添加其他的属性。

// 该exception 对象将被传递到一个try 语句的 catch 从句:

// 构造一个 try_it 函数，用不正确的方式调用之前的add 函数

var try_it = function(){
	try{
		add("seven");
	}catch(e) {
		document.writeln(e.name + ': ' + e.message);
	}
}
Try_It();


// throw 与 try 和 catch 一起使用，可以控制程序流，并生成自定义的错误消息
function myFunction()
{
	try
	{ 
		var x=document.getElementById("demo").value;
		if(x=="")    throw "值为空";
		if(isNaN(x)) throw "不是数字";
		if(x>10)     throw "太大";
		if(x<5)      throw "太小";
	}
	catch(err)
	{
		var y=document.getElementById("mess");
		y.innerHTML="错误：" + err + "。";
	}
}

// <p>请输入 5 到 10 之间的数字：</p>
// <input id="demo" type="text">
// <button type="button" onclick="myFunction()">测试输入值</button>
// <p id="mess"></p>

/**
 * 给类型增加方法
 */
// Javascript 允许给语言的基本类型增加方法

// 通过给Function.prototype 增加一个method 方法，我们就不必键入prototype这个属性名了
Function.prototype.method = function(name, func) {
	this.prototype[name] = func;
	return this;
};

// 提取数字中的整数部分，根据数字的正负判断使用Math.ceiling 还是 Math.floor
// 给Number.prototype 添加一个integer 方法
Number.method('inter', function(){
	return Math[this < 0 ? 'ceiling' : 'floor'](this);
});

document.writeln((-10 / 3).integer());	// -3

// 移除字符串末端空白的方法
String.method('trim', function(){
	return this.replace(/^\s+|\s+$/g, '');
});
document.writeln('"' + "  neat  ".trim() + '"');

// 基本类型的原型是公共的结构
// 有条件的增加一个方法
Function.prototype.method = function(name, func){
	if(!this.prototype[name]){
		this.prototype[name] = func;
	}
}

/**
 * 递归
 */
// “汉诺塔” 是一个著名的难题。塔的设备包括三根柱子和一套直径各不相同的空心圆盘
// 开始时圆柱子上的所有圆盘都按照较小的圆盘放在较大的圆盘之上的顺序堆叠
// 目标是通过每次移动一个圆盘到另一根柱子上，最终将一堆圆盘移动到目标柱子上
// 过程中不可以将大的圆盘放置在较小的圆盘之上。这个难题有一个寻常解：
// 这个程序没懂
var hanoi = function(disc, src, aux, dst){
	if(disc > 0) {
		hanoi(disc - 1, src, dst, aux);
		document.writeln('Move disc ' + disc + ' from ' + src + ' to ' + dst);
		hanoi(disc - 1, aux, src, dst);
	}
}

hanoi(3, 'Src', 'Aux', 'Dst');

// 圆盘数量为3 时它返回这样的解法：
Move disc 1 from Src to Dst
Move disc 2 from Src to Aux
Move disc 1 from Dst to Aux
Move disc 3 from Src to Dst
Move disc 1 from Aux to Src
Move disc 2 from Aux to Dst
Move disc 1 from Src to Dst

// 定义 walk_the_DOM 函数，它从某个给定的节点开始，按HTML源码中的顺序
// 访问该树的每个节点。
// 它会调用一个函数，并依次传递每个节点给它。walk_the_DOM 调用自身去处理每一个子节点

var walk_the_DOM = function walk(node, func) {
	func(node);
	node = node.firstChild;
	while (node) {
		walk(node, func);
		node = node.nextSibling;
	}
}

// 定义 getElementsByAttribute 函数。它取得一个属性名称字符串
// 和一个可选的匹配值
// 他调用walk_the_DOM,传递一个用来查找节点属性名的函数。
// 匹配的节点会累积到一个结果数组中。
var getElementsByAttribute = function(att, value){
	var results = [];

	walk_the_DOM(document.body, function(node){
		var actual = node.nodeType === 1 && node.getAttribute(att);
		if(typeof actual === 'string' && 
				(actual === value || typeof value !== 'string')) {
			results.push(node);
		}
	});

	return results;
};

// 构建一个带尾递归的函数，因为它会返回自身调用的结果，所以它是尾递归
// Javascript 当前没有对这种形式的递归做出优化

var factorial = function factorial(i, a){
	a = a || 1;
	if(i < 2) {
		return a;
	}
	return factorial(i - 1, a*i);
};

document.writeln(factorial(4));		//24


/**
 * 作用域
 */
// 定义在函数中的参数和变量在函数外部是不可见的，
// 而且在一个函数中的任何位置定义的变量在该函数中任何地方都可见
var foo = function(){
	var a = 3, b = 5;
	var bar = function(){
		var b = 7, c = 11;
	// 此时，a 为 3、b 为 7、c 为 11
		a += b + c;
	// 此时，a = 21，b=7，c=11
	};
	// 此时，a=3，b=5，c 未定义
	bar();
	// 此时，a 为 21 b为五
};

/**
 * 闭包
 */
// 我们构造了一个myObject对象，它拥有一个value 属性和一个increment方法
// 假定我们希望保护该值不会被非法更改
// 和以对象字面量形式去初始化myObject 不同，我们通过调用一个函数的形式去初始化myObject
// 该函数将返回一个对象字面量。此函数定义了一个value变量。该变量对increment 和 getValue 方法总是可用的
// 但函数的作用域使得他对其他的程序来说都是不可见的

var myObject = function () {
	var value = 0;

	return {
		increment: function(inc) {
			value += typeof inc === 'number' ? inc : 1;
		},
		getValue: function(){
			return value;
		}
	}
}();
// 该函数反应一个包含两个方法的对象，
// 并且这些方法继续享有访问value 的变量chenge


// 定义另一种Quo 构造器产出出带有status属性和get_status 方法的一个对象

// 创建一个名为 quo 的构造函数
// 它构造出带有get_status 方法和 status 的私有属性的一个对象

var quo = function(status){
	return {
		get_status: function(){
			return status;
		}
	};
};

// 构造一个quo实例
var myQuo = quo("amazed");
document.writeln(myQuo.get_status());

// 定义一个函数，它设置一个DOM节点为黄色，然后把它渐变为白色

var fade = function(node){
	var level = 1;
	var step = function(){
		var hex = level.toString(16);
		node.style.backgroundColor = '#ffff' + hex + hex;
		if(level < 15){
			level += 1;
			setTimeout(step,100);
		}
	};
	setTimeout(step,100)
}

fade(document.body);

// 糟糕的例子

// 构造一个函数，用错误的方式给一个数组中的节点设置事件处理程序
// 当点击一个节点时，按照预想应该弹出一个对话框显示节点的序号
// 但它总是会显示节点的数目

var add_the_handlers = function(nodes){
	var i;
	for(i = 0; i < nodes.length; i += 1){
		nodes[i].onclick = function(e){
			alert(i);
		}
	}
};
// 结束槽糕的例子
// add_the_handlers 函数目的是给每个事件处理器一个唯一值（i）。它未能达到目的是因为
// 事件处理器函数绑定了变量i，而不是函数在构造时的变量i的值。

// 更好的例子

// 构造一个函数，用正确的方式给一个数组中的节点设置事件处理程序
// 你点击一个节点，将会弹出一个对话框显示节点的序号

var add_the_handlers = function(nodes){
	var i;
	for(i = 0; i < nodes.length; i += 1){
		nodes[i].onclick = function(i){
			return function(e){
				alert(e);
			};
		}(i);
	}
};
// 现在，我们定义了一个函数并立即传递i进去执行，而不是把一个函数复制给onclick
// 那个函数将返回一个事件处理器函数。这个事件处理器函数绑定的是传递进去的i的值
// 而不是定义在add_the_handlers 函数里的i的值。那个被返回的函数被赋值给onclick


/**
 * 回调
 */
// 同步 请求将会导致客户端进入假死状态
request = prepare_the_request();
response = send_request_synchronously(request);
display(response);

// 异步 提供一个当服务器的响应到达时将被调用的回调函数。异步的函数立即返回，这样客户端不会被堵塞
request = prepare_the_request();
send_request_synchronously(request, function(response){
	display(response);
});
// 我们传递了一个函数作为参数给 send_request_asynchronously 函数，它将在收到响应时被调用


/**
 * 模块
 */
String.method('deentityify', function(){

	// 字符实体表。它映射字符实体的名字到对应的字符

	var entity = {
		quot: '"',
		lt: '<',
		gt: '>'
	};

	// 返回deentityify 方法

	return function(){

	// 这才是deentityify方法。它调用字符串的replace 方法
	// 查找‘&’开头和‘；’结尾的子字符串。如果这些字符可以在字符实体表中找到
	// 那么就将该字符实体替换为映射表中的值。它用到了一个正则表达式

		return this.replace(/&([^&;]+);/g,
			function(a, b){
				var r = entity[b];
				return typeof r === 'string' ? r : a;
			}
		);

	};

}());

document.writeln('&lt;&quot;&gt;'.deentityify());	// <'"fc'>

// 模块模式也可以用来产生安全的对象。假定我们想要构造一个用来产生序列号的对象

var serial_maker = function(){

	// 返回一个用来产生唯一字符串的对象
	// 唯一字符串由两部分组成：前缀+序列号。
	// 该对象包含一个设置前缀的方法，一个设置序列号的方法
	// 和一个产生唯一字符串的gensym 方法

	var prefix = '';
	var seq = 0;
	return {
		set_prefix: function(p){
			prefix = String(p);
		},
		set_seq: function(s){
			seq = s;
		},
		gensym: function(){
			var result = prefix + seq;
			seq += 1;
			return result;
		}
	};
};

var seqer = serial_maker();
seqer.set_prefix('Q');
serqer.set_seq(1000);
var unique = seqer.gensym();		// unique is "Q1000"

// 如果我们把seqer.gensym 作为一个值传递给第三方函数，那个函数能用它产生唯一字符串，
// 但却不能通过它改变prefix或seq的值

/**
 * 级联
 */

// 一个启用级联的Ajax 类库
getElement('myBoxDiv').
	move(350, 150).
	width(100).
	height(100).
	border('10px outset').
	padding('4px').
	appendText("Please stand by").
	on('mousedown', function(m){
		this.startDrag(m, this.getNinth(m));
	}).
	on('mousemove', 'drag').
	later(2000, function(){
		this.
			color('yellow').
			setHTML("What hath God wraught?").
			slide(400, 40, 200, 200);
	}).
	tip('This box is resizeable');

// getElement 函数产生一个对应于id="myBoxDiv"的DOM 元素并提供了其他功能的对象。
// 该方法允许我们移动元素，修改它的尺寸和样式，并添加 行为。这些方法每一个都返回该对象，所以调用返回的结果可以被下一次调用所用


/**
 * 套用
 */
// 函数也是值，从而我们可以用有趣的方式去操作函数值。套用允许我们将函数与传递给它
// 的参数相结合去产生出一个新的函数

var add1 = add.curry(1);
document.writeln(add1(6));		//7

Function.method('curry', function(){
	var slice = Array.prototype.slice,
		args = slice.apply(arguments),
		that = this;
	return function(){
		return that.apply(null, args.concat(slice.apply(arguments)));
	};
});

/**
 * 记忆
 */
// 编写一个函数来帮助我们构造带记忆功能的函数

var fibonacci = function(n){
	return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};

for(var i = 0; i <= 10; i += 1){
	document.writeln('// ' + i + ': ' + fibonacci(i));
}

// 0: 0
// 1: 1
// 2: 1
// 3: 2
// 4: 3
// 5: 5
// 6: 8
// 7: 13
// 8: 21
// 9: 34
// 10: 55
// fibonacci 被调用453 次，我们调用11次，自身442次

var fibonacci = function(){
	var memo = [0,1];
	var fib = function(n){
		var result = memo[n];
		if(typeof result !== 'number'){
			result = fib(n-1) + fib(n - 2);
			memo[n] = result;
		}
		return result;
	};
	return fib;
}();
// 被调用29次 我们11次，自己18次


// memoizer函数将取得一个初始的memo数组和fundamental函数。它返回一个管理memo存储和在需要
// 时调用fundamental函数的shell函数。我们传递这个shell函数和该函数的参数给fundamental函数

var memoizer = function(memo, fundamental){
	var shell = function(n){
		var result = memo[n];
		if(typeof result !== 'number'){
			result = fundamental(shell, n);
			memo[n] = result;
		}
		return result;
	};
	return shell;
};

// 使用memoizer 来定义fibonacci函数，提供初始的memo数组和fundamental函数
var fibonacci = memoizer([0, 1], function(shell, n){
	return shell(n - 1) + shell(n - 2);
});

// 产生一个可记忆的阶乘函数
var factorial = memoizer([1, 1], function(shell, n){
	return n*shell(n-1);
});



