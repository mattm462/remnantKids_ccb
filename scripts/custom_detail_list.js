

function hideAdmin() {
	$("#header .right .group").hide();
	$(".label-quantity").hide();
	disableRow(); //block out rows already checked-in
	$("#checkoutLink").hide();

};

function showAdmin() {
	$("#header .right .group").show();
	$(".label-quantity").show();
	$('.disabledRow').removeClass('disabledRow');
	$('#customNote').remove();
// 	showCheckoutCode();
};



function disableRow() {
	var childRow = $('div.group-events').find('div.group-event');
	if( childRow.hasClass('event-checked-in') ){ // .hasClass() returns BOOLEAN true/false
	  childRow.parents('div.item').addClass('disabledRow');
	  $('.event-checked-in').append('<div class="title" id="customNote"><span>See a volunteer to make changes.</span><br><span>To check-out, scan the child\'s nametag at the main screen.</span></div>' );
	}
};

//  function showCheckoutCode() {
//  	var kidRowEvents = $('div.group-events').find('div.group-event');
//  	if( kidRowEvents.hasClass('event-checked-in') ){
//  	  kidRow = $(kidRowEvents).parents('div.item');
//  	  checkoutCode =$(kidRow).attr( 'data-nametag-id' );
//  		console.log(checkoutCode);
//  	  $(kidRow).children('.content-wrapper:last-child').after('<div id="checkoutLink" class="content-wrapper cell large"><div class="cell-content"><a href="https://remnantchurch.ccbchurch.com/checkin_main.php?adminCheckout='+checkoutCode+'" title="'+checkoutCode+'"><b>Check Out<b></a></div></div>');
//  	};

//  };

function tagModifications(){
	$('#pickup-tag .message').html('*** Keep this ticket. Pick up your children and scan their nametags to check out of RemnantKids. ***');
}

$(function() {
	hideAdmin(); //enter kiosk mode on launch
	tagModifications();
	hidePickupTag();
	//mousetrap key shortcuts
	Mousetrap.bind(['esc'], hideAdmin); //hide admin stuff with esc
	Mousetrap.bind(['option+a', 'alt+a'], showAdmin); //Enter Admin mode with alt-a or option-a
});

function hidePickupTag(){
	$('#header .nav.left .group').append('<li><a id="button_NoTag" href="javascript:void(0);" class="button">I am volunteering today.</a></li>');


$( '#button_NoTag' ).click(function( event ) {
  event.preventDefault();
  $('#pickup-tag').css("display", "none");
  console.log("Pickup Tag HIDDEN");
  $('#button_NoTag').css("display", "none");
});
}





console.log("[SUCCESS] External Javascript loaded.");





