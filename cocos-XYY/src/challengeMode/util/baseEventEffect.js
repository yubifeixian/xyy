//误闯神魔之隙
function baseEventEffect_Wuchuangshenmozhixi(callBack){
	addDialog(mainScene, new eventLayer(resPng.EventWuchuangshenmozhixi,function(){
		textAreaAddMessage("翻取事件牌【误闯神魔之隙】", myText, listView,function(){
			textAreaAddMessage("在场手牌最多的一名玩家角色横置，若牌最多的玩家不止一人，本事件无效", myText, listView,function(){
				useAnyTimeSkill(function(){
					var MAXCardNumber = 0, playernumber = 0;
					var selectPlayer = null;
					for (var i=0;i<nowPlayerTerm.length;i++) {
						if (nowPlayerTerm[i].handCard.length > MAXCardNumber)
							MAXCardNumber = nowPlayerTerm[i].handCard.length;
					}
					for (var i=0;i<nowPlayerTerm.length;i++) {
						if (nowPlayerTerm[i].handCard.length == MAXCardNumber) {
							selectPlayer = nowPlayerTerm[i];
							playernumber++;
						}
					}
					if (playernumber > 1) {
						textAreaAddMessage("由于多名玩家手牌最多，本事件无效", myText, listView);
						callBack();
					} else if (playernumber == 1) {
						if (!selectPlayer.takeOver) {
							selectPlayer.takeOver = true;
							textAreaAddMessage(selectPlayer._name+"角色牌被横置", myText, listView);
							callBack();
						} else {
							textAreaAddMessage(selectPlayer._name+"已经被被横置，此次横置无效", myText, listView);
							callBack();
						}
					}
				});
			});
		});
	}));
}


// 大军围蜀山
function baseEventEffect_Dajunweishushan(callBack){
	addDialog(mainScene, new eventLayer(resPng.EventDajunweishushan,function(){
		textAreaAddMessage("翻取事件牌【大军围蜀山】", myText, listView,function(){
			textAreaAddMessage("在场战力最高的角色各丢弃2张手牌，战力最低的角色各补2张牌", myText, listView,function(){
				useAnyTimeSkill(function(){
					var maxCombat = 0, minCombat = nowPlayerTerm[nowPlayerNumber].combat;
					for (var i=0;i<nowPlayerTerm.length;i++) {
						if (nowPlayerTerm[i].hp > 0) {
							if (nowPlayerTerm[i].combat > maxCombat){
								maxCombat = nowPlayerTerm[i].combat;
							}
							if(minCombat>nowPlayerTerm[i].combat){
								minCombat = nowPlayerTerm[i].combat;
							}
						}
					}
					if(maxCombat>minCombat){
						for (var i=0;i<nowPlayerTerm.length;i++) {
							if (nowPlayerTerm[i].hp > 0) {
								if (nowPlayerTerm[i].combat == maxCombat) {
									if (nowPlayerTerm[i].handCard.length <= 2) {
										if (nowPlayerTerm[i].handCard.length == 0) {
											textAreaAddMessage(nowPlayerTerm[i]._name+"无手牌，无需弃置", myText, listView);
										} else {
											for (var t=0;t<nowPlayerTerm[i].handCard.length;t++){
												remove_Card_Into_DropDeck(nowPlayerTerm[i].handCard[t].name);
											}
											nowPlayerTerm[i].handCard=new Array();
											if (nowPlayerTerm[i]._name==player1._name){
												handCardZone.removeAllItems();
											}
											textAreaAddMessage(nowPlayerTerm[i]._name+"弃掉了全部手牌", myText, listView);
										}
									} else {
										if (nowPlayerTerm[i]._name==player1._name) {
											var tempPlayer=nowPlayerTerm[i];
											addDialog(mainScene, new selectCardDialogLayer("请选择要丢弃的牌",nowPlayerTerm[i].handCard,2,2,false,function(result){
												for(var t=0;t<result.length;t++){
													remove_Card_Into_DropDeck(result[t].name);
													tempPlayer.handCard.removeObject(result[t]);
													result[t].removeFromParent();
													textAreaAddMessage(tempPlayer._name+"弃掉了"+result[t].name, myText, listView);
												}
											}));
										} else {
											for (var x = 0; x < 2; x++) {
												var tempCard=nowPlayerTerm[i].handCard[parseInt(Math.random()*nowPlayerTerm[i].handCard.length, 10)];
												textAreaAddMessage(nowPlayerTerm[i]._name+"弃掉了"+tempCard.name, myText, listView);
												remove_Card_Into_DropDeck(tempCard.name);
												nowPlayerTerm[i].handCard.removeObject(tempCard);
											}
										}
									}
								}
							}
						}
						var addCardPlayerList=new Array();
						var addCardNumberList=new Array();
						for (var i=0;i<nowPlayerTerm.length;i++) {
							if (nowPlayerTerm[i].hp > 0) {
								if (nowPlayerTerm[i].combat == minCombat) {
									addCardPlayerList.push(nowPlayerTerm[i]);
									addCardNumberList.push(2);
									textAreaAddMessage(nowPlayerTerm[i]._name+"补牌2张牌", myText, listView);
								}
							}
						}
						addHandCard(addCardPlayerList,addCardPlayerList[0],addCardPlayerList[0],null,addCardNumberList,true,true,callBack);
					}else{
						callBack();
					}
				});
			});
		});
	}));
}

// 深入将军冢
function baseEventEffect_Shenrujiangjunzhong(callBack){
	var addCardPlayerList=new Array();
	var addCardNumberList=new Array();
	addDialog(mainScene, new eventLayer(resPng.EventShenrujiangjunzhong,function(){
		textAreaAddMessage("翻取事件牌【深入将军冢】", myText, listView,function(){
			textAreaAddMessage("在场没有宠物的角色各补1张牌", myText, listView,function(){
				useAnyTimeSkill(function(){
					for (var i=0;i<nowPlayerTerm.length;i++) {
						if (nowPlayerTerm[i].hp > 0) {
							if(baseEffectCountPets(nowPlayerTerm[i])==0){
								addCardPlayerList.push(nowPlayerTerm[i]);
								addCardNumberList.push(1);
								textAreaAddMessage(nowPlayerTerm[i]._name+"补了1张牌", myText, listView);
							}
						}
					}
					addHandCard(addCardPlayerList,addCardPlayerList[0],addCardPlayerList[0],null,addCardNumberList,true,true,callBack);
					// callBack();
				});
			});
		});
	}));
}

// 寻找天使绘卷
function baseEventEffect_Xunzhaotianshihuijuan(callBack){
	var addCardPlayerList=new Array();
	var addCardNumberList=new Array();
	addDialog(mainScene, new eventLayer(resPng.EventXunzhaotianshihuijuan,function(){
		textAreaAddMessage("翻取事件牌【寻找天使绘卷】", myText, listView,function(){
			textAreaAddMessage("当前HP小于等于3的玩家，每人补1张牌", myText, listView,function(){
				useAnyTimeSkill(function(){
					var effected = false;
					for (var i=0;i<nowPlayerTerm.length;i++) {
						if (nowPlayerTerm[i].hp > 0 && nowPlayerTerm[i].hp <= 3) {
							textAreaAddMessage(nowPlayerTerm[i]._name+"补了1张牌", myText, listView);
							addCardPlayerList.push(nowPlayerTerm[i]);
							addCardNumberList.push(1);
							effected=true;
						}
					}
					if (!effected) {
						textAreaAddMessage("无角色HP小于等于3，本事件无效", myText, listView,callBack);
					}else{
						addHandCard(addCardPlayerList,addCardPlayerList[0],addCardPlayerList[0],null,addCardNumberList,true,true,callBack);
					}
				});
			});
		});
	}));
}

// 闯荡试练窟
function baseEventEffect_Chuangdangshilianku(callBack){
	addDialog(mainScene, new eventLayer(resPng.EventChuangdangshilianku,function(){
		textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"翻取事件牌【闯荡试练窟】", myText, listView,function(){
			textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"您从手牌堆上方翻开4张牌，从对方开始，双方轮流挑选1张。（可以分配给任何人）", myText, listView,function(){
				useAnyTimeSkill(function(){
					var tempList = new Array();
					var tempNumber = nowPlayerNumber;
					for (var i = 0; i < 4; i++) {
						tempList.push(randomGetHandCard(randHandCardNumber(
								game_HandCard_Start,
								game_DropHandCard)));
					}
					tempNumber++;
					tempNumber%=nowPlayerTerm.length;
					var tempPlayer=nowPlayerTerm[tempNumber];
					askChuangdangshilianku(tempPlayer, tempPlayer, tempList,callBack);
				});
			});
			
		});
	}));
}

// 仙灵岛的邂逅
function baseEventEffect_Xianlingdaodexianhou(callBack){
	addDialog(mainScene, new eventLayer(resPng.EventXianlingdaodexiehou,function(){
		textAreaAddMessage("翻取事件牌【仙灵岛的邂逅】", myText, listView,function(){
			if (nowPlayerTerm[nowPlayerNumber].sex == 0) {
				textAreaAddMessage("您是男性角色，补1张牌后扣1点HP", myText, listView,function(){
					useAnyTimeSkill(function(){
						textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"补了1张牌", myText, listView,function(){
							addHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],null,[1],true,true,function(){
								useYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [1], true, baseEffectReduceHPEffect, function(){
									// 唐雪见【追打】效果
									skillCharactersTangxuejianZhuida(function(){
										heartList=new Array();
										callBack();
									});
								});
							});
						});
					});
				});
			} else if (nowPlayerTerm[nowPlayerNumber].sex == 1) {
				textAreaAddMessage("您是女性角色，弃掉防具后指定一名男性角色视为对其使用一张【天雷破】", myText, listView, function(){
					useAnyTimeSkill(function(){
						var manPlayers = new Array();
						// 弃掉防具，选择男性角色，对其使用了天雷破
						if (nowPlayerTerm[nowPlayerNumber].defense!="无") {
							remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].defense);
							textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"弃掉防具:"+nowPlayerTerm[nowPlayerNumber].defense, myText, listView);
							nowPlayerTerm[nowPlayerNumber].defense = "无";
							nowPlayerTerm[nowPlayerNumber].defenseCombat = 0;
							nowPlayerTerm[nowPlayerNumber].defenseExtent = 0;
						} else {
							textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"无防具，不需弃置", myText, listView,function(){
							});
						}
						// 判断场上是否存在男性角色
						var hasMan = false;
						var manList=new Array();
						for (var i = 0; i < nowPlayerTerm.length; i++) {
							if (nowPlayerTerm[i].hp > 0
									&& nowPlayerTerm[i].sex == 0) {
								hasMan = true;
								manList.push(nowPlayerTerm[i]);
							}
						}
						if (!hasMan) {
							textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"场上无男性角色", myText, listView,callBack);
						}else{
							if(nowPlayerTerm[nowPlayerNumber]._name==player1._name){
								var player2Shown=player2.sex==0?true:false;
								var player3Shown=player3.sex==0?true:false;
								var player4Shown=player4.sex==0?true:false;
								addDialog(mainScene, new selectPlayerDialogLayer(false,player2Shown, player3Shown, player4Shown,
										"请选择角色", true, false,function(result){
									if(result){
										if(result.defense!=string_handCardNameQiankundaopao){
											useBingxingjue(nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], function(){
												if(!game_Bingxingjue){
													mainScene.addChild(new MagicLayer(result.hadImageView,new MagicNodeLei(),function(){
														useYingu([result], result, result, [2], true, baseEffectReduceHPEffect,function(){
															// 唐雪见【追打】效果
															skillCharactersTangxuejianZhuida(function(){
																heartList=new Array();
																callBack();
															});
														});
													}));
												}else{
													game_Bingxingjue=false;
													textAreaAddMessage("【天雷破】效果无效", myText, listView,callBack);
												}
											});
										}else{
											textAreaAddMessage(result._name+"【乾坤道袍】效果，免疫技牌造成的伤害", myText, listView);
											callBack();
										}
									}else{
										textAreaAddMessage("放弃使用【天雷破】", myText, listView);
										callBack();
									}
								}));
							}else{
								// AI决定是否对男性角色使用【天雷破】
								var selectPlayer=null
								for (var i=0;i<manList.length;i++) {
									if (manList[i].hp > 0
											&& !player1IsPlayer2Friend(manList[i],nowPlayerTerm[nowPlayerNumber])) {
										selectPlayer = manList[i];
										break;
									}
								}
								if(selectPlayer!=null){
									if(selectPlayer.defense!=string_handCardNameQiankundaopao){
										useBingxingjue(nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], function(){
											if(!game_Bingxingjue){
												mainScene.addChild(new MagicLayer(selectPlayer.hadImageView,new MagicNodeLei(),function(){
													useYingu([selectPlayer], selectPlayer, selectPlayer, [2], true, baseEffectReduceHPEffect,function(){
														// 唐雪见【追打】效果
														skillCharactersTangxuejianZhuida(function(){
															heartList=new Array();
															callBack();
														});
													});
												}));
											}else{
												game_Bingxingjue=false;
												textAreaAddMessage("【天雷破】效果无效", myText, listView,callBack);
											}
										});
									}else{
										textAreaAddMessage(selectPlayer._name+"由于【乾坤道袍】效果，免疫技牌导致的伤害", myText, listView,callBack);
									}
								}else{
									textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"放弃使用【天雷破】", myText, listView,callBack);
								}
							}
						}
					});
				});
			}
		});
	}));
}

// 走出圣姑小屋
function baseEventEffect_Zouchushengguxiaowu(callBack){
	var addCardPlayerList=new Array();
	var addCardNumberList=new Array();
	addDialog(mainScene, new eventLayer(resPng.EventZouchushengguxiaowu,function(){
		textAreaAddMessage("翻取事件牌【走出圣姑小屋】", myText, listView,function(){
			textAreaAddMessage("由您指定我方一人和敌方一人各补2张牌", myText, listView,function(){
				useAnyTimeSkill(function(){
					var selectPlayerlist = new Array();
					if (nowPlayerTerm[nowPlayerNumber]._name==player1._name) {
						addDialog(mainScene, new selectPlayerDialogLayer(true,true, false, false,
								"请选择我方一人", false, false,function(player1){
							selectPlayerlist.push(player1);
							addDialog(mainScene, new selectPlayerDialogLayer(false,false, true, true,
									"请选择敌方一人", false, false,function(player2){
								selectPlayerlist.push(player2);
								for(var i=0;i<selectPlayerlist.length;i++){
									addCardPlayerList.push(selectPlayerlist[i]);
									addCardNumberList.push(2);
									/*
									 * newHandCard(randHandCardNumber(
									 * game_HandCard_Start, game_DropHandCard),
									 * selectPlayerlist[i], 2, true);
									 */
									textAreaAddMessage(selectPlayerlist[i]._name+"补了2张牌", myText, listView);
								}
								addHandCard(addCardPlayerList,addCardPlayerList[0],addCardPlayerList[0],null,addCardNumberList,true,true,callBack);
								// callBack();
							}));
						}));
					} else {
						// AI处理
						selectPlayerlist.push(nowPlayerTerm[nowPlayerNumber]);
						if (nowPlayerTerm[nowPlayerNumber - 1].hp > 0) {
							selectPlayerlist.push(nowPlayerTerm[nowPlayerNumber - 1]);
						} else {
							if (nowPlayerNumber + 1 <= 3) {
								selectPlayerlist.push(nowPlayerTerm[nowPlayerNumber + 1]);
							} else {
								selectPlayerlist.push(nowPlayerTerm[0]);
							}
						}
						for (var i=0;i< selectPlayerlist.length;i++) {
							addCardPlayerList.push(selectPlayerlist[i]);
							addCardNumberList.push(2);
							textAreaAddMessage(selectPlayerlist[i]._name+"补了2张牌", myText, listView);
						}
						addHandCard(addCardPlayerList,addCardPlayerList[0],addCardPlayerList[0],null,addCardNumberList,true,true,callBack);
					}
				});
			});

		});
	}));
}


// 绝世美味的诞生
function baseEventEffect_Jueshimeiweidedansheng(callBack){
	addDialog(mainScene, new eventLayer(resPng.EventJueshimeiweidedansheng,function(){
		textAreaAddMessage("翻取事件牌【绝世美味的诞生】", myText, listView,function(){
			useAnyTimeSkill(function(){
				var selectPlayer = nowPlayerTerm[nowPlayerNumber];
				// Judge.useAnytimeSkill(context);
				var count = 0;
				if (nowPlayerTerm[nowPlayerNumber]._name==player1._name) {
					count =baseEffectCountPets(player3)+baseEffectCountPets(player4);
					if(count>0){
						addDialog(mainScene, new selectPlayerDialogLayer(true,true, false, false,
								"请选择一名角色恢复HP", false, false,function(result){
							for (var x = 0; x < count; x++){
								baseEffectAddHP(result);
							}
							textAreaAddMessage(result._name+"HP恢复"+count+"点", myText, listView);
							has_Tianshezhang(result);
							callBack();
						}));
					}else{
						textAreaAddMessage("敌方无宠物，HP恢复量为0", myText, listView);
						callBack();
					}
				}else{
					if (nowPlayerTerm[nowPlayerNumber]._name==player2._name) {
						// 我方队友选择
						count =baseEffectCountPets(player3)+baseEffectCountPets(player4);
						if (player1.hp > 0&&player1.hp<player2.hp) {
							// var number=parseInt(Math.random()*2, 10)+1;
							selectPlayer = player1;
						}
					} else{
						count =baseEffectCountPets(player1)+baseEffectCountPets(player2);
						// 敌方AI选择
						var number=1;
						if (player3.hp == 0||(player4.hp>0&&player4.hp<player3.hp)) {
							number = 2;
						}
						selectPlayer=number==1?player3:player4;
					}
					if(count==0){
						textAreaAddMessage("敌方无宠物，HP恢复量为0", myText, listView);
						callBack();
					}else{
						for(var x = 0; x < count; x++){
							baseEffectAddHP(selectPlayer);
						}
						textAreaAddMessage(selectPlayer._name+"HP恢复"+count+"点", myText, listView);
						has_Tianshezhang(selectPlayer);
						callBack();
					}
				}
			});
		});
	}));
}


// 神树与夕瑶
function baseEventEffect_Shenshuyuxiyao(callBack){
	addDialog(mainScene, new eventLayer(resPng.EventShenshuyuxiyao,function(){
		textAreaAddMessage("翻取事件牌【神树与夕瑶】", myText, listView,function(){
			textAreaAddMessage("当前HP最少的角色，各恢复2HP", myText, listView,function(){
				useAnyTimeSkill(function(){
					var test = 0;
					for (var i=0;i<nowPlayerTerm.length;i++) {
						if (nowPlayerTerm[i].hp > 0 && nowPlayerTerm[i].hp == nowPlayerTerm[i].maxHP)
							test++;
					}
					if (test == 4) {
						textAreaAddMessage("无角色受伤，本事件无效", myText, listView);
						callBack();
						return;
					}
					var minHp = player1.hp;
					for(var i=0;i<nowPlayerTerm.length;i++){
						if(nowPlayerTerm[i].hp>0){
							minHp=nowPlayerTerm[i].hp;
							break;
						}
					}
					for (var i=0;i<nowPlayerTerm.length;i++) {
						if (nowPlayerTerm[i].hp > 0 && nowPlayerTerm[i].hp < minHp){
							minHp = nowPlayerTerm[i].hp;
						}
					}
					for (var i=0;i<nowPlayerTerm.length;i++) {
						if (nowPlayerTerm[i].hp > 0) {
							if (nowPlayerTerm[i].hp == minHp) {
								for (var x = 0; x < 2; x++){
									baseEffectAddHP(nowPlayerTerm[i]);
								}
								textAreaAddMessage(nowPlayerTerm[i]._name+"恢复2点HP", myText, listView);
								has_Tianshezhang(nowPlayerTerm[i]);
							}
						}
					}
					callBack();
				});
			});
		});
	}));
}

// 拜访石沉溪洞
function baseEventEffect_Baifangshichenxidong(callBack){
	addDialog(mainScene, new eventLayer(resPng.EventBaifangshichenxidong,function(){
		textAreaAddMessage("翻取事件牌【拜访石沉溪洞】", myText, listView,function(){
			textAreaAddMessage("您放弃所有手牌，补2张牌", myText, listView,function(){
				useAnyTimeSkill(function(){
					for (var i=0;i<nowPlayerTerm[nowPlayerNumber].handCard.length;i++) {
						if (nowPlayerTerm[nowPlayerNumber]._name==player1._name) {
							nowPlayerTerm[nowPlayerNumber].handCard[i].removeFromParent();
						}
						remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].handCard[i].name);
					}
					nowPlayerTerm[nowPlayerNumber].handCard=new Array();
					addHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],null,[2],true,true,callBack);
				});
			});
		});
	}));
}


// 三世轮回
function baseEventEffect_Sanshilunhui(callBack){
	addDialog(mainScene, new eventLayer(resPng.EventSanshilunhui,function(){
		textAreaAddMessage("翻取事件牌【三世轮回】", myText, listView,function(){
			textAreaAddMessage("所有玩家手牌调整为3张，少则补，多则弃", myText, listView,function(){
				useAnyTimeSkill(function(){
					sanshilunhuiHandle(nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber],callBack);
				});
			});
		});
	}));
}


// 束缚幻暝界
function baseEventEffect_Shufuhuanmingjie(callBack){
	addDialog(mainScene, new eventLayer(resPng.EventShufuhuanmingjie,function(){
		textAreaAddMessage("翻取事件牌【束缚幻暝界】", myText, listView,function(){
			textAreaAddMessage("场上所有角色扣除自己宠物数量的HP", myText, listView,function(){
				useAnyTimeSkill(function(){
					var tempHeartList=new Array();
					var tempHeartNumberList=new Array();
					for(var i=0;i<nowPlayerTerm.length;i++){
						var petsNumber=baseEffectCountPets(nowPlayerTerm[i]);
						if(nowPlayerTerm[i].hp>0&&petsNumber>0){
							tempHeartList.push(nowPlayerTerm[i]);
							tempHeartNumberList.push(petsNumber);
						}
					}
					if(tempHeartList.length>0){
						useYingu(tempHeartList,tempHeartList[0],tempHeartList[0],tempHeartNumberList,true,baseEffectReduceHPEffect,function(){
							// 唐雪见【追打】效果
							skillCharactersTangxuejianZhuida(function(){
								heartList=new Array();
								callBack();
							})
						});
					}else{
						callBack();
					}
				});
			});
		});
	}));
}

// 封印锁妖塔
function baseEventEffect_Fengyinsuoyaota(callBack){
	addDialog(mainScene, new eventLayer(resPng.EventFengyinsuoyaota,function(){
		textAreaAddMessage("翻取事件牌【封印锁妖塔】", myText, listView,function(){
			textAreaAddMessage("您弃掉等于您的宠物数量的手牌，然后补1张牌", myText, listView,function(){
				useAnyTimeSkill(function(){
					var number=baseEffectCountPets(nowPlayerTerm[nowPlayerNumber]);
					if (number != 0
							&& nowPlayerTerm[nowPlayerNumber].handCard.length<=number) {
						textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"弃置了全部手牌", myText, listView);
						if (nowPlayerTerm[nowPlayerNumber]._name==player1._name) {
							handCardZone.removeAllItems();
						}
						for (var i=0;i<nowPlayerTerm[nowPlayerNumber].handCard.length;i++) {
							remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].handCard[i].name);
						}
						nowPlayerTerm[nowPlayerNumber].handCard=new Array();
						textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"补了1张牌", myText, listView);
						addHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber]
						,null,[1],true,true,callBack);
					} else if (number != 0
							&& nowPlayerTerm[nowPlayerNumber]._name==player1._name) {
						addDialog(mainScene, new selectCardDialogLayer("请选择要丢弃的牌",nowPlayerTerm[nowPlayerNumber].handCard,number,number,false,function(result){
							for(var i=0;i<result.length;i++){
								remove_Card_Into_DropDeck(result[i].name);
								nowPlayerTerm[nowPlayerNumber].handCard.removeObject(result[i]);
								result[i].removeFromParent();
							}
							addHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],null,[1],true,true,callBack);
						}));
					} else if (number != 0
							&& nowPlayerTerm[nowPlayerNumber]._name!=player1._name) {
						// AI处理封印锁妖塔丢牌效果
						for (var i = 0; i < number; i++) {
							var dropNum=parseInt(Math.random()*nowPlayerTerm[nowPlayerNumber].handCard.length, 10);
							remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].handCard[dropNum].name);
							textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"丢弃了【"+nowPlayerTerm[nowPlayerNumber].handCard[dropNum].name+"】", myText, listView);
							nowPlayerTerm[nowPlayerNumber].handCard.removeObject(nowPlayerTerm[nowPlayerNumber].handCard[dropNum]);
						}
						textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"补了1张牌", myText, listView);
						addHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],null,[1],true,true,callBack);
					}else{
						textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"补了1张牌", myText, listView);
						addHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],null,[1],true,true,callBack);
					}
				});
			});

		});
	}));
}


// 破除禁咒空间
function baseEventEffect_Pochujinzhoukongjian(callBack){
	var addCardPlayerList=new Array();
	var addCardNumberList=new Array();
	addDialog(mainScene, new eventLayer(resPng.EventPochujinzhoukongjian,function(){
		textAreaAddMessage("翻取事件牌【破除禁咒空间】", myText, listView,function(){
			useAnyTimeSkill(function(){
				var effect = false;
				for(var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++){
					if(nowPlayerTerm[nowPlayerNumber].friendList[i].hp>=2){
						effect=true;
						break;
					}
				}
				if (effect) {
					var selectPlayer = nowPlayerTerm[nowPlayerNumber];
					if (nowPlayerTerm[nowPlayerNumber]._name==player1._name) {
						var player1Name=player1.hp>=2?true:false;
						var player2Name = player2.hp>=2?true:false;
						addDialog(mainScene,new selectPlayerDialogLayer(player1Name,player2Name, false, false,
								"请选择我方一名角色令其HP扣为1", false, false,function(result){
							selectPlayer=result;
							useYingu([selectPlayer],selectPlayer,selectPlayer,[1],false,reduceHPTo,function(){
								// 唐雪见【追打】效果
								skillCharactersTangxuejianZhuida(function(){
									heartList=new Array();
									for(var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++){
										if(nowPlayerTerm[nowPlayerNumber].friendList[i].hp>0){
											addCardPlayerList.push(nowPlayerTerm[nowPlayerNumber].friendList[i]);
											addCardNumberList.push(1);
											textAreaAddMessage(nowPlayerTerm[nowPlayerNumber].friendList[i]._name+"补了1张牌",myText,listView);
										}
									}
									addHandCard(addCardPlayerList,addCardPlayerList[0],addCardPlayerList[0],null,addCardNumberList,true,true,callBack);
									// callBack();
								});
							});
						}));
					}else{
						if (nowPlayerTerm[nowPlayerNumber]._name==player2._name) {
							// 队友AI处理破除禁咒空间的效果
							var number=player2.hp<2?1:2;
							selectPlayer=number==1?player1:player2;
						} else{
							// 敌方AI处理禁咒空间的效果
							var number = player3.hp<2?2:1;
							selectPlayer=number==1?player3:player4;
						}
						useYingu([selectPlayer],selectPlayer,selectPlayer,[1],false,reduceHPTo,function(){
							// 唐雪见【追打】效果
							skillCharactersTangxuejianZhuida(function(){
								heartList=new Array();
								for(var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++){
									if(nowPlayerTerm[nowPlayerNumber].friendList[i].hp<=0){
										continue;
									}
									addCardPlayerList.push(nowPlayerTerm[nowPlayerNumber].friendList[i]);
									addCardNumberList.push(1);
									textAreaAddMessage(nowPlayerTerm[nowPlayerNumber].friendList[i]._name+"补了1张牌",myText,listView);
								}
								addHandCard(addCardPlayerList,addCardPlayerList[0],addCardPlayerList[0],null,addCardNumberList,true,true,callBack);
								// callBack();
							});
						});
					}
				}else {
					textAreaAddMessage("本事件无效",myText,listView);
					callBack();
				}
			});
		});
	}));
}

