
function FrameClock() {
}

FrameClock.prototype.identity = function() {
	return ('FrameClock ()');
};

FrameClock.prototype.init = function() {
	this.isActive = false;

	var d = new Date();
	this.startTime = d.getTime();
	this.stopTime = this.startTime;
	this.savedTime = this.startTime;
};

FrameClock.prototype.restart = function()
{
	var d = new Date();
	this.startTime = d.getTime();
	this.stopTime = 0;
	this.isActive = true;
	this.savedTime = this.startTime;
}
FrameClock.prototype.clear = function()
{
	var d = new Date();
	this.startTime = d.getTime();
	this.stopTime = this.startTime;
	this.savedTime = this.startTime;
}
FrameClock.prototype.start = function()
{
	var d = new Date();
	this.startTime = d.getTime() - this.elapsedMS();
	this.stopTime = 0;
	this.isActive = true;
}
FrameClock.prototype.stop = function()
{
	var d = new Date();
	this.stopTime = d.getTime();
	this.isActive = false;
};
FrameClock.prototype.elapsedMS = function()
{
	var d = new Date();
	if( this.isActive==false )		return (this.stopTime - this.startTime);

	return (d.getTime() - this.startTime);
};

FrameClock.prototype.saveTime = function()
{
	this.savedTime = this.elapsedMS();
};
FrameClock.prototype.getSavedMS = function()
{
	return this.savedTime;
};


FrameClock.alloc = function() {
	var vc = new FrameClock();
	vc.init();
	return vc;
}

