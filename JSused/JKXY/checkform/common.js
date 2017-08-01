(function($) {
	// 提交为空校验
	$.fn.submitEmptyCheck = function(options) {
		var settings = $.extend({
			'note': '该项为必填项',	// 提示文本
			'target': null,			// 文本插入目标位置
			'callback': null			// 回调函数
		}, options);
		
		var $this = $(this);
		var val = $this.val().trim();
		var _note = '<div class="note errTxt">' + settings.note + '</div>';
		var $note = $this.siblings('.note.errTxt');

		if(!val){
			// 删除错误提示
			if (settings.target !== null) {
				settings.target.find('.note.errTxt').remove();
			} else {
				$note.remove();
			}
			// 判断提示文本是否设置
			if (settings.note === null) {
				// 判断文本插入目标是否设置
				if (settings.target === null) {
	            		$(this).parent().append('<div class="note errTxt">该项为必填项</div>');
				} else {
					settings.target.append('<div class="note errTxt">该项为必填项</div>');
				}
			} else {
				// 判断文本插入目标是否设置
				if (settings.target === null) {
	            		$(this).parent().append(_note);
				} else {
					settings.target.append(_note);
				}
			}
			// 获取焦点时删除错误提示
			$this.bind("focus", function() {
				var $note = $this.siblings('.note.errTxt');
				if (settings.target !== null) {
					settings.target.find('.note.errTxt').remove();
				} else {
					$note.remove();
				}
			});
			return false;
		} else if (settings.callback !== null) {
			// 回调函数
			return settings.callback();
		}
	};
})(jQuery);