$(document).ready(function(){
	$('.iconSegment[data-dialog-trigger]').mouseenter(function() {
		var dialog = $($(this).attr('data-dialog-trigger'));
		if (!dialog.is(':visible')) {   
  			dialog.show();
		};  
	})

	$('.iconSegment[data-dialog-trigger]').mouseleave(function() {
		var dialog = $($(this).attr('data-dialog-trigger'));
		if (dialog.is(':visible')) {   
  			dialog.hide();
		};  
	})
});
