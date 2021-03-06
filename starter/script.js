/** <<<<<<<<<<<<<<<< PLAYER STATS AND MONSTER LIST >>>>>>>>>>>>>>>>> */

//Player stats. values are intial
var stats = {
	health:80,
	armour:1,
	damage:10,
	bag:{
		bread:35,
		pizza:20,
		waterBottle:20,
		fullRestore:100
	}
}

//List of monsters and their stats
var monsterList = {
	chicken:{
		health:50,
		armour:0,
		damage:5,
		description: "Delicious KFC",
	},
	goblin:{
		health:150,
		armour:2,
		damage:10,
		description: "Some ugly creature!"
	},
	dragon:{
		health:300,
		armour:5,
		damage:20,
		description: "RARE ENCOUNTER! FIRE-BREATHING DRAGON!"
	},
	queenDragon:{
		health:30000,
		armour:20,
		damage:200,
		description: "BIG AND SCARY!"
	}
}

/** <<<<<<<<<<<<<<<< INITIALIZING GAME >>>>>>>>>>>>>>>>> */

var gameStart = prompt("Game Title: Unexpected Journey into the Elven Lands \n Objective: Find your way back home! \n Game start [Y/N] \n Game Help[H] \n What to expect?[W]");
if(checkGameStart(gameStart)==true){
	console.log("<<<<< Game Running >>>>");
	gamePlay(statsDisplay,monstDisplay);
}

/** <<<<<<<<<<<<<<<< GAMEPLAY FUNCTIONS >>>>>>>>>>>>>>>>> */

//check gameStart direct accordingly on what was keyed in
function checkGameStart(gameStart){
  if(gameStart=="Y"){
  	alert("Tutorial: \n The game is caps-sensitive. For optimal gameplay, please input correctly \n For food, please input its name i.e. bread \n Thanks. Hope you enjoy the game!");
    return true;
  }
  else if (gameStart == "N"){
    alert("We shall play next time then!");
    return false;
  }
  else{
  	alert("Function still in development! Please refresh and key in Y to start game");
  	return false;
  }
}

function gamePlay(statsDisplay,monstDisplay){
	//choice will store the decision made in each step
	var choice="";

	var player = prompt("Enter your name!");
	var playHp = stats["health"];
	var playArmour = stats["armour"];
	var playDamage = stats["damage"];
	alert("Hi " + player + "!");
	// set timer?
	alert("You woke up feeling dazed after a long night of partying. You found yourself resting in a secluded haystack inside possibly a small shack. You feel thirsty and reached out to your bag.");
	//open stats
	alert(statsDisplay(playHp,playArmour,playDamage));

	//Part1: the bottle
	choice = prompt("You found yourself a bottle. It's full? Drink or save it for later? [Y/N]");
	if(choice=="Y"){
		playHp = eatFood(choice,"waterBottle",playHp);
		alert("You feel refreshed and healthy. Your health status is currently " + playHp + ". \n You throw the empty bottle away");
		//check current bag status
		alert("These are your current inventories: " + checkBag());
	}
	else if(choice=="N"){
		playHp = eatFood(choice,"waterBottle",playHp);
		alert("You decide against drinking. It is best to save it for later. You felt dehydrated, your health is " + playHp + ".");
		//check current bag status
		alert("These are your current inventories: " + checkBag());
	}

	//Part2: the map
	choice = prompt("You brushed off the dust on your body and feel ready to go. Upon opening the shack, you found yourself in a valley. There is a map on the shack. Do you want to read it?[Y/N]");
	if(choice=="Y"){
		alert("Head east to SeaPort [->] \n Head west to Haunted Woods [<-]");
		alert("You found a wooden sword and armour near the map! This will come in handy. \n ");
		playDamage = 13;
		playArmour = 3;
		alert(statsDisplay(playHp,playArmour,playDamage));
	}
	choice = prompt("There are two ways out of valley! Head to east or west exit [</>]");

	//Part3: Monster fight
	//find which random monster is faced and stored in a variable monster
	var monster = monsterFreq();
	var monstHp = monsterList[monster]["health"];
	var monstArmour = monsterList[monster]["armour"];
	var monstDamage = monsterList[monster]["damage"];
	alert("As you are walking, you got attacked by a " + monster + " !");
	alert(monstDisplay(monster,monstHp,monstArmour,monstDamage));
	playHp = fight(player,playHp,playArmour,playDamage,monster,monstHp,monstArmour,monstDamage);	
	if(playHp>0){
		alert("Good fight! But this is just the first of many challenges ahead...");
		choice = prompt("Content still in development. \n For now, do you want to fight again in an endless battle? [Y/N]");
		if(choice=="Y"){
			alert("Your health is boosted and you are given an excalibur that grows stronger with every battle! You can now receive occasional food drops from monster! Good luck =)");
			playHp = 400;
			//store battles won
			var score = 0;
			//excalibur mechanic that increment after every battle
			var excaliburDamage = 1;
			while(true){
				if(playHp>0){
					playDamage += excaliburDamage;
					monster = monsterFreq();
					monstHp = monsterList[monster]["health"];
					monstArmour = monsterList[monster]["armour"];
					monstDamage = monsterList[monster]["damage"];
					alert("Round " + (score+1) + "! You faced " + monster + "!");
					alert(monstDisplay(monster,monstHp,monstArmour,monstDamage));
					playHp = fight(player,playHp,playArmour,playDamage,monster,monstHp,monstArmour,monstDamage);
					foodDrops();
					//increment excalibur damage
					excaliburDamage++;
					alert("Excalibur has leveled up. It is now level " + excaliburDamage);
					//update score
					score++;
				}
				else{
					alert("You completed " + (score) + " rounds. Well done!");
					alert("Hope you enjoy playing!");
					break;
				}
			}
		}
		else{
			alert("Content still in development. Thanks for playing =)");
		}
	}
	else{
		alert("Hope you enjoy playing!");
	}
}

/** <<<<<<<<<<<<<<<< FIGHT FUNCTIONS >>>>>>>>>>>>>>>>> */

//roll dice to see which monster appear
function monsterFreq(){
	var monster = "";

	//dice to calculate probability
	var dice = Math.random();
	console.log("monster probability: " + dice);
	//if certain proability, certain mobs will appear,
	if (dice>0.7){
		monster = "chicken";
	}
	else if (dice<=0.7&dice>0.3){
		monster = "goblin";
	}
	else if (dice<=0.3&dice>0.05){
		monster = "dragon";
	}
	else if (dice<=0.05){
		monster = "queenDragon";
	}
	return monster;
}

//to see which player or monster start first
function fightFirst(player,monster){
	var dice = Math.random();
	if (dice<=0.5){
		return player;
	}
	else{
		return monster;
	}
}

//main code for fight
function fight(player,playHp,playArmour,playDamage,monster,monstHp,monstArmour,monstDamage){
	//note hp is abbreviation for health

	var turn = "";
	turn = fightFirst(player,monster);
	alert(turn + " will begin first!");

	//loop until the fight end. i.e. hp of one of them drop to 0
	while(true){
		if(turn==player){
			alert("It's " + player + " turn!");
			var input = menu(playHp,playArmour,playDamage,monster,monstHp,monstArmour,monstDamage);
			if(input=="A"){
				monstHp = attack(monster,player,playHp,playArmour,playDamage,monster,monstHp,monstArmour,monstDamage);
				//set monster hp to zero if number become negative
				if(monstHp<0){
					monstHp=0;
				}
				alert(monster + " currently has " + monstHp + " health.");
			}
			else if(input=="F"){
				var choice = "Y";
				var whatFood = prompt("What food do you want to eat? \n this is what you have in your bag: \n" + checkBag() + "\n key in the food that you want");
				//hp changes with food
				playHp = eatFood(choice,whatFood,playHp);
				alert("You ate/drank " + whatFood + "\n your health is now " + playHp + " .");
			}
			else if(input=="R"){
				var escape = Math.random();
				console.log("Escape probability: " + escape);
				if(escape<=0.7){
					alert("You escaped from battle sucessfully!");
					break;
				}
				else{
					alert("You tried but failed to escape from " + monster + "!");
				}
			}
			turn=monster;
		}
		else if(turn==monster){
			alert("It's " + monster + " turn");
			playHp = attack(player,player,playHp,playArmour,playDamage,monster,monstHp,monstArmour,monstDamage);
			//set playHp to zero if number become negative
			if(playHp<0){
				playHp=0;
			}
			alert(player + " currently has " + playHp + " health.");
			turn=player;
		}

		//check for who dies
		if(playHp==0){
			alert("GAME OVER! YOU DIED!");
			break;
		}
		if(monstHp==0){
			alert("You defeated " + monster + " !");
			break;
		}
	}
	return playHp;
}

//menu that display player and monster hp, as well as options to run,fight or eat food
function menu(playHp,playArmour,playDamage,monster,monstHp,monstArmour,monstDamage){
	//1. Attack 2. Food 3. Run
	var tempPly = statsDisplay(playHp,playArmour,playDamage);
	var tempMons = monstDisplay(monster,monstHp,monstArmour,monstDamage);
	var output = prompt(tempPly +"\n\n"+ tempMons + "\n" + "Attack(A) \n Food(F) \n Run(R)");
	return output;	
}

//target refers to the subject being attacked
function attack(target,player,playHp,playArmour,playDamage,monster,monstHp,monstArmour,monstDamage){
	var hitOrMiss = Math.random();
	console.log("Probability of hitting:" + hitOrMiss);
	//roll and add two dice(for player). add damage - armour --> health change
	if(target==monster){
		//successful hit
		if(hitOrMiss<0.8){
			var bonusDamage = Math.floor((Math.random()*6)+1) + Math.floor((Math.random()*6)+1);
			var m_finalHp = monstHp + monstArmour - playDamage - bonusDamage;
			var difference = monstHp - m_finalHp;
			//return modified monster health
			alert("You land a blow on the monster! You damaged it by " + difference);
			return m_finalHp;
		}
		//miss
		else {
			//return starting monster health			
			alert("The monster expertly evades your attack!");
			return monstHp;
		}
	}
	else if(target==player){

		if(hitOrMiss<0.8){
			var p_finalHp = playHp + playArmour - (monstDamage)-(Math.floor(Math.random()*4));
			var difference = playHp - p_finalHp;
			//return modified player health
			alert("Ouch! That monster hurts! You got damaged by " + difference);
			return p_finalHp;
		}
		//miss
		else {
			//return starting player health			
			alert("You dodged the enemy's attack!");
			return playHp;
		}
	}
}

function eatFood(choice,item,playHp){
	//get the specific item-value from the stats Object
	var food = stats["bag"][item];
	//get the initial health
	var initialHp = playHp;

	if(choice=="Y"){
		//restore health from food
		var finalHp = food + initialHp;
		//remove the food from bag since it's gone
		delete stats["bag"][item];
		return finalHp;
	}
	else{
		//no change to health stat
		return initialHp;
	}
}

//drop mechanics
function foodDrops(){
	var drop = Math.random();
	console.log("Food probability: " + drop);
	var accessBag = stats["bag"];
	if(drop<=0.05){
		alert("You found an epic exilir!");
		if(accessBag["exilir"]!=null){
			alert("You mixed the exilir with the one left in your bag for a more potent one.");
			accessBag["exilir"]+=300;
		}
		else{
			accessBag["exilir"]=300;
		}
		checkBag();
	}
	else if(drop>0.05 && drop<=0.10){
		alert("You found a whiskey!");
		if(accessBag["exilir"]!=null){
			alert("You mixed the whiskey with the one left in your bag for a more potent one");
			accessBag["whiskey"]+=100;
		}
		else{
			accessBag["whiskey"]=100;
		}
		checkBag();
	}
	else if(drop>0.20 && drop<=0.30){
		alert("You found a restore!");
		if(accessBag["restore"]!=null){
			alert("Viola! You mixed the restore with the one left in your bag for a more potent one");
			accessBag["restore"]+=80;
		}
		else{
			accessBag["restore"]=80;
		}
		checkBag();
	}
	else if(drop>0.30 && drop<=0.70){
		alert("You found an apple!");
		if(accessBag["apple"]!=null){
			alert("Some apple magic with the one in your bag left you with one big apple.");
			accessBag["apple"]+=50;
		}
		else{
			accessBag["apple"]=50;
		}
		checkBag();
	}
	else if(drop>0.7){
		alert("No food drops. Better luck next time!");
	} 
}

/** <<<<<<<<<<<<<<<< DISPLAY FUNCTIONS >>>>>>>>>>>>>>>>> */

//Display the status of player in a more readable format;
function statsDisplay(playHp,playArmour,playDamage){
	var p_display = "";
	var heartSyb = "\uD83D\uDC9B";

	var health = heartSyb + ": " + playHp;  
	var armour = "Base armour: " + playArmour;
	var damage = "Base damage: " + playDamage;

	var backpack = "";
	//packCounter is for listing in numeric
	var packCounter = 1;
	for(var itemName in stats["bag"]){
		backpack += packCounter +"." + itemName + " ";
		packCounter ++;
	}

	p_display = health + "\n" + armour + "\n" + damage + "\n";	
	//alert("Current stats: \n" + statsDisplay + "\n bag:" + backpack);
	var output = "Current stats: \n" + p_display + "bag:" + backpack;
	return output;
}

//Display the status of monster in a more readable format;
function monstDisplay(monster,monstHp,monstArmour,monstDamage){
	var m_display = "";
	var currMonst = monsterList[monster];
	var heartSyb = "\uD83D\uDC9B";

	var m_health = heartSyb + ": " + monstHp;  
	var m_armour = "Base armour: " + monstArmour;
	var m_damage = "Base damage: " + monstDamage;
	var m_description = "Description: " + monsterList[monster]["description"];

	m_display = m_health + "\n" + m_armour + "\n" + m_damage + "\n" + m_description + "\n";	
	var output = "Enemy: " + monster + "\n" + m_display;
	return output;	
}

//function to show only bag
function checkBag(){
	var backpack = "";
	//packCounter is for listing in numeric
	var packCounter = 1;
	for(var itemName in stats["bag"]){
		backpack += packCounter +"." + itemName + " ";
		packCounter ++;
	}
	return backpack;
}

