var ChiguiwangMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameChiguiwang;
		this.ID = 0;
		this.combat = 8;
		this.dodge = 5;
		this.finalMark = 8;
		this.openEffectText = "支援者在本场战斗中战力+2";
		this.winEffectText = "您指定任意一名玩家补2张牌";
		this.loseEffectText = "您的HP-2，失去全部装备并补充失去装备数量的手牌";
		this.petEffectText = "主人在补牌阶段可多补1张牌";
		this.nature = "雷";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_chiguiwang_png;
		this.level = "强";
	},
	openEffect:function(callBack){
		if (fight_Trigger.length > 1) {
			baseEffectAddSkillCombat(fight_Trigger[1], 2);
			var isNotMiss = attactIsMiss(fight_Trigger[1],
					fight_FirstMonster);
			if (isNotMiss) {
				addTrigerCombat(2)
			}
			textAreaAddMessage("赤鬼王出场效果:"+this.openEffectText, myText, listView);
		} else {
			textAreaAddMessage("无支援者，赤鬼王出场效果无效", myText, listView);
		}
		callBack();
	},
	winEffect:function(callBack){
		this._super();
		var selectPlayer = nowPlayerTerm[nowPlayerNumber];
		if (selectPlayer._name==player1._name) {
			addDialog(mainScene, new selectPlayerDialogLayer(true,true,true,true,"请选择一人补2张牌",false,false,function(result){
				textAreaAddMessage(result._name+"补了2张牌", myText, listView);
				addHandCard([result],result,result,null,[2],true,true,callBack);
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
			textAreaAddMessage(selectPlayer._name+"补了2张牌", myText, listView);
			addHandCard([selectPlayer],selectPlayer,selectPlayer,null,[2],true,true,callBack);
		}
	},
	loseEffect:function(callBack){
		this._super();
		mainScene.addChild(new MagicLayer(nowPlayerTerm[nowPlayerNumber].hadImageView,new MagicNodeLei(),function(){
			useYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [2], true, baseEffectReduceHPEffect,function(){
				// 唐雪见【追打】技能
				skillCharactersTangxuejianZhuida(function(){
					heartList=new Array();
					if (nowPlayerTerm[nowPlayerNumber].hp > 0) {
						var number =baseEffectCountequment(nowPlayerTerm[nowPlayerNumber]);
						if (number == 0) {
							textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"无装备可弃", myText, listView);
							if(callBack!=null){
								callBack();
							}
						} else {
							if (nowPlayerTerm[nowPlayerNumber].arms1!="无") {
								remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].arms1);
								nowPlayerTerm[nowPlayerNumber].arms1Combat = 0;
								nowPlayerTerm[nowPlayerNumber].arms1Extent = 0;
								nowPlayerTerm[nowPlayerNumber].arms1 = "无";
								nowPlayerTerm[nowPlayerNumber].tempZhuangbeiSkillCombat=0;
								nowPlayerTerm[nowPlayerNumber].tempZhuangbeiSkillExtent=0;
							}
							if (nowPlayerTerm[nowPlayerNumber].arms2!="无") {
								remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].arms2);
								nowPlayerTerm[nowPlayerNumber].arms2Combat = 0;
								nowPlayerTerm[nowPlayerNumber].arms2Extent = 0;
								nowPlayerTerm[nowPlayerNumber].arms2 = "无";
							}
							if (nowPlayerTerm[nowPlayerNumber].defense!="无") {
								remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].defense);
								nowPlayerTerm[nowPlayerNumber].defenseCombat = 0;
								nowPlayerTerm[nowPlayerNumber].defenseExtent = 0;
								nowPlayerTerm[nowPlayerNumber].defense = "无";
							}
							if (nowPlayerTerm[nowPlayerNumber]._name==nameWangpengxu
									&& nowPlayerTerm[nowPlayerNumber].skillTempList.length > 0) {
								nowPlayerTerm[nowPlayerNumber].maxCombat -= nowPlayerTerm[nowPlayerNumber].skillTempList.length;
								for (var i=0;i< nowPlayerTerm[nowPlayerNumber].skillTempList.length;i++) {
									remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].skillTempList[i].name);
								}
								nowPlayerTerm[nowPlayerNumber].skillTempList=new Array();
							}
							textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"失去了全部共"+number+"件装备，并补充了"+number+"张手牌", myText, listView);
							addHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],null,[number],true,true,callBack);
						}
					}else if(callBack!=null){
						callBack();
					}
				});
			});
		}));
	}
})