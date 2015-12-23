// 你要统计下当前所有函数谁耗时最长
Function.prototype.before = function(fn){
	var __self = this;
	return function(){
		if(fn.apply(this,arguments) == false){
			return false;
		}
		return __self.apply(__self,arguments);
	}
	
};
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
	// return false;
})();