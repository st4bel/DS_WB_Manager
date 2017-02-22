// ==UserScript==
// @name        DS_WB_Manager
// @namespace   de.die-staemme
// @version     0.1
// @description *
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       unsafeWindow
// @match       https://*.die-staemme.de/game.php?
// @include     https://*.die-staemme.de/game.php?*screen=place*
// @copyright   2017+, the stabel, git
// @downloadURL -
// ==/UserScript==
var _config = {"running":"false","debug":"false"};
var _version = "0.1";
_config.version=_version;

$(function(){
  var storage = localStorage;
  var storagePrefix="WB_M_";
  //Speicherfunktionen
  function storageGet(key,defaultValue) {
      var value= storage.getItem(storagePrefix+key);
      return (value === undefined || value === null) ? defaultValue : value;
  }
  function storageSet(key,val) {
      storage.setItem(storagePrefix+key,val);
  }

  storageSet("config",storageGet("config",JSON.stringify(_config)));

});
