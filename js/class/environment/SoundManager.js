function SoundManager(main){
    "use strict";
    var that = this;
    that.main = main;
    
    that.engine = false;
    that.explosion = false;
    that.jump = false;
    that.main_theme = false;

    that.is_paused = false;
    
    that.create = function()
    {
        that.engine = game.add.audio( "snd_engine" );
        that.explosion = game.add.audio( "snd_explosion" );
        that.jump = game.add.audio( "snd_jump" );
        if( Math.random() > 0.5 )
        {
            that.main_theme = game.add.audio( "snd_main_1" );
        }
        else
        {
            that.main_theme = game.add.audio( "snd_main_2" );
        }
        that.main_theme.play( '', 0, 1, true, false );

        if(that.main.save.get(that.main.save.SOUND_KEY) === that.main.save.SOUND_OFF){
            that.mute();
        }
    }
    
    that.start_main_theme = function()
    {
        that.main_theme.play( '', 0, 1, true, false );
    }
    
    that.start_engine = function()
    {
        that.engine.play( '', 0, 0.6, true, false );
    }
    
    that.stop_engine = function()
    {
        that.engine.stop();
    }
    
    that.start_explosion = function()
    {
        that.explosion.play( '', 0, 0.8, false, true );
    }
    
    that.start_jump = function()
    {
        that.jump.play( '', 0, 0.8, false, false );
    }

    that.mute = function(){
        if(that.is_paused === true){
            game.sound.mute = false;
            that.main.save.set(that.main.save.SOUND_KEY, that.main.save.SOUND_ON);
        } else {
            game.sound.mute = true;
            that.main.save.set(that.main.save.SOUND_KEY, that.main.save.SOUND_OFF);
        }
        that.is_paused = !that.is_paused;
    }

}