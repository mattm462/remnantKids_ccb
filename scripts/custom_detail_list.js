

function hideAdmin() {
	$("#header .right .group").hide();
	$(".label-quantity").hide();
};

function showAdmin() {
	$("#header .right .group").show();
	$(".label-quantity").show();
	$('.disabledRow').removeClass('disabledRow');
	$('#note').remove();
};


var $childRow = $('div.group-events').find('div.group-event');
if( $childRow.hasClass('event-checked-in') ){ // .hasClass() returns BOOLEAN true/false
  $childRow.parents('div.item').addClass('disabledRow');
  $('body').prepend('<div id="note"><p>A child has already been checked-in. See RemnantKids volunteer to make changes.<br/>To check-out, please claim your child and scan his or her nametag.</p></div>' );
}


hideAdmin(); //enter kiosk mode on launch


//mousetrap key shortcuts
Mousetrap.bind(['esc'], hideAdmin); //hide admin stuff with esc
Mousetrap.bind(['option+a', 'alt+a'], showAdmin); //Enter Admin mode with alt-a or option-a



console.log("[SUCCESS] External Javascript loaded.");





