

function hideAdmin() {
	$(".actions").hide();
	//$('#main-form .title').html('Welcome!');
	$('#main-form .title').html('');
	$('#main-form .sub-title').html('scan barcode or enter phone number');
	$('#search-text').attr('type','number');
};

function showAdmin() {
	$(".actions").show();
	$('#search-text').attr('type','text');
};


hideAdmin(); //enter kiosk mode on launch


$('#search-content').prepend('<div id="welcomeMessage"><span style="">Welcome!</span></div>'); //add welcome message

//mousetrap key shortcuts
Mousetrap.bind(['esc'], hideAdmin); //hide admin stuff with esc
Mousetrap.bind(['option+a', 'alt+a'], showAdmin); //Enter Admin mode with alt-a or option-a



console.log("[SUCCESS] External Javascript loaded.");





