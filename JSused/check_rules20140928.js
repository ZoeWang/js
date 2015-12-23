var zhffTip = {};
zhffTip.langs = {
    "errTpl": {
        "noText": "请输入{0}.",
        "invalidName": "请输入汉字(至少2个)或者英文名字(至少4个)",
        "exceedFullName": "Your full name cannot exceed 34 characters",

        // "noName": "请输入姓名",
        // "noid": "请输入身份证",
        // "isNumber": "请输入数字",
        // "noShippingAddress": "请输入地址.",
        // "nofix": "请输入传真",

        "shortShippingAddress": "至少输入 {0} 个字符.",
        "moreShippingAddress": "请输入不超过 {0} 个字符.",
        "shippingAddress": "请输入正确的{0}",

        // "fix": "请输入正确的传真",
        // "Id": "请输入正确的身份证号码",
        // "phone": "请输入正确的电话",

        "instit": "请输入{0}位字母或数字",
    },
    "errTxt": {
        "noEmailAddress": "Please enter an email address.",
        "invalidEmailAddress": "Please check your email format.",
    }
};

String.prototype.stringFormat = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i])
    };
    return formatted
};
$.fn.formCheck = function(items, params, type) {
    if (!params) params = {};
    params.rules = $.extend({
        'null': function(obj, checks) {      //Whether is empty
            return $.trim($(obj).val()).length > 0
        },
        'maxlength': function(obj, checks) {   
            return $.trim($(obj).val()).length <= checks.maxlength
        },
        'minlength': function(obj, checks) {
            return $.trim($(obj).val()).length >= checks.minlength
        },
        'digitMinlength': function(obj, checks) {
            return $.trim($(obj).val().replace(/[^0-9]/g, '')).length >= checks.minlength
        },
        'min': function(obj, checks) {
            return parseInt($(obj).val()) >= checks.min
        },
        'max': function(obj, checks) {
            return parseInt($(obj).val()) <= checks.max
        },
        'number': function(obj, checks) {
            return /^[0-9]+$/.test($.trim($(obj).val()))
        },
        'select': function(obj, checks) {
            return $(obj).val() != checks.value
        },
        'checked': function(obj, checks) {              
            return obj.checked
        },
        'email': function(obj, checks) {
            return /(\,|^)([\w+._]+@\w+\.(\w+\.){0,3}\w{2,4})/.test($(obj).val().replace(/-|\//g, ''))
        },
        'numabc': function(obj, checks) {   //只允许数字和小写英文
            return /^((.*[0-9]+.*[a-z]+.*)|(.*[a-z]+.*[0-9]+.*))$/i.test($.trim($(obj).val()))
        },
        'numAbc': function(obj, checks) {
            return /^[a-zA-Z0-9]+$/.test($.trim($(obj).val()))
        },
        'password': function(obj, checks) {
            return /^((.*[0-9]+.*[a-z]+.*)|(.*[a-z]+.*[0-9]+.*))$/i.test($.trim($(obj).val()))
        },
        'chinese':function(obj, checks){
            return /[\u4e00-\u9fa5]/.test($.trim($(obj).val())) && $.trim($(obj).val()).replace(/[\s]+/g, ' ').length <= checks.maxlength
        },
        'cellphone': function(obj, checks) {
            return /(^((13[0-9])|(15[0-9])|(170)|(18[0-9])|)\d{8}$)/.test($(obj).val())
        },
        'telephone': function(obj, checks) {
            return /(^(0[1-9]\d{1,2}\-?)?[1-9]\d{6,7}$)/.test($(obj).val())
        },
        'phone': function(obj, checks) {
            return /(^((13[0-9])|(15[0-9])|(170)|(18[0-9])|)\d{8}$)|(^(0[1-9]\d{1,2}\-?)?[1-9]\d{6,7}$)/.test($(obj).val())
        },
        'zhoren':function(obj, checks){       //只能中文或只能英文
            return /(^[a-zA-Z]{4,30}$)|^[\u4e00-\u9fa5]{2,4}$/.test($.trim($(obj).val()))
        },
        'fax':function(obj, checks){    //传真
            return /^(\d{3,4})?(\-)?\d{7,8}$/.test($.trim($(obj).val()))
        },
        'cardId':function(obj, checks){
            return /(^[1-9]\d{14}$)|(^[1-9]\d{17}$)|(^[1-9]\d{16}(\d|X|x)$)/.test($.trim($(obj).val()))
        },
        'user': function(obj, checks) {     //中英文混排
            return /^(?!\d)[a-zA-Z0-9\u4e00-\u9fa5_]{5,18}$/.test($.trim($(obj).val()))
        },
    },
    params.rules);
    var result = true,
    focused = false;
    function checkItem(item, checks) {
        for (j in checks) {
            if (params.rules[checks[j].type]) if (params.rules[checks[j].type](item, checks[j])) continue;//通过验证继续循环
            if (!focused && !checks[j].noFocus) {
                if ($(item).offset().top < $(window).scrollTop()) {
                    $('html, body').animate({
                        scrollTop: $(item).offset().top
                    },
                    'fast')
                }
                focused = true
            };
            if (checks[j].showError) {
                checks[j].showError();
                result = false;
                break
            } else if (params.showErrType1) {
                params.showErrType1($(item), checks[j].errMsg);
                result = false;
                break
            } else if (params.errinfoFinder) {
                params.errinfoFinder($(item)).text(checks[j].errMsg);
                $(item).focus(function() {
                    params.errinfoFinder($(item)).text('')
                });
                if ($(item).attr('type') != null && $(item).attr('type').toLowerCase() == 'checkbox') {
                    $(item).click(function() {
                        $(item).focus()
                    })
                };
                result = false;
                break
            } else if (checks[j].errMsg) {
                alert(checks[j].errMsg);
                return false
            }
        };
        return true
    };
    function checkElm(elm) {
        for (i = 0; i < elm.length; i++) {
            if ($(elm[i]).attr('id') && $(elm[i]).attr('id').length == 0 || $(elm[i]).attr('disabled')) continue;
            var checks = items[$(elm[i]).attr('id')];
            if (!checks) continue;//没有规则 继续下一个表单元素
            if (!checkItem(elm[i], checks)) return false
        }
    }
    if (type) {
        for (n = 0; n < type.length; n++) {
            checkElm(this.find(type[n]))
        }
    } else {
        checkElm(this[0])           //验证表单入口
    }
    
    //提交后提交按钮禁用，防止表单重复提交
    if(result){
        $("#"+params.submitBtn).attr("disabled",true);
    }

    return result   //true 表单提交 false 表单不提交
};

