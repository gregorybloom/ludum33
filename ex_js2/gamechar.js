
function GameChar() {
}
GameChar.prototype = new CharActor;
GameChar.prototype.identity = function() {
	return ('GameChar (' +this._dom.id+ ')');
};

GameChar.prototype.init = function() {
	CharActor.prototype.init.call(this);
	
	this.updatePosition(0,0);
		
	this.sizeW = 40;
	this.sizeH = 40;
	
	
	this.headingH = 0;
	this.headingV = 0;

        this.lastHeading = 0;
        this.currentHeading = 0;
        
	this.spd = 0.25;
        
        this.actionMode = "MODE_STILL";
	
	this.animator = AnimationModule.alloc();
	this.animator.target = this;
	this.animator.drawCollection = 3;
	this.animator.changeToAnimation(0, true);
};

GameChar.prototype.update = function() {
	CharActor.prototype.update.call(this);

	this.updateCurrentMode();
	this.updateCurrentAnimation();

	if(this.currentHeading >= 0)    this.lastHeading = this.currentHeading;
	this.currentHeading = -1;

	if( this.headingH > 0 )
	{
		var move = this.ticksDiff * this.spd;
		this.shiftPosition( move, 0 );
                this.currentHeading = 1;
	}
	if( this.headingH < 0 )
	{
		var move = this.ticksDiff * this.spd;
		this.shiftPosition( -move, 0 );
                this.currentHeading = 3;
	}
	
	
	if( this.headingV > 0)
	{
		var move = this.ticksDiff * this.spd;
		this.shiftPosition( 0, move );
                if(this.currentHeading < 0)    this.currentHeading = 2;

	}
	if( this.headingV < 0)
	{
		var move = this.ticksDiff * this.spd;
		this.shiftPosition( 0, -move );
                if(this.currentHeading < 0)    this.currentHeading = 0;
	}
        
//    console.log(  this.posX + ' + ' + this.posY );
        

};

CharActor.prototype.updateCurrentMode = function() {

	if(this.headingH == 0 && this.headingV == 0)	this.actionMode = "MODE_STILL";
    else											this.actionMode = "MODE_MOVING";

	if(this.currentHeading >= 0)    this.lastHeading = this.currentHeading;

    this.currentHeading = -1;
    if(this.headingH == 0 && this.headingV < 0)		this.currentHeading = 0;
    if(this.headingH > 0)							this.currentHeading = 1;
    if(this.headingH == 0 && this.headingV > 0)		this.currentHeading = 2;
    if(this.headingH < 0)							this.currentHeading = 3;
};
CharActor.prototype.updateCurrentAnimation = function() {
        
	if(this.actionMode == "MODE_MOVING")
	{
		if(this.animator != null)	this.animator.changeToAnimation(this.lastHeading+4,true);
	}
	else if(this.actionMode == "MODE_STILL")
	{
		if(this.animator != null)	this.animator.changeToAnimation(this.lastHeading);
	}

};



GameChar.prototype.draw = function() {

	CharActor.prototype.draw.call(this);
	GAMEVIEW.drawBox( {x:this.posX,y:this.posY}, {w:this.sizeW,h:this.sizeH}, true );

	if(this.animator != null)	this.animator.draw();

/*	GAMEVIEW.drawModifiers.color = "#000000";
	GAMEVIEW.drawCircle({x:this.posX,y:this.posY}, Math.min(this.sizeW,this.sizeH)/4, false );
	GAMEVIEW.drawLine({x:this.posX,y:this.posY}, {x:this.posX,y:(this.posY-this.sizeH/2)});
/**/

	GAMEVIEW.clearDrawMods();
	GAMEVIEW.context.globalAlpha=1.0;	
	
};


GameChar.prototype.collideType = function(act) {
	return false;
};
GameChar.prototype.collideVs = function(act) {
	
};



GameChar.prototype.readInput = function(input)
{
	var used = false;
	var keyids = GAMECONTROL.keyIDs;
	
	if(keyids['KEY_ARROW_RIGHT'] == input.keyID)
	{
		used = true;
		if(input.keyPress == false)			this.headingH = 0;
		else								this.headingH = 1;
	}
	if(keyids['KEY_ARROW_LEFT'] == input.keyID)
	{
		used = true;
		if(input.keyPress == false)		this.headingH = 0;
		else							this.headingH = -1;
	}
	if(keyids['KEY_ARROW_UP'] == input.keyID)
	{
		used = true;
		if(input.keyPress == false)		this.headingV = 0;
		else							this.headingV = -1;
	}
	if(keyids['KEY_ARROW_DOWN'] == input.keyID)
	{
		used = true;
		if(input.keyPress == false)		this.headingV = 0;
		else							this.headingV = 1;
	}
	if(keyids['KEY_SPACEBAR'] == input.keyID)
	{
		used = true;
	}
	 
	return used;
};

GameChar.alloc = function() {
	var vc = new GameChar();
	vc.init();
	return vc;
}