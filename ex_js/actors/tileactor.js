



function TileActor() {
}
TileActor.prototype = new Actor;
TileActor.prototype.identity = function() {
	return ('TileActor ()');
};
TileActor.prototype.init = function() {
	Actor.prototype.init.call(this);

	this.size = {w:120,h:35};
	this.position = {x:0,y:0};

	this.tilesize = {w:25,h:25};
	this.imgsize = {w:16000,h:1575}
	
	this.actionMode = "MODE_STILL";
	this.tilegroup = 20;
	this.scrollSpd = 0;

	this.updatePosition();

	if(this.tilegroup == 20)		this.tilesize = {w:25,h:25};
	if(this.tilegroup == 21)		this.tilesize = {w:25,h:40};
	if(this.tilegroup == 22)		this.tilesize = {w:25,h:25};
	if(this.tilegroup == 23)		this.tilesize = {w:25,h:16};
	if(this.tilegroup == 20)		this.imgsize = {w:16000,h:1575};
	if(this.tilegroup == 21)		this.imgsize = {w:4000,h:394};
	if(this.tilegroup == 22)		this.imgsize = {w:16000,h:705};
	if(this.tilegroup == 23)		this.imgsize = {w:4000,h:176};

	this.animateModule = AnimationModule.alloc();
	this.animateModule.target = this;
	
	this.moveModule = MovingActorModule.alloc();
	this.moveModule.target = this;	
};
TileActor.prototype.setTileGroup = function(num) {
	this.tilegroup = num;
	if(this.tilegroup == 20)		this.tilesize = {w:25,h:25};
	if(this.tilegroup == 21)		this.tilesize = {w:25,h:40};
	if(this.tilegroup == 22)		this.tilesize = {w:25,h:25};
	if(this.tilegroup == 23)		this.tilesize = {w:25,h:16};
	if(this.tilegroup == 20)		this.imgsize = {w:16000,h:1575};
	if(this.tilegroup == 21)		this.imgsize = {w:4000,h:394};
	if(this.tilegroup == 22)		this.imgsize = {w:16000,h:705};
	if(this.tilegroup == 23)		this.imgsize = {w:4000,h:176};
};

TileActor.prototype.draw = function() {
//	Actor.prototype.draw.call(this);

	var camera = GAMEMODEL.gameCamera;
	var camshift = camera.getCameraShift();

	if(this.scrollSpd != 0) {
		this.position.x = camera.position.x * this.scrollSpd;
		this.updatePosition();
	}

    var tilesize = this.tilesize;

//	console.log('camshift: ' + JSON.stringify(camshift) );
//		GAMEVIEW.drawCircle(camshift,100);		

	var tilestart = {};
	var pos = {x:this.absPosition.x,y:this.absPosition.y};
	tilestart.x = (camshift.x-pos.x)/this.tilesize.w;
	tilestart.y = (-pos.y)/this.tilesize.h;
	tilestart.x = Math.floor(tilestart.x);
	tilestart.y = Math.floor(tilestart.y);
//	console.log('tilestart: ' + JSON.stringify(tilestart) );

	var imgTx = (camshift.x-pos.x) % (this.imgsize.w);
	var imgTy = (-pos.y) % (this.imgsize.h);
	while(imgTx<0){imgTx+=this.imgsize.w};
	while(imgTy<0){imgTy+=this.imgsize.h};
	imgTx = Math.floor(imgTx/this.tilesize.w);
	imgTy = Math.floor(imgTy/this.tilesize.h);

	var base = {};
	base.x = tilestart.x * tilesize.w + pos.x;
	base.y = tilestart.y * tilesize.h + pos.y;
//	console.log('base: ' + JSON.stringify(tilestart) );
	var tileset = {};
	tileset.w = Math.ceil(camera.size.w/tilesize.w)+1;
	tileset.h = Math.ceil(this.imgsize.h/tilesize.h)+1;
//	console.log('tileset: ' + JSON.stringify(tilestart) );
	var n=0;
	var newpos={};
    var frame = null;
    for(var j=0; j<=tileset.h; j++)
    {
        for(var i=0; i<=tileset.w; i++)
        {
        	if( (imgTx+i)>=Math.floor(this.imgsize.w/this.tilesize.w) ) {
       			n= (imgTx+i) + (imgTy+j-1)*Math.floor(this.imgsize.w/this.tilesize.w);
        	}
        	else       		n= (imgTx+i) + (imgTy+j)*Math.floor(this.imgsize.w/this.tilesize.w);

			frame = GAMEANIMATIONS.getAnimationFrame(this.tilegroup, 0, n);
            newpos.x = Math.ceil	(tilesize.w* (i) + base.x);
            newpos.y = Math.ceil(tilesize.h* (j) + base.y);
//			console.log('x'+JSON.stringify(newpos) );
            GAMEVIEW.drawFromAnimationFrame(frame, {x:0,y:0}, newpos, {x:0,y:0}, 0, null);
//			GAMEVIEW.drawText(newpos,n, "10px Arial","#000000");
        }
    }   
};
TileActor.prototype.update = function() {
	Actor.prototype.update.call(this);
		
};

TileActor.alloc = function() {
	var vc = new TileActor();
	vc.init();
	return vc;
};
