



function DropperActor() {
}
DropperActor.prototype = new Actor;
DropperActor.prototype.identity = function() {
	return ('DropperActor ()');
};
DropperActor.prototype.init = function() {
	Actor.prototype.init.call(this);

	this.position = {x:0,y:0};

	this.radius = 20;
	this.size = {w:(this.radius*2+(this.space*(this.drops-1))),h:(this.radius*2-10)};

	this.lastDropX = this.position.x;
	this.lasttry = this.lastDropX;
	
	this.dropping= false;
	this.actionMode = "MODE_STILL";
	
	this.updatePosition();
};

DropperActor.prototype.draw = function() {
	if(GAMEVIEW.BoxIsInCamera(this.absBox)) {
//		GAMEVIEW.drawCircle(this.absPosition,this.radius);
	}
};
DropperActor.prototype.update = function() {
	Actor.prototype.update.call(this);

	if(GAMEMODEL.gameSession.gamePlayer.position.x > this.position.x) {
		if(!this.dropping)	this.startDropping();
	}
	if(this.dropping)		this.tryDrop();
	if(this.dropping)		this.tryCleaning();
};
DropperActor.prototype.startDropping = function() {
	this.dropping=true;
	this.lastDropX = this.position.x;
	this.lasttry = this.lastDropX;
			console.log('start drop');
};
DropperActor.prototype.tryDrop = function() {
	var curpos = GAMEMODEL.gameSession.gamePlayer.position.x;
	var droppos = Math.floor(curpos+800);

	if((curpos-this.lasttry)>150) {
		var r=Math.random();
		r += (Math.floor(curpos/1000)/100);
		r += (GAMEMODEL.gameSession.gamePlayer.carsCrushed)/400;
			if(r > 0.65) {
				var droplane=Math.floor(Math.random()*3);
			    if(droplane==3)	droplane=2;

				var r2=Math.random();
				if(r2 > 0.85) {
				    var B3 = OilActor.alloc();
				    GAMEMODEL.gameSession.gameWorld.putInLane(B3,droppos,droplane);
				    GAMEMODEL.gameSession.gameWorld.addActor(B3,'act');
	//				console.log('drop oil '+droppos+' '+droplane+' id '+B3.ranID);
	    		}
				else if(r2 > 0.70) {
				    var B3 = CinderActor.alloc();
				    GAMEMODEL.gameSession.gameWorld.putInLane(B3,droppos,droplane);
				    GAMEMODEL.gameSession.gameWorld.addActor(B3,'act');
	//				console.log('drop cinder '+droppos+' '+droplane+' id '+B3.ranID);
	    		}
				else if(r2 > 0.4) {
				    var B3 = BlockActor.alloc();
				    B3.carLook=Math.floor(Math.random()*4);
				    if(B3.carLook>=4)	B3.carLook=3;
				    GAMEMODEL.gameSession.gameWorld.putInLane(B3,droppos,droplane);
				    GAMEMODEL.gameSession.gameWorld.addActor(B3,'act');
	//				console.log('drop car '+droppos+' '+droplane+' id '+B3.ranID);
	    		}
	    		curpos+100;
	    	}
		this.lasttry=curpos;
	}
};
DropperActor.prototype.tryCleaning = function() {
	var camera = GAMEMODEL.gameCamera;
	var camshift = camera.getCameraShift();
	var actors = GAMEMODEL.gameSession.gameWorld.gameActors;

    var c=0;for(var i in actors)	{if(typeof actors[i]!=="undefined") c++;}
    for(var i in actors) {
    	if(actors[i].alive && actors[i].position.x < (GAMEMODEL.gameSession.gamePlayer.x-1000)) {
    		if(actors[i] instanceof OilActor)			actors[i].alive=false;
    		else if(actors[i] instanceof BlockActor)		actors[i].alive=false;
    		else if(actors[i] instanceof CinderActor)		actors[i].alive=false;
    		else if(actors[i] instanceof TextActor)		actors[i].alive=false;
//    		if(actors[i] instanceof OilActor)			console.log('cleantry '+actors[i].identity());
//    		else if(actors[i] instanceof BlockActor)		console.log('cleantry '+actors[i].identity());
//    		else if(actors[i] instanceof CinderActor)		console.log('cleantry '+actors[i].identity());
//    		else if(actors[i] instanceof TextActor)		console.log('cleantry '+actors[i].identity());
			
    	}
    }
};

DropperActor.alloc = function() {
	var vc = new DropperActor();
	vc.init();
	return vc;
};
