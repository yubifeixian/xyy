function judgetDeath(player,heartPlayerList,callBack,isNotLoverEffect){
	var nowIndex=0;
	for(var i=0;i<heartPlayerList.length;i++){
		if(heartPlayerList[i]._name==player._name){
			nowIndex=i;
			break;
		}
	}
	nextIndex=nowIndex+1;
	nextIndex%=heartPlayerList.length;
	if(nextIndex==0){
		afterDeathHanle(heartPlayerList[0],heartPlayerList,callBack,isNotLoverEffect);
	}else{
		isDeath(heartPlayerList[nextIndex], heartPlayerList, true, callBack,isNotLoverEffect);
	}
}

function isDeath(player,heartPlayerList,canHelp,callBack,isNotLoverEffect){
	if(!player.isDeath&&player.hp==0){
		//景天【大团圆】效果
		skillCharacter_JingtianDatuanyuan(player, function(){
			if(canHelp){
				useLinghuxiandan(player, player, function(){
					if(player.hp==0){
						if(player.defense==string_handCardNameWucaixiayi){
							askWucaixiayi(player,function(){
								judgetDeath(player, heartPlayerList, callBack,isNotLoverEffect);
							});
						}else{
							// 没有五彩霞衣的情况
							askDiejing(player,player,function(){
								judgetDeath(player, heartPlayerList, callBack,isNotLoverEffect);
							});
						}
					}else{
						judgetDeath(player, heartPlayerList, callBack,isNotLoverEffect);
					}
				});
			}
		});
	}else{
		judgetDeath(player, heartPlayerList, callBack,isNotLoverEffect);
	}
}

function askWucaixiayi(player,callBack){
	if(player._name==player1._name){
		addDialog(mainScene, new ChooseZoneLayer("是否爆发【五彩霞衣】复活？",function(result){
			if(result){
				dropWucaixiayiHandle(player,callBack);
			}else{
				askDiejing(player,player,callBack);
			}
		}));
	}else{
		// AI决定是否爆发五彩霞衣
		var baofaWucaixiayi=true;
		if(baofaWucaixiayi){
			dropWucaixiayiHandle(player,callBack);
		}else{
			askDiejing(player,player,callBack);
		}
	}
}

function dropWucaixiayiHandle(player,callBack){
	if(fight_Trigger.length>0){
		player.defense+="(爆发)";
	}else{
		remove_Card_Into_DropDeck(string_handCardNameWucaixiayi);
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

function askDiejing(deathPlayer,askDiejingPlayer,callBack){
	var haveDiejingPlayer=null;
	if(askDiejingPlayer.pet_FengMonster!=null&&askDiejingPlayer.pet_FengMonster.name==nameDiejing){
		haveDiejingPlayer=askDiejingPlayer;
		if(haveDiejingPlayer._name==player1._name){
			addDialog(mainScene, new ChooseZoneLayer("是否爆发蝶精？",function(result){
				if(result){
					diejingHandle(deathPlayer, askDiejingPlayer, 1,callBack);
				}else{
					// 玩家不爆发蝶精
					diejingHandle(deathPlayer, askDiejingPlayer, 2,callBack);
				}
			}));
		}else{
			// AI决定是否爆发蝶精
			var baofaDiejing=false;
			if(baofaDiejing){
				diejingHandle(deathPlayer, askDiejingPlayer, 1,callBack);
			}else{
				diejingHandle(deathPlayer, askDiejingPlayer, 2,callBack);
			}
		}
	}
	if(!haveDiejingPlayer){
		diejingHandle(deathPlayer, askDiejingPlayer, 3,callBack);
	}
}

function dropDiejingHandle(deathPlayer,haveDiejingPlayer,callBack){
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
	skillCharacters_ZhaolingerMengshe();
	if(callBack!=null){
		callBack();
	}
}

// startPlayer:濒死的玩家
// nextPlayer:询问是否蝶精的玩家
// result=1:用了蝶精 2:有但是没用蝶精 3:没有蝶精
function diejingHandle(startPlayer,nextPlayer,result,callBack){
	switch (result) {
	case 1:
		dropDiejingHandle(startPlayer, nextPlayer,callBack);
		break;
	case 2:
		// 有但不想用蝶精，下一步处理
		loveEffect(startPlayer,callBack);
		break;
	case 3:
		if(startPlayer._name==nextPlayer.friendList[1]._name){
			// 我方阵营没有人都蝶精，下一步处理
			loveEffect(startPlayer,callBack);
		}else{
			askDiejing(startPlayer, nextPlayer.friendList[1],callBack);
		}
		break;
	}
}

function loveEffect(deathPlayer,callBack){
	if(!deathPlayer.loverEffect){
		if(deathPlayer._name==nameBaiyuejiaozhu){
			var hasShuimoshou=false;
			for (var i=0;i<nowPlayerTerm.length;i++) {
				if (nowPlayerTerm[i].pet_Shui==nameShuimoshou) {
					hasShuimoshou=true;
					deathPlayer.loverEffect = true;
					textAreaAddMessage("拜月教主发动倾慕效果", myText, listView);
					textAreaAddMessage("拜月教主HP+1", myText, listView);
					baseEffectAddHP(deathPlayer);
					break;
				}
			}
			if(hasShuimoshou&&callBack!=null){
				callBack();
			}else{
				handleDeath(deathPlayer, callBack);
			}
		}else if(deathPlayer._name==nameMurongziying){
			if(deathPlayer._name==player1._name){
				// 玩家指定慕容紫英的钦慕者
				addDialog(mainScene, new selectPlayerDialogLayer(false,true, true, true,
						"请指定一名倾慕者", true, false,function(result){
					if(result==null){
						deathPlayer.lover1="无";
					}else{
						deathPlayer.lover1=result._name;
					}
					handleLoveEffect(deathPlayer,callBack);
				}));
			}else{
				// AI指定慕容紫英的倾慕者
				deathPlayer.lover1="无";
				handleLoveEffect(deathPlayer,callBack);
			}
		}else{
			handleLoveEffect(deathPlayer,callBack);
		}
	}else{
		handleDeath(deathPlayer,callBack);
	}
}

function digui(playerList,nowNumber,maxNumber,callBack){
	if(nowNumber<maxNumber){
		baseEffectReduceHPEffect(playerList[nowNumber],[playerList[nowNumber]], 1, false, function(){
			baseEffectReduceHP(playerList[nowNumber],[playerList[nowNumber]], 1,false,function(){
				nowNumber++;
				digui(playerList, nowNumber, maxNumber,callBack);
			},false);
		},false);
	}else if(callBack!=null){
		callBack();
	}
}

function handleLoveEffect(deathPlayer,callBack){
	var tempQinmuList=new Array();
	for(var i=0;i<nowPlayerTerm.length;i++){
		if((nowPlayerTerm[i].hp>0)&&(nowPlayerTerm[i]._name==deathPlayer.lover1||nowPlayerTerm[i]._name==deathPlayer.lover2
				||nowPlayerTerm[i]._name==deathPlayer.lover3||nowPlayerTerm[i]._name==deathPlayer.lover4)){
			deathPlayer.loverEffect = true;
			textAreaAddMessage(deathPlayer._name+"发动倾慕效果："+nowPlayerTerm[i]._name+"HP-1", myText, listView);
			textAreaAddMessage(deathPlayer._name+"HP+1", myText, listView);
			baseEffectAddHP(deathPlayer);
			tempQinmuList.push(nowPlayerTerm[i]);
		}
	}
	if(tempQinmuList.length>0){
		var index=0;
		baseEffectReduceHPEffect(tempQinmuList[index],[tempQinmuList[index]], 1, false,function(){
			digui(tempQinmuList, index,tempQinmuList.length,callBack);
		},false);
	}else{
		handleDeath(deathPlayer,callBack);
	}
}

function handleDeath(deathPlayer,callBack){
	if(deathPlayer.hp==0){
		textAreaAddMessage(deathPlayer._name+"阵亡", myText, listView, function(){
			// 唐雨柔sp【玉殇】技能
			skillCharacters_TangyurouSpYushang(deathPlayer,function(){
				// 孔璘【生命献祭】技能
				if (deathPlayer._name==nameKonglin) {
					skillCharacters_KonglinShengmingxianji(deathPlayer);
					if(callBack!=null){
						callBack();
					}
					return;
				} else {
					// 韩菱纱【盗墓】技能
					skillCharacters_HanlinshaDaomu(deathPlayer, function(){
						for (var i=0;i<deathPlayer.handCard.length;i++) {
							remove_Card_Into_DropDeck(deathPlayer.handCard[i].name);
						}
						if (deathPlayer._name==player1._name) {
							handCardZone.removeAllItems();
						}
						if (deathPlayer.skillTempList.length > 0) {
							if(deathPlayer._name==nameWangpengxu){
								deathPlayer.maxCombat-=deathPlayer.skillTempList.length;
							}
							for (var i=0;i<deathPlayer.skillTempList.length;i++) {
								if(deathPlayer._name==nameWangpengxu){
									remove_Card_Into_DropDeck(
											deathPlayer.skillTempList[i].name);
								}
								if(deathPlayer._name!=nameMoyi){
									deathPlayer.skillTempList[i].release();
								}
							}
							deathPlayer.skillTempList=new Array();
						}
						remove_Card_Into_DropDeck(deathPlayer.arms1);
						remove_Card_Into_DropDeck(deathPlayer.arms2);
						remove_Card_Into_DropDeck(deathPlayer.defense);
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
							skillCharacters_LiumengliMengkuilei(deathPlayer);
							// * 柳梦璃【妖王】技能（死亡退场时后续处理）
							skillCharacters_LiumengliYaowangEnd(deathPlayer);
						} else{
							skillCharacters_MoyiSuohun(deathPlayer);
							deathPlayer.hadImageView.setOpacity(255);
							deathPlayer.deathImageView.setVisible(true);
							deathPlayer.hadImageView.loadTexture(deathPlayer.playerDeathPicSrc);
						}
						/*
						 * if (deathPlayer._name==nameMoyi){ suoHunList=new
						 * Array(); }
						 */
						updata_PetsEffect(deathPlayer.pet_FengMonster, deathPlayer);
						deathPlayer.pet_FengMonster = null;
						deathPlayer.pet_Feng = "风系宠物";

						updata_PetsEffect(deathPlayer.pet_LeiMonster, deathPlayer);
						deathPlayer.pet_LeiMonster = null;
						deathPlayer.pet_Lei = "雷系宠物";

						updata_PetsEffect(deathPlayer.pet_ShuiMonster, deathPlayer);
						deathPlayer.pet_ShuiMonster = null;
						deathPlayer.pet_Shui = "水系宠物";

						updata_PetsEffect(deathPlayer.pet_HuoMonster, deathPlayer);
						deathPlayer.pet_HuoMonster = null;
						deathPlayer.pet_Huo = "火系宠物";

						updata_PetsEffect(deathPlayer.pet_TuMonster, deathPlayer);
						deathPlayer.pet_TuMonster = null;
						deathPlayer.pet_Tu = "土系宠物";
						// 赵灵儿【梦蛇】效果
						skillCharacters_ZhaolingerMengshe();
						if(callBack!=null){
							callBack();
						}
					});
				}
			});
		});
	}else if(callBack!=null){
			callBack();
	}
}

// 角色死亡之后，要检测游戏是否结束或者给队友补牌
function afterDeathHanle(player,heartPlayerList,callBack,isNotLoverEffect){
	// cc.log("当前处理"+player._name+"的死亡之后效果,isNotLoverEffect =
	// "+isNotLoverEffect);
	var nowIndex=0;
	for(var i=0;i<heartPlayerList.length;i++){
		if(player._name==heartPlayerList[i]._name){
			nowIndex=i;
			break;
		}
	}
	var nextIndex=nowIndex+1;
	nextIndex%=heartPlayerList.length;
	if(!player.isDeath&&player.hp==0){
		player.isDeath=true;
		if (player._name==player1._name
				|| player._name==player2._name) {
			if (player.friendList[1].hp > 0) {
				if (player._name==player1._name) {
					handCardZone.removeAllItems();
				}
				if(isNotLoverEffect){
					textAreaAddMessage(player.friendList[1]._name+"补牌2张", myText, listView);
					addHandCard([player.friendList[1]],player.friendList[1],player.friendList[1],null,[2],true,true,function(){
						skillCharacters_MoyiDipai(player);
						if (player._name==nowPlayerTerm[nowPlayerNumber]._name) {
							nextStep = 8;
						}
						if(nextIndex!=0){
							afterDeathHanle(heartPlayerList[nextIndex], heartPlayerList, callBack,isNotLoverEffect);
						}else if(callBack!=null){
							callBack();
						}
					});
				}else{
					if(nextIndex!=0){
						afterDeathHanle(heartPlayerList[nextIndex], heartPlayerList, callBack,isNotLoverEffect);
					}else if(callBack!=null){
						callBack();
					}
				}
			} else {
				if(isNotLoverEffect){
					textAreaAddMessage("我方全体阵亡，游戏失败", myText, listView);
					nextStep=10;
					buttonManager(order1Button, false, false);
					buttonManager(order2Button, false, false);
					addDialog(mainScene, new ResultLayer(1));
				}else if(callBack!=null){
					callBack();
				}
			}
		} else if (player3.hp == 0
				&& player4.hp == 0) {
			if(isNotLoverEffect){
				textAreaAddMessage("敌方全体阵亡，我方获胜", myText, listView);
				// 成就【轮回】
				if((initSpecialAchivement.achivementLunhui.progress!=initSpecialAchivement.achivementLunhui.maxProgress)&&parseInt(Math.random()*100, 10)<=1){
					AchivementProgress.addAchivementProgress(initSpecialAchivement.achivementLunhui);
				}
				// 成就【仙曲·入梦调】
				if(initSpecialAchivement.achivementXianquRumengdiao.progress!=initSpecialAchivement.achivementXianquRumengdiao.maxProgress&&(player1._name==nameJiangyunfan&&player1.hp==player1.maxHP)){
					AchivementProgress.addAchivementProgress(initSpecialAchivement.achivementXianquRumengdiao);
				}
				nextStep=10;
				buttonManager(order1Button, false, false);
				buttonManager(order2Button, false, false);
				addDialog(mainScene, new ResultLayer(0));
			}else if(callBack!=null){
				callBack();
			}
		} else {
			if(isNotLoverEffect){
				// 角色死亡后，其队友补牌
				var temPlayer = player.friendList[1];
				textAreaAddMessage(temPlayer._name+"补牌2张", myText, listView);
				addHandCard([temPlayer],temPlayer,temPlayer,null,[2],true,true,function(){
					skillCharacters_MoyiDipai(player);
					if(nextIndex!=0){
						afterDeathHanle(heartPlayerList[nextIndex], heartPlayerList, callBack,isNotLoverEffect);
					}else if(callBack!=null){
						callBack();
					}
				});
			}else{
				if(nextIndex!=0){
					afterDeathHanle(heartPlayerList[nextIndex], heartPlayerList, callBack,isNotLoverEffect);
				}else if(callBack!=null){
					callBack();
				}
			}
		}
	}else if(nextIndex!=0){
		/*
		 * if(player.isDeath){
		 * cc.log(player._name+"不是这次死的，问下一个"+heartPlayerList[nextIndex]._name+"的");
		 * }else{
		 * cc.log(player._name+"没死，问下一个"+heartPlayerList[nextIndex]._name+"的"); }
		 */
		afterDeathHanle(heartPlayerList[nextIndex], heartPlayerList, callBack,isNotLoverEffect);
	}else if(callBack!=null){
		// cc.log("全处理完了，可以callBack了");
		callBack();
	}
}




// startPlayer:死亡求灵葫仙丹的玩家
// usedPlayer:当前需要检测灵狐的玩家
function useLinghuxiandan(startPlayer,usedPlayer,callBack){
	skillCharacters_XingxuanPengrenWhenDeath(startPlayer,usedPlayer,function(){
		var cardLinghuxiandan=null;
		var hasLinghuxiandan=false;
		var usedResult=false;
		skillCharacters_JingtianYongandangAsk(function(result){
			if(result){
				usedResult=true;
				mainScene.addChild(new AttackTargetLayer(usedPlayer.hadImageView,cardAnimationLabel,function(){
					playCardAnimation("res/drawable-hdpi/linghuxiandan.png", function(){
						useBingxingjue(usedPlayer, usedPlayer, function(){
							LinghuxiandanHandle(startPlayer, usedPlayer,null,callBack);
						});
					});
				}));
			}else{
				for(var i=0;i<usedPlayer.handCard.length;i++){
					if(usedPlayer.handCard[i].name==string_handCardNameLinghuxiandan){
						cardLinghuxiandan=usedPlayer.handCard[i];
						hasLinghuxiandan=true;
						if(usedPlayer._name==player1._name){
							addDialog(mainScene, new ChooseZoneLayer("是否对"+startPlayer._name+"使用灵葫仙丹？",function(result){
								if(result){
									usedResult=true;
									remove_Card_Into_DropDeck(cardLinghuxiandan.name);
									usedPlayer.handCard.removeObject(cardLinghuxiandan);
									cardLinghuxiandan.removeFromParent();
									mainScene.addChild(new AttackTargetLayer(usedPlayer.hadImageView,cardAnimationLabel,function(){
										playCardAnimation("res/drawable-hdpi/linghuxiandan.png", function(){
											useBingxingjue(usedPlayer, usedPlayer, function(){
												LinghuxiandanHandle(startPlayer, usedPlayer,null,callBack);
											});
										});
									}));
								}else{
									LinghuxiandanHandle(startPlayer,usedPlayer,1,callBack);
								}
							}));
						}else{
							// AI决定是否出灵葫仙丹
							var shouldUseLinghuxiandan=player1IsPlayer2Friend(startPlayer, usedPlayer);
							if(shouldUseLinghuxiandan){
								remove_Card_Into_DropDeck(cardLinghuxiandan.name);
								usedPlayer.handCard.removeObject(cardLinghuxiandan);
								mainScene.addChild(new AttackTargetLayer(usedPlayer.hadImageView,cardAnimationLabel,function(){
									playCardAnimation("res/drawable-hdpi/linghuxiandan.png", function(){
										useBingxingjue(usedPlayer,usedPlayer , function(){
											LinghuxiandanHandle(startPlayer, usedPlayer,null,callBack);
										});
									});
								}));

							}else{
								LinghuxiandanHandle(startPlayer, usedPlayer,1,callBack);
							}
						}
						break;
					}
				}
				if(!hasLinghuxiandan){
					LinghuxiandanHandle(startPlayer,usedPlayer,2,callBack);
				}
			}
		}, string_handCardNameLinghuxiandan, usedPlayer);
	},callBack);
}
// hasLinghuxiandan=null：有灵狐且用了
// hasLinghuxiandan=1：有灵狐但没用
// hasLinghuxiandan=2：没有灵狐
function LinghuxiandanHandle(startPlayer,usedPlayer,hasLinghuxiandan,callBack){
	if(hasLinghuxiandan==null){
		if(!game_Bingxingjue){
			mainScene.addChild(new AttackTargetLayer(cardAnimationLabel,startPlayer.hadImageView,function(){
				mainScene.addChild(new LiaoyuTargetLayer(startPlayer,startPlayer,function(){
					textAreaAddMessage(usedPlayer._name+"使用了【灵葫仙丹】，\n"+startPlayer._name+"HP+2", myText, listView);
					startPlayer.hp=2;
					has_Tianshezhang(startPlayer);
					callBack();
				}));
			}));
		}else{
			game_Bingxingjue=false;
			useLinghuxiandan(startPlayer, usedPlayer,callBack);
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
			useLinghuxiandan(startPlayer, nowPlayerTerm[nextNumber],callBack);
		}else{
			callBack();
		}
	}
}

function countResult(tempPlayer) {
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
function judgeWinorLose() {
	if (game_MonsterDeck.length == 0) {
		var playerScore = 0, npcScore = 0;
		textAreaAddMessage("怪物牌翻取完毕，游戏结束计算双方宠物战力", myText, listView);
		skillCharacters_XiaomanSpJuexing(function(){
			// cc.log("进来计算战力啊");
			playerScore += countResult( player1);
			playerScore += countResult(player2);
			npcScore += countResult( player3);
			npcScore += countResult( player4);
			textAreaAddMessage("我方宠物战力总和为："+playerScore, myText, listView);
			textAreaAddMessage("敌方宠物战力总和为："+npcScore, myText, listView);
			if (playerScore > npcScore) {
				textAreaAddMessage("我方获胜！", myText, listView);
				// 成就【轮回】
				if((initSpecialAchivement.achivementLunhui.progress!=initSpecialAchivement.achivementLunhui.maxProgress)&&parseInt(Math.random()*100, 10)<=1){
					AchivementProgress.addAchivementProgress(initSpecialAchivement.achivementLunhui);
				}
				// 成就【仙曲·入梦调】
				if(initSpecialAchivement.achivementXianquRumengdiao.progress!=initSpecialAchivement.achivementXianquRumengdiao.maxProgress&&(player1._name==nameJiangyunfan&&player1.hp==player1.maxHP)){
					AchivementProgress.addAchivementProgress(initSpecialAchivement.achivementXianquRumengdiao);
				}
				addDialog(mainScene, new ResultLayer(0));
			} else if (playerScore < npcScore){
				addDialog(mainScene, new ResultLayer(1));
				textAreaAddMessage("我方失败！", myText, listView);
			}else if (playerScore == npcScore){
				addDialog(mainScene, new ResultLayer(1));
				textAreaAddMessage("平局！", myText, listView);
			}
			gameRunning = false;
			nextStep=10;
			buttonManager(order1Button, false, false);
			buttonManager(order2Button, false, false);
			return true;
		});
	}
	return false;
}

function has_Tianshezhang(player) {
	if (player.hp > 0) {
		if (player.arms1==string_handCardNameTianshezhang
			|| player.arms2==string_handCardNameTianshezhang) {
			baseEffectAddHP(player);
			textAreaAddMessage("由于"+string_handCardNameTianshezhang+"效果，HP额外+1", myText, listView, null);
		}
	}
}

function baofa_Tayunxue(player,callBack,callBack2){
	if(player.hp>0&&player.defense==string_handCardNameTayunxue){
		if(player._name==player1._name){
			addDialog(mainScene, new yesOrNoDialogLayer("是否爆发【踏云靴】免疫本次伤害？",function(result){
				if(result){
					if(fight_Trigger.length>0){
						player.defense+="(爆发)";
					}else{
						remove_Card_Into_DropDeck(player.defense);
						player.defense = "无";
						player.defenseExtent = 0;
					}
					baseEffectAddHP(player);
					textAreaAddMessage(player._name+"爆发【踏云靴】免疫本次伤害，并恢复1点HP", myText, listView,function(){
						has_Tianshezhang(player);
						if(callBack2!=null){
							callBack2();
						}
					});
				}else{
					callBack();
				}
			}));
		}else{
			var baofaResult=false;
			// AI决定是否爆发踏云靴
			if(baofaResult){
				remove_Card_Into_DropDeck(player.defense);
				player.defense = "无";
				player.defenseExtent = 0;
				baseEffectAddHP(player);
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
}


function has_Longhunzhankai(player) {
	if (player.hp > 0&& player.defense==string_handCardNameLonghunzhankai) {
		return true;
	}
	return false;
}

function player1IsPlayer2Friend(player1,player2){
	if(player1.hp<=0||player2.hp<=0){
		return false;
	}
	for(var i=0;i<player2.friendList.length;i++){
		if(player1._name==player2.friendList[i]._name){
			return true;
		}
	}
	return false;
}

// 判断该角色是否命中
function attactIsMiss(player,monster) {
	var tempPlayer = nowPlayerTerm[nowPlayerNumber];
	if (tempPlayer.skillNameList.containsObject(skillnameYuexingzhishu)
			&& tempPlayer.friendList[1]._name==player._name){
		if(tempPlayer._name==player1._name&&player1._name==nameLongyou){
			AchivementProgress.addAchivementProgress(tempPlayer);
		}
		// textAreaAddMessage("龙幽“越行之术”效果触发，支援者强制命中", myText, listView);
		return true;
	}
	else{
		return player.extent >= monster.dodge;
	}
}

// 判断当前角色是否为金蟾鬼母
function  isJinchanguimu(player,message) {
	if (player._name==nameJinchanguimu) {
		textAreaAddMessage(message, myText, listView);
		return true;
	} else {
		return false;
	}
}


// 决定哪方出战牌
function judgeWhoUseFightCard(callBack) {
	if (triggerCombat >= monsterCombat) {
		textAreaAddMessage("触发方战力较高", myText, listView);
		textAreaAddMessage("由怪物方使用战牌", myText, listView);
		if (nowPlayerTerm[nowPlayerNumber]._name==player1._name
				|| nowPlayerTerm[nowPlayerNumber]._name==player2._name) {
			// 若当前是为我方行动，则由敌方AI先使用战牌
			aiUseSkillBeforeUsingFightCard(function(){
				baseAIUseFightCard(0, player3,function(){
					baseAIUseFightCard(0, player4,callBack);
				});
			});
		} else { // 当前为AI行动，则我方先使用战牌
			// 先由我方队友使用战牌
			aiUseSkillBeforeUsingFightCard(function(){
				baseAIUseFightCard(0, player2,callBack);
			});
		}
	} else if (triggerCombat < monsterCombat) {
		textAreaAddMessage("怪物战力较高", myText, listView);
		textAreaAddMessage("由触发方使用战牌", myText, listView);
		if (nowPlayerTerm[nowPlayerNumber]._name==player1._name
				|| nowPlayerTerm[nowPlayerNumber]._name==player2._name) { 
			// 若当前是为我方行动，则由我先使用战牌
			// 队友先用战牌
			aiUseSkillBeforeUsingFightCard(function(){
				baseAIUseFightCard(0, player2,callBack);
			})
		} else { 
			// 当前为AI行动，则AI方先使用战牌
			// AI使用战牌
			aiUseSkillBeforeUsingFightCard(function(){
				baseAIUseFightCard(0, player3,function(){
					baseAIUseFightCard(0, player4,callBack);
				});
			});
		}
	}
}

// 判断某角色是否拥有非boss级宠物
function judgeMonsterLevelNotBoss(player) {
	var count = 0;
	if(player.hp>0){
		if (player.pet_FengMonster != null
				&& player.pet_FengMonster.level!="BOSS") {
			count++;
		}
		if (player.pet_LeiMonster != null
				&& player.pet_LeiMonster.level!="BOSS") {
			count++;
		}
		if (player.pet_ShuiMonster != null
				&& player.pet_ShuiMonster.level!="BOSS") {
			count++;
		}
		if (player.pet_HuoMonster != null
				&& player.pet_HuoMonster.level!="BOSS") {
			count++;
		}
		if (player.pet_TuMonster != null
				&& player.pet_TuMonster.level!="BOSS") {
			count++;
		}
	}
	return count>0?true:false;
}

/**
 * 火麒麟宠物效果：我方灵力池+3
 * 
 */
function huoqilingPetEffect(callBack){
	var _huoqilingOwner=null;
	for(var i=0;i<nowPlayerTerm.length;i++){
		if(nowPlayerTerm[i].hp>0&&nowPlayerTerm[i].pet_HuoMonster!=null&&nowPlayerTerm[i].pet_HuoMonster.name===nameHuoqilin){
			_huoqilingOwner=nowPlayerTerm[i];
			break;
		}
	}
	if(_huoqilingOwner==null){
		if(callBack!=null){
			callBack();
		}
		return;
	}
	var _trigger=false;
	for(var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++){
		if(nowPlayerTerm[nowPlayerNumber].friendList[i]._name==_huoqilingOwner._name){
			_trigger=true;
			break;
		}
	}
	if(_trigger){
		addTrigerCombat(3);
		textAreaAddMessage("火麒麟宠物效果，触发方战力+3", myText, listView,callBack);
	}else{
		addMonsterCombat(3);
		textAreaAddMessage("火麒麟宠物效果，妨碍方战力+3", myText, listView,callBack);
	}
}
