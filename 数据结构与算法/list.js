// 列表——抽象数据类型定义
// listSize(属性) —— 列表的元素个数
// pos(属性) —— 列表的当前位置
// length(属性) —— 返回列表中元素个数
// clear(方法) —— 清空列表中得所有元素
// toString(方法) —— 返回列表的字符串形式
// getElement(方法) —— 返回当前位置的元素
// insert(方法) —— 在现有元素后插入新元素
// append(方法) —— 在列表末尾添加元素
// remove(方法) —— 从列表中删除元素
// front(方法) —— 将列表的当前位置设移动到第一个元素
// end(方法) —— 将列表的当前位置设移动到最后一个元素
// prev(方法) —— 将当前位置后移一位
// next(方法) —— 将当前位置前移一位
// hasNext(方法) —— 判断后一位
// hasPrev(方法) —— 判断前一位
// currPos(方法) —— 返回列表的当前位置
// moveTo(方法) —— 将当前位置移动到指定位置

function List(){
	this.listSize = 0;
	this.pos = 0;
	this.dataStore = [];	//初始化一个空数组来保存列表元素
	this.clear = clear;
	this.find = find;
	this.toString = toString;
	this.insert = insert;
	this.append = append;
	this.remove = remove;
	this.front = front;
	this.end = end;
	this.prev = prev;
	this.next = next;
	this.hasPrev;
	this.hasNext;
	this.length = length;
	this.currPos = currPos;
	this.moveTo = moveTo;
	this.getElement = getElement;
	this.contains = contains;
}
// append 给列表添加元素
function append(element){
	this.dataStore[this.listSize++] = element;
}

// find 在列表中查找某一元素
function find(element){
	for(var i=0; i<this.dataStore.length; ++i){
		if(this.dataStore[i] == element){
			return i;
		}
	}
	return -1;
}

// remove 从列表中删除元素
function remove(element){
	var foundAt = this.find(element);
	if(foundAt > -1){
		this.dataStore.splice(foundAt,1);
		--this.listSize;
		return true;
	}
	return false;
}

// length 列表中有多少元素
function length(){
	return this.listSize;
}

// toString 显示列表里的元素
function toString(){
	return this.dataStore;
}

// insert 向列表中插入一个元素
function insert(element, after){
	var insertPos = this.find(after);
	if(insertPos > -1){
		this.dataStore.splice(insertPos+1, 0, element);
		++this.listSize;
		return true;
	}
	return false;
}

// clear 清空列表中得所有元素
function clear(){
	delete this.dataStore;
	this.dataStore.length = 0;
	this.listSize = this.pos = 0;
}

// contains 判断给定值是否在列表中
function contains(element){
	for(var i=0; i<this.dataStore.length; ++i){
		if(this.dataStore[i] == element){
			return true;
		}
	}
	return false;
}

// 遍历列表
function front(){
	this.pos = 0;
}

function end(){
	this.pos = this.listSize-1;
}

function prev(){
	--this.pos;
}

function next(){
	if(this.pos < this.listSize){
		++this.pos;
	}
}

function currPos(){
	return this.pos;
}

function moveTo(positoin){
	this.pos = positoin;
}

function getElement(){
	return this.dataStore[this.pos];
}

function hasNext(){
	return this.pos < this.listnaSize;
}

function hasPrev(){
	return this.pos >= 0;
}

var names = new List();
names.append("a");
names.append("b");
names.append("c");
names.append("d");
names.append("e");
names.append("f");

names.front();
print(names.getElement()); //a


// 使用迭代器访问列表
for(names.front(); names.hasNext(); names.next()){
	print(names.getElement());
}

// 从后向前遍历
for(names.end(); names.hasPrev(); names.prev()){
	print(names.getElement());
}


// 读取文本文件
var movies = read(list.txt).split("\n");

function createArr(file){
	var arr = read(file).split("\n");
	for(var i=0; i<arr.length; ++i){
		arr[i] = arr[i].trim();
	}
	return arr;
}
// 使用列表管理影碟文件
var movieList = new List();
for(var i=0; i<movies.length; ++i){
	movieList.append(movies[i]);
}

// 显示影碟文件
function displayList(list){
	for(list.front(); list.currPos()<list.length(); list.next()){
		print(list.getElement());
	}
}

function displayList(list){
	for(list.front(); list.currPos()<list.length(); list.next()){
		if(list.getElement() instanceof Customer) {
			print(list.getElement()["name"]+"," + list.getElement()["movie"]);
		}else{
			print(list.getElement());
		}
	}
}

// 租影碟的客户
var customers = new List();

function Customer(name, movie){
	this.name = name;
	this.movie = movie;
}

function checkOut(name, movie, movieList, customerList){
	if(movieList.contains(movie)){
		var c = new Customer(name, movie);
		customerList.append(c);
		movieList.remove(movie);
	}else{
		print(movie+"is not available.");
	}
}

// 测试checkout函数
var movies = createArr("list.txt");
var movieList = new List();
var customers = new List();
for(var i=0; i<movies.length; ++i){
	movieList.append(movies[i]);
}
print("Available movies: \n");
displayList(movieList);
checkOut("zoe", "盗墓笔记", movieList, customers);
print("\nCustomer Rentals: \n");
displayList(customers);

// 给程序加标题，更易读
var movies = createArr("list.txt");
var movieList = new List();
var customers = new List();
for(var i=0; i<movies.length; ++i){
	movieList.append(movies[i]);
}
print("Available movies: \n");
displayList(movieList);
putstr("\nEnter your name: ");
var name = readline();
putstr("What movie would you like?");
var movie = readline();
checkOut(name, movie, movieList, customers);
print("\nCustomer Rentals: \n");
displayList(customers);
print("\nMovies Now Available\n");
displayList(movieList);































