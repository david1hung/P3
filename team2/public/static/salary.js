$(document).ready(function(){
	// var chart = new CanvasJS.Chart("chartContainer", {
	// 	title:{
	// 		text: "My First Chart in CanvasJS"              
	// 	},
	// 	data: [              
	// 	{
	// 		// Change type to "doughnut", "line", "splineArea", etc.
	// 		type: "column",
	// 		dataPoints: [
	// 			{ label: "apple",  y: 10  },
	// 			{ label: "orange", y: 15  },
	// 			{ label: "banana", y: 25  },
	// 			{ label: "mango",  y: 30  },
	// 			{ label: "grape",  y: 28  }
	// 		]
	// 	}
	// 	]
	// });
	// chart.render();

	$(function () {
	    $('#container').highcharts({
	        data: {
	            table: 'salaryTable'
	        },
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: 'Occupational Salary Range'
	        },
	        yAxis: {
	            allowDecimals: false,
	            title: {
	                text: 'Yearly salary'
	            }
	        },
	        tooltip: {
	            formatter: function () {
	                return '<b>' + this.series.name + '</b><br/>$' +
	                    this.point.y + ' ' + this.point.name.toLowerCase();
	            }
	        }
	    });
	});
});




