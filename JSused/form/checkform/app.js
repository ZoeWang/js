/**
 * form 返回
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

/**
 * 用正则表达式将前后空格 
 * 用空字符串替代。 
 */
String.prototype.trim= function(){   
    return this.replace(/(^\s*)|(\s*$)/g, "");  
}

/**
 * 占位符
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
 * form 表单验证
 * 调用
 */
var authRegExp = {
	integer: "^[1-9]\\d*$", //正整数
    username: "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$", //用户名（包括汉字）
    realname: "^[A-Za-z\\u4e00-\\u9fa5]+$", // 真实姓名
    email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
    mobile: "^((13[0-9])|(15[^4,\\D])|(18[0-9]))\\d{8}$", //手机
    tel: "^[0-9\-()（）]{7,18}$", //电话号码的函数(包括验证国内区号,国际区号,分机号)
};

var authRules = {
	isUserName: function(str){//用户名
		return new RegExp(authRegExp.username).test(str);
	},
	isRealName: function(str){
		return new RegExp(authRegExp.realname).test(str);
	},
	isEmail: function(str){//邮箱
		return new RegExp(authRegExp.email).test(str);
	},
	isMobile: function(str){
		return new RegExp(authRegExp.mobile).test(str);
	},
	isTel: function(str){
		return new RegExp(authRegExp.tel).test(str);
	},
	isInteger: function(str){//正整数
		return new RegExp(authRegExp.floatmoney).test(str);
	},
}

var errMsg = {
	'errTpl': {
		'noText': '请输入{0}',
		'isNumber': '请输入数字',
		'okText': '请输入正确的{0}',
		'numbers': '请输入{0}-{1}位{2}',
		'select': '请选择{0}',
	},
	'errTxt': {
		'most':'{0}最多为{1}',
		'least':'{0}最少为{1}',
		'max': '{0}输入的最大值为{1}',
		'min': '{0}输入的最小值为{1}',
		'equal': '{0}与{1}不一致',
		'reg': '恭喜您，该{0}可以用',
		'exist':'该{0}已存在',
		'noExist':'该{0}不存在',
	}
}

function checkEle(options){
	this.obj = options.obj;
	this.id = options.id;
	this.name = options.name;
	this.cn_name = options.cn_name;   //名称
	this.minLen = options.minLen;
	this.maxLen = options.maxLen;
	this.eqval = options.eqval;   //相等
	this.url = options.url;
	this.ajax = options.ajax;
	
	//是否为空
	this.isNull = function(){return (this.obj.val().trim())!=""};    
	//下拉菜单是否选择
	this.isSelect = function(){return this.obj.children('option:selected').val() != 0};
	//二次输入是否相等
	this.isEqual = function(){return this.obj.val().trim() == this.eqval;};
	//是否有效   符合正则要求
	this.isValid = function(){
		if(this.id == 'username'){
		   return authRules.isUserName(this.obj.val().trim())
		};
		if(this.id == 'realname'){
			return authRules.isRealName(this.obj.val().trim())
		};
		if(this.id == 'mobile'){
			return authRules.isMobile(this.obj.val().trim());
		};
		if(this.id == 'num'){
			return authRules.isInteger(this.obj.val().trim());
		};
		if(this.id == 'email'){
			return authRules.isEmail(this.obj.val().trim());
		};
		if(this.id == 'telEmail'){	//用户名，手机号，邮箱都可
			if (authRules.isEmail(this.obj.val().trim()) === true || authRules.isMobile(this.obj.val().trim()) === true) {
				return true;
			}else{
				return false;
			};
			
		}
		
		return true;
	};
	
	//进行长度验证
	this.isLength = function(){var len = this.obj.val().trim().length;	if(this.minLen>len || this.maxLen<len){return false;}return true;};
	//是否已存在
	this.isUsed = function(){var data = new Array();data['url'] = this.url;	data['val'] = this.obj.val().trim();this.sendPhp(data);};
	//进行ajax验证
	this.sendPhp = function(arr){
		$.post(arr['url'],{name:this.name,val:arr['val']},function(data){
			if(data == '3'){
				showMsg(errMsg.errTxt.reg.stringFormat(cn_name));
			}
			if(data == '2'){
				showMsg(errMsg.errTxt.exist.stringFormat(cn_name));
			}
			if(data == '1'){
				showMsg(errMsg.errTxt.noExist.stringFormat(cn_name));
			}
		},'json')
	};	
	
	
	
	//弹出提示消息
	
	this.showMsg = function(msg){
		alert(msg);
	};
	if(this.isNull() == false){
		this.showMsg(errMsg.errTpl.noText.stringFormat(cn_name));
		return false;
	};
	if(this.isSelect()== false){
		this.showMsg(errMsg.errTpl.select.stringFormat(this.cn_name));
		return false;
	};
	if(this.eqval != undefined){
		if(this.isEqual() == false){
			this.showMsg(errMsg.errTxt.equal.stringFormat(this.cn_name,'密码'));
			return false;
		}
	};
	if(this.maxLen !=undefined){
		if(this.isLength() == false){
			this.showMsg(errMsg.errTpl.numbers.stringFormat(minLen,maxLen,cn_name));
			return false;
		}
	};
	if(this.isValid() == false ){
		this.showMsg(errMsg.errTpl.okText.stringFormat(cn_name));
		return false;
	}
	if(this.ajax == true){
		this.isUsed()
	}
	return true;
}






