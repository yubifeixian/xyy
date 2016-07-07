var selectNumberDialogLayer=BaseDialogLayer.extend({
	message:null,
	maxNumber:0,
	result:0,
	leftButton:null,
	leftMaxButton:null,
	rightButton:null,
	rightMaxButton:null,
	confirmButton:null,
	cancelButton:null,
	numberLabel:null,
	leftButton:null,
	leftMaxButton:null,
	rightButton:null,
	rightMaxButton:null,
	confrimButton:null,
	callBack:null,
	ctor:function(message,maxNumber,callBack){
		this._super();
		this.message=message;
		this.maxNumber=maxNumber;
		this.result=this.maxNumber;
		this.callBack=callBack;
		this.init();
	},
	init:function(){
		var temp=this;
		var dialog=ccs.load(res.SelectNumberDialog_json);
		var messageLabel=ccui.helper.seekWidgetByName(dialog.node, "messageLabel");
		messageLabel.setString(this.message);
		this.numberLabel=ccui.helper.seekWidgetByName(dialog.node, "numberLabel");
		this.leftButton=ccui.helper.seekWidgetByName(dialog.node, "leftButton");
		this.leftButton.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result--;
				if(temp.result<0){
					temp.result=0;
				}
			}
		},this.leftButton);
		this.leftMaxButton=ccui.helper.seekWidgetByName(dialog.node, "leftMaxButton");
		this.leftMaxButton.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=0;
			}
		}, this.leftMaxButton);
		this.rightButton=ccui.helper.seekWidgetByName(dialog.node, "rightButton");
		this.rightButton.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result++;
				if(temp.result>temp.maxNumber){
					temp.result=temp.maxNumber;
				}
			}
		}, this.rightButton);
		this.rightMaxButton=ccui.helper.seekWidgetByName(dialog.node, "rightMaxButton");
		this.rightMaxButton.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=temp.maxNumber;
			}
		}, this.rightMaxButton);
		this.confirmButton=ccui.helper.seekWidgetByName(dialog.node, "confrimButton");
		this.confirmButton.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.sendResult();
			}
		}, this.confirmButton);
		
		this.cancelButton=ccui.helper.seekWidgetByName(dialog.node, "cancelButton");
		this.cancelButton.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.result=null;
				temp.sendResult();
			}
		}, this.cancelButton);
		
		
		this.schedule(temp.refulsh);
		this.addChild(dialog.node);
	},
	refulsh:function(){
		this.numberLabel.setString(this.result);
		buttonManager(this.leftButton,true, true);
		buttonManager(this.leftMaxButton,true, true);
		buttonManager(this.rightButton,true, true);
		buttonManager(this.rightMaxButton,true, true);
		if(this.result==0){
			buttonManager(this.leftButton,false, false);
			buttonManager(this.leftMaxButton,false, false);
		}else if(this.result==this.maxNumber){
			buttonManager(this.rightButton,false, false);
			buttonManager(this.rightMaxButton,false, false);
		}
		
	},
	sendResult:function(){
		var temp=this;
		//cc.eventManager.resumeTarget(mainScene, true);
		this.removeFromParent(true);
		this.callBack(this.result);
	}
});