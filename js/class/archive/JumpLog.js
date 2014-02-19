function JumpLog(){
    var that = this;
    that.jlog = [];
    that.last_action = 0;
    that.tmp_action = 0;
    that.diff = 0;

    that.init = function(){
        that.jlog = [];
        that.last_action = new Date().getTime();
    }

    that.click = function(){
        that.tmp_action = new Date().getTime();
        that.jlog.push(that.tmp_action - that.last_action)
        that.last_action = that.tmp_action;

    }

    that.get_last = function(){
        return that.jlog;
    }
}