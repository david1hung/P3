function addFullScreenOverlay(){
  $("#mep_0").prepend("<div id='fullscreen-overlay' style='z-index:1001' class='mejs-overlay mejs-layer'><div>" + document.getElementsByClassName("current")[0].textContent + "</div></div>");
}


function updateTitle(){
  document.getElementById("vidtitle").textContent = document.getElementsByClassName("current")[0].textContent;
  document.getElementById("fullscreen-overlay").textContent = document.getElementsByClassName("current")[0].textContent;
}
    var files = [   "1 What do you do as a teacher.m4v", 
                    "20151225_120317.mp4",
                    "20151231_232831.mp4",
                    "20151231_233211.mp4",
                    "20151231_233230.mp4",
                    "20151231_233253.mp4",
                    "7 Tell me about a specific instance when you were fully absorbed in your work.mp4",
                    "8 Are there any other ways that your work is meaningful to you.mp4",
                    "9 What are some of your favorite things about being a teacher.mp4",
                    "10 What do you want to be remembered for in your line of work.mp4"
                    ];
    var files2 = [ "1 How do you identify with the definition of passion .m4v",
                   "2 What do you find to be the most important part of your job.m4v",
                   "3 What do you do as a special education teacher.m4v",
                   "4 What do you find most rewarding about your job .m4v",
                   "5 When do you feel passion in your work .m4v",
                   "6 When do you feel absorbed in your work .m4v",
                   "7 How is your job meaningful.m4v",
                   "8 When did you know you wanted to become a special education teacher.m4v"
                   ]
function getURLParameter(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'));
}

function updateRank(choice) {
	var pname = window.location.href;
	console.log(pname);
	var socPos = pname.search(/[0-9][0-9]-[0-9][0-9][0-9][0-9]/);
	console.log(socPos);
    var soc = pname.substring(socPos, socPos+2).concat(pname.substring(socPos+2, socPos+7));
	console.log(soc);
	
	if (choice == "like"){
		$.get('/career/' + soc + '/vidup');
    } else if (choice == "neutral") {
		$.get('/career/' + soc + '/vidmid');
	} else if (choice == "dislike") {
		$.get('/career/' + soc + '/viddown');
	}
}

function nextJob(choice){
    var person = getURLParameter('person');
	var vid1, vid2, vid3;

	

	console.log(vid1);
    if (choice == "like"){
		vid1 = handleVideoLike(req, res);
        window.location.href = '/career/' + vid1 + 'video/';
    } else if (choice == "neutral") {
		window.location.href = '/career/' + vid2 + 'video/';
	} else if (choice == "dislike") {
		window.location.href = '/career/' + vid3 + 'video/';
	}
}



//temporary code
    var curfiles = files;
    for (var i=0; i<curfiles.length; i++){
        // alert(files[i]);
        var before = document.getElementById("vidtag").innerHTML;
        // alert(before);
        var person = "Amy/" //getURLParameter('person') + '/';
        if (person == "Melody/")
            curfiles = files2;
        var no_number = curfiles[i].substring(1);
        var question = no_number.substring(0, no_number.length - 4) + '?';
        
        var after = before + "\n <source type='video/mp4' src='http://download.wavetlan.com/SVV/Media/HTTP/H264/Other_Media/H264_test5_voice_mp4_480x360.mp4'>"
        document.getElementById("vidtag").innerHTML = after;
    }
    var person = getURLParameter('person');
    if (person == "Amy"){
        document.getElementById("jobtitle").innerHTML = "Middle School Teacher";
    } 
    else if (person == "Melody"){
        document.getElementById("jobtitle").innerHTML = "Special Education Teacher";
    }
