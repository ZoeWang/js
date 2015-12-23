/*!
 * tool
 * Version: 1.0.0
 * Create: wxf
 * Date: 2015-01-21 
 */
/****************prototype**********************/
 /**
 * 用正则表达式将前后空格 
 * 用空字符串替代。
 * this.obj.val().trim(); 
 */
String.prototype.trim= function(){   
    return this.replace(/(^\s*)|(\s*$)/g, "");  
}

//如果不存在ES5的String.trim()方法的话，就定义它
//这个方法用以去除字符串开头和结尾的空格
String.prototype.trim = String.prototype.trim || function() {
    if(!this) return this;                      //空字符串不做处理
    return this.replace(/^\s+|\s+$/g, "");      //使用正则表达式进行空格替换 
};

/**
 * 占位符
 *  用法
 *  var errMsg = {
		'errTpl': {
			'numbers': '请输入{0}-{1}位{2}',
		}
	}
	errMsg.errTpl.numbers.stringFormat(6,18,密码);
 */
String.prototype.stringFormat = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i])
    };
    return formatted
};

/**
 * 页面 返回
 */
function goBack()
{
    var ref=document.referrer;
    if (ref){
        history.go(-1);
    }else{
        redirect('index.html');
    }
}

/**
 * 网址重定向
 */
function redirect(url)
{
    window.location.href=url;
}

/**
 * Js 获取id
 */
function $id(o){
    return document.getElementById(o) || o;
}