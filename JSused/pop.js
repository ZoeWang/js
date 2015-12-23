// JavaScript Document
$(window).load(function(){	
	if(getCookie("isread")==1){
		$('.wrapper_bg').remove();
		$('.wrapper').remove();	
		//document.cookie="isread=2";
	}else{
		var dizhi=window.location.href;//获取地址栏中的地址
		if(dizhi==b){
			var sWidth = $("#focus").width(); //获取焦点图的宽度（显示面积）
			var len = $("#focus ul li").length; //获取焦点图个数
			var index = 0;
			var picTimer;
			var h=$(document).height();	
			//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
			var btn = "<div class='btn'>";
			$(".wrapper_bg").css("height",h);
			$(".wrapper_bg").css("display","block");
			$(".wrapper").css("display","block");
			for(var i=0; i < len; i++) {
				btn += "<span></span>";
			}
			btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
			$("#focus").append(btn);
			//$("#focus .btnBg").css("opacity",0.5);
			//为小按钮添加鼠标滑入事件，以显示相应的内容
			$("#focus .btn span").css("opacity",1).click(function() {
				index = $("#focus .btn span").index(this);
				//showPics(index);
			}).eq(0).addClass("on").trigger("click");
			//上一页、下一页按钮透明度处理
			$("#focus .preNext").css("opacity",1).click(function() {
				$(this).stop(true,false).animate({"opacity":"1"},300);
			},function() {
				$(this).stop(true,false).animate({"opacity":"1"},300);
			});
			//上一页按钮
			$("#focus .pre").click(function() {
				index -= 1;
				if(index == -1) {index = len - 1;}
				showPics(index);
			});
			//下一页按钮
			$("#focus .next").click(function() {
				index += 1;
				if(index == len) {index = 0;}
				showPics(index);
			});
			//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
			$("#focus ul").css("width",sWidth * (len));
			//显示图片函数，根据接收的index值显示相应的内容
			function showPics(index) { //普通切换
				var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
				$("#focus ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position		
				$("#focus .btn span").stop(true,false).removeClass("on").animate({"opacity":"1"},300).eq(index).stop(true,false).addClass("on").animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
			}
			$("#closed").click(function(e) {
				$('.wrapper_bg').remove();
				$('.wrapper').remove();
				setCookie("isread","1");
			});
		}
	}		
function setCookie(name,value)
{
var Days = 1;
var exp = new Date();  
exp.setTime(exp.getTime() + Days*24*60*60*1000);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)
{
var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
if(arr != null)
return unescape(arr[2]);
return null;
}
});