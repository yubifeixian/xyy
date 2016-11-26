var TouchLayer=cc.Layer.extend({
	ctor:function(){
		this._super();
		cc.eventManager.addListener({
			swallowTouches: false,
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan:function(touch,event){
				var _target=event.getCurrentTarget();
				var _sprite=new cc.Sprite(resPng.touchGuangquan_png);
				_sprite.setScale(0);
				_sprite.setPosition(touch.getLocation());
				_sprite.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.2, 0.5),cc.fadeOut(0.3)),cc.callFunc(function(){
					_sprite.removeFromParent();
				}, _target)));
				_target.addChild(_sprite);
				return true;
			}
		}, this);
		//var _particle=new cc.ParticleSystem(res.FlowerParticle_plist);
		//this.addChild(_particle);
		/*this.schedule(function(){
			if(_particle!=null){
				_particle.removeFromParent();	
			}
			_particle=this.createParticle();
			this.addChild(_particle);
		}, 2);*/
	},
	/*createParticle:function(){
		if(cc.pool.hasObject(cc.ParticleSystem)){
			return cc.pool.getFromPool(cc.ParticleSystem,res.FlowerParticle_plist);
		}else{
			var _particle=new cc.ParticleSystem(res.FlowerParticle_plist);
			cc.pool.putInPool(_particle);
			return _particle;
		}
	}*/
})