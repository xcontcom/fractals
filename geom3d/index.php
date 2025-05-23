<?php
if(isset($_POST['num'])){
	$r=rand(1,8);
	for($i=0;$i<$r;$i++){
		$a[$i][0]=5*rand(1,17);
		$a[$i][1]=15*rand(0,24);
	}
	echo "{\"response\":";
	echo json_encode($a);
	echo "}";
}else{
?>
<!DOCTYPE HTML>
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>3D-fractals</title>
	<meta name="description" content="On this site, with the help of genetic algorithms, you will be able to compose the most beautiful fractal. Algorithm will learn to understand your preferences" />
	<meta name="keywords" content="Genetics, fractal, genetic algorithms, artificial intelligence, evolution" />
	<link rel="stylesheet" href="/css/style.css" type="text/css" />
		<script>
		var canvas;
		var canvasData;
		var context;
		var massiv;
		<?
		if(($_SERVER['REQUEST_URI']!="")&&($_SERVER['REQUEST_URI']!="/")){
			$array=explode("/", $_SERVER['REQUEST_URI']);
			$len=(int)count($array)/2-1;
			if($array[2]!=""){
				for($i=0;$i<=$len-1;$i++){
					$array2[$i][0]=$array[$i*2+2];
					$array2[$i][1]=$array[$i*2+3];
				}
				echo "var angls=";
				echo json_encode($array2);
				echo ";";
			}else{
				echo "var angls=[[45,180],[-45,90],[-45,90],[45,180]];\n";
			}
		}
		?>
		
		function createRequestObject() {
			if (typeof XMLHttpRequest === 'undefined') {
				XMLHttpRequest = function() {
					try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
						catch(e) {}
					try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
						catch(e) {}
					try { return new ActiveXObject("Msxml2.XMLHTTP"); }
						catch(e) {}
					try { return new ActiveXObject("Microsoft.XMLHTTP"); }
						catch(e) {}
					throw new Error("This browser does not support XMLHttpRequest.");
				};
			}
			return new XMLHttpRequest();
		}
		function selecter(num){
			req = new XMLHttpRequest();
			if (req) {
				req.open("POST", '/geom3d/', true);
				req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				req.onreadystatechange = processReqChange;
				var postmyplease="num="+num;
				req.send(postmyplease);
			}
		}
		function processReqChange(){
			try {
				if (req.readyState == 4) {
					if (req.status == 200) {
						var ang=JSON.parse(req.responseText);
						angls=ang.response;
						massiv=sfera(angls);
						droveLines(canvas, 0, 0, massiv);
						var logger=document.getElementById('logger');
						logger.innerHTML=" <br />";
						var link="";
						for (i=0, len=angls.length; i<len; i++) {
							//logger.innerHTML += "("+angls[i][0]+", "+angls[i][1]+") <br />";
							link+=angls[i][0]+"/"+angls[i][1]+"/";
						}
						logger.innerHTML="<a href=\"http://fractal.xcont.com/geom3d/"+link+"\">"+link+"</a>";
					} else {
							alert("Не удалось получить данные:\n" + req.statusText);
					}
				}
			}
			catch( e ) {}
		}
		
		function rotate(v, p, cos, sin, mcos){
			var x=v[0], y=v[1], z=v[2]; // вектор, вокруг которого вращаем
			var xp=p[0], yp=p[1], zp=p[2]; // точка, которую вращаем
			var a11=(mcos*x*x+cos), a12=(mcos*x*y-sin*z), a13=(mcos*x*z+sin*y); // матрица поворота вокруг вектора
			var a21=(mcos*x*y+sin*z), a22=(mcos*y*y+cos), a23=(mcos*z*y-sin*x);
			var a31=(mcos*x*z-sin*y), a32=(mcos*z*y+sin*x), a33=(mcos*z*z+cos);
			var xx=xp*a11+yp*a12+zp*a13; // умножаем точку на матрицу
			var yy=xp*a21+yp*a22+zp*a23;
			var zz=xp*a31+yp*a32+zp*a33;
			return [xx, yy, zz];
		}
		function find_point(a, b, c, angls){
			var alfa=angls[0]*Math.PI/180, betta=angls[1]*Math.PI/180;
			var x1=a[0], y1=a[1], z1=a[2]; //A
			var x2=b[0], y2=b[1]; z2=b[2]; //B - ось вращения AB
			var x3=c[0], y3=c[1], z3=c[2]; //C - третья точка нужна для задания плоскости
			var xa=x2-x1, ya=y2-y1, za=z2-z1; // вектор AB
			var xc=x3-x1, yc=y3-y1, zc=z3-z1; // вектор AC
			var xv=(ya*zc-za*yc), yv=-(xa*zc-za*xc), zv=(xa*yc-ya*xc); // векторное произведение векторов AB и AC (получаем вектор-перпиндикуляр к плоскости)
			var cosa=Math.cos(alfa); // всю тригонометрию из матрицы поворота считаем заранее (оптимизация)
			var sina=Math.sin(alfa);
			var mcosa=1-Math.cos(alfa);
			var cosb=Math.cos(betta);
			var sinb=Math.sin(betta);
			var mcosb=1-Math.cos(betta);
			var r=Math.sqrt(Math.pow(xv,2)+Math.pow(yv,2)+Math.pow(zv,2)); // длина вектора-перпиндикуляра
			var vector=[xv/r, yv/r, zv/r]; // нормированный вектор
			var point=[xa, ya, za]; // вокруг вектора-перпендикуляра делаем поворот точки A на угол alfa
			var d=rotate(vector, point, cosa, sina, mcosa); // точка после поворота
			r=Math.sqrt(Math.pow(xa,2)+Math.pow(ya,2)+Math.pow(za,2)); // длина вектора AB
			vector=[xa/r, ya/r, za/r]; // нормированный вектор
			point=[d[0]*Math.cos(alfa),d[1]*Math.cos(alfa),d[2]*Math.cos(alfa)]; // угол ADC=90°
			d=rotate(vector, point, cosb, sinb, mcosb); // вращаем точку D вокруг AB
			d=[d[0]+x1, d[1]+y1, d[2]+z1]; // сдвигаем точку D
			return d;
		}
		function recurs(array, n, a, b, d, angls){
			if (n==0){
				return array;
			}else{
				if (!array[0][n]) array[0][n]=0;
				var d=find_point(a, b, d, angls[array[0][n]]);
				array[1].push(d);
				array[0][n]++;
				if (array[0][n]==angls.length) array[0][n]=0;
				recurs(array, n-1, a, d, b, angls);
				recurs(array, n-1, d, b, a, angls);
				return array;
			}
		}
		function sfera(angls){
			var massiv=new Array();
			var x1=0; y1=10; z1=0;
			var x2=0; y2=-10; z2=0;
			var x3=0; y3=0; z3=-10;
			massiv[0]=[x1, y1, z1];
			massiv[1]=[x2, y2, z2];
			massiv[2]=[x3, y3, z3];
			var d=find_point(massiv[0], massiv[1], massiv[2], [angls[0][0], 0]);
			massiv[2]=d;
			var m1=new Array();
			var m2=new Array();
			var array=[m1,m2];
			d=recurs(array, 15, massiv[0], massiv[1], massiv[2], angls);
			massiv = massiv.concat(d[1]);
			return massiv;
		}
			
			
		window.onload=function(){
			canvas=document.getElementById('myCanvas');
			context=canvas.getContext('2d');
			canvas.width=600;
			canvas.height=600;
			canvasData=context.getImageData(0, 0, canvas.width, canvas.height);
			
			massiv=sfera(angls);
			droveLines(canvas, 0, 0, massiv);
			
			canvas.addEventListener('mousemove', function(evt){
					var mousePos=getMousePos(canvas, evt);
					droveLines(canvas, mousePos.x, mousePos.y, massiv);
				}, false);
				
			function getMousePos(canvas, evt){
				var obj=canvas;
				var top=0;
				var left=0;
				while (obj && obj.tagName != 'BODY') {
					top+=obj.offsetTop;
					left+=obj.offsetLeft;
					obj=obj.offsetParent;
				}
			 
				var mouseX=evt.clientX-left+window.pageXOffset;
				var mouseY=evt.clientY-top+window.pageYOffset;
				return {
					x: mouseX,
					y: mouseY
				};
			}
		}
		
		function droveLines(canvas, xMouse, yMouse, massiv){
			clearCanvas();
			var xCenter=canvas.width/2;
			var yCenter=canvas.height/2;
			var focus=800;
			var i, x, y, z, xx, yy, zz;
			var arr=new Array();
			var arr2=new Array();
			var alfa=yMouse*Math.PI/180; 
			var betta=xMouse*Math.PI/180;
			var cosa=Math.cos(alfa);
			var cosb=Math.cos(betta);
			var sina=Math.sin(alfa);
			var sinb=Math.sin(betta);
			
			for (i=0, len=massiv.length; i<len; i++) {
				x=massiv[i][0];
				y=massiv[i][1];
				z=massiv[i][2];
				yy=y*cosa-z*sina;
				zz=z*cosa+y*sina;
				z=zz;
				xx=x*cosb+z*sinb;
				zz=z*cosb-x*sinb;
				y=yy; x=xx;	z=zz;
				z+=64;
				xx=focus*x/z+xCenter;
				yy=focus*y/z+yCenter;
				drawPixel(Math.floor(xx), Math.floor(yy), 255, 255, 255, 255);
			}
			updateCanvas();
		}
		
		function drawPixel(x, y, r, g, b, a) {
			var index=(x+y*canvas.width)*4;
			canvasData.data[index+0]=r;
			canvasData.data[index+1]=g;
			canvasData.data[index+2]=b;
			canvasData.data[index+3]=a;
		}

		function updateCanvas() {
			context.putImageData(canvasData, 0, 0);
		}

		function clearCanvas() {
			for (var i=0; i<canvasData.data.length; i+=4){
				canvasData.data[i]=0;
				canvasData.data[i+1]=0;
				canvasData.data[i+2]=0;
				canvasData.data[i+3]=255;
			}
			context.putImageData(canvasData, 0, 0);
		}
		
		</script>
	</head>
	<body>
		<canvas id="myCanvas">
		</canvas>
		<br/><br/><input type="submit" onclick="selecter(1);"/><br/><br/>
		<span id="logger"></span>
	<div class="footer_menu">
		<ul>
			<li><a href="http://fractal.xcont.com/">Back</a></li>
			<li><a href="http://fractal.xcont.com/2d.html">Create fractal using mouse</a></li>
			<li><a href="http://xcont.com/">Fractals in prime numbers</a></li>
		</ul>
	</div>
	<div id="footer">
	</div>
	</body>
</html>
<?php
}
?>
