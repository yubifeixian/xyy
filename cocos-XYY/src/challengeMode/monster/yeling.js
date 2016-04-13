var YelingMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameYeling;
		this.ID = 0;
		this.combat = 2;
		this.dodge = 2;
		this.finalMark = 2;
		this.openEffectText = "无";
		this.winEffectText = "您补一张牌";
		this.loseEffectText = "您的HP-2";
		this.petEffectText = "无";
		this.nature = "风";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_yeling_png;
		this.level = "弱";
	},
	winEffect:function(callBack){
		this._super();
		addHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],null,[1],true,true,callBack);
	},
	loseEffect:function(callBack){
		this._super();
		useYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [2], true, baseEffectReduceHPEffect,function(){
			// 唐雪见【追打】效果
			skillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				if(callBack!=null){
					callBack();
				}
			});
		});
	}
})