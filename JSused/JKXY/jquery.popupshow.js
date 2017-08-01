/* -----------------------------------------/
 * 功能：弹出层显示及居中显示
 * 参数：
 * 返回：
 * 作者：ZHANGHAIBIN
/ ---------------------------------------- */

(function($) {
    $.fn.popupshow = function(options) {
        var settings = $.extend({
            'popupId': null, // 弹出层id
            'htmlUrl': null, // 要插入的HTML的URL
            'maskId': null, // 遮罩id,默认不显示
            'position': 'fixed', // 定位类别
            'countdown': null,   // 倒计时关闭(接收正整数,以秒为单位)
            'timeNode': null,   // 倒计时输出位置
            'jumpUrl': null,    // 关闭时跳转URL
            'callback': null, // 弹出回调
            'closeCallback': null // 关闭回调
        }, options);

        var $popup = $("#" + settings.popupId);
        var $countdown = $('<div class="countdownTxt">');

        //弹出层显示
        if ($popup.length > 0) {
            // 给隐藏在页面中的弹层做标记
            $popup.show().attr("popmark", "popmark");
            // 弹层定位
            _popupPsotion(settings.popupId, settings.position);
            //关闭弹层
            $("#" + settings.popupId + " .close").bind('click', _close);
            // 弹出回调
            if (settings.callback !== null) {
                settings.callback();
            }
            // 倒计时关闭
            if (settings.countdown !== null) {
                // 参数类型判断
                if (typeof settings.countdown == 'number' && settings.countdown > 0) {
                    _countdown(settings.countdown, settings.timeNode, settings.jumpUrl);
                } else {
                    throw new TypeError();
                }
            }
        } else if (settings.htmlUrl !== null) {
            $.ajax({
                	type: "GET",
                	url: settings.htmlUrl,
                	success: function(res) {
                    $('body').append(res);
                    _popupPsotion(settings.popupId, settings.position);
                    //关闭弹层
                    $("#" + settings.popupId + " .close").bind('click', _close);
                    // 弹出回调
                    if (settings.callback !== null) {
                        settings.callback();
                    }
                    // 倒计时关闭
                    if (settings.countdown !== null) {
                        // 参数类型判断
                        if (typeof settings.countdown == 'number' && settings.countdown > 0) {
                            _countdown(settings.countdown, settings.timeNode, settings.jumpUrl);
                        } else {
                            throw new TypeError();
                        }
                    }
                	}
            });
        } else {
            return false;
        }

        //判断是否启用遮罩
        if (settings.maskId !== null) {
            var $mask = $("#" + settings.maskId);
            if ($mask.length > 0) {
                $mask.show();
            } else {
                var maskNode = $("<div class='mask' id='" + settings.maskId + "'>");
                $('body').append(maskNode);
            }
        }

        // 倒计时关闭
        function _countdown(time, node, url) {
            // 参数说明:
            // 1. time是设定的倒计时时间;
            // 2. node是自定义显示倒计时的位置;
            // 3. url是倒计时结束时跳转的url

            var _time = Math.ceil(time);
            var _popup = $("#" + settings.popupId);
            // 如果自定义了时间显示节点名, 则在指定位置显示倒计时
            if (node !== null) {
                _popup.find(node).html(_time + "秒");
            } else {
                _popup.children('.wrap').append($countdown).find($countdown).html(_time + "秒");
            }

            window.clearTimeout(this._t);
            this._t = window.setTimeout(function() {
                _time--;
                if (_time > 0) {
                    // 如果自定义了时间显示节点名, 则在指定位置显示倒计时
                    if (node !== null) {
                        _popup.find(node).html(_time + "秒");
                    } else {
                        _popup.children('.wrap').append($countdown).find($countdown).html(_time + "秒");
                    }
                   return _countdown(time - 1, node, url);
                } else {
                    $("#" + settings.popupId + " .close").click();
                    if (url !== null) {
                        document.location = url;
                        window.clearTimeout(this._t);
                    }
                }
            }, 1000);
        }

        //关闭弹层
        function _close() {
            // 关闭回调
            if (settings.closeCallback !== null) {
                settings.closeCallback();
            }
            if (settings.jumpUrl !== null) {
                document.location = settings.jumpUrl;
            }
            var _popup = $(this).parents("#" + settings.popupId);
            var _mark = _popup.attr("popmark");
            // 如果存在popmark属性则隐藏，否则删除
            if (_mark == "popmark") {
                _popup.hide();
            } else {
                _popup.remove();
            }
            $("#" + settings.maskId).hide();
        }

        //弹层定位
        function _popupPsotion(popupId, position) {
            var $popup = $("#" + popupId),
                $win = $(window),
                winW = $win.width(),
                winH = $win.height(),
                popupW = $popup.width(),
                popupH = $popup.height(),
                scrollT = $win.scrollTop(),
                scrollL = $win.scrollLeft();

            if (position == "fixed") {
                var popupTop = (winH - popupH) / 2,
                    popupLeft = (winW - popupW) / 2;

                $popup.css({
                    position: "fixed",
                    top: popupTop,
                    left: popupLeft,
                    margin: 0
                });
            } else if (position == "absolute") {
                var popupTop = (winH - popupH) / 2 + scrollT,
                    popupLeft = (winW - popupW) / 2 + scrollL;

                $popup.css({
                    position: "absolute",
                    top: popupTop,
                    left: popupLeft,
                    margin: 0
                });
            }
        }
        $(window).resize(function() {
            _popupPsotion(settings.popupId, settings.position);
        });
    };
})(jQuery);
