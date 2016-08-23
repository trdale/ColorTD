/*****************************************************************************
*			         CS 419 - Software Projects
*				 Oregon State University - Summer 2016
*     	           WEB 1: Real-Time Strategy Game
*
* Project Team: Xi
* Members: Brandon Gipson, Tom Dale, James Pool
*
* Filename: gameWaves.js
* Version: 0
* Description: Waves Class to track waves of units in games
*
*****************************************************************************/

var curWave = null;

function wave(){
    this.units = [];
    this.healthMod = 0;
    this.unitCount = 0;
    this.waveNumber = 0;
}

//function that spawns a random unit from unit list
function spawnUnit(wave) {
    
    //pick a random unit from count then dec count
    
    if (wave.unitCount > 0) {
        
        //pick a random unit availble 1-unitCount
        var choice = (Math.floor(Math.random() * wave.unitCount)+1);
        
    
        for (var i = 0; i < wave.units.length; i++){
            if (choice <= wave.units[i].count) {
                //remove a unit from that type
                wave.units[i].count--;
                //spawn that unit
        
                addUnit(wave.units[i].r, wave.units[i].g, wave.units[i].b, wave.healthMod);
                //var newUnit = new colorBlock(wave.units[i].r, wave.units[i].g, wave.units[i].b, wave.healthMod);
                //addUnit(newUnit);
                
                
                break;    
            
            }
            else {
                choice -= wave.units[i].count;
            }
        }
        //decrement total unit count
        wave.unitCount--;
    }
    else {
        
    }
}


//creates a wave to be used
function createWave(waveNumber){
    this.waveNumber = waveNumber;
    this.units = waveUnits[waveNumber];
    if (waveNumber == 0) {
        this.healthMod = 1;
    }
    else {
        this.healthMod = Math.pow(2, waveNumber);
    }
    this.unitCount = 0;
    for (var i = 0; i < this.units.length; i++){
        this.unitCount += this.units[i].count;
    }
    return this;
}
createWave.prototype = Object.create(wave.prototype);


//wave unit information
var waveUnits = [];

//wave 1
waveUnits.push(
    [
        {count: 55, r: 0, g: 0, b: 0},
        {count: 15, r: 1, g: 0, b: 0},
        {count: 15, r: 0, g: 1, b: 0},
        {count: 15, r: 0, g: 0, b: 1}
    ]
);
//wave 2
waveUnits.push(
    [
        {count: 25, r: 0, g: 0, b: 0},
        {count: 25, r: 1, g: 0, b: 0},
        {count: 25, r: 0, g: 1, b: 0},
        {count: 25, r: 0, g: 0, b: 1}
    ]
);

//wave 3
waveUnits.push(
    [
        {count: 10, r: 0, g: 0, b: 0},
        {count: 20, r: 1, g: 0, b: 0},
        {count: 20, r: 0, g: 1, b: 0},
        {count: 20, r: 1, g: 0, b: 1},
        {count: 10, r: 2, g: 0, b: 0},
        {count: 10, r: 0, g: 2, b: 0},
        {count: 10, r: 0, g: 0, b: 2}
    ]
);
//wave 4
waveUnits.push(
    [
        {count: 20, r: 2, g: 0, b: 0},
        {count: 20, r: 0, g: 2, b: 0},
        {count: 20, r: 0, g: 0, b: 2},
        {count: 10, r: 2, g: 0, b: 1},
        {count: 10, r: 0, g: 1, b: 2},
        {count: 10, r: 0, g: 2, b: 1},
        {count: 10, r: 1, g: 0, b: 2}
    
    ]
);
//wave 5
waveUnits.push(
    [
        {count: 10, r: 3, g: 0, b: 0},
        {count: 10, r: 0, g: 3, b: 0},
        {count: 10, r: 0, g: 0, b: 3},
        {count: 10, r: 1, g: 1, b: 1},
        {count: 10, r: 2, g: 1, b: 0},
        {count: 10, r: 2, g: 0, b: 1},
        {count: 10, r: 0, g: 2, b: 1},
        {count: 10, r: 1, g: 2, b: 0},
        {count: 10, r: 0, g: 1, b: 2},
        {count: 10, r: 1, g: 0, b: 2}
    
    ]
);

//wave 6
waveUnits.push(
    [
        {count: 20, r: 3, g: 0, b: 0},
        {count: 20, r: 0, g: 3, b: 0},
        {count: 20, r: 0, g: 0, b: 3},
        {count: 20, r: 1, g: 3, b: 0},
        {count: 20, r: 3, g: 1, b: 0}
    ]
);

//wave 7
waveUnits.push(
    [
        {count: 20, r: 3, g: 0, b: 1},
        {count: 20, r: 0, g: 3, b: 1},
        {count: 20, r: 0, g: 1, b: 3},
        {count: 20, r: 3, g: 1, b: 0},
        {count: 20, r: 3, g: 1, b: 1}
        
    ]
);

//wave 8
waveUnits.push(
    [
        {count: 20, r: 3, g: 1, b: 1},
        {count: 20, r: 1, g: 1, b: 3},
        {count: 20, r: 1, g: 3, b: 1},
        {count: 20, r: 3, g: 2, b: 0},
        {count: 20, r: 0, g: 3, b: 2}
    ]
);

//wave 9
waveUnits.push(
    [
        
        {count: 20, r: 3, g: 0, b: 2},
        {count: 20, r: 2, g: 3, b: 1},
        {count: 20, r: 1, g: 2, b: 3},
        {count: 20, r: 3, g: 3, b: 0},
        {count: 20, r: 0, g: 3, b: 3},
    
    ]
);

//wave 10
waveUnits.push(
    [
        //90
        {count: 15, r: 3, g: 1, b: 1},
        {count: 15, r: 1, g: 3, b: 1},
        {count: 15, r: 1, g: 1, b: 3},
        {count: 15, r: 2, g: 2, b: 1},
        {count: 15, r: 2, g: 1, b: 2},
        {count: 15, r: 1, g: 2, b: 2},
        
        //10
        {count: 1, r: 3, g: 2, b: 1},
        {count: 1, r: 3, g: 1, b: 2},
        {count: 2, r: 2, g: 3, b: 1},
        {count: 1, r: 2, g: 1, b: 3},
        {count: 2, r: 1, g: 3, b: 2},
        {count: 2, r: 1, g: 2, b: 3},
        {count: 1, r: 2, g: 2, b: 2},
    
    ]
);