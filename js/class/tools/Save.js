var chrome;
function Save(main){
    "use strict";
    var that = this;
    that.main = main;

    that.LEVEL_KEY = "CURRENT_LEVEL";
    that.LEVEL_1 = "WERTHJ>:<LMKJKGBJVRJTMNU";
    that.LEVEL_2 = "QW#$^&FUHJKOL{}KIJU*(OY(";
    that.LEVEL_3 = "&T*(HOUJIPJKL)U*K&*TY&*O";

    that.SOUND_KEY = "SOUND_STATUS";
    that.SOUND_ON = 'ON';
    that.SOUND_OFF = 'OFF';

    if (chrome !== undefined && chrome.hasOwnProperty('storage')){
        that.is_chrome_stor = true;
    } else {
        that.is_chrome_stor = false;
    }

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
        if (that.is_chrome_stor) {
            chrome.storage.sync.set({key: val}, function(data){ console.log(data); });
        } else {
            window.localStorage.setItem(key, val);
        }
    };

    that.get = function (key) {
        if (that.is_chrome_stor) {
            return chrome.storage.sync.get(key, function(data){ console.log(data); });
        } else {
            return window.localStorage.getItem(key);;
        }
    };

    that.supports_html5_storage = function() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    };

}