var duniangziDialogLayer=cc.LayerColor.extend({
	result:null,
	player:null,
	callBack:null,
	arms1Button:null,
	arms2Button:null,
	defenseButton:null,
	handCardButton:null,
	ornamentButton:null,
	closeButton:null,
	ctor:function(player,callBack){
		this._super(cc.color(0, 0, 0, 200));
		this.player=player;
		this.callBack=callBack;
		this.init();
		this.scheduleUpdate();
	},
	init:function(){
		var temp=this;
		var dialog=ccs.load(res.DuniangziEffectDialog);
		this.arms1Button=ccui.helper.seekWidgetByName(dialog.node, "selectButton1");
		this.arms1Button.addTouchEventListener(function(sender,type){
			if(type==2){
				this.result=SelectCardType.ARMS1;
				textAreaAddMessage(temp.player._name+"丢弃武器:"+temp.player.arms1+"，HP+2", myText, listView);
				remove_Card_Into_DropDeck(temp.player.arms1);
				temp.player.arms1Combat = 0;
				temp.player.arms1Extent = 0;
				temp.player.arms1 = "无";
				for(var d=0;d<2;d++){
					baseEffectAddHP(temp.player);
				}
				has_Tianshezhang(temp.player);
			}
		}, this.arms1Button);
		
		this.arms2Button=ccui.helper.seekWidgetByName(dialog.node, "selectButton2");
		this.arms2Button.addTouchEventListener(function(sender,type){
			if(type==2){
				this.result=SelectCardType.ARMS2;
				textAreaAddMessage(temp.player._name+"丢弃武器:"+temp.player.arms2+"，HP+2", myText, listView);
				remove_Card_Into_DropDeck(temp.player.arms2);
				temp.player.arms2Combat = 0;
				temp.player.arms2Extent = 0;
				temp.player.arms2 = "无";
				for(var d=0;d<2;d++){
					baseEffectAddHP(temp.player);
				}
				has_Tianshezhang(temp.player);
			}
		}, this.arms2Button);
		
		this.defenseButton=ccui.helper.seekWidgetByName(dialog.node, "selectButton3");
		this.defenseButton.addTouchEventListener(function(sender,type){
			if(type==2){
				this.result=SelectCardType.DEFENSE;
				textAreaAddMessage(temp.player._name+"丢弃防具:"+temp.player.defense+"，HP+2", myText, listView);
				remove_Card_Into_DropDeck(temp.player.defense);
				temp.player.defenseCombat = 0;
				temp.player.defenseExtent = 0;
				temp.player.defense = "无";
				for(var d=0;d<2;d++){
					baseEffectAddHP(temp.player);
				}
				has_Tianshezhang(temp.player);
			}
		}, this.defenseButton);
		
		this.handCardButton=ccui.helper.seekWidgetByName(dialog.node, "selectButton4");
		this.handCardButton.addTouchEventListener(function(sender,type){
			if(type==2){
				this.result=SelectCardType.HANDCARD;
				addDialog(mainScene, new selectCardDialogLayer("请选择要丢弃的手牌",temp.player.handCard,1,temp.player.handCard.length,false,function(result){
					for(var i=0;i<result.length;i++){
						for(var t=0;t<temp.player.handCard.length;t++){
							if(result[i].name==temp.player.handCard[t].name){
								remove_Card_Into_DropDeck(result[i].name);
								temp.player.handCard.removeObject(result[i]);
								result[i].removeFromParent();
								textAreaAddMessage(temp.player._name+"丢弃手牌【"+result[i].name+"】，HP+2", myText, listView);
								for(var d=0;d<2;d++){
									baseEffectAddHP(temp.player);
								}
								has_Tianshezhang(temp.player);
							}
						}
					}
				}));
			}
		}, this.handCardButton);
		
		this.ornamentButton=ccui.helper.seekWidgetByName(dialog.node, "selectButton5");
		this.ornamentButton.addTouchEventListener(function(sender,type){
			if(type==2){
				addDialog(mainScene, new selectCardDialogLayer("请选择丢弃的饰品",temp.player.skillTempList,1,player1.skillTempList.length,false,function(resultList){
					for(var i=0;i<resultList.length;i++){
						remove_Card_Into_DropDeck(resultList[i].name);
						temp.player.skillTempList.removeObject(resultList[i]);
						temp.player.maxCombat--;
						textAreaAddMessage("王蓬絮丢弃【"+resultList[i].name+"】,HP+2", myText, listView);
						for(var d=0;d<2;d++){
							baseEffectAddHP(temp.player);
						}
						has_Tianshezhang(temp.player);
					}
				}));
			}
		}, this.ornamentButton);
		
		this.closeButton=ccui.helper.seekWidgetByName(dialog.node, "closeButton");
		this.closeButton.addTouchEventListener(function(sender,type){
			if(type==2){
				this.result=null;
				temp.sendResult();
			}
		}, this.closeButton);
		this.addChild(dialog.node);
	},
	update:function(dt){
		this.arms1Button.setTitleText("武器1:"+this.player.arms1);
		if(this.player.arms1=="无"){
			buttonManager(this.arms1Button, false, false);
		}
		this.arms2Button.setTitleText("武器2:"+this.player.arms2);
		if(this.player.arms2=="无"){
			buttonManager(this.arms2Button, false, false);
		}
		this.defenseButton.setTitleText("防具:"+this.player.defense);
		if(this.player.defense=="无"){
			buttonManager(this.defenseButton, false, false);
		}
		this.handCardButton.setTitleText("手牌数:"+this.player.handCard.length);
		if(this.player.handCard.length==0){
			buttonManager(this.handCardButton, false, false);
		}
		this.ornamentButton.setTitleText("饰品数:"+this.player.skillTempList.length);
		if(this.player._name!=nameWangpengxu||this.player.skillTempList.length==0){
			buttonManager(this.ornamentButton, false, false);
			if(this.player._name!=nameWangpengxu){
				this.ornamentButton.setVisible(false);
			}
		}
	},
	sendResult:function(){
		var temp=this;
		cc.eventManager.resumeTarget(mainScene, true);
		this.removeFromParent(true);
		//cc.eventManager.dispatchCustomEvent("dialogEvent",temp.event.getUserData());
		this.callBack(this.result);
	}
});