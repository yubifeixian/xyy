//李逍遥【侠骨柔情】
function advSkillCharacters_LixiaoyaoXiagurouchang(nowplayer,callBack) {
	if (nowplayer!=null&&nowplayer.hp > 0
			&& nowplayer.skillNameList.containsObject(skillnameXiagurouchang)
			&& fight_Trigger[0].sex == 1) {
		mainScene.addChild(new skillAnimationLayer(nowplayer.animation));
		textAreaAddMessage("李逍遥【侠骨柔肠】效果触发，自身命中+1", myText, listView,function(){
			baseEffectAddTempExtent(nowplayer);
			callBack();
		});
	}else{
		callBack();
	}
}

// 李逍遥【飞龙探云手】
function advSkillCharacters_LixiaoyaoFeilongtanyunshou(callBack) {
	if (fight_Trigger[0].hp>0&&fight_Trigger[0].skillNameList.containsObject(skillnameFeilongtanyunshou)
			|| (fight_Trigger.length > 1 && fight_Trigger[1].hp>0&&fight_Trigger[1].skillNameList.containsObject(skillnameFeilongtanyunshou))) {
		if (fight_FirstMonster.dodge <= 2) {
			// myAudioPlayer(audioLixiaoyaoFeilongtanyunshou);
			textAreaAddMessage("李逍遥【飞龙探云手】效果触发，抽取每名妨碍者1张手牌", myText, listView);
			if(fight_Monster[0].handCard.length==0){
				textAreaAddMessage("妨碍者无手牌", myText, listView,callBack);
			}else{
				var tempNumber=parseInt(Math.random()*fight_Monster[0].handCard.length, 10);
				var card=fight_Monster[0].handCard[tempNumber];
				for(var i=0;i<fight_Trigger.length;i++){
					if(fight_Trigger[i]._name==nameLixiaoyao){
						fight_Trigger[i].handCard.push(card);
						if(fight_Trigger[i]._name==myControlPlayer._name){
							handCardZone.pushBackCustomItem(card);
						}
						fight_Monster[0].handCard.removeObject(card);
						if(fight_Monster[0]._name==myControlPlayer._name){
							card.removeFromParent();
						}
						textAreaAddMessage("李逍遥获得"+fight_Monster[0]._name+"1张手牌", myText, listView,callBack);
						break;
					}
				}
			}
		}else{
			callBack();
		}
	}else{
		callBack();
	}
}



// 赵灵儿【双剑】
function advSkillCharacters_ZhaolingerShuangjian(player,callBack,callBack2){
	var updateArm=1;
	if(player.skillNameList.containsObject(skillnameShuangjian)){
		if(player.arms1=="无"){
			updateArm=1;
			callBack(player,updateArm,callBack2);
		}
		else if(player.arms2=="无"){
			updateArm=2;
			callBack(player,updateArm,callBack2);
		}else{
			if(player._name==myControlPlayer._name){
				addDialog(mainScene, new ChooseZoneLayer("“双剑”:替换第二把武器？(否则为第一把)",function(result){
					updateArm=result?2:1;
					if(result){
						// myAudioPlayer(audioZhaolingerShuangjian);
						textAreaAddMessage(player._name+"发动“双剑”效果", myText, listView);
					}
					callBack(player,updateArm,callBack2);
				}));

			}else{
				// AI决定是否发动【双剑】
				updateArm=player.arms1=="无"?1:2;
				if(updateArm==2){
					textAreaAddMessage(player._name+"发动“双剑”效果", myText, listView);
				}
				callBack(player,updateArm,callBack2);
			}
		}
	}else{
		callBack(player,updateArm,callBack2);
	}
}

// 赵灵儿【梦蛇】
function advSkillCharacters_ZhaolingerMengshe(){
	for (var i = 0; i < nowPlayerTerm.length; i++) {
		var tempHP = 0;
		var tempArms1 = "无", tempArms2 = "无", tempDefense = "无 ", tempPet1, tempPet2, tempPet3, tempPet4, tempPet5;
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i]._name==nameZhaolinger) {
			if (boss.monsterList.length >=5) {
				// AchivementProgress.addAchivementProgress(nowPlayerTerm[i]);
				tempHP = nowPlayerTerm[i].hp;
				tempArms1 = nowPlayerTerm[i].arms1;
				tempArms2 = nowPlayerTerm[i].arms2;
				tempDefense =nowPlayerTerm[i].defense;
				tempPet1 = nowPlayerTerm[i].pet_Feng;
				tempPet2 = nowPlayerTerm[i].pet_Lei;
				tempPet3 = nowPlayerTerm[i].pet_Shui;
				tempPet4 = nowPlayerTerm[i].pet_Huo;
				tempPet5 = nowPlayerTerm[i].pet_Tu;
				nowPlayerTerm[i]._name="赵灵儿(梦蛇)";
				mainScene.addChild(new skillAnimationLayer(nowPlayerTerm[i].animation,function(){
					advCharacterCardManager(nowPlayerTerm[i],26);
					nowPlayerTerm[i].hadImageView.loadTexture(nowPlayerTerm[i].playerPicSrc);
					nowPlayerTerm[i].hp = tempHP;
					nowPlayerTerm[i].arms1 = tempArms1;
					nowPlayerTerm[i].arms2 = tempArms2;
					nowPlayerTerm[i].defense = tempDefense;
					nowPlayerTerm[i].pet_Feng = tempPet1;
					nowPlayerTerm[i].pet_Lei = tempPet2;
					nowPlayerTerm[i].pet_Shui = tempPet3;
					nowPlayerTerm[i].pet_Huo = tempPet4;
					nowPlayerTerm[i].pet_Tu = tempPet5;
					textAreaAddMessage("赵灵儿“梦蛇”效果触发，变身为"+nameZhaolingerMengshe, myText,listView);
				}));
			}
			return
		} else if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i]._name==nameZhaolingerMengshe) {
			if (boss.monsterList.length <5) {
				tempHP = nowPlayerTerm[i].hp;
				tempArms1 = nowPlayerTerm[i].arms1;
				tempArms2 = nowPlayerTerm[i].arms2;
				tempDefense = nowPlayerTerm[i].defense;
				tempPet1 = nowPlayerTerm[i].pet_Feng;
				tempPet2 = nowPlayerTerm[i].pet_Lei;
				tempPet3 = nowPlayerTerm[i].pet_Shui;
				tempPet4 = nowPlayerTerm[i].pet_Huo;
				tempPet5 = nowPlayerTerm[i].pet_Tu;
				advCharacterCardManager(nowPlayerTerm[i],2);
				nowPlayerTerm[i].hadImageView.loadTexture(nowPlayerTerm[i].playerPicSrc);
				nowPlayerTerm[i].hp = tempHP;
				nowPlayerTerm[i].arms1 = tempArms1;
				nowPlayerTerm[i].arms2 = tempArms2;
				nowPlayerTerm[i].defense = tempDefense;
				nowPlayerTerm[i].pet_Feng = tempPet1;
				nowPlayerTerm[i].pet_Lei = tempPet2;
				nowPlayerTerm[i].pet_Shui = tempPet3;
				nowPlayerTerm[i].pet_Huo = tempPet4;
				nowPlayerTerm[i].pet_Tu = tempPet5;
				textAreaAddMessage(nameZhaolingerMengshe+"“变身”效果触发，还原为"+nameZhaolinger, myText, listView);
			}
			return;
		}
	}
}



// 赵灵儿（梦蛇）【女娲】
function advSkillCharacters_ZhaolingerMengsheNvwa(callBack) {
	var zhaolingerMengshe=null;
	for(var i=0;i<nowPlayerTerm.length;i++){
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i].skillNameList.containsObject(skillnameNvwa)) {
			zhaolingerMengshe=nowPlayerTerm[i];
			break;
		}	
	}

	if (zhaolingerMengshe!=null) {
		triggerCombat += 2;
		mainScene.addChild(new skillAnimationLayer(zhaolingerMengshe.animation));
		textAreaAddMessage("赵灵儿(梦蛇)“女娲”效果触发，本方战力+2", myText, listView,callBack);
	}else{
		callBack();
	}
}

// 林月如[嫉恶如仇]
function advSkillCharacters_LinyueruJieruchou(vector1,vector2,callBack) {
	var hasLingyueru=false;
	if (vector1.length > 0) {
		for (var i=0;i<vector1.length;i++) {
			if (vector1[i].hp > 0
					&& vector1[i].skillNameList.containsObject(skillnameJieruchou)) {
				var linyueruPlayer=vector1[i];
				hasLingyueru=true;
				mainScene.addChild(new skillAnimationLayer(linyueruPlayer.animation,function(){
					textAreaAddMessage("林月如【嫉恶如仇】效果触发，敌方所有参战者HP-1", myText, listView);
					if (vector2.length > 0) {
						var tempHeartList=new Array();
						var tempHeartNumberList=new Array();
						for (var t=0;t<vector2.length;t++) {
							tempHeartList.push(vector2[t]);
							tempHeartNumberList.push(1);
						}
						advUseYingu(tempHeartList,tempHeartList[0],tempHeartList[0],tempHeartNumberList,true,advBaseEffectReduceHPEffect,function(){
							// 唐雪见【追打】技能
							advSkillCharactersTangxuejianZhuida(function(){
								heartList=new Array();
								if(callBack!=null){
									callBack();
								}
							});
						});
					} else {
						textAreaAddMessage("敌方无人参战", myText, listView,callBack);
					}
				}));
				break;
			}
		}
		if(!hasLingyueru&&callBack!=null){
			callBack();
		}
	}else if(callBack!=null){
		callBack();
	}
}

// 林月如【林家剑法】
function advSkillCharacter_LinyueruLinjiajianfa(temPlayer) {
	if (temPlayer.skillNameList.containsObject(skillnameLinjiajianfa)) {
		if (!skillXiejianxian_HasXiejianxian(temPlayer)) {
			temPlayer.arms1Combat += 1;
		}
		// myAudioPlayer(audioLinyueruLinjiajianfa);
		textAreaAddMessage("林月如【林家剑法】效果触发，战力额外+1", myText, listView);
	}
}

// 阿奴【万蛊蚀天】
function advSkillCharacters_AnuWangushitian() {
	if (nowPlayerTerm[nowPlayerNumber].skillNameList.containsObject(skillnameWangushitian)
			&& nowPlayerTerm[nowPlayerNumber].handCard.length==0) {
		var addCardPlayerList=new Array();
		var addCardNumberList=new Array();
		var tempHeartList=new Array();
		var tempHeartNumberList=new Array();
		// myAudioPlayer(audioAnuWangushitian);
		textAreaAddMessage("阿奴触发【万蛊蚀天】效果，我方全体补1张牌后，除阿奴以外的所有角色HP-1", myText, listView,function(){
			for(var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++){
				if(nowPlayerTerm[nowPlayerNumber].friendList[i].hp>0){
					addCardPlayerList.push(nowPlayerTerm[nowPlayerNumber].friendList[i]);
					addCardNumberList.push(1);
				}
			}
			for(var i=0;i<nowPlayerTerm.length;i++){
				if(nowPlayerTerm[i]._name!=nameAnu){
					tempHeartList.push(nowPlayerTerm[i]);
					tempHeartNumberList.push(1);
				}
			}
			advAddHandCard(addCardPlayerList,addCardPlayerList[0],addCardPlayerList[0],null,addCardNumberList,true,true,function(){
				advUseYingu(tempHeartList,tempHeartList[0],tempHeartList[0],tempHeartNumberList,true,advBaseEffectReduceHPEffect,function(){
					// 唐雪见【追打】技能
					advSkillCharactersTangxuejianZhuida(function(){
						heartList=new Array();
					});
				});
			});
		});
	}
}


// 阿奴【鬼灵精】
function advSkillCharacters_AnuGuilingjing() {
	var anu = nowPlayerTerm[nowPlayerNumber];
	if (anu._name==myControlPlayer._name&&myControlPlayer.handCard.length>0) {
		var canUseGuilingjing=false;
		for(var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++){
			if(nowPlayerTerm[nowPlayerNumber].friendList[i].hp>0&&(nowPlayerTerm[nowPlayerNumber].friendList[i]._name!=nameAnu&&nowPlayerTerm[nowPlayerNumber].friendList[i]._name!=nameChonglouSp)){
				canUseGuilingjing=true;
				break;
			}
		}
		if(canUseGuilingjing){
			addDialog(mainScene,new selectCardDialogLayer("阿奴“鬼灵精”效果:请选择手牌",anu.handCard,1,anu.handCard.length,true,function(result){
				if(result!=null){
					var sendCardList=result;
					var player1Shown=player1._name!=myControlPlayer._name?true:false;
					var player2Shown=player2._name!=myControlPlayer._name?true:false;
					var player3Shown=player3._name!=myControlPlayer._name?true:false;
					addDialog(mainScene, new selectAdvPlayerDialogLayer(player1Shown,player2Shown, player3Shown, true,
							"阿奴“鬼灵精”效果:请选择交予的玩家", false, false,function(selectPlayer){
						mainScene.addChild(new skillAnimationLayer(anu.animation));
						textAreaAddMessage("阿奴发动“鬼灵精”效果", myText, listView);
						textAreaAddMessage("将"+sendCardList.length+"张手牌交给"+selectPlayer._name, myText, listView);
						for(var i=0;i<sendCardList.length;i++){
							selectPlayer.handCard.push(sendCardList[i]);
							myControlPlayer.handCard.removeObject(sendCardList[i]);
							sendCardList[i].removeFromParent();
						}
					}));
				}
			}));
		}
	} else {
		if (anu.handCard.length > 0 && anu.friendList[1].hp > 0&&anu.friendList[1]._name!=nameChonglouSp) {
			var selectedCard = anu.handCard[parseInt(Math.random()*anu.handCard.length, 10)];
			var selectPlayer = randomGetLivePlayerFriend(anu);
			selectPlayer.handCard.push(selectedCard);
			if (selectPlayer._name==myControlPlayer._name) {
				handCardZone.pushBackCustomItem(selectedCard);
			}
			anu.handCard.removeObject(selectedCard);
			textAreaAddMessage("阿奴发动【鬼灵精】，交给"+selectPlayer._name+"1张手牌", myText, listView);
		} 
	}
}

// 酒剑仙【醉仙望月步】
function advSkillCharacters_JiujianxianZuixianwangyubu() {
	var jiujianxian = nowPlayerTerm[nowPlayerNumber];
	if (jiujianxian.hp > 0
			&& jiujianxian.skillNameList.containsObject(skillnameZuixianwangyuebu)
			&& jiujianxianZuiXianWangYueBu == 0) {
		if (jiujianxian._name==myControlPlayer._name) {
			addDialog(mainScene, new ChooseZoneLayer("是否发动【醉仙望月步】再次打怪？",function(result){
				if(result){
					mainScene.addChild(new skillAnimationLayer(jiujianxian.animation,function(){
						jiujianxianZuiXianWangYueBu = 1;
						nextStep=2;
						advRoundAttactk1Handle(true);
					}));
				}
			}));
		} else {
			// AI决定是否发动【醉仙望月步】
			/*
			 * if (BaseEffect.haveHowManyCardOfType(jiujianxian,
			 * CardType.fight_card) > 0 && jiujianxian.friendList.get(1).hp > 0 &&
			 * jiujianxian.hp > 2) { InitGameActivity.lock = false; opinion =
			 * YesorNoDialog.YES_OPTION; }
			 */
		}
	}
}

// 酒剑仙【御剑术】
function advSkillCharacters_JiujianxianYujianshu(temPlayer) {
	if (temPlayer.skillNameList.containsObject(skillnameYujianshu)) {
		if (skillXiejianxian_HasXiejianxian(temPlayer)) {
			temPlayer.arms1Extent += 1;
		}
		textAreaAddMessage("酒剑仙【御剑术】效果触发，命中额外+1", myText, listView);
	}
}

// 拜月教主【召唤水魔兽】
function advSkillCharacters_BaiyueZhaohuanshuimoshou(usePlayer) {
	if(usePlayer._name==nameBaiyuejiaozhu&&usePlayer.handCard.length>=2&&!usePlayer.usedAttackCard){
		if(usePlayer._name==myControlPlayer._name){
			addDialog(mainScene, new selectCardDialogLayer("请丢弃2张牌发动【召唤水魔兽】",usePlayer.handCard,2,2,true,function(result){
				if(result){
					// AchivementProgress.addAchivementProgress(player1);
					usePlayer.usedAttackCard=true;
					for(var i=0;i<result.length;i++){
						advRemove_Card_Into_DropDeck(result[i].name);
						usePlayer.handCard.removeObject(result[i]);
						result[i].removeFromParent();
					}
					textAreaAddMessage("拜月教主发动【召唤水魔兽】，本场战斗中我方战力+5", myText, listView, function(){
						triggerCombat += 5;
					});
				}
			}));
		}else{
			// AI处理召唤水魔兽
		}
	}
}
// 拜月【水魔兽合体】
function advSkillCharacters_BaiyueShuimoshouheti(callBack) {
	var baiyuejiaozhu=null;
	for (var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++) {
		if (nowPlayerTerm[nowPlayerNumber].friendList[i].skillNameList.containsObject(skillnameShuimoshouheti)
				&& nowPlayerTerm[nowPlayerNumber].friendList[i].joinAttack == true
				&& (fight_FirstMonster.nature=="水" || fight_FirstMonster.nature=="火")) {
			baiyuejiaozhu=nowPlayerTerm[nowPlayerNumber].friendList[i];
			break;
		}
	}
	if(baiyuejiaozhu!=null){
		textAreaAddMessage("拜月教主【水魔兽合体】效果触发，自身战力+2", myText, listView,function(){
			baseEffectAddSkillCombat(baiyuejiaozhu, 2);
			callBack();
		});
	}else{
		callBack();
	}
}

// 王小虎【发挥不稳定】
function advSkillCharacters_WangxiaohuFahuibuwending(callBack) {
	var effected=false;
	for (var i=0;i< nowPlayerTerm[nowPlayerNumber].friendList.length;i++) {
		if (nowPlayerTerm[nowPlayerNumber].friendList[i].hp > 0
				&& nowPlayerTerm[nowPlayerNumber].friendList[i].skillNameList.containsObject(skillnameFahuibuwending)
				&& nowPlayerTerm[nowPlayerNumber].friendList[i].joinAttack&&!nowPlayerTerm[nowPlayerNumber].friendList[i].everyRoundSkill_1) {
			var faHuiBuWenDing = 0;
			nowPlayerTerm[nowPlayerNumber].friendList[i].everyRoundSkill_1=true;
			textAreaAddMessage("王小虎【发挥不稳定】效果，进行掷骰判定(1、6算0点)", myText, listView, function(){
				faHuiBuWenDing=parseInt(Math.random()*6, 10)+1;
				textAreaAddMessage("掷骰点数为："+faHuiBuWenDing, myText, listView, function(){
					advSkillCharacters_WangxiaohuBuqubunao(nowPlayerTerm[nowPlayerNumber].friendList[i], faHuiBuWenDing,function(result){
						if(result==1||result==6){
							result=0;
						}
						textAreaAddMessage("王小虎战力+"+result+"点", myText, listView, function(){
							baseEffectAddSkillCombat(nowPlayerTerm[nowPlayerNumber].friendList[i], result);
							callBack();
						});
					});
				});
			});
			effected=true;
			break;
		}
	}
	if(!effected){
		callBack();
	}
}


// 王小虎_不屈不挠
function advSkillCharacters_WangxiaohuBuqubunao(usePlayer,xiaohuNum,callBack) {
	if (usePlayer._name==myControlPlayer._name&&usePlayer.skill_2==skillnameBuqubunao&&usePlayer.handCard.length>0) {
		addDialog(mainScene, new ChooseZoneLayer("是否发动【不屈不挠】效果，弃1张手牌重新掷骰？",function(result){
			if(result){
				addDialog(mainScene, new selectCardDialogLayer("请选择丢弃的牌",usePlayer.handCard,1,1,false,function(result){
					var card=result.pop();
					advRemove_Card_Into_DropDeck(card.name);
					usePlayer.handCard.removeObject(card);
					card.removeFromParent();
					textAreaAddMessage("王小虎发动【不屈不挠】效果,丢1张牌后重新掷骰", myText, listView, function(){
						xiaohuNum=parseInt(Math.random()*6, 10)+1;
						textAreaAddMessage("王小虎掷骰点数为："+xiaohuNum, myText, listView, function(){
							advSkillCharacters_WangxiaohuBuqubunao(usePlayer, xiaohuNum,callBack);
						});
					});
				}));
			}else{
				callBack(xiaohuNum);
			}
		}));
	} else {
		// textAreaAddMessage("王小虎不发动【不屈不挠】效果", myText, listView);
		callBack(xiaohuNum);
	}
}

// 苏媚[狡猾]
function advSkillCharacters_SumeiJiaohua(nowplayer,callBack) {
	if (nowplayer._name==myControlPlayer._name&&nowplayer._name==nameSumei
			&& !nowplayer.everyRoundSkill_1) {
		advUseDongmingbaojing(nowplayer, function(){
			addDialog(mainScene, new ChooseZoneLayer("是否发动【狡猾】翻取下一张怪牌？",function(result){
				if(result){
					// myAudioPlayer(audioSumeiJiaohua);
					nowplayer.everyRoundSkill_1 = true;
					if(game_MonsterDeck.length<=0){
						advJudgeWinorLose();
					}else{
						textAreaAddMessage("苏媚发动【狡猾】，重新翻取一张怪物牌", myText, listView, function(){
							fight_FirstMonster=advTopMonsterCard(game_MonsterDeck[0]);
							game_MonsterDropDeck.push(game_MonsterDeck[0]);
							game_MonsterDeck.shift();
							monsterLabel.loadTexture(fight_FirstMonster.monsterPicSrc);
							tempMonster=fight_FirstMonster;
							callBack();
						});
					}

				}else{
					textAreaAddMessage("苏媚不发动【狡猾】，继续打怪", myText, listView);
					callBack();
				}
			}));
		});
	}else{
		callBack();
	}
}

// 苏媚【拒绝】
function advSkillCharacters_SumeiJujue(player,callBack1,callBack2){
	if(player.hp>0&&player.skillNameList.containsObject(skillnameJujue)&&baseEffectHaveHowManyCardOfType(player,CARDTYPE.SPECIALCARD)>0){
		var tempList=new Array();
		for(var i=0;i<player.handCard.length;i++){
			if(player.handCard[i].cardType==CARDTYPE.SPECIALCARD){
				tempList.push(player.handCard[i]);
			}
		}
		if(player._name==myControlPlayer._name){
			addDialog(mainScene, new ChooseZoneLayer("拒绝：将一张特殊类手牌当作【冰心诀】使用？",function(result){
				if(result){
					addDialog(mainScene, new selectCardDialogLayer("请选择1张特殊类手牌",tempList,1,1,false,function(selectCard){
						// myAudioPlayer(audioSumeiJujue);
						// AchivementProgress.addAchivementProgress(player1);
						var card=selectCard.pop();
						advRemove_Card_Into_DropDeck(card.name);
						player.handCard.removeObject(card);
						card.removeFromParent();
						callBack1();
					}));
				}else{
					// 不发动拒绝的处理
					callBack2();
				}
			}));
		}else{
			// AI默认不发动拒绝
			callBack2();
		}
	}else{
		// 不满足【拒绝】条件，默认不发动
		callBack2();
	}
}


// 沈欺霜【仙霞五奇】
function advSkillCharacters_ShenqishuangXianxiawuqi(isWuren,zhenyin, mubiaoobject) {
	var message1 = null;
	var message2 = null;
	for (var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++) {
		if (nowPlayerTerm[nowPlayerNumber].friendList[i].hp > 0
				&& nowPlayerTerm[nowPlayerNumber].friendList[i].skillNameList.containsObject(skillnameXianxiawuqi)) {
			for (var t=0;t<zhenyin.friendList.length;t++) {
				if (zhenyin.friendList[t].skillNameList.containsObject(skillnameXianxiawuqi)) {
					if (isWuren) {
						message1 = "无人支援,";
					} else {
						message1 = "支援失败，";
					}
					message2 = "触发者";
					triggerCombat -= fight_Trigger[0].combat;
					baseEffectAddSkillCombat(mubiaoobject, 3);
					triggerCombat += fight_Trigger[0].combat;
					// myAudioPlayer(audioShenqishuangXianxiawuqi);
					textAreaAddMessage(message2+message1+"沈欺霜发动【仙霞五奇】效果,"+message2+"战力+3",myText,listView);
					// AchivementProgress.addAchivementProgress(nowPlayerTerm[i]);
					return;
				}
			}
		}
	}
}

// 沈欺霜【元灵归心术】
function advSkillCharacters_ShenqishuangYuanlingguixinshu(player) {
	if(player._name==myControlPlayer._name&&baseEffectHaveHowManyCardOfType(player,CARDTYPE.SKILLCARD)>0){
		var skillCardList=new Array();
		for(var i=0;i<player.handCard.length;i++){
			if(player.handCard[i].cardType==CARDTYPE.SKILLCARD){
				skillCardList.push(player.handCard[i]);
			}
		}
		addDialog(mainScene,new selectCardDialogLayer("请选择丢弃的技牌(每丢弃1张可回复任意玩家2点HP)",skillCardList,1,skillCardList.length,true,function(selectList){
			if(selectList!=null){
				addDialog(mainScene,new selectAdvPlayerDialogLayer(true,true, true, true,
						"请选择玩家", false, false,function(selectPlayer){
					for(var i=0;i<selectList.length;i++){
						advRemove_Card_Into_DropDeck(selectList[i].name);
						player.handCard.removeObject(selectList[i]);
						selectList[i].removeFromParent();
						for(var t=0;t<2;t++){
							advBaseEffectAddHP(selectPlayer);
						}
						has_Tianshezhang(selectPlayer);
					}
					textAreaAddMessage("沈欺霜发动【元灵归心术】效果,指定"+selectPlayer._name+"恢复HP",myText,listView);
				}));
			}
		}));
	}
}

// 孔璘【辣手摧花】
function advSkillCharacters_KonglinLashoucuihua() {
	var Havefemale = false;
	var female = 0;
	if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name&&myControlPlayer._name==nameKonglin){
		for (var i = 0; i < nowPlayerTerm.length; i++) {
			if (nowPlayerTerm[i].sex == 1) {
				Havefemale = true;
				++female;
			}
		}
		if (myControlPlayer.hp >= 2 && Havefemale
				&& laShouCuiHuaList.length + 1 <= female) {
			var player1Shown = (player1._name==myControlPlayer._name||player1.sex == 0) ? false : true;
			var player2Shown =(player2._name==myControlPlayer._name||player2.sex == 0) ? false : true;
			var player3Shown = (player3._name==myControlPlayer._name||player3.sex == 0)? false : true;
			var bossShown = boss.sex == 0 ? false : true;
			for (var i=0;i<laShouCuiHuaList.length;i++) {
				if (player1._name==laShouCuiHuaList[i]._name){
					player1Shown = false;
				}else if (player2._name==laShouCuiHuaList[i]._name){
					player2Shown = false;
				}else if (player3._name==laShouCuiHuaList[i]._name){
					player3Shown = false;
				}else if (boss._name==laShouCuiHuaList[i]._name){
					bossShown = false;
				}
			}
			addDialog(mainScene,new selectAdvPlayerDialogLayer(player1Shown, player2Shown, player3Shown, bossShown,"请选择一名女性角色",false,false,function(selectPlayer){
				laShouCuiHuaList.push(selectPlayer);
				advUseYingu([myControlPlayer,selectPlayer],myControlPlayer,myControlPlayer,[1,1],true,advBaseEffectReduceHPEffect,function(){
					// 唐雪见【追打】技能
					advSkillCharactersTangxuejianZhuida(function(){
						heartList=new Array();
						// AchivementProgress.addAchivementProgress(player1);
					});
				});
			}));
		}
	}
}


// 孔璘[生命献祭]
function advSkillCharacters_KonglinShengmingxianji(nowplayer) {
	var who=0;// 0表示未参战，1表示触发者，2表示支援者，3表示妨碍者
	if(nowplayer.joinAttack){
		for(var i=0;i<fight_Trigger.length;i++){
			if(fight_Trigger[i]._name==nowplayer._name){
				who=nowplayer._name==nowPlayerTerm[nowPlayerNumber]._name?1:2;
				break;
			}
		}
	}
	textAreaAddMessage(nameKonglin+"【生命献祭】技能触发，变身为“魔尊”",myText,listView);
	// 将【孔璘】替换为【魔尊】
	advCharacterCardManager(nowplayer, 25);
	nowplayer.hadImageView.loadTexture(nowplayer.playerPicSrc);
	switch (who) {
	case 1:
		fight_Trigger[0]=nowplayer;
		break;
	case 2:
		fight_Trigger[1]=nowplayer;
		break;
	}
}

// 魔尊【蓄势待发】技能
function advSkillCharacters_MozunXushidaifa() {
	if (nowPlayerTerm[nowPlayerNumber].skillNameList.containsObject(skillnameXushidaifa)) {
		textAreaAddMessage("魔尊【蓄势待发】技能触发，补充1张手牌",myText,listView,function(){
			advAddHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],null,[1],true,true);
		});
	}
}

// 魔尊【崩坏】技能
function advSkillCharacters_MozunBenghuai() {
	if (nowPlayerTerm[nowPlayerNumber].skillNameList.containsObject(skillnameBenghuai)
			&& nowPlayerTerm[nowPlayerNumber].hp > 0) {
		textAreaAddMessage("魔尊【崩坏】效果触发，HP-1",myText,listView);
		advUseYingu([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],[1],true,advBaseEffectReduceHPEffect,function(){
			// 唐雪见【追打】技能
			advSkillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
			});
		});
	}
}

// 唐雪见【追打】
function advSkillCharactersTangxuejianZhuida(callBack) {
	if (heartList.length > 0) {
		var hasTangxuejian=false;
		for (var i=0;i<nowPlayerTerm[nowPlayerNumber].friendList.length;i++) {
			if (nowPlayerTerm[nowPlayerNumber].friendList[i].hp > 0
					&& nowPlayerTerm[nowPlayerNumber].friendList[i].skillNameList.containsObject(skillnameZhuida)) {
				hasTangxuejian=true;
				if (nowPlayerTerm[nowPlayerNumber].friendList[i]._name==myControlPlayer._name&&nowPlayerTerm[nowPlayerNumber].friendList[i].handCard.length>0) {
					addDialog(mainScene,new ChooseZoneLayer("是否发动追打？",function(result){
						if(result){
							addDialog(mainScene,new selectCardDialogLayer("请丢弃1张手牌",nowPlayerTerm[nowPlayerNumber].friendList[i].handCard,1,1,false,function(selectCard){
								// AchivementProgress.addAchivementProgress(player1);
								var card=selectCard.pop();
								advRemove_Card_Into_DropDeck(card.name);
								nowPlayerTerm[nowPlayerNumber].friendList[i].handCard.removeObject(card);
								card.removeFromParent();
								var tempHeartList=new Array();
								var tempHeartNumberList=new Array();
								for(var t=0;t<heartList.length;t++){
									tempHeartList.push(heartList[t]);
									tempHeartNumberList.push(1);
								}
								heartList=new Array();
								advUseYingu(tempHeartList,tempHeartList[0],tempHeartList[0],tempHeartNumberList,true,advBaseEffectReduceHPEffect,function(){
									// 唐雪见【追打】技能
									advSkillCharactersTangxuejianZhuida(callBack);
								});
							}));
						}else if(callBack!=null){
							callBack();
						}
					}));
				} else {
					// AI处理【追打】
					if (nowPlayerTerm[nowPlayerNumber].friendList[i].handCard.length > 2) {
						var canUseZhuida = true;
						for (var t=0;t<heartList.length;t++) {
							if(heartList[t]._name!=boss._name){
								canUseZhuida=false;
								break;
							}
						}
						if (canUseZhuida) {
							var tempHandCard = nowPlayerTerm[nowPlayerNumber].friendList[i].handCard[parseInt(Math.random()*nowPlayerTerm[nowPlayerNumber].friendList[i].handCard.length, 10)];
							nowPlayerTerm[nowPlayerNumber].friendList[i].handCard.removeObject(tempHandCard);
							advRemove_Card_Into_DropDeck(tempHandCard.name);
							textAreaAddMessage("唐雪见舍弃1张手牌"+tempHandCard.name+"发动“追打”，本次所有HP减少的玩家(可能包括唐雪见自己)HP额外-1", myText, listView, function(){
								var tempHeartList=new Array();
								var tempHeartNumberList=new Array();
								for(var i=0;i<heartList.length;i++){
									tempHeartList.push(heartList[i]);
									tempHeartNumberList.push(1);
								}
								heartList=new Array();
								advUseYingu(tempHeartList,tempHeartList[0],tempHeartList[0],tempHeartNumberList,true,advBaseEffectReduceHPEffect,function(){
									// 唐雪见【追打】技能
									advSkillCharactersTangxuejianZhuida(callBack);
								});
							});
						}else if(callBack!=null){
							callBack();
						}
					}else if(callBack!=null){
						callBack();
					}
				}
				break;
			}
		}
		if(!hasTangxuejian&&callBack!=null){
			callBack();
		}
	}else if(callBack!=null){
		callBack();
	}
}

// 唐雪见【连击】
function advSkillCharacters_TangxuejianLianji() {
	var useCardList=new Array();
	for (var i=0; i<myControlPlayer.handCard.length;i++) {
		if (myControlPlayer.handCard[i].cardType!=CARDTYPE.FIGHTCARD) {
			useCardList.push(myControlPlayer.handCard[i]);
		}
	}
	if (useCardList.length>0) {
		addDialog(mainScene, new selectCardDialogLayer("请选择丢弃的牌(每1张可令您在本场战斗中增加2点战力)",useCardList,1,useCardList.length,true,function(selectCardList){
			if(selectCardList!=null){
				for(var i=0;i<selectCardList.length;i++){
					advRemove_Card_Into_DropDeck(selectCardList[i].name);
					myControlPlayer.handCard.removeObject(selectCardList[i]);
					selectCardList[i].removeFromParent();
					baseEffectAddTempCombat(myControlPlayer,2);
					triggerCombat += 2;
				}
				// myAudioPlayer(audioTangxuejianLianji);
				textAreaAddMessage("唐雪见发动【连击】，增加自身战力",myText,listView);
			}
		}));
	}
}

// 唐雪见【好胜】
function advSkillCharacters_TangxuejianHaosheng(){
	if((myControlPlayer.defense==string_handCardNameLonghunzhankai&& myControlPlayer.hp >= 1) 
			|| ((myControlPlayer.hp >= 2)&& myControlPlayer.joinAttack&& !myControlPlayer.everyRoundSkill_3)){
		addDialog(mainScene, new ChooseZoneLayer("是否发动“好胜”？",function(result){
			if(result){
				textAreaAddMessage("唐雪见发动“好胜”效果，扣减自己2点Hp后补2张牌(本伤害隐蛊无效)",myText,listView,function(){
					advBaseEffectReduceHPEffect(myControlPlayer, 2, true, function(){
						advSkillCharactersTangxuejianZhuida(function(){
							heartList=new Array();
							textAreaAddMessage("唐雪见补了2张牌", myText, listView);
							myControlPlayer.everyRoundSkill_3 = true;
							advAddHandCard([myControlPlayer],myControlPlayer,myControlPlayer,null,[2],true,true);
						});
					});
				});
			}
		}));
	}
}

// 紫萱【关爱】
function advSkillCharacters_ZixuanGuanai(tempPlayer,callBack) {
	var hasZixuan=false;
	for (var i=0;i<tempPlayer.friendList.length;i++) {
		if (tempPlayer.friendList[i].hp > 0
				&& tempPlayer.friendList[i].skillNameList.containsObject(skillnameGuanai)) {
			hasZixuan=true;
			var selectPlayer = null;
			textAreaAddMessage("紫萱【关爱】效果触发，指定一人补2张手牌", myText, listView, function(){
				if (player1.skillNameList.containsObject(skillnameGuanai)) {
					addDialog(mainScene,new selectAdvPlayerDialogLayer(true,true, true, true,
							"请指定一人补2张牌", false, false,function(selectResult){
						textAreaAddMessage(selectResult._name+"补了2张牌", myText, listView);
						advAddHandCard([selectResult],selectResult,selectResult,null,[2],true,true,callBack);
					}));
				} else {
					// AI处理【关爱】效果
					selectPlayer = tempPlayer.friendList[i];
					if (selectPlayer.friendList[0].hp > 0&&selectPlayer.friendList[1]._name!=nameChonglouSp
							&& selectPlayer.friendList[1].handCard.length < selectPlayer.handCard.length) {
						selectPlayer = selectPlayer.friendList[1];
					}
					// myAudioPlayer(audioZixuanGuanai);
					textAreaAddMessage(selectPlayer._name+"补了2张牌", myText, listView);
					advAddHandCard([selectPlayer],selectPlayer,selectPlayer,null,[2],true,true,callBack);
				}
			});
			break;
		}
	}
	if(!hasZixuan&&callBack!=null){
		callBack();
	}
}

// 紫萱【神圣】
function advSkillCharacters_ZixuanShensheng(player,monsterModel,callBack) {
	if (player.skillNameList.containsObject(skillnameShensheng)) {
		// myAudioPlayer(audioZixuanShensheng);
		textAreaAddMessage("紫萱“神圣”效果触发，"+monsterModel.name+"战力+3", myText, listView);
		monsterModel.combat += 3;
		if (monsterModel.name==nameJinchanguimu) {
			jinchanguimu.combat += 3;
		}
		if(callBack!=null){
			callBack();
		}
	}else if(callBack!=null){
		callBack();
	}
}

function advZixuan_ShenshengEnd(player,monsterModel) {
	if(monsterModel!=null&&monsterModel!=undefined){
		if (player.skillNameList.containsObject(skillnameShensheng)) {
			textAreaAddMessage("紫萱“神圣”效果失效，"+monsterModel.name+"战力-3", myText, listView);
			monsterModel.combat -= 3;
			if (monsterModel.name==nameJinchanguimu) {
				jinchanguimu.combat -= 3;
			}
		}
	}else{
		textAreaAddMessage("紫萱退场，“神圣”效果解除", myText, listView);
		var monsterModelList = new Array();
		monsterModelList[0] = player.pet_FengMonster;
		monsterModelList[1] = player.pet_LeiMonster;
		monsterModelList[2] = player.pet_ShuiMonster;
		monsterModelList[3] = player.pet_HuoMonster;
		monsterModelList[4] = player.pet_TuMonster;
		for (var i = 0; i < monsterModelList.length; i++) {
			if (monsterModelList[i] != null) {
				monsterModelList[i].combat -= 3;
				if (monsterModelList[i].name==nameJinchanguimu) {
					jinchanguimu.combat -= 3;
				}

			}
		}
	}

}

// 重楼【决斗】
function advSkillCharacters_ChonglouJuedou() {
	var juedouList=new Array();
	if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name&&myControlPlayer._name==nameChonglou&&myControlPlayer.handCard.length>=chonglou_JueDou){
		addDialog(mainScene,new selectCardDialogLayer("请选择丢弃的牌",myControlPlayer.handCard,chonglou_JueDou+1,chonglou_JueDou+1,true,function(selectCardList){
			if(selectCardList!=null){
				chonglou_JueDou++;
				for(var i=0;i<selectCardList.length;i++){
					advRemove_Card_Into_DropDeck(selectCardList[i].name);
					myControlPlayer.handCard.removeObject(selectCardList[i]);
					selectCardList[i].removeFromParent();
				}
				var player1Shown=player1._name!=myControlPlayer._name?true:false;
				var player2Shown=player2._name!=myControlPlayer._name?true:false;
				var player3Shown=player3._name!=myControlPlayer._name?true:false;
				addDialog(mainScene,new selectAdvPlayerDialogLayer(player1Shown,player2Shown, player3Shown, true,
						"请选择1名决斗的角色", false, false,function(jueDouPlayer1){
					juedouList.push(jueDouPlayer1);
					if(baseEffectCountLivePlayer()>2){
						var temp2=juedouList[0]._name==player2._name?false:true;
						var temp3=juedouList[0]._name==player3._name?false:true;
						var temp4=juedouList[0]._name==boss._name?false:true;
						addDialog(mainScene,new selectAdvPlayerDialogLayer(false,temp2, temp3, temp4,
								"请选择第2名决斗的角色或取消", true, false,function(jueDouPlayer2){
							if(jueDouPlayer2!=null){
								juedouList.push(jueDouPlayer2);
							}
							advJuedouHandle(juedouList,0);
						}));
					}else{
						// 无法选择第二名角色的处理
						advJuedouHandle(juedouList,0);
					}
				}));
			}
		}));
	}
}

function advJuedouHandle(juedouList,index){
	var number1 = 0, number2 = 0;
	number1 = parseInt(Math.random()*6,10)+1;
	textAreaAddMessage("重楼骰子点数为"+number1,myText,listView,function(){
		if(juedouList[index]._name!=boss._name){
			number2 =  parseInt(Math.random()*6,10)+1;
			textAreaAddMessage(juedouList[index]._name+"骰子点数为："+number2,myText,listView,function(){
				advSkillCharacters_WangxiaohuBuqubunaonao(juedouList[index],number2,function(){
					if (number1 > number2) {
						advJuedou_ChonlongWin(juedouList,index);
					}else if(number1 == number2){
						advJuedou_Draw(juedouList,index);
					}else if(number1 < number2){
						advJuedou_ChonlongLose(juedouList,index);
					}
				});
			});
		}else{
			switch(number1){
			case 1:
			case 2:
				advJuedou_ChonlongLose(juedouList,index);
				break;
			case 3:
			case 4:
				advJuedou_Draw(juedouList,index);
				break;
			case 5:
			case 6:
				advJuedou_ChonlongWin(juedouList,index);
				break;
			}

		}
	});
}

// 重楼决斗获胜的处理
function advJuedou_ChonlongWin(juedouList,index){
	var shouxialiuqing=false;
	var heart = 3;
	textAreaAddMessage("重楼获胜",myText,listView,function(){
		// AchivementProgress.addAchivementProgress(player1);
		if (juedouList[index].hp >= 2) {
			shouxialiuqing = true;
		}
		if (juedouList[index].hp - 3 <= 0 && shouxialiuqing) {
			textAreaAddMessage("重楼“手下留情”效果发动，HP大于等于2的一方，决斗后至少保留1点HP",myText,listView);
			heart = juedouList[index].hp - 1;
		}
		advBaseEffectReduceHPEffect(juedouList[index], heart,true,function(){
			// 唐雪见【追打】
			advSkillCharactersTangxuejianZhuida(function(){
				// cc.log("come in");
				heartList=new Array();
				if(index<juedouList.length-1){
					advJuedouHandle(juedouList,index+1);
				}
			});
		});
	});
}

// 重楼决斗失败处理
function advJuedou_ChonlongLose(juedouList,index){
	var heart = 3;
	var shouxialiuqing=false;
	textAreaAddMessage(juedouList[index]._name+"获胜",myText,listView);
	if (myControlPlayer.hp >= 2)
		shouxialiuqing = true;
	if (myControlPlayer.hp - 3 <= 0 && shouxialiuqing) {
		textAreaAddMessage("重楼“手下留情”效果发动，HP大于等于2的一方，决斗后至少保留1点HP",myText,listView);
		heart = myControlPlayer.hp - 1;
	}
	advBaseEffectReduceHPEffect(myControlPlayer, heart,true,function(){
		// 唐雪见【追打】
		advSkillCharactersTangxuejianZhuida(function(){
			heartList=new Array();
			if(index<juedouList.length-1){
				advJuedouHandle(juedouList,index+1);
			}
		});
	});
}

// 重楼决斗平局
function advJuedou_Draw(juedouList,index){
	var heart = 2;
	textAreaAddMessage("平局，双方HP-2",myText,listView);
	if (myControlPlayer.hp == 2) {
		textAreaAddMessage("重楼“手下留情”效果发动，HP大于等于2的一方，决斗后至少保留1点HP",myText,listView);
		advBaseEffectReduceHPEffect(myControlPlayer, 1,true,null);
	} else {
		advBaseEffectReduceHPEffect(myControlPlayer, 2,true,null);
	}
	if (juedouList[index].hp == 2) {
		textAreaAddMessage("重楼“手下留情”效果发动，HP大于等于2的一方，决斗后至少保留1点HP",myText,listView);
		advBaseEffectReduceHPEffect(juedouList[index], 1,true,null);
	} else {
		advBaseEffectReduceHPEffect(juedouList[index], 2,true,null);
	}
	// 唐雪见【追打】
	advSkillCharactersTangxuejianZhuida(function(){
		heartList=new Array();
		if(index<juedouList.length-1){
			advJuedouHandle(juedouList,index+1);
		}
	});
}


// 重楼【降临】
function advSkillCharacters_ChonglouJianglin() {
	/*
	 * if (fight_Monster.length > 0) { if
	 * (fight_Monster[0].skillNameList.containsObject(skillnameJianglin)) {
	 * textAreaAddMessage("重楼“降临”技能触发，命中额外+2", myText, listView); for (var i =
	 * 0; i < 2; i++) { baseEffectAddTempExtent(fight_Monster[0]); } } }
	 */
}

// 南宫煌【占卜】
function advSkillCharacters_NangonghuangZhanbu(){
	if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name&&myControlPlayer._name==nameNangonghuang
			&&myControlPlayer.handCard.length>0&&!myControlPlayer.everyRoundSkill_1){
		addDialog(mainScene, new selectCardDialogLayer("请弃掉1张牌发动“占卜”",myControlPlayer.handCard,1,1,true,function(result){
			if(result){
				myControlPlayer.everyRoundSkill_1=true;
				var card=result.pop();
				advRemove_Card_Into_DropDeck(card.name);
				myControlPlayer.handCard.removeObject(card);
				card.removeFromParent();
				textAreaAddMessage("南宫煌发动“占卜”效果，观看怪物牌堆", myText, listView);
				var message="";
				var monsterList=new Array();
				var monsterNumber = 0;
				var isNormal=true;
				if (game_MonsterDeck.length >= 3) {
					message = "请选择留下的牌（其余将被丢弃）";
					monsterNumber = 3;
				} else {
					message = "怪物牌堆不足3张，请确认要丢弃的牌：";
					isNormal=false;
					monsterNumber = game_MonsterDeck.length;
				}
				for (var i = 0; i < monsterNumber; i++) {
					monsterList.push(game_MonsterDeck[i]);
				}
				addDialog(mainScene, new selectMonsterDialogLayer(message,monsterList,function(selectMonster){
					if(isNormal){
						// 怪物牌堆大于等于3张时的处理
						for(var i=0;i<monsterList.length;i++){
							if(advTopMonsterCard(monsterList[i]).name!=selectMonster.name){
								textAreaAddMessage("南宫煌丢弃了【"+advTopMonsterCard(monsterList[i]).name+"】", myText, listView);
								game_MonsterDropDeck.push(monsterList[i].uid);
								game_MonsterDeck.removeObject(monsterList[i]);
							}
						}
					}else{
						// 怪物牌堆小于3张时的处理
						for(var i=0;i<game_MonsterDeck.length;i++){
							game_MonsterDropDeck.push(game_MonsterDropDeck[i]);
						}
						game_MonsterDeck=new Array();
					}
				}));
			}
		}));
	}
}


// 南宫煌【摄灵法阵】
function advSkillCharacters_NangonghuangShelingfazheng(pet_Shuxing,callBack) {
	callBack();
}


// 温慧【阵法】
function advSkillCharacters_WenhuiZhenfa() {
	if (fight_Trigger[0].skillNameList.containsObject(skillnameZhenfa)) {
		textAreaAddMessage("我方支援命中，温慧“阵法”效果触发，自身战力额外+3", myText, listView);
		baseEffectAddSkillCombat(fight_Trigger[0], 3);
	}
}

// 温慧【蛮横】
function advSkillCharacters_WenhuiManheng(callBack) {
	if (nowPlayerTerm[nowPlayerNumber].hp>0&&nowPlayerTerm[nowPlayerNumber].skillNameList.containsObject(skillnameManheng)) {
		if (nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name) {
			addDialog(mainScene, new selectAdvPlayerDialogLayer(true,true, true, true,
					"请指定“蛮横”的目标或取消", true, false,function(selectPlayer){
				if(selectPlayer!=null){
					textAreaAddMessage("温慧“蛮横”效果发动，指定"+selectPlayer._name+"HP-2", myText, listView);
					advUseYingu([selectPlayer], selectPlayer, selectPlayer, [2], true, advBaseEffectReduceHPEffect, function(){
						advSkillCharactersTangxuejianZhuida(function(){
							heartList=new Array();
							callBack();
						});
					});
				}
			}));
		} else {
			// AI决定是否发动【蛮横】
			var selectPlayer=boss;
			// myAudioPlayer(audioWenhuiManheng);
			textAreaAddMessage("温慧“蛮横”效果发动，指定"+selectPlayer._name+"HP-2", myText, listView);
			advUseYingu([selectPlayer], selectPlayer, selectPlayer, [2], true, advBaseEffectReduceHPEffect, function(){
				advSkillCharactersTangxuejianZhuida(function(){
					heartList=new Array();
					callBack();
				});
			});
		}
	}else{
		callBack();
	}
}

// 星璇【兄弟】
function advSkillCharacters_XingxuanXiongdi() {
	if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name&&!myControlPlayer.everyRoundSkill_1
			&&myControlPlayer._name==nameXingxuan&&(myControlPlayer.friendList[1].hp>0||myControlPlayer.friendList[2].hp>0)
			&&(myControlPlayer.handCard.length+myControlPlayer.friendList[1].handCard.length+myControlPlayer.friendList[2].handCard.length>0)){
		myControlPlayer.everyRoundSkill_1=true;
		textAreaAddMessage("星璇发动“兄弟”效果，收取队友手牌后任意分配", myText, listView);
		textAreaAddMessage("星璇收取队友的手牌，等待分配", myText, listView);
		if(myControlPlayer.friendList[1].handCard.length>0){
			for(var i=0;i<myControlPlayer.friendList[1].handCard.length;i++){
				myControlPlayer.handCard.push(myControlPlayer.friendList[1].handCard[i]);
				handCardZone.pushBackCustomItem(myControlPlayer.friendList[1].handCard[i]);
			}
			myControlPlayer.friendList[1].handCard=new Array();
		}
		if(myControlPlayer.friendList[2].handCard.length>0){
			for(var i=0;i<myControlPlayer.friendList[2].handCard.length;i++){
				myControlPlayer.handCard.push(myControlPlayer.friendList[2].handCard[i]);
				handCardZone.pushBackCustomItem(myControlPlayer.friendList[2].handCard[i]);
			}
			myControlPlayer.friendList[2].handCard=new Array();
		}
		if(myControlPlayer.friendList[1].hp>0){
			addDialog(mainScene, new selectCardDialogLayer("请选择分配给"+myControlPlayer.friendList[1]._name+"的手牌或取消",myControlPlayer.handCard,1,myControlPlayer.handCard.length,true,function(selectCardList){
				if(selectCardList!=null){
					for(var i=0;i<selectCardList.length;i++){
						myControlPlayer.friendList[1].handCard.push(selectCardList[i]);
						myControlPlayer.handCard.removeObject(selectCardList[i]);
						selectCardList[i].removeFromParent();
					}
				}
				if(myControlPlayer.friendList[2].hp>0){
					addDialog(mainScene, new selectCardDialogLayer("请选择分配给"+myControlPlayer.friendList[2]._name+"的手牌或取消",myControlPlayer.handCard,1,myControlPlayer.handCard.length,true,function(selectCardList){
						if(selectCardList!=null){
							for(var i=0;i<selectCardList.length;i++){
								myControlPlayer.friendList[2].handCard.push(selectCardList[i]);
								myControlPlayer.handCard.removeObject(selectCardList[i]);
								selectCardList[i].removeFromParent();
							}
						}
					}));
				}
			}));
		}else if(myControlPlayer.friendList[2].hp>0){
			addDialog(mainScene, new selectCardDialogLayer("请选择分配给"+myControlPlayer.friendList[2]._name+"的手牌或取消",myControlPlayer.handCard,1,myControlPlayer.handCard.length,true,function(selectCardList){
				if(selectCardList!=null){
					for(var i=0;i<selectCardList.length;i++){
						myControlPlayer.friendList[2].handCard.push(selectCardList[i]);
						myControlPlayer.handCard.removeObject(selectCardList[i]);
						selectCardList[i].removeFromParent();
					}
				}
			}));
		}
	}
}



// 星璇 【烹饪】(技牌阶段)
function advSkillCharacters_XingxuanPengren() {
	if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name
			&&myControlPlayer._name==nameXingxuan&&myControlPlayer.handCard.length>=2){
		addDialog(mainScene, new selectCardDialogLayer("请将2张手牌当作【灵葫仙丹】使用",myControlPlayer.handCard,2,2,true,function(selectCard){
			if(selectCard!=null){
				for(var i=0;i<selectCard.length;i++){
					textAreaAddMessage("星璇丢弃"+selectCard[i].name, myText, listView);
					advRemove_Card_Into_DropDeck(selectCard[i].name);
					myControlPlayer.handCard.removeObject(selectCard[i]);
					selectCard[i].removeFromParent();
				}
				// AchivementProgress.addAchivementProgress(player1);
				// myAudioPlayer(audioXingxuanPengren);
				textAreaAddMessage("星璇发动“烹饪”效果，将2张手牌当作【灵葫仙丹】使用", myText, listView);
				handCardLinghuxiandan.advEffect(myControlPlayer, myControlPlayer, false, false);
			}
		}));
	}
}

// 星璇【烹饪】(有角色阵亡时的询问)
// startPlayer:当前死亡求灵狐的玩家
// usePlayer：当前被求出灵狐的玩家，检测是不是星璇
// callBack:该干嘛干嘛
function advSkillCharacters_XingxuanPengrenWhenDeath(startPlayer,usePlayer,callBack,callBack2){
	if(usePlayer._name==nameXingxuan&&usePlayer.handCard.length>=2){
		if(usePlayer._name==myControlPlayer._name){
			addDialog(mainScene, new ChooseZoneLayer("是否对"+startPlayer._name+"发动“烹饪”效果？",function(result){
				if(result){
					addDialog(mainScene, new selectCardDialogLayer("请选择丢弃的2张牌",usePlayer.handCard,2,2,false,function(selectCardList){
						for(var i=0;i<selectCardList.length;i++){
							textAreaAddMessage("星璇弃置："+selectCardList[i].name, myText, listView);
							advRemove_Card_Into_DropDeck(selectCardList[i].name);
							usePlayer.handCard.removeObject(selectCardList[i]);
							selectCardList[i].removeFromParent();
						}
						// myAudioPlayer(audioXingxuanPengren);
						textAreaAddMessage("星璇发动“烹饪”效果，对"+startPlayer._name+"使用【灵葫仙丹】", myText, listView);
						dropCardXueshouDuying(usePlayer,function(){
							advUseBingxingjue(usePlayer, usePlayer, function(){
								advLinghuxiandanHandle(startPlayer, usePlayer,null,callBack2);
							});
						},callBack);
					}));
				}else{
					callBack();
				}
			}));
		}else{
			// AI处理烹饪效果，默认不鸟他
			if(player1IsPlayer2Friend(startPlayer, usePlayer)){
				for (var i = 0; i < 2; i++) {
					var tempHandCard = usePlayer.handCard[parseInt(Math.random()*usePlayer.handCard.length, 10)];
					usePlayer.handCard.removeObject(tempHandCard);
					advRemove_Card_Into_DropDeck(tempHandCard.name);
				}
				// myAudioPlayer(audioXingxuanPengren);
				textAreaAddMessage("星璇发动“烹饪”效果，对"+startPlayer._name+"使用【灵葫仙丹】", myText, listView);
				dropCardXueshouDuying(usePlayer,function(){
					advUseBingxingjue(usePlayer, usePlayer, function(){
						advLinghuxiandanHandle(startPlayer, usePlayer,null,callBack2);
					});
				},callBack);
			}else{
				callBack();
			}
		}
	}else{
		callBack();
	}
}

// 王蓬絮【饕餮】
function advSkillCharacters_WangpengxuTaotie(){
	if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name&&myControlPlayer._name==nameWangpengxu&&baseEffectCountequment(myControlPlayer)+myControlPlayer.handCard.length>0){
		addDialog(mainScene, new ChooseZoneLayer("是否发动“饕餮”？",function(result){
			if(result){
				// AchivementProgress.addAchivementProgress(player1);
				addDialog(mainScene, new selectCardTypeDialogLayer("请选择丢弃的装备或手牌",myControlPlayer,function(result){
					switch (result) {
					case SelectCardType.ARMS1:
						advRemove_Card_Into_DropDeck(myControlPlayer.arms1);
						myControlPlayer.arms1Combat = 0;
						myControlPlayer.arms1Extent = 0;
						myControlPlayer.arms1 = "无";
						break;
					case SelectCardType.ORNAMENT:
						addDialog(mainScene, new selectCardDialogLayer("请选择放弃的饰品",myControlPlayer.skillTempList,1,1,false,function(selectCard){
							var card=selectCard.pop();
							advRemove_Card_Into_DropDeck(card.name);
							myControlPlayer.skillTempList.removeObject(card);
							myControlPlayer.maxCombat--;
						}));
						break;
					case SelectCardType.DEFENSE:
						advRemove_Card_Into_DropDeck(myControlPlayer.defense);
						myControlPlayer.defenseCombat = 0;
						myControlPlayer.defenseExtent = 0;
						myControlPlayer.defense = "无";
						break;
					case SelectCardType.HANDCARD:
						addDialog(mainScene, new selectCardDialogLayer("请选择放弃的手牌",myControlPlayer.handCard,1,1,false,function(selectCard){
							var card=selectCard.pop();
							advRemove_Card_Into_DropDeck(card.name);
							card.removeFromParent();
							myControlPlayer.handCard.removeObject(card);
						}));
						break;
					}
					// myAudioPlayer(audioWangpengxuTaotie);
					for(var i=0;i<2;i++){
						advBaseEffectAddHP(myControlPlayer);
					}
					has_Tianshezhang(myControlPlayer);
				}));
			}
		}));
	}
}

// 王蓬絮【合成饰品】
function advSkillCharacters_WangpengxuHechengshipin(callBack){
	// cc.log("cal"+callBack);
	var wangpengxuPlayer=null;
	for(var x=0;x<nowPlayerTerm.length;x++){
		if(nowPlayerTerm[x]._name==nameWangpengxu){
			wangpengxuPlayer=nowPlayerTerm[x];
			break;
		}
	}
	if(wangpengxuPlayer!=null){
		var tempList=new Array();
		for(var i=0;i<wangpengxuPlayer.handCard.length;i++){
			if(wangpengxuPlayer.handCard[i].cardType!=CARDTYPE.ARMCARD&&
					wangpengxuPlayer.handCard[i].cardType!=CARDTYPE.DEFENSECARD){
				tempList.push(wangpengxuPlayer.handCard[i]);
			}
		}
		if(tempList.length>0){
			if(wangpengxuPlayer._name==myControlPlayer._name){
				addDialog(mainScene, new selectCardDialogLayer("请选择要当作饰品的牌或取消",tempList,1,1,true,function(result){
					if(result!=null){
						var card=result.pop();
						textAreaAddMessage("王蓬絮发动“合成饰品”效果，将【"+card.name+"】当作饰品装备", myText, listView);
						myControlPlayer.handCard.removeObject(card);
						card.removeFromParent();
						if(myControlPlayer.skillTempList.length>=5){
							addDialog(mainScene, new selectCardDialogLayer("饰品超过上限(5个)，请选择要丢弃的",myControlPlayer.skillTempList,1,1,false,function(oldCardList){
								var oldShipin=oldCardList.pop();
								advRemove_Card_Into_DropDeck(oldShipin.name);
								myControlPlayer.skillTempList.removeObject(oldShipin);
								myControlPlayer.skillTempList.push(card);
								if(callBack!=null){
									advSkillCharacters_WangpengxuHechengshipin(callBack);
								}
							}));
						}else{
							myControlPlayer.skillTempList.push(card);
							myControlPlayer.maxCombat++;
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
							if(callBack!=null){
								// cc.log("cal2"+callBack);
								advSkillCharacters_WangpengxuHechengshipin(callBack);
							}
						}
					}else if(callBack!=null){
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


// 云天河【天河剑】
function advSkillCharacterss_YuntianheTianhejian(callBack) {
	var effect=false;
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i].skillNameList.containsObject(skillnameTianhejian)
				&& nowPlayerTerm[i].joinAttack) {
			if (fight_FirstMonster.dodge > 0
					&& (nowPlayerTerm[i].extent - fight_FirstMonster.dodge) >= 4) {
				effect=true;
				break;
			}
		}
	}
	if(effect){
		textAreaAddMessage("云天河“天河剑”效果触发，自身战力额外+2", myText, listView,function(){
			baseEffectAddSkillCombat(nowPlayerTerm[i], 2);
			callBack();
		});
	}else{
		callBack();
	}
}


// 云天河【后羿射日弓】
function advSkillCharacters_YuntianheHouyisherigong(usePlayer) {
	if(usePlayer._name==myControlPlayer._name&&myControlPlayer._name==nameYuntianhe
			&&yuntianhe_HouYiSheRiGong==0){
		addDialog(mainScene, new ChooseZoneLayer("是否发动“后羿射日弓”?",function(result){
			if(result){
				// AchivementProgress.addAchivementProgress(player1);
				// mainScene.addChild(new
				// skillAnimationLayer(usePlayer.animation));
				textAreaAddMessage("云天河发动“后羿射日弓”效果，本场战斗我方战力额外+8", myText, listView);
				triggerCombat += 8;
				textAreaAddMessage("触发方战力+8", myText, listView);
				yuntianhe_HouYiSheRiGong=1;
			}
		}));
	}
}


function advSkillCharacters_YuntianheHouyisheriongEnd(){
	if (yuntianhe_HouYiSheRiGong == 1) {
		textAreaAddMessage("由于“后羿射日弓”效果，云天河命中永久变为0", myText, listView);
		for (var i=0;i<nowPlayerTerm.length;i++) {
			if (nowPlayerTerm[i].skillNameList.containsObject(skillnameHouyisherigong)) {
				nowPlayerTerm[i].maxExtent = 0;
				yuntianhe_HouYiSheRiGong=2;
			}
		}
	}
}


// 韩菱纱【搜囊探宝】
function advSkillCharacters_HanlinshaSounangtanbao(usePlayer) {
	if(usePlayer._name==nameHanlingsha&&!usePlayer.everyRoundSkill_1
			&&usePlayer.handCard.length>0){
		if(usePlayer._name==myControlPlayer._name){
			addDialog(mainScene, new selectCardDialogLayer("请选择舍弃的1张手牌",myControlPlayer.handCard,1,1,true,function(selectCardList){
				if(selectCardList!=null){
					var card=selectCardList.pop();
					usePlayer.everyRoundSkill_1=true;
					advRemove_Card_Into_DropDeck(card.name);
					usePlayer.handCard.removeObject(card);
					card.removeFromParent();
					addDialog(mainScene, new ChooseZoneLayer("是否当作【偷盗】使用?(否则当作【铜钱镖】)",function(choose){
						if(choose){
							handCardToudao.advEffect(usePlayer, usePlayer, false, false);
						}else{
							handCardTongqianbiao.advEffect(usePlayer, usePlayer, false, false);
						}
					}));
				}
			}));
		}else{
			// AI处理搜囊探宝
		}
	}
}


// 韩菱纱【劫富济贫】
function advSkillCharacters_HanlinshaJiefujipin(usePlayer) {
	if(usePlayer._name==nameHanlingsha&&!usePlayer.everyRoundSkill_2){
		if(usePlayer._name==myControlPlayer._name){
			addDialog(mainScene, new ChooseZoneLayer("是否发动“劫富济贫”？",function(result){
				if(result){
					usePlayer.everyRoundSkill_2=true;
					advAddHandCard([usePlayer],usePlayer,usePlayer,null,[1],true,true,function(){
						// myAudioPlayer(audioHanlingshaJiefujipin);
						textAreaAddMessage("韩菱纱发动“劫富济贫”，从牌堆中补了1张牌", myText, listView);
						if(usePlayer.handCard.length>=2){
							textAreaAddMessage("韩菱纱手牌大于等于2，需要丢1张牌", myText, listView);
							addDialog(mainScene, new selectCardDialogLayer("请选择丢弃的1张牌",usePlayer.handCard,1,1,false,function(selectCardList){
								var card=selectCardList.pop();
								advRemove_Card_Into_DropDeck(card.name);
								usePlayer.handCard.removeObject(card);
								card.removeFromParent();
								textAreaAddMessage("韩菱纱丢弃了【"+card.name+"】", myText, listView);
							}));
						}
					});
				}
			}));
		}else{
			// AI处理劫富济贫
		}
	}
}



function advDaomuHandle(hanlinsha,cardList,callBack){
	addDialog(mainScene, new selectCardDialogLayer("请选择要分配的牌",cardList,1,cardList.length,false,function(selectCardList){
		addDialog(mainScene, new selectAdvPlayerDialogLayer(true,true, true, true,
				"请选择分配的角色", false, false,function(selectPlayer){
			for(var i=0;i<selectCardList.length;i++){
				selectPlayer.handCard.push(selectCardList[i]);
				if(selectPlayer._name==myControlPlayer._name){
					handCardZone.pushBackCustomItem(selectCardList[i]);
				}
				cardList.removeObject(selectCardList[i]);
			}
			if(cardList.length>0){
				advDaomuHandle(hanlinsha,cardList,callBack);
			}else{
				advUseYingu([hanlinsha], hanlinsha, hanlinsha, [1], true, advBaseEffectReduceHPEffect, function(){
					advSkillCharactersTangxuejianZhuida(function(){
						heartList=new Array();
						callBack();
					});
				});
			}
		}));
	}));
}

function advJudgeDeathPlayerEqument(deathPlayer){
	var count = 0;
	var value = "无";
	if (deathPlayer.arms1!=value&&!deathPlayer.arms1.endsWith("(爆发)"))
		count++;
	if (deathPlayer.arms2!=value&&!deathPlayer.arms2.endsWith("(爆发)"))
		count++;
	if (deathPlayer.defense!=value&&!deathPlayer.defense.endsWith("(爆发)"))
		count++;
	if (deathPlayer._name==nameWangpengxu) {
		count += deathPlayer.skillTempList.length;
	}
	return count;
}

// 韩菱纱【盗墓】
function advSkillCharacters_HanlinshaDaomu(player,callBack,callBack2) {
	// cc.log(baseEffectCountequment(player));
	if (player.handCard.length == 0 && advJudgeDeathPlayerEqument(player)==0) {
		callBack();
		callBack2();
	} else {
		var hasHanlinsha=false;
		for (var i=0;i<nowPlayerTerm.length;i++) {
			if (nowPlayerTerm[i].hp > 0
					&& nowPlayerTerm[i].skillNameList.containsObject(skillnameDaomu)) {
				hasHanlinsha=true;
				var tempCardList=new Array();
				if (player.arms1!="无") {
					if(!player.arms1.endsWith("(爆发)")){
						tempCardList.push(getArmCardWithName(player,1));
					}else{
						advRemove_Card_Into_DropDeck(player.arms1);
						player.arms1="无";
					}
				}
				if (player.arms2!="无"){
					if(!player.arms2.endsWith("(爆发)")){
						tempCardList.push(getArmCardWithName(player,2));
					}else{
						advRemove_Card_Into_DropDeck(player.arms2);
						player.arms2="无";
					}
				}
				if (player.defense!="无") {
					if(!player.defense.endsWith("(爆发)")){
						tempCardList.push(getDefenseCardWithName(player));
					}else{
						advRemove_Card_Into_DropDeck(player.defense);
						player.defense="无";
					}
				}
				for(var t=0;t<player.handCard.length;t++){
					tempCardList.push(player.handCard[t]);
				}
				// myAudioPlayer(audioHanlingshaDaomu);
				textAreaAddMessage("韩菱纱“盗墓”效果触发，韩菱纱得到"+player._name+"所有手牌、装备并任意分配", myText, listView);
				if (nowPlayerTerm[i]._name==myControlPlayer._name) {
					advDaomuHandle(nowPlayerTerm[i],tempCardList,callBack2);
				} else {
					// AI处理盗墓
					for(var d=0;d<tempCardList.length;d++){
						nowPlayerTerm[i].handCard.push(tempCardList[d]);
					}
					advUseYingu([nowPlayerTerm[i]], nowPlayerTerm[i], nowPlayerTerm[i], [1], true, advBaseEffectReduceHPEffect, function(){
						advSkillCharactersTangxuejianZhuida(function(){
							heartList=new Array();
							callBack2();
						});
					});
				}
				break;
			}
		}
		if(!hasHanlinsha){
			callBack();
			callBack2();
		}
	}
}

function advZengjian_Arm1(selectPlayer){
	// 丢掉第一把武器
	if (selectPlayer.arms1!="无") {
		advRemove_Card_Into_DropDeck(selectPlayer.arms1);
	}
	selectPlayer.arms1 = "无";

	if(skillXiejianxian_HasXiejianxian(myControlPlayer)){
		myControlPlayer.arms1Combat = myControlPlayer.xiejianxian_Arms1Combat;
		myControlPlayer.arms1Extent = myControlPlayer.xiejianxian_Arms1Extent;

	}
	selectPlayer.arms1Combat = myControlPlayer.arms1Combat;
	selectPlayer.arms1Extent = myControlPlayer.arms1Extent;
	// 林月如【林家剑法】advSkillCharacter_LinyueruLinjiajianfanfa(selectPlayer);
	// 酒剑仙【御剑术】advSkillCharacters_JiujianxianYujianshushu(selectPlayer);
	selectPlayer.arms1 = myControlPlayer.arms1;
	selectPlayer.arms1 = selectPlayer.arms1.replace("(扣置)", "");

	myControlPlayer.arms1Combat = 0;
	myControlPlayer.arms1Extent = 0;
	myControlPlayer.arms1 = "无";
	textAreaAddMessage("慕容紫英补2张牌", myText, listView);
	advAddHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],null,[2],true,true);
}
function advZengjian_Arm2(selectPlayer){
	// 丢掉第二把武器
	if (selectPlayer.arms2!="无") {
		advRemove_Card_Into_DropDeck(selectPlayer.arms2);
	}
	selectPlayer.arms2 = "无";

	if(skillXiejianxian_HasXiejianxian(myControlPlayer)){
		myControlPlayer.arms2Combat = myControlPlayer.xiejianxian_Arms2Combat;
		myControlPlayer.arms2Extent = myControlPlayer.xiejianxian_Arms2Extent;

	}
	selectPlayer.arms2Combat = myControlPlayer.arms1Combat;
	selectPlayer.arms2Extent = myControlPlayer.arms1Extent;
	selectPlayer.arms2 = myControlPlayer.arms1;
	selectPlayer.arms2 = selectPlayer.arms2.replace("(扣置)", "");
	myControlPlayer.arms1Combat = 0;
	myControlPlayer.arms1Extent = 0;
	myControlPlayer.arms1 = "无";
	textAreaAddMessage("慕容紫英补2张牌", myText, listView);
	advAddHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],null,[2],true,true);
}


// 慕容紫英【赠剑】（武器）
function advSkillCharacters_MurongziyingZengjian_Arm(){
	if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name&&myControlPlayer._name==nameMurongziying&&zengJian.length<nowPlayerTerm.length-1){
		addDialog(mainScene, new ChooseZoneLayer("是否对武器发动“赠剑”？",function(result){
			if(result){
				var player1Shown=player1._name!=myControlPlayer._name?true:false;
				var player2Shown = player2._name!=myControlPlayer._name?true:false;
				var player3Shown = player3._name!=myControlPlayer._name?true:false;
				var bossShown = true;
				for (var i=0;i<zengJian.length;i++) {
					if(zengJian[i]._name==player1._name){
						player1Shown=false;
					}else if (zengJian[i]._name==player2._name){
						player2Shown=false;
					}else if (zengJian[i]._name==player3._name){
						player3Shown = false;
					}else if(zengJian[i]._name==boss._name){
						bossShown = false;
					}
				}
				if (player1.hp == 0) {
					zengJian.push(player1);
				}
				if (player2.hp == 0) {
					zengJian.push(player2);
				}
				if (player3.hp == 0) {
					zengJian.push(player3);
				}
				if (boss.hp == 0) {
					zengJian.push(boss);
				}
				addDialog(mainScene, new selectAdvPlayerDialogLayer(player1Shown,player2Shown, player3Shown, bossShown,
						"请选择“赠剑”的目标", true, false,function(selectPlayer){
					if(selectPlayer!=null){
						zengJian.push(selectPlayer);
						if (!selectPlayer.skillNameList.containsObject(skillnameShuangjian)) {
							advZengjian_Arm1(selectPlayer);
						}else{
							addDialog(mainScene, new ChooseZoneLayer("是否移动到武器2？(否则作为武器1)",function(result){
								if(result){
									advZengjian_Arm2(selectPlayer);
								}else{
									advZengjian_Arm1(selectPlayer);
								}
							}));
						}
					}
				}));
			}
		}));
	}
}


function advZengjian_Defense(selectPlayer){
	// 丢掉防具
	if (selectPlayer.defense!="无") {
		advRemove_Card_Into_DropDeck(selectPlayer.defense);
	}
	selectPlayer.defenseCombat = myControlPlayer.defenseCombat;
	selectPlayer.defenseExtent = myControlPlayer.defenseExtent;
	selectPlayer.defense = myControlPlayer.defense;
	myControlPlayer.defenseCombat = 0;
	myControlPlayer.defenseExtent = 0;
	myControlPlayer.defense = "无";
	textAreaAddMessage("慕容紫英补2张牌", myText, listView);
	advAddHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],null,[2],true,true);
}


// 慕容紫英【赠剑】（防具）
function advSkillCharacters_MurongziyingZengjian_Defense(){
	if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name&&myControlPlayer._name==nameMurongziying&&zengJian.length<nowPlayerTerm.length-1){
		addDialog(mainScene, new ChooseZoneLayer("是否对防具发动“赠剑”？",function(result){
			if(result){
				var player1Shown=player1._name!=myControlPlayer._name?true:false;
				var player2Shown = player2._name!=myControlPlayer._name?true:false;
				var player3Shown = player3._name!=myControlPlayer._name?true:false;
				var bossShown=false;
				for (var i=0;i<zengJian.length;i++) {
					if(zengJian[i]._name==player1._name){
						player1Shown=false;
					}else if (zengJian[i]._name==player2._name){
						player2Shown=false;
					}else if (zengJian[i]._name==player3._name){
						player3Shown = false;
					}else if(zengJian[i]._name==boss._name){
						bossShown = false;
					}
				}
				if (player1.hp == 0) {
					zengJian.push(player1);
				}
				if (player2.hp == 0) {
					zengJian.push(player2);
				}
				if (player3.hp == 0) {
					zengJian.push(player3);
				}
				if (boss.hp == 0) {
					zengJian.push(boss);
				}
				addDialog(mainScene, new selectAdvPlayerDialogLayer(player1Shown,player2Shown, player3Shown, bossShown,
						"请选择“赠剑”的目标", true, false,function(selectPlayer){
					if(selectPlayer!=null){
						zengJian.push(selectPlayer);
						advZengjian_Defense(selectPlayer);
					}
				}));
			}
		}));
	}
}

// 柳梦璃【妖王】
function advSkillcharacters_LiumengliYaowang(player,isAdd) {
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i].skillNameList.containsObject(skillnameYaowang)) {
			if(player1IsPlayer2Friend(player, nowPlayerTerm[i])){
				if(isAdd){
					textAreaAddMessage("柳梦璃【妖王】效果触发，我方宠物额外获得“主人战力+1”效果", myText, listView);
					player.petsCombat += 1;
				}else{
					textAreaAddMessage("失去宠物，柳梦璃【妖王】效果触发", myText, listView);
					player.petsCombat -= 1;
				}
			}
			break;
		}
	}
}

// 柳梦璃【妖王】结束
function advSkillCharacters_LiumengliYaowangEnd(player) {
	for (var i = 0; i < player.friendList.length; i++) {
		if (player.friendList[i].hp > 0) {
			var number = baseEffectCountPets(player.friendList[i]);
			player.friendList[i].petsCombat -= number;
			if (player.friendList[i].petsCombat < 0)
				player.friendList[i].petsCombat = 0;
			textAreaAddMessage("柳梦璃退场，【妖王】效果解除", myText, listView);
			player.combat = player.maxCombat + player.arms1Combat
			+ player.arms2Combat + player.defenseCombat
			+ player.petsCombat;
		}
	}
}

// 柳梦璃【梦傀儡】
function advSkillCharacters_LiumengliMengkuilei(player){
	textAreaAddMessage("柳梦璃“梦傀儡”技能触发，命中变为5，仍可进行支援妨碍", myText, listView);
	player._name =nameLiumengliMengkuilei;
	player.maxCombat = 3;
	player.maxExtent = 5;
}

// 柳梦璃【梦傀儡】结束
function advSkillCharacters_liumengliMengkuileiEnd() {
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i]._name==nameLiumengliMengkuilei) {
			nowPlayerTerm[i]._name =nameLiumengli+"(退场)";
			break;
		}
	}
}


// 玄霄【结拜】
function  advSkillCharacters_XuanxiaoJiebai(callBack) {
	var hasXuanxiao=false;
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].skillNameList.containsObject(skillnameJiebai)) {
			hasXuanxiao=true;
			if (nowPlayerTerm[i]._name==myControlPlayer._name) {
				var player1Shown=player1._name!=myControlPlayer._name?true:false;
				var player2Shown=player2._name!=myControlPlayer._name?true:false;
				var player3Shown=player3._name!=myControlPlayer._name?true:false;
				addDialog(mainScene, new selectAdvPlayerDialogLayer(player1Shown,player2Shown, player3Shown, true,
						"请选择玄霄结拜的角色", false, false,function(result){
					xuanxiao_JieBai=result._name;
					// myAudioPlayer(audioXuanxiaoJiebai);
					textAreaAddMessage("玄霄与"+result._name+"结拜，对其支援妨碍时命中额外+1", myText, listView);
					if(callBack!=null){
						callBack();
					}
				}));
			} else {
				// AI处理玄霄【结拜】效果
				xuanxiao_JieBai = nowPlayerTerm[i].friendList[1]._name;
				// myAudioPlayer(audioXuanxiaoJiebai);
				textAreaAddMessage("玄霄与"+nowPlayerTerm[i].friendList[1]._name+"结拜，对其支援妨碍时命中额外+1", myText, listView);
				if(callBack!=null){
					callBack();
				}
			}
			break;
		}
	}
	if(!hasXuanxiao&&callBack!=null){
		callBack();
	}
}

// 玄霄【结拜】效果处理
function advSkillCharacters_XuanxiaoJiebaiHandle(){
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i]._name==nameXuanxiao) {
			if (nowPlayerTerm[nowPlayerNumber]._name==xuanxiao_JieBai) {
				textAreaAddMessage("玄霄“结拜”效果触发，自身命中+1", myText, listView);
				baseEffectAddTempExtent(nowPlayerTerm[i]);
			}
			break;
		}
	}
}



// 玄霄【凝冰焚炎】
function advSkillCharacters_XuanxiaoNingbingfenyan(player){
	if(player.hp>0&&player.skillNameList.containsObject(skillnameNingbingfenyan)){
		textAreaAddMessage("玄霄“凝冰焚炎”效果被触发，水、火属性伤害对其无效", myText, listView);
		return true;
	}
	return false;
}


// 龙幽【表现欲】
function advSkillCharacters_LongyouBiaoxianyu(callBack) {
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i].skillNameList.containsObject(skillnameBiaoxianyu)
				&& nowPlayerTerm[i].joinAttack) {
			for (var t=0;t<nowPlayerTerm.length;t++) {
				if (nowPlayerTerm[t].sex == 1 && nowPlayerTerm[t].joinAttack
						&& nowPlayerTerm[t].hp > 0) {
					// myAudioPlayer(audioLongyouBiaoxianyu);
					textAreaAddMessage("龙幽“表现欲”效果触发，自身战力+1", myText, listView);
					baseEffectAddSkillCombat(nowPlayerTerm[i], 1);
				}
			}
			break;
		}
	}
	callBack();
}

// 龙幽【表现欲】后续处理
function advSkillCharacters_LongyouBiaoxianyuHandle(callBack){
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i].skillNameList.containsObject(skillnameBiaoxianyu)
				&& nowPlayerTerm[i].joinAttack) {
			for (var t=0;t<nowPlayerTerm.length;t++) {
				if (nowPlayerTerm[t].sex == 1 && nowPlayerTerm[t].joinAttack
						&& nowPlayerTerm[t].hp <=0) {
					textAreaAddMessage(nowPlayerTerm[t]._name+"死亡退场，龙幽“表现欲”效果触发，自身战力-1", myText, listView);
					baseEffectReduceSkillCombat(nowPlayerTerm[i], 1);
				}
			}
			break;
		}
	}
	callBack();
}


// 小蛮【无法无天】
function advSkillCharacters_XiaomanWufawutian(callBack){
	var hasXiaoman=false;
	for(var i=0;i<nowPlayerTerm.length;i++){
		if(nowPlayerTerm[i].hp>0&&nowPlayerTerm[i]._name==nameXiaoman){
			hasXiaoman=true;
			var tempList=new Array();
			for(var t=0;t<nowPlayerTerm[i].handCard.length;t++){
				if(nowPlayerTerm[i].handCard[t].cardType==CARDTYPE.SKILLCARD){
					tempList.push(nowPlayerTerm[i].handCard[t]);
				}
			}
			if(tempList.length>0){
				// 有技牌，可以发动无法无天
				if(nowPlayerTerm[i]._name==myControlPlayer._name){
					addDialog(mainScene, new selectCardDialogLayer("“无法无天”效果:请选择要使用的技牌或取消",tempList,1,1,true,function(selectCardList){
						if(selectCardList!=null){
							var card=selectCardList.pop();
							nowPlayerTerm[i].handCard.removeObject(card);
							card.removeFromParent();
							switch(card.name){
							case string_handCardNameShuerguo:
								handCardShuerguo.advEffect(nowPlayerTerm[i], nowPlayerTerm[i], true, false,function(){
									advSkillCharacters_XiaomanWufawutian(callBack);
								});
								break;
							case string_handCardNameKuicetianji:
								handCardKuicetianji.advEffect(nowPlayerTerm[i], nowPlayerTerm[i], true, false,function(){
									advSkillCharacters_XiaomanWufawutian(callBack);
								});
								break;
							case string_handCardNameToudao:
								handCardToudao.advEffect(nowPlayerTerm[i], nowPlayerTerm[i], true, false,function(){
									advSkillCharacters_XiaomanWufawutian(callBack);
								});
								break;
							case string_handCardNameTongqianbiao:
								handCardTongqianbiao.advEffect(nowPlayerTerm[i], nowPlayerTerm[i], true, false,function(){
									advSkillCharacters_XiaomanWufawutian(callBack);
								});
								break;
							case string_handCardNameTianleipo:
								handCardTianleipo.advEffect(nowPlayerTerm[i], nowPlayerTerm[i], true, false,function(){
									advSkillCharacters_XiaomanWufawutian(callBack);
								});
								break;
							case string_handCardNameWuqichaoyuan:
								handCardWuqichaoyuan.advEffect(nowPlayerTerm[i], nowPlayerTerm[i], true, false,function(){
									advSkillCharacters_XiaomanWufawutian(callBack);
								});
								break;
							}
						}else{
							callBack();
						}
					}));
				}else{
					// AI处理无法无天
					callBack();
				}
			}else{
				callBack();
			}
			break;
		}
	}
	if(!hasXiaoman&&callBack!=null){
		callBack();
	}
}


// 小蛮【活力】
function advSkillCharacters_XiaomanHuoli(callBack){
	var effected=false;
	for (var i = 0; i < nowPlayerTerm.length; i++) {
		if (nowPlayerTerm[i]._name==nameXiaoman
				&& nowPlayerTerm[i].joinAttack) {
			effected=true;
			break;
		}
	}
	if(effected){
		textAreaAddMessage("小蛮“活力”效果触发，补1张手牌", myText, listView);
		advAddHandCard([nowPlayerTerm[i]],nowPlayerTerm[i],nowPlayerTerm[i],null,[1],true,true,callBack);
	}else{
		callBack();
	}
}


// 小蛮【炼药】
function advSkillCharacters_XiaomanLianyao(callBack){
	var hasXiaoman=false;
	for(var t=0;t<nowPlayerTerm.length;t++){
		if(nowPlayerTerm[t]._name==nameXiaoman&&nowPlayerTerm[t]._name==myControlPlayer._name&&nowPlayerTerm[t].handCard.length>=2){
			hasXiaoman=true;
			addDialog(mainScene,new selectCardDialogLayer("请选择发动“炼药”丢弃的2张牌或取消",nowPlayerTerm[t].handCard,2,2,true,function(selectCardList){
				if(selectCardList!=null){
					for(var i=0;i<selectCardList.length;i++){
						advRemove_Card_Into_DropDeck(selectCardList[i].name);
						nowPlayerTerm[t].handCard.removeObject(selectCardList[i]);
						selectCardList[i].removeFromParent();
						textAreaAddMessage("小蛮弃置【"+selectCardList[i].name+"】", myText, listView);
					}
					addDialog(mainScene, new selectAdvPlayerDialogLayer(true,true, true, true,
							"请选择补牌目标", false, false,function(selectPlayer){
						// myAudioPlayer(audioXiaomanLianyao);
						textAreaAddMessage("小蛮指定"+selectPlayer._name+"补了1张手牌", myText, listView);
						advAddHandCard([selectPlayer],selectPlayer,selectPlayer,null,[1],true,true,function(){
							if(callBack!=null){
								advSkillCharacters_XiaomanLianyao(callBack);
							}
						});
					}));
				}else if(callBack!=null){
					callBack();
				}
			}));
			break;
		}
	}
	if(!hasXiaoman&&callBack!=null){
		callBack();
	}
}

// 姜云凡【山贼】
function advSkillCharacters_JiangyunfanShanzei(player,handCardList,callBack) {
	if(player._name!=boss._name){
		var tempPlayer =null;
		for(var i=1;i<player.friendList.length;i++){
			if(player.friendList[i].hp>0&&player.friendList[i].skillNameList.containsObject(skillnameShanzei)){
				tempPlayer=player.friendList[i];
				break;
			}
		}
		if(tempPlayer!=null){
			if (player._name==myControlPlayer._name) {
				addDialog(mainScene, new selectCardDialogLayer("请选择“山贼”效果交给队友的牌或取消",handCardList,1,1,true,function(result){
					if(result!=null){
						var card=result.pop();
						player.handCard.removeObject(card);
						if(player._name==myControlPlayer._name){
							card.removeFromParent();
							card.release();
						}
						textAreaAddMessage(player._name+"发动【山贼】效果，交给队友一张牌", myText, listView,function(){
							tempPlayer.handCard.push(card);
							if(callBack!=null){
								callBack();
							}
						});
					}else if(callBack!=null){
						callBack();
					}
				}));
			} else {
				// AI决定是否触发【山贼】
				if (handCardList.length > 1) {
					// 触发
					var index = parseInt(Math.random()*handCardList.length, 10);
					var tempHandCard = handCardList[index];
					player.handCard.removeObject(tempHandCard);
					tempPlayer.handCard.push(tempHandCard);
					if (tempPlayer._name==myControlPlayer._name) {
						handCardZone.pushBackCustomItem(tempHandCard);
					}
					textAreaAddMessage(player._name+"发动【山贼】效果，交给队友一张牌", myText, listView,callBack);
				}else if(callBack!=null){
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


// 唐雨柔【咏圣调】(非隐蛊时的询问)
function advSkillCharacters_TangyurouYongshengdiao(usePlayer,cardEffectCallBack,callBack){
	if(usePlayer._name==nameTangyurou){
		if(usePlayer._name==myControlPlayer._name){
			var player1Shown=player1._name!=myControlPlayer._name?true:false;
			var player2Shown=player2._name!=myControlPlayer._name?true:false;
			var player3Shown=player3._name!=myControlPlayer._name?true:false;
			addDialog(mainScene, new selectAdvPlayerDialogLayer(player1Shown,player2Shown, player3Shown, true,
					"唐雨柔“咏圣调”效果，请选择目标角色或取消", true, false,function(result){
				if(result!=null){
					// myAudioPlayer(audioTangyurouYonshengdiao);
					cardEffectCallBack(result,callBack);
				}else{
					cardEffectCallBack(usePlayer,callBack);
				}
			},false));
		}else{
			// AI决定咏圣调的对象
			cardEffectCallBack(usePlayer,callBack);
		}
	}else{
		cardEffectCallBack(usePlayer,callBack);
	}
}


// 唐雨柔【咏圣调】隐蛊时的询问
// callBack为唐雨柔决定是否发动技能之后要执行的动作
function advSkillCharacters_TangyurouYongshengdiao_yingu(heartList, firstPlayer, usePlayer,heartNumberList,canUseLonghunzhankai,callBack,callBack2){
	var useYongshengdiao=false;
	var tangyurouPlayer=null;
	var hasTiandijifu=false;
	var yinguCard=null;
	for(var i=0;i<nowPlayerTerm.length;i++){
		if(nowPlayerTerm[i].hp>0&&nowPlayerTerm[i].handCard.length>0&&nowPlayerTerm[i]._name==nameTangyurou){
			tangyurouPlayer=nowPlayerTerm[i];
			hasTiandijifu=(tangyurouPlayer.defense==string_handCardNameTiandijifu);
			break;
		}
	}
	if(tangyurouPlayer!=null){
		for(var t=0;t<tangyurouPlayer.handCard.length;t++){
			if(tangyurouPlayer.handCard[t].name==string_handCardNameYingu){
				yinguCard=tangyurouPlayer.handCard[t];
				break;
			}
		}
		if(tangyurouPlayer._name==myControlPlayer._name){
			if(hasTiandijifu){
				addDialog(mainScene, new ChooseZoneLayer("是否发动【天帝祭服】效果，将任意手牌当【隐蛊】使用？",function(result){
					if(result){
						addDialog(mainScene, new selectCardDialogLayer("请选择1张手牌当作【隐蛊】使用",tangyurouPlayer.handCard,1,1,false,function(selectCard){
							var card=selectCard.pop();
							advRemove_Card_Into_DropDeck(card.name);
							tangyurouPlayer.handCard.removeObject(card);
							card.removeFromParent();
							advUseBingxingjue(tangyurouPlayer, tangyurouPlayer,function(){
								if(game_Bingxingjue){
									game_Bingxingjue=false;
									advSkillCharacters_TangyurouYongshengdiao_yingu(heartList, firstPlayer, usePlayer,heartNumberList,canUseLonghunzhankai,callBack,callBack2);
								}else{
									advYinguHandle(heartList, firstPlayer, usePlayer, true, heartNumberList,canUseLonghunzhankai,callBack,callBack2);
								}
							});
						}));
					}else if(yinguCard!=null){
						addDialog(mainScene, new ChooseZoneLayer("是否发动“咏圣调”效果，打出一张隐蛊？",function(result){
							if(result){
								advRemove_Card_Into_DropDeck(yinguCard.name);
								tangyurouPlayer.handCard.removeObject(yinguCard);
								yinguCard.removeFromParent();
								advUseBingxingjue(tangyurouPlayer, tangyurouPlayer, function(){
									if(game_Bingxingjue){
										game_Bingxingjue=false;
										advSkillCharacters_TangyurouYongshengdiao_yingu(heartList, firstPlayer, usePlayer,heartNumberList,canUseLonghunzhankai,callBack,callBack2);
									}else{
										advYinguHandle(heartList, firstPlayer, usePlayer, true, heartNumberList,canUseLonghunzhankai,callBack,callBack2);
									}
								});
							}else{
								advYinguHandle(heartList, firstPlayer, usePlayer, false, heartNumberList,canUseLonghunzhankai,callBack,callBack2);
							}
						}));
					}else{
						// skillCharacters_TangyurouYongshengdiao_yingu(heartList,
						// firstPlayer,
						// usePlayer,heartNumberList,canUseLonghunzhankai,callBack,callBack2);
						advYinguHandle(heartList, firstPlayer, usePlayer, false, heartNumberList,canUseLonghunzhankai,callBack,callBack2);
					}
				}));
			}else if(yinguCard!=null){
				addDialog(mainScene, new ChooseZoneLayer("是否发动“咏圣调”效果，打出一张隐蛊？",function(result){
					if(result){
						advRemove_Card_Into_DropDeck(yinguCard.name);
						tangyurouPlayer.handCard.removeObject(yinguCard);
						yinguCard.removeFromParent();
						advUseBingxingjue(tangyurouPlayer, tangyurouPlayer, function(){
							if(game_Bingxingjue){
								game_Bingxingjue=false;
								advSkillCharacters_TangyurouYongshengdiao_yingu(heartList, firstPlayer, usePlayer,heartNumberList,canUseLonghunzhankai,callBack,callBack2);
							}else{
								advYinguHandle(heartList, firstPlayer, usePlayer, true, heartNumberList,canUseLonghunzhankai,callBack,callBack2);
							}
						});
					}else{
						advYinguHandle(heartList, firstPlayer, usePlayer, false, heartNumberList,canUseLonghunzhankai,callBack,callBack2);
					}
				}));
			}else{
				advYinguHandle(heartList, firstPlayer, usePlayer, false, heartNumberList,canUseLonghunzhankai,callBack,callBack2);
			}
		}else{
			// AI决定是否发动【咏圣调】出隐蛊
			advYinguHandle(heartList, firstPlayer, usePlayer, false, heartNumberList,canUseLonghunzhankai,callBack,callBack2);
		}
	}else{
		advYinguHandle(heartList, firstPlayer, usePlayer, false, heartNumberList,canUseLonghunzhankai,callBack,callBack2);
	}
}

// 唐雨柔【逆天阵】
function advSkillCharacters_TangyurouNitianzhen(tangyurou){
	if(tangyurou._name==nameTangyurou&&tangyurou._name==nowPlayerTerm[nowPlayerNumber]._name
			&&tangyurou._name==myControlPlayer._name&&tangyurou.hp>0){
		addDialog(mainScene, new ChooseZoneLayer("是否发动“逆天阵”效果(您将强制死亡退场)？",function(result){
			if(result){
				tangyurou.hp=0;
				advHandleDeath(tangyurou,function(){
					var petModel = advTopMonsterCard(game_MonsterDeck[0]);
					if (tangyurou.friendList[1].hp > 0) {
						monsterLabel.setVisible(true);
						monsterLabel.loadTexture(petModel.monsterPicSrc);
						textAreaAddMessage("翻取一张怪物牌:"+petModel.name, myText, listView,function(){
							if (petModel.dodge != 0) {
								advCalculate_Pets(tangyurou.friendList[1],
										petModel);
							} else {
								game_MonsterDropDeck.push(game_MonsterDeck[0]);
								textAreaAddMessage("NPC无法作为宠物，“逆天阵”效果无效", myText, listView);
							}
						});
					}
					game_MonsterDeck.remove(0);
				});
			}
		}));
	}
}

// 姜世离【魔君】
function advSkillCharacters_JiangshiliMojun(callBack) {
	// 判断战斗是否开始
	if (fight_Trigger.length > 0) {
		var addCombat = 0;
		// 判断支援者是否为姜世离
		if (fight_Trigger.length > 1) {
			if (fight_Trigger[1].hp > 0
					&& fight_Trigger[1].skillNameList
					.containsObject(skillnameMojun)) {
				addCombat = fight_Trigger[1].maxHP
				- fight_Trigger[1].hp;
				triggerCombat += addCombat;
				textAreaAddMessage("姜世离“魔君”效果触发，触发方战力+"+addCombat, myText, listView,callBack);
				return;
			}
		}
		if (fight_Monster.length > 0
				&& fight_Monster[0].hp > 0
				&& fight_Monster[0].skillNameList
				.containsObject(skillnameMojun)) {
			addCombat = fight_Monster[0].maxHP
			- fight_Monster[0].hp;
			monsterCombat += addCombat;
			textAreaAddMessage("姜世离“魔君”效果触发，怪物方战力+"+addCombat, myText, listView,callBack);
			return;
		}else{
			callBack();
		}
	}else{
		callBack();
	}
}



// 姜世离【牺牲】
function advSkillCharacters_JiangshiliXishen(player){
	if(player.hp>0&&player.joinAttack&&player._name==nameJiangshili&&player._name==myControlPlayer._name){
		addDialog(mainScene, new ChooseZoneLayer("是否发动“牺牲”效果？(您将强制死亡退场)",function(result){
			if(result){
				// AchivementProgress.addAchivementProgress(player);
				jiangshili_xisheng = true;
				textAreaAddMessage("姜世离发动“牺牲”效果，本场战斗中，我方直接取胜", myText, listView);
				nextStep=4;
				advRoundAttack3();
			}
		}));
	}
}

// 姜世离【牺牲】：战斗结束阶段的死亡退场处理
function advSkillCharacters_JiangshiliXishenHandle(){
	var jiangshili=null;
	if(jiangshili_xisheng){
		jiangshili_xisheng=false;
		for(var i=0;i<nowPlayerTerm.length;i++){
			if(nowPlayerTerm[i].hp>0&&nowPlayerTerm[i]._name==nameJiangshili){
				jiangshili=nowPlayerTerm[i];
				break;
			}
		}
		if(jiangshili!=null){
			textAreaAddMessage("姜世离“牺牲”效果触发，强制死亡退场", myText, listView,function(){
				jiangshili.hp=0;
				advHandleDeath(jiangshili);
			});
		}
	}
}


// 欧阳慧【雷灵】
function advSkillCharacters_OuyanghuiLeiling(callBack) {
	var ouyanghui=null;
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i].skillNameList.containsObject(skillnameLeiling)
				&& nowPlayerTerm[i].joinAttack
				&& nowPlayerTerm[i].skillTempList.length < 4) {
			ouyanghui=nowPlayerTerm[i];
			break;
		}
	}
	if(ouyanghui!=null){
		var leiling = new createHandCardImageView("雷灵");
		ouyanghui.maxExtent -= parseInt(ouyanghui.skillTempList.length / 2);
		ouyanghui.skillTempList.push(leiling);
		ouyanghui.maxExtent += parseInt(ouyanghui.skillTempList.length / 2);
		var number=ouyanghui.skillTempList.length;
		textAreaAddMessage("欧阳慧“雷灵”效果触发，获得一张雷灵牌(每放置2张雷灵牌您的命中+1,最多放置4张)", myText, listView);
		textAreaAddMessage("当前雷灵数:"+number, myText, listView,callBack);
	}else{
		callBack();
	}
	// callBack();
}

// 欧阳慧【雷屏】
function advSkillCharacters_OuyanghuiLeiping(heartPlayer,number,canUseLonghunzhankai,callBack) {
	var maxNumber = 0;
	var ouyanghuiPlayer=null;
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i].skillNameList.containsObject(skillnameLeiping)
				&& nowPlayerTerm[i].skillTempList.length > 0) {
			ouyanghuiPlayer=nowPlayerTerm[i];
			maxNumber=ouyanghuiPlayer.skillTempList.length<number?ouyanghuiPlayer.skillTempList.length:number;
			break;
		}
	}
	if(ouyanghuiPlayer!=null){
		if(ouyanghuiPlayer._name==myControlPlayer._name){
			addDialog(mainScene, new selectNumberDialogLayer(heartPlayer._name+"将受到"+number+"点伤害，请选择使用雷灵为其抵消伤害或取消",maxNumber,function(result){
				if(result==null||result==0){
					// 不使用雷屏
					advBaseEffectReduceHP(heartPlayer,number,canUseLonghunzhankai,callBack);
				}else{
					advLeipingHandle(number,result,ouyanghuiPlayer,function(newNumber){
						advBaseEffectReduceHP(heartPlayer,newNumber,canUseLonghunzhankai,callBack);
					});
				}
			}));
		}else{
			// AI决定使用雷屏
			if (player1IsPlayer2Friend(heartPlayer, ouyanghuiPlayer)) {
				var defense = (number < ouyanghuiPlayer.skillTempList.length) ? 0
						: number - ouyanghuiPlayer.skillTempList.length;
				if (heartPlayer.hp - number <= 0
						&& heartPlayer.hp - defense > 0) {
					var result = (number > ouyanghuiPlayer.skillTempList.length) ? ouyanghuiPlayer.skillTempList
							.length : number;
					advLeipingHandle(number,result,ouyanghuiPlayer,function(newNumber){
						advBaseEffectReduceHP(heartPlayer,newNumber,canUseLonghunzhankai,callBack);
					});
				}else{
					advBaseEffectReduceHP(heartPlayer,number,canUseLonghunzhankai,callBack);
				}
			}else{
				advBaseEffectReduceHP(heartPlayer,number,canUseLonghunzhankai,callBack);
			}
		}
	}else{
		advBaseEffectReduceHP(heartPlayer,number,canUseLonghunzhankai,callBack);
	}
}

// 使用雷屏的处理
function advLeipingHandle(number,result,ouyanghuiPlayer,callBack){
	// 使用了雷屏
	ouyanghuiPlayer.maxExtent -= parseInt(ouyanghuiPlayer.skillTempList.length / 2);
	for(var i=0;i<result;i++){
		ouyanghuiPlayer.skillTempList.pop();
	}
	ouyanghuiPlayer.maxExtent += parseInt(ouyanghuiPlayer.skillTempList.length / 2);
	textAreaAddMessage("欧阳慧消耗雷屏，抵消"+result+"点伤害", myText, listView,function(){
		// 若此时已经处于打怪阶段，则双方战力要重新计算
		if ((nextStep==2||nextStep==3)&&fight_Trigger.length > 0
				&& ((fight_Trigger.length>1&&fight_Trigger[1]._name==nameOuyanghui) 
						|| (fight_Monster[0]!=null&&fight_Monster[0]._name==nameOuyanghui))) {
			if (!advadvAttactIsMiss(ouyanghuiPlayer,fight_FirstMonster)) {
				for (var i=0;i<fight_Trigger.length;i++) {
					if (fight_Trigger[i]._name==nameOuyanghui) {
						textAreaAddMessage("欧阳慧命中下降，支援失败", myText, listView);
						triggerCombat -= ouyanghuiPlayer.combat;
						break;
					}
				}
				for (var i=0;i<fight_Monster.length;i++) {
					if (fight_Monster[i]._name==nameOuyanghui) {
						textAreaAddMessage("欧阳慧命中下降，妨碍失败", myText, listView);
						monsterCombat -= ouyanghuiPlayer.combat;
						break;
					}
				}
			}
		}
		number-=result;
		callBack(number);
	});
}



// 欧阳慧【雳天击】
function advSkillCharacters_OuyanghuiLitianji(ouyanghui) {
	if(ouyanghui._name==nameOuyanghui&&ouyanghui._name==myControlPlayer._name
			&&ouyanghui.skillTempList.length>0){
		addDialog(mainScene, new ChooseZoneLayer("是否发动“雳天击”？(将消耗所有雷灵)",function(result){
			if(result){
				// AchivementProgress.addAchivementProgress(ouyanghui);
				textAreaAddMessage("欧阳慧消耗所有雷灵发动“雳天击”效果", myText, listView, function(){
					var heart=parseInt(ouyanghui.skillTempList.length/2);
					for(var i=0;i<ouyanghui.skillTempList.length;i++){
						ouyanghui.skillTempList[i].release();
					}
					ouyanghui.skillTempList=new Array();
					mainScene.addChild(new skillAnimationLayer(ouyanghui.animation,function(){
						if(heart==0){
							textAreaAddMessage("雷灵不足以对敌方全体造成伤害", myText, listView);
						}else{
							ouyanghui.maxExtent -= heart;
							var tempHeartPlayerList=new Array();
							var tempHeartNumberList=new Array();
							advUseYingu([boss],boss,boss,[heart],true, advBaseEffectReduceHPEffect,function(){
								advSkillCharactersTangxuejianZhuida(function(){
									heartList=new Array();
								});
							});
						}
					}));
				});
			}
		}));
	}
}



// 魔翳【锁魂】(收为傀儡)
function advSkillCharacters_MoyiSuohun(deathPlayer){
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i].skillNameList.containsObject(skillnameSuohun)) {
			nowPlayerTerm[i].skillTempList.push(deathPlayer);
			textAreaAddMessage("魔翳“锁魂”效果发动，将"+deathPlayer._name+"收为傀儡", myText, listView);
			break;
		}
	}
}

// 魔翳【锁魂】(加战力)
function advSkillCharacters_MoyiSuohunAddCombat(callBack){
	var effect=false;
	for (var i=0;i<nowPlayerTerm.length;i++) {
		// cc.log(nowPlayerTerm[i]._name+" ---->
		// "+nowPlayerTerm[i].skillTempList.length);
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i].skillNameList.containsObject(skillnameSuohun)
				&& nowPlayerTerm[i].skillTempList.length > 0) {
			// cc.log("加战力了了");
			triggerCombat += nowPlayerTerm[i].skillTempList.length;
			effect=true;
			break;
		}
	}
	if(effect){
		textAreaAddMessage("魔翳“锁魂”效果发动，我方战力+"+nowPlayerTerm[i].skillTempList.length, myText, listView,callBack);
	}else{
		callBack();
	}
}

// 魔翳【底牌】
function advSkillCharacters_MoyiDipai(deathPlayer){
	var moyi=deathPlayer.friendList[1];
	if (moyi.hp > 0
			&& moyi.skillNameList.containsObject(skillnameDipai)) {
		mainScene.addChild(new skillAnimationLayer(moyi.animation));
		// suoHunList=new Array();
		moyi.skillTempList=new Array();
		for (var i=0;i<moyi.handCard.length;i++) {
			advRemove_Card_Into_DropDeck(
					moyi.handCard[i].name);
		}
		moyi.handCard=new Array();
		advRemove_Card_Into_DropDeck(moyi.arms1);
		advRemove_Card_Into_DropDeck(moyi.arms2);
		advRemove_Card_Into_DropDeck(moyi.defense);
		moyi.arms1 = "无";
		moyi.arms1Combat = 0;
		moyi.arms1Combat = 0;
		moyi.arms2 = "无";
		moyi.arms2Combat = 0;
		moyi.arms2Extent = 0;
		moyi.defense = "无";
		moyi.defenseCombat = 0;
		moyi.defenseExtent = 0;
		advUpdate_PetsEffect(moyi.pet_FengMonster, moyi);
		moyi.pet_FengMonster = null;
		moyi.pet_Feng = "风系宠物";
		advUpdate_PetsEffect(moyi.pet_LeiMonster, moyi);
		moyi.pet_LeiMonster = null;
		moyi.pet_Lei = "雷系宠物";
		advUpdate_PetsEffect(moyi.pet_ShuiMonster, moyi);
		moyi.pet_ShuiMonster = null;
		moyi.pet_Shui = "水系宠物";
		advUpdate_PetsEffect(moyi.pet_HuoMonster, moyi);
		moyi.pet_HuoMonster = null;
		moyi.pet_Huo = "火系宠物";
		advUpdate_PetsEffect(moyi.pet_TuMonster, moyi);
		moyi.pet_TuMonster = null;
		moyi.pet_Tu = "土系宠物";
		moyi.petsCombat = 0;
		moyi.petsExtent = 0;
		if (myControlPlayer._name==moyi._name) {
			handCardZone.removeAllItems();
		}
		textAreaAddMessage("队友阵亡，魔翳“底牌”效果触发，变身为“湮世穹兵”", myText, listView);
		advCharacterCardManager(moyi, 32);
		moyi.hadImageView.loadTexture(moyi.playerPicSrc);
	}
}



// 湮世穹兵【侵略如火】
function advSkillCharacters_YanshiqiongbingQinlueruhuo() {
	if (nowPlayerTerm[nowPlayerNumber].hp>0&&nowPlayerTerm[nowPlayerNumber].skillNameList.containsObject(skillnameQinlueruhuo)) {
		textAreaAddMessage("湮世穹兵“侵略如火”效果触发，您的战力+2", myText, listView);
		baseEffectAddSkillCombat(nowPlayerTerm[nowPlayerNumber], 2);
	}
}

// 湮世穹兵【毁天灭地】
function advSkillCharacters_YanshiqiongbingHuitianmiedi(player) {
	if(!player.everyRoundSkill_2&&player.hp>0&&player._name==nameYanshiqionbing&&player._name==myControlPlayer._name){
		addDialog(mainScene, new ChooseZoneLayer("是否发动“毁天灭地”效果？",function(result){
			if(result){
				player.everyRoundSkill_2 = true;
				var number=parseInt(Math.random()*6, 10)+1;
				textAreaAddMessage("湮世穹兵发动“毁天灭地”效果，掷骰判定点数为："+number, myText, listView,function(){
					if(number>=5){
						AchivementProgress.addAchivementProgress(player);
						textAreaAddMessage("除湮世穹兵外的所有角色HP-2", myText, listView);
						var tempHeartPlayerList=new Array();
						var tempHeartNumberList=new Array();
						for(var i=0;i<nowPlayerTerm.length;i++){
							if(nowPlayerTerm[i].hp>0&&nowPlayerTerm[i]._name!=nameYanshiqionbing){
								tempHeartPlayerList.push(nowPlayerTerm[i]);
								tempHeartNumberList.push(2);
							}
						}
						advUseYingu(tempHeartPlayerList,tempHeartPlayerList[0],tempHeartPlayerList[0],tempHeartNumberList,true, advBaseEffectReduceHPEffect,function(){
							advSkillCharactersTangxuejianZhuida(function(){
								heartList=new Array();
							});
						});
					}else{
						textAreaAddMessage("判定点数小于5，技能无效", myText, listView);
					}
				});
			}
		}));
	}
}


// 具体处理龙葵变身为龙葵鬼的效果
function advLongkuiBianshenHandle(longkui,callBack){
	textAreaAddMessage("龙葵发动“变身”效果，变身为龙葵鬼", myText, listView);
	var tempHp=longkui.hp;
	cc.spriteFrameCache.removeSpriteFramesFromFile(longkui.skillUrl);
	advCharacterCardManager(longkui,34);
	loadCharacterSkillAnimation(longkui);
	longkui.hadImageView.loadTexture(longkui.playerPicSrc);
	longkui.hp=tempHp;
	callBack();
}


// 龙葵/龙葵鬼 【变身】
function advLongkui_Bianshen(callBack) {
	var longkui = nowPlayerTerm[nowPlayerNumber];
	if (longkui._name==nameLongkui) {
		if (myControlPlayer._name==longkui._name) {
			addDialog(mainScene, new ChooseZoneLayer("是否变身为龙葵鬼？",function(result){
				if(result){
					// 变身为龙葵鬼的操作
					advLongkuiBianshenHandle(longkui, callBack);
				}else{
					callBack();
				}
			}));
		} else {
			// AI决定是否变身
			if(longkui.friendList[1].hp==0){
				advLongkuiBianshenHandle(longkui, callBack);
			}else{
				callBack();
			}
		}
	} else if (longkui._name==nameLongkuigui) {
		if (myControlPlayer._name==longkui._name) {
			addDialog(mainScene, new ChooseZoneLayer("是否变身为龙葵？",function(result){
				if(result){
					// 变身为龙葵的操作
					textAreaAddMessage("龙葵鬼发动“变身”效果，变身为龙葵", myText, listView);
					cc.spriteFrameCache.removeSpriteFramesFromFile(longkui.skillUrl);
					var tempHp=longkui.hp;
					advCharacterCardManager(longkui,33);
					loadCharacterSkillAnimation(longkui);
					longkui.hadImageView.loadTexture(longkui.playerPicSrc);
					longkui.hp=tempHp;
					callBack();
				}else{
					callBack();
				}
			}));
		} else {
			// AI决定是否变身
			callBack();
		}
	}else{
		callBack();
	}
}

// 龙葵【熔铸】
function advSkillCharacters_LongkuiRongzhu(longkui) {
	if(longkuiRongzhuCardName!=null&&longkui._name==nameLongkui&&!longkui.everyRoundSkill_2&&longkui._name==myControlPlayer._name){
		addDialog(mainScene, new ChooseZoneLayer("是否发动“熔铸”，再次打出【"+longkuiRongzhuCardName+"】？",function(result){
			if(result){
				longkui.everyRoundSkill_2=true;
				advUseYingu([longkui],longkui,longkui,[1],true, advBaseEffectReduceHPEffect,function(){
					advSkillCharactersTangxuejianZhuida(function(){
						heartList=new Array();
						if(longkui.hp>0){
							var cardName=longkuiRongzhuCardName;
							if(cardName==string_handCardNameTianleipo){
								handCardTianleipo.advEffect(longkui, longkui, false, false);
							}else if(cardName==string_handCardNameShuerguo){
								handCardShuerguo.advEffect(longkui, longkui, false, false);
							}else if(cardName==string_handCardNameTongqianbiao){
								handCardTongqianbiao.advEffect(longkui, longkui, false, false);
							}else if(cardName==string_handCardNameToudao){
								handCardToudao.advEffect(longkui, longkui, false, false);
							}else if(cardName==string_handCardNameWuqichaoyuan){
								handCardWuqichaoyuan.advEffect(longkui, longkui, false, false);
							}else if(cardName==string_handCardNameKuicetianji){
								handCardKuicetianji.advEffect(longkui, longkui, false, false);
							}
							// AchivementProgress.addAchivementProgress(longkui);
						}
					});
				});
			}
		}));
	}
}

// 龙葵【剑灵】
function advSkillCharacters_LongkuiJianling(player,equmentName,showName){
	if(player._name==nameLongkui&&eval("!"+equmentName+".endsWith('(爆发)')")){
		addDialog(mainScene, new ChooseZoneLayer("是否发动“剑灵”效果，爆发【"+showName+"】?",function(result){
			if(result){
				// AchivementProgress.addAchivementProgress(player);
				mainScene.addChild(new skillAnimationLayer(player.animation));
				textAreaAddMessage("龙葵发动“剑灵”效果，爆发【"+showName+"】,自身战力+3", myText, listView);
				eval(equmentName+"+='(爆发)'");
				baseEffectAddTempCombat(player, 3);
				if (fight_Trigger.length > 0) {
					var over = false;
					if (fight_Trigger[0]._name==nameLongkui
							|| (fight_Trigger.length > 1 && fight_Trigger[1]._name==nameLongkui)) {
						triggerCombat += 3;
						over = true;
					}
					if (!over
							&& fight_Monster.length> 0
							&& fight_Monster[0]._name==nameLongkui) {
						monsterCombat += 3;
					}
				}
			}
		}));
	}
}

// 龙葵鬼【控剑】
function advSkillCharacters_LongkuiguiKongjian(longkuigui) {
	if (longkuigui._name==nameLongkuigui&&longkuigui._name==nowPlayerTerm[nowPlayerNumber]._name&&
			baseEffectCountequment(longkuigui.friendList[1])+baseEffectCountequment(longkuigui.friendList[2])>0 ) {
		addDialog(mainScene, new ChooseZoneLayer("是否发动“控剑”效果收取队友的装备作为手牌?",function(result){
			if(result){
				var player1Shown=(player1._name!=myControlPlayer._name&&baseEffectCountequment(player1)>0)?true:false;
				var player2Shown=(player2._name!=myControlPlayer._name&&baseEffectCountequment(player2)>0)?true:false;
				var player3Shown=(player3._name!=myControlPlayer._name&&baseEffectCountequment(player3)>0)?true:false;
				addDialog(mainScene, new selectAdvPlayerDialogLayer(player1Shown,player2Shown, player3Shown, false,
						"请选择目标队友", false, false,function(targetPlayer){
					addDialog(mainScene,new selectEqumentDialogLayer("请选择要收做手牌的装备",targetPlayer,function(selectResult){
						switch (selectResult){
						case SelectCardType.ARMS1:
							advPlayer1GetPlayer2Equment(longkuigui, longkuigui.friendList[1].arms1);
							longkuigui.friendList[1].arms1Combat = 0;
							longkuigui.friendList[1].arms1Extent = 0;
							longkuigui.friendList[1].arms1="无";
							break;
						case SelectCardType.ARMS2:
							advPlayer1GetPlayer2Equment(longkuigui, longkuigui.friendList[1].arms2);
							longkuigui.friendList[1].arms2Combat = 0;
							longkuigui.friendList[1].arms2Extent = 0;
							longkuigui.friendList[1].arms2="无";
							break;
						case SelectCardType.DEFENSE:
							advPlayer1GetPlayer2Equment(longkuigui, longkuigui.friendList[1].defense);
							longkuigui.friendList[1].defenseCombat = 0;
							longkuigui.friendList[1].defenseExtent = 0;
							longkuigui.friendList[1].defense="无";
							break;
						case SelectCardType.ORNAMENT:
							addDialog(mainScene, new selectCardDialogLayer("请选择抽取的饰品",longkuigui.friendList[1].skillTempList,1,1,false,function(result){
								var card=result.pop();
								longkuigui.friendList[1].skillTempList.removeObject(card);
								longkuigui.friendList[1].maxCombat--;
								longkuigui.handCard.push(card);
								handCardZone.pushBackCustomItem(card);
							}));
							break;
						}
					}));
				}));
			}
		}));
	}
}

// 龙葵鬼【剑魂】
function advSkillCharacters_LongkuiguiJianhun(longkuigui,equmentName,showName,equmentType){
	if(!longkuigui.everyRoundSkill_2&&longkuigui._name==nameLongkuigui&&longkuigui._name==nowPlayerTerm[nowPlayerNumber]._name){
		addDialog(mainScene, new ChooseZoneLayer("是否发动“剑魂”效果，爆发【"+showName+"】?",function(result){
			if(result){
				longkuigui.everyRoundSkill_2=true;
				addDialog(mainScene, new selectAdvPlayerDialogLayer(true,true, true, true,
						"请指定一名角色HP-3", false, false,function(selectPlayer){
					mainScene.addChild(new skillAnimationLayer(longkuigui.animation));
					// AchivementProgress.addAchivementProgress(longkuigui);
					textAreaAddMessage("龙葵鬼发动“剑魂”效果，爆发【"+showName+"】，指定"+selectPlayer._name+"HP-3", myText, listView);
					eval(equmentName+"+='(爆发)'");
					advUseYingu([selectPlayer],selectPlayer,selectPlayer,[3],true, advBaseEffectReduceHPEffect,function(){
						advSkillCharactersTangxuejianZhuida(function(){
							heartList=new Array();
							switch(equmentType){
							case SelectCardType.ARMS1:
								advRemove_Card_Into_DropDeck(longkuigui.arms1);
								longkuigui.arms1="无";
								longkuigui.arms1Combat=0;
								longkuigui.arms1Extent=0;
								break;
							case SelectCardType.DEFENSE:
								advRemove_Card_Into_DropDeck(longkuigui.defense);
								longkuigui.defense="无";
								longkuigui.defenseCombat=0;
								longkuigui.defenseExtent=0;
								break;
							}
						});
					});
				}));
			}
		}));
	}
}

