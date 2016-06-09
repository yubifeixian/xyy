var MagicLayer=cc.Layer.extend({
	ctor:function(targetView,magicNode,callback){
		this._super();
		cc.eventManager.addListener({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches:true,
			onTouchBegan:function(touch,event){
				return true;
			}
		}, this);
		magicNode.setPosition(targetView.getPosition());
		this.addChild(magicNode);
		var action2=cc.tintTo(0.3, 100, 0, 0);
		var action3=cc.tintTo(0.3, 255, 255, 255);
		targetView.runAction(cc.sequence(action2,action3));
		magicNode.runAction(cc.sequence(magicNode.getAction(),cc.callFunc(function(){
			this.removeFromParent();
			if(callback!=null){
				callback();
			}
		}, this)));
	}
});