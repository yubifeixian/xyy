var HurtNumberLayer=cc.Layer.extend({
	bgImageView:null,
	bmFont:null,
	targetView:null,
	ctor:function(targetView,number){
		this._super();
		this.targetView=targetView;
		this.bgImageView=new ccui.ImageView(resPng.hurtBg);
		this.bgImageView.setPosition(this.targetView.getPosition());
		this.addChild(this.bgImageView);
		this.bmFont=new cc.LabelBMFont(number,"res/drawable-hdpi/numRed.fnt",500,cc.TEXT_ALIGNMENT_CENTER);
		this.bmFont.setPosition(this.bgImageView.getPosition());
		this.addChild(this.bmFont);
		this.playAnimation();
	},
	playAnimation:function(){
		var action1=cc.moveBy(1, 0, this.targetView.height/2);
		var action2=cc.fadeOut(0.5);
		var sequence=cc.sequence(action1,action2,cc.callFunc(function(){
			this.removeFromParent();
		}, this));
		this.bmFont.runAction(sequence.clone());
		this.bgImageView.runAction(sequence);
	}
});