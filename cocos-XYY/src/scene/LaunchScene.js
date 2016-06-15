var LaunchScene=cc.Scene.extend({
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
				//cc.director.runScene(new TestScene());
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