/*!
 * Date Set Account
 * Version: 1.0.0
 * Create: By Wang Xiu Fang
 * Date: 02-01-2014 11:07:48 (GMT Time)
 */
var authRegExp = {
    integer: "^-?[1-9]\\d*$", //整数
    integer1: "^[1-9]\\d*$", //正整数
    floatmoney: "^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$",//金钱的验证
    integer2: "^-[1-9]\\d*$", //负整数
    number: "^([+-]?)\\d*\\.?\\d+$", //数字
    number1: "^[1-9]\\d*|0$", //正数（正整数 + 0）
    number2: "^-[1-9]\\d*|0$", //负数（负整数 + 0）
    decimal: "^([+-]?)\\d*\\.\\d+$", //浮点数
    decimal1: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$", //正浮点数
    decimal2: "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$", //负浮点数
    decimal3: "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$", //浮点数
    decimal4: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$", //非负浮点数（正浮点数 + 0）
    decimal5: "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$", //非正浮点数（负浮点数 + 0）
    ascii: "^[\\x00-\\xFF]+$", //仅ACSII字符
    chinese: "^[\\u4e00-\\u9fa5]+$", //仅中文
    color: "^[a-fA-F0-9]{6}$", //颜色
    date: "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$", //日期
    email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
   	idcard: "^[1-9]([xX0-9]{14}|[xX0-9]{17})$",   //身份证
    ip4: "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$", //ip地址
    letter: "^[A-Za-z]+$", //字母
    letterL: "^[a-z]+$", //小写字母
    letterU: "^[A-Z]+$", //大写字母
    mobile: "^((13[0-9])|(15[^4,\\D])|(18[0-9]))\\d{8}$", //手机
    password: "^.*[A-Za-z0-9\\w_-]+.*$", //密码
    fullNumber: "^[0-9]+$", //数字
    picture: "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$", //图片
    qq: "^[1-9]*[1-9][0-9]*$", //QQ号码
    rar: "(.*)\\.(rar|zip|7zip|tgz)$", //压缩文件
    tel: "^[0-9\-()（）]{7,18}$", //电话号码的函数(包括验证国内区号,国际区号,分机号)
    url: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$", //url
    username: "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$", //用户名（包括汉字）
    username1:"^[a-zA-Z]+[a-zA-Z0-9_]*$",	//用户名请用字母a～z,A～Z、数字0～9、减号或下划线组成，长度为4～18位，只能以字母或数字开头
    realname: "^[A-Za-z\\u4e00-\\u9fa5]+$", // 真实姓名
    zipcode: "^\\d{6}$", //邮编
    notempty: "^\\S+$", //非空
    passport: "/(P\d{7})|(G\d{8})/"	//护照
};

var authRules = {
	isCard: function(str){//身份证
		return new RegExp(authRegExp.idcard).test(str);
	},
	isPassport: function(str){	//护照
		//return new RegExp(authRegExp.passport).test(str);
		var auth = /(P\d{7})|(G\d{8})/;
		return auth.test(str);
	},
	isUserName: function(str){//用户名
		return new RegExp(authRegExp.username1).test(str);
	},
	isRealName: function(str){
		return new RegExp(authRegExp.realname).test(str);
	},
	isEmail: function(str){//邮箱
		return new RegExp(authRegExp.email).test(str);
	},
	isMobile: function(str){
		return new RegExp(authRegExp.mobile).test(str);;
	},
	isTel: function(str){
		return new RegExp(authRegExp.tel).test(str);
	},
	isText: function(str){//不能有非法字符
		var auth = /<\/[^>]*>/;
		return auth.test(str);
	},
	isPwd: function(str){
		return new RegExp(authRegExp.password).test(str);
	},
	isDecimal: function(str){//大于等于零，小于等于99999999.99 的数字
		var auth = /^[0-9]+(.[0-9]{1,3})?$/;
		return auth.test(str);
	},
	isPercent: function(str){//两位小数的百分数
		var auth = /^[0-9]+(.[0-9]{1,3})?$/;
		return auth.test(str);
	},
	isInteger1: function(str){//正整数
		return new RegExp(authRegExp.floatmoney).test(str);
	},
	isDate: function(str){
		return new RegExp(authRegExp.date).test(str);
	},
	isBankCard: function(str){//银行账号	16位或19位
		//var auth = /^(\d{16}|\d{19})$/g;
		var auth = /^\d*$/g;//^[0-9]*$ 纯数字
		return auth.test(str);
	},
	isChinese: function(str){//中文仅
		return new RegExp(authRegExp.chinese).test(str);
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
	this.isNull = function(){return Trim(this.obj.val())!=""};    
	//下拉菜单是否选择
	this.isSelect = function(){return this.obj.children('option:selected').val() != 0};
	//二次输入是否相等
	this.isEqual = function(){return this.obj.val() == this.eqval;};
	//是否有效   符合正则要求
	this.isValid = function(){
		if(this.id == 'username'){
		   return authRules.isUserName(this.obj.val())
		};
		if(this.id == 'realname'){
			return authRules.isRealName(this.obj.val())
		};
		if(this.id == 'pwd'){
			return authRules.isPwd(this.obj.val());
		};
		if(this.id == 'mobile'){
			return authRules.isMobile(this.obj.val());
		};
		if(this.id == 'email'){
			return authRules.isEmail(this.obj.val());
		};
		
		//realname 
		if(this.id == 'idcard'){
			return authRules.isCard(this.obj.val());
		}
		
		//topup
		if(this.id == 'amount'){
			return authRules.isInteger1(this.obj.val());
		}
		
		//实名认证弹出框
		if(this.id == 'authname'){
			return authRules.isRealName(this.obj.val());
		}
		if(this.id == 'authidcard'){
			return authRules.isCard(this.obj.val());
		}
		
		//绑定银行弹出框
		if(this.id == 'addbankcard'){
			return authRules.isBankCard(this.obj.val());
		}
		if(this.id == 'addbankcity' || this.id == 'openbank'){
			return authRules.isChinese(this.obj.val());
		}
		
		//设置交易密码
		if(this.id == 'tradepwd' || this.id == 'retradepwd'){
			return authRules.isPwd(this.obj.val());
		}
		if(this.id == 'safeanswer'){
			return authRules.isChinese(this.obj.val());
		}
		
		//护照
		if(this.id == 'passport'){
			return authRules.isPassport(this.obj.val());
		}
		return true;
	};
	

	
	//进行长度验证
	this.isLength = function(){var len = this.obj.val().length;	if(this.minLen>len || this.maxLen<len){return false;}return true;};
	//是否已存在
	this.isUsed = function(){var data = new Array();data['url'] = this.url;	data['val'] = this.obj.val();this.sendPhp(data);};
	//进行ajax验证
	this.sendPhp = function(arr){
		$.post(arr['url'],{name:this.name,val:arr['val']},function(data){
			if(data == '3'){
				//showMsg('恭喜您，该'+cn_name+'可以使用');
				$("#dui").after('<span class="right"><img src="/Public/theme/new/images/icon.jpg" style="width:25px;height:25px;"></span>');
			}
			if(data == '2'){
				showMsg('该'+cn_name+'已存在');
			}
			if(data == '1'){
				showMsg('该'+cn_name+'不存在');
			}
		},'json')
	};	
	
	
	
	//弹出提示消息
	this.showMsg = function(msg){
		this.obj.parents('li').css({'position':'relative'});
		$('<div class="warn_msg"><div class="tip">'+msg+'</div></div>').appendTo(this.obj.parents('li'))
	};
	if(this.isNull() == false){
		this.showMsg(this.cn_name+'不能为空');
		return false;
	};
	if(this.isSelect()== false){
		this.showMsg('请选择'+this.cn_name);
		return false;
	};
	if(this.eqval != undefined){
		if(this.isEqual() == false){
			this.showMsg(this.cn_name+'与密码不一致');
			return false;
		}
	};
	if(this.maxLen !=undefined){
		if(this.isLength() == false){
			this.showMsg('请输入'+this.minLen+'到'+this.maxLen+'位的'+this.cn_name);
			return false;
		}
	};
	if(this.isValid() == false ){
		this.showMsg(this.cn_name+'格式不正确');
		return false;
	}
	if(this.ajax == true){
		this.isUsed()
	}
	return true;
}

function getFocus(){
	$('input,select,textarea').focus(function(){
		$(this).parents('li').find('.warn_msg').remove();
		$(this).parents('li').find('.right').remove();
	});	
}
function getFocusLogin(){
	$('input').focus(function(){
		$(this).parents('ul').find('.warn_msg').remove();
	})
}
function checkTip(obj){
	obj.click(function(e){
		if($('.warn_msg').length != 0 ){
			e.preventDefault();	
		}
	})
}

function checkNotNull(btn){
	//var btn = $('#next');
	var authinput = $('.item_input');
	var authselect = $('.item_select');
	var authfile = $('.item_file');
	var authtext = $('.item_text');
	var flag1 = 0;
	var flag2 = 0;
	var flag3 = 0;
	var flag4 = 0;
	btn.click(function(e){
		
		//检查文本框是否填写
		authinput.each(function(){
			if("" == $(this).val())
			{	flag1 = 1;
				e.preventDefault();	
				$(this).parents('li').addClass('nullMsg');
				$(this).bind("focus",function(){
					$(this).parents('li').removeClass('nullMsg');
					flag1 = 0;
				});
			}
		});
		//检查下拉框是否选择
		authselect.each(function(){
			if("" == $(this).find('option:selected').val() || 0 == $(this).find('option:selected').val())
			{
				flag2 = 2;
				e.preventDefault();
				$(this).parents('li').addClass('nullMsg');
				$(this).bind("focus",function(){
					$(this).parents('li').removeClass('nullMsg');
					flag2 = 0;
				});
			}
		});
		//检查文件框是否选择
		authfile.each(function(){
			if($(this).val().length == 0)
			{	flag3 = 1;
				e.preventDefault();	
				$(this).parents('li').addClass('nullMsg');
				$(this).bind("focus",function(){
					$(this).parents('li').removeClass('nullMsg');
					flag3 = 0;
				});
			}
		})
		//检查textarea 是否为空
		authtext.each(function(){
			if($(this).val().length == 0)
			{	flag4 = 1;
				e.preventDefault();	
				$(this).parents('li').addClass('nullMsg');
				$(this).bind("focus",function(){
					$(this).parents('li').removeClass('nullMsg');
					flag4 = 0;
				});
			}
		})
		
		if(0 != flag1 || 0 != flag2 || 0 != flag3 || 0 != flag4){
			alert("请填写完整信息");
		}
	})
} 

//login 验证
//function checkLogin(){
//	//登陆用户 密码 名提示信息
//	var username = $('#username');
//	var pwd = $('#pwd');
//	var authcode = $('#authcode');
//	username.val('请输入用户名/手机号').css({'color':'#999'}).attr('autoComplete','off');
//	username.focus(function(){
//		if($(this).val()=="请输入用户名/手机号"){
//			$(this).val('');
//			$(this).css({color:'#333'});
//		}
//	}).blur(function(){
//		if($(this).val()==''){
//			$(this).val('请输入用户名/手机号');
//			$(this).css({color:'#999'});
//		};
//	});
//	
//	pwd.val('请输入密码').css({'color':'#999'}).attr('autoComplete','off');
//	pwd.focus(function(){
//		if($(this).val()=="请输入密码"){
//			$(this).val('');
//			$(this).css({color:'#333'});
//		}
//	}).blur(function(){
//		if($(this).val()==''){
//			$(this).val('请输入密码');
//			$(this).css({color:'#999'});
//		};
//	});
//	authcode.val('请输入验证码').css({'color':'#999'}).attr('autoComplete','off');
//	authcode.focus(function(){
//		if($(this).val()=="请输入验证码"){
//			$(this).val('');
//			$(this).css({color:'#333'});
//		}
//	}).blur(function(){
//		if($(this).val()==''){
//			$(this).val('请输入验证码');
//			$(this).css({color:'#999'});
//		};
//	});
//	
//	var btn = $(".loginbtn");
//	var authinput = $(".logininfor .item_input");
//	btn.click(function(event){
//		//event.preventDefault();
//		var n=0;//空值统计
//		authinput.each(function(index){
//			var val = $(this).val();
//			if(val == "请输入用户名/手机号" || val == "请输入密码" || val == "请输入验证码")
//			{
//				n++;
//				var msg;
//				if(0 == index)
//				{
//					msg = "请输入用户名/手机号";
//				}
//				else if(1 == index)
//				{
//					msg = "请输入密码";
//				}
//				else if(2 == index)
//				{
//					msg = "请输入验证码";
//				}
//				$(this).val(msg).css({color:'red'});
//				event.preventDefault();
//				return false;
//			}
//		});
//		if(0 == n)
//		{   //当不为空时  提交表单
//			//alert('1');
//			$('form').submit();
//		}
//
//	});
//}

function checkLoginForm(){
	$(".loginbtn").click(function(event){
		event.preventDefault();
		var n=0;//空值统计
		var authcode = $("#authcode");
		$(".logininfor .item_input").each(function(index){
			var $val = $(this).val();
			if("" ==$val)
			{
				n++;
				var msg;
				if(0 == index)
				{
					msg = "请输入用户名";
				}
				else if(1 == index)
				{
					msg = "请输入密码";
				}
				else if(2 == index)
				{
					msg = "请输入验证码";
				}
				$(this).parent().find('.warn_msg').remove();
				$('<div class="warn_msg"><div class="tip">'+msg+'</div></div>').appendTo($(this).parent());
				return false;
			}
		});
		if(0 == n)
		{
			//当不为空时  提交表单
			$.post("login.html",$("#loginform").serialize(),function(data){
				if(1 == data)
				{
					var user = $("#username");
					$('<div class="warn_msg"><div class="tip">用户名或密码错误</div></div>').appendTo(user.parent());
					fleshVerify();
					authcode.val('');
				}
				else if(2 == data)
				{
					$('<div class="warn_msg"><div class="tip">验证码错误</div></div>').appendTo(authcode.parent());
				}
				else
				{
					//location.reload();
					location.href = data;
				}
				
			},"json");
		}
	});
}



//获取手机验证码
function Phonereg(options){
	this.url = options.url;
	this.msgObj = options.msgObj;
	this.num = options.num;
	this.sendNum = function(){$.post(this.url,{type:'mobile',val:this.num})};
	this.sendNum();
}

//获取手机验证码 1分钟内只能点一次
function setTimer(time,obj){
	var cnt = $(obj).text();
	var n = time;
	$(obj).html('发送中');
	$(obj).attr("disabled","disabled");
	var timer = setInterval(function(){
		$(obj).html(n+'秒后可再次发送');
		n--;
		if(n<1){
			$(obj).html(cnt);
			$(obj).removeAttr("disabled");
			clearInterval(timer);
		}
	},1000);
}


function setTimer1(time,obj){
	var n = time;
	$(".yz_btn").hide();
	$(".yz_tip").html("");
	//$(".yz_tip").show();
	var timer = setInterval(function(){
		$(".yz_tip").html(n+'秒后重新获取');
		$(".yz_tip").show();
		n--;
		if(n<1){
			$(".yz_tip").hide();
			$(".yz_btn").show();			
			clearInterval(timer);
		}
	},1000);
}
//function pwdStrength(obj){//密码强度
//var a = -1;
//if(obj.match(/[a-z]/ig)){
//	a++;
//}
//if(obj.match(/[0-9]/ig)){
//	a++;
//}
//if(obj.match(/(.[^a-z0-9])/ig)){
//	a++;
//}
//if(obj.length<6 && a>0){
//	a--;
//}
//$('.passw').removeClass('passd');
//if (a > -1) {
//	$('#passw2_1').addClass('passd');
//}
//if (a > 0) {
//	$('#passw2_2').addClass('passd');
//}
//if (a > 1) {
//	$('#passw2_3').addClass('passd');
//}
//}

/**
* wxf 20140106
* js 去除空格
*/
function LTrim(str)
{
var i;
for(i=0;i<str.length;i++)
{
    if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break;
}
str=str.substring(i,str.length);
return str;
}
function RTrim(str)
{
var i;
for(i=str.length-1;i>=0;i--)
{
    if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break;
}
str=str.substring(0,i+1);
return str;
}
function Trim(str)
{
return LTrim(RTrim(str));
}


/*!
 * Create: By Wang Xiu Fang
 * Date: 07-01-2014 11:07:48 (GMT Time)
 * 查询日期验证
 */  
$(function(){
	queryDate($('.querydate'),"日期格式不正确，请填写 2014-01-01 这种格式");
})
function queryDate(obj,tip){
	var startime = $('#startime');
	var endtime = $('#endtime');
	//正确的日期格式
	obj.click(function(event){
		//event.preventDefault();
		if(authRules.isDate(startime.val()) && authRules.isDate(endtime.val())){ //true
			obj.submit();
		}else{ //false;
			dateTip($(this),tip);
			event.preventDefault();
		}
	});
}

function dateTip(_this,tip){
	$('<div class="datetip">'+tip+'</div>').appendTo(_this.parent());
	_this.parent().find('input').focus(function(){
		$(this).parent().find('.datetip').remove();
	})
}

/*
 * 2014-4-17
 * wxf
 * 注册用户名格式提示
 */
function userTip(){
	var username = $("#username");
	username.val('用户名由字母、数字及下划线组成').css({'color':'#999'});
	username.focus(function(){
		if($(this).val()=="用户名由字母、数字及下划线组成"){
			$(this).val('');
			$(this).css({color:'#333'});
		}
	}).blur(function(){
		if($(this).val()==''){
			$(this).val("用户名由字母、数字及下划线组成");
			$(this).css({color:'#999'});
		};
	});
	
}

function   abc(object1) 
{ 
    object1.disabled=true;        //变灰 
    __doPostBack(object1.name,"");     //执行服务器端button1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     的click事件  这里特别要注意是
//object1.name 而不能是 object1.id, 因为页面可能含有母版页
} 


// 调用checkEle
// $(function(){
	
// 	userTip();	//用户名格式提示
	
// 	$('#username').blur(function(){
// 		//alert('1');
// 		var options = {obj:$(this),id:'username',name:'user_name',cn_name:'用户名',minLen:2,maxLen:18,url:"checkreg",ajax:true};
// 		checkEle(options);
// 	})	
// 	$('#pwd').blur(function(){
// 		var options = {obj:$(this),cn_name:'密码',minLen:6,maxLen:16};
// 		checkEle(options);
// 	});
// 	$('#pwd2').blur(function(){
// 		var options = {obj:$(this),cn_name:"确认密码",eqval:$('#pwd').val()};
// 		checkEle(options);
// 	});
// 	$('#authcode').blur(function(){
// 		var options = {obj:$(this),cn_name:"验证码"};
// 		checkEle(options);
// 	});
// 	$('#regsub1').click(function(event){
// 		 if($('.warn_msg').length != 0 ){
// 			 event.preventDefault();	
// 			}
// 	}) 
// 	getFocus();
// 	checkNotNull($('#regsub1'));
// })

//绑定监听事件
function addEventHandler(target,type,func){  
    if(target.addEventListener){  
        //监听IE9，谷歌和火狐  
        target.addEventListener(type, func, false);  
    }else if(target.attachEvent){  
        target.attachEvent("on" + type, func);  
    }else{  
        target["on" + type] = func;  
    }   
}  
function eventDis(e,btn){  
     $("#btn").attr("disabled",true); //按钮id
     //e.preventDefault();  //阻止表单提交
}
window.onload = function(){  
    var bindEventBtn = document.getElementById("addressEditForm");  //form 表单id  
    addEventHandler(bindEventBtn,"submit",eventDis); 
};



