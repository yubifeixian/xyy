//蛇妖男死亡后变身为狐妖女 
function sheyaonanToHuyaonv(deathPlayer){
	var who=0;// 0表示未参战，1表示触发者，2表示支援者，3表示妨碍者
	if(deathPlayer.joinAttack){
		fight_Trigger[1]=deathPlayer;
	}
	textAreaAddMessage(bossNameSheyaonan+"技能触发，死亡后替换为“狐妖女”",myText,listView);
	// 将【孔璘】替换为【魔尊】
	bossCardManager(boss, 3);
	boss.hadImageView.loadTexture(boss.playerPicSrc);
}

function caiyiAddHp(player,number){
	if(player._name!=boss._name&&boss._name==bossNameCaiyi){
		textAreaAddMessage("玩家受到"+number+"点伤害，彩依Hp+"+number, myText, listView);
		for(var i=0;i<number;i++){
			baseEffectAddHP(boss)
		}
		has_Tianshezhang(boss);
	}
}

function zhenyumingwangSkill(monster,callBack){
	if(boss._name==bossNameZhenyumingwang){
		var havePet=false;
		if (monster.nature=="风"
			&&nowPlayerTerm[nowPlayerNumber].pet_FengMonster != null)
			havePet = true;
		else if (monster.nature=="雷"
			&& nowPlayerTerm[nowPlayerNumber].pet_LeiMonster != null)
			havePet = true;
		else if (monster.nature=="水"
			&& nowPlayerTerm[nowPlayerNumber].pet_ShuiMonster != null)
			havePet = true;
		else if (monster.nature=="火"
			&& nowPlayerTerm[nowPlayerNumber].pet_HuoMonster != null)
			havePet = true;
		else if (monster.nature=="土"
			&& nowPlayerTerm[nowPlayerNumber].pet_TuMonster != null)
			havePet = true;
		if (havePet) {
			textAreaAddMessage("由于镇狱明王效果，"+monster.name+"额外获得出场效果：消灭触发者同属性宠物", myText, listView, function(){
				baseEfectPerishPet(monster.nature,nowPlayerTerm[nowPlayerNumber]);
				callBack();
			});
		}
		callBack();
	}else{
		callBack();
	}
}

//callBack1:正常的卡牌效果
//callBack2:没有丢牌，无法发挥正常的卡牌效果
function dropCardXueshouDuying(player,callBack1,callBack2){
	if(boss._name==bossNameXueshouDuying){
		if(player.handCard.length>0){
			if(player._name==myControlPlayer._name){
				addDialog(mainScene, new selectCardDialogLayer("血手·毒影的效果，须额外丢弃1张手牌",player.handCard,1,1,false,function(selectCard){
					var card=selectCard.pop();
					player.handCard.removeObject(card);
					remove_Card_Into_DropDeck(card.name);
					card.removeFromParent();
					textAreaAddMessage(player._name+"额外丢弃了1张手牌:【"+card.name+"】", myText, listView, callBack1);
				}));
			}else{
				//AI选择额外丢弃1张牌
				var card=player.handCard[parseInt(Math.random()*player.handCard.length, 10)];
				player.handCard.removeObject(card);
				remove_Card_Into_DropDeck(card.name);
				textAreaAddMessage(player._name+"额外丢弃了1张手牌:【"+card.name+"】", myText, listView, callBack1);
			}
		}else{
			textAreaAddMessage(player._name+"无法额外丢弃1张手牌，此牌无效", myText, listView, callBack2);
		}
	}else{
		callBack1();
	}
}

function jiangshiliAddCombatEffect(){
	if(boss._name==bossNameJiangshili){
		boss.maxCombat++;
		textAreaAddMessage("玩家方获得宠物，魔主战力永久+1", myText, listView);
	}
}

function moyiYanshiqiongbingSkillEffect(callBack){
	if(boss._name==bossNameMoyiYanshiqiongbing&&!moyiYanshiqiongbingAddCombatMark&&(baseEffectCountPets(player1)+baseEffectCountPets(player2)+baseEffectCountPets(player3)>=5)){
		moyiYanshiqiongbingAddCombatMark=true;
		textAreaAddMessage("玩家宠物数量大于等于5，魔主战力永久变成10", myText, listView,function(){
			boss.maxCombat=10;
			callBack();
		});
	}else{
		callBack();
	}
}
