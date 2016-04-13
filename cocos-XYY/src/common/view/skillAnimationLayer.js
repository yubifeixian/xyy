var skillAnimationLayer=cc.LayerColor.extend({
	_animation:null,
	_sprite:null,
	_callBack:null,
	ctor:function(skillAnimation,callBack){
		// this._super();
		cc.eventManager.pauseTarget(mainScene, true);
		this._super(cc.color(0, 0, 0, 200));
		this._animation=skillAnimation;
		this._sprite=new cc.Sprite();
		this._callBack=callBack;
		this.load();
	},
	load:function(){
		this._animation.setDelayPerUnit(0.125);
		this._animation.setRestoreOriginalFrame(true);
		var action=cc.animate(this._animation);
		var size=cc.director.getWinSize();
		this._sprite.x=size.width/2;
		this._sprite.y=size.height/2;
		this.addChild(this._sprite);
		this._sprite.runAction(cc.sequence(action,cc.callFunc(function(){
			this.destory();
		}, this)));
	},
	destory:function(){
		this.removeFromParent();
		cc.eventManager.resumeTarget(mainScene, true);
		if(this._callBack!=null){
			this._callBack();
		}
	}
});