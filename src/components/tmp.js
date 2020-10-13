


export var xData = ['Carmelo<br>Anthony', 'Dwyane<br>Wade',
      'Deron<br>Williams', 'Brook<br>Lopez',
      'Damian<br>Lillard', 'David<br>West',
      'Blake<br>Griffin', 'David<br>Lee',
      'Demar<br>Derozan'];


function getrandom(num , mul) 
{
   var value = [ ]	
	for(var i=0;i<=num;i++)
   {
	 var rand=Math.random() * mul;
    value.push(rand);
	}
	return value
}

export var yData = [
   getrandom(30 ,10),
	getrandom(30, 20),
   getrandom(30, 25),
   getrandom(30, 40),
	getrandom(30, 45),
   getrandom(30, 30),
   getrandom(30, 20),
   getrandom(30, 15),
   getrandom(30, 43)
];

