var messageDialogLayer=cc.Layer.extend({
	message:null,
	callBack:null,
	ctor:function(message,callBack){
		this._super();
		this.message=message;
		this.callBack=callBack;
		this.init();
	},
	init:function(){
		var dialog=ccs.load(res.MessageDialog_json);
		var listView=ccui.helper.seekWidgetByName(dialog.node, "ListView");
		listView.setBackGroundColor(cc.color(23, 93, 116, 100));
		var messageLabel=ccui.helper.seekWidgetByName(dialog.node, "messageLabel");
		//var height=parseInt(this.message.length%30)==0?parseInt(this.message.length/30):parseInt(this.message.length/30)+1;
		messageLabel.ignoreContentAdaptWithSize(false);
		messageLabel.setTextAreaSize(cc.size(300,5000));
		messageLabel.setString(this.message);
		var temp=this;
		var confirmButton=ccui.helper.seekWidgetByName(dialog.node, "confirmButton");
		confirmButton.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.removeFromParent();
				if(temp.callBack!=null){
					temp.callBack();
				}
			}
		}, confirmButton);
		this.addChild(dialog.node);
	}
})