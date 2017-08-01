define(function(require, exports, module) {
    var observer = require('observer');
    var list = {
        createFile: function (name, flag) {
            if  (!flag) {
                var newDom = $('<li><input value="'+name+'"/></li>');
            } else {
                var newDom = $('<li data-type="super"><input value="'+name+'"/></li>');
            }
            $(filelist).append(newDom);
        },
        deleteFile: function (dom) {
            $(dom).remove();
        }
    }
    module.exports = list;
});