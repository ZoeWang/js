# HTMLDocument 
* readyState 属性

> IE4最早为document对象引人readyState属性。然后，其他浏览器也陆续添加这个属性， 最终HTML5把这个属性纳入标准当中。
> 
> Document的readyState属性有两个可能的值：
>  
> loading：正在加载文档；  
> complete：已经加载完文档。
>  
> 使用document.readyState的最恰当方式，就是通过它来实现一个指示文档已经加载完成的指示器。
> 在这个属性得到广泛支持之前，要实现这样一个指示器，必须借助onload事件处理程序设置一个标签，表明文档已经加载完毕。
> document.readyState属性基本用法如下。
> 
``` 
if(document.readyState == 'complete'){ 
     //执行操作。 
} 
```
> 支持readyState的浏览器有IE4+、Firefox 3.6+、Safari、Chrome、Opera 9+。 


* 兼容模式

> 从IE6开始区分渲染页面的模式是标准还是混杂，检测页面的兼容模式就成为浏览器的必要功能。IE为此给documeng添加了一个名为compatMode的属性，这个属性就是为了告诉开发人员浏览器采用哪种渲染模式。就像下面例子中所展示的那样，在标准模式下，
> document.compatMode 的值等于“CSS1Compat”，而在混杂模式下，document.compatMode的值等于“BackCompt”

```
if(document.compatMode == "CSS1Compat") {
	alert("标准模式 Standards mode ");
}else {
	alert("混杂模式 Quirks mode");
}
```
> 后来，陆续实现该属性的浏览器有Firefox、Safari 3.1+、Oprea和Chrome。最终，HTML5也把该属性纳入标准，并对其做出了明确的规定。

* head 属性

> 作为对document.body引用文档<body>元素的补充，HTML5新增了document.head属性，引用<head>属性可以使用document.head，当然最好使用下面的兼容方法；
> 

```
var head = document.head || document.getElementsByTagName("head")[0];
```
> 如果支持document.head就有该方法如果不支持就用原始的getElementsByTagName("head")[0]; 实现了document.head属性的浏览器包括Chrome和Safari 5。