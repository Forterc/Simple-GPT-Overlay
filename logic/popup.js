function _getframe(){
    return document.querySelector('iframe#gptframe')
}
function _getHTML(){
    return document.children[0]
}
function resize(){
    document.body.style.width = _getframe().style.width;
    document.body.style.height = document.body.style.width;
    _getHTML().style.width = document.body.style.width;
    _getHTML().style.height = document.body.style.width;
    let evt = document.createEvent('UIEvents');
    evt.initUIEvent('resize', true, false,window,0);
    window.dispatchEvent(evt);
}
window.addEventListener('load', function(){
    var headerDiv = document.querySelector('#header');
    var targetFrame = _getframe()
    var maxWidth = screen.width;
    resize();
    headerDiv.querySelector('.App_close').addEventListener('click', function(e) {
        window.close();
        e.preventDefault();
    });

    headerDiv.querySelector('.App_minimize').addEventListener('click', function(e) {
        var width = targetFrame.style.width.replace('px','')
        if(width < 60) return;
        targetFrame.style.width = Number(width) - 50 + "px";
        targetFrame.style.height = Number(width) - 50 + "px";
        resize();
        e.preventDefault();
    });

    headerDiv.querySelector('.App_plus').addEventListener('click', function(e) {
        if(width+60 > maxWidth) return;
        var width = targetFrame.style.width.replace('px','')
        targetFrame.style.width = Number(width) + 50 + "px";
        targetFrame.style.height = Number(width) + 50 + "px";
        resize();
        e.preventDefault();
    });
})