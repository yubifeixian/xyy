var TurnMonsterCardLayer=cc.Layer.extend({
	monster:{},
	cardBack:{},
	cardFront:{},
	callback:null,
	ctor:function(monster,callback){
		this._super();
		this.monster=monster;
		this.callback=callback;
		this.cardBack=monsterLabel.clone();
		this.cardFront=monsterLabel.clone();
		this.addChild(this.cardFront);
		this.addChild(this.cardBack);
		this.loadImage();
	},
	loadImage:function(){
		this.cardFront.loadTexture(this.monster.monsterPicSrc);
		// 动画序列（延时，显示，延时，隐藏）
		var backSeq=cc.sequence(cc.delayTime(0.2),cc.show(),cc.delayTime(0.2),cc.hide());
		// 持续时间、半径初始值、半径增量、仰角初始值、仰角增量、离x轴的偏移角、离x轴的偏移角的增量
		var backCamera=cc.orbitCamera(0.5, 1, 0, 0, -90, 0, 0);
		var spawnBack=cc.spawn(backSeq,backCamera);
		this.cardBack.runAction(spawnBack);

		// 动画序列（延时，隐藏，延时，显示）
		var frontSeq=cc.sequence(cc.hide(),cc.delayTime(0.2),cc.hide(),cc.delayTime(0.2),cc.show());
		var landCamera=cc.orbitCamera(0.5, 1, 0, 0, -360, 0, 0);
		var spwanFront=cc.spawn(frontSeq,landCamera);
		this.cardFront.runAction(cc.sequence(spwanFront,cc.callFunc(function(){
			if(this.callback!=null){
				this.callback();
			}
		}, this)));
	},
	instead:function(){
		var spwanFront=cc.spawn(cc.moveBy(0.2, this.cardFront.width, 0),cc.fadeOut(0.2));
		this.cardFront.runAction(cc.sequence(spwanFront,cc.callFunc(function(){
			this.removeFromParent();
			//turnMonsterCardLayer=null;
		},this)));
	}
})