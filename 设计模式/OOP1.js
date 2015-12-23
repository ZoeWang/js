
(function(){
	var n="ime";	// 外部不可直接访问，内部可直接访问
	function People(name){
		this._name = name;
	}
	People.prototype.say = function() {
		alert("peo-hello"+this._name+n);
	};
	window.People = People; //将此函数赋给 window 这样外部就以调用
}());	// 包裹起来自执行 这样外部不可直接访问内部参数

// 实现继承
(function(){
	function Student(name){
		this._name = name;
	}
	Student.prototype = new People();	// 继承People
	//alert("stu-hello"+this._name);	// 调用 父类 people 的方法
	var superSsay = Student.prototype.say;
	Student.prototype.say = function(){		// 从写say 方法

		alert("stu-hello"+this._name);	
		superSsay.call(this);	// 调用 父类 people 的say方法
	}
	window.Student = Student;
}());

var s = new Student("iwen");
s.say();