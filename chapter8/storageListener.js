// 监听缓存事件
console.log(1);
window.addEventListener("storage", function(event){
    console.log(2);
    console.log(event);
    if(event.key == "test"){
        var output = document.getElementById('output');
        output.innerHTML = "原有值：" + event.oldValue;
        output.innerHTML += "<br/>新值：" + event.newValue;
        output.innerHTML += "<br/>变动页面地址："
                            + utf8_decode(unescape(event.url));
        console.log(event.storageArea);
        // 此行代码只在chrome浏览器中有效
        console.log(event.storageArea == localStorage); // true
    }
},false);


function utf8_decode(utftext){
    var string = '';
    var i = 0;
    var c = c1 = c2 = 0;
    while(i < utftext.length){
        c = utftext.charCodeAt(i);
        if(c < 128){
            string += String.fromCharCode(c);
            i ++;
        }
        else if((c > 191) && (c < 224)){
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else{
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12)| ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return string;
}