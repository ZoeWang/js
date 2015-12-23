//引用这个js直接执行里面的方法
$(function(){
	banAside();
	Banner();
	progressBar();  //首页动态进度条
	alsoAsk();		//同问
	cool();			//点赞
	
});
//tab菜单切换的效果
function Tab(obj){	   
	  $(obj).click(function(){	//鼠标经过li的时间
		  var vl=$(this).val();	//获取当前li的值
		  var na=$(this).attr('name');//获取当前name的值	 
		  var ID=$('.'+na+vl);	//找到相应的class
		  $(this).parent().find('.curre').removeClass('curre');	//找到他父级下的curre的类并移除
		  $(this).children().addClass('curre');	//给当前li下的a标签加上curre的类
		  ID.parent().find('.show').removeClass('show').addClass('hide');	//找到他父级下的show的类并移除并加上hide的类
		  ID.removeClass('hide').addClass('show');	//给当前的div移除hide类并加上show的类		    		
		  })
}
function tab(obj){	   
	  $(obj).click(function(){	//鼠标经过li的时间
		  var vl=$(this).val();	//获取当前li的值
		  var na=$(this).attr('name');//获取当前name的值	 
		  var ID=$('.'+na+vl);	//找到相应的class
		  $(this).parent().find('.curre').removeClass('curre');	//找到他父级下的curre的类并移除
		  $(this).children().addClass('curre');	//给当前li下的a标签加上curre的类
		  ID.parent().find('.show1').removeClass('show1').addClass('hide1');	//找到他父级下的show的类并移除并加上hide的类
		  ID.removeClass('hide1').addClass('show1');	//给当前的div移除hide类并加上show的类		    		
		  })
}

/*sl 1225 updata*/
function Details(obj){
	$(obj).click(function(){
		var detail = $(this).parent().parent().children('.details');
		var ca = $(this).parent().parent();
		var caa=$(obj).parent().parent();
		if(detail.hasClass('down')){																
			$(this).removeClass('curre');			
			detail.slideUp(300);
			detail.removeClass('down');
			detail.addClass('up');
			caa.removeClass('curre');
			return false;
		}
		if(detail.hasClass('up')){
			$('.details').slideUp(300);	
			$('.details').removeClass('down');
			$('.details').addClass('up');
			caa.removeClass('curre');
			$(obj).removeClass('curre');
			$(this).addClass('curre')
			ca.addClass('curre');			
			detail.slideDown(300);
			detail.removeClass('up');
			detail.addClass('down');
			return false;
		}
	});
}

/*wxf 1227*/
function Inside(obj,box){
	$(obj).click(function(){
		var inside = $(this).parent().find('.inside');
		var ca = $(this).parent();
		var caa = $(obj).parent();
		var arrow = $(this).parent().find('.digest i');
		var arrows = $(obj).parent().find('.digest i');
		if(inside.hasClass('down')){																
			ca.removeClass('curre');
			caa.removeClass('curre');
			arrows.removeClass('unfoldup');	
			arrow.removeClass('unfoldup');		
			arrow.addClass('unfoldown');			
			inside.slideUp(300);
			inside.removeClass('down');
			inside.addClass('up');
			return false;
		}
		if(inside.hasClass('up')){
			$(box).slideUp(300);	
			$(box).removeClass('down');
			$(box).addClass('up');
			caa.removeClass('curre');
			arrows.removeClass('unfoldup');
			arrows.addClass('unfoldown');
			arrow.removeClass('unfoldown');
			arrow.addClass('unfoldup');
			ca.addClass('curre');		
			inside.slideDown(300);
			inside.removeClass('up');
			inside.addClass('down');
			return false;
		}
	});
}

function banAside(){
	var gain = $('.ban-aside');
	gain.css('z-index',2);
	setTimeout(function(){
		gain.animate({
			top:42,
			left:3
		},
		800).animate({
			top:32,
			left:3
		},
		800)
	},
	800)
};

/*banner*/
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
==============================================================================

/*wxf 1218*/
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

/*sl select*/
tar = 0;
function select_list(obj){
	var offset = $(obj).offset();
	var list = $(obj).attr("id")+'_list';
	var input = $(obj).attr("id")+'_input';
	tar++;
	var listobj = $('#'+list).addClass('tar'+tar);
	$(obj).attr('tar', tar);
	 //被点击时在div下方出现列表（当列表隐藏时，点击显示，当列表显示时，点击隐藏）
	$(obj).click(function(e){
		if($(listobj).is(".show"))
		{
			$(listobj).removeClass('show');
			$(listobj).parent().removeClass('select_wrap1');
		}
		else
		{
			$('.ft_list').removeClass('show');
			$(listobj).addClass('show');//先调位置 防止鼠标选中
			$('.select_wrap1').removeClass('select_wrap1');
			$(listobj).parent().addClass('select_wrap1');
		}
		//阻止事件冒泡
		e.stopPropagation();
	});
	 //点击页面时隐藏列表框	
	$(document.body).click(function(){
		$(listobj).removeClass('show');
		$(listobj).parent().removeClass('select_wrap1');
	});
	//当点击列表中li时，将li的值放入div中
	//var li_len = $(listobj).find('li').length;
//	$(listobj).find('li').bind("click",function(){
//		$(this).siblings().removeClass('selected');
//		var content = $(this).addClass('selected').text();
//		var val = $(this).attr('value');
//		$(obj).children('.input_text').val(content);//设置文本框的内容
//		$('"#"+input').val(val).change(); //设置表单提交的value
//		$(listobj).removeClass('show');
//		$(listobj).parent().removeClass('select_wrap1');
//		//return false;
//	});	

	//1230 wxf
	//当点击列表中li时，将li的值放入div中
	var li_len = $(listobj).find('li').length;
	$(listobj).find('li').bind("click",function(){
		$(this).siblings().removeClass('selected');
		var content = $(this).addClass('selected').text();
		var val = $(this).attr('value') ;
		$(obj).children('.input_text').text(content);//设置文本框的内容
		$("#"+input).val(val).change(); //设置表单提交的value
		$(listobj).removeClass('show');
		$(listobj).parent().removeClass('select_wrap1');
		//return false;
	});	
	
}

/*wxf 1223*/
//topup Switch bank
$(function(){
	var rechway = $('.rechway li');  //充值方式
	var choosebank = $('.choosebank li');  //选择银行
	var otherbank = $('.otherbank');  //其他银行
	var targetClass = function(a){
		a.addClass('selected').siblings().removeClass('selected');
	}
	
	rechway.click(function(){
		var tar = $(this);
		targetClass(tar);
		if(tar.children().hasClass('banknet'))
		{
			$('#choosebank').show();
			var choose_bank = $(".choosebank .selected");
		}else{
			$('#choosebank').hide();
		}
	});
	
	choosebank.click(function(){
		targetClass($(this));
	});
	
	otherbank.click(function(){
		choosebank.removeClass('hide').addClass('show');
		otherbank.hide();
	});
})


/*sl 140113 动态进度条*/
function showPer1(){
	var tar = $('.percentage_box');
	tar.each(function() {
		var self = $(this);
		var per = self.find('.percentage_bg1');
		var div = per.find('.percentage_bg2');
		var rat = self.find('.green');
		var num = parseInt(per.attr('data-rel'));
		var interval;
		var count = 0;
		var plus = function () {
			div.css({height:count+'%'});
			rat.html(count);
			if (count == num || count == 100) {
				clearInterval(interval);
			};
			count++;
		};
		interval = setInterval(plus,10);
    });
};
function showPer2(){
	var tar = $('.plan_list');
	tar.each(function() {
		var self = $(this);
		var per = self.find('.progress_bar_bg');
		var div = per.find('.progress_bar_bg1');
		var rat = self.find('.plan');
		var num = parseInt(per.attr('data-rel'));
		var interval;
		var count = 0;
		var plus = function () {
			div.css({width:count+'%'});
			rat.html(count);
			if (count == num || count == 100) {
				clearInterval(interval);
			};
			count++;
		};
		interval = setInterval(plus,10);
    });
};

/*sl 140105*/

/*function Sort(obj){
	var cl=$(obj).parent();
	var nex=$(obj).attr('class');
	var nex1=nex+1;
	var nex2=nex+2;
	cl.click(function() {
	   var chl=$(this).children();
	   if(chl.hasClass(nex)){
		   chl.removeClass(nex);	   
		   chl.addClass(nex1);
		   }
	   else if(chl.hasClass(nex1)){
		   chl.removeClass(nex1);	   
		   chl.addClass(nex2);
		   }
	   else if(chl.hasClass(nex2)){
		   chl.removeClass(nex2);	   
		   chl.addClass(nex1);
		   }
    });
}*/

/*wxf 124 粒粒通下拉框*/
function zzDetail(){
	$('.mybox7 a').click(function(){
		var newdeta = $(this).parents('.new120').find('.newdeta');
		var newdetaAll = $('.mybox7 a').parents('.new120').find('.newdeta');
		var box = $(this).parents('.new120').find('.detabox');
		var boxAll = $('.mybox7 a').parents('.new120').find('.detabox');
		var t = 'debg';
		var d = 'debgdown';
		if(box.hasClass('down')){												
			$(this).removeClass(d).addClass(t);		
			box.slideUp(300);
			box.removeClass('down');
			box.addClass('up');
			newdeta.children().unwrap();	
			return false;
		}
		if(box.hasClass('up')){
			boxAll.slideUp(300);	
			boxAll.removeClass('down');
			boxAll.addClass('up');
			$('.mybox7 a').removeClass(d).addClass(t);
			newdetaAll.children('.clear').unwrap();
			$(this).parents('.new120').children().wrapAll('<div class="newdeta"></div>');
			$(this).removeClass(t).addClass(d);
			box.slideDown(300);
			box.removeClass('up');
			box.addClass('down');
			return false;
		}
	});
}
/*wxf 124 点击 复选框 */
//function discount(){
//	var obj = $('.checkbox');
//	var on = 'checkon';   //已选
//	var no = 'checkno';   //未选
//	obj.bind("click",function(){
//		if($(this).hasClass(no)){
//			$(this).removeClass(no).addClass(on);
//		}else{
//			$(this).removeClass(on).addClass(no);
//		}
//	});
//}

/*sl 20140208 index progress bar*/
function progressBar(){
	var tar = $('.limit_progress');
	tar.each(function() {
		var self = $(this);
		var per = self.find('.progress_bg_box');
		var div = per.find('.progress_bg4');
		var rat = self.find('.plan');
		var num = parseInt(per.attr('data-rel'));
		var interval;
		var count = 0;
		var plus = function () {
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



//sl 0221
function zhiwei(){
	$(".zhiwei").click(function(e) {
		var ts=$(this).next(".zhiwei_list");
		var tl=$(this).children('span');		
		if(ts.hasClass('down')){
				$(this).removeClass('on');
				tl.removeClass('curre');				
				ts.slideUp(300);
				ts.removeClass('down');
				ts.addClass('up');
				return false;
			}
		if(ts.hasClass('up')){				
				$(".zhiwei_list").slideUp(300);
				$(".zhiwei_list").removeClass('down');
				$(".zhiwei_list").addClass('up');
				$(".zhiwei").children('span').removeClass('curre');
				$(".zhiwei").removeClass('on');
				$(this).addClass('on');
				tl.addClass('curre');
				ts.slideDown(300);			
				ts.removeClass('up');
				ts.addClass('down');
			}
    });
}

//充值金额 2014-03-21
function topupAmount(){
	var amount = $("#amount");
	var reg = /^[1-9]*[1-9][0-9]*$/;
	var btn = $("#recharge");
	btn.click(function(event){
		var val = amount.val();
		if(val>300000 || reg.test(val) == false){
			event.preventDefault();
			alert("充值金额为不大于300000的正整数！");
			amount.val(""); 
		}
	})
}

//散标投标金额为50的倍数
function investLend(){
	var btn = $("#buy");
	var amount = $("#investamount");
	var bal = $("#balance");
	var is_new = $("#is_new");
	
	btn.click(function(event){
//		var reg = /^[1-9]*[1-9][0-9]*$/;
		var reg = /^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$/;//金钱的验证
		var val = amount.val();
		var is_new_val = is_new.val();
		var type = amount.attr('Paytype'); 
		var rem = val % 50;			//不要50的倍数
		//console.log(val);
		if(is_new_val == 1){
			if(val > 1000)
			{
				event.preventDefault();
				alert("投资金额不大于1000元！");
				amount.val("");
				return false; 
			}
		}
		if ((val<50 || reg.test(val) == false) && type == 1){
			event.preventDefault();
			alert("投资金额为不小于50的数（精确到小数点后两位）!");
			amount.val("");
			return false; 
		}
		else if(val > 100000)
		{
			event.preventDefault();
			alert("投资金额需不大于100000元！");
			amount.val("");
			return false; 
		}
		else 
		{			
			if(hb==1){
				if(val>zhye){
					alert("您的账户余额不足！");
					return false;
					}	
				$('#hongbaoform').find('i').eq(0).html(val);
				$('#hongbaoform').find('i').eq(3).html(val);		
				$('#red_packet').fancybox();
				$('#hongbaoform').find('input').click(function() {
					var Status = $(this).attr("status");
					var Amount = parseInt($('#hongbaoform').find('i').eq(2).html());
					var Num = parseInt($('#hongbaoform').find('i').eq(1).html());
					var Money = parseInt($('#hongbaoform').find('i').eq(3).html());
					if(Status == 0){
						 $(this).attr("status",1);
						 $('#hongbaoform').find('i').eq(1).html(Num+1);
						 $('#hongbaoform').find('i').eq(2).html(Amount+parseInt($(this).attr("amount")));
						 $('#hongbaoform').find('i').eq(3).html(Money-parseInt($(this).attr("amount")));
					}else{
						$(this).attr("status",0);
						 $('#hongbaoform').find('i').eq(1).html(Num-1);
						 $('#hongbaoform').find('i').eq(2).html(Amount-parseInt($(this).attr("amount")));
						 $('#hongbaoform').find('i').eq(3).html(Money+parseInt($(this).attr("amount")));
					}					
				});
				$('#hongbaobtn').click(function() {
					var Red = "";
					$("#hongbaoform").find('input').each(function(){
						var NowStatus = $(this).attr("status");
											
						if(NowStatus == 1){	
							Red += $(this).val()+',';
						}
					});	
					$('#redid').val(Red);
					$('#PostForm').submit();			
				});
			}else{
				$('#PostForm').submit();	
			}			
		}
	})
}

function investJuhe(){
	var btn = $("#buy");
	var amount = $("#investamount");
	var bal = $("#balance");
	btn.click(function(event){
		var reg = /^[1-9]*[1-9][0-9]*$/;
		var val = amount.val(); 
		var type = amount.attr('Paytype');
		var rem = val % 1000;
		//console.log(val);
		if ((rem != 0 || reg.test(val) == false) && type == 1){			
			event.preventDefault();
			alert("投资金额为不小于1000的倍数的正整数！");
			amount.val(""); 			
		} 
		else if(val > 100000)
		{
			event.preventDefault();
			alert("投资金额需不大于100000元！");
			amount.val(""); 
		}else{
			if(hb==1){
				if(val>zhye){
					alert("您的账户余额不足！");
					return false;
					}	
				$('#hongbaoform').find('i').eq(0).html(val);
				$('#hongbaoform').find('i').eq(3).html(val);
				$('#hongbaoform').find('i').eq(1).html('0');
				$('#hongbaoform').find('i').eq(2).html('0');
				$('#hongbaoform').find('input').removeAttr("checked");		
				$('#red_packet').fancybox();				
				$('#hongbaoform').find('input').click(function() {
					var Status = $(this).attr("status");
					var Amount = parseInt($('#hongbaoform').find('i').eq(2).html());
					var Num = parseInt($('#hongbaoform').find('i').eq(1).html());
					var Money = parseInt($('#hongbaoform').find('i').eq(3).html());
					if(Status == 0){
						 $(this).attr("status",1);
						 $('#hongbaoform').find('i').eq(1).html(Num+1);
						 $('#hongbaoform').find('i').eq(2).html(Amount+parseInt($(this).attr("amount")));
						 $('#hongbaoform').find('i').eq(3).html(Money-parseInt($(this).attr("amount")));
					}else{
						$(this).attr("status",0);
						 $('#hongbaoform').find('i').eq(1).html(Num-1);
						 $('#hongbaoform').find('i').eq(2).html(Amount-parseInt($(this).attr("amount")));
						 $('#hongbaoform').find('i').eq(3).html(Money+parseInt($(this).attr("amount")));
					}					
				});
				$('#hongbaobtn').click(function() {
					var Red = "";
					$("#hongbaoform").find('input').each(function(){
						var NowStatus = $(this).attr("status");
											
						if(NowStatus == 1){	
							Red += $(this).val()+',';
						}
					});	
					$('#redid').val(Red);
					$('#PostForm').submit();			
				});
			}else{
				$('#PostForm').submit();	
			}			
		}
	})
}

//同问 20140318
function alsoAsk(){
	var on = $("#vote");
	var vote = $(".num");
	on.click(function(){
		var askid = $(this).attr('askid');
		//console.log(askid);
		$.post("cont.html",
		{
			askid : askid
		},
		function(data){
			//console.log(data);
			vote.empty().html(data);
		})
	})
}

//点赞 20140318
function cool(){
	var on = $(".cool");
	on.click(function(){
		var answerid = $(this).attr('answerid');
		var vote = $(this).next('span');
		//console.log(askid);
		$.post("cont.html",
		{
			answerid : answerid
		},
		function(data){
			//console.log(data);
			vote.empty().html(data);
		})
	})
}

//通过手机找回密码 手机传值
//function resetPwdByMobile()
//{
//	var mobile = $("input[name='key']");
//	var btn = $(".gain_authcode");
//	btn.click(function(){
//		if(mobile.val() == '')
//		{
//			alert("请输入手机号！");
//		}else{
//			$.post("sendmsg.html",
//			{
//				type: 'mobile',
//				val: mobile.val()
//			},
//			function(data){
//						
//			})
//			setTimer(60,'.gain_authcode');
//		}
//	})
//}

//提现费用
function withdrawalFee()
{
	var amount = $("#amount");
	var fee = $("#fee");
	var amountVal = parseFloat(amount.val().replace(/[^0-9-.]/g, ''));
	var feeVal = parseFloat(fee.text().replace(/[^0-9-.]/g, ''));
	if(!amountVal)
	{
		fee.text('0.00');
	}
	else if(amountVal < 20000)
	{
		fee.text('1.00');
	}
	else if(amountVal>=20000 && amountVal<50000)
	{
		fee.text('3.00');
	}
	else
	{
		fee.text('5.00');
	}
	amount.bind('input propertychange', function(){	//实时捕获input value变化
		setTimeout("withdrawalFee()", 500);
	});

}


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