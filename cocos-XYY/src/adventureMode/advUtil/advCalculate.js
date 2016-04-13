var triggerCombat = 0;
var monsterCombat = 0;


//出场效果结算之后再次判断支援、妨碍是否命中，且计算双方战力比
function advCalculate_Attack(callBack) {
	attack_1 = true;
	//龙幽【表现欲】后续处理
	advSkillCharacters_LongyouBiaoxianyuHandle(function(){
		// 先判断支援妨碍是否命中，并计算各自方的战力
		triggerCombat = fight_Trigger[0].combat;
		monsterCombat = fight_FirstMonster.combat;
		// 姜世离【魔君】技能
		advSkillCharacters_JiangshiliMojun(function(){
			// 魔翳【锁魂】技能
			advSkillCharacters_MoyiSuohunAddCombat(function(){
				// 梦蛇【女娲】技能
				advSkillCharacters_ZhaolingerMengsheNvwa(function(){
					//十字妖槊效果
					shiziyaoshuoAddCombatEffect(function(){
						if (fight_Trigger.length > 1) {
							// 当支援者没有因为出场效果而死亡时：
							if (fight_Trigger[1].hp > 0||fight_Trigger[1]._name==nameLiumengliMengkuilei
									|| fight_Trigger[1]._name==nameJinchanguimu) {
								// 龙幽【越行之术】技能
								var isNotMiss = advAttactIsMiss(fight_Trigger[1],fight_FirstMonster);
								if (isNotMiss) {
									triggerCombat += fight_Trigger[1].combat;
									textAreaAddMessage(fight_Trigger[1]._name+"支援成功，触发方战力增加,当前战力为："+triggerCombat, myText, listView);
								} else {
									textAreaAddMessage(fight_Trigger[1]._name+"支援失败", myText, listView);
									// 沈欺霜【仙霞五奇】技能
									advSkillCharacters_ShenqishuangXianxiawuqi(false, fight_Trigger[0], fight_Trigger[0]);
								}
							}else{
								textAreaAddMessage(fight_Trigger[1]._name+"支援者阵亡，无法支援", myText, listView);
								// 支援者阵亡，沈欺霜【仙霞五奇】重新发动
								advSkillCharacters_ShenqishuangXianxiawuqi(true, nowPlayerTerm[nowPlayerNumber], fight_Trigger[0]);
							}
						} else {
							// 无人支援，沈欺霜【仙霞五奇】重新发动
							advSkillCharacters_ShenqishuangXianxiawuqi(true, nowPlayerTerm[nowPlayerNumber], fight_Trigger[0]);
						}
						textAreaAddMessage("魔主妨碍成功", myText, listView, function(){
							monsterCombat+=boss.combat;
							if(boss._name!=bossNameShushanqisheng){
								var number=parseInt(Math.random()*6, 10)+1;
								textAreaAddMessage(boss._name+"掷骰点数为:"+number+",怪物方战力增加", myText, listView,function(){
									if(boss._name==bossNameHuyaonv&&number<=3){
										number+=3;
									}
									monsterCombat+=number;
									callBack();
								});
							}else{
								callBack();
							}
						})
					});
				});
			});
		});
	});
}

//初次判断
function advCalculateAttakIsMiss(callBack){
	// 拜月教主【水魔兽合体】技能
	advSkillCharacters_BaiyueShuimoshouheti(function(){
		// 李逍遥“飞龙探云手”技能
		advSkillCharacters_LixiaoyaoFeilongtanyunshou(function(){
			// 云天河【天河剑】效果
			advSkillCharacterss_YuntianheTianhejian(function(){
				// 李逍遥“侠骨柔肠”技能
				advSkillCharacters_LixiaoyaoXiagurouchang(fight_Trigger[1],function(){
					if(fight_Trigger.length > 1){
						var isNotMiss = advAttactIsMiss(fight_Trigger[1],fight_FirstMonster);
						if (isNotMiss) {
							textAreaAddMessage(fight_Trigger[1]._name+"支援成功", myText, listView);
							// 温慧【阵法】技能
							advSkillCharacters_WenhuiZhenfa();
						} else {
							textAreaAddMessage(fight_Trigger[1]._name+"支援失败", myText, listView);
						}
					}
					callBack();
				});
			});
		});
	});
}



//收为宠物
function advCalculate_Pets(winner, monster,callBack) {
	if (monster.nature=="风") {
		if (winner.pet_FengMonster == null) {
			textAreaAddMessage(winner._name+"获得"+monster.name+"为宠物", myText, listView);
			winner.pet_Feng = monster.name;
			advPet_Effect(monster, winner);
			winner.pet_FengMonster = monster;
			// 紫萱【关爱】技能
			advSkillCharacters_ZixuanGuanai(winner,function(){
				// 紫萱【神圣】效果
				advSkillCharacters_ZixuanShensheng(winner,monster,function(){
					// 南宫煌【摄灵法阵】效果
					advSkillCharacters_NangonghuangShelingfazheng("风",function(){
						// 赵灵儿【梦蛇】效果
						advSkillCharacters_ZhaolingerMengshe();
						if(callBack!=null){
							callBack();
						}
					});
				});
			});
		} else if (winner.pet_FengMonster != null) {
			if (winner._name==myControlPlayer._name) {
				addDialog(mainScene, new ChooseZoneLayer("是否用"+monster.name+"替换"+winner.pet_FengMonster.name+"?",function(result){
					if(result){
						advUpdate_PetsEffect(winner.pet_FengMonster,winner);
						winner.pet_Feng = monster.name;
						winner.pet_FengMonster = monster;
						textAreaAddMessage(winner._name+"获得了宠物:"+winner.pet_FengMonster.name, myText, listView);
						advPet_Effect(monster, winner);
						// 紫萱【关爱】技能
						advSkillCharacters_ZixuanGuanai(winner,function(){
							// 紫萱【神圣】效果
							advSkillCharacters_ZixuanShensheng(winner,monster,function(){
								// 南宫煌【摄灵法阵】效果
								advSkillCharacters_NangonghuangShelingfazheng("风", function(){
									// 赵灵儿【梦蛇】效果
									advSkillCharacters_ZhaolingerMengshe();
									if(callBack!=null){
										callBack();
									}
								});
							});
						});
					}else{
						textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
						game_MonsterDropDeck.push(monster.uid);
						if(callBack!=null){
							callBack();
						}
					}
				}));
			} else {
				// AI决定是否替换宠物
				textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
				game_MonsterDropDeck.push(monster.uid);
				if(callBack!=null){
					callBack();
				}
			}
		}
	} else if (monster.nature=="雷") {
		if (winner.pet_LeiMonster == null) {
			textAreaAddMessage(winner._name+"获得"+monster.name+"为宠物", myText, listView);
			winner.pet_Lei = monster.name;
			advPet_Effect(monster, winner);
			winner.pet_LeiMonster = monster;
			// 紫萱【关爱】技能
			advSkillCharacters_ZixuanGuanai(winner,function(){
				// 紫萱【神圣】效果
				advSkillCharacters_ZixuanShensheng(winner,monster,function(){
					// 南宫煌【摄灵法阵】效果
					advSkillCharacters_NangonghuangShelingfazheng("雷", function(){
						// 赵灵儿【梦蛇】效果
						advSkillCharacters_ZhaolingerMengshe();
						if(callBack!=null){
							callBack();
						}
					});
				});
			});
		} else if (winner.pet_LeiMonster != null) {
			if (winner._name==myControlPlayer._name) {
				addDialog(mainScene, new ChooseZoneLayer("是否用"+monster.name+"替换"+winner.pet_LeiMonster.name+"?",function(result){
					if(result){
						advUpdate_PetsEffect(winner.pet_LeiMonster,winner);
						winner.pet_Lei = monster.name;
						winner.pet_LeiMonster = monster;
						textAreaAddMessage(winner._name+"获得了宠物:"+winner.pet_LeiMonster.name, myText, listView);
						advPet_Effect(monster, winner);
						// 紫萱【关爱】技能
						advSkillCharacters_ZixuanGuanai(winner,function(){
							// 紫萱【神圣】效果
							advSkillCharacters_ZixuanShensheng(winner,monster,function(){
								// 南宫煌【摄灵法阵】效果
								advSkillCharacters_NangonghuangShelingfazheng("雷", function(){
									// 赵灵儿【梦蛇】效果
									advSkillCharacters_ZhaolingerMengshe();
									if(callBack!=null){
										callBack();
									}
								});
							});
						});
					}else{
						textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
						game_MonsterDropDeck.push(monster.uid);
						if(callBack!=null){
							callBack();
						}
					}
				}));
			} else {
				// AI决定是否替换宠物
				textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
				game_MonsterDropDeck.push(monster.uid);
				if(callBack!=null){
					callBack();
				}
			}
		}
	} else if (monster.nature=="水") {
		if (winner.pet_ShuiMonster == null) {
			textAreaAddMessage(winner._name+"获得"+monster.name+"为宠物", myText, listView);
			winner.pet_Shui = monster.name;
			advPet_Effect(monster, winner);
			winner.pet_ShuiMonster = monster;
			// 紫萱【关爱】技能
			advSkillCharacters_ZixuanGuanai(winner,function(){
				// 紫萱【神圣】效果
				advSkillCharacters_ZixuanShensheng(winner,monster,function(){
					// 南宫煌【摄灵法阵】效果
					advSkillCharacters_NangonghuangShelingfazheng("水", function(){
						// 赵灵儿【梦蛇】效果
						advSkillCharacters_ZhaolingerMengshe();
						if(callBack!=null){
							callBack();
						}
					});
				});
			});
		} else if (winner.pet_ShuiMonster != null) {
			if (winner._name==myControlPlayer._name) {
				addDialog(mainScene, new ChooseZoneLayer("是否用"+monster.name+"替换"+winner.pet_ShuiMonster.name+"?",function(result){
					if(result){
						advUpdate_PetsEffect(winner.pet_ShuiMonster,winner);
						winner.pet_Shui = monster.name;
						winner.pet_ShuiMonster = monster;
						textAreaAddMessage(winner._name+"获得了宠物:"+winner.pet_ShuiMonster.name, myText, listView);
						advPet_Effect(monster, winner);
						// 紫萱【关爱】技能
						advSkillCharacters_ZixuanGuanai(winner,function(){
							// 紫萱【神圣】效果
							advSkillCharacters_ZixuanShensheng(winner,monster,function(){
								// 南宫煌【摄灵法阵】效果
								advSkillCharacters_NangonghuangShelingfazheng("水", function(){
									// 赵灵儿【梦蛇】效果
									advSkillCharacters_ZhaolingerMengshe();
									if(callBack!=null){
										callBack();
									}
								});
							});
						});
					}else{
						textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
						game_MonsterDropDeck.push(monster.uid);
						if(callBack!=null){
							callBack();
						}
					}
				}));
			} else {
				// AI决定是否替换宠物
				textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
				game_MonsterDropDeck.push(monster.uid);
				if(callBack!=null){
					callBack();
				}
			}
		}
	} else if (monster.nature=="火") {
		if (winner.pet_HuoMonster == null) {
			textAreaAddMessage(winner._name+"获得"+monster.name+"为宠物", myText, listView);
			winner.pet_Huo = monster.name;
			advPet_Effect(monster, winner);
			winner.pet_HuoMonster = monster;
			// 紫萱【关爱】技能
			advSkillCharacters_ZixuanGuanai(winner,function(){
				// 紫萱【神圣】效果
				advSkillCharacters_ZixuanShensheng(winner,monster,function(){
					// 南宫煌【摄灵法阵】效果
					advSkillCharacters_NangonghuangShelingfazheng("火", function(){
						// 赵灵儿【梦蛇】效果
						advSkillCharacters_ZhaolingerMengshe();
						if(callBack!=null){
							callBack();
						}
					});
				});
			});
		} else if (winner.pet_HuoMonster != null) {
			if (winner._name==myControlPlayer._name) {
				addDialog(mainScene, new ChooseZoneLayer("是否用"+monster.name+"替换"+winner.pet_HuoMonster.name+"?",function(result){
					if(result){
						advUpdate_PetsEffect(winner.pet_HuoMonster,winner);
						winner.pet_Huo = monster.name;
						winner.pet_HuoMonster = monster;
						textAreaAddMessage(winner._name+"获得了宠物:"+winner.pet_HuoMonster.name, myText, listView);
						cc.log("准备处理"+monster.name+"的宠物效果了");
						advPet_Effect(monster, winner);
						// 紫萱【关爱】技能
						advSkillCharacters_ZixuanGuanai(winner,function(){
							// 紫萱【神圣】效果
							advSkillCharacters_ZixuanShensheng(winner,monster,function(){
								// 南宫煌【摄灵法阵】效果
								advSkillCharacters_NangonghuangShelingfazheng("火", function(){
									// 赵灵儿【梦蛇】效果
									advSkillCharacters_ZhaolingerMengshe();
									if(callBack!=null){
										callBack();
									}
								});
							});
						});
					}else{
						textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
						game_MonsterDropDeck.push(monster.uid);
						if(callBack!=null){
							callBack();
						}
					}
				}));
			} else {
				// AI决定是否替换宠物
				textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
				game_MonsterDropDeck.push(monster.uid);
				if(callBack!=null){
					callBack();
				}
			}
		}
	} else if (monster.nature=="土") {
		if (winner.pet_TuMonster == null) {
			textAreaAddMessage(winner._name+"获得"+monster.name+"为宠物", myText, listView);
			winner.pet_Tu = monster.name;
			advPet_Effect(monster, winner);
			winner.pet_TuMonster = monster;
			// 紫萱【关爱】技能
			advSkillCharacters_ZixuanGuanai(winner,function(){
				// 紫萱【神圣】效果
				advSkillCharacters_ZixuanShensheng(winner,monster,function(){
					// 南宫煌【摄灵法阵】效果
					advSkillCharacters_NangonghuangShelingfazheng("土", function(){
						// 赵灵儿【梦蛇】效果
						advSkillCharacters_ZhaolingerMengshe();
						if(callBack!=null){
							callBack();
						}
					});
				});
			});
		} else if (winner.pet_TuMonster != null) {
			if (winner._name==myControlPlayer._name) {
				addDialog(mainScene, new ChooseZoneLayer("是否用"+monster.name+"替换"+winner.pet_TuMonster.name+"?",function(result){
					if(result){
						advUpdate_PetsEffect(winner.pet_TuMonster,winner);
						winner.pet_Tu = monster.name;
						winner.pet_TuMonster = monster;
						textAreaAddMessage(winner._name+"获得了宠物:"+winner.pet_TuMonster.name, myText, listView);
						advPet_Effect(monster, winner);
						// 紫萱【关爱】技能
						advSkillCharacters_ZixuanGuanai(winner,function(){
							// 紫萱【神圣】效果
							advSkillCharacters_ZixuanShensheng(winner,monster,function(){
								// 南宫煌【摄灵法阵】效果
								advSkillCharacters_NangonghuangShelingfazheng("土", function(){
									// 赵灵儿【梦蛇】效果
									advSkillCharacters_ZhaolingerMengshe();
									if(callBack!=null){
										callBack();
									}
								});
							});
						});
					}else{
						textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
						game_MonsterDropDeck.push(monster.uid);
						if(callBack!=null){
							callBack();
						}
					}
				}));
			} else {
				// AI决定是否替换宠物
				textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
				game_MonsterDropDeck.push(monster.uid);
				if(callBack!=null){
					callBack();
				}
			}
		}
	}
}