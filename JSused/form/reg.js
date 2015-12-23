function Phonereg(options){
	this.url = options.url;
	this.msgObj = options.msgObj;
	this.num = options.num;
	this.sendNum = function(){$.post(this.url,{pnum:this.num})};
	this.sendNum();
}
function showCnt(obj,cnt){
	$(obj).html(cnt);
}

function Checkform(options){
	this.obj = options.obj;
	this.ajax = options.ajax;
	this.url = options.url;
	this.name = options.name;
	this.cn_name = options.cn_name;
	this.minLen = options.minLen;
	this.maxLen = options.maxLen;
	this.eqval = options.eqval;
	//是否为空
	this.isNull = function(){return this.obj.val() !='';};
	//二次输入是否相等
	this.isEqual = function(){return this.obj.val() == this.eqval;};
	//是否有效   符合正则要求
	this.isValid = function(){if(this.name == 'username'){return isUsername(this.obj.val())};if(this.name == 'email'){return isEmail(this.obj.val())};if(this.name == 'phone'){return isPhone(this.obj.val())};	return true;};
	//进行长度验证
	this.isLength = function(){var len = this.obj.val().length;	if(this.minLen>len || this.maxLen<len){return false;}return true;};
	//是否已存在
	this.isUsed = function(){var data = new Array();data['url'] = this.url;	data['val'] = this.obj.val();this.sendPhp(data);};
	//进行ajax验证
	
	this.sendPhp = function(arr){
		$.post(arr['url'],{name:this.name,val:arr['val']},function(data){
			if(data.res == 0){
				showMsg('该'+cn_name+'已存在');
			}
		},'json')
	};	
	
	
	//弹出提示消息
	this.showMsg = function(msg){$('<div class="warn_msg"><span class="msg">'+msg+'</span><span class="right_bg"></span></div>').appendTo(this.obj.parent());};
	if(this.isNull() == false){this.showMsg(this.cn_name+'不能为空');return false;};
	if(this.eqval != undefined){if(this.isEqual() == false){this.showMsg(this.cn_name+'输入有误');return false;}};
	if(this.maxLen !=undefined){if(this.isLength() == false){this.showMsg('请输入'+this.minLen+'到'+this.maxLen+'位的'+this.cn_name);return false;}};
	if(this.isValid() == false){this.showMsg(this.cn_name+'格式不正确');return false;}
	if(this.ajax == true){this.isUsed()}
	return true;
	
}
function isUsername(str){
	var reg= /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
	return reg.test(str);
}
function isEmail(str){
   var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
   return reg.test(str);//返回bool
}
function isPhone(str){
	var reg = /^0?(1[3456789][0-9])[0-9]{8}$/;
    return reg.test(str);//返回bool
}
function pass_strong2(s) {
	var a = -1;
	if (s.match(/[a-z]/ig)) {
		a++;
	}
	if (s.match(/[0-9]/ig)) {
		a++;
	}
	if (s.match(/(.[^a-z0-9])/ig)) {
		a++;
	}
	if (s.length < 6 && a > 0) {
		a--;
	}
	$('.passw').removeClass('passd');
	if (a > -1) {
		$('#passw2_1').addClass('passd');
	}
	if (a > 0) {
		$('#passw2_2').addClass('passd');
	}
	if (a > 1) {
		$('#passw2_3').addClass('passd');
	}
}



function CheckForm(){
	this.userName;//用户名
	this.email;//邮箱
	this.phone;//手机
	this.password;//密码
	this.password2;//重复密码
	this.minLen;
	this.maxLen;
	this.emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	this.userNameReg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
	this.phoneReg = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
	//方法1  验证用户名
	this.isUsername = function(){
		return this.normalCheck(this.userName,this.userNameReg,true);
	};
	//方法2  验证邮箱
	this.isEmail = function(){
		return this.normalCheck(this.email,this.emailReg,false);
	};
	//方法3  验证手机
	this.isPhone = function(){
		return this.normalCheck(this.phone,this.phoneReg,false);
		//alert(this.normalCheck);
		//return false;
		//alert(this.hasOwnProperty());
	};
	//方法4  验证密码
	this.isPwd = function(){
		return this.normalCheck(this.password,'',true);	
	};
	//方法5  验证重复密码
	this.isPwd2 = function(){};
		return this.password == this.password2;
	//方法6  非空验证
	this.isNull = function(val){
		return val != '';
	};
	//方法7  长度验证
	this.isLen = function(v){
		if(v.length>=this.minLen && v.length<=this.maxLen){return true;};
		return false;
	};
	//方法8 正则验证
	this.isReg = function(v,reg){return	reg.test(v);}
	this.normalCheck = function(v,reg,len){
		if(this.isNull(v)){
			//是否验证格式
			if(reg != ''){
				if(this.isReg(v,reg) == false){	return false;}
			};
			//是否验证长度
			if(len == true){
				if(this.isLen(v) == false){return false;}
			};
			return true;
		};
		return false;
	}
}

<script type="text/javascript">
$(function(){
	$('#getphonecode').click(function(){
		Checkform({obj:$('#phone'),cn_name:'手机号码'});
		if($('#phone').parent().find('.warn_msg').length == 0){
			var options = {num : $('#phone').val(), msgObj : $('.codemsg'), url :'/user/smsMsg'};
			Phonereg(options);
			setTimer(60,'#getphonecode');
		}
	});
	$('#phone').blur(function(){
		var options = {obj:$(this),ajax:true,name:'phone',cn_name:"手机号码",url:"/user/checkReg"};
		Checkform(options);
	});
	$('#email').blur(function(){
		var options = {obj:$(this),ajax:true,name:'email',cn_name:"邮箱",url:"/user/checkReg"};
		Checkform(options);
	});
	
	$('#username, #phusername').blur(function(){
		var options = {obj:$(this),ajax:true,name:'username',cn_name:"用户名",url:"/user/checkReg",minLen:2,maxLen:20};
		Checkform(options);
	});
	$('#pwd, #phpwd').blur(function(){
		var options = {obj:$(this),cn_name:"密码",minLen:6,maxLen:16};
		Checkform(options);
	});
	$('#pwd2').blur(function(){
		var options = {obj:$(this),cn_name:"确认密码",eqval:$('#pwd').val()};
		Checkform(options);
	});
	$('#phpwd2').blur(function(){
		var options = {obj:$(this),cn_name:"确认密码",eqval:$('#phpwd').val()};
		Checkform(options);
	});
	$('#phcode').blur(function(){
		var options = {obj:$(this),cn_name:"激活码"};
		Checkform(options);
	});
	$('#code').blur(function(){

		var options = {obj:$(this),cn_name:"验证码"};
		Checkform(options);
	});
	$('.submit').click(function(event){
		if($('.warn_msg').length != 0){event.preventDefault();}
		//if(errflag!=0){event.preventDefault();}else{console.log('errflag='+errflag);}
	});
});
var showItems = function(){
	var win = window.open('','','width=800,height=500,resizable=no,scrollbars=1');
	var text = $('.itembox').html();
	//alert(text);
	win.document.open("text/html","replace");
	win.document.writeln('<link type="text/css" href="/style/default/user.css" rel="stylesheet"/>');
	win.document.write(text);
	win.document.close();
};
</script>

<script type="text/javascript">
$(function(){
	$('.input').focus(function(){
		//$(this).parent().css('z-index','0');
		$(this).addClass('input_focus');
		$(this).parent().find('.warn_msg').remove();
		//$(this).removeClass('errmsg');
	});
	$('.input').blur(function(){
		//$(this).parent().css('z-index','1');
		$(this).removeClass('input_focus');
	});
 	regactive('.email');
 	regactive('.phone');
})
function regactive(obj){
	//获取obj的flag
	$(obj).click(function(){
		$('.warn_msg').remove();
		var id = getflag(obj,'flag');
		add_class(id,'regshow');
	});
	//显示flag对应的模块
}
function getflag(obj,name){
	return $(obj).attr(name);
}

function add_class(id,classname){
	$('.'+classname).removeClass(classname);
	$('#'+id).addClass(classname);
}
</script>