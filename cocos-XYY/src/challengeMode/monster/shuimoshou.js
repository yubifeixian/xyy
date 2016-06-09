var ShuimoshouMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameShuimoshou;
		this.ID = 0;
		this.combat = 7;
		this.dodge = 6;
		this.finalMark = 7;
		this.openEffectText = "无";
		this.winEffectText = "敌人全体HP-1，之后您抽取妨碍者1件装备或手牌";
		this.loseEffectText = "您的HP-2，之后妨碍者抽取您的1件装备或手牌";
		this.petEffectText = "主人战力+1，命中+1";
		this.nature = "水";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_shuimoshou_png;
		this.level = "BOSS";
	},
	winEffect:function(callBack){
		this._super();
		// 先执行 敌人全体HP-1效果，再抽取妨碍者1件装备或手牌
		var tempHeartList=new Array();
		var tempHeartNumberList=new Array();
		for (var i=0;i<nowPlayerTerm.length;i++) {
			if (nowPlayerTerm[i].hp > 0
					&& !player1IsPlayer2Friend(nowPlayerTerm[i],
							nowPlayerTerm[nowPlayerNumber])) {
				if(!skillCharacters_XuanxiaoNingbingfenyan(nowPlayerTerm[i])){
					tempHeartList.push(nowPlayerTerm[i]);
					tempHeartNumberList.push(1);
					mainScene.addChild(new MagicLayer(nowPlayerTerm[i].hadImageView,new MagicNodeShui()));
				}
			}
		}
		useYingu(tempHeartList, tempHeartList[0], tempHeartList[0], tempHeartNumberList, true, baseEffectReduceHPEffect,function(){
			// 唐雪见【追打】效果
			skillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				if (fight_Monster.length> 0
						&& fight_Monster[0].hp > 0) {
					if (!isJinchanguimu(fight_Monster[0],"无法抽取金蟾鬼母的手牌或装备")) {
						if (fight_Monster[0].handCard.length== 0&&baseEffectCountequment(fight_Monster[0])==0) {
							textAreaAddMessage("妨碍者无装备和手牌", myText, listView,callBack);
						} else {
							if (nowPlayerTerm[nowPlayerNumber]._name==player1._name) {
								addDialog(mainScene, new selectCardTypeDialogLayer("请选择要抽取的牌",fight_Monster[0],function(result){
									if(result==SelectCardType.ARMS1){
										player1GetPlayer2Equment(nowPlayerTerm[nowPlayerNumber], fight_Monster[0].arms1);
										fight_Monster[0].arms1Combat = 0;
										fight_Monster[0].arms1Extent = 0;
										fight_Monster[0].arms1="无";
										fight_Monster[0].tempZhuangbeiSkillCombat=0;
										fight_Monster[0].tempZhuangbeiSkillExtent=0;
										if(callBack!=null){
											callBack();
										}
									}else if(result==SelectCardType.ARMS2){
										player1GetPlayer2Equment(nowPlayerTerm[nowPlayerNumber], fight_Monster[0].arms2);
										fight_Monster[0].arms2Combat = 0;
										fight_Monster[0].arms2Extent = 0;
										fight_Monster[0].arms2="无";
										if(callBack!=null){
											callBack();
										}
									}else if(result==SelectCardType.DEFENSE){
										player1GetPlayer2Equment(nowPlayerTerm[nowPlayerNumber], fight_Monster[0].defense);
										fight_Monster[0].defenseCombat = 0;
										fight_Monster[0].defenseExtent = 0;
										fight_Monster[0].defense="无";
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
									}else if(result==SelectCardType.ORNAMENT){
										addDialog(mainScene, new selectCardDialogLayer("请选择抽取的饰品",fight_Monster[0].skillTempList,1,1,false,function(result){
											var card=result.pop();
											fight_Monster[0].skillTempList.removeObject(card);
											fight_Monster[0].maxCombat--;
											nowPlayerTerm[nowPlayerNumber].handCard.push(card);
											handCardZone.pushBackCustomItem(card);
											if(callBack!=null){
												callBack();
											}
										}));
									}
								}));
							} else {
								// AI抽取妨碍者手牌或装备
								// 优先抽取妨碍者武器类装备
								if (fight_Monster[0].arms1!="无") {
									textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"抽取妨碍者一件武器:"+fight_Monster[0].arms1, myText, listView);
									player1GetPlayer2Equment(nowPlayerTerm[nowPlayerNumber], fight_Monster[0].arms1);
									fight_Monster[0].arms1Combat = 0;
									fight_Monster[0].arms1Extent = 0;
									fight_Monster[0].arms1 = "无";
									fight_Monster[0].tempZhuangbeiSkillCombat=0;
									fight_Monster[0].tempZhuangbeiSkillExtent=0;
								} else if(fight_Monster[0].arms2!="无"){
									textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"抽取妨碍者一件武器:"+fight_Monster[0].arms2, myText, listView);
									player1GetPlayer2Equment(nowPlayerTerm[nowPlayerNumber], fight_Monster[0].arms2);
									fight_Monster[0].arms2Combat = 0;
									fight_Monster[0].arms2Extent = 0;
									fight_Monster[0].arms2 = "无";
								}else if (fight_Monster[0].defense!="无") {
									textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"抽取妨碍者一件防具:"+fight_Monster[0].defense, myText, listView);
									player1GetPlayer2Equment(nowPlayerTerm[nowPlayerNumber], fight_Monster[0].defense);
									fight_Monster[0].defenseCombat = 0;
									fight_Monster[0].defenseExtent = 0;
									fight_Monster[0].defense = "无";
								} else if (fight_Monster[0].handCard.length> 0) {
									var tempNum = parseInt(Math.random()*fight_Monster[0].handCard.length, 10);
									var tempCard=fight_Monster[0].handCard[tempNum];
									nowPlayerTerm[nowPlayerNumber].handCard.push(tempCard);
									textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"抽取妨碍者一张手牌", myText, listView);
									fight_Monster[0].handCard.removeObject(tempCard);
									if (fight_Monster[0]._name==player1._name) {
										tempCard.removeFromParent();
									}
								} else if (fight_Monster[0]._name==nameWangpengxu
										&& fight_Monster[0].skillTempList.length> 0) {
									var wangpengxu = fight_Monster[0];
									var tempCard = wangpengxu.skillTempList[parseInt(Math.random()*wangpengxu.skillTempList.length,10)];
									nowPlayerTerm[nowPlayerNumber].handCard.push(tempCard);
									wangpengxu.skillTempList.removeObject(tempCard);
									wangpengxu.maxCombat--;
									textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"获得妨碍者一件饰品", myText, listView);
								} else {
									textAreaAddMessage("无牌可抽，水魔兽胜利结算无效", myText, listView);
								}
								if(callBack!=null){
									callBack();
								}
							}
						}
					}else if(callBack!=null){
						callBack();
					}
				}else if(callBack!=null){
					textAreaAddMessage("无妨碍者", myText, listView,callBack);
				}
			});
		});
	},
	loseEffect:function(callBack){
		this._super();
		var tempHeartList=[];
		var tempHeartNumber=[];
		if(!skillCharacters_XuanxiaoNingbingfenyan(nowPlayerTerm[nowPlayerNumber])){
			tempHeartList.push(nowPlayerTerm[nowPlayerNumber]);
			tempHeartNumber.push(2);
			mainScene.addChild(new MagicLayer(nowPlayerTerm[nowPlayerNumber].hadImageView,new MagicNodeShui()));
		}
		useYingu(tempHeartList, tempHeartList[0], tempHeartList[0], tempHeartNumber, true, baseEffectReduceHPEffect,function(){
			// 唐雪见【追打】技能
			skillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				if (nowPlayerTerm[nowPlayerNumber].hp > 0) {
					if (fight_Monster.length == 0) {
						textAreaAddMessage("无妨碍者，水魔兽失败结算结束", myText, listView,callBack);
					} else if (fight_Monster[0]._name==nameJinchanguimu) {
						textAreaAddMessage("水魔兽失败结算对金蟾鬼母无效", myText, listView,callBack);
					} else if (nowPlayerTerm[nowPlayerNumber].handCard.length == 0
							&&baseEffectCountequment(nowPlayerTerm[nowPlayerNumber])== 0) {
						textAreaAddMessage("触发者无手牌、装备，水魔兽失败结算结束", myText, listView,callBack);
					} else if (fight_Monster[0]._name==player1._name) {
						addDialog(mainScene, new selectCardTypeDialogLayer("请选择抽取的装备",nowPlayerTerm[nowPlayerNumber],function(result){
							if(result==SelectCardType.ARMS1){
								player1GetPlayer2Equment(fight_Monster[0], nowPlayerTerm[nowPlayerNumber].arms1);
								nowPlayerTerm[nowPlayerNumber].arms1Combat = 0;
								nowPlayerTerm[nowPlayerNumber].arms1Extent = 0;
								nowPlayerTerm[nowPlayerNumber].arms1="无";
								nowPlayerTerm[nowPlayerNumber].tempZhuangbeiSkillCombat=0;
								nowPlayerTerm[nowPlayerNumber].tempZhuangbeiSkillExtent=0;
								if(callBack!=null){
									callBack();
								}
							}else if(result==SelectCardType.ARMS2){
								player1GetPlayer2Equment(fight_Monster[0], nowPlayerTerm[nowPlayerNumber].arms2);
								nowPlayerTerm[nowPlayerNumber].arms2Combat = 0;
								nowPlayerTerm[nowPlayerNumber].arms2Extent = 0;
								nowPlayerTerm[nowPlayerNumber].arms2="无";
								if(callBack!=null){
									callBack();
								}
							}else if(result==SelectCardType.DEFENSE){
								player1GetPlayer2Equment(fight_Monster[0], nowPlayerTerm[nowPlayerNumber].defense);
								nowPlayerTerm[nowPlayerNumber].defenseCombat = 0;
								nowPlayerTerm[nowPlayerNumber].defenseExtent = 0;
								nowPlayerTerm[nowPlayerNumber].defense="无";
								if(callBack!=null){
									callBack();
								}
							}else if(result==SelectCardType.HANDCARD){
								var tempNumber=parseInt(Math.random()*nowPlayerTerm[nowPlayerNumber].handCard.length,10);
								var tempCard=nowPlayerTerm[nowPlayerNumber].handCard[tempNumber];
								fight_Monster[0].handCard.push(tempCard);
								handCardZone.pushBackCustomItem(tempCard);
								nowPlayerTerm[nowPlayerNumber].handCard.removeObject(tempCard);
								if(callBack!=null){
									callBack();
								}
							}else if(result==SelectCardType.ORNAMENT){
								addDialog(mainScene, new selectCardDialogLayer("请选择抽取的饰品",nowPlayerTerm[nowPlayerNumber].skillTempList,1,1,false,function(result){
									var card=result.pop();
									nowPlayerTerm[nowPlayerNumber].skillTempList.removeObject(card);
									nowPlayerTerm[nowPlayerNumber].maxCombat--;
									fight_Monster[0].handCard.push(card);
									handCardZone.pushBackCustomItem(card);
									if(callBack!=null){
										callBack();
									}
								}));
							}
						}));
					} else {
						// AI处理水魔兽失败结算（当妨碍者是AI时的情况）
						if (nowPlayerTerm[nowPlayerNumber].arms1!="无") {
							player1GetPlayer2Equment(fight_Monster[0], nowPlayerTerm[nowPlayerNumber].arms1);
							nowPlayerTerm[nowPlayerNumber].arms1Combat = 0;
							nowPlayerTerm[nowPlayerNumber].arms1Extent = 0;
							nowPlayerTerm[nowPlayerNumber].arms1 = "无";
							nowPlayerTerm[nowPlayerNumber].tempZhuangbeiSkillCombat=0;
							nowPlayerTerm[nowPlayerNumber].tempZhuangbeiSkillExtent=0;
							if(callBack!=null){
								callBack();
							}
						} else if (nowPlayerTerm[nowPlayerNumber].defense!="无") {
							player1GetPlayer2Equment(fight_Monster[0], nowPlayerTerm[nowPlayerNumber].defense);
							nowPlayerTerm[nowPlayerNumber].defenseCombat = 0;
							nowPlayerTerm[nowPlayerNumber].defenseExtent = 0;
							nowPlayerTerm[nowPlayerNumber].defense = "无";
							if(callBack!=null){
								callBack();
							}
						} else if (nowPlayerTerm[nowPlayerNumber].handCard.length > 0) {
							var tempNum = parseInt(Math.random()*nowPlayerTerm[nowPlayerNumber].handCard.length, 10);
							var tempCard=nowPlayerTerm[nowPlayerNumber].handCard[tempNum];
							fight_Monster[0].handCard.push(tempCard);
							textAreaAddMessage(fight_Monster[0]._name+"获得"+nowPlayerTerm[nowPlayerNumber]._name+"一张手牌", myText, listView);
							if (nowPlayerTerm[nowPlayerNumber]._name==player1._name) {
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
							textAreaAddMessage(fight_Monster[0]._name+"获得王蓬絮一张饰品", myText, listView,callBack);
						} else {
							textAreaAddMessage("无牌可抽，水魔兽失败结算无效", myText, listView,callBack);
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