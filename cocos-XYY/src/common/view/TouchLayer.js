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
	}
})