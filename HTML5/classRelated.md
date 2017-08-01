# HTML5 与类相关的扩展
--------------------
## getElementsByClassName() 方法

* 兼容性 IE9+、FIrefox 3+、Safari 3.1+ 、Chrome和Opera9.5+
* 返回NodeList 对象，有性能问题

```
// 取得所有类中包含"username" 和 "current" 的元素，类名的先后顺序无所谓
	var allCurrentUsername = document.getElementsByClassName("username current");

// 取得ID为myDiv 的元素中类名”selected“的所有元素  后代
	var selected = document.getElementById("myDiv").getElementsByClassName("selected");
```

## classList 属性
* 兼容性firefox 3.6+ 、Chrome。没有IE

```
<div class="user bd disabled"></div>
```

* 这个div一共3个class，从中删除一个，请看下面例子


```
	<script>
		// 删除user类

		// 首先，取得类名字符串并拆分成数组    \s+ 正则代表空白
		var classNames = div.className.split(/\s+/);  

		// 找到要删除的类名
		var pos = -1,
			i,
			len;
		for (i=0, len = className.length; i < lenl i++) {
			if(classNames[i] == "user") {
				pos = i;
				break;
			}
		}

		// 删除类名
		classNames.splice(i,1);

		// 把剩下的类名拼成字符串并重新设置
		div.className = classNames.join(" ");
	</script>
```
	
####classList 属性是新集合类型DOMTokenList 的实例。有个表示元素类名个数的length 属性，只读，取得每个元素可以使用item()方法。也可是使用方括号语法

* item() 支持一个参数，为类名的索引，返回对应的类名，

```	
div.classList.item(0);  //  结果是 user
//如果超出索引范围
div.classList.item(3);	// 结果是 null
```
* add() 支持一个类名字符串参数。表示往类名列表中新增一个类名；如果之前类名存在，则添加忽略。例如：

```
div.classList.add("bd");
div.classList.length	// 3

// 此函数方法执行的返回值是undefined, 因此，classList的add()方法是无法级联的。下面的remove()方法也是如此。
```

* remove() 支持一个类名字符串参数。表示往类名列表中移除该类名。例如：

```
div.classList.remove("bd");
div.classList.length	// 2
```

* toggle() 支持一个类名字符串参数。无则加勉，有则移除之意。若类名列表中有此类名，移除之，并返回false; 如果没有，则添加该类名，并返回true.

```
div.classList.toggle("user");  //切换user类
```

* contains() 支持一个类名字符串参数。表示往类名列表中是否包含该类名。有点对应jQuery中的hasClass方法，注意，这里的是contains而不是contain，后面有个s哦！
* 返回值很易懂的。如果包含，则返回true, 不包含，则false. 例如：

```
div.classList.contains("bd");		// false 上面remove了
```

> classList的返回值显示，其本质上是DOMTokenList – DOM标记列表.
> DOMTokenList 这种类型表示一组空间分隔的标记，通常由 HTMLElement.classList, HTMLLinkElement.relList,HTMLAnchorElement.relList 或 HTMLAreaElement.relList 返回。从0开始的类Javascript数组索引。DOMTokenList 始终是区分大小写的。
> 

* classList局限 除了上面提到的不能级联外，还有就是不能一次性 add或remove或toggle 多个类名。
* classList的扩展 adds

```
DOMTokenList.prototype.adds = function(tokens) {
	tokens.split(" ").forEach(function(token) {
		this.add(token);
	}.bind(this));
	return this;
};

div.adds("a b c").toString();		//" user bd disabled a b c"
```


# 焦点管理
* 兼容性 IE 4+ 、FIrefox 3+ 、 Safari 4+ 、Chrome、Opera 8+ 
#### html5 增加了document.activeElement 属性，这个属性始终会引用DOM中的获得了焦点的元素。

```
var button = document.getElementById("myButton");
button.focus();
alert(document.activeElement === button);  // true
```
* 默认情况下，文档刚刚加载完，document.activeElement 中保存的是document.body 元素的引用。文档加载期间，document.activeElement = null.

#### document.hasFocus() 方法，这个方法用于确定文档是否获取了焦点

```
var button = document.getElementById("myButton");
button.focus();
alert(document.hasFocus());
```
















