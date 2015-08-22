
function BlockActor() {
}
BlockActor.prototype = new Actor;
BlockActor.prototype.identity = function() {
	return ('BlockActor (' +this._dom.id+ ')');
};

BlockActor.prototype.init = function() {
	Actor.prototype.init.call(this);
	
	this.sizeW = 30;
	this.sizeH = 30;

};

BlockActor.prototype.setBlock = function(_X,_Y,_W,_H,h,app) {
	this.sizeW = _W;
	this.sizeH = _H;

	this.updatePosition(_X,_Y);	
};

BlockActor.prototype.update = function() {
	Actor.prototype.update.call(this);
	

};


BlockActor.prototype.draw = function() {

	GAMEVIEW.clearDrawMods();
	GAMEVIEW.drawModifiers.color = "#666666";
	GAMEVIEW.context.globalAlpha=1.0;	


            GAMEVIEW.drawModifiers.lineWidth = 2;
            GAMEVIEW.context.strokeStyle = "#000000";
                    GAMEVIEW.setWorldPt( this.posX, this.posY );
                    GAMEVIEW.setWorldDim( this.sizeW,this.sizeH );
            GAMEVIEW.drawBox( GAMEVIEW.worldPt,GAMEVIEW.worldDim,true );        

	GAMEVIEW.clearDrawMods();


	GAMEVIEW.context.globalAlpha=1.0;
	GAMEVIEW.clearDrawMods();
};



BlockActor.prototype.collideType = function(act) {
	if(act instanceof CharActor)	return true;
	return true;
};
BlockActor.prototype.collideVs = function(act) {
	if(act instanceof CharActor)
	{
            if(this.intersects(act))
            {
                var dsumX = (this.posX - act.posX);
                var dsumY = (this.posY - act.posY);

                var Wsum = this.sizeW/2 + act.sizeW/2;
                var Hsum = this.sizeH/2 + act.sizeH/2;
                
                var moveX = Wsum-Math.abs(dsumX);
                var moveY = Hsum-Math.abs(dsumY);

                var pushX = 0;
                var pushY = 0;
                if(moveX > 0)           pushX = dsumX *Math.abs(moveX/dsumX) /2;
                if(moveY > 0)           pushY = dsumY *Math.abs(moveY/dsumY) /2;
                
                if( Math.abs(pushX) > Math.abs(pushY) )         pushX = 0;
                else                                            pushY = 0;
                   
                act.shiftPosition(-pushX,-pushY);
            
            }
	}
};



BlockActor.alloc = function() {
	var vc = new BlockActor();
	vc.init();
	return vc;
}