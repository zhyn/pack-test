//获取cookie
var getCookie = function(name) { 
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

var sendText = function(name){
    console.log(`${name} hello!`)
}
var globalTools ={
    getData : function(name){
        console.log('hellow workd');
    }
}
