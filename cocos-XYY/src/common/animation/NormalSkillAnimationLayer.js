var NormalSkillAnimationLayer=cc.Layer.extend({
	skillName:null,
	playerHead:null,
	callBack:null,
	panel:null,
	ctor:function(skillName,playerHead,callBack){
		this._super();
		this.skillName=skillName;
		this.playerHead=playerHead;
		this.callBack=callBack;
		this.loadLayer();
		this.excuteAnimation();
	},
	loadLayer:function(){
		var root=ccs.load(res.NormalSkillAnimationLayer).node;
		this.panel=ccui.helper.seekWidgetByName(root, "Panel");
		var skillNameText=ccui.helper.seekWidgetByName(root, "skillName");
		skillNameText.setString(this.skillName);
		this.setOpacity(0);
		this.panel.setPosition((this.playerHead.x-this.playerHead.width/2), (this.playerHead.y-this.playerHead.height/2));
		this.addChild(root);
	},
	excuteAnimation:function(){
		var _actionFadeIn=cc.fadeIn(0.1);
		var _actionMoveTo=cc.moveTo(0.3,cc.p(this.playerHead.x+this.panel.width/2, this.panel.y));
		var _actionDelay=cc.delayTime(0.8);
		var _actionMoveTo2=cc.moveTo(0.2,cc.p(this.playerHead.x+this.panel.width, this.panel.y));
		var _actionFadeOut=cc.fadeOut(0.1);
		var temp=this;
		
		this.panel.runAction(cc.sequence(_actionFadeIn,_actionMoveTo,cc.callFunc(temp.callBack),_actionDelay,_actionMoveTo2,_actionFadeOut,cc.callFunc(function(){
			temp.removeFromParent();
		})));
		
		
	}
});