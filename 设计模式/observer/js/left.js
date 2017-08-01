define(function(require, exports, module) {
    var observer = require('observer');
    var left = {
        createFile: function (name) {
            $('<div class="list" data-type="super">'+name+'</div>').appendTo('#left')
        },
        refresh: function (index, name) {
            $('#left').find('.list').eq(index).text(name);
        },
        del: function (index) {
            $('#left').find('.list').eq(index).remove();
        }
    }

    observer.subscribe('create', function (name) {
        left.createFile(name);
    });


    
    observer.subscribe('delete', function (index) {
        left.del(index);
    })
    observer.subscribe('refresh', function (index, name) {
        left.refresh(index, name)
    });

});
