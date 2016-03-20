

function hideAdmin() {
	$("#header .right .group").hide();
	$(".label-quantity").hide();
};

function showAdmin() {
	$("#header .right .group").show();
	$(".label-quantity").show();
	$('.disabledRow').removeClass('disabledRow');
	$('#customNote').remove();
};


var $childRow = $('div.group-events').find('div.group-event');
if( $childRow.hasClass('event-checked-in') ){ // .hasClass() returns BOOLEAN true/false
  $childRow.parents('div.item').addClass('disabledRow');
  $('.event-checked-in').append("<div class=\"title\" id=\"customNote\"><span>See a volunteer to make changes.</span><br><span>To check-out, scan the child's nametag at the main screen.</span></div>" );
}


hideAdmin(); //enter kiosk mode on launch


//mousetrap key shortcuts
Mousetrap.bind(['esc'], hideAdmin); //hide admin stuff with esc
Mousetrap.bind(['option+a', 'alt+a'], showAdmin); //Enter Admin mode with alt-a or option-a



console.log("[SUCCESS] External Javascript loaded.");





