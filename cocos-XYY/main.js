/**
 * A brief explanation for "project.json": Here is the content of project.json
 * file, this is the global configuration for your game, you can modify it to
 * customize some behavior. The detail of each field is under it. {
 * "project_type": "javascript", // "project_type" indicate the program language
 * of your project, you can ignore this field
 * 
 * "debugMode" : 1, // "debugMode" possible values : // 0 - No message will be
 * printed. // 1 - cc.error, cc.assert, cc.warn, cc.log will print in console. //
 * 2 - cc.error, cc.assert, cc.warn will print in console. // 3 - cc.error,
 * cc.assert will print in console. // 4 - cc.error, cc.assert, cc.warn, cc.log
 * will print on canvas, available only on web. // 5 - cc.error, cc.assert,
 * cc.warn will print on canvas, available only on web. // 6 - cc.error,
 * cc.assert will print on canvas, available only on web.
 * 
 * "showFPS" : true, // Left bottom corner fps information will show when
 * "showFPS" equals true, otherwise it will be hide.
 * 
 * "frameRate" : 60, // "frameRate" set the wanted frame rate for your game, but
 * the real fps depends on your game implementation and the running environment.
 * 
 * "id" : "gameCanvas", // "gameCanvas" sets the id of your canvas element on
 * the web page, it's useful only on web.
 * 
 * "renderMode" : 0, // "renderMode" sets the renderer type, only useful on web : //
 * 0 - Automatically chosen by engine // 1 - Forced to use canvas renderer // 2 -
 * Forced to use WebGL renderer, but this will be ignored on mobile browsers
 * 
 * "engineDir" : "frameworks/cocos2d-html5/", // In debug mode, if you use the
 * whole engine to develop your game, you should specify its relative path with
 * "engineDir", // but if you are using a single engine file, you can ignore it.
 * 
 * "modules" : ["cocos2d"], // "modules" defines which modules you will need in
 * your game, it's useful only on web, // using this can greatly reduce your
 * game's resource size, and the cocos console tool can package your game with
 * only the modules you set. // For details about modules definitions, you can
 * refer to "../../frameworks/cocos2d-html5/modulesConfig.json".
 * 
 * "jsList" : [ ] // "jsList" sets the list of js files in your game. }
 * 
 */
var LOADINGBARPRONUM = 1;
var LOADINGBARPROALLNUM=0;
cc.game.onStart = function(){
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(960, 640, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    
    var failCount=0;
    var maxFailCount=1;
   /*
	 * var AssetsManagerLoaderScene=cc.Scene.extend({ _am:null, _progress:null,
	 * _message:null, _progressBar:null, _percent:0, run:function(){ //var
	 * layer=new cc.Layer(); //this.addChild(layer); var
	 * updateLayer=ccs.load(res.UpdateLayer_json);
	 * this._progressBar=ccui.helper.seekWidgetByName(updateLayer.node,
	 * "LoadingBar"); cc.log("进度条是否为空: "+this._progressBar==null);
	 * this._message=ccui.helper.seekWidgetByName(updateLayer.node, "message");
	 * this._message.setString("加载中...."); this.addChild(updateLayer.node);
	 * //GameFrameCache.setAllCache(this,this.setloadingbar);
	 * 
	 * //this._progress=new cc.LabelTTF("update 0%","Arial",12);
	 * //this._progress.x=cc.winSize.width/2;
	 * //this._progress.y=cc.winSize.height/2; //layer.addChild(this._progress);
	 * //查找手机的存储目录 var storagePath=(jsb.fileUtils ?
	 * jsb.fileUtils.getWritablePath():"./"); cc.log(storagePath);
	 * //发布安装包前，需要做项目res文件下下防止project.manifest文件，用于版本比较 this._am=new
	 * jsb.AssetsManager("res/project.manifest",storagePath); this._am.retain();
	 * 
	 * //如果无法加载本地project.manifest文件，则退出更新
	 * if(!this._am.getLocalManifest().isLoaded()){
	 * this._message.setString("Fail to update assets,step skipped");
	 * cc.log("Fail to update assets,step skipped!!!"); this.loadGame(); }else{
	 * var that=this; var listener=new
	 * jsb.EventListenerAssetsManager(this._am,function(event){ switch
	 * (event.getEventCode()) { //本地manifest文件读写出错 case
	 * jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
	 * that._message.setString("No local manifest file found,skip assets
	 * update"); cc.log("No local manifest file found,skip assets update!!!");
	 * that.loadGame(); break; //进度更新 case
	 * jsb.EventAssetsManager.UPDATE_PROGRESSION:
	 * that._percent=event.getPercent(); var msg=event.getMessage(); if(msg){
	 * that._message.setString(msg); cc.log(msg); } break;
	 * //下载或解析服务端的manifest文件出错 case
	 * jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST: case
	 * jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
	 * that._message.setString("Fail to download manifest file,update skipped");
	 * cc.log("Fail to download manifest file,update skipped"); that.loadGame();
	 * break; //跟服务器的manifest文件对比后发现已经是最新版 case
	 * jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
	 * that._message.setString("ALREADY_UP_TO_DATE");
	 * cc.log("ALREADY_UP_TO_DATE"); that.loadGame(); break; //更新完成 case
	 * jsb.EventAssetsManager.UPDATE_FINISHED: that._message.setString("update
	 * finished"); cc.log("update finished"); that.loadGame(); break;
	 * //更新失败，一般是网络错误，尝试重新下载 case jsb.EventAssetsManager.UPDATE_FAILED:
	 * that._message.setString("Update failed."+event.getMessage());
	 * cc.log("Update failed."+event.getMessage()); failCount++; if(failCount<maxFailCount){
	 * that._am.downloadFailedAssets(); }else{ that._message.setString("Reach
	 * maximum fail count,exit update process"); cc.log("Reach maximum fail
	 * count,exit update process"); failCount=0; that.loadGame(); } break;
	 * //更新过程中出错，一般为不可逆情况，所以只能直接启动游戏 case jsb.EventAssetsManager.ERROR_UPDATING:
	 * that._message.setString("Asset updatge
	 * error:"+event.getAssetId()+","+event.getMessage()); cc.log("Asset updatge
	 * error:"+event.getAssetId()+","+event.getMessage()); that.loadGame();
	 * break; case jsb.EventAssetsManager.ERROR_DECOMPRESS:
	 * cc.log(event.getMessage()); that.loadGame(); break; } });
	 * cc.eventManager.addListener(listener, 1); this._am.update();
	 * cc.director.runScene(this); } this.schedule(this.updateProgress,0.5); },
	 * loadGame:function(){ //jsList是jsList.js的变量，记录js文件列表
	 * cc.loader.loadJs(["src/jsList.js"], function(){ cc.loader.loadJs(jsList,
	 * function(){ cc.director.runScene(new IndexScene()); }); }); },
	 * updateProgress:function(dt){ //this._percent++;
	 * this._progressBar.setPercent(this._percent);
	 * //this._progress.string="update"+this._percent+"%"; }, //资源loadding
	 * buffer进度回调 setloadingbar:function(){ var pernum =
	 * parseInt(LOADINGBARPRONUM/LOADINGBARPROALLNUM *100); //Mlog.c("pernum >>"
	 * +pernum); LOADINGBARPRONUM++; if(this._progressBar!=null) {
	 * this._progressBar.setPercent(pernum); } //进度条加载完毕进行跳转 if(pernum==100) {
	 * //加载完毕 cc.log("加载完毕"); this.loadGame(); //Mlog.c("异步加载资源完毕");
	 * //PFuns.runEFFAttack_SP(this , "skill_dianjin" , "000" , 13, 6 , 3 ,1 ,
	 * 11111 , 1 ,1000 , null); } }, onExit:function(){
	 * cc.log("AssetsManager::onExit"); this._am.release(); this._super(); } });
	 */
    
    
    
    var MainScene=cc.Scene.extend({
    	_progressBar:null,
    	_message:null,
    	run:function(){
    		var updateLayer=ccs.load(res.UpdateLayer_json);
    		this._progressBar=ccui.helper.seekWidgetByName(updateLayer.node, "LoadingBar");
    		// this._progressBar.retain();
    		this._message=ccui.helper.seekWidgetByName(updateLayer.node, "message");
    		this.addChild(updateLayer.node);
    		cc.director.runScene(this);
    		GameFrameCache.setAllCache(this,function(){
    			this.setloadingbar();
    		});
    	},
    	loadGame:function(){
    		// jsList是jsList.js的变量，记录js文件列表
    		cc.loader.loadJs(["src/jsList.js"], function(){
    			cc.loader.loadJs(jsList, function(){
    				cc.director.runScene(new IndexScene());
    			});
    		});
    	},
    	// 资源loadding buffer进度回调
    	setloadingbar:function(){
    		var pernum = parseInt(LOADINGBARPRONUM/LOADINGBARPROALLNUM *100);
    		cc.log("pernum >>" +pernum);
    		this._message.setString("加载中... "+pernum+"%");
    		LOADINGBARPRONUM++;
    		this._progressBar.setPercent(pernum);
    		// 进度条加载完毕进行跳转
    		if(pernum==100)
    		{
    			// 加载完毕
    			cc.log("加载完毕");
    			this.loadGame();
    		}else{
    			cc.director.runScene(this);
    		}
    	}
    })
    new MainScene().run();
    // var scene=new AssetsManagerLoaderScene();
    // scene.run();
    
    // load resources
   /*
	 * cc.LoaderScene.preload(g_resources, function () {
	 * cc.director.runScene(new IndexScene()); }, this);
	 */
};
cc.game.run();