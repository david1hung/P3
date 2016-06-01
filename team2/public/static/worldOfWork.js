var createCanvas = function() {
	var canvas = document.getElementById("d");
	var ctx = canvas.getContext('2d');
	var canover=document.getElementById("cover");

	var ctxover = canvas.getContext('2d');

	// Create an image element
	var img = new Image();

	// http://stackoverflow.com/questions/25837158/how-to-draw-a-star-by-using-canvas-html5
	function drawStar(cx,cy,spikes,outerRadius,innerRadius){
      var rot=Math.PI/2*3;
      var x=cx;
      var y=cy;
      var step=Math.PI/spikes;

      ctx.beginPath();
      ctx.moveTo(cx,cy-outerRadius)
      for(i=0;i<spikes;i++){
        x=cx+Math.cos(rot)*outerRadius;
        y=cy+Math.sin(rot)*outerRadius;
        ctx.lineTo(x,y)
        rot+=step

        x=cx+Math.cos(rot)*innerRadius;
        y=cy+Math.sin(rot)*innerRadius;
        ctx.lineTo(x,y)
        rot+=step
      }
      ctx.lineTo(cx,cy-outerRadius);
      ctx.closePath();
      ctx.lineWidth=5;
      ctx.strokeStyle='blue';
      ctx.stroke();
      ctx.fillStyle='skyblue';
      ctx.fill();
    }

	// When the image is loaded, draw it
	img.onload = function () {
	    ctx.drawImage(img, 0, 0);
	    // ctx.fillStyle = 'blue';
	    // ctxover.fillRect(100,100,20,20);		// x, y, size_x, size_y
	    //ctxover.fillRect(0,20,10,10);
	    drawStar(150,150,5,12,6);				// TODO: must dynamically change this according to specific job!
	}

	// Specify the src to load the image
	img.src = "/images/wow.png";

	canvas.width=img.width;
	canvas.height=img.height;

	canover.width=img.width;
	canover.height=img.height;
}

$(document).ready(function(){

	$(function () {

		createCanvas();

		// tooltips
		$(document).ready(function(){
	    	$('[data-toggle="tooltip"]').tooltip();
		});

	});

});




