// ==UserScript==
// @name        remnantKidsCheckIn
// @namespace   remnantKidsCheckIn-
// @description remnantKidsCheckIn
// @include     https://remnantchurch.ccbchurch.com/checkin_main.php*
// @version     1
// @resource cssSrc https://raw.githubusercontent.com/mattm462/remnantKids_ccb/master/styles/custom_kiosk.css
// @require https://raw.githubusercontent.com/mattm462/remnantKids_ccb/master/scripts/mousetrap.min.js
// @grant    GM_addStyle
// @grant    GM_getResourceText
// ==/UserScript==


GM_addStyle(GM_getResourceText("cssSrc"));
console.log("[SUCCESS] Custom RemnantKids styles applied");

(function () {
    var scriptElement = document.createElement( "script" );
    scriptElement.type = "text/javascript";
    scriptElement.src = "https://raw.githubusercontent.com/mattm462/remnantKids_ccb/master/scripts/custom_kiosk_manned.js";
    document.body.appendChild( scriptElement );
})();

