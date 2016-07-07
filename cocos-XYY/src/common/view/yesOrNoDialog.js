var yesOrNoDialogLayer=BaseDialogLayer.extend({
	message:null,
	confirmButton:null,
	cancelButton:null,
	callBack:null,
	result:false,
	node:null,
	ctor:function(message,callBack,node){
		this._super();
		this.message=message;
		this.callBack=callBack;
		this.node=node;
		if(this.node==null){
			this.node=mainScene;
		}
		this.init();
	},
	init:function(){
		var dialog=ccs.load(res.YesOrNoDialog_json);
		var messageLabel=ccui.helper.seekWidgetByName(dialog.node, "message");
		messageLabel.setString(this.message);
		var temp=this;
		var confirmButtom=ccui.helper.seekWidgetByName(dialog.node, "buttonConfirm");
		confirmButtom.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=true;
				temp.sendResult();
			}
		}, this);
		var cancelButton=ccui.helper.seekWidgetByName(dialog.node, "buttonCancel");
		cancelButton.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=false
				temp.sendResult();
			}
		}, this);
		this.addChild(dialog.node);
	},
	sendResult:function(){
		//cc.eventManager.resumeTarget(this.getParent(), true);
		this.removeFromParent(true);
		this.callBack(this.result);
		//this.release();
		//cc.eventManager.dispatchCustomEvent("dialogEvent",temp.event.getUserData());
	}
});