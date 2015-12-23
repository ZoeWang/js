// javascript 中都是按值传递参数，没有按引用传递的参数，
// 但是有保存引用的对象，如数组
// 例子：按值传递，第一个值是保存引用的对象——按引用传递
function curve(arr, amount){
	for(var i=0; i<arr.length; ++i){
		arr[i] += amount; 
	}
}

var grades = [77, 73 74, 81, 90];
curve(grades, 5);
print(grades);	//82,78,79,86,95

// 定义二维数组的
Array.matrix = function(numrows, numcols, initial){
	var arr = [];
	for(var i=0l i<numrows; ++i) {
		var colnums = [];
		for(var j=0; i<numcols; ++j){
			colnums[j] = initial;
		}
	arr[i] = colnums; 
	}
	return arr;
}

var nums = Array.matrix(5,5,0);
print(nums[1][1]); //0

var names = Array.matrix(3,3,"");
names[1][2] = "Zoe";
print(names[1][2]);		//Zoe

// 参差不齐的数组
var grades = [[89,77],[76, 82, 81],[91,94,89,99]];
var total = 0;
var average = 0.0;
for(var row = 0; row < grades.length; ++row){
	for(var col = 0; col < grades[row].length; ++col){
		total += grades[row][col];
	}
	average = total / grades[row].length;
	print("Student " + parseInt(row+1) + " average " + average.toFixed(2));
	total = 0;
	average = 0.0;
}
// 输出
// Student 1 average: 83.00
// Student 2 average: 79.67
// Student 3 average: 93.25

// 对象数组
function Point(x,y){
	this.x = x;
	this.y = y;
}

function displayPts(arr){
	for(var i=0; i<arr.length; ++i){
		print(arr[i].x + ", " + arr[i].y);
	}
}

var p1 = new Point(1,2);
var p2 = new Point(3,5);
var p3 = new Point(2,8);
var p4 = new Point(4,4);

var points = [p1,p2,p3,p4];
for(var i=0; i<points.length; ++ i){
	print("Point " + parseInt(i+1) + ": " + points[i].x + ", " + points[i].y);
}
var p5 = new Point(12,-3);
points.push(p5);
print("After push: ");
displayPts(points);
points.shift();
print("After shift: ");
displayPts(points);

// 输出
// Point 1: 1,2
// Point 2: 3,5
// Point 3: 2,8
// Point 4: 4,4
// After push:
// 1,2
// 3,5
// 2,8
// 4,4
// 12,-3
// After shift:
// 3,5
// 2,8
// 4,4
// 12,-3


// 对象中的数组
function weekTemps(){
	this.dataStore = [];
	this.add = add;
	this.average = average;
}

function add(temp){
	this.dataStore.push(temp);
}

function average(){
	var total = 0;
	for(var i=0; i < this.dataStore.length; ++i){
		total += this.dataStore[i];
	}
	return total / this.dataStore.length;
}

var thisweek = new weekTemps();
thisweek.add(52);
thisweek.add(50);
thisweek.add(40);
print(thisweek.average());		//47.333336




























