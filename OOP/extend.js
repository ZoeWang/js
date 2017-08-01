// 构造函数继承
/**
 * 模仿子类
 */

function Cat(name, color){
   this.name = name;
   this.color = color;
}

/**
 * 模仿父类
 * Animal 所有不变属性，都放到它的prototype 对象上
 */
function Animal(){};
Animal.prototype.species = "动物";



/**
 * prototype 模式利用中介继承
 */

var F = function(){};
F.prototype = Animal.prototype;
Cat.prototype = new F();
Cat.prototype.constructor = Cat;

// F是空对象，所以几乎不占内存。这时，修改Cat的prototype对象，就不会影响到Animal的prototype对象。

console.log(Animal.prototype.constructor);	//Animal

// 封装为一个继承函数
function extend(Child, Parent){
	var F = function(){};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.uber = Parent.prototype;
};

// 调用
extend(Cat,Animal);
var cat1 = new Cat("小嘿","黑色");
alert(cat1.species);	//动物

// 说明：Child.uber = Parent.prototype;  这个属性直接指向父对象prototype，增加扩展的接口，备用


/**
 * 拷贝继承
 */

function extend2(Child, Parent) {
	var p = Parent.prototype;
	var c = Child.prototype;
	for(var i in p) {
		c[i] = p[i];
	}
	c.uber = p;
}

extend2(Cat, Animal);
var cat2 = new Cat("小嘿","黑色");
alert(cat1.species);	//动物



// ***************************************************************************************

// 非构造函数继承
var Chinese = {
	nation:'中国'
};

var Doctor = {
	career:'医生'
};


/**
 * object() 方法
 * 这个object()函数，其实只做一件事，就是把子对象的prototype属性，指向父对象，从而使得子对象与父对象连在一起。
 */
function object(o){
	function F() {}
	F.prototype = o;
	return new F();
};

// 调用
var Doctor = object(Chinese);
Doctor.career = '医生';
alert(Doctor.nation);	//中国

/**
 * 浅拷贝
 * 把父对象的属性，全部拷贝给子对象，也能实现继承
 * 这样的拷贝有一个问题。那就是，如果父对象的属性等于数组或另一个对象，那么实际上，子对象获得的只是一个内存地址，而不是真正拷贝，因此存在父对象被篡改的可能
 */
function extendCopy(p) {
	var c = {};
	for(var i in p) {
		c[i] = p[i];
	}
	c.uber = p;
	return c;
}

// 使用
var Doctor = extendCopy(Chinese);
Doctor.career = '医生';
alert(Doctor.nation); // 中国

// bug
Chinese.birthPlaces = ['北京','上海','香港'];
var Doctor = extendCopy(Chinese);	//通过extendCopy()函数，Doctor继承了Chinese。
Doctor.birthPlaces.push('厦门');		//我们为Doctor的"出生地"添加一个城市
alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门
alert(Chinese.birthPlaces); //北京, 上海, 香港, 厦门   Chinese的"出生地"也被改掉了！

/**
 * 深拷贝
 * 就是能够实现真正意义上的数组和对象的拷贝。它的实现并不难，只要递归调用"浅拷贝"就行了。
 */

function deepCopy(p, c) {
	var c = c || {};
	for (var i in p) {
		if (typeof p[i] === 'object') {
			c[i] = (p[i].constructor === Array) ? [] : {};
			deepCopy(p[i], c[i]);
		} else {
			c[i] = p[i];
		}
	}

	return c;
}

// 使用
var Doctor = deepCopy(Chinese);
Chinese.birthPlaces = ['北京', '上海', '香港'];
Doctor.birthPlaces.push('厦门');
alert(Doctor.birthPlaces);	//北京， 山海， 香港， 厦门
alert(Chinese.birthPlaces); //北京, 上海, 香港

