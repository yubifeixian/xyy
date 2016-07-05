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


var ArmNode=cc.Node.extend({
	arm:null,
	targetView:null,
	count:0,
	ctor:function(targetView){
		this._super();
		this.setRotation(-90);
		this.targetView=targetView;
		this.arm=new ccui.ImageView(resPng.arm_png);
		this.setPosition(this.targetView.getParent().getPosition());
		this.addChild(this.arm);
		this.play();
	},
	play:function(){
		var _arm=this.arm.clone();
		this.addChild(_arm);
		_arm.setOpacity(150);
		_arm.runAction(cc.sequence(cc.scaleBy(0.2, 2),cc.moveBy(0.2, 20, 0),cc.fadeOut(0.2),cc.callFunc(function(){
			_arm.removeFromParent();
			this.count++;
			if(this.count>3){
				this.removeFromParent();
				return;
			}
			this.play();
		},this)));
	}
})

var DefenseNode=cc.Node.extend({
	defense:null,
	targetView:null,
	count:0,
	ctor:function(targetView){
		this._super();
		this.defense=new ccui.ImageView(resPng.defense_png);
		this.targetView=targetView;
		this.setPosition(this.targetView.getParent().getPosition());
		this.addChild(this.defense);
		this.play();
	},
	play:function(){
		var _defense=this.defense.clone();
		this.addChild(_defense);
		_defense.runAction(cc.sequence(cc.spawn(cc.scaleBy(0.2,2),cc.fadeOut(0.2)),cc.callFunc(function(){
			_defense.removeFromParent();
			this.count++;
			if(this.count>3){
				this.removeFromParent();
				return;
			}
			this.play();
		}, this)));
	}
})