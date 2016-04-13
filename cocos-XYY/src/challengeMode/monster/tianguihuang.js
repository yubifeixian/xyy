var TianguihuangMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameTianguihuang;
		this.ID = 0;
		this.combat = 10;
		this.dodge = 2;
		this.finalMark = 10;
		this.openEffectText = "无";
		this.winEffectText = "无";
		this.loseEffectText = "如果敌方有土属性宠物，可以选择用天鬼皇替换该宠物";
		this.petEffectText = "主人战力+2，命中+1";
		this.nature = "土";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_tianguihuang_png;
		this.level = "BOSS";
	},
	winEffect:function(callBack){
		this._super();
		if(callBack!=null){
			callBack();
		}
	},
	loseEffect:function(callBack){
		this._super();
		var tempNum = nowPlayerNumber + 1;
		tempNum %= nowPlayerTerm.length;
		var tianguihuangEffect=false;
		for(var i=0;i<nowPlayerTerm.length;i++){
			if(!player1IsPlayer2Friend(nowPlayerTerm[i], nowPlayerTerm[nowPlayerNumber])
					&&nowPlayerTerm[i].pet_TuMonster!=null){
				tianguihuangEffect=true;
				calculate_Pets(nowPlayerTerm[i],this,function(){
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