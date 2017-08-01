// js片段
var i=1;(function () {console.log('前端组发来第%d次贺电',i++);arguments.callee()})()

var read = {
     getBase64: function (file, callback) {  
        var reader = new FileReader();  
        reader.onload = function (event) {  
            var src = event.target.result;  
            if(callback) {  
                callback(src);  
            }  
        };  
        reader.readAsDataURL(file);  
    }
}



// 调用对比
var sign = {
    login:function(){
           new sign.reg().aa();
     },
    reg:function(){
        this.aa = function(){
            alert('aa');
         }
     }
 }
 sign.login();   //构造函数调用

 var sign = {
    login:function(){
          sign.reg().a();
     },
    reg:function(){
        var aa = function(){
            alert('aa');
         }
        return {a: aa};
     }
 }

 sign.login();  //执行一个函数返回一个对象。