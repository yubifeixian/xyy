var WudushouMonster=BaseMonster.extend({
	ctor:function(){
		this.name = nameWudushou;
		this.ID = 0;
		this.combat = 4;
		this.dodge = 5;
		this.finalMark = 8;
		this.openEffectText = "无";
		this.winEffectText = "敌方全体HP-1后，您指定一人HP额外-2";
		this.loseEffectText = "您的HP-2，然后失去1件装备（自选）";
		this.petEffectText = "五毒兽本体战力变为8（比赛结束统计双方宠物战力时有效）";
		this.nature = "水";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_wudushou_png;
		this.level = "弱";
	},
	winEffect:function(callBack){
		this._super();
		var reduceHpList=new Array();
		var heartNumberList=new Array();
		for (var i=0;i<nowPlayerTerm.length;i++) {
			if (nowPlayerTerm[i].hp > 0
					&& !player1IsPlayer2Friend(nowPlayerTerm[i],
							nowPlayerTerm[nowPlayerNumber])) {
				if(!skillCharacters_XuanxiaoNingbingfenyan(nowPlayerTerm[i])){
					reduceHpList.push(nowPlayerTerm[i]);
					heartNumberList.push(1);
				}
			}
		}
		useYingu(reduceHpList,reduceHpList[0],reduceHpList[0],heartNumberList,true, baseEffectReduceHPEffect,function(){
			// 唐雪见【追打】技能
			skillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				var selectPlayer = nowPlayerTerm[nowPlayerNumber];
				if (nowPlayerTerm[nowPlayerNumber]._name==player1._name) {
					addDialog(mainScene, new selectPlayerDialogLayer(true,true, true, true,
							"请选择一人HP额外-2", false, false,function(result){
						if(!skillCharacters_XuanxiaoNingbingfenyan(result)){
							useYingu([result],result,result,[2],true, baseEffectReduceHPEffect,function(){
								skillCharactersTangxuejianZhuida(function(){
									heartList=new Array();
									if(callBack!=null){
										callBack();
									}
								});
							});
						}else if(callBack!=null){
							callBack();
						}
					}));
				} else {
					// AI选择掉血目标
					if (nowPlayerTerm[nowPlayerNumber]._name==player2._name) {
						if (player4.hp == 0) {
							selectPlayer = player3;
						} else if (player3.hp == 0) {
							selectPlayer = player4;
						} else {
							if (player3.hp < player4.hp) {
								selectPlayer = player3;
							} else {
								selectPlayer = player4;
							}
						}
					} else if (nowPlayerTerm[nowPlayerNumber]._name==player3._name
							|| nowPlayerTerm[nowPlayerNumber]._name==player4._name) {
						if (player2.hp != 0
								&& player2.hp < player1.hp) {
							selectPlayer = player2;
						} else {
							selectPlayer = player1;
						}
					}
					if (!skillCharacters_XuanxiaoNingbingfenyan(selectPlayer)) {
						useYingu([selectPlayer],selectPlayer,selectPlayer,[2],true, baseEffectReduceHPEffect,function(){
							// 唐雪见【追打】效果
							skillCharactersTangxuejianZhuida(function(){
								heartList=new Array();
								if(callBack!=null){
									callBack();
								}
							});
						});
					}else if(callBack!=null){
						callBack();
					}
				}
			});
		});
	},
	dropEqument:function(callBack){
		if (nowPlayerTerm[nowPlayerNumber].hp > 0) {
			if(baseEffectCountequment(nowPlayerTerm[nowPlayerNumber])==0){
				textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"无装备可弃", myText, listView);
				if(callBack!=null){
					callBack();
				}
			}else {
				if (nowPlayerTerm[nowPlayerNumber]._name==player1._name) {
					addDialog(mainScene, new selectEqumentDialogLayer("请选择丢弃的装备",nowPlayerTerm[nowPlayerNumber],function(result){
						if(result==SelectCardType.ARMS1){
							textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"弃置武器："+nowPlayerTerm[nowPlayerNumber].arms1, myText, listView);
							remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].arms1);
							nowPlayerTerm[nowPlayerNumber].arms1Combat = 0;
							nowPlayerTerm[nowPlayerNumber].arms1Extent = 0;
							nowPlayerTerm[nowPlayerNumber].arms1 = "无";
							if(callBack!=null){
								callBack();
							}
						}else if(result==SelectCardType.ARMS2){
							textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"弃置武器："+nowPlayerTerm[nowPlayerNumber].arms2, myText, listView);
							remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].arms2);
							nowPlayerTerm[nowPlayerNumber].arms2Combat = 0;
							nowPlayerTerm[nowPlayerNumber].arms2Extent = 0;
							nowPlayerTerm[nowPlayerNumber].arms2 = "无";
							if(callBack!=null){
								callBack();
							}
						}else if(result==SelectCardType.DEFENSE){
							textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name+"弃置防具："+nowPlayerTerm[nowPlayerNumber].defense, myText, listView);
							remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].defense);
							nowPlayerTerm[nowPlayerNumber].defenseCombat = 0;
							nowPlayerTerm[nowPlayerNumber].defenseExtent = 0;
							nowPlayerTerm[nowPlayerNumber].defense = "无";
							if(callBack!=null){
								callBack();
							}
						}else if(result==SelectCardType.ORNAMENT){
							addDialog(mainScene,new selectCardDialogLayer("请选择丢弃的饰品",nowPlayerTerm[nowPlayerNumber].skillTempList,1,1,false,function(result){
								var card=result.pop();
								remove_Card_Into_DropDeck(card.name);
								nowPlayerTerm[nowPlayerNumber].skillTempList.removeObject(card);
								nowPlayerTerm[nowPlayerNumber].maxCombat--;
								if(callBack!=null){
									callBack();
								}
							}));
						}
					}));
				} else {
					// AI处理丢弃装备
					baseAIDropEquipment(nowPlayerTerm[nowPlayerNumber]);
					if(callBack!=null){
						callBack();
					}
				}
			}
		}else if(callBack!=null){
			callBack();
		}
	},
	loseEffect:function(callBack){
		this._super();
		var that=this;
		if(!skillCharacters_XuanxiaoNingbingfenyan(nowPlayerTerm[nowPlayerNumber])){
			useYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [2], true, baseEffectReduceHPEffect,function(){
				// 唐雪见【追打】技能
				skillCharactersTangxuejianZhuida(function(){
					heartList=new Array();
					that.dropEqument(callBack);
				});
			});
		}else if(callBack!=null){
			that.dropEqument(callBack);
		}
	},
	petEffect:function(player){
		this.combat *= 2;
	}
})