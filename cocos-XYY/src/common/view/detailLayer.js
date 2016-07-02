var detailDialogLayer=BaseDialogLayer.extend({
	player:null,
	callBack:null,
	ctor:function(player,callBack){
		this._super();
		this.player=player;
		this.callBack=callBack;
		this.init();
	},
	init:function(){
		var dialog=ccs.load(res.detailLayer_json);
		var headImageView=ccui.helper.seekWidgetByName(dialog.node, "head");
		headImageView.loadTexture(this.player.playerPicSrc);
		var hpText=ccui.helper.seekWidgetByName(dialog.node, "hpText");
		hpText.setString(this.player.hp+"/"+this.player.maxHP);
		var combatText=ccui.helper.seekWidgetByName(dialog.node, "combatText");
		combatText.setString(this.player.combat);
		var extentText=ccui.helper.seekWidgetByName(dialog.node, "extentText");
		extentText.setString(this.player.extent);
		var nameText=ccui.helper.seekWidgetByName(dialog.node, "nameText");
		nameText.setString(this.player._name);
		var listView=ccui.helper.seekWidgetByName(dialog.node, "ListView");
		var skillText=ccui.helper.seekWidgetByName(dialog.node, "skillText");
		skillText.ignoreContentAdaptWithSize(true);
		var message=Text.showSkill.format(this.player.skill_1,this.player.skill1Effect,this.player.skill_2,this.player.skill2Effect);
		if(this.player.skill_3!=Text.nil&&this.player.skill_3!=""){
			message+="【"+this.player.skill_3+"】\n"+this.player.skill3Effect;
		}
		skillText.ignoreContentAdaptWithSize(false);
		skillText.setTextAreaSize(cc.size(300,5000));
		skillText.setString(message);
		var temp=this;
		var confirmButton=ccui.helper.seekWidgetByName(dialog.node, "confirmButton");
		confirmButton.addTouchEventListener(function(sender,type){
			if(type==2){
				cc.eventManager.resumeTarget(temp.getParent(), true);
				temp.removeFromParent();
				if(temp.callBack!=null){
					temp.callBack();
				}
			}
		}, confirmButton);
		this.addChild(dialog.node);
	}
})