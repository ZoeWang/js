//去重
// 先做一个数组  
var str = "1@1@2@3@3@4@4@5@";  
var ary = str.split("@");  
  
// 去重的算法  
var json = {};  
for (var i = 0; i < ary.length; i++) {  
    json["a"+ary[i]] = ary[i];  
}  
  
// 查看结果  
var str2 = "";  
for (var key in json) {  
    str2 += json[key];  
}  
alert(str2);  

//动态在json插入数据
var json = {}; // 如果json已经定义就跳过
json[text] = value;	//text 可为变量
json.text2 = value2;  // 此时text2必须符合变量名标准，否则得使用数组方式赋值





