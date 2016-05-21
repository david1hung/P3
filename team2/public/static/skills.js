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

	if($('#skillsArray').length) {
		skillsArray = document.getElementById('skillsArray').innerHTML;
		skillsArray = skillsArray.split(",");
		j = 0;
		while (j < skillsArray.length) {
			//For some reason this checks if it's not NaN
			if (Number(skillsArray[j])) {

				//Intelligence Percentage + Title
				document.getElementById('contentContainer').innerHTML += "<div class='intelligenceTitle'>" + skillsArray[j+1] + " " + 100*Number(skillsArray[j]) + "%</div>";

				//Intelligence Tasks
				var taskString = "";
				taskString += "<div class='intelligenceTasks'><ul>";

				j += 2;
				counter = 1;
				while (j < skillsArray.length && skillsArray[j][0] == counter.toString()) {
					
					taskString += "<li>" + skillsArray[j].substring(3);
					j++;

					while (j < skillsArray.length) {
						if (skillsArray[j][0] == (counter+1).toString() || Number(skillsArray[j])) {
							break;
						}
						taskString += "," + skillsArray[j];
						j++;
					}


					taskString += "</li>";
					counter++;

				}

				taskString += "</ul></div>";
				document.getElementById('contentContainer').innerHTML += taskString;


			}
		}
	}


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




