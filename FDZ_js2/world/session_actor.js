
function SessionActor() {
}
SessionActor.prototype = new Actor;
SessionActor.prototype.identity = function() {
	return ('SessionActor (' +this._dom.id+ ')');
};

SessionActor.prototype.init = function() {
	Actor.prototype.init.call(this);
	
	this.gameClock = null;

	this.gamePlayer = null;
    this.gameWorld = null;
    this.gameCamera = null;

	this.startTime = 0;

	this.updatePosition(0,0);
	this.paused = false;

	
};

SessionActor.prototype.clear = function() {
    delete this.gameClock;
    this.gameClock = null;

    if(this.gameWorld instanceof WorldActor) {
        this.gameWorld.clear();
    }
    delete this.gameWorld;
    this.gameWorld = null;
	
    if(this.gameCamera instanceof ViewCamera) {
        this.gameCamera.clear();
    }
    delete this.gameCamera;
    this.gameCamera = null;

	this.gameActors = {};
	this.gameArtbits = {};
};
SessionActor.prototype.load = function() {

        

};
SessionActor.prototype.start = function() {

        this.clear();
	

    this.gameClock = FrameClock.alloc();
	this.gameClock.start();

    this.startTime = this.gameClock.elapsedMS();
    this.paused = false;

    this.gameCamera = ViewCamera.alloc();
    this.gameCamera.updatePosition(0,0);

    this.gameWorld = WorldActor.alloc();
    this.gameWorld.load();


    this.gamePlayer = this.gameWorld.gamePlayer;

};
SessionActor.prototype.end = function() {

        this.clear();

        this.gamePlayer = null;
};

SessionActor.prototype.updateAll = function() {
    this.update();
    
    
    if(!this.paused)
    {
		if(this.gameWorld instanceof WorldActor)  this.gameWorld.updateAll();
    }
};
SessionActor.prototype.drawAll = function() {
    GAMEVIEW.context.fillStyle = "#CCCCCC";
    GAMEVIEW.context.fillRect( 0, 0, GAMEVIEW.screen.w, GAMEVIEW.screen.h );


    if(this.gameWorld instanceof WorldActor)  this.gameWorld.drawAll();

    this.draw();
};
SessionActor.prototype.collideAll = function() {

    if(!this.paused)
    {
        if(this.gameWorld instanceof WorldActor)  this.gameWorld.collideAll();
    }
};


SessionActor.prototype.distributeInput = function(kInput)
{
	if(kInput.keyID == GAMECONTROL.keyIDs['KEY_DELETE'])		return true;
	if(kInput.keyID == GAMECONTROL.keyIDs['KEY_BACKSPACE'])		return true;
        
    var used = false;

    used = used || this.readInput(kInput)
    
    if(!this.paused)
    {
        if(this.gameWorld instanceof WorldActor)  
        {
            used = used || this.gameWorld.distributeInput(kInput);
        }
    }

    return used;
};




SessionActor.prototype.update = function() {
	Actor.prototype.update.call(this);

	if(this.paused && this.gameClock.isActive)	    this.gameClock.stop();
	if(!this.paused && !this.gameClock.isActive)	this.gameClock.start();
	

    if(this.gamePlayer instanceof CharActor)
    {
        if(this.gameCamera instanceof ViewCamera)
        {
            this.gameCamera.updatePosition( this.gamePlayer.posX,this.gamePlayer.posY );
        }
    }

};
SessionActor.prototype.draw = function() {

	Actor.prototype.draw.call(this);

	GAMEVIEW.clearDrawMods();
	GAMEVIEW.context.globalAlpha=1.0;               
};

SessionActor.prototype.readInput = function(kInput) {
    var used = false;

    if(GAMECONTROL.keyIDs['KEY_Q'] == kInput.keyID)
    {
        used = true;
        if(kInput.keyPress == false)		GAMEMODEL.endGame();
    }
    if(GAMECONTROL.keyIDs['KEY_ESCAPE'] == kInput.keyID || GAMECONTROL.keyIDs['KEY_P'] == kInput.keyID)
    {
        used = true;
        if(kInput.keyPress == false)		this.pauseGame();
    }	        
    if(GAMECONTROL.keyIDs['KEY_EQUALS'] == kInput.keyID)
    {
        used = true;
        if(kInput.keyPress == false && this.gameCamera instanceof ViewCamera)
        {
            this.gameCamera.zoom /= 1.1;
        }
    }
    if(GAMECONTROL.keyIDs['KEY_DASH'] == kInput.keyID)
    {
        used = true;
        if(kInput.keyPress == false && this.gameCamera instanceof ViewCamera)
        {
            this.gameCamera.zoom *= 1.1;
        }
    }
    if(GAMECONTROL.keyIDs['KEY_S'] == kInput.keyID)
    {
        used = true;
        if(kInput.keyPress == false)    GAMEMUSIC.playSource(0);
    }
    return used;
};


SessionActor.prototype.collideType = function(act) {
	return false;
};
SessionActor.prototype.collideVs = function(act) {	
};
SessionActor.prototype.collide = function(act) {
};


SessionActor.prototype.cleanAll = function() {

    if(this.gameWorld instanceof Actor && this.gameWorld.alive == false)
    {
            this.gameWorld.clear();
            delete this.gameWorld[i];
    }
};


SessionActor.prototype.pauseGame = function()
{
	if(this.paused)
	{
		this.paused = false;
		this.gameClock.start();
	}
	else
	{
		this.paused = true;
		this.gameClock.stop();		
	}
};





SessionActor.alloc = function() {
	var vc = new SessionActor();
	vc.init();
	return vc;
}