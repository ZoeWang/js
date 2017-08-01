define(function(require, exports, module) {
    var observer = require('observer');

    var color = 0;

    observer.subscribe('更换底部颜色', function (name) {
        if (color) {
            $(footer).css('color', 'white');
            color = 0;
        } else {
            $(footer).css('color', 'red');
            color = 1;
        }
    });




    
    $(crazy).on('click', function () {
        observer.publish('create', '我是底部派来的逗比')
    })
});