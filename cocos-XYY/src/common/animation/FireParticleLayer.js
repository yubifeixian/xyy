var FireParticleLayer=cc.Layer.extend({ 
	_sprite:null, 
	usePlayer:null,
	targetPlayer:null, 
	callBack:null,
	ctor:function(usePlayer,targetPlayer,callback){ 
		this._super();
		this.usePlayer=usePlayer; this.targetPlayer=targetPlayer;
		this.callBack=callback; this._sprite=new
		cc.ParticleSystem("res/drawable-hdpi/frieParticle.plist");
		this.addChild(this._sprite); this._sprite.x=this.usePlayer.x;
		this._sprite.y=this.usePlayer.y; var
		action1=cc.moveTo(0.3,cc.p(this.targetPlayer.x, this.targetPlayer.y));
		this._sprite.runAction(cc.sequence(action1,cc.callFunc(function(){ var
		action2=cc.tintTo(0.3, 100, 0, 0); var action3=cc.tintTo(0.3, 255, 255, 255);
		// targetPlayer.hadImageView.runAction(action2);
		this.targetPlayer.runAction(cc.sequence(action2,action3));
		this._sprite.stopSystem(); this.removeFromParent();
		cc.eventManager.resumeTarget(mainScene, true); 
		if(this.callBack!=null){
			this.callBack(); 
			} 
		},this))); 
	} 
});