// ==UserScript==
// @name        remnantKidsFamilySearchList
// @namespace   remnantKidsFamilySearchList
// @description remnantKidsFamilySearchList
// @include     https://remnantchurch.ccbchurch.com/checkin_family_list.php*
// @include		https://remnantchurch.ccbchurch.com/checkin_family_create.php*
// @version     1.01
// @resource cssSrc https://rawgit.com/mattm462/remnantKids_ccb/master/styles/custom_family_search.css
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
    scriptElement.src = "https://rawgit.com/mattm462/remnantKids_ccb/master/scripts/custom_search_list.js";
    document.body.appendChild( scriptElement );
})();

console.log("[SUCCESS] Custom RemnantKids scripts added");
