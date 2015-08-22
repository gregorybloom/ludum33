
GAMEVIEW={
	screen: {w:0,h:0},
	context: null,
	hiddenContext: null,
	canvas: null,
	hiddenCanvas: null,
	loadedImgs: {},


        worldPt: {},
        worldPt2: {},
        worldDim: {},
        
	drawPt: {},
	drawSize: {},
	drawModifiers: {},
	boundTexture: -1
	
};

GAMEVIEW.init = function()
{
//		this.lastTick = GAMEMODEL.getTime();
	this.loadTextures();

	return true;
};

GAMEVIEW.loadTextures = function()
{
	this.loadImg(10, "images/Link.png");
	this.loadImg(11, "images/monsters.png");
//	this.loadImg(12, "images/tinyset-landtiles.png");
	this.loadImg(13, "images/tinyset-landtiles-buf.png");

	return true;
};
GAMEVIEW.loadImg = function(num, imgsrc)
{
	if(typeof this.loadedImgs[num] === "undefined")		this.loadedImgs[num] = {};
	this.loadedImgs[num].src = imgsrc;
	this.loadedImgs[num].img = new Image();
	this.loadedImgs[num].img.src = imgsrc;
};




GAMEVIEW.set = function(screendim)
{
	this.screen.w = screendim.w;
	this.screen.h = screendim.h;
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


GAMEVIEW.drawBackground = function()
{
	
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

GAMEVIEW.BoxIsInCamera = function(box, shift, type)
{
	if(typeof shift === "undefined")	shift = {x:0, y:0};
	if(typeof shift.x === "undefined")	shift.x = 0;
	if(typeof shift.y === "undefined")	shift.y = 0;

	var cam = GAMEVIEW.fetchCamera(type);
	var camShift = cam.getCameraShift();

	if(cam != null && camera instanceof ViewCamera)
	{
		return true;
		/*
		var absBox = camera.absBox;
		var shiftBox = {x:box.x, y:box.y, w:box.w, h:box.h};
		shiftBox.x = shiftBox.x+shift.x;
		shiftBox.y = shiftBox.y+shift.y;

		return GAMEGEOM.BoxIntersects(absBox, shiftBox);	/**/
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
GAMEVIEW.PtToDrawCoords = function(_x,_y,type)
{
	var cam = GAMEVIEW.fetchCamera(type);
	var camShift = cam.getCameraShift();
	var zoom = cam.zoom;
//    if(typeof GAMEVIEW.drawModifiers.ignoreCam === "undefined")
//    {
        this.drawPt.x = _x - (camShift.x - this.screen.w/2);
        this.drawPt.y = _y - (camShift.y - this.screen.h/2);

        this.drawPt.x = (this.drawPt.x - this.screen.w/2)/zoom + this.screen.w/2;
        this.drawPt.y = (this.drawPt.y - this.screen.h/2)/zoom + this.screen.h/2;
/*    }
    else
    {
        this.drawPt.x = _x;
        this.drawPt.y = _y;
    }	/**/
	return this.drawPt;
};
GAMEVIEW.BoxToDrawCoords = function(absBox, vShift, type)
{
	var cam = GAMEVIEW.fetchCamera(type);
	var camShift = cam.getCameraShift();

	if(typeof vShift === "undefined")	vShift = null;

	var zoom = cam.zoom;

	var drawBox = {x:0,y:0,w:0,h:0};
	var drawPt = GAMEVIEW.PtToDrawCoords(absBox, vShift, type);
	
	drawBox.x = drawPt.x;
	drawBox.y = drawPt.y;
	drawBox.w = absBox.w/zoom;
	drawBox.h = absBox.h/zoom;

	return drawBox;
};



GAMEVIEW.drawLine = function(pt1, pt2,type)
{
	GAMEVIEW.PtToDrawCoords(pt1.x,pt1.y,type);
        this.worldPt.x = this.drawPt.x;
        this.worldPt.y = this.drawPt.y;

	GAMEVIEW.PtToDrawCoords(pt2.x,pt2.y,type);
	
	this.context.strokeStyle = (this.drawModifiers.color) ? this.drawModifiers.color : "#FF0000";
	this.context.lineWidth = (this.drawModifiers.lineWidth) ? this.drawModifiers.lineWidth : 1;

	this.context.beginPath();
        this.context.moveTo(this.worldPt.x,this.worldPt.y);
        this.context.lineTo(this.drawPt.x,this.drawPt.y);
	this.context.stroke();
};
GAMEVIEW.drawBox = function(centerPt, boxSides, fill, type)
{
	var cam = GAMEVIEW.fetchCamera(type);
	var camShift = cam.getCameraShift();
	var zoom = cam.zoom;

	var ptAx = centerPt.x - boxSides.w/2;
	var ptAy = centerPt.y - boxSides.h/2;


//	if( !GAMEVIEW.BoxIsInCamera????? )	return;

	GAMEVIEW.PtToDrawCoords(ptAx,ptAy,type);
	if(fill)
	{
		this.context.fillStyle = (this.drawModifiers.color) ? this.drawModifiers.color : "#FF0000";
		this.context.fillStyle = (this.drawModifiers.fillStyle) ? this.drawModifiers.fillStyle : this.context.fillStyle;
		this.context.fillRect(this.drawPt.x, this.drawPt.y, boxSides.w/zoom, boxSides.h/zoom);
	}
	else
	{
		this.context.lineWidth = (this.drawModifiers.lineWidth) ? this.drawModifiers.lineWidth : 1;
		this.context.strokeStyle = (this.drawModifiers.color) ? this.drawModifiers.color : "#FF0000";
		this.context.strokeRect(this.drawPt.x, this.drawPt.y, boxSides.w/zoom, boxSides.h/zoom);
		
/*		this.context.beginPath();
		this.context.rect(ptAx, ptAy, boxSides.w, boxSides.h);
		this.context.lineWidth = 1;
		this.context.strokeStyle = color;
		this.context.stroke();	/**/
	}
	
};
GAMEVIEW.drawCircle = function(centerPt, radius, fill, type)
{
        if(radius < 0)          return;

//	var ptAx = centerPt.x - radius;
//	var ptAy = centerPt.y - radius;
//	if( !GAMEVIEW.BoxIsInCamera????? )	return;

	GAMEVIEW.PtToDrawCoords(centerPt.x,centerPt.y,type);

	var cam = GAMEVIEW.fetchCamera(type);
	var camShift = cam.getCameraShift();
	var zoom = cam.zoom;

	radius = radius/zoom;
	
	this.context.beginPath();
	this.context.arc(this.drawPt.x, this.drawPt.y, radius, 0, 2*Math.PI);
	if(fill)
	{
		this.context.fillStyle = (this.drawModifiers.color) ? this.drawModifiers.color : "#FF0000";
		this.context.fillStyle = (this.drawModifiers.fillStyle) ? this.drawModifiers.fillStyle : this.context.fillStyle;
		this.context.fill();		
	}
	else
	{
		this.context.strokeStyle = (this.drawModifiers.color) ? this.drawModifiers.color : "#FF0000";
		this.context.lineWidth = (this.drawModifiers.lineWidth) ? this.drawModifiers.lineWidth : 1;
		this.context.stroke();
	}
};

GAMEVIEW.drawEllipses = function(centerPt, sizeDim, fill, type)
{
	var cam = GAMEVIEW.fetchCamera(type);
	var camShift = cam.getCameraShift();
	var zoom = cam.zoom;


	var kappa = 0.5522848;
	
	var offX = kappa* sizeDim.w/(2*zoom);
	var offY = kappa* sizeDim.h/(2*zoom);


	GAMEVIEW.PtToDrawCoords(centerPt.x,centerPt.y,type);
	var endX = this.drawPt.x + sizeDim.w/2;
	var endY = this.drawPt.y + sizeDim.h/2;
	var baseX = this.drawPt.x - sizeDim.w/2;
	var baseY = this.drawPt.y - sizeDim.h/2;
	
	this.context.beginPath();
	this.context.moveTo(baseX, centerPt.y);
/*	this.context.bezierCurveTo(centerPt.x-offX, endY,		baseX, centerPt.y+offY,		baseX, centerPt.y);
	this.context.bezierCurveTo(endX, centerPt.y+offY,		centerPt.x+offX, endY,		centerPt.x, endY);
	this.context.bezierCurveTo(centerPt.x+offX, baseY,		endX, centerPt.y-offY,		endX, centerPt.y);
	this.context.bezierCurveTo(baseX, centerPt.y-offY,		centerPt.x-offX, baseY,		centerPt.x, baseY);
/**/
	this.context.bezierCurveTo(baseX, centerPt.y-offY,		centerPt.x-offX, baseY,		centerPt.x, baseY);
	this.context.bezierCurveTo(centerPt.x+offX, baseY,		endX, centerPt.y-offY,		endX, centerPt.y);
	this.context.bezierCurveTo(endX, centerPt.y+offY,		centerPt.x+offX, endY,		centerPt.x, endY);
	this.context.bezierCurveTo(centerPt.x-offX, endY,		baseX, centerPt.y+offY,		baseX, centerPt.y);
/**/	 
/*	if(fill)
	{
		this.context.fillStyle = (this.drawModifiers.color) ? this.drawModifiers.color : "#FF0000";
		this.context.fillStyle = (this.drawModifiers.fillStyle) ? this.drawModifiers.fillStyle : this.context.fillStyle;
		this.context.fill();		
	}
	else
	{	/**/
		this.context.strokeStyle = (this.drawModifiers.color) ? this.drawModifiers.color : "#FF0000";
		this.context.lineWidth = (this.drawModifiers.lineWidth) ? this.drawModifiers.lineWidth : 1;
		this.context.stroke();
//	}
};




GAMEVIEW.drawBWText = function(centerPt, text, font, center)
{
	GAMEVIEW.drawModifiers.color = "#FFFFFF";
	GAMEVIEW.drawText(centerPt, text, font, center, false, "4");

	GAMEVIEW.drawModifiers.color = "#000000";
	GAMEVIEW.drawText(centerPt, text, font, center, true);
};
GAMEVIEW.drawText = function(centerPt, text, font, center, fill, width, type)
{
	GAMEVIEW.PtToDrawCoords(centerPt.x,centerPt.y,type);
	
	this.context.font = font;
	if(center)		      this.context.textAlign = 'center';

	if(fill)
	{
		this.context.fillStyle = (this.drawModifiers.color) ? this.drawModifiers.color : "#FF0000";
		this.context.fillText(text, this.drawPt.x, this.drawPt.y);
	}
	else
	{
		this.context.lineWidth = (width) ? width : "1";
		this.context.strokeStyle = (this.drawModifiers.color) ? this.drawModifiers.color : "#FF0000";
		this.context.strokeText(text, this.drawPt.x, this.drawPt.y);
		
/*		this.context.beginPath();
		this.context.rect(ptAx, ptAy, boxSides.w, boxSides.h);
		this.context.lineWidth = 1;
		this.context.strokeStyle = color;
		this.context.stroke();	/**/
	}
	this.context.textAlign = 'left';
	
};


/*		GAMEVIEW.drawFromAnimationFrame( frame, this.target.absPosition, {x:0,y:0}, this.target.absBox.ptC, this.target.drawLayer, null );
/**/
GAMEVIEW.drawFromAnimationFrame = function(frame, wPt, vShift, type)
{
	if(frame == null)	return;
	
	var imgFrame = GAMEANIMATIONS.getImageFrame(frame.imgNum, frame.imgFrameNum);
	if(imgFrame == null)	return;
			
	var zoom = 1;
        if(typeof GAMEVIEW.drawModifiers.scale !== "undefined")         zoom=GAMEVIEW.drawModifiers.scale;

	var cam = GAMEVIEW.fetchCamera(type);
	var camShift = cam.getCameraShift();
	zoom = cam.zoom;
        

	this.drawSize.w = frame.scale.w*imgFrame.dim.w;
	this.drawSize.h = frame.scale.h*imgFrame.dim.h;
	
	var ptAx = wPt.x;
	var ptAy = wPt.y;
    
	if(typeof vShift === "undefined")	vShift = null;
	if(vShift == null)			vShift = {x:0,y:0};

	ptAx -= imgFrame.baseKeypt.x *frame.scale.w;
	ptAy -= imgFrame.baseKeypt.y *frame.scale.h;
	
	this.drawPt = GAMEVIEW.PtToDrawCoords(ptAx, ptAy, type);

	this.drawSize.w = Math.abs(this.drawSize.w)/zoom;
	this.drawSize.h = Math.abs(this.drawSize.h)/zoom;

	if(typeof this.loadedImgs[frame.imgNum] === "undefined")	return;
	var img = this.loadedImgs[frame.imgNum].img;
	if(typeof img === "undefined" || img == null)	return;

		//draw frame
		this.context.save();
		this.context.scale(1,1);

		this.context.drawImage(img, 

			imgFrame.pos.x,imgFrame.pos.y,   //sprite sheet top left 
			imgFrame.dim.w, imgFrame.dim.h,    	//sprite sheet width/height
			this.drawPt.x, this.drawPt.y, //destination x/y
			this.drawSize.w,this.drawSize.h     
			   //destination width/height  (this can be used to scale)
		);
		this.context.restore();

};
