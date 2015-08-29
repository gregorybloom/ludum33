



function TiresActor() {
}
TiresActor.prototype = new Actor;
TiresActor.prototype.identity = function() {
	return ('TiresActor ()');
};
TiresActor.prototype.init = function() {
	Actor.prototype.init.call(this);

	this.radius=30;
	this.size = {w:(this.radius*2),h:(this.radius*2)};
	this.position = {x:0,y:0};


	this.parent=null;
	
	this.actionMode = "MODE_STILL";
	this.drawShift={x:0,y:0};

	this.updatePosition();
	
	this.animateModule = AnimationModule.alloc();
	this.animateModule.target = this;
	this.animateModule.drawCollection = 10;
	this.animateModule.changeToAnimation(1, true);
//	this.animateModule.animates = true;
	
	this.moveModule = MovingActorModule.alloc();
	this.moveModule.target = this;	
};

TiresActor.prototype.draw = function() {
	this.animateModule.drawShift = this.drawShift;
	Actor.prototype.draw.call(this);

	var lvl = 0;

	if(GAMEVIEW.BoxIsInCamera(this.absBox)) {
//		GAMEVIEW.drawCircle(this.absPosition,this.radius);
//		GAMEVIEW.drawText(this.absPosition, this.animateModule.currentFrame, "18px Arial","#ffffff");
	}
};
TiresActor.prototype.update = function() {

	if(this.animateModule.currentSequence!=this.parent.speed)	this.animateModule.changeToAnimation(this.parent.speed, true);
	Actor.prototype.update.call(this);
	
//	var newPos = {x:0,y:0};
//	newPos.x = this.position.x + this.heading.x*this.unitSpeed*this.ticksDiff;
//	newPos.y = this.position.y + this.heading.y*this.unitSpeed*this.ticksDiff;
//	this.updatePosition(newPos);
	
 	if(this.moveModule != null)		this.moveModule.update();
	if(this.animateModule != null)	this.animateModule.update();
};

TiresActor.prototype.collideType = function(act) {
	if(act == this.parent)		return false;
	if(act instanceof CharActor)	return true;
	return false;
};
TiresActor.prototype.collideVs = function(act) {
	if(act instanceof CharActor)
	{
	}
};



TiresActor.prototype.updateCurrentAnimation = function() {
	if(this.animateModule == null)	return;
	if(this.lastHeading.x == 0 && this.lastHeading.y == 0)	return;
	

};
TiresActor.prototype.updateMode = function() {
};


TiresActor.alloc = function() {
	var vc = new TiresActor();
	vc.init();
	return vc;
};
