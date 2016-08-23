/*****************************************************************************
*			         CS 419 - Software Projects
*				 Oregon State University - Summer 2016
*     	           WEB 1: Real-Time Strategy Game
*
* Project Team: Xi
* Members: Brandon Gipson, Tom Dale, James Pool
*
* Filename: gameUnits.js
* Version: 0d
* Description: Tower defense unit class and associated functions
*
*****************************************************************************/

/* List for current units in game */
var unitList = [];

/************************** Unit Superclass *********************************/
function unit() {
    // Movement variables
    this.x = 0;  // left point
    this.y = 0;  // top point
    this.speed = 1;  // Unit movement speed [pixels per frame]
    this.waypoint = 1;  // Waypoint 0 is starting location
    this.escape = false;  // Set to true if unit escapes
    this.value = 1;
    
    // Position offset from true waypoint
    this.deltaX = _calcDelta();  // Horizontal offset
    this.deltaY = _calcDelta();  // Vertical offset
    
    // Visual properties
    this.color = 'gray';
    this.height = 20;
    this.width = 20;
    
    // Unit health
    this.maxhealth = 10;
    this.health = 10;
    
    // Color points (similar to tower gems)
    this.red = 0;
    this.green = 0;
    this.blue = 0;
}

/************************** Unit Superclass Methods *************************/
/* Set Health Function */
unit.prototype.setFullHealth = function(hp) {
    this.maxhealth = hp;
    this.health = hp;
};

/* Logic Function: Calculate unit movement */
unit.prototype.move = function() {
    ManhattanPath(this);  // Use Manhattan Pathing Algorithm
};

/* Rendering Function: Draws the unit with a health bar */
unit.prototype.draw = function() {
    // Calculate unit top-left point
    var Px = this.x - this.width/2;
    var Py = this.y - this.height/2;
    
    //--- Draw unit ---
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(Px, Py, this.width, this.height);
    
    // Unit outline
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'black';
    ctx.strokeRect(Px, Py, this.width, this.height);
    
    //--- Draw health bar ---
    var Hx = Px + 1;  // Health bar left edge
    var Hy = Py + this.width / 3;  // Health bar upper edge
    var Hw = this.width - 2;  // Health bar width
    var Hh = this.height / 3;  // Health bar height
    var Hp = this.health / this.maxhealth;  // Health percentage
    
    // Health bar background
    ctx.fillStyle = '#DEDEDE';  // Light Gray
    ctx.fillRect(Hx, Hy, Hw, Hh);
    
    // Health bar contents
    if (Hp > 0.5) {  // Green (>50%) = #7EE319
        ctx.fillStyle = '#7EE319';
    }
    else if (Hp > 0.25) { // Yellow (>25%) = #D4BF24
        ctx.fillStyle = '#D4BF24';
    }
    else { // Red (>0%) = #FF4747
        ctx.fillStyle = '#FF4747';
    }
    ctx.fillRect(Hx, Hy, Hw * Hp, Hh);
    
    // Health bar outline
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'black';
    ctx.strokeRect(Hx, Hy, Hw, Hh);
};

/* On Spawn Function: When a unit is added to the list */
unit.prototype.onSpawn = function() {
    // Do Nothing
};

/* On Death Function: When a unit is killed & removed from list */
unit.prototype.onDeath = function() {
    // Do Nothing
};

/*********************** Unit Utility Functions *****************************/
// Legacy addUnit function for use with gameWaves
var addUnit = function(R, G, B, healthMod) {

    var newUnit = new colorBlock(R,G,B, healthMod);
    
    _addUnit(newUnit);
};

// Internal addUnit function
function _addUnit(newUnit) {
    // Check for default coordinates
    if (newUnit.x == 0) {
        newUnit.x = waypointList[0].x + newUnit.deltaX;
    }
    if (newUnit.y == 0) {
        newUnit.y = waypointList[0].y + newUnit.deltaY;
    }
    
    // Run spawn function
    newUnit.onSpawn();
    
    // Add unit to list
    unitList.push(newUnit);
}

var removeDead = function() {
    // Remove units from end to beginning
    for (var i = unitList.length - 1; i >= 0; i--) {
        if (unitList[i].escape) {  // Unit escapes
            hearts.current -= 1;  // Remove a heart
            heartLoss.play(); //Play damage taken sound
            unitList.splice(i,1);  // Remove unit
        }
        else if (unitList[i].health <= 0) {  // Unit is killed
            coins.amount += unitList[i].value;
            coinDing.play(); //Play coin sound
            unitList[i].onDeath();  // Run on death function
            unitList.splice(i,1);  // Remove unit
        }
    }
};

/* Random Offset Function: Alters the unit's waypoint by a small amount */
function _calcDelta() {
    var maxShift = 10;  // Maximum shift off center
    // Range = [-maxShift .. +maxShift]
    var shift = Math.floor(Math.random() * (2 * maxShift + 1)) - maxShift;
    return shift;
}

/************************** Unit Subclasses *********************************/
// List of available units
var unitTypeList = [redBlock, greenBlock, blueBlock];

/* Red Block Unit */
function redBlock() {
    unit.call(this);  // Call unit superclass constructor
    // Set Red Block Parameters
    this.color = 'red';
    this.setFullHealth(50);
    this.height = 25;
    this.width = 25;
    this.speed = 0.8;
    this.value = 5;
}
redBlock.prototype = Object.create(unit.prototype);

/* Green Block Unit */
function greenBlock() {
    unit.call(this);  // Call unit superclass constructor
    // Set Green Block Parameters
    this.color = 'green';
    this.setFullHealth(15);
    this.height = 15;
    this.width = 15;
    this.speed = 2;
    this.value = 1;
}
greenBlock.prototype = Object.create(unit.prototype);

/* Blue Block Unit */
function blueBlock() {
    unit.call(this);  // Call unit superclass constructor
    // Set Blue Block Parameters
    this.color = 'blue';
    this.setFullHealth(30);
    this.speed = 1;
    this.value = 2;
}
blueBlock.prototype = Object.create(unit.prototype);

/* Color Block Unit */
var gRed = 0;
var gGreen = 0;
var gBlue =0;
function incrementColor() {
    gRed++;
    if (gRed > maxPoints) {
        gRed = 0;
        gGreen++;
        if (gGreen > maxPoints) {
            gGreen = 0;
            gBlue++;
            if (gBlue > maxPoints) {
                gBlue = 0;
            }
        }
    }
}

function colorBlock(R,G,B, healthMod) {
    unit.call(this);  // Call unit superclass constructor
    // Set Color Block Parameters
    this.color = getColor(R,G,B);
    this.red = R;
    this.green = G;
    this.blue = B;
    this.gemCount = R + G + B;
    // Set block parameters
    var HEALTH_FACTOR = [1, 1.25, 1.5, 2];
    var SIZE_FACTOR = [0.8, 1, 1.2, 1.5];
    var SPEED_FACTOR = [1, 1.25, 1.5, 2];
    
    this.speed = SPEED_FACTOR[G];
    this.setFullHealth(200 * healthMod * HEALTH_FACTOR[R]);
    this.height = 20 * SIZE_FACTOR[B];
    this.width = this.height;
    this.value = this.gemCount * Math.log2(healthMod);
    if (this.value == 0){
        this.value = 1;
    }
    this.value = this.value * 3;
    //console.log(this.health);
    
    this.onSpawn = function() {
       // console.log("color: " + this.color);
    };
    
    if (this.blue > 0) {
        this.onDeath = function() {
            for (var i = 0; i < this.blue; i++) {
                var newUnit = new colorBlock(0,i+1,0,healthMod/3);  // Spawn a green (for test)
                
                // Set to parent's position & adjust delta values
                newUnit.x = this.x - this.deltaX + newUnit.deltaX;
                newUnit.y = this.y - this.deltaY + newUnit.deltaY;
                newUnit.waypoint = this.waypoint;
                newUnit.value = 0;
                
                _addUnit(newUnit);  // Call internal add unit
            }
        };
    }
}
colorBlock.prototype = Object.create(unit.prototype);