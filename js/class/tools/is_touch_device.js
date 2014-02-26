// http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript

function is_touch_device() {
    return 'ontouchstart' in window
        || 'onmsgesturechange' in window;
};