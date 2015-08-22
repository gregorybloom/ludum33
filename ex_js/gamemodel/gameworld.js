
function GameWorld() {
}
GameWorld.prototype = new WorldActor;
GameWorld.prototype.identity = function() {
	return ('GameWorld (' +this._dom.id+ ')');
};

GameWorld.prototype.init = function() {
	WorldActor.prototype.init.call(this);
	
//	this.sizeW = 1000;
//	this.sizeH = 1000;
	
//        this.drawSize = true;
};

GameWorld.prototype.clear = function() {
    WorldActor.prototype.clear.call(this);
};
GameWorld.prototype.load = function() {

    
//	this.gamePlayer = GameChar.alloc();
//	this.gamePlayer.updatePosition( GAMEVIEW.screen.w/2, GAMEVIEW.screen.h/2 );

//    this.gameActors[0] = OctActor.alloc();
//    this.gameActors[0].updatePosition( GAMEVIEW.screen.w/2-30, GAMEVIEW.screen.h/2-60 );


};



GameWorld.prototype.drawAll = function() {

//    GAMEVIEW.context.fillStyle = "#CCCCCC";
//    GAMEVIEW.context.fillRect( 0, 0, GAMEVIEW.screen.w, GAMEVIEW.screen.h );
    var frame = GAMEANIMATIONS.getAnimationFrame(2, 0, 2);
    var tilesize = {w:16,h:16};
    var tileset = {w:0,h:0};
    tileset.w = Math.ceil(this.size.w / tilesize.w);
    tileset.h = Math.ceil(this.size.h / tilesize.h);
    for(var j=0; j<tileset.h; j++)
    {
        for(var i=0; i<tileset.w; i++)
        {
            var newpos = {x:0,y:0};
            newpos.x = tilesize.w* (0.5+ i);
            newpos.y = tilesize.h* (0.5+ j);
            GAMEVIEW.drawFromAnimationFrame(frame, {x:0,y:0}, newpos, {x:0,y:0}, 0, null);
        }
    }
    GAMEVIEW.drawBox(this.absBox, "black"); 

    WorldActor.prototype.drawAll.call(this);
};



GameWorld.prototype.readInput = function(kInput) {
    var used = false;
    return used;
};


GameWorld.prototype.cleanAll = function() {

        for(var i in this.gameActors)
        {
                if(this.gameActors[i] instanceof Actor && this.gameActors[i].alive == false)
                {
                        this.gameActors[i].clear();
                        this.gameActors.splice(i,1);
                }
        }	
        for(var i in this.gameArtbits)
        {
                if(this.gameArtbits[i] instanceof Actor && this.gameArtbits[i].alive == false)
                {
                        this.gameArtbits[i].clear();
                        this.gameArtbits.splice(i,1);
                }
        }	

};




GameWorld.alloc = function() {
	var vc = new GameWorld();
	vc.init();
	return vc;
}