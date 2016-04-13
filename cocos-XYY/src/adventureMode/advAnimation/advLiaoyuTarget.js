var LiaoyuTargetLayer=cc.Layer.extend({
	_sprite:null,
	_usePlayer:null,
	_targetPlayer:null,
	_callBack:null,
	ctor:function(usePlayer,targetPlayer,callBack){
		this._super();
		this._usePlayer=usePlayer;
		this._targetPlayer=targetPlayer;
		this._callBack=callBack;
		this.init();
	},
	init:function(){
		this._sprite=new cc.ParticleSystem(res.liaoyuParticle_plist);
		this.addChild(this._sprite);
		this._sprite.x=this._targetPlayer.hadImageView.x;
		this._sprite.y=this._targetPlayer.hadImageView.y;
		this._sprite.setScale(0.5,0.5);
		this._sprite.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
			this._sprite.stopSystem();
			this.removeFromParent();
			if(this._callBack!=null){
				this._callBack();
			}
		}, this)));
	}
});