
function GameWorld() {
}
GameWorld.prototype = new WorldActor;
GameWorld.prototype.identity = function() {
	return ('GameWorld (' +this._dom.id+ ')');
};

GameWorld.prototype.init = function() {
	WorldActor.prototype.init.call(this);
	
	this.sizeW = 1000;
	this.sizeH = 1000;
	this.updatePosition(400,300);
	
	this.drawSize = true;
};

GameWorld.prototype.load = function() {

        

};
GameWorld.prototype.start = function() {
	WorldActor.prototype.start.call(this);

	this.gamePlayer.updatePosition( GAMEVIEW.screen.w/2, GAMEVIEW.screen.h/2 );


	this.gameActors[0] = RockActor.alloc();
	this.gameActors[0].updatePosition(150,250);        

	this.gameActors[1] = BlockActor.alloc();
	this.gameActors[1].updatePosition(250,250);        

};
GameWorld.prototype.end = function() {
	WorldActor.prototype.end.call(this);

        this.clear();
};




GameWorld.prototype.distributeInput = function(kInput)
{
      	return WorldActor.prototype.distributeInput.call(this, kInput);
};




GameWorld.prototype.update = function() {
	WorldActor.prototype.update.call(this);

};
GameWorld.prototype.draw = function() {
     
	WorldActor.prototype.draw.call(this);
        
        GAMEVIEW.camera.updatePosition( this.gamePlayer.posX, this.gamePlayer.posY );
//        GAMEVIEW.camera.drawSize = true;
//        GAMEVIEW.camera.draw();
};


GameWorld.prototype.readInput = function(kInput) {
    WorldActor.prototype.readInput.call(this, kInput);
  

};


GameWorld.prototype.collideType = function(act) {
	if(act instanceof CharActor)	return true;
	return false;
};
GameWorld.prototype.collideVs = function(act) {
	if(act instanceof CharActor)
	{

	}
};



GameWorld.alloc = function() {
	var vc = new GameWorld();
	vc.init();
	return vc;
}