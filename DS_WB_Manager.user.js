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
  function toggleRunning(){
      var config = JSON.parse(storageGet("config"));
      config.running = ""+(config.running==="false");
      add_log("running set to "+config.running);
      storageSet("config",JSON.stringify(config));
      location.reload();
  }
  function getSymbolStatus(){
      if(JSON.parse(storageGet("config")).running==="true"){
          return "icon friend online";
      }else{
          return "icon friend offline";
      }
  }
  function add_log(text){
    if(JSON.parse(storageGet("config")).debug==="true"){
      var prefix = storagePrefix+timeConverter(Date.now())+" - ";
      console.log(prefix+text);
    }
  }
  function timeConverter(timestamp){
    var a = new Date(timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
  function randomInterval(min,max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function percentage_randomInterval(average,deviation){
  average=parseInt(average);
  deviation = deviation > 100 ? 1 : deviation/100;
  return randomInterval(average*(1+deviation),average*(1-deviation));
}
  function getPageAttribute(attribute){
      //gibt die php-Attribute zurück, also z.B. von* /game.php?*&screen=report* würde er "report" wiedergeben
      //return: String, wenn nicht vorhanden gibt es eine "0" zurück
      var params = document.location.search;
      var value = params.substring(params.indexOf(attribute+"=")+attribute.length+1,params.indexOf("&",params.indexOf(attribute+"=")) != -1 ? params.indexOf("&",params.indexOf(attribute+"=")) : params.length);
      return params.indexOf(attribute+"=")!=-1 ? value : "0";
  }
});
