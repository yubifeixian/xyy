/**
 * 选择牌（例：闯荡试练窟）
 */
var selectCardDialogLayer=BaseDialogLayer.extend({
	message:null,
	cardList:null,
	cardButtonList:null,
	cancelButton:null,
	confirmButton:null,
	result:null,
	minNumber:0,
	maxNumber:0,
	callBack:null,
	canCancel:false,
	ctor:function(message,cardList,minNumber,maxNumber,canCancel,callBack){
		this._super();
		this.message=message;
		this.cardList=cardList;
		this.minNumber=minNumber;
		this.maxNumber=maxNumber;
		this.cardButtonList=new Array();
		this.callBack=callBack;
		this.canCancel=canCancel;
		this.result=new Array();
		this.init();
		this.scheduleUpdate();
	},
	init:function(){
		var temp=this;
		var dialog=ccs.load(res.SelectCardDialog_json);
		var messageLabel=ccui.helper.seekWidgetByName(dialog.node, "message");
		messageLabel.setString(this.message);
		this.confirmButton=ccui.helper.seekWidgetByName(dialog.node,"confirmButton");
		this.confirmButton.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.sendResult();
			}
		}, this.confirmButton);
		this.cancelButton=ccui.helper.seekWidgetByName(dialog.node, "cancelButton");
		if(!this.canCancel){
			buttonManager(this.cancelButton, false, false);
		}
		this.cancelButton.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=null;
				temp.sendResult();
			}
		}, this.cancelButton);
		var listView=ccui.helper.seekWidgetByName(dialog.node, "listView");
		listView.setBackGroundColor(cc.color(74, 133, 130, 50));
		var cardButton=ccui.helper.seekWidgetByName(dialog.node, "Image");
		listView.removeAllItems();
		
		for(var i=0;i<this.cardList.length;i++){
			var cardButtonClone=cardButton.clone();
			cardButtonClone.clicked=false;
			cardButtonClone.setOpacity(180);
			cardButtonClone.setUserData(this.cardList[i]);
			cardButtonClone.name=this.cardList[i].name;
			cardButtonClone.loadTexture(this.cardList[i].cardSrcID);
			this.cardButtonList.push(cardButtonClone);
			listView.pushBackCustomItem(cardButtonClone);
		}
		for(var i=0;i<this.cardButtonList.length;i++){
			this.cardButtonList[i].addTouchEventListener(function(sender,type){
				if(type==2){
					if(temp.result.length<temp.maxNumber){
						this.clicked=!this.clicked;
						if(this.clicked){
							this.setOpacity(255);
							temp.result.push(this.getUserData());
						}else{
							this.setOpacity(180);
							temp.result.removeObject(this.getUserData());
						}
					}else if(this.clicked){
						this.clicked=false;
						this.setOpacity(180);
						temp.result.removeObject(this.getUserData());
					}
					
					//temp.result=this;
					//temp.sendResult();
					//cc.log("选择了"+temp.result.getUserData());
				}
			},this.cardButtonList[i]);
		}
		
		this.addChild(dialog.node);
	},
	sendResult:function(){
		var temp=this;
		//cc.eventManager.resumeTarget(mainScene, true);
		//cc.eventManager.dispatchCustomEvent("dialogEvent",temp.event.getUserData());
		this.removeFromParent(true);
		if(this.callBack!=null){
			this.callBack(this.result);
		}
	},
	update:function(dt){
		if(this.result.length<this.minNumber||this.result.length>this.maxNumber){
			buttonManager(this.confirmButton, false, false);
		}else{
			buttonManager(this.confirmButton, true, true);
		}
	}
});