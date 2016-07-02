var SelectCardType={
		ARMS1:0,
		ARMS2:1,
		DEFENSE:3,
		HANDCARD:4,
		ORNAMENT:5	//王蓬絮“饰品”
}

var selectCardTypeDialogLayer=BaseDialogLayer.extend({
	message:null,
	player:null,
	selectButton1:null,
	selectButton2:null,
	selectButton3:null,
	selectButton4:null,
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
		var dialog=ccs.load(res.SelectCardTypeDialog_json);
		var messageLabel=ccui.helper.seekWidgetByName(dialog.node, "message");
		messageLabel.setString(this.message);
		this.selectButton1=ccui.helper.seekWidgetByName(dialog.node, "selectButton1");
		this.selectButton1.setTitleText("武器1："+this.player.arms1);
		if(this.player.arms1=="无"){
			buttonManager(this.selectButton1, false, false);
		}
		this.selectButton1.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=SelectCardType.ARMS1;
				temp.sendResult();
			}
		}, this.selectButton1);
		this.selectButton2=ccui.helper.seekWidgetByName(dialog.node, "selectButton2");
		if(this.player._name==nameWangpengxu){
			this.selectButton2.setTitleText("饰品："+this.player.skillTempList.length);
			if(this.player.skillTempList.length==0){
				buttonManager(this.selectButton2, false, false);
			}
		}else{
			this.selectButton2.setTitleText("武器2："+this.player.arms2);
			if(this.player.arms2=="无"){
				buttonManager(this.selectButton2, false, false);
			}
		}
		this.selectButton2.addTouchEventListener(function(sender,type){
			if(type==2){
				if(temp.player._name==nameWangpengxu){
					temp.result=SelectCardType.ORNAMENT;
				}else{
					temp.result=SelectCardType.ARMS2;
				}
				temp.sendResult();
			}
		}, this.selectButton2);
		this.selectButton3=ccui.helper.seekWidgetByName(dialog.node, "selectButton3");
		this.selectButton3.setTitleText("防具："+this.player.defense);
		if(this.player.defense=="无"){
			buttonManager(this.selectButton3, false, false);
		}
		this.selectButton3.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=SelectCardType.DEFENSE;
				temp.sendResult();
			}
		}, this.selectButton3);
		this.selectButton4=ccui.helper.seekWidgetByName(dialog.node, "selectButton4");
		this.selectButton4.setTitleText("手牌数："+this.player.handCard.length);
		if(this.player.handCard.length==0){
			buttonManager(this.selectButton4, false, false);
		}
		this.selectButton4.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=SelectCardType.HANDCARD;
				temp.sendResult();
			}
		}, this.selectButton4);
		this.addChild(dialog.node);
	},
	sendResult:function(){
		var temp=this;
		cc.eventManager.resumeTarget(mainScene, true);
		this.removeFromParent(true);
		this.callBack(this.result);
	}
});