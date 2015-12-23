var ShareTo = {};
(function(){
	var arr = location.href.split('/');
	arr.pop();
	ShareTo.globalImgSrc = arr.join('/')+"/images/course_default.jpg";
})();
ShareTo.globalLink = window.location.href;
ShareTo.globalTitle = "极客学院”";
ShareTo.getText = function() {
	var texts = [
		"在线教育谁最强，胜东方，秒蓝翔，极客学院是最强!",
		"你学与不学，极客精神都在这里---极客学院"
	];
	return encodeURIComponent(texts[Math.floor(Math.random()*texts.length)]);
};
/**
 * 人人网  http://widget.renren.com/dialog/share?link=链接&resourceUrl=链接&pic=图片地址&title=标题&description=内容;
 * */
ShareTo.renren = function()
{
	var link = ShareTo.globalLink;
	var resourceUrl = ShareTo.globalLink;
	var pic = ShareTo.globalImgSrc;
	var title = ShareTo.globalTitle;
	var description = ShareTo.getText();
	
	var str = "http://widget.renren.com/dialog/share?";
	str += "link="+link+"&";
	str += "resourceUrl=" + resourceUrl + "&";
	str += "pic=" + pic + "&";
	str += "title=" + title + "&";
	str += "description=" + description;
	window.open(str);
};
/**
 * 新浪  http://service.weibo.com/share/share.php?appkey=1311658869&url=链接&title=内容&source=&sourceUrl=&content=utf-8&pic=图片路径
 * 
 * */
 ShareTo.weibo = function(shareSrc)
{
	// console.log(shareSrc);
	var appkey = "1311658869";
	var url = ShareTo.globalLink;
	if(shareSrc == undefined)
	{
		var title = ShareTo.getText();
	}
	else
	{
		var title = ShareTo.getText();
	}
	var source = "";
	var sourceUrl = "";
	var content = "";
	var pic = ShareTo.globalImgSrc;
	
	var str = "http://service.weibo.com/share/share.php?";
	str += "url=" + url + "&";
	str += "title=" + title + "&";
	str += "source=" + source + "&";
	str += "sourceUrl=" + sourceUrl + "&";
	str += "content=" + content + "&";
	str += "pic=" + pic;
	window.open(str);
};
/**
 * qq微薄  http://share.v.t.qq.com/index.php?c=share&a=index&title=内容&url=地址&appkey=801077650&site=路径&pic=图片路径
 * 
 * */
ShareTo.qqWeibo = function()
{
	var c = "share";
	var a = "index";
	var title = ShareTo.getText();
	var url = ShareTo.globalLink;
	var appkey = "801077650";
	var site = ShareTo.globalLink;
	var pic = ShareTo.globalImgSrc;
	
	var str = "http://share.v.t.qq.com/index.php?";
	str += "c=" + c + "&";
	str += "a=" + a + "&";
	str += "title=" + title + "&";
	str += "url=" + url + "&";
	str += "appkey=" + appkey + "&";
	str += "site=" + site + "&";
	str += "pic=" + pic;
	window.open(str);
	 // window.location = str;
 };


/**
 * 豆瓣  http://shuo.douban.com/!service/share?image=图片路径&href=链接&name=内容
 * 
 * */

ShareTo.douban = function()
{
	var url = ShareTo.globalLink;
	var image = ShareTo.globalImgSrc;
	var href = ShareTo.globalLink;
	var name = ShareTo.getText();
	
	var str = "http://shuo.douban.com/!service/share?";
	str += "image=" + image + "&";
	str += "href=" + href + "&";
	str += "name=" + name;
	window.open(str);
	// window.location = str;
	
}

/**
 * 开心  http://www.kaixin001.com/rest/records.php?content=内容&url=链接&starid=0&aid=4081119456416ba8b298ee5066970110&style=11&pic=图片路径
 * 
 * */

ShareTo.kaixin001 = function()
{
	var content = ShareTo.getText();
	var url = ShareTo.globalLink;
	var starid = "0";
	var aid = "4081119456416ba8b298ee5066970110";
	var style = "11";
	var pic = ShareTo.globalImgSrc;
	
	var str = "http://www.kaixin001.com/rest/records.php?";
	str += "content=" + content + "&";
	str += "url=" + url + "&";
	str += "starid=" + starid + "&";
	str += "aid=" + aid + "&";
	str += "style=" + style + "&";
	str += "pic=" + pic + "&";

	window.open(str);
	// window.location = str;
	
}

/**
 *	qq空间 http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=链接title=分享内容&desc=&summary=&site=&pics=
 * 
 * 
 * */

ShareTo.qzone = function()
{
	var url = ShareTo.globalLink;
	var title = ShareTo.getText();
	var desc = "";
	var summary = "";
	var site = "";
	var pics = ShareTo.globalImgSrc;
	
	var str = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?";
	str += "url=" + url + "&";
	str += "desc=" + desc + "&";
	str += "summary=" + summary + "&";
	str += "site=" + site + "&";
	str += "pics=" + pics + "&";
	
	window.open(str);
	// window.location = str;
}

/**
 * [tieba description]
 * @return {[type]} [description]
 */
ShareTo.tieba = function(){
	var d = document,
		e = encodeURIComponent,
		title = ShareTo.getText(),
		// title = "",
		desc = "",
		comment = "",
		pic = "",
		url = e(d.location.href),
		str,link;
		
		str = "http://tieba.baidu.com/f/commit/share/openShareApi?";
		str += "url="+url+"&";
		str += "title="+title+"&";
		str += "desc="+desc+"&";
		str += "comment="+comment+"&";
		str += "pic="+pic+"&";

		link = function(){
			if(!window.open(str))
				location.href = str
		};
		if(/Firefox/.test(navigator.userAgent)){
			setTimeout(link,0)
		}else{
			link()
		};
		return false;
}