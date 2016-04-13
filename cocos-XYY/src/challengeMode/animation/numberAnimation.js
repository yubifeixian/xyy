var NumberAnimationLayer=cc.Layer.extend({
	_targetSprite:null,
	_content:null,
	_callBack:null,
	ctor:function(content,_targetSprite,callBack){
		this._super();
		this._content=content;
		this._targetSprite=_targetSprite;
		this._callBack=callBack;
		this.init();
	},
	init:function(){
		var _bmFont=new cc.LabelBMFont(this._content,"res/drawable-hdpi/numRed.fnt",500,cc.TEXT_ALIGNMENT_CENTER);
		this.addChild(_bmFont);
		_bmFont.x=cardAnimationLabel.x;
		_bmFont.y=cardAnimationLabel.y;
		
		var move=cc.moveTo(0.7, this._targetSprite.x, this._targetSprite.y);
		_bmFont.runAction(cc.sequence(move,cc.callFunc(function(){
			_bmFont.removeFromParent();
			this.removeFromParent();
			if(this._callBack!=null){
				this._callBack();
			}
		}, this)));
	}
});