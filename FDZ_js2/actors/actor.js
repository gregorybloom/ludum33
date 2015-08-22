
function Actor() {
}

Actor.prototype.identity = function() {
	return ('Actor (?)');
};

Actor.prototype.init = function() {
        this.alive = true;

	this.posX = 0;
	this.posY = 0;
	
	this.sizeW = 0;
	this.sizeH = 0;
	
	this.animator = null;
	this.actionMode = '';
        
	this.lastUpdateTicks = GAMEMODEL.getTime();
	this.thisUpdateTicks = GAMEMODEL.getTime();
	this.ticksDiff = 0;
        
    this.drawSize = false;
};
Actor.prototype.clear = function() {
    if(this.animator != null)   delete this.animator;
    this.animator = null;
};
Actor.prototype.update = function() {
	if(this.animator != null)	this.animator.update();

	this.lastUpdateTicks = this.thisUpdateTicks;
	this.thisUpdateTicks = GAMEMODEL.getTime();
	this.ticksDiff = this.thisUpdateTicks - this.lastUpdateTicks;
};

Actor.prototype.draw = function() {
	if(this.animator != null)	this.animator.draw();
        
        if(this.drawSize)
        {
            GAMEVIEW.drawModifiers.lineWidth = 2;
            GAMEVIEW.context.strokeStyle = "#990000";

            GAMEVIEW.setWorldPt( this.posX, this.posY );
            GAMEVIEW.setWorldDim( this.sizeW,this.sizeH );

            GAMEVIEW.drawBox( GAMEVIEW.worldPt,GAMEVIEW.worldDim,false );        
        }
};


Actor.prototype.collide = function(act) {
	if(	this.collideType(act) != true )			return;
	if( this.intersects(act) )
	{
		this.collideVs(act);
	}
};
Actor.prototype.collideType = function(act) {
};
Actor.prototype.collideVs = function(act) {
};


Actor.prototype.intersects = function(act) {
	var A2_ptAx = act.posX - act.sizeW / 2;
	var A2_ptAy = act.posY - act.sizeH / 2;

	return this.intersectsBox(A2_ptAx,A2_ptAy, act.sizeW,act.sizeH);
};
Actor.prototype.intersectsBox = function(ptAx, ptAy, sizeW, sizeH) {
	var A1_ptAx = this.posX - this.sizeW / 2;
	var A1_ptAy = this.posY - this.sizeH / 2;
	var A1_ptDx = this.posX + this.sizeW / 2;
	var A1_ptDy = this.posY + this.sizeH / 2;

	var A2_ptDx = ptAx + sizeW;
	var A2_ptDy = ptAy + sizeH;

	if(A1_ptAx >= A2_ptDx)		return false;
	if(A1_ptDx <= ptAx)			return false;
	if(A1_ptAy >= A2_ptDy)		return false;
	if(A1_ptDy <= ptAy)			return false;
	return true;
};
Actor.prototype.intersection = function(act) {
	var A2_ptAx = act.posX - act.sizeW / 2;
	var A2_ptAy = act.posY - act.sizeH / 2;

	return this.intersectionBox(A2_ptAx,A2_ptAy, act.sizeW,act.sizeH);
};
Actor.prototype.intersectionBox = function(ptAx, ptAy, sizeW, sizeH) {
	var x1 = this.posX - this.sizeW/2;
	var y1 = this.posY - this.sizeH/2;
	var x2 = this.posX + this.sizeW/2;
	var y2 = this.posY + this.sizeH/2;

	var B2ptAx = ptAx;
	var B2ptAy = ptAy;
	var B2ptDx = ptAx + sizeW;
	var B2ptDy = ptAy + sizeH;

	if(x1 < B2ptAx)		x1 = B2ptAx;
	if(y1 < B2ptAy)		y1 = B2ptAy;
	if(x2 > B2ptDx)		x2 = B2ptDx;
	if(y2 > B2ptDy)		y2 = B2ptDy;
	
	if(x1 > x2 || y1 > y2)
	{
		x2 = x1;
		y2 = y1;
	}
	
	var Newbox = {x:x1,y:y1,w:(x2-x1),h:(y2-y1)};
	return Newbox;
};
Actor.prototype.containsPt = function(_x,_y) {
	var A1_ptAx = this.posX - this.sizeW / 2;
	var A1_ptAy = this.posY - this.sizeH / 2;
	var A1_ptDx = this.posX + this.sizeW / 2;
	var A1_ptDy = this.posY + this.sizeH / 2;

	if(_x < A1_ptAx || _x > A1_ptDx)	return false;
	if(_y < A1_ptAy || _y > A1_ptDy)	return false;
	return true;
};



Actor.prototype.updatePosition = function(newPosX, newPosY) {
	this.posX = newPosX;
	this.posY = newPosY;	
};
Actor.prototype.shiftPosition = function(newShiftX, newShiftY) {
	this.posX += newShiftX;
	this.posY += newShiftY;	
};


Actor.alloc = function() {
	var vc = new Actor();
	vc.init();
	return vc;
}