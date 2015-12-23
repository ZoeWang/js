/**
 * 9.1 类和原型
 * 例 9-1
 */

//例6-1 ;通过原型继承创建一个新对象
//inherit() 返回了一个继承自原型对象p的属性的新对象
//这里使用ECMAScript 5 中的Object.create() 函数(如果存在的话)
//如果不存在Object.create() ，则退化使用其他方站
function inherit(p) {
	if (p == null) throw TypeError(); // p是一个对象，但不能是null
	if (Object.create) //如果Object.create() 存在
		return Object.create(p); //直接使用它
	var t = typeof p; //否则进行进一步检测
	if (t !== "object" && t !== "function") throw TypeError();
	function f() {}; //定义一个空构造函数
	f.prototype = p; //将其原型属性设置为p
	return new f(); //使用f() 创建p的继承对象
}
// range.js: 实现一个能表示值的范围的类

// 这个工厂方法返回一个新的范围对象
function range(from, to) {
	// 使用inherit() 函数来创建对象，这个对象继承自在下面定义的原型对象
	// 原型对象作为函数的一个属性存储，并定义所有“范围对象”所共享的方法（行为）
	var r = inherit(range.methods);

	// 存储新的“范围对象”的起始位置和结束位置（状态）
	// 这两个属性是不可继承的，每个对象都拥有唯一的属性
	r.from = from;
	r.to = to;

	//返回这个新创建的对象
	return r;
}

// 原型对象定义方法，这些方法为每个范围对象所继承
range.methods = {
	// 如果x在范围内，则返回true；否则返回false
	// 这个方法可以比较数字范围，也可以比较字符串和日期范围
	includes: function (x) {
	return this.from <= x && x <= this.to; },

	// 对于范围内的每个整数都调用一次f
	// 这个方法只可用做数字范围
	foreach: function (f) {
		for( var x = Math.ceil(this.from); x <= this.to; x++) f(x);
	},
	// 返回表示这个范围的字符串
	toString: function() {return "(" + this.from + "..." + this.to + ")";}
}

// 这里是使用“范围对象”的一些例子
var r = range(1,3);		// 创建一个范围对象
r.includes(2);			// => true:2 在这个范围内
r.foreach(console.log);	// 输出 1 2 3
console.log(r);			// 输出（1...3）

/**
 *	9.2 类和构造函数
 *  例 9-2
 */
//使用构造函数来定义“范围类”
// 这个是一个构造函数，用以初始化新创建的“范围对象”
// 注意，这里并没有创建并返回一个对象，仅仅是初始化
function Range(from, to) {
	// 存储“范围对象”的起始位置和结束位置（状态）
	// 这两个属性是不可继承的，每个对象都拥有唯一的属性
	this.from = from;
	this.to = to;
}

// 所有的“范围对象”都继承自这个对象
// 注意， 属性的名字必须是“prototype”
Range.prototype = {
	// 如果x在范围内，则返回true；否则返回false
	// 这个方法可以比较数字范围，也可以比较字符串和日期范围
	includes: function (x) { return this.from <= x && x <= this.to;},
	// 对于范围内的每个整数都调用一次f
	// 这个方法只可用于数字范围
	foreach: function (f) {
		for( var x = Math.ceil(this.from); x <= this.to; x++) f(x);
	},
	// 返回表示这个范围的字符串
	toString: function() { return "(" + this.from + "..." + this.to + ")";}
}

// 这里是使用“范围对象”的一些例子
var r = new Range(1,3);	// 创建一个范围对象
r.includes(2);			// => true: 2 在这个范围内
r.foreach(console.log);	// 输出 1 2 3
console.log(r);			// 输出（1...3）

r instanceof Range 	//如果r继承自Range.prototype ,则返回true
range.methods.isPrototypeOf(r);		//range.method 是原型对象

/**
 * 9.2.2 constructor 属性
 */
// prototype 对象包涵唯一一个不可枚举属性constructor. constructor 属性的值是一个函数对象

var F = function() {};		// 这是一个函数对象
var p = F.prototype;		// 这是F 相关联的原型对象
var c = p.constructor;		// 这是与原型相关联的函数
c === F 					// => true: 对于任意函数F.prototype.constructor == F

// 构造函数的原型中存在预先定义好的constructor属性
// 这意味着对象通常继承的constructor均指代它们的构造函数

var o = new F();		//创建类F的一个对象
o.constructor === F 	// => true, constructor 属性指代这个类

// 例9-2中定义的Range类使用它自身的一个新对象重写预定义的Range.prototype对象。
// 这个新定义的原型对象不含有constructor属性。
// 因此Range类的实例也不含有constructor属性。我们可以通过 显式给原型添加一个构造函数：
Range.prototype = {
	constructor: Range,		// 显式设置构造函数反向引用
	includes: function(x) { return this.from <= x && x <= this.to; },
	foreach: function(f) {
		for(var x = Math.ceil(this.from); x <= this.to; x++) f(x);
	},
	toString: function() { return "(" + this.from + "..." + this.to + ")"; }
}

//使用预定义的原型对象，预定义的原型对象包含constructor属性

// 扩展预定义的Range.prototype对象，而不重写之
// 这样就自动创建Range.prototype.constructor属性
Range.prototype.includes = function (x) { return this.from <= x && x <= this.to; };
Range.prototype.foreach = function (f) {
	for(var x = Math.ceil(this.from); x <= this.to; x++) f(x);
};
Range.prototype.toString = function () {
	return "(" + this.from + "..." + this.to + ")";
};

/**
 * 9.3 JavaScript 中 Java式的类继承
 */
// 第一步，先定义一个构造函数，并设置初始化新对象的实例属性
// 第二步, 给构造函数的prototype对象定义实例的方法
// 第三步，给构造函数定义类字段和类属性

// 一个用以定义简单类的函数
function defineClass(constructor,		// 用以设置实例的属性的函数
					 methods, 			// 实例的方法，复制至原型中
					 statics)			// 类属性， 复制至构造函数中
{
	if (methods) extend(constructor.prototype, methods);
	if (statics) extend(constructor, statics);
	return constructor;
}

// 这是Range类的另一个实现
var SimpleRange = 
	defineClass(function(f,t) {this.f = f; this.t = t; },
				{
					includes: function(x) { return this.f <= x && x <= this.t;},
					toString: function() { return this.f + "..." + this.t; }
				},
				{ upto: function(t) { return new SimpleRange(0,t); } });


//例 9-3: Complex.js: 表示复数的类
/*
 * Complex.js:
 * 这个文件定义了Complex类，用来描述复数
 * 复数是实数和虚数的和，且虚数i是-1的平方根
 */
/*
 * 这个构造函数为它所创造的每个实例定义了实例字段r和i
 * 这两个字段分别保存复数的实部和虚部
 * 它们是对象的状态
 */
function Complex(real, imaginary) {
	if(isNaN(real) || isNaN(imaginary))		// 确保两个实参都是数字
		throw new TypeError();				// 如果不都是数字则抛出错误
	this.r = real;							// 复数的实部
	this.i = imaginary;						// 复数的虚部
}

/*
 * 类的实例方法定义为原型对象的函数值属性
 * 这里定义的方法可以被所有实例继承，并为它们提供共享的行为
 * 需要注意的是，JavaScript 的实例方法必须使用关键字this来存取实例的字段
 */
// 当前复数对象加上另一个复数，并返回一个新的计算和值后的复数对象
Complex.prototype.add = function (that) {
	return new Complex(this.r + that.r, this.i + that.i);
};

// 当前复数乘以另外一个复数，并返回一个新的计算乘积之后的复数对象
Complex.prototype.mul = function(that) {
	return new Complex(this.r * that.r - this.i * that.i, this.r * that.i + this.i * that.r);
};

// 计算复数的模，复数的模定义为原点(0,0) 到复数平面的距离
Complex.prototype.mag = function () {
	return Math.sqrt(this.r * this.r + this.i * this.i);
};

// 复数的求负运算
Complex.prototype.neg = function() {
	return new Complex(-this.r, -this.i);
};

// 将复数对象转换为一个字符串
Complex.prototype.toString = function () {
	return "{" + this.r + "," + this.i + "}";
};
//仿Java实例字段可用作局部变量
// Complex.prototype.toString = function() {
// 	with(this){
// 		return "{" + r + "," + i + "}";
// 	}
// }

// 检测当前复数对象是否和另一个复数值相等
Complex.prototype.equals = function () {
	return that != null &&						// 必须定义且不能是null
	that.constructor === Complex &&				// 并且必须是Complex的实例
	this.r === that.r && this.i === that.i;		// 并且必须包含相同的值
};

/*
 * 类字段（比如常量）和类方法直接定义为构造函数的属性
 * 需要注意的是，类的方法通常不使用关键字this
 * 它们只对其参数进行操作
 */
// 这里预定义了一些对复数运算有帮助的类字段
// 它们的命名全是大写，用以表明它们是常量
// (在ECMAScript 5 中，还能设置这些类字段的属性为只读)
Complex.ZERO = new Complex(0,0);
Complex.ONE = new Complex(1,0);
Complex.I = new Complex(0,1);

// 这个类方法将由实例对象的toString 方法返回的字符串格式解析为一个Complex对象
// 或者抛出一个类型错误异常
Complex.parse = function (s) {
	try {	//假设解析成功
		var m = Complex._format.exec(s);	// 利用正则匹配
		return new Complex(parseFloat(m[1]), parseFloat(m[2]));
	} catch(x) {	// 如果解析失败抛出异常
		throw new TypeError("Can't parse '" + s + "' as a Complex number.");
	}
};

// 定义类的“私有”字段，这个字段在Complex.parse()中用的
// 下划线前缀表明他是类内部使用，不属于类的共有API的部分
Complex._format = /^\{([^,]+),([^}]+)\}$/;

//从例9-3中所定义的Complex类中可以看出，我们用到了构造函数、实例字段、实例方法、类字段和类方法，看下这段代码

var c = new Complex(2,3);		// 使用构造函数创建新的对象
var d = new Complex(c.i,c.r);	// 用到了c的实例属性
c.add(d).toString();			// => "{5,5}": 使用了实例的方法
// 这个稍微复杂的表达式用到了类方法和类字段
Complex.parse(c.toString()).	//将c转换成字符串
	add(c.neg()).				//加上他的负数
	equals(Complex.ZERO)		//结果应当永远是“零”；

/**
 * 9.4 类的扩充
 */
// 返回当前复数的共轭复数
Complex.prototype.conj = function() { return new Complex(this.r,-this.i); };

//可以给数字，字符串，数组，函数等数据类型添加方法
if(!Function.prototype.bind){
	Function.prototype.bind = function(0 /*, args */){
		//bind() 方法代码...
	};
}

// 例子

// 多次调用这个函数f，传入一些迭代数
// 比如，要输出"hello" 三次：
// var n = 3;
// n.times(function(n) { console.log(n + "hello"); });
Number.prototype.times = function(f, context) {
	var n = Number(this);
	for(var i = 0; i<n; i++) f.call(context, i);
}

//如果不存在ES5的String.trim()方法的话，就定义它
//这个方法用以去除字符串开头和结尾的空格
String.prototype.trim = String.prototype.trim || function() {
	if(!this) return this;						//空字符串不做处理
	return this.replace(/^\s+|\s+$/g, "");		//使用正则表达式进行空格替换	
};

//返回函数的名字，如果它有（非标准的）name属性，则直接使用name属性
//否则，将函数转换为字符串然后从中提取姓名字
//如果是没有名字的函数，则返回一个空字符串
Function.prototype.getName = function() {
	return this.name || this.toString().match(/function\s*([^()*]\(/)[1];
}

/*注：不推荐给Object.prototype添加方法，因为在ES5之前，无法将这些新增的方法设置为不可枚举，会被for/in 遍历到*/

/**
 * 9.5.2 constructor 属性
 */
// 使用constructor 属性识别对象是否属于某个类的方法
function typeAndValue(x) {
	if(x == null) return "";	//Null 和undefined没有构造函数
	switch(x.constructor) {
		case Number: return "Number: " + x;		//处理原始类型
		case String: return "String: '" + x + "'";
		case Date: return "Date: " + x;			//处理内置类型
		case RegExp: return "RegExp: " + x;
		case Complex: return "Complex: " + x;	//处理自定义类型
	}
}

//例9-4：可以判断值的类型的type()函数
/*
 * 以字符串形式返回o的类型
 * - 如果o 是null，返回"null";如果o是NaN，返回"nan"
 * - 如果typeof所返回的值不是object，则返回这个值
 *（注意，有些JavaScript的实现将正则表达式识别为函数）
 * -如果o的类不是Object，则返回这个值
 * -如果o包含有构造函数并且这个构造函数具有名称，则返回这个名称
 * -否则，一律返回Object
 */
function type(o) {
	var t,c,n;	//type class name

	//处理null值的特殊情形
	if(o === null) return "null";

	//另外一种情形：NaN和它自身不相等
	if(o !== o) return "nan";

	//如果typeof的值不是"object",则使用这个值
	//这可以识别出原始值的类型和函数
	if((t = typeof o) !== "Object") return t;

	//返回对象的类名，除非值为"Object"
	//这种方式可以识别出大多数的内置对象
	if((c = classof(o)) !== "Object") return c;

	//如果对象构造函数的名字存在的话，则返回它
	if(o.constructor && typeof o.constructor === "function" &&
		(n = o.constructor.getName())) return n;

	// 其他的类型都无法判断，一律返回"Object"
	return "Object";
}

// 返回对象的类
function classof(o) {
	return Object.prototype.toString.call(o).slice(8, -1);
};

// 返回函数的名字（可能是空字符串），不是函数的话返回null
Function.prototype.getName = function() {
	if("name" in this) return this.name;
	return this.name = this.toString().match(/function\s*([^(]*)\(/)[1];
};

// 如果使用不带名字的函数定义一个构造函数，getName()返回空字符串

// 这个构造函数没有名字
var Complex = function(x,y) { this.r = x; this.i = y; }
// 这个构造函数有名字
var Range = function Range(f,t) { this.from = f; this.to = t;}

//例9-5： 利用鸭式辩型实现的函数
// 如果o实现了除了第一个参数之外的参数所表示的方法，则返回true
function quacks(o /*,...*/) {
	for(var i=1; i<arguments.length; i++) {		//遍历o之后的所有参数
		var arg = arguments[i];
		switch (typeof arg) {		//如果参数是：
		case 'string': 				//string: 直接用名字检测
			if(typeof o[arg] !== "function") return false;
			continue;
		case 'function': 			//function: 检查函数的原型对象上的方法
			// 如果实参是函数，则使用它的原型
			arg = arg.prototype;	//进入下一个case
		case 'object': 				//object: 检测匹配的方法
			for(var m in arg) {		//遍历对象的每个属性
				if(typeof arg[m] !== "function") continue;	//跳过不是方法的属性
				if(typeof o[m] !== "function") return false;
			}
		}
	}

	// 如果程序能执行到这里，说明o实现了所有的方法
	return true;
}

// 不能通过quacks(o, Array)来检测o是否实现了Array中所有同名的方法，内置类方法都是不可枚举的

/**
 * 9.6.1 集合类
 */
// 例9-6 Set.js: 值的任意集合
function Set() {		//这是一个构造函数
	this.values = {};	//集合数据保存在对象的属性里
	this.n = 0;			//集合中值的个数
	this.add.apply(this, arguments);	//把所有参数都添加进这个集合
}

//将每个参数都添加至集合中
Set.prototype.add = function() {
	for(var i = 0; i< arguments.length; i++){	//遍历每个参数
		var val = arguments[i];					//待添加到集合中的值
		var str = Set._v2s(val);				//把它转换为字符串
		if(!this.values.hasOwnProperty(str)) {	//如果不在集合中
			this.values[str] = val;				//将字符串和值对应起来
			this.n++;							//集合中值的计数加一
		}
	}
	return this;								//支付链式方法调用
};

// 从集合删除元素，这些元素由参数指定
Set.prototype.remove = function() {
	for(var i = 0; i<arguments.length; i++) {		//遍历每个参数
		var str = Set._v2s(arguments[i]);			//将字符串和值对应起来
		if(this.values.hasOwnProperty(str)) {		//如果它在集合中
			delete this.values[str];				//删除它
			this.n--;								//集合中值的计数减一
		}
	}
	return this;		//支持链式方法调用
};

// 如果集合包含这个值，返回true 否则，返回false
Set.prototype.contains = function(value) {
	return this.values.hasOwnProperty(Set._v2s(value));
}

//返回集合的大小
Set.prototype.size = function() {
	return this.n;
}

//遍历集合中的所有元素，在指定的上下文中调用f
Set.prototype.foreach = function(f, context) {
	for(var s in this.values)					//遍历集合中的所有字符串
		if(this.values.hasOwnProperty(s))		//忽略继承的属性
			f.call(context, this.values[s]);	//调用f，传入value
};

// 这是一个内部函数，用以将任意JavaScript值和唯一字符串对应起来
Set._v2s = function(val) {
	switch(val) {
		case undefined: 	return 'u';		//特殊的原始值
		case null: 			return 'n';		//值只有一个字母
		case true: 			return 't';		//代码
		case false: 		return 'f';
		default: switch (typeof val) {
			case 'number': return '#' + val;	//数字都带有 # 前缀
			case 'string': return '"' + val;	//字符串都带有" 前缀
				default: return '@' + objectId(val);	//Objs and funcs get @
		}
	}

	// 对任意对象来说， 都会返回一个字符串
	// 针对不同的对象，这个函数会返回不同的字符串
	// 对于同一个对象的多次调用，总是返回相同的字符串
	// 为了做到这一点，它给o创建了一个属性，在ES5中，这个属性是不可枚举且是只读的
	function objectId(o) {
		var prop = "|**objectid**|";	//私有属性，用以存放id
		if(!o.hasOwnProperty(prop))		//如果对象没有id
			o[prop] = Set._v2s.next++;	//将下一个值赋给它
		return o[prop];					//返回这个id
	}
};
Set._v2s.next = 100;	//设置初始id的值

/**
 * 9.6.2 枚举类型
 */
/* 例9-7 包含一个单独函数enumeration()。但他不是构造函数，它并没有定义
一个名叫"enumeration"的类。相反，他是一个工厂方法，每次调用它都会创建并返回一个新的类*/
// 使用4个值创建新的Coin类
var Coin = enumeration({Penny: 1, Nickel:5, Dime:10, Quarter:25 });
var c = Coin.Dime;					//这是新类的实例
c instanceof Coin 					//=> true: instanceof正常工作
c.constructor == Coin  				//=> true: 构造函数的属性正常工作
Coin.Quarter + 3*Coin.Nickel		//=> 40: 将值转换为数字
Coin.Dime == 10 					//=> true:更多转换为数字的例子
Coin.Dime > Coin.Nickel 			//=> true:关系运算符正常工作
String(Coin.Dime) + ":" + Coin.Dime	//=> "Dime:10" : 强制转换为字符串

// 例9-7：JavaScript中的枚举类型
//这个函数创建一个新的枚举类型，实参对象表示类的每个实例的名字和值
//返回值是一个构造函数，它标识这个新类
//注意，这个构造函数也会抛出异常：不能使用它来创建该类型的新实例
//返回的构造函数包含名/值对的映射表
//包括由值组成的数组，以及一个foreach()迭代器函数
function enumeration(namesToValues) {
	// 这个虚拟的构造函数是返回值
	var enumeration = function() { throw "Can't Instantiate Enumeration"; };

	//枚举值继承自这个对象
	var proto = enumeration.prototype = {
		constructor: enumeration,		//标识类型
		toString: function () { return this.name; },	//返回名字
		valueOf: function () { return this.value; },	//返回值
		toJSON: function () { return this.name; }		//转换为JSON
	};

	enumeration.values = [];	//用以存放枚举对象的数组

	// 现在创建新类型的实例
	for(name in namesToValues) {  	// 遍历每个值
		var e = inherit(proto);		// 创建一个代表它的对象
		e.name = name;				// 给它一个名字
		e.value = namesToValues[name];	//给它一个值
		enumeration[name] = e;		//将它设置为构造函数的属性
		enumeration.values.push(e);	//将它存储到值数组中
	}
	// 一个类方法，用来对类的实例进行迭代
	enumeration.foreach = function(f,c){
		for(var i=0; i<this.values.length; i++) f.call(c, this.values[i]);
	};

	// 返回标识这个新类型的构造函数
	return enumeration;
}

//例9-8：使用枚举类型来表示一副扑克牌
// 定义一个表示“玩牌”的类
function Card(suit, rank) {
	this.suit = suit;	//每张牌都有花色
	this.rank = rank;	//以及点数
}

// 使用枚举类型定义花色和点数
Card.Suit = enumeration({Clubs: 1, Diamonds: 2, Hearts: 3, Spades: 4});
Card.Rank = enumeration({Two: 2, Three: 3, Four: 4, Five: 5, Six: 6, Seven: 7, 
						Eight: 8, Nine: 9, Ten: 10, Jack: 11, Queen: 12, King: 13, Ace: 14});

// 定义用以描述牌面的文本
Card.prototype.toString = function(){
	return this.rank.toString() + " of " + this.suit.toString();
};

//比较扑克牌中两张牌的大小
Card.prototype.compareTo = function(that){
	if(this.rank < that.rank) return -1;
	if(this.rank > that.rank) return 1;
	return 0;
};

//以扑克牌的玩法规则对牌进行排序的函数
Card.orderByRank = function(a,b) { return a.compareTo(b); };

//以桥牌的玩法规则对扑牌进行排序的函数
Card.orderBySuit = function(a, b) {
	if(a.suit < b.suit) return -1;
	if(a.suit > b.suit) return 1;
	if(a.rank < b.rank) return -1;
	if(a.rank > b.rank) return 1;
	return 0;
}

// 定义用以表示的一副标准扑克牌的类
function Deck(){
	var cards = this.cards = [];	//一副牌就是由牌组成的数组
	Card.Suit.foreach(function(s){		//初始化这个数组
		Card.Rank.foreach(function(r){
			cards.push(new Card(s,r));
		});
	})
}

//洗牌的方法：重新洗牌并返回洗好的牌
Deck.prototype.shuffle = function(){
	// 遍历数组中的每个元素，随机找出牌面最小的元素，并与之（当前遍历的元素）交换
	var deck = this.cards, len = deck.length;
	for(var i = len - 1; i > 0; i--){
		var r = Math.floor(Math.random()*(i+1)), temp;		// 随机数
		temp = deck[i] = deck[r], deck[r] = temp;			// 交换
	}
	return this;
};

//发牌的方法：返回牌的数组
Deck.prototype.deal = function(n){
	if(this.cards.length < n) throw "Out of cards";
	return this.cards.splice(this.cards.length - n, n);
};

// 创建一副新扑克牌，洗牌并发牌
var deck = (new Deck()).shuffle();
var hand = deck.deal(13).sort(Card.orderBySuit);

/**
 * 9.6.3 标准转换方法
 */
//extend() 函数 例6-2 用法
/*
 * 把p中的可枚举属性复制到o中，并返回o
 * 如果o和p中含有同名属性，则覆盖o中的属性
 * 这个函数并不处理getter和setter以及复制属性
 */
function extend(o,p){
	for(prop in p) {	//遍历p中的所有属性
		o[prop] = p[prop];	//将属性添加至o中
	}
	return o;
}

// 将这些方法添加至Set类的原型对象中
extend(Set.prototype, {
	// 将集合转换为字符串
	toString: function(){
		var s = "{",
		i = 0;
		this.foreach(function(v) {s += ((i++>0) ? ", " : "") + v; });
		return s + "}";
	},
	// 类似 toString, 但是对于所有的值都将调用toLocaleString()
	toLocaleString: function (){
		var s = "{",i = 0;
		this.foreach(function(v){
			if(i++>0) s += ", ";
			if(v == null) s += v;	//null 和 undefined
			else s += v.toLocaleString();	// 其他情况
		});
		return s + "}";
	},
	//将集合转换为值数组
	toArray: function(){
		var a = [];
		this.foreach(function(v){ a.push(v); });
		return a;
	}
});

Set.prototype.toJSON = Set.prototype.toArray;

/**
 * 9.6.4 比较方法
 */


