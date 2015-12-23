//版权 北京智能社©, 保留所有权利

function getStyle(obj, name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}

/*
type
'linear'	匀速
'ease-in'	加速
'ease-out'	减速
*/
// startMove(oBox, {left: 900}, {type: 'ease-out', time: 800})
function startMove(obj, json, options)
{
	options=options||{};
	options.time=options.time||700;
	options.type=options.type||'linear';
	
	var start={};
	var dis={};
	
	for(var name in json)
	{
		//left
		if(name=='opacity')
		{
			start[name]=parseFloat(getStyle(obj, name));
		}
		else
		{
			start[name]=parseInt(getStyle(obj, name));
		}
		dis[name]=json[name]-start[name];
	}
	
	var n=0;
	var count=parseInt(options.time/30);
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		
		for(var name in json)
		{
			switch(options.type)
			{
				case 'linear':
					var cur=start[name]+n*dis[name]/count;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+(a*a*a)*dis[name];
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+(1-a*a*a)*dis[name];
					break;
			}
			
			if(name=='opacity')
			{
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}
			else
			{
				obj.style[name]=cur+'px';
			}
		}
		
		if(n==count)
		{
			clearInterval(obj.timer);
			
			options.end && options.end();
		}
	}, 30);
}