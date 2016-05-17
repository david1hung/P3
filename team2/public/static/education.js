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

$(document).ready(function(){


	var i;
	for (i = 0; i < initiallyHidden.length; i++) {
		$(initiallyHidden[i]).hide();
	}

	var yearsInSchool;
	var costPerYear;

	var medianSalary;

	if($('#noneSalary').length) {
		medianSalary = document.getElementById('noneSalary').innerHTML;
		$('#noneSalary').hide();

		//yearsInSchool = 0;
		//costPerYear = 0;

		document.getElementById('typeOfSchool').innerHTML = "N/A";
		document.getElementById('typeOfDegree').innerHTML = "N/A";
		document.getElementById('yearsInSchool').innerHTML = "N/A";

	} else if ($('#highSchoolSalary').length) {
		medianSalary = document.getElementById('highSchoolSalary').innerHTML;
		$('#highSchoolSalary').hide();

		//yearsInSchool = 0;
		//costPerYear = 0;

		document.getElementById('typeOfSchool').innerHTML = "N/A";
		document.getElementById('typeOfDegree').innerHTML = "N/A";
		document.getElementById('yearsInSchool').innerHTML = "N/A";

	} else if ($('#someCollegeSalary').length) {
		medianSalary = document.getElementById('someCollegeSalary').innerHTML;
		$('#someCollegeSalary').hide();

		//yearsInSchool = 0;
		//costPerYear = 0;

		document.getElementById('typeOfSchool').innerHTML = "N/A";
		document.getElementById('typeOfDegree').innerHTML = "N/A";
		document.getElementById('yearsInSchool').innerHTML = "N/A";

	} else if ($('#postsecondaryNondegreeSalary').length) {
		medianSalary = document.getElementById('postsecondaryNondegreeSalary').innerHTML;
		$('#postsecondaryNondegreeSalary').hide();

		//yearsInSchool = 0;
		//costPerYear = 0;

		document.getElementById('typeOfSchool').innerHTML = "N/A";
		document.getElementById('typeOfDegree').innerHTML = "N/A";
		document.getElementById('yearsInSchool').innerHTML = "N/A";

	} else if ($('#associateSalary').length) {
		medianSalary = document.getElementById('associateSalary').innerHTML;
		$('#associateSalary').hide();

		yearsInSchool = 2;
		costPerYear = 15000;

		document.getElementById('typeOfSchool').innerHTML = "Undergraduate";
		document.getElementById('typeOfDegree').innerHTML = "Associate's Degree";
		document.getElementById('yearsInSchool').innerHTML = "2";

	} else if ($('#bachelorSalary').length) {
		medianSalary = document.getElementById('bachelorSalary').innerHTML;
		$('#bachelorSalary').hide();

		yearsInSchool = 4;
		costPerYear = 30000;

		document.getElementById('typeOfSchool').innerHTML = "Undergraduate";
		document.getElementById('typeOfDegree').innerHTML = "Bachelor's Degree";
		document.getElementById('yearsInSchool').innerHTML = "4";

	} else if ($('#masterSalary').length) {
		medianSalary = document.getElementById('masterSalary').innerHTML;
		$('#masterSalary').hide();

		yearsInSchool = 6;
		costPerYear = 30000;

		document.getElementById('typeOfSchool').innerHTML = "Graduate";
		document.getElementById('typeOfDegree').innerHTML = "Master's Degree";
		document.getElementById('yearsInSchool').innerHTML = "6";

	} else if ($('#doctoralOrProfessionalSalary').length) {
		medianSalary = document.getElementById('doctoralOrProfessionalSalary').innerHTML;
		$('#doctoralOrProfessionalSalary').hide();

		yearsInSchool = 8;
		costPerYear = 30000;

		document.getElementById('typeOfSchool').innerHTML = "Graduate or Professional";
		document.getElementById('typeOfDegree').innerHTML = "Doctorate or Professional Degree";
		document.getElementById('yearsInSchool').innerHTML = "8";

	}

	medianSalary = parseInt(medianSalary);

	var data = [];
	var categories = [];

	var currentDebt = 0;
	var currentYears = 0;

	data.push({y: currentDebt, x: currentYears, marker:{enabled: false}});
	//categories.push(currentYears);

	//Cost of getting the degree
	while (currentYears < yearsInSchool) {
		currentDebt -= costPerYear;
		currentYears += 1;
		if (currentYears == yearsInSchool) {
			data.push({y: currentDebt, x: currentYears, marker:{enabled: true}});
		} else {
			data.push({y: currentDebt, x: currentYears, marker:{enabled: false}});
		}
		//categories.push(currentYears);
	}

	while (currentDebt < (-medianSalary)) {
		currentDebt += medianSalary;
		currentYears += 1;
		data.push({y: currentDebt, x: currentYears, marker:{enabled: false}});
		//categories.push(currentYears);
	}
/*
	var untilZero = -currentDebt;

	var timeUntilZero = (untilZero/medianSalary);

	currentDebt += untilZero;
	currentYears += timeUntilZero;
	data.push()
*/


	var untilZero = -currentDebt;
	var restOfSalary = medianSalary - untilZero;

	var timeUntilZero = (untilZero/medianSalary);
	var nextYear = 1-timeUntilZero;

	currentDebt += untilZero;
	currentYears += timeUntilZero;
	data.push({y: currentDebt, x: currentYears, marker:{enabled: true}});
	//categories.push(currentYears);

	currentDebt += restOfSalary;
	currentYears += nextYear;
	data.push({y: currentDebt, x: currentYears, marker:{enabled: false}});
	//categories.push(currentYears);

	while (currentDebt < (3*medianSalary)) {
		currentDebt += medianSalary;
		currentYears += 1;
		data.push({y: currentDebt, x: currentYears, marker:{enabled: false}});
		//categories.push(currentYears);
	}
	




	$(function () {

	    $('#chartContainer').highcharts({
	    	lang: {
		        thousandsSep: ','
		    },
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
	            		return "Year " + this.x + "<br>Investment: $" + ((-this.y).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	            	} else if (this.x == yearsInSchool) {
	            		return "Degree Earned!<br>Year " + this.x + "<br>Investment: $" + ((-this.y).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	            	} else if (this.y < 0) {
	            		return "Year " + this.x + "<br>Debt: $" + ((-this.y).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	            	} else if (this.y == 0 && this.x != 0) {
	            		return "Breakeven Point!<br>Debt: $0";
	            	} else {
	            		return "Year " + this.x + "<br>Profit: $" + this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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




