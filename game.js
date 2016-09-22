var player = {

	distance: 0,
  bestDistance: 0,
	baseSpeed: 0,
	speedMultipliers: 1,
	money: 20,
	funds: 0.1,
  capitalismAmount: 1,
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
  totalMoney: 0,
  totalDistance: 0,
  prestigeAmount: 0,
  nextPlanet: 500000000,
	firstAchievement: false,
	secondAchievement: false,
	thirdAchievement:false,
	fourthAchievement: false,
	fifthAchievement: false,
  sixthAchievement: false,
  seventhAchievement: false,
  eightAchievement: false,
  slaveryCost: 10,
  capitalismCost: 50,
  onAir: false,
  msgShown: false
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
var slaveryButton = document.getElementById("speedMultiplier")
var capitalismButton = document.getElementById("baseMultiplier")

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




Rockets = ['Bottle', 'Canister', 'Gas tank', 'Firework', 'Gasoline', 'Diesel', 'Propane', 'Uranium', 'Alien', 'Hyperdrive', 'Antimatter'];
Ships = ['Cardboard box ship', 'Trash can ship', 'Sofa ship', 'Ikea shelf ship', 'Lada ship', 'Ford Escort ship', 'Audi ship', 'Delorean', 'Old Russian spacecraft', 'USS Discovery One', 'Battlestar Galactica BG-75', 'Prometheus', 'Serenity', 'Star Destroyer', 'USS Enterprise',  'Millenium Falcon'];
Wings = ['Paper', 'Cloth', 'Aluminium foil', 'Plastic', 'Wooden', 'Iron', 'Steel', 'Aluminium', 'Titanium', 'Carbon fabric', 'Adamantium', 'Black Matter'];
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
    player.rocketUpdates = 0;
  }
  if (player.money >= player.rocketCost && player.rocketUpdates == 5 && !player.onAir) {
    player.money -= player.rocketCost;
    player.rocketCost *= 10000;
    player.rockets++;
    rocketButton.innerHTML = shortenCosts(player.rocketCost) + " € for " + Rockets[player.rockets] + " rocket.";
    player.rocketUpdates = 0;
    document.getElementById("rocketUpdateAmount").innerHTML = player.rocketUpdates + "/5";
  }
  updateStatistics()
};


shipButton.onclick = function() {
  if (player.ships === 0 && player.money >= player.shipCost && !player.onAir) {
    player.money -= player.shipCost;
    player.shipCost *= 250;
    player.baseSpeed += 0.1;
    player.ships++;
    shipButton.innerHTML = shortenCosts(player.shipCost) + " € for " + Ships[player.ships] + ".";
    player.shipUpdates = 0;
  }
  if (player.money >= player.shipCost  && player.shipUpdates == 5 && !player.onAir) {
    player.money -= player.shipCost;
    player.shipCost *= 250;
    player.ships++;
    shipButton.innerHTML = shortenCosts(player.shipCost) + " € for " + Ships[player.ships] + ".";
    player.shipUpdates = 0;
    document.getElementById("shipUpdateAmount").innerHTML = player.shipUpdates + "/5";
  }
  updateStatistics()
};


wingButton.onclick = function() {
  if (player.wings === 0 && player.money >= player.wingCost && !player.onAir) {
    player.money -= player.wingCost;
    player.wingCost *= 125;
    player.speedMultipliers *= 1.5;
    player.wings++;
    wingButton.innerHTML = shortenCosts(player.wingCost) + " € for " + Wings[player.wings] + " wings.";
    player.wingUpdates = 0;
  }
  if (player.money >= player.wingCost && player.wingUpdates == 5 && !player.onAir) {
    player.money -= player.wingCost;
    player.wingCost *= 125;
    player.wings++;
    wingButton.innerHTML = shortenCosts(player.wingCost) + " € for " + Wings[player.wings] + " wings.";
    player.wingUpdates = 0;
    document.getElementById("wingUpdateAmount").innerHTML = player.wingUpdates + "/5";
  }
  updateStatistics()
};


wingUpdateButton.onclick = function() {
  if (player.money >= player.wingUpdateCost && player.wingUpdates < 5 && player.wings !== 0) {
    player.money -= player.wingUpdateCost;
    player.wingUpdateCost *= 2.5;
    player.speedMultipliers *= 1.2;
    player.wingUpdates++;
    wingUpdateButton.innerHTML = shortenCosts(player.wingUpdateCost) + " € to update your wings";
    document.getElementById("wingUpdateAmount").innerHTML = player.wingUpdates + "/5";
  updateStatistics()
    speed = player.baseSpeed * player.speedMultipliers;
      speedLabel.innerHTML = speedIndicators(speed);
  }
};


rocketUpdateButton.onclick = function() {
  if (player.money >= player.rocketUpdateCost && player.rocketUpdates < 5 && player.rockets !== 0) {
    player.money -= player.rocketUpdateCost;
    player.rocketUpdateCost *= 6;
    player.speedMultipliers *= 1.5;
    player.rocketUpdates++;
    rocketUpdateButton.innerHTML = shortenCosts(player.rocketUpdateCost) + " € to update your rockets";
    document.getElementById("rocketUpdateAmount").innerHTML = player.rocketUpdates + "/5";
      speed = player.baseSpeed * player.speedMultipliers;
      speedLabel.innerHTML = speedIndicators(speed);
  }
};


shipUpdateButton.onclick = function() {
  if (player.money >= player.shipUpdateCost && player.shipUpdates < 5 && player.ships !== 0) {
    player.money -= player.shipUpdateCost;
    player.shipUpdateCost *= 3;
    player.baseSpeed += 0.1*(player.ships*player.shipUpdates+1);
    player.shipUpdates++;
    shipUpdateButton.innerHTML = shortenCosts(player.shipUpdateCost) + " € to update your ship";
    document.getElementById("shipUpdateAmount").innerHTML = player.shipUpdates + "/5";
    shipUpdateButton.setAttribute('data-tooltip', "Adds " + Math.round(0.1*(player.ships*player.shipUpdates+1)*10)/10 + " to your base speed. Currently at " + Math.round(player.baseSpeed*10)/10)
      speed = player.baseSpeed * player.speedMultipliers;
      speedLabel.innerHTML = speedIndicators(speed);
  }
};

document.getElementById("hardReset").onclick = function() {
  if(confirm("Are you sure you want to erase all your progress?")) {
  	player = {
      distance: 0,
      bestDistance: 0,
      baseSpeed: 0,
      speedMultipliers: 1,
      capitalismAmount: 1,
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
      totalMoney: 0,
      totalDistance: 0,
      prestigeAmount: 0,
      nextPlanet: 500000000,
      firstAchievement: false,
      secondAchievement: false,
      thirdAchievement:false,
      fourthAchievement: false,
      fifthAchievement: false,
      sixthAchievement: false,
      seventhAchievement: false,
      eightAchievement: false,
      slaveryCost: 10,
      capitalismCost: 50,
      onAir: false,
      msgShown: true
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
    updateAchievements();
    updateStatistics();
    document.getElementById("prestigeUpgrades").style.display = 'none'
      speed = player.baseSpeed * player.speedMultipliers;
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
  if (player.onAir) launchButton.innerHTML = "Return to Earth."
  else {
  	launchButton.innerHTML = "LAUNCH"
  	player.distance = 0
  }
  speed = player.baseSpeed * player.speedMultipliers;
  speedLabel.innerHTML = speedIndicators(speed);
}



slaveryButton.onclick = function() {
  if (player.prestigeAmount >= player.slaveryCost) {
    player.speedMultipliers *= 3
    player.prestigeAmount -= player.slaveryCost
    player.slaveryCost *= 10000
    document.getElementById("slaveryCost").innerHTML = 'Cost: ' + shortenCosts(player.slaveryCost) + ' refugees.'
       speed = player.baseSpeed * player.speedMultipliers;
      speedLabel.innerHTML = speedIndicators(speed);
  }
}



capitalismButton.onclick = function() {
  if (player.prestigeAmount >= player.capitalismCost) {
    player.capitalismAmount *= 3
    player.prestigeAmount -= player.capitalismCost
    player.capitalismCost *= 20000
    document.getElementById("capitalismCost").innerHTML = 'Cost: ' + shortenCosts(player.capitalismCost) + ' refugees.'
      speed = player.baseSpeed * player.speedMultipliers;
      speedLabel.innerHTML = speedIndicators(speed);
  }
}



function getPrestige() {
  return Math.round(Math.sqrt(player.totalMoney/1e11)*100)
}

document.getElementById("resetButton").onclick = function() {
  if (confirm("Do you want to make a colony to the exoplanet you found? You will get " + shortenCosts(getPrestige()) + " refugees that boost your funding by 2% each")) {
  player = {
      distance: 0,
      baseSpeed: 0,
      bestDistance: 0,
      speedMultipliers: 1,
      capitalismAmount: 1,
      money: 20,
      funds: player.funds,
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
      nextPlanet: player.nextPlanet * 3,
      prestigeAmount: getPrestige(),
      totalMoney: player.totalMoney,
      totalDistance: player.totalDistance,
      firstAchievement: player.firstAchievement,
      secondAchievement: player.secondAchievement,
      thirdAchievement:player.thirdAchievement,
      fourthAchievement: player.fourthAchievement,
      fifthAchievement: player.fifthAchievement,
      sixthAchievement: player.sixthAchievement,
      seventhAchievement: player.seventhAchievement,
      eightAchievement: player.eightAchievement,
      slaveryCost: 10,
      capitalismCost: 50,
      onAir: false,
      msgShown: true
    };
  updateStatistics();
  shipUpdateButton.innerHTML = shortenCosts(player.shipUpdateCost) + " € to update your ship";
    document.getElementById("shipUpdateAmount").innerHTML = "0/5";
    rocketUpdateButton.innerHTML = shortenCosts(player.rocketUpdateCost) + " € to update your rockets";
    document.getElementById("rocketUpdateAmount").innerHTML = "0/5";
    wingUpdateButton.innerHTML = shortenCosts(player.wingUpdateCost) + " € to update your wings";
    document.getElementById("wingUpdateAmount").innerHTML = "0/5";
    rocketButton.innerHTML = shortenCosts(player.rocketCost) + " € for " + Rockets[player.rockets] + " rocket.";
    wingButton.innerHTML = shortenCosts(player.wingCost) + " € for " + Wings[player.wings] + " wings.";
    shipButton.innerHTML = shortenCosts(player.shipCost) + " € for " + Ships[player.ships] + ".";
    document.getElementById("prestigeUpgrades").style.display = 'block'
    document.getElementById("slaveryCost").innerHTML = 'Cost: ' + shortenCosts(player.slaveryCost) + ' refugees.'
document.getElementById("capitalismCost").innerHTML = 'Cost: ' + shortenCosts(player.capitalismCost) + ' refugees.'
  speed = player.baseSpeed * player.speedMultipliers;
      speedLabel.innerHTML = speedIndicators(speed);
  }
  
}


function updateAchievements() {
  if (player.firstAchievement) document.getElementById("firstAchievement").style.display = 'block'
  if (player.secondAchievement) document.getElementById("secondAchievement").style.display = 'block'
  if (player.thirdAchievement) document.getElementById("thirdAchievement").style.display = 'block'
  if (player.fourthAchievement) document.getElementById("fourthAchievement").style.display = 'block'
  if (player.fifthAchievement) document.getElementById("fifthAchievement").style.display = 'block'
  if (player.sixthAchievement) document.getElementById("sixthAchievement").style.display = 'block'
  if (player.seventhAchievement) document.getElementById("seventhAchievement").style.display = 'block'
  if (player.eightAchievement) document.getElementById("eightAchievement").style.display = 'block'
}

function showTab(tabName) {
    console.log('show tab ' + tabName);
    
    //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    var tabs = document.getElementsByClassName('tab');
    var tab;
    for (var i = 0; i < tabs.length; i++) {
        tab = tabs.item(i);
        if (tab.id === tabName) {
            tab.style.display = 'inline-block';
        } else {
            tab.style.display = 'none';
        }
    }
  updateAchievements();
  updateStatistics();
}

function init() {
    console.log('init');
    
    //setup the onclick callbacks for the buttons
    document.getElementById('yourship').onclick=function () {
      showTab('game');
      document.getElementById("shipContainer").style.display = 'inline-block'
      if(player.prestigeAmount !== 0) document.getElementById("prestigeUpgrades").style.display = 'block'
    };
    document.getElementById('statbutton').onclick=function () {
      showTab('statistics');
      document.getElementById("prestigeUpgrades").style.display = 'none'
      document.getElementById("shipContainer").style.display = 'none'
    };
    document.getElementById('achievementbutton').onclick=function () {
      showTab('achievements');
      document.getElementById("prestigeUpgrades").style.display = 'none'
      document.getElementById("shipContainer").style.display = 'none'
    };
    
    //show one tab during init or they'll all start hidden
    showTab('game');
}



function speedIndicators(howfast) {
  if (howfast > 9.4605284e18) return shorten(howfast/9.4605284e18) + " light-milleniums/s"
  else if (howfast > 9.4605284e15) return shorten(howfast/9.4605284e15) + " light-years/s"
  else if (howfast > 149597871000) return shorten(howfast/149597871000) + " AU/s"
  else if (howfast > 299792458) return shorten(howfast/299792458) + "c"
  else return shorten(howfast) + " m/s"
}

var shipPosition = 0
function moveShip() {
  if (player.distance < player.nextPlanet) {
    shipPosition = Math.round((86 - 83 * player.distance/player.nextPlanet)*100)/100
    document.getElementById("shipDisplay").style.top = shipPosition + '%';
  }
}

function distanceIndicators(howfar) {
  if (howfar > 9.4605284e18) return shorten(howfar/9.4605284e18) + " light-milleniums."
  else if (howfar > 9.4605284e15) return shorten(howfar/9.4605284e15) + " light-years."
  else if (howfar > 149597871000) return shorten(howfar/149597871000) + " AUs."
  else return shorten(howfar) + " meters."
}
  
function updateStatistics() {
  document.getElementById("baseSpeed").innerHTML = "Your base speed is " + Math.round(player.baseSpeed*10)/10
  document.getElementById("statRockets").innerHTML = "You have bought " + player.rockets + " rockets."
  document.getElementById("statWings").innerHTML = "You have bought " + player.wings + " pair of wings."
  document.getElementById("statShips").innerHTML = "You have bought " + player.ships + " ships."
  if (player.prestigeAmount !== 0) document.getElementById("prestige").innerHTML = "You have " + shortenCosts(player.prestigeAmount) + " refugees on your exoplanet."
  else document.getElementById("prestige").innerHTML = "You need to travel further..."
  document.getElementById("fundStats").innerHTML = "You get " + Math.round(player.funds*player.capitalismAmount*(1+player.prestigeAmount*0.02)*100)/100 + " € per second for each meter travelled. This is increased by achivements"
  document.getElementById("bestDistance").innerHTML = 'Furthest travelled: ' + shorten(player.bestDistance)
  var achievements = 0
  if (player.firstAchievement) achievements++;
  if (player.secondAchievement) achievements++;
  if (player.thirdAchievement) achievements++;
  if (player.fourthAchievement) achievements++;
  if (player.fifthAchievement) achievements++;
  if (player.sixthAchievement) achievements++;
  if (player.seventhAchievement) achievements++;
  if (player.eightAchievement) achievements++;
  document.getElementById("achievementAmount").innerHTML = achievements + '/8 achievements unlocked.'
 }


function achievement(name)
{
  document.getElementById("achievementBox").innerHTML = name;
  $( '#achievementBox' ).fadeIn( 4000 ).fadeOut(1500);
  player.funds *= 1.1
  updateAchievements();
  document.getElementById("fundStats").innerHTML = "You get " + Math.round(player.funds*player.capitalismAmount*(1+player.prestigeAmount*0.02)*100)/100 + " € per second for each meter travelled. This is increased by achivements"
    speedLabel.innerHTML = speedIndicators(speed);
}


setInterval(function() {
  moveShip()
  var thisUpdate = new Date().getTime();
  var diff = thisUpdate - lastUpdate;
  diff = diff/100;
  meterLabel.innerHTML = "You have travelled " + distanceIndicators(player.distance);
  moneyLabel.innerHTML = shorten(player.money) + " €";
  document.getElementById("funds").innerHTML = shorten(player.distance*player.funds*player.capitalismAmount*(1+player.prestigeAmount*0.02)) + " €/s";

  
  if (player.money >= player.rocketCost) rocketButton.className = 'button';
  else rocketButton.className = 'nbutton';
  
   if (player.money >= player.shipCost) shipButton.className = 'button';
  else shipButton.className = 'nbutton';
  
   if (player.wings === 0 || player.wingUpdates == 5) {
     if (player.money >= player.wingCost && !player.onAir) wingButton.className = 'button';
     else wingButton.className = 'nbutton';
   } else wingButton.className = 'nbutton';
   
   
   if (player.rockets === 0 || player.rocketUpdates == 5) {
     if (player.money >= player.rocketCost && !player.onAir) rocketButton.className = 'button';
     else rocketButton.className = 'nbutton';
   } else rocketButton.className = 'nbutton';
   
   
   if (player.ships === 0 || player.shipUpdates == 5) {
     if (player.money >= player.shipCost && !player.onAir) shipButton.className = 'button';
     else shipButton.className = 'nbutton';
   } else shipButton.className = 'nbutton';
  
  
  if (player.money >= player.wingUpdateCost && player.wingUpdates < 5 && player.wings !== 0) wingUpdateButton.className = 'button';
  else wingUpdateButton.className = 'nbutton';
  
  if (player.money >= player.rocketUpdateCost && player.rocketUpdates < 5 && player.rockets !== 0) rocketUpdateButton.className = 'button';
  else rocketUpdateButton.className = 'nbutton';
  
    if (player.money >= player.shipUpdateCost && player.shipUpdates < 5 && player.ships !== 0) shipUpdateButton.className = 'button';
  else shipUpdateButton.className = 'nbutton';
  
  if (player.prestigeAmount >= player.slaveryCost) slaveryButton.className = 'button'
  else slaveryButton.className = 'nbutton'
  
  if (player.prestigeAmount >= player.capitalismCost) capitalismButton.className = 'button'
  else capitalismButton.className = 'nbutton'
  
 

  if (player.onAir) {
    player.distance += speed*diff/10;
    player.money += player.distance*player.funds*player.capitalismAmount*(1+player.prestigeAmount*0.02)*diff/10;
    player.totalDistance += speed*diff/10;
    player.totalMoney += player.distance*player.funds*player.capitalismAmount*(1+player.prestigeAmount*0.02)*diff/10;
  }
  
  if (player.distance >= player.nextPlanet) document.getElementById("resetButton").style.visibility = 'visible'
  else document.getElementById("resetButton").style.visibility = 'hidden'
  
  document.getElementById("totalMoney").innerHTML = "You have made a total of " + shorten(player.totalMoney) + " €"
  document.getElementById("totalDistance").innerHTML = "You have travelled a total of " + distanceIndicators(player.totalDistance)
  document.getElementById("nextPlanet").innerHTML = "Distance to the next exoplanet: " + Math.min(shortenCosts(player.nextPlanet - player.distance), 0)

  
  lastUpdate = thisUpdate;
}, 100);

setInterval(function () { save_game(); }, 10000);

setInterval(function () {
  
   if (player.distance > player.bestDistance) {
    player.bestDistance = player.distance
    document.getElementById("bestDistance").innerHTML = 'Furthest travelled: ' + shorten(player.bestDistance)
  }
  
  
if (player.distance > 10 && !player.firstAchievement) { 
    achievement("I can still see you");
    player.firstAchievement = true;
  }
  
   if (speed > 340.29 && !player.secondAchievement) { 
    achievement("I can still hear you");
    player.secondAchievement = true;
  }
  
     if (player.distance > 50000 && !player.thirdAchievement) { 
    achievement("You have reached the edge of the stratosphere.");
    player.thirdAchievement = true;
  }
  
     if (player.distance > 384400000 && !player.fourthAchievement) { 
    achievement("Neil Armstrong all over again.");
    player.fourthAchievement = true;
  }
  
  
       if (speed > 299792458 && !player.fifthAchievement) { 
    achievement("You're going faster than light. You hacker.");
    player.fifthAchievement = true;
  }
  
     if (player.distance > 149597871000 && !player.sixthAchievement) { 
    achievement("Don't go too close to the sun.");
    player.sixthAchievement = true;
  }
  
     if (player.distance > 9.4605284e15 && !player.seventhAchievement) { 
    achievement("Wow! You have travelled a light-year!");
    player.seventhAchievement = true;
  }
  
     if (player.distance > 9.4605284e18 && !player.eightAchievement) { 
    achievement("Millenium? That's like a thousand years!");
    player.eightAchievement = true;
  }



}, 1000);




load_game();



if (player.bestDistance == undefined) {
player = {
      distance: player.distance,
      baseSpeed: player.baseSpeed,
      bestDistance: 0,
      speedMultipliers: player.speedMultipliers,
      capitalismAmount: player.capitalismAmount,
      money: player.money,
      funds: player.funds,
      rocketCost: player.rocketCost,
      shipCost: player.shipCost,
      wingCost: player.wingCost,
      rockets: player.rockets,
      ships: player.ships,
      wings: player.wings,
      rocketUpdateCost: player.rocketUpdateCost,
      shipUpdateCost: player.shipUpdateCost,
      wingUpdateCost: player.wingUpdateCost,
      rocketUpdates: player.rocketUpdates,
      shipUpdates: player.shipUpdates,
      wingUpdates: player.wingUpdates,
      nextPlanet: player.nextPlanet,
      prestigeAmount: player.prestigeAmount,
      totalMoney: player.totalMoney,
      totalDistance: player.totalDistance,
      firstAchievement: player.firstAchievement,
      secondAchievement: player.secondAchievement,
      thirdAchievement:player.thirdAchievement,
      fourthAchievement: player.fourthAchievement,
      fifthAchievement: player.fifthAchievement,
      sixthAchievement: player.sixthAchievement,
      seventhAchievement: player.seventhAchievement,
      eightAchievement: player.eightAchievement,
      slaveryCost: player.slaveryCost,
      capitalismCost: player.capitalismCost,
      onAir: player.onAir,
      msgShown: player.msgShown
    };
  
}


if (player.onAir) launchButton.innerHTML = "Return to Earth."
  else {
  	launchButton.innerHTML = "LAUNCH"
  	player.distance = 0
  }

var modal = document.getElementById('popup');

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
speed = player.baseSpeed * player.speedMultipliers;
  speedLabel.innerHTML = speedIndicators(speed);
  speedLabel.innerHTML = speedIndicators(speed);
  speed = player.baseSpeed * player.speedMultipliers;
  shipUpdateButton.setAttribute('data-tooltip', "Adds " + Math.round(0.1*(player.ships*player.shipUpdates+1)*10)/10 + " to your base speed. Currently at " + Math.round(player.baseSpeed*10)/10)
document.getElementById("fundStats").innerHTML = "You get " + Math.round(player.funds*player.capitalismAmount*(1+player.prestigeAmount*0.02)*100)/100 + " € per second for each meter travelled. This is increased by achivements"
shipUpdateButton.innerHTML = shortenCosts(player.shipUpdateCost) + " € to update your ship";
document.getElementById("shipUpdateAmount").innerHTML = player.shipUpdates + "/5";
rocketUpdateButton.innerHTML = shortenCosts(player.rocketUpdateCost) + " € to update your rockets";
document.getElementById("rocketUpdateAmount").innerHTML = player.rocketUpdates + "/5";
wingUpdateButton.innerHTML = shortenCosts(player.wingUpdateCost) + " € to update your wings";
document.getElementById("wingUpdateAmount").innerHTML = player.wingUpdates + "/5";
rocketButton.innerHTML = shortenCosts(player.rocketCost) + " € for " + Rockets[player.rockets] + " rocket.";
wingButton.innerHTML = shortenCosts(player.wingCost) + " € for " + Wings[player.wings] + " wings.";
shipButton.innerHTML = shortenCosts(player.shipCost) + " € for " + Ships[player.ships] + ".";
document.getElementById("slaveryCost").innerHTML = 'Cost: ' + shortenCosts(player.slaveryCost) + ' refugees.'
document.getElementById("capitalismCost").innerHTML = 'Cost: ' + shortenCosts(player.capitalismCost) + ' refugees.'
if (player.prestigeAmount !== 0) document.getElementById("prestigeUpgrades").style.display = 'block'
else document.getElementById("prestigeUpgrades").style.display = 'none'
if(player.msgShown === false || player.msgShown === undefined) {
    modal.style.display = "block";
    player.msgShown = true;
}




init();
updateStatistics();
updateAchievements();
