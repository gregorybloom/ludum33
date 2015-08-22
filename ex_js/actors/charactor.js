



function CharActor() {
}
CharActor.prototype = new Actor;
CharActor.prototype.identity = function() {
	return ('CharActor (' +this._dom.id+ ')');
};
CharActor.prototype.init = function() {
	Actor.prototype.init.call(this);

	this.size = {w:22,h:22};

	this.position = {x:0,y:0};


	this.baseOffset = {x:0.5,y:0.35};
	this.actionMode = "MODE_STILL";
	
	this.heading = {x:0,y:0};
	this.lastHeading = {x:0,y:0};
	this.flatFacing = 0;
	this.facing = {x:0,y:-1};
	this.unitSpeed = 0.08;
	this.ticksDiff = 0;
	this.dirTimeOut = 40;

	this.keyTimeList = [];
	for(var i=0; i<4; i++)	this.keyTimeList[i] = GAMEMODEL.gameClock.elapsedMS();

	this.updatePosition();
	
	this.animateModule = AnimationModule.alloc();
	this.animateModule.target = this;
	this.animateModule.drawCollection = 3;
	this.animateModule.changeToAnimation(0, true);
};
CharActor.prototype.update = function() {
	Actor.prototype.update.call(this);
	
	this.updateCurrentMode();
	this.updateCurrentAnimation();
	
	if(this.actionMode === "MODE_MOVING")
	{
		var newPos = {x:0,y:0};
		newPos.x = this.position.x + this.heading.x*this.unitSpeed*this.ticksDiff;
		newPos.y = this.position.y + this.heading.y*this.unitSpeed*this.ticksDiff;
		this.updatePosition(newPos);
	}
		var curtime = GAMEMODEL.gameClock.elapsedMS();
	if(this.heading.y == 0 && this.heading.x != 0)
	{
		if(this.keyTimeList[0]+this.dirTimeOut < curtime)
		{
			if(this.keyTimeList[2]+this.dirTimeOut < curtime)	this.lastHeading.y = 0;
		}
	}
	if(this.heading.x == 0 && this.heading.y != 0)
	{
		if(this.keyTimeList[1]+this.dirTimeOut < curtime)
		{
			if(this.keyTimeList[3]+this.dirTimeOut < curtime)	this.lastHeading.x = 0;
		}
	}
	
	
	if(this.animateModule != null)	this.animateModule.update();
};
CharActor.prototype.updateCurrentMode = function() {
	if(  !(this.lastHeading.x==0 && this.lastHeading.y==0)  )
	{
		this.facing.x = this.lastHeading.x;
		this.facing.y = this.lastHeading.y;
	}
	if( Math.abs(this.facing.x)>=Math.abs(this.facing.y) && this.facing.x>0 )	this.flatFacing =1;
	else if( Math.abs(this.facing.x)>=Math.abs(this.facing.y) && this.facing.x<0 ) this.flatFacing =3;
	else if( Math.abs(this.facing.x)<Math.abs(this.facing.y) && this.facing.y>0 ) this.flatFacing =2;
	else if( Math.abs(this.facing.x)<Math.abs(this.facing.y) && this.facing.y<0 ) this.flatFacing =0;
	
	if(this.actionMode == "MODE_STILL" || this.actionMode == "MODE_MOVING")
	{
		if(this.heading.x == 0 && this.heading.y == 0)	this.actionMode = "MODE_STILL";
		if(this.heading.x != 0 || this.heading.y != 0)	this.actionMode = "MODE_MOVING";
	}
};
CharActor.prototype.updateCurrentAnimation = function() {
	if(this.lastHeading.x == 0 && this.lastHeading.y == 0)	return;
	if(this.actionMode == "MODE_MOVING")
	{
		if(this.animateModule != null)	this.animateModule.changeToAnimation(this.flatFacing+4,true);
	}
	else if(this.actionMode == "MODE_STILL")
	{
		if(this.animateModule != null)	this.animateModule.changeToAnimation(this.flatFacing);
	}

};



CharActor.prototype.readInput = function(inputobj)
{
	var keyused = false;
	var keyids = GAMECONTROL.keyIDs;

	if(keyids['KEY_ARROW_UP'] == inputobj.keyID || keyids['KEY_W'] == inputobj.keyID)
	{
		keyused = true;
		if(inputobj.keypress == false)
		{
			this.heading.y = 0;
			this.keyTimeList[0] = GAMEMODEL.gameClock.elapsedMS();
		}
		if(inputobj.keypress == true)
		{
			this.heading.y = -1;
			this.lastHeading.y = this.heading.y;
		}
	}
	if(keyids['KEY_ARROW_DOWN'] == inputobj.keyID || keyids['KEY_S'] == inputobj.keyID)
	{
		keyused = true;
		if(inputobj.keypress == false)
		{
			this.heading.y = 0;
			this.keyTimeList[2] = GAMEMODEL.gameClock.elapsedMS();
		}
		if(inputobj.keypress == true)
		{
			this.heading.y = 1;
			this.lastHeading.y = this.heading.y;
		}
	}
	if(keyids['KEY_ARROW_RIGHT'] == inputobj.keyID || keyids['KEY_D'] == inputobj.keyID)
	{
		keyused = true;
		if(inputobj.keypress == false)
		{
			this.heading.x = 0;
			this.keyTimeList[1] = GAMEMODEL.gameClock.elapsedMS();
		}
		if(inputobj.keypress == true)
		{
			this.heading.x = 1;
			this.lastHeading.x = this.heading.x;
		}
	}
	if(keyids['KEY_ARROW_LEFT'] == inputobj.keyID || keyids['KEY_A'] == inputobj.keyID)
	{
		keyused = true;
		if(inputobj.keypress == false)
		{
			this.heading.x = 0;
			this.keyTimeList[3] = GAMEMODEL.gameClock.elapsedMS();
		}
		if(inputobj.keypress == true)
		{
			this.heading.x = -1;
			this.lastHeading.x = this.heading.x;
		}
	}
	return keyused;
};

CharActor.alloc = function() {
	var vc = new CharActor();
	vc.init();
	return vc;
};

