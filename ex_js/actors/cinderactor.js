



function CinderActor() {
}
CinderActor.prototype = new Actor;
CinderActor.prototype.identity = function() {
	return ('CinderActor ()');
};
CinderActor.prototype.init = function() {
	Actor.prototype.init.call(this);

	this.size = {w:110,h:25};
	this.position = {x:0,y:0};

	this.heading = {x:0,y:0};
	this.lastHeading = {x:0,y:0};
	
	this.direction = 0;
	this.heading = {x:0,y:0};
	this.lastHeading = {x:0,y:0};
	
	this.dmgLevel = 0;
	this.damage = 0;

	this.actionMode = "MODE_STILL";
	
	this.updatePosition();
	
	this.carLook = 0;

	this.animateModule = AnimationModule.alloc();
	this.animateModule.target = this;
	this.animateModule.drawCollection = 11;
	this.animateModule.changeToAnimation(1, true);
	this.animateModule.drawShift = {x:0,y:30};
	
	this.moveModule = MovingActorModule.alloc();
	this.moveModule.target = this;	
};

CinderActor.prototype.draw = function() {
	Actor.prototype.draw.call(this);

	if(GAMEVIEW.BoxIsInCamera(this.absBox)) {
//		GAMEVIEW.drawBox(this.absBox,"#ff0000");
	}

//	GAMEVIEW.drawText(this.absPosition, lvl, "18px Arial","#ffffff");

/*	if(GAMEVIEW.BoxIsInCamera(this.absBox)) {
		GAMEVIEW.drawBox(this.absBox);
	} else {
		GAMEVIEW.drawCircle(this.absPosition,100);		
	}	/**/
};
CinderActor.prototype.update = function() {

	Actor.prototype.update.call(this);
		
	if(this.moveModule != null)		this.moveModule.update();
	if(this.animateModule != null)	this.animateModule.update();
};

CinderActor.prototype.collideType = function(act) {
	if(act instanceof CharActor)		return true;
	if(act instanceof CinderActor)		return true;
	if(act instanceof BlockActor)		return true;
	return false;
};
CinderActor.prototype.collideVs = function(act) {
	if(act instanceof CharActor)
	{
		var interBox = GAMEGEOM.BoxIntersection(this.absBox, act.absBox);
		var push = {x:interBox.w,y:interBox.h};

		push.y=0;
		
		var interCenter = {x:0,y:0};
		interCenter.x = interBox.x + interBox.w/2;
		interCenter.y = interBox.y + interBox.h/2;
		
		var actCenter = {x:0,y:0};
		actCenter.x = act.absBox.x + act.absBox.w/2;
		actCenter.y = act.absBox.y + act.absBox.h/2;
		
		if(interCenter.x > actCenter.x)		push.x = -push.x;
		if(interCenter.y > actCenter.y)		push.y = -push.y;
		
		var r = (interBox.w*interBox.h)/(this.size.w * this.size.h);
//		console.log(r+' = '+interBox.w+'-'+interBox.h+'/'+act.size.w+'-'+act.size.h);
//		console.log(act.position.x+'-'+act.position.y);
		if(r > 0.25) {
//			console.log(act.lane+'/'+act.lastLane);
			act.lane = act.lastLane;
//			console.log(act.lane+'/'+act.lastLane);
			act.updateLane();
			act.updatePosition();
//			console.log(act.position.x+'-'+act.position.y);
			return;
		}

		var balance = {x:1,y:0};
		
		act.shiftPosition( {x:balance.x*push.x,y:balance.x*push.y} );
		this.shiftPosition( {x:balance.y*push.x,y:balance.y*push.y} );
	}
	else if(act instanceof CinderActor || act instanceof BlockActor)
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

CinderActor.alloc = function() {
	var vc = new CinderActor();
	vc.init();
	return vc;
};
