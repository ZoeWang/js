// 背包问题：递归解决方案
function max(a,b){
	return (a<b) ? a : b;
}

function knapsack(capacity, size, value, n){
	if(n==0 || capacity == 0) {
		return 0;
	}
	if(size[n - 1] > capacity) {
		return knapsack(capacity, size, value, n - 1);
	} else {
		return max(value[n - 1] + knapsack(capacity - size[n-1], size, value, n-1), knapsack(capacity, size, value, n-1));
	}
}

var value = [4,5,10,11,13];
var size = [3,4,7,8,9];
var capacity = 16;
var n = 5;

console.log(knapsack(capacity, size, value, n));   //23



// 动态规划解决背包问题

function dKnapsack(capacity, size, value, n){
	var K = [];
	for(var i=0; i<=capacity + 1; i++){
		k[i] = [];
	}
	for(var i = 0; i<=n; i++){
		for(var w=0; w <= capacity; w++) {
			if(i == 0 || w == 0) {
				k[i][w] = 0;
			}
			else if(size[i-1] <= w){
				k[i][w] = max(value[i-1] + k[i-1][w-size[i-1]], k[i-1][w]);
			}
			else {
				k[i][w] = k[i-1][w];
			}
			putstr(k[i][w] + " ");
		}
		print();
	}

	return k[n][capacity];
}

var value = [4,5,10,11,13];
var size = [3,4,7,8,9];
var capacity = 16;
var n = 5;

console.log(knapsack(capacity, size, value, n));   //23


// 贪心算法 背包问题
function ksack(values, weights, capacity) {
	var load = 0;
	var i = 0;
	var w = 0;
	while (load < capacity && i < 4) {
		if(weights[i] <= (capacity-load)) {
			w += values[i];
			load += weights[i];
		}
		else {
			var r = (capacity-load)/weights[i];
			w += r*values[i];
			load += weights[i];
		}
	++i;
	}
	return w;
}

var item = ["A", "B", "C", "D"];   //物品
var values = [50, 140, 60, 60];     //价格
var weights = [5, 20, 10, 12];      // 尺寸
var capacity=30;
console.log(ksack(values, weights, capacity));  //220

