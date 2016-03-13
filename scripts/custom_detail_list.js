

function hideAdmin() {
	$("#header .right .group").hide();
	$(".label-quantity").hide();
};

function showAdmin() {
	$("#header .right .group").show();
	$(".label-quantity").show();
};


hideAdmin(); //enter kiosk mode on launch


//mousetrap key shortcuts
Mousetrap.bind(['esc'], hideAdmin); //hide admin stuff with esc
Mousetrap.bind(['option+a', 'alt+a'], showAdmin); //Enter Admin mode with alt-a or option-a



console.log("[SUCCESS] External Javascript loaded.");





