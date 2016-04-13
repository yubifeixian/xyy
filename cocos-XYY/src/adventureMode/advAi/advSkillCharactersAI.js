//AI 拜月教主 召唤水魔兽
function advAiSkillBaiyuejiaozhu_Zhaohuanshuimoshou(callBack) {
	var baiyuejiaozhuPlayer = null;
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i]._name==nameBaiyuejiaozhu) {
			if (nowPlayerTerm[i]._name!=myControlPlayer._name) {
				baiyuejiaozhuPlayer = nowPlayerTerm[i];
				break;
			}
		}
	}
	if (baiyuejiaozhuPlayer != null) {
		if (baiyuejiaozhuPlayer.joinAttack
				&& !baiyuejiaozhuPlayer.usedAttackCard
				&& baiyuejiaozhuPlayer.handCard.length >= 2) {
			if (getRandomResult()) {
				for (var i = 0; i < 2; i++) {
					var tempHandCard = baiyuejiaozhuPlayer.handCard[parseInt(Math.random()*baiyuejiaozhuPlayer.handCard.length, 10)];
					baiyuejiaozhuPlayer.handCard.removeObject(tempHandCard);
					advRemove_Card_Into_DropDeck(tempHandCard.name);
				}
				textAreaAddMessage(Text.skillBaiyuejiaozhuZhaohuanshuimoshouUsing.format(baiyuejiaozhuPlayer._name), myText, listView);
				textAreaAddMessage(Text.skillBaiyuejiaozhuZhaohuanshuimoshouEffectText, myText, listView,function(){
					baiyuejiaozhuPlayer.usedAttackCard = true;
					triggerCombat += 5;
					if(callBack!=null){
						callBack();
					}
				});
			}else if(callBack!=null){
				callBack();
			}
		}else if(callBack!=null){
			callBack();
		}
	}else if(callBack!=null){
		callBack();
	}
}


// AI 沈欺霜 元灵归心术
function advAiSkillShenqishuang_Yuanlingguixinshu(callBack) {
	var shenqishuangPlayer = nowPlayerTerm[nowPlayerNumber];
	var haveSkillCardNum = baseEffectHaveHowManyCardOfType(nowPlayerTerm[nowPlayerNumber], CARDTYPE.SKILLCARD);
	if (haveSkillCardNum > 0) {
		var count = haveSkillCardNum > 1 ? 2 : 1;
		for (var i = 0; i < count; i++) {
			if (shenqishuangPlayer.friendList[i].hp > 0&&shenqishuangPlayer.friendList[i]._name!=nameChonglouSp
					&& shenqishuangPlayer.friendList[i].hp <= 2) {
				var tempHandCard = baseEffectGetCardOfType(shenqishuangPlayer, CARDTYPE.SKILLCARD);
				shenqishuangPlayer.handCard.removeObject(tempHandCard);
				advRemove_Card_Into_DropDeck(tempHandCard.name);
				for (var x = 0; x < 2; x++){
					baseEffectAddHP(shenqishuangPlayer.friendList[i]);
				}
				textAreaAddMessage(Text.skillShenqishuangYuanlingguixinshuUsing.format(shenqishuangPlayer._name), myText, listView);
				textAreaAddMessage(Text.addHp.format(shenqishuangPlayer.friendList[i]._name,2), myText, listView);
				has_Tianshezhang(shenqishuangPlayer.friendList[i]);
				if (count == 1) {
					break;
				}
			}
		}
		if(callBack!=null){
			callBack();
		}
	}else if(callBack!=null){
		callBack();
	}
}

// AI 唐雪见【连击】
function advAiSkillTangxuejian_Lianji(callBack) {
	var tangxuejianPlayer = null;
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i]._name==nameTangxuejian) {
			if (nowPlayerTerm[i]._name!=myControlPlayer._name) {
				tangxuejianPlayer = nowPlayerTerm[i];
				break;
			}
		}
	}
	if (tangxuejianPlayer != null) {
		if (tangxuejianPlayer.joinAttack
				&& attactIsMiss(tangxuejianPlayer,fight_FirstMonster)
				&& tangxuejianPlayer.handCard.length
				- baseEffectHaveHowManyCardOfType(tangxuejianPlayer,CARDTYPE.FIGHTCARD) > 0) {
			textAreaAddMessage(Text.skillTangxuejianLianjiUsing.format(tangxuejianPlayer._name), myText, listView);
			var tempHandCard = baseEffectGetCardExpectOfType(tangxuejianPlayer, CARDTYPE.FIGHTCARD);
			textAreaAddMessage(Text.dropCard.format(tangxuejianPlayer._name,tempHandCard.name), myText, listView);
			advRemove_Card_Into_DropDeck(tempHandCard.name);
			tangxuejianPlayer.handCard.removeObject(tempHandCard);
			baseEffectAddTempCombat(tangxuejianPlayer,2);
			for (var i = 0; i < fight_Trigger.length; i++) {
				if (fight_Trigger[i].skillNameList
						.containsObject(skillnameLianji)) {
					triggerCombat += 2;
					break;
				}
			}
			if (fight_Monster.length > 0
					&& fight_Monster[0].skillNameList
					.containsObject(skillnameLianji)) {
				monsterCombat += 2;
			}
			textAreaAddMessage(Text.skillTangxuejianLianjiEffectText.format(tangxuejianPlayer._name), myText, listView,callBack);
		}else if(callBack!=null){
			callBack();
		}
	}else if(callBack!=null){
		callBack();
	}
}


// AI 唐雪见【好胜】
function advaAiSkillTangxuejian_Haosheng(callBack) {
	var effect=false
	var tangxuejian=null;
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i]._name==nameTangxuejian
				&& nowPlayerTerm[i].joinAttack) {
			if (nowPlayerTerm[i]._name!=myControlPlayer._name) {
				if (nowPlayerTerm[i].hp >= 4
						&& nowPlayerTerm[i].handCard.length <= 1) {
					tangxuejian=nowPlayerTerm[i];
					effect=true;
					break;
				}
			}
		}
	}
	if(effect){
		textAreaAddMessage(Text.skillTangxuejianHaoshengUsing.format(tangxuejian._name), myText, listView,function(){
			advBaseEffectReduceHPEffect(tangxuejian, 2,true,function(){
				advAiSkillTangxuejian_Lianji(function(){
					heartList=new Array();
					advAddHandCard([tangxuejian],tangxuejian,tangxuejian,null,[2],true,true,callBack);
				});
			});			
		});
	}else if(callBack!=null){
		callBack();
	}
}

// 星璇 【烹饪】(技牌阶段)
function advaiSkillXingxuan_Pengren() {
	if(nowPlayerTerm[nowPlayerNumber].handCard.length>=2&&nowPlayerTerm[nowPlayerNumber].hp<4){
		for (var i = 0; i < 2; i++) {
			var tempHandCard = nowPlayerTerm[nowPlayerNumber].handCard[parseInt(Math.random()*nowPlayerTerm[nowPlayerNumber].handCard.length, 10)];
			nowPlayerTerm[nowPlayerNumber].handCard.removeObject(tempHandCard);
			advRemove_Card_Into_DropDeck(tempHandCard.name);
			textAreaAddMessage(Text.dropCard.format(nowPlayerTerm[nowPlayerNumber]._name,tempHandCard.name), myText, listView);
		}
		handCardLinghuxiandan.effect(nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], false, false);
	}
}

// AI 王蓬絮 【饕餮】
function advAiSKillWangpengxu_Taotietie(callBack) {
	var wangpengxuPlayer = nowPlayerTerm[nowPlayerNumber];
	if (wangpengxuPlayer._name!=myControlPlayer._name
			&& wangpengxuPlayer.hp > 0 && wangpengxuPlayer.hp <= 3
			&& wangpengxuPlayer.skillTempList.length > 0) {
		var tempCard = wangpengxuPlayer.skillTempList[parseInt(Math.random()*wangpengxuPlayer.skillTempList.length, 10)];
		wangpengxuPlayer.skillTempList.removeObject(tempCard);
		remove_Card_Into_DropDeck(tempCard.name);
		wangpengxuPlayer.maxCombat--;
		for (var i = 0; i < 2; i++) {
			baseEffectAddHP(wangpengxuPlayer);
		}
		textAreaAddMessage(Text.skillWangpengxuTaotieUsing.format(wangpengxuPlayer._name,tempCard.name), myText, listView);
		has_Tianshezhang(wangpengxuPlayer);
		if(callBack!=null){
			callBack();
		}
	}else if(callBack!=null){
		callBack();
	}
}


// AI 王蓬絮 【合成饰品】
// 由于本技能是在“使用完技牌之后”触发，因此无需callBack
function advAiSkillWangpengxu_Hehcengshipinghiping() {
	var usedHechengshiping = false;
	var wangpengxuPlayer = nowPlayerTerm[nowPlayerNumber];
	if (wangpengxuPlayer._name!=myControlPlayer._name
			&& wangpengxuPlayer.handCard.length > 0
			&& wangpengxuPlayer.skillTempList.length < 5) {
		var tempHandCard = null;
		do {
			var number=parseInt(Math.random()*wangpengxuPlayer.handCard.length, 10);
			tempHandCard = wangpengxuPlayer.handCard[number];
			cc.log(wangpengxuPlayer.handCard[number].name);
		} while (tempHandCard.cardType==CARDTYPE.ARMCARD
				|| tempHandCard.cardType==CARDTYPE.DEFENSECARD);
		wangpengxuPlayer.handCard.removeObject(tempHandCard);
		wangpengxuPlayer.skillTempList.push(tempHandCard);
		wangpengxuPlayer.maxCombat++;
		textAreaAddMessage(Text.skillWangpengxuHechengshipinUsing.format(wangpengxuPlayer._name), myText, listView);
		// 若此时已经处于打怪阶段，则双方战力要重新计算
		if (fight_Trigger.length > 0) {
			for (var i=0;i<fight_Trigger.length;i++) {
				if (fight_Trigger[i]._name==nameWangpengxu) {
					triggerCombat++;
					break;
				}
			}
			for (var i=0;i<fight_Monster.length;i++) {
				if (fight_Monster[i]._name==nameWangpengxu) {
					monsterCombat++;
					break;
				}
			}
		}
		usedHechengshiping = true;
	}
	return usedHechengshiping;
}


// AI 韩菱纱 【劫富济贫】
function advAiSkillHanlingsha_Jiefujipinin(callBack) {
	var hanlingshaPlayer=null;
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i].handCard.length == 0
				&& nowPlayerTerm[i].skillNameList.containsObject(skillnameJiefujipin)
				&& nowPlayerTerm[i]._name!=myControlPlayer._name) {
			hanlingshaPlayer=nowPlayerTerm[i];
			break;
		}
	}
	if(hanlingshaPlayer!=null){
		textAreaAddMessage(Text.skillHanlinshaJiefujipinUsing.format(hanlingshaPlayer._name), myText, listView,function(){
			addHandCard([hanlingshaPlayer],hanlingshaPlayer,hanlingshaPlayer,null,[1],true,true,callBack);
		});
	}else if(callBack!=null){
		callBack();
	}
}

// AI 韩菱纱【搜囊探宝】

function advAiSkillHanlingsha_Sounangtanbaobao(callBack) {
	var hanlingshaPlayer = nowPlayerTerm[nowPlayerNumber];
	var useTongqianbiao = baseEffectCountequment(boss)>0?true:false;
	var useToudao = boss.handCard.length > 0 ? true : false;
	if (useTongqianbiao || useToudao) {
		textAreaAddMessage(Text.skillHanlinshaSounangtanbaoUsing.format(hanlingshaPlayer._name), myText, listView);
		var tempHandCard = hanlingshaPlayer.handCard[parseInt(Math.random()*hanlingshaPlayer.handCard.length, 10)];
		hanlingshaPlayer.handCard.removeObject(tempHandCard);
		remove_Card_Into_DropDeck(tempHandCard.name);
		if (useTongqianbiao) {
			textAreaAddMessage(Text.skillHanlinshaSounangtanbaoTongqianbiao.format(tempHandCard.name), myText, listView,function(){
				handCardTongqianbiao.effect(hanlingshaPlayer, hanlingshaPlayer, false, false,callBack);
			});
		} else if (useToudao) {
			textAreaAddMessage(Text.skillHanlinshaSounangtanbaoToudao.format(tempHandCard.name), myText, listView,function(){
				handCardToudao.effect(hanlingshaPlayer, hanlingshaPlayer, false, false, callBack);
			});
		}
	}else if(callBack!=null){
		callBack();
	}

}
