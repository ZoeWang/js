/**
 * 队列是一种先进先出（First-In-First-Out,FIFO）的数据结构
 * 一个用数组实现的队列
 */
function Queue () {
	this.dataStore = [];
	this.enqueue = enqueue;		//像队尾添加一个元素
	this.dequeue = dequeue;		//删除队首的元素
	this.front = front;			//读取队首的元素
	this.back = back;			//读取队尾的元素
	this.toString = toString;	//显示队列内的所有元素
	this.empty = empty;			//判断队列是否为空
}

function enqueue(element){
	this.dataStore.push(element);
}

function dequeue(){
	return this.dataStore.shift();
}

function front(){
	return this.dataStore[0];
}

function back(){
	return this.dataStore[this.dataStore.length-1];
}

function toString(){
	var retStr = "";
	for(var i=0; i<this.dataStore.length; ++i){
		retStr += this.dataStore[i] + "\n";
	}
	return retStr;
}

function empty(){
	if(this.dataStore.length == 0){
		return true;
	}else{
		return false;
	}
}

// 测试程序
var q = new Queue();
q.enqueue("Zoe");
q.enqueue("Zoe_ing");
q.enqueue("Zoe_wang");
console.log(q.toString());
q.dequeue()
console.log(q.toString());
console.log("Front of Queue: " + q.front());
console.log("Back of Queue: " + q.back());

// Zoe
// Zoe_ing
// Zoe_wang

// Zoe_ing
// Zoe_wang

// Front of Queue: Zoe_ing
// Back of Queue: Zoe_wang

/**
 * 模拟方块舞
 */
// 储存舞者信息
function Dancer(name,sex){
	this.name = name;
	this.sex = sex;
	this.count = count;
}

// 将舞者信息从文件中读到程序里来
function getDancers(males, females){
	var names = read("dancers.txt").split("\n");
	for(var i = 0; i < names.length; ++i){
		names[i] = names[i].trim();
	}
	for(var i =0; i<names.length; ++i){
		var dancer = names[i].split(" ");
		var sex = dancer[0];
		var name = dancer[1];
		if(sex == "F"){
			females.enqueue(new Dancer(name, sex));
		}else{
			males.enqueue(new Dancer(name, sex));
		}
	}
}

// 组成舞伴，宣布结果
function dance(males, females){
	console.log("The dance partners are: \n");
	while(!females.empty() && !males.empty()){
		person = females.dequeue();
		console.log("Female dancer is: " + person.name);
		person = males.dequeue();
		console.log(" and the male dancer is: " + person.name);
	}
	print();
}

// 测试程序
var maleDancers = new Queue();
var femaleDancers = new Queue();
getDancers(maleDancers, femaleDancers);
dance(maleDancers,femaleDancers);

if(!femaleDancers.empty()){
	console.log(femaleDancers.front().name + " is waiting to dance.");
}
if(!maleDancers.empty()){
	console.log(maleDancers.front().name + " is waiting to dance.");
}

// 显示排队等候的男女数量
function count(){
	return this.dataStore.length;
}


























