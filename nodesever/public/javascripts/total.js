const total = document.getElementById("total");
const x = document.getElementsByClassName('giatien');
const totals = document.getElementById("totals");
var sum = 0;
for(var i =0;i<=x.length;i++){
    var c = document.getElementsByClassName('giatien')[i].value;
    var y = parseFloat(c);
    
    sum += y;
    total.innerHTML = 'Total: ' + sum;
    totals.value = sum;
    console.log(sum);
}
