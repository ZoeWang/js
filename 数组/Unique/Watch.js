var Watch = {
    result: [],
    guid: -1,
    totalTime: 0,
    start: function(title){
        this.result[++this.guid] = [title || this.guid, new Date().getTime()];
    },
    stop: function(){
        var r = this.result[this.guid];
        var t = new Date().getTime() - r[1];
        this.totalTime += t;
        r[1] = t;
		if(t>=10000){
			alert("This code takes too long to run,you should optimizate them.");
		}
    },
    report: function(parent){
        var div = document.createElement("div");
        div.style.fontSize = "12px";
        var str = [];
        str.push("<p><b>The total times:</b><span style='color:#f00'>" + this.totalTime + "</span> ms.</p>");
        for (var i = 0, l = this.result.length; i < l; i++) {
            if (this.result[i].length > 1) {
                str.push("<p>" + "<span style='width:200px;display:inline-block;background-color:#f7f7f7;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;'>"+"<span style='background-color:#0c0; -moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;width=" + (this.totalTime === 0 ? this.totalTime : parseInt(200 * this.result[i][1] / this.totalTime)) + "px; display:inline-block;'>"+this.result[i][1]+"</span>"+"</span> <span style='width:150px; display:inline-block;'>" + this.result[i][0] + "</span>" + "</p>");
            }else{
				str.push(this.result[i][0]);
			}
        }
        div.innerHTML = str.join("");
		parent = parent || document.body;
		parent.appendChild(div);
		div = null;
		
		this.totalTime = 0;
		this.guid = -1;
		this.result=[];
    },
    fns: function(){
        var a = arguments;
        for (var i = 0, l = a.length; i < l; i++) {
            this.start(a[i][0]);
            a[i][1]();
            this.stop();
        }
    },
    execByTimes: function(fn, times, title){
        this.start(title);
        while (times--) {
            fn();
        }
        this.stop();
    },
    print: function(str){
        this.result[++this.guid]=[str];
    }
}