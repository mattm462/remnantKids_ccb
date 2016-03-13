// ==UserScript==
// @name        remnantKidsCheckIn
// @namespace   remnantKidsCheckIn-
// @description remnantKidsCheckIn
// @include     https://remnantchurch.ccbchurch.com/checkin_main.php*
// @version     1
// @resource cssSrc https://raw.githubusercontent.com/mattm462/remnantKids_ccb/master/styles/custom_kiosk.css
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js
// @require https://raw.githubusercontent.com/mattm462/remnantKids_ccb/master/scripts/mousetrap.min.js
// @require https://raw.githubusercontent.com/mattm462/remnantKids_ccb/master/scripts/custom_kiosk_manned.js
// @grant    GM_addStyle
// @grant    GM_getResourceText
// ==/UserScript==


GM_addStyle(GM_getResourceText("cssSrc"));
console.log("[SUCCESS] Custom RemnantKids styles applied");

