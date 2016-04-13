var SelectSkillDialogLayer=cc.LayerColor.extend({
	skillButton1:null,
	skillButton2:null,
	skillButton3:null,
	targetPlayer:null,
	headImageView:null,
	callBack:null,
	result:null,
	ctor:function(targetPlayer,callBack){
		this._super(cc.color(0, 0, 0, 200));
		this.targetPlayer=targetPlayer;
		this.init();
		this.callBack=callBack;
	},
	init:function(){
		var temp=this;
		var dialog=ccs.load(res.SelectSkillDialog_json).node;
		this.skillButton1=ccui.helper.seekWidgetByName(dialog, "skillButton1");
		this.skillButton1.setTitleText(this.targetPlayer.skill_1);
		this.skillButton1.addClickEventListener(function(){
			temp.result=1;
			temp.sendResult();
		});
		this.skillButton2=ccui.helper.seekWidgetByName(dialog, "skillButton2");
		this.skillButton2.setTitleText(this.targetPlayer.skill_2);
		this.skillButton2.addClickEventListener(function(){
			temp.result=2;
			temp.sendResult();
		});
		this.skillButton3=ccui.helper.seekWidgetByName(dialog, "skillButton3");
		this.skillButton3.setTitleText(this.targetPlayer.skill_3);
		this.skillButton3.addClickEventListener(function(){
			temp.result=3;
			temp.sendResult();
		});
		if(this.targetPlayer.skill_3==""||this.targetPlayer.skill_3==Text.nil){
			this.skillButton3.setVisible(false);
		}
		this.headImageView=ccui.helper.seekWidgetByName(dialog, "headImageView");
		this.headImageView.loadTexture(this.targetPlayer.playerPicSrc);
		this.addChild(dialog);
	},
	sendResult:function(){
		cc.eventManager.resumeTarget(mainScene, true);
		this.removeFromParent(true);
		this.callBack(this.result);
	}
});