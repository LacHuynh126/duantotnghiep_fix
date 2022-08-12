
var elem = document.getElementsByClassName("img-chat");
var elem1 = document.getElementsByClassName("chatContent-content");
var elem2 = document.getElementById("nguoibanXe").value;
var elem3 = document.getElementById("nguoiNhan").value;
var elem4 = document.getElementById("nguoiDang").value;
var elem5 = document.getElementsByClassName("name_post_chat");
var i =0;

if(elem2==elem4){
    var y = document.getElementById("nguoiNhan");
    y.value = '';
    for(i;i<elem5.length;i++){
        console.log(elem5[i].value)
        if(elem5.length==0){
            y.value = '';
        } else {
            y.value = elem5[1].value;
        }
        
    }
   
}


for(i;i<elem.length; i++){
    if(elem[i].getAttribute('src') == "")
    {
        elem[i].style.display = 'none';
        elem1[i].style.marginTop = '5px';
        elem1[i].style.marginRight = '0px';
    }
    else
    {
        console.log('co gia tri');
    }
}



