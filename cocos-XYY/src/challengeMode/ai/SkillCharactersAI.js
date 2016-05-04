//AI 拜月教主 召唤水魔兽
function aiSkillBaiyuejiaozhu_Zhaohuanshuimoshou(callBack) {
	var baiyuejiaozhuPlayer = null;
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i]._name==nameBaiyuejiaozhu) {
			if (nowPlayerTerm[i]._name!=player1._name) {
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
					remove_Card_Into_DropDeck(tempHandCard.name);
				}
				mainScene.addChild(new NormalSkillAnimationLayer(skillnameZhaohuanshuimoshou,baiyuejiaozhuPlayer.hadImageView,function(){
					textAreaAddMessage("拜月教主舍弃2张手牌发动“召唤水魔兽”效果", myText, listView);
					textAreaAddMessage("本场战斗中，我方战力+5", myText, listView);
					baiyuejiaozhuPlayer.usedAttackCard = true;
					if (player1IsPlayer2Friend(baiyuejiaozhuPlayer,nowPlayerTerm[nowPlayerNumber])) {
						triggerCombat += 5;
					} else {
						monsterCombat += 5;
					}
					if(callBack!=null){
						callBack();
					}
				}));
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
function aiSkillShenqishuang_Yuanlingguixinshu(callBack) {
	var shenqishuangPlayer = nowPlayerTerm[nowPlayerNumber];
	var haveSkillCardNum = baseEffectHaveHowManyCardOfType(nowPlayerTerm[nowPlayerNumber], CARDTYPE.SKILLCARD);
	if (haveSkillCardNum > 0) {
		var count = haveSkillCardNum > 1 ? 2 : 1;
		for (var i = 0; i < count; i++) {
			if (shenqishuangPlayer.friendList[i].hp > 0&&shenqishuangPlayer.friendList[i]._name!=nameChonglouSp
					&& shenqishuangPlayer.friendList[i].hp <= 2) {
				var tempHandCard = baseEffectGetCardOfType(shenqishuangPlayer, CARDTYPE.SKILLCARD);
				shenqishuangPlayer.handCard.removeObject(tempHandCard);
				remove_Card_Into_DropDeck(tempHandCard.name);
				for (var x = 0; x < 2; x++){
					baseEffectAddHP(shenqishuangPlayer.friendList[i]);
				}
				mainScene.addChild(new skillAnimationLayer(shenqishuangPlayer.animation,function(){
					textAreaAddMessage("沈欺霜舍弃1张技牌发动“元灵归心术”", myText, listView);
					textAreaAddMessage(shenqishuangPlayer.friendList[i]._name+"HP+2”", myText, listView);
					has_Tianshezhang(shenqishuangPlayer.friendList[i]);
				}));
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

// AI 孔璘 辣手摧花
function aiSkillKonglin_Lashoucuihua(callBack) {
	var effected=false;
	var konglinPlayer = nowPlayerTerm[nowPlayerNumber];
	var mubiaoPlayer=null;
	var tempHeartList=new Array();
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0 && nowPlayerTerm[i].sex == 1) {
			if (!player1IsPlayer2Friend(nowPlayerTerm[i], konglinPlayer)) {
				mubiaoPlayer=nowPlayerTerm[i];
				effected=true;
				break;
			}
		}
	}
	if(effected){
		mainScene.addChild(new NormalSkillAnimationLayer(skillnameLashoucuihua,konglinPlayer.hadImageView,function(){
			textAreaAddMessage(nameKonglin+"发动“辣手摧花”效果", myText, listView);
			tempHeartList.push(mubiaoPlayer);
			tempHeartList.push(konglinPlayer);
			useYingu(tempHeartList, tempHeartList[0], tempHeartList[0], [1,1], true, baseEffectReduceHPEffect, function(){
				skillCharactersTangxuejianZhuida(function(){
					heartList=new Array();
					callBack();
				});
			});
		}));
	}else{
		callBack();
	}
}

// AI 唐雪见【连击】
function aiSkillTangxuejian_Lianji(callBack) {
	var tangxuejianPlayer = null;
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i]._name==nameTangxuejian) {
			if (nowPlayerTerm[i]._name!=player1._name) {
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
			mainScene.addChild(new NormalSkillAnimationLayer(skillnameLianji,tangxuejianPlayer.hadImageView,function(){
				textAreaAddMessage("唐雪见发动“连击”效果", myText, listView);
				var tempHandCard = baseEffectGetCardExpectOfType(tangxuejianPlayer, CARDTYPE.FIGHTCARD);
				textAreaAddMessage("唐雪见弃置【"+tempHandCard.name+"】", myText, listView);
				remove_Card_Into_DropDeck(tempHandCard.name);
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
				textAreaAddMessage("唐雪见本场战斗战力+2", myText, listView);
				if(callBack!=null){
					callBack();
				}
			}));
		}else if(callBack!=null){
			callBack();
		}
	}else if(callBack!=null){
		callBack();
	}
}


// AI 唐雪见【好胜】
function aiSkillTangxuejian_Haosheng(callBack) {
	var effect=false
	var tangxuejian=null;
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i]._name==nameTangxuejian
				&& nowPlayerTerm[i].joinAttack) {
			if (nowPlayerTerm[i]._name!=player1._name) {
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
		mainScene.addChild(new skillAnimationLayer(tangxuejian.animation,function(){
			textAreaAddMessage("唐雪见发动“好胜”，扣减自己2点HP后补2张牌.", myText, listView);
			baseEffectReduceHPEffect(tangxuejian,[tangxuejian], 2,true,function(){
				aiSkillTangxuejian_Lianji(function(){
					heartList=new Array();
					addHandCard([tangxuejian],tangxuejian,tangxuejian,null,[2],true,true,callBack);
				});
			});
		}));
	}else if(callBack!=null){
		callBack();
	}
}

// 星璇 【烹饪】(技牌阶段)
function aiSkillXingxuan_Pengren(callBack) {
	if(nowPlayerTerm[nowPlayerNumber].handCard.length>=2&&nowPlayerTerm[nowPlayerNumber].hp<4){
		for (var i = 0; i < 2; i++) {
			var tempHandCard = nowPlayerTerm[nowPlayerNumber].handCard[parseInt(Math.random()*nowPlayerTerm[nowPlayerNumber].handCard.length, 10)];
			nowPlayerTerm[nowPlayerNumber].handCard.removeObject(tempHandCard);
			remove_Card_Into_DropDeck(tempHandCard.name);
			textAreaAddMessage("星璇丢弃"+tempHandCard.name, myText, listView);
		}
		mainScene.addChild(new NormalSkillAnimationLayer(skillnamePengren,nowPlayerTerm[nowPlayerNumber].hadImageView,function(){
			handCardLinghuxiandan.effect(nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], false, false,callBack);
		}));
	}else{
		callBack();
	}
}

// AI 王蓬絮 【饕餮】
function aiSKillWangpengxu_Taotie(callBack) {
	var wangpengxuPlayer = nowPlayerTerm[nowPlayerNumber];
	if (wangpengxuPlayer._name!=player1._name
			&& wangpengxuPlayer.hp > 0 && wangpengxuPlayer.hp <= 3
			&& wangpengxuPlayer.skillTempList.length > 0) {
		var tempCard = wangpengxuPlayer.skillTempList[parseInt(Math.random()*wangpengxuPlayer.skillTempList.length, 10)];
		wangpengxuPlayer.skillTempList.removeObject(tempCard);
		remove_Card_Into_DropDeck(tempCard.name);
		wangpengxuPlayer.maxCombat--;
		for (var i = 0; i < 2; i++) {
			baseEffectAddHP(wangpengxuPlayer);
		}
		mainScene.addChild(new skillAnimationLayer(wangpengxuPlayer.animation,function(){
			textAreaAddMessage("王蓬絮发动“饕餮”，舍弃【"+tempCard.name+"】,自身HP+2", myText, listView);
			has_Tianshezhang(wangpengxuPlayer);
			if(callBack!=null){
				callBack();
			}
		}));
	}else if(callBack!=null){
		callBack();
	}
}


// AI 王蓬絮 【合成饰品】
// 由于本技能是在“使用完技牌之后”触发，因此无需callBack
function aiSkillWangpengxu_Hehcengshiping() {
	var usedHechengshiping = false;
	var wangpengxuPlayer = nowPlayerTerm[nowPlayerNumber];
	if (wangpengxuPlayer._name!=player1._name
			&& wangpengxuPlayer.handCard.length > 0
			&& wangpengxuPlayer.skillTempList.length < 5) {
		var tempHandCard = null;
		do {
			var number=parseInt(Math.random()*wangpengxuPlayer.handCard.length, 10);
			tempHandCard = wangpengxuPlayer.handCard[number];
		} while (tempHandCard.cardType==CARDTYPE.ARMCARD
				|| tempHandCard.cardType==CARDTYPE.DEFENSECARD);
		wangpengxuPlayer.handCard.removeObject(tempHandCard);
		wangpengxuPlayer.skillTempList.push(tempHandCard);
		wangpengxuPlayer.maxCombat++;
		mainScene.addChild(new NormalSkillAnimationLayer(skillnameHechengshipin,wangpengxuPlayer.hadImageView,function(){
			textAreaAddMessage("王蓬絮发动“合成饰品”，自身战力+1", myText, listView);
		}));
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
function aiSkillHanlingsha_Jiefujipin(callBack) {
	var effected=false;
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i].handCard.length == 0
				&& nowPlayerTerm[i].skillNameList.containsObject(skillnameJiefujipin)
				&& nowPlayerTerm[i]._name!=player1._name) {
			effected=true;
			break;
		}
	}
	if(effected){
		mainScene.addChild(new NormalSkillAnimationLayer(skillnameJiefujipin,nowPlayerTerm[i].hadImageView,function(){
			textAreaAddMessage("韩菱纱发动“劫富济贫”，补了1张手牌", myText, listView);
			addHandCard([nowPlayerTerm[i]],nowPlayerTerm[i],nowPlayerTerm[i],null,[1],true,true,callBack);
		}));
	}else if(callBack!=null){
		callBack();
	}
}

// AI 韩菱纱【搜囊探宝】
function aiSkillHanlingsha_Sounangtanbao(callBack) {
	var hanlingshaPlayer = nowPlayerTerm[nowPlayerNumber];
	var useTongqianbiao = false;
	var useToudao = false;
	var isNotFriend = new Array();
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0
				&& !player1IsPlayer2Friend(nowPlayerTerm[i],
						hanlingshaPlayer)) {
			isNotFriend.push(nowPlayerTerm[i]);
			useTongqianbiao = baseEffectCountequment(nowPlayerTerm[i])>0?true:false;
			useToudao = nowPlayerTerm[i].handCard.length > 0 ? true : false;
			break;
		}
	}
	if (useTongqianbiao || useToudao) {
		mainScene.addChild(new skillAnimationLayer(hanlingshaPlayer.animation,function(){
			textAreaAddMessage("韩菱纱发动“搜囊探宝”效果", myText, listView);
			var tempHandCard = hanlingshaPlayer.handCard[parseInt(Math.random()*hanlingshaPlayer.handCard.length, 10)];
			hanlingshaPlayer.handCard.removeObject(tempHandCard);
			remove_Card_Into_DropDeck(tempHandCard.name);
			if (useTongqianbiao) {
				textAreaAddMessage("将【"+tempHandCard.name+"】当作【铜钱镖】使用", myText, listView);
				handCardTongqianbiao.effect(hanlingshaPlayer, hanlingshaPlayer, false, false,callBack);
			} else if (useToudao) {
				textAreaAddMessage("将【"+tempHandCard.name+"】当作【偷盗】使用", myText, listView);
				handCardToudao.effect(hanlingshaPlayer, hanlingshaPlayer, false, false, callBack);
			}
		}));
	}else if(callBack!=null){
		callBack();
	}

}











