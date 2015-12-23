function checkinput(id)
{
	var alt = $('#'+id).attr('alt');
	var ary = alt.split('#');
	var err = 0;
	for(var i = 0; i < ary.length; i++)
	{
		var ck = ary[i].split('|');
		if (ck[0] == 'not null')
		{
			if ($('#'+id).val().length < 1)
			{
				$('#'+id).parent().parent().addClass('red');
				$('#l'+id).html('<span class="inputerr">'+ck[1]+'</span>');
				err++;
			}
		}
		if (ck[0] == 'email')
		{
			var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
			if (!reg.test($('#'+id).val()))
			{
				$('#'+id).parent().parent().addClass('red');
				$('#l'+id).html('<span class="inputerr">'+ck[1]+'</span>');
				err++;
			}
		}
		if (ck[0] == 'len4')
		{
			if ($('#'+id).val().length != 4)
			{
				$('#'+id).parent().parent().addClass('red');
				$('#l'+id).html('<span class="inputerr">'+ck[1]+'</span>');
				err++;
			}
		}
		if (ck[0] == 'min4')
		{
			if ($('#'+id).val().length < 4)
			{
				$('#'+id).parent().parent().addClass('red');
				$('#l'+id).html('<span class="inputerr">'+ck[1]+'</span>');
				err++;
			}
		}
		if (ck[0] == 'password')
		{
			if ($('#pwd').val() != $('#pwd2').val() && $('#pwd2').val().length > 0)
			{
				$('#'+id).parent().parent().addClass('red');
				$('#l'+id).html('<span class="inputerr">'+ck[1]+'</span>');
				err++;
			}
		}
	}
	if (err == 0)
	{
		$('#l'+id).html('<span class="right"></span>');
	}
	return err;
}
function dosubmit()
{
	var err = 0;
	$('input').each(function(){
		err += checkinput($(this).attr('id'));
	});
	if (err == 0)
	{
		$('#regform').submit();
		return true;
	}
	return false;
}
function showerr(id, err)
{
	//$('#l'+id).html('<span class="inputerr">'+err+'</span>');
	//alert(id+"**********"+err);
	
	$('<div class="warn_msg"><span class="msg">'+err+'</span><span class="right_bg"></span></div>').appendTo($('#'+id).parent());
}
function changecode()
{
	$('#imgcode').attr('src', '/common/captcha?id='+Math.random()); 
}

function checkLoginForm(){
	$("#submit").click(function(event){
		event.preventDefault();
		var n=0;//空值统计
		$(".input_box input").each(function(index){
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
				$('<div class="warn_msg"><span class="msg">'+msg+'</span><span class="right_bg"></span></div>').appendTo($(this).parent());
				return false;
			}
		});
		if(0 == n)
		{
			//当不为空时  提交表单
			$.post("/user/login",$("#regform").serialize(),function(data){
				if(1 != data.result)
				{
					var addobj = $("#name");
					if($(".input_box input").length<3)
					{
						var verify='<li class="input_box"><input class="verify_input" title="不区分大小写!" onkeyup="value=value.replace(/[^\w]/g,'+""+')" maxlength="4" name="code" alt="len4|请输入验证码" id="code"/><div class="verify_img"><img src="/common/captcha?id='+Math.random()+'" alt="点击更换验证码" width="100" height="36" id="imgcode" onclick="changecode(\'#imgcode\');" /> </div></li>';
						//插入验证码
						$(".rem_pwd").before(function(){
							return verify;
						});
					}
					else
					{
						if(2 == data.result)
						{
							addobj = $("#code");
							$("#code").bind("click",function(){
								$(this).val("");
							});
						}
					}
					$("#pwd").val("");
					$(addobj).parent().find(".warn_msg").remove();
					
					$('<div class="warn_msg"><span class="msg">'+data.msg+'</span><span class="right_bg"></span></div>').appendTo($(addobj).parent());
				
				}
				else
				{
					//alert(data.url);
					location.href = data.url;
				}
				
			},"json");
		}
	});
}