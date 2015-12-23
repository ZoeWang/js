// 对象 stooge
var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;		
// 因为x和stooge是指向同一个对象的引用，所以nick为 'Curly'

/**
 * 原型
 */
//创建新对象时，可以选择某个对象作为它的原型
//给Object增加一个beget 方法，这个beget方法创建一个使用原对象作为其原型的新对象
if(typeof Object.beget !== 'function') {
	Object.beget = function (o) {
		var F = function () {};
		F.prototype. = o;
		return new F();
	}
}

var another_stooge = Object.beget(stooge);

//原型关系是一种动态关系，如果我们添加一个新的属性到原型中，
//该属性会立即对所有基于该原型创建的对象可见。
stooge.profession = 'actor';
another_stooge.profession		//'actor'

/**
 * 反射
 */
// 检查对象并确定对象是什么属性
typeof flight.number	// 'number'
typeof flight.status	// 'string'
typeof flight.arrival	// 'object'
typeof flight.manifest	// 'undefined'

// 原型链中任何属性也会产生一个值
typeof flight.toString	//	'function'
typeof flight.constructor	// 'function'

//做反射的目标一般是数据，hasOwnProperty 方法剔除函数值
// hasOwnProperty 不会检查原型链
flight.hasOwnProperty('number');	//true
flight.hasOwnProperty('constructor');	//false

/**
 * 枚举
 */
//for in 枚举对象所有属性，包括函数和原型中的
//常用过滤器 hasOwnProperty 方法 及 typeof 函数
var name;
for(name in another_stooge) {
	if(typeof another_stooge[name] !== 'function') {
		document.writeln(name + ':' + another_stooge[name]);
	}
}

// 确保属性以特定的顺序出现
// 创建一个数组，在其中以特定的顺序包含属性名
var i;
var properties = {
	'first-name',
	'middle-name',
	'last-name',
	'profession'
};
for(i = 0; i< properties.length; i += 1) {
	document.writeln(properties[i] + ": " + another_stooge[properties[i]]);
}

/**
 *	减少全局变量污染
 */
var MYAPP = {};
// 改变量成了你的应用容器
MYAPP.stooge = {
	"first-name":"Joe",
	"last-name":"Howard"
};
MYAPP.flight = {
	airline: "Oceanic",
	number: 815,
	departure: {
		TATA: "SYD",
		time: "2004-09-22 14:55",
		city: "Sydney"
	}
}































