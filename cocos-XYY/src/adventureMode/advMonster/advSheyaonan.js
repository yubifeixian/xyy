var AdvSheyaonanMonster=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameSheyaonan;
		this.ID = 0;
		this.combat = 9;
		this.dodge = 2;
		this.finalMark = 9;
		this.openEffectText = Text.nil;
		this.winEffectText = Text.sheyaonanWinEffectText;
		this.loseEffectText = Text.sheyaonanLoseEffectText;
		this.petEffectText = Text.nil;
		this.nature = Text.natureShui;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = resPng.monster_sheyaonan_png;
		this.level = Text.petLevelStrong;
	},
	realWinEffect:function(callBack){
		advUseYingu([fight_Monster[0]], fight_Monster[0], fight_Monster[0], [4], true, advBaseEffectReduceHPEffect,function(){
			// 唐雪见【追打】
			advSkillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				if(callBack!=null){
					callBack();
				}
			});
		});
	},
	realLoseEffect:function(callBack){
		if(!advSkillCharacters_XuanxiaoNingbingfenyan(nowPlayerTerm[nowPlayerNumber])){
			var number=4;
			if(tantadeqiongdingMark==2){
				number=12;
			}
			advUseYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [number], true, advBaseEffectReduceHPEffect,function(){
				// 唐雪见【追打】技能
				advSkillCharactersTangxuejianZhuida(function(){
					heartList=new Array();
					if(callBack!=null){
						callBack();
					}
				});
			});
		}else if(callBack!=null){
			callBack();
		}
	}
})