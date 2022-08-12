function selectvalue(){
    var select = document.getElementById('admintor');
	var option = select.options[select.selectedIndex].value;

	
    if(option=="Customer"){
        document.getElementById("Customer").style.display = 'block';
        document.getElementById("Employee").style.display = 'none';
    }
    if(option == "Employee"){
        document.getElementById("Customer").style.display = 'none';
        document.getElementById("Employee").style.display = 'block';
        
    }
    console.log(option); 
}