var Tools = {
    'screen_size': function(optimized){
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight|| e.clientHeight|| g.clientHeight;
            if(optimized){
                if (x > 1850){
                    x = 1850;
                }
                if (y > 800){
                    y = 800;
                }                
            }
            return [x, y];
    }
};