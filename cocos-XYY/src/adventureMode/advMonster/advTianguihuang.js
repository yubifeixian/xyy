var AdvTianguihuangMonster=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameTianguihuang;
		this.ID = 0;
		this.combat = 10;
		this.dodge = 2;
		this.finalMark = 10;
		this.openEffectText = Text.nil;
		this.winEffectText = Text.nil;
		this.loseEffectText = Text.tianguihuangLoseEffectText;
		this.petEffectText = Text.tianguihuangPetEffectText;
		this.nature = Text.natureTu;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = resPng.monster_tianguihuang_png;
		this.level = Text.petLevelBoss;
	},
	realWinEffect:function(callBack){
		if(callBack!=null){
			callBack();
		}
	},
	realLoseEffect:function(callBack){
		var tempNum = nowPlayerNumber + 1;
		tempNum %= nowPlayerTerm.length;
		var tianguihuangEffect=false;
		for(var i=0;i<nowPlayerTerm.length;i++){
			if(nowPlayerTerm[i]._name!=boss._name&&nowPlayerTerm[i].pet_TuMonster!=null){
				tianguihuangEffect=true;
				advCalculate_Pets(nowPlayerTerm[i],this,function(){
					if(callBack!=null){
						callBack();
					}
				});
			}
		}
		if(!tianguihuangEffect&&callBack!=null){
			callBack();
		}
	},
	petEffect:function(player){
		player.petsCombat += 2;
		player.petsExtent++;
	},
	updatePetEffect:function(player){
		player.petsCombat -= 2;
		player.petsExtent--;
		if (player.petsCombat < 0)
			player.petsCombat = 0;
		if (player.petsExtent < 0)
			player.petsExtent = 0;
	}
})