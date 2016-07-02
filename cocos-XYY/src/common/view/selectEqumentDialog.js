var selectEqumentDialogLayer=BaseDialogLayer.extend({
	arms1Button:null,
	arms2Button:null,
	defenseButton:null,
	ornamentButton:null,
	player:null,
	result:null,
	callBack:null,
	message:null,
	ctor:function(message,player,callBack){
		this._super();
		this.player=player;
		this.result=null,
		this.message=message;
		this.callBack=callBack,
		this.init();
	},
	init:function(){
		var temp=this;
		var dialog=ccs.load(res.SelectCardTypeDialog_json);
		var messageLabel=ccui.helper.seekWidgetByName(dialog.node, "message");
		messageLabel.setString(this.message);
		this.arms1Button=ccui.helper.seekWidgetByName(dialog.node, "selectButton1");
		this.arms1Button.setTitleText("武器1："+this.player.arms1);
		if(this.player.arms1=="无"){
			buttonManager(this.arms1Button,false, false);
		}
		this.arms1Button.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=SelectCardType.ARMS1;
				temp.sendResult();
			}
		},this.arms1Button);
		
		this.arms2Button=ccui.helper.seekWidgetByName(dialog.node, "selectButton2");
		this.arms2Button.setTitleText("武器2："+this.player.arms2);
		if(this.player.arms2=="无"){
			buttonManager(this.arms2Button,false, false);
		}
		this.arms2Button.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=SelectCardType.ARMS2;
				temp.sendResult();
			}
		},this.arms2Button);
		
		this.defenseButton=ccui.helper.seekWidgetByName(dialog.node, "selectButton3");
		this.defenseButton.setTitleText("防具："+this.player.defense);
		if(this.player.defense=="无"){
			buttonManager(this.defenseButton,false, false);
		}
		this.defenseButton.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=SelectCardType.DEFENSE;
				temp.sendResult();
			}
		},this.defenseButton);
		
		this.ornamentButton=ccui.helper.seekWidgetByName(dialog.node, "selectButton4");
		this.ornamentButton.setTitleText("饰品："+this.player.skillTempList.length);
		if(this.player._name!=nameWangpengxu||this.player.skillTempList.length<=0){
			buttonManager(this.ornamentButton,false, false);
		}
		if(this.player._name!=nameWangpengxu){
			this.ornamentButton.setVisible(false);
		}
		this.ornamentButton.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=SelectCardType.ORNAMENT;
				temp.sendResult();
			}
		},this.ornamentButton);
		this.addChild(dialog.node);
	},
	sendResult:function(){
		var temp=this;
		cc.eventManager.resumeTarget(mainScene, true);
		this.removeFromParent(true);
		this.callBack(this.result);
		//cc.eventManager.dispatchCustomEvent("dialogEvent",temp.event.getUserData());
	}
});