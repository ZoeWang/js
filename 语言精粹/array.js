/**
 * 数组是一段线性分配的内存，它通过整数去计算偏移量并访问其中的元素。数组可以是
 * 很快的数据结构；
 */

 /**
  * 数组字面量
  */
 var empty = [];
 var numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
 empty[i];		// undefined
 numbers[i];	// 'one'
 empty.length	// 0
 numbers.length		// 10

// 在大多数语言中，一个数组的所有元素都要求是相同的类型。JavaScript允许数组包含任意混合类型的值

var misc = ['string', 98.6, true, false, null, undefined, 
			['nested', 'array'], {object:true}, NaN, Infinity ];
misc.length		// 10 

/**
 * 长度 JavaScript数组的length是没有上界的
 */

 // length 属性值是这个数组的最大整数属性名+1，它不一定等于数组里的属性的个数
 var myArray = [];
 myArray.length		// 0

 myArray[10000] = true;
 myArray.length		// 10001
 // myArray 只包含一个属性

// 可以直接设置length的值，设置更大的length无须给数组分配更多地空间，而把length
// 设小将导致所有下标大于等于新length的属性被删除

numbers.length = 3;
 // numbers = ['zero', 'one', 'two']

 // 通过把下标指定为一个数组的当前length ，可以附加一个新元素到该数组尾部
numbers[numbers.length] = 'shi';
// numbers = ['zero', 'one', 'two', 'shi']

numbers.push('go');
// numbers = ['zero', 'one', 'two', 'shi', 'go']

/**
 * 删除
 */

// JavaScript的数组其实就是对象，所以delete运算符可以用来从数组中移除元素：
delete numbers[2];
// numbers = ['zero', 'one', undefined, 'shi', 'go']

// JavaScript数组有一个splice方法，第一个参数是数组中的一个序号，第二个参数是要删除的元素个数

numbers.splice(2,1);
// numbers = ['zero', 'one', 'shi', 'go']

// 被删除属性后面的每个属性必须被移除，并且以一个新的键值重新插入，这对于大型数组来说可能会效率不高

/**
 * 枚举
 */
// JavaScript里数组是对象，所以 for in 可以用，同时，for in 存在的问题，
// 无法保证属性顺序，可能从原型链中得到意外属性问题 都存在

// for语句
var i;
for(i = 0; i < myArray.length; i += 1){
	document.writeln(myArray[i]);
}


/**
 * 混淆的地方
 */
// typeof 运算符报告数组的类型是'object'，这没什么用，数组和对象的区别是混乱的

// 自定义is_array 函数避免 和 对象混淆

var is_array = function(value){
	return value && 
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		typeof value.splice === 'function' &&
		!(value.propertyIsEnumerable('length'));
};

/**
propertyIsEnumerable()是用来检测属性是否属于某个对象的,如果检测到了,返回true,否则返回false. 
1.这个属性必须属于实例的,并且不属于原型. 
2.这个属性必须是可枚举的,也就是自定义的属性,可以通过for..in循环出来的. 
只要符合上面两个要求,就会返回true; 
*/ 
function MyObject() { 
	this.name = "我是实例的属性"; 
} 
var obj = new MyObject(); 
alert(obj.propertyIsEnumerable("name"));//true 
MyObject.prototype.say = "我是原型的属性"; 
alert(obj.propertyIsEnumerable("say")); //false 
for (var i in obj) { 
	alert(i);//name,age 
} 

/**
 * 方法
 */

// JavaScript中作用于数组的方法被存储在Array.prototype中的函数，
// 方法可扩展

// 给array添加一个方法，允许我们对数组计算

Array.method('reduce', function(f, value){
	var i;
	for(i = 0; i < this.length; i += 1){
		value = f(this[i], value);
	}
	return value;
});

// 调用reduce

// 创建一个数字数组
var data = [4, 8, 15, 16, 23, 42];

// 定义两个简单地函数，一个是将两个数字相加。另一个是相乘
var add = function(a, b){
	return a + b;
};

var mult = function(a, b){
	return a * b;
};

// 调用data的reduce方法，传入add函数
var sum = data.reduce(add,0);		// 108

// 调用reduce方法，传入mult函数
var product = data.reduce(mult, 1);		//7418880

// 因为数组其实就是对象，所以我们可以直接给一个单独的数组添加方法
// 给data添加一个total方法
data.total = function(){
	return this.reduce(add, 0);
};

total = data.total();		// 108

// 因为字符串’total‘ 不是整数，所以给数组增加一个total属相不会改变它的长度
// 当属姓名是整数时数组才是最有用的，但它们依旧是对象，并且对象可以接受任何字符串做属性

/**
 * 维度
 */
// JavaScript 的数组通常不会初始化。如果你用[]得到一个新数组，它将是空的。如果你访问一个不存在的元素，将得到undefined

Array.dim = function(dimension, initial){
	var a = [], i;
	for(i = 0; i < dimension; i += 1) {
		a[i] = initial;
	}
	return a;
}

// 创建一个包含10个0 的数组
var myArray = Array.dim(10, 0);

// JavaScript没有多维数组，但就像大多数类C语言一样，它支持元素为数组的数组

// 创建一个二维数组或一个元素为数组的数组，你必须自己去创建那个第二维的数组
for(i = 0; i < n; i += 1){
	my_array[i] = [];
}

// 注意：Array.dim(n, []) 在这里不能工作
// 如果使用它，每个元素都指向同一个数组的引用，那是非常糟糕的。

// 一个空矩阵的每个单元将拥有一个初始值undefined，如果你希望它们有不同的初始值，必须设置它们

Array.matrix = function(m, n, initial){
	var a, i, j, mat = [];
	for(i = 0; i < m; i += 1){
		a = [];
		for(j = 0; j < n; j += 1){
			a[j] = 0;
		}
		mat[i] = a;
	}
	return mat;
}

// 构造一个用0填充的4X4矩阵。
var myMatrix = Array.matrix(4,4,0);
document.writeln(myMatrix[3][3]);		// 0;

// 用来构造一个恒等矩阵的方法

Array.identity = function(n){
	var i, mat = Array.matrix(n,n,0);
	for(i = 0; i < n; i += 1){
		mat[i][i] = 1;
	}
	return mat;
}

myMatrix = Array.identity(4);

document.writeln(myMatrix[3][3]);		// 1























