function advIsDeath(player,canHelp,callBack){
	if(player.hp==0){
		if(canHelp){
			advUseTianxiangxuminglu(player,player1,function(){
				if(player.hp==0){
					advUseLinghuxiandan(player, player, function(){
						if(player.hp==0){
							if(player.defense==string_handCardNameWucaixiayi){
								advAskWucaixiayi(player,callBack);
							}else{
								// 没有五彩霞衣的情况
								advAskDiejing(player,player,callBack);
							}
						}else{
							callBack();
						}
					});
				}else{
					callBack();
				}
			});
		}
	}
}

function advAskWucaixiayi(player,callBack){
	if(player._name==myControlPlayer._name){
		addDialog(mainScene, new ChooseZoneLayer("是否爆发【五彩霞衣】复活？",function(result){
			if(result){
				advDropWucaixiayiHandle(player,callBack);
			}else{
				advAskDiejing(player,player,callBack);
			}
		}));
	}else{
		// AI决定是否爆发五彩霞衣
		var baofaWucaixiayi=true;
		if(baofaWucaixiayi){
			advDropWucaixiayiHandle(player,callBack);
		}else{
			advAskDiejing(player,player,callBack);
		}
	}
}

function advDropWucaixiayiHandle(player,callBack){
	if(fight_Trigger.length>0){
		player.defense+="(爆发)";
	}else{
		advRemove_Card_Into_DropDeck(string_handCardNameWucaixiayi);
		player.defense = "无";
		player.defenseCombat = 0;
		player.defenseExtent = 0;
	}
	player.hp = 2;
	has_Tianshezhang(player);
	textAreaAddMessage(player._name+"爆发【五彩霞衣】，HP+2", myText, listView);
	if(callBack!=null){
		callBack();
	}
}

function advAskDiejing(deathPlayer,askDiejingPlayer,callBack){
	var haveDiejingPlayer=null;
	if(askDiejingPlayer.pet_FengMonster!=null&&askDiejingPlayer.pet_FengMonster.name==nameDiejing){
		haveDiejingPlayer=askDiejingPlayer;
		if(haveDiejingPlayer._name==myControlPlayer._name){
			addDialog(mainScene, new ChooseZoneLayer("是否爆发蝶精？",function(result){
				if(result){
					advDiejingHandle(deathPlayer, askDiejingPlayer, 1,callBack);
				}else{
					// 玩家不爆发蝶精
					advDiejingHandle(deathPlayer, askDiejingPlayer, 2,callBack);
				}
			}));
		}else if(haveDiejingPlayer._name!=boss._name){
			// AI决定是否爆发蝶精
			var baofaDiejing=false;
			if(baofaDiejing){
				advDiejingHandle(deathPlayer, askDiejingPlayer, 1,callBack);
			}else{
				advDiejingHandle(deathPlayer, askDiejingPlayer, 2,callBack);
			}
		}else{
			callBack();
		}
	}
	if(!haveDiejingPlayer){
		advDiejingHandle(deathPlayer, askDiejingPlayer, 3,callBack);
	}
}

function advDropDiejingHandle(deathPlayer,haveDiejingPlayer,callBack){
	deathPlayer.hp = deathPlayer.maxHP;
	/*
	 * MonsterModel.updata_PetsEffect( friend.pet_FengMonster, friend, context);
	 */
	if(fight_Trigger.length>0){
		haveDiejingPlayer.pet_FengMonster.name+="(爆发)";
	}else{
		haveDiejingPlayer.pet_Feng = "风系宠物";
		haveDiejingPlayer.pet_FengMonster = null;
	}
	textAreaAddMessage(haveDiejingPlayer._name+"爆发【蝶精】，"+deathPlayer._name+"HP回满", myText, listView);
	advSkillCharacters_ZhaolingerMengshe();
	if(callBack!=null){
		callBack();
	}
}

//startPlayer:濒死的玩家
//nextPlayer:询问是否蝶精的玩家
//result=1:用了蝶精 2:有但是没用蝶精 
//3:没有蝶精
function advDiejingHandle(startPlayer,nextPlayer,result,callBack){
	if(startPlayer._name!=boss._name){
		switch (result) {
		case 1:
			advDropDiejingHandle(startPlayer, nextPlayer,callBack);
			break;
		case 2:
			// 有但不想用蝶精，下一步处理
			advLoveEffect(startPlayer,callBack);
			break;
		case 3:
			if(startPlayer._name==nextPlayer.friendList[1]._name){
				// 我方阵营没有人都蝶精，下一步处理
				advLoveEffect(startPlayer,callBack);
			}else{
				advAskDiejing(startPlayer, nextPlayer.friendList[1],callBack);
			}
			break;
		}
	}else{
		advHandleDeath(startPlayer,callBack);
	}
}

function advLoveEffect(deathPlayer,callBack){
	if(!deathPlayer.loverEffect){
		if(deathPlayer._name==nameBaiyuejiaozhu){
			var hasShuimoshou=false;
			for (var i=0;i<nowPlayerTerm.length;i++) {
				if (nowPlayerTerm[i].pet_Shui==nameShuimoshou) {
					hasShuimoshou=true;
					deathPlayer.loverEffect = true;
					textAreaAddMessage("拜月教主发动倾慕效果", myText, listView);
					textAreaAddMessage("拜月教主HP+1", myText, listView);
					advBaseEffectAddHP(deathPlayer);
					break;
				}
			}
			if(hasShuimoshou&&callBack!=null){
				callBack();
			}else{
				advHandleDeath(deathPlayer, callBack);
			}
		}else if(deathPlayer._name==nameMurongziying){
			if(deathPlayer._name==myControlPlayer._name){
				// 玩家指定慕容紫英的钦慕者
				addDialog(mainScene, new selectAdvPlayerDialogLayer(false,true, true, true,
						"请指定一名倾慕者", true, false,function(result){
					if(result==null){
						deathPlayer.lover1="无";
					}else{
						deathPlayer.lover1=result._name;
					}
					advHandleLoveEffect(deathPlayer,callBack);
				}));
			}else{
				// AI指定慕容紫英的倾慕者
				deathPlayer.lover1="无";
				advHandleLoveEffect(deathPlayer,callBack);
			}
		}else{
			advHandleLoveEffect(deathPlayer,callBack);
		}
	}else{
		advHandleDeath(deathPlayer,callBack);
	}
}

function advDigui(playerList,nowNumber,maxNumber,callBack){
	nowNumber++;
	if(nowNumber<maxNumber){
		advBaseEffectReduceHPEffect(playerList[nowNumber], 1, false, function(){
			advDigui(playerList, nowNumber, maxNumber,callBack);
		},false);
	}else if(callBack!=null){
		callBack();
	}
}

function advHandleLoveEffect(deathPlayer,callBack){
	var tempQinmuList=new Array();
	for(var i=0;i<nowPlayerTerm.length;i++){
		if((nowPlayerTerm[i].hp>0)&&(nowPlayerTerm[i]._name==deathPlayer.lover1||nowPlayerTerm[i]._name==deathPlayer.lover2
				||nowPlayerTerm[i]._name==deathPlayer.lover3||nowPlayerTerm[i]._name==deathPlayer.lover4)){
			deathPlayer.loverEffect = true;
			textAreaAddMessage(deathPlayer._name+"发动倾慕效果："+nowPlayerTerm[i]._name+"HP-1", myText, listView);
			textAreaAddMessage(deathPlayer._name+"HP+1", myText, listView);
			advBaseEffectAddHP(deathPlayer);
			tempQinmuList.push(nowPlayerTerm[i]);
		}
	}
	if(tempQinmuList.length>0){
		var index=0;
		advBaseEffectReduceHPEffect(tempQinmuList[index], 1, false,function(){
			advDigui(tempQinmuList, index,tempQinmuList.length,callBack);
		});
	}else{
		advHandleDeath(deathPlayer,callBack);
	}
}

function advHandleDeath(deathPlayer,callBack){
	if(deathPlayer.hp==0){
		textAreaAddMessage(deathPlayer._name+"阵亡", myText, listView, function(){
			// 孔璘【生命献祭】技能
			if (deathPlayer._name==nameKonglin) {
				advSkillCharacters_KonglinShengmingxianji(deathPlayer);
				if(callBack!=null){
					callBack();
				}
				return;
				// 魔主【蛇妖男】替换成【狐妖女】
			}else if(deathPlayer._name==boss._name&&deathPlayer._name==bossNameSheyaonan){
				sheyaonanToHuyaonv(deathPlayer);
				if(callBack!=null){
					callBack();
				}
				return;
			} else {
				// 韩菱纱【盗墓】技能
				advSkillCharacters_HanlinshaDaomu(deathPlayer, function(){
					for (var i=0;i<deathPlayer.handCard.length;i++) {
						advRemove_Card_Into_DropDeck(deathPlayer.handCard[i].name);
					}
					if (deathPlayer._name==myControlPlayer._name) {
						handCardZone.removeAllItems();
					}
					if (deathPlayer.skillTempList.length > 0) {
						if(deathPlayer._name==nameWangpengxu){
							deathPlayer.maxCombat-=deathPlayer.skillTempList.length;
						}
						for (var i=0;i<deathPlayer.skillTempList.length;i++) {
							if(deathPlayer._name==nameWangpengxu){
								advRemove_Card_Into_DropDeck(
										deathPlayer.skillTempList[i].name);
							}
							if(deathPlayer._name!=nameMoyi){
								deathPlayer.skillTempList[i].release();
							}
						}
						deathPlayer.skillTempList=new Array();
					}
					advRemove_Card_Into_DropDeck(deathPlayer.arms1);
					advRemove_Card_Into_DropDeck(deathPlayer.arms2);
					advRemove_Card_Into_DropDeck(deathPlayer.defense);
				}, function(){
					deathPlayer.skillTempList=new Array();
					deathPlayer.handCard=new Array();
					deathPlayer.arms1 = "无";
					deathPlayer.arms2 = "无";
					deathPlayer.defense = "无";
					deathPlayer.tempCombat = deathPlayer.combat;
					deathPlayer.arms1Combat = 0;
					deathPlayer.arms1Combat = 0;
					deathPlayer.arms1Extent = 0;
					deathPlayer.arms2Combat = 0;
					deathPlayer.arms2Extent = 0;
					deathPlayer.defenseCombat = 0;
					deathPlayer.defenseExtent = 0;
					deathPlayer.petsCombat = 0;
					deathPlayer.petsExtent = 0;
					deathPlayer.tempAddCombat = 0;
					deathPlayer.tempAddExtent = 0;
					deathPlayer.skillAddCombat = 0;
					deathPlayer.skillAddExtent = 0;
					deathPlayer.tempZhuangbeiSkillCombat = 0;
					deathPlayer.tempZhuangbeiSkillExtent = 0;
					/*
					 * if (deathPlayer._name=="龙葵") { longkui_Jianling=new
					 * Array(); }
					 */
					// 柳梦璃【梦傀儡】技能
					if (deathPlayer._name==nameLiumengli) {
						advSkillCharacters_LiumengliMengkuilei(deathPlayer);
						// * 柳梦璃【妖王】技能（死亡退场时后续处理）
						advSkillCharacters_LiumengliYaowangEnd(deathPlayer);
					} else{
						advSkillCharacters_MoyiSuohun(deathPlayer);
						// deathPlayer.hadImageView.setOpacity(255);
						// deathPlayer.deathImageView.setVisible(true);
						deathPlayer.hadImageView.loadTexture(deathPlayer.playerDeathPicSrc);
					}
					/*
					 * if (deathPlayer._name==nameMoyi){ suoHunList=new
					 * Array(); }
					 */
					advUpdate_PetsEffect(deathPlayer.pet_FengMonster, deathPlayer);
					deathPlayer.pet_FengMonster = null;
					deathPlayer.pet_Feng = "风系宠物";

					advUpdate_PetsEffect(deathPlayer.pet_LeiMonster, deathPlayer);
					deathPlayer.pet_LeiMonster = null;
					deathPlayer.pet_Lei = "雷系宠物";

					advUpdate_PetsEffect(deathPlayer.pet_ShuiMonster, deathPlayer);
					deathPlayer.pet_ShuiMonster = null;
					deathPlayer.pet_Shui = "水系宠物";

					advUpdate_PetsEffect(deathPlayer.pet_HuoMonster, deathPlayer);
					deathPlayer.pet_HuoMonster = null;
					deathPlayer.pet_Huo = "火系宠物";

					advUpdate_PetsEffect(deathPlayer.pet_TuMonster, deathPlayer);
					deathPlayer.pet_TuMonster = null;
					deathPlayer.pet_Tu = "土系宠物";
					// 赵灵儿【梦蛇】效果
					advSkillCharacters_ZhaolingerMengshe();
					if (deathPlayer._name!=boss._name) {
						var gameOver=true;
						for(var i=0;i<deathPlayer.friendList.length;i++){
							if(deathPlayer.friendList[i].hp>0){
								gameOver=false;
								break;
							}
						}
						if (gameOver!=true) {
							if (deathPlayer._name==myControlPlayer._name) {
								handCardZone.removeAllItems();
							}
							var addHandCardPlayer=getLivePlayerRandom(deathPlayer);
							textAreaAddMessage(addHandCardPlayer._name+"补牌2张", myText, listView);
							advAddHandCard([addHandCardPlayer],addHandCardPlayer,addHandCardPlayer,null,[2],true,true,function(){
								advSkillCharacters_MoyiDipai(deathPlayer);
								// Skill_Characters.moyi_Dipai(context);
								if (deathPlayer._name==nowPlayerTerm[nowPlayerNumber]._name) {
									nextStep = 7;
								}
								if(callBack!=null){
									callBack();
								}
							});
						} else {
							textAreaAddMessage("我方全体阵亡，游戏失败", myText, listView);
							nextStep=10;
							buttonManager(order1Button, false, false);
							buttonManager(order2Button, false, false);
						}
					} else if (boss.hp==0) {
						textAreaAddMessage("魔主阵亡，我方获胜", myText, listView);
						nextStep=10;
						buttonManager(order1Button, false, false);
						buttonManager(order2Button, false, false);
						advWin();
					} else {
						// 角色死亡后，其队友补牌
						var temPlayer = deathPlayer.friendList[1];
						textAreaAddMessage(temPlayer._name+"补牌2张", myText, listView);
						addHandCard([temPlayer],temPlayer,temPlayer,null,[2],true,true,function(){
							skillCharacters_MoyiDipai(deathPlayer);
							// Skill_Characters.moyi_Dipai(context);
							if(callBack!=null){
								callBack();
							}
						});

					}
				});
			}
		});
	}else{
		if(callBack!=null){
			callBack();
		}
	}
}

function advUseTianxiangxuminglu(deathPlayer,askPlayer,callBack){
	var cardTianxiangxuminglu=null;
	for(var i=0;i<askPlayer.handCard.length;i++){
		if(askPlayer.handCard[i].name==string_handCardNameTianxiangxuminglu){
			cardTianxiangxuminglu=askPlayer.handCard[i];
			break;
		}
	}
	if(cardTianxiangxuminglu!=null){
		if(askPlayer._name==myControlPlayer._name){
			addDialog(mainScene, new ChooseZoneLayer("是否对"+deathPlayer._name+"使用天香续命露？",function(result){
				if(result){
					advRemove_Card_Into_DropDeck(cardTianxiangxuminglu.name);
					askPlayer.handCard.removeObject(cardTianxiangxuminglu);
					cardTianxiangxuminglu.removeFromParent();
					dropCardXueshouDuying(askPlayer,function(){
						advUseBingxingjue(askPlayer, askPlayer, function(){
							advAskTianxiangxumingluHandle(deathPlayer,askPlayer,callBack);
						});
					},callBack);
				}else{
					callBack();
				}
			}));
		}else{
			advRemove_Card_Into_DropDeck(cardTianxiangxuminglu.name);
			askPlayer.handCard.removeObject(cardTianxiangxuminglu);
			dropCardXueshouDuying(askPlayer, function(){
				advAskTianxiangxumingluHandle(deathPlayer,askPlayer,callBack);
			}, callBack)
		}
	}else{
		if(askPlayer._name!=player3._name){
			advUseTianxiangxuminglu(deathPlayer,askPlayer.friendList[1],callBack);
		}else{
			callBack();
		}
	}
}

function advAskTianxiangxumingluHandle(deathPlayer,askPlayer,callBack){
	if(!game_Bingxingjue){
		textAreaAddMessage(askPlayer._name+"使用了【天香续命露】，\n"+deathPlayer._name+"HP+5", myText, listView);
		deathPlayer.hp=5;
		has_Tianshezhang(deathPlayer);
		callBack();
	}else{
		game_Bingxingjue=false;
		callBack();
	}
}

//startPlayer:死亡求灵葫仙丹的玩家
//usedPlayer:当前需要检测灵狐的玩家
function advUseLinghuxiandan(startPlayer,usedPlayer,callBack){
	advSkillCharacters_XingxuanPengrenWhenDeath(startPlayer,usedPlayer,function(){
		var cardLinghuxiandan=null;
		var hasLinghuxiandan=false;
		var usedResult=false;
		for(var i=0;i<usedPlayer.handCard.length;i++){
			if(usedPlayer._name!=boss._name&&usedPlayer.handCard[i].name==string_handCardNameLinghuxiandan){
				cardLinghuxiandan=usedPlayer.handCard[i];
				hasLinghuxiandan=true;
				if(usedPlayer._name==myControlPlayer._name){
					addDialog(mainScene, new ChooseZoneLayer("是否对"+startPlayer._name+"使用灵葫仙丹？",function(result){
						if(result){
							usedResult=true;
							advRemove_Card_Into_DropDeck(cardLinghuxiandan.name);
							usedPlayer.handCard.removeObject(cardLinghuxiandan);
							cardLinghuxiandan.removeFromParent();
							dropCardXueshouDuying(usedPlayer,function(){
								advUseBingxingjue(usedPlayer, usedPlayer, function(){
									advLinghuxiandanHandle(startPlayer, usedPlayer,null,callBack);
								});
							},callBack);
						}else{
							advLinghuxiandanHandle(startPlayer,usedPlayer,1,callBack);
						}
					}));
				}else{
					// AI决定是否出灵葫仙丹
					var shouldUseLinghuxiandan=false;
					if(shouldUseLinghuxiandan){
						advRemove_Card_Into_DropDeck(cardLinghuxiandan.name);
						usedPlayer.handCard.removeObject(cardLinghuxiandan);
						dropCardXueshouDuying(usedPlayer,function(){
							advUseBingxingjue(usedPlayer,usedPlayer , function(){
								advLinghuxiandanHandle(startPlayer, usedPlayer,null,callBack);
							});
						},callBack);
					}else{
						advLinghuxiandanHandle(startPlayer, usedPlayer,1,callBack);
					}
				}
				break;
			}
		}
		if(!hasLinghuxiandan){
			advLinghuxiandanHandle(startPlayer,usedPlayer,2,callBack);
		}
	},callBack);
}

//hasLinghuxiandan=null：有灵狐且用了
//hasLinghuxiandan=1：有灵狐但没用
//hasLinghuxiandan=2：
function advLinghuxiandanHandle(startPlayer,usedPlayer,hasLinghuxiandan,callBack){
	if(hasLinghuxiandan==null){
		if(!game_Bingxingjue){
			textAreaAddMessage(usedPlayer._name+"使用了【灵葫仙丹】，\n"+startPlayer._name+"HP+2", myText, listView);
			startPlayer.hp=2;
			has_Tianshezhang(startPlayer);
			callBack();
		}else{
			game_Bingxingjue=false;
			advUseLinghuxiandan(startPlayer, usedPlayer,callBack);
			return;
		}
	}else{
		var nextNumber=0;
		for(var i=0;i<nowPlayerTerm.length;i++){
			if(nowPlayerTerm[i]._name==usedPlayer._name){
				nextNumber=i+1;
				nextNumber%=nowPlayerTerm.length;
				break;
			}
		}
		if(nowPlayerTerm[nextNumber]._name!=startPlayer._name){
			advUseLinghuxiandan(startPlayer, nowPlayerTerm[nextNumber],callBack);
		}else{
			callBack();
		}
	}
}

function advCountResult(tempPlayer) {
	var countResult = 0;
	if (tempPlayer.hp > 0) {
		if (tempPlayer.pet_FengMonster != null) {
			if (tempPlayer.skillNameList.containsObject(skillnameShensheng)) {
				tempPlayer.pet_FengMonster.finalMark += 3;
			}
			countResult += tempPlayer.pet_FengMonster.finalMark;
		}
		if (tempPlayer.pet_LeiMonster != null) {
			if (tempPlayer.skillNameList.containsObject(skillnameShensheng)) {
				tempPlayer.pet_LeiMonster.finalMark += 3;
			}
			countResult += tempPlayer.pet_LeiMonster.finalMark;
		}
		if (tempPlayer.pet_ShuiMonster != null) {
			if (tempPlayer.skillNameList.containsObject(skillnameShensheng)) {
				tempPlayer.pet_ShuiMonster.finalMark += 3;
			}
			countResult += tempPlayer.pet_ShuiMonster.finalMark;
		}
		if (tempPlayer.pet_HuoMonster != null) {
			if (tempPlayer.skillNameList.containsObject(skillnameShensheng)) {
				tempPlayer.pet_HuoMonster.finalMark += 3;
			}
			countResult += tempPlayer.pet_HuoMonster.finalMark;
		}
		if (tempPlayer.pet_TuMonster != null) {
			if (tempPlayer.skillNameList.containsObject(skillnameShensheng)) {
				tempPlayer.pet_TuMonster.finalMark += 3;
			}
			countResult += tempPlayer.pet_TuMonster.finalMark;
		}
	}
	return countResult;
}

function advWin(){
	textAreaAddMessage("挑战成功！", myText, listView,function(){
		nowStage.stageClear(function(){
			nowStage.stageSpecialRequirement(function(){
				nowStage.stageSpecialAward(function(){
					var nextStageId=nowStage.nextStageId;
					if(nextStageId!=null){
						saveNewStageIdToLocalStorage(nextStageId);
						nowStage=stageManager(nextStageId);
						addDialog(mainScene, new yesOrNoDialogLayer("是否挑战下一关卡？",function(result){
							if(result){
								mainScene.release();
								mainScene=null;
								cc.director.runScene(new cc.TransitionFade(1.0,new AdvGameScene()));
							}
						}));
					}else{
						textAreaAddMessage("恭喜您已完成当前所有关卡", myText, listView);
					}
				});
			});
		});
	});
}


function advJudgeWinorLose() {
	if (game_MonsterDeck.length == 0) {
		if(boss._name==bossNameJiangshili){
			textAreaAddMessage("本关只有魔主死亡这一种胜利方式，未达成，挑战失败！", myText, listView);
			gameRunning = false;
			nextStep=10;
			buttonManager(order1Button, false, false);
			buttonManager(order2Button, false, false);
			return true;
		}else if(boss._name==bossNameMoyiYanshiqiongbing){
			playerScore = 0, bossScore = 0;
			textAreaAddMessage("怪物牌翻取完毕，游戏结束计算我方与魔主的分数", myText, listView,function(){
				playerScore += advCountResult( player1);
				playerScore += advCountResult(player2);
				playerScore += advCountResult( player3);
				bossScore += advCountResult( boss);
				textAreaAddMessage("我方分数为："+playerScore, myText, listView,function(){
					textAreaAddMessage("魔主分数为："+bossScore, myText, listView,function(){
						if (playerScore-bossScore>=30) {
							advWin();
						}else{
							textAreaAddMessage("玩家分数并未超过魔主分数30分或以上，挑战失败！", myText, listView);
						}
					});
				});
			});
			gameRunning = false;
			nextStep=10;
			buttonManager(order1Button, false, false);
			buttonManager(order2Button, false, false);
			return true;
		}else{
			var playerScore = 0;
			textAreaAddMessage("怪物牌翻取完毕，游戏结束计算我方分数", myText, listView);
			playerScore += advCountResult( player1);
			playerScore += advCountResult(player2);
			playerScore += advCountResult( player3);
			textAreaAddMessage("我方分数为："+playerScore, myText, listView);
			textAreaAddMessage("过关要求分数为："+nowStage.stageWinScore, myText, listView);
			if (playerScore >=nowStage.stageWinScore) {
				advWin();
			} else if (playerScore < nowStage.stageWinScore){
				textAreaAddMessage("挑战失败！", myText, listView);
			}
			gameRunning = false;
			nextStep=10;
			buttonManager(order1Button, false, false);
			buttonManager(order2Button, false, false);
			return true;
		}
	}
	return false;
}

function advBaofa_Tayunxue(player,callBack,callBack2,canUseTayunxue){
	var canUseTayunxueEffect=canUseTayunxue==null?true:canUseTayunxue;
	if(canUseTayunxueEffect){
		if(player.hp>0&&player.defense==string_handCardNameTayunxue){
			if(player._name==myControlPlayer._name){
				addDialog(mainScene, new ChooseZoneLayer("是否爆发【踏云靴】免疫本次伤害？",function(result){
					if(result){
						if(fight_Trigger.length>0){
							player.defense+="(爆发)";
						}else{
							advRemove_Card_Into_DropDeck(player.defense);
							player.defense = "无";
							player.defenseExtent = 0;
						}
						advBaseEffectAddHP(player);
						textAreaAddMessage(player._name+"爆发【踏云靴】免疫本次伤害，并恢复1点HP", myText, listView,function(){
							has_Tianshezhang(player);
							callBack2();
						});
					}else{
						callBack();
					}
				}));
			}else{
				var baofaResult=false;
				// AI决定是否爆发踏云靴
				if(baofaResult){
					advRemove_Card_Into_DropDeck(player.defense);
					player.defense = "无";
					player.defenseExtent = 0;
					advBaseEffectAddHP(player);
					textAreaAddMessage(player._name+"爆发【踏云靴】免疫本次伤害，并恢复1点HP", myText, listView,function(){
						has_Tianshezhang(player);
						callBack2();
					});
				}else{
					callBack();
				}
			}
		}else{
			callBack();
		}
	}else{
		callBack();
	}
}


//判断该角色是否命中
function advAttactIsMiss(player,monster) {
	var tempPlayer = nowPlayerTerm[nowPlayerNumber];
	if (tempPlayer.skillNameList.containsObject(skillnameYuexingzhishu)
			&& fight_Trigger.length>1&&fight_Trigger[1]._name==player._name){
		// textAreaAddMessage("龙幽“越行之术”效果触发，支援者强制命中", myText, listView);
		return true;
	}
	else{
		return player.extent >= monster.dodge;
	}
}


//决定哪方出战牌
function advJudgeWhoUseFightCard(callBack) {
	// 魔主翻牌
	// cc.log("魔主要翻牌了");
	bossUseHandCard(true,function(){
		textAreaAddMessage("触发方使用战牌", myText, listView);
		// 先由我方队友使用战牌
		advAiUseSkillBeforeUsingFightCard(function(){
			advBaseAIUseFightCard(0, myControlPlayer.friendList[1],function(){
				advAiUseSkillBeforeUsingFightCard(function(){
					advBaseAIUseFightCard(0,myControlPlayer.friendList[2],callBack);
				});
			});
		});
	});
}

//callBack1:危机牌本身的效果
//callBack2:跳过危机牌效果之后应该做的操作
function askHuanmeihuazhou(player,callBack1,callBack2){
	var cardHuanmeihuazhou=null;
	for(var i=0;i<player.handCard.length;i++){
		if(player.handCard[i].name==string_handCardNameHuanmeihuazhou){
			cardHuanmeihuazhou=player.handCard[i];
			break;
		}
	}
	if(cardHuanmeihuazhou!=null){
		if(player._name==myControlPlayer._name){
			addDialog(mainScene, new ChooseZoneLayer("是否使用【幻魅画轴】令本次危机牌无效？",function(result){
				if(result){
					textAreaAddMessage(player._name+"打出了【幻魅画轴 】", myText, listView, function(){
						advUseBingxingjue(player, player, function(){
							askHuanmeihuazhouHandle(cardHuanmeihuazhou,player,callBack1,callBack2);
						});
					});
				}else{
					if(callBack1!=null){
						callBack1();
					}
				}
			}));
		}else{
			// AI决定是否使用幻魅画轴
			textAreaAddMessage(player._name+"打出了【幻魅画轴 】", myText, listView, function(){
				advUseBingxingjue(player, player, function(){
					askHuanmeihuazhouHandle(cardHuanmeihuazhou,player,callBack1,callBack2);
				});
			});

		}
	}else{
		if(player._name!=player3._name){
			askHuanmeihuazhou(player.friendList[1],callBack1,callBack2);
		}else{
			if(callBack1!=null){
				callBack1();
			}
		}
	}
}
//callBack1:危机牌本身的效果
//callBack2:跳过危机牌效果之后应该做的操作
function askHuanmeihuazhouHandle(cardHuanmeihuazhou,player, callBack1,callBack2){
	if(!game_Bingxingjue){
		textAreaAddMessage(player._name+"使用【幻魅画轴】效果，使本次危机牌效果无效", myText, listView);
		// 先从弃牌堆中选一张牌
		var tempCardList=[];
		for(var i=0;i<game_DropHandCard.length;i++){
			tempCardList.push(randomGetHandCard(game_DropHandCard[i]));
		}
		game_DropHandCard=new Array();
		if(tempCardList.length>0){
			if(player._name==myControlPlayer._name){
				addDialog(mainScene, new selectCardDialogLayer("幻魅画轴:请从弃牌堆忠选择1张牌作为手牌",tempCardList,1,1,false,function(selectCard){
					var card=selectCard.pop();
					player.handCard.push(card);
					handCardZone.pushBackCustomItem(card);
					tempCardList.removeObject(card);
					for(var i=0;i<tempCardList.length;i++){
						advRemove_Card_Into_DropDeck(tempCardList[i].name);
					}
					advRemove_Card_Into_DropDeck(cardHuanmeihuazhou.name);
					player.handCard.removeObject(cardHuanmeihuazhou);
					cardHuanmeihuazhou.removeFromParent();
					if(callBack2!=null){
						callBack2();
					}
				}));
			}else{
				// AI挑选一张手牌
				var number=game_DropHandCard.pop();
				player.handCard.push(randomGetHandCard(number));
				advRemove_Card_Into_DropDeck(cardHuanmeihuazhou.name);
				player.handCard.removeObject(cardHuanmeihuazhou);
				cardHuanmeihuazhou.removeFromParent();
				if(callBack2!=null){
					callBack2();
				}
			}
		}else {
			advRemove_Card_Into_DropDeck(cardHuanmeihuazhou.name);
			player.handCard.removeObject(cardHuanmeihuazhou);
			if(player._name==myControlPlayer._name){
				cardHuanmeihuazhou.removeFromParent();
			}
			if(callBack2!=null){
				callBack2();
			}
		}

	}else{
		textAreaAddMessage("【幻魅画轴】无效", myText, listView);
		game_Bingxingjue=false;
		advRemove_Card_Into_DropDeck(cardHuanmeihuazhou.name);
		player.handCard.removeObject(cardHuanmeihuazhou);
		if(player._name==myControlPlayer._name){
			cardHuanmeihuazhou.removeFromParent();
		}
		if(callBack1!=null){
			callBack1();
		}
	}
}


function advJudgeIsFriend(player){
	var isFriend=false;
	if(player._name==player1._name||player._name==player2._name||player._name==player3._name){
		isFriend=true;
	}
	return isFriend;
}

function advJudgeZhaolingerIsLive(){
	var result=false;
	for(var i=0;i<nowPlayerTerm.length;i++){
		if(nowPlayerTerm[i].hp>0&&nowPlayerTerm[i]._name==nameZhaolinger){
			result=true;
			break;
		}
	}
	return result;
}