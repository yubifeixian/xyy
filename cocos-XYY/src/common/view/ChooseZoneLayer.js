var ChooseZoneLayer=cc.Layer.extend({
	_chooseZone:null,
	message:null,
	confirmButton:null,
	cancelButton:null,
	callBack:null,
	result:false,
	ctor:function(message,callBack){
		this._super();
		this._chooseZone=chooseZone.clone();
		this.message=message;
		this.callBack=callBack;
		this.init();
	},
	init:function(){
		var messageLabel=ccui.helper.seekWidgetByName(this._chooseZone, "msgText");
		messageLabel.ignoreContentAdaptWithSize(true);
		messageLabel.setString(this.message);
		var temp=this;
		var confirmButtom=ccui.helper.seekWidgetByName(this._chooseZone, "confirmBtn");
		confirmButtom.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=true;
				temp.sendResult();
			}
		}, this);
		var cancelButton=ccui.helper.seekWidgetByName(this._chooseZone, "cancelBtn");
		cancelButton.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=false
				temp.sendResult();
			}
		}, this);
		this._chooseZone.setPosition(operateZone.x,operateZone.y);
		this.addChild(this._chooseZone);
		operateZone.setVisible(false);
		this._chooseZone.setVisible(true);
	},
	sendResult:function(){
		var temp=this;
		cc.eventManager.resumeTarget(mainScene, true);
		this.removeFromParent(true);
		operateZone.setVisible(true);
		this.callBack(this.result);
		//this.release();
		//cc.eventManager.dispatchCustomEvent("dialogEvent",temp.event.getUserData());
	}
});