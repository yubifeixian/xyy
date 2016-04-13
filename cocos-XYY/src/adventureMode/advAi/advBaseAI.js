function advBaseAI_Fangaizhe(){
	boss.joinAttack=true;
	fight_Monster.push(boss); // 将player3加入妨碍者列表
	return true;
}

/**
 * AI决定是否混战
 * 
 * @return true：混战 false：不混战
 */
//判断是否进行混战
function advBaseAIIsHunzhan() {
	var isHunZhan = 0;
	var tempNum =parseInt(Math.random()*100, 10);
	if (tempNum > 30)
		isHunZhan++;
	if (triggerCombat - monsterCombat >= 4)
		isHunZhan++;
	if (nowPlayerTerm[nowPlayerNumber].friendList[0].handCard.length
			+ nowPlayerTerm[nowPlayerNumber].friendList[1].handCard.length>= 4)
		isHunZhan++;
	if (fight_FirstMonster.name==nameXuangui)
		isHunZhan++;
	return isHunZhan>2?true:false;
}



function advBaseAIDropEquipment(player) {
	var i = 0;
	// 当AI是王蓬絮，且有饰品时
	if (player._name==nameWangpengxu&& player.skillTempList.length> 0) {
		i = 3;
	}
	// 当AI既有武器，又有防具时的处理
	else if (player.arms1!=Text.nil &&player.arms2!=Text.nil
		&& player.defense!=Text.nil) {
		i=parseInt(Math.random()*3, 10);
	}else if(player.arms1!=Text.nil&&player.arms2==Text.nil&&player.defense!=Text.nil){
		i=parseInt(Math.random()*2, 10)>1?0:2;
	}else if(player.arms1==Text.nil&&player.arms2!=Text.nil&&player.defense!=Text.nil){
		i=parseInt(Math.random()*2, 10)+1;
	}
	// 当AI只有武器1时的处理
	else if (player.arms1!=Text.nil && player.arms2==Text.nil
		&& player.defense==Text.nil) {
		i = 0;
	}
	// 当AI只有武器2时的处理
	else if (player.arms1==Text.nil && player.arms2!=Text.nil
		&& player.defense==Text.nil) {
		i = 1;
	}
	// 当AI只有防具时的处理
	else if (player.arms1==Text.nil && player.arms2==Text.nil
		&& player.defense!=Text.nil) {
		i = 2;
	}
	// 丢武器1
	if (i == 0) {
		textAreaAddMessage(Text.dropArm.format(player._name,player.arms1), myText, listView);
		advRemove_Card_Into_DropDeck(player.arms1);
		player.combat -= player.arms1Combat;
		player.extent -= player.arms1Extent;
		player.arms1Combat = 0;
		player.arms1Extent = 0;
		player.arms1 = Text.nil;
		if (player.name==nameLinyueru) {
			player.combat--;
		} else if (player.name==nameJiujianxian) {
			player.extent--;
		}
	}
	// 丢武器2
	else if (i == 1) {
		textAreaAddMessage(Text.dropArm.format(player._name,player.arms2), myText, listView);
		advRemove_Card_Into_DropDeck(player.arms2);
		player.combat -= player.arms2Combat;
		player.extent -= player.arms2Extent;
		player.arms2Combat = 0;
		player.arms2Extent = 0;
		player.arms2 = Text.nil;
	}
	// 丢防具
	else if (i == 2) {
		textAreaAddMessage(Text.dropDefense.format(player._name,player.defense), myText, listView);
		advRemove_Card_Into_DropDeck(player.defense);
		player.combat -= player.defenseCombat;
		player.extent -= player.defenseExtent;
		player.defenseCombat = 0;
		player.defenseExtent = 0;
		player.defense = Text.nil;
	}
	// 丢饰品
	else if (i == 3) {
		var tempCard = player.skillTempList[parseInt(Math.random()*player.skillTempList.length, 10)];
		player.skillTempList.removeObject(tempCard);
		textAreaAddMessage(Text.dropOrnament.format(player._name,tempCard.name), myText, listView);
		player.maxCombat--;
		advRemove_Card_Into_DropDeck(tempCard.name);
	}
}

function advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex){
	if(used){
		if(nowPlayer.handCard.length>0){
			mainScene.runAction(cc.Sequence.create( cc.DelayTime.create(0.5), cc.CallFunc.create(function () {
				// 执行下一个代码
				advBaseAIUseSkillCard(0,nowPlayer.handCard.length);
			}))); 
		}else{
			textAreaAddMessage(Text.stepHandCardEnd.format(nowPlayer._name), myText, listView);
			buttonManager(order2Button, true, true);
		}
	}else{
		nowIndex++;
		if(nowPlayer.handCard.length>0&&nowIndex<=nowPlayer.handCard.length-1){
			mainScene.runAction(cc.Sequence.create( cc.DelayTime.create(0.5), cc.CallFunc.create(function () {
				// 执行下一个代码
				advBaseAIUseSkillCard(nowIndex, nowPlayer.handCard.length);
			}))); 
		}else{
			advAiUseSkillAfterUsingSkillCard();
			textAreaAddMessage(Text.stepHandCardEnd.format(nowPlayer._name), myText, listView);
			buttonManager(order2Button, true, true);
		}
	}
}


function advBaseAIUseSkillCard(nowIndex,handCardLength) {
	var used = false;
	var nowPlayer = nowPlayerTerm[nowPlayerNumber];
	var name = nowPlayer.handCard[nowIndex].name;
	var type = nowPlayer.handCard[nowIndex].cardType;
	if (name==string_handCardNameLinghuxiandan
			||name==string_handCardNameLinghuxiandan
			|| type==CARDTYPE.SKILLCARD
			|| type==CARDTYPE.ARMCARD
			|| type==CARDTYPE.DEFENSECARD) {
		if (name==string_handCardNameLinghuxiandan){
			if(nowPlayer.maxHP- nowPlayer.hp >= 2){
				used = true;
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				handCardLinghuxiandan.advEffect(nowPlayer, nowPlayer, true, false,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			}else{
				advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
			}
		}else if(name==string_handCardNameTianxiangxuminglu){
			if(nowPlayer.maxHP- nowPlayer.hp >= 5){
				used = true;
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				handCardTianxiangxuminglu.advEffect(nowPlayer, nowPlayer, true, false,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			}else{
				advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
			}
		} else if (type==CARDTYPE.SKILLCARD) {
			if (name==string_handCardNameWuqichaoyuan) {
				used = true;
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				handCardWuqichaoyuan.advEffect(nowPlayer, nowPlayer, true, true,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			} else if (name==string_handCardNameKuicetianji) {
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				used = true;
				handCardKuicetianji.advEffect(nowPlayer, nowPlayer, true, false,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			} else if (name==string_handCardNameTongqianbiao) {
				if (boss.handCard.length > 0 ||baseEffectCountequment(boss)>0) {
					used = true;
					nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
					handCardTongqianbiao.advEffect(nowPlayer, nowPlayer, true, false,function(){
						advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					});
				}else{
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				}
			} else if (name==string_handCardNameToudao) {
				if (boss.handCard.length > 0) {
					used = true;
					nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
					handCardToudao.advEffect(nowPlayer, nowPlayer, true, false,function(){
						advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					});
				}else{
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				}
			} else if (name==string_handCardNameTianleipo) {
				used = true;
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				handCardTianleipo.advEffect(nowPlayer, nowPlayer, true, false,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			} else if (name==string_handCardNameShuerguo) {
				if(nowPlayer._name!=nameChonglouSp){
					used = true;
					nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
					handCardShuerguo.advEffect(nowPlayer, nowPlayer, true, false,function(){
						advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					});
				}else if(nowPlayer.friendList[1].hp>0){
					used = true;
					nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
					handCardShuerguo.advEffect(nowPlayer, nowPlayer.friendList[1], true, false,function(){
						advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					});
				}else{
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				}
			}else if(name==string_handCardNameSoubaoshu){
				used = true;
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				handCardSoubaoshu.advEffect(nowPlayer, nowPlayer, true, false,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			}else if(name==string_handCardNameJimushui){
				used = true;
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				handCardJimushui.advEffect(nowPlayer, nowPlayer, true, false,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			}else if(name==string_handCardNameTianjian){
				used = true;
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				handCardTianjian.advEffect(nowPlayer, nowPlayer, true, false,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			}
		} else if (type==CARDTYPE.ARMCARD
				|| type==CARDTYPE.DEFENSECARD) {
			if (name==string_handCardNameMojian) {
				used = true;
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				handCardMojian.advEffect(nowPlayer, nowPlayer, false, true,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			} else if (name==string_handCardNameCaihuan) {
				used = true;
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				handCardCaihuan.advEffect(nowPlayer, nowPlayer, false, false,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			} else if (name==string_handCardNameTianshezhang) {
				used = true;
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				handCardTianshezhang.advEffect(nowPlayer, nowPlayer, false, false,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			} else if (name==string_handCardNameModaotianzha) {
				used = true;
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				handCardModaotianzha.advEffect(nowPlayer, nowPlayer, false, false,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			} else if (name==string_handCardNameWuchenjian) {
				used = true;
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				handCardWuchenjian.advEffect(nowPlayer, nowPlayer, false, false,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			} else if (name==string_handCardNameLonghunzhankai) {
				used = true;
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				handCardLonghunzhankai.advEffect(nowPlayer, nowPlayer, false, false,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			} else if (name==string_handCardNameTiandijifu) {
				used = true;
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				handCardTiandijifu.advEffect(nowPlayer, nowPlayer, false, false,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			} else if (name==string_handCardNameQiankundaopao) {
				used = true;
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				handCardQiankundaopao.advEffect(nowPlayer, nowPlayer, false, false,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			} else if (name==string_handCardNameWucaixiayi) {
				used = true;
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				handCardWucaixiayi.advEffect(nowPlayer, nowPlayer, false, false,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			} else if (name==string_handCardNameTayunxue) {
				used = true;
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				handCardTayunxue.advEffect(nowPlayer, nowPlayer, false, false,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			}else if(name==string_handCardNameTiangangdouyi){
				used = true;
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				handCardTiangangdouyi.advEffect(nowPlayer, nowPlayer, false, false,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			}else if(name==string_handCardNameShiziyaoshuo){
				used = true;
				nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
				handCardShiziyaoshuo.advEffect(nowPlayer, nowPlayer, false, false,function(){
					advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				});
			}
		}
	}else{
		advBaseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
	}
}

//判断是否进行打怪
function advBaseAIIsAttack() {
	var aiPlayer = nowPlayerTerm[nowPlayerNumber];
	var isAttack = 0;
	for (var i=0;i<aiPlayer.friendList.length;i++) {
		if (aiPlayer.friendList[i].hp >= (aiPlayer.friendList[i].maxHP / 2)) {
			isAttack++;
		}
		if (baseEffectHaveHowManyCardOfType(aiPlayer.friendList[i],
				CARDTYPE.FIGHTCARD) > 0) {
			isAttack++;
		}
	}
	return isAttack>3?true:false;
	//return true;
}


/**
 * AI决定出战牌的方式
 * 
 * @param usePlayer
 * @param context
 */
function advBaseAIUseFightCard(index,usePlayer,callBack) {
	if (usePlayer.hp > 0) {
		var text = Text.notUseFightCard.format(usePlayer._name);
		if (usePlayer.handCard.length > 0) {
			var name = usePlayer.handCard[index].name;
			if (!usePlayer.usedAttackCard) {
				if (usePlayer.joinAttack
						&& attactIsMiss(usePlayer,fight_FirstMonster)
						&& name==string_handCardNameJincanwang) {
					usePlayer.handCard.removeObject(usePlayer.handCard[index]);
					handCardJincanwang.advEffect(usePlayer, usePlayer, true, false,callBack);
				} else if (name==string_handCardNameTianxuanwuyin) {
					usePlayer.handCard.removeObject(usePlayer.handCard[index]);
					handCardTianxuanwuyin.advEffect(usePlayer, usePlayer, true, false,callBack);
				} else if (usePlayer.joinAttack
						&& attactIsMiss(usePlayer,fight_FirstMonster)
						&& name==string_handCardNameTiangangzhanqi) {
					usePlayer.handCard.removeObject(usePlayer.handCard[index]);
					handCardTiangangzhanqi.advEffect(usePlayer, usePlayer, true, false,callBack);
				}else if(name==string_handCardNameJiushen){
					usePlayer.handCard.removeObject(usePlayer.handCard[index]);
					handCardJiushen.advEffect(usePlayer, usePlayer, true, false,callBack);
				}else{
					index++;
					if(index<=usePlayer.handCard.length-1){
						advBaseAIUseFightCard(index,usePlayer,callBack);
					}else{
						textAreaAddMessage(text, myText, listView);
						if(callBack!=null){
							callBack();
						}
					}
				}
			}else if(callBack!=null){
				callBack();
			}
		} else {
			textAreaAddMessage(text, myText, listView);
			if(callBack!=null){
				callBack();
			}
		}
	}else if(callBack!=null){
		callBack();
	}
}



function advAiUseSkillBeforeUsingSkillCard(callBack) {
	var aiPlayer = nowPlayerTerm[nowPlayerNumber];
	if (aiPlayer._name==nameAnu) {
		advSkillCharacters_AnuGuilingjing();
		callBack();
	} else if (aiPlayer._name==nameShenqishuang) {
		advAiSkillShenqishuang_Yuanlingguixinshu(callBack);
	} else if (aiPlayer._name!=player1._name
			&& aiPlayer._name==nameHanlingsha) {
		advAiSkillHanlingsha_Jiefujipin(callBack);
	}else{
		callBack();
	}
}

function advAiUseSkillAfterUsingSkillCard() {
	var aiPlayer = nowPlayerTerm[nowPlayerNumber];
	if (aiPlayer._name==nameAnu) {
		advSkillCharacters_AnuGuilingjing();
	}else if (aiPlayer._name==nameXingxuan) {
		aiSkillXingxuan_Pengren();
	} else if (aiPlayer._name==nameWangpengxu) {
		advAiSkillWangpengxu_Hehcengshiping();
		advAiSkillWangpengxu_Hehcengshiping();
	}
}

function advAiUseSkillBeforeUsingFightCard(callBack) {
	advAiSkillBaiyuejiaozhu_Zhaohuanshuimoshou(function(){
		advaAiSkillTangxuejian_Haosheng(function(){
			advAiSkillTangxuejian_Lianji(callBack);
		});
	});
}


