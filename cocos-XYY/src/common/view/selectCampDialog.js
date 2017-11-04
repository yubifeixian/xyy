var CAMP={
		CHUFAFANG:0,
		GUAIWUFANG:1
}

var selectCampDialogLayer=BaseDialogLayer.extend({
	message:null,
	checkBox1:null,
	checkBox2:null,
	result:null,
	confirmButton:null,
	callBack:null,
	ctor:function(message,callBack){
		this._super();
		this.message=message;
		this.callBack=callBack;
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
		var temp=this;
		this.checkBox1.addEventListener(function(render,type){
			switch (type) {
			case ccui.CheckBox.EVENT_SELECTED:
				temp.checkBox2.setSelected(false);
				temp.result=temp.checkBox1.getUserData();
				break;

			case ccui.CheckBox.EVENT_UNSELECTED:
				temp.checkBox2.setSelected(true);
				temp.result=temp.checkBox2.getUserData();
				break;
			}
		},this);
		this.checkBox2.addEventListener(function(render,type){
			switch (type) {
			case ccui.CheckBox.EVENT_SELECTED:
				temp.checkBox1.setSelected(false);
				temp.result=temp.checkBox2.getUserData();
				break;
				
			case ccui.CheckBox.EVENT_UNSELECTED:
				temp.checkBox1.setSelected(true);
				temp.result=temp.checkBox1.getUserData();
				break;
			}
		},this);
		
		this.confirmButton=ccui.helper.seekWidgetByName(dialog.node, "confirmButton");
		this.confirmButton.addClickEventListener(function(){
				temp.sendResult();
		});
		this.addChild(dialog.node);
	},
	sendResult:function(){
		this.removeFromParent(true);
		this.callBack(this.result);
	}
});