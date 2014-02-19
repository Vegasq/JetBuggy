function Sizer(){
    var that = this;
    that.cache = {};
    that.jumpstory = [];

    that.convert_point = function(){

    };
    that.convert_size = function(orig_size, left, without_round){
        // Get num between 0 and 1
        var cache_key = "" + orig_size +"#"+ left +"#"+ without_round;
        if(that.cache.hasOwnProperty(cache_key)){
            return that.cache[cache_key];
        }
        var size = orig_size / 100;

        if(left){
            window_size = game.width;
        } else {
            window_size = game.height;
        }
        if (without_round){
            that.cache["" + size +"#"+ left +"#"+ without_round] = window_size * size;
            return window_size * size;
        }
        that.cache["" + size +'#'+ left +'#'+ without_round] = parseInt(window_size * size);
        return parseInt(window_size * size);
    };
}