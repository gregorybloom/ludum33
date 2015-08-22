



function OctActor() {
}
OctActor.prototype = new Actor;
OctActor.prototype.identity = function() {
	return ('OctActor (' +this._dom.id+ ')');
};
OctActor.prototype.init = function() {
	Actor.prototype.init.call(this);

	this.sizeW = 17;
	this.sizeH = 17;

	this.heading = {x:0,y:0};
	this.lastHeading = {x:0,y:0};
	
	this.direction = 0;
	this.heading = {x:0,y:0};
	this.lastHeading = {x:0,y:0};
	
	this.cooldown = GAMEMODEL.getTime();
	this.cooldur = 0;
	
	this.unitSpeed = 0.04;
	
	
	this.actionMode = "MODE_STILL";
	
	this.updatePosition();
	
	this.animateModule = AnimationModule.alloc();
	this.animateModule.target = this;
	this.animateModule.drawCollection = 0;
	this.animateModule.changeToAnimation(0, true);
	
//	this.moveModule = MovingActorModule.alloc();
//	this.moveModule.target = this;	
};
OctActor.prototype.draw = function() {
	this.drawSize = true;	
	Actor.prototype.draw.call(this);
};
OctActor.prototype.update = function() {
	Actor.prototype.update.call(this);
	
//	this.updateCurrentAnimation();
//	this.updateMode();
	
	if(this.moveModule != null)		this.moveModule.update();
	if(this.animateModule != null)	this.animateModule.update();
};

OctActor.prototype.collideType = function(act) {
	if(act instanceof CharActor)	return true;
	if(act instanceof OctActor)		return true;
	return false;
};
OctActor.prototype.collideVs = function(act) {
	if(act instanceof CharActor)
	{
		var interBox = this.intersection(act);
//		var interBox = GAMEGEOM.BoxIntersection(this.absBox, act.absBox);
		var push = {x:interBox.w,y:interBox.h};
		
		if(  Math.abs(push.x) >= Math.abs(push.y)  )	push.x = 0;
		else											push.y = 0;
		
		var interCenter = {x:0,y:0};
		interCenter.x = interBox.x + interBox.w/2;
		interCenter.y = interBox.y + interBox.h/2;
				
		if(interCenter.x > act.posX)		push.x = -push.x;
		if(interCenter.y > act.posY)		push.y = -push.y;
		
		var balance = {x:0.5,y:-0.5};
		
		act.shiftPosition( balance.x*push.x, balance.x*push.y );
		this.shiftPosition( balance.y*push.x, balance.y*push.y );	
	}
	else if(act instanceof OctActor)
	{
		var interBox = GAMEGEOM.BoxIntersection(this.absBox, act.absBox);
		var push = {x:interBox.w,y:interBox.h};
		
		var interCenter = {x:0,y:0};
		interCenter.x = interBox.x + interBox.w/2;
		interCenter.y = interBox.y + interBox.h/2;

		var thisCenter = {x:0,y:0};
		thisCenter.x = this.absBox.x + this.absBox.w/2;
		thisCenter.y = this.absBox.y + this.absBox.h/2;

		var collisionDir = 0;
		if(  Math.abs(push.x) >= Math.abs(push.y)  )
		{
			if(interCenter.y < thisCenter.y)		collisionDir = 0;
			else									collisionDir = 2;
		}
		else
		{
			if(interCenter.x < thisCenter.x)		collisionDir = 3;
			else									collisionDir = 1;
		}
		
		if((collisionDir%2) == 0)	push.x = 0;
		else						push.y = 0;
		
		
		var actCenter = {x:0,y:0};
		actCenter.x = act.absBox.x + act.absBox.w/2;
		actCenter.y = act.absBox.y + act.absBox.h/2;
		
		if(interCenter.x > actCenter.x)		push.x = -push.x;
		if(interCenter.y > actCenter.y)		push.y = -push.y;
		
		var balance = {x:0.5,y:-0.5};
		
		act.shiftPosition( {x:balance.x*push.x,y:balance.x*push.y} );
		this.shiftPosition( {x:balance.y*push.x,y:balance.y*push.y} );
		

		collisionDir = (collisionDir+2)%4;
		if(this.actionMode === "MODE_STILL" || this.actionMode === "MODE_MOVING")	
		{
			this.decideOnMove(collisionDir);
		}
		collisionDir = (collisionDir+2)%4;
		if(act.actionMode === "MODE_STILL" || act.actionMode === "MODE_MOVING")	
		{
			act.decideOnMove(collisionDir);
		}
	}
};



OctActor.prototype.updateCurrentAnimation = function() {
	if(this.animateModule == null)	return;
	if(this.lastHeading.x == 0 && this.lastHeading.y == 0)	return;
	
	var dir = -1;
	if(Math.abs(this.lastHeading.x)>=Math.abs(this.lastHeading.y) && this.lastHeading.x>0.0)	dir = 1;
	if(Math.abs(this.lastHeading.x)>=Math.abs(this.lastHeading.y) && this.lastHeading.x<0.0)	dir = 3;
	if(Math.abs(this.lastHeading.x)<Math.abs(this.lastHeading.y) && this.lastHeading.y>0.0)		dir = 2;
	if(Math.abs(this.lastHeading.x)<Math.abs(this.lastHeading.y) && this.lastHeading.y<0.0)		dir = 0;
	if(dir < 0)		return;
	
	if(this.actionMode == "MODE_MOVING")
	{
		this.animateModule.changeToAnimation(dir+4,true);
	}
	else if(this.actionMode == "MODE_STILL")
	{
		this.animateModule.changeToAnimation(dir);
	}
	else if(this.actionMode == "MODE_FLINCH")
	{
		this.animateModule.changeToAnimation(dir);
	}
	else if(this.actionMode == "MODE_ATTACKING")
	{
		this.animateModule.changeToAnimation(dir+8);
	}	
};
OctActor.prototype.updateMode = function() {
	var timeLeft = this.cooldown + this.cooldur - GAMEMODEL.getTime();
	if(timeLeft <= 0 && this.actionMode == "MODE_ATTACKING")		this.shoot();
	
	if(timeLeft <= 0)		this.decideAction();
};
OctActor.prototype.decideAction = function() {
	if(this.moveModule != null)		this.moveModule.eraseMovingScripts();
	
	var randSeed = Math.random();
	var randDir = Math.random()*4;

	randDir = Math.floor(randDir);
	if(randDir >= 4)	randDir = 3;
	
//	this.decideOnWait(randDir);
	
	if(this.actionMode == "MODE_STILL")
	{
		if(randSeed < 0.25)		this.decideOnWait(randDir);
		else					this.decideOnMove(randDir);
	}
	else if(this.actionMode == "MODE_MOVING")
	{
		if(randSeed < 0.65)		this.decideOnWait(randDir);
		else					this.decideOnMove(randDir);
	}	/**/	
	
	
//		console.log(this.actionMode + " " +this.direction);
};

OctActor.prototype.decideOnWait = function(dir) {
	var period = 120*Math.random()+60;
	period = period*10*3;
	
	this.cooldown = GAMEMODEL.getTime();
	this.cooldur = period+1;
	
	this.actionMode = "MODE_STILL";
	
	this.direction = dir;
	if(this.direction == 0)			this.heading = {x:0, y:-1};
	else if(this.direction == 1)	this.heading = {x:1, y:0};
	else if(this.direction == 2)	this.heading = {x:0, y:1};
	else if(this.direction == 3)	this.heading = {x:-1, y:0};
	this.lastHeading.x = this.heading.x;
	this.lastHeading.y = this.heading.y;
	this.heading = {x:0,y:0};
};
OctActor.prototype.decideOnMove = function(dir) {

	var period = 60*Math.random()+60;
	period = period*10*3;
	
	this.cooldown = GAMEMODEL.getTime();
	this.cooldur = period+1;
	
	this.actionMode = "MODE_MOVING";
	
	this.direction = dir;
	if(dir == 0)		this.heading = {x:0, y:-1};
	else if(dir == 1)	this.heading = {x:1, y:0};
	else if(dir == 2)	this.heading = {x:0, y:1};
	else if(dir == 3)	this.heading = {x:-1, y:0};
	this.lastHeading.x = this.heading.x;
	this.lastHeading.y = this.heading.y;
	
	
	var inc = IncrementBySpeed.alloc();	inc.spdPerTick = this.unitSpeed;
	var head = HeadingByVector.alloc();	head.setHeadingByVector(this.heading, period*this.unitSpeed);
	var durt = DurationByTime.alloc();	durt.duration = this.cooldur;
	var lprog = LinearProgress.alloc();
	var lpath = LinearPath.alloc();

	var move = MoveActor.alloc();
	move.movingActor = this;
	move.increment = inc;
	move.heading = head;
	move.duration = durt;
	move.progress = lprog;
	move.path = lpath;
	
	this.moveModule.moveScriptSet[0] = move;
};


OctActor.alloc = function() {
	var vc = new OctActor();
	vc.init();
	return vc;
};
