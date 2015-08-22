
function GameScreenManager() {
}
GameScreenManager.prototype = new ScreenManager;
GameScreenManager.prototype.identity = function() {
	return ('GameScreenManager (' +this._dom.id+ ')');
};

GameScreenManager.prototype.init = function() {
	ScreenManager.prototype.init.call(this);
};

GameScreenManager.prototype.load = function() {
	ScreenManager.prototype.load.call(this);

        
};

GameScreenManager.prototype.updateAll = function() {
	ScreenManager.prototype.updateAll.call(this);
	
	if(GAMEMODEL.modelMode == "GAME_SESSION")
	{

	}
};
GameScreenManager.prototype.drawAll = function() {
	ScreenManager.prototype.drawAll.call(this);
	
	if(GAMEMODEL.gameSession instanceof SessionActor && GAMEMODEL.gameSession.paused)
	{
		var i = 2;
//		if(GAMEMODEL.gameSession.gameOver)     i=4;
		if(typeof this.screens[i] !== 'undefined')
		{
			if(this.screens[i] instanceof Actor)
			{
				this.screens[i].draw();
			}
		}
	}
};


GameScreenManager.prototype.distributeInput = function(kInput)
{
	if(kInput.keyID == GAMECONTROL.keyIDs['KEY_DELETE'])		return true;
	if(kInput.keyID == GAMECONTROL.keyIDs['KEY_BACKSPACE'])		return true;

    var used = false;
	used = used | ScreenManager.prototype.distributeInput.call(this, kInput);        


	if(GAMEMODEL.gameSession instanceof SessionActor && GAMEMODEL.gameSession.paused)
	{
        var i = 2;
//        if(GAMEMODEL.gameWorld.gameOver)     i=4;
		if(typeof this.screens[i] !== 'undefined')
		{
			if(this.screens[i] instanceof Actor)
			{
				this.screens[i].readInput(kInput);
			}
		}
	}
    return used;
};




GameScreenManager.prototype.update = function() {
	ScreenManager.prototype.update.call(this);
};
GameScreenManager.prototype.draw = function() {
	ScreenManager.prototype.draw.call(this);
};

GameScreenManager.prototype.readInput = function(kInput) {
    var used = false;
	used = used | ScreenManager.prototype.readInput.call(this, kInput);        
    return used;
};

GameScreenManager.alloc = function() {
	var vc = new GameScreenManager();
	vc.init();
	return vc;
}