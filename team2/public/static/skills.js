$(document).ready(function(){
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
						if ((skillsArray[j][0] == (counter+1).toString() && skillsArray[j][1] == '.' && skillsArray[j][2] == ' ') || Number(skillsArray[j])) {
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
});




