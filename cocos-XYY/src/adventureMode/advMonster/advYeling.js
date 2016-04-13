var AdvYelingMonster=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameYeling;
		this.ID = 0;
		this.combat = 2;
		this.dodge = 2;
		this.finalMark = 2;
		this.openEffectText = Text.nil;
		this.winEffectText = Text.yelingWinEffectText;
		this.loseEffectText = Text.yelingLoseEffectText;
		this.petEffectText = Text.nil;
		this.nature = Text.natureFeng;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = resPng.monster_yeling_png;
		this.level = Text.petLevelWeak;
	},
	realWinEffect:function(callBack){
		advAddHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],null,[1],true,true,callBack);
	},
	realLoseEffect:function(callBack){
		var number=2;
		if(tantadeqiongdingMark==2){
			number=12;
		}
		advUseYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [number], true, advBaseEffectReduceHPEffect,function(){
			// 唐雪见【追打】效果
			advSkillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				if(callBack!=null){
					callBack();
				}
			});
		});
	}
})