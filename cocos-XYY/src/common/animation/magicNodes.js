var MagicNodeLei=cc.Sprite.extend({
	animation:null,
	ctor:function(){
		this._super();
		this.initAnimation();
	},
	initAnimation:function(){
		this.animation=new cc.Animation();
		for(var i=1;i<13;i++){
			var frameName="f"+i+".png";
			var spriteFrame=GameFrameCache.getCache(frameName);
			this.animation.addSpriteFrame(spriteFrame);
		}
		this.animation.setDelayPerUnit(0.1);
		this.animation.setRestoreOriginalFrame(true);
	},
	getAction:function(){
		return cc.animate(this.animation);
	},
	clone:function(){
		return new MagicNodeLei();
	}
	
})

var MagicNodeHuo=MagicNodeLei.extend({
	initAnimation:function(){
		this.animation=new cc.Animation();
		for(var i=1;i<16;i++){
			var frameName="1585-"+i+".png";
			var spriteFrame=GameFrameCache.getCache(frameName);
			this.animation.addSpriteFrame(spriteFrame);
		}
		this.animation.setDelayPerUnit(0.1);
		this.animation.setRestoreOriginalFrame(true);
	}
})
var MagicNodeFeng=MagicNodeLei.extend({
	initAnimation:function(){
		this.animation=new cc.Animation();
		for(var i=1;i<22;i++){
			var frameName="po"+i+".png";
			var spriteFrame=GameFrameCache.getCache(frameName);
			this.animation.addSpriteFrame(spriteFrame);
		}
		this.animation.setDelayPerUnit(0.1);
		this.animation.setRestoreOriginalFrame(true);
	}
})
var MagicNodeTu=MagicNodeLei.extend({
	initAnimation:function(){
		this.animation=new cc.Animation();
		for(var i=0;i<21;i++){
			var frameName="tu"+i+".png";
			var spriteFrame=GameFrameCache.getCache(frameName);
			this.animation.addSpriteFrame(spriteFrame);
		}
		this.animation.setDelayPerUnit(0.1);
		this.animation.setRestoreOriginalFrame(true);
	}
})
var MagicNodeShui=MagicNodeLei.extend({
	initAnimation:function(){
		this.animation=new cc.Animation();
		for(var i=0;i<14;i++){
			var frameName="uui"+i+".png";
			var spriteFrame=cc.spriteFrameCache.getSpriteFrame(frameName);
			this.animation.addSpriteFrame(spriteFrame);
		}
		this.animation.setDelayPerUnit(0.1);
		this.animation.setRestoreOriginalFrame(true);
	}
})