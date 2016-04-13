var AdvYanyueMonster=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameYanyue;
		this.ID = 0;
		this.combat = 4;
		this.dodge = 1;
		this.finalMark = 4;
		this.openEffectText = Text.nil;
		this.winEffectText = Text.yanyueWinEffectText;
		this.loseEffectText = Text.yanyueLoseEffectText;
		this.petEffectText = Text.yanyuePetEffectText;
		this.nature = Text.natureHuo;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = resPng.monster_yanyue_png;
		this.level = Text.petLevelWeak;
	},
	realWinEffect:function(callBack){
		this._super();
		advUseYingu([fight_Monster[0]], fight_Monster[0], fight_Monster[0], [2], true, advBaseEffectReduceHPEffect,function(){
			advSkillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				if(callBack!=null){
					callBack();
				}
			});
		});
	},
	realLoseEffect:function(callBack){
		this._super();
		if(!advSkillCharacters_XuanxiaoNingbingfenyan(nowPlayerTerm[nowPlayerNumber])){
			var number=3;
			if(tantadeqiongdingMark==2){
				number=12;
			}
			advUseYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [number], true, advBaseEffectReduceHPEffect, function(){
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
	},
	petEffect:function(player){
		player.petsCombat++;
	},
	updatePetEffect:function(player){
		player.petsCombat--;
		if (player.petsCombat < 0)
			player.petsCombat = 0;
	}
})