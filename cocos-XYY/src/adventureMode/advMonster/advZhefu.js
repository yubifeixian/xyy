var AdvZhefu=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameZhefu;
		this.ID = 0;
		this.combat = 0;
		this.dodge = 1;
		this.finalMark = 0;
		this.openEffectText = "魔主HP+5";//翻出效果
		this.winEffectText = "魔主HP回复，回复量=本场战斗中怪物的基本战力";//混战效果
		this.loseEffectText = "";
		this.petEffectText = "";
		this.monsterPicSrc = resPng.zhefu_png;
		this.level = "危机";
	},
	openEffect:function(callBack){
		askHuanmeihuazhou(player1,function(){
			for(var i=0;i<5;i++){
				baseEffectAddHP(boss)
			}
			has_Tianshezhang(boss);
			if(callBack!=null){
				callBack();
			}
		},callBack);
	},
	winEffect:function(callBack){
		askHuanmeihuazhou(player1,function(){
			for(var i=0;i<fight_FirstMonster.combat;i++){
				baseEffectAddHP(boss)
			}
			has_Tianshezhang(boss);
			if(callBack!=null){
				callBack();
			}
		},callBack);
	}
})