var AdvDiejingMonster=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameDiejing;
		this.ID = 0;
		this.combat = 6;
		this.dodge = 4;
		this.finalMark = 6;
		this.openEffectText = Text.nil;
		this.winEffectText = Text.diejingWinEffectText;
		this.loseEffectText = Text.nil;
		this.petEffectText = Text.diejingPetEffectText;
		this.nature = Text.natureFeng;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = resPng.monster_diejing_png;
		this.level = Text.petLevelBoss;
	},
	realWinEffect:function(callBack){
		for (var i = 0; i < 2; i++){
			baseEffectAddHP(boss)
		}
		has_Tianshezhang(boss);
		sleep(callBack);
	},
	realLoseEffect:function(callBack){
		this._super();
		sleep(callBack);
	}
})