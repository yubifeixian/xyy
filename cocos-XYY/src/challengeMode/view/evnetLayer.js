var eventLayer=BaseDialogLayer.extend({
	imageSrc:null,
	callBack:null,
	ctor:function(imageSrc,callBack){
		this._super();
		this.imageSrc=imageSrc;
		this.callBack=callBack;
		this.init();
	},
	init:function(){
		var temp=this;
		var dialog=ccs.load(res.eventLayer_json);
		var imageView=ccui.helper.seekWidgetByName(dialog.node, "eventImage");
		imageView.loadTexture(this.imageSrc);
		this.addChild(dialog.node);
		imageView.runAction(cc.sequence(cc.fadeIn(0.5),cc.delayTime(2),cc.fadeOut(0.5),cc.CallFunc(function(){
			temp.showEnd();
		},temp)))
	},
	showEnd:function(){
		var temp=this;
		this.removeFromParent(true);
		cc.eventManager.resumeTarget(mainScene, true);
		this.callBack();
	}
})