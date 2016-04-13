var AdvDuniangziMonster=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameDuniangzi;
		this.ID = 0;
		this.combat = 7;
		this.dodge = 5;
		this.finalMark = 7;
		this.openEffectText = Text.nil;
		this.winEffectText = Text.duniangziWinEffectText;
		this.loseEffectText = Text.duniangziLoseEffectText;
		this.petEffectText = Text.duniangziPetEffectText;
		this.nature = Text.natureLei;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = res.monster_duniangzi;
		this.level = Text.petLevelBoss;
	},
	haveMostEqumentPlayerDropEqumentHelper:function(playerList,startPlayer,nowPlayer,callBack){
		var temp=this;
		var nextNumber=0;
		for(var i=0;i<playerList.length;i++){
			if(playerList[i]._name==nowPlayer._name){
				nextNumber=i;
				break;
			}
		}
		nextNumber++;
		nextNumber%=playerList.length;
		if (nowPlayer._name==myControlPlayer._name) {
			addDialog(mainScene, new selectEqumentDialogLayer(Text.chooseDropEqument,nowPlayer,function(result){
				if(result==SelectCardType.ARMS1){
					textAreaAddMessage(Text.dropArm.format(nowPlayer._name,nowPlayer.arms1), myText, listView);
					sleep(function(){
						remove_Card_Into_DropDeck(nowPlayer.arms1);
						nowPlayer.arms1Combat = 0;
						nowPlayer.arms1Extent = 0;
						nowPlayer.arms1 = Text.nil;
						if(playerList[nextNumber]._name!=startPlayer._name){
							temp.haveMostEqumentPlayerDropEqumentHelper(playerList,startPlayer,playerList[nextNumber],callBack);
						}else if(callBack!=null){
							callBack();
						}
					});
				}else if(result==SelectCardType.ARMS2){
					textAreaAddMessage(Text.dropArm.format(nowPlayer._name,nowPlayer.arms2), myText, listView);
					sleep(function(){
						remove_Card_Into_DropDeck(nowPlayer.arms2);
						nowPlayer.arms2Combat = 0;
						nowPlayer.arms2Extent = 0;
						nowPlayer.arms2 = Text.nil;
						if(playerList[nextNumber]._name!=startPlayer._name){
							temp.haveMostEqumentPlayerDropEqumentHelper(playerList,startPlayer,playerList[nextNumber],callBack);
						}else if(callBack!=null){
							callBack();
						}
					});
				}else if(result==SelectCardType.DEFENSE){
					textAreaAddMessage(Text.dropDefense.format(nowPlayer._name,nowPlayer.defense), myText, listView);
					sleep(function(){
						remove_Card_Into_DropDeck(nowPlayer.defense);
						nowPlayer.defenseCombat = 0;
						nowPlayer.defenseExtent = 0;
						nowPlayer.defense = Text.nil;
						if(playerList[nextNumber]._name!=startPlayer._name){
							temp.haveMostEqumentPlayerDropEqumentHelper(playerList,startPlayer,playerList[nextNumber],callBack);
						}else if(callBack!=null){
							callBack();
						}
					});
				}else if(result==SelectCardType.ORNAMENT){
					addDialog(mainScene,new selectCardDialogLayer(Text.chooseDropOrnament,nowPlayer.skillTempList,1,1,false,function(result){
						var card=result.pop();
						textAreaAddMessage(Text.dropOrnament.format(nowPlayer.name,card.name), myText, listView);
						sleep(function(){
							remove_Card_Into_DropDeck(card.name);
							nowPlayer.skillTempList.removeObject(card);
							nowPlayer.maxCombat--;
							if(playerList[nextNumber]._name!=startPlayer._name){
								temp.haveMostEqumentPlayerDropEqumentHelper(playerList,startPlayer,playerList[nextNumber],callBack);
							}else if(callBack!=null){
								callBack();
							}
						});
					}));
				}
			}));
		} else {
			// AI处理丢弃装备
			baseAIDropEquipment(nowPlayer);
			if(playerList[nextNumber]._name!=startPlayer._name){
				temp.haveMostEqumentPlayerDropEqumentHelper(playerList,startPlayer,playerList[nextNumber],callBack);
			}else if(callBack!=null){
				callBack();
			}
		}
	},
	haveMostEqumentPlayerDropEqument:function(callBack){
		// 场上装备数量最多的角色各损失1个装备
		var MAXnumber = baseEffectCountequment(nowPlayerTerm[nowPlayerNumber]);
		var dropEqumentsPlayerList=new Array();
		for (var i = 0; i < nowPlayerTerm.length; i++) {
			var tempNumber=baseEffectCountequment(nowPlayerTerm[i]);
			MAXnumber=MAXnumber<tempNumber?tempNumber:MAXnumber;
		}
		if (MAXnumber == 0) {
			textAreaAddMessage(Text.allPlayerHaveNoEqumentToDrop, myText, listView,callBack);
		} else {
			for (var i=0;i<nowPlayerTerm.length;i++) {
				if (MAXnumber == baseEffectCountequment(nowPlayerTerm[i])) {
					dropEqumentsPlayerList.push(nowPlayerTerm[i]);
				}
			}
			this.haveMostEqumentPlayerDropEqumentHelper(dropEqumentsPlayerList,dropEqumentsPlayerList[0],dropEqumentsPlayerList[0],callBack);
		}
	},
	realWinEffect:function(callBack){
		// player1为触发者时的处理
		if (nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name) {
			var canUseEffect=true;
			if(baseEffectCountequment(nowPlayerTerm[nowPlayerNumber])+
					nowPlayerTerm[nowPlayerNumber].handCard.length==0){
				canUseEffect=false;
			}
			if(canUseEffect){
				addDialog(mainScene, new duniangziDialogLayer(nowPlayerTerm[nowPlayerNumber],function(result){
					textAreaAddMessage(Text.duniangziWinEffectHanleEnd, myText, listView,callBack);
				}));
			}else{
				textAreaAddMessage(Text.monsterOpenEffectInvalid.format(this.name), myText, listView,callBack);
			}
		}
		// 当AI为触发者时的处理
		else {
			textAreaAddMessage(Text.duniangziWinEffectCancel.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView,callBack);
		}
	},
	realLoseEffect:function(callBack){
		var temp=this;
		if(baseEffectCountequment(nowPlayerTerm[nowPlayerNumber])==0){
			textAreaAddMessage(Text.haveNoEqumentToDrop.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView);
			sleep(function(){
				temp.haveMostEqumentPlayerDropEqument(callBack);
			});
		}else {
			// 当前玩家为player1时 的处理
			if (nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name) {
				addDialog(mainScene, new selectEqumentDialogLayer(Text.chooseDropEqument,nowPlayerTerm[nowPlayerNumber],function(result){
					var dropOrnament=false;
					if(result==SelectCardType.ARMS1){
						textAreaAddMessage(Text.dropArm.format(nowPlayerTerm[nowPlayerNumber]._name,nowPlayerTerm[nowPlayerNumber].arms1), myText, listView);
						remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].arms1);
						nowPlayerTerm[nowPlayerNumber].arms1Combat = 0;
						nowPlayerTerm[nowPlayerNumber].arms1Extent = 0;
						nowPlayerTerm[nowPlayerNumber].arms1 = Text.nil;
					}else if(result==SelectCardType.ARMS2){
						textAreaAddMessage(Text.dropArm.format(nowPlayerTerm[nowPlayerNumber]._name,nowPlayerTerm[nowPlayerNumber].arms2), myText, listView);
						remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].arms2);
						nowPlayerTerm[nowPlayerNumber].arms2Combat = 0;
						nowPlayerTerm[nowPlayerNumber].arms2Extent = 0;
						nowPlayerTerm[nowPlayerNumber].arms2 = Text.nil;
					}else if(result==SelectCardType.DEFENSE){
						textAreaAddMessage(Text.dropDefense.format(nowPlayerTerm[nowPlayerNumber]._name,nowPlayerTerm[nowPlayerNumber].defense), myText, listView);
						remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].defense);
						nowPlayerTerm[nowPlayerNumber].defenseCombat = 0;
						nowPlayerTerm[nowPlayerNumber].defenseExtent = 0;
						nowPlayerTerm[nowPlayerNumber].defense = Text.nil;
					}else if(result==SelectCardType.ORNAMENT){
						dropOrnament=true;
					}
					if(dropOrnament){
						addDialog(mainScene,new selectCardDialogLayer(Text.chooseDropOrnament,nowPlayerTerm[nowPlayerNumber].skillTempList,1,1,false,function(result){
							var card=result.pop();
							textAreaAddMessage(Text.dropOrnament.format(nowPlayerTerm[nowPlayerNumber]._name,card.name), myText, listView);
							remove_Card_Into_DropDeck(card.name);
							nowPlayerTerm[nowPlayerNumber].skillTempList.removeObject(card);
							nowPlayerTerm[nowPlayerNumber].maxCombat--;
							temp.haveMostEqumentPlayerDropEqument(callBack);
						}));
					}else{
						temp.haveMostEqumentPlayerDropEqument(callBack);
					}
				}));
			} else {
				// AI处理弃掉武器or防具
				baseAIDropEquipment(nowPlayerTerm[nowPlayerNumber]);
				temp.haveMostEqumentPlayerDropEqument(callBack);
			}
		}
	},
	petEffect:function(player){
		player.petsExtent += 2;
	},
	updatePetEffect:function(player){
		player.petsExtent -= 2;
		if (player.petsCombat < 0)
			player.petsCombat = 0;
	}
})