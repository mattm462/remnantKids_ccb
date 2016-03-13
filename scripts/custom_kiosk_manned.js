

function hideAdmin() {
	$(".actions").hide();
	$('#main-form .title').html('Welcome!');
	$('#main-form .title').hide();
	$('#main-form .sub-title').html('please scan barcode');
};

function showAdmin() {
	$(".actions").show();
};


hideAdmin(); //enter kiosk mode on launch




//mousetrap key shortcuts
Mousetrap.bind(['esc'], hideAdmin); //hide admin stuff with esc
Mousetrap.bind(['option+a', 'alt+a'], showAdmin); //Enter Admin mode with alt-a or option-a



console.log("[SUCCESS] External Javascript loaded.");





