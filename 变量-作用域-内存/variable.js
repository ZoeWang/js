// 基本类型 按值 赋值
Undefined Null Boolean Number String

// 引用类型 按址 赋值
Object Array function

// 所有传递参数都是按值传递
// 基本类型
function addTen(num){
	num += 10;
	return num;
}

var count = 20;
var result = addTen(count);
alert(count);	//20
alert(result);	//30

// 引用类型 按值传递参数
function setName(obj){
	obj.name = "Zoe";
}

var person = new Object();
setName(person);
alert(person.name);		//Zoe

// 修改函数 
function setName(obj){
	obj.name = "Zoe";
	obj = new Object();			//这个变量引用的是一个局部对象，该局部对象会在函数执行完毕后立即被销毁
	obj.name = "Tanager";
}

var person = new Object();
setName(person);
alert(person.name);		//Zoe

// 执行环境和作用域
// 每个执行环境都有一个与之关联的变量对象，环境中定义的所有变量和函数都保存在这个对象中
// 活动对象在最开始时只包含一个变量，即 arguments对象(这个对象在全局环境中是不存在的)
// 作用域链中得下一个变量对象来自包含（外部）环境，在下一个来自在下一个外部包含环境，直到全局环境
// 这样全局执行环境的变量对象始终都是作用域链中得最后一个对象
var color = "blue";
function changeColor(){
	var anotherColor = "red";

	function swapColors(){
		var tempColor = anotherColor;
		anotherColor = color;
		color = tempColor;

		// 这里可以访问color、anotherColor、tempColor
	}

	// 这里可以访问 color和 anotherColor,但不能访问 tempColor
	swapColors();
}

// 这里只能访问color
changeColor();

// 管理内存
// 解除引用——一旦数据不再有用，最好将其值设置为null用来释放其引用
// 解除一个值的引用并不意味着自动回收该值所占用的内存。解除引用的真正作用是让值脱离执行环境，以便垃圾收集器下次运行将其回收
function createPerson(name){
	var localPerson = new Object();
	localPerson.name = name;
	return localPerson;
}

var globalPerson = createPerson("Zoe");

// 手工解除globalPerson 的引用
globalPerson = null;
















