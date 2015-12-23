/*!
 * function
 * Version: 1.0.0
 * Create: wxf
 * Date: 2015-01-27 
 */
//输出o的每个属性名称和值，返回undefined
function printprops(o){
    for(var p in o)
        console.log(p + ':' + o[p] + '\n');
}   
//调用 
printprops({x:1}); 

//计算两个笛卡尔坐标（x1,y1）和（x2,y2）之间的距离
function distance(x1, y1, x2, y2){
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.sqrt(dx*dx + dy*dy);    //sqrt() 方法可返回一个数的平方根
}
//调用
var total = distance(0,0,2,1) + distance(2,1,3,5);

//计算阶乘的递归函数（调用自身的函数）
//x! 的值是从x到x递减（步长为1）的值的累乘
function factorial(x) {
    if(x <= 1) return 1;
    return x * factorial(x-1);
}
//调用
var probability = factorial(5)/factorial(13);

//这个函数表达式定义了一个函数用来求传入参数的平方
//注意我们把它赋给一个变量
var square = function(x) { return x*x; }

//函数表达式可以包含名称，这在递归时很有用
var f = function fact(x) { if(x <= 1) return 1; else return x*fact(x-1); };

//函数表达式也可以作为参数传给其他函数
data.sort(function(a,b) { return a-b; });

//函数表达式有时定以后立即调用
var tensquared = (function(x) {return x*x;}(10));

//嵌套函数
function hypotenuse(a, b) {
    function square(x) { return x*x; }
    return Math.sqrt(square(a) + square(b));
}

//定义并调用一个函数来确定当前脚本运行时是否为严格模式
var strict = (function() { return !this; }());

//函数体可以使用关键字this引用该对象
var calculator = {  //对象直接量
    operand1:1,
    operand2:1,
    add: function(){
        //注意this关键字的用法，this指代当前对象
        this.result = this.operand1 + this.operand2;
    }
};
calculator.add();   //这个方法调用计算1+1的结果
calculator.result   // => 2

//函数调用
o["m"](x,y);    //o.m(x,y) 的另一种写法
a[0](z)         //同样是一个方法调用（这里假设a[0]是一个函数）
customer.surname.toUpperCase();     //调用customer.surname 的方法
f().m();            //在f() 调用结束后继续调用返回值中的方法m()

//嵌套的函数不会从调用它的函数中继承this。
//如果嵌套函数作为方法调用，其this值指向调用它的对象。
//如果嵌套函数作为函数调用，其this值不是全局对象（非严格模式下）就是undefined（严格模式下）。
//this 作用域 
var o = {                                   //对象o
    m: function() {                         //对象中的方法m()
        var self = this;                    //将this值保存至一个变量中
        console.log(this === o);            //输出true，this就是这个对象o
        f();                                //调用辅助函数f()

        function f() {                      //定义一个嵌套函数f()
            console.log(this === o);        //"false": this的值是全局对象或undefined
            console.log(self === o);        //"true": self 指外部函数的this值
        }
    }
};


// 可选形参
// 将对象o中可枚举的属性名追加至数组a中，并返回这个数组a
// 如果省略a，则创建一个新数组并返回这个新数组
function getPropertyNames(o, /* optional */ a) {
    if(a === undefined) a = [];     // 如果未定义，则使用新数组
    for (var property in o) a.push(property);
    return a;
}
// 这个函数调用可以传入1个或2个实参
var a = getPropertyNames(o);        // 将o的属性存储到一个新数组中
getPropertyNames(p, a);             // 将p的属性追加至数组a中

/*如果第一行代码中不使用if语句，可以用"||"运算符，
    a = a || [];
使用"||"运算符代替if语句 前提是 a 必须预先声明，本例中a是作为形参传入，相当于var a
 */


 //可变长的实参列表
 //标识符arguments 是指向实参对象的引用，是一个类数组对象
 function f(x,y,z){
    //首先，验证传入实参的个数是否正确
    if(arguments.length != 3) {
        throw new Error("function f called with " + arguments.length + "arguments, but it expects 3 arguments.");
    }
    // 再执行其他函数
 }


 //接收任意数量的参数，并返回传入实参的最大值
 function max(/*...*/) {
    //该值代表负无穷大
    var max = Number.NEGATIVE_INFINITY;
    //遍历实参，查找并记住最大值
    for (var i = 0; i < arguments.length; i++)
        if(arguments[i] > max) max = arguments[i];
    //返回最大值
    return max;
 }

 var largest = max(1, 10, 100, 2, 3, 1000, 4, 5, 10000, 6); //=>10000

 //通过arguments[] 数组可获取都更改后的值
 function f(x) {
    console.log(x);     //输出实参的初始值
    arguments[0] = null;    //修改实参数组的元素同样会修改x的值
    console.log(x);     //输出 "null"
 }


 //callee属性指代当前正在执行的函数
 //caller属性指代调用当前正在执行的函数的函数
 //匿名函数中通过callee 来递归的调用自身
 var factorial = function(x) {
    if(x <= 1) return 1;
    return x*arguments.callee(x-1);
 }

 /*
  * 将对象属性用作实参
  */
//将原始数组的length元素复制至目标数组
//开始复制原始数组的from_start元素
//并且将其复制到目标数组to_start中
//要记住实参的顺序并不容易
function arraycopy(/* array */ from, /* index */ from-start, /* array */ to, /* index */ to_start, /* integer */ length)
{
    //逻辑代码
}

//这个版本实现效率稍微有些低，但你不必去记住实参的顺序
// 并且 from_start 和 to_start 都是默认为0
function easycopy(args) {
    arraycopy(args.from,
              args.from_start || 0,     //注意这里设置了默认值
              args.to,
              args.to_start || 0, args.length);
} 
// 来看如何调用 easycopy();
var a = [1,2,3,4], b=[];
easycopy({ from: a, to: b, length: 4 });

//当一个方法可以接受任意数量的实参时，可以用省略号
function max(/* number... */)}{/* 代码区 */}

// 返回数组（或类数组对象）a 的元素累加和
//数组a 中必须为数字，null 和 undefined 元素都将忽略
function sum(a) {
    if(isArrayLike(a)) {
        var total = 0;
        for(var i = 0; i<a.length; i++){    //遍历所有元素
            var element = a[i];
            if(element == null) continue;   //跳过 null 和 undefined
            if (isFinite(element)) total += element;    //如果element 是有限数字 累加
            else throw new Error("sum(): elements must be finite numbers");
        }
        return total;
    }
    else throw new Error("sum(): arguments must be array-like");
}


//可以接收任意数量的实参，
//并可以递归的处理实参是数组的情况
function flexisum(a) {
    var total = 0;
    for (var i=0; i<arguments.length; i++) {
        var element = arguments[i], n;
        if(element == null) continue;       //忽略null和undefined实参
        if(isArray(element))                //如果实参是数组
            n = flexisum.apply(this, element);  //递归的计算累加和
        else if(typeof element ===  "function") //否则，如果是函数...
            n = Number(element());              //调用它并做类型转换
        else
            n = Number(element);                //否则直接做类型转换
        if(isNaN(n))    //如果无法转换为数字，则抛出异常
            throw Error("flexisum(): can't convert " + element + " to number");
        total +=n;      //否则，将n 累加至totals
    }
    return total;
}


/**
 * 作为值的函数
 */
function square(x) { return x*x; }
var s = square;     //现在s和square 指代同一个函数
square(4);          //=>16
s(4);               //=>16
var o = {square: function(x) {return x*x; }}; //对象直接量
var y = o.square(16);                         //y 等于 256
var a = [function(x) { return x*x; }, 20];    // 数组直接量
a[0](a[1]);                                   //=> 400

//将函数用作值
//在这里定义一些简单的函数
function add(x, y) { return x + y; }
function subtract(x, y) { return x - y; }
function multiply(x, y) { return x * y; }
function divide(x, y) { return x / y; }

//这里的函数以上面的某个函数作为参数
//并给它传入两个操作数然后调用它
function operate(operator, operand1, operand2) {
    return operator(operand1, operand2);
}

// 这行代码所示的函数调用实际上计算了 (2+3) + (4*5) 的值
var i = operate(add, operate(add, 2, 3), oprate(multiply,4,5));

// 我们为这个例子重复实现一个简单的函数
// 这次实现使用函数直接量，这些函数直接量定义在一个对象直接量中
var operators = {
    add: function(x, y) { return x + y; },
    subtract: function(x, y) { return x - y; },
    multiply: function(x, y) { return x * y; },
    divide: function(x, y) { return x / y; },
    pow: Math.pow   //使用预定义函数
};

//这个函数接收一个名字作为运算符，在对象中查找这个运算符
//然后将它作用于所提供的操作数
//注意这里调用运算符函数的语法        //
function operate2(operation, operand1, operand2) {
    if(typeof operators[operation] === "function")
        return operators[operation](operand1, operand2);
    else throw "unknown operator";
}

//这样来计算（"hello" + " " + "world"）的值
var j = operate2("add", "hello", operate2("add", "", "world"));
// 使用预定义的函数Math.pow()
var k = operate2("pow", 10, 2);

/*
 * 自定义函数属性
 */
//计算阶乘，并将结果缓存至函数的属性中
function factorial(n){
    if(isFinite(n) && n>0 && n==Math.round(n)) {      // 有限的正整数
        if(!(n in factorial))                         // 如果没有缓存结果
            factorial[n] = n * factorial(n-1);        // 计算结果并缓存之
        return factorial[n];                          // 返回缓存结果
    }
    else return NaN;        // 如果输入有误
}
factorial[1] = 1;   // 初始化缓存以保存这种基本情况

/**
 * 作为命名空间的函数
 */
function mymodule() {
    // 模块代码
    // 这个模块所使用的所有变量都是局部变量
    // 而不是污染全局命名空间
}
mymodule(); //不要忘了调用这个函数

//匿名函数
(function() {   // mymodule() 函数重写为匿名函数表达式
    // 模块代码
}());           // 结束函数定义并立即调用它


/* 特定场景下返回带补丁的extend() 版本
 */
//定义一个扩展函数，用来将第二个以及后续参数复制至第一个参数
//这里我们处理了 IE bug: 在多数IE版本中
// 如果o的属性拥有一个不可枚举的同名属性，则 for/in 循环
// 不会枚举对象o的可枚举属性，也就是说，将不会正确的处理诸如toString的属性
// 除非我们显式检测它
var extend = (function() {  //将这个函数的返回值赋值给extend
    // 在修复它之前，首先检查是否存在bug
    for(var p in { toString: null}) {
        // 如果代码执行到这里，那么for/in循环会正确工作并返回
        // 一个简单版本的extend()函数
        return function extend(o) {
            for (var i = 0; i < arguments.length; i++) {
                var source = arguments[i];
                for(var prop in source) o[prop] = source[prop];
            };
            return o;
        }
    }
    // 如果代码执行到这里，说明for/in循环不会枚举测试对象的toStrong属性
    // 因此返回另一个版本的extend()函数，这个函数显示测试
    //Object.prototype中的不可枚举属性
    return function pathed_extend(o) {
        for (var i = 0; i < arguments.length; i++) {
            var source = arguments[i];
            // 复制所有可枚举属性
            for(var prop in source) o[prop] = source[prop];

            // 现在检查特殊属性
            for(var j = 0; j < protoprops.length; j++) {
                prop = protoprops[j];
                if (source.hasOwnProperty(prop)) o[prop] = source[prop];
            }
        };
        return o;
    }

    // 这个列表列出了需要检查的特殊属性
    var protoprops = ["toString", "valueOf", "constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocalString"];

} ());

/**
 * 闭包
 */
//用闭包重写uniqueInteger() 函数
var uniqueInteger = (function() {   //定义函数并立即调用
    var counter = 0;                // 函数的私有状态
    return function() { return counter++; };
}());

// 像counter一样的私有变量不是只能用在一个单独的闭包内，在同一个外部函数内定义的多个嵌套函数可以访问他，
// 这多个嵌套函数都共享一个作用域链

function counter() {
    var n=0;
    return {
        count: function() { return n++; },
        reset: function() { n = 0;}
    };
}

var c = counter(), d = counter();       // 创建两个计数器
c.count()                               // => 0
d.count()                               // => 0: 它们互不干扰
c.reset()                               // => 0: reset() 和 count() 方法共享状态
c.count()                               // => 0: 因为我们重置了c
d.count()                               // => 1: 而没有重置d

//这里私有状态的实现利用了闭包，而不是普通对象属性来实现的
function counter(n) {   //函数参数n是一个私有变量
    return {
        // 属性getter方法返回并给私有计数器var递增1
        get count() { return n++; },
        // 属性setter不允许n递减
        set count(m) {
            if (m >=n) n = m;
            else throw Error("count can only be set to a larger value");
        }
    };
}
var c = counter(1000);
c.count     // => 1000
c.count     // => 1001
c.count = 2000    
c.count     // => 2000
c.count = 2000  // => Error!

/* 利用闭包实现的私有属性存取器方法（没看懂）
 */
//这个函数给对象o增加了属性存取器方法
//方法名称为get<name>和set<name>.如果提供了一个判定函数
//setter方法就会用它来检测参数的合法性，然后在存储它
//如果判定函数返回false,setter方法抛出一个异常
//
// 这个函数有个非同寻常之处，就是getter和setter函数
//所操作的属性值并没有存储在对象o中
//相反，这个值仅仅是保存在函数中的局部变量中
//getter和setter方法同样是局部函数，因此可以访问这个局部变量
//也就是说，对于两个存取器方法来说这个变量是私有的
//没有办法绕过存取器方法来设置或修改这个值
function addPrivateProperty(o, name, predicate) {
    var value;  //这个是属性值

    // getter 方法简单的将其返回
    o["get" + name] = function() { return value; };

    // setter 方法首先检查值是否合法，若不合法就抛出异常
    // 否则就将其存储起来
    o["set" + name] = function(v) {
        if (predicate && !predicate(v))
            throw Error("set" + name + ": invalid value " + v);
        else
            value = v;
    };
}

//下面的代码展示了addPrivateProperty()方法
var o = {};     //设置一个空对象

// 增加属性存取器方法getName()和setName()
// 确保只允许字符串值
addPrivateProperty(o, "Name", function(x) { return typeof x == "string"; });

o.setName("Frank");     // 设置属性值
console.log(o.getName());   //得到属性值
o.setName(0);           // 试图设置一个错误类型的值

/* 闭包和循环代码
*/
//这个函数返回一个总是返回v的函数
function constfunc(v) { return function() { return v; };}

//创建一个数组用来存储常用函数
var funcs = [];
for(var i = 0; i<10; i++) funcs[i] = constfunc(i);

// 在第五个位置的元素所表示的函数返回值为5
funcs[5]() //=> 5

// 返回一个函数组成的数组，它们返回值是0-9 （错误-循环代码移入闭包）
function constfuncs(){
    var funcs = [];
    for (var i = 0; i < 10; i++) {
        funcs[i] = function(){ return i;};
    return funcs;
}

var funcs = constfuncs();
funcs[5]() // 返回值 一直是 10

//length 属性
//这个函数使用arguments.callee,因此它不能在严格模式下工作
function check(args) {
    var actual = args.length;       //实参的真实个数
    var expected = args.callee.length;      //期望的实参个数
    if(actual !== expected)         //如果不同则抛出异常
        throw Error("Expected " + expected + "args; got " + actual);
}

function f(x,y,z) {
    check(arguments);       // 检查实参个数和期望的实参个数是否一致
    return x + y + z;       // 再执行函数后徐逻辑
}

//apply 方法
//将对象o中名为m()的方法替换为另一个方法
//可以在调用原始的方法之前和之后记录日志消息
function trace(o, m) {
    var original = o[m];    // 在闭包中保持原始方法
    o[m] = function() {     // 定义新的方法
        console.log(new Date(), "Entering:", m);    //输出日志消息
        var result = original.apply(this, arguments);   //调用原始函数
        console.log(new Date(), "Exiting:", m);     //输出日志消息
        return result;          //返回结果
    }
}
// trace() 函数接收两个参数，一个对象和一个方法名，它将指定的方法替换为一个新方法，这个新方法是“包裹”原始方法的另一个泛函数。
// 这种动态修改已有方法的做法有时称做“monkey-patching”。

//bind 方法
function f(y) {return this.x + y;}      //这个是待绑定的函数
var o = {x:1};      //将要绑定的对象
var g = f.bind(o);  //通过调用g(x)来调用o.f(x)
g(2) //=>3

// 返回一个函数，通过调用它来调用o中的方法f(), 传递它所有的实参
function bind(f,o) {
    if(f.bind) return f.bind(o);    //如果bind() 方法存在的话，使用bind()方法
    else return function() {        //否则，这样绑定
        return f.apply(o, arguments);
    }
}

//传入bind()的实参会绑定至this，这是一种常见的函数式编程技术，“柯里化” currying
var sum = function(x,y) { return x + y};    //返回两个实参的和值
// 创建一个类似sum的新函数，但this的值绑定到null
// 并且第一个参数绑定到1，这个新的函数期望只传入一个实参
var succ = sum.bind(null,1);
succ(2) //=>3 : x绑定到1，并传入2作为实参y

function f(y,z) { return this.x + y + z};   //另外一个做累加计算的函数
var g = f.bind({x:1},2);
g(3)        //=> 6: this.x 绑定到1，y绑定到2，z绑定到3


// ECMAScript 3 版本的Function.bind() 方法 
if(!Function.prototype.bind) {
    Function.prototype.bind = function(o /*, args */) {
        // 将this 和 arguments的值保存至变量中
        // 以便在后面的嵌套函数中可以使用它们
        var self = this, boundArgs = arguments;

        // bind() 方法的返回值是一个函数
        return function() {
            // 创建一个实参列表，将传入bind()的第二个及后续的实参都传入这个函数
            var args = [],i;
            for(i = 1; i < boundArgs.length; i++) args.push(boundArgs[i]);
            for(i = 0; i < arguments.length; I++) args.push(arguments[i]);
            // 现将self作为o的方法来调用，传入这些实参
            return self.apply(o, args);
        }
    }
}
// ECMAScript 5 bind() 没懂

/**
 * 构造函数
 */
//函数可以通过 Function() 构造函数来定义
var f = new Function("x", "y", "return x*y");
//几乎等价
var f = function(x,y) { return x*y; }

/* Function() 构造函数并不需要通过传入实参以指定函数名。就像函数直接量一样，
Function() 构造函数创建一个匿名函数
1. Function() 构造函数允许JavaScript在运行时动态的创建并编译函数。
2. 每次调用Function()构造函数都会解析函数体，并创建新的函数对象。如果实在一个循环或多次调用的函数中执行这个构造函数，
执行效率会受影响。相比之下，循环中的嵌套函数和函数定义表达式则不会每次执行时都重新编译。
3.最后一点，关于Function()构造函数很重要一点，就是它所创建的函数并不是使用词法作用域，相反，函数体代码的编译总是会在顶层函数（全局作用域）执行。
*/
var scope = "global";
function constructFunction(){
    var scope = "local";
    return new Function("return scope");    //无法捕获局部作用域
}
// 这一行代码返回global，因为通过Function()构造函数
// 所返回的函数使用的不是局部作用域
constructFunction()(); //=> "global"

//检测一个对象是否真正的函数对象
function isFunction(x){
    return Object.prototype.toString.call(x) === "[object Function]";
}

/**
 * 使用函数处理数组
 */
var data = [1,1,3,5,5];  // 这里是待处理的数组

// 平均数是所有元素的累加和值除以元素个数
var total = 0;
for(var i = 0; i < data.length; i++) total += data[i];
var mean = total/data.length;   //平均数是3

// 计算标准差，首先计算每个数据减去平均数之后偏差的平方然后求和
total = 0;
for(var i = 0; i < data.length; i++) {
    var deviation = data[i] - mean;
    total += deviation * deviation;
}
var stddev = Math.sqrt(total/(data.length-1));  // 标准差的值是 2

// 可以使用数组map() 和 reduce() 实现同样计算，（参照7.9节看这些方法）
//首先定义两个简单的函数
var sum = function(x,y) { return x+y;};
var square = function(x) { return x*x; };

//然后将这些函数和数组方法配合使用计算出平均数和标准差
var data = [1,1,3,5,5];
var mean = data.reduce(sum)/data.length;
var deviations = data.map(function(x) {return x-mean;});
var stddev = Math.sqrt(deviations.map(square).reduce(sum)/(data.length-1));

//不存在内置方法，自定义map() 和 reduce() 函数

//对于每个数组元素调用函数f(),并返回一个结果数组
// 如果Array.prototype.map定义了的话，就使用这个方法
var map = Array.prototype.map
    ? function(a, f) { return a.map(f); }   // 如果已经存在map() 方法，就直接使用它
    : function(a, f) {                      // 否则自己实现一个
        var results = [];
        for (var i=0, len = a.length; i<len; i++) {
            if(i in a) results[i] = f.call(null, a[i], i, a);
        };
        return results;
    }

// 使用函数f() 和可选的初始值将数组a减至一个值
// 如果Array.prototype.reduce存在，就使用这个方法
var reduce = Array.prototype.reduce
    ? function(a, f, initial) {         //如果存在reduce()方法存在的话
    if(arguments.length>2)
        return a.reduce(f, initial);    //如果传入一个初始值
        else return a.reduce(f);        //否则没有初始值
    }
    : function(a, f, initial) {         // 这个算法来自ES5规范
        var i = 0, len = a.length, accumulator;

        //以特定初始值开始，否则第一个值取自a
        if(arguments.length>2) accumulator = initial;
        else {  //找到数组中第一个已定义的索引
            if(len == 0) throw TypeError();
            while(i<len) {
                if(i in a) {
                    accumulator = a[i++];
                    break;
                }
                else i++;
            }
            if(i==len) throw TypeError();
        }

        //对于数组中剩下的元素依次调用f()
        while(i<len) {
            if(i in a)
                accumulator = f.call(undefined, accumulator, a[i], i, a);
            i++;
        }

        return accumulator;
    };

//使用定义的map()和reduce() 函数，计算平均值和标准差的代码
var data=[1,1,3,5,5];
var sum = function(x,y) { return x+y; };
var square = function(x) { return x*x; };
var mean = reduce(data, sum)/data.length;
var deviations = map(data, function(x) {return x-mean;});
var stddev = Math.sqrt(reduce(map(deviations, square), sum)/(data.length-1));

//高阶函数 操作函数的函数，接收一个或多个函数为参数，并返回一个新函数
// 这个高阶函数返回一个新函数，这个新函数将它的实参传入f()
// 并返回f的返回值的逻辑非
function not(f) {
    return function() {                             //返回一个新的函数
        var result = f.apply(this, arguments);      //调用f()
        return !result;                             //对结果求反
    };
}

var even = function(x) {        // 判断a是否为偶数的函数
    return x%2 === 0;
};

var odd = not(even);        // 一个新函数，所做的事情和even()相反
[1,1,3,5,5].every(odd);     //=>true : 每个元素都是奇数

//not 函数就是一个高阶函数

//所返回的函数的参数应当是一个实参数组，并对每个数组元素执行函数f()
// 并返回所有计算结果组成的数组
// 可以对比下这个函数和map()函数
function mapper(f) {
    return function(a) { return map(a, f); };
}

var increment = function(x) { return x+1;};
var incrementer = mapper(increment);
incrementer([1,2,3]) //=> [2,3,4]

// 返回一个新的可以计算f(g(...))的函数
// 返回的函数h() 将它所有实参传入g(),然后将g() 的返回值传入f()
// 调用f()和g()时的this值和调用h()时的this值是同一个this
function compose(f,g){
    return function() {
        // 需要给f()传入一个参数， 所以使用f()的call()方法
        // 需要给g() 传入许多参数，所以使用g() 的 apply() 方法
        return f.call(this, g.apply(this, arguments));
    }
}

var square = function(x) { return x*x; };
var sum = function(x,y) { return x+y; };
var squareofsum = compose(square, sum);
squareofsum(2,3)    //=>25

partial() 和 memoize() 函数是两个非常重要的高阶函数

//不完全函数
//实现一个工具函数将类数组对象（或对象）转换为真正的数组
// 此示例用到了这个方法将arguments对象转换为真正的数组
function array(a, n) { return Array.prototype.slice.call(a, n || o);}

// 这个函数的实参传递至左侧
function partialLeft(f /*,...*/) {
    var args = arguments;       //保存外部的实参数组
    return function() {         //并返回这个函数
        var a = array(args, 1);     //开始处理外部的第一个args
        a = a.concat(array(arguments));     //然后增加所有的内部实参
        return f.apply(this, a);            // 然后基于这个实参列表调用f()
    };
}
// 这个函数的实参传递至右侧
function partialRight(f /*,...*/) {
    var args = arguments;       //保存外部的实参数组
    return function() {         //并返回这个函数
        var a = array(arguments);     //从内部参数开始
        a = a.concat(array(args, 1));     //然后从外部第1个args开始添加
        return f.apply(this, a);            // 基于这个实参列表调用f()
    };
}

// 这个函数的实参被用做模板
// 实参列表中的undefined值都被填充
function partial(f /*,...*/) {
    var args = arguments;       //保存外部实参数组
    return function() {         
        var a = array(args, 1);       //从外部args开始
        var i = 0, j = 0;
        // 遍历args，从内部实参填充undefined值
        for(; i<a.length; i++)
            if(a[i] === undefined) a[i] = arguments[j++];
        // 现在将剩下的内部实参都追加进去
        a = a.concat(array(arguments, j))
        return f.apply(this, a);

    };
}

//这个函数带有3个实参
var f = function(x, y, z) { return x * (y - z);};
// 注意这三个不完全调用之间的区别
partialLeft(f, 2)(3, 4)     //=> -2 :绑定第一个实参：2*(3-4)
partialRight(f, 2)(3, 4)    //=> 6: 绑定最后一个实参：3*(4-2)
partial(f, undefined, 2)(3, 4)  //=> -6 :绑定中间的实参：3*(2-4)

var increment = partialLeft(sum, 1);
var cuberboot = partialRight(Math.pow, 1/3);
String.prototype.first = partial(String.prototype.charAt, 0);
String.prototype.last = partial(String.prototype.substr, -1, 1);

//将不完全调用和其他高阶函数整合在一起时
var not = partialLeft(compose, function(x) {return !x;});
var even = function(x) { return x % 2 === 0;};
var odd = not(even);
var isNumber = not(isNaN);

//使用不完全调用的组合来组织就平均数和标准差，这是函数式编程
var data = [1,1,3,5,5];
var sum = function(x,y) { return x + y;};   //两个初等函数
var product = function(x,y) { return x*y;};
var neg = partial(product, -1);         // 定义其他函数
var square = partial(Math.pow, undefined, 2);
var sqrt = partial(Math.pow, undefined, .5);
var reciprocal = partial(Math.pow, undefined, -1);

// 现在计算平均值和标准差，所有的函数调用都不带运算符
// 这段代码看起来很像lisp代码
var mean = product(reduce(data, sum), reciprocal(data.length));
var stddev = sqrt(product(reduce(map(data,
                                    compose(square,
                                            partial(sum, neg(mean)))) ,
                                sum) ,
                        reciprocal(sum(data.length, -1))));


/*在8 .4.1 节中定义了一个阶乘函数，它可以将上次的计算结果缓存起来。在函数式编程当
中，这种缓存技巧叫做"记忆" (memorization) 。下面的代码展示了一个高阶函数，
memorizeO接收一个函数作为实参，井返回带有记忆能力的函数*/
// 返回f() 的带有记忆功能的版本
// 只有当f() 的实参的字符串表示都不相同时它才会工作
function memorize(f) {
    var cache = {}; //将值保存在闭包内

return function() {
//将实参转换为字符串形式，并将其用做缓存的键
    var key = arguments.length + Array.prototype.join.call(arguments,",");
    if (key in cache) return cache[key];
    else return cache[key] = f.apply(this , arguments);

/*memorizeO 函数创建一个新的对象，这个对象被当做缓存(的宿主)井赋值给一个局部
变量，因此对于返回的函数来说它是私有的(在闭包中)。所返回的函数将它的实参数
组转换成字符串，并将字符串用做缓存对象的属性名。如果在缓存中存在这个值，则直
接返回它。
否则，就调用既定的函数对实参进行计算，将计算结果缓存起来井返回，下面的代码展
示了如何使用memorize():*/

//返回两个整数的最大公约数
//使用欧几里德算话:http://en.wikipedia.org/wiki/Euclidean_algorithm
function gcd(a ,b) { //这里省略对a和b的类型检查
    var t; //临时变量用来存储交换数值
    if (a < b) t=b, b=a, a=t; //确保a >= b
    while(b 1= 0) t=b, b = a%b, a=t; //这是求最大公约数的欧几里德算法
    return a;
}
var gcdmemo = memorize(gcd);
gcdmemo(8S, 187) // => 17

//注意，当我们写一个递归函数时，往往需要实现记忆功能
//我们更希望调用实现了记忆功能的递归函数，而不是原递归函数

var factorial = memorize(function(n) {
                            return (n <= 1) ? 1 : n * factorial(n-1);
                        });
factorial(5) // => 120. 对于4-1的值也有缓存