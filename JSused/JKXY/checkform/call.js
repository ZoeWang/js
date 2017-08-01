var sub = {
	init:function(){
		this.bindEle();
	},
	bindEle: function(){
		$('#subtn').on('click', this.submitCheck);
	},
	submitCheck: function(){
		var $name = $('#qyName'),
			$overview = $('#qyOverview'),
			$tel = $('#qyTel'),
			$contact = $('#qyContact'),
			$email = $('#qyEmail'),
			$logo = $('#qyLogo-btn :file');
		var emailVal = $.trim($email.val());
		var check = /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/.test(emailVal);

		$name.submitEmptyCheck({
			note: "请输入企业名称"
		});
		$overview.submitEmptyCheck({
			note: "请输入企业简介"
		});
		$email.submitEmptyCheck({
			note: "请输入联系人邮箱",
			callback: function(){
				if(!check) {
					var note = $('<div class="note errTxt">您输入的邮箱格式不正确</div>');
					$email.parent().append(note);
					return false;
				}else{
					$("#frm").submit();
				}
			}
		});
	}
}