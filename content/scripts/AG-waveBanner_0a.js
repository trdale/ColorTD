/*****************************************************************************
*			         CS 419 - Software Projects
*				 Oregon State University - Summer 2016
*     	           WEB 1: Real-Time Strategy Game
*
* Project Team: Xi
* Members: Brandon Gipson, Tom Dale, James Pool
*
* Filename: waveBanner.js
* Version: 0a
* Description: Wave banner display class
*
*****************************************************************************/

var wave_banner;

/************************** Wave Banner Class ********************************/
function waveBanner(context) {
    
    // General Properties
    this.context = context;  // Get canvas context
    this.currentWave = 1;  // Current wave number (Set to 1 for 0 indexed array)
    this.countDown = 10;  // Current countdown value
    
    // Set banner properties
    this.backgroundImage = "./content/images/backgroundAssets/tan_banner_small.png";
    this.width = 384;  // Background image width
    this.height = 64;  // Background image height
    this.x = 368 ;  // Horizontal position (to left edge)
    this.y = 535;  // Vertical position (to top edge)
    
    // Set font properties
    this.font = "20px Bold Arial";
    this.fontColor = "black";
    this.textAlign = "center";
    this.textX = this.x + this.width / 2;
    this.textY = this.y + this.height / 2 - 5;  // Offset for design
}

/************************ Wave Banner Methods ********************************/
waveBanner.prototype.draw = function() {
    var bannerImage = new Image();
    var bannerMessage;
    
    // Setup background
    bannerImage.src = this.backgroundImage;
    this.context.drawImage(bannerImage, this.x, this.y, this.width, this.height);
    
    // Figure out Text String
    if (this.countDown <= 0) {  // Running a wave ...
        bannerMessage = "Wave " + this.currentWave;
    }
    else {  // Coutdown to next wave ...
        bannerMessage = "Wave " + this.currentWave + " starting in " + this.countDown + " ...";
    }
    
    // Draw text
    this.context.font = this.font;
    this.context.fillStyle = this.fontColor;
    this.context.textAlign = this.textAlign;
    this.context.fillText(bannerMessage, this.textX, this.textY);
};

waveBanner.prototype.drawGameOver = function() {
    var bannerImage = new Image();
    var bannerMessage;
    
    // Setup background
    bannerImage.src = this.backgroundImage;
    this.context.drawImage(bannerImage, this.x, this.y, this.width, this.height);
    
    // Figure out Text String
    bannerMessage = "Game Over!";
    
    // Draw text
    this.context.font = this.font;
    this.context.fillStyle = this.fontColor;
    this.context.textAlign = this.textAlign;
    this.context.fillText(bannerMessage, this.textX, this.textY);
};

waveBanner.prototype.drawGameWon = function() {
    var bannerImage = new Image();
    var bannerMessage;
    
    // Setup background
    bannerImage.src = this.backgroundImage;
    this.context.drawImage(bannerImage, this.x, this.y, this.width, this.height);
    
    // Figure out Text String
    bannerMessage = "Congratulations! You Win!";
    
    // Draw text
    this.context.font = this.font;
    this.context.fillStyle = this.fontColor;
    this.context.textAlign = this.textAlign;
    this.context.fillText(bannerMessage, this.textX, this.textY);
};