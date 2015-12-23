
var timeleft_num = 0;
var timers = {};
function timeleft(id, tm)
{
	if (tm > 0)
	{
		timers['tm'+id] = tm;
		do_timeleft(id);
		setInterval(function(){do_timeleft(id);} , 1000);
	}
	else
	{
		str = '已结束';
		$(id).html(str);
	}
}
function do_timeleft(id)
{
	timers['tm'+id] --;
	timeleft_num = timers['tm'+id];
	if (timeleft_num <= 0)
	{
		str = '已结束';
	}
	else
	{
		var day = 3600*24;
		var hour = 3600;
		var minute = 60;
		var str = '';
		var tm = timeleft_num % day;
		day = Math.floor(timeleft_num / day);
		hour = Math.floor(tm / 3600);
		tm = tm % 3600;
		minute = Math.floor(tm / 60);
		tm = timeleft_num % 60;
		if (day > 0)
		{
			str += day + '天';
		}
		if (hour > 0)
		{
			str += hour + '小时';
		}
		if (minute > 0)
		{
			str += minute + '分钟';
		}
		str += tm + '秒';
	}
	$(id).html(str);
}

function check_interest(id, mi, ma)
{
	if ($(id).val().length == 0)
	{
		return ;
	}
	if ($(id).val() > ma)
	{
		$(id).val(ma);
	}
	else if ($(id).val() < mi)
	{
		$(id).val(mi);
	}
}

function lessthan(id, ma, mi)
{
	if ($(id).val() > ma)
	{
		$(id).val(ma);
	}
	if ($(id) < mi)
	{
		$(id).val(mi);
	}
}

function banner(obj)
{
	
	 var bannerTime=2000;
	$(obj).find('.pic').hide().first().addClass('active').show();
	intervalProcess = setInterval(function(){ sliding(obj); }, bannerTime); 
	var len = $(obj).find('.pic').length;
	var ul = $('<ul></ul>');
	for (var i = 0; i < len; i ++)
	{
		var li = $('<li>'+(i+1)+'</li>').appendTo(ul);
		li.mouseover(function(){
			//终止setInterval函数的执行
			clearInterval(intervalProcess);
			//清空其他li带有的li_mouseon
			$(obj).find('.li_mouseon').removeClass('li_mouseon');
			//改变数字指针的样式
			$(this).addClass('li_mouseon');
			//获取数字的索引值
			var li_index = $(this).index();
		//获取当前图片的索引值
			var pic_index = $(obj).find('.active').index();
			if(li_index == pic_index )
			{	
				return false;
			}
			else
			{
				//设定数字指定的图片
				$(obj).find('.active').fadeTo("slow",0).removeClass('active');
				$(obj).find('.pic').eq(li_index).addClass('active').fadeTo("slow",1);
			}			
		});
		li.bind("mouseout",function(){
			intervalProcess = setInterval(function(){ sliding(obj); }, bannerTime);
		});
	}
	$(ul).appendTo($(obj));
	$(obj).find('li:first').addClass('li_mouseon');
}

function sliding(obj, id)
{
	var next = $(obj).find('.active').next('.pic');
	if (!next.length)
	{
		next = $(obj).find('.pic').first();
	}
	if (id && $(obj).find('.active').index() != id)
	{
		next = $(obj).find('.pic').index(id);
	}
	$(obj).find('.active').addClass('pre').removeClass('active');
	next.fadeTo(0, 0).addClass('active').fadeTo('slow', 1, function(){ $(obj).find('.pre').removeClass('pre'); });
	//获取当前图片的索引值
	var index= $(obj).find('.active').index();
	//设置数字对应的索引值的css样式
	$(obj).find('li').eq(index).addClass('li_mouseon');
	//取消前一个数字的背景
	var pre_index = $(obj).find('.pre').index();
	$(obj).find('li').eq(pre_index).removeClass('li_mouseon');
}

function changecode(id)
{
	$(id).attr('src', '/common/captcha?id='+Math.random()); 
}
function decimal(amt)
{
	amt = amt+'';
	var pos = amt.indexOf('.');
	if (pos > 0)
	{
	amt0 = amt.substr(0, pos);
	amt2 = amt.substr(pos+1);
	while (amt2.length < 2)
	{
	amt2 +='0';
	}
	if (amt2.length > 2)
	{
	amt2 = amt2.substr(0, 2);
	}
	}
	else
	{
	amt0 = amt;
	amt2 = '00';
	}
	var ary = new Array();
	while (amt0.length > 3)
	{
	amt3 = amt0.substr(amt0.length-3);
	ary[ary.length] = amt3;
	amt0 = amt0.substr(0, amt0.length - 3);
	}
	ary[ary.length] = amt0;
	amt = ary[ary.length-1];
	for(var i = ary.length-2; i >=0; i--)
	{
	amt += ','+ary[i];
	}
	amt += '.' + amt2;
	return amt;
}


function fancy(id, url, width, height)
{
	$("#"+id).fancybox({
		'width'				: width,
		'height'			: height,
		'autoScale'			: false,
		'transitionIn'		: 'none',
		'transitionOut'		: 'none',
		'type'				: 'iframe'
	});
}

function changeprov(provid, keyname)
{
	$.post('/common/getcity', {'provid':provid, 'keyname':keyname}, function(data) {
		$('.panel_city').each(function(index, element) {
			if ($(this).attr('name') == keyname)
			{
				$(this).html(data);
			}
		});
	});
}

function money(id, fee)
{
	var m = $('#'+id).val().replace(/[^\d\.]/g,'');
	var pos = m.indexOf('.');
	if (pos > -1 && m.length > pos + 3)
	{
		m = m.substring(0, pos+3);
	}	
	
	$total = Math.round(m*(fee))/100;
	console.debug($total);
	
	if ($total  <=100){
	$('#'+id).val(m);
	$('#l'+id).html(Math.round(m*(100-fee))/100+'元');
   }else
	   {
	    $('#'+id).val(m);
		$('#l'+id).html((m-100)+'元');
	   }
}


var cuid = 0;
var stophide = 0;
function showGroup(uid)
{
	if (cuid == uid)
	{
		if (stophide == 0)
		{
			$('#u'+uid).find('.ModifyGroup-list').hide();
			$('#u'+uid).find('.ModifyGroup-nav').removeClass('on-nav');
			cuid = 0;
		}
	}
	else
	{
		if (cuid > 0)
		{
			$('#u'+cuid).find('.ModifyGroup-list').hide();
			$('#u'+cuid).find('.ModifyGroup-nav').removeClass('on-nav');
		}
		cuid = uid;
		$('#u'+uid).find('.ModifyGroup-list').show();
		$('#u'+uid).find('.ModifyGroup-nav').addClass('on-nav');
	}
	return false;
}
function setGroup(typeid)
{
	var obj = $('#u'+cuid).find('.t'+typeid);
	if (obj.hasClass('SelectGroup'))
	{
		obj.removeClass('SelectGroup');
		$.post('/user/removeGroup',{'typeid':typeid,'fid':cuid}, function(data){
			eval('data='+data);
			$('#u'+cuid).attr('typeid', data.typeid);
			$('#u'+cuid).find('.typename').html(data.typename);
		});
	}
	else
	{
		obj.addClass('SelectGroup');
		$.post('/user/addGroup',{'typeid':typeid,'fid':cuid}, function(data){
			eval('data='+data);
			$('#u'+cuid).attr('typeid', data.typeid);
			$('#u'+cuid).find('.typename').html(data.typename);
		});
	}
	return false;
}
function removeFriend(fid)
{
	$.post('/user/removeFriend',{'fid':fid}, function(data){
		$('#u'+fid).hide();
	});
}
function addat(fid)
{
	$.post('/user/addattention',{'fid':fid}, function(data){
		$('#at'+fid).removeClass('u2');
		$('#at'+fid).attr('href', 'javascript:removeat('+fid+');');
		showmsg('添加关注成功');
	});
}
function removeat(fid)
{
	$.post('/user/removeattention',{'fid':fid}, function(data){
		$('#at'+fid).addClass('u2');
		$('#at'+fid).attr('href', 'javascript:addat('+fid+');');
		showmsg('已取消关注');
	});
}
function addfriend()
{
	if (arguments.length > 0)
	{
		uid = arguments[0];
		$.post('/user/addfriend',{'fid':uid}, function(data){
			showmsg(eval(data));
		});
	}
	else if (cuid > 0)
	{
		$.post('/user/addfriend',{'fid':cuid}, function(data){
			showmsg(eval(data));
		});
	}
}
function addblack()
{
	if(arguments.length > 0)
	{
		uid = arguments[0];
		$.post('/user/addblack',{'fid':uid},function(data){
			showmsg(eval(data));
		})
	}
	else if (cuid > 0)
	{
		$.post('/user/addblack',{'fid':cuid}, function(data){
			showmsg(eval(data));
		});
	}
}
function addattention()
{
	if (cuid > 0)
	{
		$.post('/user/addattention',{'fid':cuid}, function(data){
			showmsg('添加关注成功！');
		});
	}
}
function report(uid, uname)
{
	if ($('#reportcontainer').length > 0)
	{
		$('#reportcontainer').remove();
	}	
	var html = '<div style="" id="reportcontainer"><div class="fanbox" id="reportbox"><h3 id="reportbox_title" class="title" style="width:400px;">举报用户</h3><div class="cnt p10" style="width:400px"><form action="/common/report" method="post" id="form_report"><ul><li><label>举报用户：</label>'+uname+'</li><li><label>描述：</label><textarea name="content" cols="50" rows="5">这里描述举报该用户的理由。</textarea></li><li style="text-align:center;"><input type="submit" class="bluebtn" value="提交举报" id="submit" name="submit">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" onclick="$.fancybox.close();" class="bluebtn" value="取消" id="submit" name="cancel"><input type="hidden" name="userid" value="'+uid+'" /></li></ul></form></div></div><a href="#reportbox" id="reportbtn"></a></div>';
	//$(html).appendTo($(document.body));
	$.fancybox(html);
	$('#form_report').ajaxForm(function(data){
		eval(data);
	});
	$('#reportbtn').fancybox();
	$('#reportbtn').trigger('click');
}
function deleteAtt(fid)
{
	if (fid > 0)
	{
		$('#u'+fid).hide();
		$.post('/user/removeattention',{'fid':fid}, function(data){
			showmsg('用户删除成功！');
		});
	}
}
function deleteBlack(fid)
{
	if (fid > 0)
	{
		$('#u'+fid).hide();
		$.post('/user/removeBlack',{'fid':fid}, function(data){
			showmsg('用户删除成功！');
		});
	}
}

function showmsg(msg)
{
	if ($('#msgcontainer').length > 0)
	{
		$('#msgcontainer').remove();
	}
	var html = '<div style="width:420px;" id="msgcontainer"><div class="fanbox" id="msgbox"><h3 id="msgbox_title" class="title">提示信息</h3><div class="cnt"><div class="msgcnt">'+msg+'</div><div class="msgaction"><a href="javascript:$.fancybox.close();">确定</a></div></div></div><a href="#msgbox" id="msgbtn"></a></div>';
	//$(html).appendTo($(document.body));
	$.fancybox(html);
	if (arguments.length > 1 && arguments[1])
	{
		arg = arguments[1];
		$('#msgbtn').fancybox({onClosed:function(){eval(arg);} });
	}
	else
	{
		$('#msgbtn').fancybox();
	}
	$('#msgbtn').trigger('click');
}
function showinfo(alias)
{
	$.get('/info/getInfo/alias/'+alias, function(data){
		$('#infobox_cnt').html(data);
		$('#infobtn').trigger('click');
		$.fancybox.center();
	});
	if ($('#infocontaner').length > 0)
	{
		$('#infocontaner').remove();
	}
	var html = '<div style="display:none;" id="infocontaner"><div class="fanbox" id="infobox"><h3 id="infobox_title" class="title">信息浏览</h3><div class="cnt"><div class="infocnt" id="infobox_cnt"><img src="/style/images/waiting.gif" /></div><div class="msgaction"><a href="javascript:$.fancybox.close();">确定</a></div></div></div><a href="#infobox" id="infobtn"></a></div>';
	$(html).appendTo($(document.body));
	$('#infobtn').fancybox();
	$.fancybox.showActivity();
}
function sendmsg(uid, uname, active,reid)
{
	//根据不同操作选择不同的按钮 阅读--（回复邮件，关闭）  发送邮件--（发送消息，取消）  系统邮件--（关闭）
	var button = "";
	var name = "发件人：";
	if("read" == active)
	{
		button = '<button type="button" class="e_replybtn">回复邮件</button><button type="reset" class="e_resetbtn" >关闭</button>';
	}
	else if("onlyread" == active)
	{
		button = '<button type="reset" class="e_resetbtn" >关闭</button>';
	}
	else
	{
		name="收件人：";
		button = '<button type="button" class="e_sendbtn">发送消息</button><button type="reset" class="e_resetbtn" >取消</button>';
	}
	var html = '<div style="" id="sendmsgcontainer"><div class="fanbox" id="sendmsgbox"><div class="e_sendmsg_box" ><div class="e_close"></div><h1>发送站内信</h1><form action="/common/sendmsg" method="post" id="form_sendmsg"><div class="e_receiver"><div class="e_title">'+name+'</div><div class="e_name">'+uname+'</div><div class="e_person_pic"></div></div><div class="e_content"><div class="e_title">内容：</div><textarea class="e_textarea" name="msg"></textarea></div><div class="e_sendmsg_btn"><div class="e_title">&nbsp;</div>'+button+'<input type="hidden" name="userid" value="'+uid+'" /></div></form><div class="prompt_box"></div></div></div><a href="#sendmsgbox" id="sendmsgbtn"></a></div>';
	
	$.fancybox(html);
	//按钮功能 --关闭	
	$(".e_resetbtn, .e_close").click(function(){
		$.fancybox.close();
	});
	var clicktimes=0;
	//按钮功能 --发送消息
	
	$(".e_sendbtn").click(function(){
		clicktimes++;
		if(clicktimes == 1){
			oldcnt = "------------------ 原始邮件 ------------------";
			var content = $(".e_textarea").val();
			preg = /<\/[^>]*>/;		
			if("" == content || true == preg.test(content))
			{
				alert("内容不能为空或含有非法字符");
				return false;
			}
			preg2 =  new RegExp(oldcnt);
			if(preg2.test(content) == true)
			{
				var pos = content.indexOf(oldcnt);
				content = content.substr(0,pos-1);//这里减一是为了去掉‘\r\n’;
			}
			content = filtertrim(content);
			if("" == content)
			{
				alert("请填写内容");
				clicktimes=0;
				return;
			}
			$(".e_sendmsg_loading").remove();
			$('<div class="e_sendmsg_loading">消息正在发送中，请稍后……</div>').appendTo($(".prompt_box"));
			$.post("/common/sendmsg",{userid:uid,msg:content,reid:uid},function(data){
				sucMsg(data);
			},"text");
		}
	}); 
	
}
function filtertrim(str){
	// 用正则表达式将前后空格  
    // 用空字符串替代。  
    return str.replace(/(^\s*)|(\s*$)/g, "");  
}
/**阅读站内信*/
function readmsg(uid,uname,content,active,id,status){
	if('' != id){
		var url = '/msg/read';
		$.post(url,{id:id,sender:uid,status:status},function(){
			$("#"+id).find(".e_status").html('<span class="gray">已读</span>');
		});
	}
	//var active = "read";//指定为读操作
	//将内容填入指定文本框中
	sendmsg(uid,uname,active);
	$("#sendmsgbox").find('.e_textarea').text(content);
	$('.e_replybtn').live("click",function(){//点击回复邮件--再次调用sendmsg()--转为发送邮件模式
		var reid = uid;
		sendmsg(uid,uname,'send',reid);
		var oldcnt = "";
		if ("read" == active)
		{
			oldcnt = "------------------ 原始邮件 ------------------";
		}
		$(".e_textarea").text("\r\n"+oldcnt+"\r\n"+content);
	});
}
function sucMsg(data){
	var html1 = '<div style="" id="sendmsgcontainer"><div class="fanbox" id="sendmsgbox"><div class="msgprompt_box"><h3>系统提示</h3><h1>'+data+'</h1><div class="button_box"><span>窗口将在&nbsp;<i class="settimeout">5</i>&nbsp;秒后自动关闭……</span><button type="button" class="suc_close">点击关闭</button></div></div></div><a href="#sendmsgbox" id="sendmsgbtn"></a></div>';
	$.fancybox(html1);
	settimeout("5",".settimeout");
	$(".suc_close").click(function(){
		$.fancybox.close();
	});
}
//5秒倒计时
function settimeout(s, obj){
	var n=0
	if(s != undefined)
	{
		n=s;
	}
	 var timer = setInterval(function(obj){
		$(".settimeout").html(n);
		//alert($(obj).text());
		n--;
		if(0==n){
			clearInterval(timer);
			$.fancybox.close();
			return;
		}
	},1000);
}
function pass_strong(s) {
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
		$('#passw1').addClass('passd');
	}
	if (a > 0) {
		$('#passw2').addClass('passd');
	}
	if (a > 1) {
		$('#passw3').addClass('passd');
	}
}
function checklend(id, ma)
{
	if ($(id).val() > ma)
	{
		$(id).val(ma);
	}
	else
	{
		var num = $(id).val();
		num = parseInt(num);
		num = Math.floor(num/50)*50;
		$(id).val(num);
	}
}
function action_height(){
	//左右对齐
	var left_height = $('#left_side').height();
	var right_height = $('#right_side').height();
	//console.debug('left_height='+left_height+',right_height='+right_height);
	if(left_height-52 > right_height)
	{
		$('#right_side').height(left_height-52);	//这里减去2个像素，是由于右边部分有上下边
	}
	else
	{
		$('#left_side').height(right_height+52);
	}
}
function action_box(obj, id)
{
	$('.menu_box').removeClass('click_menu');
	$(obj).addClass('click_menu');
	if (id>=0)
	{
		$(obj).find('li').eq(id).addClass('li_click');
	}
}
/*
$.fn.inputEvent = function(cls_keypress, cls_focus)
{
	return $(this).each(function(index, element) {
		$(this).focus(function(){
			$(this).addClass(cls_focus);
			var obj = $(this);
			iTimer = setInterval(function(){
				if("" == $(obj).val()) {
					$(obj).removeClass(cls_keypress);
				}else {
					$(obj).addClass(cls_keypress);
				}	
			}, 10);
		});
		$(this).blur(function(){
			$(this).removeClass(cls_focus);
			clearInterval(iTimer);
		});	
	});
}*/
$.fn.inputEvent = function(cls_keypress, cls_focus)
{
	return $(this).each(function(index, element) {
		var obj = $(this);
		//初始化
		var iTimer_index = setInterval(function(){initinput(obj,cls_keypress)},5);
		//聚焦事件
		$(this).focus(function(){
			$(this).addClass(cls_focus);
			$(this).parent().find('.warn_msg').remove();
			if("" == $(obj).val()) {
				$(obj).removeClass(cls_keypress);
			}else {
				$(obj).addClass(cls_keypress);
			}
		});	
		//失去焦点
		$(this).blur(function(){
			$(this).removeClass(cls_focus);
			//clearInterval(iTimer_index);
		});
	});
}
function initinput(obj,classname){
	if("" == $(obj).val()) {
		$(obj).removeClass(classname);
	}else {
		$(obj).addClass(classname);
	}
}
function setcnt(obj,num){
	$(obj).each(function(){
		var cnt = $(this).text();
		if(num<cnt.length)
		{
			cnt = cnt.substr(0,num)+"...";
		}
		$(this).text(cnt);
	});
}
function checkNotNull(){
	var radioName = new Array('detail[sex]','detail[marrage]','detail[children]','detail[hadcar]','lend[jiekuan]');
	var flag1 = 0;
	var flag2 = 0;
	var flag3 = 0;
	var flag4 = 0;
	$("#confirm_btn").click(function(e){
		
		//检查文本框是否填写
		$(".text_input").each(function(){
			if("" == $(this).val())
			{	flag1 = 1;
				e.preventDefault();	
				$(this).parent().addClass('nullMsg');
				$(this).bind("focus",function(){
					$(this).parent().removeClass('nullMsg');
					flag1 = 0;
				});
			}
		});
		//检查下拉框是否选择
		$(".cs_select").each(function(){
			if("请选择" == $(this).text())
			{
				flag2 = 2;
				e.preventDefault();
				$(this).parent('.select_wrap ').addClass('nullMsg');
				$(this).bind("click",function(){
					$(this).parent('.select_wrap ').removeClass('nullMsg');
					flag2 = 0;
				});
			}
		});
		//检查单选框是否选择
		for(i=0;i<radioName.length;i++)
		{
			var obj = $("input[name="+"'"+radioName[i]+"'"+"]");
			if(0==$(obj).length) continue;
			if(0 == $("input[name="+"'"+radioName[i]+"'"+"]:checked").length)
			{
				//如果有未选择的单选框     高亮显示
				flag3 = 3;
				e.preventDefault();
				$(obj).parent().parent().addClass('nullMsg');
				//当点击时取消高亮显示
				$(obj).bind("click",function(){
					$(this).parent().parent().removeClass('nullMsg');
					flag3 = 0;
				});
			}
		}
		//文本框字数判断
		if($('#lendinfo').length>0)
		{
			var v = $('#lendinfo').val();
			if(v.length < 50)
			{
				alert('借款说明需80到100字之间');
				e.preventDefault();
				return;
			}
		}
		
		
		
		if(0 != flag1 || 0 != flag2 || 0 != flag3){
			notNullMsg();
		}
	})
}
//function notNullMsg(){
//	var html1 = '<div style="" id="sendmsgcontainer"><div class="fanbox" id="sendmsgbox"><div class="msgprompt_box"><h3>系统提示</h3><h1>信息不能为空</h1><div class="button_box"><p></p><button type="button" class="suc_close">点击关闭</button></div></div></div><a href="#sendmsgbox" id="sendmsgbtn"></a></div>';
//	$.fancybox(html1);
	//settimeout("5",".settimeout");
//	$(".suc_close").click(function(){
//		$.fancybox.close();
//	});
//}

//ie6兼容 好友列表
$(function(){
	
		$("#userlist .ModifyGroup a").bind('click',(function(){	
		   var obj = $(this);
		   $(".userlist li .ModifyGroup").css("z-index",1);
           $(obj).parent().css("z-index",3);

		}));
		
	
 });
/**
 * 实现留言信息的非空检查   若为空弹出提示   否则提交表单
 * @param inputid  需要检验的input
 * @param formid   需要或提交的form表单
 * @returns {Boolean}
 */
function checkmsg_isnull(inputid,formid){
	var v = $('#'+inputid).val(),preg = /<\/[^>]*>/;		
	if("" == v || true == preg.test(v))
	{
		alert("内容不能为空或含有非法字符");
		return false;
	}
	else
	{
		$('#'+formid).submit();
		$('#'+inputid).val("");
	}
}
function setTimer(time,obj){
	var cnt = $(obj).text();
	var n = time;
	//showCnt('发送中');
	$(obj).html('发送中');
	$(obj).attr("disabled","disabled");
	var timer = setInterval(function(){
		//showCnt(obj,n+'秒后可再次'+cnt);
		$(obj).html(n+'秒后可再次'+cnt);
		n--;
		if(n<1){
			//showCnt(obj,cnt);
			$(obj).html(cnt);
			$(obj).removeAttr("disabled");
			clearInterval(timer);
		}
	},1000);
}
//表单验证类

var CheckForm = {
	userName:'',//用户名
	email:'',//邮箱
	phone:'',//手机
	password:'',//密码
	password2:'',//重复密码
	minLen:0,
	maxLen:0,
	emailReg: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
	userNameReg: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
	phoneReg: /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/,
	//方法1  验证用户名
	isUsername :function(){
		return this.normalCheck(this.userName,this.userNameReg,true);
	},
	//方法2  验证邮箱
	isEmail: function(){
		return this.normalCheck(this.email,this.emailReg,false);
	},
	//方法3  验证手机
	isPhone : function(){
		return this.normalCheck(this.phone,this.phoneReg,false);
	},
	//方法4  验证密码
	isPwd : function(){
		return this.normalCheck(this.password,'',true);	
	},
	//方法5  验证重复密码
	isPwd2 : function(){return this.password == this.password2;},
		
	//方法6  非空验证
	isNull : function(val){return val != '';},
	//方法7  长度验证
	isLen : function(v){
		if(v.length>=this.minLen && v.length<=this.maxLen){return true;};
		return false;
	},
	//方法8 正则验证
	isReg : function(v,reg){return	reg.test(v);},
	normalCheck : function(v,reg,len){
		if(this.isNull(v)){
			//是否验证格式
			if(reg != ''){if(this.isReg(v,reg) == false){	return false;}};
			//是否验证长度
			if(len == true){if(this.isLen(v) == false){return false;}};
			return true;
		};
		return false;
	}
}

/*===================726 news img width====================*/
/*var setNewsImg = function(obj){
	var imgh = $(obj).find('img').height();
	var imgw = $(obj).find('img').width();
	var scale=1;
	if(imgw>634){
		scale = 634/imgw;
		console.log(scale);
		$(obj).find('img').height(scale*imgh);
		$(obj).find('img').css({'width':634});
	}
}*/
/*===================801 news img width====================*/
var setNewsImg = function(obj){
  $(obj).find('img').each(function(i){
     var imgw = $(this).width();
	 var imgh = $(this).height();
	 var scale=1;
		if(imgw>634){
			scale = 634/imgw;
			console.log(scale);
			$(this).height(scale*imgh);
			$(this).width(scale*imgw);
		}
  });
}
