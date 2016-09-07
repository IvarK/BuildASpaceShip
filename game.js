var distance = 0
var baseSpeed = 0
var speedMultipliers = 1
var speed = baseSpeed * speedMultipliers
var money = 20
var funds = 0.1
var rocketCost = 10
var shipCost = 10
var wingCost = 20
var rockets = 0
var ships = 0
var wings = 0
var rocketUpdateCost = 20
var shipUpdateCost = 20
var wingUpdateCost = 40
var rocketUpdates = 0
var shipUpdates = 0
var wingUpdates = 0


var lastUpdate = new Date().getTime();
var meterLabel = document.getElementById("meters")
var rocketButton = document.getElementById("rockets")
var shipButton = document.getElementById("ship")
var wingButton = document.getElementById("wings")
var speedLabel = document.getElementById("speed")
var moneyLabel = document.getElementById("money")
var rocketUpdateButton = document.getElementById("rocketUpdate")
var shipUpdateButton = document.getElementById("shipUpdate")
var wingUpdateButton = document.getElementById("wingUpdate")


Rockets = ['Bottle', 'Canister', 'Gas tank', 'Firework', 'Gasoline', 'Diesel', 'Propane', 'Uranium', 'Antimatter']
Ships = ['Cardboard box ship', 'Trash can ship', 'Sofa ship', 'Ikea shelf ship', 'Lada ship', 'Ford Escort ship', 'Audi ship', 'Delorean', 'Old Russian spacecraft', 'USS Discovery One', 'Battlestar Galactica BG-75', 'Prometheus', 'Serenity', 'Star Destroyer', 'USS Enterprise',  'Millenium Falcon']
Wings = ['Paper', 'Cloth', 'Aluminium foil', 'Plastic', 'Wooden', 'Iron', 'Steel', 'Aluminium', 'Carbon fabric', 'Adamantium', 'Black Matter']
MoneyFormat = ['K', 'M', 'B', 'T', 'Qd', 'Qt', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'UDc', 'DDc', 'TDc', 'QdDc', 'QtDc', 'SxDc', 'SpDc', 'ODc', 'NDc', 'Vg', 'UVg', 'DVg', 'TVg', 'QdVg', 'QtVg', 'SxVg', 'SpVg', 'OVg', 'NVg', 'Tg', 'UTg', 'DTg', 'TTg', 'QdTg', 'QtTg', 'SxTg', 'SpTg', 'OTg','NTg', 'Qa', 'UQa', 'DQa', 'TQa', 'QdQa', 'QtQa', 'SxQa', 'SpQa', 'OQa', 'NQa', 'Qi', 'UQi', 'DQi', 'TQi', 'QaQi', 'QtQi', 'SxQi', 'SpQi', 'OQi', 'NQi', 'Se', 'USe', 'DSe', 'TSe', 'QaSe', 'QtSe', 'SxSe', 'SpSe', 'OSe', 'NSe', 'St', 'USt', 'DSt', 'TSt', 'QaSt', 'QtSt', 'SxSt', 'SpSt', 'OSt', 'NSt', 'Og', 'UOg', 'DOg', 'TOg', 'QdOg', 'QtOg', 'SxOg', 'SpOg', 'OOg', 'NOg', 'Nn', 'UNn', 'DNn', 'TNn', 'QdNn', 'QtNn', 'SxNn', 'SpNn', 'ONn', 'NNn'];
MoneyFormat.reverse();

shorten = function(x) {
	var temp = MoneyFormat.length;
	var digitMul = Math.pow(10, 2);
	for (var i = 0; i < MoneyFormat.length; i++) {
		if ( Math.pow(10, temp * 3) <= x ) {
			x = x / Math.pow(10, temp * 3);
			return x.toFixed(2) + ' ' + MoneyFormat[i];
		}
		temp--;
	}
	return x.toFixed(1);
};

shortenCosts = function(x) {
	var temp = MoneyFormat.length;
	var digitMul = Math.pow(10, 2);
	for (var i = 0; i < MoneyFormat.length; i++) {
		if ( Math.pow(10, temp * 3) <= x ) {
			x = x / Math.pow(10, temp * 3);
          if ((Math.round(x * digitMul) / digitMul) == 1000) {
            return (Math.round((x * digitMul) / digitMul)/1000) + ' ' + MoneyFormat[i-1];
          }
			else return (Math.round(x * digitMul) / digitMul) + ' ' + MoneyFormat[i];
		}
		temp--;
	}
	return Math.floor(x);
};



rocketButton.onclick = function() {
  if (rockets === 0 && money >= rocketCost) {
    money -= rocketCost
    rocketCost *= 10000
    speedMultipliers *= 2
    rockets++;
    rocketButton.innerHTML = shortenCosts(rocketCost) + " € for " + Rockets[rockets] + " rocket."
    rocketUpdateAmount = 0
  }
  if (money >= rocketCost && rocketUpdateAmount == 5) {
    money -= rocketCost
    rocketCost *= 10000
    rockets++;
    rocketButton.innerHTML = shortenCosts(rocketCost) + " € for " + Rockets[rockets] + " rocket."
    rocketUpdateAmount = 0
    document.getElementById("rocketUpdateAmount").innerHTML = rocketUpdateAmount + "/5"
  }
}


shipButton.onclick = function() {
  if (ships === 0 && money >= shipCost) {
    money -= shipCost
    shipCost *= 250
    baseSpeed += 0.1
    ships++;
    shipButton.innerHTML = shortenCosts(shipCost) + " € for " + Ships[ships] + " ship."
    shipUpdateAmount = 0
  }
  if (money >= shipCost  && shipUpdateAmount == 5) {
    money -= shipCost
    shipCost *= 250
    ships++;
    shipButton.innerHTML = shortenCosts(shipCost) + " € for " + Ships[ships] + "."
    shipUpdateAmount = 0
    document.getElementById("shipUpdateAmount").innerHTML = shipUpdateAmount + "/5"
  }
}


wingButton.onclick = function() {
  if (wings === 0 && money >= wingCost) {
    money -= wingCost
    wingCost *= 125
    speedMultipliers *= 1.5
    wings++;
    wingButton.innerHTML = shortenCosts(wingCost) + " € for " + Wings[wings] + " wings."
    wingUpdateAmount = 0
  }
  if (money >= wingCost && wingUpdateAmount == 5) {
    money -= wingCost
    wingCost *= 125
    wings++;
    wingButton.innerHTML = shortenCosts(wingCost) + " € for " + Wings[wings] + " wings."
    wingUpdateAmount = 0
    document.getElementById("wingUpdateAmount").innerHTML = wingUpdateAmount + "/5"
  }
}


wingUpdateButton.onclick = function() {
  if (money >= wingUpdateCost && wingUpdateAmount < 5 && wings !== 0) {
    money -= wingUpdateCost
    wingUpdateCost *= 2.5;
    speedMultipliers *= 1.3;
    wingUpdateAmount++;
    wingUpdateButton.innerHTML = shortenCosts(wingUpdateCost) + " € to update your wings"
    document.getElementById("wingUpdateAmount").innerHTML = wingUpdateAmount + "/5"
  }
}


rocketUpdateButton.onclick = function() {
  if (money >= rocketUpdateCost && rocketUpdateAmount < 5 && rockets !== 0) {
    money -= rocketUpdateCost
    rocketUpdateCost *= 6;
    speedMultipliers *= 1.8;
    rocketUpdateAmount++;
    rocketUpdateButton.innerHTML = shortenCosts(rocketUpdateCost) + " € to update your rockets"
    document.getElementById("rocketUpdateAmount").innerHTML = rocketUpdateAmount + "/5"
  }
}


shipUpdateButton.onclick = function() {
  if (money >= shipUpdateCost && shipUpdateAmount < 5 && ships !== 0) {
    money -= shipUpdateCost
    shipUpdateCost *= 3;
    baseSpeed += 0.1*(ships*shipUpdateAmount+1)
    shipUpdateAmount++;
    shipUpdateButton.innerHTML = shortenCosts(shipUpdateCost) + " € to update your ship"
    document.getElementById("shipUpdateAmount").innerHTML = shipUpdateAmount + "/5"
  }
}




function achievement(name)
{
  document.getElementById("achievementBox").innerHTML = name
  $( "div:hidden:first" ).fadeIn( 4000 ).fadeOut(1500);
  

}


var firstAchievement = false
var secondAchievement = false
var thirdAchievement = false
var fourthAchievement = false
var fifthAchievement = false

setInterval(function() {
  var thisUpdate = new Date().getTime();
  var diff = thisUpdate - lastUpdate;
  diff = diff/100;
  meterLabel.innerHTML = "You have travelled " + shorten(distance) + " meters."
  speedLabel.innerHTML = shorten(speed) + "m/s"
  moneyLabel.innerHTML = shorten(money) + " €"
  speed = baseSpeed * speedMultipliers
  
  if (money >= rocketCost) rocketButton.className = 'button'
  else rocketButton.className = 'nbutton'
  
   if (money >= shipCost) shipButton.className = 'button'
  else shipButton.className = 'nbutton'
  
   if (wings === 0 || wingUpdateAmount == 5) {
     if (money >= wingCost) wingButton.className = 'button'
     else wingButton.className = 'nbutton'
   } else wingButton.className = 'nbutton'
   
   
   if (rockets === 0 || rocketUpdateAmount == 5) {
     if (money >= rocketCost) rocketButton.className = 'button'
     else rocketButton.className = 'nbutton'
   } else rocketButton.className = 'nbutton'
   
   
   if (ships === 0 || shipUpdateAmount == 5) {
     if (money >= shipCost) shipButton.className = 'button'
     else shipButton.className = 'nbutton'
   } else shipButton.className = 'nbutton'
  
  
  if (money >= wingUpdateCost && wingUpdateAmount < 5 && wings !== 0) wingUpdateButton.className = 'button'
  else wingUpdateButton.className = 'nbutton'
  
  if (money >= rocketUpdateCost && rocketUpdateAmount < 5 && rockets !== 0) rocketUpdateButton.className = 'button'
  else rocketUpdateButton.className = 'nbutton'
  
    if (money >= shipUpdateCost && shipUpdateAmount < 5 && ships !== 0) shipUpdateButton.className = 'button'
  else shipUpdateButton.className = 'nbutton'
  
  document.getElementById("funds").innerHTML = "You get " + Math.round(funds*100)/100 + " € per second for each meter travelled."
  
  if (distance > 10 && !firstAchievement) { 
    achievement("I can still see you")
    firstAchievement = true
    funds *= 1.1
  }
  
   if (speed > 340.29 && !secondAchievement) { 
    achievement("I can still hear you")
    secondAchievement = true
    funds *= 1.1
  }
  
     if (distance > 50000 && !thirdAchievement) { 
    achievement("You have reached the edge of the stratosphere.")
    thirdAchievement = true
    funds *= 1.1
  }
  
     if (distance > 384400 && !fourthAchievement) { 
    achievement("Neil Armstrong all over again.")
    fourthAchievement = true
    funds *= 1.1
  }
  
       if (distance > 384400 && !fourthAchievement) { 
    achievement("Neil Armstrong all over again.")
    fourthAchievement = true
    funds *= 1.1
  }
  
  
       if (speed > 299792458 && !fifthAchievement) { 
    achievement("I can't see you anymore.")
    fifthAchievement = true
    funds *= 1.3
  }
  
  
  distance += speed/10
  money += distance*funds/10
  
  lastUpdate = thisUpdate;
}, 100);
