var JinchifenghuangMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameJinchifenghuang;
		this.ID = 0;
		this.combat = 6;
		this.dodge = 6;
		this.finalMark = 6;
		this.openEffectText = "无";
		this.winEffectText = "无";
		this.loseEffectText = "敌方全体HP+1";
		this.petEffectText = "主人战力+2";
		this.nature = "风";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_jinchifenghuang_png;
		this.level = "强";
	},
	winEffect:function(callBack){
		this._super();
		if(callBack!=null){
			callBack();
		}
	},
	loseEffect:function(callBack){
		this._super();
		for(var i=0;i<nowPlayerTerm.length;i++){
			if (nowPlayerTerm[i].hp > 0
					&& !player1IsPlayer2Friend(nowPlayerTerm[i],
							nowPlayerTerm[nowPlayerNumber])) {
				baseEffectAddHP(nowPlayerTerm[i]);
				has_Tianshezhang(nowPlayerTerm[i]);
			}
		}
		if(callBack!=null){
			callBack();
		}
	},
	petEffect:function(player){
		player.petsCombat+=2;
	},
	updatePetEffect:function(player){
		player.petsExtent -= 2;
		if (player.petsCombat < 0)
			player.petsCombat = 0;
	}
})