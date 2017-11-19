ChooseLayer=cc.Layer.extend({
	friendSelect:null,
	messageLabel:null,
	mySelect1ImageView:null,
	mySelect1TextView:null,
	mySelect2ImageView:null,
	mySelect2TextView:null,
	mySelect3ImageView:null,
	mySelect3TextView:null,
	mySelect4ImageView:null,
	mySelect4TextView:null,
	returnButton:null,
	ctor:function(){
		this._super();
		this.init();
	},
	init:function(){
		player2=new Player();
		player3=new Player();
		player4=new Player();
		
		var characterList=getCharacterList();
		characterCardManager(player2,characterList[0]);
		//characterCardManager(player2,46);
		characterCardManager(player3,characterList[11]);
		//characterCardManager(player3,5);
		characterCardManager(player4,characterList[21]);
		//characterCardManager(player4,46);
		
		var tempPlayer1=new Player();
		characterCardManager(tempPlayer1,characterList[3]);
		//characterCardManager(tempPlayer1,44);
		var tempPlayer2=new Player();
		characterCardManager(tempPlayer2,characterList[9]);
		characterCardManager(tempPlayer2,46);
		var tempPlayer3=new Player();
		characterCardManager(tempPlayer3,characterList[15]);
		var tempPlayer4=new Player();
		characterCardManager(tempPlayer4,characterList[20]);
		// characterCardManager(tempPlayer4,33);
		var chooseLayerRoot=ccs.load(res.ChooseScenc_josn);
		this.returnButton=ccui.helper.seekWidgetByName(chooseLayerRoot.node, "returnButton");
		this.returnButton.addTouchEventListener(function(sender,type){
			if(type==2){
				cc.director.runScene(new IndexScene());
			}
		}, this.returnButton);
		
		
		var showFriendSkill=function(){
			cc.eventManager.pauseTarget(this, true);
			isLongClick=true;
			this.addChild(new detailDialogLayer(player2,function(){
				isLongClick=false;
				cc.eventManager.resumeTarget(temp, true);
			}));
		};
		this.friendSelect=ccui.helper.seekWidgetByName(chooseLayerRoot.node, "friendSelect");
		this.friendSelect.loadTexture(player2.playerPicSrc);
		this.friendSelect.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(showFriendSkill,1);
			}else if(type==2){
				this.unschedule(showFriendSkill);
				if(isLongClick){
					isLongClick=false;
				}
			}
		}, this);
		
		
		this.messageLabel=ccui.helper.seekWidgetByName(chooseLayerRoot.node, "message");
		this.messageLabel.setString(Text.friendChooseCharacter.format(player2._name));
		this.mySelect1ImageView=ccui.helper.seekWidgetByName(chooseLayerRoot.node, "mySelect1ImageView");
		
		var temp=this;
		var showSelect1Skill=function(){
			cc.eventManager.pauseTarget(this, true);
			isLongClick=true;
			this.addChild(new detailDialogLayer(tempPlayer1,function(){
				// isLongClick=false;
				cc.eventManager.resumeTarget(temp, true);
			}));
		};
		
		this.mySelect1ImageView.loadTexture(tempPlayer1.playerPicSrc);
		this.mySelect1ImageView.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(showSelect1Skill, 1);
			}else if(type==2){
				this.unschedule(showSelect1Skill);
				if(isLongClick){
					isLongClick=false;
				}else{
					addDialog(chooseLayerRoot.node, new yesOrNoDialogLayer(Text.mineChooseResult.format(tempPlayer1._name),function(result){
						if(result){
							cc.director.runScene(new LoadScene(tempPlayer1));
						}
					},chooseLayerRoot.node));
				}
			}
		}, this);
		this.mySelect1TextView=ccui.helper.seekWidgetByName(chooseLayerRoot.node, "mySelect1TextView");
		this.mySelect1TextView.setString(tempPlayer1._name);
		
		
		
		var showSelect2Skill=function(){
			cc.eventManager.pauseTarget(this, true);
			isLongClick=true;
			this.addChild(new detailDialogLayer(tempPlayer2,function(){
				cc.eventManager.resumeTarget(temp, true);
				// isLongClick=false;
			}));
		}
		this.mySelect2ImageView=ccui.helper.seekWidgetByName(chooseLayerRoot.node, "mySelect2ImageView");
		this.mySelect2ImageView.loadTexture(tempPlayer2.playerPicSrc);
		this.mySelect2ImageView.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(showSelect2Skill, 1);
			}else if(type==2){
				this.unschedule(showSelect2Skill);
				if(isLongClick){
					isLongClick=false;
				}else{
					addDialog(chooseLayerRoot.node, new yesOrNoDialogLayer(Text.mineChooseResult.format(tempPlayer2._name),function(result){
						if(result){
							// cc.director.runScene(new GameScene(tempPlayer2));
							cc.director.runScene(new LoadScene(tempPlayer2));
						}
					},chooseLayerRoot.node));
				}
			}
		}, this);
		this.mySelect2TextView=ccui.helper.seekWidgetByName(chooseLayerRoot.node, "mySelect2TextView");
		this.mySelect2TextView.setString(tempPlayer2._name);
		
		
		
		var showSelect3Skill=function(){
			isLongClick=true;
			addDialog(this, new detailDialogLayer(tempPlayer3,function(){
				cc.eventManager.resumeTarget(temp, true);
			}))
		}
		this.mySelect3ImageView=ccui.helper.seekWidgetByName(chooseLayerRoot.node, "mySelect3ImageView");
		this.mySelect3ImageView.loadTexture(tempPlayer3.playerPicSrc);
		this.mySelect3ImageView.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(showSelect3Skill, 1);
			}else if(type==2){
				this.unschedule(showSelect3Skill);
				if(isLongClick){
					isLongClick=false;
				}else{
					addDialog(chooseLayerRoot.node, new yesOrNoDialogLayer(Text.mineChooseResult.format(tempPlayer3._name),function(result){
						if(result){
							// cc.director.runScene(new GameScene(tempPlayer3));
							cc.director.runScene(new LoadScene(tempPlayer3));
						}
					},chooseLayerRoot.node));
				}
			}
		}, this);
		this.mySelect3TextView=ccui.helper.seekWidgetByName(chooseLayerRoot.node, "mySelect3TextView");
		this.mySelect3TextView.setString(tempPlayer3._name);
		
		
		var showSelect4Skill=function(){
			cc.eventManager.pauseTarget(this, true);
			isLongClick=true;
			this.addChild(new detailDialogLayer(tempPlayer4,function(){
				cc.eventManager.resumeTarget(temp, true);
				// isLongClick=false;
			}));
		}
		this.mySelect4ImageView=ccui.helper.seekWidgetByName(chooseLayerRoot.node, "mySelect4ImageView");
		this.mySelect4ImageView.loadTexture(tempPlayer4.playerPicSrc);
		this.mySelect4ImageView.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(showSelect4Skill, 1);
			}else if(type==2){
				this.unschedule(showSelect4Skill);
				if(isLongClick){
					isLongClick=false;
				}else{
					addDialog(chooseLayerRoot.node, new yesOrNoDialogLayer(Text.mineChooseResult.format(tempPlayer4._name),function(result){
						if(result){
							// cc.director.runScene(new GameScene(tempPlayer4));
							cc.director.runScene(new LoadScene(tempPlayer4));
						}
					},chooseLayerRoot.node));
				}
			}
		}, this);
		this.mySelect4TextView=ccui.helper.seekWidgetByName(chooseLayerRoot.node, "mySelect4TextView");
		this.mySelect4TextView.setString(tempPlayer4._name);
		
		this.addChild(chooseLayerRoot.node);
	}
});


var ChooseScene=cc.Scene.extend({
	onEnter:function(){
		this._super();
		var chooseLayer=new ChooseLayer();
		this.addChild(chooseLayer);
		var touchLayer=new TouchLayer();
		this.addChild(touchLayer);
	}
});




