var AddCardAnimationLayer=cc.Layer.extend({
	_addCardNumber:null,
	_targetPlayer:null,
	_callBack:null,
	ctor:function(targetPlayer,addCardNumber,callBack){
		this._super();
		this._targetPlayer=targetPlayer;
		this._addCardNumber=addCardNumber;
		this._callBack=callBack;
		this.init();
	},
	init:function(){
		var _root=ccs.load(res.addCardAnimationLayer).node;
		var _cardList=ccui.helper.seekWidgetByName(_root, "cardList");
		var _cardEx=ccui.helper.seekWidgetByName(_root, "card").clone();
		_cardEx.retain();
		_cardList.removeAllItems();
		for(var i=0;i<this._addCardNumber;i++){
			_cardList.pushBackCustomItem(_cardEx.clone());
		}
		this.addChild(_root);
		var _actionMove=cc.moveTo(0.5,this._targetPlayer.x, this._targetPlayer.y);
		/*//闪烁动画，2s内闪烁5次
		var _actionBlink=cc.blink(1, 5);*/
		_cardList.runAction(cc.sequence(_actionMove,cc.callFunc(function(){
			_cardEx.release();
			this.removeFromParent();
			if(this._callBack!=null){
				this._callBack();
			}
		}, this)));
	}
});