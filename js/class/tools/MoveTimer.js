function MoveTimer(main){
    "use strict";
    var that = this;
    that.main = main;

    that.last_call_time = 0;

    that.px = SETTINGS.speed_px;
    that.ms = SETTINGS.speed_ms;

    that.buffer = 0;

    that.get_time = function(){
        var d = new Date();
        return d.getTime();
    }

    that.set_last_call_time = function(){
        that.last_call_time = that.get_time();
    }

    that.get_x = function(){
        var new_time = that.get_time();
        var diff = new_time - that.last_call_time;
        that.last_call_time = new_time;
        that.buffer += (diff / that.ms) * that.px;
        if(that.buffer > 1){
            var abs_val = Math.floor(that.buffer);
            that.buffer = that.buffer - abs_val;
            return abs_val;
        }
        return 0;
    }
}