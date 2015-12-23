//计算页面加载时间
var start_time = new Date();
var end_time = "" ;
var t = setInterval(function(){
	if(document.readyState=="complete"){aa();}
},500)

function aa(){
	end_time = new Date();
	alert(end_time.getTime() -  start_time.getTime() );
	clearInterval(t);
}

//console.log 格式化
$.extend({
    log: function(message) {
        var now = new Date(),
            y = now.getFullYear(),
            m = now.getMonth() + 1, //!JavaScript中月份是从0开始的
            d = now.getDate(),
            h = now.getHours(),
            min = now.getMinutes(),
            s = now.getSeconds(),
            time = y + '/' + m + '/' + d + ' ' + h + ':' + min + ':' + s;
        console.log(time + ' My test: ' + message);

    }
})
$.log('initializing...');   // 输出2014/10/15 16:55:59 My test: initializing... 


//  function browserRedirect() {
//     var sUserAgent = navigator.userAgent.toLowerCase();
//     var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
//     var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
//     var bIsMidp = sUserAgent.match(/midp/i) == "midp";
//     var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
//     var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
//     var bIsAndroid = sUserAgent.match(/android/i) == "android";
//     var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
//     var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
//     document.writeln("您的浏览设备为：");
//     if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
//         document.writeln("phone");
//     } else {
//         document.writeln("pc");
//     }
// }

browserRedirect();

function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    // document.writeln("您的浏览设备为：");
    var currentUrl = location.href, startI, endI, currentPage;
    

    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        startI = currentUrl.indexOf('.'+host_arr[2]) + 14;
        endI = currentUrl.indexOf('.html');
        currentPage = currentUrl.substring(startI,endI);
        window.location.href="http://e.jikexueyuan.com/invite-m/"+currentPage+".html"
    } else {
        startI = currentUrl.indexOf('.'+host_arr[2]) + 12;
        endI = currentUrl.indexOf('.html');
        currentPage = currentUrl.substring(startI,endI);
       window.location.href="http://e.jikexueyuan.com/invite/"+currentPage+".html"
    }
}


/**
 * [getQuery 获取地址栏后面的参数，传入 key 返回 value]
 * @param  {string} name [key]
 * @return {string}      [value]
 */
function getQuery (name) {
    var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
    if(result == null || result.length < 1){
        return "";
    }
    return result[1];
}

 
/**
 * [getData jquery 绑定事件传参调用方法]
 * @param  {[object]} d [参数以键值对方式传递]
 * @return {[type]}   [description]
 */
$("#cbutton1").bind("click",{"id":"111","name":"aaa"},getData); 
function getData(d){  
    alert(d.data.id);  
    alert(d.data["name"])  
    var dd=JSON.stringify(d.data);//将传过来的参数转换成json字符串  
    alert(dd);  
    alert(dd.split(',').length);  
}  