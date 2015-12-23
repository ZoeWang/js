// function add(num1,num2){
// 	return num1+num2;
// }
// function totalAdd(num3){
// 	return num3+add(1,2);
// }
// alert(totalAdd(50));

function curry(fn){
	var args = Array.prototype.slice.call(arguments,1);
	return function(){
		var innerArgs = Array.prototype.slice.call(arguments);
		var finalArgs = args.concat(innerArgs);
		console.log(finalArgs);
		return fn.apply(this,finalArgs);
	}
}

function add(num1,num2,num3){
	return num1+num2+num3;
}

var t = curry(add,50)(1,2);
alert(t);