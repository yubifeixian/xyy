var AdvJiliangyinzheMonster=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameJiliangyinzhe;
		this.ID = 0;
		this.combat = 3;
		this.dodge = 3;
		this.finalMark = 3;
		this.openEffectText = Text.nil;
		this.winEffectText = Text.jiliangyinzheWinEffectText;
		this.loseEffectText = Text.jiliangyinzheLoseEffectText;
		this.petEffectText = Text.nil;
		this.nature = Text.natureLei;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = resPng.monster_jiliangyinzhe_png;
		this.level = Text.petLevelWeak;
	},
	realWinEffect:function(callBack){
		var selectPlayer = nowPlayerTerm[nowPlayerNumber];
		if (selectPlayer._name==myControlPlayer._name) {
			addDialog(mainScene, new selectAdvPlayerDialogLayer(true,true,true,true,Text.chooseAddHpTarget.format(2),false,false,function(result){
				for(var i=0;i<2;i++){
					baseEffectAddHP(result);
				}
				textAreaAddMessage(Text.addHp.format(result._name,2), myText, listView);
				has_Tianshezhang(result);
				if(callBack!=null){
					cc.log("ji win");
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
			textAreaAddMessage(Text.addHp.format(selectPlayer._name,2), myText, listView);
			has_Tianshezhang(selectPlayer);
			if(callBack!=null){
				callBack();
			}
		}
	},
	realLoseEffect:function(callBack){
		var number=3;
		if(tantadeqiongdingMark==2){
			number=12;
		}
		advUseYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [number], true, advBaseEffectReduceHPEffect,function(){
			// 唐雪见【追打技能】
			advSkillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				if(callBack!=null){
					callBack();
				}
			});
		});
	}
})