var HuayaoMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameHuayao;
		this.ID = 0;
		this.combat = 6;
		this.dodge = 5;
		this.finalMark = 6;
		this.openEffectText = "无";
		this.winEffectText = "触发者补1张牌";
		this.loseEffectText = "触发者HP-2,角色横置";
		this.petEffectText = "我方成员在使用技牌阶段,可以从牌堆中换1张手牌";
		this.nature = "水";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_huayao_png;
		this.level = "强";
	},
	winEffect:function(callBack){
		this._super();
		//TODO:
		callBack();
	},
	loseEffect:function(callBack){
		this._super();
		//TODO:
		callBack();
	}
})