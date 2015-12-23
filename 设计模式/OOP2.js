(function(){
	var n = "ime";	//内部 声明
	function Person (name) {
		var _this = {}
		_this._name = name;
		_this.sayHello = function(){
			alert("PHello"+_this._name+n);
		}
		return _this;
	}
	window.Person = Person;		// 封装的函数要给到window 否则外部没法调用
}());	// 封装


function Teacher(name){
	var _this = Person(name);
	var surperSay = _this.sayHello;
	_this.sayHello = function(){	//复写
		surperSay.call(_this);	// 调用父方法
		alert("Thello"+_this._name);
	}
	return _this;
}
var t=Teacher("zoe");
t.sayHello();