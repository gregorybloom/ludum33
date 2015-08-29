



function BlockActor() {
}
BlockActor.prototype = new Actor;
BlockActor.prototype.identity = function() {
	return ('BlockActor ()');
};
BlockActor.prototype.init = function() {
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
	this.animateModule.drawCollection = 30;
	this.animateModule.drawShift = {x:0,y:30};
	
	this.moveModule = MovingActorModule.alloc();
	this.moveModule.target = this;	
};

BlockActor.prototype.draw = function() {
	Actor.prototype.draw.call(this);

	if(GAMEVIEW.BoxIsInCamera(this.absBox)) {
//		console.log('draw '+this.ranID+ ' box ' + JSON.stringify(this.absBox) );
//		GAMEVIEW.drawBox(this.absBox,"#000066");
	}

//	GAMEVIEW.drawText(this.absPosition, this.ranID, "18px Arial","#ffffff");

/*	if(GAMEVIEW.BoxIsInCamera(this.absBox)) {
		GAMEVIEW.drawBox(this.absBox);
	} else {
		GAMEVIEW.drawCircle(this.absPosition,100);		
	}	/**/
};
BlockActor.prototype.update = function() {
	this.animateModule.changeToAnimation( this.carLook*3+this.dmgLevel );

	Actor.prototype.update.call(this);
		
	if(this.moveModule != null)		this.moveModule.update();
	if(this.animateModule != null)	this.animateModule.update();
};
BlockActor.prototype.collide = function(act) {
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

BlockActor.prototype.collideType = function(act) {
	if(act instanceof CharActor)		return true;
	if(act instanceof CinderActor)		return true;
	if(act instanceof BlockActor)		return true;
	return false;
};
BlockActor.prototype.collideVs = function(act) {
	if(act instanceof CharActor)
	{
		var interBox = GAMEGEOM.BoxIntersection(this.absBox, act.absBox);
		var push = {x:interBox.w,y:interBox.h};

		this.damage += (act.speed/2)*(this.ticksDiff *act.speedLevel[act.speed-1])/this.size.w;
		if(this.damage > 5.5 && this.dmgLevel < 2)		act.carsCrushed+=1;

		if(this.damage > 5.5)		this.dmgLevel = 2;
		else if(this.damage > 3)	this.dmgLevel = 1;
//		else						console.log('ranID '+this.ranID+' '+this.alive+' '+this.position.x+' int '+interBox.x);

		var interBox = GAMEGEOM.BoxIntersection(this.absBox, act.absBox);
		var push = {x:0,y:0};
		var spd = 0.05 + 0.04*Math.random()*act.speed;

		push.x = act.ticksDiff*spd;
		push.x=0;
		act.position.x -= push.x;
		act.updatePosition();
		/*
//		if(  Math.abs(push.x) >= Math.abs(push.y)  )	push.x = 0;
//		else											push.y = 0;
		push.y=0;
		
		var interCenter = {x:0,y:0};
		interCenter.x = interBox.x + interBox.w/2;
		interCenter.y = interBox.y + interBox.h/2;
		
		var actCenter = {x:0,y:0};
		actCenter.x = act.absBox.x + act.absBox.w/2;
		actCenter.y = act.absBox.y + act.absBox.h/2;
		
		if(interCenter.x > actCenter.x)		push.x = -push.x;
		if(interCenter.y > actCenter.y)		push.y = -push.y;
		
		var r = (interBox.w*interBox.h)/(act.size.w * act.size.h);
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

		var balance = {x:0.5,y:-0.5};
		
		act.shiftPosition( {x:balance.x*push.x,y:balance.x*push.y} );
		this.shiftPosition( {x:balance.y*push.x,y:balance.y*push.y} );

		if(act.actionMode == "MODE_MOVING") {
			var pushing=false;
//			if((act.heading.x < 0) && (act.facing.x < 0) && (balance.y*push.x) < 0)	pushing=true;
//			if((act.heading.y < 0) && (act.facing.y < 0) && (balance.y*push.y) < 0)	pushing=true;
//			if((act.heading.x > 0) && (act.facing.x > 0) && (balance.y*push.x) > 0)	pushing=true;
//			if((act.heading.y > 0) && (act.facing.y > 0) && (balance.y*push.y) > 0)	pushing=true;
			if(balance.y*push.x < 0)		pushing=true;
			if(pushing && GAMEVIEW.BoxIsInCamera(act.absBox)) {
				act.playSound(3,0.4,1);
			}
		}		/**/
	}
	else if(act instanceof BlockActor || act instanceof CinderActor)
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

BlockActor.alloc = function() {
	var vc = new BlockActor();
	vc.init();
	return vc;
};
