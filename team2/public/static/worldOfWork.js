var createCanvas = function() {
	var canvas = document.getElementById("d");
	var ctx = canvas.getContext('2d');
	var canover=document.getElementById("cover");

	var ctxover = canvas.getContext('2d');

	// Create an image element
	var img = new Image();

	var soc = document.getElementById('interestsTable').rows[0].textContent;
	var realistic = document.getElementById('interestsTable').rows[1].textContent;
	var investigative = document.getElementById('interestsTable').rows[2].textContent;
	var artistic = document.getElementById('interestsTable').rows[3].textContent;
	var social = document.getElementById('interestsTable').rows[4].textContent;
	var enterprising = document.getElementById('interestsTable').rows[5].textContent;
	var conventional = document.getElementById('interestsTable').rows[6].textContent;

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

    // http://cwestblog.com/2012/11/12/javascript-degree-and-radian-conversion/

	// Converts from degrees to radians.
	Math.radians = function(degrees) {
	  return degrees * Math.PI / 180;
	};
	 
	// Converts from radians to degrees.
	Math.degrees = function(radians) {
	  return radians * 180 / Math.PI;
	};

	// When the image is loaded, draw it
	img.onload = function () {
		
	    ctx.drawImage(img, 0, 0);
	    ctx.translate(250,250);		// to move origin to (0,0)
	    // drawStar(0,0,5,12,6);		// center
	    // drawStar(215,0,5,12,6);		// x
	    // window.alert(enterprising);
	    // drawStar(enterprising*215*Math.cos(Math.radians(150)), enterprising*215*Math.sin(Math.radians(-150)),5,12,6);

		////// BEGIN: If 1 interest value >= 0.5, plot that point //////

    	if (realistic > 0.5 && investigative < 0.5 && artistic < 0.5 && social < 0.5 && enterprising < 0.5 && conventional < 0.5) {
    		var x = realistic*215*Math.cos(Math.radians(0));
    		var y = realistic*215*Math.sin(Math.radians(0));
    		drawStar(x, y, 5, 12, 6);
    	}

    	if (realistic < 0.5 && investigative > 0.5 && artistic < 0.5 && social < 0.5 && enterprising < 0.5 && conventional < 0.5) {
    		var x = investigative*215*Math.cos(Math.radians(30));
    		var y = investigative*215*Math.sin(Math.radians(-30));
    		drawStar(x, y, 5, 12, 6);
    	}

    	if (realistic < 0.5 && investigative < 0.5 && artistic > 0.5 && social < 0.5 && enterprising < 0.5 && conventional < 0.5) {
    		var x = artistic*215*Math.cos(Math.radians(330));
    		var y = artistic*215*Math.sin(Math.radians(-330));
    		drawStar(x, y, 5, 12, 6);
    	}

    	if (realistic < 0.5 && investigative < 0.5 && artistic < 0.5 && social > 0.5 && enterprising < 0.5 && conventional < 0.5) {
    		var x = social*215*Math.cos(Math.radians(270));
    		var y = social*215*Math.sin(Math.radians(-270));
    		drawStar(x, y, 5, 12, 6);
    	}

    	if (realistic < 0.5 && investigative < 0.5 && artistic < 0.5 && social < 0.5 && enterprising > 0.5 && conventional < 0.5) {
    		var x = enterprising*215*Math.cos(Math.radians(210));
    		var y = enterprising*215*Math.sin(Math.radians(-210));
    		drawStar(x, y, 5, 12, 6);
    	}

    	if (realistic < 0.5 && investigative < 0.5 && artistic < 0.5 && social < 0.5 && enterprising < 0.5 && conventional > 0.5) {
    		var x = conventional*215*Math.cos(Math.radians(150));
    		var y = conventional*215*Math.sin(Math.radians(-150));
    		drawStar(x, y, 5, 12, 6);
    	}

    	////// END: If 1 interest value > 0.5, plot that point //////

	}

	// Specify the src to load the image
	// the WoW seems to be 500px by 530px
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




