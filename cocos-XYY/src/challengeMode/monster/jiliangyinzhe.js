var JiliangyinzheMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameJiliangyinzhe;
		this.ID = 0;
		this.combat = 3;
		this.dodge = 3;
		this.finalMark = 3;
		this.openEffectText = "无";
		this.winEffectText = "您指定一名玩家HP+2";
		this.loseEffectText = "您的HP-3";
		this.petEffectText = "无";
		this.nature = "雷";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_jiliangyinzhe_png;
		this.level = "弱";
	},
	winEffect:function(callBack){
		this._super();
		var selectPlayer = nowPlayerTerm[nowPlayerNumber];
		if (selectPlayer._name==player1._name) {
			addDialog(mainScene, new selectPlayerDialogLayer(true,true,true,true,"请选择一人HP+2",false,false,function(result){
				for(var i=0;i<2;i++){
					baseEffectAddHP(result);
				}
				textAreaAddMessage(result._name+"HP+2", myText, listView);
				has_Tianshezhang(result);
				if(callBack!=null){
					callBack();
				}
			}));
		} else {
			// AI确定加血角色
			if (nowPlayerTerm[nowPlayerNumber].friendList[1].hp > 0 
					&& nowPlayerTerm[nowPlayerNumber].friendList[1].hp != nowPlayerTerm[nowPlayerNumber].friendList[1].maxHP
					&& nowPlayerTerm[nowPlayerNumber].friendList[1].hp < nowPlayerTerm[nowPlayerNumber].hp) {
				selectPlayer = nowPlayerTerm[nowPlayerNumber].friendList[1];
			}
			for(var i=0;i<2;i++){
				baseEffectAddHP(selectPlayer);
			}
			textAreaAddMessage(selectPlayer._name+"HP+2", myText, listView);
			has_Tianshezhang(selectPlayer);
			if(callBack!=null){
				callBack();
			}
		}
	},
	loseEffect:function(callBack){
		this._super();
		useYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [3], true, baseEffectReduceHPEffect,function(){
			// 唐雪见【追打技能】
			skillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				if(callBack!=null){
					callBack();
				}
			});
		});
	}
})