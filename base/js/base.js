/*!
 * base
 * Version: 1.0.0
 * Create: wxf
 * Date: 20-10-2014 
 */
// 数据类型	前缀	示例
// number	n	nAllSum
// string	s	sNames
// boolean	b	bState
// array	a	aValue
// object	o	oGetElement
// function	f	fShow

/**
 *	实现一个块及对象的晃动效果
 *	@param object gain 块及对象id 或 class 参数 
 *  调用shaking($("#gain"));
 */

function shaking(gain){
	"use strict";
	gain.css({'position':'absolute','z-index':2});
	setTimeout(function(){
		gain.animate({
			top:42,
			left:13
		},
		800).animate({
			top:32,
			left:13
		},
		800)
	},
	800)
};

/**
 *	实现选项卡效果
 *	@param object obj 对象id 或 class 参数 
 * 	.show 设置display:block;
 *  .hide 设置display:none;
 *  .curre 类设置选中当前选项卡的样式;
 */

function tab(obj){	
	"use strict";   
	$(obj).click(function(){	//鼠标点击li的时候
		var nValue=$(this).val();	//获取当前li的值
		var sName=$(this).attr('name');//获取当前name的值	 
		var oBox=$('.'+sName+nValue);	//找到相应的class
		$(this).parent().find('.curre').removeClass('curre');	//找到他父级下的curre的类并移除
		$(this).children().addClass('curre');	//给当前li下的a标签加上curre的类
		oBox.parent().find('.show').removeClass('show').addClass('hide').animate({"opacity":0});	//找到他父级下的show的类并移除并加上hide的类
		oBox.removeClass('hide').addClass('show').animate({"opacity":1});	//给当前的div移除hide类并加上show的类		    		
	})
}

/**
 * 实现方式，最简洁的tab
 */
 $(".btn").click(function(){
    var index = $(this).index();
    $(".btn a").removeClass("on");
    $(this).find("a").addClass("on");
    $(".box").hide()
    //console.log(index)
    $(".box").eq(index).show();
})



/**
 *	实现collapse滚动效果
 *	@param object _this 当前点击的对象id 或 class 
 * 	@param object box 当前显示框的 id 或 class 
 *  @param speed 执行的速度
 */
function collapse(_this,box,speed){
	"use strict";
	$(_this).click(function(e) {
		var nextBox=$(this).next(box);
		//var icon=$(this).children('span');	//不同状态添加不同图标		
		if(nextBox.hasClass('down')){
				$(this).removeClass('on');
				//icon.removeClass('curre');	//不同状态添加不同图标				
				nextBox.slideUp(speed).removeClass('down').addClass('up');
		}else{
				$(box).slideUp(speed).removeClass('down').addClass('up');
				//$(_this).removeClass('on').children('span').removeClass('curre'); //不同状态添加不同图标	
				$(this).addClass('on');
				//icon.addClass('curre'); //不同状态添加不同图标	
				nextBox.slideDown(speed).removeClass('up').addClass('down');
		}
		
    });
}


/**
 * 点击按钮后多长时间内按钮不可点 
 * @param time 时间 以秒为单位 
 * 可接受 id 及 class 选择器，可同时控制多少个class
 */
$.fn.setBtnTimer = function(options) {
	"use strict";
	var defaults = {
		'time': 60
	};
	var settings = $.extend({},defaults, options);
	this.attr("disabled","disabled");
	var that = this,
		oldv = that.val(),
		timer,
		tick = function(){
			that.val(settings.time+'s后可在此操作');
			settings.time--;
			if(settings.time<1){
				that.removeAttr("disabled");
				window.clearInterval(timer);
				that.val(oldv);
			}
		};
	return this.each(function(){
		timer = window.setInterval(tick, 1000);
	});
}

/**
 * 自定义select 下拉框 
 * @param obj  
 * 
 */
function selList(obj){
	"use strict";
	var offset = $(obj).offset(),
		list = $(obj).attr("id")+'_list',
		input = $(obj).attr("id")+'_input',
		listobj = $('#'+list);
	 //被点击时在div下方出现列表（当列表隐藏时，点击显示，当列表显示时，点击隐藏）
	$(obj).click(function(e){
		if($(listobj).is(".show"))
		{
			$(listobj).removeClass('show');
			$(listobj).parent().parent().removeClass('select_wrap1');
		}
		else
		{
			$('.ft_list').removeClass('show');
			//$(listobj).css({top:(offset.top+32)+'px',left:offset.left+'px'}).addClass('show');	//先调位置 防止鼠标选中
			$(listobj).addClass('show');//先调位置 防止鼠标选中
			$('.select_wrap1').removeClass('select_wrap1');
			$(listobj).parent().parent().addClass('select_wrap1');
		}
		//阻止事件冒泡
		e.stopPropagation();
	});
	 //点击页面时隐藏列表框
	$(document.body).click(function(){
		$(listobj).removeClass('show');
		$(listobj).parent().parent().removeClass('select_wrap1');
	});
	//当点击列表中li时，将li的值放入div中
	var li_len = $(listobj).find('li').length;
	$(listobj).find('li').on("click",function(){
		$(this).siblings().removeClass('selected');
		var content = $(this).addClass('selected').text();
		var val = $(this).attr('value');
		$(obj).children('span').text(content);//设置文本框的内容
		$("#"+input).val(val).change(); //设置表单提交的value
		$(listobj).removeClass('show');
		$(listobj).parent().parent().removeClass('select_wrap1');
	});
}
/**
 * 进度条
 * @param opt 
 * 
 */

$.fn.bar = function(opt) {
		"use strict";
		var defaults = {
			'barBox': '.barBox',	//进度条边框
			'barBg': '.barBg',		//进度条背景
			'going': '.going',		//进度条的当前进度(显示给用户)
			'dataRel': 'dataRel',	//进度条目标进度值(用于计算)
			'count': 0				//进度当前已走多少进度
		};
		var settings = $.extend({},defaults, opt);
		return this.each(function() {
			var self = $(this),
				per = self.find(settings.barBox),
				div = per.find(settings.barBg),
				rat = self.find(settings.going),
				num = parseInt(per.attr(settings.dataRel)),
				interval,
				count = 0,
				plus = function () {
					div.css({width:count+'%'});
					rat.html(count);
					if (count == num || count == 100) {
						clearInterval(interval);
					};
					count++;
				};
				interval = setInterval(plus,10);
		});
	}
/**
 * 等高
 * @param left 左边box元素
 * @param right 右边box元素
 */
function equalHeight(left,right){
	var lh = left.height();
	var rh = right.height();
	if(lh<rh){
		left.css("height",rh)
		if ($.browser.msie && $.browser.version == 6.0) { left.css({'height': rh}); }
		left.css({'min-height': rh}); 
	}else{
		right.css("height",lh)
		if ($.browser.msie && $.browser.version == 6.0) { right.css({'height': lh}); }
		right.css({'min-height': lh}); 
	}
}

// unfinished
// Extend the default Number object with a formatMoney() method:
// usage: someVar.formatMoney(decimalPlaces, symbol, thousandsSeparator, decimalSeparator)
// defaults: (2, "$", ",", ".")
Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "$";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};
/*
 * 倒计时
 * countDown("10","#hms");
 */
function countDown(sys_second,id){ 
	var hour, minute, second,
		watch = $(id),
	    timer = setInterval(function(){ 
		if (sys_second > 0) { 
			
			sys_second -= 1; 
			hour = Math.floor((sys_second / 3600) % 24); 
			minute = Math.floor((sys_second / 60) % 60); 
			second = Math.floor(sys_second % 60); 
			hour=hour<10?"0"+hour:hour;//计算小时 
			minute=minute<10?"0"+minute:minute;//计算分钟 
			second=second<10?"0"+second:second;//计算秒杀 
			watch.text(hour).append(" : ").append(minute).append(" : ").append(second);
		} else { 
			clearInterval(timer);
		} 
	}, 1000); 
} 
/*
 * 千分位转换
 */
function permillage(id, icon) {
    $("#" + id).blur(function () {
        var val = $(this).val(),
                valLen = val.length;
        if (val.substr(0, 1) == icon) {
            val = val.substr(1, valLen);
        }
        val.replace(/^(\d+)((\.\d+)?)$/, function (v1, v2, v3) {
            var per = v2.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,') + (v3 || '.00');
            $("#" + id).attr("value", icon + per);
        })


    })
}

/*
 * 向input内加入符号(ID,符号,是否删除符号【删除传1,不删除不用传值】)
 */
function addMoneyIcon(id, icon, delIcon) {
    var delIcon;
    permillage(id, icon);
    $("#" + id).focus(function () {
        //IE9光标置后
        var ctrl = document.getElementById(id);
        if (ctrl.setSelectionRange) {
            ctrl.focus();
            ctrl.setSelectionRange(0, 0);
        } else if (ctrl.createTextRange) {
            var range = ctrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', 0);
            range.moveStart('character', 0);
            range.select();
        }

        var val = $(this).val(),
                valLen = val.length;
        if (val == "") {
            $(this).attr("value", icon + val);
        } else {
            $(this).attr("value", val);
        }

    }).blur(function () {
        var val = $(this).val(),
                valLen = val.length;
        if (delIcon || val == icon) {
            val = val.substr(1, valLen);
        }
        $(this).attr("value", val);
    })
}


/*
 * 我的收藏
 */


/*我的收藏*/
function myFunc(){
	$.ajax({
		url:"/site/ShowCollect",
		type:'post',
		datatype:'json',
		async:true,
		success:function(data){
		    var data=eval(data);
		    var old="";
		    $("#collect").html('');
		    
		    //判断返回是否为空
		    if(data==null){
		      	$("#collect li").remove();
		      	$("#collect").append(old);
		      	$("#collect").append("<li><a href='#'>没有收藏</a></li>");  
		      
		    }
		    if(data!=null){
		      	$("#collect li").remove();//移除节点并循环插入li
		      	for(var i =0;i<data.length;i++){  
		         	var item=data[i];
		         	$("#collect").append("<li><a href='/site/housedetail/id/"+item.building_id+"'>"+item.building_name+"</a></li>");  
		      	};  
		    }
		},
		error:function(){
		    alert('请求失败');
		} 
	});
}
/*
 * 3秒提示
 * 实时监听 事件
 */
$("#CustomerAppointment_broker_name").bind('input propertychange',function(){ 
   	$.post("{$sitepath}/manager/checkbroker_laokehu/broker_name/"+encodeURIComponent($("#CustomerAppointment_broker_name").val())+"/broker_cellphone/"+$("#CustomerAppointment_broker_cellphone").val(),'',function(data){
       if(data){
   		    var data=eval(data);
			$str="";
			for(var i=0;i<data.length;i++){
				var item=data[i];
				$str+="<li>"+item.broker_name+" ("+item.broker_cellphone+")</li>";
			}
			$("#broker_list").show().html($str);
			$("#broker_list li").click(function(){
				$("#CustomerAppointment_broker_name").val(data[$(this).index()].broker_name);
				$("#CustomerAppointment_broker_cellphone").val(data[$(this).index()].broker_cellphone);
				$("#broker_list").hide();
				$("#broker_msg").html("该经纪人已存在");
			});
	   }else{
	  		$("#broker_list").hide().html("");
	   }
	});
	$.post("{$sitepath}/manager/checkbroker1_laokehu/broker_name/"+encodeURIComponent($("#CustomerAppointment_broker_name").val())+"/broker_cellphone/"+$("#CustomerAppointment_broker_cellphone").val(),'',function(data){
	  	$("#broker_msg").html(data);
	});
});


/*
 * 3秒提示
 * pop_time_confirm({message:"字符串",callback:function(){},times:"时间"})
 */
function pop_time_confirm(options) {
    var message;
    var initTime = 1000;
    var times = 3 * initTime;
    var callback = function () {
    };
    var runTime;
    if (typeof (options) == "object") {
        if (typeof (options["message"]) == "string") {
            message = options["message"];
        }
        if (typeof (options["callback"]) == "function") {
            callback = options["callback"];
        }
        if (typeof (options["times"]) == "number") {
            times = (options["times"] * initTime);
        }
    }
    var html = '<div class="popWindow">';
    html += '<div class="pop_content">' + message + '</div>';
    html += "</div><div class='modal-backdrop fade in'></div>";
    $(document.body).append(html);
    runTime = setTimeout(function () {
        callback();
        $(".popWindow").remove();
        $(".modal-backdrop").remove();
        clearTimeout(runTime);
    }, times)
}

/*
 * 关闭弹出
 * close_pop_time_confirm({message:"字符串",callback:function(){},times:"时间"})
 */
function close_pop_time_confirm(_id) {
    var closeId = _id != undefined ? $("#" + _id) : $("#pop_confirm");
    if (closeId.is(':visible')) {
        closeId.remove();
        return true;
    }
}

/*
 * 弹出窗口
 */
function pop_confirm(options) {
    var init,
		message, //弹窗信息
		onOk, //提交按钮
		onCancel, //取消按钮
		width, //宽度
		height, //高度
		okName = "提交", //提交按钮文本
		cancelName = "取消", //取消按钮文本
		title = "",
		button,//按钮
		modal,//遮罩层
		callback = function () {};
    if (typeof (options) == "string") {
        message = options;
    } else if (typeof (options) == "object") {
        if (typeof (options["init"]) == "function") {
            init = options["init"];
        }
        if (typeof (options['message']) == "string") {
            message = options['message'];
        }
        if (typeof (options["title"]) == "string") {
            title = options["title"];
        }
        if (typeof (options["callback"]) == "function") {
            callback = options["callback"];
        }
        if (typeof (options["width"]) == "string") {
            width = options["width"];
        }
		if (typeof(options["okName"]) == "string") {
			okName = options["okName"];
		}
		if (typeof(options["cancelName"]) == "string") {
			cancelName = options["cancelName"];
		}
        if (typeof (options["button"]) == "string") {
            button = options["button"];
        }
		if (typeof (options["modal"]) == "string") {
            modal = options["modal"];
        }
        if (typeof (options["onOk"]) == "function") {
            onOk = options["onOk"];
        }
        if (typeof (options["onCancel"]) == "function") {
            onCancel = options["onCancel"];
        }
    }
	switch (width) {
		case '':
			var html = '<div class="popMessage">';
		break;
		default:
			var screeW = $(document.body).outerWidth(true)
			var left = (screeW-width)/2
			var html = '<div class="popMessage" style="width:'+width+'px;left:'+left+'px">';
		break;	
	}
    
	switch(title){
		case 'none':
			html += '<div class="titHeight"></div>';
		break;
		default:
			html += '<div class="pop_title titHeight">' + title + '</div>';
		break;
	}
    html += '<div class="pop_content">'+message+'</div>';
    html += '<div class="pop_button">';
    switch (button) {
        case 'none':
            html += '';
            break;
        case 'ok':
            html += '<input type="button" class="pop_button_ok buttonOk" value="' + okName + '">';
            break;
        case 'cancel':
            html += '<input type="button" class="pop_button_cancel buttonCancel" value="' + cancelName + '">';
            break;
        default:
            html += '<input type="button" class="pop_button_ok buttonOk" value="' + okName + '"><input type="button" class="pop_button_cancel buttonCancel" value="' + cancelName + '">';
            break;
    }
    html += '</div>';
    html += "<a class='pop_button_cancel closeWindow' href='javascript:void(0)'></a></div>";
	switch (modal) {
		case 'none':
		break;
		default:
			html += "<div class='modal-backdrop fade in'></div>";
		break;
	}
    $(document.body).append(html);
	
	callback();
	/*取消的操作*/
	function onCancel(className){
		$("."+className).remove();
	}
	var modal =  $(".modal-backdrop");
	$(".pop_button_cancel").live("click",function(){
		if(onCancel){
			onCancel('popMessage');
			modal.remove();
		}
	})
	$(".pop_button_ok").live("click",function(){
		onCancel('popMessage');
		modal.remove();
	})

}


/**
 *	实现选项卡效果
 *	@param object obj 对象id 或 class 参数 
 *  @param object box 对象显示box的id 或 class 参数 
 * 	.show 设置display:block;
 *  .hide 设置display:none;
 *  .on 设置选中的样式
 *  调用tabIndex(".list li",".ask_list_box div"); 实例同上
 */
function tabIndex(obj,box){
	$(obj).hover(function(){
		var index = $(this).index();
		$(this).siblings().removeClass("on");
        $(this).addClass("on");
		$(box).hide();
		$(box).eq(index).show();
	})
}

/**
 *	实现collapse滚动效果
 *	@param object _this 当前点击的对象id 或 class 
 * 	@param object box 当前显示框的 id 或 class 
 *  调用collapse(".zhiwei",".zhiwei_list"); 
 *
 *	实例
 	<div class="zhiwei_box">
    	<h4 class="zhiwei">
        	<span class=""></span>
            测试工程师
        </h4>
        <div class="zhiwei_list up" style="display: none;">
        	<h5>岗位职责：</h5>
            <p>1. 参与软件产品的需求分析,负责测试分析、测试计划制定和测试用例设计</p>
            <p>2. 执行项目测试,包括构建测试环境，集成测试，回归测试，性能测试等</p>
            <p>3. 测试报告的编写、问题缺陷的发现及跟踪、产品用户手册编写等</p>
            <p>4. 保持跟开发团队、需求方进行积极有效的沟通，推动问题解决</p>                                                   
        </div>
    </div>
    <div class="zhiwei_box">
		<h4 class="zhiwei">
	    	<span class=""></span>
	        客服专员
	    </h4>
	    <div class="zhiwei_list up" style="display: none;">
	    	<h5>岗位职责：</h5>
	        <p>1．负责处理电话、邮件、论坛、微博中用户需求与投诉，用优秀的服务水平和良好的服务态度来维护用户；</p>
	        <p>2．负责建立与客户的友好关系，建立客户档案；</p>
	        <p>3．负责协调各个部门反馈处理结果并及时与客户沟通；</p>
	        <p>4．负责网站产品的测试、BUG收集整理、意见反馈等工作；</p>                                           
	    </div>
	</div>
 */
function collapse(_this,box){
	$(_this).click(function(e) {
		var nextBox=$(this).next(box);
		var icon=$(this).children('span');		
		if(nextBox.hasClass('down')){
				$(this).removeClass('on');
				icon.removeClass('curre');				
				nextBox.slideUp(300).removeClass('down').addClass('up');
		}else{
				$(box).slideUp(300).removeClass('down').addClass('up');
				$(_this).removeClass('on').children('span').removeClass('curre');
				$(this).addClass('on');
				icon.addClass('curre');
				nextBox.slideDown(300).removeClass('up').addClass('down');
		}
		//制作思路
		// if(nextBox.hasClass('down')){
		// 		$(this).removeClass('on');
		// 		icon.removeClass('curre');				
		// 		nextBox.slideUp(300).removeClass('down').addClass('up');
		// 		return false;
		// }
		// if (nextBox.hasClass('up')){
		// 		$(box).slideUp(300).removeClass('down').addClass('up');
		// 		$(_this).removeClass('on').children('span').removeClass('curre');
		// 		$(this).addClass('on');
		// 		icon.addClass('curre');
		// 		nextBox.slideDown(300).removeClass('up').addClass('down');
		// }
		
    });
}

/**
 *
 */

var indx = 1;	//索引
var looper = 5000;	//切换时间 毫秒单位
var myTimer;  //定时器变量
	
function Banner(){
	if($("#fcimg li").length >1){
		$("#fcimg").after( $('<ul id="fcnum"></ul>')); 
		for(i=1;i<=$("#fcimg li").length;i++){
			if(i==1) $("#fcnum").append($("<li class=\"crn\"> </li>")); 
			else $("#fcnum").append($("<li></li>")); 
		}
		myTimer = setInterval('showFImg("#fcimg li","#fcnum li","crn")', looper);
		$("#fcnum li").click(function(){
			indx  =  $("#fcnum li").index(this);
			//alert(indx);
			showFImg("#fcimg li","#fcnum li","crn");
			try{
				clearInterval(myTimer);
				myTimer = setInterval('showFImg("#fcimg li","#fcnum li","crn")', looper);
			}catch(e){}
			return false;
		});	
		$("#fcimg").hover(function(){
			if(myTimer){ clearInterval(myTimer); }
		 },function(){
			myTimer = setInterval('showFImg("#fcimg li","#fcnum li","crn")', looper);
		 });
	  }
}
	
function showFImg(il,nl,cs){
	  if($(il).length >1){
		crobj = $(il).eq(indx);
		$(il).not(crobj).hide();
		$(nl).removeClass(cs)
		$(nl).eq(indx).addClass(cs);
		crobj.stop(true,true).fadeIn('slow');
		indx = (++indx) % ($(il).length);
	  }
}

function subTextSize(){
	var element = $('.list-checkbox .num-center a'),
		   text = '',
		      w = '',
		    arr = [];
	var textLen = document.documentElement.clientWidth > 768 ? 65:50;	//被截取的长度
	for(var i=0; i<element.length; i++) {
		arr[i] = element.eq(i).text();
	}
	var subStrSize = function(){
		for(var i=0; i<element.length; i++){
			text = element.eq(i).text();
			   w = $('.list-num').eq(i).width()-80;
			if(w<420){
				element.eq(i).html(text.substr(0, textLen)+'...');
			}else{
				element.eq(i).html(arr[i]);
			}
		}
	}
	subStrSize();
	$(window).resize(function(){
		subStrSize();
	})
}
subTextSize();


/**
 * 面向对象jQ插件例子
 */
;(function($, window, document, undefined){
    "use strict";
    //定义Beautifier的构造函数
    var Beautifier = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
            'color': 'red',
            'fontSize': '12px',
            'textDecoration': 'none'
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    //定义Beautifier的方法
    Beautifier.prototype = {
        beautify: function() {
            return this.$element.css({
                'color': this.options.color,
                'fontSize': this.options.fontSize,
                'textDecoration': this.options.textDecoration
            });
        }
    }
    //在插件中使用Beautifier对象
    $.fn.myPluginObj = function(options) {
        //创建Beautifier的实体
        var beautifier = new Beautifier(this, options);
        //调用其方法
        return beautifier.beautify();
    }
})(jQuery, window, document);

/**
 * 解析网址域名 类
 */
var domain = {
	domain : function(url){
		var durl=/http:\/\/([^\/]+)\//i;
		var hosts = url.match(durl);
		hosts = hosts[1];
		d_arr = hosts.split('.');
		hosts = d_arr[d_arr.length - 2] + '.' + d_arr[d_arr.length - 1];
		return hosts;
	},
	domain_pre : function(url){
		var durl=/http:\/\/([^\/]+)\//i;
		var hosts = url.match(durl);
		hosts = hosts[1];
		d_arr = hosts.split('.');
		return d_arr[0];
	},
	domain_arr :function(url){
		var durl=/http:\/\/([^\/]+)\//i;
		var hosts = url.match(durl);
		// console.log(hosts);
		hosts = hosts[1];
		// console.log(hosts);
		d_arr = hosts.split('.');
		return d_arr;
	},
	currentUrl:window.location.href
};
var host_arr = domain.domain_arr(window.location.href);
var host = domain.domain(window.location.href);
var baseUrl = host_arr[1] + '.' + host_arr[2];
console.log(host_arr);
console.log(host);
console.log(baseUrl);

/*
 * 匹配手机号中间4位*号
 */
function hideTel( tel ){
	var reg = /(\d{3})\d{4}(\d{4})/;
	return tel.replace(reg, "$1****$2");
}
