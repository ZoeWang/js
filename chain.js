// 级联函数，链式调用
function classMan () {
	this.face = "";
	this.mouth = "";
	this.leg = "";
}

classMan.prototype={
	setFace: function(){
		this.face = "红扑扑";
		return this;	// 返回this 当前类对象
	},
	setMouth:function(){
		this.mouth = "大嘴";
		return this;
	},
	setLeg:function(){
		this.leg = "大长腿";
	}
};
var person = new classMan();
person.setFace().setMouth().setLeg();
console.log(person);