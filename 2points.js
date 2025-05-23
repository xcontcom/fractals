var iteration=10;
var canvasSizeY=document.documentElement.clientHeight-165;
var canvasSizeX=document.documentElement.clientWidth;
canvasSizeX/=1.5;
var xA=Math.floor((canvasSizeX)/2);
var yA=Math.floor((canvasSizeY)/10)*3;
var xB=Math.floor((canvasSizeX)/2);
var yB=Math.floor((canvasSizeY)/10)*7;
var dY=canvasSizeY/12;
var angles=[45,-45];
var mousearray=[];
var anglesincreasearray=[];

var drawmode;
var drawmodeInStorage;
function changeDrawMode(){
	var dm = document.getElementById("drawmode");
	var dms = dm.options[dm.selectedIndex].value;
	drawmode=Number(dms);
	localStorage["fractal.drawmode"] = drawmode;
	//get2fractals();
	drawcanvas();
}
function getDrawMode(){
	drawmodeInStorage = (localStorage["fractal.drawmodeInStorage"] == "true");
	if(drawmodeInStorage){
		drawmode = JSON.parse(localStorage["fractal.drawmode"]);
		var dm = document.getElementById("drawmode");
		dm.value = drawmode;
	}else{
		drawmode=0;
		localStorage["fractal.drawmode"] = drawmode;
		localStorage["fractal.drawmodeInStorage"] = "true";
	}
}

function init(){
	getDrawMode();
	getinputs();
	drawcanvas();
}

function drawcanvas(){
	var canvas=document.getElementById('myCanvas');
	var context=canvas.getContext('2d');
	var array=angles;
	canvas.width=canvasSizeX;
	canvas.height=canvasSizeY;
	context.fillStyle = 'rgb(255,255,255)';
	context.fillRect (0, 0, canvas.width, canvas.height);
	context.beginPath();
	context.fillStyle = 'rgb(0,0,0)';
	draw(context, array, [], iteration, xA, yA, xB, yB);
	context.stroke();
	context.beginPath();
	draw(context, array, [], 1, canvasSizeX/10, dY, canvasSizeX/10, dY*2, 1);
	draw(context, array, [], 2, canvasSizeX/10, dY*3, canvasSizeX/10, dY*4, 1);
	draw(context, array, [], 3, canvasSizeX/10, dY*5, canvasSizeX/10, dY*6, 1);
	draw(context, array, [], 4, canvasSizeX/10, dY*7, canvasSizeX/10, dY*8, 1);
	draw(context, array, [], 5, canvasSizeX/10, dY*9, canvasSizeX/10, dY*10, 1);
	context.stroke();
}

function funct(evt){
	var mousePos=getMousePos(myid, evt);
	
	var xx=Math.round(mousePos.x/canvasSizeX*180-90);
	var yy=Math.round(mousePos.y/canvasSizeY*180-90);
	
	for(var i=0;i<angles.length;i++){
		if(mousearray[i]==0){
			angles[i]=xx*anglesincreasearray[i];
		}else if(mousearray[i]==1){
			angles[i]=yy*anglesincreasearray[i];
		}
	}
	//console.log(angles);
	//console.log(mousearray);
	//console.log(anglesincreasearray);
	//angles[0]=xx;
	//angles[1]=yy;
	
	putinputs();	
	drawcanvas();
}
	
function getMousePos(myid, evt){
	var obj=myid;
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

var eventadded=false;

function addevent(){
	
	var myid=document.getElementById('myid');
	if(eventadded==false){
		eventadded=true;
		myid.addEventListener('mousemove', funct, false);
	}else{
		eventadded=false;
		myid.removeEventListener('mousemove', funct, false);
	}
	
}

function getinputs(){
	var anglesinput=document.getElementsByName('anglesinput[]');
	var anglesincrease=document.getElementsByName('anglesincrease[]');
	for(var i=0;i<angles.length;i++){
		angles[i]=Number(anglesinput[i].value);
		anglesincreasearray[i]=Number(anglesincrease[i].value);
		var radiobuttons=document.getElementsByName('angles'+i);
		for(var j=0;j<3;j++){
			if(radiobuttons[j].checked) mousearray[i]=j;
		}
		
	}
}
function putinputs(){
	var anglesinput=document.getElementsByName('anglesinput[]');
	for(var i=0;i<angles.length;i++){
		anglesinput[i].value=angles[i];
	}
}

function addangles(){ //hindu function (sausage :))
	var parrentdiv=document.getElementById('settings');
	var inputblocks=document.createElement('div');
	inputblocks.setAttribute("class", "inputblocks");
	var blockid="block"+angles.length;
	inputblocks.setAttribute("id", blockid);

	var input=document.createElement('input');
	input.setAttribute("type", "text");
	input.setAttribute("name", "anglesinput[]");
	input.setAttribute("value", "45");
	input.setAttribute("oninput", "txtchenged("+angles.length+", this.value);");
	inputblocks.appendChild(input);
	var textindiv = document.createTextNode('	');
	inputblocks.appendChild(textindiv);

	var input=document.createElement('input');
	input.setAttribute("type", "radio");
	input.setAttribute("name", "angles"+angles.length);
	input.setAttribute("value", "x");
	input.setAttribute("onclick", "radiochenged("+angles.length+", 0);");
	inputblocks.appendChild(input);
	var textindiv = document.createTextNode('	');
	inputblocks.appendChild(textindiv);
	
	var div=document.createElement('div');
	var textindiv = document.createTextNode('MouseX');
	div.appendChild(textindiv);
	inputblocks.appendChild(div);
	var textindiv = document.createTextNode('	');
	inputblocks.appendChild(textindiv);

	var input=document.createElement('input');
	input.setAttribute("type", "radio");
	input.setAttribute("name", "angles"+angles.length);
	input.setAttribute("value", "y");
	input.setAttribute("onclick", "radiochenged("+angles.length+", 1);");
	inputblocks.appendChild(input);
	var textindiv = document.createTextNode('	');
	inputblocks.appendChild(textindiv);
	
	var div=document.createElement('div');
	var textindiv = document.createTextNode('MouseY');
	div.appendChild(textindiv);
	inputblocks.appendChild(div);
	var textindiv = document.createTextNode('	');
	inputblocks.appendChild(textindiv);

	var input=document.createElement('input');
	input.setAttribute("type", "radio");
	input.setAttribute("name", "angles"+angles.length);
	input.setAttribute("value", "none");
	input.setAttribute("checked", null);
	input.setAttribute("onclick", "radiochenged("+angles.length+", 2);");
	inputblocks.appendChild(input);
	var textindiv = document.createTextNode('	');
	inputblocks.appendChild(textindiv);
	
	var div=document.createElement('div');
	var textindiv = document.createTextNode('None');
	div.appendChild(textindiv);
	inputblocks.appendChild(div);
	var textindiv = document.createTextNode('	');
	inputblocks.appendChild(textindiv);

	var input=document.createElement('input');
	input.setAttribute("type", "text");
	input.setAttribute("name", "anglesincrease[]");
	input.setAttribute("value", "1");
	input.setAttribute("oninput", "txtincrchenged("+angles.length+", this.value);");
	inputblocks.appendChild(input);
	
	parrentdiv.appendChild(inputblocks);
	angles[angles.length]=45;
	mousearray[angles.length-1]=2;
	anglesincreasearray[angles.length-1]=1;
	drawcanvas();
}
function deleteangles(){
	var len=angles.length;
	if(len>2){
		len--;
		var parrentdiv=document.getElementById('settings');
		var block=document.getElementById('block'+len);
		parrentdiv.removeChild(block);
		angles.length=angles.length-1;
	}
	drawcanvas();
}

function txtchenged(id, value){
	angles[id]=Number(value);
	drawcanvas();
}
function radiochenged(id, value){
	mousearray[id]=Number(value);
}
function txtincrchenged(id, value){
	anglesincreasearray[id]=Number(value);
}