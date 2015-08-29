
GAMEVIEW={
	screen: {w:0,h:0},
	context: null,
	loadedImgs: {},
	
    worldPt: {},
    worldPt2: {},
    worldDim: {},
        
	drawPt: {},
	drawSize: {},
	drawModifiers: {},

	avgTick: 0,
	lastTick: 0,
	
	MAXSAMPLES: 100,
	tickindex: 0,
	ticksum: 0,
	ticklist: {},
	
	boundTexture: -1,
	drawcount: 0	
};

GAMEVIEW.init = function()
{
	if( !this.loadTextures() )		return false;

//		this.lastTick = GAMEMODEL.gameClock.elapsedMS();
	
	return true;
};
GAMEVIEW.loadTextures = function()
{
	return true;
};
GAMEVIEW.set = function(screendim, cont)
{
	this.screen.w = screendim.w;
	this.screen.h = screendim.h;
	this.context = cont;	
};
GAMEVIEW.loadImg = function(num, imgsrc)
{
	if(typeof this.loadedImgs[num] === "undefined")		this.loadedImgs[num] = {};
	this.loadedImgs[num].src = imgsrc;
	this.loadedImgs[num].img = new Image();
	this.loadedImgs[num].img.src = imgsrc;
};

GAMEVIEW.setDrawPt = function(x,y)
{
    this.drawPt.x = x;
    this.drawPt.y = y;
};
GAMEVIEW.setWorldPt = function(x,y)
{
    this.worldPt.x = x;
    this.worldPt.y = y;
};
GAMEVIEW.setWorldPt2 = function(x,y)
{
    this.worldPt2.x = x;
    this.worldPt2.y = y;
};
GAMEVIEW.setWorldDim = function(w,h)
{
    this.worldDim.w = w;
    this.worldDim.h = h;
};
GAMEVIEW.fetchCamera = function(type)
{
	if(type === "game") {
		if(GAMEMODEL.gameSession instanceof SessionActor && GAMEMODEL.gameSession.gameCamera instanceof ViewCamera) {
			return GAMEMODEL.gameSession.gameCamera;
		}
	}
	if(type === "screen") {
		if(GAMEMODEL.gameScreens instanceof ScreenManager && GAMEMODEL.gameScreens.screenCamera instanceof ViewCamera) {
			return GAMEMODEL.gameScreens.screenCamera;
		}
	}
	if(type === "model") {
		if(GAMEMODEL.modelCamera instanceof ViewCamera) {
			return GAMEMODEL.modelCamera;
		}
	}


	if(GAMEMODEL.gameSession instanceof SessionActor && GAMEMODEL.gameSession.gameCamera instanceof ViewCamera) {
		return GAMEMODEL.gameSession.gameCamera;
	}
	if(GAMEMODEL.modelCamera instanceof ViewCamera) {
		return GAMEMODEL.modelCamera;
	}
};


GAMEVIEW.calcAverageTick = function(newtick)
{
	if(typeof this.ticklist[ this.tickindex ] === "undefined")
	{
		this.ticklist[ this.tickindex ] = 0;
	}
	
	this.ticksum -= this.ticklist[ this.tickindex ];
	this.ticksum += newtick;
	
	this.ticklist[ this.tickindex ] = newtick;
	this.tickindex = this.tickindex+1;
	
	if( this.tickindex == this.MAXSAMPLES )
	{
		this.tickindex = 0;
		var fps = Math.floor(1000/(this.ticksum/this.MAXSAMPLES));
//				console.log( "fps: "+fps );
	}

	return (this.ticksum/this.MAXSAMPLES);
};

GAMEVIEW.BoxIsInCamera = function(box, shift)
{
	if(typeof shift === "undefined")	shift = {x:0, y:0};
	if(typeof shift.x === "undefined")	shift.x = 0;
	if(typeof shift.y === "undefined")	shift.y = 0;
	
	var camera = GAMEMODEL.gameCamera;
	if(camera != null && camera instanceof GameCamera)
	{
		var absBox = camera.absBox;
		var shiftBox = {x:box.x, y:box.y, w:box.w, h:box.h};
		shiftBox.x = shiftBox.x+shift.x;
		shiftBox.y = shiftBox.y+shift.y;

		return GAMEGEOM.BoxIntersects(absBox, shiftBox);
	}
	return false;
};
GAMEVIEW.clearDrawMods = function()
{
	for(var i in this.drawModifiers)
	{
		delete this.drawModifiers[i];
	}
};

GAMEVIEW.PtToDrawCoords = function(absPt, vShift)
{
	if(typeof vShift === "undefined")	vShift = null;
	
	var zoom = GAMEMODEL.gameCamera.zoom;

	var camShift = GAMEMODEL.gameCamera.getCameraShift();
	camShift.x = Math.floor(camShift.x);
	camShift.y = Math.floor(camShift.y);

	var drawPt = {x:0,y:0};
	if(absPt != null)			drawPt.x += absPt.x;
	if(absPt != null)			drawPt.y += absPt.y;
	if(camShift.x != null)		drawPt.x -= camShift.x;
	if(camShift.y != null)		drawPt.y -= camShift.y;
	if(vShift != null)			drawPt.x += vShift.x;
	if(vShift != null)			drawPt.y += vShift.y;

	drawPt.x = drawPt.x/zoom;
	drawPt.y = drawPt.y/zoom;

	return drawPt;
};
GAMEVIEW.BoxToDrawCoords = function(absBox, vShift)
{
	if(typeof vShift === "undefined")	vShift = null;

	var zoom = GAMEMODEL.gameCamera.zoom;

	var drawBox = {x:0,y:0,w:0,h:0};
	var drawPt = GAMEVIEW.PtToDrawCoords(absBox, vShift);
	
	drawBox.x = drawPt.x;
	drawBox.y = drawPt.y;
	drawBox.w = absBox.w/zoom;
	drawBox.h = absBox.h/zoom;

	return drawBox;
};

GAMEVIEW.updateAll = function()
{
	if(GAMEMODEL.gameMode === "GAME_RUN")
	{
		var newTick = GAMEMODEL.gameClock.elapsedMS();
//		console.log("newTick: "+newTick);

		var TickDiff = newTick - this.lastTick;
		this.avgTick = GAMEVIEW.calcAverageTick( TickDiff );
				
		this.lastTick = newTick;
	}
};
GAMEVIEW.drawAll = function()
{
	ctxt.fillStyle = "#FFFFFF";
	ctxt.fillRect( 0, 0, this.screen.w, this.screen.h );
	
	if(GAMEMODEL.gameMode !== "GAME_INIT")		GAMEMODEL.drawAll();
	
	var fps = 1000 / this.avgTick;
	fps = Math.floor( fps );
	
	if(GAMEMODEL.gameMode === "GAME_MUSICPAUSE" || GAMEMODEL.gameMode === "GAME_INIT")
	{
			ctxt.fillStyle = "rgba(155,155,255,0.35)";
			ctxt.fillRect( 0, 0, this.screen.w, this.screen.h );

		var ScreenPt = {x:10,y:555};
		var str = "MUSIC LOADING...";
		this.context.lineWidth = "3";
		this.context.strokeStyle = "#FFFFFF";
		this.context.strokeText(str,ScreenPt.x,ScreenPt.y);
		this.context.font = "10pt Arial";
		this.context.fillStyle = "#000000";
		this.context.fillText(str,ScreenPt.x,ScreenPt.y);
	}
	else if(GAMEMODEL.gameMode === "GAME_PAUSE")
	{
			ctxt.fillStyle = "rgba(255,255,255,0.35)";
			ctxt.fillRect( 0, 0, this.screen.w, this.screen.h );

		var ScreenPt = {x:10,y:555};
		var str = "GAME PAUSED";
		this.context.lineWidth = "3";
		this.context.strokeStyle = "#FFFFFF";
		this.context.strokeText(str,ScreenPt.x,ScreenPt.y);
		this.context.font = "10pt Arial";
		this.context.fillStyle = "#000000";
		this.context.fillText(str,ScreenPt.x,ScreenPt.y);
	}
	
	var ScreenPt = {x:10,y:570};
	this.context.lineWidth = "3";
	this.context.strokeStyle = "#FFFFFF";
	this.context.strokeText(fps+" fps",ScreenPt.x,ScreenPt.y);
	this.context.font = "10pt Arial";
	this.context.fillStyle = "#000000";
	this.context.fillText(fps+" fps",ScreenPt.x,ScreenPt.y);

	var ScreenPt = {x:10,y:585};
	var str = GAMEMODEL.activeObjs+" active objs";
	this.context.lineWidth = "3";
	this.context.strokeStyle = "#FFFFFF";
	this.context.strokeText(str,ScreenPt.x,ScreenPt.y);
	this.context.font = "10pt Arial";
	this.context.fillStyle = "#000000";
	this.context.fillText(str,ScreenPt.x,ScreenPt.y);

};




/*		GAMEVIEW.drawFromAnimationFrame( frame, this.target.absPosition, {x:0,y:0}, this.target.absBox.ptC, this.target.drawLayer, null );
/**/
GAMEVIEW.drawFromAnimationFrame = function(frame, absPosition, vShift, drawPt, dLayer, filter)
{
	if(frame == null)	return;
	
	var imgFrame = GAMEANIMATIONS.getImageFrame(frame.imgNum, frame.imgFrameNum);
	if(imgFrame == null)	return;
			
	var drawSize = {w:0,h:0};
	drawSize.w = frame.scale.w*imgFrame.dim.w;
	drawSize.h = frame.scale.h*imgFrame.dim.h;
	drawSize.w = Math.abs(drawSize.w);
	drawSize.h = Math.abs(drawSize.h);
	
	var drawBox = {w:drawSize.w,h:drawSize.h};
	drawBox.x = absPosition.x - imgFrame.baseKeypt.x*frame.scale.w;
	drawBox.y = absPosition.y - imgFrame.baseKeypt.y*frame.scale.h;
	
//	if( !GAMEVIEW.BoxIsInCamera(drawBox, vShift) )		return;
	
		
	// convert to screen values
	var zoom = GAMEMODEL.gameCamera.zoom;
	drawSize.w = drawSize.w / zoom;
	drawSize.h = drawSize.h / zoom;
	
	if(typeof vShift === "undefined")	vShift = null;
	if(vShift == null)			vShift = {x:0,y:0};
	vShift.x -= imgFrame.baseKeypt.x*frame.scale.w;
	vShift.y -= imgFrame.baseKeypt.y*frame.scale.h;
	
	var drawPos = GAMEVIEW.PtToDrawCoords(absPosition, vShift);
	
	if(typeof this.loadedImgs[frame.imgNum] === "undefined")	return;
	var img = this.loadedImgs[frame.imgNum].img;
	if(typeof img === "undefined" || img == null)	return;
		
		//draw frame
		this.context.save();
		this.context.scale(1,1);

		this.context.drawImage(img, 

			imgFrame.pos.x,imgFrame.pos.y,   //sprite sheet top left 
			imgFrame.dim.w, imgFrame.dim.h,    	//sprite sheet width/height
			drawPos.x, drawPos.y, //destination x/y
			drawSize.w, drawSize.h     
			   //destination width/height  (this can be used to scale)
		);
		this.context.restore();

};

GAMEVIEW.fillBox = function(absBox, color)
{
	if(typeof color === "undefined")		color = "#FF0000";

	if( !GAMEVIEW.BoxIsInCamera(absBox) )		return;
	
	var drawBox = GAMEVIEW.BoxToDrawCoords(absBox);

	this.context.fillStyle=color;
	this.context.fillRect(drawBox.x, drawBox.y, drawBox.w, drawBox.h);
};
GAMEVIEW.drawBox = function(absBox, color, width)
{
	if(typeof color === "undefined")		color = "#FF0000";
	if(typeof width === "undefined")		width = 1;

	if( !GAMEVIEW.BoxIsInCamera(absBox) )		return;
	
	var drawBox = GAMEVIEW.BoxToDrawCoords(absBox);
	
	this.context.beginPath();
	this.context.rect(  drawBox.x, drawBox.y, drawBox.w, drawBox.h);
	this.context.lineWidth = width;
	this.context.strokeStyle = color;
	this.context.stroke();	
};
GAMEVIEW.drawCircle = function(centerPt, radius, color, width)
{
	if(typeof color === "undefined")		color = "#FF0000";
	if(typeof width === "undefined")		width = 1;

	var absBox = {x:centerPt.x,y:centerPt.y,w:radius*2,h:radius*2};
	absBox.x = absBox.x - radius;
	absBox.y = absBox.y - radius;

	if( !GAMEVIEW.BoxIsInCamera(absBox) )		return;
	
	var zoom = GAMEMODEL.gameCamera.zoom;

	var drawCenter = GAMEVIEW.PtToDrawCoords(centerPt);

	radius = radius/zoom;

	this.context.beginPath();
	this.context.arc(drawCenter.x, drawCenter.y, radius, 0,2*Math.PI);
	this.context.lineWidth = width;
	this.context.strokeStyle = color;
	this.context.stroke();	
};
GAMEVIEW.fillCircle = function(centerPt, radius, color)
{
	if(typeof color === "undefined")		color = "#FF0000";

	var absBox = {x:centerPt.x,y:centerPt.y,w:radius*2,h:radius*2};
	absBox.x = absBox.x - radius;
	absBox.y = absBox.y - radius;

	if( !GAMEVIEW.BoxIsInCamera(absBox) )		return;
	
	var zoom = GAMEMODEL.gameCamera.zoom;

	var drawCenter = GAMEVIEW.PtToDrawCoords(centerPt);

	radius = radius/zoom;

	this.context.beginPath();
	this.context.arc(drawCenter.x, drawCenter.y, radius, 0,2*Math.PI);
	this.context.fillStyle = color;
	this.context.fill();	
};

GAMEVIEW.drawLine = function(absPt1, absPt2, color, width)
{
	if(typeof color === "undefined")		color = "#FF0000";
	if(typeof width === "undefined")		width = 1;

//	if( !GAMEVIEW.BoxIsInCamera(absPt1) )		return;		// LINE vs BOX
	
	var drawPt1 = GAMEVIEW.PtToDrawCoords(absPt1);
	var drawPt2 = GAMEVIEW.PtToDrawCoords(absPt2);

	this.context.moveTo(drawPt1.x, drawPt1.y);
	this.context.lineWidth = width;
	this.context.strokeStyle = color;
	this.context.lineTo(drawPt2.x, drawPt2.y);
	this.context.stroke();	
};
GAMEVIEW.fillText = function(absPt, text, font, color)
{
	if(typeof color === "undefined")		color = "#FF0000";

//	if( !GAMEVIEW.BoxIsInCamera(absPt1) )		return;		// LINE vs BOX
	
	var drawPt = GAMEVIEW.PtToDrawCoords(absPt);

	this.context.font = font;
	this.context.fillStyle = color;
	this.context.fillText(text,drawPt.x,drawPt.y);
};
GAMEVIEW.drawText = function(absPt, text, font, color, width)
{
	if(typeof color === "undefined")		color = "#FF0000";
	if(typeof width === "undefined")		width = 1;

//	if( !GAMEVIEW.BoxIsInCamera(absPt1) )		return;		// LINE vs BOX
	
	var drawPt = GAMEVIEW.PtToDrawCoords(absPt);
	var tfont =	this.context.font;


	this.context.font = font;
	this.context.lineWidth = width;
	this.context.strokeStyle = color;
	this.context.strokeText(text,drawPt.x,drawPt.y);

	this.context.font = tfont;
};

