var DuniangziMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameDuniangzi;
		this.ID = 0;
		this.combat = 7;
		this.dodge = 5;
		this.finalMark = 7;
		this.openEffectText = "无";
		this.winEffectText = "您可以放弃若干张手牌或装备，每放弃1张，您的HP+2";
		this.loseEffectText = "您损失1个装备，之后场上装备最多的角色各损失1个装备";
		this.petEffectText = "主人命中+2";
		this.nature = "雷";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_duniangzi;
		this.level = "BOSS";
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
		if (nowPlayer._name==player1._name) {
			addDialog(mainScene, new selectEqumentDialogLayer("请选择丢弃的装备",nowPlayer,function(result){
				if(result==SelectCardType.ARMS1){
					textAreaAddMessage(nowPlayer._name+"弃置武器："+nowPlayer.arms1, myText, listView);
					remove_Card_Into_DropDeck(nowPlayer.arms1);
					nowPlayer.arms1Combat = 0;
					nowPlayer.arms1Extent = 0;
					nowPlayer.arms1 = "无";
					if(playerList[nextNumber]._name!=startPlayer._name){
						temp.haveMostEqumentPlayerDropEqumentHelper(playerList,startPlayer,playerList[nextNumber],callBack);
					}else if(callBack!=null){
						callBack();
					}
				}else if(result==SelectCardType.ARMS2){
					textAreaAddMessage(nowPlayer._name+"弃置武器："+nowPlayer.arms2, myText, listView);
					remove_Card_Into_DropDeck(nowPlayer.arms2);
					nowPlayer.arms2Combat = 0;
					nowPlayer.arms2Extent = 0;
					nowPlayer.arms2 = "无";
					if(playerList[nextNumber]._name!=startPlayer._name){
						temp.haveMostEqumentPlayerDropEqumentHelper(playerList,startPlayer,playerList[nextNumber],callBack);
					}else if(callBack!=null){
						callBack();
					}
				}else if(result==SelectCardType.DEFENSE){
					textAreaAddMessage(nowPlayer._name+"弃置防具："+nowPlayer.defense, myText, listView);
					remove_Card_Into_DropDeck(nowPlayer.defense);
					nowPlayer.defenseCombat = 0;
					nowPlayer.defenseExtent = 0;
					nowPlayer.defense = "无";
					if(playerList[nextNumber]._name!=startPlayer._name){
						temp.haveMostEqumentPlayerDropEqumentHelper(playerList,startPlayer,playerList[nextNumber],callBack);
					}else if(callBack!=null){
						callBack();
					}
				}else if(result==SelectCardType.ORNAMENT){
					addDialog(mainScene,new selectCardDialogLayer("请选择丢弃的饰品",nowPlayer.skillTempList,1,1,false,function(result){
						var card=result.pop();
						textAreaAddMessage("王蓬絮丢弃饰品【"+card.name+"】", myText, listView);
						remove_Card_Into_DropDeck(card.name);
						nowPlayer.skillTempList.removeObject(card);
						nowPlayer.maxCombat--;
						if(playerList[nextNumber]._name!=startPlayer._name){
							temp.haveMostEqumentPlayerDropEqumentHelper(playerList,startPlayer,playerList[nextNumber],callBack);
						}else if(callBack!=null){
							callBack();
						}
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
			textAreaAddMessage("场上角色无装备可弃", myText, listView);
			if(callBack!=null){
				callBack();
			}
		} else {
			for (var i=0;i<nowPlayerTerm.length;i++) {
				if (MAXnumber == baseEffectCountequment(nowPlayerTerm[i])) {
					dropEqumentsPlayerList.push(nowPlayerTerm[i]);
				}
			}
			this.haveMostEqumentPlayerDropEqumentHelper(dropEqumentsPlayerList,dropEqumentsPlayerList[0],dropEqumentsPlayerList[0],callBack);
		}
	},
	winEffect:function(callBack){
		this._super();
		// player1为触发者时的处理
		if (nowPlayerTerm[nowPlayerNumber]._name==player1._name) {
			var canUseEffect=true;
			if(baseEffectCountequment(nowPlayerTerm[nowPlayerNumber])+
					nowPlayerTerm[nowPlayerNumber].handCard.length==0){
				canUseEffect=false;
			}
			if(canUseEffect){
				addDialog(mainScene, new duniangziDialogLayer(nowPlayerTerm[nowPlayerNumber],function(result){
					textAreaAddMessage("毒娘子胜利结算处理完毕", myText, listView);
					if(callBack!=null){
						callBack();
					}
				}));
			}else{
				textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"无装备和手牌，毒娘子胜利结算无效", myText, listView,callBack);
			}
		}
		// 当AI为触发者时的处理
		else {
			textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"放弃执行效果", myText, listView,callBack);
		}
	},
	loseEffect:function(callBack){
		var temp=this;
		this._super();
		if(baseEffectCountequment(nowPlayerTerm[nowPlayerNumber])==0){
			textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"没有装备可弃", myText, listView);
			temp.haveMostEqumentPlayerDropEqument(callBack);
		}else {
			// 当前玩家为player1时 的处理
			if (nowPlayerTerm[nowPlayerNumber]._name==player1._name) {
				addDialog(mainScene, new selectEqumentDialogLayer("请选择丢弃的装备",nowPlayerTerm[nowPlayerNumber],function(result){
					var dropOrnament=false;
					if(result==SelectCardType.ARMS1){
						textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"弃置武器："+nowPlayerTerm[nowPlayerNumber].arms1, myText, listView);
						remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].arms1);
						nowPlayerTerm[nowPlayerNumber].arms1Combat = 0;
						nowPlayerTerm[nowPlayerNumber].arms1Extent = 0;
						nowPlayerTerm[nowPlayerNumber].arms1 = "无";
					}else if(result==SelectCardType.ARMS2){
						textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"弃置武器："+nowPlayerTerm[nowPlayerNumber].arms2, myText, listView);
						remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].arms2);
						nowPlayerTerm[nowPlayerNumber].arms2Combat = 0;
						nowPlayerTerm[nowPlayerNumber].arms2Extent = 0;
						nowPlayerTerm[nowPlayerNumber].arms2 = "无";
					}else if(result==SelectCardType.DEFENSE){
						textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"弃置防具："+nowPlayerTerm[nowPlayerNumber].defense, myText, listView);
						remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].defense);
						nowPlayerTerm[nowPlayerNumber].defenseCombat = 0;
						nowPlayerTerm[nowPlayerNumber].defenseExtent = 0;
						nowPlayerTerm[nowPlayerNumber].defense = "无";
					}else if(result==SelectCardType.ORNAMENT){
						dropOrnament=true;
					}
					if(dropOrnament){
						addDialog(mainScene,new selectCardDialogLayer("请选择丢弃的饰品",nowPlayerTerm[nowPlayerNumber].skillTempList,1,1,false,function(result){
							var card=result.pop();
							textAreaAddMessage("王蓬絮丢弃饰品【"+card.name+"】", myText, listView);
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