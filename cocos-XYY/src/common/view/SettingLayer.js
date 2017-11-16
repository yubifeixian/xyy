var SettingLayer=BaseDialogLayer.extend({
	musicBtn:null,
	autoStepBtn:null,
	ctor:function(){
		this._super();
		this.loadJson();
		this.musicManager();
		this.autoStepManager();
	},
	loadJson:function(){
		var root=ccs.load(res.SettingLayer_json).node;
		var temp=this;
		var closeBtn=ccui.helper.seekWidgetByName(root, "closeBtn");
		closeBtn.addClickEventListener(function(){
			temp.removeFromParent();
		});
		this.musicBtn=ccui.helper.seekWidgetByName(root, "musicBtn");
		this.musicBtn.addClickEventListener(function(){
			musicSwitch=(musicSwitch=="true")?"false":"true";
			cc.sys.localStorage.setItem("musicSwitch",musicSwitch);
			temp.musicManager();
		});
		this.autoStepBtn=ccui.helper.seekWidgetByName(root, "AutoStepBtn");
		this.autoStepBtn.addClickEventListener(function(){
			autoNextStepSwitch=(autoNextStepSwitch=="true")?"false":"true";
			cc.sys.localStorage.setItem("autoNextStepSwitch",autoNextStepSwitch);
			temp.autoStepManager();
		});
		
		var tips=ccui.helper.seekWidgetByName(root, "tips");
		tips.addClickEventListener(function(){
			temp.addChild(new messageDialogLayer(Text.setting_autoNextStep));
		});
		this.addChild(root);
	},
	musicManager:function(){
		if(musicSwitch=="true"){
			this.musicBtn.loadTexture("res/drawable-hdpi/zhu_kai.png");
		}else{
			this.musicBtn.loadTexture("res/drawable-hdpi/zhu_guan.png");
		}
	},
	autoStepManager:function(){
		if(autoNextStepSwitch=="true"){
			this.autoStepBtn.loadTexture("res/drawable-hdpi/zhu_kai.png");
		}else{
			this.autoStepBtn.loadTexture("res/drawable-hdpi/zhu_guan.png");
		}
	}
})