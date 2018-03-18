

function hideAdmin() {
	$(".actions").hide();
	$('#main-form .title').html('Welcome!');
	//$('#main-form .title').html('');
	$('#main-form .sub-title').html('please enter phone number');
	//$('#search-text').prop('type','number'); //checkout barcode uses a number
};

function showAdmin() {
	$(".actions").show();
	//$('#search-text').prop('type','text'); 
};






 //used to get URL parameters for admin checkout
 function GetURLParameter(sParam)
 {
     var sPageURL = window.location.search.substring(1);
     var sURLVariables = sPageURL.split('&');
     for (var i = 0; i < sURLVariables.length; i++) 
     {
         var sParameterName = sURLVariables[i].split('=');
         if (sParameterName[0] == sParam) 
         {
             return sParameterName[1];
         }
     }
 };

 //if a url parameter with checkout code is passed from the family page, initiate the checkout
 function initiateCheckout(){
 	var adminCheckoutCode = GetURLParameter('adminCheckout'); //get code
 	if (typeof adminCheckoutCode != "undefined"){ //if code exists
 		$('#search-text').val(adminCheckoutCode); //put code in form
 		$('#main-form a').trigger('click'); //submit form
 	}
 };


//set focus to the search box every 5 seconds
function focus() {
   if($("#search-text") && !$("#search-text").is(":focus") && $(":input:visible").length < 2)
	$("#search-text").focus();
}



$(function() {
	hideAdmin(); //enter kiosk mode on launch
    $('#search-content').prepend('<div id="welcomeMessage"><span style="">RemnantKids</span></div>'); //add welcome message
    $('#search-content').append('<div class="detailMessage top"><span class="message">One & Two Year Olds have moved to the last classroom.</span><br><br><br><span class="header">Checking In?</span><br><span class="message">Scan your barcode or enter your phone number.</span><br></div>'); //add instruction top
    $('#search-content').append('<div class="detailMessage"><span class="header">Checking Out?</span><br><span class="message">Pick up your children, then scan their nametags on your way out.</span></div>'); //add second instruction
    initiateCheckout();
	
	var checkExist = setInterval(function() {
	   if (typeof Mousetrap !== 'undefined' && $.isFunction(Mousetrap )) {
		Mousetrap.bind(['esc'], hideAdmin); //hide admin stuff with esc
		Mousetrap.bind(['option+a', 'alt+a'], showAdmin); //Enter Admin mode with alt-a or option-a
	      clearInterval(checkExist);
	   }
	}, 100);
	
	
	//mousetrap key shortcuts
	
    setInterval(focus, 5000); //set focus to the search box every 5 seconds
    
    
    
    $("<link/>", {
	   rel: "stylesheet",
	   type: "text/css",
	   href: "https://rawgit.com/mattm462/remnantKids_ccb/master/styles/custom_kiosk.css"
	}).appendTo("head");

});




console.log("[SUCCESS] External Javascript loaded.");





