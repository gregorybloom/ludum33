



function CharActor() {
}
CharActor.prototype = new Actor;
CharActor.prototype.identity = function() {
	return ('CharActor ()');
};
CharActor.prototype.init = function() {
	Actor.prototype.init.call(this);

	this.size = {w:155,h:45};
	this.position = {x:0,y:0};

	this.falling = false;
	this.baseOffset = {x:0.5,y:0.30};
	this.actionMode = "MODE_STILL";

	this.speed = 2;
	this.lane = 2;
	this.lastLane = 2;
	this.speedLevel = [0.25,0.34,0.42];

	this.carsCrushed = 0;

	this.drawShift = {x:0,y:0};
/*
	this.heading = {x:0,y:0};
	this.lastHeading = {x:0,y:0};
	this.flatFacing = 0;
	this.facing = {x:0,y:-1};
	this.unitSpeed = 0.16;
	this.ticksDiff = 0;
	this.dirTimeOut = 40;

	this.keyTimeList = [];
	for(var i=0; i<4; i++)	this.keyTimeList[i] = GAMEMODEL.gameClock.elapsedMS();
	/**/
	this.updatePosition();
	
	this.animateModule = AnimationModule.alloc();
	this.animateModule.target = this;
	this.animateModule.drawCollection = 10;
	this.animateModule.changeToAnimation(0, true);


	this.tire1 = TiresActor.alloc();
	this.tire1.parent = this;
	this.tire1.updatePosition({x:-62,y:25});
	this.tire2 = TiresActor.alloc();
	this.tire2.parent = this;
	this.tire2.updatePosition({x:62,y:25});
};
CharActor.prototype.draw = function() {

	this.animateModule.drawShift = this.drawShift;
	Actor.prototype.draw.call(this);

	if(this.actionMode === "MODE_MOVING")
	{
//		GAMEVIEW.drawBox(this.absBox);
	}
	else if(this.actionMode === "MODE_STILL")
	{
//		GAMEVIEW.drawBox(this.absBox,"#0000ff");
	}

	var camera = GAMEMODEL.gameCamera;
	var camshift = camera.getCameraShift();
	var shift = {x:(camshift.x+50),y:(camshift.y+150)};
	GAMEVIEW.drawText(shift, ('Cars crushed: '+this.carsCrushed), "20px Arial","#000000");


	if(this.tire1 instanceof Actor)		this.tire1.updatePosition(this.tire1.position);
	if(this.tire2 instanceof Actor)		this.tire2.updatePosition(this.tire2.position);
	if(this.tire1 instanceof Actor)		this.tire1.draw();
	if(this.tire2 instanceof Actor)		this.tire2.draw();
};
CharActor.prototype.update = function() {
	this.drawShift.x=0;
	this.drawShift.y=0;
	if(this.tire1 instanceof Actor)		this.tire1.drawShift.y=0;
	if(this.tire2 instanceof Actor)		this.tire2.drawShift.y=0;

	Actor.prototype.update.call(this);
	
	this.updateCurrentMode();
//	this.updateCurrentAnimation();
	
	if(this.actionMode === "MODE_MOVING")
	{
		var curSpeed = this.speedLevel[ this.speed-1 ];
		var newPos = {x:0,y:0};

		this.position.x += curSpeed*this.ticksDiff;
		this.updateLane();

		if(this.tire1 instanceof Actor)		this.tire1.animateModule.animates = true;
		if(this.tire2 instanceof Actor)		this.tire2.animateModule.animates = true;
	}
	else if(this.actionMode === "MODE_STILL") {
		if(this.tire1 instanceof Actor)		this.tire1.animateModule.animates = false;
		if(this.tire2 instanceof Actor)		this.tire2.animateModule.animates = false;
	}

		var curtime = GAMEMODEL.gameClock.elapsedMS();

	if(this.animateModule != null)	this.animateModule.update();

	if(this.tire1 instanceof Actor)		this.tire1.update();
	if(this.tire2 instanceof Actor)		this.tire2.update();

};
CharActor.prototype.updateCurrentMode = function() {

	if(this.alive)		this.actionMode = "MODE_MOVING";
	else 				this.actionMode = "MODE_STILL";

	var newsound=-1;
	if(this.speed==1)		newsound=9;		
	if(this.speed==2)		newsound=8;		
	if(this.speed==3)		newsound=5;
	for(var i=0;i<10;i++) {
		if(typeof this.playingSounds[i] !== "undefined")		return;
	}
//	console.log('playing '+newsound);
	if(newsound>=0 && newsound!=5)		this.playSound(newsound,0.1,1);
	if(newsound>=0 && newsound==5)		this.playSound(newsound,0.03,1);
};
CharActor.prototype.updateCurrentAnimation = function() {

};
CharActor.prototype.updateLane = function() {
	this.position.y = GAMEMODEL.gameSession.gameWorld.laneLevel[ this.lane-1 ] + GAMEMODEL.gameSession.gameWorld.baseLaneY;
	this.updatePosition();
};
CharActor.prototype.changeSound = function(num) {
	var newsound=-1;
	if(this.speed==2 && num==3)			newsound=0;
	else if(this.speed==1 && num==2)	newsound=1;
	else if(this.speed==2 && num==1)	newsound=9;
	else if(this.speed!=2 && num==2)	newsound=2;
	else 								return;
	for(var i=0; i<10;i++) {
		if(i!=newsound && typeof this.playingSounds[i] !== "undefined") {
//			console.log('this '+this.speed+' num '+num+' i '+i +' newsound '+newsound);
			if(this.playingSounds[i].source)		this.playingSounds[i].source.stop();
			delete this.playingSounds[i];
		}
	}	
};
CharActor.prototype.collide = function(act) {
	Actor.prototype.collide.call(this,act);

//	if(this.tire1 instanceof Actor)		this.tire1.collide(act);
//	if(this.tire2 instanceof Actor)		this.tire2.collide(act);
};
CharActor.prototype.collideType = function(act) {
	if(act instanceof BlockActor)		return true;
	return false;
};
CharActor.prototype.collideVs = function(act) {
	if(act instanceof BlockActor)
	{
		var interBox = GAMEGEOM.BoxIntersection(this.absBox, act.absBox);
		var interCenter = {x:0,y:0};
		interCenter.x = interBox.x + interBox.w/2;
		interCenter.y = interBox.y + interBox.h/2;
		
		var actCenter = {x:0,y:0};
		actCenter.x = act.absBox.x + act.absBox.w/2;
		actCenter.y = act.absBox.y + act.absBox.h/2;

		var dy = this.absPosition.x - act.absPosition.x;
		if(dy < ((-act.size.w)/2) )			dy=-3;
		else if(dy < ((-act.size.w)/3) )	dy=-6;
		else if(dy < 0 )					dy=-9;
		else if(dy < (act.size.w/2) )		dy=-9;
		else if(dy < ((2*act.size.w)/3) )	dy=-6;
		else								dy=-3;

//		if(  Math.abs(push.x) >= Math.abs(push.y)  )	push.x = 0;
//		else											push.y = 0;
		this.drawShift.y=dy;		
		if(this.tire1 instanceof Actor)		this.tire1.drawShift.y=dy;
		if(this.tire2 instanceof Actor)		this.tire2.drawShift.y=dy;
		
	}
};
CharActor.prototype.readInput = function(inputobj)
{
	var keyused = false;
	var keyids = GAMECONTROL.keyIDs;

	if(keyids['KEY_ARROW_UP'] == inputobj.keyID || keyids['KEY_W'] == inputobj.keyID)
	{
		keyused = true;
		if(this.lane == 1)		return keyused;
		if(inputobj.keypress == false)			this.lastLane=this.lane;
		if(inputobj.keypress == false)			this.lane-=1;
	}
	if(keyids['KEY_ARROW_DOWN'] == inputobj.keyID || keyids['KEY_S'] == inputobj.keyID)
	{
		keyused = true;
		if(this.lane == 3)		return keyused;
		if(inputobj.keypress == false)			this.lastLane=this.lane;
		if(inputobj.keypress == false)			this.lane+=1;
	}

	if(keyids['KEY_ARROW_RIGHT'] == inputobj.keyID || keyids['KEY_D'] == inputobj.keyID)
	{
		keyused = true;
		if(inputobj.keypress == true)		this.changeSound(3);
		else 								this.changeSound(2);
		if(inputobj.keypress == true)		this.speed = 3;
		else 								this.speed = 2;
	}
	if(keyids['KEY_ARROW_LEFT'] == inputobj.keyID || keyids['KEY_A'] == inputobj.keyID)
	{
		keyused = true;
		if(inputobj.keypress == true)		this.changeSound(1);
		else 								this.changeSound(2);
		if(inputobj.keypress == true)		this.speed = 1;
		else 								this.speed = 2;
	}
	return keyused;
};

CharActor.alloc = function() {
	var vc = new CharActor();
	vc.init();
	return vc;
};

