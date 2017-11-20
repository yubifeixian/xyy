function npcEffectZhuzhan(monster,callBack){
	nowPlayerTerm[nowPlayerNumber].npcHelp.push(monster);
	cc.log(nowPlayerTerm[nowPlayerNumber].npcHelp);
	cc.log(nowPlayerTerm[nowPlayerNumber].npcHelp.length);
	cc.log(nowPlayerTerm[nowPlayerNumber].npcHelp[0].name);
	textAreaAddMessage(Text.chooseNpcEffect.format(nowPlayerTerm[nowPlayerNumber]._name),myText, listView);
	buttonManager(order2Button, true, true);
	callBack();
}

function npcEffectJiaoyi(monster,callBack){
	if (nowPlayerTerm[nowPlayerNumber]._name==player1._name) {
		var player1Shown =player1.handCard.length>0?true:false;
		var player2Shown =player2.handCard.length>0?true:false;
		var player3Shown =player3.handCard.length>0?true:false;
		var player4Shown =player4.handCard.length>0?true:false;
		addDialog(mainScene, new selectPlayerDialogLayer(player1Shown,player2Shown, player3Shown, player4Shown,
				Text.choosePlayerGiveCardToFriend, false, false,function(selectPlayer){
			if(selectPlayer._name==player1._name){
				if(player1.friendList[1].hp>0){
					addDialog(mainScene, new selectCardDialogLayer(Text.chooseCardGiveToFriend,player1.handCard,1,1,false,function(resultList){
						var card=resultList.pop();
						player2.handCard.push(card);
						player1.handCard.removeObject(card);
						card.removeFromParent();
						textAreaAddMessage(Text.giveCardToFriend.format(player1._name,player1.friendList[1]._name), myText, listView);
						callBack();
						buttonManager(order2Button, true, true);
					}));
				}else{
					textAreaAddMessage(Text.giveCardError, myText, listView);
					callBack();
					buttonManager(order2Button, true, true);
				}
			}else{
				var number=parseInt(Math.random()*selectPlayer.handCard.length, 10);
				var card=selectPlayer.handCard[number];
				if(selectPlayer.friendList[1].hp>0){
					selectPlayer.handCard.removeObject(card);
					selectPlayer.friendList[1].handCard.push(card);
					if(selectPlayer.friendList[1]._name==player1._name){
						handCardZone.pushBackCustomItem(card);
					}
					textAreaAddMessage(Text.giveCardToFriend.format(selectPlayer._name,selectPlayer.friendList[1]._name), myText, listView);
					callBack();
					buttonManager(order2Button, true, true);
				}else{
					textAreaAddMessage(Text.giveCardError, myText, listView);
					callBack();
					buttonManager(order2Button, true, true);
				}
			}
		}));
	}else{
		// AI处理【交易】的效果
		callBack();
		buttonManager(order2Button, true, true);
	}
}

function advNpcEffectJiaoyi(monster,callBack){
	if (nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name) {
		var player1Shown =player1.handCard.length>0?true:false;
		var player2Shown =player2.handCard.length>0?true:false;
		var player3Shown =player3.handCard.length>0?true:false;
		addDialog(mainScene, new selectPlayerDialogLayer(player1Shown,player2Shown, player3Shown, false,
				Text.choosePlayerGiveCardToFriend, false, false,function(selectPlayer){
			if(selectPlayer._name==myControlPlayer._name){
				if(myControlPlayer.friendList[1].hp>0||myControlPlayer.friendList[2].hp>0){
					addDialog(mainScene, new selectCardDialogLayer(Text.chooseCardGiveToFriend,myControlPlayer.handCard,1,1,false,function(resultList){
						var card=resultList.pop();
						addDialog(mainScene, new selectPlayerDialogLayer(false,true,true, false,
								Text.chooseGiveTarget, false, false,function(mubiao){
							mubiao.handCard.push(card);
							myControlPlayer.handCard.removeObject(card);
							card.removeFromParent();
							textAreaAddMessage(Text.giveCardToFriend.format(myControlPlayer._name,mubiao._name), myText, listView);
							callBack();
							buttonManager(order2Button, true, true);
						}));
					}));
				}else{
					textAreaAddMessage(Text.giveCardError, myText, listView);
					callBack();
					buttonManager(order2Button, true, true);
				}
			}else{
				var number=parseInt(Math.random()*selectPlayer.handCard.length, 10);
				var card=selectPlayer.handCard[number];
				if(selectPlayer.friendList[1].hp>0||selectPlayer.friendList[2].hp>0){
					var mubiaoPlayer=randomGetLivePlayerFriend(selectPlayer);
					selectPlayer.handCard.removeObject(card);
					mubiaoPlayer.handCard.push(card);
					if(mubiaoPlayer._name==myControlPlayer._name){
						handCardZone.pushBackCustomItem(card);
					}
					textAreaAddMessage(Text.giveCardToFriend.format(selectPlayer._name,mubiaoPlayer._name), myText, listView);
					callBack();
					buttonManager(order2Button, true, true);
				}else{
					textAreaAddMessage(Text.giveCardError, myText, listView);
					callBack();
					buttonManager(order2Button, true, true);
				}
			}
		}));
	}else{
		// AI处理【交易】的效果
		callBack();
		buttonManager(order2Button, true, true);
	}
}

function npcEffectXiji(monster,callBack){
	if(nowPlayerTerm[nowPlayerNumber]._name==player1._name){
		addDialog(mainScene, new selectPlayerDialogLayer(true,true, true, true,
				Text.choosePlayerReduceHP.format(1), false, false,function(selectPlayer){
			useYingu([selectPlayer], selectPlayer, selectPlayer, [1], true, baseEffectReduceHPEffect, function(){
				// 唐雪见【追打】效果\
				skillCharactersTangxuejianZhuida(function(){
					heartList=new Array();
					callBack();
					buttonManager(order2Button, true, true);
				})
			});
		}));
		
	}else{
		// AI处理袭击效果
		callBack();
		buttonManager(order2Button, true, true);
	}
}


function advNpcEffectXiji(monster,callBack){
	if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name){
		addDialog(mainScene, new selectPlayerDialogLayer(true,true, true, true,
				Text.choosePlayerReduceHP.format(1), false, false,function(selectPlayer){
			advUseYingu([selectPlayer], selectPlayer, selectPlayer, [1], true, advBaseEffectReduceHPEffect, function(){
				// 唐雪见【追打】效果\
				skillCharactersTangxuejianZhuida(function(){
					heartList=new Array();
					callBack();
					buttonManager(order2Button, true, true);
				})
			});
		}));

	}else{
		// AI处理袭击效果
		callBack();
		buttonManager(order2Button, true, true);
	}
}


function npcEffectChuangong(monster,callBack){
	textAreaAddMessage(Text.npcChuangongEffect, myText, listView, function(){
		addHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],null,[1],true,true);
		callBack();
		buttonManager(order2Button, true, true);
	});
}

function advNpcEffectChuangong(monster,callBack){
	npcEffectChuangong(monster,callBack);
}


function npcEffectXiulian(monster,callBack){
	textAreaAddMessage(Text.npcXiulianEffect, myText, listView, function(){
		useYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [1], true, baseEffectReduceHPEffect, function(){
			skillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				if(nowPlayerTerm[nowPlayerNumber]._name==player1._name){
					addDialog(mainScene, new selectPlayerDialogLayer(true,true, true, true,
							Text.chooseAddCardTarget.format(1), false, false,function(selectPlayer){
						addHandCard([selectPlayer],selectPlayer,selectPlayer,null,[1],true,true);
						textAreaAddMessage(Text.addHandCard.format(selectPlayer._name,1), myText, listView);
						callBack();
						buttonManager(order2Button, true, true);
					}));
				}else{
					addHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],null,[1],true,true);
					textAreaAddMessage(Text.addHandCard.format(nowPlayerTerm[nowPlayerNumber]._name,1), myText, listView);
					callBack();
					buttonManager(order2Button, true, true);
				}
			});
		});
	});
}

function advNpcEffectXiulian(monster,callBack){
	textAreaAddMessage(Text.npcXiulianEffect, myText, listView, function(){
		advUseYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [1], true, advBaseEffectReduceHPEffect, function(){
			if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name){
				addDialog(mainScene, new selectPlayerDialogLayer(true,true, true, true,
						Text.chooseAddCardTarget.format(1), false, false,function(selectPlayer){
					addHandCard([selectPlayer],selectPlayer,selectPlayer,null,[1],true,true);
					textAreaAddMessage(Text.addHandCard.format(selectPlayer._name,1), myText, listView);
					callBack();
					buttonManager(order2Button, true, true);
				}));
			}else{
				// AI选择补牌的玩家(默认为自己)
				addHandCard([nowPlayerTerm[nowPlayerNumber]],nowPlayerTerm[nowPlayerNumber],nowPlayerTerm[nowPlayerNumber],null,[1],true,true);
				textAreaAddMessage(Text.addHandCard.format(nowPlayerTerm[nowPlayerNumber]._name,1), myText, listView);
				callBack();
				buttonManager(order2Button, true, true);
			}
		});
	});
}

function npcEffectZhiliao(monster,callBack){
	textAreaAddMessage(Text.chooseAddHpTarget.format(1), myText, listView, function(){
		if(nowPlayerTerm[nowPlayerNumber]._name==player1._name){
			addDialog(mainScene, new selectPlayerDialogLayer(true,true, true, true,
					Text.chooseAddHpTarget.format(1), false, false,function(selectPlayer){
				baseEffectAddHP(selectPlayer);
				textAreaAddMessage(Text.addHp.format(selectPlayer._name,1), myText, listView);
				has_Tianshezhang(selectPlayer);
				callBack();
				buttonManager(order2Button, true, true);
			}));
		}else{
			// AI处理治疗效果，默认自己
			baseEffectAddHP(nowPlayerTerm[nowPlayerNumber]);
			textAreaAddMessage(Text.addHp.format(nowPlayerTerm[nowPlayerNumber]._name,1), myText, listView);
			has_Tianshezhang(nowPlayerTerm[nowPlayerNumber]);
			callBack();
			buttonManager(order2Button, true, true);
		}
	});
}

function avdNpcEffectZhiliao(monster,callBack){
	textAreaAddMessage(Text.chooseAddHpTarget.format(1), myText, listView, function(){
		if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name){
			addDialog(mainScene, new selectPlayerDialogLayer(true,true, true, true,
					Text.chooseAddHpTarget.format(1), false, false,function(selectPlayer){
				advBaseEffectAddHP(selectPlayer);
				textAreaAddMessage(Text.addHp.format(selectPlayer._name,1), myText, listView);
				has_Tianshezhang(selectPlayer);
				callBack();
				buttonManager(order2Button, true, true);
			}));
		}else{
			// AI处理治疗效果，默认自己
			advBaseEffectAddHP(nowPlayerTerm[nowPlayerNumber]);
			textAreaAddMessage(Text.addHp.format(nowPlayerTerm[nowPlayerNumber]._name,1), myText, listView);
			has_Tianshezhang(nowPlayerTerm[nowPlayerNumber]);
			callBack();
			buttonManager(order2Button, true, true);
		}
	});
}


function npcEffectDaoqie(monster,callBack){
	textAreaAddMessage(Text.npcDaoqieEffect, myText, listView, function(){
		if(player1.handCard.length+player2.handCard.length+player3.handCard.length+player4.handCard.length==0){
			textAreaAddMessage(Text.daoqieError, myText, listView);
			callBack();
			buttonManager(order2Button, true, true);
		}else{
			if(nowPlayerTerm[nowPlayerNumber]._name==player1._name){
				var player1Shown=player1.handCard.length>0?true:false;
				var player2Shown=player2.handCard.length>0?true:false;
				var player3Shown=player3.handCard.length>0?true:false;
				var player4Shown=player4.handCard.length>0?true:false;
				addDialog(mainScene, new selectPlayerDialogLayer(player1Shown,player2Shown, 
						player3Shown, player4Shown,
						Text.choosePlayerDropCard, false, false,function(selectPlayer){
					var number=parseInt(Math.random()*selectPlayer.handCard.length, 10);
					var card=selectPlayer.handCard[number];
					remove_Card_Into_DropDeck(card.name);
					selectPlayer.handCard.removeObject(card);
					if(selectPlayer._name==player1._name){
						card.removeFromParent();
					}
					callBack();
					buttonManager(order2Button, true, true);
				}));
			}else{
				// AI选择盗窃的目标
				callBack();
				buttonManager(order2Button, true, true);
			}
		}
	});
}

function advNpcEffectDaoqie(monster,callBack){
	if(player1.handCard.length+player2.handCard.length+player3.handCard.length+player4.handCard.length==0){
		textAreaAddMessage(Text.daoqieError, myText, listView);
		callBack();
		buttonManager(order2Button, true, true);
	}else{
		textAreaAddMessage(Text.npcDaoqieEffect, myText, listView, function(){
			if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name){
				addDialog(mainScene, new selectPlayerDialogLayer(true,true, true, true,
						Text.choosePlayerDropCard, false, false,function(selectPlayer){
					var number=parseInt(Math.random()*selectPlayer.handCard.length, 10);
					var card=selectPlayer.handCard[number];
					advRemove_Card_Into_DropDeck(card.name);
					selectPlayer.handCard.removeObject(card);
					if(selectPlayer._name==myControlPlayer._name){
						card.removeFromParent();
					}
					callBack();
					buttonManager(order2Button, true, true);
				}));
			}else{
				// AI选择盗窃的目标
				callBack();
				buttonManager(order2Button, true, true);
			}
		});
	}
}


function npcEffectXunhua(monster,callBack){
	if(baseEffectCountPets(player1)+baseEffectCountPets(player2)+baseEffectCountPets(player3)+baseEffectCountPets(player4)>0){
		if(nowPlayerTerm[nowPlayerNumber]._name==player1._name){
			var player1Shown=baseEffectCountPets(player1)>0?true:false;
			var player2Shown=baseEffectCountPets(player2)>0?true:false;
			var player3Shown=baseEffectCountPets(player3)>0?true:false;
			var player4Shown=baseEffectCountPets(player4)>0?true:false;
			addDialog(mainScene, new selectPlayerDialogLayer(player1Shown,player2Shown, player3Shown, player4Shown,
					Text.choosePlayerGivePetToFriend, false, false,function(selectPlayer){
				if(selectPlayer.friendList[1].hp>0){
					addDialog(mainScene, new selectPetsDialogLayer(Text.choosePetGiveToFriend,selectPlayer,function(pet){
						baseEffectChangepets(selectPlayer, selectPlayer.friendList[1], pet.nature);
						callBack();
						buttonManager(order2Button, true, true);
						
					}));
				}else{
					textAreaAddMessage(Text.xunhuaError1, myText, listView);
					callBack();
					buttonManager(order2Button, true, true);
				}
			}));
		}else{
			// AI处理驯化的效果
			callBack();
			buttonManager(order2Button, true, true);
		}
	}else{
		textAreaAddMessage(Text.xunhuaError2, myText, listView);
		callBack();
		buttonManager(order2Button, true, true);
	}
}

function advNpcEffectXunhua(monster,callBack){
	if(baseEffectCountPets(player1)+baseEffectCountPets(player2)+baseEffectCountPets(player3)>0){
		if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name){
			var player1Shown=baseEffectCountPets(player1)>0?true:false;
			var player2Shown=baseEffectCountPets(player2)>0?true:false;
			var player3Shown=baseEffectCountPets(player3)>0?true:false;
			addDialog(mainScene, new selectPlayerDialogLayer(player1Shown,player2Shown, player3Shown, false,
					Text.choosePlayerGivePetToFriend, false, false,function(selectPlayer){
				if(selectPlayer.friendList[1].hp>0||selectPlayer.friendList[2].hp>0){
					addDialog(mainScene, new selectPetsDialogLayer(Text.choosePetGiveToFriend,selectPlayer,function(pet){
						baseEffectChangepets(selectPlayer, selectPlayer.friendList[1], pet.nature);
						callBack();
						buttonManager(order2Button, true, true);

					}));
				}else{
					textAreaAddMessage(Text.xunhuaError1, myText, listView);
					callBack();
					buttonManager(order2Button, true, true);
				}
			}));
		}else{
			// AI处理驯化的效果
			callBack();
			buttonManager(order2Button, true, true);
		}
	}else{
		textAreaAddMessage(Text.xunhuaError2, myText, listView);
		callBack();
		buttonManager(order2Button, true, true);
	}
}


function npcEffectJoin(monster,callBack){
	if(nowPlayerTerm[nowPlayerNumber]._name==player1._name){
		var showPlayer1=player1.handCard.length>0;
		var showPlayer2=player2.handCard.length>0;
		addDialog(mainScene, new selectPlayerDialogLayer(showPlayer1,showPlayer2,false,false,Text.choosePlayerDropAllCard,false,false,function(selectPlayer){
			var cardNumber=selectPlayer.handCard.length;
			for (var i=selectPlayer.handCard.length-1; i>=0;i--) {
				remove_Card_Into_DropDeck(selectPlayer.handCard[i].name);
				if (selectPlayer._name==player1._name){
					selectPlayer.handCard[i].removeFromParent();
				}
				selectPlayer.handCard.removeObject(selectPlayer.handCard[i]);
			}
			addDialog(mainScene, new selectPlayerDialogLayer(true,true,false,false,Text.chooseReplacePlayer,false,false,function(result){
				changeCharacter(result, monster,cardNumber,callBack);
			},true));
		}));
	}else{
		// AI处理加入效果
		callBack();
		buttonManager(order2Button, true, true);
	}
}

function advNpcEffectJoin(monster,callBack){
	if(nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name){
		var showPlayer1=player1.handCard.length>0;
		var showPlayer2=player2.handCard.length>0;
		var showPlayer3=player3.handCard.length>0;
		addDialog(mainScene, new selectPlayerDialogLayer(showPlayer1,showPlayer2,showPlayer3,false,Text.choosePlayerDropAllCard,false,false,function(selectPlayer){
			var cardNumber=selectPlayer.handCard.length;
			for (var i=selectPlayer.handCard.length-1; i>=0;i--) {
				advRemove_Card_Into_DropDeck(selectPlayer.handCard[i].name);
				if (selectPlayer._name==myControlPlayer._name){
					selectPlayer.handCard[i].removeFromParent();
				}
				selectPlayer.handCard.removeObject(selectPlayer.handCard[i]);
			}
			addDialog(mainScene, new selectPlayerDialogLayer(true,true,true,false,Text.chooseReplacePlayer,false,false,function(result){
				advChangeCharacter(result, monster,cardNumber,callBack);
			},true));
		}));
	}else{
		// AI处理加入效果
		callBack();
		buttonManager(order2Button, true, true);
	}
}

function changeCharacter(oldPlayer,monster,handCardNumber,callBack){
	oldPlayer.deathImageView.setVisible(false);
	// 替换前的效果处理
	if (oldPlayer._name==nameLinyueru) {
		oldPlayer.tempZhuangbeiSkillCombat = 0;
	} else if (oldPlayer._name==nameJiujianxian) {
		oldPlayer.tempZhuangbeiSkillExtent = 0;
	} else if (oldPlayer._name==nameZixuan) {
		zixuan_ShenshengEnd(oldPlayer);
	} else if (oldPlayer._name==nameLiumengli) {
		skillCharacters_LiumengliYaowangEnd(oldPlayer);
	}
	oldPlayer.skillTemplist=new Array();
	oldPlayer.lover1 = Text.nil;
	oldPlayer.lover2 = Text.nil;
	oldPlayer.lover3 = Text.nil;
	oldPlayer.lover4 = Text.nil;
	oldPlayer.loverEffect = false;
	var tempArms1 = oldPlayer.arms1.replaceAll("\\(扣置\\)", "");
	var tempArms2 = oldPlayer.arms2.replaceAll("\\(扣置\\)", "");
	var tempXiejianxianArms1Combat = oldPlayer.xiejianxian_Arms1Combat;
	var tempXiejianxianArms1Extent = oldPlayer.xiejianxian_Arms1Extent;
	var tempXiejianxianArms2Combat = oldPlayer.xiejianxian_Arms2Combat;
	var tempXiejianxianArms2Extent = oldPlayer.xiejianxian_Arms2Extent;
	var tempDefense = oldPlayer.defense;
	var tempPet1 = oldPlayer.pet_Feng;
	var tempPet1Model = oldPlayer.pet_FengMonster;
	var tempPet2 = oldPlayer.pet_Lei;
	var tempPet2Model = oldPlayer.pet_LeiMonster;
	var tempPet3 = oldPlayer.pet_Shui;
	var tempPet3Model = oldPlayer.pet_ShuiMonster;
	var tempPet4 = oldPlayer.pet_Huo;
	var tempPet4Model = oldPlayer.pet_HuoMonster;
	var tempPet5 = oldPlayer.pet_Tu;
	var tempPet5Model = oldPlayer.pet_TuMonster;
	if(oldPlayer.skillUrl!=null){
		cc.spriteFrameCache.removeSpriteFramesFromFile(oldPlayer.skillUrl);
	}
	characterCardManager(oldPlayer,monster.ID);
	loadCharacterSkillAnimation(oldPlayer);
	oldPlayer.hadImageView.loadTexture(oldPlayer.playerPicSrc);
	// Judge.updateHadPic(selectPlayer, selectPlayer.playerPicSrc);
	/*
	 * if (oldPlayer.name.equals(Game_Round.nowPlayerTerm
	 * .get(Game_Round.nowPlayerNumber).name)) {
	 * selectPlayer.hadImageView.setAlpha(1.0f); } else {
	 * selectPlayer.hadImageView.setAlpha(0.6f); }
	 */
	var hp = handCardNumber * 2;
	if (hp < oldPlayer.hp) {
		oldPlayer.hp = hp;
	}
	oldPlayer.arms1 = tempArms1;
	oldPlayer.xiejianxian_Arms1Combat = tempXiejianxianArms1Combat;
	oldPlayer.xiejianxian_Arms1Extent = tempXiejianxianArms1Extent;
	oldPlayer.xiejianxian_Arms2Combat = tempXiejianxianArms2Combat;
	oldPlayer.xiejianxian_Arms2Extent = tempXiejianxianArms2Extent;
	oldPlayer.arms2 = tempArms2;
	oldPlayer.defense = tempDefense;
	oldPlayer.pet_Feng = tempPet1;
	oldPlayer.pet_FengMonster = tempPet1Model;
	oldPlayer.pet_Lei = tempPet2;
	oldPlayer.pet_LeiMonster = tempPet2Model;
	oldPlayer.pet_Shui = tempPet3;
	oldPlayer.pet_ShuiMonster = tempPet3Model;
	oldPlayer.pet_Huo = tempPet4;
	oldPlayer.pet_HuoMonster = tempPet4Model;
	oldPlayer.pet_Tu = tempPet5;
	oldPlayer.pet_TuMonster = tempPet5Model;
	oldPlayer.loverEffect = false;
	player1.friendList=new Array();
	player1.friendList.push(player1);
	player1.friendList.push(player2);
	player2.friendList=new Array();
	player2.friendList.push(player2);
	player2.friendList.push(player1);
	if (oldPlayer.arms1!=Text.nil || oldPlayer.arms2!=Text.nil) {
		skillCharacter_LinyueruLinjiajianfa(oldPlayer);
		// Skill_Characters.jiujianxian_Yujianshu(context, selectPlayer);
		if(skillXiejianxian_HasXiejianxian(oldPlayer)){
			oldPlayer.arms1Combat = oldPlayer.xiejianxian_Arms1Combat;
			oldPlayer.arms1Extent = oldPlayer.xiejianxian_Arms1Extent;
			oldPlayer.arms2Combat = oldPlayer.xiejianxian_Arms2Combat;
			oldPlayer.arms2Extent = oldPlayer.xiejianxian_Arms2Extent;
			skillXiejianxianXiejianxianPetEffect(oldPlayer);
		}
	}
	if(player1.friendList[1].skillNameList.containsObject(skillnameZhangmenren)||
			player1.friendList[1].skillNameList.containsObject(skillnameYongandang)){
		teamSkill1Button.setVisible(true);
		teamSkill1Button.loadTextures(player1.friendList[1].skillButton1,
				player1.friendList[1].skillButton1,
				player1.friendList[1].skillButton1,ccui.Widget.LOCAL_TEXTURE);
	}else{
		teamSkill1Button.setVisible(false);
	}
	if (oldPlayer._name==nameZixuan) {
		if (oldPlayer.pet_FengMonster != null) {
			skillCharacters_ZixuanShensheng(oldPlayer,oldPlayer.pet_FengMonster);
		}
		if (oldPlayer.pet_LeiMonster != null) {
			skillCharacters_ZixuanShensheng(oldPlayer,oldPlayer.pet_LeiMonster);
		}
		if (oldPlayer.pet_ShuiMonster != null) {
			skillCharacters_ZixuanShensheng(oldPlayer,oldPlayer.pet_ShuiMonster);
		}
		if (oldPlayer.pet_HuoMonster != null) {
			skillCharacters_ZixuanShensheng(oldPlayer,oldPlayer.pet_HuoMonster);
		}
		if (oldPlayer.pet_TuMonster != null) {
			skillCharacters_ZixuanShensheng(oldPlayer,oldPlayer.pet_TuMonster);
		}
		callBack();
	} else if (oldPlayer._name==nameLiumengli) {
		// 柳梦璃【妖王】
		for (var i=0;i<oldPlayer.friendList.length;i++) {
			if (oldPlayer.friendList[i].hp > 0) {
				var temp=oldPlayer.friendList[i];
				var count = baseEffectCountPets(temp);
				if (count > 0) {
					textAreaAddMessage(Text.yaowangEffect, myText, listView);
					textAreaAddMessage(Text.addCombat.format(temp._name,count), myText, listView);
					temp.petsCombat += count;
				}
			}
		}
		// 柳梦璃【梦傀儡】结束处理
		skillCharacters_liumengliMengkuileiEnd();
		callBack();
	} else if (oldPlayer._name==nameXuanxiao) {
		// 玄霄【结拜】
		skillCharacters_XuanxiaoJiebai(callBack);
	}else{
		callBack();
	}
}

function advChangeCharacter(oldPlayer,monster,handCardNumber,callBack){
	// oldPlayer.deathImageView.setVisible(false);
	// 替换前的效果处理
	if (oldPlayer._name==nameLinyueru) {
		oldPlayer.tempZhuangbeiSkillCombat = 0;
	} else if (oldPlayer._name==nameJiujianxian) {
		oldPlayer.tempZhuangbeiSkillExtent = 0;
	} else if (oldPlayer._name==nameZixuan) {
		zixuan_ShenshengEnd(oldPlayer);
	} else if (oldPlayer._name==nameLiumengli) {
		advSkillCharacters_LiumengliYaowangEnd(oldPlayer);
	}
	oldPlayer.skillTemplist=new Array();
	oldPlayer.lover1 = Text.nil;
	oldPlayer.lover2 = Text.nil;
	oldPlayer.lover3 = Text.nil;
	oldPlayer.lover4 = Text.nil;
	oldPlayer.loverEffect = false;
	var tempArms1 = oldPlayer.arms1.replaceAll("\\(扣置\\)", "");
	var tempArms2 = oldPlayer.arms2.replaceAll("\\(扣置\\)", "");
	var tempXiejianxianArms1Combat = oldPlayer.xiejianxian_Arms1Combat;
	var tempXiejianxianArms1Extent = oldPlayer.xiejianxian_Arms1Extent;
	var tempXiejianxianArms2Combat = oldPlayer.xiejianxian_Arms2Combat;
	var tempXiejianxianArms2Extent = oldPlayer.xiejianxian_Arms2Extent;
	var tempDefense = oldPlayer.defense;
	var tempPet1 = oldPlayer.pet_Feng;
	var tempPet1Model = oldPlayer.pet_FengMonster;
	var tempPet2 = oldPlayer.pet_Lei;
	var tempPet2Model = oldPlayer.pet_LeiMonster;
	var tempPet3 = oldPlayer.pet_Shui;
	var tempPet3Model = oldPlayer.pet_ShuiMonster;
	var tempPet4 = oldPlayer.pet_Huo;
	var tempPet4Model = oldPlayer.pet_HuoMonster;
	var tempPet5 = oldPlayer.pet_Tu;
	var tempPet5Model = oldPlayer.pet_TuMonster;
	if(oldPlayer.skillUrl!=null){
		cc.spriteFrameCache.removeSpriteFramesFromFile(oldPlayer.skillUrl);
	}
	advCharacterCardManager(oldPlayer,monster.ID);
	oldPlayer.hadImageView.loadTexture(oldPlayer.playerPicSrc);
	var hp = handCardNumber * 2;
	if (hp < oldPlayer.hp) {
		oldPlayer.hp = hp;
	}
	oldPlayer.arms1 = tempArms1;
	oldPlayer.xiejianxian_Arms1Combat = tempXiejianxianArms1Combat;
	oldPlayer.xiejianxian_Arms1Extent = tempXiejianxianArms1Extent;
	oldPlayer.xiejianxian_Arms2Combat = tempXiejianxianArms2Combat;
	oldPlayer.xiejianxian_Arms2Extent = tempXiejianxianArms2Extent;
	oldPlayer.arms2 = tempArms2;
	oldPlayer.defense = tempDefense;
	oldPlayer.pet_Feng = tempPet1;
	oldPlayer.pet_FengMonster = tempPet1Model;
	oldPlayer.pet_Lei = tempPet2;
	oldPlayer.pet_LeiMonster = tempPet2Model;
	oldPlayer.pet_Shui = tempPet3;
	oldPlayer.pet_ShuiMonster = tempPet3Model;
	oldPlayer.pet_Huo = tempPet4;
	oldPlayer.pet_HuoMonster = tempPet4Model;
	oldPlayer.pet_Tu = tempPet5;
	oldPlayer.pet_TuMonster = tempPet5Model;
	oldPlayer.loverEffect = false;
	player1.friendList=new Array();
	player1.friendList.push(player1);
	player1.friendList.push(player2);
	player2.friendList=new Array();
	player2.friendList.push(player2);
	player2.friendList.push(player1);
	if (oldPlayer.arms1!=Text.nil || oldPlayer.arms2!=Text.nil) {
		advSkillCharacter_LinyueruLinjiajianfa(oldPlayer);
		// Skill_Characters.jiujianxian_Yujianshu(context, selectPlayer);
		if(skillXiejianxian_HasXiejianxian(oldPlayer)){
			oldPlayer.arms1Combat = oldPlayer.xiejianxian_Arms1Combat;
			oldPlayer.arms1Extent = oldPlayer.xiejianxian_Arms1Extent;
			oldPlayer.arms2Combat = oldPlayer.xiejianxian_Arms2Combat;
			oldPlayer.arms2Extent = oldPlayer.xiejianxian_Arms2Extent;
			skillXiejianxianXiejianxianPetEffect(oldPlayer);
		}
	}
	if (oldPlayer._name==nameZixuan) {
		if (oldPlayer.pet_FengMonster != null) {
			advSkillCharacters_ZixuanShensheng(oldPlayer,oldPlayer.pet_FengMonster);
		}
		if (oldPlayer.pet_LeiMonster != null) {
			advSkillCharacters_ZixuanShensheng(oldPlayer,oldPlayer.pet_LeiMonster);
		}
		if (oldPlayer.pet_ShuiMonster != null) {
			advSkillCharacters_ZixuanShensheng(oldPlayer,oldPlayer.pet_ShuiMonster);
		}
		if (oldPlayer.pet_HuoMonster != null) {
			advSkillCharacters_ZixuanShensheng(oldPlayer,oldPlayer.pet_HuoMonster);
		}
		if (oldPlayer.pet_TuMonster != null) {
			advSkillCharacters_ZixuanShensheng(oldPlayer,oldPlayer.pet_TuMonster);
		}
		callBack();
	} else if (oldPlayer._name==nameLiumengli) {
		// 柳梦璃【妖王】
		for (var i=0;i<oldPlayer.friendList.length;i++) {
			if (oldPlayer.friendList[i].hp > 0) {
				var temp=oldPlayer.friendList[i];
				var count = baseEffectCountPets(temp);
				if (count > 0) {
					textAreaAddMessage(Text.yaowangEffect, myText, listView);
					textAreaAddMessage(Text.addCombat.format(temp._name,count), myText, listView);
					temp.petsCombat += count;
				}
			}
		}
		// 柳梦璃【梦傀儡】结束处理
		advSkillCharacters_liumengliMengkuileiEnd();
		callBack();
	} else if (oldPlayer._name==nameXuanxiao) {
		// 玄霄【结拜】
		advSkillCharacters_XuanxiaoJiebai(callBack);
	}else{
		callBack();
	}
}



