var ZhimaMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameZhima;
		this.ID = 0;
		this.combat = 3;
		this.dodge = 3;
		this.finalMark = 3;
		this.openEffectText = "触发者掷骰判定,纸马实际战力=基础战力+骰子点数(4、5、6分别算作1、2、3)";
		this.winEffectText = "触发者掷骰判定,对指定玩家造成骰子点数的伤害(4、5、6分别算作1、2、3)";
		this.loseEffectText = "触发者掷骰判定,自身受到骰子点数的伤害(4、5、6分别算作1、2、3)";
		this.petEffectText = "爆发:任何一场打怪战结束时使用,放弃纸马，敌方所有参战者HP-3";
		this.nature = "雷";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_zhima_png;
		this.level = "弱";
	},
	openEffect:function(callBack){
		//TODO:
		callBack();
	},
	winEffect:function(callBack){
		this._super();
		//TODO:
		callback();
	},
	loseEffect:function(callBack){
		this._super();
		//TODO:
		callBack();
	}
})