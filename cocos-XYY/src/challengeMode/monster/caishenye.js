var CaishenyeMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameCaishenye;
		this.ID = 0;
		this.combat = 3;
		this.dodge = 2;
		this.finalMark = 3;
		this.openEffectText = "本场战斗中，妨碍者战力加倍(含装备，不含战牌加成)";
		this.winEffectText = "触发者，支援者各补1张牌";
		this.loseEffectText = "妨碍者补2张牌";
		this.petEffectText = "主人手牌上限+1";
		this.nature = "土";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_caishenye_png;
		this.level = "BOSS";
	},
	openEffect:function(callBack){
		if (fight_Monster.length > 1) {
			baseEffectAddSkillCombat(fight_Monster[0], fight_Monster[0].combat);
			var isNotMiss = attactIsMiss(fight_Monster[0],
					fight_FirstMonster);
			if (isNotMiss) {
				addMonsterCombat(fight_Monster[0].combat);
			}
			textAreaAddMessage(this.name+"出场效果："+this.openEffectText, myText, listView);
		} else {
			textAreaAddMessage("无妨碍者，财神爷出场效果无效", myText, listView);
		}
		callBack();
	},
	winEffect:function(callBack){
		this._super();
	},
	loseEffect:function(callBack){
		this._super();
	}
})