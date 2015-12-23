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
		hosts = hosts[1];
		d_arr = hosts.split('.');
		return d_arr;
	},
	currentUrl:window.location.href
};
var host_arr = domain.domain_arr(window.location.href);
var baseUrl = host_arr[1] + '.' + host_arr[2];
var passportUrl= "http://passport." + baseUrl;
var wwwUrl = "http://www."  + baseUrl;
var safeCodeUrl = passportUrl + "/sso/verify";
var passportUrlFix = host_arr[1] + '.' + host_arr[2];
//var cdn_url = passportUrl + "/static/";
var qq_login_url = passportUrl + '/connect/qq',
    wx_login_url = passportUrl + '/connect/weixin',
    weibo_login_url = passportUrl + '/connect/weibo',
    eoe_login_url=passportUrl + '/connect/eoe';


var event_stop = {
    rightdia: false,
    usercare: false
};
var pub_url = "static/";
var www_url = wwwUrl;//"http://www.jikexueyuan.lc/";
var qq_login_url = passportUrl + "/connect/qq";
var wx_login_url = passportUrl + "/connect/weixin";
var weibo_login_url = passportUrl + "/connect/weibo";
var eoe_login_url = passportUrl + "/connect/eoe";

var uname,
	code,
    uid,
    reg= new RegExp("(^| )uname=([^;]*)(;|$)");
    if (document.cookie.match(reg) && document.cookie.match(reg)[2]) {
        uname = decodeURI(document.cookie.match(reg)[2]);
    }
    reg= new RegExp("(^| )code=([^;]*)(;|$)");
    if (document.cookie.match(reg) && document.cookie.match(reg)[2]) {
        code = decodeURI(document.cookie.match(reg)[2]);
    }
    reg= new RegExp("(^| )uid=([^;]*)(;|$)");
    if (document.cookie.match(reg) && document.cookie.match(reg)[2]) {
        uid = document.cookie.match(reg)[2]
    }
var isLogin = uname ? true : false;
var YXY = {
    popHtml: function(imgsrc) {
        var html  = '<div id="bannerPop" style="background: #fff">';
            html += '<i class="popclose" style="position: absolute;top: 10px;right: 10px;width:24px;height:24px;background: rgba(0,0,0,.4);color: #fff;line-height: 24px;text-align: center;-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%">X</i>';
            html += imgsrc;
            html += '</div>';
        return html;
    },
    bannerPop: function(imgsrc) {
        if (typeof bannerPopLock != "undefined" && bannerPopLock == false) return;
        if (localStorage.getItem('isShowBanner_'+currentPage)) {
            return;
        }
        $().tooltip("pop", {
            width: 968,
            height: 460,
            popId: '#bannerPop',
            opacity: 0.5,
            popHtml: YXY.popHtml(imgsrc),
            popFunc: function() {
                $('#bannerPop img').css({width: '100%',height: '100%'});
            }
        });

        localStorage.setItem('isShowBanner_'+currentPage, 1)
    }
};
// 调用方法
    if (isLogin) {
        var currentUrl = location.href;
        var fCodeImgUrl, fCodeUrl;
        var startI = currentUrl.indexOf('.com') + 5;
        var endI = currentUrl.indexOf('.html');
        var currentPage = currentUrl.substring(startI,endI);
        switch (currentPage) {
            case 'android':
                fCodeImgUrl = './static/images/f/android.jpg';
                break;
            case 'bootstrap':
                fCodeImgUrl = './static/images/f/bootstrap.jpg';
                break;
            case 'html5':
                fCodeImgUrl = './static/images/f/html5.jpg';
                break;
            case 'java':
                fCodeImgUrl = './static/images/f/java.jpg';
                break;
            default:
                fCodeImgUrl = './static/images/f/img.jpg';
        }
        fCodeUrl = '/invite/invite.html';
        YXY.bannerPop('<a href="' + fCodeUrl + '" target="_blank" title=""><img src="' + fCodeImgUrl + '" alt=""/></a>');
    }
$(".number").mouseover(function () {
    $(this).addClass('active-border');
    $(this).next('.text').addClass('active');
    //$(this).css('border','3px solid #FF6600');
})
$(".text").mouseover(function () {
    $(this).addClass('active');
    $(this).prev('.number').addClass('active-border');
})
$(".number").mouseout(function () {
    $(this).removeClass('active-border');
    $(this).next('.text').removeClass('active');
    //$(this).css('border','3px solid #7ed321');
})
$(".text").mouseout(function () {
    $(this).removeClass('active');
    $(this).prev('.number').removeClass('active-border');
})


if (isLogin) {
    $('.is_not_login').removeClass('show');
    $('.is_login').addClass('show');
} else {
    $('.is_login').removeClass('show');
    $('.is_not_login').addClass('show');
}

var login = {
    login:
        '<span>' +
            '<a href="javascript:void(0);" class="diaLoginBtn" activity="activity" postion="event_index_header" rel="nofollow">' +
                '登录' +
            '</a>' +
        '</span>' +
        '<em>' +
            '|' +
        '</em>' +
        '<span>' +
            '<a href="javascript:void(0);" class="diaRegBtn" activity="activity" postion="event_index_header" rel="nofollow">' +
                '注册' +
            '</a>' +
        '</span>',
    info: '<div class="greencolor relative user-name" id="user-name">' +
            '<p>' +
                '<a href="' + www_url + '/member/" id="login-user">' +
                    uname +
                '</a>' +
                '<img src="./static/images/jiaotou.png"' +
                'class="jiaotou">' +
            '</p>' +
            '<div class="user-center absolute">' +
                '<img src="./static/images/abc.png" class="sj-icon absolute">' +
                '<div>' +
                    '<a href="' + www_url + '/member/">' +
                        '个人中心' +
                    '</a>' +
                    '<a href="' + www_url + '/member/mycourse.html">' +
                        '我的课程' +
                    '</a>' +
                    '<a href="' + www_url + '/member/freevip.html">' +
                        '免费VIP' +
                    '</a>' +
                    '<a href="' + www_url + '/member/mycode.html">' +
                        '我的F码' +
                    '</a>' +
                    '<a href="' + www_url + '/member/setting.html">' +
                        '账号设置' +
                    '</a>' +
                    '<a href="' + www_url + '/member/connect.html">' +
                        '一键绑定' +
                    '</a>' +
                    '<a href="'+ passportUrl +'/submit/logout">' +
                        '退出' +
                    '</a>' +
                '</div>' +
            '</div>' +
        '</div>'
    }
    if (isLogin) {
        $('.loginbox_event').html(login.info);
    } else {
        $('.loginbox_event').html(login.login);
    }


    $('body').delegate('.number, .lesson-list li', 'click', function (e) {
        if(!isLogin){
            regpop.pop()
            e.preventDefault();
        }
    });
