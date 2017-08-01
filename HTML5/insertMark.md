# HTML5 插入标记

## innerHTML
* innerHTML 属性有两种模式，写模式 与 读模式
* 在读的模式下，返回的是html代码字符串

```	
<div id = "content">  
    <p>This is a <strong>paragraph</strong>with a list following it.</p  
    <ul>  
        <li>Item 1 </li>  
        <li>Item 2 </li>  
        <li>Item 3 </li>  
    </ul>  
</div>

script 执行
var div = document.getElementById("content");
div.innerHTML
结果如下
<p>This is a <strong>paragraph</strong>with a list following it.</p>
    <ul>  
        <li>Item 1 </li>  
        <li>Item 2 </li>  
        <li>Item 3 </li>  
    </ul>  
```
* 这里要注意，不同的浏览器返回文档格式不同!   IE 与 Opear 返回的 html元素标签都是大写的，而 火狐,chrome, safari,等 原原本本的返回。

* 在写模式下，innerHTML属性的值 会被解析为DOM子树，替换调用元素的所有子节点。
* 如果是不包含html元素标签的纯文档，那么结果就是设置纯文本,例如:

```
div.innerHTML = "hello";
```
* 如果 字符串包含 html标签，例如

```
div.innerHTML = "Hello & welcome, <b>\"reader\"!</b>";

结果
<div id="content">Hello & welcome, <b>"reader"!</b></div>
```
* 设置了innerHTML 之后，可以像访问文档中的其他节点一样访问新创建的节点。

> 并不是所有的html元素都支持 innerHTML属性: 
> 不支持innerHTML的元素有: 

```
<col>,<colgroup>,<frameset>,<head>,<html>,<style>,<table>,<tbody>,<thead>,<tfoot>,<tr>
```
> 此外，IE8以及更早IE版本，\<title> 也没有innerHTML属性。


## outerHTML

* 在读模式下outerHTML,返回调用它的元素及所有子节点的HTML标签。在写模式下，outerHTML 会根据指定的HTML字符串创建新的DOM子树，然后用这个DOM子树完全替换调用元素。下面是 一个例子。  

```
<div id = "content">  
    <p>This is a <strong>paragraph</strong>with a list following it.</p>
    <ul>  
        <li>Item 1 </li>  
        <li>Item 2 </li>  
        <li>Item 3 </li>  
    </ul>  
</div> 
```

* 如果在\<div>元素上调用outerHTML，会返回上面相同的代码，包括<div>本身。不过由于浏览器解析和解释HTML标记不同，结果也可能有所不同。（这里的不同与使用innerHTML属性时存在的差异性质是一样的。）
* 使用outerHTML以下面这种方式设置值：

```
 div.outerHTML = "<p> p tag replace div tag</p>"; 
// 行代码完成操作与下面的DOM 脚本代码一样。
var p = document.createElement("p");  
p.appendChild(document.createTextNode("p tag replace div tag"));  
div.parentNode.replaceChild(p,div);  
```
*  结果就是新建\<p>元素去替换原来的\<div>元素。
*  支持outerHTML属性的浏览器有IE4+、Safari4+、Chrome和Oprea 8+。firfox 7及之前的版本都不支持outerHTML属性。


## insertAdjacentHTML()

* 插入标记的最后一新增方式是insertAdjacentHTML()方法。这个方法最早也是在IE中出现的,它接收了两个参数：插入位置和要插入的HTML文本。第一参数必须是下列的值之一

> beforebegin:在当前的元素之前插入一个紧邻的同辈元素；
> 
> afterbegin：在当前的元素之下插入一个新的子元素或者第一个元素之前再插入一个新的元素；
> 
> beforeend：在当前元素之下再插入一个新的子元素或者在最后一个子元素再插入一个新的元素；
> 
> afterend，在当前元素之后插入一个紧邻的同辈元素。 

* 注意，这些值都必须是小写形式。第二个参数是一HTML字符串（与innerHTML和outerHTML值相同）如果浏览器无法解析该字符串，就会抛出错误。以下是这种方法的基本示例。

```
//作为前一个同辈插入 
element.inserAdjacentHTML("beforebegin","<p>Hello world!</p>");

//作为第一个元素插入
element.insertAdjacentHTML("afterbegin","<p>Hello world!</p>");

//作为最后一个子元素
element.insertAdjacentHTML("beforeend","<p>Hello world!</p>"); 

//作为后一个同辈元素插入  
element.insertAdjacentHTML("afterend","<p>Hello world!</p>");  
```

* 支持insertAdacenHTML()方法的浏览器IE、Firefox 8+、Safari、Opera 和Chrome。


## 内存与性能问题 
> 使用replaceChild替换子节点的方法可能会导致浏览器内存占用问题，尤其是在IE中  问题更加明显。在删除带有事件删除程序或引用了其他JavaScript对象子树时，就有可能导致内存占用的问题。假设某个元素有事件处理程序（或者引用其他的JavaScript对象树）在使用前叙某个元素从文档中删除后，元素与事件处理程序（或者javaScript对象）之间  绑定关系在内存中并没有一并删除。如果这种情况频繁出现，页面占用的内存数量就会明 显增加。因此，在使用innerHTML、outerHTML属性和insertAdjacentHTML()方法时。最后 先手工删除要被替换的元素的所有事件处理程序和JavaScript对象属性。  
> 
> 不过使用几个属性 特别是innerHTML，仍然可以给我提供很多的便利。一般来说插入大量新的HTML标记时，使用innerHTML属性与通过多次DOM操作创建节点再指定他们之间的关系来说，效率要高得多。这是因为使用innerHTML和outerHTML时，就会创建一个HTML解 析器。这个解析器是浏览器级别的代码（通常是C++）基础上运行的，因此比执行javaScript快得多。不可避免地，创建和销毁HTML解析器也带来性能损失，所有最后把使用innerHTML和outerHTML的使用此时控制在合理的范围内，即能拼接长的HTML串一次给innerHTML赋值的情况下就一次赋值，而不去每添加一个元素就给innerHTML赋值。