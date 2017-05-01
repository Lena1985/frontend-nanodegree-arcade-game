// Create the enemy class
var Enemy = function(x, y) {
  // Select the enemy bug image
	this.sprite = 'images/enemy-bug.png';
	
	// Define position(x and y coordinates on the canvas) and speed of the Enemies
	this.x = x;
	this.y = y;
	this.speed = Math.floor((Math.random()*230)+100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// Movement is multiplied by the dt parameter,
	// which ensures the game runs at the same speed for
	// all computers.
	// Set the speed if the enemy is visible on the screen	
	if(this.x <= 500) {
		this.x += this.speed * dt;
		// Reset the enemy position if it has crossed the screen
	} else {
		this.x = -120;
	}
	
	// Reset the game when the player comes within 55px of an enemy bug
	if(player.x <= this.x + 55 && player.x >= this.x - 55) {
		if(player.y <= this.y + 55 && player.y >= this.y - 55) {
			player.reset();
		}
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create the player class and set the player's start position
var Player = function() {
	this.sprite = 'images/char-cat-girl.png';
	this.x = 200;
	this.y = 400;
};

// Update the player position when any of the movement keys are pressed
// Avoid that the player can move off the screen
Player.prototype.update = function() {
	if(this.ctlKey === 'left' && this.x > 0) {
		this.x = this.x - 101;
	} else if(this.ctlKey === 'right' && this.x != 402) {
		this.x = this.x + 101;
	} else if(this.ctlKey === 'up') {
		this.y = this.y - 85;
	} else if(this.ctlKey === 'down' && this.y < 365) {
		this.y = this.y + 85;
	}
	this.ctlKey = null;
	// Reset the player position if player reaches water
	if(this.y < 25) {
		this.reset();
	}
};

// Define the inital position of the player on the canvas and on reset
Player.prototype.reset = function() {
	this.x = 200;
	this.y = 400;
};
// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(e){
	this.ctlKey = e;
}

// Create array of enemies with inital position
var allEnemies = [];
(function generateEnemies() {
	allEnemies.push(new Enemy(-10, 60));
	allEnemies.push(new Enemy(-10, 145));
	allEnemies.push(new Enemy(-10, 230));
	allEnemies.push(new Enemy(-10, 315));
}());

// Create the player, an instance of the Player class previously defined
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
