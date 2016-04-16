var failCount = 0; 
var maxFailCount = 1;   // 最大错误重试次数

var UpdateScene=cc.Scene.extend({
	_am:null, 
	_percent:0, 
	_progressBar:null,
	_message:null,
	run:function(){
		if (!cc.sys.isNative) { 
			this.loadGame(); 
			return; 
		}
		var updateLayer=new cc.Layer();
		var root=ccs.load(res.UpdateLayer_json).node;
		this._progressBar=ccui.helper.seekWidgetByName(root, "LoadingBar");
		this._message=ccui.helper.seekWidgetByName(root, "message");
		updateLayer.addChild(root);
		this.addChild(updateLayer);
		this._message.setText("正在检测更新信息....");
		var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "./");
		cc.log("storagePath is " + storagePath);
		this._am = new jsb.AssetsManager("res/project.manifest", storagePath); 
		this._am.retain();
		if (!this._am.getLocalManifest().isLoaded()){ 
			this._message.setText("更新检测失败");
			cc.log("Fail to update assets, step skipped."); 
			this.loadGame(); 
		}else{
			var that = this;
			var listener=new jsb.EventListenerAssetsManager(this._am,function(event){
				switch (event.getEventCode()){
				case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST: 
					that._message.setText("本地文件读取失败");
					cc.log("No local manifest file found, skip assets update."); 
					that.loadGame();
					break;
				case jsb.EventAssetsManager.UPDATE_PROGRESSION:
					that._percent = event.getPercent(); 
					cc.log(that._percent + "%"); 
					var msg = event.getMessage(); 
					if (msg) { 
						cc.log(msg); 
					} 
					break;
				case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST: 
				case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST: 
					that._message.setText("下载失败");
					cc.log("Fail to download manifest file, update skipped."); 
					that.loadGame(); 
					break; 
				case jsb.EventAssetsManager.ALREADY_UP_TO_DATE: 
					that._message.setText("正在更新，请稍候....");
					cc.log("ALREADY_UP_TO_DATE."); 
					that.loadGame(); 
					break; 
				case jsb.EventAssetsManager.UPDATE_FINISHED: 
					that._message.setText("更新完成");
					cc.log("Update finished."); 
					that.loadGame(); 
					break; 
				case jsb.EventAssetsManager.UPDATE_FAILED: 
					that._message.setText("更新失败，重试...");
					cc.log("Update failed. " + event.getMessage()); 
					failCount++; 
					if (failCount < maxFailCount){
						that._am.downloadFailedAssets(); 
					}else{
						that._message.setText("更新失败");
						cc.log("Reach maximum fail count, exit update process"); 
						failCount = 0; 
						that.loadGame(); 
					}
					break; 
				case jsb.EventAssetsManager.ERROR_UPDATING: 
					that._message.setText("资源访问失败");
					cc.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage()); 
					that.loadGame(); 
					break; 
				case jsb.EventAssetsManager.ERROR_DECOMPRESS: 
					cc.log(event.getMessage()); 
					that.loadGame(); 
					break; 
				default: 
					break; 
				}
			});
			cc.eventManager.addListener(listener, 1); 
			this._am.update(); 
			cc.director.runScene(this);
		}
		this.schedule(this.updateProgress, 0.5);
	},
	loadGame:function(){
		new LaunchScene().run();
	},
	updateProgress:function(dt){ 
		this._progressBar.setPercent(this._percent);  
		this._message.setText("update" + this._percent + "%"); 
	},
})