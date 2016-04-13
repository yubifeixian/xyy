var AdvChiguiwangMonster=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameChiguiwang;
		this.ID = 0;
		this.combat = 8;
		this.dodge = 5;
		this.finalMark = 8;
		this.openEffectText = Text.chiguiwangOpenEffectText;
		this.winEffectText = Text.chiguiwangWinEffectText;
		this.loseEffectText = Text.chiguiwangLoseEffectText;
		this.petEffectText = Text.chiguiwangPetEffectText;
		this.nature = Text.natureLei;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = resPng.monster_chiguiwang_png;
		this.level = Text.petLevelStrong;
	},
	realOpenEffect:function(callBack){
		if (fight_Trigger.length > 1) {
			baseEffectAddSkillCombat(fight_Trigger[1], 2);
			var isNotMiss = advAttactIsMiss(fight_Trigger[1],
					fight_FirstMonster);
			if (isNotMiss) {
				triggerCombat += 2;
			}
			textAreaAddMessage(Text.activeMonsterOpenEffect.format(this.name,this.openEffectText), myText, listView);
		} else {
			textAreaAddMessage(Text.monsterOpenEffectInvalid.format(this.name), myText, listView);
		}
		sleep(callBack);
	},
	realWinEffect:function(callBack){
		var selectPlayer = nowPlayerTerm[nowPlayerNumber];
		if (selectPlayer._name==myControlPlayer._name) {
			addDialog(mainScene, new selectAdvPlayerDialogLayer(true,true,true,true,Text.choosePlayerAddHandCard.format(2),false,false,function(result){
				textAreaAddMessage(Text.addHandCard.format(result._name,2), myText, listView);
				sleep(function(){
					advAddHandCard([result],result,result,null,[2],true,true,callBack);
				});
			}));
		} else {
			// AI确定补牌角色
			if (nowPlayerTerm[nowPlayerNumber].handCard.length > 0) {
				for (var i=0;i< nowPlayerTerm[nowPlayerNumber].friendList.length;i++) {
					if (nowPlayerTerm[nowPlayerNumber].friendList[i]._name!=nowPlayerTerm[nowPlayerNumber]._name) {
						if (nowPlayerTerm[nowPlayerNumber].friendList[i].hp > 0) {
							selectPlayer = nowPlayerTerm[nowPlayerNumber].friendList[i];
							break;
						}
					}
				}
			}
			textAreaAddMessage(Text.addHandCard.format(selectPlayer._name,2), myText, listView);
			sleep(function(){
				advAddHandCard([selectPlayer],selectPlayer,selectPlayer,null,[2],true,true,callBack);
			});
		}
	},
	realLoseEffect:function(callBack){
		var tempHeartNumber=2;
		if(tantadeqiongdingMark==2&&advJudgeIsFriend(nowPlayerTerm[nowPlayerNumber])){
			tempHeartNumber=12;
		}
		advUseYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [tempHeartNumber], true, advBaseEffectReduceHPEffect,function(){
			// 唐雪见【追打】技能
			advSkillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				if (nowPlayerTerm[nowPlayerNumber].hp > 0) {
					var number =baseEffectCountequment(nowPlayerTerm[nowPlayerNumber]);
					if (number == 0) {
						textAreaAddMessage(Text.haveNoEqumentToDrop.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView,callBack);
					} else {
						if (nowPlayerTerm[nowPlayerNumber].arms1!=Text.nil) {
							remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].arms1);
							nowPlayerTerm[nowPlayerNumber].arms1Combat = 0;
							nowPlayerTerm[nowPlayerNumber].arms1Extent = 0;
							nowPlayerTerm[nowPlayerNumber].arms1 = Text.nil;
						}
						if (nowPlayerTerm[nowPlayerNumber].arms2!=Text.nil) {
							remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].arms2);
							nowPlayerTerm[nowPlayerNumber].arms2Combat = 0;
							nowPlayerTerm[nowPlayerNumber].arms2Extent = 0;
							nowPlayerTerm[nowPlayerNumber].arms2 = Text.nil;
						}
						if (nowPlayerTerm[nowPlayerNumber].defense!=Text.nil) {
							remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].defense);
							nowPlayerTerm[nowPlayerNumber].defenseCombat = 0;
							nowPlayerTerm[nowPlayerNumber].defenseExtent = 0;
							nowPlayerTerm[nowPlayerNumber].defense = Text.nil;
						}
						if (nowPlayerTerm[nowPlayerNumber]._name==nameWangpengxu
								&& nowPlayerTerm[nowPlayerNumber].skillTempList.length > 0) {
							nowPlayerTerm[nowPlayerNumber].maxCombat -= nowPlayerTerm[nowPlayerNumber].skillTempList.length;
							for (var i=0;i< nowPlayerTerm[nowPlayerNumber].skillTempList.length;i++) {
								remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].skillTempList[i].name);
							}
							nowPlayerTerm[nowPlayerNumber].skillTempList=new Array();
						}
						textAreaAddMessage(Text.chiguiwangLoseEffectUsing.format(nowPlayerTerm[nowPlayerNumber]._name,number,number), myText, listView);
						sleep(function(){
							advAddHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],null,[number],true,true,callBack);
						});
					}
				}else if(callBack!=null){
					callBack();
				}
			});
		});
	}
})