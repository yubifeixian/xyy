var selectAdvNpcEffectDialogLayer=cc.Layer.extend({
	message:null,
	npcMonster:null,
	npcEffect1:null,
	npcEffect2:null,
	effectButton1:null,
	effectButton2:null,
	effectButton3:null,
	callBack:null,
	result:null,
	ctor:function(message,npcMonster,callBack){
		this._super();
		this.message=message;
		this.npcMonster=npcMonster;
		this.callBack=callBack;
		this.npcEffect1=npcEffectMapping(npcMonster.winEffectText);
		this.npcEffect2=npcEffectMapping(npcMonster.loseEffectText);
		this.init();
	},
	init:function(){
		var temp=this;
		var dialog=ccs.load(res.SelectNpcEffectDialog_json);
		var messageLabel=ccui.helper.seekWidgetByName(dialog.node, "messageLabel");
		messageLabel.setString(this.message);
		var npcImageView=ccui.helper.seekWidgetByName(dialog.node, "npcImageView");
		npcImageView.loadTexture(this.npcMonster.monsterPicSrc);
		this.effectButton1=ccui.helper.seekWidgetByName(dialog.node, "effectButton1");
		this.effectButton1.setTitleText(this.npcMonster.winEffectText);
		this.effectButton1.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=npcEffectMapping(temp.npcMonster.winEffectText);
				temp.sendResult();
			}
		}, this.effectButton1);
		
		this.effectButton2=ccui.helper.seekWidgetByName(dialog.node, "effectButton2");
		this.effectButton2.setTitleText(this.npcMonster.loseEffectText);
		if (this.npcMonster.loseEffectText=="加入") {
			var hasHandCardNumber = 0;
			for(var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++){
				if(nowPlayerTerm[nowPlayerNumber].friendList[i].handCard.length>0){
					hasHandCardNumber++;
				}
			}
			if (hasHandCardNumber == 0) {
				buttonManager(this.effectButton2, false, false);
			} else {
				var nextCheck=false;
				for(var i=0;i<canUseCharacterList.length;i++){
					if(canUseCharacterList[i]._name==this.npcMonster.name){
						nextCheck=true;
						break;
					}
				}
				if(nextCheck){
					for(var i=0;i<nowPlayerTerm.length;i++){
						if(nowPlayerTerm[i]._name==nameMoyi&&nowPlayerTerm[i].hp>0){
							//cc.log("魔翳检测到");
							for(var t=0;t<nowPlayerTerm[i].skillTempList.length;t++){
								if(nowPlayerTerm[i].skillTempList[t]._name==this.npcMonster.name){
									textAreaAddMessage("因魔翳“锁魂”效果，该NPC无法加入", myText, listView);
									buttonManager(this.effectButton2, false, false);
									break;
								}
							}
						}
						if((nowPlayerTerm[i]._name==nameMozun&&this.npcMonster.name==nameKonglin)
								||(nowPlayerTerm[i]._name==nameZhaolingerMengshe&&this.npcMonster.name==nameZhaolinger)){
							buttonManager(this.effectButton2, false, false);
							break;
						}
						if(nowPlayerTerm[i].hp>0&&nowPlayerTerm[i]._name==this.npcMonster.name){
							buttonManager(this.effectButton2, false, false);
							break;
						}
					}
				}else{
					buttonManager(this.effectButton2, false, false);
				}
			}
		}
		this.effectButton2.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=npcEffectMapping(temp.npcMonster.loseEffectText);
				//temp.result=2;
				temp.sendResult();
			}
		}, this.effectButton2);
		
		this.effectButton3=ccui.helper.seekWidgetByName(dialog.node, "effectButton3");
		this.effectButton3.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=null;
				temp.sendResult();
			}
		}, this.effectButton3);
		
		this.addChild(dialog.node);
	},
	sendResult:function(){
		var temp=this;
		cc.eventManager.resumeTarget(mainScene, true);
		//cc.eventManager.dispatchCustomEvent("dialogEvent",temp.event.getUserData());
		this.removeFromParent(true);
		this.callBack(this.result);
	}
});