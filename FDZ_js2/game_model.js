
GAMEMODEL={
    version: '0.0.2',
        
    gamePlayer: null,
    gameSession: null,
    gameScreens: null,

    modelMode: "GAME_INIT",  
	
    modelCamera: null,
    modelClock: null,

    activeObjs: 0
};

GAMEMODEL.init = function()
{
	this.modelClock = FrameClock.alloc();
	this.modelClock.start();
	
    this.gameScreens = ScreenManager.alloc();

    this.modelCamera = ViewCamera.alloc();
    var screen = GAMEVIEW.screen;
    this.modelCamera.set(  screen.w/2,screen.h/2,screen.w,screen.h  );

	this.load();
        
	return true;
};
GAMEMODEL.load = function()
{
    this.gameScreens.load();
};
GAMEMODEL.clear = function()
{
        if(this.gamePlayer instanceof Actor)              
        {
            this.gamePlayer.clear();
            delete this.gamePlayer;
        }
        if(this.gameSession instanceof Actor)              
        {
            this.gameSession.clear();
            delete this.gameSession;
        }
        if(this.gameScreens instanceof Actor)
        {
            this.gameScreens.clear();
            delete this.gameScreens;
        }
        if(this.modelCamera instanceof Actor)
        {
            this.modelCamera.clear();
            delete this.modelCamera;
        }
        if(this.modelClock != null && typeof this.modelClock === "object")    delete this.modelClock;

        this.gamePlayer = null;
        this.modelCamera = null;
        this.gameSession = null;
        this.gameScreens = null;
        this.modelClock = null;
};
GAMEMODEL.updateAll = function()
{	
    if(this.modelMode == "GAME_SESSION")
    {

        if(this.gameSession instanceof SessionActor)
        {
            this.gameSession.updateAll();
        }
        else
        {
              GAMEMODEL.endGame();
        }
    }
    else if(this.modelMode == "GAME_SCREENS")
    {               
        if(this.gameScreens instanceof Actor)           
        {
            this.gameScreens.updateAll();
        }
    }
    this.update();
};


GAMEMODEL.collideAll = function()
{
	if(this.modelMode == "GAME_SESSION")
	{
            if(this.gameSession instanceof SessionActor)
            {
                this.gameSession.collideAll();
            }
	}
};
GAMEMODEL.cleanAll = function()
{	
        if(this.gameSession instanceof SessionActor)        this.gameSession.cleanAll();
        if(this.gameScreens instanceof ScreenManager)       this.gameScreens.cleanAll();
};
GAMEMODEL.drawAll = function()
{
        this.drawBack();

	if(this.modelMode == "GAME_SESSION")
	{
            if(this.gameSession instanceof SessionActor)
            {
                this.gameSession.drawAll();
            }
	}
        
        if(this.gameScreens instanceof Actor)           this.gameScreens.drawAll();
        
        this.draw();
};



GAMEMODEL.distributeInput = function(kInput)
{
	if(kInput.keyID == GAMECONTROL.keyIDs['KEY_DELETE'])		return true;
	if(kInput.keyID == GAMECONTROL.keyIDs['KEY_BACKSPACE'])		return true;

	this.readInput(kInput);

    var keyused = false;
    keyused = keyused || this.readInput(kInput)
    if(this.modelMode == "GAME_SESSION")
    {
       keyused = keyused || this.gameSession.distributeInput(kInput);
    }
    return keyused;

};
GAMEMODEL.update = function()
{
};
GAMEMODEL.draw = function()
{
};
GAMEMODEL.drawBack = function()
{
	GAMEVIEW.context.fillStyle = "#FFFFFF";
	GAMEVIEW.context.fillRect( 0, 0, GAMEVIEW.screen.w, GAMEVIEW.screen.h );
};
GAMEMODEL.readInput = function(inputobj)
{
    var keyused = false;
    var keyids = GAMECONTROL.keyIDs;    


    return keyused;
};

GAMEMODEL.startGame = function()
{
	console.log("start!");
	
    this.modelMode = "GAME_SESSION";


    if(this.gameSession instanceof SessionActor)   
    {
        this.gameSession.clear();
        delete this.gameSession;
    }

    this.gameSession = SessionActor.alloc();
	this.gameSession.start();

};
GAMEMODEL.endGame = function()
{
	this.gameSession.end();
};



GAMEMODEL.getTime = function()
{
    if(this.modelClock == null)		return 0;
    if(this.modelMode == "GAME_SESSION" && this.gameSession instanceof SessionActor)
    {
        if(this.gameSession.gameClock instanceof FrameClock)
        {
            return this.gameSession.gameClock.elapsedMS();
        }
    }
    return GAMEMODEL.modelClock.elapsedMS();
};
