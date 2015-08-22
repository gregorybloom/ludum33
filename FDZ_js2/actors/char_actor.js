
function CharActor() {
}
CharActor.prototype = new Actor;
CharActor.prototype.identity = function() {
	return ('CharActor (' +this._dom.id+ ')');
};

CharActor.prototype.init = function() {
	Actor.prototype.init.call(this);
	
	this.updatePosition(0,0);
		
	this.sizeW = 20;
	this.sizeH = 20;
	
	
};

CharActor.prototype.update = function() {
	Actor.prototype.update.call(this);


};


CharActor.prototype.draw = function() {
	Actor.prototype.draw.call(this);

	GAMEVIEW.clearDrawMods();
	GAMEVIEW.context.globalAlpha=1.0;	

};


CharActor.prototype.collideType = function(act) {
	return false;
};
CharActor.prototype.collideVs = function(act) {
	
};



CharActor.prototype.readInput = function(input)
{
	var used = false;
	var keyids = GAMECONTROL.keyIDs;
	
	 
	return used;
};

CharActor.alloc = function() {
	var vc = new CharActor();
	vc.init();
	return vc;
}