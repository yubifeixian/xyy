function baseAI_Zhiyuanzhe(){
	var temPlayer = null;
	var isHelp = true;
	var randomTemp = parseInt(Math.random()*3, 10);
	// randomTemp=1;
	if (randomTemp == 0) {
		isHelp = false;
	} else if(nowPlayerTerm[nowPlayerNumber].friendList[1].hp==0){
		isHelp=false;
	}else {
		temPlayer=nowPlayerTerm[nowPlayerNumber].friendList[1];
	}
	if (isHelp) {
		fight_Trigger.push(temPlayer);
		temPlayer.joinAttack = true;
		return true;
	} else {
		return false;
	}
}

function baseAI_Fangaizhe(){
	var _result=true;
	var randomTemp = parseInt(Math.random()*3, 10);
	if (randomTemp == 1 && player3.hp > 0) {
		_result=true;
		fight_Monster.push(player3); // 将player3加入妨碍者列表
		player3.joinAttack = true;
	} else if (randomTemp == 2 && player4.hp > 0) {
		_result=true;
		fight_Monster.push(player4); // 将player4加入妨碍者列表
		player4.joinAttack = true;
	}
	return _result;
}

/**
 * AI决定是否混战
 * 
 * @return true：混战 false：不混战
 */
// 判断是否进行混战
function baseAIIsHunzhan() {
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



function baseAIDropEquipment(player) {
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
		textAreaAddMessage(player._name+"弃掉武器:"+player.arms1, myText, listView);
		remove_Card_Into_DropDeck(player.arms1);
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
		textAreaAddMessage(player._name+"弃掉武器:"+player.arms2, myText, listView);
		remove_Card_Into_DropDeck(player.arms2);
		player.combat -= player.arms2Combat;
		player.extent -= player.arms2Extent;
		player.arms2Combat = 0;
		player.arms2Extent = 0;
		player.arms2 = Text.nil;
	}
	// 丢防具
	else if (i == 2) {
		textAreaAddMessage(player._name+"弃掉防具:"+player.defense, myText, listView);
		remove_Card_Into_DropDeck(player.defense);
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
		textAreaAddMessage(player._name+"弃掉饰品:"+tempCard.name, myText, listView);
		player.maxCombat--;
		remove_Card_Into_DropDeck(tempCard.name);
	}
}

/**
 * AI决定是否翻取事件牌
 * 
 * @return true：翻； false：不翻
 */
// AI是否翻取事件牌
function baseAIEventCard() {

	var youShiDian = 0;
	var petsCombat1 = 0; // 当前玩家阵营的宠物战力
	var petsCombat2 = 0; // 当前玩家敌对阵营的宠物战力
	var characterCombat1 = 0; // 当前玩家阵营总战力
	var characterCombat2 = 0; // 当前玩家敌对阵营总战力
	var isFriend = false;
	for(var i=0;i<nowPlayerTerm.length;i++){
		for(var t=0;t<nowPlayerTerm[nowPlayerNumber].friendList.length;t++){
			if(player1IsPlayer2Friend(nowPlayerTerm[i],nowPlayerTerm[nowPlayerNumber].friendList[t])){
				petsCombat1 += nowPlayerTerm[i].petsCombat;
				characterCombat1+=nowPlayerTerm[i].combat;
				if(nowPlayerTerm[i].hp<=3||nowPlayerTerm[i]._name==nameWangpengxu||
						nowPlayerTerm[i]._name==nameXiaoman){
					youShiDian++;
				}
			}else{
				petsCombat2+=nowPlayerTerm[i].petsCombat;
				characterCombat2+=nowPlayerTerm[i].combat;
			}
		}

	}
	if(petsCombat1<petsCombat2||characterCombat1<characterCombat2){
		youShiDian++;
	}
	if(nowPlayerTerm[nowPlayerNumber].handCard.length==0){
		youShiDian++;
	}
	youShiDian+=parseInt(Math.random()*2, 10);
	return youShiDian>=3?true:false;
	// return false;
}

function baseAIUseSKillCardHelper(used,nowPlayer,nowIndex){
	if(used){
		nowPlayer.handCard.removeObject(nowPlayer.handCard[nowIndex]);
		if(nowPlayer.handCard.length>0){
			mainScene.runAction(cc.Sequence.create( cc.DelayTime.create(0.3), cc.CallFunc.create(function () {
				// 执行下一个代码
				baseAIUseSkillCard(0,nowPlayer.handCard.length);
			}))); 
		}else{
			textAreaAddMessage(nowPlayer._name+"的技牌阶段结束", myText, listView);
			buttonManager(order2Button, true, true);
		}
	}else{
		nowIndex++;
		if(nowPlayer.handCard.length>0&&nowIndex<=nowPlayer.handCard.length-1){
			mainScene.runAction(cc.Sequence.create( cc.DelayTime.create(0.3), cc.CallFunc.create(function () {
				// 执行下一个代码
				baseAIUseSkillCard(nowIndex, nowPlayer.handCard.length);
			}))); 
		}else{
			aiUseSkillAfterUsingSkillCard(function(){
				textAreaAddMessage(nowPlayer._name+"的技牌阶段结束", myText, listView);
				buttonManager(order2Button, true, true);
			});
		}
	}
}

function baseAIUseSkillCard(nowIndex,handCardLength) {
	var used = false;
	var nowPlayer = nowPlayerTerm[nowPlayerNumber];
	var name = nowPlayer.handCard[nowIndex].name;
		var type = nowPlayer.handCard[nowIndex].cardType;
		if (name==string_handCardNameLinghuxiandan
				|| type==CARDTYPE.SKILLCARD
				|| type==CARDTYPE.ARMCARD
				|| type==CARDTYPE.DEFENSECARD) {
			if (name==string_handCardNameLinghuxiandan){
				if(nowPlayerTerm[nowPlayerNumber].maxHP
						- nowPlayerTerm[nowPlayerNumber].hp >= 2){
					used = true;
						handCardLinghuxiandan.effect(nowPlayer, nowPlayer, true, false,function(){
							baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
						});
				}else{
					baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
				}
			} else if (type==CARDTYPE.SKILLCARD) {
				if (name==string_handCardNameWuqichaoyuan) {
					used = true;
						handCardWuqichaoyuan.effect(nowPlayer, nowPlayer, true, true,function(){
							baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					});
				} else if (name==string_handCardNameKuicetianji) {
					used = true;
						handCardKuicetianji.effect(nowPlayer, nowPlayer, true, false,function(){
							baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					});
				} else if (name==string_handCardNameTongqianbiao) {
					var mubiao1 = null, mubiao2 = null;
					if (nowPlayer._name==player2._name) {
						mubiao1 = player3;
						mubiao2 = player4;
					} else if (nowPlayer._name==player3._name
							|| nowPlayer._name==player4._name) {
						mubiao1 = player1;
						mubiao2 = player2;
					}
					if ((mubiao1._name!=nameChonglouSp&&(mubiao1.handCard.length > 0 ||baseEffectCountequment(mubiao1)>0))
							|| (mubiao2._name!=nameChonglouSp&&(mubiao2.handCard.length > 0 || baseEffectCountequment(mubiao2) > 0))) {
						used = true;
							handCardTongqianbiao.effect(nowPlayer, nowPlayer, true, false,function(){
								baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
							});
					}else{
						baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					}
				} else if (name==string_handCardNameToudao) {
					var mubiao1 = null, mubiao2 = null;
					if (nowPlayer._name==player2._name) {
						mubiao1 = player3;
						mubiao2 = player4;
					} else if (nowPlayer._name==player3._name
							|| nowPlayer._name==player4._name) {
						mubiao1 = player1;
						mubiao2 = player2;
					}
					if ((mubiao1._name!=nameChonglouSp&&mubiao1.handCard.length > 0)
							|| (mubiao2._name!=nameChonglouSp&&mubiao2.handCard.length > 0)) {
						used = true;
						handCardToudao.effect(nowPlayer, nowPlayer, true, false,function(){
							baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
						});
					}else{
						baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					}
				} else if (name==string_handCardNameTianleipo) {
					used = true;
					for(var i=0;i<nowPlayerTerm.length;i++){
						if(nowPlayerTerm[i]>0&&nowPlayerTerm[i]._name==nameChonglouSp&&(!player1IsPlayer2Friend(nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[i]))){
							used=false;
							break;
						}
					}
					if(used){
						handCardTianleipo.effect(nowPlayer, nowPlayer, true, false,function(){
							baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
						});
					}else{
						baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					}
				} else if (name==string_handCardNameShuerguo) {
					if(nowPlayer._name!=nameChonglouSp){
						used = true;
						handCardShuerguo.effect(nowPlayer, nowPlayer, true, false,function(){
							baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
						});
					}else if(nowPlayer.friendList[1].hp>0){
						used = true;
						handCardShuerguo.effect(nowPlayer, nowPlayer.friendList[1], true, false,function(){
							baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
						});
					}else{
						baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					}
				}
			} else if (type==CARDTYPE.ARMCARD
					|| type==CARDTYPE.DEFENSECARD) {
				if (name==string_handCardNameMojian) {
					used = true;
					handCardMojian.effect(nowPlayer, nowPlayer, false, true,function(){
						baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					});
				} else if (name==string_handCardNameCaihuan) {
					used = true;
					handCardCaihuan.effect(nowPlayer, nowPlayer, false, false,function(){
						baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					});
				} else if (name==string_handCardNameTianshezhang) {
					used = true;
					handCardTianshezhang.effect(nowPlayer, nowPlayer, false, false,function(){
						baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					});
				} else if (name==string_handCardNameModaotianzha) {
					used = true;
					handCardModaotianzha.effect(nowPlayer, nowPlayer, false, false,function(){
						baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					});
				} else if (name==string_handCardNameWuchenjian) {
					used = true;
					handCardWuchenjian.effect(nowPlayer, nowPlayer, false, false,function(){
						baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					});
				} else if (name==string_handCardNameLonghunzhankai) {
					used = true;
					handCardLonghunzhankai.effect(nowPlayer, nowPlayer, false, false,function(){
						baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					});
				} else if (name==string_handCardNameTiandijifu) {
					used = true;
					handCardTiandijifu.effect(nowPlayer, nowPlayer, false, false,function(){
						baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					});
				} else if (name==string_handCardNameQiankundaopao) {
					used = true;
					handCardQiankundaopao.effect(nowPlayer, nowPlayer, false, false,function(){
						baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					});
				} else if (name==string_handCardNameWucaixiayi) {
					used = true;
					handCardWucaixiayi.effect(nowPlayer, nowPlayer, false, false,function(){
						baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					});
				} else if (name==string_handCardNameTayunxue) {
					used = true;
					handCardTayunxue.effect(nowPlayer, nowPlayer, false, false,function(){
						baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
					});
				}
			}
		}else{
			baseAIUseSKillCardHelper(used,nowPlayer,nowIndex);
		}
}

// 判断是否进行打怪
function baseAIIsAttack() {
	var aiPlayer = nowPlayerTerm[nowPlayerNumber];
	var isAttack = 0;
	var temp = parseInt(Math.random()*3, 10);
	if (temp <= 1)
		isAttack += 2;
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
	// return true;
}


/**
 * AI决定出战牌的方式
 * 
 * @param usePlayer
 * @param context
 */
function baseAIUseFightCard(index,usePlayer,callBack) {
	if (usePlayer.hp > 0) {
		var text = usePlayer._name+"不使用战牌";
		if (usePlayer.handCard.length > 0) {
				var name = usePlayer.handCard[index].name;
				if (!usePlayer.usedAttackCard) {
					if (usePlayer.joinAttack
							&& attactIsMiss(usePlayer,fight_FirstMonster)
							&& name==string_handCardNameJincanwang) {
						usePlayer.handCard.removeObject(usePlayer.handCard[index]);
						handCardJincanwang.effect(usePlayer, usePlayer, true, false,callBack);
					} else if (name==string_handCardNameTianxuanwuyin) {
						usePlayer.handCard.removeObject(usePlayer.handCard[index]);
						handCardTianxuanwuyin.effect(usePlayer, usePlayer, true, false,callBack);
					} else if (usePlayer.joinAttack
							&& attactIsMiss(usePlayer,fight_FirstMonster)
							&& name==string_handCardNameTiangangzhanqi) {
						usePlayer.handCard.removeObject(usePlayer.handCard[index]);
						handCardTiangangzhanqi.effect(usePlayer, usePlayer, true, false,callBack);
					}else{
						index++;
						if(index<=usePlayer.handCard.length-1){
							baseAIUseFightCard(index,usePlayer,callBack);
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



function aiUseSkillBeforeUsingSkillCard(callBack) {
	var aiPlayer = nowPlayerTerm[nowPlayerNumber];
	if (aiPlayer._name==nameAnu) {
		skillCharacters_AnuGuilingjing();
		callBack();
	} else if (aiPlayer._name==nameShenqishuang) {
		aiSkillShenqishuang_Yuanlingguixinshu(callBack);
	} else if (aiPlayer._name!=player1._name
			&& aiPlayer._name==nameHanlingsha) {
		aiSkillHanlingsha_Jiefujipin(callBack);
	}else{
		callBack();
	}
}

function aiUseSkillAfterUsingSkillCard(callBack) {
	var aiPlayer = nowPlayerTerm[nowPlayerNumber];
	if (aiPlayer._name==nameAnu) {
		skillCharacters_AnuGuilingjing();
		callBack();
	} else if (aiPlayer._name==nameKonglin) {
		aiSkillKonglin_Lashoucuihua(callBack);
	} else if (aiPlayer._name==nameXingxuan) {
		aiSkillXingxuan_Pengren(callBack);
	} else if (aiPlayer._name==nameWangpengxu) {
		aiSkillWangpengxu_Hehcengshiping();
		aiSkillWangpengxu_Hehcengshiping();
		callBack();
	}else{
		callBack();
	}
}

function aiUseSkillBeforeUsingFightCard(callBack) {
	aiSkillBaiyuejiaozhu_Zhaohuanshuimoshou(function(){
		aiSkillTangxuejian_Haosheng(function(){
			aiSkillTangxuejian_Lianji(callBack);
		});
	});
}
