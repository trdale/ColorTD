/*****************************************************************************
*			         CS 419 - Software Projects
*				 Oregon State University - Summer 2016
*     	           WEB 1: Real-Time Strategy Game
*
* Project Team: Xi
* Members: Brandon Gipson, Tom Dale, James Pool
*
* Filename: gameGraphics.js
* Version: -
* Description: Tower defense graphics: hearts and coins
*
*****************************************************************************/

/***********************************
 * Hearts object for life tracking 
 * *********************************/
var hearts = {
  x: 10,
  y: 10,
  max: 5,
  current: 5,
  updateMax: function(max) {
    this.max = max;  
  },
  updateCurrent: function(current) {
      this.current = current;
  },
  draw: function() {
      var fullHeartImage = new Image();
      var halfHeartImage = new Image();
      var emptyHeartImage = new Image();
      
      fullHeartImage.src = "./content/images/resourceAssets/heartAssets/FullHeart.png";
      halfHeartImage.src = "./content/images/resourceAssets/heartAssets/HalfHeart.png";
      emptyHeartImage.src = "./content/images/resourceAssets/heartAssets/EmptyHeart.png";
      
      var heartsToDisplay = this.max - (this.max - this.current);
      
      if (this.current == this.max) {
        var i = 0;
        for(var j = 0; j < heartsToDisplay; j++) {
          ctx.drawImage(fullHeartImage, (this.x + i), this.y, 57, 50);
          i += 40;
        }
      }
      
      if (heartsToDisplay < this.max && this.current == Math.floor(this.current)) {
        i = 0;
        for(j = 0; j < heartsToDisplay; j++) {
          ctx.drawImage(fullHeartImage, (this.x + i), this.y, 57, 50);
          i += 40;
        }
        
        for(j = 0; j < (this.max - this.current); j++) {
          ctx.drawImage(emptyHeartImage, (this.x + i), this.y, 55, 50);
          i += 40;
        }
      }
      
      if (this.current != Math.floor(this.current)) {
        i = 0;
        for(j = 1; j < heartsToDisplay; j++) {
          ctx.drawImage(fullHeartImage, (this.x + i), this.y, 57, 50);
          i += 40;
        }
        
        ctx.drawImage(halfHeartImage, (this.x + i), this.y, 50, 50);
        i += 40;
        
        for(j = 0; j < (this.max - (this.current + 1)); j++) {
          ctx.drawImage(emptyHeartImage, (this.x + i), this.y, 55, 50);
          i += 40;
        }
      }
  }
};


/**************************************************
 * Coins object for money tracking and displaying 
 * ************************************************/
var coins = {
  x: 900,
  y: 10,
  amount: 0,
  flash: false,
  
  update: function(i) {
    this.amount = i;
  },
  
  draw: function(color) {
    var coinsImage = new Image();
    coinsImage.src = "./content/images/resourceAssets/coins.png";
    
    ctx.drawImage(coinsImage, this.x, this.y, 55, 50);
    ctx.fillStyle = color;
    ctx.font = "Bold 48px Arial"; 
    ctx.textAlgn = "left";
    ctx.textBaseline = "top";
    ctx.fillText(this.amount, this.x + 110, this.y);
  }
};

/******************************************
 * A button that toggles to let you place 
 * a tower on the map
 * **************************************/
var newTowerButton = {
  press: false,
  width: 20,
  height: 20,
  x: 30,
  y: 575,
  
  drawOutline: function() {
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'white';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  },
  
  draw: function() {
    ctx.fillStyle="gray";
    ctx.fillRect(this.x, this.y, this.height, this.width);
    ctx.fillStyle = "gold";
    ctx.font = "Bold 20px Arial";
    ctx.textAlgn = "left";
    ctx.textBaseline = "top";
    ctx.fillText("1", this.x + 9, this.y);
    
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
};

/******************************************
 * A button that toggles to let you place 
 * a gem in a tower
 * **************************************/
var redGemButton = {
  press: false,
  width: 20,
  height: 20,
  x: 55,
  y: 575,
  
  drawOutline: function() {
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'white';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  },
  
  draw: function() {
    ctx.fillStyle="red";
    ctx.fillRect(this.x, this.y, this.height, this.width);
    
    ctx.fillStyle = "gold";
    ctx.font = "Bold 20px Arial";
    ctx.textAlgn = "left";
    ctx.textBaseline = "top";
    ctx.fillText("2", this.x + 10, this.y);
    
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
};

/******************************************
 * A button that toggles to let you place 
 * a gem in a tower
 * **************************************/
var blueGemButton = {
  press: false,
  width: 20,
  height: 20,
  x: 80,
  y: 575,
  
  drawOutline: function() {
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'white';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  },
  
  draw: function() {
    ctx.fillStyle="blue";
    ctx.fillRect(this.x, this.y, this.height, this.width);
    
    ctx.fillStyle = "gold";
    ctx.font = "Bold 20px Arial";
    ctx.textAlgn = "left";
    ctx.textBaseline = "top";
    ctx.fillText("3", this.x + 10, this.y);
    
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
};

/******************************************
 * A button that toggles to let you place 
 * a gem in a tower
 * **************************************/
var greenGemButton = {
  press: false,
  width: 20,
  height: 20,
  x: 105,
  y: 575,
  
  drawOutline: function() {
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'white';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  },
  
  draw: function() {
    ctx.fillStyle="green";
    ctx.fillRect(this.x, this.y, this.height, this.width);
    
    ctx.fillStyle = "gold";
    ctx.font = "Bold 20px Arial";
    ctx.textAlgn = "left";
    ctx.textBaseline = "top";
    ctx.fillText("4", this.x + 10, this.y);
    
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
};

/******************************************
 * An object to draw bounds outline around
 * mouse for tower placement
 * ***************************************/
var mouseOutline = {
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    color: "red",
   
    drawOutline: function() {
        // Tower Placement Rectangle
        ctx.lineWidth = '3';
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x, this.y, this.width, this.height); 
        
        // Tower Range Circle
        ctx.beginPath();
        ctx.lineWidth  = '1.5';
        ctx.strokeStyle = "gray";
        ctx.arc(this.x + 18.5, this.y + 18.5 ,100, 0, 2*Math.PI);
        ctx.stroke();
    },
 };
 
/***************************** Game Boundries ********************************/

/*****************************************************************************
 * An object that contains coordinates for the game's map boundaries for the
 * purpose of tower placing retrictions.
 * **************************************************************************/
var mapBoundaryList = [
   leftEdge = { x: 0, y: 0, width: 10, height: 610 },
   topEdge = { x: 0, y: 0, width: 1120, height: 10} ,
   rightEdge = {x: 1110, y: 0, width: 10, height: 610 },
   bottomEdge = {x: 0, y: 600, width: 1120, height: 10}, 
   boxHearts = {x: 10, y: 10, width: 210, height: 50 },
   boxCoins = {x: 900, y: 10, width: 210, height: 50 },
   boxButtons = {x: 10, y: 570, width: 120, height: 30 },
   boxBanner = {x: 370, y: 539, width: 380, height: 61 },
   tree_1 = {x: 27, y: 181, width: 80, height: 70 },
   tree_2 = {x: 411, y: 309, width: 80, height: 70 },
   tree_3 = {x: 415, y: 452, width: 80, height: 70 },
   tree_4 = {x: 528, y: 354, width: 80, height: 70 },
   tree_5 = {x: 553, y: 476, width: 80, height: 70 },
   tree_6 = {x: 635, y: 308, width: 80, height: 70 },
   tree_7 = {x: 641, y: 415, width: 80, height: 70 },
   tree_8 = {x: 997, y: 253, width: 80, height: 70 },
];

/*****************************************************************************
 * An object that contains coordinates for the game's path boundaries for the
 * purpose of tower placing retrictions.
 * **************************************************************************/
var pathBoundaryList = [
    pathPart1 = { x: 0, y: 420, width: 290, height: 70 },
    pathPart2 = { x: 220, y: 127, width: 70, height: 300 },
    pathPart3 = { x: 220, y: 120, width: 690, height: 70 },
    pathPart4 = { x: 840, y: 127, width: 70, height: 300 },
    pathPart5 = { x: 840, y: 420, width: 270, height: 70 }
];

/*****************************************************************************
 * Draws the speficied boundry
 * **************************************************************************/
function drawBoundry(context, bList) {
    for (var i in bList) {
        //context.fillStyle = "red";
        context.fillStyle = "rgba(255, 0, 0, 0.5)";  // RED w/ 50% opacity
        context.fillRect(bList[i].x, bList[i].y, bList[i].width, bList[i].height);
    }
}