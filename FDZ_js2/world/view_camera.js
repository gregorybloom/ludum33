
function ViewCamera() {
}

ViewCamera.prototype = new Actor;
ViewCamera.prototype.identity = function() {
	return ('ViewCamera (' +this._dom.id+ ')');
};

ViewCamera.prototype.init = function() {
	Actor.prototype.init.call(this);
	
	this.cameraShift = {x:0,y:0};

	this.baseSize = {w:0,h:0};
    this.displaySize = {w:0,h:0};
        
        this.zoom = 1.0;         // CURRENTLY NOT PROPERLY IMPLEMENTED

};
ViewCamera.prototype.set = function(_x,_y,_w,_h) {
	this.sizeW = _w;
	this.sizeH = _h;
	this.baseSizeW = _w;
	this.baseSizeH = _h;
	this.updatePosition(_x,_y);
};

ViewCamera.prototype.containsBox = function(_x,_y,_w,_h) {
	var A1_ptAx = this.posX - this.sizeW / 2;
	var A1_ptAy = this.posY - this.sizeH / 2;
	var A1_ptDx = this.posX + this.sizeW / 2;
	var A1_ptDy = this.posY + this.sizeH / 2;

	var A2_ptAx = _x - _w / 2;
	var A2_ptAy = _y - _h / 2;
	var A2_ptDx = _x + _w / 2;
	var A2_ptDy = _y + _h / 2;

	if(A2_ptAx < A1_ptAx || A2_ptDx > A1_ptDx)		return false;
	if(A2_ptAy < A1_ptAy || A2_ptDy > A1_ptDy)		return false;
	return true;
};


ViewCamera.prototype.getCameraShift = function()
{
	this.cameraShift.x = this.posX;
	this.cameraShift.y = this.posY;
	return this.cameraShift;
}

ViewCamera.prototype.draw = function() {
    Actor.prototype.draw.call(this);

	GAMEVIEW.clearDrawMods();
	GAMEVIEW.context.globalAlpha=1.0;               
/**/
};


ViewCamera.alloc = function() {
	var vc = new ViewCamera();
	vc.init();
	return vc;
}

