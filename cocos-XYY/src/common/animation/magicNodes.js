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

var FengFazhenNode=cc.Node.extend({
	font:null,
	ball:null,
	fazhen:null,
	targetView:null,
	light:null,
	ctor:function(targetView){
		this._super();
		this.targetView=targetView;
		this.font=new ccui.ImageView(resPng.petFengFont_png);
		this.ball=new ccui.ImageView(resPng.petFengBall_png);
		this.fazhen=new ccui.ImageView(resPng.petFengFazhen_png);
		this.light=new ccui.ImageView(resPng.petLight_png);
		this.addChild(this.ball);
		this.addChild(this.fazhen);
		this.addChild(this.font);
		this.addChild(this.light);
		this.font.setPosition(monsterLabel.getPosition());
		this.ball.setPosition(monsterLabel.getPosition());
		this.fazhen.setPosition(monsterLabel.getPosition());
		this.light.setPosition(monsterLabel.getPosition());
		this.light.setOpacity(120);
		this.light.setColor(cc.color.GREEN);
		this.play();
	},
	play:function(){
		this.fazhen.runAction(cc.repeatForever(cc.rotateBy(0.5, 90)));
		var _action=cc.spawn(cc.rotateBy(1, -360),cc.scaleTo(1, 0.5),cc.moveTo(1, this.targetView.getWorldPosition()));
		this.ball.runAction(cc.sequence(_action,cc.callFunc(function(){
			this.fazhen.runAction(cc.fadeOut(0.2));
			this.ball.runAction(cc.sequence(cc.fadeOut(0.2),cc.callFunc(function(){
				this.removeFromParent();
			}, this)));
		}, this)));
		this.font.runAction(cc.spawn(cc.scaleBy(0.5, 4),cc.fadeOut(1)));
		this.light.runAction(cc.spawn(cc.scaleBy(0.5, 6),cc.fadeOut(0.5)));
	}
})

var LeiFazhenNode=cc.Node.extend({
	font:null,
	ball:null,
	fazhen:null,
	targetView:null,
	light:null,
	ctor:function(targetView){
		this._super();
		this.targetView=targetView;
		this.font=new ccui.ImageView(resPng.petLeiFont_png);
		this.ball=new ccui.ImageView(resPng.petLeiBall_png);
		this.fazhen=new ccui.ImageView(resPng.petLeiFazhen_png);
		this.light=new ccui.ImageView(resPng.petLight_png);
		this.addChild(this.ball);
		this.addChild(this.fazhen);
		this.addChild(this.font);
		this.addChild(this.light);
		this.font.setPosition(monsterLabel.getPosition());
		this.ball.setPosition(monsterLabel.getPosition());
		this.fazhen.setPosition(monsterLabel.getPosition());
		this.light.setPosition(monsterLabel.getPosition());
		this.light.setOpacity(120);
		this.light.setColor(cc.color.YELLOW);
		this.play();
	},
	play:function(){
		this.fazhen.runAction(cc.repeatForever(cc.rotateBy(0.5, 90)));
		var _action=cc.spawn(cc.rotateBy(1, -360),cc.scaleTo(1, 0.5),cc.moveTo(1, this.targetView.getWorldPosition()));
		this.ball.runAction(cc.sequence(_action,cc.callFunc(function(){
			this.fazhen.runAction(cc.fadeOut(0.2));
			this.ball.runAction(cc.sequence(cc.fadeOut(0.2),cc.callFunc(function(){
				this.removeFromParent();
			}, this)));
		}, this)));
		this.font.runAction(cc.spawn(cc.scaleBy(0.5, 4),cc.fadeOut(1)));
		this.light.runAction(cc.spawn(cc.scaleBy(0.5, 6),cc.fadeOut(0.5)));
	}
})

var ShuiFazhenNode=cc.Node.extend({
	font:null,
	ball:null,
	fazhen:null,
	targetView:null,
	light:null,
	ctor:function(targetView){
		this._super();
		this.targetView=targetView;
		this.font=new ccui.ImageView(resPng.petShuiFont_png);
		this.ball=new ccui.ImageView(resPng.petShuiBall_png);
		this.fazhen=new ccui.ImageView(resPng.petShuiFazhen_png);
		this.light=new ccui.ImageView(resPng.petLight_png);
		this.addChild(this.ball);
		this.addChild(this.fazhen);
		this.addChild(this.font);
		this.addChild(this.light);
		this.font.setPosition(monsterLabel.getPosition());
		this.ball.setPosition(monsterLabel.getPosition());
		this.fazhen.setPosition(monsterLabel.getPosition());
		this.light.setPosition(monsterLabel.getPosition());
		this.light.setOpacity(120);
		this.light.setColor(cc.color.BLUE);
		this.play();
	},
	play:function(){
		this.fazhen.runAction(cc.repeatForever(cc.rotateBy(0.5, 90)));
		var _action=cc.spawn(cc.rotateBy(1, -360),cc.scaleTo(1, 0.5),cc.moveTo(1, this.targetView.getWorldPosition()));
		this.ball.runAction(cc.sequence(_action,cc.callFunc(function(){
			this.fazhen.runAction(cc.fadeOut(0.2));
			this.ball.runAction(cc.sequence(cc.fadeOut(0.2),cc.callFunc(function(){
				this.removeFromParent();
			}, this)));
		}, this)));
		this.font.runAction(cc.spawn(cc.scaleBy(0.5, 4),cc.fadeOut(1)));
		this.light.runAction(cc.spawn(cc.scaleBy(0.5, 6),cc.fadeOut(0.5)));
	}
})

var HuoFazhenNode=cc.Node.extend({
	font:null,
	ball:null,
	fazhen:null,
	targetView:null,
	light:null,
	ctor:function(targetView){
		this._super();
		this.targetView=targetView;
		this.font=new ccui.ImageView(resPng.petHuoFont_png);
		this.ball=new ccui.ImageView(resPng.petHuoBall_png);
		this.fazhen=new ccui.ImageView(resPng.petHuoFazhen_png);
		this.light=new ccui.ImageView(resPng.petLight_png);
		this.addChild(this.ball);
		this.addChild(this.fazhen);
		this.addChild(this.font);
		this.addChild(this.light);
		this.font.setPosition(monsterLabel.getPosition());
		this.ball.setPosition(monsterLabel.getPosition());
		this.fazhen.setPosition(monsterLabel.getPosition());
		this.light.setPosition(monsterLabel.getPosition());
		this.light.setOpacity(120);
		this.light.setColor(cc.color.RED);
		this.play();
	},
	play:function(){
		this.fazhen.runAction(cc.repeatForever(cc.rotateBy(0.5, 90)));
		var _action=cc.spawn(cc.rotateBy(1, -360),cc.scaleTo(1, 0.5),cc.moveTo(1, this.targetView.getWorldPosition()));
		this.ball.runAction(cc.sequence(_action,cc.callFunc(function(){
			this.fazhen.runAction(cc.fadeOut(0.2));
			this.ball.runAction(cc.sequence(cc.fadeOut(0.2),cc.callFunc(function(){
				this.removeFromParent();
			}, this)));
		}, this)));
		this.font.runAction(cc.spawn(cc.scaleBy(0.5, 4),cc.fadeOut(1)));
		this.light.runAction(cc.spawn(cc.scaleBy(0.5, 6),cc.fadeOut(0.5)));
	}
})

var TuFazhenNode=cc.Node.extend({
	font:null,
	ball:null,
	fazhen:null,
	targetView:null,
	light:null,
	ctor:function(targetView){
		this._super();
		this.targetView=targetView;
		this.font=new ccui.ImageView(resPng.petTuFont_png);
		this.ball=new ccui.ImageView(resPng.petTuBall_png);
		this.fazhen=new ccui.ImageView(resPng.petTuFazhen_png);
		this.light=new ccui.ImageView(resPng.petLight_png);
		this.addChild(this.ball);
		this.addChild(this.fazhen);
		this.addChild(this.font);
		this.addChild(this.light);
		this.font.setPosition(monsterLabel.getPosition());
		this.ball.setPosition(monsterLabel.getPosition());
		this.fazhen.setPosition(monsterLabel.getPosition());
		this.light.setPosition(monsterLabel.getPosition());
		this.light.setOpacity(120);
		this.light.setColor(cc.color.ORANGE);
		this.play();
	},
	play:function(){
		this.fazhen.runAction(cc.repeatForever(cc.rotateBy(0.5, 90)));
		var _action=cc.spawn(cc.rotateBy(1, -360),cc.scaleTo(1, 0.5),cc.moveTo(1, this.targetView.getWorldPosition()));
		this.ball.runAction(cc.sequence(_action,cc.callFunc(function(){
			this.fazhen.runAction(cc.fadeOut(0.2));
			this.ball.runAction(cc.sequence(cc.fadeOut(0.2),cc.callFunc(function(){
				this.removeFromParent();
			}, this)));
		}, this)));
		this.font.runAction(cc.spawn(cc.scaleBy(0.5, 4),cc.fadeOut(1)));
		this.light.runAction(cc.spawn(cc.scaleBy(0.5, 6),cc.fadeOut(0.5)));
	}
})

//当前回合角色行动时，头像上的光圈
var ActionMarkNode=cc.Node.extend({
	spriteOut:null,
	spriteIn:null,
	ctor:function(){
		this._super();
		this.spriteIn=new ccui.ImageView(resPng.actionLight_png);
		this.spriteOut=this.spriteIn.clone();
		this.spriteIn.setOpacity(200);
		this.spriteOut.setOpacity(200);
		this.spriteIn.setScale(0.75);
		this.spriteOut.setScale(0.8);
		this.addChild(this.spriteIn);
		this.addChild(this.spriteOut);
		this.play();
	},
	play:function(){
		var _action=cc.sequence(cc.rotateBy(0.5, 360),cc.delayTime(0.2),cc.rotateBy(0.5, -360));
		var _action2=cc.sequence(cc.rotateBy(0.6, -360),cc.delayTime(0.4),cc.rotateBy(0.6, 360));
		this.spriteIn.runAction(new cc.RepeatForever(_action));
		this.spriteOut.runAction(new cc.RepeatForever(_action2));
	},
	end:function(){
		this.spriteIn.removeFromParent();
		this.spriteOut.runAction(cc.sequence(cc.spawn(cc.scaleBy(0.2,2),cc.fadeOut(0.05)),cc.callFunc(function(){
			this.removeFromParent();
		},this)));
	}
})