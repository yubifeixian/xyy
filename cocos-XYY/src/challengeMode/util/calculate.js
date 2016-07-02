var triggerCombat = 0;
var monsterCombat = 0;


// 出场效果结算之后再次判断支援、妨碍是否命中，且计算双方战力比
function calculate_Attack(callBack) {
	attack_1 = true;
	//龙幽【表现欲】后续处理
	skillCharacters_LongyouBiaoxianyuHandle(function(){
		//重楼sp【霸气】后续处理
		skillCharacters_ChonglouSpBaqiHandle(function(){
			// 先判断支援妨碍是否命中，并计算各自方的战力
			triggerCombat = fight_Trigger[0].combat;
			monsterCombat = fight_FirstMonster.combat;
			// 姜世离【魔君】技能
			skillCharacters_JiangshiliMojun(function(){
				// 魔翳【锁魂】技能
				skillCharacters_MoyiSuohunAddCombat(function(){
					// 梦蛇【女娲】技能
					skillCharacters_ZhaolingerMengsheNvwa(function(){
						//姜云凡sp【狂风寨】技能
						skillCharacters_JiangyunfanSpKuangfengzhai(function(){
							if (fight_Trigger.length > 1) {
								// 当支援者没有因为出场效果而死亡时：
								if (fight_Trigger[1].hp > 0||fight_Trigger[1]._name==nameLiumengliMengkuilei
										|| fight_Trigger[1]._name==nameJinchanguimu) {
									var isNotMiss = attactIsMiss(fight_Trigger[1],fight_FirstMonster);
									// 龙幽【越行之术】技能
									if (isNotMiss) {
										triggerCombat += fight_Trigger[1].combat;
										textAreaAddMessage(fight_Trigger[1]._name+"支援成功，触发方战力增加,当前战力为："+triggerCombat, myText, listView);
									} else {
										textAreaAddMessage(fight_Trigger[1]._name+"支援失败", myText, listView);
										// 沈欺霜【仙霞五奇】技能
										skillCharacters_ShenqishuangXianxiawuqi(false, fight_Trigger[0], fight_Trigger[0]);
									}
								}else{
									textAreaAddMessage(fight_Trigger[1]._name+"支援者阵亡，无法支援", myText, listView);
									// 支援者阵亡，沈欺霜【仙霞五奇】重新发动
									skillCharacters_ShenqishuangXianxiawuqi(true, nowPlayerTerm[nowPlayerNumber], fight_Trigger[0]);
								}
							} else {
								// 无人支援，沈欺霜【仙霞五奇】重新发动
								skillCharacters_ShenqishuangXianxiawuqi(true, nowPlayerTerm[nowPlayerNumber], fight_Trigger[0]);
							}
							if (fight_Monster.length > 0) {
								// cc.log("现在的妨碍者是"+fight_Monster[0]._name);
								if (fight_Monster[0]._name==nameLiumengliMengkuilei
										|| fight_Monster[0].hp != 0
										|| fight_Monster[0]._name==nameJinchanguimu) {
									var isNotMiss =attactIsMiss(fight_Monster[0],fight_FirstMonster);
									if (isNotMiss) {
										monsterCombat += fight_Monster[0].combat;
										textAreaAddMessage(fight_Monster[0]._name+"妨碍成功,怪物方战力增加,当前战力为："+monsterCombat, myText, listView,function(){
											//callBack();
											huoqilingPetEffect(callBack);
										});
									} else {
										textAreaAddMessage(fight_Monster[0]._name+"妨碍失败", myText, listView,function(){
											// 沈欺霜【仙霞五奇】技能
											skillCharacters_ShenqishuangXianxiawuqi(false, fight_Monster[0], fight_FirstMonster);
											//callBack();
											huoqilingPetEffect(callBack);
										});
									}
								}else{
									textAreaAddMessage(fight_Monster[0]._name+"妨碍者阵亡,无法妨碍", myText, listView,function(){
										// 无人妨碍，沈欺霜【仙霞五奇】重新发动
										// 沈欺霜【仙霞五奇】技能
										var temPlayer = player1;
										if (nowPlayerNumber == 0
												|| nowPlayerNumber == 2) {
											temPlayer = player3;
										}
										skillCharacters_ShenqishuangXianxiawuqi(true, temPlayer, fight_FirstMonster);
										//callBack();
										huoqilingPetEffect(callBack);
									});
								}
							} else {
								// 无人妨碍，沈欺霜【仙霞五奇】重新发动
								// 沈欺霜【仙霞五奇】技能
								var temPlayer = player1;
								if (nowPlayerNumber == 0
										|| nowPlayerNumber == 2) {
									temPlayer = player3;
								}
								skillCharacters_ShenqishuangXianxiawuqi(true, temPlayer, fight_FirstMonster);
								//callBack();
								huoqilingPetEffect(callBack);
							}
						});
					});
				});
			});
		})
	});
}

// 初次判断
function calculateAttakIsMiss(callBack){
	// 拜月教主【水魔兽合体】技能
	skillCharacters_BaiyueShuimoshouheti(function(){
		// 李逍遥“飞龙探云手”技能
		skillCharacters_LixiaoyaoFeilongtanyunshou(function(){
			// 云天河【天河剑】效果
			skillCharacterss_YuntianheTianhejian(function(){
				// 李逍遥“侠骨柔肠”技能
				skillCharacters_LixiaoyaoXiagurouchang(fight_Trigger[1],function(){
					if(fight_Trigger.length > 1){
						var isNotMiss = attactIsMiss(fight_Trigger[1],fight_FirstMonster);
						if (isNotMiss) {
							textAreaAddMessage(fight_Trigger[1]._name+"支援成功", myText, listView);
							// 温慧【阵法】技能
							skillCharacters_WenhuiZhenfa();
						} else {
							textAreaAddMessage(fight_Trigger[1]._name+"支援失败", myText, listView);
						}
					}
					if (fight_Monster.length > 0) {
						var isNotMiss =attactIsMiss(fight_Monster[0],fight_FirstMonster);
						if (isNotMiss) {
							textAreaAddMessage(fight_Monster[0]._name+"妨碍成功", myText, listView,callBack);
						} else {
							textAreaAddMessage(fight_Monster[0]._name+"妨碍失败", myText, listView,callBack);
						}
					} else {
						callBack();
					}
				});
			});
		});
	});
}



// 收为宠物
function calculate_Pets(winner, monster,callBack) {
	if (monster.nature=="风") {
		if (winner.pet_FengMonster == null) {
			textAreaAddMessage(winner._name+"获得"+monster.name+"为宠物", myText, listView);
			winner.pet_Feng = monster.name;
			pet_Effect(monster, winner);
			winner.pet_FengMonster = monster;
			// 紫萱【关爱】技能
			skillCharacters_ZixuanGuanai(winner,function(){
				// 紫萱【神圣】效果
				skillCharacters_ZixuanShensheng(winner,monster,function(){
					// 南宫煌【摄灵法阵】效果
					skillCharacters_NangonghuangShelingfazheng("风",function(){
						// 赵灵儿【梦蛇】效果
						skillCharacters_ZhaolingerMengshe();
						if(callBack!=null){
							callBack();
						}
					});
				});
			});
		} else if (winner.pet_FengMonster != null) {
			if (winner._name==player1._name) {
				addDialog(mainScene, new yesOrNoDialogLayer("是否用"+monster.name+"替换"+winner.pet_FengMonster.name+"?",function(result){
					if(result){
						updata_PetsEffect(winner.pet_FengMonster,winner);
						winner.pet_Feng = monster.name;
						winner.pet_FengMonster = monster;
						textAreaAddMessage(winner._name+"获得了宠物:"+winner.pet_FengMonster.name, myText, listView);
						pet_Effect(monster, winner);
						// 紫萱【关爱】技能
						skillCharacters_ZixuanGuanai(winner,function(){
							// 紫萱【神圣】效果
							skillCharacters_ZixuanShensheng(winner,monster,function(){
								// 南宫煌【摄灵法阵】效果
								skillCharacters_NangonghuangShelingfazheng("风", function(){
									// 赵灵儿【梦蛇】效果
									skillCharacters_ZhaolingerMengshe();
									if(callBack!=null){
										callBack();
									}
								});
							});
						});
					}else{
						textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
						if(callBack!=null){
							callBack();
						}
					}
				}));
			} else {
				// AI决定是否替换宠物
				textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
				if(callBack!=null){
					callBack();
				}
			}
		}
	} else if (monster.nature=="雷") {
		if (winner.pet_LeiMonster == null) {
			textAreaAddMessage(winner._name+"获得"+monster.name+"为宠物", myText, listView);
			winner.pet_Lei = monster.name;
			pet_Effect(monster, winner);
			winner.pet_LeiMonster = monster;
			// 紫萱【关爱】技能
			skillCharacters_ZixuanGuanai(winner,function(){
				// 紫萱【神圣】效果
				skillCharacters_ZixuanShensheng(winner,monster,function(){
					// 南宫煌【摄灵法阵】效果
					skillCharacters_NangonghuangShelingfazheng("雷", function(){
						// 赵灵儿【梦蛇】效果
						skillCharacters_ZhaolingerMengshe();
						if(callBack!=null){
							callBack();
						}
					});
				});
			});
		} else if (winner.pet_LeiMonster != null) {
			if (winner._name==player1._name) {
				addDialog(mainScene, new yesOrNoDialogLayer("是否用"+monster.name+"替换"+winner.pet_LeiMonster.name+"?",function(result){
					if(result){
						updata_PetsEffect(winner.pet_LeiMonster,winner);
						winner.pet_Lei = monster.name;
						winner.pet_LeiMonster = monster;
						textAreaAddMessage(winner._name+"获得了宠物:"+winner.pet_LeiMonster.name, myText, listView);
						pet_Effect(monster, winner);
						// 紫萱【关爱】技能
						skillCharacters_ZixuanGuanai(winner,function(){
							// 紫萱【神圣】效果
							skillCharacters_ZixuanShensheng(winner,monster,function(){
								// 南宫煌【摄灵法阵】效果
								skillCharacters_NangonghuangShelingfazheng("雷", function(){
									// 赵灵儿【梦蛇】效果
									skillCharacters_ZhaolingerMengshe();
									if(callBack!=null){
										callBack();
									}
								});
							});
						});
					}else{
						textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
						if(callBack!=null){
							callBack();
						}
					}
				}));
			} else {
				// AI决定是否替换宠物
				textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
				if(callBack!=null){
					callBack();
				}
			}
		}
	} else if (monster.nature=="水") {
		if (winner.pet_ShuiMonster == null) {
			textAreaAddMessage(winner._name+"获得"+monster.name+"为宠物", myText, listView);
			winner.pet_Shui = monster.name;
			pet_Effect(monster, winner);
			winner.pet_ShuiMonster = monster;
			// 紫萱【关爱】技能
			skillCharacters_ZixuanGuanai(winner,function(){
				// 紫萱【神圣】效果
				skillCharacters_ZixuanShensheng(winner,monster,function(){
					// 南宫煌【摄灵法阵】效果
					skillCharacters_NangonghuangShelingfazheng("水", function(){
						// 赵灵儿【梦蛇】效果
						skillCharacters_ZhaolingerMengshe();
						if(callBack!=null){
							callBack();
						}
					});
				});
			});
		} else if (winner.pet_ShuiMonster != null) {
			if (winner._name==player1._name) {
				addDialog(mainScene, new yesOrNoDialogLayer("是否用"+monster.name+"替换"+winner.pet_ShuiMonster.name+"?",function(result){
					if(result){
						updata_PetsEffect(winner.pet_ShuiMonster,winner);
						winner.pet_Shui = monster.name;
						winner.pet_ShuiMonster = monster;
						textAreaAddMessage(winner._name+"获得了宠物:"+winner.pet_ShuiMonster.name, myText, listView);
						pet_Effect(monster, winner);
						// 紫萱【关爱】技能
						skillCharacters_ZixuanGuanai(winner,function(){
							// 紫萱【神圣】效果
							skillCharacters_ZixuanShensheng(winner,monster,function(){
								// 南宫煌【摄灵法阵】效果
								skillCharacters_NangonghuangShelingfazheng("水", function(){
									// 赵灵儿【梦蛇】效果
									skillCharacters_ZhaolingerMengshe();
									if(callBack!=null){
										callBack();
									}
								});
							});
						});
					}else{
						textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
						if(callBack!=null){
							callBack();
						}
					}
				}));
			} else {
				// AI决定是否替换宠物
				textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
				if(callBack!=null){
					callBack();
				}
			}
		}
	} else if (monster.nature=="火") {
		if (winner.pet_HuoMonster == null) {
			//火麒麟胜利效果
			if(monster.name==nameHuoqilin){
				textAreaAddMessage(winner._name+"无火属性宠物，无法获得"+monster.name+"为宠物", myText, listView,callBack);
				return;
			}
			textAreaAddMessage(winner._name+"获得"+monster.name+"为宠物", myText, listView);
			winner.pet_Huo = monster.name;
			pet_Effect(monster, winner);
			winner.pet_HuoMonster = monster;
			// 紫萱【关爱】技能
			skillCharacters_ZixuanGuanai(winner,function(){
				// 紫萱【神圣】效果
				skillCharacters_ZixuanShensheng(winner,monster,function(){
					// 南宫煌【摄灵法阵】效果
					skillCharacters_NangonghuangShelingfazheng("火", function(){
						// 赵灵儿【梦蛇】效果
						skillCharacters_ZhaolingerMengshe();
						if(callBack!=null){
							callBack();
						}
					});
				});
			});
		} else if (winner.pet_HuoMonster != null) {
			if (winner._name==player1._name) {
				addDialog(mainScene, new yesOrNoDialogLayer("是否用"+monster.name+"替换"+winner.pet_HuoMonster.name+"?",function(result){
					if(result){
						updata_PetsEffect(winner.pet_HuoMonster,winner);
						winner.pet_Huo = monster.name;
						winner.pet_HuoMonster = monster;
						textAreaAddMessage(winner._name+"获得了宠物:"+winner.pet_HuoMonster.name, myText, listView);
						cc.log("准备处理"+monster.name+"的宠物效果了");
						pet_Effect(monster, winner);
						// 紫萱【关爱】技能
						skillCharacters_ZixuanGuanai(winner,function(){
							// 紫萱【神圣】效果
							skillCharacters_ZixuanShensheng(winner,monster,function(){
								// 南宫煌【摄灵法阵】效果
								skillCharacters_NangonghuangShelingfazheng("火", function(){
									// 赵灵儿【梦蛇】效果
									skillCharacters_ZhaolingerMengshe();
									if(callBack!=null){
										callBack();
									}
								});
							});
						});
					}else{
						textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
						if(callBack!=null){
							callBack();
						}
					}
				}));
			} else {
				// AI决定是否替换宠物
				textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
				if(callBack!=null){
					callBack();
				}
			}
		}
	} else if (monster.nature=="土") {
		if (winner.pet_TuMonster == null) {
			textAreaAddMessage(winner._name+"获得"+monster.name+"为宠物", myText, listView);
			winner.pet_Tu = monster.name;
			pet_Effect(monster, winner);
			winner.pet_TuMonster = monster;
			// 紫萱【关爱】技能
			skillCharacters_ZixuanGuanai(winner,function(){
				// 紫萱【神圣】效果
				skillCharacters_ZixuanShensheng(winner,monster,function(){
					// 南宫煌【摄灵法阵】效果
					skillCharacters_NangonghuangShelingfazheng("土", function(){
						// 赵灵儿【梦蛇】效果
						skillCharacters_ZhaolingerMengshe();
						if(callBack!=null){
							callBack();
						}
					});
				});
			});
		} else if (winner.pet_TuMonster != null) {
			if (winner._name==player1._name) {
				addDialog(mainScene, new yesOrNoDialogLayer("是否用"+monster.name+"替换"+winner.pet_TuMonster.name+"?",function(result){
					if(result){
						updata_PetsEffect(winner.pet_TuMonster,winner);
						winner.pet_Tu = monster.name;
						winner.pet_TuMonster = monster;
						textAreaAddMessage(winner._name+"获得了宠物:"+winner.pet_TuMonster.name, myText, listView);
						pet_Effect(monster, winner);
						// 紫萱【关爱】技能
						skillCharacters_ZixuanGuanai(winner,function(){
							// 紫萱【神圣】效果
							skillCharacters_ZixuanShensheng(winner,monster,function(){
								// 南宫煌【摄灵法阵】效果
								skillCharacters_NangonghuangShelingfazheng("土", function(){
									// 赵灵儿【梦蛇】效果
									skillCharacters_ZhaolingerMengshe();
									if(callBack!=null){
										callBack();
									}
								});
							});
						});
					}else{
						textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
						if(callBack!=null){
							callBack();
						}
					}
				}));
			} else {
				// AI决定是否替换宠物
				textAreaAddMessage(winner._name+"放弃替换宠物", myText, listView);
				if(callBack!=null){
					callBack();
				}
			}
		}
	}
}