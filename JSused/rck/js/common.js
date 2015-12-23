// JavaScript Document
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
	$(listobj).find('li, dd').bind("click",function(){
		$(this).siblings().removeClass('selected');
		var content = $(this).addClass('selected').text();
		var val = $(this).attr('value');
		$(obj).html(content);//设置文本框的内容
		$("#"+input).val(val).change(); //设置表单提交的value
		$(listobj).removeClass('show');
		$(listobj).parent().parent().removeClass('select_wrap1');
	});
}
/*智能浮动导航*/


function winScroll(){
	 	var lastmenu = $('.linkbox a.current');
		var a=$("#1").offset().top;
		var b=$("#2").offset().top;
		var c=$("#3").offset().top;
		var d=$("#4").offset().top;
		var f=$("#5").offset().top;
		var g=$("#6").offset().top;
		var h=$("#7").offset().top;
		
		$(window).scroll(function(e) {
			var y=$(this).scrollTop();
			if(window.XMLHttpRequest)
						  {
							  $('.linkbox').css({"position":"fixed","top":0});								
						  }
						  else
						  {
							  $('.linkbox').css({"position":"absolute",top:y-583});
						  }
			if(y>=a-63 && y<b){
						  $('.linkbox a[href*=#]').removeClass('current');
						  $("#01").addClass('current');
				}
			else if(y>=b-63 && y<c){
						  $('.linkbox a[href*=#]').removeClass('current');
						  $("#02").addClass('current');
				}
			else if(y>=c-63 && y<d){
						  $('.linkbox a[href*=#]').removeClass('current');
						  $("#03").addClass('current');
				}
			else if(y>=d-63 && y<f){
						  $('.linkbox a[href*=#]').removeClass('current');
						  $("#04").addClass('current');
				}
			else if(y>=f-63 && y<g){
							//alert("ok");
						  $('.linkbox a[href*=#]').removeClass('current');
						  $("#05").addClass('current');
				}
			else if(y>=g-63 && y<h){
						  $('.linkbox a[href*=#]').removeClass('current');
						  $("#06").addClass('current');
				}
			else if(y>=h-63){
						  $('.linkbox a[href*=#]').removeClass('current');
						  $("#07").addClass('current');
				}else{
					$('.linkbox').css({"position":"relative","top":""});
				}
		});
}
function clickScroll(){
	 $('.linkbox a[href*=#]').click(function() {
	            var $target = $(this.hash);
	            var obj = $(this);
	            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
	            var y1 = $(window).scrollTop();
	            if ($target.length) {
	                var targetOffset = $target.offset().top;
	                $('html,body').animate({
	                    scrollTop: targetOffset
	                },520,'linear',function(){
	                	if(y1 <= targetOffset)
	                	{
	                		$('.linkbox a[href*=#]').removeClass('current');
							$(obj).addClass('current');             		
	                	}
	                });
	                return false;
	            }
	    });
}
/*自我描述限制字数*/
function descMax(){
	var desc = $("#desc").val();
	$(".subtn").click(function(event){
		if(desc.length>1000){
			alert("自我描述不能超过1000字！");
			event.preventDefault();
		}
		
	})
}

/*添加行*/
function addrow(){
	$(".addbtn").click(function(){
		var _this = $(this);
		var row = _this.next().find('.flist li').html();
		_this.next().find('.flist').append("<li>"+row+"</li>");
	})
}