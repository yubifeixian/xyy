var AdvShuimoshouMonster=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameShuimoshou;
		this.ID = 0;
		this.combat = 7;
		this.dodge = 6;
		this.finalMark = 7;
		this.openEffectText = Text.nil;
		this.winEffectText = Text.shuimoshouWinEffectText;
		this.loseEffectText = Text.shuimoshouLoseEffectText;
		this.petEffectText = Text.shuimoshouPetEffectText;
		this.nature = Text.natureShui;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = resPng.monster_shuimoshou_png;
		this.level = Text.petLevelBoss;
	},
	realWinEffect:function(callBack){
		var temp=this;
		// 先执行 敌人全体HP-1效果，再抽取妨碍者1件装备或手牌
		advUseYingu([boss], boss, boss, [1], true, advBaseEffectReduceHPEffect,function(){
			// 唐雪见【追打】效果
			advSkillCharactersTangxuejianZhuida(function(){
				if (fight_Monster[0].handCard.length== 0&&baseEffectCountequment(fight_Monster[0])==0) {
					textAreaAddMessage(Text.hinderHaveNoEquipmentAndHandCard, myText, listView,callBack);
				} else {
					if (nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name) {
						addDialog(mainScene, new selectCardTypeDialogLayer(Text.chooseExtractCard,fight_Monster[0],function(result){
							if(result==SelectCardType.ARMS1){
								advPlayer1GetPlayer2Equment(nowPlayerTerm[nowPlayerNumber], fight_Monster[0].arms1);
								fight_Monster[0].arms1Combat = 0;
								fight_Monster[0].arms1Extent = 0;
								fight_Monster[0].arms1=Text.nil;
								if(callBack!=null){
									callBack();
								}
							}else if(result==SelectCardType.DEFENSE){
								advPlayer1GetPlayer2Equment(nowPlayerTerm[nowPlayerNumber], fight_Monster[0].defense);
								fight_Monster[0].defenseCombat = 0;
								fight_Monster[0].defenseExtent = 0;
								fight_Monster[0].defense=Text.nil;
								if(callBack!=null){
									callBack();
								}
							}else if(result==SelectCardType.HANDCARD){
								var tempNumber=parseInt(Math.random()*fight_Monster[0].handCard.length,10);
								var tempCard=fight_Monster[0].handCard[tempNumber];
								nowPlayerTerm[nowPlayerNumber].handCard.push(tempCard);
								handCardZone.pushBackCustomItem(tempCard);
								fight_Monster[0].handCard.removeObject(tempCard);
								if(callBack!=null){
									callBack();
								}
							}
						}));
					} else {
						// AI抽取妨碍者手牌或装备
						// 优先抽取妨碍者武器类装备
						if (fight_Monster[0].arms1!=Text.nil) {
							textAreaAddMessage(Text.extractArm.format(nowPlayerTerm[nowPlayerNumber]._name,fight_Monster[0]._name,fight_Monster[0].arms1), myText, listView);
							advPlayer1GetPlayer2Equment(nowPlayerTerm[nowPlayerNumber], fight_Monster[0].arms1);
							fight_Monster[0].arms1Combat = 0;
							fight_Monster[0].arms1Extent = 0;
							fight_Monster[0].arms1 = Text.nil;
						} else if (fight_Monster[0].defense!=Text.nil) {
							textAreaAddMessage(Text.extractDefense.format(nowPlayerTerm[nowPlayerNumber]._name,fight_Monster[0]._name,fight_Monster[0].defense), myText, listView);
							advPlayer1GetPlayer2Equment(nowPlayerTerm[nowPlayerNumber], fight_Monster[0].defense);
							fight_Monster[0].defenseCombat = 0;
							fight_Monster[0].defenseExtent = 0;
							fight_Monster[0].defense = Text.nil;
						} else if (fight_Monster[0].handCard.length> 0) {
							var tempNum = parseInt(Math.random()*fight_Monster[0].handCard.length, 10);
							var tempCard=fight_Monster[0].handCard[tempNum];
							nowPlayerTerm[nowPlayerNumber].handCard.push(tempCard);
							textAreaAddMessage(Text.extractHandCard.format(nowPlayerTerm[nowPlayerNumber]._name,fight_Monster[0]._name), myText, listView);
							fight_Monster[0].handCard.removeObject(tempCard);
						} else {
							textAreaAddMessage(Text.monsterWinEffectInvalid.format(temp.name), myText, listView);
						}
						if(callBack!=null){
							callBack();
						}
					}
				}
			});
		});
	},
	realLoseEffect:function(callBack){
		var tempHeartList=new Array();
		var tempHeartNumber=new Array();
		if(!advSkillCharacters_XuanxiaoNingbingfenyan(nowPlayerTerm[nowPlayerNumber])){
			tempHeartList.push(nowPlayerTerm[nowPlayerNumber]);
			if(tantadeqiongdingMark==2){
				tempHeartNumber.push(12);
			}else{
				tempHeartNumber.push(2);
			}
		}
		advUseYingu(tempHeartList, tempHeartList[0], tempHeartList[0], tempHeartNumber, true, advBaseEffectReduceHPEffect,function(){
			var temp=this;
			// 唐雪见【追打】技能
			advSkillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				if (nowPlayerTerm[nowPlayerNumber].hp > 0) {
					if (nowPlayerTerm[nowPlayerNumber].handCard.length == 0
							&&baseEffectCountequment(nowPlayerTerm[nowPlayerNumber])== 0) {
						textAreaAddMessage(Text.monsterLoseEffectInvalid.format(temp.name), myText, listView,callBack);
					} else {
						// AI处理水魔兽失败结算（当妨碍者是AI时的情况）
						if (nowPlayerTerm[nowPlayerNumber].arms1!=Text.nil) {
							advPlayer1GetPlayer2Equment(fight_Monster[0], nowPlayerTerm[nowPlayerNumber].arms1);
							nowPlayerTerm[nowPlayerNumber].arms1Combat = 0;
							nowPlayerTerm[nowPlayerNumber].arms1Extent = 0;
							nowPlayerTerm[nowPlayerNumber].arms1 = Text.nil;
							if(callBack!=null){
								callBack();
							}
						}else if(nowPlayerTerm[nowPlayerNumber].arms2!=Text.nil) {
							advPlayer1GetPlayer2Equment(fight_Monster[0], nowPlayerTerm[nowPlayerNumber].arms2);
							nowPlayerTerm[nowPlayerNumber].arms2Combat = 0;
							nowPlayerTerm[nowPlayerNumber].arms2Extent = 0;
							nowPlayerTerm[nowPlayerNumber].arms2 = Text.nil;
							if(callBack!=null){
								callBack();
							}
						} else if (nowPlayerTerm[nowPlayerNumber].defense!=Text.nil) {
							advPlayer1GetPlayer2Equment(fight_Monster[0], nowPlayerTerm[nowPlayerNumber].defense);
							nowPlayerTerm[nowPlayerNumber].defenseCombat = 0;
							nowPlayerTerm[nowPlayerNumber].defenseExtent = 0;
							nowPlayerTerm[nowPlayerNumber].defense = Text.nil;
							if(callBack!=null){
								callBack();
							}
						} else if (nowPlayerTerm[nowPlayerNumber].handCard.length > 0) {
							var tempNum = parseInt(Math.random()*nowPlayerTerm[nowPlayerNumber].handCard.length, 10);
							var tempCard=nowPlayerTerm[nowPlayerNumber].handCard[tempNum];
							fight_Monster[0].handCard.push(tempCard);
							textAreaAddMessage(Text.extractHandCard.format(fight_Monster[0]._name,nowPlayerTerm[nowPlayerNumber]._name), myText, listView);
							if (nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name) {
								tempCard.removeFromParent();
							}
							nowPlayerTerm[nowPlayerNumber].handCard.removeObject(tempCard);
							if(callBack!=null){
								callBack();
							}
						} else if (nowPlayerTerm[nowPlayerNumber]._name==nameWangpengxu
								&& nowPlayerTerm[nowPlayerNumber].skillTempList.length > 0) {
							var wangpengxu = nowPlayerTerm[nowPlayerNumber];
							var tempCard = wangpengxu.skillTempList[parseInt(Math.random()*wangpengxu.skillTempList.length, 10)];
							fight_Monster[0].handCard.push(tempCard);
							wangpengxu.skillTempList.removeObject(tempCard);
							wangpengxu.maxCombat--;
							textAreaAddMessage(Text.extractOrnament.format(fight_Monster[0]._name,nowPlayerTerm[nowPlayerNumber]._name), myText, listView,callBack);
						} else {
							textAreaAddMessage(Text.monsterLoseEffectInvalid.format(temp.name), myText, listView,callBack);
						}
					}
				}else if(callBack!=null){
					callBack();
				}
			});
		});
	},
	petEffect:function(player){
		player.petsCombat++;
		player.petsExtent++;
	},
	updatePetEffect:function(player){
		player.petsCombat--;
		player.petsExtent--;
		if (player.petsCombat < 0)
			player.petsCombat = 0;
		if (player.petsExtent < 0)
			player.petsExtent = 0;
	}
})