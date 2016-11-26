var FreeSelectLayer=cc.Layer.extend({
	playerNumberList:null,
	leftButton:null,
	rightButton:null,
	ctor:function(){
		this._super();
		this.playerNumberList=[];
		for(var i=1;i<25;i++){
			this.playerNumberList.push(i);
		}
		this.playerNumberList.push(27);
		this.playerNumberList.push(28);
		this.playerNumberList.push(29);
		this.playerNumberList.push(30);
		this.playerNumberList.push(31);
		this.playerNumberList.push(33);
		this.init();
	},
	init:function(){
		var temp=this;
		var root=ccs.load(res.FreeSelectScene_json);
		var pageView=ccui.helper.seekWidgetByName(root.node,"pageView");
		var closeButton=ccui.helper.seekWidgetByName(root.node, "closeButton");
		closeButton.addClickEventListener(function(){
			cc.director.runScene(new IndexScene());
		});
		var showSelectSkill=function(selectPlayer){
			isLongClick=true;
			var message="【"+selectPlayer.skill_1+"】\n"+selectPlayer.skill1Effect+"\n【"+selectPlayer.skill_2+"】\n"+selectPlayer.skill2Effect+"\n";
			if(selectPlayer.skill_3!=null&&selectPlayer.skill_3!=Text.nil&&selectPlayer.skill_3!=""){
				message+="【"+selectPlayer.skill_3+"】\n"+selectPlayer.skill3Effect;
			}
			this.addChild(new detailDialogLayer(selectPlayer));
		}.bind(this);
		for(var i=0;i<this.playerNumberList.length;i++){
			var tempPlayer=new Player();
			var baseSelectPanel=ccui.helper.seekWidgetByName(root.node, "baseSelectPanel"+this.playerNumberList[i]);
			baseSelectPanel.setBackGroundImageScale9Enabled(true);
			characterCardManager(tempPlayer,this.playerNumberList[i]);
			baseSelectPanel.setUserData(tempPlayer);
			baseSelectPanel.addTouchEventListener(function(sender,type){
				var choose=this.getUserData();
				if(type==0){
					this.scheduleOnce(function(){
						showSelectSkill(choose);
					}, 1);
				}else if(type==2){
					this.unscheduleAllCallbacks();
					if(isLongClick){
						isLongClick=false;
					}else{
						temp.addChild(new yesOrNoDialogLayer(Text.mineChooseResult.format(choose._name),function(result){
							if(result){
								temp.playerNumberList.removeObject(choose._ID);
								temp.handleComputerChooseCharacters();
								// cc.director.runScene(new GameScene(choose));
								cc.director.runScene(new LoadScene(choose));
							}
						},root.node));
					}
				}else if(type==3){
					this.unscheduleAllCallbacks();
				}
			}, baseSelectPanel);
		}
		this.leftButton=ccui.helper.seekWidgetByName(root.node, "left");
		this.leftButton.addClickEventListener(function(){
			var _currentIndex=pageView.getCurPageIndex();
			if(_currentIndex==0){
				return;
			}
			pageView.scrollToPage(_currentIndex-1);
		})
		this.rightButton=ccui.helper.seekWidgetByName(root.node, "right");
		this.rightButton.addClickEventListener(function(){
			var _currentIndex=pageView.getCurPageIndex();
			if(_currentIndex==pageView.getPages().length){
				return;
			}
			pageView.scrollToPage(_currentIndex+1);
		});
		this.addChild(root.node);
	},
	handleComputerChooseCharacters:function(){
		player2=new Player();
		player3=new Player();
		player4=new Player();
		this.playerNumberList.sort(function(){ return 0.5 - Math.random() }) ;
		characterCardManager(player2,this.playerNumberList[0]);
		// characterCardManager(player2,2);
		characterCardManager(player3,this.playerNumberList[6]);
		//characterCardManager(player3,1);
		characterCardManager(player4,this.playerNumberList[12]);
		//characterCardManager(player4,3);
	}
});

var FreeSelectScene=cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer=new FreeSelectLayer();
		this.addChild(layer);
		var touchLayer=new TouchLayer();
		this.addChild(touchLayer);
	}
});