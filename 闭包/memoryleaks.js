/**
*	内存泄露
*	闭包在ie9 以下的浏览器中会导致内存泄露。具体如：闭包的作用域链中保存着一个HTML元素，
*	那么就意味着该元素无法被销毁。
*/
function assignHandler() {
	var element = document.getElementById("someElement");
	element.onclick = function() {
		alert(element.id);
	};
}

 /**
 以上代码创建了一个作为element 元素事件处理程序的闭包，而这个闭包则又创建了一个循环引用。
 由于匿名函数保存了一个对assignHandler() 的活动对象的引用，因此就会导致无法减少element的引用数。
 只要匿名函数存在，element的引用数最少也是1，因此它所占用的内容就永远不会被回收，不过这个问题可以改写下代码解决。
*/


function assignHandler() {
	var element = document.getElementById("someElement");
	var id = element.id;

	element.onclick = function() {
		alert(id);
	};

	element = null;
}

/**
如上，通过吧element.id 的一个副本保存在一个变量中，并且在闭包中引用该变量消除了循环引用。
但仅仅这一步，还是不能解决内存泄露的问题，必须要记住：闭包会引用包含函数的整个活动对象，而其中包含着element.
即使闭包不直接引用element，包含函数的活动对象中也仍然会保存一个引用，
因此，有必要把element变量设置为null，这样就能够解除对DOM 对象的引用。
*/