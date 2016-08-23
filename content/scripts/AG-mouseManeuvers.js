/*****************************************************************************
*			         CS 419 - Software Projects
*				 Oregon State University - Summer 2016
*     	           WEB 1: Real-Time Strategy Game
*
* Project Team: Xi
* Members: Brandon Gipson, Tom Dale, James Pool
*
* Filename: mouseManeuvers.js
* Version: -
* Description: Tower defense GUI mouse logic
*
*****************************************************************************/


 
 game_field.addEventListener("click", clickListener, false);
 game_field.addEventListener("mousemove", mousemoveListener, false);
 game_field.addEventListener("contextmenu", contextmenuListener, false);
 
 
 /***********************************
 * Allows click to place for towers
 * *********************************/
 function clickListener(e) {
  var mouseX = 0;
  var mouseY = 0;
	 var towerHit = false;
	 var buttonHit = false;
	 var mapHit = false;
	 var pathHit = false;
	 var playClick = false;
	 
 	//getting mouse position and offsets it by canvas boundry
 	var bRect = game_field.getBoundingClientRect(); //get the boundary of the canvas
  mouseX = event.clientX - bRect.left;
  mouseY = event.clientY - bRect.top;
  
  //Offsets are so the mouse appears in the center of the object
  var mxOffset = mouseX - 18.5;
	 var myOffset = mouseY - 18.5;
  
  //Checks to see if a tower has been clicked
   if(!newTowerButton.press) {
    for (i in towerList) {
     towerList[i].clicked = (clickTest(towerList[i], mouseX, mouseY));
     playClick = true;
    }
    if(playClick) {
     buttonClick.play();
    }
   }
  
  //check to see if mouse click is on the new tower button
  if(clickTest(newTowerButton, mouseX, mouseY)){
   newTowerButton.press = true; //marks button as pressed
   greenGemButton.press = false;
   blueGemButton.press = false;
   redGemButton.press = false;
   buttonClick.play();
 
   return;
  }
  
  //check to see if mouse click is on green button
  if(clickTest(greenGemButton, mouseX, mouseY)){
   greenGemButton.press = true; //marks button as pressed
   newTowerButton.press = false;
   blueGemButton.press = false;
   redGemButton.press = false;
   buttonClick.play();
 
   return;
  }
  
  //check to see if mouse click is on blue button
  if(clickTest(blueGemButton, mouseX, mouseY)){
   blueGemButton.press = true; //marks button as pressed
   greenGemButton.press = false;
   newTowerButton.press = false;
   redGemButton.press = false;
   buttonClick.play();
 
   return;
  }
  
  //check to see if mouse click is on red button
  if(clickTest(redGemButton, mouseX, mouseY)){
   redGemButton.press = true; //marks button as pressed
   greenGemButton.press = false;
   blueGemButton.press = false;
   newTowerButton.press = false;
   buttonClick.play();
 
   return;
  }
  
  //Places colored gem inside selected tower
  for(i in towerList) {
   if(towerList[i].clicked) {
    if(greenGemButton.press) {
      towerList[i].updateGem('green');
      greenGemButton.press = false;
      break;
    }
    
     if(blueGemButton.press) {
       towerList[i].updateGem("blue");
       blueGemButton.press = false;
       break;
     }
     
     
     if(redGemButton.press) {
       towerList[i].updateGem("red");
       redGemButton.press = false;
       break;
     }
   }
  }
  
  
  //Checks to see if the newTowerButton has been clicked  
  if(newTowerButton.press) { //If the tower placement button was pressed then do:
  //checks towerList to see if click is inside or overlapping an existing tower
   for (var i in towerList) {
    towerHit = hitTest(towerList[i], 40, 40, mxOffset, myOffset);
    if (towerHit) {
     break;
    }
   }
   
   //Checks to see if a tower overlaps the button to place them
   buttonHit = hitTest(newTowerButton, 40, 40, mouseX, mouseY);
   
   //Checks to see if a tower overlaps the no place zones
   for(i in mapBoundaryList) {
    mapHit = hitTest(mapBoundaryList[i], 40, 40, mxOffset, myOffset);
    if (mapHit) {
     break;
    }
   }
   
   //Checks to see if the tower overlaps the path
   for(i in pathBoundaryList) {
    pathHit = hitTest(pathBoundaryList[i], 40, 40,mxOffset, myOffset);
    if (pathHit) {
     break;
    }
   }
  }
 	
  	//if the click was not within an existing tower then it places the tower
  	// and if the button for tower placement has been pressed
  	if (!towerHit && !buttonHit && !mapHit && !pathHit && newTowerButton.press) {
  	    placeTower(mouseX - 18.5, mouseY - 18.5); 
  	                                   
  	    newTowerButton.press = false;
  	}
 	
 	//prevents mouse click from effecting browser window
 	if (e.preventDefault) {
 	    e.preventDefault();
 	} //standard
 	else if (e.returnValue) {
 	    e.returnValue = false;
 	} //older IE
 	
 	return false;
 }
 
 /************************************************************
  * Function that detects mouse movements to show the player
  * that a particular tower placement is not in bounds
  * *********************************************************/
 function mousemoveListener (e) {
  var mouseX = 0;
  var mouseY = 0;
  
  //getting mouse position and offsets it by canvas boundry
 	var bRect = game_field.getBoundingClientRect(); //get the boundary of the canvas
  mouseX = event.clientX - bRect.left;
  mouseY = event.clientY - bRect.top;
  
  var mxOffset = mouseX - 18.5;
	 var myOffset = mouseY - 18.5;
  
  if(newTowerButton.press) {
   mouseOutline.x = mxOffset;
   mouseOutline.y = myOffset;
   
   for(i in mapBoundaryList) {
    mapHit = hitTest(mapBoundaryList[i], 40, 40, mxOffset, myOffset);
    if (mapHit) {
     break;
    }
   }
   
   for(i in pathBoundaryList) {
    pathHit = hitTest(pathBoundaryList[i], 40, 40, mxOffset, myOffset);
    if (pathHit) {
     break;
    }
   }
    
   if(!mapHit && !pathHit) {
    mouseOutline.color = "blue";
   }
   
   else {
    mouseOutline.color = "red";
   }
  }
  
  
  return false;
 }
 
 
 /***********************************************************
  * Function that listens for right clicks in order to cancel
  * tower placement after the button has been clicked
  * *********************************************************/
  function contextmenuListener(e) {
   
   rightClick.play();
   newTowerButton.press = false;
   greenGemButton.press = false;
   blueGemButton.press = false;
   redGemButton.press = false;
   
   //prevents mouse click from effecting browser window
 	if (e.preventDefault) {
 	    e.preventDefault();
 	} //standard
 	else if (e.returnValue) {
 	    e.returnValue = false;
 	} //older IE
 	
   return false;
  }
  
  
 /************************************************************
  * Tests to see if object 2 created at the mouse click's x, y
  * overlaps object 1 in any way. The mouse click marks the top
  * left corner of object 2. Returns true if it does and false 
  * if it doesn't
  * **********************************************************/

 function hitTest(obj, obj2Width, obj2Height, mx, my) {
   
   if ((obj.x <= mx) && (obj.x + obj.width >= mx) && (obj.y <= my) && (obj.y + obj.height >= my)) { //top left corner
    return true;
    
   }
   
   if ((obj.x <= mx + obj2Width) && (obj.x + obj.width >= mx + obj2Width) && (obj.y <= my) && (obj.y + obj.height >= my)) { //top right corner
    return true;
    
   }

   if ((obj.x <= mx) && (obj.x + obj.width >= mx) && (obj.y <= my + obj2Height) && (obj.y + obj.height >= my + obj2Height)) { //bottom left corner
    return true;
   }
   
   if ((obj.x <= mx + obj2Width) && (obj.x + obj.width >= mx + obj2Width) && (obj.y <= my + obj2Height) && (obj.y + obj.height >= my + obj2Height)) { //bottom right corner
    return true;
   }
   
   return  false;
  }
  
  /****************************************************
   * Much like hit test but for when we only want to 
   * see if inside the object has been clocked. Sort of
   * like a button
   * **************************************************/
   function clickTest(obj, mx, my) {
    return ((obj.x <= mx) && (obj.x + obj.width >= mx) && (obj.y <= my) && (obj.y + obj.height >= my))
   }
   
   window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

   if (key == 49) {
       newTowerButton.press = true;
       greenGemButton.press = false;
       blueGemButton.press = false;
       redGemButton.press = false;
   }
   else if (key == 50) {
       redGemButton.press = true;
       greenGemButton.press = false;
       blueGemButton.press = false;
       newTowerButton.press = false;
   }
   else if (key == 51) {
       blueGemButton.press = true;
       newTowerButton.press = false;
       greenGemButton.press = false;
       redGemButton.press = false;
   }
   else if (key == 52) {
       greenGemButton.press = true;
       blueGemButton.press = false;
       redGemButton.press = false;
       newTowerButton.press = false;
   }
}