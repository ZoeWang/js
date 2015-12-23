// 栈——特殊的列表，栈内的元素只能通过列表的一端访问，栈顶
// 后入先出（LIFO，last-in-first-out）的数据结构
// js 提共的操作栈的方法
// 入栈-push  出栈-pop 会移除掉栈中数据  peek-查看栈顶元素 clear清除栈内所有元素 length-栈内元素总量查找 empty 查找是否还存在元素

function Stack(){
	this.dataStore = [];
	this.top = 0;
	this.push = push;
	this.pop = pop;
	this.peek = peek;
	this.clear = clear;
	this.length = length; 
}
function push(element){
	this.dataStore[this.top++] = element;
}
function peek(){
	return this.dataStore[this.top-1];
}
function pop(){
	return this.dataStore[--this.top];
}
function clear(){
	this.top = 0;
}
function length(){
	return this.top;
}

// 测试Stack 类的实现
var s = new Stack();
s.push("zoe");
s.push("zoe_ing");
s.push("zoe_wang");
print("length: "+ s.length());
print(s.peek());
var popped = s.pop();
print("The popped element is: " + popped);
print(s.peek());
s.clear();
print("length: " + s.length());
print(s.peek());
s.push("wxf");
print(s.peek());

// 执行结果
// length: 3
// zoe_wang
// The popped element is: zoe_wang
// zoe_ing
// length: 0
// undefined   清空栈，返回栈顶元素没有 undefined
// wxf

// 数制间的相互转换---此算法只针对基数为2-9的情况
// 采用除数取余法 十进制 2456转 八进制
// 2456/8 = 307,余 0;
// 307/8 = 38,余 3;
// 38/8 = 4,余 6;
// 4/8 = 0,余4.
// 将所有余数倒序相连，得到结果：4630  十进制2456转换为八进制 为 4630
function mulBase(num, base){
	var s = new Stack();
	do {
		s.push(num % base);
		num = Math.floor(num /= base);
	}while(num>0);
	var converted = "";
	while(s.length()>0){
		converted += s.pop();
	}
	return converted;
}

var num = 32;
var base = 2;
var newNum = mulBase(num,base);
print(num + " converted to base " + base + " is " + newNum);
num = 125;
base = 8;
var newNum = mulBase(num, base);
print(num + " converted to base " + base + " is " + newNum);

// 32 converted to base 2 is 100000
// 125 converted to base 8 is 175

// 回文 dad 1001 racecar
function isPalindrome(word){
	var s = new Stack();
	for(var i=0; i<word.length; ++i){
		s.push(word[i]);
	}
	var rword = "";
	while (s.length() > 0){
		rword += s.pop();
	}
	if(word == rword) {
		return true;
	}else{
		return false;
	}
}

isPalindrome("hello");		//false
isPalindrome("racecar");	//true

// 递归
function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1); //此处更改了。 
    }
}
var anotherFact = factorial;
factorial = null;
alert(antherFact(5)); //结果为120.

// 使用栈模拟递归过程
function fact(n){
	var s = new Stack();
	while (n>1){
		// [5,4,3,2]
		s.push(n--);
	}
	var product = 1;
	while(s.length() > 0){
		product *= s.pop();
	}
	return product;
}

print(fact(5));  // 120





























































