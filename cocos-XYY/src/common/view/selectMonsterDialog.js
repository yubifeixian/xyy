var selectMonsterDialogLayer=BaseDialogLayer.extend({
	message:null,
	monsterArray:null,
	cardButtonList:null,
	confirmButton:null,
	result:null,
	callBack:null,
	ctor:function(message,monsterArray,callBack){
		this._super();
		this.message=message;
		this.monsterArray=monsterArray;
		this.cardButtonList=new Array();
		this.callBack=callBack;
		this.init();
	},
	init:function(){
		var temp=this;
		var dialog=ccs.load(res.SelectMonsterDialog_json);
		var messageLabel=ccui.helper.seekWidgetByName(dialog.node, "messageLabel");
		messageLabel.setString(this.message);
		var listView=ccui.helper.seekWidgetByName(dialog.node, "listView");
		listView.setBackGroundColor(cc.color(70, 154, 155, 51));
		var imageButton=ccui.helper.seekWidgetByName(dialog.node, "imageButton");
		listView.removeAllItems();
		for(var i=0;i<this.monsterArray.length;i++){
			var imageButtonClone=imageButton.clone();
			var tempMonster=topMonsterCard(this.monsterArray[i]);
			imageButtonClone.setUserData(tempMonster);
			imageButtonClone.setOpacity(180);
			imageButtonClone.loadTexture(tempMonster.monsterPicSrc);
			this.cardButtonList.push(imageButtonClone);
			listView.pushBackCustomItem(imageButtonClone);
		}
		
		var monsterLabelLongClickFunction=function(monster){
			isLongClick=true;
			var message;
			if(monster.dodge>0&&monster.level!="危机"){
				message=monster.name+"\n战力:"+monster.combat+"\n闪避:"+monster.dodge+"\n宠物效果:"+monster.petEffectText+
				"\n\n出场效果:"+monster.openEffectText+"\n\n胜利结算:"+monster.winEffectText+"\n\n失败结算:"+monster.loseEffectText;
			}else if(monster.level!="危机"){
				message=monster.name+"\n战力:"+monster.combat+"\nNPC效果1:"+monster.winEffectText+"\nNPC效果2:"+monster.loseEffectText;
			}else{
				message=monster.name+"\n翻出效果:"+monster.openEffectText+"\n混战效果:"+monster.winEffectText;
			}
			mainScene.addChild(new messageDialogLayer(message,function(){
				isLongClick=false;
			}));
		}
		for(var i=0;i<this.cardButtonList.length;i++){
			this.cardButtonList[i].addTouchEventListener(function(sender,type){
				var monster=sender.getUserData();
				if(type==0){
					this.scheduleOnce(function(){
						monsterLabelLongClickFunction(monster);
					}, 1);
				}else if(type==2){
					this.unscheduleAllCallbacks();
					if(isLongClick){
						isLongClick=false;
					}else{
						for(var i=0;i<temp.cardButtonList.length;i++){
							if(temp.cardButtonList[i]==sender){
								sender.setOpacity(255);
							}else{
								temp.cardButtonList[i].setOpacity(180);
							}
						}
						temp.result=monster;
						// temp.result=sender.getUserData();
					}
				}
			},this.cardButtonList[i]);
		}
		this.confirmButton=ccui.helper.seekWidgetByName(dialog.node, "confirmButton");
		this.confirmButton.addTouchEventListener(function(sender,type){
			if(type==2){
				// cc.log("你选择了"+temp.result.name);
				temp.sendResult();
			}
		}, this.confirmButton);
		this.schedule(temp.refulsh);
		this.addChild(dialog.node);
	},
	refulsh:function(){
		if(this.result==null){
			buttonManager(this.confirmButton,false, false);
		}else{
			buttonManager(this.confirmButton,true, true);
		}
		
	},
	sendResult:function(){
		var temp=this;
		cc.eventManager.resumeTarget(mainScene, true);
		// cc.eventManager.dispatchCustomEvent("dialogEvent",temp.event.getUserData());
		this.removeFromParent(true);
		this.callBack(this.result);
	}
})