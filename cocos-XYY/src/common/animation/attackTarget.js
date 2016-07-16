/**
 * 攻击对象动画层：
 * 
 * 效果：从usePlayer的头像处发射粒子，射向targetPlayer头像，然后targetPlayer头像闪烁红光
 */
var AttackTargetLayer=cc.Layer.extend({
	streakNode:null,
	startPoint:null,
	endPoint:null,
	targetPoint:null,
	offsetX:0,
	offSetY:0,
	time:2,
	delay:0.5,
	callback:null,
	ctor:function(usePlayer,targetPlayer,callback){
		this._super();
		this.startPoint=cc.p(usePlayer.x, usePlayer.y);
		this.endPoint=cc.p(targetPlayer.x, targetPlayer.y);
		this.callback=callback;
		this.streakNode=new cc.MotionStreak(this.delay, 3, 8, cc.color.WHITE, resPng.streak);
		this.streakNode.setPosition(this.startPoint);
		this.addChild(this.streakNode);
		// this.offsetX=(this.endPoint.x-this.startPoint.x)/this.time;
		// this.offsetY=(this.endPoint.y-this.startPoint.y)/this.time;
		// this.scheduleUpdate();
		this.drawing();
		// this.schedule(this.drawing);
	},
	drawing:function(){
		// this.targetPoint=cc.p(this.targetPoint.x+this.offsetX,this.targetPoint.y+this.offsetY);
		// this.streakNode.setPosition(this.targetPoint);
		// var action=cc.delayTime(this.delay);
		//var action=cc.fadeOut(this.delay);
		var move=cc.moveTo(0.5, this.endPoint.x,this.endPoint.y);
		this.streakNode.runAction(cc.sequence(move,cc.callFunc(function(){
			this.removeFromParent();
			if(this.callback!=null){
				this.callback();
			}
		}.bind(this))));
		
		

	}
});
