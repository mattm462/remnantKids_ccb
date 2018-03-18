

function hideAdmin() {
	$("#header .right .group").hide();
	$(".family-link .cell .phone").hide();
	$(".family-link .cell .street").hide();
};

function showAdmin() {
	$("#header .right .group").show();
	$(".family-link .cell .phone").show();
	$(".family-link .cell .street").show();
};



hideAdmin(); //enter kiosk mode on launch

$(function() {
	
	var checkExist = setInterval(function() {
	   if (typeof Mousetrap !== 'undefined' && $.isFunction(Mousetrap )) {
		Mousetrap.bind(['esc'], hideAdmin); //hide admin stuff with esc
		Mousetrap.bind(['option+a', 'alt+a'], showAdmin); //Enter Admin mode with alt-a or option-a
	      clearInterval(checkExist);
	   } 
	}, 100);

});




console.log("[SUCCESS] External Javascript loaded.");





