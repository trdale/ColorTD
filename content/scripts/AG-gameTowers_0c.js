/*****************************************************************************
*			         CS 419 - Software Projects
*				 Oregon State University - Summer 2016
*     	           WEB 1: Real-Time Strategy Game
*
* Project Team: Xi
* Members: Brandon Gipson, Tom Dale, James Pool
*
* Filename: gameTowers.js
* Version: 0c
* Description: Tower defense tower class and associated functions
*
*****************************************************************************/

/* List for current units in game */
var towerList = [];

/************************* Tower Superclass *********************************/
function tower(x,y) {
    // Placement variables
    this.x = x; // left point
    this.y = y;  // top point
    this.cost = 1;
    this.justPlaced = true;
    this.gemJustPlaced = false;
    
    // Visual Properties
    this.towerColor = 'gray';
    this.width = 40;
    this.height = 40;
    this.centerX = this.x + (this.width / 2);
    this.centerY = this.y + (this.height / 2);
    this.clicked = false;
    
    // Tower Attack Attributes
    this.laserColor = 'gray';
    this.laserWidth = 1;
    this.damage = 1;
    this.fireRateMax = 5;      //value you trigger when tower shoots
    this.fireRateCount = 0;    //counter used to know when to fire
    this.range = 100;
    this.removeTower = false;  // Set to true have tower removed
    this.target = [null, null, null, null];
    this.maxTargets = 1;
    this.laserFired = [false, false, false, false];  // Fix for missing lasers
    
    //Gem Properties
    this.redCount = 0;
    this.blueCount = 0;
    this.greenCount = 0;
    this.gemCount = 0;
    this.gemCosts = [200, 400, 600];
  
    // Tower Upgrade Gems
    this.slot1 = {
        color: "gray",
    };
    this.slot2 = {
        color: "gray"
    };
    this.slot3 = {
        color: "gray",
    };
}

/************************* Tower Superclass Methods *************************/
/* Clear designated gem slot (set to gray) */
tower.prototype.clearGem = function(slotNumber) {
    if(slotNumber == 1) {
        this.slot1.color = "gray";
    }
    
    if(slotNumber == 2) {
        this.slot2.color = "gray";
    }
    
    if(slotNumber == 3) {
        this.slot3.color = "gray";
    }
    
    this.gemCount--;
    var tower = this;
    modifyTower(tower);
};

/* Set designated gem slot (gemColor is a string) */
tower.prototype.updateGem = function(gemColor) {
    var tower = this;
    
    if(coins.amount >= tower.gemCosts[tower.gemCount]) {
        console.log(tower.gemCosts[tower.gemCount]);
        coins.amount -= tower.gemCosts[tower.gemCount];  // Subtract gem cost
        console.log(tower.gemCosts[tower.gemCount]);
        var slotList = [];
        slotList.push(tower.slot1);
        slotList.push(tower.slot2);
        slotList.push(tower.slot3);
        
        for(var i in slotList) {
            if(slotList[i].color == "gray") {
                slotList[i].color = gemColor;
                
                break;
            }
        }
        
        tower.gemCount++;
        tower.gemJustPlaced = true;
        
        modifyTower(tower);
            
            
    }
    else {
        noCoins.play();
        coins.flash = true;
    }
};

/* Helper function to modify color counts */
tower.prototype.checkColors = function() {
    
    //reset colors
    tempRedCount = 0;
    tempBlueCount = 0;
    tempGreenCount = 0;
    
    //slot 1
    if (this.slot1.color == 'red') {
        tempRedCount += 1;
    }
    else if (this.slot1.color == 'green') {
        tempGreenCount += 1;
    }
    else if (this.slot1.color == 'blue') {
        tempBlueCount += 1;
    }
    
    //slot 2
    if (this.slot2.color == 'red') {
        tempRedCount += 1;
    }
    else if (this.slot2.color == 'green') {
        tempGreenCount += 1;
    }
    else if (this.slot2.color == 'blue') {
        tempBlueCount += 1;
    }
    
    //slot 3
    if (this.slot3.color == 'red') {
        tempRedCount += 1;
    }
    else if (this.slot3.color == 'green') {
        tempGreenCount += 1;
    }
    else if (this.slot3.color == 'blue') {
        tempBlueCount += 1;
    }
    
    this.redCount = tempRedCount;
    this.greenCount = tempGreenCount;
    this.blueCount = tempBlueCount;
};


/* Rendering Function: Draws the tower and gems onto the canvas */
tower.prototype.draw = function() {
    //The tower image is created below
    ctx.fillStyle=this.towerColor;
    ctx.fillRect(this.x, this.y, this.height, this.width);
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.x, this.y, this.height, this.width);
};

/* Rendering Function: Draws the tower's turret onto the canvas */
tower.prototype.drawTurret = function() {
    // Draw turret
    var r = 15;  // Turret radius
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.towerColor;
    ctx.fill();
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'black';
    ctx.stroke();
};

/* Rendering Function: Draws the gems onto the tower (Call after drawTurret!) */
tower.prototype.drawGems = function() {
    function drawGemWedge(t, start, stop, color, r) {
        ctx.beginPath();
        ctx.moveTo(t.centerX, t.centerY);
        ctx.arc(t.centerX, t.centerY, r, start, stop, false);
        ctx.lineTo(t.centerX, t.centerY);
        ctx.closePath();
        ctx.lineWidth = '1';
        ctx.fillStyle = color;
        ctx.fill();
    }
    
    // Note: Canvas circle is upside down of standard unit circle
    var p12 = 3* Math.PI / 2;  // 12 o'clock locaiton
    var p4 = 1 * Math.PI / 6;  // 4 o'clock location
    var p8 = 5 * Math.PI / 6;  // 8 o'clock locaiton
    var r = 8;  // Gem circle radius
    
    drawGemWedge(this, p12, p4, this.slot1.color, r);  // Gem #1
    drawGemWedge(this, p4, p8, this.slot2.color, r);  // Gem #2
    drawGemWedge(this, p8, p12, this.slot3.color, r);  // Gem #3
    
};

/* Rendering Function: Draws the tower's range */
tower.prototype.drawRange = function() {
        // Tower Range Circle
        ctx.beginPath();
        ctx.lineWidth  = '1.5';
        ctx.strokeStyle = "gray";
        ctx.arc(this.centerX, this.centerY, this.range, 0, 2*Math.PI);
        ctx.stroke();
}

/* Rendering Function: Draws the tower's menu outline */
tower.prototype.drawOutline = function() {
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  },

/* Rendering Function: Draws the tower's menu */
tower.prototype.drawMenu = function() {
    var widthOffset = this.width + 35;
    var heightOffset = this.height + 125;
    var xOffset = this.x - (widthOffset + 5);
    var yOffset = this.y - this.height;
    
    if (xOffset  < 1) { 
        xOffset += widthOffset + 50;
    } 
    
    if ((yOffset + heightOffset) > game_field.height) {
        yOffset -= this.height;
    } 
    
    //draws the menu background
    ctx.fillStyle = "#e4d2ba";
    ctx.fillRect(xOffset, yOffset, widthOffset, heightOffset);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(xOffset, yOffset, widthOffset, heightOffset);
    
    //Basic stats
    ctx.fillStyle = "black";
    ctx.textAlgn = "left";
    ctx.textBaseline = "center";
    ctx.font = "Bold 11px Arial";
    ctx.fillText("Stats:", xOffset + 17, yOffset + 5);
    ctx.font = "Bold 8px Arial";
    ctx.fillText("Range - " + this.range, xOffset + 28, yOffset + 20);
    ctx.fillText("DPS - " + this.damage, xOffset + 23, yOffset + 30);
    
    //Gem slots. The word color changes to match the gem
    ctx.font = "Bold 11px Arial";
    ctx.fillText("Gems:", xOffset + 20, yOffset + 50);
    
    ctx.font = "Bold 8px Arial";
    ctx.fillStyle = this.slot1.color;
    if(this.slot1.color == "gray") {
        ctx.fillText("none", xOffset + 20, yOffset + 65);
    }
    else {
       ctx.fillText(this.slot1.color, xOffset + 20, yOffset + 65); 
    }
    
    ctx.fillStyle = this.slot2.color;
    if(this.slot2.color == "gray") {
        ctx.fillText("none", xOffset + 20, yOffset + 75);
    }
    else {
       ctx.fillText(this.slot2.color, xOffset + 20, yOffset + 75); 
    }
    
    ctx.fillStyle = this.slot3.color;
    if(this.slot3.color == "gray") {
        ctx.fillText("none", xOffset + 20, yOffset + 85);
    }
    else {
       ctx.fillText(this.slot3.color, xOffset + 20, yOffset + 85); 
    }
    
    //Bonuses give by gems
    ctx.fillStyle = "black";
    ctx.font = "Bold 11px Arial";
    ctx.fillText("Bonuses:", xOffset + 28, yOffset + 100);
    ctx.font = "Bold 8px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("+" + this.redCount + " damage", xOffset + 23, yOffset + 115);
    ctx.fillStyle = "blue";
    ctx.fillText("+" + this.blueCount + " targets", xOffset + 23, yOffset + 130);
    ctx.fillStyle = "green";
    ctx.fillText("+" + this.greenCount + " range", xOffset + 20, yOffset + 145);
    
}
  
/* Rendering Function: Draws the laser from tower to the enemy */
tower.prototype.drawLaser = function(j) {
    ctx.beginPath();
    ctx.moveTo(this.centerX, this.centerY);
    ctx.lineTo(this.target[j].x, this.target[j].y);
    ctx.strokeStyle = this.laserColor;
    ctx.lineWidth = this.laserWidth;
    ctx.stroke();
    
    // <<< TEST FIX FOR LASER ISSUE >>
    this.laserFired[j] = true;
};

tower.prototype.drawCost = function(alpha) {
    var newX = this.x + 20;
    var newY = this.y - 27;
    
    ctx.fillStyle = "rgba(255,215,0," + alpha + ")";
    ctx.font = "Bold 25px Arial";
    ctx.fillText("-" + this.cost, newX, newY);
    ctx.lineWidth = '0.5';
    ctx.strokeStyle = "rgba(255,165,0," + alpha + ")";
    ctx.strokeText("-" + this.cost, newX, newY);
};


tower.prototype.drawGemCost = function(alpha) {
    var tower = this;
    var newX = tower.x + 20;
    var newY = tower.y - 27;
    
    ctx.fillStyle = "rgba(255,215,0," + alpha + ")";
    ctx.font = "Bold 25px Arial";
    ctx.fillText("-" + tower.gemCosts[tower.gemCount-1], newX, newY);
    ctx.lineWidth = '0.5';
    ctx.strokeStyle = "rgba(255,165,0," + alpha + ")";
    ctx.strokeText("-" + tower.gemCosts[tower.gemCount-1], newX, newY);
};
  
/* Logic Function: Deals damage to a targeted unit */
tower.prototype.shoot = function(x){
    //do damage to unit
    //calc damage based on units resistance
    //console.log("Shooting at target: " + x);
    //console.log("Target " + x + ": " + this.target[x].red);
    
    this.target[x].health = this.target[x].health - this.damage;
   
    
    //set to 0 for logic loop to know to clean up unit remove from towers target
    if (this.target[x].health <= 0) {
        this.target[x].health = 0;
        
        //set target back to null so attack function knows to find new target
        this.target[x] = null;
    }
};
  
/* Logic Function: Target unit and attack if unit is in range */
tower.prototype.attack = function(unitList){
    var tower = this;
    //check range of current target first
    
    //check if even fires based on rate of fire before runs any code
    //if count less than max increment
    if (tower.fireRateCount < tower.fireRateMax) {
        tower.fireRateCount++;
    }
    
    //check if in range then shoot
    else {
        
        //run for max number of targets
        for(var j = 0; j < tower.maxTargets; j++) {
            //check if current target is in range still
            if (tower.target[j] != null) {
                var distSq = Math.pow((tower.x - tower.target[j].x), 2) + Math.pow((tower.y - tower.target[j].y), 2);
                //if not in range anymore remove target (range less than distance)
                if (Math.pow(tower.range, 2) < distSq){
                    tower.target[j] = null;
                }
            }
        
            //if doesnt have a target find one
            if (tower.target[j] == null) {
                for (var i = 0; i < unitList.length; i++){
                    //calculate distance from tower x.y to unit x.y
                    distSq = Math.pow((tower.x - unitList[i].x), 2) + Math.pow((tower.y - unitList[i].y), 2);
                    //check if within tower range
                    if (Math.pow(tower.range, 2) > distSq){
                        //make sure not already targeted by this tower
                        var canTarget = true; //bool used to know if we can target this mob
                        for (var k = 0; k < tower.maxTargets; k++) {
                            //look through current targets make sure this unit is already targeted
                            if (unitList[i] == tower.target[k]){
                                canTarget = false;
                            }
                        }
                        
                        //if eligible target set it, else continue looping for new target
                        if(canTarget ==  true) {
                            //set the unit as the towers target
                            tower.target[j] = unitList[i];
                            break;
                        }
                    }
                }
            }
            
            //if the unit was in range, or found a new target shoot
            //if it shoots at least once reset fire count
            if (tower.target[j] != null){
                tower.fireRateCount = 0;
                //tower.shoot(j); //pass in what target its shooting
                // <<< TEST FIX FOR LASER ISSUE >>
                if (tower.laserFired[j]) {
                    tower.shoot(j);
                    tower.laserFired[j] = false;  // Reset firing flag
                }
            }
        }
    }
};

/********************** Tower Utility Functions *****************************/
/* Places a tower at specified (x, y) and adds to tower list */
var placeTower = function(x, y, type) {
    
    var newTower;
    type = type || 0;  // If no type is provided, default to 0
    newTower = new towerTypeList[type](x,y);  // Create new tower of base type
    if(coins.amount >= newTower.cost) {
        placementThud.play();
        towerList.push(newTower);  // Add new tower to tower list
        coins.amount -= newTower.cost;  // Subtract tower cost
    }
    else {
        noCoins.play();
        coins.flash = true;
    }
};

/* Removes a tower and refunds some resources [NEED TO DO] */
var removeTowers = function() {
     for (var i = towerList.length - 1; i >= 0; i--) {
         if (towerList[i].removeTower) {
             towerList.splice(i,1);
         }
     }
};

/************************* Tower Subclasses *********************************/
// List of available towers
var towerTypeList = [baseTower];

/* Base Tower */
function baseTower(x,y) {
    tower.call(this, x, y);  // Call tower superclass constructor
    this.towerColor = 'gray';
    this.laserColor = getColor(0,0,0);
    this.damage = 20;
    this.cost = 100;
    
    
    //set to a blue tower for testing
    // this.updateGem('blue', 1);
    
}
baseTower.prototype = Object.create(tower.prototype);

/* Function that modiffies the tower parameters when gems are added or removed */
function modifyTower(tower){
    
    //update towers colors
    tower.checkColors();
    
    //set of factors gems control
    var DAMAGE_FACTOR = [1, 2, 3, 4];
    var RANGE_FACTOR = [1, 2, 3, 4];
    var TARGET_FACTOR = [0, 1, 2, 3];
    var TOWER_LEVEL = [1, 4, 9, 30];
    
    // Tower Attack Attributes
    tower.laserColor = getColor(tower.redCount * 3,tower.greenCount * 3, tower.blueCount * 3);
    
    //modify damage by tower level and gem
    tower.damage =((10 * TOWER_LEVEL[tower.gemCount]) * DAMAGE_FACTOR[tower.redCount]);
    
    //modify by gem
    tower.range = 100 * RANGE_FACTOR[tower.greenCount];
    
    //modify max targets by gem
    tower.maxTargets = 1 + TARGET_FACTOR[tower.blueCount];
}