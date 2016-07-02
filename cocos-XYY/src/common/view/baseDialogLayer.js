var BaseDialogLayer=cc.LayerColor.extend({
	ctor:function(){
		this._super(cc.color(0, 0, 0, 200));
		cc.eventManager.addListener({
			swallowTouches: true,
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan:function(touches,event){
				return true;
			}
		}, this);
	}
})