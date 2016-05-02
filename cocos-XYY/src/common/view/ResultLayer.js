var ResultLayer=cc.LayerColor.extend({
	backGroud:null,
	flag:null,
	result:null,
	winSize:null,
	state:null,
	ctor:function(result){
		this._super(cc.color(0, 0, 0, 200));
		this.result=result;
		this.loadLayer();
		this.excuteAnimation();
		var temp=this;
		cc.eventManager.addListener({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches:true,
			onTouchBegan:function(touches,event){
				return true;
			},
			onTouchEnded:function(touches,event){
				if(temp.state==1){
					temp.removeFromParent();
					cc.eventManager.resumeTarget(mainScene, true);
				}
			}
		}, this);
	},
	loadLayer:function(){
		var root=ccs.load(res.ResultLayer).node;
		this.backGroud=ccui.helper.seekWidgetByName(root, "bg");
		this.flag=ccui.helper.seekWidgetByName(root, "flag");
		switch(this.result){
		case 0:
			this.flag.loadTexture("res/drawable-hdpi/leitai_shengli.png");
			break;
		case 1:
			this.flag.loadTexture("res/drawable-hdpi/leitai_shibai.png");
			break;
		}
		this.winSiz=cc.director.getWinSize();
		this.addChild(root);
		this.state=0;
	},
	excuteAnimation:function(){
		var temp=this;
		var _bgMove=cc.moveTo(0.5, cc.p(this.winSiz.width/2, this.winSiz.height/2));
		this.backGroud.runAction(cc.sequence(_bgMove,cc.callFunc(function(){
			var _flagFadeIn=cc.fadeIn(0.5);
			var _flagScale=cc.scaleBy(0.5, 0.5, 0.5);
			temp.flag.runAction(cc.sequence(cc.spawn(_flagFadeIn,_flagScale),cc.callFunc(function(){
				temp.scheduleOnce(function(){
					temp.state=1;
				},2);
				// temp.removeFromParent();
			})));
		})));
		
	}
});