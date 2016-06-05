/**
 * 攻击对象动画层：
 * 
 * 效果：从usePlayer的头像处发射粒子，射向targetPlayer头像，然后targetPlayer头像闪烁红光
 */
var AttackTargetLayer=cc.Layer.extend({
	drawNode:null,
	startPoint:null,
	endPoint:null,
	targetPoint:null,
	offsetX:0,
	offSetY:0,
	time:2,
	delay:0.1,
	callback:null,
	ctor:function(usePlayer,targetPlayer,callback){
		this._super();
		this.startPoint=cc.p(usePlayer.x, usePlayer.y);
		this.endPoint=cc.p(targetPlayer.x, targetPlayer.y);
		this.targetPoint=this.startPoint;
		this.callback=callback;
		this.drawNode=new cc.DrawNode();
		this.addChild(this.drawNode);
		this.offsetX=(this.endPoint.x-this.startPoint.x)/this.time;
		this.offsetY=(this.endPoint.y-this.startPoint.y)/this.time;
		this.schedule(this.drawing,this.delay);
	},
	drawing:function(){
		this.drawNode.clear();
		this.targetPoint=cc.p(this.targetPoint.x+this.offsetX,this.targetPoint.y+this.offsetY);
		this.drawNode.drawSegment(this.startPoint, this.targetPoint, 3, cc.color(255,255,68,150));
		var action=cc.delayTime(this.delay);
		this.runAction(cc.sequence(action,cc.callFunc(function(){
			if(Math.abs(this.targetPoint.x-this.startPoint.x)>=Math.abs(this.endPoint.x-this.startPoint.x)&&
				Math.abs(this.targetPoint.y-this.startPoint.y)>=Math.abs(this.endPoint.y-this.startPoint.y)){
				this.unschedule(this.drawing);
				this.runAction(cc.sequence(action,cc.callFunc(function(){
					this.drawNode.clear();
					this.removeFromParent();
					if(this.callback!=null){
						this.callback();
					}
				}.bind(this))))
			}
		}.bind(this))));
		
		

	},
	update:function(dt){
		this.drawing();
	}
});


