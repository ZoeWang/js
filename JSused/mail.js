/*!
 * mail
 * Version: 1.0.0
 * Create: wxf
 * Date: 27-12-2013 15:42:48 (GMT Time)
 */
 
$(function(){
	msgSetting();
	filterAction();
})

/**
 * 通知设置
 */
function msgSetting(){
	var no = 'checkno';
	var on = 'checkon';
	$('.setmail a').click(function(){
		var isSubscribe = false;  //是否订阅
		var _this = $(this);
		if(_this.hasClass(on)){
			_this.removeClass(on);
			_this.addClass(no);
			isSubscribe = false;
		}else{
			_this.removeClass(no);
			_this.addClass(on);
			isSubscribe = true;
		}
		
		
		var _base = $(this).parent('td').parent('tr');
		var _type = $(this).parent('td');
		var typename = $.trim(_base.children('.msgtype').text());
		var type = 0;
		var typeId = getTypeId(typename);
		var nid = $('#nid').val();
		
		if(_type.hasClass('mail')){
			type = 'innermail';
		}else if(_type.hasClass('SMS')){
			type = 'SMS';
		}else if(_type.hasClass('email')){
			type = 'email';
		}
		var url = "";
		$.post(url,
			{
				"typeId":typeId,
				"type":type,
				"isSubscribe":isSubscribe,
				"nid":nid
			},
			function(data){},
			"text");
	})
}

function getTypeId(typename){
	if(typename == '自助理财投资通知'){
		return 1;
	}else if(typename == '自助理财回款通知'){
		return 2;
	}else if(typename == '自助理财取消通知'){
		return 3;
	}else if(typename == '自助理财计息通知'){
		return 4;
	}else if(typename == '聚合理财申请通知'){
		return 5;
	}else if(typename == '聚合理财结息通知'){
		return 6;
	}else if(typename == '官方通知'){
		return 7;
	}else if(typename == '充值回执'){
		return 8;
	}
}


/**
 * 标为星星
 *@param innermailId
 *@returns {Boolean}
 */
 function markFlag(innerMailId){
	 if(innerMailId==""){
		 return false;
	 }else{
		 var url ='/Home/User/UpdateMsgImportStatus';
		 $.post(url,{
			 'innerMailId' : innerMailId
		 },function(data,varStatus){},"text")
	 }
 }


/**
 * 标为已读
 * @param innerMailId
 * @returns {Boolean}
 */
function markReaded(innerMailId){
	if(innerMailId==""){
		return false;
	}else{
		var url = '/Home/User/UpdateMsgReadStatus';
		$.post(url,{
			'innerMailId' : innerMailId
		},function(data,varStatus){},"text");
	}
}



/**
 * 删除站内信
 * @param innerMailId
 * @returns {Boolean}
 */
function deleteInnerMail(innerMailId){
	if(innerMailId==""){
		return false;
	}else{
		var url = "/Home/User/DelMsg";
		$.post(url,{
			'innerMailId' : innerMailId
		},function(data,varStatus){
			window.location.reload();
		},"text");
	}
}

function filterAction(){
	var on = 'checkon';   //已选站内信
	var no = 'checkno';   //未选站内信
	var staron = 'staron';  //已选星星标记
	var starno = 'starno';   //未选星星
	var unread = 'unread';   //未读
	var isread = 'isread';   //已读
	var chea = '.checkbox';		//选择一个
	var tar = $('.dir');     //选择操作的类型
	var msg = $('.content_right li');  //站内信的条数+1 行数
	var msglist = $('.innerlist li');
	var msgread = $('.digest');	//单个已读
	var check = msg.find('.checkbox');    //所有复选框 站内信的id
	var che = $('.innerlist li').find('.checkbox');
	var flag = $('.time i');    //是否标为星星
	var hid = $('.hid');   //下拉菜单选项发生变化
	var innerMailId = '';
	/*if(msg.length > 6){//消息条数大于6条隔行换色
		$('.operate li:even').addClass('');
	}*/
	
	//单个点击标记为已读
	msgread.bind('click',function(){
		var read = $(this);
		var innerMailId = read.parents('.mailcon').find(check).attr('value');
		if(read.parents('.mailcon').hasClass(unread)){
			read.parents('.mailcon').removeClass(unread).addClass(isread);
			markReaded(innerMailId);
		}
		
	});
	

	
	//星星状态
	flag.bind('click',function(){
		var star = $(this);
		var innerMailId = star.parents('.mailcon').find(check).attr('value');
		if($(this).hasClass(staron)){
			markFlag(innerMailId+"_true");
			star.removeClass(staron).addClass(starno);
		}else{
			markFlag(innerMailId+"_false");
			star.removeClass(starno).addClass(staron);
		};
	});
	//点击单个
	che.bind('click',function(){
		var self = $(this);
		if(self.hasClass(no)){
			self.removeClass(no).addClass(on);
		}else{
			self.removeClass(on).addClass(no);
		}
	});
	//消息类型选择/操作
	tar.bind('click',function(){
		var type = $(this).attr('value');
		switch(type){
			case 'A'://单个点击
			check.each(function() {
                var self = $(this);
				if(self.hasClass(no)){
					self.removeClass(no).addClass(on);
				}else{
					self.removeClass(on).addClass(no);
				}
            });
			break;
			case '4'://全部标记为已读
				innerMailId = '';
				msglist.each(function(){
					var self = $(this);	
					if(self.hasClass(unread)){
						self.removeClass(unread);
						innerMailId += self.find(che).attr('value')+",";
						self.addClass(isread);
					};
				});
				markReaded(innerMailId);
			break;
			case '10'://删除
				innerMailId = '';
				msg.each(function(){
					var self = $(this);
					if(self.find(che).hasClass(on)){
						innerMailId += self.find(che).attr('value')+",";
						self.remove();
					};
				});
				deleteInnerMail(innerMailId);
			break;
		}
	})
	
	//下拉菜单操作
	hid.change(function(){
		var oper = $(this).val();
		switch(oper){
			case '1'://全选
			check.each(function() {
                var self = $(this);
				if(self.hasClass(no)){
					self.removeClass(no).addClass(on);
				}
            });
			break;
			case '2'://不选
			check.each(function() {
                var self = $(this);
				if(self.hasClass(on)){
					self.removeClass(on).addClass(no);
				}
            });
			break;
			case '3'://反选
			check.each(function(index, element) {
                var self = $(this);
				if(self.hasClass(on)){
					self.removeClass(on).addClass(no);
				}else{
					self.removeClass(no).addClass(on);
				}
            });
			break;
			case '4'://已读邮件
				if(msg.hasClass(isread)){
					check.removeClass(on).addClass(no);
					$('.'+isread).find(check).each(function(){
						var self = $(this);
						if(self.hasClass(on)){
							self.removeClass(on).addClass(no);
						}else{
							self.removeClass(no).addClass(on);
						}
					})
				};
			break;
			case '5'://未读邮件
				if(msg.hasClass(unread)){
					check.removeClass(on).addClass(no);
					$('.'+unread).find(check).each(function() {
                        var self = $(this);
						if(self.hasClass(on)){
							self.removeClass(on).addClass(no);
						}else{
							self.removeClass(no).addClass(on);
						}
                    });
				}
			break;
			case '6'://标记已读
				innerMailId = '';
				msglist.each(function(){
					var self = $(this);
					if(self.find(che).hasClass(on)){
						self.removeClass(unread);
						innerMailId += self.find(che).attr('value')+"_false,";
						self.addClass(isread);
					};
				});
				markReaded(innerMailId);
			break;
			case '7'://标记未读
				innerMailId = '';
				msglist.each(function(){
					var self = $(this);
					if(self.find(che).hasClass(on)){
						self.removeClass(isread);
						innerMailId += self.find(che).attr('value')+"_true,";
						self.addClass(unread);
					};
				});
				markReaded(innerMailId);
			break;
			case '8'://标为红旗
				innerMailId = '';
				msglist.each(function(){
					var self = $(this);	
					if(self.find(che).hasClass(on)){
						if(self.find(flag).hasClass(starno)){
							var tar = self.find(flag);
							innerMailId += self.find(che).attr('value')+"_false,";	
							tar.removeClass(starno).addClass(staron);
						};
					};
				});
				markFlag(innerMailId);
			break;
			case '9'://清除旗标
				innerMailId = '';
				msglist.each(function(){
					var self = $(this);
					if(self.find(che).hasClass(on)){
						if(self.find(flag).hasClass(staron)){
							var tar = self.find(flag);
							innerMailId += self.find(che).attr('value')+"_true,";
							tar.removeClass(staron).addClass(starno);
						};
					}
					
				});
				markFlag(innerMailId);
			break;
		}
	});
	
}