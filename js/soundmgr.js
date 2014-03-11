
function Soundmgr(){
    "use strict";
    var that = this;
	
	that.engine = false;
	that.explosion = false;
	that.jump = false;
	
	that.create = function()
	{
		that.engine = game.add.audio( "snd_engine" );
		that.explosion = game.add.audio( "snd_explosion" );
		that.jump = game.add.audio( "snd_jump" );
	}
	
	that.start_engine = function()
	{
		that.engine.play( '', 0, 1, true, false );
	}
	
	that.stop_engine = function()
	{
		that.engine.stop();
	}
	
	that.start_explosion = function()
	{
		that.explosion.play( '', 0, 1, false, false );
	}
	
	that.start_jump = function()
	{
		that.jump.play( '', 0, 1, false, false );
	}

}