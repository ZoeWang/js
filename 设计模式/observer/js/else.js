define(function(require, exports, module) {


    var observer = require('observer');

    $(bigThing).on('click', function () {
        // console.log(123)
        observer.publish('create', '大事件！');

        observer.publish('更换底部颜色')
    });
});