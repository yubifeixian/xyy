//callBack为询问完洞冥宝镜之后要执行的操作，一般可能为
//1、首次询问是否打怪
//2、NPC效果中选择“翻取下一张”前询问洞明
function advUseDongmingbaojing(usePlayer,callBack){
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
		if(tempPlayer._name!=boss._name&&tempPlayer.hp>0&&tempPlayer.handCard.length>0){
			for(var i=0;i<tempPlayer.handCard.length;i++){
				if(tempPlayer.handCard[i].name==string_handCardNameDongmingbaojing){
					haveDongmingbaojing=true;
					cardDongmingbaojing=tempPlayer.handCard[i];
					if(tempPlayer._name==myControlPlayer._name){
						addDialog(mainScene, new ChooseZoneLayer("是否使用洞冥宝镜？",function(result){
							if(result){
								textAreaAddMessage(myControlPlayer._name+"打出了【洞冥宝镜】", myText, listView,function(){
									advRemove_Card_Into_DropDeck(cardDongmingbaojing.name);
									myControlPlayer.handCard.removeObject(cardDongmingbaojing);
									cardDongmingbaojing.removeFromParent();
									cardDongmingbaojing.release();
									dropCardXueshouDuying(tempPlayer,function(){
										playCardAnimation(resPng.dongmingbaojing_png, function(){
											advUseBingxingjue(tempPlayer,askBingxingjuePlayer,function(){
												advDongmingbaojingEffect(tempPlayer,null,callBack);
											});
										});
									},function(){
										advDongmingbaojingEffect(tempPlayer,1,callBack);
									});
								})
							}else{
								// game_Bingxingjue=1;//表示有洞冥宝镜但是不想用
								advDongmingbaojingEffect(tempPlayer,2,callBack);
							}
						}));
						break;
					}else{
						// AI判断是否使用洞冥宝镜
						var aiUseDongmingbaojingResult=true;
						if(tempPlayer._name==boss._name){
							aiUseDongmingbaojingResult=false;
						}
						if(aiUseDongmingbaojingResult){
							textAreaAddMessage(tempPlayer._name+"打出了【洞冥宝镜】", myText, listView)
						}
						mainScene.runAction(cc.Sequence.create( cc.DelayTime.create(1), cc.CallFunc.create(function () {
							// 执行下一个代码
							if(aiUseDongmingbaojingResult){
								// 移除手牌
								advRemove_Card_Into_DropDeck(cardDongmingbaojing.name);
								tempPlayer.handCard.removeObject(cardDongmingbaojing);
								cardDongmingbaojing.release();
								dropCardXueshouDuying(tempPlayer,function(){
									playCardAnimation(resPng.dongmingbaojing_png, function(){
										// 询问冰心,根据结果处理洞明的效果
										advUseBingxingjue(tempPlayer,askBingxingjuePlayer,function(aiUseDongmingbaojingResult){
											advDongmingbaojingEffect(tempPlayer,null,callBack);
										});
									});
								},function(){
									advDongmingbaojingEffect(tempPlayer,1,callBack);
								});
							}
						}))); 
						break;
					}
				}
			}
			if(haveDongmingbaojing==false){
				advDongmingbaojingEffect(tempPlayer,1,callBack);
				// dongmingbaojingEffect(tempPlayer,1,callBack);
			}
		}else{
			if(askBingxingjuePlayer._name!=nowPlayerTerm[nowPlayerNumber]._name){
				advUseDongmingbaojing(askBingxingjuePlayer,callBack);
			}else{
				callBack();
			}
		}
	}else{
		callBack();
	}

}


//haveNoDongmingbaojing:
//null:有洞冥宝镜且用了
//1:没有洞明宝镜
//2、有洞冥宝镜但是不想用

//callBack:询问完毕洞冥宝镜之后需要执行的操作
function advDongmingbaojingEffect(usePlayer,haveNotDongmingbaojing,callBack){
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
		if(usePlayer._name==myControlPlayer._name){
			addDialog(mainScene, new selectMonsterDialogLayer("洞冥宝镜效果",tempArray,function(result){
				textAreaAddMessage(usePlayer._name+"观看了一张怪物牌"+result.name, myText, listView);
				if(nextPlayer._name==nowPlayerTerm[nowPlayerNumber]._name){
					callBack();
				}else{
					advUseDongmingbaojing(nextPlayer,callBack);
				}
			}));
		}else{
			textAreaAddMessage(usePlayer._name+"观看了一张怪物牌", myText, listView);
			if(nextPlayer._name==nowPlayerTerm[nowPlayerNumber]._name){
				callBack();
				// roundAttack1();
			}else{
				advUseDongmingbaojing(nextPlayer,callBack);
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
			advUseDongmingbaojing(usePlayer,callBack);
		}else{
			advUseDongmingbaojing(nextPlayer,callBack);
		}
	}else{
		if(nextPlayer._name==nowPlayerTerm[nowPlayerNumber]._name){
			game_Bingxingjue=false;
			callBack();
			// roundAttack1();
		}else{
			advUseDongmingbaojing(nextPlayer,callBack);
		}
	}
}
/*
 * 询问是否使用冰心诀，传入的callBack为打出的卡牌的效果 startPlayer:冰心结束在此玩家这 nextPlayer:被询问出冰心诀的玩家
 */
function advUseBingxingjue(startPlayer,nextPlayer,callBack){
	var haveBingxingjue=false;
	var showDialog=false;
	var cardBingxingjue=null;
	if(nextPlayer.hp>0&&((nextPlayer._name!=boss._name&&nextPlayer.handCard.length>0)||nextPlayer._name==boss._name&&boss.bingxingjueList.length>0)){
		if(nextPlayer._name!=boss._name){
			for(var i=0;i<nextPlayer.handCard.length;i++){
				if(nextPlayer.handCard[i].name==string_handCardNameBingxinjue){
					cardBingxingjue=nextPlayer.handCard[i];
					haveBingxingjue=true;
					if(nextPlayer._name==myControlPlayer._name){
						showDialog=true;
						break;
					}else{
						// AI判断是否使用冰心诀
						var aiUseBingxingjueResult=nextPlayer._name!=boss._name?false:true;
						if(aiUseBingxingjueResult){
							advRemove_Card_Into_DropDeck(cardBingxingjue.name);
							nextPlayer.handCard.removeObject(cardBingxingjue);
							cardBingxingjue.release();
						}
						dropCardXueshouDuying(nextPlayer,function(){
							if(aiUseBingxingjueResult){
								playCardAnimation(resPng.bingxinjue_png, function(){
									advBingxingjueHandle(callBack,startPlayer,nextPlayer,aiUseBingxingjueResult);
								});
							}else{
								advBingxingjueHandle(callBack,startPlayer,nextPlayer,aiUseBingxingjueResult);
							}
						},function(){
							advBingxingjueHandle(callBack,startPlayer,nextPlayer,false);
						});
						return;
					}

				}
			}
		}else{
			// 魔主使用冰心诀
			var aiUseBingxingjueResult=false;
			haveBingxingjue=true;
			if(startPlayer._name!=boss._name){
				advRemove_Card_Into_DropDeck(string_handCardNameBingxinjue);
				boss.bingxingjueList.pop();
				aiUseBingxingjueResult=true;
			}
			playCardAnimation(resPng.bingxinjue_png, function(){
				advBingxingjueHandle(callBack,startPlayer,nextPlayer,aiUseBingxingjueResult);
			});
		}
		if(showDialog){
			addDialog(mainScene, new ChooseZoneLayer("是否使用冰心诀？",function(result){
				if(result){
					advRemove_Card_Into_DropDeck(cardBingxingjue.name);
					myControlPlayer.handCard.removeObject(cardBingxingjue);
					cardBingxingjue.removeFromParent();
					cardBingxingjue.release();
					dropCardXueshouDuying(nextPlayer,function(){
						playCardAnimation(resPng.bingxinjue_png, function(){
							advBingxingjueHandle(callBack,startPlayer,nextPlayer,result);
						});
					},function(){
						advBingxingjueHandle(callBack,startPlayer,nextPlayer,false);
					});
				}else{
					advSkillCharacters_SumeiJujue(nextPlayer,function(){
						playCardAnimation(resPng.bingxinjue_png, function(){
							advBingxingjueHandle(callBack,startPlayer,nextPlayer,true);
						});
					},function(){
						advBingxingjueHandle(callBack,startPlayer,nextPlayer,false);
					});
				}
			}));
		}else if(haveBingxingjue==false){
			advSkillCharacters_SumeiJujue(nextPlayer,function(){
				dropCardXueshouDuying(nextPlayer,function(){
					playCardAnimation(resPng.bingxinjue_png, function(){
						advBingxingjueHandle(callBack,startPlayer,nextPlayer,true);
					});
				},function(){
					advBingxingjueHandle(callBack,startPlayer,nextPlayer,false);
				});
			},function(){
				advBingxingjueHandle(callBack,startPlayer,nextPlayer,false);
			});
		}
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
			advUseBingxingjue(startPlayer, nextPlayer, callBack);
		}else if(nextPlayer._name==startPlayer._name){
			callBack();
		}
	}
}


function advTianleipoEffect(usePlayer,callBack){
	longkuiRongzhuCardName=string_handCardNameTianleipo;
	if(game_Bingxingjue==false){
		if(usePlayer._name==myControlPlayer._name){
			var player1Shown=(player1._name!=nameChonglouSp)?true:false;
			var player2Shown=(player2._name!=nameChonglouSp)?true:false;
			var player3Shown=(player3._name!=nameChonglouSp)?true:false;
			// var player4Shown=(player4._name!=nameChonglouSp)?true:false;
			addDialog(mainScene, new selectAdvPlayerDialogLayer(player1Shown,player2Shown, player3Shown, true,
					"请选择【天雷破】的目标", false, false,function(effectPlayer){
				mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,effectPlayer.hadImageView,function(){
					var array=new Array();
					array.push(effectPlayer);
					if(effectPlayer.defense==string_handCardNameQiankundaopao){
						textAreaAddMessage(effectPlayer._name+"由于【乾坤道袍】效果，免疫技牌导致的伤害", myText, listView,function(){
							if(callBack!=null){
								callBack();
							}

						});
					}else{
						advUseYingu(array,effectPlayer,effectPlayer,[2],true,advBaseEffectReduceHPEffect,function(){
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
			// 队友AI处理天雷破效果
			if (usePlayer._name!=boss._name) {
				selectPlayer =boss;
				mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,selectPlayer.hadImageView,function(){
					if(selectPlayer.defense==string_handCardNameQiankundaopao){
						textAreaAddMessage(selectPlayer._name+"由于【乾坤道袍】效果，免疫技牌导致的伤害", myText, listView,function(){
							if(callBack!=null){
								callBack();
							}
						});
					}else{
						advUseYingu([selectPlayer], selectPlayer, selectPlayer, [2], true, advBaseEffectReduceHPEffect,function(){
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
		}
	}else{
		textAreaAddMessage("【天雷破】效果无效", myText, listView);
		game_Bingxingjue=false;
		if(callBack!=null){
			callBack();
		}
	}
}

function advShuerguoEffect(usePlayer,callBack){
	longkuiRongzhuCardName=string_handCardNameShuerguo;
	if(game_Bingxingjue==false){
		if(usePlayer._name==myControlPlayer._name){
			var player1Shown=(player1._name!=nameChonglouSp)?true:false;
			var player2Shown=(player2._name!=nameChonglouSp)?true:false;
			var player3Shown=(player3._name!=nameChonglouSp)?true:false;
			// var player4Shown=(player4._name!=nameChonglouSp)?true:false;
			if(player1Shown||player2Shown||player3Shown){
				addDialog(mainScene, new selectAdvPlayerDialogLayer(player1Shown,player2Shown, player3Shown, true,
						"请选择一名角色补2张手牌", false, false,function(result){
					textAreaAddMessage(result._name+"从牌堆中补了2张牌", myText, listView);
					advAddHandCard([result],result,result,null,[2],true,true,callBack);
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
			advAddHandCard([usePlayer],usePlayer,usePlayer,null,[2],true,true,callBack);
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

function advKuicetianjiEffect(usePlayer,callBack){
	longkuiRongzhuCardName=string_handCardNameKuicetianji;
	if(game_Bingxingjue==false){
		if(usePlayer._name==myControlPlayer._name){
			var tempArray=new Array();
			if(game_MonsterDeck.length>1){
				tempArray.push(game_MonsterDeck[1]);
			}
			tempArray.push(game_MonsterDeck[0]);
			addDialog(mainScene, new selectMonsterDialogLayer("请选择放置在最顶层的怪牌",tempArray,function(result){
				if(advTopMonsterCard(game_MonsterDeck[0]).name!=result.name){
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

function advToudaoEffect(usePlayer,callBack){
	longkuiRongzhuCardName=string_handCardNameToudao;
	var canUseToudao=false;
	for(var i=0;i<nowPlayerTerm.length;i++){
		if(nowPlayerTerm[i]._name!=usePlayer._name){
			if(nowPlayerTerm[i]._name!=nameChonglouSp&&
					nowPlayerTerm[i].handCard.length>0){
				canUseToudao=true;
				break;
			}
		}
	}
	if(game_Bingxingjue==false&&canUseToudao){
		if(usePlayer._name==myControlPlayer._name){
			var player1Shown=(player1._name!=myControlPlayer._name&&player1.handCard.length>0)?true:false;
			var player2Shown=(player2._name!=myControlPlayer._name&&player2.handCard.length>0)?true:false;
			var player3Shown=(player3._name!=myControlPlayer._name&&player3.handCard.length>0)?true:false;
			var bossShown=boss.handCard.length>0?true:false;
			if(player2Shown||player3Shown||bossShown){
				addDialog(mainScene, new selectAdvPlayerDialogLayer(player1Shown,player2Shown, player3Shown, bossShown,
						"请选择一名角色获得其手牌", false, false,function(result){
					mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,result.hadImageView,function(){
						var randomNum=parseInt(Math.random()*result.handCard.length, 10);
						var mubiaoCard=result.handCard[randomNum];
						result.handCard.removeObject(mubiaoCard);
						myControlPlayer.handCard.push(mubiaoCard);
						handCardZone.pushBackCustomItem(mubiaoCard);
						textAreaAddMessage(usePlayer._name+"获得"+result._name+"一张手牌", myText, listView,callBack);
					}));
				}));
			}else{
				game_Bingxingjue=false;
				textAreaAddMessage("【偷盗】效果无效", myText, listView,callBack);
			}
		}else{
			// AI选择【偷盗】目标
			var selectPlayer=null;
			if(usePlayer._name!=boss._name&&boss.handCard.length>0){
				selectPlayer=boss;
			}
			if(selectPlayer!=null&&selectPlayer.hp>0){
				mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,selectPlayer.hadImageView,function(){
					var tempNumber=parseInt(Math.random()*selectPlayer.handCard.length, 10);
					var card=selectPlayer.handCard[tempNumber];
					usePlayer.handCard.push(card);
					selectPlayer.handCard.removeObject(card);
					if(selectPlayer._name==myControlPlayer._name){
						card.removeFromParent();
					}
					textAreaAddMessage(usePlayer._name+"使用【偷盗】获得"+selectPlayer._name+"一张手牌", myText, listView,callBack);
				}));
			}else{
				game_Bingxingjue=false;
				textAreaAddMessage("【偷盗】效果无效", myText, listView,callBack);
			}
		}
	}else{
		game_Bingxingjue=false;
		textAreaAddMessage("【偷盗】效果无效", myText, listView,callBack);
	}
}


function advTongqianbiaoEffect(usePlayer,callBack){
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
		if(usePlayer._name==myControlPlayer._name){
			var player1Shown=(player1._name!=myControlPlayer._name&&(player1.handCard.length+baseEffectCountequment(player1))>0)?true:false;
			var player2Shown=((player2._name!=myControlPlayer._name)&&((player2.handCard.length+baseEffectCountequment(player2))>0))?true:false;
			var player3Shown=((player3._name!=myControlPlayer._name)&&(player3.handCard.length+baseEffectCountequment(player3)))>0?true:false;
			var bossShown=boss.handCard.length+baseEffectCountequment(boss)>0?true:false;
			addDialog(mainScene, new selectAdvPlayerDialogLayer(player1Shown,player2Shown, player3Shown, bossShown,
					"请选择一名角色", false, false,function(effectPlayer){
				mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,effectPlayer.hadImageView,function(){
					addDialog(mainScene, new selectCardTypeDialogLayer("请选择弃掉的牌",effectPlayer,function(cardTypeResult){
						switch (cardTypeResult) {
						case SelectCardType.ARMS1:
							textAreaAddMessage(usePlayer._name+"弃掉"+effectPlayer._name+"的武器【"+effectPlayer.arms1+"】", myText, listView, null);
							advRemove_Card_Into_DropDeck(effectPlayer.arms1);
							effectPlayer.arms1 = "无";
							effectPlayer.arms1Combat = 0;
							effectPlayer.arms1Extent = 0;
							break;
						case SelectCardType.ARMS2:
							textAreaAddMessage(usePlayer._name+"弃掉"+effectPlayer._name+"的武器【"+effectPlayer.arms2+"】", myText, listView, null);
							advRemove_Card_Into_DropDeck(effectPlayer.arms2);
							effectPlayer.arms2 = "无";
							effectPlayer.arms2Combat = 0;
							effectPlayer.arms2Extent = 0;
							break;
						case SelectCardType.DEFENSE:
							advRemove_Card_Into_DropDeck(effectPlayer.defense);
							textAreaAddMessage(usePlayer._name+"弃掉"+effectPlayer._name+"的防具【"+effectPlayer.defense+"】", myText, listView, null);
							effectPlayer.defense = "无";
							effectPlayer.defenseCombat = 0;
							effectPlayer.defenseExtent = 0;
							break;
						case SelectCardType.HANDCARD:
							var randomNum=parseInt(Math.random()*effectPlayer.handCard.length, 10);
							var mubiaoCard=effectPlayer.handCard[randomNum];
							textAreaAddMessage(usePlayer._name+"弃掉"+effectPlayer._name+"的一张手牌【"+mubiaoCard.name+"】", myText, listView, null);
							advRemove_Card_Into_DropDeck(mubiaoCard.name);
							effectPlayer.handCard.removeObject(mubiaoCard);
							break;
						case SelectCardType.ORNAMENT:
							addDialog(mainScene,new selectCardDialogLayer("请选择丢弃的饰品",effectPlayer.skillTempList,1,1,false,function(result){
								var card=result.pop();
								advRemove_Card_Into_DropDeck(card.name);
								effectPlayer.handCard.removeObject(card);
								effectPlayer.maxCombat--;
								textAreaAddMessage(usePlayer._name+"弃掉"+effectPlayer._name+"的一件饰品【"+card.name+"】", myText, listView, null);
							}));
							break;
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
			if(usePlayer._name!=boss._name){
				selectPlayer=boss;
			}
			// 先判断敌方是否有武器
			if (selectPlayer!=null&&selectPlayer.arms1!="无") {
				mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,selectPlayer.hadImageView,function(){
					textAreaAddMessage(usePlayer._name+"使用【铜钱镖】，弃置"+selectPlayer._name+"的武器【"+selectPlayer.arms1+"】", myText, listView);
					advRemove_Card_Into_DropDeck(nowPlayerTerm[i].arms1);
					selectPlayer.arms1 = "无";
					selectPlayer.arms1Combat = 0;
					selectPlayer.arms1Extent = 0;
				}));
				if(callBack!=null){
					callBack();
				}
			}
			// 再判断敌方是否有防具
			else if (boss.defense!="无") {
				mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,selectPlayer.hadImageView,function(){
					textAreaAddMessage(usePlayer._name+"使用【铜钱镖】弃掉"+selectPlayer._name+"的防具【"+selectPlayer.defense+"】", myText, listView);
					advRemove_Card_Into_DropDeck(selectPlayer.defense);
					selectPlayer.defense = "无";
					selectPlayer.defenseCombat = 0;
					selectPlayer.defenseExtent = 0;
				}));
				if(callBack!=null){
					callBack();
				}
			}
			// 敌方无装备，则弃掉其手牌
			else if (boss.handCard.length>0) {
				var tempNumber = 0;
				mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,selectPlayer.hadImageView,function(){
					tempNumber = parseInt(Math.random()*selectPlayer.handCard.length, 10);
					var card=selectPlayer.handCard[tempNumber];
					textAreaAddMessage(usePlayer._name+"使用【铜钱镖】弃掉"+selectPlayer._name+"一张手牌【"+card.name+"】", myText, listView);
					advRemove_Card_Into_DropDeck(card.name);
					selectPlayer.handCard.removeObject(card);
					if(callBack!=null){
						callBack();
					}
				}));
			}else{
				game_Bingxingjue=false;
				textAreaAddMessage("【铜钱镖】效果无效", myText, listView,callBack);
			}
		}
	}else{
		game_Bingxingjue=false;
		textAreaAddMessage("【铜钱镖】效果无效", myText, listView,callBack);
	}
}

function advWuqichaoyuanEffect(usePlayer,canDiandang,callBack){
	if(canDiandang){
		if(usePlayer._name==myControlPlayer._name){
			addDialog(mainScene, new ChooseZoneLayer("是否发动“典当”效果？",function(result){
				if(result){
					textAreaAddMessage(usePlayer._name+"发动【五气朝元】典当效果，从牌堆中补1张牌", myText, listView);
					advAddHandCard([usePlayer],usePlayer,usePlayer,null,[1],true,true,callBack);
				}else{
					advUseBingxingjue(usePlayer, usePlayer, function(){
						longkuiRongzhuCardName=string_handCardNameWuqichaoyuan;
						if(!game_Bingxingjue){
							textAreaAddMessage(usePlayer._name+"发动【五气朝元】效果，我方全体HP+1", myText, listView);
							for(var i=0;i<usePlayer.friendList.length;i++){
								if (usePlayer.friendList[i].hp != 0) {
									advBaseEffectAddHP(usePlayer.friendList[i]);
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
				if (usePlayer.friendList[i].hp != usePlayer.friendList[i].maxHP) {
					is_DianDang = false;
				}
			}
			if (is_DianDang) {
				// 典当
				textAreaAddMessage(usePlayer._name+"典当【五气朝元】，从牌堆中补1张牌", myText, listView);
				// newHandCard(randHandCardNumber(game_HandCard_Start,game_DropHandCard),usePlayer,
				// 1, true);
				advAddHandCard([usePlayer],usePlayer,usePlayer,null,[1],true,true,callBack);
				/*
				 * if(callBack!=null){ callBack(); }
				 */
			}else{
				advUseBingxingjue(usePlayer, usePlayer, function(){
					if(!game_Bingxingjue){
						textAreaAddMessage(usePlayer._name+"发动【五气朝元】效果，我方全体HP+1", myText, listView);
						for(var i=0;i<usePlayer.friendList.length;i++){
							if (usePlayer.friendList[i].hp != 0) {
								advBaseEffectAddHP(usePlayer.friendList[i]);
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
		advUseBingxingjue(usePlayer, usePlayer, function(){
			textAreaAddMessage(usePlayer._name+"发动【五气朝元】效果，我方全体HP+1", myText, listView);
			for(var i=0;i<usePlayer.friendList.length;i++){
				if (usePlayer.friendList[i].hp != 0) {
					advBaseEffectAddHP(usePlayer.friendList[i]);
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

//装备区中魔剑典当效果
function advMojianDiandangEffectInEqumentZone(callBack){
	if(myControlPlayer.arms1==string_handCardNameMojian||
			myControlPlayer.arms2==string_handCardNameMojian){
		addDialog(mainScene, new ChooseZoneLayer("是否典当【魔剑】补2张牌？",function(result){
			if(result){
				advRemove_Card_Into_DropDeck(string_handCardNameMojian);
				if (myControlPlayer.arms1==string_handCardNameMojian) {
					myControlPlayer.arms1 = "无";
					myControlPlayer.arms1Combat = 0;
					myControlPlayer.arms1Extent = 0;
				} else if (myControlPlayer.arms2==string_handCardNameMojian) {
					myControlPlayer.arms2 = "无";
					myControlPlayer.arms2Combat = 0;
					myControlPlayer.arms2Extent = 0;
				}
				advAddHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],
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

function shiziyaoshuoEffect(player,armNumber,callBack){
	var tempArmNumber=armNumber!=null?armNumber:1;
	advBaseEffectZhuangbeiArms(player,tempArmNumber, 1, 0, string_handCardNameShiziyaoshuo,callBack);
}

function tiangangdouyiEffect(player,callBack){
	baseEffectZhuangbeiDefenses(player, 1, 0, string_handCardNameTiangangdouyi,callBack);
}

function advPalyer1UseYingu(cardYingu,heartList,firstPlayer,usePlayer,heartNumberList,canUseLonghunzhankai,callBack,callBack2){
	addDialog(mainScene, new ChooseZoneLayer("是否使用隐蛊？",function(result){
		if(result){
			advRemove_Card_Into_DropDeck(cardYingu.name);
			usePlayer.handCard.removeObject(cardYingu);
			cardYingu.removeFromParent();
			advUseBingxingjue(usePlayer, usePlayer,function(){
				advYinguHandle(heartList,firstPlayer,usePlayer, result,heartNumberList,canUseLonghunzhankai, callBack,callBack2);
			},callBack2);
		}else{
			advYinguHandle(heartList,firstPlayer,usePlayer, result,heartNumberList,canUseLonghunzhankai, callBack,callBack2);
		}
	}));
}

//heartNumber 受到的伤害数值
//canUseLonghunzhankai 是否可以使用龙魂战铠
function advUseYingu(heartList,firstPlayer,usePlayer,heartNumberList,canUseLonghunzhankai,callBack,callBack2){
	var nextUsePlayerNumber=0;
	var cardYingu=null;
	var useYingu=false;
	var hasYingu=false;
	var hasTiandijifu=false;
	if(usePlayer._name==boss._name){
		if(boss.yinguList.length>0){
			textAreaAddMessage("魔主打出了【隐蛊】", myText, listView, function(){
				advUseBingxingjue(usePlayer, usePlayer,function(){
					advRemove_Card_Into_DropDeck(string_handCardNameYingu);
					boss.yinguList.pop();
					advYinguHandle(heartList,firstPlayer,usePlayer, true,heartNumberList,canUseLonghunzhankai, callBack,callBack2);
				});
			});
		}else{
			advYinguHandle(heartList,firstPlayer,usePlayer, false,heartNumberList,canUseLonghunzhankai, callBack,callBack2);
		}
	}else{
		if(heartList!=null&&heartList.length>0){
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
				if(usePlayer._name==myControlPlayer._name){
					if(hasTiandijifu){
						addDialog(mainScene, new ChooseZoneLayer("是否发动【天帝祭服】效果，将任意手牌当【隐蛊】使用？",function(result){
							if(result){
								addDialog(mainScene, new selectCardDialogLayer("请选择1张手牌当作【隐蛊】使用",usePlayer.handCard,1,1,false,function(select){
									var selectCard=select.pop();
									advRemove_Card_Into_DropDeck(selectCard.name);
									usePlayer.handCard.removeObject(selectCard);
									selectCard.removeFromParent();
									advUseBingxingjue(usePlayer, usePlayer,function(){
										advYinguHandle(heartList,firstPlayer,usePlayer, result,heartNumberList,canUseLonghunzhankai, callBack,callBack2);
									});
								}));
							}else{
								if(hasYingu){
									advPalyer1UseYingungu(cardYingu,heartList,firstPlayer,usePlayer,heartNumberList,canUseLonghunzhankai,callBack,callBack2);
								}else{
									advYinguHandle(heartList, firstPlayer, usePlayer, false, heartNumberList,canUseLonghunzhankai,callBack,callBack2);
								}
							}
						}));
					}else{
						addDialog(mainScene, new ChooseZoneLayer("是否使用隐蛊？",function(result){
							if(result){
								advRemove_Card_Into_DropDeck(cardYingu.name);
								usePlayer.handCard.removeObject(cardYingu);
								cardYingu.removeFromParent();
								advUseBingxingjue(usePlayer, usePlayer,function(){
									advYinguHandle(heartList,firstPlayer,usePlayer, result,heartNumberList,canUseLonghunzhankai, callBack,callBack2);
								},callBack2);
							}else{
								advYinguHandle(heartList,firstPlayer,usePlayer, result,heartNumberList,canUseLonghunzhankai, callBack,callBack2);
							}
						}));
					}
				}else{
					if(usePlayer._name!=boss._name&&hasYingu){
						// AI使用隐蛊
						useYingu=true;
						if(useYingu){
							advRemove_Card_Into_DropDeck(cardYingu.name);
							usePlayer.handCard.removeObject(cardYingu);
							textAreaAddMessage(usePlayer._name+"打出了【隐蛊】", myText, listView,function(){
								advUseBingxingjue(usePlayer, usePlayer, function(){
									advYinguHandle(heartList,firstPlayer,usePlayer, useYingu, heartNumberList,canUseLonghunzhankai,callBack,callBack2);
								},callBack2);
							});
						}
					}else{
						advYinguHandle(heartList, firstPlayer, usePlayer, false, heartNumberList,canUseLonghunzhankai,callBack,callBack2);
					}
				}
			}else{
				// 当前玩家没有隐蛊，先触发唐雨柔【咏圣调】效果
				advSkillCharacters_TangyurouYongshengdiao_yingu(heartList, firstPlayer, usePlayer, heartNumberList,canUseLonghunzhankai,callBack,callBack2)
				// yinguHandle(heartList, firstPlayer, usePlayer, false,
				// heartNumberList,canUseLonghunzhankai,callBack,callBack2);
			}
		}else if(callBack2!=null){
			callBack2();
		}
	}
}


function advYinguHandle(heartList,firstPlayer,effectPlayer,isUsedYingu,heartNumberList,canUseLonghunzhankai,callBack,callBack2){
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
			advUseYingu(heartList,firstPlayer,effectPlayer, heartNumberList,canUseLonghunzhankai,callBack,callBack2);
		}else{
			textAreaAddMessage(effectPlayer._name+"使用了【隐蛊】抵消本次伤害", myText, listView);
			var nextUsePlayerNumber=nowUsePlayerNumber+1;
			nextUsePlayerNumber%=heartList.length;
			if(heartList[nextUsePlayerNumber]._name!=firstPlayer._name){
				advUseYingu(heartList, firstPlayer, heartList[nextUsePlayerNumber], heartNumberList,canUseLonghunzhankai,callBack,callBack2);
			}else if(heartList[nextUsePlayerNumber]._name==firstPlayer._name&&callBack2!=null){
				callBack2();
			}
		}
	}else{
		callBack(effectPlayer,heartNumberList[nowUsePlayerNumber],canUseLonghunzhankai,function(){
			var nextUsePlayerNumber=nowUsePlayerNumber+1;
			nextUsePlayerNumber%=heartList.length;
			if(heartList[nextUsePlayerNumber]._name!=firstPlayer._name){
				advUseYingu(heartList, firstPlayer, heartList[nextUsePlayerNumber], heartNumberList,canUseLonghunzhankai,callBack,callBack2);
			}else if(heartList[nextUsePlayerNumber]._name==firstPlayer._name&&callBack2!=null){
				callBack2();
			}
		});
	}
}

function advTianxuanwuyinEffect(usePlayer,callBack){
	if(game_Bingxingjue){
		game_Bingxingjue=false;
		textAreaAddMessage("【天玄五音】效果无效", myText, listView,callBack);
	}else{
		if(usePlayer._name==myControlPlayer._name){
			addDialog(mainScene, new selectCampDialogLayer("请选择增加战力的一方",function(result){
				tianxuanwuyinHandle(result);
			}));
		}else{
			// AI选择天玄五音效果
			tianxuanwuyinHandle(cardEffectAITianxuanwuyin(usePlayer));
			sleep(callBack);
		}
	}
}

function advJincanwangEffect(usePlayer,callBack){
	var shenfeng = 0; // 用于判断使用者为什么身份 1：触发方 2：怪物方
	var canUseJincanwang=false;
	if(game_Bingxingjue){
		game_Bingxingjue=false;
		textAreaAddMessage("【金蚕王】效果无效", myText, listView,callBack);
	}else{
		// 处理金蚕王效果
		if(usePlayer._name==nowPlayerTerm[nowPlayerNumber]._name){
			shenfeng=1;
			canUseJincanwang=true;
		}else if((usePlayer.joinAttack||usePlayer._name==nameTangyurou)&&advAttactIsMiss(usePlayer, fight_FirstMonster)){
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
			textAreaAddMessage(usePlayer._name+"的【金蚕王】没有效果", myText, listView,callBack);
		}else{
			baseEffectAddTempCombat(usePlayer, 3);
			textAreaAddMessage(usePlayer._name+"使用了【金蚕王】，自身战力+3", myText, listView);
			if (shenfeng == 1) {
				triggerCombat += 3;
			} else if (shenfeng == 2) {
				monsterCombat += 3;
			}
			sleep(callBack);
		}
	}
}

function advTiangangzhanqiEffect(usePlayer,callBack){
	var shenfeng = 0; // 用于判断使用者为什么身份 1：触发方 2：怪物方
	var canUseTiangangzhanqi=false;
	if(game_Bingxingjue){
		game_Bingxingjue=false;
		textAreaAddMessage("【天罡战气】效果无效", myText, listView,callBack);
	}else{
		if(usePlayer._name==nowPlayerTerm[nowPlayerNumber]._name){
			shenfeng=1;
			canUseTiangangzhanqi=true;
		}else if((usePlayer.joinAttack||usePlayer._name==nameTangyurou)&&advAttactIsMiss(usePlayer,fight_FirstMonster)){
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
			baseEffectAddTempCombat(usePlayer, usePlayer.combat-usePlayer.tempAddCombat);
			if(shenfeng==1){
				triggerCombat += usePlayer.combat
			}else if(shenfeng==2){
				monsterCombat += usePlayer.combat;
			}
			textAreaAddMessage(usePlayer._name+"使用【天罡战气】，自身战力加倍", myText, listView,callBack);
		}else{
			textAreaAddMessage("【天罡战气】效果无效", myText, listView,callBack);
		}
	}
}

function advJinchantuoqiaoEffect(usePlayer,callBack){
	if(!game_Bingxingjue&&(usePlayer.joinAttack||usePlayer._name==nameTangyurou)){
		textAreaAddMessage(usePlayer._name+"使用【金蝉脱壳】，强制结束本场打怪", myText, listView);
		sleep(function(){
			nextStep=5;
			advRoundAttackEnd();
		});
	}else{
		game_Bingxingjue=false;
		textAreaAddMessage("【金蝉脱壳】效果无效", myText, listView,callBack);
	}
}

function soubaoshuEffect(usePlayer,callBack){
	longkuiRongzhuCardName=string_handCardNameSoubaoshu;
	if(game_Bingxingjue){
		game_Bingxingjue=false;
		textAreaAddMessage("【搜宝鼠】效果无效", myText, listView,callBack);
	}else{
		var tempList=[];
		for (var i = 0; i < 5; i++) {
			tempList.push(randomGetHandCard(randHandCardNumber(
					game_HandCard_Start,
					game_DropHandCard)));
		}
		if(usePlayer._name==myControlPlayer._name){
			addDialog(mainScene, new selectCardDialogLayer("请选择要分配的第1张牌（共3张）",tempList,1,1,false,function(selectCard){
				var resultCard=selectCard.pop();
				tempList.removeObject(resultCard);
				addDialog(mainScene, new selectAdvPlayerDialogLayer(true,true, true, true,
						"请选择给予的角色", false, false,function(selectPlayer){
					selectPlayer.handCard.push(resultCard);
					if(selectPlayer._name==myControlPlayer._name){
						handCardZone.pushBackCustomItem(resultCard);
					}
					textAreaAddMessage(selectPlayer._name+"获得【"+resultCard.name+"】", myText, listView, function(){
						addDialog(mainScene, new selectCardDialogLayer("请选择要分配的第2张牌（共3张）",tempList,1,1,false,function(selectCard){
							var resultCard=selectCard.pop();
							tempList.removeObject(resultCard);
							addDialog(mainScene, new selectAdvPlayerDialogLayer(true,true,true,true,"请选择要给予的角色",false,false,function(selectPlayer){
								selectPlayer.handCard.push(resultCard);
								if(selectPlayer._name==myControlPlayer._name){
									handCardZone.pushBackCustomItem(resultCard);
								}
								textAreaAddMessage(selectPlayer._name+"获得【"+resultCard.name+"】", myText, listView, function(){
									addDialog(mainScene, new selectCardDialogLayer("请选择要分配的第3张牌（共3张）",tempList,1,1,false,function(selectCard){
										var resultCard=selectCard.pop();
										tempList.removeObject(resultCard);
										for(var i=0;i<tempList.length;i++){
											advRemove_Card_Into_DropDeck(tempList[i].name);
										}
										addDialog(mainScene, new selectAdvPlayerDialogLayer(true,true,true,true,"请选择要给予的角色",false,false,function(selectPlayer){
											selectPlayer.handCard.push(resultCard);
											if(selectPlayer._name==myControlPlayer._name){
												handCardZone.pushBackCustomItem(resultCard);
											}
											textAreaAddMessage(selectPlayer._name+"获得【"+resultCard.name+"】", myText, listView);
										}));
									}));
								});
							}));
						}));
					});
				}));
			}));
		}else{
			// AI进行【搜宝鼠】的效果
			textAreaAddMessage(usePlayer._name+"获得3张牌", myText, listView);
			for(var i=0;i<tempList.length;i++){
				if(i<3){
					usePlayer.handCard.push(tempList[i]);
				}else{
					advRemove_Card_Into_DropDeck(tempList[i].name);
					textAreaAddMessage("弃置【"+tempList[i].name+"】", myText, listView);
				}
			}
			if(callBack!=null){
				callBack();
			}
		}
	}
}


function jimushuiEffect(usePlayer,callBack){
	longkuiRongzhuCardName=string_handCardNameJimushui;
	if(game_Bingxingjue||game_MonsterDeck.length==0){
		game_Bingxingjue=false;
		textAreaAddMessage("【极目水】效果无效", myText, listView,callBack);
	}else{
		var tempList=[];
		for(var i=0;i<3;i++){
			if(game_MonsterDeck.length>0){
				tempList.push(game_MonsterDeck.shift());
			}
		}
		if(usePlayer._name==myControlPlayer._name){
			addDialog(mainScene, new ChooseOrDropMonsterDialogLayer("请按先后顺序选择返回牌堆的怪牌(未选择的牌会被弃置)",tempList,function(resultList){
				for(var i=0;i<resultList.length;i++){
					game_MonsterDeck.unshift(resultList[i].uid);
					tempList.removeObject(resultList[i].uid);
				}
				for(var i=0;i<tempList.length;i++){
					game_MonsterDropDeck.removeObject(tempList[i]);;
				}
			}));
		}else{
			// AI决定极目水的效果
			textAreaAddMessage("等待队友查看并排列怪物牌的顺序", myText, listView, function(){
				for(var i=tempList.length-1;i>=0;i--){
					game_MonsterDeck.unshift(tempList[i]);
				}
				if(callBack!=null){
					callBack();
				}
			});
		}
	}
}

function tianjianEffect(usePlayer,callBack){
	longkuiRongzhuCardName=string_handCardNameTianjian;
	if(game_Bingxingjue==false){
		if(usePlayer._name==myControlPlayer._name){
			var player1Shown=(player1._name!=nameChonglouSp)?true:false;
			var player2Shown=(player2._name!=nameChonglouSp)?true:false;
			var player3Shown=(player3._name!=nameChonglouSp)?true:false;
			// var player4Shown=(player4._name!=nameChonglouSp)?true:false;
			addDialog(mainScene, new selectAdvPlayerDialogLayer(player1Shown,player2Shown, player3Shown, true,
					"请选择【天剑】的目标,令其HP-4", false, false,function(effectPlayer){
				mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,effectPlayer.hadImageView,function(){
					var array=new Array();
					array.push(effectPlayer);
					if(effectPlayer.defense==string_handCardNameQiankundaopao){
						textAreaAddMessage(effectPlayer._name+"由于【乾坤道袍】效果，免疫技牌导致的伤害", myText, listView,function(){
							if(callBack!=null){
								callBack();
							}

						});
					}else{
						advUseYingu(array,effectPlayer,effectPlayer,[4],true,advBaseEffectReduceHPEffect,function(){
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
			// 队友AI处理天剑效果
			if (usePlayer._name!=boss._name) {
				selectPlayer =boss;
				mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,selectPlayer.hadImageView,function(){
					if(selectPlayer.defense==string_handCardNameQiankundaopao){
						textAreaAddMessage(selectPlayer._name+"由于【乾坤道袍】效果，免疫技牌导致的伤害", myText, listView,function(){
							if(callBack!=null){
								callBack();
							}
						});
					}else{
						advUseYingu([selectPlayer], selectPlayer, selectPlayer, [4], true, advBaseEffectReduceHPEffect,function(){
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
		}
	}else{
		textAreaAddMessage("【天剑】效果无效", myText, listView);
		game_Bingxingjue=false;
		if(callBack!=null){
			callBack();
		}
	}
}



function jiushenEffect(usePlayer,callBack){
	if(game_Bingxingjue){
		game_Bingxingjue=false;
		textAreaAddMessage("【酒神】效果无效", myText, listView);
		if(callBack!=null){
			callBack();
		}
	}else{
		if(usePlayer._name==myControlPlayer._name){
			addDialog(mainScene, new selectCampDialogLayer("请选择增加战力的一方",function(result){
				jiushenHandle(result);
			}));
		}else{
			// AI选择酒神效果
			jiushenHandle(cardEffectAITianxuanwuyin(usePlayer));
			if(callBack!=null){
				callBack();
			}
		}
	}
}

function jiushenHandle(result){
	if(result==CAMP.CHUFAFANG){
		textAreaAddMessage("触发方战力+5",myText,listView);
		for (var i = 0; i < 5; i++){
			triggerCombat++;
		}
	}else if(result==CAMP.GUAIWUFANG){
		textAreaAddMessage("怪物方战力+5",myText,listView);
		for (var i = 0; i < 5; i++){
			monsterCombat++;
		}
	}
}



function xiukoujinxinzhouEffect(usePlayer,callBack){
	var xiukoujinxinzhouList=[];
	for(var i=0;i<game_MonsterDropDeck.length;i++){
		if(advTopMonsterCard(game_MonsterDropDeck[i]).level!="危机"){
			xiukoujinxinzhouList.push(game_MonsterDropDeck[i]);
		}
	}
	if(game_Bingxingjue||xiukoujinxinzhouList.length==0){
		game_Bingxingjue=false;
		textAreaAddMessage("【绣口锦心咒】效果无效", myText, listView);
		if(callBack!=null){
			callBack();
		}
	}else{
		if(usePlayer._name==myControlPlayer._name){
			addDialog(mainScene, new selectMonsterDialogLayer("请选择1张弃置的怪物牌或NPC牌，用其触发混战",xiukoujinxinzhouList,function(result){
				for(var i=0;i<boss.monsterList.length;i++){
					if(boss.monsterList[i].name==result.name){
						boss.monsterList.removeObject(result);
						advSkillCharacters_ZhaolingerMengshe();
						break;
					}
				}
				game_MonsterDropDeck.removeObject(result.uid);
				game_MonsterDeck.unshift(result.uid);
				nextStep=3;
				advHunzhanHandle(true);
			}));
		}else{
			// AI选择秀口锦心咒的效果
			if(callBack!=null){
				callBack();
			}
		}
	}
}


function kaoyaEffect(usePlayer,callBack){
	if(game_Bingxingjue){
		game_Bingxingjue=false;
		textAreaAddMessage("【烤鸭】效果无效", myText, listView);
		if(callBack!=null){
			callBack();
		}
	}else{
		if(usePlayer._name==myControlPlayer._name){
			addDialog(mainScene, new selectNumberDialogLayer("请选择要扣除的HP数量（您的战力将会增加此数量的2倍）",usePlayer.hp,function(result){
				advBaseEffectReduceHPEffect(usePlayer, result, true, function(){
					triggerCombat -= usePlayer.combat
					baseEffectAddTempCombat(usePlayer, result*2);
					triggerCombat += usePlayer.combat
					textAreaAddMessage(usePlayer._name+"损失"+result+"点HP，战力增加"+2*result+"点", myText, listView);
				},false);
			}));
		}else{
			// AI选择烤鸭增加的战力效果
			if(callBack!=null){
				callBack();
			}
		}
	}
}



//callBack1为魔主当前翻开牌的原本效果；
//callBack2为魔主翻完所有手牌以后的操作；
function useWulingjingxie(player,canUseWulingJingxie,callBack1,callBack2){
	var wulingjingxie=null;
	for(var i=0;i<player.handCard.length;i++){
		if(player.handCard[i].name==string_handCardNameWulingjingxie){
			wulingjingxie=player.handCard[i];
			break;
		}
	}
	if(canUseWulingJingxie&&wulingjingxie!=null){
		if(player._name==myControlPlayer._name){
			addDialog(mainScene, new ChooseZoneLayer("是否使用【五灵净邪】,令魔主本次所有牌全部无效？",function(result){
				if(result==true){
					advRemove_Card_Into_DropDeck(wulingjingxie.name);
					player.handCard.removeObject(wulingjingxie);
					wulingjingxie.removeFromParent();
					advUseBingxingjue(player, player, function(){
						wulingjingxieEffect(callBack2);
					});
				}else{
					callBack1();
				}
			}));
		}else{
			// AI决定是否使用【五灵净邪】
			callBack1();
		}
	}else{
		if(player._name!=player3._name){
			useWulingjingxie(player.friendList[1],canUseWulingJingxie,callBack1,callBack2);
		}else{
			callBack1();
		}
	}
}

function wulingjingxieEffect(callBack){
	for(var i=0;i<boss.handCard.length;i++){
		var cardName=boss.handCard[i].name;
		textAreaAddMessage(boss._name+"翻出了【"+cardName+"】，由于【五灵净邪】效果，此牌无效", myText, listView, function(){
			advRemove_Card_Into_DropDeck(cardName);
		});
	}
	boss.handCard=new Array();
	callBack();
}



function tianxiangxumingluHandle(player,callBack){
	textAreaAddMessage(player._name+"HP+5", myText, listView,function(){
		for(var i=0;i<5;i++){
			advBaseEffectAddHP(player)
		}
		has_Tianshezhang(player);
		if(callBack!=null){
			callBack();
		}
	});
}

function tianxiangxumingluEffect(usePlayer,callBack){
	if(game_Bingxingjue==false){
		if(usePlayer._name==myControlPlayer._name){
			addDialog(mainScene, new selectAdvPlayerDialogLayer(true,true, true, true,
					"请选择一名角色HP+5", false, false,function(selectPlayer){
				tianxiangxumingluHandle(selectPlayer,callBack)
			}));
		}else{
			// AI确定天香续命露的目标
			tianxiangxumingluHandle(usePlayer,callBack);
		}
	}else{
		game_Bingxingjue=false;
		textAreaAddMessage("【天香续命露】效果无效", myText, listView,callBack);
	}
}

function huanmeihuazhouEffect(usePlayer,callBack){
	var crisisCardList=[];
	if(guanyinmizhenList.length>0){
		crisisCardList.push(47);
	}
	for(var i=0;i<boss.lingquanList.length;i++){
		crisisCardList.push(46);
	}
	if(tantadeqiongdingMark==1){
		crisisCardList.push(48);
	}
	if(game_Bingxingjue==false&&crisisCardList.length>0){
		if(usePlayer._name==myControlPlayer._name){
			addDialog(mainScene, new selectMonsterDialogLayer("请弃置1张尚未生效的危机牌",crisisCardList,function(selectCard){
				switch(selectCard.uid){
				case 46:
					textAreaAddMessage(usePlayer._name+"弃置魔主一张【灵泉】，魔主战力永久-2", myText, listView);
					boss.lingquanList.pop();
					boss.maxCombat-=2;
					break;
				case 47:
					var mubiaoPlayer=guanyinmizhenList.pop();
					textAreaAddMessage(usePlayer._name+"弃置"+mubiaoPlayer._name+"的【观音迷阵】，恢复其正常补牌", myText, listView);
					break;
				case 48:
					textAreaAddMessage(usePlayer._name+"弃置【坍塌的穹顶】，其尚未生效的效果无效", myText, listView);
					tantadeqiongdingMark=0;
					break;
				}
				// 从弃牌堆中选一张牌
				var tempCardList=[];
				for(var i=0;i<game_DropHandCard.length;i++){
					tempCardList.push(randomGetHandCard(game_DropHandCard[i]));
				}
				game_DropHandCard=new Array();
				if(tempCardList.length>0){
					addDialog(mainScene, new selectCardDialogLayer("幻魅画轴:请从弃牌堆忠选择1张牌作为手牌",tempCardList,1,1,false,function(selectCard){
						var card=selectCard.pop();
						usePlayer.handCard.push(card);
						handCardZone.pushBackCustomItem(card);
						tempCardList.removeObject(card);
						for(var i=0;i<tempCardList.length;i++){
							advRemove_Card_Into_DropDeck(tempCardList[i].name);
						}
					}));
				}
			}));
		}else{
			// AI确定幻魅画轴的目标
			callBack();
		}
	}else{
		game_Bingxingjue=false;
		textAreaAddMessage("【幻魅画轴】效果无效", myText, listView,callBack);
	}
}

//armNumber是装备为第几把武器，默认为第一把，双剑技能可设置为第二把
function advCaihuanEffect(player,armNumber,callBack){
	var tempArmNumber=armNumber!=null?armNumber:1;
	advBaseEffectZhuangbeiArms(player,tempArmNumber, 0, 2, string_handCardNameCaihuan,callBack);
}

function advTianshezhangEffect(player,armNumber,callBack){
	var tempArmNumber=armNumber!=null?armNumber:1;
	advBaseEffectZhuangbeiArms(player,tempArmNumber, 1, 0, string_handCardNameTianshezhang,callBack);
}

function advWuchenjianEffect(player,armNumber,callBack){
	var tempArmNumber=armNumber!=null?armNumber:1;
	advBaseEffectZhuangbeiArms(player,tempArmNumber, 1, 1, string_handCardNameWuchenjian,callBack);
}

function advModaotianzhaEffect(player,armNumber,callBack){
	var tempArmNumber=armNumber!=null?armNumber:1;
	advBaseEffectZhuangbeiArms(player,tempArmNumber, 2, 0, string_handCardNameModaotianzha,callBack);
}

function advMojianEffect(player,armNumber,callBack){
	var tempArmNumber=armNumber!=null?armNumber:1;
	advBaseEffectZhuangbeiArms(player,tempArmNumber, 0, 1, string_handCardNameMojian,callBack);
}

function advQiankundaopaoEffect(player,callBack){
	baseEffectZhuangbeiDefenses(player,1, 0, string_handCardNameQiankundaopao,callBack);
}

function advLonghunzhankaiEffect(player,callBack){
	baseEffectZhuangbeiDefenses(player,0, 0, string_handCardNameLonghunzhankai,callBack);
}

function advTiandijifuEffect(player,callBack){
	baseEffectZhuangbeiDefenses(player,0, 0, string_handCardNameTiandijifu,callBack);
}

function advTayunxueEffect(player,callBack){
	baseEffectZhuangbeiDefenses(player,0, 1, string_handCardNameTayunxue,callBack);
}

function advWucaixiayiEffect(player,callBack){
	baseEffectZhuangbeiDefenses(player,1, 0, string_handCardNameWucaixiayi,callBack);
}
