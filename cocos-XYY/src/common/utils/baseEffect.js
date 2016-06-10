function baseEffectAddTempCombat(player, count) {
		player.tempAddCombat += count;
		player.combat = player.maxCombat + player.arms1Combat
		+ player.arms2Combat + player.defenseCombat
		+ player.petsCombat + player.skillAddCombat
		+ player.tempAddCombat + player.tempZhuangbeiSkillCombat;
}

function baseEffectAddSkillCombat(player, count) {
		player.skillAddCombat += count;
		player.combat = player.maxCombat + player.arms1Combat
		+ player.arms2Combat + player.defenseCombat
		+ player.petsCombat + player.skillAddCombat
		+ player.tempAddCombat + player.tempZhuangbeiSkillCombat;
}

function baseEffectReduceSkillCombat(player, count) {
	player.skillAddCombat -= count;
	player.combat = player.maxCombat + player.arms1Combat
	+ player.arms2Combat + player.defenseCombat
	+ player.petsCombat + player.skillAddCombat
	+ player.tempAddCombat + player.tempZhuangbeiSkillCombat;
}

function baseEffectReduceTempCombat(player, count) {
		player.tempAddCombat -= count;
		player.combat = player.maxCombat + player.arms1Combat
		+ player.arms2Combat + player.defenseCombat
		+ player.petsCombat + player.skillAddCombat
		+ player.tempAddCombat + player.tempZhuangbeiSkillCombat;
}

function baseEffectReduceSkillCombat(player, count) {
		player.skillAddCombat -= count;
		player.combat = player.maxCombat + player.arms1Combat
		+ player.arms2Combat + player.defenseCombat
		+ player.petsCombat + player.skillAddCombat
		+ player.skillAddCombat + player.tempAddCombat
		+ player.tempZhuangbeiSkillCombat;
}

function baseEffectAddHP(player) {
	mainScene.addChild(new LiaoyuTargetLayer(player,player));
	player.hp++;
	if (player.hp > player.maxHP)
		player.hp = player.maxHP;
	return player.hp;
}

function advBaseEffectAddHP(player) {
	mainScene.addChild(new LiaoyuTargetLayer(player,player));
	if(player._name!=bossNameMoyiYanshiqiongbing){
		player.hp++;
		if (player.hp > player.maxHP)
			player.hp = player.maxHP;
	}
	return player.hp;
}

function baseEffectReduceHP(player,heartPlayerList, number,CanUseLonghunzhankai,callBack,isNotLoverEffect) {
	isNotLoverEffect=isNotLoverEffect==null?true:isNotLoverEffect;
	var tempHP = player.hp;
	if (player.hp > 0) {
		if (CanUseLonghunzhankai
				&& has_Longhunzhankai(player)) {
			textAreaAddMessage(Text.longhunzhankaiEffet, myText, listView);
			number--;
			number=number<0?0:number;
		}
		mainScene.addChild(new HurtNumberLayer(player.hadImageView,"-"+number));
		if (number > 0) {
			for (var i = 0; i < number; i++) {
				player.hp--;
				if (player.hp <= 0) {
					player.hp = 0;
					break;
				}
			}
			if (player.hp>0&&player.hp < tempHP){
				heartList.push(player);
			}
		}
	}
	if(player._name==heartPlayerList[heartPlayerList.length-1]._name){
		isDeath(heartPlayerList[0],heartPlayerList,true,callBack,isNotLoverEffect);
	}else if(callBack!=null){
		callBack();
	}
}

function advBaseEffectReduceHP(player, number,CanUseLonghunzhankai,callBack) {
	var tempHP = player.hp;
	if (player._name!=bossNameMoyiYanshiqiongbing) {
		if (CanUseLonghunzhankai
				&& has_Longhunzhankai(player)) {
			textAreaAddMessage(Text.longhunzhankaiEffet, myText, listView);
			number--;
		}
		if (number > 0) {
			for (var i = 0; i < number; i++) {
				player.hp--;
				if (player.hp <= 0) {
					player.hp = 0;
					advIsDeath(player, true,callBack);
					return;
				}
			}
			caiyiAddHp(player,number);
			if (player.hp>0&&player.hp < tempHP){
				heartList.push(player);
			}
			if(callBack!=null){
				callBack();
			}
		}else if(callBack!=null){
			callBack();
		}
	}else if(callBack!=null){
		callBack();
	}
}

function baseEffectReduceHPEffect(player,playerList, reduceNum,canUseLonghunzhankai,callBack,isNotLoverEffect) {
	isNotLoverEffect=isNotLoverEffect==null?true:isNotLoverEffect;
	if (player.hp > 0&&reduceNum>0) {
		textAreaAddMessage(Text.reduceHp.format(player._name,reduceNum), myText, listView);
		// 如果不是倾慕伤害，则可以判断【踏云靴】和【雷屏】效果
		if(isNotLoverEffect){
			baofa_Tayunxue(player, function(){
				skillCharacters_OuyanghuiLeiping(player,playerList,reduceNum,canUseLonghunzhankai,callBack,isNotLoverEffect);
			},callBack);
		}else{
			callBack();
		}
	}else if(callBack!=null){
		callBack();
	}
}

function advBaseEffectReduceHPEffect(player, reduceNum,canUseLonghunzhankai,callBack,canUseTayunxue) {
	var canUseTayunxueEffect=canUseTayunxue==null?true:canUseTayunxue;// 判断是否可以爆发踏云靴效果，如果传入的参数为空则默认可以爆发
	if (player.hp > 0) {
		textAreaAddMessage(Text.reduceHp.format(player._name,reduceNum), myText, listView);
		if(player._name!=bossNameMoyiYanshiqiongbing){
			advBaofa_Tayunxue(player, function(){
				advSkillCharacters_OuyanghuiLeiping(player,reduceNum,canUseLonghunzhankai,callBack);
				// baseEffectReduceHP(player,reduceNum,
				// canUseLonghunzhankai,callBack);
			},callBack,canUseTayunxueEffect);
		}else if(callBack!=null){
			callBack();
		}
	}else if(callBack!=null){
		callBack();
	}
}



// 破除禁咒空间时，将角色HP扣为1的处理
// palyerHeartList在此处并没有实质作用，但本函数作为callBack在隐蛊效果中调用时，
// 会被统一传入固定数量的参数
// （因为隐蛊中的callBack还可能会是reduceHpEffect方法，该方法将会接收一个playerHeartList）
function reduceHPTo(player, playerHeartList,reduceNum,canUseLonghunzhankai,callBack){
	var tempHP=player.hp;
	if(player.hp>0&&player.defense==string_handCardNameTayunxue){
		if(player._name==player1._name){
			addDialog(mainScene, new yesOrNoDialogLayer(Text.askBaofaTayunxue,function(result){
				if(result){
					remove_Card_Into_DropDeck(player.defense);
					player.defense = Text.nil;
					player.defenseExtent = 0;
					baseEffectAddHP(player);
					textAreaAddMessage(Text.tayunxueEffect.format(player._name), myText, listView,function(){
						has_Tianshezhang(player);
					});
				}else{
					player.hp=1;
					heartList.push(player);
				}
				callBack();
			}));
		}else{
			var baofaResult=false;
			// AI决定是否爆发踏云靴
			if(baofaResult){
				remove_Card_Into_DropDeck(player.defense);
				player.defense = Text.nil;
				player.defenseExtent = 0;
				baseEffectAddHP(player);
				textAreaAddMessage(Text.tayunxueEffect.format(player._name), myText, listView,function(){
					has_Tianshezhang(player);
				});
			}else{
				player.hp=1;
				heartList.push(player);
			}
			callBack();
		}
	}else{
		player.hp=1;
		heartList.push(player);
		callBack();
	}
}

function baseEffectAddTempExtent(player) {
	player.tempAddExtent++;
	player.extent = player.maxExtent + player.arms1Extent
	+ player.arms2Extent + player.defenseExtent + player.petsExtent
	+ player.tempAddExtent + player.tempZhuangbeiSkillExtent;
}

function baseEffectReduceExtent(player) {
	player.extent--;
	if (player.extent < 0)
		player.extent = 0;
	return player.extent;

}


// 计算装备数量
function baseEffectCountequment(player) {
	var count = 0;
	if (player.hp != 0) {
		var value = Text.nil;
		if (player.arms1!=value)
			count++;
		if (player.arms2!=value)
			count++;
		if (player.defense!=value)
			count++;
		if (player._name==nameWangpengxu) {
			count += player.skillTempList.length;
		}
	}
	return count;
}

// 统计宠物数量
function baseEffectCountPets(player) {
	var count = 0;
	if (player.hp != 0) {

		if (player.pet_FengMonster != null)
			count++;
		if (player.pet_LeiMonster != null)
			count++;
		if (player.pet_ShuiMonster != null)
			count++;
		if (player.pet_HuoMonster != null)
			count++;
		if (player.pet_TuMonster != null)
			count++;

	}
	return count;
}

// 得到某角色战力最高的一个宠物（当有多个宠物战力相同时，需要玩家选择一个）
function getMaxCombatPet(player,callBack){
	var petList=[];
	if (player.pet_FengMonster != null)
		petList.push(player.pet_FengMonster);
	if (player.pet_LeiMonster != null)
		petList.push(player.pet_LeiMonster);
	if (player.pet_ShuiMonster != null)
		petList.push(player.pet_ShuiMonster);
	if (player.pet_HuoMonster != null)
		petList.push(player.pet_HuoMonster);
	if (player.pet_TuMonster != null)
		petList.push(player.pet_TuMonster);
	var maxCombat=0;
	var maxCombatPetList=[];
	for(var i=0;i<petList.length;i++){
		if(petList[i].combat>=maxCombat){
			maxCombat=petList[i].combat;
			maxCombatPetList.push(petList[i]);
		}
	}
	var maxCombatPet=maxCombatPetList[0];
	if(maxCombatPetList.length>1){
		var petsUid=[];
		for(var i=0;i<maxCombatPetList.length;i++){
			petsUid.push(maxCombatPetList[i].uid);
		}
		addDialog(mainScene, new selectMonsterDialogLayer("请选择1个宠物",petsUid,function(monster){
			maxCombatPet=monster;
			callBack(maxCombatPet);
		}));
	}else{
		callBack(maxCombatPet);
	}
}

// 装备武器
function baseEffectZhuangbeiArms(player,select, combat, extent,name,callBack) {
	if (select == 1) {
		if (player.arms1!=Text.nil) {
			remove_Card_Into_DropDeck(player.arms1);
			player.tempZhuangbeiSkillCombat=0;
			player.tempZhuangbeiSkillExtent=0;
		}
		player.arms1 = name;
		player.arms1Combat = combat;
		player.arms1Extent = extent;
	} else if (select == 2) {
		if (player.arms2!=Text.nil) {
			remove_Card_Into_DropDeck(player.arms2);
		}
		player.arms2 = name;
		player.arms2Combat = combat;
		player.arms2Extent = extent;
	}
	// 判断邪剑仙宠物效果
	if (skillXiejianxian_HasXiejianxian(player)) {
		skillXiejianxianXiejianxianPetEffect(player);
	}
	skillCharacter_LinyueruLinjiajianfa(player);
	skillCharacters_JiujianxianYujianshu(player);
	if(callBack!=null){
		callBack();
	}
}


// adv装备武器
function advBaseEffectZhuangbeiArms(player,select, combat, extent,name,callBack) {
	if (select == 1) {
		if (player.arms1!=Text.nil) {
			advRemove_Card_Into_DropDeck(player.arms1);
			player.tempZhuangbeiSkillCombat==0;
			player.tempZhuangbeiSkillExtent=0;
		}
		if(player._name==boss._name){
			monsterCombat-=player.combat;
		}
		player.arms1 = name;
		player.arms1Combat = combat;
		player.arms1Extent = extent;
	} else if (select == 2) {
		if (player.arms2!=Text.nil) {
			advRemove_Card_Into_DropDeck(player.arms2);
		}
		player.arms2 = name;
		player.arms2Combat = combat;
		player.arms2Extent = extent;
	}
	advSkillCharacter_LinyueruLinjiajianfa(player);
	advSkillCharacters_JiujianxianYujianshu(player);
	// 判断邪剑仙宠物效果
	if (skillXiejianxian_HasXiejianxian(player)) {
		skillXiejianxianXiejianxianPetEffect(player);
	}else if(player._name==boss._name){
		monsterCombat+=player.combat;
	}
	if(callBack!=null){
		callBack();
	}
}

// 装备防具
function baseEffectZhuangbeiDefenses(player,combat,extent, name,callBack) {
	if (player.defense!=Text.nil) {
		advRemove_Card_Into_DropDeck(player.defense);
	}
	player.defense = name;
	player.defenseCombat = combat;
	player.defenseExtent = extent;
	if(name==string_handCardNameTiangangdouyi){
		textAreaAddMessage(Text.tiangangdouyiEffect, myText, listView);
		player.hp=player.maxHP
	}
	if(callBack!=null){
		callBack();
	}
}

// 消灭宠物
function baseEfectPerishPet(pet_Shuxing,selectPlayer) {
	if (pet_Shuxing==Text.natureFeng) {
		updata_PetsEffect(selectPlayer.pet_FengMonster,selectPlayer);
		selectPlayer.pet_Feng = Text.petFeng;
		selectPlayer.pet_FengMonster = null;
	} else if (pet_Shuxing==Text.natureLei) {
		updata_PetsEffect(selectPlayer.pet_LeiMonster,selectPlayer);
		selectPlayer.pet_Lei = Text.petLei;
		selectPlayer.pet_LeiMonster = null;
	} else if (pet_Shuxing==Text.natureShui) {
		updata_PetsEffect(selectPlayer.pet_ShuiMonster,selectPlayer);
		selectPlayer.pet_Shui = Text.petShui;
		selectPlayer.pet_ShuiMonster = null;
	} else if (pet_Shuxing==Text.natureHuo) {
		updata_PetsEffect(selectPlayer.pet_HuoMonster,selectPlayer);
		selectPlayer.pet_Huo = Text.petHuo;
		selectPlayer.pet_HuoMonster = null;
	} else if (pet_Shuxing==Text.natureTu) {
		updata_PetsEffect(selectPlayer.pet_TuMonster,selectPlayer);
		selectPlayer.pet_Tu = Text.petTu;
		selectPlayer.pet_TuMonster = null;
	}
}



// 驯化效果，交换宠物
function baseEffectChangepets(player1, player2,
		pet_Shuxing) {
	cc.log(pet_Shuxing);
	var tempPetName = null;
	var tempMonster = null;
	if (pet_Shuxing==Text.natureFeng) {
		tempPetName = player1.pet_Feng;
		// 先对Player1的信息进行更新
		updata_PetsEffect(player1.pet_FengMonster, player1);
		if (player1.pet_FengMonster != null) {
			tempMonster = player1.pet_FengMonster;
			zixuan_ShenshengEnd(player1,tempMonster);
		}
		player1.pet_Feng = player2.pet_Feng;
		player1.pet_FengMonster = player2.pet_FengMonster;
		if (player2.pet_FengMonster != null) {
			pet_Effect(player1.pet_FengMonster, player1);
			zixuan_ShenshengEnd(player1,player1.pet_FengMonster);
		}
		// 再对player2的信息进行更新
		updata_PetsEffect(player2.pet_FengMonster, player2);
		player2.pet_Feng = tempPetName;
		player2.pet_FengMonster = tempMonster;
		if (player2.pet_FengMonster != null) {
			pet_Effect(player2.pet_FengMonster, player2);
			zixuan_ShenshengEnd(player2,player2.pet_FengMonster);
		}
	} else if (pet_Shuxing==Text.natureLei) {
		tempPetName = player1.pet_Lei;
		// 先对Player1的信息进行更新
		updata_PetsEffect(player1.pet_LeiMonster, player1);
		if (player1.pet_LeiMonster != null) {
			tempMonster = player1.pet_LeiMonster;
			zixuan_ShenshengEnd(player1,tempMonster);
		}
		player1.pet_Lei = player2.pet_Lei;
		player1.pet_LeiMonster = player2.pet_LeiMonster;
		if (player2.pet_LeiMonster != null) {
			pet_Effect(player1.pet_LeiMonster, player1);
			zixuan_ShenshengEnd(player1,player1.pet_LeiMonster);
		}
		// 再对player2的信息进行更新
		updata_PetsEffect(player2.pet_LeiMonster, player2);
		player2.pet_Lei = tempPetName;
		player2.pet_LeiMonster = tempMonster;
		if (player2.pet_LeiMonster != null) {
			pet_Effect(player2.pet_LeiMonster, player2);
			zixuan_ShenshengEnd(player2,player2.pet_LeiMonster);
		}
	} else if (pet_Shuxing==Text.natureShui) {
		tempPetName = player1.pet_Shui;
		// 先对Player1的信息进行更新
		updata_PetsEffect(player1.pet_ShuiMonster, player1);
		if (player1.pet_ShuiMonster != null) {
			tempMonster = player1.pet_ShuiMonster;
			zixuan_ShenshengEnd(player1,tempMonster);
			// Skill_Characters.zixuan_ShenshengEnd(player1,tempMonster);
		}
		player1.pet_Shui = player2.pet_Shui;
		player1.pet_ShuiMonster = player2.pet_ShuiMonster;
		if (player2.pet_ShuiMonster != null) {
			pet_Effect(player1.pet_ShuiMonster, player1);
			zixuan_ShenshengEnd(player1,player1.pet_ShuiMonster);
		}
		// 再对player2的信息进行更新
		updata_PetsEffect(player2.pet_ShuiMonster, player2);
		player2.pet_Shui = tempPetName;
		player2.pet_ShuiMonster = tempMonster;
		if (player2.pet_ShuiMonster != null) {
			pet_Effect(player2.pet_ShuiMonster, player2);
			zixuan_ShenshengEnd(player2,player2.pet_ShuiMonster);
		}
	} else if (pet_Shuxing==Text.natureHuo) {
		updata_PetsEffect(player1.pet_HuoMonster, player1);
		tempPetName = player1.pet_Huo;
		if (player1.pet_HuoMonster != null) {
			tempMonster = player1.pet_HuoMonster;
			zixuan_ShenshengEnd(player1,tempMonster);
		}
		// 先对Player1的信息进行更新
		player1.pet_Huo = player2.pet_Huo;
		player1.pet_HuoMonster = player2.pet_HuoMonster;
		if (player2.pet_HuoMonster != null) {
			pet_Effect(player1.pet_HuoMonster, player1);
			zixuan_ShenshengEnd(player1,player1.pet_HuoMonster);
		}
		// 再对player2的信息进行更新
		updata_PetsEffect(player2.pet_HuoMonster, player2);
		player2.pet_Huo = tempPetName;
		player2.pet_HuoMonster = tempMonster;
		if (player2.pet_HuoMonster != null) {
			pet_Effect(player2.pet_HuoMonster, player2);
			zixuan_ShenshengEnd(player2,player2.pet_HuoMonster);
		}
	} else if (pet_Shuxing==Text.natureTu) {
		tempPetName = player1.pet_Tu;
		// 先对Player1的信息进行更新
		updata_PetsEffect(player1.pet_TuMonster, player1);
		if (player1.pet_TuMonster != null) {
			tempMonster = player1.pet_TuMonster;
			zixuan_ShenshengEnd(player1,tempMonster);
		}
		player1.pet_Tu = player2.pet_Tu;
		player1.pet_TuMonster = player2.pet_TuMonster;
		if (player2.pet_TuMonster != null) {
			pet_Effect(player1.pet_TuMonster, player1);
			zixuan_ShenshengEnd(player1,player1.pet_TuMonster);
		}
		// 再对player2的信息进行更新
		updata_PetsEffect(player2.pet_TuMonster, player2);
		player2.pet_Tu = tempPetName;
		player2.pet_TuMonster = tempMonster;
		if (player2.pet_TuMonster != null) {
			pet_Effect(player2.pet_TuMonster, player2);
			zixuan_ShenshengEnd(player2,player2.pet_TuMonster);
		}
	}
}

// 随机得到死亡角色的一名存活队友
function getLivePlayerRandom(player) {
	var tempList = new Array();
	for (var i=0;i<player.friendList.length;i++) {
		if (player.friendList[i].hp>0) {
			tempList.push(player.friendList[i]);
		}
	}
	return tempList[parseInt(Math.random()*tempList.length, 10)];
}


// 判断某角色手牌中特定种类的牌有多少张
function baseEffectHaveHowManyCardOfType(player, cardType) {
	var number = 0;
	if (player.hp > 0) {
		for (var i=0;i<player.handCard.length;i++) {
			if (player.handCard[i].cardType==cardType) {
				number++;
			}
		}
	}
	return number;
}


// 随机得到某角色的一张指定类型的手牌
function baseEffectGetCardOfType(player, cardType) {
	var tempHandCards = new Array();
	for (var i=0;i<player.handCard.length;i++) {
		if (player.handCard[i].cardType==cardType) {
			tempHandCards.push(player.handCard[i]);
		}
	}
	return tempHandCards[parseInt(Math.random()*tempHandCards.length, 10)];
}

// 随机得到某角色的一张除指定类型以外的手牌
function baseEffectGetCardExpectOfType(player, cardType) {
	var tempHandCards = new Array();
	for (var i=0;i<player.handCard.length;i++) {
		if (player.handCard[i].cardType!=cardType) {
			tempHandCards.push(player.handCard[i]);
		}
	}
	return tempHandCards[parseInt(Math.random()*tempHandCards.length, 10)];
}

// 随机得到敌方一名存活角色
function baseEffectGetPlayerFromEnemy(player) {
	var tempList = new Array();
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (!player1IsPlayer2Friend(nowPlayerTerm[i], player)) {
			tempList.push(nowPlayerTerm[i]);
		}
	}
	return tempList[parseInt(Math.random()*tempList.length, 10)];
}



// 计算存活角色数量
function baseEffectCountLivePlayer() {
	var livePlayer = 0;
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp > 0) {
			livePlayer++;
		}
	}
	return livePlayer;
}


function getArmCardWithName(deadPlayer,armsNumber){
	var card=null;
	var	string="deadPlayer.arms"+armsNumber;
	string=eval(string);
	string=string.replaceAll("\\(扣置\\)");
	cc.log(string);
	switch(string){
	case string_handCardNameMojian:
		card= randomGetHandCard(47)
		break;
	case string_handCardNameCaihuan:
		card= randomGetHandCard(48)
		break;
	case string_handCardNameModaotianzha:
		card= randomGetHandCard(49)
		break;
	case string_handCardNameTianshezhang:
		card= randomGetHandCard(50)
		break;
	case string_handCardNameWuchenjian:
		card= randomGetHandCard(51)
		break;
	}
	return card;
}

function getDefenseCardWithName(deadPlayer){
	var card=null;
	switch(deadPlayer.defense){
	case string_handCardNameTiandijifu:
		card= randomGetHandCard(52);
		break;
	case string_handCardNameQiankundaopao:
		card= randomGetHandCard(53);
		break;
	case string_handCardNameWucaixiayi:
		card= randomGetHandCard(54);
		break;
	case string_handCardNameTayunxue:
		card= randomGetHandCard(55);
		break;
	case string_handCardNameLonghunzhankai:
		card= randomGetHandCard(56);
		break;
	}
	return card;
}



function useAnyTimeSkill(callBack){
	skillCharacters_WangpengxuHechengshipin(function(){
		skillCharacters_XiaomanLianyao(function(){
			callBack();
		});
	});
}

function advUseAnyTimeSkill(callBack){
	advSkillCharacters_WangpengxuHechengshipin(function(){
		advSkillCharacters_XiaomanLianyao(function(){
			callBack();
		});
	});
}


// 随机得到敌方一名存活角色
function getPlayerFromEnemy(player) {
	var tempList = new Array();
	for (var i=0;i<nowPlayerTerm.length;i++) {
		if (nowPlayerTerm[i].hp>0&&!player1IsPlayer2Friend(nowPlayerTerm[i], player)) {
			tempList.push(nowPlayerTerm[i]);
		}
	}
	return tempList[parseInt(Math.random()*tempList.length, 10)];
}

// 随机得到指定存活角色的一名存活队友
function randomGetLivePlayerFriend(player) {
	var tempList = new Array();
	for (var i=1;i<player.friendList.length;i++) {
		if (player.friendList[i].hp>0) {
			tempList.push(player.friendList[i]);
		}
	}
	return tempList[parseInt(Math.random()*tempList.length, 10)];
}

// 得到一个随机的结果
function getRandomResult() {
	var result = false;
	if (Math.random()> 0.5) {
		result = true;
	}
	return result;
}


function handleBaofaEqumentsAndPets(player){
	if(player.arms1.endsWith(Text.baofa)){
		remove_Card_Into_DropDeck(player.arms1);
		player.arms1 = Text.nil;
		player.arms1Combat = 0;
		player.arms1Extent = 0;
		player.tempZhuangbeiSkillCombat=0;
		player.tempZhuangbeiSkillExtent=0;
	}
	if(player.arms2.endsWith(Text.baofa)){
		cc.log(player.arms2);
		remove_Card_Into_DropDeck(player.arms2);
		player.arms2 = Text.nil;
		player.arms2Combat = 0;
		player.arms2Extent = 0;
	}
	if(player.defense.endsWith(Text.baofa)){
		remove_Card_Into_DropDeck(player.defense);
		player.defense = Text.nil;
		player.defenseCombat = 0;
		player.defenseExtent = 0;
	}
	if(player.pet_FengMonster!=null&&player.pet_FengMonster.name.endsWith(Text.baofa)){
		updata_PetsEffect(player.pet_FengMonster,player);
		player.pet_FengMonster = null;
		player.pet_Feng = Text.petFeng;
		skillCharacters_ZhaolingerMengshe();
	}
	if(player.pet_HuoMonster!=null&&player.pet_HuoMonster.name.endsWith(Text.baofa)){
		updata_PetsEffect(player.pet_HuoMonster,player);
		player.pet_HuoMonster = null;
		player.pet_Huo = Text.petHuo;
		skillCharacters_ZhaolingerMengshe();
	}
}

function advHandleBaofaEqumentsAndPets(player){
	if(player.arms1.endsWith(Text.baofa)){
		remove_Card_Into_DropDeck(player.arms1);
		player.arms1 = Text.nil;
		player.arms1Combat = 0;
		player.arms1Extent = 0;
		player.tempZhuangbeiSkillCombat=0;
		player.tempZhuangbeiSkillExtent=0;
	}
	if(player.arms2.endsWith(Text.baofa)){
		remove_Card_Into_DropDeck(player.arms2);
		player.arms2 = Text.nil;
		player.arms2Combat = 0;
		player.arms2Extent = 0;
	}
	if(player.defense.endsWith(Text.baofa)){
		remove_Card_Into_DropDeck(player.defense);
		player.defense = Text.nil;
		player.defenseCombat = 0;
		player.defenseExtent = 0;
	}
	if(player.pet_FengMonster!=null&&player.pet_FengMonster.name.endsWith(Text.baofa)){
		updata_PetsEffect(player.pet_FengMonster,player);
		player.pet_FengMonster = null;
		player.pet_Feng = Text.petFeng;
		advSkillCharacters_ZhaolingerMengshe();
	}
	if(player.pet_HuoMonster!=null&&player.pet_HuoMonster.name.endsWith(Text.baofa)){
		updata_PetsEffect(player.pet_HuoMonster,player);
		player.pet_HuoMonster = null;
		player.pet_Huo = Text.petHuo;
		advSkillCharacters_ZhaolingerMengshe();
	}
}


// 消灭宠物
function perishPet(pet_Shuxing,selectPlayer) {
	if (pet_Shuxing==Text.natureFeng) {
		updata_PetsEffect(selectPlayer.pet_FengMonster,
				selectPlayer);
		selectPlayer.pet_Feng = Text.petFeng;
		selectPlayer.pet_FengMonster = null;
	} else if (pet_Shuxing==Text.natureLei) {
		updata_PetsEffect(selectPlayer.pet_LeiMonster,
				selectPlayer);
		selectPlayer.pet_Lei = Text.petLei;
		selectPlayer.pet_LeiMonster = null;
	} else if (pet_Shuxing==Text.natureShui) {
		updata_PetsEffect(selectPlayer.pet_ShuiMonster,
				selectPlayer);
		selectPlayer.pet_Shui = Text.petShui;
		selectPlayer.pet_ShuiMonster = null;
	} else if (pet_Shuxing==Text.natureHuo) {
		updata_PetsEffect(selectPlayer.pet_HuoMonster,
				selectPlayer);
		selectPlayer.pet_Huo = Text.petHuo;
		selectPlayer.pet_HuoMonster = null;
	} else if (pet_Shuxing==Text.natureTu) {
		updata_PetsEffect(selectPlayer.pet_TuMonster,
				selectPlayer);
		selectPlayer.pet_Tu = Text.petTu;
		selectPlayer.pet_TuMonster = null;
	}
}

// 保存新获得的角色id到本地存档文件中
function saveNewCharacterIdToLocalStorage(player){
	characterIdListSave+=","+player._ID.toString();
	cc.sys.localStorage.setItem("characterIdList",characterIdListSave);
}

// 保存当前可直接进入的关卡id
function saveNewStageIdToLocalStorage(id){
	cc.sys.localStorage.setItem("stageId",id);
}
// 保存仙宝到本地
function saveXianbaoCardToStorage(xianbaoName){
	cc.sys.localStorage.setItem(xianbaoName,"true");
}

// 读取关卡信息
function loadGameSave(){
	stageIdSave=cc.sys.localStorage.getItem("stageId")||"1_2";
	// stageIdSave="2_1";
	haveTiangangdouyi=cc.sys.localStorage.getItem("tiangangdouyi")||"false";
	haveShiziyaoshuo=cc.sys.localStorage.getItem("shiziyaoshuo")||"false";
	if(stageIdSave=="1_1"){
		characterIdListSave="1,2,3,4";
		cc.sys.localStorage.setItem("characterIdList",characterIdListSave);
	}else if(stageIdSave=="2_1"){
		characterIdListSave="27,28,23,24";
		cc.sys.localStorage.setItem("characterIdList",characterIdListSave);
	}else{
		characterIdListSave=cc.sys.localStorage.getItem("characterIdList")||"1,2,3,4";
	}
	var tempList=characterIdListSave.split(",");
	for(var i=0;i<tempList.length;i++){
		canUseCharacterList.push(parseInt(tempList[i]));
	}
	nowStage=stageManager(stageIdSave);
}

function restartLocalStorgae(){
	cc.sys.localStorage.setItem("stageId","1_1");
	cc.sys.localStorage.removeItem("tiangangdouyi");
	cc.sys.localStorage.removeItem("shiziyaoshuo");
	cc.sys.localStorage.removeItem("characterIdList");
}

// 十字妖槊的特殊效果
function shiziyaoshuoAddCombatEffect(callBack){
	var player=null;
	for(var i=0;i<nowPlayerTerm.length;i++){
		if(nowPlayerTerm[i].hp>0&&(nowPlayerTerm[i].arms1==string_handCardNameShiziyaoshuo||nowPlayerTerm[i].arms2==string_handCardNameShiziyaoshuo)&&nowPlayerTerm[i].joinAttack){
			player=nowPlayerTerm[i];
			break;
		}
	}
	if(player!=null){
		triggerCombat+=1;
		textAreaAddMessage(Text.shiziyaoshuoEffect, myText, listView, callBack);
	}else{
		callBack();
	}
}



