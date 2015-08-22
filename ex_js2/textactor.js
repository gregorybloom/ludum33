
function TextActor() {
}
TextActor.prototype = new Actor;
TextActor.prototype.identity = function() {
	return ('TextActor (' +this._dom.id+ ')');
};

TextActor.prototype.init = function() {
	Actor.prototype.init.call(this);
	
	this.sizeH = 0;
	this.sizeW = 0;
	
	this.text = "";
			
	this.fontSize = 28;
	this.fontCenter = false;
	
	this.startTime = 0;
	this.lifeTime = 3000;
};

TextActor.prototype.setFloatText = function(_txt,_X,_Y,life,fsize) {
	this.text = _txt;

	this.updatePosition(_X,_Y);
	
	this.lifeTime = life;
	this.fontSize = fsize;

};
TextActor.prototype.update = function() {
	Actor.prototype.update.call(this);
	
	if(this.startTime == 0)		this.startTime = GAMEMODEL.getTime();		
};

TextActor.prototype.draw = function() {

	GAMEVIEW.clearDrawMods();
	
    
        GAMEVIEW.context.globalAlpha=1.0;
        GAMEVIEW.drawModifiers.color = "#0099FF";

        var font = this.fontSize + "pt Arial";
        GAMEVIEW.drawText({x:this.posX,y:this.posY}, this.text, font, this.fontCenter, true);


	GAMEVIEW.context.globalAlpha=1.0;
	GAMEVIEW.clearDrawMods();
};



TextActor.prototype.collideType = function(act) {
	return false;
};
TextActor.prototype.collideVs = function(act) {
};



TextActor.alloc = function() {
	var vc = new TextActor();
	vc.init();
	return vc;
}