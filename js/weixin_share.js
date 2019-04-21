var onBridgeReady = function() {
    WeixinJSBridge.on('menu:share:appmessage',app_Message);
    WeixinJSBridge.on('menu:share:timeline',share_Timeline);
};

if (document.addEventListener) {
    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
} else if (document.attachEvent) {
    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
}

function app_Message(argv){
	 WeixinJSBridge.invoke('sendAppMessage', {
         "appid": '',
         //不用填写
         "img_url": 'http://'+window.location.host+'/haier/2014/images/m_qiubg.jpg?v=20140619001',
         "img_width": "640",
         //图片的大小
         "img_height": "960",
         //图片的大小
         "link": 'http://'+window.location.host+'/haier/2014/game.html',
         "desc": share_text,
         "title": share_text
     },
     function(res) {});
}


function share_Timeline(argv) { //分享到朋友圈
    WeixinJSBridge.invoke('shareTimeline', {
    	"img_url": 'http://'+window.location.host+'/haier/2014/images/m_qiubg.jpg?v=20140619001',
        "img_width": "640",
        //图片的大小
        "img_height": "960",
        //图片的大小
        "link": 'http://'+window.location.host+'/haier/2014/game.html',
        "desc": share_text,
        "title": share_text
    },
    function(res) {});
}

