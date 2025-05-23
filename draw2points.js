function recurs2(context, arr, position, n, x0, y0, x1, y1, line){
	if (n==0){
		if(line==null){
			context.fillRect(x1,y1, 1,1);
		}else{
			context.moveTo(x0,y0);
			context.lineTo(x1,y1);
		}
		return position;
	}else{
		if (!position[n]) position[n]=0;
		var xx=Math.cos(arr[position[n]])*((x1-x0)*Math.cos(arr[position[n]])-(y1-y0)*Math.sin(arr[position[n]]))+x0;
		var yy=Math.cos(arr[position[n]])*((x1-x0)*Math.sin(arr[position[n]])+(y1-y0)*Math.cos(arr[position[n]]))+y0;
		position[n]++;
		if (position[n]==arr.length) position[n]=0;
		
		switch(drawmode){
			case 1:
				position=recurs(context, arr, position, n-1, x0, y0, xx, yy, line);
				position=recurs(context, arr, position, n-1, x1, y1, xx, yy, line);
			break;
			case 2:
				position=recurs(context, arr, position, n-1, xx, yy, x0, y0, line);
				position=recurs(context, arr, position, n-1, xx, yy, x1, y1, line);
			break;
			case 3:
				position=recurs(context, arr, position, n-1, xx, yy, x0, y0, line);
				position=recurs(context, arr, position, n-1, x1, y1, xx, yy, line);
			break;
			default:
				position=recurs(context, arr, position, n-1, x0, y0, xx, yy, line);
				position=recurs(context, arr, position, n-1, xx, yy, x1, y1, line);
		}
		
		return position;
	}
}

function recurs(context, arr, position, n, x0, y0, x1, y1, line) {
    if (n == 0) {
        if (line == null) {
            context.fillRect(x1, y1, 1, 1);
        } else {
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
        }
        return position;
    } else {
        if (!position[n]) position[n] = 0;
        
        // Get angles for both points
        const angle1 = arr[position[n]];
        position[n] = (position[n] + 1) % arr.length; // Cycle index
        const angle2 = arr[position[n]];
        position[n] = (position[n] + 1) % arr.length;
        
        // Compute first point (xx, yy)
        const dx = x1 - x0;
        const dy = y1 - y0;
        const cos1 = Math.cos(angle1);
        const xx = x0 + cos1 * (dx * Math.cos(angle1) - dy * Math.sin(angle1));
        const yy = y0 + cos1 * (dx * Math.sin(angle1) + dy * Math.cos(angle1));
        
        // Compute second point (xx2, yy2)
        const cos2 = Math.cos(angle2);
        const xx2 = x0 + cos2 * (dx * Math.cos(angle2) - dy * Math.sin(angle2));
        const yy2 = y0 + cos2 * (dx * Math.sin(angle2) + dy * Math.cos(angle2));
        
		/*
        // Recursively process all three segments
        position = recurs(context, arr, position, n-1, x0, y0, xx, yy, line);
        position = recurs(context, arr, position, n-1, xx, yy, xx2, yy2, line);
        position = recurs(context, arr, position, n-1, xx2, yy2, x1, y1, line);
        */
		
		
		switch(drawmode) {
			// MODE 0: Sequential triad (default)
			case 0:
				position = recurs(context, arr, position, n-1, x0,y0, xx,yy, line);
				position = recurs(context, arr, position, n-1, xx,yy, xx2,yy2, line);
				position = recurs(context, arr, position, n-1, xx2,yy2, x1,y1, line);
				break;

			// MODE 1:
			case 1:
				position = recurs(context, arr, position, n-1, x1,y1, xx2,yy2, line);
				position = recurs(context, arr, position, n-1, xx2,yy2, xx,yy, line);
				position = recurs(context, arr, position, n-1, xx,yy, x0,y0, line);
				break;

			// MODE 2:
			case 2:
				position = recurs(context, arr, position, n-1, x0,y0, xx2,yy2, line);
				position = recurs(context, arr, position, n-1, xx2,yy2, xx,yy, line);
				position = recurs(context, arr, position, n-1, xx,yy, x1,y1, line);
				break;

			// MODE 3:
			case 3:
				position = recurs(context, arr, position, n-1, x1,y1, xx,yy, line);
				position = recurs(context, arr, position, n-1, xx,yy, xx2,yy2, line);
				position = recurs(context, arr, position, n-1, xx2,yy2, x0,y0, line);
				break;

			// MODE 3:
			case 4:
				position = recurs(context, arr, position, n-1, xx,yy, x0,y0, line);
				position = recurs(context, arr, position, n-1, x0,y0, x1,y1, line);
				position = recurs(context, arr, position, n-1, x1,y1, xx2,yy2, line);
				break;

			// MODE 3:
			case 5:
				position = recurs(context, arr, position, n-1, xx2,yy2, x1,y1, line);
				position = recurs(context, arr, position, n-1, x1,y1, x0,y0, line);
				position = recurs(context, arr, position, n-1, x0,y0, xx,yy, line);
				break;

			// MODE 3:
			case 6:
				position = recurs(context, arr, position, n-1, x0,y0, xx,yy, line);
				position = recurs(context, arr, position, n-1, x0,y0, xx2,yy2, line);
				position = recurs(context, arr, position, n-1, x0,y0, x1,y1, line);
				break;
		}
		
        return position;
    }
}


function draw(context, arr, position, n, x0, y0, x1, y1, line){
	var arr2=[]
	for(var i=0; i<arr.length; i++){
		arr2[i]=arr[i]*Math.PI/180;
	}
	recurs(context, arr2, position, n, x0, y0, x1, y1, line);
	console.log(drawmode);
}