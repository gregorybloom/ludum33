



function OilActor() {
}
OilActor.prototype = new Actor;
OilActor.prototype.identity = function() {
	return ('OilActor ()');
};
OilActor.prototype.init = function() {
	Actor.prototype.init.call(this);

	this.position = {x:0,y:0};

	this.drops = 3;
	this.radius = 20;
	this.space = 30;
	this.size = {w:(this.radius*2+(this.space*(this.drops-1))),h:(this.radius*2-10)};
	this.yshift = 50;

	this.unitSpeed = 0.04;
	
	
	this.actionMode = "MODE_STILL";
	
	this.updatePosition();

	this.animateModule = AnimationModule.alloc();
	this.animateModule.target = this;
	this.animateModule.drawCollection = 11;
	this.animateModule.changeToAnimation(2, true);
	this.animateModule.drawShift = {x:0,y:60};
	
	this.moveModule = MovingActorModule.alloc();
	this.moveModule.target = this;			/**/
};

OilActor.prototype.draw = function() {
	Actor.prototype.draw.call(this);

//	GAMEVIEW.drawText(this.absPosition, lvl, "18px Arial","#ffffff");
	if(GAMEVIEW.BoxIsInCamera(this.absBox)) {
//		GAMEVIEW.drawBox(this.absBox,"#00ff00");
	}
};
OilActor.prototype.update = function() {
	Actor.prototype.update.call(this);
	

};
OilActor.prototype.collide = function(act) {
	if(typeof act === "undefined")		return;
	if( !this.alive || !act.alive )				return;
	if(  this.collideType(act) != true  )							return;
	if(  GAMEGEOM.BoxIntersects(this.absBox, act.absBox)==true  )	
	{
		this.collideVs(act);
	}

	if(act instanceof CharActor) {
		if(act.tire1 instanceof Actor)		this.collide(act.tire1);
		if(act.tire2 instanceof Actor)		this.collide(act.tire2);
	}
};

OilActor.prototype.collideType = function(act) {
	if(act instanceof CharActor)	return true;
	if(act instanceof OilActor)	return true;
	return false;
};
OilActor.prototype.collideVs = function(act) {
	if(act instanceof CharActor)
	{
		var interBox = GAMEGEOM.BoxIntersection(this.absBox, act.absBox);
		var push = {x:0,y:0};
		var spd = 0.02 + 0.03*Math.random()*act.speed;

		push.x = act.ticksDiff*spd;
		act.position.x += push.x;
		act.updatePosition();
		
		
		if(act.actionMode == "MODE_MOVING") {
			if(GAMEVIEW.BoxIsInCamera(act.absBox)) {
//				act.playSound(3,0.4,1);
			}
		}
	}
	else if(act instanceof OilActor)
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
	}
};



OilActor.alloc = function() {
	var vc = new OilActor();
	vc.init();
	return vc;
};
