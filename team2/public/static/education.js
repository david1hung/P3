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
var data;

var calculateData = function() {
	var medianSalary = document.getElementById('medianSalary').innerHTML;
	medianSalary = parseInt(medianSalary);

	yearsInSchool = document.getElementById('yearsInSchoolInfo').innerHTML;
	yearsInSchool = parseInt(yearsInSchool);

	var costPerYear = document.getElementById('costPerYear').innerHTML;
	costPerYear = parseInt(costPerYear);


	data = [];

	var currentDebt = 0;
	var currentYears = 0;

	data.push({y: currentDebt, x: currentYears, marker:{enabled: false}});

	//Cost of getting the degree
	while (currentYears < yearsInSchool) {
		currentDebt -= costPerYear;
		currentYears += 1;
		if (currentYears == yearsInSchool) {
			data.push({y: currentDebt, x: currentYears, marker:{enabled: true}});
		} else {
			data.push({y: currentDebt, x: currentYears, marker:{enabled: false}});
		}
	}

	while (currentDebt < (-medianSalary)) {
		currentDebt += medianSalary;
		currentYears += 1;
		data.push({y: currentDebt, x: currentYears, marker:{enabled: false}});
	}

	var untilZero = -currentDebt;
	var restOfSalary = medianSalary - untilZero;

	var timeUntilZero = (untilZero/medianSalary);
	var nextYear = 1-timeUntilZero;

	currentDebt += untilZero;
	currentYears += timeUntilZero;
	data.push({y: currentDebt, x: currentYears, marker:{enabled: true}});

	currentDebt += restOfSalary;
	currentYears += nextYear;
	data.push({y: currentDebt, x: currentYears, marker:{enabled: false}});

	while (currentDebt < (3*medianSalary)) {
		currentDebt += medianSalary;
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




