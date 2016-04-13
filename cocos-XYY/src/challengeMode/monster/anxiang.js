var AnxiangMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameAnxiang;
		this.ID = 0;
		this.combat = 4;
		this.dodge = 6;
		this.finalMark = 4;
		this.openEffectText = "无";
		this.winEffectText = "您的HP+2";
		this.loseEffectText = "敌方全体HP+2";
		this.petEffectText = "主人战力+1";
		this.nature = "风";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_anxiang_png;
		this.level = "弱";
	},
	winEffect:function(callBack){
		this._super();
		for (var i = 0; i < 2; i++){
			baseEffectAddHP(nowPlayerTerm[nowPlayerNumber])
		}
		has_Tianshezhang(nowPlayerTerm[nowPlayerNumber]);
		if(callBack!=null){
			callBack();
		}
	},
	loseEffect:function(callBack){
		this._super();
		for (var i=0;i<nowPlayerTerm.length;i++) {
			if (nowPlayerTerm[i].hp > 0&&
					!player1IsPlayer2Friend(nowPlayerTerm[i], nowPlayerTerm[nowPlayerNumber]))  {
				for (var t = 0; t < 2; t++){
					baseEffectAddHP(nowPlayerTerm[i]);
				}
				textAreaAddMessage(nowPlayerTerm[i]._name+"HP+2", myText, listView);
				has_Tianshezhang(nowPlayerTerm[i]);
			}
		}
		if(callBack!=null){
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