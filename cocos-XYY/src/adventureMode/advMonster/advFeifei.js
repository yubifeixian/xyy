var AdvFeifeiMonster=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameFeifei;
		this.ID = 0;
		this.combat = 2;
		this.dodge = 5;
		this.finalMark = 2;
		this.openEffectText = Text.nil;
		this.winEffectText = Text.feifeiWinEffectText;
		this.loseEffectText = Text.feifeiLoseEffectText;
		this.petEffectText = Text.feifeiPetEffectText;
		this.nature = Text.natureHuo;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = resPng.monster_feifei_png;
		this.level = Text.petLevelWeak;
	},
	realWinEffect:function(callBack){
		advUseYingu([fight_Monster[0]], fight_Monster[0], fight_Monster[0], [3], true, advBaseEffectReduceHPEffect,function(){
			// 唐雪见【追打】技能
			advSkillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				if(callBack!=null){
					callBack();
				}
			})
		});
	},
	realLoseEffect:function(callBack){
		if(!advSkillCharacters_XuanxiaoNingbingfenyan(nowPlayerTerm[nowPlayerNumber])){
			var heartNumber=3;
			if(tantadeqiongdingMark==2&&advJudgeIsFriend(nowPlayerTerm[nowPlayerNumber])){
				heartNumber=12;
			}
			advUseYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [heartNumber], true, advBaseEffectReduceHPEffect, function(){
				// 唐雪见【追打】效果
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