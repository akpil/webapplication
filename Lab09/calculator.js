"use strict"
window.onload = function () {
    var stack = [];
	var displayVal = "0";
	var str = "0";
    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            var value = this.innerHTML;
			var number = new RegExp("[0-9]");
			var point = new RegExp("^[0-9]+\.{1}[0-9]*[0-9]$");
			if(number.test(value))
			{
				if(displayVal == '0'){
					displayVal = value;
				}
				else{
					if(str.indexOf("=") != -1){
						stack = [];
						str="0";
						document.getElementById("expression").innerHTML = "0";
						displayVal = "";
					}
					if(displayVal.indexOf("!") == -1){
						displayVal += value;
					}
				}
			}
			else if(value == 'AC'){
				displayVal = '0';
				str = '0';
				stack = [];
				document.getElementById("expression").innerHTML = "0";
				
			}
			else if(value == '.'){
				if(displayVal.indexOf(".") == -1){
					displayVal += value;
				}
			}
			else{
				if(str.indexOf("=") != -1){
					stack = [];
					str="";
					displayval = "0";
				}
				if(value == '!')
				{
					if(displayVal.indexOf("!") == -1){
						displayVal += value;
					}
				}
				else{
					if(str == '0'){
						str = displayVal+value;
						if(displayVal.indexOf("!") != -1)
						{
							var fact = factorial(parseFloat(displayVal));
							stack.push(fact+value);
						}
						else{
						stack.push(displayVal+value);
						}
					}
					else{
						str += displayVal+value;
						if(displayVal.indexOf("!") != -1)
						{
							var fact = factorial(parseFloat(displayVal));
							highPriorityCalculator(stack,fact+value);
						}
						else{
							highPriorityCalculator(stack,displayVal+value);
						}
					}
					if(str.indexOf("=") != -1){
						displayVal = calculator(stack);
					}
					else{
						displayVal='0';
					}
					document.getElementById("expression").innerHTML = str;
					
					
				}
				
			}
			document.getElementById("result").innerHTML = displayVal
        };
    }
};
function factorial (x) {
	if(x == 1){
		return 1;
	}
	else{
		return x*factorial(x-1);
	}
}
function highPriorityCalculator(s, val) {
	var lastval = s.pop(s[s.length-1]);
	var result = 0;
	var operater = val[val.length-1];
	if(lastval.indexOf("*") != -1){
		result = parseFloat(lastval) * parseFloat(val);
		s.push(result+operater);
	}
	else if(lastval.indexOf("^") != -1){
		result = Math.pow(parseFloat(lastval), parseFloat(val));
		s.push(result+operater);
	}
	else if(lastval.indexOf("/") != -1){
		result = parseFloat(lastval) / parseFloat(val);
		s.push(result+operater);
	}
	else{
		s.push(lastval);
		s.push(val);
	}
}
function calculator(s) {
    var result = 0;
    var operator = "+";
    for (var i=0; i< s.length; i++) {
		if(operator == "+"){
        	result += parseFloat(s[i]);
		}
		else{
			result -= parseFloat(s[i]);
		}
		operator = s[i][s[i].length-1];
    }
    return result;
}
