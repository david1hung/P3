var initiallyHidden = [
	'#fader',
	'#signUpBox',
	'#loginBox',
	'#salaryDialog',
	'#educationDialog',
	'#skillsDialog',
	'#careerOutlookDialog',
	'#worldOfWorkDialog'
];

var formatMoney = function(number) {
	return ((number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}

var yearsInSchool;

var undergradPublicPrivate = 0;
var undergradTuitionRoomBoard = 0;

var gradPublicPrivate = 0;

var salaryState = 0;
var salaryPosition = 0;

var data;

var calculateData = function() {
	var salary = document.getElementById('careerTable').rows[salaryState].cells[salaryPosition].innerHTML;
	salary = parseInt(salary);
	document.getElementById('careerSalaryDisplay').innerHTML = "Annual Salary: $" + formatMoney(salary);

	var yearsInUndergrad = document.getElementById('yearsInUndergrad').innerHTML;
	yearsInUndergrad = parseInt(yearsInUndergrad);

	var yearsInGrad = document.getElementById('yearsInGrad').innerHTML;
	yearsInGrad = parseInt(yearsInGrad);

	var undergradCostPerYear = document.getElementById('undergradTable').rows[undergradPublicPrivate].cells[undergradTuitionRoomBoard].innerHTML;
	undergradCostPerYear = parseInt(undergradCostPerYear);
	document.getElementById('undergraduateCostDisplay').innerHTML = "Annual Cost: $" + formatMoney(undergradCostPerYear);

	if ($('#graduateInputs').length) {
		var gradCostPerYear = document.getElementById('gradTable').rows[gradPublicPrivate].cells[0].innerHTML;
		gradCostPerYear = parseInt(gradCostPerYear);
		document.getElementById('graduateCostDisplay').innerHTML = "Annual Cost: $" + formatMoney(gradCostPerYear);
	}

	yearsInSchool = yearsInUndergrad + yearsInGrad;


	data = [];

	var currentDebt = 0;
	var currentYears = 0;

	data.push({y: currentDebt, x: currentYears, marker:{enabled: false}});

	//Cost of getting the degree
	while (currentYears < yearsInUndergrad) {
		currentDebt -= undergradCostPerYear;
		currentYears += 1;
		if (currentYears == yearsInSchool) {
			data.push({y: currentDebt, x: currentYears, marker:{enabled: true}});
		} else {
			data.push({y: currentDebt, x: currentYears, marker:{enabled: false}});
		}
	}

	if ($('#graduateInputs').length) {
		while (currentYears < yearsInSchool) {
			currentDebt -= gradCostPerYear;
			currentYears += 1;
			if (currentYears == yearsInSchool) {
				data.push({y: currentDebt, x: currentYears, marker:{enabled: true}});
			} else {
				data.push({y: currentDebt, x: currentYears, marker:{enabled: false}});
			}
		}
	}

	while (currentDebt < (-salary)) {
		currentDebt += salary;
		currentYears += 1;
		data.push({y: currentDebt, x: currentYears, marker:{enabled: false}});
	}

	var untilZero = -currentDebt;
	var restOfSalary = salary - untilZero;

	var timeUntilZero = (untilZero/salary);
	var nextYear = 1-timeUntilZero;

	currentDebt += untilZero;
	currentYears += timeUntilZero;
	data.push({y: currentDebt, x: currentYears, marker:{enabled: true}});

	currentDebt += restOfSalary;
	currentYears += nextYear;
	data.push({y: currentDebt, x: currentYears, marker:{enabled: false}});

	while (currentDebt < (3*salary)) {
		currentDebt += salary;
		currentYears += 1;
		data.push({y: currentDebt, x: currentYears, marker:{enabled: false}});
	}

}

var drawChart = function() {
	$('#chartContainer').highcharts({
    	title: {
            text: 'Investment -> Profit',
            x: -20 //center
        },
        xAxis: {
        	title: {
        		text: 'Years'
        	}
        },
        yAxis: {
            title: {
                text: 'Money ($)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valuePrefix: '$',
            formatter: function() {
            	if (this.x < yearsInSchool) {
            		return "Year " + this.x + "<br>Investment: $" + formatMoney(-this.y);
            	} else if (this.x == yearsInSchool) {
            		return "Degree Earned!<br>Year " + this.x + "<br>Investment: $" + formatMoney(-this.y);
            	} else if (this.y < 0) {
            		return "Year " + this.x + "<br>Debt: $" + formatMoney(-this.y);
            	} else if (this.y == 0 && this.x != 0) {
            		return "Breakeven Point!<br>Debt: $0";
            	} else {
            		return "Year " + this.x + "<br>Profit: $" + formatMoney(this.y);
            	}
		    }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            showInLegend: false,
            data: data
        }]
    });
}

$(document).ready(function(){


	var i;
	for (i = 0; i < initiallyHidden.length; i++) {
		$(initiallyHidden[i]).hide();
	}	


	calculateData();
	drawChart();


	$('#salaryPositionInput').change(function() {
		switch ($('#salaryPositionInput').val()) {
			case "low":
				salaryPosition = 0;
				break;
			case "median":
				salaryPosition = 1;
				break;
			case "high":
				salaryPosition = 2;
				break;
			default:
		}

		calculateData();
		drawChart();

	});



	$('#undergradPublicPrivateInput').change(function() {
		switch ($('#undergradPublicPrivateInput').val()) {
			case "public":
				undergradPublicPrivate = 0;
				break;
			case "private":
				undergradPublicPrivate = 1;
				break;
			default:
		}

		calculateData();
		drawChart();
	});

	$('#undergradTuitionRoomBoardInput').change(function() {
		switch ($('#undergradTuitionRoomBoardInput').val()) {
			case "tuition":
				undergradTuitionRoomBoard = 0;
				break;
			case "roomBoard":
				undergradTuitionRoomBoard = 1;
				break;
			case "tuitionRoomBoard":
				undergradTuitionRoomBoard = 2;
				break;
			default:
		}

		calculateData();
		drawChart();
	});

	$('#gradPublicPrivateInput').change(function() {
		switch ($('#gradPublicPrivateInput').val()) {
			case "public":
				gradPublicPrivate = 0;
				break;
			case "private":
				gradPublicPrivate = 1;
				break;
			default:
		}

		calculateData();
		drawChart();
	});

	$('#signUpLogin').click(function(){

		$('#fader').fadeIn();
		$('#loginBox').fadeIn();
		$('body').addClass('stop-scrolling')

	});

	$('#loginCloseButton').click(function() {

		$('#fader').fadeOut();
		$('#loginBox').fadeOut();
		$('body').removeClass('stop-scrolling')

	});

	$('#signUpCloseButton').click(function() {

		$('#fader').fadeOut();
		$('#signUpBox').fadeOut();
		$('body').removeClass('stop-scrolling')

	});

	$('#switchToSignUp').click(function() {
		$('#loginBox').fadeOut();
		$('#signUpBox').fadeIn();
	});

	$('#switchToLogin').click(function() {
		$('#signUpBox').fadeOut();
		$('#loginBox').fadeIn();
	});

	$('.icon').mouseenter(function() {


		var whichDialog = "#" + this.id + "Dialog";
		if (!$(whichDialog).is(':visible')) {   
  			$(whichDialog).show();
		};  

	})

	$('.icon').mouseleave(function() {

		var whichDialog = "#" + this.id + "Dialog";
		if ($(whichDialog).is(':visible')) {   
  			$(whichDialog).hide();
		};  

	})


});




