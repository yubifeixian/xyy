var selectPetsDialogLayer=BaseDialogLayer.extend({
	message:null,
	pet1Button:null,
	pet2Button:null,
	pet3Button:null,
	pet4Button:null,
	pet5Button:null,
	player:null,
	result:null,
	callBack:null,
	ctor:function(message,player,callBack){
		this._super();
		this.message=message;
		this.player=player;
		this.callBack=callBack;
		this.init();
	},
	init:function(){
		var temp=this;
		var dialog=ccs.load(res.SelectPetsDialog_json);
		var messageLabel=ccui.helper.seekWidgetByName(dialog.node, "messageLabel");
		messageLabel.setString(this.message);
		this.pet1Button=ccui.helper.seekWidgetByName(dialog.node, "pet1Button");
		if(this.player.pet_Feng=="风系宠物"){
			this.pet1Button.setTitleText("风属性宠物：无");
			buttonManager(this.pet1Button, false, false);
		}else{
			this.pet1Button.setTitleText("风属性宠物："+this.player.pet_Feng);
		}
		this.pet1Button.addTouchEventListener(function(sender,type){
			if(type==2){
				cc.log("风属性宠物");
				temp.result=temp.player.pet_FengMonster;
				temp.sendResult();
			}
		}, this.pet1Button);
		
		this.pet2Button=ccui.helper.seekWidgetByName(dialog.node, "pet2Button");
		if(this.player.pet_Lei=="雷系宠物"){
			this.pet2Button.setTitleText("雷属性宠物：无");
			buttonManager(this.pet2Button, false, false);
		}else{
			this.pet2Button.setTitleText("雷属性宠物："+this.player.pet_Lei);
		}
		this.pet2Button.addTouchEventListener(function(sender,type){
			if(type==2){
				cc.log("雷属性宠物");
				temp.result=temp.player.pet_LeiMonster;
				temp.sendResult();
			}
		}, this.pet2Button);
		
		this.pet3Button=ccui.helper.seekWidgetByName(dialog.node, "pet3Button");
		if(this.player.pet_Shui=="水系宠物"){
			this.pet3Button.setTitleText("水属性宠物：无");
			buttonManager(this.pet3Button, false, false);
		}else{
			this.pet3Button.setTitleText("水属性宠物："+this.player.pet_Shui);
		}
		this.pet3Button.addTouchEventListener(function(sender,type){
			if(type==2){
				cc.log("水属性宠物");
				temp.result=temp.player.pet_ShuiMonster;
				temp.sendResult();
			}
		}, this.pet3Button);
		
		this.pet4Button=ccui.helper.seekWidgetByName(dialog.node, "pet4Button");
		if(this.player.pet_Huo=="火系宠物"){
			this.pet4Button.setTitleText("火属性宠物：无");
			buttonManager(this.pet4Button, false, false);
		}else{
			this.pet4Button.setTitleText("火属性宠物："+this.player.pet_Huo);
		}
		this.pet4Button.addTouchEventListener(function(sender,type){
			if(type==2){
				cc.log("火属性宠物"+temp.player.pet_HuoMonster.name);
				temp.result=temp.player.pet_HuoMonster;
				temp.sendResult();
			}
		}, this.pet4Button);

		this.pet5Button=ccui.helper.seekWidgetByName(dialog.node, "pet5Button");
		if(this.player.pet_Tu=="土系宠物"){
			this.pet5Button.setTitleText("土属性宠物：无");
			buttonManager(this.pet5Button, false, false);
		}else{
			this.pet5Button.setTitleText("土属性宠物："+this.player.pet_Tu);
		}
		this.pet5Button.addTouchEventListener(function(sender,type){
			if(type==2){
				cc.log("土属性宠物");
				temp.result=temp.player.pet_TuMonster;
				temp.sendResult();
			}
		}, this.pet5Button);
		this.addChild(dialog.node);
	},
	sendResult:function(){
		var temp=this;
		//cc.eventManager.resumeTarget(mainScene, true);
		this.removeFromParent(true);
		this.callBack(this.result);
	}
})