/**
 * 全局变量 
 * @param {String} open || close 状态
 * default open
 */
var JK_lock ="open";

/**
 * 匿名函数 自执行 弹出框
 *  $().tooltip("pop", {
		width: 420,
		height: 548,
		popId: '#login-pop',
		opacity: 0.4,
		popHtml: loginpop.popHtml(),
		popFunc: loginpop.tijiao()
	})
 */
(function ($) {
	var clicknumber = 0;
	var methods = {
		init: function (options) {	},
		pop: function (options) {//弹出层
			var _H = $(window).height() ;
			var _W = $(window).width() ;
			var jumpstop = 0;
			var stop=1;
			/*
			* options.width(number)	弹出层宽度（必选）
			* options.height(number) 弹出层高度（必选）
			* options.zIndex(number) 弹出层index轴 ，默认为9999；（可选）
			* options.poparent(jquery节点) 要插入的父节点,默认为‘body’（可选）
			* options.opacity(0~1) 背景透明度（可选）
			* option.popId(jqeury节点 ) 要插入的弹出层ID或者calss,最好为ID，强调唯一性！（必选）
			* option.popHtml(插入弹出层元素结构) 如“<div id='test'></div>"；（可选）
			* option.popFunc(function方法) 弹出层回调方法；（可选）
			* option.closePop(function方法) 关闭回调方法；（可选）
			* option.time(1~100000)//X秒跳转，X为整数，如：1为1秒（可选）
			* option.timeId(id)//为一个ID节点，用来储存时间显示（可选）
			* option.url(URL)//一个链接，倒计时跳转路径。（可选）
			* 关闭按钮约定名称为 calss = popclose;（可选）
			* */
			var settings = {
				'width': 100,
				'height':100,
				'zIndex':9999,
				'poparent':'body',
				'opacity':0.5,
				'popId':null,
				'popHtml':null,
				'popFunc':null,
				'time':null,
				'timeId':null,
				'url':null,
				'closePop':null
			};
			// 如果存在选项，则合并之
			if (options) {
				$.extend(settings, options);
			}
			var popTop;
			var popLeft = (_W - settings.width) / 2;
			if(settings.popHtml === null) {
				return this.each(function () {
					var $this = $(this);
					if(settings.height =='auto'){
						settings.height=$this.height();
					};
					popTop = (_H - settings.height) / 2;
					$this.show();
					$this.css({width: settings.width, height: settings.height, zIndex: settings.zIndex, top: popTop, left: popLeft,position: 'fixed'});
					closebox();
					if(settings.time !== null ){
						jump(settings.time,settings.timeId,settings.url);
					}
				});
			}else if(settings.popHtml !==null){
				$(settings.poparent).append(settings.popHtml);
				if(settings.height =='auto'){
					settings.height=$(settings.popId).height();
				};
				popTop = (_H - settings.height) / 2;
				$(settings.popId).css({width: settings.width, height: settings.height, zIndex: settings.zIndex, top: popTop, left: popLeft,position: 'fixed'});
				closebox()
			};
			function closebox(){
				if(settings.popFunc !== null) {
					settings.popFunc()
				};
				var backlayer ="<div id='blacklayer'></div>"
				$("body").append(backlayer);
				var dh = $(document).height();

				$('#blacklayer').css({zIndex:settings.zIndex-10,background:"#000",opacity:settings.opacity,position:'absolute',left:0,top:0,width:'100%',height:dh})
				$('.popclose').bind("click",function(){
					stop=0;
					$('#blacklayer').remove();
					if(settings.popHtml === null){
						$(settings.popId).hide();
					} else{
						$(settings.popId).remove();
					}
					if(settings.closePop!=null){
						settings.closePop();
					}
				})
			}

			if(settings.time !== null ){

				jump(settings.time,settings.timeId,settings.url);
			}
				function jump (time,element_id,url) { //X秒跳转
					if(stop===0) return false
				_jumpfunc =	window.setTimeout(function(){
					time--;
					if(time > 0) {
						if(jumpstop== 1 ){
							return false;
						} else{

							$(element_id).html(time+"秒");
							jump(time,element_id,url)
						}
					} else {
						if(url ==null){
							$('#blacklayer').remove();
							$(settings.popId).remove();
						} else{
							document.location=url;
						}
					}
				}, 1000);
			}
		},
		tag: function (options) {//标签切换
			var settings={
				'type':"click",
				'selected':'on',
				'contentClass':'.content',
				'func':null
			};
			// 如果存在选项，则合并之
			if (options) {
				$.extend(settings, options);
			}
			if(settings.type != 'click' && settings.type != 'mouseover' ) return false;
			$(this).eq(0).addClass(settings.selected);
			return this.each(function(){
				var $this = $(this);
				$(settings.contentClass).hide();
				$(settings.contentClass).eq(0).show();
				$this.bind(settings.type,contentShow);
				function contentShow(){
					var _index = $this.index();
					$this.siblings().removeClass(settings.selected);
					$this.addClass(settings.selected);
					$(settings.contentClass).hide();
					$(settings.contentClass).eq(_index).show();
					if(settings.func!=null){
						settings.func();
					}
				}
			})
		},
		imgmove: function(options){//多小图片幻灯
			var settings = {
				oneEle:null,
				oneWidth:null,
				loop:false,
				boxWidth:null,
				prev:null,
				next:null
			}
			// 如果存在选项，则合并之
			if (options)
			{
				$.extend(settings, options);
			}
			function movefunc(){
				var number = $(settings.oneEle).size();
				var length =number*settings.oneWidth;
				var boxlen = length/settings.boxWidth;
				if(boxlen%settings.boxWidth > 0){
					boxlen+1;
				}
				var par =	$(settings.oneEle).parent();
				if (settings.loop== true){
					$(settings.oneEle).parent().width(length).css("left",-settings.oneWidth);
					var par =  $(settings.oneEle).parent();
					var li = $(settings.oneEle).last();
					par.prepend(li.clone())
					li.remove();
				} else{
					$(settings.oneEle).parent().width(length);
				}
				$(settings.prev).click(function(){
					if (settings.loop== true){
						var li = $(settings.oneEle).last();
						TweenMax.to(par, 1, {left:0,onComplete:function(){
							 par.prepend(li.clone())
							 par.css("left",-settings.oneWidth);
							$(settings.oneEle).last().remove();
						},ease:Quart.easeOut});
					} else{
						if(clicknumber>0){
							clicknumber--;
							TweenMax.to( par, 1, {left:-settings.boxWidth*clicknumber,ease:Quart.easeOut});
							
						};
					}
				});
				$(settings.next).click(function(){
					if (settings.loop== true){
						TweenMax.to(par, 0.4, {left:-settings.oneWidth,onComplete:function(){
							par.css("left","0px");
							var li = $(settings.oneEle).slice(0, 1);
							par.append(li.clone())
							$(settings.oneEle).slice(0, 1).remove();
							console.log("ok")
						},ease:Quart.easeOut});
					} else{
						if(clicknumber<boxlen-1){
							clicknumber++
							TweenMax.to(par, 1, {left:-settings.boxWidth*clicknumber,ease:Quart.easeOut});
						}
					}
				});
			}
			movefunc();
		}
	};
	$.fn.tooltip = function (method) {
		// Method calling logic
		if (methods[method]) {
			return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.tooltip');
		}
	};
})( jQuery );

// jQuery 用 $j 代替 $ 变量，区分其他框架 用的$ 变量 
// 注：目前没有强制 应用替换，$j $ 处于 混用 状态 
var $j = $ = jQuery.noConflict();

// @namespace JKXY;
var JKXY ={};	

/**
 * Browser IE浏览器判断
 * @name JKXY.Browser
 * @static
 * 调用 JKXY.Browser.IE 
 * return {Boolean} true false
 */
JKXY.Browser = {
	IE: !!( window.attachEvent && !window.opera ),
	IE6: (/msie\s*(\d+)\.\d+/g.exec(navigator.userAgent.toLowerCase()) || [0, "0"])[1] == "6",
	IE7: navigator.userAgent.indexOf('MSIE 7.0') > -1,
	IE8: navigator.userAgent.indexOf('MSIE 8.0') > -1,
	IE9: navigator.userAgent.indexOf('MSIE 9.0') > -1
}

/**
 * msgBox 提示信息
 * @name JKXY.msgBox
 * @function
 * @param {Int} status 提示状态：成功1 失败0 一般提示信息2
 * @param {String} msg 提示内容
 * @param {Int} show_time 提示信息 显示时间 默认 1500
 * @param {function} callBack 返回函数
 * 调用 JKXY.msgBox(0, data.info, 2000, function () {
	        lock = 0;
	    });
 */
JKXY.msgBox	= function(status, msg, show_time, callBack){
	var msg		= msg ? msg : '亲爱的VIP，这是来自极客学院小雪的 Hello~';
	var id		= "warning";
	var show_time	= parseInt(show_time) ? parseInt(show_time) : 1500;
	switch (status)
	{
		case 1:
			var color_class	= "waring-success";
			break;
		case 0:
			var color_class	= "waring-failure";
			break;
		case 2:
		default:
			var color_class	= "waring-sub";
			break;
	}
	var html;
		html	= '<div class="web-dia-tip '+color_class+'" id="'+id+'" >';
			html	+= msg;
		html	+= '</div>';
	$('body').append( html );

	var _W	= $('#'+id).width()/2;
	$('#'+id).css("marginLeft", -_W);
	$('#'+id).animate({top:"0px",opacity:1},300,function(){
		$('#'+id).delay(show_time).animate({top:"-50px",opacity:0},500,function(){
			$('#'+id).remove();
			if( typeof(callBack) == 'function' )
			{
				callBack();
			}
		});
	});
	
};

/**
 * 预加载图片数组
 */
JKXY.ImgList=[
	'images/abc.png',
	'images/footzc.jpg',
	'images/icon.png',
	'images/icon1.png',
	'images/icon2.png',
	'images/icon3.png',
	'images/icon4.png',
	'images/icon5.png',
	'images/icon6.png',
	'images/learnhow.jpg',
	'images/learnwhat.jpg',
	'images/lesson-img.png',
	'images/andriod.png',
	'images/cocos2d.png',
	'images/ios.png',
	'images/java.png',
	'images/html5.png',
	'images/gotop2.jpg',
	'images/gotop.jpg',
	'images/erwma.png'
];

// 全局计数变量
JKXY.NUMBER=0;
JKXY.number={
	lunbo:0 //语言轮播计数器
};

/**
 * 弹出框通用 框架
 * @function
 * @param {String} html_id 弹出框标识 id
 * @param {String} content 弹出框内容部分
 * @param {String} tit 弹出框标题
 * 注：ucenter.js 有引用
 */
JKXY.popHtml =function(html_id, content, tit ) {
	var html = '<div class="dialog" id="'+html_id+'">';
	html += '<div class="dialog-box">';
	html+=' <h3><i class="popclose"></i>'+tit+'</h3>';
	html += '<div class="dialog-body">';
	html += content;
	html += '</div>';
	html += '</div>';
	return html;
};

/**
 * 播放进度
 * 混合模式 = 原型模式+构造函数模式
 */
var C = function(id,deg){
	this.box = id;
	this.left = this.box.find(".left");
	this.right = this.box.find(".cright");
	this.mask = this.box.find(".mask");
	this.text = this.box.find(".text");
	this.d = 0;
	this.A = null;
	this.deg = deg;
	this.init();
}
C.prototype = {
	init : function(){
		var T = this;
		this.A = window.setInterval(function(){T.change()},10);
	},
	change : function(){
		var T = this;
		if(this.d>180){
			if(this.d>360){
				window.clearInterval(this.A);
				this.A = null;
				return;
			}
			this.right.show();
			this.mask.hide();
		}
		this.text.text(parseInt(this.d/3.6)+"%");
		this.left.css({
			"-webkit-transform":"rotate("+this.d+"deg)",
			"-moz-transform":"rotate("+this.d+"deg)"
		});
		if(this.d<this.deg){
			this.d+=6;
		}
	}
}


/**
 * 网站页面通用的效果
 */
JKXY.CJT={
	init:function(){
		this.checkbwoer();	// 检测浏览器版本
		this.bindElem();
		// this.indexNav(); //首页导航切换 已经out 了
		// this.fourText(); 没有找到 哪里调用
		// this.learnWhatNav(); 没有找到 哪里调用
		this.navflex();		// 头部智能悬浮导航
		this.loading(JKXY.ImgList);   // 图片预加载
		this.TopSearch();  // 搜索关键字 获取焦点时效果
		this.GoTop();	// 返回头部
		this.lessonNavHover(); 
		this.timeCare();
		
	},
	checkbwoer:function(){
		/**
		 * 检测实用 浏览器版本 IE678 提示升级浏览器
		 * 全局 网站每个页面 都加
		 */
		var	browser="<div id='B-blacklayer'></div>";
		browser+="<div id='browser'>";
		browser+="<div class='b-title'>使用一款<strong>优质浏览器，是成为极客</strong>的关键一步！</div>";
		browser+="<p>您正在使用的浏览器内核版本过低，除了有可能遭受病毒与恶意软件的侵袭之外，也无法体验到最新互联网技";
		browser+="术带来的优质显示与交互效果。极客学院网站大量使用了HTML5与CSS3技术，为确保您能够体验到最佳的";
		browser+="浏览效果，我们推荐您选择使用下列最新的优质浏览器：</p>";
		browser+=" <div class='downloading'>";
		browser+="<a href='http://www.firefox.com.cn/download/' target='_blank'><img src='"+cdn_url+"images/firefox.png' /> </a>";
		browser+="<a href='http://wirrorcdn.qiniudn.com/software/browser/ChromeStandaloneSetup.Win.38.0.2125.111.exe' target='_blank'><img src='"+cdn_url+"images/chrome.png' /> </a>";
		browser+="<a href='http://windows.microsoft.com/zh-cn/internet-explorer/ie-11-worldwide-languages/' target='_blank'><img src='"+cdn_url+"images/ie.png' /></a>";
		browser+="<a href='http://support.apple.com/kb/DL1531' target='_blank'><img src='"+cdn_url+"images/safari.png' /> </a>";
		browser+=" </div></div>";

		if( JKXY.Browser.IE){
			if(JKXY.Browser.IE6 || JKXY.Browser.IE7 || JKXY.Browser.IE8 ){
				$("body").append(browser);
				var H = $(document).height();
				var H2 = $(window).height();
				if(H>=H2){
					$('#B-blacklayer').height(H)
				} else{
					$('#B-blacklayer').height(H2)
				}
			}
		}
	},
	login:function(n,text){
		/**
		 * 登录状态
		 * @param {Int} n 登录状态
		 * @param {String} text 登录提示
		 * JKXY.CJT.init 没有直接调用
		 */
		var warning;
		switch (n)
		{
			 case 0:
				 warning = "<div class='web-dia-tip waring-success' id='warning'>"+text+"</div>";
				 break;
			 case 1:
				 warning = "<div class='web-dia-tip waring-failure' id='warning'>"+text+"</div>";
				 break;
			 case 2:
				 warning = "<div class='web-dia-tip waring-sub' id='warning'>"+text+"</div>";
				 break;
			 default:
				alert("参数，0：成功，1：失败，2：登录中..")
		}
		$('body').append( warning );
		var _W = -$j('#warning').width()/2-20;
		$j('#warning').css("marginLeft",_W)
		$('#warning').animate({top:"0px",opacity:1},300,function(){
			$('#warning').delay(900).animate({top:"-50px",opacity:0},500,function(){
				$('#warning').remove();
			})
		});

	},
	bindElem:function(){	// 元素触发事件
		//$j('.subscibe_submit').bind("click",this.BottomButtonSearch); out 了
		//$j('.searchbox i').bind("click",this.TopSearch); out 了
		//$j("input[name='subscibe_email']").bind("click",this.BottomSearch);  out 了
		$j(".headsearch").bind( "click", JKXY.CJT.webHeaderSearch );
		$("#headsearch .search-btn").bind( "click", JKXY.CJT.webHeaderSearch );
		$j(".footsearch").bind( "click", JKXY.CJT.webFootSearch );
		//$j('#user-name,.user-center,#user-name p').bind("mouseover",this.userContent); //没找到那里用
		$j('.lesson-list li').hover(
			JKXY.CJT.lessonHover,
			JKXY.CJT.lessonOut
		)
	},
	// 没有找到那里用
	userContent:function(){//头部用户中心下拉
		/*
		$j('.user-center').show();
		$j('.jiaotou').addClass("rotate");
		JKXY.CJT.stopEventBubble();
		$j(document).bind("mouseover",function(){
			$j('.user-center').hide();
			$j('.jiaotou').removeClass("rotate");
		});*/
	},
	indexNav:function(){//首页导航切换 已淘汰
		/*$j(".nav a").tooltip("tag",{  // 弹出框 里的tag调用
			'type':"mouseover",
			'selected':'on',
			'contentClass':'.content-one',
			'func':function(){
				var _index = $j(this).index();
				$j('.learnav-content').show();
				JKXY.CJT.stopEventBubble();
			}
		});
		$j(".nav a").eq(0).removeClass("on");
		$j('.navbox,.learnav-content').bind("mouseover",function(){
			$j('.learnav-content').show();
			JKXY.CJT.stopEventBubble();
		})
		// $j(document).unbind();
		$j(document).bind("mouseover",function() {
			$j('.learnav-content').hide();
			$j(".nav a").removeClass("on");
		});*/
	},
	fourText:function(){//首页四话轮播 现有的页面没有调用
		/*
		var _text =[
			"<span>学习最新实战教程</span>迅速提升开发实力",
			"<span>知识碎片化</span>自由规划学习周期",
			"<span>深入浅出系统学习</span>快速掌握感兴趣的技术",
			"<span>提升技术实力</span>迅速获得高薪"
		]
		$j('#fourtext').css({opacity:0}).animate({"opacity": 1},1000).delay(1000).animate({opacity:0},1000);
		setInterval(lunbo,3000);
		function lunbo(){
			if(JKXY.number.lunbo>3){
				JKXY.number.lunbo=0;
			}
			$j('#fourtext').animate({"opacity": 1},1000);
			$j('#fourtext').html(_text[JKXY.number.lunbo]).delay(1000).animate({"opacity": 0},1000);
			JKXY.number.lunbo++;
		}*/
	},
	learnWhatNav:function(){ //首页学什么导航
		/*
		$j('.learn-nav li').tooltip("tag",{
			'type':"mouseover",
			'selected':'on',
			'contentClass':'.lessoncontent',
			'func':function(){
				$j('.lessonbox').show();
				JKXY.CJT.stopEventBubble();
			}
		})
		$j('.learn-nav li').eq(0).removeClass("on");
		$j('.lessonbox,.lessoncontent').bind("mouseover",function(){
			$j('.lessonbox').show();
			JKXY.CJT.stopEventBubble();
		})
		//$j(document).unbind();
		$j(document).bind("mouseover",function() {
			$j('.lessonbox').hide();
			$j('.learn-nav li').removeClass("on");
		});*/
	},
	navflex:function(){//头部#navbox 导航智能悬浮
		$j(document).scroll(
			function(){
				var _top = $j(document).scrollTop();
                var margTop = $('#header').innerHeight();
				if(_top>margTop){

					$j('#navbox').addClass("flex");
					var _w =	$j('.loginbox').innerWidth()+2;
				} else{
					$j('#navbox').removeClass("flex");
					$j('.loginbox').removeClass("loginflex");

				}
			});
	},
	stopEventBubble: function(){//阻止冒泡事件 工具函数
		function getEvent(){
			if(window.event)	{return window.event;}
			func=getEvent.caller;
			while(func!=null){
				var arg0=func.arguments[0];
				if(arg0){
					if((arg0.constructor==Event || arg0.constructor ==MouseEvent
						|| arg0.constructor==KeyboardEvent)
						||(typeof(arg0)=="object" && arg0.preventDefault
							&& arg0.stopPropagation)){
						return arg0;
					}
				}
				func=func.caller;
			}
			return null;
		}


		var e=getEvent();
		if(window.event){
			//e.returnValue=false;//阻止自身行为
			e.cancelBubble=true;//阻止冒泡
		}else if(e.preventDefault){
			//e.preventDefault();//阻止自身行为
			e.stopPropagation();//阻止冒泡
		}
	},
	loading:function(a){//头部loadding 预加载图片 加载首页 loading 条
		var len = a.length;
		var le=$j('.loading-length');
		for(var i=0; i<len; i++){
			var img = new Image();
			img.onload=function(){
				JKXY.NUMBER++;
				le.animate({width:$j(window).width() / len *JKXY.NUMBER},50)
			};
			img.src= cdn_url+a[i];
			(function(img){
				return img.onerror = function(){
					console.log(img.src+"缺少图片")
				};
			})(img);

			if(i==len-1){

				$j(window).resize(function(){
					var wen = parseInt($j(window).width());
					$j('.loading-length').width(wen)

				})
			}
		}
	},
	TopSearch:function(){//头部搜索 获取焦点时效果

		$("input[name='q']").bind("focus",function(){
		   $('.search-btn').addClass("search-btn2");
		   $('.hot-words').hide()
		   //$('.keyword-list').show();
		   $(this).css({paddingRight: "55px"});

		});
		$("input[name='q']").bind("focusout",function(){
			$('.search-btn').removeClass("search-btn2");
			$('.hot-words').show();
			//setTimeout(function(){$('.keyword-list').hide()},100);
			//$('.keyword-list').delay(200).hide();
		});
		$('#J_keywordList .result-list').delegate('.current' , "click",function(){
			var val = $(this).text();
			$("input[name='q']").val(val);
			//$('.keyword-list').delay(200).hide();

		})
	},

	BottomSearch:function(){//尾部回车搜索 out 了
		/*
		$j(document).unbind("keydown");
		$(document).bind("keydown",function(event){
			if(event.keyCode ==13){
				//$("form.headsearch").submit();
				//获取搜索form下的两个input元素，获取两个元素的值
				var _focusEle = document.activeElement.id;
				if(_focusEle == 'subscibe_email') {
					var _t = $("div.footsearch input")[0].value;
					var _q = $("div.footsearch input")[1].value;
					if(!_q) {
						alert("关键词不能为空！");
						return;
					}
					var _host = location.host;
					var _search_host = _host.replace(/\w+/,"search");
					var _url = 'http://'+_search_host+'/s/' + 't_' + _t + '|q_' + encodeURIComponent(_q) + '|sfilter_1';
					location.href = _url;
				}
			}
		});*/
	},
	BottomButtonSearch:function(){//尾部按钮搜索	out
		/*
		var _t = $("div.footsearch input")[0].value;
		var _q = $("div.footsearch input")[1].value;
		if(!_q) {
			alert("关键词不能为空！");
			return;
		}
		var _host = location.host;
		var _search_host = _host.replace(/\w+/,"search");
		var _url = 'http://'+_search_host+'/s/' + 't_' + _t + '|q_' + encodeURIComponent(_q) + '|sfilter_1';
		location.href = _url;
		*/
	},
	// 网站全站搜索，替代 TopSearch、BottomSearch、BottomButtonSearch三个方法
	webHeaderSearch: function(){	// 过滤搜索内容
		$(document).unbind("keydown");
		// 点击icon小图标
		$("#headsearch .search-btn").click(function(){
			JKXY.CJT.webSearchMain( "headsearch" );
		});
		$(document).bind("keydown",function(event){
			if( event.keyCode ==13 )
			{
				JKXY.CJT.webSearchMain( "headsearch" );
			}
		});
	},
	webFootSearch: function() {  // 验证搜索内容
		$(document).unbind("keydown");
		// 点击“搜索”按钮
		$(".subscibe_submit").click(function(){
			JKXY.CJT.webSearchMain( "footsearch" );
		});
		$(document).bind("keydown",function(event){
			var id	= $(this).attr('id');
				id	= id ? id : "headsearch";
			if( event.keyCode ==13 )
			{
				JKXY.CJT.webSearchMain( "footsearch" );
			}
		});
	},
	webSearchMain: function(id){   // 过滤搜索内容
		var _t = $("div#"+id+" input")[0].value;
		var _q = $("div#"+id+" input")[1].value;
		if( !_q )
		{
			JKXY.msgBox( 0, '搜索关键词不能为空' );
			return false;
		}
		var _host = location.host;
		var _search_host = _host.replace(/\w+/,"search");
		var _url = 'http://'+_search_host+'/s/' + 't_' + _t + '|q_' + encodeURIComponent(_q) + '|sfilter_1';
		location.href = _url;
	},
	GoTop:function(){//返回头部
		if( typeof(event_stop)=='object' )
		{
			if( event_stop.rightdia === false )
			{
				return '';
			}
		}
		var lock =JKXY.Cookie.get("pewm");
		var erwma_none	= lock=="none" ? '' : "style='display:none'";
		var html="<div class='gotop' id='gototop'>";
		html+="<span class='top'></span>";
		html+="<span class='erwma' "+erwma_none+" ><img src='"+cdn_url+"images/erwma.png'/> </span>";
		html+="<a href='" + www_url + "app/' alt='极客学院应用' target='_blank'><span class='jk-app'><img src='"+cdn_url+"images/appewm.png'/></span></a>"
		html+="<a href='http://wpa.qq.com/msgrd?v=3&uin=2905494756&site=qq&menu=yes' target='_blank' class='qq-online'>";
		html+="<span class='kefu'>官方客服QQ:2905494756<br/>  工作日9:00-21:00在线<i></i></span></a>";
		html+="<a href='http://www.wenjuan.com/s/RR7bym/' class='diaocha' target='_blank'></a>";
		//html+="<div class='pewm2' id='pewm2'><span class='lottery-close'></span><a target='_blank' href='http://325.jikexueyuan.com?f=float_img#jkj-jsq'> <img src='"+cdn_url+"activity/jikejie/img/f_jkj.jpg' /></a></div>";//大转盘入口图片
		//html+="<span class='news'>!</span>";
		if(lock!="none")
		{
			var pewm_display	= $('#bannerbox').length <= 0 ? '' : 'style="display:none;"';
			html+="<img src='"+cdn_url+"images/ewap.jpg' class='pewm' id='pewm' "+pewm_display+" />";
		}
		html+="</div>";
		//获取返回顶部元素对象
		var version=" <div class='text' id='ie-test'>您的浏览器版本太低，为了获得更好的浏览体验！<br/>我们建议您升级浏览器或者使用Chrome、Firefox、Safari浏览器</div>";


		function showPop(id){
			if( $(window).height() < 490+340 && $(window).scrollTop() <= 490 )
			{
				$(id).fadeOut();
			}
			else
			{
				$(id).fadeIn();
			}
		}
		var pewmDisplay = function() {
			var lock =JKXY.Cookie.get("pewm");
			if( lock!="none" && $('#bannerbox').length > 0 )
			{
				showPop('#pewm');
			}
		}


		if($j('#gototop').length == 0){
			$j('body').append(html);
			var html = $j('#gototop');
			pewmDisplay();
		}else{
			var html = $j('#gototop');
		}
		//绑定返回顶部事件
		$('#pewm').on("click",function(){
			$(this).fadeOut();
			JKXY.Cookie.set("pewm","none",1, '/', '.'+ domain(window.location.href) , '');
			$('.erwma').fadeIn();
		});
		$('#pewm2 .lottery-close').on("click",function() {
			$('#pewm2').fadeOut();
		});
		if($j(window).scrollTop() <= 0){
			$j('#gototop>.top').hide();
		}
		html.find('.top').bind('click',function(){
			if($j(window).scrollTop() <= 0) return false;
			$j('body,html').animate({scrollTop:0},200);
			return false;
		});
		html.find('.erwma').bind("mouseover",function(){
			$j('.erwma>img').fadeIn();
			$j('.jk-app img').hide();
			JKXY.CJT.stopEventBubble();
		})
		html.find('.jk-app').bind("mouseover",function(){
			$j('.jk-app img').fadeIn();
			$j('.erwma>img').hide();
			JKXY.CJT.stopEventBubble();
		})
		$j(document).bind("mouseover",function(){
			$j('.erwma>img').stop(true,true)
			$j('.jk-app img').stop(true,true)
			$j('.jk-app img').fadeOut();
			$j('.erwma>img').fadeOut();
		})
		$j(window).scroll(function(){
			if($j(window).scrollTop()>0){
				$j('#gototop>.top').fadeIn();
			}else{
				$j('#gototop>.top').fadeOut();
			}
			pewmDisplay();
		})
		html.find('.news').bind("click",function(){
			if( JKXY.Browser.IE){
				if(JKXY.Browser.IE6 || JKXY.Browser.IE7 || JKXY.Browser.IE8 ){
					if($j('#warningpop').has('#ie-test')){
						return false
					} else{
						$j('#warningpop').append(version);
					}

				}
			}
			$('#warningpop').tooltip("pop", {
				width: 540,
				height:'auto',
				popId: '#warningpop',
				opacity:0.3
			})
		});
		$j('.close-img').bind("click",function(){
			$(this).parent().remove();
		})
	},
	lessonHover:function(){		// 鼠标滑过课程 列表，显示课程详情
		$j(this).find('.jd-line').hide();
		var cricle = $j(this).find('.cricle');
		var deg = $j(this).attr("deg");
		if( $j(this).attr("stop") != 1 )
		{
			var cricle = $j(this).find('.cricle');
			var deg = $j(this).attr("deg");
			new C(cricle, deg);
			$j(this).attr('stop',1);
		}
		var _play = $j(this).find('.lessonplay');
		TweenMax.to(_play, 0.6, {opacity:1,ease:Quart.easeOut});
		var cancel_fav	= $j(this).find('.cancel-favorites');
		if( cancel_fav.length > 0 && cancel_fav.attr('class').indexOf('cancel-stop') < 0 )
		{
			cancel_fav.show();
		}
		var lesson_shoucang	= $j(this).find('.lesson-shoucang');
		if( lesson_shoucang.length > 0 )
		{
			lesson_shoucang.show();
		}

		if(JK_lock==="close"){return false}
		var less = $j(this).children('.lesson-infor');
		var learn1= $j(this).find('.learn-number');
		var learn2 =$j(this).find('.zhongji');
		learn1.show();
		learn2.show();
		less.addClass("lesson-hover");
		$j(this).find('.lessonicon-box').css("bottom","-2px");
		TweenMax.to(less, 0.6, {height:175,ease:Quart.easeOut});
		var _p = less.find("p");
		TweenMax.to(_p, 0.15, { display:"block",height:52, opacity:1,ease:Linear.easeOut});
	},
	lessonOut:function(p, obj){  // 鼠标离开课程列表， 隐藏课程详情
		var obj	= typeof(obj) == 'object' ? obj : $j(this);
		obj.find('.jd-line').show();
		var _play = obj.find('.lessonplay');
		TweenMax.to(_play, 0.6, {opacity:0,ease:Quart.easeNone});
        var cancel_favorites_obj    = obj.find('.cancel-favorites');
		if( cancel_favorites_obj.length > 0 && cancel_favorites_obj.attr('class').indexOf('cancel-stop') < 0 )
		{
            cancel_favorites_obj.hide();
		}
		var lesson_shoucang	= obj.find('.lesson-shoucang');
		if( lesson_shoucang.length > 0 && lesson_shoucang.attr('class').indexOf('ysc') < 0 )
		{
			lesson_shoucang.hide();
		}

		if(JK_lock==="close"){return false}
		var less = obj.children('.lesson-infor');
		var learn1= obj.find('.learn-number');
		var learn2 =obj.find('.zhongji');
		learn1.hide();
		learn2.hide();
		less.removeClass("lesson-hover");
		obj.find('.lessonicon-box').css("bottom","4px");
		TweenMax.to(less, 0.6, {height:88,ease:Quart.easeNone});
		var _p = less.find("p");
		TweenMax.to(_p,0.3 , { height:0,opacity:0,display:'none',ease:Linear.easeNone});
	},
	lessonNavHover:function(){  // 技术问答 左侧列表动态效果
		$j('.lesson-nav dd').mousemove (function(){
			var $this =	$j(this).find('.cateLists-li a');
			TweenMax.to($this,0.4, { marginLeft:"10px",ease:Quart.easeOut});
		})
		$j('.lesson-nav dd').mouseout (function(){
			var $this =	$j(this).find('.cateLists-li a');
			TweenMax.to($this,0.4, { marginLeft:"0px",ease:Quart.easeOut});
		})
	},
	// 填0操作
	fillZero:function( string, repeat, repeat_stuff ) {
		var string	= string.toString();
		var repeat	= repeat ? parseInt(repeat) : 2;
		var repeat_stuff	= repeat_stuff ? repeat_stuff : 0;
		if( string )
		{
			var len		= string.length;
				repeat	= repeat-len ? repeat-len : 0;
				string	= new Array( repeat+1 ).join(repeat_stuff)+string;
		}
		return string;
	},
	getJsDate: function( format ) {  // 得到当前格式化时间
		var format	= format ? format : '%Y年%m月%d日 %H:%i:%s';
		var now		= new Date();
		var year	= now.getFullYear();
		var month	= JKXY.CJT.fillZero( now.getMonth()+1 );
		var days	= JKXY.CJT.fillZero( now.getDate() );
		var hour	= JKXY.CJT.fillZero( now.getHours() );
		var minutes	= JKXY.CJT.fillZero( now.getMinutes() );
		var seconds	= JKXY.CJT.fillZero( now.getSeconds() );

		var time_str	= format.replace( "%Y", year );
			time_str	= time_str.replace( "%m", month );
			time_str	= time_str.replace( "%d", days );
			time_str	= time_str.replace( "%H", hour );
			time_str	= time_str.replace( "%i", minutes );
			time_str	= time_str.replace( "%s", seconds );
		return time_str;
	},
	/*
	 *	@desc 实时动态时间，最后将时间写入到class中，
	 *		format：自定义显示方式。
	 *	%Y=年, %m=月, %d=日, %H=小时%i=分钟%s=秒
	*/
	nowTime:function(cls, format) {
		if( $('.'+cls).length <= 0 )
		{
			clearInterval(tick);
			return false;
		}

		var tick	= setInterval( e_clock, 1000 );
		function e_clock( )
		{
			$('.'+cls).html( JKXY.CJT.getJsDate( format ) );
		}
		e_clock();
	},
	timeCare: function(){
		var ck_key	= "care_tip";
			is_show	= JKXY.Cookie.get(ck_key);
		var care_where_1	= !is_show && typeof( event_stop ) == 'undefined';
		var care_where_2	= (typeof(event_stop) == 'object' && event_stop.usercare === true);
		if( care_where_1 || care_where_2 )
		{
			var date	= new Date();
			var data	= {'time': parseInt(date.getTime()/1000), 'date':JKXY.CJT.getJsDate( '' ) };
			$.getJSON("/Ajax/getTakeCareUser?jsoncallback=",data, function(result){
				if( result.status && result.info.msg )
				{
					showCare( result.info.msg );
				}
			});
		}

		// 显示提示
		function showCare( msg )
		{
			var msg		= msg ? msg : '亲爱的VIP，这是来自极客学院小雪的问候~';
			var id		= "timeCare";
			var html;
				html	= '<div class="web-dia-tip" id="'+id+'" >';
					html	+= '<p class="jkxy_hello">'+msg+'</p>';
					html	+= '<p class="jkxy_time">当前时间：</p>';
				html	+= '</div>';
			$('body').append( html );

			JKXY.CJT.nowTime( 'jkxy_time', '当前时间：%Y年%m月%d日 %H:%i:%s' );
			var _W	= $(window).width()/2 - $('#'+id).width()/2 - 20;
			$('#'+id).css("marginLeft", _W);
			$('#'+id).animate({top:"0px",opacity:1},300,function(){
				$('#'+id).delay(5000).animate({top:"-50px",opacity:0},500,function(){
					$('#'+id).remove();
				});
			});
		}
		// 加入钟表
	}
}


/**
 * Cookie相关操作
 * @namespace Cookie
 * @name JK.Cookie
 * @static
 */
JKXY.Cookie = {
	/**
	 * 获取Cookie内容
	 * @name JK.Cookie.get
	 * @function
	 * @grammar JK.Cookie.get(name)
	 * @param {String} name Cookie键名
	 *
	 * @return {String} Cookie值
	 */
    cokpre:'sso_',
	get: function( name ) {
		var nameEQ = this.cokpre+name + '=';
		var ca = document.cookie.split(';');	// 把cookie分割成组
		for ( var i=0;i < ca.length; i++ ) {
			var c = ca[ i ];					// 取得字符串
			while ( c.charAt(0) == ' ' ) 		//	判断下字符串有没有前导空格
				c = c.substring( 1 , c.length );	// 有的话，从第二位开始取
			if ( c.indexOf( nameEQ ) == 0 ) {		// 如果含有我们要的name
				var ret;
				try{
					ret = unescape( c.substring( nameEQ.length , c.length ) );   // 解码并截取我们要值
				} catch(e) {
					ret = unescape( c.substring( nameEQ.length , c.length ) );
				}
			return ret;
			}
		}
		return null;
	},
	/**
	 * 设置Cookie内容
	 * @name JK.Cookie.set
	 * @function
	 * @grammar JK.Cookie.set(name , value[ , days , path , domain , secure])
	 * @param {String} name Cookie键名
	 * @param {String} value Cookie键值
	 * @param {Int} days Cookie有效期天数
	 * @param {String} path Cookie有效路径
	 * @param {String} domain Cookie有效域
	 * @param {Boolean} secure 是否安全Cookie
	 * @remark 兼容了编码为GBK时的Cookie读取失败的问题 2014-10-11 caojiangtao
	 */
	set : function( name , value , days , path , domain , secure ) {
	var expires;
	if ( typeof days =="number" ) {
		if(days>0){
			var date = new Date();
			date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
			expires = date.toGMTString();
		}
	} else if ( typeof days =="String" ) {
		expires = days;
	} else {
		expires = false;
	}
	document.cookie = this.cokpre+name + '=' + escape( value ) +
		(expires ? (';expires=' + expires)	: '') +
		(path ? (';path=' + path) : '') +
		(domain ? (';domain=' + domain) : '') +
		(secure ? ';secure' : '');
	},
	/**
	 * 删除Cookie内容
	 * @name JK.Cookie.del
	 * @function
	 * @grammar JK.Cookie.del(name[ , path , domain , secure])
	 * @param {String} name 要删除的Cookie键名
	 * @param {String} path Cookie有效路径
	 * @param {String} domain Cookie有效域
	 * @param {Boolean} secure 是否安全Cookie
	 */
	del : function( name , path , domain , secure ) {
		JKXY.Cookie.set( name , '' , -1 , path , domain , secure );
	}
};

/**
 * 获取主机名称
 * @function
 * @param {String} url 网址
 * 调用 JKXY.host.domain("http://www.jikexueyuan.com/"); return "jikexueyuan.com"
 * 调用 JKXY.host.domain_pre("http://www.jikexueyuan.com/");  return "www"
 * 调用 JKXY.host.domain_arr("http://www.jikexueyuan.com/"); return ["www", "jikexueyuan", "com"]
 */
JKXY.host = {
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
		hosts = hosts[1];
		d_arr = hosts.split('.');
		return d_arr;
	}
};

/**
 * 不懂什么意思
 * 有调用： 加入注册入口标记 JKXY.statis.init();
 */
JKXY.statis = {
		//输入点位置 初始化
		init:function(){
			$('a').on('click',function(){
				if(typeof($(this).attr('postion')) != 'undefined'){
					try{
					var host_arr = JKXY.host.domain_arr(window.location.href);
					var host = '.'+host_arr[1]+ '.' + host_arr[2];
					
					JKXY.Cookie.set('sso_postion',$(this).attr('postion'),0,'/',host);
					}catch(e){
						return false;
					}
				}
			})
		}
};


/**
 * 密码强度检测
 */
var pwdStrong	= {
	level:['', '太简单了', '一般般', '很安全'],
	main: function( jq_obj, val ) {
		if( val == '' )
		{
			return 0;
		}
		var jq_obj	= jq_obj;
		var strongRegex	= new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
		var mediumRegex	= new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
		var enoughRegex	= new RegExp("(?=.{6,}).*", "g");
		if ( false == enoughRegex.test(val) )
		{
			return 1;
		}
		else if (strongRegex.test(val))
		{
			return 3;
		}
		else if (mediumRegex.test(val))
		{
			return 2;
		}
		else
		{
			return 1;
		}
		return false;
	},
	genReport:function( jq_obj, val ) {
		if( typeof(jq_obj) && jq_obj )
		{
			var level_id	= pwdStrong.main( jq_obj, val );
			pwdStrong.handleReport( jq_obj, level_id );
			if( typeof( callBack ) == 'function' )
			{
				callBack( jq_obj, level_id );
			}
		}
	},
	callBack: '',
	handleReport: function( jq_obj, level_id ) {

		jq_obj.next('.pwd-strong').find('span').each(function(){
			if( $(this).attr('level') <= level_id )
			{
				$(this).removeClass('active').addClass('active');
			}
			else
			{
				$(this).removeClass('active');
			}
		});

	}
};
/**
 * 密码加密
 */ 
JKXY.safeCode = {
		init:function(obj){
			var obj = obj;
			var data = {isajax:1};
			$.post('/sso/genPwdVerify',data,function(json){
				obj.val(json.code);
			},'json');
		},
		//规避生成“+”号的加密密码	551434 504396
		aesCode : function(pwd,safecode){
			if( pwd && safecode )
			{
				var key_hash	= CryptoJS.MD5(safecode);
				var key			= CryptoJS.enc.Utf8.parse(key_hash);
				var iv			= CryptoJS.enc.Utf8.parse(key_hash.toString().substr(1^1, 16));
				var passworded	= CryptoJS.AES.encrypt(pwd.length+'|'+pwd, key, {iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding});
				passworded	= passworded.toString();
				//passworded	= passworded.replace( /(\+)/g, '*' );
				//passworded	= passworded.replace( /(\s)/g, '|' );
				return passworded;
			}
			return false;
		}
}
/**
 * 用户最新欢的课程及收藏
 */
$j(function(){
	JKXY.CJT.init();
	// obj -> 点击对象
	// res -> 用户点击之后的返回结果值
	JKXY.userdoCBFuncFavoritesCourse	= function( obj, res ) {
		var lesson_shoucang	= ( obj.attr('class').indexOf('lesson-shoucang') >= 0 ? true : false );
		var cancel_fav		= ( obj.attr('class').indexOf('cancel-favorites') >= 0 ? true : false );
		var user_home		= typeof(JKXY.user_home)!='undefined' ? JKXY.user_home : false;
		var no_content_fav	= typeof(JKXY.no_content_fav)!='undefined' ? JKXY.no_content_fav : '';
		if( res.info.status >= 1 )
		{
			// 课程卡左上角图标
			if( lesson_shoucang === true )
			{
				obj.addClass('ysc');
			}
			// 课时播放器的收藏动作
			if( obj.hasClass('shouchang') || obj.hasClass('sc_btn') )
			{
				$('.shouchang').attr('s', 1).find('i').addClass("ysc");
				$('.sc_btn').html('已收藏').addClass('sc_btn_favor');
			}
			// 学习中心收藏课程
			if( user_home === true )
			{
				var home_course_obj	= $('#home_course');
				home_course_obj.find('li').each(function(){
					if( res.info.other.oid == $(this).attr('courseid') )
					{
						$(this).find('.lesson-shoucang').addClass('ysc');
						var home_my_fav_obj	= $('#home_my_fav');
						var goon 			= true;
						home_my_fav_obj.find('li').each(function(){
							if( $(this).attr('courseid') == res.info.other.oid )
							{
								goon	= false;
							}
						});
						if( goon === true )
						{
							var course_copy		= $(this).clone();
							home_my_fav_obj.find('.no-contnet-block').remove();
							course_copy.find('.lesson-shoucang').remove();
							course_copy.find('.cancel-favorites').removeClass('cancel-stop').attr({oid:res.info.other.oid,s:1}).on("click", function(){
								userDoItFunc($(this));
							});
							JKXY.CJT.lessonOut( {}, course_copy );
							home_my_fav_obj.append( course_copy );
							course_copy.hover(
								JKXY.CJT.lessonHover,
								JKXY.CJT.lessonOut
							);
						}
					}
				});
			}
		}
		else
		{
			if( obj.hasClass('shouchang') || obj.hasClass('sc_btn')  )
			{
				$('.shouchang').attr('s', 0).find('i').removeClass("ysc");
				$('.sc_btn').removeClass('sc_btn_favor').html('收藏');
			}
			if( lesson_shoucang === true )
			{
				obj.removeClass('ysc');
			}
			// 学习中心【我收藏的课程】取消收藏
			if( cancel_fav === true || user_home === true )
			{
				var home_my_fav_obj	= $('#home_my_fav');
				if( home_my_fav_obj.find('li').length > 1 )
				{
					home_my_fav_obj.find('li').each(function(){
						if( res.info.other.oid == $(this).attr('courseid') )
						{
							$(this).remove();
						}
					});
				}
				else
				{
					home_my_fav_obj.html( no_content_fav );
				}
				var home_course_obj	= $('#home_course');
					home_course_obj.find('li').each(function(){
						if( res.info.other.oid == $(this).attr('courseid') )
						{
							$(this).find('.lesson-shoucang').removeClass('ysc');
						}
					});
			}
		}
	};
	$('.user-action').on("click", function(){
	//$('#wiki_lists').delegate('.user-action' , "click", function(){
		userDoItFunc( $(this) );
	});
	//$('.user-action').on("click", function(){
	$('#wiki_lists').delegate('.user-action' , "click", function(){
		userDoItFunc( $(this) );
	});
	function userDoItFunc(obj)
	{
		if( typeof(obj) == 'undefined' )
		{
			return false;
		}
		var obj		= obj;
		var mid		= obj.attr('mid');
		var oid		= obj.attr('oid');
		var s_now	= obj.attr('s');
		var cls_y	= obj.attr('clsy');
		var cls_n	= obj.attr('clsn');
		var oper	= obj.attr('oper');
		function btnDefault()
		{
			obj.attr('stop', 0);
		}
		function btnStop()
		{
			obj.attr('stop', 1);
		}

		if( mid && oid )
		{
			if( obj.attr('stop') == 1 )
			{
				return false;
			}

			btnStop();
			var data	= '&mid='+mid+'&oid='+oid+'&s_now='+s_now+'&cls_y='+cls_y+'&cls_n='+cls_n+'&oper='+oper;
			var sub_url	= '/ajax/userDoIt?'+Math.random();
			$.ajax({url: sub_url+Math.random(), data: data, dataType: 'json', type: 'POST',
				success: function(res){
					if( res.status )
					{
						btnDefault();
						var func_string	= res.info.callBackFunc;
						var callBackFunc= new Function( 'return JKXY.'+func_string+';')();
						if( typeof( callBackFunc ) == 'function' )
						{
							if( res.info.status )
							{
								obj.attr('s', 1);
							}
							else
							{
								obj.attr('s', 0);
							}
							callBackFunc(obj, res);
						}
						else
						{
							if( res.info.status )
							{
								obj.attr('s', 1).removeClass(cls_n).addClass(cls_y);
							}
							else
							{
								obj.attr('s', 0).removeClass(cls_y).addClass(cls_n);
							}
						}
					}
					else
					{
						btnDefault();
						if( res.info.msg.indexOf('登录') >= 0 )
						{
							loginpop.pop();
						}
						JKXY.CJT.login(1, res.info.msg);
					}
				}
			});
		}
		else
		{
			btnDefault();
		}
	}
	JKXY.statis.init();
});

/**
 * 检测 邮箱 密码 验证码
 */
(function($) {
	/**
	 * 检测输入框是否为空
	 * @function
	 * @param {String} txt 输入框为空时的提示信息
	 * @name $.fn.ckEmpty
	 */
	$.fn.ckEmailEmpty =function(txt){
		var $this = $(this);
		var val = $(this).val().trim();
		if(val == ''){
			$this.next('.warning').remove();

            if(arguments.length == 0){		// 实参为空 显示默认提示
                $this.after("<span  class='warning empty' cktype='false'>请输入邮箱</span>");
            } else{							// 否则 显示输入的提示
                $this.after("<span  class='warning empty'  cktype='false'>"+txt+"</span>");
            }

			$this.bind("focus",function(){
				$this.next('.warning').remove();
			})
			return false;
		} else{
			return true;
		}
	},
	/**
	 * 邮箱检测
	 * @function
	 * @param {String} url 检测邮箱是否存在传入后台地址
	 * @param {String} type 没看懂干什么用的
	 */

	$.fn.ckEmail = function(url,type) {  //邮箱检测
		if(type!= null){				// type  触发事件类型
			$(this).bind(type,checkEmail);
		} else{
			(this).bind("focusout",checkEmail);
		}
		function checkEmail(){
			$(this).next('.warning').remove();
			$(this).after("<span  class='warning'></span>")
			var val = $(this).val().trim();
			var check =  /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/.test( val );
			if(check){		// 邮箱格式正确时
				if(url != null){		// $.post 验证邮箱的唯一性
					var $this = $(this);
					$.post(url,{ 'email':val, 'isajax':1},function(data){
						if(data.status == '1'){
							//console.log($(this))
							$this.next(".warning").removeClass('wrong').addClass("right").html("");
							$this.next(".warning").attr("cktype","true");
							return true
						}else{
							$this.next(".warning").removeClass('right').addClass("wrong").html("邮箱已存在");
							$this.next(".warning").attr("cktype","false");
							return false;
						}
					},'json');
				} else{
					$(this).next(".warning").addClass("right").html("");
					$(this).next(".warning").attr("cktype","true");
				}

			}else{		// 邮箱格式不正确时
				$(this).next(".warning").addClass("wrong").html("邮箱输入有误");
				$(this).next(".warning").attr("cktype","false");
			}
		}
	};
	/**
	 * 检测密码是否为空 可用 ckEmailEmpty();
	 */ 
	// $.fn.ckPassWordEmpty=function(){
	// 	var $this = $(this);
	// 	var val = $(this).val().trim();
	// 	if(val == ''){
	// 		$this.next('.warning').next('.warning').remove();
	// 		$this.next('.warning').after("<span  class='warning empty' cktype='false'>请输入密码</span>");
	// 		$this.bind('focus',function(){
	// 			$this.next('.warning').next('.warning').remove();
	// 		});
	// 		return false;
	// 	} else{
	// 		$this.next().next('.warning').remove();
	// 		$this.next().after("<span class='warning right' cktype='true'></span>");
	// 		return true;
	// 	}
	// }
	/**
	 * 检测 用户中心的密码是否为空 可用 ckEmailEmpty();
	 */ 
	// $.fn.ckPassWordEmptyByUcenter = function(){
	// 	var $this = $(this);
	// 	var val	= $(this).val().trim();
	// 	if(val == '')
	// 	{
	// 		$this.next().next('.warning').remove();
	// 		$this.next().after("<span class='warning wrong mar-l90' cktype='false'>密码不能为空</span>");
	// 		$this.bind('focus',function(){
	// 			$this.next().next('.warning').remove();
	// 		});
	// 		return false;
	// 	} else{
	// 		$this.next().next('.warning').remove();
	// 		$this.next().after("<span class='warning right mar-l90' cktype='true'></span>");
	// 		return true;
	// 	}
	// };

 	/**
 	 * 密码重复对比校验
 	 * 调用 ('.ckrpeatPassWrod').ckrpeatPassWrod('.new-pw','.repeat-pw')
 	 * 和ckRepassword 一样
 	 */ 
    // $.fn.ckrpeatPassWrod = function(a,b,type){
    //     if(type != null) {
    //         $(this).bind(type, test)
    //     }else{
    //         $(this).bind('focusout', test)
    //     }
    //     function test(){

    //         var pw1 = $.trim($(a).val());
    //         var pw2 = $.trim($(b).val());
    //         console.log(pw1+"="+pw2)
    //         if(pw1!= ''&& pw2 != '' ){
    //             if( pw1 === pw2){
    //                 $(this).next().next('.warning').remove();
    //                 $(this).next().after("<span class='warning right' cktype='true'></span>");
    //                 return true;
    //             } else{
    //                 $(this).next().next('.warning').remove();
    //                 $(this).next().after("<span class='warning wrong' cktype='false'>密码不一致</span>");
    //                 return false;
    //             }
    //         }

    //     }

    // }
	/**
	  * 检测密码 强度
	  */	
	$.fn.ckPassWord = function(s){   //密码强度检测 "stong"为检查强弱度

		var STRONG = '<div class="safety pwd-strong">'
		STRONG+='<span class="level-1" level="1">弱</span>'
		STRONG+='<span class="level-2" level="2">中</span>'
		STRONG+='<span class="level-3" level="3">强</span> </div>';
        $this = $(this);

        if(s == "strong"){
            $('.pwd-strong').remove();
            $this.after(STRONG);
            $this.bind("keyup",function(){
                var val	= $this.val().trim();
                pwdStrong.passwordLen(val);
                pwdStrong.genReport( $this, val );
            })
            $(this).bind('focusout',function(){
                var val	= $this.val().trim();
                pwdStrong. passwordSix(val)
            })
        } else if(arguments.length == 0) {
            $this.bind("keyup",function(){
                var val	= $this.val().trim();
                pwdStrong.passwordLen(val);

            })
            $(this).bind('focusout',function(){
                var val	= $this.val().trim();
                if(val != ''){
                    pwdStrong. passwordSix(val)
                }

            })
        }

	};

	/**
	 * 检测确认密码是否为空 可用 ckEmailEmpty();
	 */ 
	// $.fn.ckRepasswordEmpty	= function(){
	// 	var $this	= $(this);
	// 	var val		= $(this).val().trim();
	// 	if(val == '')
	// 	{
	// 		$this.next('.warning').remove();
	// 		$this.after("<span  class='warning wrong mar-l90' cktype='false'>请再次输入一遍确认密码</span>");
	// 		$this.bind("focus",function(){
	// 			$this.next('.warning').remove();
	// 		})
	// 		return false;
	// 	}
	// 	else
	// 	{
	// 		return true;
	// 	}
	// }

	/**
	 * 保证确认密码和密码一致
	 * 调用 pwd_obj_re.ckRepassword( pwd_obj );
	 */ 
	$.fn.ckRepassword	= function(source_pwd_obj){
		$(this).bind("focusout", checkRePassword);

		function checkRePassword()
		{
			$(this).next('.warning').remove();
			$(this).after("<span  class='warning'></span>");

			var val		= $(this).val().trim();
			if( val && source_pwd_obj.val() == val )
			{
				$(this).next(".warning").addClass("right").html("");
				$(this).next(".warning").attr("cktype","true");
			}
			else
			{
				$(this).next(".warning").addClass("wrong mar-l90").html("保证两次密码输入一致");
				$(this).next(".warning").attr("cktype","false");
			}
		}
	}

	/**
	 * 检测验证码是否为空 可用 ckEmailEmpty();
	 */
	// $.fn.checkSafeEmpty = function(){
	// 	var $this = $(this);
	// 	var val = $(this).val().trim();
	// 	if(val == ''){
	// 		$this.parent().find('.warning').remove()
	// 		$this.parent().append("<span  class='warning empty' cktype='false'>请输入验证码</span>");
	// 		$this.bind("focus",function(){
	// 			$this.parent().find('.warning').remove()
	// 		})
	// 		return false;
	// 	} else{
	// 		return true;
	// 	}

	// };

	/**
	 * 验证码检测
	 * @function
	 * @param {String} url ajax 验证路径
	 * @param {String} type 触发事件的事件名 不填默认 focusout
	 */
	$.fn.checkSafe = function( url,type){  //检测验证码  验证码图片和 换一张的class要求一致
		$('body').delegate('.security-code,.warning-word','click',function(){	// 点击验证码刷新
			var timenow = new Date().getTime();
			$('.security-code>img').attr("src", '/verify/show.html?'+timenow);
		})
		var $this = $(this);
		if(type != null){
			$(this).bind(type, safe)
		} else{
			var _class = $(this).selector;	// 获取当前对象的class
			$('body').delegate(_class,"focusout",safe);
			//$(this).bind("keyup", safe)

		}

		function safe(){
			var obj = $(this);
			var val = obj.val().trim();

			if(val == ''){
				obj.parent().find('.warning').remove()
				obj.parent().append("<span  class='warning empty' cktype='false'>请输入验证码</span>");
				return false
			} else{
				$.post(url,{safecode:val},function(data){
					if(data == true){
						obj.parent().find('.warning').remove();
					} else{
						obj.parent().find('.warning').remove()
						obj.parent().append("<span  class='warning wrong' cktype='false'>验证码错误</span>");
						$('.security-code').click();
					}
				},'json');

			}
		}


	}

	/**
	 * 手机号检测
	 */ 
	$.fn.ckPhone	= function(type) {
		if(type!= null){
			$(this).bind(type, isPhone);
		}else{
			$(this).bind("focusout", isPhone);
		}

		function isPhone(){
			$(this).next('.warning').remove();
			$(this).after("<span  class='warning'></span>");

			var val		= $(this).val().trim();
			var preg	= /^(1[0-9])\d{9}$/;
			var check	= preg.test( val );
			if( check )
			{
				$(this).next(".warning").addClass("right").html("");
				$(this).next(".warning").attr("cktype","true");
			}
			else
			{
				$(this).next(".warning").addClass("wrong").html("手机号码输入错误");
				$(this).next(".warning").attr("cktype","false");
			}
			if( val == '' )
			{
				$(this).next(".warning").addClass("right").html("");
				$(this).next(".warning").attr("cktype","false");
			}
		}
	};

	String.prototype.rTrim=function(){	//去右空格
		var re_r=/([.\w]+)[ ]*$/;
		return this.replace(re_r,"$1");
	}
	String.prototype.lTrim=function(){	//去左空格
		var re_l=/^[ ]+(.+)/;
		return this.replace(re_l,"$1")
	}
	String.prototype.trim=function(){	 //去左右空格
		return this.lTrim().rTrim()
	}
})(jQuery);


/**
 * 登录弹出框 
 */
var loginpop = {
	init: function () {
		this.bindEle();
	},
	popHtml: function () {
		var html = '<div id="login-pop" class="dialog">';
		html += '<div class="dialog-box">';
		html += ' <h3><i class="popclose"></i>登录</h3>';
		html += '<div class="pop-input-list">';
		html += '<div class="dialog-tabs"><ul>';
		html += '<li id="memberLoginPop" class="curr">会员登录</li>';
		html += '<li id="phoneLoginPop">免注册登录</li></ul></div>';
		html += ' <ul style="height:170px;">';
		html += ' <li> <img src="'+ cdn_url +'images/right.png" class="right" style="display: none">';
		html += ' </li><li>';
		html += ' <input type="text" placeholder="邮箱/用户名/手机号" class="user-name" id="user-name"/>';
		html += '<p class="color-red pop-warning"></p>';
		html += ' </li>';
		html += ' <li>';
		// html+=' <img src="'+ cdn_url +'images/right.png" class="right">';
		html += ' <input type="password" placeholder="密码" class="user-password" id="user-password" size="32"/>';
		html += ' <input type="hidden"  id="verifypwd" name="verifypwd" />';
		html += '<p class="color-red pop-warning2"></p>';
		html += ' </li>';
		html += ' <li class="cf">';
		html += '<input type="text" style="width:94px" class="input-tow uer-safe" placeholder="验证码" />';
		html += ' <div class="security-code"> <img src="/verify/show.html"></div>';
		html += '<span class="warning-word"> 看不清楚？换一张</span>';
		html += '<span class="color-red pop-warning4" cktype="false" style="display: none"></span>';
		html += ' </li></ul>';
		html += ' <div class="inputbox cf">';
		html += '<div class="sevenday"><i class="choose-this checkbox"></i>7天内免登录 <a href="/sso/password.html" >忘记密码？</a></div>';
		html += ' </div> <button class="greenbtn mar-b20" id="loginbtn">登录</button>';
		html += '  <div class="no-zhanghao">还没有账号？<a href="javascript:void(0)" class="regnow">立即注册</a></div>';
		html += '<h4 class="mar-b20 mar-t20">用第三方账号<span style="color: #35b558">直接登录</span>，无需注册</h4>';
		html += ' <ul class="login-three cf">';
		html += ' <li><a href="'+ qq_login_url +'"><img src="'+ cdn_url +'images/qq-s.png"><span>QQ账号登录</span></li>';
		html += ' <li><a href="'+ wx_login_url +'"><img src="'+ cdn_url +'images/wx-s.png"><span>微信账号登录</span></li>';
		html += '<li><a href="'+ weibo_login_url +'"><img src="'+ cdn_url +'images/sina-s.png"><span>新浪账号登录</span></li>';
		html += ' <li><a href="'+ eoe_login_url +'"><img src="'+ cdn_url +'images/eoe-s.png"><span>eoe账号登录</span></li>';
		
		html += '</ul>'
		html += ' </div>';
		html += '</div>';
		html += '</div>';
		return html;
	},
	bindEle: function () {
		$('.diaLoginBtn').bind("click", this.pop)
	},
	pop: function () {
		$().tooltip("pop", {
			width: 420,
			height: 548,
			popId: '#login-pop',
			opacity: 0.4,
			popHtml: loginpop.popHtml(),
			popFunc: loginpop.tijiao()
		})
		JKXY.safeCode.init($('#login-pop').find('input[name=verifypwd]'));
	},
	tijiao: function () {
		
		//$('.uer-safe').checkSafe('/sso/checkSafeCode');//验证码检测
        $('body').delegate('.security-code,.warning-word','click',function(){
            var timenow = new Date().getTime();
            $('.security-code>img').attr("src", '/verify/show.html?'+timenow);
        })
		var _day = 7;
		$('body').delegate('.checkbox', 'click', function () {
			if ($('.checkbox').hasClass("choose-this")) {
				$('.checkbox').removeClass("choose-this");
				_day = 0;
			} else {
				$('.checkbox').addClass("choose-this");

				_day = 7;
			}
		})

		var lock = 0;



		$('body').delegate('#loginbtn', "click", loginFun);


        function loginFun(){
            if (lock == 1) return false;
            var username = $.trim($('#user-name').val());
            var userpassWord = $.trim($('#user-password').val());
            var uersafe = $.trim($('.uer-safe').val());
            $('#user-name').bind("focus", function () {
                $('.pop-warning').empty();
            });
            $('#user-password').bind('focus', function () {
                $('.pop-warning2').empty();
            });
            $('.uer-safe').bind('focus', function () {
                $('.pop-warning4').empty();
            })
            if (username == "") {
                $('.pop-warning').html("邮箱/用户名/手机号不能为空！");
            } else if (userpassWord == "") {
                $('.pop-warning2').html("密码不能为空！");
            } else if (uersafe == "") {
                $('.pop-warning4').html("请输入验证码！").show();
            } else {
                $.post('/sso/checkSafeCode',{safecode: $.trim($('.uer-safe').val())},function(data){
                    if(data == true) {
                        lock = 1;
                        var url = "/sso/chklogin";
                        var username = $.trim($('#user-name').val());
                        var userpassWord = $.trim($('#user-password').val());
                        var uersafe = $.trim($('.uer-safe').val());
                        var data = {
                            'username': username,
                            'password': JKXY.safeCode.aesCode(userpassWord,$('#login-pop').find('input[name=verifypwd]').val()),
                            'verify': uersafe,
                            'isajax': 1,
                            'authcode': _day
                        }
                        $.post(url, data, function (data) {
                            if (data.status == '1') {
                                JKXY.msgBox(1, data.info, 2000, function () {
                                   lock = 0;
                                })
                                delayJumpUrl(data.jumpUrl, 2000);
                            } else {
                                JKXY.msgBox(0, data.info, 2000, function () {
                                    lock = 0;
                                });
                                $('.security-code').click();
                                $('.uer-safe').val('');
                            }
                            //lock = 0;

                        }, 'json');
                    }else {
                        $('.pop-warning4').html("验证码错误！").show();
                        $('.security-code').click();
                    }
                }, 'json');

            };

        }


	}
}

/**
 * 手机登录弹窗
 */ 
var phone_cookie_life_time = 7;		//手机登录 cookie 生存时间
var phoneloginpop = {
	init: function () {
		this.bindEle();
		$("body").delegate("#mobileMessage" , 'click' , send_phone);
		$("body").delegate("#free_reg_phone_login" , 'click' , function() {
			free_reg_phone_login();
			set_Cookie();
		});
		$('body').delegate('#save_phone', 'click', phoneloginpop.chkbox);
	},
	popHtml: function () {
		var html = '<div id="login-pop" class="dialog pop-login-phone">';
		html += '<div class="dialog-box" id="checkPhoneForm">';
		html += '<h3><i class="popclose"></i>登录</h3>';
		html += '<div class="pop-input-list">';
		html += '<div class="dialog-tabs"><ul>';
		html += '<li id="memberLoginPop">会员登录</li>';
		html += '<li id="phoneLoginPop" class="curr">免注册登录</li></ul></div>';
		html += '<ul class="login-phone-form" style="height:170px;">';
		//html += '<li><img src="'+ cdn_url +'images/right.png" class="right" style="display: none"></li>';
		html += '<li>';
		//html += '<input type="text" placeholder="手机号" class="user-name" id="user-name"/>';
		html += '<input type="text" name="email"  class="user-name" placeholder="手机号" id="phoneNum" tabindex="1" />';
		//html += '<p class="color-red pop-warning"></p>';
		html += '</li><li>';
		//html += '<input type="text" class="input-tow uer-safe" placeholder="动态码" />';
		html += '<input type="text" class="input-tow uer-safe" size="32"  tabindex="2" name="phone_code" id="phone_code" />';
		//html += '<a href="javascript:;" class="getcode" id="getcodeBtn">免费获取动态码</a>';
		html += '<a href="javascript:void(0);" class="freevip-form-btn freebtn-btn-green getcode" id="mobileMessage" >发送短信验证码</a>';
		//html += '<p class="color-red pop-warning2"></p>';
		html += '</li><li>';
		//html += '<input type="text" class="input-tow uer-safe" placeholder="验证码" />';
		html += '<input type="text" style="width:94px" class="input-tow safe-number uer-safe" size="32" id="checkCode" tabindex="3" placeholder="验证码"/>';
		html += '<div class="security-code"> <img src="/verify/show.html"></div>';
		html += '<span class="warning-word"> 看不清楚？换一张</span>';
		html += '<input type="hidden" name="login_type" id="login_type" value="free_reg" />';
		//html += '<p class="color-red pop-warning3"></p>';
		html += '</li></ul>';
		html += '<div class="inputbox cf">';
		html += '<div class="sevenday"><i class="choose-this" id="save_phone"></i>记住手机号 <a href="/sso/password.html" >忘记密码？</a></div>';
		html += '</div> <button class="greenbtn mar-b20" id="free_reg_phone_login" tabindex="4">登录</button>';
		html += '<div class="no-zhanghao">还没有账号？<a href="javascript:void(0)" class="regnow">立即注册</a></div>';
		html += '<h4 class="mar-b20 mar-t20">用第三方账号<span style="color: #35b558">直接登录</span>，无需注册</h4>';
		html += '<ul class="login-three cf">';
		html += '<li><a href="'+ qq_login_url +'"><img src="'+ cdn_url +'images/qq-s.png"><span>QQ账号登录</span></li>';
		html += '<li><a href="'+ wx_login_url +'"><img src="'+ cdn_url +'images/wx-s.png"><span>微信账号登录</span></li>';
		html += '<li><a href="'+ weibo_login_url +'"><img src="'+ cdn_url +'images/sina-s.png"><span>新浪账号登录</span></li>';
		html += '<li><a href="'+ eoe_login_url +'"><img src="'+ cdn_url +'images/eoe-s.png"><span>eoe账号登录</span></li>';
		html += '</ul>'
		html += '</div>';
		html += '</div>';
		html += '</div>';
		return html;
	},
	bindEle: function () {
		$('body').delegate('#phoneLoginPop:not(".curr")', 'click', function() {
			 $('.popclose').click();
			 phoneloginpop.pop();
		});
	},
	pop: function () {
		$().tooltip("pop", {
			width: 420,
			height: 548,
			popId: '#login-pop',
			opacity: 0.4,
			popHtml: phoneloginpop.popHtml(),
            closePop: function() {
        			$("body").delegate("#mobileMessage" , 'click' , send_phone);
            },
            popFcun: function() {
            }
		})
		get_Cookie();
		JKXY.safeCode.init($('#login-pop').find('input[name=verifypwd]'));
	},
	chkbox: function() {
		if ($('#save_phone').hasClass("choose-this")) {
			$('#save_phone').removeClass("choose-this");
			phone_cookie_life_time = 0;
		} else {
			$('#save_phone').addClass("choose-this");
			phone_cookie_life_time = 7;
		}
	},
	
}
$(function(){
	phoneloginpop.init();
	$('body').delegate('#memberLoginPop:not(".curr")', 'click', function() {
		 $('.popclose').click();
		 loginpop.pop();
	});
})


//发送短信
function send_phone() {
	var phone_input_obj	= $('#phoneNum');
	if( !phone_input_obj.val().trim() )
	{
		phone_input_obj.nextAll('.warning,.pop-warning').remove();
		phone_input_obj.after("<span  class='warning'></span>");
		phone_input_obj.next(".warning").addClass("wrong").html("请输入手机号");
		phone_input_obj.next(".warning").attr("cktype","false");
		return false;
	}

	var val		= phone_input_obj.val().trim();
	var preg	= /^((\(\d{2,3}\))|(\d{3}\-))?(1[34578]\d{9})$/;
	var check	= preg.test( val );
	if (isMobile(phone_input_obj.val().trim()) == false) {
		var phone_input_obj = $(".user-name");
		phone_input_obj.next('.warning').remove();
		phone_input_obj.after("<span  class='warning'></span>");
		phone_input_obj.next(".warning").addClass("wrong").html("手机号格式错误！！");
		phone_input_obj.next(".warning").attr("cktype","false");
		return false;
    }

	if( check )
	{
		var btn_obj		= $(this);
		var form_obj	= $('#checkPhoneForm');
		var btnDefault	= {html:'发送短信验证码', addCls:'freebtn-btn-green', removeCls:'freebtn-btn-stop'};;
		var btnStop		= {html:'短信发送中~', addCls:'freebtn-btn-stop', removeCls:'freebtn-btn-green'};
		JKXY.member.mobileMessage_login( form_obj, btn_obj, btnDefault, btnStop );
	}
	else
	{
		phone_input_obj.next('.warning').remove();
		phone_input_obj.after("<span  class='warning'></span>");
		phone_input_obj.next(".warning").addClass("wrong").html("手机号码输入错误");
		phone_input_obj.next(".warning").attr("cktype","false");
	}
}

/**
 * 免注册 手机号直接登录
 */
function free_reg_phone_login(){
    var testEmail =$("input[name='email']").ckEmailEmpty("手机号不能为空");
    if(testEmail == true){
        var testsafe = $("input.safe-number").checkSafeEmpty();
        if(testsafe== true  ){
            $.post('/sso/checkSafeCode',{safecode: $.trim($('.safe-number').val())},function(data){
                if(data == true){
                    lock = 1;
                    var url="/sso/chklogin";
                    var email = $("input[name='email']").val().trim();
                    var phone_code= $("input[name='phone_code']").val().trim();
                    var safeNumber = $("input.safe-number").val().trim();
                    var login_type = $("#login_type").val();
                    var _day = '';
                    var data ={
                        'username':email,
                        'verify': safeNumber ,
                        'isajax' :1,
                        'authcode' :1,
                        'autoLogin' : _day,
                        'login_type' : login_type,
                        'phone_code' : phone_code,
                    };
                    $.post(url, data, function (data) {
                        if (data.status == '1') {
                            window.location.href = data.jumpUrl;
                        } else {
                            JKXY.msgBox(0, data.info, 2000, function () {
                                lock = 0;
                            });
                            $('.security-code').click();
                            $('.safe-number').val('');
                        }
                    }, 'json');
                } else{
                    $(this).parent().find('.warning').remove()
                    $('.security-code').click();
                }
            },'json');
        };
    };
};

//邮箱注册弹出框
function get_Cookie() {
	var getPhone = JKXY.Cookie.get("s_phone");
	if (getPhone != null || getPhone != '') {
		$('#phoneNum').val(getPhone);
	}
}
function set_Cookie() {
	var $save_phone = $('#save_phone');
	var selectState = $save_phone.hasClass('choose-this');
	var myPhone = $('#phoneNum').val();
	if (myPhone && selectState) {
		var _day = phone_cookie_life_time;
		JKXY.Cookie.set("s_phone", myPhone, _day, '/', '.' + domain(window.location.href), '');
	} else {
		JKXY.Cookie.del("s_phone", '/', '.' + domain(window.location.href), '');
	}
}


//延时跳转
var delayJumpUrl = function(url,millisec){
	setTimeout(function(){
		window.location.href = url;
	},millisec)
}

//搜索推荐
function commonSearch(){
    //获取类型页面，以及输入的内容
    var data = {
        'type' : 'course',
        'term' : ''
    };
    data['term'] = $('#web_search_header').val();
    $.ajax({  
        type:'get',        
        url : 'http://search.'+ (window.location.href) +'/Index/suggest',
        data : data ,
        dataType : 'jsonp',  
        jsonp:"jsonpcallback",  
        success  : function(data) {

            if (data) {
               if(data.length>0){
                   $('.keyword-list').show();
               } else{
                   $('.keyword-list').hide();
               }
                var str = ''; 
                for(var i=0;i<data.length;i++) {
                    if(i<6) {
                        str += "<li class='current'><a href='http://search."+domain(window.location.href)+"/s/t_course|sfilter_1|q_"+data[i]+"'> " + data[i] + "</a></li>";
                    }                   
                }
                $(".result-list").html(str);
                //console.log(data); 
            };           
        },  
        error : function() {  
            console.log("Fail");  
        }  
    });  
}

/**
 * 验证邮箱格式 return Boolean
 */
function isEmail( source ) {
    return /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/.test( source );
};

/**
 * 验证手机格式 return Boolean
 */
function isMobile( source ) {
    return /^((\(\d{2,3}\))|(\d{3}\-))?(1[34578]\d{9})$/.test(source);
};

/**
 * 验证邮箱唯一性（是够可用）格式 return Boolean
 */
function isOkEmial(url,val){
    $.post(url,{ 'email':val, 'isajax':1},function(data){
        if(data.status == '1'){
            console.log(data.info)
            return true;
        }else{
            return false;
        }
    },'json');
}


//member.js
JKXY.chk = {
	interval : null,
	init : function(form){
		form.each(function(){
			var formObj = $(this);
			formObj.validate({
				rules :{
					realname: {
						required: true,
						rangelength:[2,16]
					},
					dept :{required: true},
					grade :{required: true},
					class :{required: true},
					number: {
						required: true,
						rangelength:[4,32]
					},
					password: {
						required: true,
						
					},
					repassword: {
					    required: true,
					    equalTo: "#password",
					    minlength : 6,
					    pwdCheck:true
					},
					safecode : {
						required : true,
						remote: {
						    url: "/sso/checkSafeCode",     //后台处理程序
						    type: "post",               //数据发送方式
						    dataType: "json",           //接受数据格式  
						    data: {                     //要传递的数据
						        safecode: function() {
						            return form.find('input[name=safecode]').val();
						        }
						    }
						}
					},
					qa_sub_title : {
						required : true,
						maxlength:35
					}
				},
				messages : {
					password 	:		{required : '请输入密码'},
					repassword 	:	{required : '请输入确认密码', equalTo : '两次密码不一样',minlength: '密码不能小于6位'},
					safecode	: {remote : '验证码错误',required : '请输入验证码'},
					qa_sub_title: {required: '您的提问不够清晰，请将问题说明清楚，小雪才能为您解答', maxlength:'您的提问标题超过35个字，请精简或将更多内容输入到问题框中' },
					realname: {required: '姓名必填', rangelength:'姓名长度必须2~16' },
					number: {required: '学号必填', rangelength:'学号长度必须4~32' },
					dept: {required: '院系必填'},
					grade: {required: '年级必填'},
					class: {required: '班级必填'}
				},
				onsubmit: false,
				focusInvalid: false,
				focusCleanup: true,
				onkeyup	: false,
				//onfocusout : false,
				onclick		: false,
				errorClass: "err", //"unchecked"/"SummaryItem"
				validClass: "succ",
				errorElement: "span",
	            errorPlacement: JKXY.chk.showError,
	            success: function(error,element,message){
	            	JKXY.chk.showSucc(error,$(element),message);
	            }
			});
		});
	},
	resetBt : function(obj){
		$(obj).removeClass('btn-sendcode');
		$(obj).addClass('btn-check');
		$(obj).attr('stop',0);
		clearInterval (JKXY.chk.interval);
	},
	use : function(obj,msg){
		$(obj).attr('stop',0);
		$(obj).html(msg);
	},
	stop : function(obj,msg){
		$(obj).attr('stop',1);
		$(obj).html(msg);
	},
	wait : function(obj,msg, time){
		var time	= time ? time : 60;
		$(obj).removeClass('btn-check');
		$(obj).addClass('btn-sendcode');
		$(obj).attr('stop',1);
		JKXY.chk.interval = setInterval(function(){
			$(obj).html('('+time + '秒)后' + msg);
			time --;
			if(time < 1) {
				clearInterval (JKXY.chk.interval);
				$(obj).html(msg);
				$(obj).removeClass('freebtn-btn-stop');
				$(obj).addClass('freebtn-btn-green');
				$(obj).attr('stop', 0);
				clearInterval( JKXY.chk.interval );
				$(obj).removeClass('disabled');
				//$('#mobileMessage').bind('click',send_phone);
				$("body").delegate("#mobileMessage" , 'click' , send_phone);
			}
		},1000);
	},
	delayJumpUrl : function(url,millisec){
		setTimeout(function(){
			window.location.href = url;
		},millisec)
	},
	checkMobileCode : function(code){
		var preg	= /^\d{6}$/;
		return preg.test(code);
	},
	// 提交前的校验？
	submitInitClik : function(obj){
		setTimeout(function(){
			JKXY.chk.resetBt(obj);
		},5000)
		if(typeof(obj.attr('stop')) == 'undefined'){
			obj.attr('stop',1);
			return true;
		}
		if(obj.attr('stop') == '1') return false;
		if(obj.attr('stop') == '0') {
			obj.attr('stop',1);
			return true;
		}
	},
	// 设置点击为默认可点击状态呢
	defaultClick: function(obj, obj_default){
		var btnDefault	= {html:'', addCls:'', removeCls:''};
		var obj_default	= $.extend(btnDefault, obj_default);
		obj.html( obj_default.html );
		obj.removeClass( obj_default.removeCls ).addClass( obj_default.addCls );
		return false;
	},
	// 设置点击为不可点击的状态
	stopClick: function(obj, obj_stop) {
		var btnStop		= {html:'处理中~', addCls:'', removeCls:''};
		var obj_stop	= $.extend(btnStop, obj_stop);
		obj.html( obj_stop.html );
		obj.removeClass( obj_stop.removeCls ).addClass( obj_stop.addCls );
		return true;
	},
	// 只是检查按按钮是否在可点击状态，防重复点击提交
	checkClick : function(obj){
		if(typeof(obj.attr('stop')) == 'undefined'){
			obj.attr('stop',0);
			return true;
		}
		if(obj.attr('stop') == '1'){
			return false;
		}
		return true;
	},
	chkServices : function(obj){
		if(!$(obj).is(':checked')){JKXY.chk.showError('',$(obj),'请勾选同用户注册条款');return false;}
		return true;
	},
	chkUsername:function(obj){   //用户名判断
		var obj = $(obj);
		var val = obj.val().trim();
		if(val == ''){JKXY.chk.showError('',obj,'用户名不能为空');return false;}
		if(val.length>15){
			JKXY.chk.showError('',obj,'用户名长度不超过15');return false;
		}
		if(! /^[\u0391-\uFFE5|\w]+$/.test(val)){
			JKXY.chk.showError('',obj,'只能包括汉字、英文字母、数字和下划线');return false;
		}       
		$.post('/member/checkusername',{username : val, isajax:1},function(data){
			if(data.status == '1'){
				JKXY.chk.showSucc('',obj,data.info);
				return true;
			}
			JKXY.chk.showError('',obj,data.info);
		},'json');
		if(obj.parent().find('span').attr('class') == 'form-icon-error'){
			 //KXY.chk.showError('',obj,'用户名未能通过验证');
			return false;
		}
		return true;
	},
	chkEmail:function(obj){
		var obj = $(obj);
		var val = obj.val().trim();
		if(val == ''){JKXY.chk.showError('',obj,'请填写邮箱');return false;}
		email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val);
		if(!email){JKXY.chk.showError('',obj,'邮箱格式不正确');return false;}
		$.post('/sso/checkemail',{ email : val, isajax:1},function(data){
			
			if(data.status == '1'){
				JKXY.chk.showSucc('',obj,data.info);
				return true;
			}
			JKXY.chk.showError('',obj,data.info);
			
		},'json');
		
		return true;
	},
	showError:function(error,element,message){
		if(typeof message === "string"){
    		var msg = typeof(error) === 'object' ? error.html() : '';
    		msg = typeof(message) === 'string' ? message : msg;
    		var parentObj = element.parent();
    		if(parentObj.find('div').length == 0) {
    			JKXY.CJT.login(1,msg);
    			return ;
    		}else parentObj.find('div').attr('class','form-tip form-tip-error').html(msg);
    		
    		if(parentObj.find('span').length == 0)  parentObj.find('span').attr('class','form-icon-error');
    	}
	},
	showSucc:function (message,element,message) {
    	var parentObj = element.parent();
    	var msg = typeof(error) === 'object' ? error.html() : '';
    	msg = typeof(message) === 'string' ? message : msg;
    	if(parentObj.find('div').length == 0) {
			//JKXY.CJT.login(0,msg);
			return ;
		}else parentObj.find('div').attr('class','form-tip form-tip-succ').html(msg);
    	if(parentObj.find('span').length == 0) parentObj.find('span').attr('class','form-icon-succ');
    },
	submitResetClick : function(obj){
		obj.attr('stop',0);
	}
};
