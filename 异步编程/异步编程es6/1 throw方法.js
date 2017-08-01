function* gen(x){
    try {
        var y = yield x + 2;
    } catch (e){
        console.log(e);
    }
    return y;
}

var g = gen(1);
console.log(g.next());
g.throw('出错了');
//出错的代码与处理错误的代码，实现了时间和空间上的分离，这对于异步编程无疑是很重要的。