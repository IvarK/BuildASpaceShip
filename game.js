var player = {

	distance: 0,
	baseSpeed: 0,
	speedMultipliers: 1,
	money: 20,
	funds: 0.1,
	rocketCost: 10,
	shipCost: 10,
	wingCost: 25,
	rockets: 0,
	ships: 0,
	wings: 0,
	rocketUpdateCost: 20,
	shipUpdateCost: 20,
	wingUpdateCost: 40,
	rocketUpdates: 0,
	shipUpdates: 0,
	wingUpdates: 0,
	firstAchievement: false,
	secondAchievement: false,
	thirdAchievement:false,
	fourthAchievement: false,
	fifthAchievement: false,
    onAir: false
};
var defaultplayer = player;
var speed = player.baseSpeed * player.speedMultipliers;
var lastUpdate = new Date().getTime();
var meterLabel = document.getElementById("meters");
var rocketButton = document.getElementById("rockets");
var shipButton = document.getElementById("ship");
var wingButton = document.getElementById("wings");
var speedLabel = document.getElementById("speed");
var moneyLabel = document.getElementById("money");
var rocketUpdateButton = document.getElementById("rocketUpdate");
var shipUpdateButton = document.getElementById("shipUpdate");
var wingUpdateButton = document.getElementById("wingUpdate");
var launchButton = document.getElementById("launch")

function set_cookie(cookie_name,value) {
    expiry = new Date();   
    expiry.setTime(new Date().getTime() + (365*24*60*60*1000)); 
    var c_value=escape(btoa(JSON.stringify(value))) + 
    "; expires="+expiry.toUTCString();
    document.cookie=cookie_name + "=" + c_value;
}

function get_cookie(cookie_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + cookie_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(cookie_name + "=");
    }
    if (c_start == -1) return false;
    c_start = c_value.indexOf("=", c_start) + 1;
    var c_end = c_value.indexOf(";", c_start);
    if (c_end == -1) {
        c_end = c_value.length;
    }
    c_value = atob(unescape(c_value.substring(c_start,c_end)));
    return JSON.parse(c_value);
}

function load_game() {
    var save_data = get_cookie('save');
       if (!save_data) return;
  player = save_data;
  }


function save_game() {
    set_cookie('save', player);
}




Rockets = ['Bottle', 'Canister', 'Gas tank', 'Firework', 'Gasoline', 'Diesel', 'Propane', 'Uranium', 'Antimatter'];
Ships = ['Cardboard box ship', 'Trash can ship', 'Sofa ship', 'Ikea shelf ship', 'Lada ship', 'Ford Escort ship', 'Audi ship', 'Delorean', 'Old Russian spacecraft', 'USS Discovery One', 'Battlestar Galactica BG-75', 'Prometheus', 'Serenity', 'Star Destroyer', 'USS Enterprise',  'Millenium Falcon'];
Wings = ['Paper', 'Cloth', 'Aluminium foil', 'Plastic', 'Wooden', 'Iron', 'Steel', 'Aluminium', 'Carbon fabric', 'Adamantium', 'Black Matter'];
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
  if (player.rockets === 0 && player.money >= player.rocketCost && !player.onAir) {
    player.money -= player.rocketCost;
    player.rocketCost *= 10000;
    player.speedMultipliers *= 2;
    player.rockets++;
    rocketButton.innerHTML = shortenCosts(player.rocketCost) + " € for " + Rockets[player.rockets] + " rocket.";
    player.rocketUpdateAmount = 0;
  }
  if (player.money >= player.rocketCost && player.rocketUpdateAmount == 5 && !player.onAir) {
    player.money -= player.rocketCost;
    player.rocketCost *= 10000;
    player.rockets++;
    rocketButton.innerHTML = shortenCosts(player.rocketCost) + " € for " + Rockets[player.rockets] + " rocket.";
    player.rocketUpdateAmount = 0;
    document.getElementById("rocketUpdateAmount").innerHTML = player.rocketUpdateAmount + "/5";
  }
};


shipButton.onclick = function() {
  if (player.ships === 0 && player.money >= player.shipCost && !player.onAir) {
    player.money -= player.shipCost;
    player.shipCost *= 250;
    player.baseSpeed += 0.1;
    player.ships++;
    shipButton.innerHTML = shortenCosts(player.shipCost) + " € for " + Ships[player.ships] + ".";
    player.shipUpdateAmount = 0;
  }
  if (player.money >= player.shipCost  && player.shipUpdateAmount == 5 && !player.onAir) {
    player.money -= player.shipCost;
    player.shipCost *= 250;
    player.ships++;
    shipButton.innerHTML = shortenCosts(player.shipCost) + " € for " + Ships[player.ships] + ".";
    player.shipUpdateAmount = 0;
    document.getElementById("shipUpdateAmount").innerHTML = player.shipUpdateAmount + "/5";
  }
};


wingButton.onclick = function() {
  if (player.wings === 0 && player.money >= player.wingCost && !player.onAir) {
    player.money -= player.wingCost;
    player.wingCost *= 125;
    player.speedMultipliers *= 1.5;
    player.wings++;
    wingButton.innerHTML = shortenCosts(player.wingCost) + " € for " + Wings[player.wings] + " wings.";
    player.wingUpdateAmount = 0;
  }
  if (player.money >= player.wingCost && player.wingUpdateAmount == 5 && !player.onAir) {
    player.money -= player.wingCost;
    player.wingCost *= 125;
    player.wings++;
    wingButton.innerHTML = shortenCosts(player.wingCost) + " € for " + Wings[player.wings] + " wings.";
    player.wingUpdateAmount = 0;
    document.getElementById("wingUpdateAmount").innerHTML = player.wingUpdateAmount + "/5";
  }
};


wingUpdateButton.onclick = function() {
  if (player.money >= player.wingUpdateCost && player.wingUpdateAmount < 5 && player.wings !== 0) {
    player.money -= player.wingUpdateCost;
    player.wingUpdateCost *= 2.5;
    player.speedMultipliers *= 1.45;
    player.wingUpdateAmount++;
    wingUpdateButton.innerHTML = shortenCosts(player.wingUpdateCost) + " € to update your wings";
    document.getElementById("wingUpdateAmount").innerHTML = player.wingUpdateAmount + "/5";
  }
};


rocketUpdateButton.onclick = function() {
  if (player.money >= player.rocketUpdateCost && player.rocketUpdateAmount < 5 && player.rockets !== 0) {
    player.money -= player.rocketUpdateCost;
    player.rocketUpdateCost *= 6;
    player.speedMultipliers *= 1.95;
    player.rocketUpdateAmount++;
    rocketUpdateButton.innerHTML = shortenCosts(player.rocketUpdateCost) + " € to update your rockets";
    document.getElementById("rocketUpdateAmount").innerHTML = player.rocketUpdateAmount + "/5";
  }
};


shipUpdateButton.onclick = function() {
  if (player.money >= player.shipUpdateCost && player.shipUpdateAmount < 5 && player.ships !== 0) {
    player.money -= player.shipUpdateCost;
    player.shipUpdateCost *= 3;
    player.baseSpeed += 0.1*(player.ships*player.shipUpdateAmount+1);
    player.shipUpdateAmount++;
    shipUpdateButton.innerHTML = shortenCosts(player.shipUpdateCost) + " € to update your ship";
    document.getElementById("shipUpdateAmount").innerHTML = player.shipUpdateAmount + "/5";
  }
};

document.getElementById("hardReset").onclick = function() {
  if(confirm("Are you sure you want to erase all your progress?")) {
  	player = {
      distance: 0,
      baseSpeed: 0,
      speedMultipliers: 1,
      money: 20,
      funds: 0.1,
      rocketCost: 10,
      shipCost: 10,
      wingCost: 25,
      rockets: 0,
      ships: 0,
      wings: 0,
      rocketUpdateCost: 20,
      shipUpdateCost: 20,
      wingUpdateCost: 40,
      rocketUpdates: 0,
      shipUpdates: 0,
      wingUpdates: 0,
      firstAchievement: false,
      secondAchievement: false,
      thirdAchievement:false,
      fourthAchievement: false,
      fifthAchievement: false,
      onAir: false
    };
  	shipUpdateButton.innerHTML = shortenCosts(player.shipUpdateCost) + " € to update your ship";
    document.getElementById("shipUpdateAmount").innerHTML = "0/5";
    rocketUpdateButton.innerHTML = shortenCosts(player.rocketUpdateCost) + " € to update your rockets";
    document.getElementById("rocketUpdateAmount").innerHTML = "0/5";
    wingUpdateButton.innerHTML = shortenCosts(player.wingUpdateCost) + " € to update your wings";
    document.getElementById("wingUpdateAmount").innerHTML = "0/5";
    rocketButton.innerHTML = shortenCosts(player.rocketCost) + " € for " + Rockets[player.rockets] + " rocket.";
    wingButton.innerHTML = shortenCosts(player.wingCost) + " € for " + Wings[player.wings] + " wings.";
    shipButton.innerHTML = shortenCosts(player.shipCost) + " € for " + Ships[player.ships] + ".";
  }
};


launchButton.onclick = function() {
  if (player.onAir) {
    player.onAir = false
    player.distance = 0
  }
  else {
    player.onAir = true
  }
}



  



function achievement(name)
{
  document.getElementById("achievementBox").innerHTML = name;
  $( "div:hidden:first" ).fadeIn( 4000 ).fadeOut(1500);
  

}


load_game();

setInterval(function() {
  var thisUpdate = new Date().getTime();
  var diff = thisUpdate - lastUpdate;
  diff = diff/100;
  meterLabel.innerHTML = "You have travelled " + shorten(player.distance) + " meters.";
  speedLabel.innerHTML = shorten(speed) + "m/s";
  moneyLabel.innerHTML = shorten(player.money) + " €";
  speed = player.baseSpeed * player.speedMultipliers;
  
  if (player.money >= player.rocketCost) rocketButton.className = 'button';
  else rocketButton.className = 'nbutton';
  
   if (player.money >= player.shipCost) shipButton.className = 'button';
  else shipButton.className = 'nbutton';
  
   if (player.wings === 0 || player.wingUpdateAmount == 5) {
     if (player.money >= player.wingCost && !player.onAir) wingButton.className = 'button';
     else wingButton.className = 'nbutton';
   } else wingButton.className = 'nbutton';
   
   
   if (player.rockets === 0 || player.rocketUpdateAmount == 5) {
     if (player.money >= player.rocketCost && !player.onAir) rocketButton.className = 'button';
     else rocketButton.className = 'nbutton';
   } else rocketButton.className = 'nbutton';
   
   
   if (player.ships === 0 || player.shipUpdateAmount == 5) {
     if (player.money >= player.shipCost && !player.onAir) shipButton.className = 'button';
     else shipButton.className = 'nbutton';
   } else shipButton.className = 'nbutton';
  
  
  if (player.money >= player.wingUpdateCost && player.wingUpdateAmount < 5 && player.wings !== 0) wingUpdateButton.className = 'button';
  else wingUpdateButton.className = 'nbutton';
  
  if (player.money >= player.rocketUpdateCost && player.rocketUpdateAmount < 5 && player.rockets !== 0) rocketUpdateButton.className = 'button';
  else rocketUpdateButton.className = 'nbutton';
  
    if (player.money >= player.shipUpdateCost && player.shipUpdateAmount < 5 && player.ships !== 0) shipUpdateButton.className = 'button';
  else shipUpdateButton.className = 'nbutton';
  
  document.getElementById("funds").innerHTML = "You get " + Math.round(player.funds*100)/100 + " € per second for each meter travelled.";
  
  if (player.distance > 10 && !player.firstAchievement) { 
    achievement("I can still see you");
    player.firstAchievement = true;
    player.funds *= 1.1;
  }
  
   if (speed > 340.29 && !player.secondAchievement) { 
    achievement("I can still hear you");
    player.secondAchievement = true;
    player.funds *= 1.1;
  }
  
     if (player.distance > 50000 && !player.thirdAchievement) { 
    achievement("You have reached the edge of the stratosphere.");
    player.thirdAchievement = true;
    player.funds *= 1.1;
  }
  
     if (player.distance > 384400 && !player.fourthAchievement) { 
    achievement("Neil Armstrong all over again.");
    player.fourthAchievement = true;
    player.funds *= 1.1;
  }
  
  
       if (speed > 299792458 && !player.fifthAchievement) { 
    achievement("I can't see you anymore.");
    player.fifthAchievement = true;
    player.funds *= 1.3;
  }
  
  if (player.onAir) {
    player.distance += speed*diff/10;
    player.money += player.distance*player.funds*diff/10;
  }
  
  
  if (player.onAir) launchButton.innerHTML = "Return to Earth."
  else launchButton.innerHTML = "LAUNCH"
  
  
  
  
  lastUpdate = thisUpdate;
}, 100);


setInterval(function () { save_game(); }, 10000);
