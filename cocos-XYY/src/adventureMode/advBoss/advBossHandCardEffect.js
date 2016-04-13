function bossLinghuxiandanEffect(callBack){
	if(game_Bingxingjue==false){
		textAreaAddMessage(Text.addHp.format(boss._name,2), myText, listView,function(){
			for(var i=0;i<2;i++){
				baseEffectAddHP(boss)
			}
			has_Tianshezhang(boss);
			if(callBack!=null){
				callBack();
			}
		});
	}else{
		game_Bingxingjue=false;
		textAreaAddMessage(Text.cardNotEffect.format(string_handCardNameLinghuxiandan), myText, listView,callBack);
	}
}

function bossWuqichaoyuanEffect(callBack){
	if(game_Bingxingjue==false){
		textAreaAddMessage(Text.addHp.format(boss._name,1), myText, listView,function(){
			baseEffectAddHP(boss)
			has_Tianshezhang(boss);
			if(callBack!=null){
				callBack();
			}
		});
	}else{
		game_Bingxingjue=false;
		textAreaAddMessage(Text.cardNotEffect.format(string_handCardNameWuqichaoyuan), myText, listView,callBack);
	}
}

function bossTianleipoEffect(callBack){
	if(game_Bingxingjue==false){
		textAreaAddMessage(Text.reduceHp.format(nowPlayerTerm[nowPlayerNumber]._name,2), myText, listView,function(){
			if(nowPlayerTerm[nowPlayerNumber].defense==string_handCardNameQiankundaopao){
				textAreaAddMessage(Text.qiankundaopaoEffect.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView,callBack);
			}else{
				advUseYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [2], true, advBaseEffectReduceHPEffect,function(){
					advSkillCharactersTangxuejianZhuida(function(){
						heartList=new Array();
						if(callBack!=null){
							callBack();
						}
					});
				});
			}
		});
	}else{
		game_Bingxingjue=false;
		textAreaAddMessage(ext.cardNotEffect.format(string_handCardNameTianleipo), myText, listView,callBack);
	}
}

function bossTongqianbiaoEffect(callBack){
	if(game_Bingxingjue==false){
		if(nowPlayerTerm[nowPlayerNumber].handCard.length+baseEffectCountequment(nowPlayerTerm[nowPlayerNumber])>0){
			if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name){
				mainScene.addChild(new AttackTargetLayer(boss.hadImageView,myControlPlayer,function(){
					addDialog(mainScene, new selectCardTypeDialogLayer(Text.chooseDropCard,nowPlayerTerm[nowPlayerNumber],function(cardTypeResult){
						switch (cardTypeResult) {
						case SelectCardType.ARMS1:
							textAreaAddMessage(Text.dropArm.format(nowPlayerTerm[nowPlayerNumber]._name,nowPlayerTerm[nowPlayerNumber].arms1), myText, listView);
							remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].arms1);
							nowPlayerTerm[nowPlayerNumber].arms1 = Text.nil;
							nowPlayerTerm[nowPlayerNumber].arms1Combat = 0;
							nowPlayerTerm[nowPlayerNumber].arms1Extent = 0;
							sleep(callBack);
							break;
						case SelectCardType.ARMS2:
							textAreaAddMessage(Text.dropArm.format(nowPlayerTerm[nowPlayerNumber]._name,nowPlayerTerm[nowPlayerNumber].arms2), myText, listView);
							remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].arms2);
							nowPlayerTerm[nowPlayerNumber].arms2 = Text.nil;
							nowPlayerTerm[nowPlayerNumber].arms2Combat = 0;
							nowPlayerTerm[nowPlayerNumber].arms2Extent = 0;
							sleep(callBack);
							break;
						case SelectCardType.DEFENSE:
							remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].defense);
							textAreaAddMessage(Text.dropDefense.format(nowPlayerTerm[nowPlayerNumber]._name,nowPlayerTerm[nowPlayerNumber].defense), myText, listView);
							nowPlayerTerm[nowPlayerNumber].defense = Text.nil;
							nowPlayerTerm[nowPlayerNumber].defenseCombat = 0;
							nowPlayerTerm[nowPlayerNumber].defenseExtent = 0;
							sleep(callBack);
							break;
						case SelectCardType.HANDCARD:
							addDialog(mainScene, new selectCardDialogLayer(Text.chooseDropHandCard,nowPlayerTerm[nowPlayerNumber].handCard,1,1,false,function(selectCard){
								var card=selectCard.pop();
								textAreaAddMessage(Text.dropCard.format(nowPlayerTerm[nowPlayerNumber]._name,card.name), myText, listView);
								remove_Card_Into_DropDeck(card.name);
								nowPlayerTerm[nowPlayerNumber].handCard.removeObject(card);
								card.removeFromParent();
								sleep(callBack);
							}));
							break;
						case SelectCardType.ORNAMENT:
							addDialog(mainScene,new selectCardDialogLayer(Text.chooseDropOrnament,nowPlayerTerm[nowPlayerNumber].skillTempList,1,1,false,function(result){
								var card=result.pop();
								remove_Card_Into_DropDeck(card.name);
								effectPlayer.handCard.removeObject(card);
								effectPlayer.maxCombat--;
								textAreaAddMessage(Text.dropOrnament.format(nowPlayerTerm[nowPlayerNumber]._name,card.name), myText, listView,callBack);
							}));
							break;
						}
					}));
				}));
			}else{
				//队友AI作为触发者时选择丢牌
				if(nowPlayerTerm[nowPlayerNumber].handCard.length>0){
					var card=nowPlayerTerm[nowPlayerNumber].handCard[parseInt(Math.random()*nowPlayerTerm[nowPlayerNumber].handCard.length, 10)];
					textAreaAddMessage(Text.dropCard.format(nowPlayerTerm[nowPlayerNumber]._name,card.name), myText, listView, function(){
						remove_Card_Into_DropDeck(card.name);
						nowPlayerTerm[nowPlayerNumber].handCard.removeObject(card);
						callBack();
					});
				}else if(nowPlayerTerm[nowPlayerNumber].arms1!=Text.nil){
					textAreaAddMessage(Text.dropArm.format(nowPlayerTerm[nowPlayerNumber]._name,nowPlayerTerm[nowPlayerNumber].arms1), myText, listView);
					remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].arms1);
					nowPlayerTerm[nowPlayerNumber].arms1 = Text.nil;
					nowPlayerTerm[nowPlayerNumber].arms1Combat = 0;
					nowPlayerTerm[nowPlayerNumber].arms1Extent = 0;
					sleep(callBack);
				}else if(nowPlayerTerm[nowPlayerNumber].defense!=Text.nil){
					remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].defense);
					textAreaAddMessage(Text.dropDefense.format(nowPlayerTerm[nowPlayerNumber]._name,nowPlayerTerm[nowPlayerNumber].defense), myText, listView);
					nowPlayerTerm[nowPlayerNumber].defense = Text.nil;
					nowPlayerTerm[nowPlayerNumber].defenseCombat = 0;
					nowPlayerTerm[nowPlayerNumber].defenseExtent = 0;
					sleep(callBack);
				}else if(nowPlayerTerm[nowPlayerNumber]._name==nameWangpengxu&&nowPlayerTerm[nowPlayerNumber].skillTempList.length>0){
					var card=nowPlayerTerm[nowPlayerNumber].handCard[parseInt(Math.random()*nowPlayerTerm[nowPlayerNumber].skillTempList.length, 10)];
					textAreaAddMessage(Text.dropOrnament.format(nowPlayerTerm[nowPlayerNumber]._name,card.name), myText, listView, function(){
						remove_Card_Into_DropDeck(card.name);
						nowPlayerTerm[nowPlayerNumber].maxCombat--;
						nowPlayerTerm[nowPlayerNumber].skillTempList.removeObject(card);
						callBack();
					});
				}
			}
		}else{
			textAreaAddMessage(Text.cardNotEffect.format(string_handCardNameTongqianbiao), myText, listView,callBack);
		}
	}else{
		game_Bingxingjue=false;
		textAreaAddMessage(Text.cardNotEffect.format(string_handCardNameTongqianbiao), myText, listView,callBack);
	}
}


function bossToudaoEffect(callBack){
	if(game_Bingxingjue==false){
		if(nowPlayerTerm[nowPlayerNumber].handCard.length>0){
			if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name){
				addDialog(mainScene, new selectCardDialogLayer(Text.chooseHandCardGiveBoss,myControlPlayer.handCard,1,1,false,function(resultList){
					var card=resultList.pop();
					boss.handCard.push(card);
					myControlPlayer.handCard.removeObject(card);
					card.removeFromParent();
					if(callBack!=null){
						callBack();
					}
				}));
			}else{
				//队友AI选择一张手牌给魔主
				var card=nowPlayerTerm[nowPlayerNumber].handCard[parseInt(Math.random()*nowPlayerTerm[nowPlayerNumber].handCard.length, 10)];
				nowPlayerTerm[nowPlayerNumber].handCard.removeObject(card);
				boss.handCard.push(card);
				if(callBack!=null){
					callBack();
				}
			}
		}else{
			textAreaAddMessage(Text.cardNotEffect.format(string_handCardNameToudao), myText, listView,callBack);
		}
	}else{
		game_Bingxingjue=false;
		textAreaAddMessage(Text.cardNotEffect.format(string_handCardNameToudao), myText, listView,callBack);
	}
}

function bossShuerguoEffect(callBack){
	if(game_Bingxingjue==false){
		textAreaAddMessage(Text.addHandCard.format(boss._name,2), myText, listView);
		advAddHandCard([boss],boss,boss,null,[2],true,true,function(){
			var tempCard1=boss.handCard[boss.handCard.length-1];
			var tempCard2=boss.handCard[boss.handCard.length-2];
			boss.handCard.removeObject(tempCard1);
			boss.handCard.removeObject(tempCard2);
			boss.handCard.unshift(tempCard1);
			boss.handCard.unshift(tempCard2);
			if(callBack!=null){
				callBack();
			}
		});
	}else{
		game_Bingxingjue=false;
		textAreaAddMessage(Text.cardNotEffect.format(string_handCardNameShuerguo), myText, listView,callBack);
	}
}

function bossTiangangzhanqiEffect(callBack){
	if(game_Bingxingjue==false){
		monsterCombat -= boss.combat;
		baseEffectAddTempCombat(boss, boss.combat-boss.tempAddCombat);
		monsterCombat += boss.combat;
		textAreaAddMessage(Text.tiangangzhanqiUsing.format(boss._name), myText, listView,callBack);
	}else{
		game_Bingxingjue=false;
		textAreaAddMessage(Text.cardNotEffect.format(string_handCardNameTiangangzhanqi), myText, listView,callBack);
	}
}

function bossTianxuanwuyinEffect(callBack){
	if(game_Bingxingjue==false){
		monsterCombat += 2;
		textAreaAddMessage(Text.bossUseTianxuanwuyin.format(boss._name), myText, listView,callBack);
	}else{
		game_Bingxingjue=false;
		textAreaAddMessage(Text.cardNotEffect.format(string_handCardNameTianxuanwuyin), myText, listView,callBack);
	}
}

function bossJincanwangEffect(callBack){
	if(game_Bingxingjue==false){
		baseEffectAddTempCombat(boss, 3);
		monsterCombat += 3;
		textAreaAddMessage(Text.bossUseJincanwang.format(boss._name), myText, listView,callBack);
	}else{
		game_Bingxingjue=false;
		textAreaAddMessage(Text.cardNotEffect.format(string_handCardNameJincanwang), myText, listView,callBack);
	}
}

function bossJinchantuoqiaoEffect(callBack1,callBack2){
	if(game_Bingxingjue==false){
		textAreaAddMessage(Text.bossUseJinchantuoqiao.format(boss._name), myText, listView,callBack1);
	}else{
		game_Bingxingjue=false;
		textAreaAddMessage(Text.cardNotEffect.format(string_handCardNameJinchantuoqiao), myText, listView,callBack2);
	}
}

function bossMojianEffect(callBack){
	baseEffectZhuangbeiArms(boss,1, 0, 1, string_handCardNameMojian,callBack);
}

function bossModaotianzhaEffect(callBack){
	baseEffectZhuangbeiArms(boss,1, 2, 0, string_handCardNameModaotianzha,callBack);
	monsterCombat+=2;
}

function bossWuchenjianEffect(callBack){
	baseEffectZhuangbeiArms(boss,1, 1, 1, string_handCardNameWuchenjian,callBack);
	monsterCombat+=1;
}

function bossTianshezhangEffect(callBack){
	baseEffectZhuangbeiArms(boss,1, 1, 0, string_handCardNameTianshezhang,callBack);
	monsterCombat+=1;
}

function bossCaihuanEffect(callBack){
	baseEffectZhuangbeiArms(boss,1, 0, 2, string_handCardNameCaihuan,callBack);
}