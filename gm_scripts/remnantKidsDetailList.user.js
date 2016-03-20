// ==UserScript==
// @name        remnantKidsDetailList
// @namespace   remnantKidsDetailList
// @description remnantKidsDetailList
// @include     https://remnantchurch.ccbchurch.com/checkin_family_detail.php*
// @version     1.03
// @resource cssSrc https://rawgit.com/mattm462/remnantKids_ccb/master/styles/custom_family_detail.css
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
    scriptElement.src = "https://rawgit.com/mattm462/remnantKids_ccb/master/scripts/custom_detail_list.js";
    document.body.appendChild( scriptElement );
})();

console.log("[SUCCESS] Custom RemnantKids scripts added");
