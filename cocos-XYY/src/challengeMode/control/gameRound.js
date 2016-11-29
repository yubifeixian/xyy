function round_Start() {
	showActionMark();
	if(nowPlayerTerm[nowPlayerNumber].takeOver){
		textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"从横置状态中恢复", myText, listView);
		nowPlayerTerm[nowPlayerNumber].takeOver=false;
		nextStep=7;
		autoNextStep();
		// buttonManager(order2Button, true, true);
		
	}else{
		buttonManager(order1Button, false, false);
		textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"的回合开始", myText, listView);
		// 魔尊【蓄势待发】技能
		skillCharacters_MozunXushidaifa();
		// 龙葵/龙葵鬼 变身
		longkui_Bianshen(function(){
			// buttonManager(order2Button, true, true);
			autoNextStep();
			
		});
	}
}
function round_Event(){
	var temp=this;
	textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"的事件阶段", myText, listView,function(){
		if(nowPlayerTerm[nowPlayerNumber]._name==player1._name){
			addDialog(mainScene, new ChooseZoneLayer("是否翻取事件？",roundEventHandle));
		}else{
			// AI判断是否翻取事件
			roundEventHandle(baseAIEventCard());
		}

	});
	
}

function roundEventHandle(result){
	if(result){
		textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"翻取了事件牌", myText, listView,function(){
			var temp = parseInt(Math.random()*game_EventCardDeck.length, 10);
			event_Effect(game_EventCardDeck[temp],function(){
				game_EventCardDeck.removeObject(game_EventCardDeck[temp]);
				if (game_EventCardDeck.length == 0){
					game_EventCardDeck = initEventCardDeck();
				}
				// buttonManager(order2Button, true, true);
				autoNextStep();
			});
		});
	}else{
		textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"不翻事件牌", myText, listView);
		// buttonManager(order2Button, true, true);
		autoNextStep();
	}
}

function roundSkillCard(){
	if(nowPlayerTerm[nowPlayerNumber].hp>0){
		textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"的技牌阶段", myText, listView);
		if(nowPlayerTerm[nowPlayerNumber]._name==player1._name){
			buttonManager(order1Button, true, true);
			buttonManager(order2Button, true, true);
		}else{
			aiUseSkillBeforeUsingSkillCard(function(){
				if(nowPlayerTerm[nowPlayerNumber].handCard.length>0){
					buttonManager(order1Button, false, false);
					buttonManager(order2Button, false, false);
					baseAIUseSkillCard(0,nowPlayerTerm[nowPlayerNumber].handCard.length);
				}else{
					aiUseSkillAfterUsingSkillCard(function(){
						textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"的技牌阶段结束", myText, listView,function(){
							autoNextStep();
						});
						// buttonManager(order2Button, true, true);
					});
				}
			});
		}
	}else{
		nextStep=8;
		autoNextStep();
		// buttonManager(order2Button, true, true);
	}
}

function roundAttack1(){
	textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"的战斗阶段", myText, listView,function(){
		if(nowPlayerTerm[nowPlayerNumber]._name==player1._name){
			// addDialog(mainScene, new
			// yesOrNoDialogLayer("是否打怪？",roundAttactk1Handle));
			addDialog(mainScene, new ChooseZoneLayer("是否打怪？",roundAttactk1Handle));
		}else{
			// AI判断是否打怪
			var opinion=false;
			if (baseAIIsAttack() || jiujianxianZuiXianWangYueBu != 0) {
				opinion=true;
			}
			nextStep=3;
			roundAttactk1Handle(opinion);
		}
	});
	
}

function roundAttactk1Handle(result){
	jincantuoqiao = false;
	fight_SecondMonster = null;
	if(result){
		attakedMoster=true;
		var message="";
		fight_Trigger.push(nowPlayerTerm[nowPlayerNumber]);
		nowPlayerTerm[nowPlayerNumber].joinAttack=true;
		if(player1IsPlayer2Friend(nowPlayerTerm[nowPlayerNumber], player1)){
			message="支援";
		}else{
			message="妨碍"
		}
		judgeJinchanguimuEffect(message);
		
	}else{
		attakedMoster = false;// 打怪判断，若此处为false，补牌阶段补牌1张
		textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"选择不打怪", myText, listView,function(){
			if(game_MonsterDeck.length==0){
				judgeWinorLose();
			}else{
				fight_FirstMonster=topMonsterCard(game_MonsterDeck.shift());
				// monsterLabel.loadTexture(fight_FirstMonster.monsterPicSrc);
				turnMonsterCardLayer=new TurnMonsterCardLayer(fight_FirstMonster);
				mainScene.addChild(turnMonsterCardLayer);
				textAreaAddMessage("翻取怪物牌【"+fight_FirstMonster.name+"】弃置", myText, listView,function(){
					nextStep=6;
					// textAreaAddMessage("请点击下一阶段", myText, listView);
					// buttonManager(order2Button, true, true);
					autoNextStep();
				});
			}
		});
	}
}

function judgeJinchanguimuEffect(message){
	var master=null;
	for(var i=0;i<nowPlayerTerm.length;i++){
		if(nowPlayerTerm[i].pet_TuMonster!=null&&
				nowPlayerTerm[i].pet_TuMonster.name==nameJinchanguimu){
			master=nowPlayerTerm[i];
			break;
		}
	}
	if(master!=null){
		if(master._name==player1._name||master._name==player2._name){
			// addDialog(mainScene, new
			// yesOrNoDialogLayer("是否使用金蟾鬼母进行"+message+"？",handleJinchanguimuEffect));
			addDialog(mainScene, new ChooseZoneLayer("是否使用金蟾鬼母进行"+message+"？",handleJinchanguimuEffect));
		}else{
			var result=false;
			// AI判断是否使用金蟾鬼母效果,默认不用
			handleJinchanguimuEffect(result);
		}
	}else{
		handleJinchanguimuEffect(false);
	}
}


// 是否使用金蟾鬼母进行支援、妨碍
function handleJinchanguimuEffect(result){
		if(result){
			if(nowPlayerTerm[nowPlayerNumber]._name==player1._name||nowPlayerTerm[nowPlayerNumber]._name==player2._name){
				// 我方为触发者，我方决定把金蟾鬼母设定为支援者
				// fight_Trigger.push(jinchanguimu);
				// jinchanguimu.joinAttack=true;
				// 敌方选择妨碍者
				baseAI_Fangaizhe();
				attackMonster1(jinchanguimu);
			}else{
				// 敌方选择支援者
				baseAI_Zhiyuanzhe();
				// 敌方为触发者，我方决定把金蟾鬼母设定为妨碍者
				// fight_Monster.push(jinchanguimu);
				// jinchanguimu.joinAttack=true;
				attackMonster1(jinchanguimu);
			}
		}else{
			var message=""
			if(nowPlayerTerm[nowPlayerNumber]._name==player1._name||nowPlayerTerm[nowPlayerNumber]._name==player2._name){
				message="支援者"
				// 我方为触发者，我方不发动金蟾鬼母效果
				// 玩家指定支援者
				// 敌方指定妨碍者
				baseAI_Fangaizhe();
				if(player1.friendList[1].hp>0||player1.friendList[1]._name==nameLiumengliMengkuilei){
					var player1Showun=nowPlayerTerm[nowPlayerNumber]._name==player1._name?false:true;
					var player2Showun=nowPlayerTerm[nowPlayerNumber]._name==player2._name?false:true;
					addDialog(mainScene, new selectPlayerDialogLayer(player1Showun,player2Showun,false,false,"请选择"+message,true,true,attackMonster1));
				}else{
					attackMonster1();
				}
			}else{
				message="妨碍者"
				// 敌方为触发者，我方不发动金蟾鬼母效果
				// 敌方指定支援者
				baseAI_Zhiyuanzhe();
				// 玩家选择妨碍者
				addDialog(mainScene, new selectPlayerDialogLayer(true,true,false,false,"请选择"+message,true,true,attackMonster1));
			}
		}
}



// 选择支援妨碍后的处理
function attackMonster1(player){
	var message1="";
	var message2="";
		if(nowPlayerTerm[nowPlayerNumber]._name==player1._name||nowPlayerTerm[nowPlayerNumber]._name==player2._name){
			message1="支援者";
			message2="妨碍者";
			if(player!=null){
				player.joinAttack=true;
				fight_Trigger.push(player);
				textAreaAddMessage("我方选择了"+player._name+"作为"+message1, myText, listView);
			}else{
				textAreaAddMessage("我方不选择"+message1, myText, listView);
			}
			if(fight_Monster.length>0){
				textAreaAddMessage("敌方选择了"+fight_Monster[0]._name+"作为"+message2, myText, listView);
				cc.log("妨碍者"+fight_Monster[0]._name);
			}else{
				textAreaAddMessage("敌方不选择"+message2, myText, listView);
				cc.log("无妨碍者");
			}
		}else{
			message1="妨碍者";
			message2="支援者";
			if(fight_Trigger.length>1){
				textAreaAddMessage("敌方选择了"+fight_Trigger[1]._name+"作为"+message2, myText, listView);
			}else{
				textAreaAddMessage("敌方不选择"+message2, myText, listView);
			}
			if(player!=null){
				fight_Monster.push(player);
				player.joinAttack=true;
				textAreaAddMessage("我方选择了"+player._name+"作为"+message1, myText, listView);
			}else{
				textAreaAddMessage("我方不选择"+message1, myText, listView);
			}
		}
	cc.eventManager.pauseTarget(mainScene, true);
	mainScene.runAction(cc.Sequence.create( cc.DelayTime.create(0.5), cc.CallFunc.create(function () {
		// 执行下一个代码
		cc.eventManager.resumeTarget(mainScene, true);
		attackMonsterHandle();
	}))); 
}

function attackMonsterHandle(){
	if(game_MonsterDeck.length==0){
		judgeWinorLose();
	}else{
		fight_FirstMonster=topMonsterCard(game_MonsterDeck.shift());
		if(turnMonsterCardLayer!=null){
			turnMonsterCardLayer.instead();
		}
		turnMonsterCardLayer=new TurnMonsterCardLayer(fight_FirstMonster);
		mainScene.addChild(turnMonsterCardLayer);
		tempMonster=fight_FirstMonster;
		textAreaAddMessage("翻取怪物牌:"+fight_FirstMonster.name, myText, listView, function(){
			skillCharacters_SumeiJiaohua(nowPlayerTerm[nowPlayerNumber],function(){
				skillCharacters_Yaoqiang(function(){
					skillCharacters_ChonglouSpBaqi(fight_FirstMonster,takeOverCardIsNPC);
				});
			});
		});
	}
 }

function takeOverCardIsNPC(){
	if(fight_FirstMonster==null){
		judgeWinorLose();
	}
	else if (fight_FirstMonster.dodge == 0) {
		useDongmingbaojing(null, function(){
			// 玩家一处理NPC效果
			if (nowPlayerTerm[nowPlayerNumber]._name==player1._name) {
				addDialog(mainScene, new selectNpcEffectDialogLayer("请选择要执行的NPC效果",fight_FirstMonster,function(result){
					if(result==null){
						attackMonsterHandle();
					}else{
						npc_Effect(fight_FirstMonster,result,function(){
							nextStep=6;
							roundAttackEnd();
						});
					}
				}));
			} else {
				// AI处理NPC效果
				// 判断此时怪物牌是否为空，若是，则结束打怪，否则翻取下一张怪牌
				if (game_MonsterDeck.length == 0) {
					// do something AI进行NPC效果的选择
					textAreaAddMessage("怪物牌堆已空，无法翻取下一张", myText, listView);
					judgeWinorLose();
				} else {
					// 展示怪物牌
					textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"翻取下一张怪牌", myText, listView);
					fight_FirstMonster = topMonsterCard(game_MonsterDeck.shift());
					tempMonster = fight_FirstMonster;
					turnMonsterCardLayer.instead();
					turnMonsterCardLayer=new TurnMonsterCardLayer(fight_FirstMonster);
					mainScene.addChild(turnMonsterCardLayer);
					// monsterLabel.loadTexture(fight_FirstMonster.monsterPicSrc);
					textAreaAddMessage("翻取怪物牌:"+fight_FirstMonster.name, myText, listView, function(){
						takeOverCardIsNPC();
					});
				}
			}
		});
	}else{
		// 战斗开始阶段
		// 一大堆人物技能
		// 王小虎【发挥不稳定】
		skillCharacters_WangxiaohuFahuibuwending(function(){
			// 重楼【降临】
			skillCharacters_ChonglouJianglin();
			// 玄霄【结拜】
			skillCharacters_XuanxiaoJiebaiHandle();
			// 小蛮【活力】
			skillCharacters_XiaomanHuoli(function(){
				// 龙幽【表现欲】
				skillCharacters_LongyouBiaoxianyu(function(){
					// 唐雨柔sp【入梦调】效果
					skillCharacters_TangyurouSpRumengdiao(function(){
						// 初次计算双方是否命中
						calculateAttakIsMiss(function(){
							// 处理怪物出场效果
							// monster_OpenEffect(fight_FirstMonster,function(){
							fight_FirstMonster.openEffect(function(){
								if(nowPlayerTerm[nowPlayerNumber].hp>0){
									// 湮世穹兵【侵略如火】
									skillCharacters_YanshiqiongbingQinlueruhuo();
									// 判断支援妨碍结果，并计算双方战力
									// 同时判断死亡处理
									calculate_Attack(function(){
										// AI出战牌
										judgeWhoUseFightCard(function(){
											// 玩家出战牌.....
											textAreaAddMessage("请选择要出的战牌或进入下一阶段", myText, listView);
											buttonManager(order2Button, true, true);
										});
									});
								}else{
									nextStep=8;
									buttonManager(order2Button, true, true);
								}
							});
						});
					});
				});
			});
		});
	}
}

// 询问是否使用NPC助战效果，callBack为询问之后进入的阶段
function useNpcZhuzhanCard(callBack){
	if(player1.hp>0&&player1.npcHelp.length>0){
		addDialog(mainScene, new selectNumberDialogLayer("请选择要使用的NPC牌数量",player1.npcHelp.length,function(result){
			if(result==null||result==0){
				// 直接进入下一阶段
				useDongmingbaojing(nowPlayerTerm[nowPlayerNumber], callBack);
			}else{
				var addCombat=result;
				for(var i=0;i<result;i++){
					player1.npcHelp.pop();
				}
				addDialog(mainScene, new ChooseZoneLayer("是否为触发方增加战力？(否则为怪物方增加)",function(result){
					if(result){
						triggerCombat+=addCombat;
						textAreaAddMessage(player1._name+"使用NPC助战效果，为触发方增加"+addCombat+"点战力", myText, listView,function(){
							// 进入下一阶段
							callBack();
						});
					}else{
						monsterCombat+=addCombat;
						textAreaAddMessage(player1._name+"使用NPC助战效果，为怪物方增加"+addCombat+"点战力", myText, listView,function(){
							// 进入下一阶段
							callBack();
						});
					}
				}));
			}
		}));
	}else{
		// 直接进入下一阶段
		callBack();
	}
}


function hunzhanHandle(result){
	if(result){
		attack_1 = true;
		textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"发动混战", myText, listView);
		fight_SecondMonster =topMonsterCard(game_MonsterDeck.shift());
		textAreaAddMessage("翻取怪物牌:"+fight_SecondMonster.name, myText, listView);
		// 显示怪物牌
		turnMonsterCardLayer.instead();
		turnMonsterCardLayer=new TurnMonsterCardLayer(fight_SecondMonster);
		mainScene.addChild(turnMonsterCardLayer);
		// monsterLabel.loadTexture(fight_SecondMonster.monsterPicSrc);
		tempMonster = fight_SecondMonster;
		if (fight_SecondMonster.dodge == 0) {
			for (var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++) {
				if (nowPlayerTerm[nowPlayerNumber].friendList[i].hp > 0
						&& !nowPlayerTerm[nowPlayerNumber].friendList[i]._name!=nameMurongziying
						&& (fight_SecondMonster.name==nowPlayerTerm[nowPlayerNumber].friendList[i].lover1
								|| fight_SecondMonster.name==nowPlayerTerm[nowPlayerNumber].friendList[i].lover2
								|| fight_SecondMonster.name==nowPlayerTerm[nowPlayerNumber].friendList[i].lover3
								|| fight_SecondMonster.name==nowPlayerTerm[nowPlayerNumber].friendList[i].lover4)){
					textAreaAddMessage("由于倾慕效果，NPC战力×2", myText, listView);
					fight_SecondMonster.combat *= 2;
					break;
				}
			}
			triggerCombat += fight_SecondMonster.combat;
		} else {
			monsterCombat += fight_SecondMonster.combat;
		}
		// 进入打怪结算
		judgeWhoUseFightCard(function(){
			textAreaAddMessage("请选择要用的战牌或进入下一阶段", myText, listView);
			buttonManager(order2Button, true, true);
		});
	}else{
		textAreaAddMessage("请选择要用的战牌或进入下一阶段", myText, listView);
		buttonManager(order2Button, true, true);
		// 不混战，直接进入打怪结算
		/*
		 * judgeWhoUseFightCard(function(){ });
		 */
	}
}

// 打怪阶段2(混战)
function roundAttack2(){
	// cc.log("询问是否混战了");
	if(game_MonsterDeck.length>0){
		if(nowPlayerTerm[nowPlayerNumber]._name==player1._name){
			addDialog(mainScene, new ChooseZoneLayer("是否混战？",function(result){
				hunzhanHandle(result);
			}));
		}else{
			// AI决定是否混战
			hunzhanHandle(baseAIIsHunzhan());
		}
	}else{
		// 怪物牌堆已经为空，不再混战，直接进入打怪结算
		textAreaAddMessage("请选择要用的战牌或进入下一阶段", myText, listView);
		// buttonManager(order2Button, true, true);
		autoNextStep();
	}
}

function roundAttack3(){
	attack_3 = false;
	if(!jiangshili_xisheng){
		textAreaAddMessage("触发方最终战力："+triggerCombat, myText, listView);
		textAreaAddMessage("怪物方最终战力："+monsterCombat, myText, listView);
	}
	if ((jiangshili_xisheng && (fight_Trigger[0]._name==nameJiangshili|| (fight_Trigger
			.length > 1 && fight_Trigger[1]._name==nameJiangshili)))
		|| (!jiangshili_xisheng && (triggerCombat >= monsterCombat))){
		textAreaAddMessage("打怪胜利", myText, listView);
		skillCharacters_JiangyunfanSpFuai(function(){
			// 执行第一只怪物的胜利结算
			fight_FirstMonster.winEffect(function(){
				// 判断触发者是否因为结算而阵亡
				// 没有阵亡，则继续：
				if(nowPlayerTerm[nowPlayerNumber].hp>0){
					// 1、混战且没翻到npc，则执行第二只怪物的胜利结算
					if(fight_SecondMonster!=null&&fight_SecondMonster.dodge>0){
						// monster_WinEffect(fight_SecondMonster,function(){
						fight_SecondMonster.winEffect(function(){
							// 所有怪物的胜利效果结算完毕后，如果触发者依旧没有阵亡，则开始收为宠物询问
							if ( nowPlayerTerm[nowPlayerNumber].hp > 0) {
								// 先收第一只宠物
								calculate_Pets(nowPlayerTerm[nowPlayerNumber], fight_FirstMonster,function(){
									// 再收第二只宠物
									calculate_Pets(nowPlayerTerm[nowPlayerNumber],fight_SecondMonster,function(){
										// 林月如【嫉恶如仇】技能
										skillCharacters_LinyueruJieruchou(fight_Monster, fight_Trigger);
										// buttonManager(order2Button, true,
										// true);
										autoNextStep();
									});
								});
							}else{
								// 触发者因为第二只怪物的胜利结算而阵亡，则打怪结束
								// 林月如【嫉恶如仇】技能
								skillCharacters_LinyueruJieruchou(fight_Monster, fight_Trigger);
								// buttonManager(order2Button, true, true);
								autoNextStep();
							}
						});
					}else{
						// 2、没混战或者混战翻到npc，直接收宠
						calculate_Pets(nowPlayerTerm[nowPlayerNumber], fight_FirstMonster,function(){
							// 林月如【嫉恶如仇】技能
							skillCharacters_LinyueruJieruchou(fight_Monster, fight_Trigger);
							// buttonManager(order2Button, true, true);
							autoNextStep();
						});
					}
				}else{
					// 触发者阵亡，直接结束后面的结算
					// 林月如【嫉恶如仇】技能
					skillCharacters_LinyueruJieruchou(fight_Monster, fight_Trigger);
					// buttonManager(order2Button, true, true);
					autoNextStep();
				}
			});
		},function(){
			autoNextStep();
			// buttonManager(order2Button, true, true);
		});
	}else{
		textAreaAddMessage("打怪失败", myText, listView);
		skillCharacters_JiangyunfanSpFuai(function(){
			// 执行失败效果
			fight_FirstMonster.loseEffect(function(){
				if(fight_SecondMonster!=null&&nowPlayerTerm[nowPlayerNumber].hp>0&&fight_SecondMonster.dodge>0){
					// monster_LoseEffect(fight_SecondMonster,function(){
					fight_SecondMonster.loseEffect(function(){
						skillCharacters_LinyueruJieruchou(fight_Trigger, fight_Monster,function(){
							skillCharacters_WenhuiManheng(function(){
								// buttonManager(order2Button, true, true);
								autoNextStep();
							});
						});
					});
				}else{
					skillCharacters_LinyueruJieruchou(fight_Trigger, fight_Monster,function(){
						skillCharacters_WenhuiManheng(function(){
							// buttonManager(order2Button, true, true);
							autoNextStep();
						});
					});
				}
			});
		},function(){
			autoNextStep();
			// buttonManager(order2Button, true, true);
		});
		
	}
}


function roundAttackEnd(){
		// 欧阳慧【雷灵】效果
		skillCharacters_OuyanghuiLeiling(function(){
			// 小蛮sp【嘟儿的礼物】效果
			skillCharacters_XiaomanSpDuerdeliwu(function(){
				attack_1 = false;
				attack_2 = false;
				attack_3=true;
				ai_AttackMonster = false;
				fight_Trigger=new Array(); // 战斗结束时，清空本回合触发方列表
				fight_Monster=new Array(); // 战斗结束时，清空本回合怪物方列表
				monsterCombat = 0;
				triggerCombat = 0;
				NPCEffect = false;
				linyueruSpBiwuzhaoqinMaleList=[];
				linyueruSpBiwuzhaoqinFemaleList=[];
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
					handleBaofaEqumentsAndPets(nowPlayerTerm[i]);
				}
				dropCarding = false;
				// 云天河【后羿射日弓】效果判定
				skillCharacters_YuntianheHouyisheriongEnd();
				// 龙幽sp【妖枪】效果结束
				skillCharacters_YaoqiangEnd();
				// 姜世离【牺牲】死亡退场
				skillCharacters_JiangshiliXishenHandle();
				textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"的打怪阶段结束", myText, listView);
				// 酒剑仙【醉仙望月步】触发
				skillCharacters_JiujianxianZuixianwangyubu();
				if(nowPlayerTerm[nowPlayerNumber].hp<=0){
					nextStep=8;
				}
				// autoNextStep();
				buttonManager(order2Button, true, true);
			});
		});
}

function roundAddHandCard(){
	var nowPlayer=nowPlayerTerm[nowPlayerNumber];
	if(nowPlayer.hp>0){
		var i=0;
		var addCardNumber=0;
		skillCharacters_AnuWangushitian(function(){
			if(attakedMoster){
				textAreaAddMessage(nowPlayer._name+"有"+nowPlayer.handCard.length+"张牌，需要从牌堆中补2张牌", myText, listView);
			}else{
				i=1;
				textAreaAddMessage(nowPlayer._name+"有"+nowPlayer.handCard.length+"张牌，需要从牌堆中补1张牌", myText, listView);
			}
			addCardNumber=2-i;
			if (nowPlayerTerm[nowPlayerNumber].pet_Lei==nameChiguiwang) {
				addCardNumber++;
				textAreaAddMessage("由于赤鬼王宠物效果"+nowPlayer._name+"多补1张牌", myText, listView);
			}
			// 酒剑仙【醉仙望月步】技能补牌效果
			if (nowPlayerTerm[nowPlayerNumber].skillNameList.containsObject(skillnameZuixianwangyuebu)
					&& attakedMoster && jiujianxianZuiXianWangYueBu == 0) {
				addCardNumber++;
				textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"由于【醉仙望月步】效果，多补1张牌", myText, listView);
			}
			addHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],null,[addCardNumber],true,true);
			autoNextStep();
			// buttonManager(order2Button, true, true);
		});
	}
}

function roundDropCard(){
	if(nowPlayerTerm[nowPlayerNumber].hp>0){
		buttonManager(order1Button, false, false);
		textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"的弃牌阶段", myText, listView,function(){
			useAnyTimeSkill(function(){
				var dropCard = false;
				var maxCard = 0, rightCards = 0;
				if (nowPlayerTerm[nowPlayerNumber].skillNameList
						.containsObject(skillnameJianxia)
						&& nowPlayerTerm[nowPlayerNumber].handCard.length > 5) {
					mainScene.addChild(new NormalSkillAnimationLayer(skillnameJianxia,nowPlayerTerm[nowPlayerNumber].hadImageView));
					dropCard = true;
					maxCard = 5;
				}else if (!nowPlayerTerm[nowPlayerNumber].skillNameList
						.containsObject(skillnameJianxia)
						&& nowPlayerTerm[nowPlayerNumber].handCard.length > 3) {
					dropCard = true;
					maxCard = 3;
				}

				if (dropCard) {
					rightCards =nowPlayerTerm[nowPlayerNumber].handCard.length- maxCard;
					textAreaAddMessage("需要弃置"+rightCards+"张手牌", myText, listView);
					if (nowPlayerTerm[nowPlayerNumber]._name==player1._name) {
						dropCarding = true;
					} else {
						var count = nowPlayerTerm[nowPlayerNumber].handCard.length-maxCard;
						for (var i = 0; i < count; i++) {
							var num=nowPlayerTerm[nowPlayerNumber].handCard.length;
							var temp =parseInt(Math.random()*num, 10); 
							remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].handCard[temp].name);
							textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"弃置了手牌:"+nowPlayerTerm[nowPlayerNumber].handCard[temp].name, myText, listView);
							var tempCard=nowPlayerTerm[nowPlayerNumber].handCard[temp];
							nowPlayerTerm[nowPlayerNumber].handCard.removeObject(tempCard);
							tempCard.release();
						}
						autoNextStep();
						// buttonManager(order2Button, true, true);
					}
				} else {
					if (nowPlayerNumber == 0) {
						buttonManager(order1Button, true, true);
					}
					textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"不用弃牌", myText, listView);
					autoNextStep();
					// buttonManager(order2Button, true, true);
				}
			});
		});
		
	}
}

// 回合结束阶段
function roundEnding(){
	// 赵灵儿sp【回魂仙梦】结束
	skillCharacters_ZhaolingerHuihunxianmengEnd();
	// 关闭怪物牌展示窗口
	if(turnMonsterCardLayer!=null){
		turnMonsterCardLayer.instead();
		turnMonsterCardLayer=null;
	}
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
		handleBaofaEqumentsAndPets(nowPlayerTerm[i]);
	}
	attack_1 = false; // 第一次打怪
	attack_2 = false; // 第二次打怪
	// 清空赠剑列表
	zengJian=new Array();
	skillEffectDropCard = 0;
	laShouCuiHuaList=new Array();
	// 回合结束，判断是否游戏结束
	if (!judgeWinorLose()) {
		// nowPlayerTerm[nowPlayerNumber].hadImageView.setOpacity(150);
		removeActionMark();
		textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"的回合结束", myText, listView);
		// 魔尊【崩坏】技能
		skillCharacters_MozunBenghuai();
		autoNextStep();
		// buttonManager(order2Button, true, true);
	}
}

function _createMsg(messageType,messageContent){
	var messageData=new MessageData(messageType);
	messageData.messageContent=messageContent;
	return messageData;
}

function sendRoundMessageManager(){
	if(nextStep==0){
		round_Start();
	}
	else if(nextStep==1){
		round_Event();
	}else if(nextStep==2){
		roundSkillCard();
	}else if(nextStep==3){
		for(var i=0;i<player1.handCard.length;i++){
			player1.handCard[i].clicked=false;
			player1.handCard[i].setOpacity(180);
		}
		skillCharacters_XiaomanWufawutian(function(){
			if(nowPlayerTerm[nowPlayerNumber].hp>0){
				useDongmingbaojing(null,roundAttack1);
			}else{
				nextStep=9;
				sendRoundMessageManager();
			}
		});
	}else if(nextStep==4){
		useNpcZhuzhanCard(function(){
			useDongmingbaojing(null, roundAttack2);
		});
	}else if(nextStep==5){
		useNpcZhuzhanCard(roundAttack3);
	}else if(nextStep==6){
		roundAttackEnd()
	}else if(nextStep==7){
		textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"的补牌阶段", myText, listView);
		roundAddHandCard();
	}else if(nextStep==8){
		roundDropCard();
	}else if(nextStep==9){
		roundEnding();
		if(nextStep==9){
			do{
				nowPlayerNumber++;
				nowPlayerNumber%=nowPlayerTerm.length;
			}while(nowPlayerTerm[nowPlayerNumber].hp<=0);
			nextStep=-1;
		}
	}
}

/**
 * 自动进入下一阶段
 */

function autoNextStep(){
	if(autoNextStepSwitch=="true"){
		order2Button.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
			for(var i=0;i<player1.handCard.length;i++){
				player1.handCard[i].clicked=false;
				player1.handCard[i].setOpacity(200);
			}
			buttonManager(order2Button, false, false);
			nextStep++;
			sendRoundMessageManager();
		})));
	}else{
		buttonManager(order2Button, true, true);
	}
}


/**
 * 牌进入弃牌堆的方法
 * 
 * @param cardName
 */
function remove_Card_Into_DropDeck(cardName) {
	cardName=cardName.replaceAll("\\(爆发\\)");
	if(cardName=="无"){
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
}