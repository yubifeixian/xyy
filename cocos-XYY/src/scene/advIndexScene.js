stageIdSave=null;
characterIdListSave=[];
canUseCharacterList=[];	// 当前关卡可以选择使用的角色列表
haveTiangangdouyi="false";	// 记录当前是否拥有仙宝【天罡斗衣】
haveShiziyaoshuo="false";	// 记录当前是否拥有仙宝【十字妖槊】
nowStage=null;
var AdvIndexSceneLayer=cc.Layer.extend({
	startButton:null,
	buttonVisible:false,
	ctor:function(){
		this._super();
		this.loadJsonFile();
		this.schedule(this.updateUI, 0.5);
	},
	loadJsonFile:function(){
		var root=ccs.load(res.advIndexScene_json).node;
		this.startButton=ccui.helper.seekWidgetByName(root, "startButton");
		var restartButton=ccui.helper.seekWidgetByName(root, "restartButton");
		var versionLabel=ccui.helper.seekWidgetByName(root, "versionText");
		var closeButton=ccui.helper.seekWidgetByName(root, "closeButton");
		versionLabel.setString(version);
		
		restartButton.addClickEventListener(function(){
			addDialog(root, new yesOrNoDialogLayer("是否重置关卡信息？(此操作无法撤销)",function(result){
				if(result){
					restartLocalStorgae();
				}
			},root));
		});
		this.startButton.addClickEventListener(function(){
			cc.director.runScene(new cc.TransitionFade(1.0,new AdvGameScene()));
		});
		
		closeButton.addClickEventListener(function(){
			cc.director.runScene(new IndexScene());
		})
		
		this.addChild(root);
		/*
		 * cc.eventManager.addListener({ event:
		 * cc.EventListener.TOUCH_ALL_AT_ONCE, onTouchesEnded:function (touches,
		 * event) { cc.director.runScene(new cc.TransitionFade(1.0,new
		 * GameScene())); //cc.director.runScene(new cc.TransitionFade(1.0,new
		 * IndexScene())); } }, this);
		 */
	},
	updateUI:function(){
		this.startButton.setVisible(this.buttonVisible);
		this.buttonVisible=!this.buttonVisible;
	}
})

var AdvIndexScene=cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer=new AdvIndexSceneLayer();
		this.addChild(layer);
	}
})