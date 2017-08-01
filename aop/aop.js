// 你要统计下当前所有函数谁耗时最长
/**
 * [before description]
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
*/
Function.prototype.before = function(fn){
	var __self = this;
	return function(){
		if(fn.apply(this,arguments) == false){
			return false;
		}
		return __self.apply(__self,arguments);
	}
	
};

/**
 * [after description]
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
Function.prototype.after = function(fn){
	// after 先执行本身this 在执行回调
	var __self = this;
	return function(){
		var result = __self.apply(__self,arguments);
		if(result == false){
			return false;
		}
		fn.apply(this,arguments);
		return result;
	}
	
};


/**
 * [test description]
 * @return {[type]} [description]
 */
function test(){
	alert(2);
	return "me";
}

// 默认函数执行2遍 test作为中转
// before 回调和before一起送到after去
// after after 和test 一起 送到before 去
// 挂载 self=>test 执行before回调 执行self after 自己执行回调
test.after(function(){
	alert(3);
}).before(function(){
	alert(1);
	return false;
})();



/**
 * 面向切面编程
 * Aop 又叫面向切面编程，其中“通知”是切面的具体实现，分为before（前置通知）、after（后置通知）、around（环绕通知）。
 *
 * js 要实现环绕通知，最简单也最应被想到的就是利用callback（回调）
 *  


function around(obj, prop, advice){
 var exist = obj[prop];
 var previous = function(){
  return exist.apply(obj, arguments);
 };
 var advised = advice(previous);
 obj[prop] = function(){
   //当调用remove后，advised为空
    //利用闭包的作用域链中可以访问到advised跟previous变量，根据advised是否为空可以来决定调用谁
  return advised ? advised.apply(obj, arguments) : previous.apply(obj, arguments);
 };
 
 return {
  remove: function(){
    //利用闭包的作用域链，在remove时将advised置空，这样执行过程中不会进入本次around
   //这几个不能删
   //obj[prop] = exist;
   advised = null;
   advice = null;
   //previous = null;
   //exist = null;
   //obj = null;
  }
 }
}
var count = 1;
advice = function(originalFunc){
 var current = count++;
 return function() {
  console.log("before function " + current);
  originalFunc.apply(this, arguments);
  console.log("after function " + current);
 }
}
var obj = {
 foo: function(arg){
  console.log(this.name + " and " + arg);
 },
 name: "obj"
}

h1 = around(obj, 'foo', advice);
h2 = around(obj, 'foo', advice);
obj.foo('hello world');
h1.remove();
obj.foo('hello world');
h2.remove();
obj.foo('hello world');

// 输出
// before function 2
// before function 1
// obj and hello world
// after function 1
// after function 2
// before function 2
// obj and hello world
// after function 2
// obj and hello world

 */

/**
 * 面向切面编程相关技术要点回顾
 */
// function employee(name,job,born){
// 	this.name = name;
// 	this.job = job;
// 	this.born = born;
// }

// var wang = new employee('Zoe','Web','1989');
// employee.prototype.age = null;
// wang.age = 27;

// // alert(wang.age);


// function Person(name,age){   //定义一个类，人类  
//     this.name=name;     //名字
//     this.age=age;       //年龄
//     this.sayhello=function(){alert(this.name)};
// }
// function Print(){            //显示类的属性
//     this.funcName="Print";
//     this.show=function(){
//         var msg=[];
//         for(var key in this){
//             if(typeof(this[key])!="function"){
//                 msg.push([key,":",this[key]].join(""));
//             }
//         }
//         alert(msg.join(" "));
//     };
// } 
// function Student(name,age,grade,school){    //学生类 
//     Person.apply(this,arguments);
//     Print.apply(this,arguments);
//     this.grade=grade;                //年级 
//     this.school=school;                 //学校 
// } 
// var p1=new Person("jake",10);
// p1.sayhello();
// var s1=new Student("tom",13,6,"清华小学");
// s1.show();
// s1.sayhello();
// alert(s1.funcName);





