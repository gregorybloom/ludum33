




function AnimationModule() {
}
/*	AnimationModule.prototype = new Module;
/**/
AnimationModule.prototype.identity = function() {
	return ('AnimationModule (?)');
};



AnimationModule.prototype.init = function() {
/*	Module.prototype.init.call(this);
/**/	
	this.animates = false;
	this.drawCollection = -1;
	this.currentSequence = 0;
	this.currentFrame = 0;
	
	this.animStartTime = GAMEMODEL.getTime();
        
	this.animFinished = true;
	this.animRepeats = false;
	
	this.target = null;
	this.filter = null;
};

AnimationModule.prototype.draw = function() {

	if(this.target instanceof Actor && this.drawCollection >= 0)
	{
		var frame = GAMEANIMATIONS.getAnimationFrame(this.drawCollection, this.currentSequence, this.currentFrame);
//                console.log(this.currentFrame);

                GAMEVIEW.setWorldPt( this.target.posX, this.target.posY );
                GAMEVIEW.setWorldDim( this.target.sizeW/2, this.target.sizeH/2 );

		GAMEVIEW.drawFromAnimationFrame( frame, GAMEVIEW.worldPt, GAMEVIEW.worldDim );		
	}
};
AnimationModule.prototype.update = function() {
	this.updateCurrentAnimation();
	
	if(this.animates != false && this.drawCollection >= 0)
	{
		if(this.animFinished && this.animRepeats == false)	return;
		
		var curFrame = GAMEANIMATIONS.getNewAnimationFrame(this.drawCollection, this.currentSequence, this.currentFrame, this.animStartTime, this.animRepeats, this );

		if(curFrame < 0)
		{
			this.animFinished = true;
			curFrame -= curFrame;
		}
		if(curFrame >= 0)
		{
			this.currentFrame = curFrame;
		}
	}
};
AnimationModule.prototype.changeToAnimation = function(sequence, repeat) {
	repeat = typeof repeat !== 'undefined' ? repeat : false;
	if( this.currentSequence != sequence )
	{
		this.currentSequence = sequence;
		this.currentFrame = 0;
		
		this.animates = true;
		this.animRepeats = repeat;
		this.animFinished = false;
		this.animStartTime = GAMEMODEL.getTime();
	}
};
AnimationModule.prototype.updateCurrentAnimation = function() {
};



AnimationModule.alloc = function() {
	var vc = new AnimationModule();
	vc.init();
	return vc;
};
