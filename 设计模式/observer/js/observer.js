define(function(require, exports, module) {
    var observer = {};              // 创建一个储存仓库

    var util = {
        // 订阅方法
        subscribe: function (name, func) {
            if (!observer[name]) {              // 在储存仓库内添加一个事件仓库
                observer[name] = [];
            }
            observer[name].push(func);
        },


        // 发布方法
        publish: function (name, arg) {
            if (!observer[name]){               // 判断是否有本仓库
                return false;
            }
            observer[name].forEach(function (item) {                   // 遍历执行
                item(arg);
            });
        }

    }

    module.exports = util;

});