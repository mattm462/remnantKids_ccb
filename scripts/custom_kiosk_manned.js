

function hideAdmin() {
	$(".actions").hide();
	$('#main-form .title').html('Welcome!');
	//$('#main-form .title').html('');
	$('#main-form .sub-title').html('please scan barcode');
	$('#search-text').prop('type','number');
};

function showAdmin() {
	$(".actions").show();
	$('#search-text').prop('type','text');
};


hideAdmin(); //enter kiosk mode on launch


$(function() {
    $('#search-content').prepend('<div id="welcomeMessage"><span style="">RemnantKids</span></div>'); //add welcome message
    $('#search-content').append('<div class="detailMessage top"><span class="header">Checking In?</span><br><span class="message">Scan your barcode or enter your phone number.</span><br></div>'); //add instruction top
    $('#search-content').append('<div class="detailMessage"><span class="header">Checking Out?</span><br><span class="message">Reunite with your child and scan his or her nametag.</span></div>'); //add second instruction

	//mousetrap key shortcuts
	Mousetrap.bind(['esc'], hideAdmin); //hide admin stuff with esc
	Mousetrap.bind(['option+a', 'alt+a'], showAdmin); //Enter Admin mode with alt-a or option-a
});





console.log("[SUCCESS] External Javascript loaded.");





