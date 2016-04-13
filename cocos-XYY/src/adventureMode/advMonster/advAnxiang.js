var AdvAnxiangMonster=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameAnxiang;
		this.ID = 0;
		this.combat = 4;
		this.dodge = 6;
		this.finalMark = 4;
		this.openEffectText = Text.nil;
		this.winEffectText = Text.anxiangWinEffectText;
		this.loseEffectText = Text.anxiangLoseEffectText;
		this.petEffectText = Text.anxiangPetEffectText;
		this.nature = Text.natureFeng;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = resPng.monster_anxiang_png;
		this.level = Text.petLevelWeak;
	},
	realWinEffect:function(callBack){
		for (var i = 0; i < 2; i++){
			baseEffectAddHP(nowPlayerTerm[nowPlayerNumber])
		}
		has_Tianshezhang(nowPlayerTerm[nowPlayerNumber]);
		if(callBack!=null){
			callBack();
		}
	},
	realLoseEffect:function(callBack){
		for (var t = 0; t < 2; t++){
			baseEffectAddHP(boss);
		}
		textAreaAddMessage(Text.addHp.format(boss._name,2), myText, listView);
		has_Tianshezhang(boss);
		sleep(callBack)
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