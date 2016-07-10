// ==UserScript==
// @name        remnantKidsCheckIn
// @namespace   remnantKidsCheckIn
// @description remnantKidsCheckIn
// @include     https://remnantchurch.ccbchurch.com/checkin_main.php*
// @version     1.09
// @resource cssSrc https://rawgit.com/mattm462/remnantKids_ccb/master/styles/custom_kiosk.css
// @grant    GM_addStyle
// @grant    GM_getResourceText
// ==/UserScript==


GM_addStyle(GM_getResourceText("cssSrc"));
console.log("[SUCCESS] Custom RemnantKids styles applied");


(function () {
    var scriptElement = document.createElement( "script" );
    scriptElement.type = "text/javascript";
    scriptElement.src = "https://rawgit.com/mattm462/remnantKids_ccb/master/scripts/mousetrap.min.js";
    document.body.appendChild( scriptElement );
})();

(function () {
    var scriptElement = document.createElement( "script" );
    scriptElement.type = "text/javascript";
    scriptElement.src = "https://rawgit.com/mattm462/remnantKids_ccb/master/scripts/custom_kiosk_manned.js";
    document.body.appendChild( scriptElement );
})();

console.log("[SUCCESS] Custom RemnantKids scripts added");
