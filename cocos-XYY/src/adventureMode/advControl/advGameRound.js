function advRound_Start() {
	// nowPlayerTerm[nowPlayerNumber].hadImageView.setOpacity(255);
	if(nowPlayerTerm[nowPlayerNumber].takeOver){
		textAreaAddMessage(Text.playerStatusRecovery.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView);
		sleep(function(){
			nowPlayerTerm[nowPlayerNumber].takeOver=false;
			nextStep=6;
			buttonManager(order2Button, true, true);
		});

	}else{
		buttonManager(order1Button, false, false);
		// nowPlayerTerm.get(nowPlayerNumber).hadImageView.setAlpha(1.0f);
		textAreaAddMessage(Text.stepRoundStart.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView);
		sleep(function(){
			// 魔尊【蓄势待发】技能
			advSkillCharacters_MozunXushidaifa();
			// 龙葵/龙葵鬼 变身
			longkui_Bianshen(function(){
				buttonManager(order2Button, true, true);
			});
		});
	}
}
function advRoundSkillCard(){
	if(nowPlayerTerm[nowPlayerNumber].hp>0){
		textAreaAddMessage(Text.stepSkillCardStart.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView,function(){
			if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name){
				buttonManager(order1Button, true, true);
				buttonManager(order2Button, true, true);
			}else{
				advAiUseSkillBeforeUsingSkillCard(function(){
					if(nowPlayerTerm[nowPlayerNumber].handCard.length>0){
						buttonManager(order1Button, false, false);
						buttonManager(order2Button, false, false);
						advBaseAIUseSkillCard(0,nowPlayerTerm[nowPlayerNumber].handCard.length);
					}else{
						advAiUseSkillAfterUsingSkillCard();
						textAreaAddMessage(Text.stepHandCardEnd.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView);
						buttonManager(order2Button, true, true);
					}
				});
			}
		});
	}else{
		nextStep=7;
		buttonManager(order2Button, true, true);
	}
}

function advRoundAttack1(){
	textAreaAddMessage(Text.stepFightMonsterStart.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView,function(){
		if(boss._name==bossNameMoyiYanshiqiongbing){
			textAreaAddMessage(Text.bossSkillMoyiYanshiqiongbing, myText, listView,function(){
				nextStep=2;
				advRoundAttactk1Handle(true);
			});
		}else{
			if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name){
				addDialog(mainScene, new ChooseZoneLayer(Text.chooseIsFighting,advRoundAttactk1Handle));
			}else{
				// AI判断是否打怪
				var opinion=false;
				if (advBaseAIIsAttack() || jiujianxianZuiXianWangYueBu != 0) {
					opinion=true;
				}
				nextStep=2;
				advRoundAttactk1Handle(opinion);
			}
		}
	});

}

function advRoundAttactk1Handle(result){
	jincantuoqiao = false;
	fight_SecondMonster = null;
	fight_FirstMonster = advTopMonsterCard(game_MonsterDeck[0]);
	if(fight_FirstMonster==null){
		cc.log("fightMonster==null,monsterdeck = "+game_MonsterDeck);
	}
	if(result){
		attakedMoster=true;
		var message="";
		fight_Trigger.push(nowPlayerTerm[nowPlayerNumber]);
		nowPlayerTerm[nowPlayerNumber].joinAttack=true;
		advJudgeJinchanguimuEffect(Text.support);

	}else{
		attakedMoster = false;// 打怪判断，若此处为false，补牌阶段补牌1张
		textAreaAddMessage(Text.playerChooseNotFight.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView,function(){
			if(game_MonsterDeck.length==0){
				judgeWinorLose();
			}else{
				textAreaAddMessage(Text.takeOverAndDropMonster.format(fight_FirstMonster.name), myText, listView,function(){
					tempMonster=advTopMonsterCard(game_MonsterDeck[0]);
					game_MonsterDropDeck.push(game_MonsterDeck[0]);
					game_MonsterDeck.shift();
					monsterLabel.loadTexture(fight_FirstMonster.monsterPicSrc);
					monsterLabel.setVisible(true);
					nextStep=5;
					textAreaAddMessage(Text.pleaseClickNextButton, myText, listView);
					buttonManager(order2Button, true, true);
				});
			}
		});
	}
}

function advJudgeJinchanguimuEffect(message){
	var master=null;
	for(var i=0;i<nowPlayerTerm.length;i++){
		if(nowPlayerTerm[i].pet_TuMonster!=null&&
				nowPlayerTerm[i].pet_TuMonster.name==nameJinchanguimu){
			master=nowPlayerTerm[i];
			break;
		}
	}
	if(master!=null){
		addDialog(mainScene, new ChooseZoneLayer(Text.chooseUseJinchanguimu.format(message),advHandleJinchanguimuEffect));
	}else{
		advHandleJinchanguimuEffect(false);
	}
}


// 是否使用金蟾鬼母进行支援、妨碍
function advHandleJinchanguimuEffect(result){
	if(result){
		// 魔主妨碍
		advBaseAI_Fangaizhe();
		advAttackMonster1(jinchanguimu);
	}else{
		// 我方为触发者，我方不发动金蟾鬼母效果
		// 魔主作为妨碍者
		advBaseAI_Fangaizhe();
		if(player1.friendList[1].hp>0||player1.friendList[1]._name==nameLiumengliMengkuilei){
			var player1Showun=nowPlayerTerm[nowPlayerNumber]._name==player1._name?false:true;
			var player2Showun=nowPlayerTerm[nowPlayerNumber]._name==player2._name?false:true;
			var player3Showun=nowPlayerTerm[nowPlayerNumber]._name==player3._name?false:true;
			addDialog(mainScene, new selectAdvPlayerDialogLayer(player1Showun,player2Showun,player3Showun,false,"请选择支援者",true,true,advAttackMonster1));
		}else{
			advAttackMonster1();
		}
	}
}



// 选择支援妨碍后的处理
function advAttackMonster1(player){
	function continueDoSomething(){
		textAreaAddMessage(Text.asHinder.format(fight_Monster[0]._name), myText, listView);
		cc.eventManager.pauseTarget(mainScene, true);
		mainScene.runAction(cc.Sequence.create( cc.DelayTime.create(0.5), cc.CallFunc.create(function () {
			// 执行下一个代码
			cc.eventManager.resumeTarget(mainScene, true);
			advAttackMonsterHandle();
		}))); 
	}
	if(player!=null){
		player.joinAttack=true;
		fight_Trigger.push(player);
		textAreaAddMessage(Text.asSupporter.format(player._name), myText, listView,continueDoSomething);
	}else{
		textAreaAddMessage(Text.noSupporter, myText, listView,continueDoSomething);
	}

}

function advAttackMonsterHandle(){
	if(game_MonsterDeck.length==0){
		advJudgeWinorLose();
	}else{
		fight_FirstMonster=advTopMonsterCard(game_MonsterDeck[0]);
		if(fight_Monster==null){
			cc.log("fightMonster=null,array= "+game_MonsterDeck);
		}
		game_MonsterDropDeck.push(game_MonsterDeck[0]);
		game_MonsterDeck.shift();
		monsterLabel.loadTexture(fight_FirstMonster.monsterPicSrc);
		tempMonster=fight_FirstMonster;
		monsterLabel.setVisible(true);
		textAreaAddMessage(Text.takeOverMonster.format(fight_FirstMonster.name), myText, listView, function(){
			advSkillCharacters_SumeiJiaohua(nowPlayerTerm[nowPlayerNumber],function(){
				avdTakeOverCardIsNPC();
			});
		});
	}
}

function avdTakeOverCardIsNPC(){
	if(fight_FirstMonster==null){
		advJudgeWinorLose();
	}
	else if (fight_FirstMonster.dodge == 0) {
		advUseDongmingbaojing(null, function(){
			// 玩家一处理NPC效果
			if (nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name) {
				addDialog(mainScene, new selectNpcEffectDialogLayer(Text.chooseNpcEffect,fight_FirstMonster,function(result){
					if(result==null){
						game_MonsterDropDeck.push(fight_FirstMonster.uid);
						advAttackMonsterHandle();
					}else{
						npc_Effect(fight_FirstMonster,result,function(){
							nextStep=5;
							advRoundAttackEnd();
						});
					}
				}));
			} else {
				// AI处理NPC效果
				// 判断此时怪物牌是否为空，若是，则结束打怪，否则翻取下一张怪牌
				if (game_MonsterDeck.length == 0) {
					// do something AI进行NPC效果的选择
					textAreaAddMessage(Text.monsterDeckIsNull, myText, listView,judgeWinorLose);
				} else {
					// 展示怪物牌
					textAreaAddMessage(Text.takeOverNextMonster.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView,function(){
						fight_FirstMonster = advTopMonsterCard(game_MonsterDeck[0]);
						tempMonster = fight_FirstMonster;
						monsterLabel.loadTexture(fight_FirstMonster.monsterPicSrc);
						game_MonsterDropDeck.push(game_MonsterDeck[0]);
						game_MonsterDeck.shift();
						textAreaAddMessage(Text.takeOverMonster.format(fight_FirstMonster.name), myText, listView, function(){
							avdTakeOverCardIsNPC();
						});
					});
				}
			}
		});
	}else if(fight_FirstMonster.level==Text.crisis){
		fight_FirstMonster.openEffect(advAttackMonsterHandle);
	}else{
		// 战斗开始阶段
		// 一大堆人物技能
		// 王小虎【发挥不稳定】
		advSkillCharacters_WangxiaohuFahuibuwending(function(){
			// 重楼【降临】
			advSkillCharacters_ChonglouJianglin();
			// 玄霄【结拜】
			advSkillCharacters_XuanxiaoJiebaiHandle();
			// 小蛮【活力】
			advSkillCharacters_XiaomanHuoli(function(){
				// 龙幽【表现欲】
				advSkillCharacters_LongyouBiaoxianyu(function(){
					// 初次计算双方是否命中
					advCalculateAttakIsMiss(function(){
						// 处理怪物出场效果
						// monster_OpenEffect(fight_FirstMonster,function(){
						fight_FirstMonster.openEffect(function(){
							if(nowPlayerTerm[nowPlayerNumber].hp>0){
								// 湮世穹兵【侵略如火】
								advSkillCharacters_YanshiqiongbingQinlueruhuo();
								// 判断支援妨碍结果，并计算双方战力
								// 同时判断死亡处理
								advCalculate_Attack(function(){
									// AI出战牌
									advJudgeWhoUseFightCard(function(){
										// 玩家出战牌.....
										textAreaAddMessage(Text.chooseUseFightCardOrClickNextButton, myText, listView);
										buttonManager(order2Button, true, true);
									});
								});
							}else{
								nextStep=7;
								buttonManager(order2Button, true, true);
							}
						});
					});
				});				
			});
		});
	}
}

// 询问是否使用NPC助战效果，callBack为询问之后进入的阶段
function advUseNpcZhuzhanCard(callBack){
	if(nowPlayerTerm[nowPlayerNumber].npcHelp.length>0&&nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name){
		addDialog(mainScene, new selectNumberDialogLayer(Text.chooseUseNPCHelpeCardNumber,nowPlayerTerm[nowPlayerNumber].npcHelp.length,function(result){
			if(result==null||result==0){
				// 直接进入下一阶段
				advUseDongmingbaojing(nowPlayerTerm[nowPlayerNumber], callBack);
			}else{
				var addCombat=result;
				for(var i=0;i<result;i++){
					var temp=nowPlayerTerm[nowPlayerNumber].npcHelp.pop();
					game_MonsterDropDeck.push(temp.uid);
				}
				addDialog(mainScene, new ChooseZoneLayer(Text.askIsAddTriggerCombat,function(result){
					if(result){
						triggerCombat+=addCombat;
						textAreaAddMessage(Text.npcHelperEffectAddTriggerCombat.format(nowPlayerTerm[nowPlayerNumber]._name,addCombat), myText, listView,callBack);
					}else{
						monsterCombat+=addCombat;
						textAreaAddMessage(Text.npcHelperEffectAddMonsterCombat.format(nowPlayerTerm[nowPlayerNumber]._name,addCombat), myText, listView,callBack);
					}
				}));
			}
		}));
	}else{
		// 直接进入下一阶段
		callBack();
	}
}


function advHunzhanHandle(result){
	if(result){
		attack_1 = true;
		textAreaAddMessage(Text.stepFightMonster2Start.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView,function(){
			if(tantadeqiongdingMark==1){
				tantadeqiongdingMark=2;
				fight_SecondMonster=new Tantadeqiongding(48);
			}else{
				fight_SecondMonster =advTopMonsterCard(game_MonsterDeck[0]);
				game_MonsterDeck.shift();
			}
			textAreaAddMessage(Text.takeOverMonster.format(fight_SecondMonster.name), myText, listView,function(){
				// 显示怪物牌
				monsterLabel.loadTexture(fight_SecondMonster.monsterPicSrc);
				tempMonster = fight_SecondMonster;
				if (fight_SecondMonster.dodge == 0) {
					for (var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++) {
						if (nowPlayerTerm[nowPlayerNumber].friendList[i].hp > 0
								&& !nowPlayerTerm[nowPlayerNumber].friendList[i]._name!=nameMurongziying
								&& (fight_SecondMonster.name==nowPlayerTerm[nowPlayerNumber].friendList[i].lover1
										|| fight_SecondMonster.name==nowPlayerTerm[nowPlayerNumber].friendList[i].lover2
										|| fight_SecondMonster.name==nowPlayerTerm[nowPlayerNumber].friendList[i].lover3
										|| fight_SecondMonster.name==nowPlayerTerm[nowPlayerNumber].friendList[i].lover4)){
							textAreaAddMessage(Text.loverAddCombat, myText, listView);
							fight_SecondMonster.combat *= 2;
							break;
						}
					}
					triggerCombat += fight_SecondMonster.combat;
				}else if(fight_SecondMonster.level==Text.crisis){
					fight_SecondMonster.winEffect();
				} else {
					monsterCombat += fight_SecondMonster.combat;
				}
				// 进入打怪结算
				advJudgeWhoUseFightCard(function(){
					textAreaAddMessage(Text.chooseUseFightCardOrClickNextButton, myText, listView);
					buttonManager(order2Button, true, true);
				});
			});
		});
	}else{
		textAreaAddMessage(Text.chooseUseFightCardOrClickNextButton, myText, listView);
		buttonManager(order2Button, true, true);
	}
}

// 打怪阶段2(混战)
function advRoundAttack2(){
	// cc.log("询问是否混战了");
	if(game_MonsterDeck.length>0){
		if(bossUseDongmingbaojing==true||tantadeqiongdingMark==1){
			bossUseDongmingbaojing=false;
			advHunzhanHandle(true);
		}else{
			if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name){
				addDialog(mainScene, new ChooseZoneLayer(Text.chooseIsHunzhan,function(result){
					advHunzhanHandle(result);
				}));
			}else{
				// AI决定是否混战
				advHunzhanHandle(advBaseAIIsHunzhan());
			}
		}
	}else{
		// 怪物牌堆已经为空，不再混战，直接进入打怪结算
		textAreaAddMessage(Text.chooseUseFightCardOrClickNextButton, myText, listView);
		buttonManager(order2Button, true, true);
	}
}

function advRoundAttack3(){
	attack_3 = false;
	if(!jiangshili_xisheng){
		textAreaAddMessage(Text.triggerFinalCombat.format(triggerCombat), myText, listView);
		sleep(function(){
			textAreaAddMessage(Text.monsterFinalCombat.format(monsterCombat), myText, listView);
		})
	}
	sleep(function(){
		if (!muhoudeyinmouMark&&(
				(jiangshili_xisheng && (fight_Trigger[0]._name==nameJiangshili|| (fight_Trigger.length > 1 && fight_Trigger[1]._name==nameJiangshili)))
				|| (!jiangshili_xisheng && (triggerCombat >= monsterCombat)))){
			textAreaAddMessage(Text.battleWin, myText, listView);
			sleep(function(){
				// 执行第一只怪物的胜利结算
				fight_FirstMonster.winEffect(function(){
					// 判断触发者是否因为结算而阵亡
					// 没有阵亡，则继续：
					cc.log("callBack");
					if(nowPlayerTerm[nowPlayerNumber].hp>0){
						cc.log("callBack1");
						// 1、混战且没翻到npc且混战怪物不是危机牌，则执行第二只怪物的胜利结算
						if(fight_SecondMonster!=null&&fight_SecondMonster.dodge>0&&fight_SecondMonster.level!="危机"){
							// monster_WinEffect(fight_SecondMonster,function(){
							fight_SecondMonster.winEffect(function(){
								// 所有怪物的胜利效果结算完毕后，如果触发者依旧没有阵亡，则开始收为宠物询问
								if ( nowPlayerTerm[nowPlayerNumber].hp > 0) {
									// 先收第一只宠物
									advCalculate_Pets(nowPlayerTerm[nowPlayerNumber], fight_FirstMonster,function(){
										// 再收第二只宠物
										advCalculate_Pets(nowPlayerTerm[nowPlayerNumber],fight_SecondMonster,function(){
											// 林月如【嫉恶如仇】技能
											advSkillCharacters_LinyueruJieruchou(fight_Monster, fight_Trigger);
											buttonManager(order2Button, true, true);
										});
									});
								}else{
									// 触发者因为第二只怪物的胜利结算而阵亡，则打怪结束
									// 林月如【嫉恶如仇】技能
									advSkillCharacters_LinyueruJieruchou(fight_Monster, fight_Trigger);
									buttonManager(order2Button, true, true);
								}
							});
						}else{
							// 2、没混战或者混战翻到npc，直接收宠
							if(fight_SecondMonster!=null){
								game_MonsterDropDeck.push(fight_SecondMonster.uid);
							}
							advCalculate_Pets(nowPlayerTerm[nowPlayerNumber], fight_FirstMonster,function(){
								// 林月如【嫉恶如仇】技能
								advSkillCharacters_LinyueruJieruchou(fight_Monster, fight_Trigger);
								buttonManager(order2Button, true, true);
							});
						}
					}else{
						cc.log("callBack2");
						// 触发者阵亡，直接结束后面的结算
						game_MonsterDropDeck.push(fight_FirstMonster.uid);
						if(fight_SecondMonster!=null){
							game_MonsterDropDeck.push(fight_SecondMonster.uid);
						}
						// 林月如【嫉恶如仇】技能
						advSkillCharacters_LinyueruJieruchou(fight_Monster, fight_Trigger);
						buttonManager(order2Button, true, true);
					}
				});
			});
		}else{
			textAreaAddMessage(Text.battleLose, myText, listView);
			sleep(function(){
				if(advJudgeZhaolingerIsLive||boss._name==bossNameBaiyuejiaozhu){
					boss.monsterList.push(fight_FirstMonster);
					textAreaAddMessage(Text.bossGetMonster.format(fight_FirstMonster.name), myText, listView);
					advSkillCharacters_ZhaolingerMengshe();
					if(fight_SecondMonster!=null){
						if(fight_SecondMonster.dodge>0&&fight_SecondMonster.level!=Text.crisis){
							boss.monsterList.push(fight_SecondMonster);
							textAreaAddMessage(Text.bossGetMonster.format(fight_SecondMonster.name), myText, listView);
							advSkillCharacters_ZhaolingerMengshe();
						}else{
							game_MonsterDropDeck.push(fight_SecondMonster.uid);
						}
					}
					if(boss._name==bossNameBaiyuejiaozhu&&boss.monsterList.length>=6){
						textAreaAddMessage(Text.bossSkillBaiyuejiaozhu, myText, listView);
						gameRunning = false;
						nextStep=10;
						buttonManager(order1Button, false, false);
						buttonManager(order2Button, false, false);
						return;
					}
				}else{
					game_MonsterDropDeck.push(fight_FirstMonster.uid);
					if(fight_SecondMonster!=null){
						game_MonsterDropDeck.push(fight_SecondMonster.uid);
					}
				}
				// 执行失败效果
				fight_FirstMonster.loseEffect(function(){
					if(fight_SecondMonster!=null&&nowPlayerTerm[nowPlayerNumber].hp>0&&fight_SecondMonster.dodge>0&&fight_SecondMonster.level!="危机"){
						// monster_LoseEffect(fight_SecondMonster,function(){
						fight_SecondMonster.loseEffect(function(){
							advSkillCharacters_LinyueruJieruchou(fight_Trigger, fight_Monster,function(){
								advSkillCharacters_WenhuiManheng(function(){
									buttonManager(order2Button, true, true);
								});
							});
						});
					}else{
						advSkillCharacters_LinyueruJieruchou(fight_Trigger, fight_Monster,function(){
							advSkillCharacters_WenhuiManheng(function(){
								buttonManager(order2Button, true, true);
							});
						});
					}
				});
			});
		}
	});
}


function advRoundAttackEnd(){
	// 欧阳慧【雷灵】效果
	advSkillCharacters_OuyanghuiLeiling(function(){
		bossUseDongmingbaojin=false;// 魔主使用洞冥宝镜效果结束
		boss.dongmingbaojingList=new Array();
		boss.yinguList=new Array();
		boss.bingxingjueList=new Array();
		attack_1 = false;
		attack_2 = false;
		attack_3=true;
		ai_AttackMonster = false;
		fight_Trigger=new Array(); // 战斗结束时，清空本回合触发方列表
		fight_Monster=new Array(); // 战斗结束时，清空本回合怪物方列表
		monsterCombat = 0;
		triggerCombat = 0;
		NPCEffect = false;
		for (var i=0;i<nowPlayerTerm.length;i++) {
			// 清空本回合所有角色使用战牌的记录
			nowPlayerTerm[i].usedAttackCard = false;
			// 战斗结束时清空技能使用状况
			nowPlayerTerm[i].everyRoundSkill_1 = false;
			nowPlayerTerm[i].everyRoundSkill_2 = false;
			nowPlayerTerm[i].everyRoundSkill_3 = false;
			// 战斗结束时，所有角色参战状态改为false
			nowPlayerTerm[i].joinAttack = false;
			// 恢复战力
			nowPlayerTerm[i].tempAddCombat = 0;
			nowPlayerTerm[i].skillAddCombat = 0;
			nowPlayerTerm[i].tempAddExtent = 0;
			nowPlayerTerm[i].skillAddExtent = 0;
			// 回收该角色所有爆发的装备和宠物
			advHandleBaofaEqumentsAndPets(nowPlayerTerm[i]);
		}
		dropCarding = false;
		if(tantadeqiongdingMark==2){
			tantadeqiongdingMark=0;
		}
		if(muhoudeyinmouMark){
			muhoudeyinmouMark=false;
		}
		// 云天河【后羿射日弓】效果判定
		advSkillCharacters_YuntianheHouyisheriongEnd();
		// 姜世离【牺牲】退场效果处理
		advSkillCharacters_JiangshiliXishenHandle();
		textAreaAddMessage(Text.stepFightMonsterEnd.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView);
		// 处理危机牌【巨神天屠】混战效果
		if(jushentiantuMark){
			jushentiantuMark=false;
			new Jushentiantu(1).jushentiantuEffect(player1,function(){
				advHandleHuayaoshuiEffect();
			});
		}else{
			advHandleHuayaoshuiEffect();
		}
	});
}

// 判断并处理危机牌【化妖水】混战效果：消灭触发者战力最高的宠物
function advHandleHuayaoshuiEffect(){
	if(huayaoshuiMark){
		huayaoshuiMark=false;
		if(baseEffectCountPets(nowPlayerTerm[nowPlayerNumber])>0){
			getMaxCombatPet(nowPlayerTerm[nowPlayerNumber],function(monster){
				textAreaAddMessage(Text.crisisCardHuayaoshuiUsing.format(nowPlayerTerm[nowPlayerNumber]._name,monster.name), myText, listView);
				perishPet(monster.nature,nowPlayerTerm[nowPlayerNumber]);
				advSkillCharacters_JiujianxianZuixianwangyubu();
				buttonManager(order2Button, true, true);
				if(nowPlayerTerm[nowPlayerNumber].hp<=0){
					nextStep=7;
				}
			});
		}else{
			advHandleAttackEndCallBack();
		}
	}else{
		advHandleAttackEndCallBack();
	}
}

// 正式处理战斗结束阶段
function advHandleAttackEndCallBack(){
	advSkillCharacters_JiujianxianZuixianwangyubu();
	buttonManager(order2Button, true, true);
	if(nowPlayerTerm[nowPlayerNumber].hp<=0){
		nextStep=7;
	}
}


function advRoundAddHandCard(){
	var nowPlayer=nowPlayerTerm[nowPlayerNumber];
	var guanyinmizhenEffect=false;
	for(var i=0;i<guanyinmizhenList.length;i++){
		if(guanyinmizhenList[i]._name==nowPlayer._name){
			guanyinmizhenEffect=true;
		}
	}
	if(guanyinmizhenEffect){
		guanyinmizhenList.removeObject(nowPlayer);
		textAreaAddMessage(Text.crisisCardGuanyinmizhenUsing.format(nowPlayer._name), myText, listView, function(){
			buttonManager(order2Button, true, true);
		});
	}else if(nowPlayer.hp>0){
		monsterLabel.setVisible(false);
		var i=0;
		var addCardNumber=0;
		advSkillCharacters_AnuWangushitian();
		if(attakedMoster){
			textAreaAddMessage(Text.stepAddHandCardCountAddNumber.format(nowPlayer._name,nowPlayer.handCard.length,2), myText, listView);
		}else{
			i=1;
			textAreaAddMessage(Text.stepAddHandCardCountAddNumber.format(nowPlayer._name,nowPlayer.handCard.length,1), myText, listView);
		}
		addCardNumber=2-i;

		if (nowPlayerTerm[nowPlayerNumber].pet_Lei==nameChiguiwang) {
			addCardNumber++;
			textAreaAddMessage(Text.petChiguiwangEffectUsing.format(nowPlayer._name), myText, listView);
		}
		// 酒剑仙【醉仙望月步】技能补牌效果
		if (nowPlayerTerm[nowPlayerNumber]._name==nameJiujianxian
				&& attakedMoster && jiujianxianZuiXianWangYueBu == 0) {
			addCardNumber++;
			textAreaAddMessage(Text.skillJiujianxianZuixianwangyuebuAddHandCard, myText, listView);
		}

		var addNumber=1;
		if(boss._name==bossNameHuangshansanguai){
			addNumber=2;
		}else if(boss._name==bossNameShushanqisheng){
			addNumber=3;
		}
		textAreaAddMessage(Text.bossAddHandCard.format(boss._name,addNumber), myText, listView);
		advAddHandCard([nowPlayerTerm[nowPlayerNumber],boss],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],null,[addCardNumber,addNumber],true,true);

		buttonManager(order2Button, true, true);
	}
}

function advRoundDropCard(){
	if(nowPlayerTerm[nowPlayerNumber].hp>0){
		buttonManager(order1Button, false, false);
		textAreaAddMessage(Text.stepDropHandCardStart.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView,function(){
			advUseAnyTimeSkill(function(){
				var dropCard = false;
				var maxCard = boss._name!=bossNameSheyaonan?3:1, rightCards = 0;
				if (nowPlayerTerm[nowPlayerNumber].skillNameList
						.containsObject(skillnameJianxia)
						&& nowPlayerTerm[nowPlayerNumber].handCard.length > 5) {
					dropCard = true;
					maxCard = 5;
				}else if (!nowPlayerTerm[nowPlayerNumber].skillNameList
						.containsObject(skillnameJianxia)
						&& nowPlayerTerm[nowPlayerNumber].handCard.length > maxCard) {
					dropCard = true;
					// maxCard = 3;
				}

				if (dropCard) {
					rightCards =nowPlayerTerm[nowPlayerNumber].handCard.length- maxCard;
					textAreaAddMessage(Text.countShouldDropHandCardNumber.format(rightCards), myText, listView);
					if (nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name) {
						dropCarding = true;
					} else {
						var count = nowPlayerTerm[nowPlayerNumber].handCard.length-maxCard;
						for (var i = 0; i < count; i++) {
							var num=nowPlayerTerm[nowPlayerNumber].handCard.length;
							var temp =parseInt(Math.random()*num, 10); 
							advRemove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].handCard[temp].name);
							textAreaAddMessage(Text.dropCard.format(nowPlayerTerm[nowPlayerNumber]._name,nowPlayerTerm[nowPlayerNumber].handCard[temp].name), myText, listView);
							var tempCard=nowPlayerTerm[nowPlayerNumber].handCard[temp];
							// nowPlayerTerm[nowPlayerNumber].handCard.removeObject(nowPlayerTerm[nowPlayerNumber].handCard[temp]);
							nowPlayerTerm[nowPlayerNumber].handCard.removeObject(tempCard);
							tempCard.release();
						}
						buttonManager(order2Button, true, true);
					}
				} else {
					if (nowPlayerNumber == 0) {
						buttonManager(order1Button, true, true);
						// buttonManager(order2Button, true, true);
					}
					textAreaAddMessage(Text.notNeedDropHandCard.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView);
					buttonManager(order2Button, true, true);
				}
			});
		});

	}
}

// 回合结束阶段
function advRoundEnding(){
	// 关闭怪物牌展示窗口
	monsterLabel.setVisible(false);
	monsterCombat = 0;
	triggerCombat = 0;
	game_Bingxingjue=false;
	attakedMoster=false;
	tempMonster = null;
	attack_3 = true;
	usedJiaohua = false; // 使用【狡猾】的结果
	ai_AttackMonster = false;
	jincantuoqiao = false; // 回合结束时，恢复金蝉脱壳效果
	dropCarding = false;
	chonglou_JueDou = 0; // 恢复重楼决斗次数
	NPCEffect = false; // 恢复NPC效果时无法使用战牌限制
	longkuiRongzhuCardName=null;	// 清空龙葵熔铸的牌
	jiujianxianZuiXianWangYueBu = 0; // 清空酒剑仙“醉仙望月步”的次数
	fight_FirstMonster = null; // 回合结束时，清空第一只怪物信息；
	fight_SecondMonster = null; // 回合结束时，清空第二只怪物信息；
	fight_Trigger=new Array(); // 回合结束时，清空本回合触发方列表
	fight_Monster=new Array(); // 回合结束时，清空本回合怪物方列表
	for(var i=0;i<nowPlayerTerm.length;i++){
		nowPlayerTerm[i].everyRoundSkill_1 = false;
		nowPlayerTerm[i].everyRoundSkill_2 = false;
		nowPlayerTerm[i].everyRoundSkill_3 = false;
		// 战斗结束时，所有角色参战状态改为false
		nowPlayerTerm[i].joinAttack = false;
		// 重新计算角色战力、命中
		nowPlayerTerm[i].tempAddCombat = 0;
		nowPlayerTerm[i].skillAddCombat = 0;
		nowPlayerTerm[i].tempAddExtent = 0;
		nowPlayerTerm[i].skillAddExtent = 0;
		// 回收该角色所有爆发的装备和宠物
		advHandleBaofaEqumentsAndPets(nowPlayerTerm[i]);
	}
	attack_1 = false; // 第一次打怪
	attack_2 = false; // 第二次打怪
	// 清空赠剑列表
	zengJian=new Array();
	skillEffectDropCard = 0;
	laShouCuiHuaList=new Array();
	if(tantadeqiongdingMark==2){
		tantadeqiongdingMark=0;
	}
	if(muhoudeyinmouMark){
		muhoudeyinmouMark=false;
	}
	// 回合结束，判断是否游戏结束
	if (!judgeWinorLose()) {
		// nowPlayerTerm[nowPlayerNumber].hadImageView.setOpacity(150);
		textAreaAddMessage(Text.stepRoundEnd.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView);
		// 魔尊【崩坏】技能
		advSkillCharacters_MozunBenghuai();
		buttonManager(order2Button, true, true);
	}
}

function advSendRoundMessageManager(){
	if(nextStep==0){
		advRound_Start();
	}
	else if(nextStep==1){
		advRoundSkillCard();
	}else if(nextStep==2){
		for(var i=0;i<player1.handCard.length;i++){
			player1.handCard[i].clicked=false;
			player1.handCard[i].setOpacity(180);
		}
		advSkillCharacters_XiaomanWufawutian(function(){
			advUseDongmingbaojing(null,advRoundAttack1);
		});
	}else if(nextStep==3){
		advUseNpcZhuzhanCard(function(){
			advUseDongmingbaojing(null, advRoundAttack2);
		});
	}else if(nextStep==4){
		advUseNpcZhuzhanCard(advRoundAttack3);
	}else if(nextStep==5){
		advRoundAttackEnd()
	}else if(nextStep==6){
		textAreaAddMessage(Text.stepAddHandCardStart.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView);
		advRoundAddHandCard();
	}else if(nextStep==7){
		advRoundDropCard();
	}else if(nextStep==8){
		advRoundEnding();
		do{
			nowPlayerNumber++;
			nowPlayerNumber%=nowPlayerTerm.length;
		}while(nowPlayerTerm[nowPlayerNumber]._name==boss._name||nowPlayerTerm[nowPlayerNumber].hp<=0);
		nextStep=-1;
	}
}


/**
 * 牌进入弃牌堆的方法
 * 
 * @param cardName
 */
function advRemove_Card_Into_DropDeck(cardName) {
	cardName=cardName.replaceAll("\\(爆发\\)");
	if(cardName==Text.nil){
		return;
	}
	if (cardName==string_handCardNameTianxuanwuyin)
		game_DropHandCard.push(1);
	else if (cardName==string_handCardNameJincanwang)
		game_DropHandCard.push(9);
	else if (cardName==string_handCardNameDongmingbaojing)
		game_DropHandCard.push(14);
	else if (cardName==string_handCardNameYingu)
		game_DropHandCard.push(18);
	else if (cardName==string_handCardNameShuerguo)
		game_DropHandCard.push(22);
	else if (cardName==string_handCardNameLinghuxiandan)
		game_DropHandCard.push(25);
	else if (cardName==string_handCardNameBingxinjue)
		game_DropHandCard.push(28);
	else if (cardName==string_handCardNameTongqianbiao)
		game_DropHandCard.push(31);
	else if (cardName==string_handCardNameTianleipo)
		game_DropHandCard.push(34);
	else if (cardName==string_handCardNameTiangangzhanqi)
		game_DropHandCard.push(37);
	else if (cardName==string_handCardNameJinchantuoqiao)
		game_DropHandCard.push(39);
	else if (cardName==string_handCardNameKuicetianji)
		game_DropHandCard.push(41);
	else if (cardName==string_handCardNameToudao)
		game_DropHandCard.push(43);
	else if (cardName==string_handCardNameWuqichaoyuan)
		game_DropHandCard.push(45);
	else if (cardName==string_handCardNameMojian
			|| cardName==string_handCardNameMojian+"(扣置)")
		game_DropHandCard.push(47);
	else if (cardName==string_handCardNameCaihuan
			|| cardName==string_handCardNameCaihuan+"(扣置)")
		game_DropHandCard.push(48);
	else if (cardName==string_handCardNameModaotianzha
			|| cardName==string_handCardNameModaotianzha+"(扣置)")
		game_DropHandCard.push(49);
	else if (cardName==string_handCardNameTianshezhang
			|| cardName==string_handCardNameTianshezhang+"(扣置)")
		game_DropHandCard.push(50);
	else if (cardName==string_handCardNameWuchenjian
			|| cardName==string_handCardNameWuchenjian+"(扣置)")
		game_DropHandCard.push(51);
	else if (cardName==string_handCardNameTiandijifu)
		game_DropHandCard.push(52);
	else if (cardName==string_handCardNameQiankundaopao)
		game_DropHandCard.push(53);
	else if (cardName==string_handCardNameWucaixiayi)
		game_DropHandCard.push(54);
	else if (cardName==string_handCardNameTayunxue)
		game_DropHandCard.push(55);
	else if (cardName==string_handCardNameLonghunzhankai)
		game_DropHandCard.push(56);
	else if(cardName==string_handCardNameSoubaoshu)
		game_DropHandCard.push(57);
	else if(cardName==string_handCardNameJimushui)
		game_DropHandCard.push(58);
	else if(cardName==string_handCardNameTianjian)
		game_DropHandCard.push(59);
	else if(cardName==string_handCardNameJiushen)
		game_DropHandCard.push(60);
	else if(cardName==string_handCardNameXiukoujinxinzhou)
		game_DropHandCard.push(62);
	else if(cardName==string_handCardNameKaoya)
		game_DropHandCard.push(63);
	else if(cardName==string_handCardNameWulingjingxie)
		game_DropHandCard.push(64);
	else if(cardName==string_handCardNameTianxiangxuminglu)
		game_DropHandCard.push(65);
	else if(cardName==string_handCardNameHuanmeihuazhou)
		game_DropHandCard.push(66);
	else if(cardName==string_handCardNameShiziyaoshuo|| cardName==string_handCardNameShiziyaoshuo+"(扣置)")
		game_DropHandCard.push(67);
	else if(cardName==string_handCardNameTiangangdouyi)
		game_DropHandCard.push(68);
}