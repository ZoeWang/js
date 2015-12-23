// 字典
function Dictionary() {
	this.add = add;
	this.datastore = new Array();
	this.find = find;
	this.remove = remove;
	this.showAll = showAll;
	this.count = count;
	this.clear = clear;
}

function add(key, value) {
	this.datastore[key] = value;
}

function find(key){
	return this.datastore[key];
}

function remove(key){
	delete this.datastore[key];
}

function showAll() {
	for (var key in Object.keys(this.datastore)){
		print(key + " -> " + this.datastore[key]);
	}
}

function count(){
	var n = 0;
	for each (var key in Object.keys(this.datastore)) {
		++n;
	}
	return n;
}

function clear() {
	Object.keys(this.datastore).forEach(function(key) {
		delete this.datastore[key];
	},this);
}

// 添加排序功能
function showAll() {
	for(var key in Object.keys(this.datastore).sort()){
		print(key + " -> " + this.datastore[key]);
	}
}