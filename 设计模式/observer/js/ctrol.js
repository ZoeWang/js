define(function(require, exports, module) {
    var list = require('list');
    var observer = require('observer');




    $(createFile).on('click', function () {
        list.createFile('新建文件夹');
    });





    $(filelist).on('click', '.del', function () {
        if ($(this).closest('li').attr('data-type') == 'super') {
            var index = $(this).closest('li').index('#filelist li[data-type="super"]');

            // 点击删除时候触发 删除事件
            observer.publish('delete', index);
        }
        list.deleteFile($(this).closest('li'));
    });



    $('#filelist').on('keyup', 'li', function (e) {
        if (e.keyCode === 13) {
            $(this).text($(this).find('input').val());
            $('<a class="del" style="margin-left: 10px;" href="javascript:;">x</a>').appendTo($(this));
        }
        if ($(this).closest('li').attr('data-type')) {
            var index = $(this).closest('li').index('#filelist li[data-type="super"]');
            observer.publish('refresh', index, $(this).find('input').val());
        }
    });


    observer.subscribe('create', function (name) {
        list.createFile(name, true);
    });
});