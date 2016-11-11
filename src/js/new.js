	//绘制
	var sub=document.getElementById('subbtn');
		sub.addEventListener('click',function(){
	var canvas=document.getElementById('canvas'),
		context=canvas.getContext('2d');
		canvas.width=600;
		canvas.height=500;
		context.lineWidth=5;
		context.strokeStyle='red';
	var sealtype=document.getElementById('sealtype'),
		Tindex=sealtype.selectedIndex,
		TYPE=sealtype.options[Tindex].text;
	var sealsize=document.getElementById('sealsize'),
		Sindex=sealsize.selectedIndex,
		SIZE=sealsize.options[Sindex].text;
	var	t=document.getElementById('txt'),
		txt=t.value;
	var	addt=document.getElementById('txt_more'),
		addtxt=addt.value;
	var x=300,y=250;
		context.clearRect(0,0,canvas.width,canvas.height);
		signature(context,x,y,TYPE,SIZE,txt,addtxt);
	});
		//保存按钮
		var save=document.getElementById('save');
		save.addEventListener("click", function (event) {
	 var data=toDataURL(canvas);
		var base64=data.split(',')[1];
		alert(base64);
		
	});	
function signature(context,x,y,TYPE,SIZE,txt,addtxt){
	
	var type=TYPE,size=SIZE,cxt=context;
		if(type=='圆形'&&size=='40*40mm'){
				var r=100,sx=75,sy=y*0.5;	
				cxt.save();
				drawround(cxt,x,y,r);
				drawstar(cxt,x,y,r/3);
				maintxt(cxt,x,y,txt,sx);
				addtext(cxt,x,y,addtxt,sy);
				cxt.restore();
			}else if(type=='圆形'&&size=='38*38mm'){
				cxt.save();
				var r=95,sx=70,sy=y*0.45;				
				drawround(cxt,x,y,r);
				drawstar(cxt,x,y,r/3);
				maintxt(cxt,x,y,txt,sx);
				addtext(cxt,x,y,addtxt,sy);
				cxt.restore();
			}
			else if(type=='椭圆形'&&size=='40*40mm'){
				var a=120;
				var b=90,sx=75,sy=y*0.5,r=100;
				cxt.save();
				cxt.scale(1,0.5);
				drawround(cxt,x,y,r);

				drawstar(cxt,x,y,b/3);
				maintxt(cxt,x,y,txt,sx);
				addtext(cxt,x,y,addtxt,sy);
				cxt.restore();
			}
			else if(type=='椭圆形'&&size=='38*38mm'){
				var a=100;
				var b=70,sx=70,sy=y*0.45,r=95;
				cxt.save();
				cxt.scale(1,0.5);
				drawround(cxt,x,y,r);
				drawstar(cxt,x,y,b/3);
				maintxt(cxt,x,y,txt,sx);
				addtext(cxt,x,y,addtxt,sy);
				cxt.restore();
			}
			
		}
			//绘制五角星
		 function drawstar(cxt,x,y,radius) {
            cxt.save();
            cxt.fillStyle ='red';
            cxt.translate(x, y);//移动坐标原点
            cxt.rotate(Math.PI);//旋转
            cxt.beginPath();//创建路径
            var x = Math.sin(0);
            var y = Math.cos(0);
            var dig = Math.PI / 5 * 4;
            for (var i = 0; i < 5; i++) {//画五角星的五条边
                var x = Math.sin(i * dig);
                var y = Math.cos(i * dig);
                cxt.lineTo(x * radius, y * radius);
            }
            cxt.closePath();
            cxt.fill();
            cxt.restore();
       }
		//圆
		function drawround(cxt,x,y,r){
			cxt.lineWidth=3;
			cxt.strokeStyle='red';
			cxt.beginPath();
			cxt.arc(x,y,r,0,2*Math.PI);

			cxt.closePath();
			cxt.stroke();
		}
		//正文
		function maintxt(cxt,x,y,str,sx){
			
			cxt.fillStyle='red';
			cxt.beginPath();
		 cxt.translate(x,y);// 平移到此位置, 
	    cxt.font = 'bold 22px 宋体';
	    var  count = str.length;// 字数   
	    var  angle = 4*Math.PI/(3*(count - 1));// 字间角度   
	    var chars = str.split("");   
	    var c; 
	    for (var i = 0; i<count; i++) {  
	       c = chars[i];// 需要绘制的字符   
	       if(i==0) cxt.rotate(7*Math.PI/9); 
	       else 
	       cxt.rotate(angle);// 
	       cxt.save(); 
	       cxt.translate(sx, 0);// 平移到此位置,此时字和x轴垂直   
	       cxt.rotate(Math.PI / 2);// 旋转90度,让字平行于x轴
           cxt.fillText(c, 0, 0);// 此点为字的中心点
           cxt.restore();         
   			}   
   			cxt.closePath();
   			cxt.rotate(-Math.PI/6);

		}
		
		//附文
		function addtext(cxt,x,y,str,sy){
			
			cxt.font='bold 22px 宋体';
			cxt.fillStyle='red';			
			cxt.translate(x,y);
			cxt.save();
			cxt.textAlign='center';
			cxt.beginPath();
			cxt.rotate(Math.PI*1/18);
			cxt.translate(-x,-y);
			cxt.fillText(str,-0.13*x,sy,100);			
			cxt.restore();
			cxt.closePath();
		}
		function toDataURL(cav) {
        
        return cav.toDataURL.apply(canvas, arguments);
}
