var CAMP={
		CHUFAFANG:0,
		GUAIWUFANG:1
}

var selectCampDialogLayer=cc.LayerColor.extend({
	message:null,
	checkBox1:null,
	checkBox2:null,
	checkBoxList:null,
	result:null,
	confirmButton:null,
	callBack:null,
	ctor:function(message,callBack){
		this._super(cc.color(0, 0, 0, 200));
		this.message=message;
		this.callBack=callBack;
		this.checkBoxList=new Array();
		this.result=CAMP.CHUFAFANG;
		this.init();
	},
	init:function(){
		var dialog=ccs.load(res.SelectCampDialog_json);
		var messageLabel=ccui.helper.seekWidgetByName(dialog.node, "messageLabel");
		messageLabel.setString(this.message);
		this.checkBox1=ccui.helper.seekWidgetByName(dialog.node, "CheckBox1");
		this.checkBox1.setUserData(CAMP.CHUFAFANG);
		this.checkBox2=ccui.helper.seekWidgetByName(dialog.node, "CheckBox2");
		this.checkBox2.setUserData(CAMP.GUAIWUFANG);
		this.checkBoxList.push(this.checkBox1);
		this.checkBoxList.push(this.checkBox2);
		var temp=this;
		this.checkBox1.addTouchEventListener(function(sender,type){
			if(type==2){
				if(!sender.isSelected()){
					temp.checkBox2.setSelected(false);
					temp.result=sender.getUserData();
				}else{
					temp.result=temp.checkBox2.getUserData();
					temp.checkBox2.setSelected(true);
				}
			}
		}, this.checkBox1);
		this.checkBox2.addTouchEventListener(function(sender,type){
			if(type==2){
				if(!sender.isSelected()){
					temp.checkBox1.setSelected(false);
					temp.result=sender.getUserData();
				}else{
					temp.result=temp.checkBox1.getUserData();
					temp.checkBox1.setSelected(true);
				}
			}
		},this.checkBox2);
		this.confirmButton=ccui.helper.seekWidgetByName(dialog.node, "confirmButton");
		this.confirmButton.addTouchEventListener(function(sender,type){
			if(type==2){
				temp.sendResult();
			}
		}, this.confirmButton);
		this.addChild(dialog.node);
	},
	sendResult:function(){
		var temp=this;
		cc.eventManager.resumeTarget(mainScene, true);
		this.removeFromParent(true);
		this.callBack(this.result);
		//cc.eventManager.dispatchCustomEvent("dialogEvent",temp.event.getUserData());
	}
});