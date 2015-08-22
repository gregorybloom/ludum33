
function GameBoard() {
}
GameBoard.prototype = new Actor;
GameBoard.prototype.identity = function() {
	return ('GameBoard (' +this._dom.id+ ')');
};

GameBoard.prototype.init = function() {
	Actor.prototype.init.call(this);
	
	this.updatePosition(0,0);
		
	this.sizeW = 40;
	this.sizeH = 40;
	
	this.radiusW = 390;
	this.radiusH = 290;
        
        this.actionMode = "MODE_STILL";
        
        this.started = false;
        this.startTime = 0;
        
/*	this.animator = AnimationModule.alloc();
	this.animator.target = this;
	this.animator.drawCollection = 3;
	this.animator.changeToAnimation(0, true);       /**/
};

GameBoard.prototype.start = function() {
        this.sizeW = this.radiusW*2;
        this.sizeH = this.radiusH*2;

        this.started = true;
        this.startTime = this.thisUpdateTicks;
};
GameBoard.prototype.update = function() {
	Actor.prototype.update.call(this);
        
        if(!this.started)               this.start();
	
};
GameBoard.prototype.updateCurrentMode = function() {
};




GameBoard.prototype.draw = function() {
	Actor.prototype.draw.call(this);

        GAMEVIEW.setWorldPt(this.posX,this.posY);
        GAMEVIEW.setWorldDim(this.radiusW*2,this.radiusH*2);


	GAMEVIEW.drawModifiers.color = "#333333";
	GAMEVIEW.drawModifiers.lineWidth = 4;

	GAMEVIEW.drawEllipses(GAMEVIEW.worldPt, GAMEVIEW.worldDim, false);


	var font = "bold 36pt Arial";
        var dt = this.thisUpdateTicks-this.startTime;
        dt = 0.3 -Math.floor(dt/300)/100;
        if(dt > 0)
        {
            GAMEVIEW.context.globalAlpha=dt;
        
            GAMEVIEW.drawModifiers.color = "#000000";
            GAMEVIEW.drawText(GAMEVIEW.worldPt, "SHOOT THEM OUT!", font, true, true);

            font = "26pt Arial";
            GAMEVIEW.worldPt.y+=130;
            GAMEVIEW.drawText(GAMEVIEW.worldPt, "Spacebar + Arrowkeys", font, true, true);
            GAMEVIEW.worldPt.y+=40;
//            GAMEVIEW.drawText(GAMEVIEW.worldPt, "Don't Leave The Circle", font, true, true);
        }

	GAMEVIEW.clearDrawMods();
	GAMEVIEW.context.globalAlpha=1.0;	
	
};

GameBoard.prototype.collide = function(act) {
	if(	this.collideType(act) != true )			return;
	this.collideVs(act);
};

GameBoard.prototype.collideType = function(act) {    
        if(act instanceof GameChar)         return true;
        if(act instanceof VibrateActor)     return true;
	return false;
};
GameBoard.prototype.collideVs = function(act) {	
    if(act instanceof GameChar)
    {
        var mx = act.posX - this.posX;
        var my = act.posY - this.posY;
        
        mx = mx/this.radiusW;
        my = my/this.radiusH;

        var d = Math.pow(mx,2) + Math.pow(my,2);
        if(d > 1)
        {
            act.health -= 0.25;
        }
    }
    if(act instanceof VibrateActor)
    {
        var mx = act.posX - this.posX;
        var my = act.posY - this.posY;
        
        mx = mx/this.radiusW;
        my = my/this.radiusH;

        var d = Math.pow(mx,2) + Math.pow(my,2);
        if(d > 1)
        {
            act.baseRadius -= 0.25;
        }
    }

};




GameBoard.alloc = function() {
	var vc = new GameBoard();
	vc.init();
	return vc;
}