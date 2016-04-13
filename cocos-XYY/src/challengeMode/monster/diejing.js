var DiejingMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameDiejing;
		this.ID = 0;
		this.combat = 6;
		this.dodge = 4;
		this.finalMark = 6;
		this.openEffectText = "无";
		this.winEffectText = "敌方一人HP+2（敌方任选）";
		this.loseEffectText = "无";
		this.petEffectText = "（爆发）任意角色HP降到0时，您可放弃蝶精，令其满HP复活";
		this.nature = "风";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_diejing_png;
		this.level = "BOSS";
	},
	winEffect:function(callBack){
		this._super();
		var addHPplayer = null;
		if (nowPlayerTerm[nowPlayerNumber]._name==player1._name
				|| nowPlayerTerm[nowPlayerNumber]._name==player2._name) {
			if (player3.hp != 0&& player4.hp != 0) {
				var index = parseInt(Math.random()*2, 10);
				if (index == 1) {
					addHPplayer = player3;
				} else if (index == 0) {
					addHPplayer = player4;
				}
			} else if (player3.hp == 0
					&& player4.hp != 0) {
				addHPplayer = player4;
			} else if (player3.hp != 0
					&& player4.hp == 0) {
				addHPplayer = player3;
			}
			textAreaAddMessage(addHPplayer._name+"HP+2", myText, listView);
			for (var i = 0; i < 2; i++){
				baseEffectAddHP(addHPplayer)
			}
			has_Tianshezhang(addHPplayer);
			if(callBack!=null){
				callBack();
			}
		} else {
			addDialog(mainScene, new selectPlayerDialogLayer(true,true,false,false,"请选择一人HP+2",false,false,function(result){
				textAreaAddMessage(result._name+"HP+2", myText, listView);
				for (var i = 0; i < 2; i++){
					baseEffectAddHP(result)
				}
				has_Tianshezhang(result);
				if(callBack!=null){
					callBack();
				}
			}));
		}
	},
	loseEffect:function(callBack){
		this._super();
		if(callBack!=null){
			callBack();
		}
	}
})