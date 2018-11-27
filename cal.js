"use strict";
/*
Mitzi Bustamante
November 7 2018
CISC 131

Calcultor Part: 5 
Working Calcultor
*/
window.onload =function ()
{
var i; //declaration
var hold; //declaration
i=0;
hold=getElement("number"+i);
while(hold !== null)
{
if (isItOperator(hold.innerHTML) === true)
{
	hold.onmouseover=showContentTool;
	hold.onmouseout=function(){awayTool()};
	hold.onclick=function(){showOperator(this.innerHTML)};
}
else if (hold.innerHTML.charAt(0)==='.' )
{
	hold.onclick=oneDecimal;
}
else
{
	hold.onclick=function(){showDigit(this.innerHTML)};
}
i=i+1;
hold=getElement("number"+i);
}
document.onselectstart=function () {return false;} //mozilla
document.onmousedown=function () {return false;} //IE
getElement("clear1").onclick=clearAll; //cleaar all from display area when clicked clear all 
getElement("clear").onclick=deleteLastCharacter; // clears last character from display area when clicked 
document.onkeypress=function (event) {keyDown(event);} // makes it able to press down dogits & operator from keyboard in IE or Mozilla 
getElement('number14').onclick=equal; //when clciked it give the answer 
};

function getElement (HTMLId)
{
	//gets elemenet by thier HTMLId
var elementReference;
elementReference=document.getElementById(HTMLId);
return elementReference;

}
function getDisplay()
{
	//  return display reference
var display;
display=getElement("display");
window.alert(display);
return display;

}
function displayToolTip ()
{
	//returns tooltip reference
var tool;
tool=getElement("tooltip");
return tool;
}
function getDisplayContent()
{
	//accesses display are 
return getDisplay().innerHTML+"";
}
function setDisplayContent (Newcontent)
{
	//sets the content on display 
getDisplay().innerHTML= Newcontent;
}
function showToolTip (Newcontent)
{
	//show tool tips
displayToolTip().innerHTML=Newcontent;
}
function awayTool()
{
	//hides the tool tips 
showToolTip(null);
}
function showContentTool()
{
	//shows the text of the selected operator in the tool tip 
if (this===getElement("number3"))
{
	showToolTip("Addition");
}
if ( this===getElement("number7"))
{
	showToolTip("Subtraction");
}
if (this===getElement("number11"))
{
	showToolTip("Divison");
}
if (this===getElement("number15"))
{
	showToolTip("Multiplication");
}
}
function isItDigit (text)
{
	//this function checl to see if the text is an actual digit
var result;
if (Number(text) >=0 && Number(text) <=9 )
{
	result=true;
}
else
{
	result=false;
}
return result;
}
function isItOperator(text)
{
	//this function check if the text is an actaul operator
var result;
var operator;
operator="/*-+";
if ( operator.indexOf(text)>=0)
{
result= true;
}
else
{
result = false;
}
return result;
}
function showDigit(digit)
{
	//this functon display the number, but it does not display the digits with a leading zero
	var result=getDisplayContent()+digit;
	if(result.length>1 && result.charAt(0)=='0')
	{
		result=result.substring(1);
	}
	setDisplayContent(result);
}
function showOperator(showOperator)
{
	//this function display the operator and check for the last operator so that there is only two 
	if (isItOperator(getDisplayContent().charAt(getDisplayContent().length-1)))
	{
		if((isItOperator(getDisplayContent().charAt(getDisplayContent().length-2)) === false)) //if the the last two character are operator then stop
		{
			if (showOperator.charAt(0) === '-')// if the operator is minus then show the display
			{
				setDisplayContent(getDisplayContent()+showOperator);
			}
		}
	}
		else //if the last number is not an operator then show display
		{
			setDisplayContent(getDisplayContent()+showOperator);
		}
}
function oneDecimal()
{
	// //need to check if you have any decimal point or not, if you dont then add the new one.
	if (getDisplayContent().indexOf(".") < 0)
	{
		setDisplayContent(getDisplayContent()+'.');
	}
}
function keyDown(event)
{
	//this function makes it able to press down keys
var num;
var keyCode;
var digit;
var operator;
digit="0123456789";
operator="+-/*";
// depending on the web browers it works on 
if (window.event) 
{
	keyCode=event.keyCode; 
}
else 
{
	keyCode=event.which;
}
num=String.fromCharCode(keyCode);
if(digit.indexOf(num)>=0 )	
{
	showDigit(num);
}
if (operator.indexOf(num)>=0)
{
	showOperator(num);
}
if (num === ".")
{
	oneDecimal();
}
if ( num === "\b" )
{
	deleteLastCharacter();
}
if (num === "=")
{
	document.onkeydown=equal();
}
}
function clearAll()
{
	//this function clear all the characters from the display area 
	setDisplayContent(null);
}
function deleteLastCharacter()
{
	//this funciton see what's indide the display area deletes the last characeters in it
getDisplay().innerHTML=getDisplayContent().substring(0, getDisplayContent().length-1);
}
function equal()
{
	//this function does the (addiction,subtraction,multiplication and division) 
var displayArea;
var result;
var operator;
var digit;
var x;
var j;
result=0;
digit="0123456789";
operator="/*-+";
displayArea= "+" + getDisplayContent() + "!";
while (operator.indexOf(displayArea.charAt(displayArea.length-1))>= 0)
{
	displayArea=displayArea.substring(0, displayArea.length-1);
}
while (displayArea.length>1)
{
	x="";
	j="";
	while ( operator.indexOf(displayArea.charAt(0))>=0)
	{
		j=j+displayArea.charAt(0);
		displayArea=displayArea.substring(1);
	}
	while (digit.indexOf(displayArea.charAt(0))>=0)
	{
		x=x+ displayArea.charAt(0);
		displayArea=displayArea.substring(1);
	}
	x= Number(x);
	if ( j.length === 2 )
	{
		x = x * (-1);
		j= j.charAt(0);
	}
	if (j === "+")
	{
		result = result + x;
	}
	if (j === "-")
	{
		result = result - x;
	}
	if ( j === "*")
	{
		result= result * x;
	}
	if ( j === "/")
	{
		result= result / x;
	}
}
setDisplayContent(result);
}
