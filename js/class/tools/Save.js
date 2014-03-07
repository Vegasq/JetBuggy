function Save(main){
    "use strict";
    var that = this;
    that.main = main;
    that.ls = window.localStorage;

    that.LEVEL_KEY = "CURRENT_LEVEL";
    that.LEVEL_1 = "WERTHJ>:<LMKJKGBJVRJTMNU";
    that.LEVEL_2 = "QW#$^&FUHJKOL{}KIJU*(OY(";
    that.LEVEL_3 = "&T*(HOUJIPJKL)U*K&*TY&*O";

    that.get_current_level = function () {
        var level = that.get(that.LEVEL_KEY);

        if (level === that.LEVEL_1){
            return 1;
        }
        if (level === that.LEVEL_2){
            return 2;
        }
        if (level === that.LEVEL_3){
            return 3;
        }

        that.set(that.LEVEL_KEY, that.LEVEL_1);
        return 1;
    };

    that.unlock_next_level = function () {
        var level = that.get(that.LEVEL_KEY);

        if (level === that.LEVEL_1){
            that.set(that.LEVEL_KEY, that.LEVEL_2);
        }
        if (level === that.LEVEL_2){
            that.set(that.LEVEL_KEY, that.LEVEL_3);
        }
    };

    that.set = function (key, val) {
        that.ls.setItem(key, val);
    };

    that.get = function (key) {
        return that.ls.getItem(key);;
    };

    that.supports_html5_storage = function() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    };

}