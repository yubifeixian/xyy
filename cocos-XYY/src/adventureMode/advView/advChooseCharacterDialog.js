var ChooseCharacterDialog=cc.LayerColor.extend({
	characterList:null,
	playerButtons:null,
	message:null,
	confirmButton:null,
	result:null,
	playersList:null,
	callBack:null,
	ctor:function(characterList,message, callBack){
		this._super(cc.color(0, 0, 0, 200));
		this.playersList=characterList;
		this.message=message;
		this.playerButtons=new Array();
		//this.playersList=new Array();
		this.callBack=callBack;
		this.init();
	},
	init:function(){
		//cc.log(this.playersList[0]._name+"dd");
		var temp=this;
		var dialog=ccs.load(res.SelectPlayerDialog_json);
		var messageLabel=ccui.helper.seekWidgetByName(dialog.node, "message");
		messageLabel.setString(this.message);
		this.confirmButton=ccui.helper.seekWidgetByName(dialog.node, "cancelButton");
		//this.confirmButton.loadTexture("res/drawable-hdpi/confirmbutton.png");
		this.confirmButton.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=null;
				temp.sendResult();
			}
		},this.cancelButton);
		this.confirmButton.setVisible(false);
		//buttonManager(this.cancelButton, this.isButtonCancleEnabled, this.isButtonCancleEnabled);
		var listView=ccui.helper.seekWidgetByName(dialog.node, "ListView");
		listView.setBackGroundColor(cc.color(53, 127, 131, 81));
		var image=ccui.helper.seekWidgetByName(dialog.node, "image");
		listView.removeAllItems();
		for(var i=0;i<this.playersList.length;i++){
			var playerButton=image.clone();
			//playerButton.retain();
			playerButton.loadTexture(this.playersList[i].playerPicSrc);
			playerButton.setUserData(this.playersList[i]);
			this.playerButtons.push(playerButton);
			listView.pushBackCustomItem(playerButton);
		}
		for(var i=0;i<this.playerButtons.length;i++){
			this.playerButtons[i].addTouchEventListener(function(sender,type){
				if(type==2){
					temp.result=this.getUserData();
					temp.sendResult();
				}
			},this.playerButtons[i]);
		}
		this.addChild(dialog.node);
	},
	sendResult:function(){
		var temp=this;
		this.removeFromParent(true);
		cc.eventManager.resumeTarget(mainScene, true);
		this.callBack(this.result);
	}
})