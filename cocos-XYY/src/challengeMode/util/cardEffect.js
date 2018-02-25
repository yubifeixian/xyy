//callBack为询问完洞冥宝镜之后要执行的操作，一般可能为
//	1、首次询问是否打怪
//	2、NPC效果中选择“翻取下一张”前询问洞明
function useDongmingbaojing(usePlayer,callBack){
	var haveDongmingbaojing=false;
	var cardDongmingbaojing=null;
	var tempPlayer=nowPlayerTerm[nowPlayerNumber];
	var number=nowPlayerNumber;
	var askBingxingjuePlayer=null;
	if(game_MonsterDeck.length>0){
		if(usePlayer!=null){
			tempPlayer=usePlayer;
		}
		for(var i=0;i<nowPlayerTerm.length;i++){
			if(nowPlayerTerm[i]._name==tempPlayer._name){
				number=i;
				break;
			}
		}
		number++;
		number%=nowPlayerTerm.length;
		askBingxingjuePlayer=nowPlayerTerm[number];
		if(tempPlayer.hp>0&&tempPlayer.handCard.length>0){
			skillCharacters_JingtianYongandangAsk(function(result){
				if(result){
					mainScene.addChild(new AttackTargetLayer(tempPlayer.hadImageView,cardAnimationLabel,function(){
						textAreaAddMessage(tempPlayer._name+"打出了【洞冥宝镜】", myText, listView,function(){
							playCardAnimation("res/drawable-hdpi/dongmingbaojing.png", function(){
								useBingxingjue(tempPlayer,askBingxingjuePlayer,function(){
									dongmingbaojingEffect(tempPlayer,null,callBack);
								});
							});
						});
					}));
				}else{
					for(var i=0;i<tempPlayer.handCard.length;i++){
						if(tempPlayer.handCard[i].name==string_handCardNameDongmingbaojing){
							haveDongmingbaojing=true;
							cardDongmingbaojing=tempPlayer.handCard[i];
							if(tempPlayer._name==player1._name){
								addDialog(mainScene, new ChooseZoneLayer("是否使用洞冥宝镜？",function(result){
									if(result){
										AchivementProgress.addAchivementProgress(initCardAchivement.achivementDongmingbaojing);
										mainScene.addChild(new AttackTargetLayer(tempPlayer.hadImageView,cardAnimationLabel,function(){
											textAreaAddMessage(player1._name+"打出了【洞冥宝镜】", myText, listView,function(){
												remove_Card_Into_DropDeck(cardDongmingbaojing.name);
												player1.handCard.removeObject(cardDongmingbaojing);
												cardDongmingbaojing.removeFromParent();
												cardDongmingbaojing.release();
												playCardAnimation("res/drawable-hdpi/dongmingbaojing.png", function(){
													useBingxingjue(tempPlayer,askBingxingjuePlayer,function(){
														dongmingbaojingEffect(tempPlayer,null,callBack);
													});
												});
											});
										}));
									}else{
										// game_Bingxingjue=1;//表示有洞冥宝镜但是不想用
										dongmingbaojingEffect(tempPlayer,2,callBack);
									}
								}));
								break;
							}else{
								// AI判断是否使用洞冥宝镜
								var aiUseDongmingbaojingResult=true;
								if(aiUseDongmingbaojingResult){
									mainScene.addChild(new AttackTargetLayer(tempPlayer.hadImageView,cardAnimationLabel,function(){
										textAreaAddMessage(tempPlayer._name+"打出了【洞冥宝镜】", myText, listView)
										mainScene.runAction(cc.Sequence.create( cc.DelayTime.create(1), cc.CallFunc.create(function () {
											// 执行下一个代码
											if(aiUseDongmingbaojingResult){
												// 移除手牌
												remove_Card_Into_DropDeck(cardDongmingbaojing.name);
												tempPlayer.handCard.removeObject(cardDongmingbaojing);
												cardDongmingbaojing.release();
												// 询问冰心,根据结果处理洞明的效果
												playCardAnimation("res/drawable-hdpi/dongmingbaojing.png", function(){
													useBingxingjue(tempPlayer,askBingxingjuePlayer,function(aiUseDongmingbaojingResult){
														dongmingbaojingEffect(tempPlayer,null,callBack);
													});
												});
											}
										}))); 
									}));
								}
								break;
							}
						}
					}
					if(haveDongmingbaojing==false){
						dongmingbaojingEffect(tempPlayer,1,callBack);
						// dongmingbaojingEffect(tempPlayer,1,callBack);
					}
				}
			}, string_handCardNameDongmingbaojing, tempPlayer);
		}else{
			if(askBingxingjuePlayer._name!=nowPlayerTerm[nowPlayerNumber]._name){
				useDongmingbaojing(askBingxingjuePlayer,callBack);
			}else{
				callBack();
			}
		}
	}else{
		callBack();
	}

}


// haveNoDongmingbaojing:
// null:有洞冥宝镜且用了
// 1:没有洞明宝镜
// 2、有洞冥宝镜但是不想用

// callBack:询问完毕洞冥宝镜之后需要执行的操作
function dongmingbaojingEffect(usePlayer,haveNotDongmingbaojing,callBack){
	var nextPlayerNumber=0;
	var nextPlayer=null;
	for(var i=0;i<nowPlayerTerm.length;i++){
		if(nowPlayerTerm[i]._name==usePlayer._name){
			nextPlayerNumber=i;
			break;
		}
	}
	nextPlayerNumber++;
	nextPlayerNumber%=nowPlayerTerm.length;
	nextPlayer=nowPlayerTerm[nextPlayerNumber];
	var tempArray=new Array();
	tempArray.push(game_MonsterDeck[0]);
	if(haveNotDongmingbaojing==null&&game_Bingxingjue==false){
		if(usePlayer._name==player1._name){
			addDialog(mainScene, new selectMonsterDialogLayer("洞冥宝镜效果",tempArray,function(result){
				textAreaAddMessage(usePlayer._name+"观看了一张怪物牌"+result.name, myText, listView);
				if(nextPlayer._name==nowPlayerTerm[nowPlayerNumber]._name){
					callBack();
				}else{
					useDongmingbaojing(nextPlayer,callBack);
				}
			}));
		}else{
			textAreaAddMessage(usePlayer._name+"观看了一张怪物牌", myText, listView);
			if(nextPlayer._name==nowPlayerTerm[nowPlayerNumber]._name){
				callBack();
				// roundAttack1();
			}else{
				useDongmingbaojing(nextPlayer,callBack);
			}
		}
	}else if(haveNotDongmingbaojing==null&&game_Bingxingjue){
		var haveDongmingbaojing=false;
		game_Bingxingjue=false;
		for(var i=0;i<nowPlayerTerm[nowPlayerNumber].handCard.length;i++){
			if(nowPlayerTerm[nowPlayerNumber].handCard[i].name==string_handCardNameDongmingbaojing){
				haveDongmingbaojing=true;
				break;
			}
		}
		if(haveDongmingbaojing){
			// useDongmingbaojing(nowPlayerTerm[nowPlayerNumber]);
			useDongmingbaojing(usePlayer,callBack);
		}else{
			useDongmingbaojing(nextPlayer,callBack);
		}
	}else{
		if(nextPlayer._name==nowPlayerTerm[nowPlayerNumber]._name){
			game_Bingxingjue=false;
			callBack();
			// roundAttack1();
		}else{
			useDongmingbaojing(nextPlayer,callBack);
		}
	}
}
/*
 * 询问是否使用冰心诀，传入的callBack为打出的卡牌的效果 startPlayer:冰心结束在此玩家这 nextPlayer:被询问出冰心诀的玩家
 */
function useBingxingjue(startPlayer,nextPlayer,callBack){
	var haveBingxingjue=false;
	var showDialog=false;
	var cardBingxingjue=null;
	if(nextPlayer.hp>0&&nextPlayer.handCard.length>0){
		skillCharacters_JingtianYongandangAsk(function(result){
			if(result){
				mainScene.addChild(new AttackTargetLayer(nextPlayer.hadImageView,cardAnimationLabel,function(){
					playCardAnimation("res/drawable-hdpi/bingxinjue.png", function(){
						bingxingjueHandle(callBack,startPlayer,nextPlayer,result);
					});
				}));
			}else{
				for(var i=0;i<nextPlayer.handCard.length;i++){
					if(nextPlayer.handCard[i].name==string_handCardNameBingxinjue){
						cardBingxingjue=nextPlayer.handCard[i];
						haveBingxingjue=true;
						if(nextPlayer._name==player1._name){
							showDialog=true;
							break;
						}else{
							// AI判断是否使用冰心诀
							var aiUseBingxingjueResult=player1IsPlayer2Friend(startPlayer, nextPlayer)?false:true;
							if(aiUseBingxingjueResult){
								remove_Card_Into_DropDeck(cardBingxingjue.name);
								nextPlayer.handCard.removeObject(cardBingxingjue);
								cardBingxingjue.release();
								mainScene.addChild(new AttackTargetLayer(nextPlayer.hadImageView,cardAnimationLabel,function(){
									playCardAnimation("res/drawable-hdpi/bingxinjue.png", function(){
										bingxingjueHandle(callBack,startPlayer,nextPlayer,aiUseBingxingjueResult);
									});
								}));
							}else{
								bingxingjueHandle(callBack,startPlayer,nextPlayer,aiUseBingxingjueResult);
							}
							return;
						}

					}
				}
				if(showDialog){
					addDialog(mainScene, new ChooseZoneLayer("是否使用冰心诀？",function(result){
						if(result){
							AchivementProgress.addAchivementProgress(initCardAchivement.achivementBingxinjue);
							remove_Card_Into_DropDeck(cardBingxingjue.name);
							player1.handCard.removeObject(cardBingxingjue);
							cardBingxingjue.removeFromParent();
							cardBingxingjue.release();
							mainScene.addChild(new AttackTargetLayer(player1.hadImageView,cardAnimationLabel,function(){
								playCardAnimation("res/drawable-hdpi/bingxinjue.png", function(){
									bingxingjueHandle(callBack,startPlayer,nextPlayer,result);
								});
							}));
						}else{
							skillCharacters_SumeiJujue(nextPlayer,function(){
								playCardAnimation("res/drawable-hdpi/bingxinjue.png", function(){
									bingxingjueHandle(callBack,startPlayer,nextPlayer,true);
								});
							},function(){
								bingxingjueHandle(callBack,startPlayer,nextPlayer,false);
							});
						}
					}));
				}else if(haveBingxingjue==false){
					skillCharacters_SumeiJujue(nextPlayer,function(){
						bingxingjueHandle(callBack,startPlayer,nextPlayer,true);
					},function(){
						bingxingjueHandle(callBack,startPlayer,nextPlayer,false);
					});
				}
			}
		},string_handCardNameBingxinjue,nextPlayer);
	}else{
		var nextNumber=0;
		for(var i=0;i<nowPlayerTerm.length;i++){
			if(nowPlayerTerm[i]._name==nextPlayer._name){
				nextNumber=i;
				break;
			}
		}
		nextNumber++;
		nextNumber%=nowPlayerTerm.length;
		nextPlayer=nowPlayerTerm[nextNumber];
		if(nextPlayer._name!=startPlayer._name){
			useBingxingjue(startPlayer, nextPlayer, callBack);
		}else if(nextPlayer._name==startPlayer._name){
			callBack();
		}
	}
}

/**
 * usePlayer:打出卡牌需要求大家冰心的玩家 askedPlayer:正在被询问冰心诀的玩家
 */
function bingxingjueHandle(callBack,startPlayer,askPlayer,result){
	var nextPlayer=null;
	var nextPlayerNumber=0;
	if(result){
		startPlayer=askPlayer;
		game_Bingxingjue=!game_Bingxingjue;
		textAreaAddMessage(askPlayer._name+"打出了【冰心诀】抵消卡牌效果", myText, listView);
	}
	for(var i=0;i<nowPlayerTerm.length;i++){
		if(nowPlayerTerm[i]._name==askPlayer._name){
			nextPlayerNumber=i;
			break;
		}
	}
	nextPlayerNumber++;
	nextPlayerNumber%=nowPlayerTerm.length;
	nextPlayer=nowPlayerTerm[nextPlayerNumber];
	if(nextPlayer._name==startPlayer._name){
		// game_Bingxingjue=false;
		callBack();
		return;
	}else{
		useBingxingjue(startPlayer, nextPlayer, callBack);
	}
}
/**
 * usePlayer:打出卡牌需要求大家冰心的玩家 askedPlayer:正在被询问冰心诀的玩家
 */
function advBingxingjueHandle(callBack,startPlayer,askPlayer,result){
	var nextPlayer=null;
	var nextPlayerNumber=0;
	if(result){
		startPlayer=askPlayer;
		game_Bingxingjue=!game_Bingxingjue;
		textAreaAddMessage(askPlayer._name+"打出了【冰心诀】抵消卡牌效果", myText, listView);
	}
	for(var i=0;i<nowPlayerTerm.length;i++){
		if(nowPlayerTerm[i]._name==askPlayer._name){
			nextPlayerNumber=i;
			break;
		}
	}
	nextPlayerNumber++;
	nextPlayerNumber%=nowPlayerTerm.length;
	nextPlayer=nowPlayerTerm[nextPlayerNumber];
	if(nextPlayer._name==startPlayer._name){
		// game_Bingxingjue=false;
		callBack();
		return;
	}else{
		advUseBingxingjue(startPlayer, nextPlayer, callBack);
	}
}

function linghuxiandanEffect(effectPlayer,callBack){
	if(game_Bingxingjue==false){
		textAreaAddMessage(effectPlayer._name+"HP+2", myText, listView,function(){
			for(var i=0;i<2;i++){
				baseEffectAddHP(effectPlayer)
			}
			has_Tianshezhang(effectPlayer);
			if(callBack!=null){
				callBack();
			}
		});
	}else{
		textAreaAddMessage("【灵葫仙丹】效果无效", myText, listView);
		game_Bingxingjue=false;
		if(callBack!=null){
			callBack();
		}
	}
}

function tianleipoEffect(usePlayer,callBack){
	longkuiRongzhuCardName=string_handCardNameTianleipo;
	if(game_Bingxingjue==false){
		if(usePlayer._name==player1._name){
			var player1Shown=(player1._name!=nameChonglouSp)?true:false;
			var player2Shown=(player2._name!=nameChonglouSp)?true:false;
			var player3Shown=(player3._name!=nameChonglouSp)?true:false;
			var player4Shown=(player4._name!=nameChonglouSp)?true:false;
			addDialog(mainScene, new selectPlayerDialogLayer(player1Shown,player2Shown, player3Shown, player4Shown,
					"请选择【天雷破】的目标", false, false,function(effectPlayer){
				mainScene.addChild(new MagicLayer(effectPlayer.hadImageView,new MagicNodeLei(),function(){
					var array=new Array();
					array.push(effectPlayer);
					if(effectPlayer.defense==string_handCardNameQiankundaopao){
						textAreaAddMessage(effectPlayer._name+"由于【乾坤道袍】效果，免疫技牌导致的伤害", myText, listView,function(){
							if(callBack!=null){
								callBack();
							}

						});
					}else{
						useYingu(array,effectPlayer,effectPlayer,[2],true,baseEffectReduceHPEffect,function(){
							skillCharactersTangxuejianZhuida(function(){
								heartList=new Array();
								if(callBack!=null){
									callBack();
								}
							});
						});

					}
				}));
			}));
		}else{
			// AI处理天雷破效果
			var selectPlayer=null;
			if (usePlayer._name==player2._name) {
				selectPlayer =cardEfectAITianleipo(player3,player4);
			}else {
				selectPlayer =cardEfectAITianleipo(player1,player2);
			}
			mainScene.addChild(new MagicLayer(selectPlayer.hadImageView,new MagicNodeLei(),function(){
				if(selectPlayer.defense==string_handCardNameQiankundaopao){
					textAreaAddMessage(selectPlayer._name+"由于【乾坤道袍】效果，免疫技牌导致的伤害", myText, listView,function(){
						if(callBack!=null){
							callBack();
						}
					});
				}else{
					useYingu([selectPlayer], selectPlayer, selectPlayer, [2], true, baseEffectReduceHPEffect,function(){
						skillCharactersTangxuejianZhuida(function(){
							heartList=new Array();
							if(callBack!=null){
								callBack();
							}
						});
					});
				}
			}));
		}
	}else{
		textAreaAddMessage("【天雷破】效果无效", myText, listView);
		game_Bingxingjue=false;
		if(callBack!=null){
			callBack();
		}
	}
}

function shuerguoEffect(usePlayer,callBack){
	longkuiRongzhuCardName=string_handCardNameShuerguo;
	if(game_Bingxingjue==false){
		if(usePlayer._name==player1._name){
			var player1Shown=(player1._name!=nameChonglouSp)?true:false;
			var player2Shown=(player2._name!=nameChonglouSp)?true:false;
			var player3Shown=(player3._name!=nameChonglouSp)?true:false;
			var player4Shown=(player4._name!=nameChonglouSp)?true:false;
			if(player1Shown||player2Shown||player3Shown||player4Shown){
				addDialog(mainScene, new selectPlayerDialogLayer(player1Shown,player2Shown, player3Shown, player4Shown,
						"请选择一名角色补2张手牌", false, false,function(result){
					textAreaAddMessage(result._name+"从牌堆中补了2张牌", myText, listView);
					addHandCard([result],result,result,null,[2],true,true,callBack);
					
				}));
			}else{
				textAreaAddMessage("【鼠儿果】效果无效", myText, listView);
				if(callBack!=null){
					callBack();
				}
			}
		}else{
			// AI使用鼠儿果
			// newHandCard(randHandCardNumber(game_HandCard_Start,game_DropHandCard),
			// usePlayer,2, true);
			textAreaAddMessage(usePlayer._name+"从牌堆中补了2张牌", myText, listView);
			addHandCard([usePlayer],usePlayer,usePlayer,null,[2],true,true,callBack);
			/*
			 * if(callBack!=null){ callBack(); }
			 */
		}
	}else{
		textAreaAddMessage("【鼠儿果】效果无效", myText, listView);
		game_Bingxingjue=false;
		if(callBack!=null){
			callBack();
		}
	}
}
function yongandangpiaoEffect(usePlayer,callBack){
	longkuiRongzhuCardName=string_handCardNameYongandangpiao;
	if(game_Bingxingjue==false){
		var addCardPlayerList = [];
		var addCardNumberList = [];
		for (var i = 0; i < nowPlayerTerm.length; i++) {
			if (player1IsPlayer2Friend(nowPlayerTerm[i], usePlayer)) {
				addCardPlayerList.push(nowPlayerTerm[i]);
				addCardNumberList.push(1);
			}
		}
		addHandCard(addCardPlayerList, addCardPlayerList[0], addCardPlayerList[0], null, addCardNumberList, true, true);
	}else{
		textAreaAddMessage("【永安当票】效果无效", myText, listView);
		game_Bingxingjue=false;
		if(callBack!=null){
			callBack();
		}
	}
}

function kuicetianjiEffect(usePlayer,callBack){
	longkuiRongzhuCardName=string_handCardNameKuicetianji;
	if(game_Bingxingjue==false){
		if(usePlayer._name==player1._name){
			var tempArray=new Array();
			if(game_MonsterDeck.length>1){
				tempArray.push(game_MonsterDeck[1]);
			}
			tempArray.push(game_MonsterDeck[0]);
			addDialog(mainScene, new selectMonsterDialogLayer("请选择放置在最顶层的怪牌",tempArray,function(result){
				if(topMonsterCard(game_MonsterDeck[0]).name!=result.name){
					var temp=game_MonsterDeck[1];
					game_MonsterDeck[1]=game_MonsterDeck[0];
					game_MonsterDeck[0]=temp;
				}
				if(callBack!=null){
					callBack();
				}
			}));
		}else{
			// AI使用【窥测天机】效果
			textAreaAddMessage("等待"+usePlayer._name+"观看并排序怪物牌", myText, listView,function(){
				if(callBack!=null){
					callBack();
				}
			});
		}
	}else{
		textAreaAddMessage("【窥测天机】效果无效", myText, listView);
		game_Bingxingjue=false;
		if(callBack!=null){
			callBack();
		}
	}
}

function toudaoEffect(usePlayer,callBack){
	longkuiRongzhuCardName=string_handCardNameToudao;
	var canUseToudao=false;
	for(var i=0;i<nowPlayerTerm.length;i++){
		if(nowPlayerTerm[i].hp>0&&nowPlayerTerm[i]._name!=usePlayer._name){
			if(nowPlayerTerm[i]._name!=nameChonglouSp&&
					nowPlayerTerm[i].handCard.length>0){
				canUseToudao=true;
				break;
			}
		}
	}
	if(game_Bingxingjue==false&&canUseToudao){
		var taojiahuanjiaSavedHandCard=null;
		var taojiahuanjiaCard=new TaojiahuanjianCardModel();
		skillCharacters_JingtianSpTaojiahuanjia(function(card){
			if(card!=null){
				taojiahuanjiaCard=card;
			}
			if (taojiahuanjiaCard!=null&&taojiahuanjiaCard.getCardType() != 0) {
				switch(taojiahuanjiaCard.getCardType()){
				case 1:
					for (var i=0;i<nowPlayerTerm.length;i++) {
						if (nowPlayerTerm[i]._name==taojiahuanjiaCard.getPlayer()._name) {
							for (var x=0;x<nowPlayerTerm[i].handCard.length;x++) {
								if (nowPlayerTerm[i].handCard[x].name==taojiahuanjiaCard
												.getCardName()) {
									taojiahuanjiaSavedHandCard = nowPlayerTerm[i].handCard[x];
									if(nowPlayerTerm[i]._name==player1._name){
										nowPlayerTerm[i].handCard[x].removeFromParent();
									}
									nowPlayerTerm[i].handCard.removeObject(nowPlayerTerm[i].handCard[x]);
									break;
								}
							}
							break;
						}
					}
					break;
				case 2:
					taojiahuanjiaCard.getPlayer().arms1 = "无";
					break;
				case 3:
					taojiahuanjiaCard.getPlayer().arms2 = "无";
					break;
				case 4:
					taojiahuanjiaCard.getPlayer().defense = "无";
					break;
				case 5:
					for (var i=0;i<nowPlayerTerm.length;i++) {
						if (nowPlayerTerm[i]._name==taojiahuanjiaCard
								.getPlayer()._name) {
							for (var x=0;x<nowPlayerTerm[i].skillTempList.length;x++) {
								if (nowPlayerTerm[i].skillTempList[x].name==taojiahuanjiaCard.getCardName()) {
									taojiahuanjiaSavedHandCard = nowPlayerTerm[i].skillTempList[x];
									nowPlayerTerm[i].skillTempList.removeObject(nowPlayerTerm[i].skillTempList[x]);
									break;
								}
							}
							break;
						}
					}
					break;
				}
			}
			if(usePlayer._name==player1._name){
				var player2Shown=(player2._name!=nameChonglouSp&&player2.handCard.length>0)?true:false;
				var player3Shown=(player3._name!=nameChonglouSp&&player3.handCard.length>0)?true:false;
				var player4Shown=(player4._name!=nameChonglouSp&&player4.handCard.length>0)?true:false;
				if(player2Shown||player3Shown||player4Shown){
					addDialog(mainScene, new selectPlayerDialogLayer(false,player2Shown, player3Shown, player4Shown,
							"请选择一名角色获得其手牌", false, false,function(result){
						mainScene.addChild(new AttackTargetLayer(cardAnimationLabel,result.hadImageView,function(){
							var randomNum=parseInt(Math.random()*result.handCard.length, 10);
							var mubiaoCard=result.handCard[randomNum];
							result.handCard.removeObject(mubiaoCard);
							player1.handCard.push(mubiaoCard);
							handCardZone.pushBackCustomItem(mubiaoCard);
							textAreaAddMessage(usePlayer._name+"获得"+result._name+"一张手牌", myText, listView);
							if (taojiahuanjiaCard!=null&&taojiahuanjiaCard.getCardType() != 0) {
								switch(taojiahuanjiaCard.getCardType()){
								case 1:
									taojiahuanjiaCard.getPlayer().handCard.push(taojiahuanjiaSavedHandCard);
									if(taojiahuanjiaCard.getPlayer()._name==player1._name){
										handCardZone.pushBackCustomItem(taojiahuanjiaSavedHandCard);
									}
									break;
								case 2:
									taojiahuanjiaCard.getPlayer().arms1 = taojiahuanjiaCard.getCardName();
									break;
								case 3:
									taojiahuanjiaCard.getPlayer().arms2 = taojiahuanjiaCard.getCardName();
									break;
								case 4:
									taojiahuanjiaCard.getPlayer().defense = taojiahuanjiaCard.getCardName();
									break;
								case 5:
									taojiahuanjiaCard.getPlayer().skillTempList.push(taojiahuanjiaSavedHandCard);
									break;
								}
							}
							if(callBack!=null){
								callBack();
							}
						}));
					}));
				}else{
					textAreaAddMessage("【偷盗】效果无效", myText, listView);
					game_Bingxingjue=false;
					if (taojiahuanjiaCard!=null&&taojiahuanjiaCard.getCardType() != 0) {
						switch(taojiahuanjiaCard.getCardType()){
						case 1:
							taojiahuanjiaCard.getPlayer().handCard.push(taojiahuanjiaSavedHandCard);
							if(taojiahuanjiaCard.getPlayer()._name==player1._name){
								handCardZone.pushBackCustomItem(taojiahuanjiaSavedHandCard);
							}
							break;
						case 2:
							taojiahuanjiaCard.getPlayer().arms1 = taojiahuanjiaCard.getCardName();
							break;
						case 3:
							taojiahuanjiaCard.getPlayer().arms2 = taojiahuanjiaCard.getCardName();
							break;
						case 4:
							taojiahuanjiaCard.getPlayer().defense = taojiahuanjiaCard.getCardName();
							break;
						case 5:
							taojiahuanjiaCard.getPlayer().skillTempList.push(taojiahuanjiaSavedHandCard);
							break;
						}
					}
					if(callBack!=null){
						callBack();
					}
				}
			}else{
				// AI选择【偷盗】目标
				var mubiao1=null,mubiao2=null;
				if(usePlayer._name==player2._name&&(player3.handCard.length>0||player4.handCard.length>0)){
					mubiao1=player3;
					mubiao2=player4;
				}else if((usePlayer._name==player3._name
						||usePlayer._name==player4._name)&&(player1.handCard.length>0||player2.handCard.length>0)){
					mubiao1=player1;
					mubiao2=player2;
				}
				if(mubiao1!=null&&mubiao1._name==nameChonglouSp){
					mubiao1=null;
				}
				if(mubiao2!=null&&mubiao2._name==nameChonglouSp){
					mubiao2=null;
				}
				var selectPlayer=(mubiao1!=null&&mubiao1.hp>0&&mubiao1.handCard.length>0)?mubiao1:mubiao2;
				if(selectPlayer!=null&&selectPlayer.hp>0){
					mainScene.addChild(new AttackTargetLayer(cardAnimationLabel,selectPlayer.hadImageView,function(){
						var tempNumber=parseInt(Math.random()*selectPlayer.handCard.length, 10);
						var card=selectPlayer.handCard[tempNumber];
						usePlayer.handCard.push(card);
						selectPlayer.handCard.removeObject(card);
						if(selectPlayer._name==player1._name){
							card.removeFromParent();
						}
						textAreaAddMessage(usePlayer._name+"使用【偷盗】获得"+selectPlayer._name+"一张手牌", myText, listView);
						if (taojiahuanjiaCard!=null&&taojiahuanjiaCard.getCardType() != 0) {
							switch(taojiahuanjiaCard.getCardType()){
							case 1:
								taojiahuanjiaCard.getPlayer().handCard.push(taojiahuanjiaSavedHandCard);
								if(taojiahuanjiaCard.getPlayer()._name==player1._name){
									handCardZone.pushBackCustomItem(taojiahuanjiaSavedHandCard);
								}
								break;
							case 2:
								taojiahuanjiaCard.getPlayer().arms1 = taojiahuanjiaCard.getCardName();
								break;
							case 3:
								taojiahuanjiaCard.getPlayer().arms2 = taojiahuanjiaCard.getCardName();
								break;
							case 4:
								taojiahuanjiaCard.getPlayer().defense = taojiahuanjiaCard.getCardName();
								break;
							case 5:
								taojiahuanjiaCard.getPlayer().skillTempList.push(taojiahuanjiaSavedHandCard);
								break;
							}
						}
						if(callBack!=null){
							callBack();
						}
					}));
				}else{
					textAreaAddMessage("【偷盗】效果无效", myText, listView);
					game_Bingxingjue=false;
					if (taojiahuanjiaCard!=null&&taojiahuanjiaCard.getCardType() != 0) {
						switch(taojiahuanjiaCard.getCardType()){
						case 1:
							taojiahuanjiaCard.getPlayer().handCard.push(taojiahuanjiaSavedHandCard);
							if(taojiahuanjiaCard.getPlayer()._name==player1._name){
								handCardZone.pushBackCustomItem(taojiahuanjiaSavedHandCard);
							}
							break;
						case 2:
							taojiahuanjiaCard.getPlayer().arms1 = taojiahuanjiaCard.getCardName();
							break;
						case 3:
							taojiahuanjiaCard.getPlayer().arms2 = taojiahuanjiaCard.getCardName();
							break;
						case 4:
							taojiahuanjiaCard.getPlayer().defense = taojiahuanjiaCard.getCardName();
							break;
						case 5:
							taojiahuanjiaCard.getPlayer().skillTempList.push(taojiahuanjiaSavedHandCard);
							break;
						}
					}
					if(callBack!=null){
						callBack();
					}
				}
			}
		});
	}else{
		textAreaAddMessage("【偷盗】效果无效", myText, listView);
		game_Bingxingjue=false;
		if(callBack!=null){
			callBack();
		}
	}
}


function tongqianbiaoEffect(usePlayer,callBack){
	longkuiRongzhuCardName=string_handCardNameTongqianbiao;
	var canUseTongqianbiao=false;
	for (var i = 0; i < nowPlayerTerm.length; i++) {
		if (nowPlayerTerm[i]._name!=usePlayer._name) {
			if (nowPlayerTerm[i]._name!=nameChonglouSp&&(nowPlayerTerm[i].handCard.length != 0
					|| baseEffectCountequment(nowPlayerTerm[i]) != 0)) {
				canUseTongqianbiao = true;
				break;

			}
		}
	}
	if(game_Bingxingjue==false&&canUseTongqianbiao){
		var taojiahuanjiaSavedHandCard=null;
		var taojiahuanjiaCard=new TaojiahuanjianCardModel();
		skillCharacters_JingtianSpTaojiahuanjia(function(card){
			taojiahuanjiaCard=card;
			if (taojiahuanjiaCard!=null&&taojiahuanjiaCard.getCardType() != 0) {
				switch (taojiahuanjiaCard.getCardType()) {
				case 1:
					for (var i=0;i<nowPlayerTerm.length;i++) {
						if (nowPlayerTerm[i]._name==taojiahuanjiaCard
								.getPlayer()._name) {
							for (var x=0;x<nowPlayerTerm[i].handCard.length;x++) {
								if (nowPlayerTerm[i].handCard[x].name==taojiahuanjiaCard
												.getCardName()) {
									taojiahuanjiaSavedHandCard = nowPlayerTerm[i].handCard[x];
									if(nowPlayerTerm[i]._name==player1._name){
										taojiahuanjiaSavedHandCard.removeFromParent();
									}
									nowPlayerTerm[i].handCard.removeObject(nowPlayerTerm[i].handCard[x]);
									break;
								}
							}
							break;
						}
					}
					break;
				case 2:
					taojiahuanjiaCard.getPlayer().arms1 = "无";
					break;
				case 3:
					taojiahuanjiaCard.getPlayer().arms2 = "无";
					break;
				case 4:
					taojiahuanjiaCard.getPlayer().defense = "无";
					break;
				case 5:
					for (var i=0;i<nowPlayerTerm.length;i++) {
						if (nowPlayerTerm[i]._name==taojiahuanjiaCard
								.getPlayer()._name) {
							for (var x=0;x<nowPlayerTerm[i].skillTempList.length;x++) {
								if (nowPlayerTerm[i].skillTempList[x].name
										==taojiahuanjiaCard
												.getCardName()) {
									taojiahuanjiaSavedHandCard = nowPlayerTerm[i].skillTempList[x];
									nowPlayerTerm[i].skillTempList.removeObject(tempHandCard);
									break;
								}
							}
							break;
						}
					}
					break;
				}
			}
			if(usePlayer._name==player1._name){
				var player2Shown=((player2._name!=nameChonglouSp)&&((player2.handCard.length+baseEffectCountequment(player2))>0))?true:false;
				var player3Shown=((player3._name!=nameChonglouSp)&&(player3.handCard.length+baseEffectCountequment(player3)))>0?true:false;
				var player4Shown=((player4._name!=nameChonglouSp)&&(player4.handCard.length+baseEffectCountequment(player4)))>0?true:false;
				addDialog(mainScene, new selectPlayerDialogLayer(false,player2Shown, player3Shown, player4Shown,
						"请选择一名角色", false, false,function(effectPlayer){
					mainScene.addChild(new AttackTargetLayer(cardAnimationLabel,effectPlayer.hadImageView,function(){
						addDialog(mainScene, new selectCardTypeDialogLayer("请选择弃掉的牌",effectPlayer,function(cardTypeResult){
							switch (cardTypeResult) {
							case SelectCardType.ARMS1:
								textAreaAddMessage(usePlayer._name+"弃掉"+effectPlayer._name+"的武器【"+effectPlayer.arms1+"】", myText, listView, null);
								remove_Card_Into_DropDeck(effectPlayer.arms1);
								effectPlayer.arms1 = "无";
								effectPlayer.arms1Combat = 0;
								effectPlayer.arms1Extent = 0;
								effectPlayer.tempZhuangbeiSkillCombat=0;
								effectPlayer.tempZhuangbeiSkillExtent=0;
								break;
							case SelectCardType.ARMS2:
								textAreaAddMessage(usePlayer._name+"弃掉"+effectPlayer._name+"的武器【"+effectPlayer.arms2+"】", myText, listView, null);
								remove_Card_Into_DropDeck(effectPlayer.arms2);
								effectPlayer.arms2 = "无";
								effectPlayer.arms2Combat = 0;
								effectPlayer.arms2Extent = 0;
								break;
							case SelectCardType.DEFENSE:
								remove_Card_Into_DropDeck(effectPlayer.defense);
								textAreaAddMessage(usePlayer._name+"弃掉"+effectPlayer._name+"的防具【"+effectPlayer.defense+"】", myText, listView, null);
								effectPlayer.defense = "无";
								effectPlayer.defenseCombat = 0;
								effectPlayer.defenseExtent = 0;
								break;
							case SelectCardType.HANDCARD:
								var randomNum=parseInt(Math.random()*effectPlayer.handCard.length, 10);
								var mubiaoCard=effectPlayer.handCard[randomNum];
								textAreaAddMessage(usePlayer._name+"弃掉"+effectPlayer._name+"的一张手牌【"+mubiaoCard.name+"】", myText, listView, null);
								remove_Card_Into_DropDeck(mubiaoCard.name);
								effectPlayer.handCard.removeObject(mubiaoCard);
								break;
							case SelectCardType.ORNAMENT:
								addDialog(mainScene,new selectCardDialogLayer("请选择丢弃的饰品",effectPlayer.skillTempList,1,1,false,function(result){
									var card=result.pop();
									remove_Card_Into_DropDeck(card.name);
									effectPlayer.skillTempList.removeObject(card);
									effectPlayer.maxCombat--;
									textAreaAddMessage(usePlayer._name+"弃掉"+effectPlayer._name+"的一件饰品【"+card.name+"】", myText, listView, null);
								}));
								break;
							}
							if (taojiahuanjiaCard!=null&&taojiahuanjiaCard.getCardType() != 0) {
								switch(taojiahuanjiaCard.getCardType()){
								case 1:
									taojiahuanjiaCard.getPlayer().handCard.push(taojiahuanjiaSavedHandCard);
									if(taojiahuanjiaCard.getPlayer()._name==player1._name){
										handCardZone.pushBackCustomItem(taojiahuanjiaSavedHandCard);
									}
									break;
								case 2:
									taojiahuanjiaCard.getPlayer().arms1 = taojiahuanjiaCard.getCardName();
									break;
								case 3:
									taojiahuanjiaCard.getPlayer().arms2 = taojiahuanjiaCard.getCardName();
									break;
								case 4:
									taojiahuanjiaCard.getPlayer().defense = taojiahuanjiaCard
									.getCardName();
									break;
								case 5:
									taojiahuanjiaCard.getPlayer().skillTempList.push(taojiahuanjiaSavedHandCard);
									break;
								}
							}
							if(callBack!=null){
								callBack();
							}
						}));
					}));
				}));
			}else{
				// AI选择【铜钱镖】目标
				var selectPlayer=null;
				var mubiao1=null;
				var mubiao2=null;
				if(usePlayer._name==player2._name){
					mubiao1=player3;
					mubiao2=player4;
				}else if(usePlayer._name==player3._name||usePlayer._name==player4._name){
					mubiao1=player1;
					mubiao2=player2;
				}
				// 先判断敌方是否有武器
				if (mubiao1.arms1!="无"|| mubiao2.arms1!="无") {
					if (mubiao1.hp != 0&&mubiao1.arms1!="无") {
						selectPlayer = mubiao1;
					} else if (mubiao2.hp != 0&& mubiao2.arms1!="无") {
						selectPlayer = mubiao2;
					}
					for (var i=0;i<nowPlayerTerm.length;i++) {
						if (nowPlayerTerm[i]._name==selectPlayer._name) {
							mainScene.addChild(new AttackTargetLayer(cardAnimationLabel,selectPlayer.hadImageView,function(){
								textAreaAddMessage(usePlayer._name+"使用【铜钱镖】，弃置"+selectPlayer._name+"的武器【"+selectPlayer.arms1+"】", myText, listView);
								remove_Card_Into_DropDeck(nowPlayerTerm[i].arms1);
								selectPlayer.arms1 = "无";
								selectPlayer.arms1Combat = 0;
								selectPlayer.arms1Extent = 0;
								selectPlayer.tempZhuangbeiSkillCombat=0;
								selectPlayer.tempZhuangbeiSkillExtent=0;
							}));
							if (taojiahuanjiaCard!=null&&taojiahuanjiaCard.getCardType() != 0) {
								switch(taojiahuanjiaCard.getCardType()){
								case 1:
									taojiahuanjiaCard.getPlayer().handCard.push(taojiahuanjiaSavedHandCard);
									if(taojiahuanjiaCard.getPlayer()._name==player1._name){
										handCardZone.pushBackCustomItem(taojiahuanjiaSavedHandCard);
									}
									break;
								case 2:
									taojiahuanjiaCard.getPlayer().arms1 = taojiahuanjiaCard.getCardName();
									break;
								case 3:
									taojiahuanjiaCard.getPlayer().arms2 = taojiahuanjiaCard.getCardName();
									break;
								case 4:
									taojiahuanjiaCard.getPlayer().defense = taojiahuanjiaCard.getCardName();
									break;
								case 5:
									taojiahuanjiaCard.getPlayer().skillTempList.push(taojiahuanjiaSavedHandCard);
									break;
								}
							}
							if(callBack!=null){
								callBack();
							}
							break;
						}
					}
				}
				// 再判断敌方是否有防具
				else if (mubiao1.defense!="无"||mubiao2.defense!="无") {
					if (mubiao1.hp != 0&& mubiao1.defense!="无") {
						selectPlayer = mubiao1;
					} else if (mubiao2.hp != 0
							&& mubiao2.defense!="无") {
						selectPlayer = mubiao2;
					}
					for (var i=0;i<nowPlayerTerm.length;i++) {
						if (nowPlayerTerm[i]._name==selectPlayer._name) {
							mainScene.addChild(new AttackTargetLayer(cardAnimationLabel,selectPlayer.hadImageView,function(){
								textAreaAddMessage(usePlayer._name+"使用【铜钱镖】弃掉"+selectPlayer._name+"的防具【"+selectPlayer.defense+"】", myText, listView);
								remove_Card_Into_DropDeck(selectPlayer.defense);
								selectPlayer.defense = "无";
								selectPlayer.defenseCombat = 0;
								selectPlayer.defenseExtent = 0;
							}));
							if (taojiahuanjiaCard!=null&&taojiahuanjiaCard.getCardType() != 0) {
								switch(taojiahuanjiaCard.getCardType()){
								case 1:
									taojiahuanjiaCard.getPlayer().handCard.push(taojiahuanjiaSavedHandCard);
									if(taojiahuanjiaCard.getPlayer()._name==player1._name){
										handCardZone.pushBackCustomItem(taojiahuanjiaSavedHandCard);
									}
									break;
								case 2:
									taojiahuanjiaCard.getPlayer().arms1 = taojiahuanjiaCard.getCardName();
									break;
								case 3:
									taojiahuanjiaCard.getPlayer().arms2 = taojiahuanjiaCard.getCardName();
									break;
								case 4:
									taojiahuanjiaCard.getPlayer().defense = taojiahuanjiaCard
									.getCardName();
									break;
								case 5:
									taojiahuanjiaCard.getPlayer().skillTempList.push(taojiahuanjiaSavedHandCard);
									break;
								}
							}
							if(callBack!=null){
								callBack();
							}
							break;
						}
					}
				}
				// 判断敌方是否有饰品（王蓬絮）
				else if((mubiao1._name==nameWangpengxu&&mubiao1.skillTempList.length>0)
						||(mubiao2._name==nameWangpengxu&&mubiao2.skillTempList.length>0)){
					selectPlayer=(mubiao1._name==nameWangpengxu&&mubiao1.skillTempList.length>0)?mubiao1:mubiao2;
					mainScene.addChild(new AttackTargetLayer(cardAnimationLabel,selectPlayer.hadImageView,function(){
						for (var i=0;i<nowPlayerTerm.length;i++) {
							if (nowPlayerTerm[i]._name==selectPlayer._name) {
								tempNumber = parseInt(Math.random()*selectPlayer.skillTempList.length, 10);
								var card=selectPlayer.skillTempList[tempNumber];
								textAreaAddMessage(usePlayer._name+"使用【铜钱镖】弃掉"+selectPlayer._name+"一件饰品【"+card.name+"】", myText, listView);
								selectPlayer.maxCombat--;
								remove_Card_Into_DropDeck(card.name);
								selectPlayer.skillTempList.removeObject(card);
								if(callBack!=null){
									callBack();
								}
								break;
							}
						}
					}));
				}
				// 敌方无装备，则弃掉其手牌
				else if (mubiao1.handCard.length>0|| mubiao2.handCard.length>0) {
					var tempNumber = 0;
					if (mubiao1.handCard.length>0) {
						selectPlayer = mubiao1;
					} else {
						selectPlayer = mubiao2;
					}
					mainScene.addChild(new AttackTargetLayer(cardAnimationLabel,selectPlayer.hadImageView,function(){
						for (var i=0;i<nowPlayerTerm.length;i++) {
							if (nowPlayerTerm[i]._name==selectPlayer._name) {
								tempNumber = parseInt(Math.random()*selectPlayer.handCard.length, 10);
								var card=selectPlayer.handCard[tempNumber];
								if(selectPlayer._name==player1._name){
									card.removeFromParent();
								}
								textAreaAddMessage(usePlayer._name+"使用【铜钱镖】弃掉"+selectPlayer._name+"一张手牌【"+card.name+"】", myText, listView);
								remove_Card_Into_DropDeck(card.name);
								selectPlayer.handCard.removeObject(card);
								if (taojiahuanjiaCard!=null&&taojiahuanjiaCard.getCardType() != 0) {
									switch(taojiahuanjiaCard.getCardType()){
									case 1:
										taojiahuanjiaCard.getPlayer().handCard.push(taojiahuanjiaSavedHandCard);
										if(taojiahuanjiaCard.getPlayer()._name==player1._name){
											handCardZone.pushBackCustomItem(taojiahuanjiaSavedHandCard);
										}
										break;
									case 2:
										taojiahuanjiaCard.getPlayer().arms1 = taojiahuanjiaCard.getCardName();
										break;
									case 3:
										taojiahuanjiaCard.getPlayer().arms2 = taojiahuanjiaCard.getCardName();
										break;
									case 4:
										taojiahuanjiaCard.getPlayer().defense = taojiahuanjiaCard
										.getCardName();
										break;
									case 5:
										taojiahuanjiaCard.getPlayer().skillTempList.push(taojiahuanjiaSavedHandCard);
										break;
									}
								}
								if(callBack!=null){
									callBack();
								}
								break;
							}
						}
					}));
				}else{
					if (taojiahuanjiaCard!=null&&taojiahuanjiaCard.getCardType() != 0) {
						switch(taojiahuanjiaCard.getCardType()){
						case 1:
							taojiahuanjiaCard.getPlayer().handCard.push(taojiahuanjiaSavedHandCard);
							if(taojiahuanjiaCard.getPlayer()._name==player1._name){
								handCardZone.pushBackCustomItem(taojiahuanjiaSavedHandCard);
							}
							break;
						case 2:
							taojiahuanjiaCard.getPlayer().arms1 = taojiahuanjiaCard.getCardName();
							break;
						case 3:
							taojiahuanjiaCard.getPlayer().arms2 = taojiahuanjiaCard.getCardName();
							break;
						case 4:
							taojiahuanjiaCard.getPlayer().defense = taojiahuanjiaCard.getCardName();
							break;
						case 5:
							taojiahuanjiaCard.getPlayer().skillTempList.push(taojiahuanjiaSavedHandCard);
							break;
						}
					}
					textAreaAddMessage("【铜钱镖】效果无效", myText, listView);
					game_Bingxingjue=false;
					if(callBack!=null){
						callBack();
					}
				}
			}
		})
	}else{
		textAreaAddMessage("【铜钱镖】效果无效", myText, listView);
		game_Bingxingjue=false;
		if(callBack!=null){
			callBack();
		}
	}
}

function wuqichaoyuanEffect(usePlayer,canDiandang,callBack){
	if(canDiandang){
		canDiandang=skillCharacters_JingtianLaobanAsk(usePlayer);
	}
	if(canDiandang){
		if(usePlayer._name==player1._name){
			addDialog(mainScene, new ChooseZoneLayer("是否发动“典当”效果？",function(result){
				if(result){
					textAreaAddMessage(usePlayer._name+"发动【五气朝元】典当效果，从牌堆中补1张牌", myText, listView);
					skillCharacters_JingtianLaoban(usePlayer,45,function(){
						game_DropHandCard.removeObject(45);
					},function(){
						addHandCard([usePlayer],usePlayer,usePlayer,null,[1],true,true,callBack);
					});
					
				}else{
					useBingxingjue(usePlayer, usePlayer, function(){
						longkuiRongzhuCardName=string_handCardNameWuqichaoyuan;
						if(!game_Bingxingjue){
							textAreaAddMessage(usePlayer._name+"发动【五气朝元】效果，我方全体HP+1", myText, listView);
							for(var i=0;i<usePlayer.friendList.length;i++){
								if (usePlayer.friendList[i].hp != 0) {
									baseEffectAddHP(usePlayer.friendList[i]);
									has_Tianshezhang(usePlayer.friendList[i]);
								}
							}
						}else{
							textAreaAddMessage(usePlayer._name+"发动【五气朝元】无效", myText, listView);
							game_Bingxingjue=false;
						}
						if(callBack!=null){
							callBack();
						}
					});
				}
			}));
		}else{
			// AI决定是否发动“典当”效果
			var is_DianDang = true; // AI判断是否发动【典当】(当自己和队友均满血时，发动【典当】)
			for (var i=0;i<usePlayer.friendList.length;i++) {
				if (usePlayer.friendList[i].hp>0&&usePlayer.friendList[i].hp != usePlayer.friendList[i].maxHP) {
					is_DianDang = false;
				}
			}
			if (is_DianDang) {
				// 典当
				textAreaAddMessage(usePlayer._name+"典当【五气朝元】，从牌堆中补1张牌", myText, listView);
				skillCharacters_JingtianLaoban(usePlayer,45,null,function(){
					game_DropHandCard.removeObject(45);
				});
				addHandCard([usePlayer],usePlayer,usePlayer,null,[1],true,true,callBack);
			}else{
				useBingxingjue(usePlayer, usePlayer, function(){
					if(!game_Bingxingjue){
						textAreaAddMessage(usePlayer._name+"发动【五气朝元】效果，我方全体HP+1", myText, listView);
						for(var i=0;i<usePlayer.friendList.length;i++){
							if (usePlayer.friendList[i].hp != 0) {
								baseEffectAddHP(usePlayer.friendList[i]);
								has_Tianshezhang(usePlayer.friendList[i]);
							}
						}
						
					}else{
						textAreaAddMessage(usePlayer._name+"发动【五气朝元】无效", myText, listView);
						game_Bingxingjue=false;
					}
					if(callBack!=null){
						callBack();
					}
				});
			}
		}
	}else{
		useBingxingjue(usePlayer, usePlayer, function(){
			textAreaAddMessage(usePlayer._name+"发动【五气朝元】效果，我方全体HP+1", myText, listView);
			for(var i=0;i<usePlayer.friendList.length;i++){
				if (usePlayer.friendList[i].hp != 0) {
					baseEffectAddHP(usePlayer.friendList[i]);
					has_Tianshezhang(usePlayer.friendList[i]);
				}
			}
			game_Bingxingjue=false;
			if(callBack!=null){
				callBack();
			}
		});
	}
}

function modaotianzhaEffect(player,armNumber,callBack){
	var tempArmNumber=armNumber!=null?armNumber:1;
	baseEffectZhuangbeiArms(player,tempArmNumber, 2, 0, string_handCardNameModaotianzha,callBack);
}

function mojianEffect(player,armNumber,callBack){
	var tempArmNumber=armNumber!=null?armNumber:1;
	baseEffectZhuangbeiArms(player,tempArmNumber, 0, 1, string_handCardNameMojian,callBack);
}

function xiheEffect(player,armNumber,callBack){
	var _tempArmNumber=armNumber!=null?armNumber:1;
	//检测场上是否有人装备望舒剑
	var _extent=0;
	var _targetPlayer=baseEffectCheckPlayerHasArm(string_handCardNameWangshu, false);
	if(_targetPlayer!=null){
		_extent=2;
		var _string="_targetPlayer.player.arms"+_targetPlayer.armIndex+"Combat+=2";
		eval(_string);
		xiheAndWanghsuEffect=true;
		textAreaAddMessage("场上存在【望舒剑】，羲和剑额外获得命中+2效果", myText, listView);
		textAreaAddMessage("场上存在【羲和剑】，望舒剑额外获得战力+2效果", myText, listView);
	}
	baseEffectZhuangbeiArms(player, _tempArmNumber, 2, _extent, string_handCardNameXihe, callBack);
}
function wangshuEffect(player,armNumber,callBack){
	var _tempArmNumber=armNumber!=null?armNumber:1;
	//检测场上是否有人装备羲和剑
	var _combat=0;
	var _targetPlayer=baseEffectCheckPlayerHasArm(string_handCardNameXihe, false);
	if(_targetPlayer!=null){
		_combat=2;
		var _string="_targetPlayer.player.arms"+_targetPlayer.armIndex+"Extent+=2";
		eval(_string);
		xiheAndWanghsuEffect=true;
		textAreaAddMessage("场上存在【羲和剑】，望舒剑额外获得战力+2效果", myText, listView);
		textAreaAddMessage("场上存在【望舒剑】，羲和剑额外获得命中+2效果", myText, listView);
	}
	baseEffectZhuangbeiArms(player, _tempArmNumber, _combat, 2, string_handCardNameWangshu, callBack);
}

// 装备区中魔剑典当效果
function mojianDiandangEffectInEqumentZone(callBack){
	if(player1.arms1==string_handCardNameMojian||
			player1.arms2==string_handCardNameMojian){
		if(!skillCharacters_JingtianLaobanAsk(player1)){
			return;
		}
		addDialog(mainScene, new ChooseZoneLayer("是否典当【魔剑】补2张牌？",function(result){
			if(result){
				remove_Card_Into_DropDeck(string_handCardNameMojian);
				skillCharacters_JingtianLaoban(player1,47,function(){
					game_DropHandCard.removeObject(47);
				});
				if (player1.arms1==string_handCardNameMojian) {
					player1.arms1 = "无";
					player1.arms1Combat = 0;
					player1.arms1Extent = 0;
					player1.tempZhuangbeiSkillCombat=0;
					player1.tempZhuangbeiSkillExtent=0;
				} else if (player1.arms2==string_handCardNameMojian) {
					player1.arms2 = "无";
					player1.arms2Combat = 0;
					player1.arms2Extent = 0;
				}
				addHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],
						null,[2],true,true);
				textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"从牌堆中补了2张牌", myText, listView);
			}else{
				callBack();
			}
		}));
	}else{
		callBack();
	}
}

function wuchenjianEffect(player,armNumber,callBack){
	var tempArmNumber=armNumber!=null?armNumber:1;
	baseEffectZhuangbeiArms(player,tempArmNumber, 1, 1, string_handCardNameWuchenjian,callBack);
}

function tianshezhangEffect(player,armNumber,callBack){
	var tempArmNumber=armNumber!=null?armNumber:1;
	baseEffectZhuangbeiArms(player,tempArmNumber, 1, 0, string_handCardNameTianshezhang,callBack);
}

// armNumber是装备为第几把武器，默认为第一把，双剑技能可设置为第二把
function caihuanEffect(player,armNumber,callBack){
	var tempArmNumber=armNumber!=null?armNumber:1;
	baseEffectZhuangbeiArms(player,tempArmNumber, 0, 2, string_handCardNameCaihuan,callBack);
}

function qiankundaopaoEffect(player,callBack){
	baseEffectZhuangbeiDefenses(player,1, 0, string_handCardNameQiankundaopao,callBack);
}

function longhunzhankaiEffect(player,callBack){
	baseEffectZhuangbeiDefenses(player,0, 0, string_handCardNameLonghunzhankai,callBack);
}

function tiandijifuEffect(player,callBack){
	baseEffectZhuangbeiDefenses(player,0, 0, string_handCardNameTiandijifu,callBack);
}

function tayunxueEffect(player,callBack){
	baseEffectZhuangbeiDefenses(player,0, 1, string_handCardNameTayunxue,callBack);
}

function wucaixiayiEffect(player,callBack){
	baseEffectZhuangbeiDefenses(player,1, 0, string_handCardNameWucaixiayi,callBack);
}


function palyer1UseYingu(cardYingu,heartList,firstPlayer,usePlayer,heartNumberList,canUseLonghunzhankai,callBack,callBack2){
	addDialog(mainScene, new ChooseZoneLayer("是否使用隐蛊？",function(result){
		if(result){
			remove_Card_Into_DropDeck(cardYingu.name);
			usePlayer.handCard.removeObject(cardYingu);
			cardYingu.removeFromParent();
			useBingxingjue(usePlayer, usePlayer,function(){
				yinguHandle(heartList,firstPlayer,usePlayer, result,heartNumberList,canUseLonghunzhankai, callBack,callBack2);
			},callBack2);
		}else{
			yinguHandle(heartList,firstPlayer,usePlayer, result,heartNumberList,canUseLonghunzhankai, callBack,callBack2);
		}
	}));
}

// heartNumber 受到的伤害数值
// canUseLonghunzhankai 是否可以使用龙魂战铠
function useYingu(heartList,firstPlayer,usePlayer,heartNumberList,canUseLonghunzhankai,callBack,callBack2){
	var nextUsePlayerNumber=0;
	var cardYingu=null;
	var useYingu=false;
	var hasYingu=false;
	var hasTiandijifu=false;
	if(heartList!=null&&heartList.length>0){
		skillCharacters_JingtianYongandangAsk(function(result){
			if(result){
				mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
					textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,string_handCardNameYingu), myText, listView,function(){
						playCardAnimation("res/drawable-hdpi/yingu.png",function(){
							useBingxingjue(usePlayer, usePlayer,function(){
								yinguHandle(heartList,firstPlayer,usePlayer, result,heartNumberList,canUseLonghunzhankai, callBack,callBack2);
							},callBack2);
						});
					});
				}));
			}else{
				// 判断当前用户是否有【隐蛊】
				for(var i=0;i<usePlayer.handCard.length;i++){

					if((usePlayer.defense==string_handCardNameTiandijifu&&usePlayer.handCard.length>0)){
						hasTiandijifu=true;
					}
					if(usePlayer.handCard[i].name==string_handCardNameYingu){
						hasYingu=true;
						cardYingu=usePlayer.handCard[i];
						break;
					}
				}
				if(hasTiandijifu||hasYingu){
					if(usePlayer._name==player1._name){
						if(hasTiandijifu){
							addDialog(mainScene, new ChooseZoneLayer("是否发动【天帝祭服】效果，将任意手牌当【隐蛊】使用？",function(result){
								if(result){
									addDialog(mainScene, new selectCardDialogLayer("请选择1张手牌当作【隐蛊】使用",usePlayer.handCard,1,1,false,function(select){
										var selectCard=select.pop();
										remove_Card_Into_DropDeck(selectCard.name);
										usePlayer.handCard.removeObject(selectCard);
										selectCard.removeFromParent();
										useBingxingjue(usePlayer, usePlayer,function(){
											yinguHandle(heartList,firstPlayer,usePlayer, result,heartNumberList,canUseLonghunzhankai, callBack,callBack2);
										});
									}));
								}else{
									if(hasYingu){
										palyer1UseYingu(cardYingu,heartList,firstPlayer,usePlayer,heartNumberList,canUseLonghunzhankai,callBack,callBack2);
									}else{
										yinguHandle(heartList, firstPlayer, usePlayer, false, heartNumberList,canUseLonghunzhankai,callBack,callBack2);
									}
								}
							}));
						}else{
							addDialog(mainScene, new ChooseZoneLayer("是否使用隐蛊？",function(result){
								if(result){
									AchivementProgress.addAchivementProgress(initCardAchivement.achivementYingu);
									remove_Card_Into_DropDeck(cardYingu.name);
									usePlayer.handCard.removeObject(cardYingu);
									cardYingu.removeFromParent();
									mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
										textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,string_handCardNameYingu), myText, listView,function(){
											playCardAnimation("res/drawable-hdpi/yingu.png",function(){
												useBingxingjue(usePlayer, usePlayer,function(){
													yinguHandle(heartList,firstPlayer,usePlayer, result,heartNumberList,canUseLonghunzhankai, callBack,callBack2);
												},callBack2);
											});
										});
									}));
								}else{
									yinguHandle(heartList,firstPlayer,usePlayer, result,heartNumberList,canUseLonghunzhankai, callBack,callBack2);
								}
							}));
						}
					}else{
						if(hasYingu){
							// AI使用隐蛊
							useYingu=true;
							if(useYingu){
								remove_Card_Into_DropDeck(cardYingu.name);
								usePlayer.handCard.removeObject(cardYingu);
								mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
									textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,string_handCardNameYingu), myText, listView,function(){
										playCardAnimation("res/drawable-hdpi/yingu.png",function(){
											useBingxingjue(usePlayer, usePlayer, function(){
												yinguHandle(heartList,firstPlayer,usePlayer, useYingu, heartNumberList,canUseLonghunzhankai,callBack,callBack2);
											},callBack2);
										});
									});
								}));
							}
						}else{
							yinguHandle(heartList, firstPlayer, usePlayer, false, heartNumberList,canUseLonghunzhankai,callBack,callBack2);
						}
					}
				}else{
					// 当前玩家没有隐蛊，先触发唐雨柔【咏圣调】效果
					skillCharacters_TangyurouYongshengdiao_yingu(heartList, firstPlayer, usePlayer, heartNumberList,canUseLonghunzhankai,callBack,callBack2)
				}
			}
		}, string_handCardNameYingu, usePlayer);
	}else if(callBack2!=null){
		callBack2();
	}
	
}


function yinguHandle(heartList,firstPlayer,effectPlayer,isUsedYingu,heartNumberList,canUseLonghunzhankai,callBack,callBack2){
	var nowUsePlayerNumber=0;
	for(var i=0;i<heartList.length;i++){
		if(heartList[i]._name==effectPlayer._name){
			nowUsePlayerNumber=i;
			break;
		}
	}
	if(isUsedYingu){
		if(game_Bingxingjue){
			game_Bingxingjue=false;
			useYingu(heartList,firstPlayer,effectPlayer, heartNumberList,canUseLonghunzhankai,callBack,callBack2);
		}else{
			textAreaAddMessage(effectPlayer._name+"使用了【隐蛊】抵消本次伤害", myText, listView);
			heartNumberList[nowUsePlayerNumber]=0;
			var nextUsePlayerNumber=nowUsePlayerNumber+1;
			nextUsePlayerNumber%=heartList.length;
			if(heartList[nextUsePlayerNumber]._name!=firstPlayer._name){
				useYingu(heartList, firstPlayer, heartList[nextUsePlayerNumber], heartNumberList,canUseLonghunzhankai,callBack,callBack2);
			}else if(heartList[nextUsePlayerNumber]._name==firstPlayer._name&&callBack2!=null){
				// callBack2();
				isDeath(heartList[0],heartList,true,callBack2,true);
				// callBack(effectPlayer,heartList,heartNumberList[nowUsePlayerNumber],canUseLonghunzhankai,callBack2);
			}
		}
	}else{
		callBack(effectPlayer,heartList,heartNumberList[nowUsePlayerNumber],canUseLonghunzhankai,function(){
			var nextUsePlayerNumber=nowUsePlayerNumber+1;
			nextUsePlayerNumber%=heartList.length;
			if(heartList[nextUsePlayerNumber]._name!=firstPlayer._name){
				useYingu(heartList, firstPlayer, heartList[nextUsePlayerNumber], heartNumberList,canUseLonghunzhankai,callBack,callBack2);
			}else if(heartList[nextUsePlayerNumber]._name==firstPlayer._name&&callBack2!=null){
				isDeath(heartList[0],heartList,true,callBack2,true);
			}
		});
	}
}

function tianxuanwuyinHandle(result){
	if(result==CAMP.CHUFAFANG){
		textAreaAddMessage("触发方战力+2",myText,listView);
		addTrigerCombat(2);
		mainScene.addChild(new NumberAnimationLayer("+2",triggerCombatBMFont));
	}else if(result==CAMP.GUAIWUFANG){
		textAreaAddMessage("怪物方战力+2",myText,listView);
		addMonsterCombat(2);
		mainScene.addChild(new NumberAnimationLayer("+2",monsterCombatBMFont));
	}
}

function tianxuanwuyinEffect(usePlayer,callBack){
	if(game_Bingxingjue){
		game_Bingxingjue=false;
		textAreaAddMessage("【天玄五音】效果无效", myText, listView);
		if(callBack!=null){
			callBack();
		}
	}else{
		if(usePlayer._name==player1._name){
			addDialog(mainScene, new selectCampDialogLayer("请选择增加战力的一方",function(result){
				tianxuanwuyinHandle(result);
			}));
		}else{
			// AI选择天玄五音效果
			tianxuanwuyinHandle(cardEffectAITianxuanwuyin(usePlayer));
			if(callBack!=null){
				callBack();
			}
		}
	}
}

function jincanwangEffect(usePlayer,callBack){
	var shenfeng = 0; // 用于判断使用者为什么身份 1：触发方 2：怪物方
	var canUseJincanwang=false;
	if(game_Bingxingjue){
		game_Bingxingjue=false;
		textAreaAddMessage("【金蚕王】效果无效", myText, listView);
		if(callBack!=null){
			callBack();
		}
	}else{
		// 处理金蚕王效果
		if(usePlayer._name==nowPlayerTerm[nowPlayerNumber]._name){
			shenfeng=1;
			canUseJincanwang=true;
		}else if((usePlayer.joinAttack||usePlayer._name==nameTangyurou)&&attactIsMiss(usePlayer, fight_FirstMonster)){
			for (var i=0;i<fight_Trigger.length;i++) {
				if (usePlayer._name==fight_Trigger[i]._name) {
					if (fight_Trigger[1]._name==usePlayer._name) {
						canUseJincanwang = true;
						shenfeng = 1;
						break;
					}
				}
			}
			if (!canUseJincanwang) {
				for (var i=0;i<fight_Monster.length;i++) {
					if (usePlayer._name==fight_Monster[i]._name) {
						canUseJincanwang = true;
						shenfeng = 2;
						break;
					}
				}
			}
		}
		if(!canUseJincanwang){
			textAreaAddMessage(usePlayer._name+"的【金蚕王】没有效果", myText, listView);
			if(callBack!=null){
				callBack();
			}
		}else{
			baseEffectAddTempCombat(usePlayer, 3);
			textAreaAddMessage(usePlayer._name+"使用了【金蚕王】，自身战力+3", myText, listView);
			if (shenfeng == 1) {
				triggerCombat += 3;
			} else if (shenfeng == 2) {
				monsterCombat += 3;
			}
			mainScene.addChild(new NumberAnimationLayer("+3",usePlayer.hadImageView,callBack));
		}
	}
}

function tiangangzhanqiEffect(usePlayer,callBack){
	var shenfeng = 0; // 用于判断使用者为什么身份 1：触发方 2：怪物方
	var canUseTiangangzhanqi=false;
	if(game_Bingxingjue){
		game_Bingxingjue=false;
		textAreaAddMessage("【天罡战气】效果无效", myText, listView);
		if(callBack!=null){
			callBack();
		}
	}else{
		if(usePlayer._name==nowPlayerTerm[nowPlayerNumber]._name){
			shenfeng=1;
			canUseTiangangzhanqi=true;
		}else if((usePlayer.joinAttack||usePlayer._name==nameTangyurou)&&attactIsMiss(usePlayer,fight_FirstMonster)){
			for(var i=0;i<fight_Trigger.length;i++){
				if(fight_Trigger[i]._name==usePlayer._name){
					canUseTiangangzhanqi=true;
					shenfeng=1;
					break;
				}
			}
			if(!canUseTiangangzhanqi){
				for(var i=0;i<fight_Monster.length;i++){
					if(fight_Monster[i]._name==usePlayer._name){
						canUseTiangangzhanqi=true;
						shenfeng=2;
						break;
					}
				}
			}
		}
		if(canUseTiangangzhanqi){
			if(shenfeng==1){
				triggerCombat -= usePlayer.combat
			}else if(shenfeng==2){
				monsterCombat -= usePlayer.combat;
			}
			var _add=usePlayer.combat-usePlayer.tempAddCombat;
			baseEffectAddTempCombat(usePlayer, _add);
			if(shenfeng==1){
				triggerCombat += usePlayer.combat
			}else if(shenfeng==2){
				monsterCombat += usePlayer.combat;
			}
			textAreaAddMessage(usePlayer._name+"使用【天罡战气】，自身战力加倍", myText, listView);
			mainScene.addChild(new NumberAnimationLayer("+"+_add,usePlayer.hadImageView,callBack));
		}else{
			textAreaAddMessage("【天罡战气】效果无效", myText, listView);
			if(callBack!=null){
				callBack();
			}
		}
	}
}

function jinchantuoqiaoEffect(usePlayer,callBack){
	if(!game_Bingxingjue&&(usePlayer.joinAttack||usePlayer._name==nameTangyurou)){
		textAreaAddMessage(usePlayer._name+"使用【金蝉脱壳】，强制结束本场打怪", myText, listView);
		nextStep=6;
		roundAttackEnd();
	}else{
		game_Bingxingjue=false;
		textAreaAddMessage("【金蝉脱壳】效果无效", myText, listView);
		if(callBack!=null){
			callBack();
		}
	}
}




