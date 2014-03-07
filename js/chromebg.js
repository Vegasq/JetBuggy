var appWin = null;
function onBoundsChanged() {
    console.log('onBoundsChanged');
    window.location = window.location;
}

chrome.app.runtime.onLaunched.addListener(function() {
    var screenWidth = screen.availWidth;
    var screenHeight = screen.availHeight;
    var width = parseInt(screenWidth * 0.7, 10);
    var height = parseInt(screenHeight * 0.7, 10);

    chrome.app.window.create('index.html', {
        'bounds': {
            'width': width,
            'height': height
        },
        'resizable': false,
        },
        function(win){
            appWin = win;
            win.onBoundsChanged.addListener(onBoundsChanged);
            onBoundsChanged();
        }
    );
});


