// JavaScript 是一门基于原型的语言，对象直接从其他对象继承

/**
 * 伪类
 */
// JavaScript 不让对象直接从其他对象继承，反而插入了一个多余的间接层，从而使构造器函数产生对象
// 当一个函数被创建时，Function 构造器产生的函数对象会运行类似这样的一些代码
this.prototype = {constructor:this};

// 该prototype对象是存放继承特征的地方

// 如果new运算符是一个方法而不是一个运算符,它可能会这样执行
Function.method('new', function(){

	// 创建一个新对象，它继承自构造器函数的原型对象。

	var that = Object.beget(this.prototype)

	// 调用构造器函数，绑定-this- 到新对象上。

	var other = this.apply(that, arguments);

	// 如果它的返回值不是一个对象，就返回该新对象

	return (typeof other === 'object' && other) || that;

});

// 我们可以定义一个构造器并扩充它的原型：
var Mammal = function(name){
	this.name = name;
};

Mammal.prototype.get_name = function(){
	return this.name;
};

Mammal.prototype.says = function(){
	return this.saying || '';
};

// 现在，我们可以构造一个实例
var myMammal = new Mammal('Herb the Mammal');
var name = myMammal.get_name();		// 'Herb the Mammal'

// 我们可以构造另一个伪类来继承Mammal，这是通过定义它的constructor函数并替换它的
// prototype为一个Mammal的实例来实现的
var Cat = function(name){
	this.name = name;
	this.saying = 'meow';
};

// 替换 Cat.prototype 为一个新的Mammal实例

Cat.prototype = new Mammal();

// 扩充新原型对象，增加purr 和 get_name 方法。

Cat.prototype.purr = function(n){
	var i,s = '';
	for(i = 0; i < n; i  += 1){
		if(s){
			s += '-';
		}
		s += 'r';
	}
	return s;
};
Cat.prototype.get_name = function(){
	return this.says() + ' ' + this.name + ' ' + this.says();
};

var myCat = new Cat('Henrietta');
var says = myCat.says();	// 'meow'
var purr = myCat.purr(5);	// 'r-r-r-r-r'
var name = myCat.get_name();	// 'meow Henrietta meow'

// 通过使用method 方法定义一个inherits方法来实现的：
Function.method('inherits', function(Parent) {
	this.prototype = new Parent();
	return this;
});

// 我们的inherits 和 method 方法都返回this，这将允许我们可以以级联的样式编程
var Cat = function(name) {
	this.name = name;
	this.saying = 'meow';
}.inherits(Mammal).
  method('purr', function(n){
  		var i,s = '';
  		for(i = 0; i < n; i += 1){
  			if(s){
  				s += '-';
  			}
  			s += 'r';
  		}
  		return s;
  }).
  method('get_name', function(){
  	return this.says() + ' ' + this.name + ' ' + this.says();
  });

  // 如果你在调用构造器函数时忘记了加 new 那么this将绑定到全局变量上

/**
 * 对象说明符
 */
var myObject = maker(f,l,c,s);
// 这样写更方便
var myObject = maker({
	first: f,
	last: l,
	state: s,
	city: c
});

/**
 * 原型
 */
// 对象字面量构造一个对象
var myMammal = {
	name: 'Herb the Mammal',
	get_name: function(){
		return this.name;
	},
	says: function(){
		return this.saying || '';
	}
};

// 定制新的实例
var myCat = Object.beget(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function(n){
	var i, s = '';
	for(i = 0; i < n; i += 1){
		if(s){
			s += '-';
		}
		s += 'r';
	}
	return s;
};
myCat.get_name = function(){
	return this.says + ' ' + this.name + ' ' + this.says;
};
// 这是一种“差异化继承”。通过定制一个新的对象，我们指明了它与所基于的基本对象的区别

// 某种数据结构从其他数据结构继承
// 假定我们要解析一门类似Javascript或TEX那样用一对花括号指示作用域的语言
// 定义在一个作用域中的条目在该作用域之外是不可见的
// 也就是说，一个内部作用域会继承他的外部作用域

// 第一个左左花括号时 block 函数被调用。parse 函数将从scope中寻找符号
// 并且当它定义了新的符号时扩充scope

var block = function(){
	// 记住当前的作用域。构造一个包含了当前作用域中所有对象的新作用域
	
	var oldScope = scope;
	scope = Object.beget(scope);

	// 传递左花括号作为参数调用 advance.

	advance('{');

	// 使用新的作用域进行解析

	parse(scope);

	// 传递右花括号作为参数调用advance 并抛弃新作用域，恢复原来老的作用域

	advance('}');
	scope = oldScope;
};

/**
 * 函数化  （没懂）
 *
 * 我们从构造一个将产生对象的函数开始，给它起的名字将以一个小写字母开头，因为它并
 * 不需要使用new前缀。该函数包括4个步骤
 */

 1. 它创建一个新对象。有很多的方式去构造一个对象。它可以构造一个对象字面量，
 	或者它可以和new 前缀连用去调用一个构造器函数，或者它可以使用Object.beget方法
 	去构造一个已经存在的对象的新实例，或者它可以调用任意一个会返回一个对象的函数。
 2. 它选择性地定义私有实例变量和方法。这些就是函数中通过var语句定义的普通变量。
 3. 它给这个新对象扩充方法。那些方法将拥有特权去访问参数，以及在第二步中通过var语句定义的变量。
 4. 它返回那个新对象。

// 这是一个函数化构造器的伪代码模板
var constructor = function(spec, my){
	var that, 其他的私有实例变量;
	my = my || {};

	把共享的变量和函数添加到my中

	that = 一个新对象

	添加给 that 的特权方法

	return that;
}

spec 对象包含构造器须要构造一个新实例的所有信息。spec的内容可能会被复制到私有变量中，
或者被其他函数改变，或者方法可以在需要的时候访问spec 的信息。
（一个简化的方式是替换spec为一个单一的值，当构造对象时并不需要整个spec对象的时候
这是有用的。）

my对象是一个为继承链中的构造器提供秘密共享的容器。my对象可以选择性的使用。如果没有
传入一个my对象，那么会创建一个my对象

// 给my对象添加共享的秘密成员

my.member = value;

// 扩充that，加入组成该对象接口的特权方法。我们可以分配一个新函数成为that的成员方法
// 或更安全的，先将函数定义为私有方法，然后再将他们分配给that：

var methodical = function(){
	...
};
that.methodical = methodical;

// 分两步去定义methodical的好处是，如果其他方法想要调用methodical，它们可以直接
// 调用 methodical() 而不是 that.methodical().如果该实例被破坏或篡改，
// 甚至 that.methodical 被替换掉了，调用methodical 的方法将同样会继续工作，因为它们
// 私有的methodical不受该实例修改的影响

最后，我们返回that

// 将这个模式应用到Mammal例子里。此处不需要my,所以我们先抛开它，但将使用一个spec对象
// name和saying属性现在是完全私有的。它们只有通过get_name 和 says两个特权方法才可以访问
var mammal = function(spec){
	var that = {};

	that.get_name = function(){
		return spec.name;
	};

	that.says = function(){
		return spec.saying || '';
	};

	return that;
};

var myMammal = mammal({name: 'Herb'});

// 在伪类模式中，构造器函数Cat 不得不重复构造器Mammal 已经完成的工作。
// 在函数化模式中那不再需要了，因为构造器Cat将会调用构造器Mammal，让Mammal去做对象创建
// 中的大部分工作，所以Cat 只须关注自身的差异即可。

var cat = function(spec){
	spec.saying = spec.saying || 'meow';
	var that = mammal(spec);
	that.purr = function(n){
		var i, s='';
		for(i = 0; i < n; i += 1){
			if(s){
				s += '-';
			}
			s += 'r';
		}
		return s;
	};
	that.get_name = function(){
		return that.says() + '' + spec.name + ' ' + that.says();
	}
	return that;
};

var myCat = Cat({name:'Henrietta'});

// 函数化模式还给我们提供了一个处理父类方法的方法，我们将构造一个superior方法
// 它取得一个方法名并返回回调用那个方法的函数。该函数将调用原来的方法，尽管属性已经变化了
Object.method('superior', function(name){
	var that = this, method = that[name];
	return function(){
		return method.apply(that, arguments);
	};
});

// 声明一个super_get_name 变量，把调用superior 方法所返回的结果赋值给它

var coolcat = function(spec){
	var that = cat(spec),
		super_get_name = that.superior('get_name');
	that.get_name = function(n){
		return 'like ' + super_get_name() + 'baby';
	};
	return that;
};
var myCoolCat = coolcat({name: 'Bix'});
var name = myCoolCat.get_name();
// 'like meow Bix meow baby'

// 如果我们用函数化的样式创建一个对象，并且该对象的所有方法都不使用this 或 that
// 那么该对象就是持久性的，一个持久性对象就是 一个简单功能函数的集合

// 一个持久性的对象不会被损害，访问一个持久性的对象时，除非被方法授权，否则攻击者不能访问对象的内部状态



/**
 * 部件 （没懂）
 */
// 我们可以从一套部件中组合出对象来，可以构造一个能添加简单事件处理特性到任何对象上的函数。
// 它会给对象添加一个on方法、一个fire方法和一个私有的事件注册表对象

var eventuality = function(that){
	var registry = {};

	that.fire = function(event){
// 在一个对象上触发一个事件。该事件可以是一个包含事件名称的字符串，
// 或者是一个拥有包含事件名称的type属性的对象
// 通过'on'方法注册的事件处理程序中匹配事件名称的函数将被调用。

	var array,
		func,
		handler,
		i,
		type = typeof event === 'string' ?
				event : event.type;

// 如果这个事件存在一组事件处理程序，那么就遍历它们并按顺序依次执行
		
		if(registry.hasOwnProperty(type)){
			array = registry[type];
			for(i = 0; i < array.length; i += 1){
				handler = array[i];

// 每个处理程序包含一个方法和一组可选的参数
// 如果该方法是一个字符串形式的名字，那么寻找到该函数

				func = handler.method;
				if(typeof func === 'string'){
					func = this[func];
				}

// 调用一个处理程序。如果该条目包含参数，那么传递它们过去。否则，传递该事件对象

				func.apply(this, handler.parameters || [event]);
			}
		}
		return this;
	};

	that.on = function(type, method, parameters){

// 注册一个事件，构造一条处理程序条目。将它插入到处理程序数组中，
// 如果这种类型的事件还不存在，就构造一个

		var handler = {
			method: method,
			parameters: parameters
		};
		if(registry.hasOwnProperty(type)){
			registry[type].push(handler);
		}else{
			registry[type] = [handler];
		}
		return this;
	};
	return that;
};

// 我们可以在任何单独的对象上调用eventuality，授予它事件处理方法。我们也可以赶在that被返回前在一个构造器函数中调用它

eventuality(that);

// 用这种方式，一个构造器函数可以从一套部件中组装出对象来。JavaScript 的弱类型在此处
// 是一个巨大的优势，因为我们无须花费精力去关注一个类型系统中的类谱系。想反，我们可以专注于它们的个性化内容

// 如果我们想要eventuality去访问该对象的私有状态，则可以把私有成员集my传递给它。

























