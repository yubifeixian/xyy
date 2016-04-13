var AdvWudushouMonster=AdvBaseMonster.extend({
	ctor:function(uid){
		this._super(uid);
		this.name = nameWudushou;
		this.ID = 0;
		this.combat = 4;
		this.dodge = 5;
		this.finalMark = 8;
		this.openEffectText = Text.nil;
		this.winEffectText = Text.wudushouWinEffectText;
		this.loseEffectText = Text.wudushouLoseEffectText;
		this.petEffectText = Text.wudushouPetEffectText;
		this.nature = Text.natureShui;
		this.lover1 = Text.nil;
		this.lover2 = Text.nil;
		this.lover3 = Text.nil;
		this.lover4 = Text.nil;
		this.monsterPicSrc = resPng.monster_wudushou_png;
		this.level = Text.petLevelWeak;
	},
	realWinEffect:function(callBack){
		advUseYingu([boss],boss,boss,[1],true, advBaseEffectReduceHPEffect,function(){
			// 唐雪见【追打】技能
			advSkillCharactersTangxuejianZhuida(function(){
				heartList=new Array();
				var selectPlayer = nowPlayerTerm[nowPlayerNumber];
				if (nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name) {
					addDialog(mainScene, new selectAdvPlayerDialogLayer(true,true, true, true,
							Text.choosePlayerAdditionalReduceHp, false, false,function(result){
						if(!advSkillCharacters_XuanxiaoNingbingfenyan(result)){
							advUseYingu([result],result,result,[2],true, advBaseEffectReduceHPEffect,function(){
								advSkillCharactersTangxuejianZhuida(function(){
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
					advUseYingu([boss],boss,boss,[2],true, advBaseEffectReduceHPEffect,function(){
						// 唐雪见【追打】效果
						advSkillCharactersTangxuejianZhuida(function(){
							heartList=new Array();
							if(callBack!=null){
								callBack();
							}
						});
					});
				}
			});
		});
	},
	dropEqument:function(callBack){
		if (nowPlayerTerm[nowPlayerNumber].hp > 0) {
			if(baseEffectCountequment(nowPlayerTerm[nowPlayerNumber])==0){
				textAreaAddMessage(Text.haveNoEqumentToDrop.format(nowPlayerTerm[nowPlayerNumber]._name), myText, listView);
				if(callBack!=null){
					callBack();
				}
			}else {
				if (nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name) {
					addDialog(mainScene, new selectEqumentDialogLayer(Text.chooseDropEqument,nowPlayerTerm[nowPlayerNumber],function(result){
						if(result==SelectCardType.ARMS1){
							textAreaAddMessage(Text.dropArm.format(nowPlayerTerm[nowPlayerNumber]._name,nowPlayerTerm[nowPlayerNumber].arms1), myText, listView);
							remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].arms1);
							nowPlayerTerm[nowPlayerNumber].arms1Combat = 0;
							nowPlayerTerm[nowPlayerNumber].arms1Extent = 0;
							nowPlayerTerm[nowPlayerNumber].arms1 = Text.nil;
							if(callBack!=null){
								callBack();
							}
						}else if(result==SelectCardType.ARMS2){
							textAreaAddMessage(Text.dropArm.format(nowPlayerTerm[nowPlayerNumber]._name,nowPlayerTerm[nowPlayerNumber].arms2), myText, listView);
							remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].arms2);
							nowPlayerTerm[nowPlayerNumber].arms2Combat = 0;
							nowPlayerTerm[nowPlayerNumber].arms2Extent = 0;
							nowPlayerTerm[nowPlayerNumber].arms2 = Text.nil;
							if(callBack!=null){
								callBack();
							}
						}else if(result==SelectCardType.DEFENSE){
							textAreaAddMessage(Text.dropDefense.format(nowPlayerTerm[nowPlayerNumber]._name,nowPlayerTerm[nowPlayerNumber].defense), myText, listView);
							remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].defense);
							nowPlayerTerm[nowPlayerNumber].defenseCombat = 0;
							nowPlayerTerm[nowPlayerNumber].defenseExtent = 0;
							nowPlayerTerm[nowPlayerNumber].defense = Text.nil;
							if(callBack!=null){
								callBack();
							}
						}else if(result==SelectCardType.ORNAMENT){
							addDialog(mainScene,new selectCardDialogLayer(Text.chooseDropOrnament,nowPlayerTerm[nowPlayerNumber].skillTempList,1,1,false,function(result){
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
	realLoseEffect:function(callBack){
		var that=this;
		if(!advSkillCharacters_XuanxiaoNingbingfenyan(nowPlayerTerm[nowPlayerNumber])){
			var number=2;
			if(tantadeqiongdingMark==2){
				tempHeartNumberList.push(12);
			}
			advUseYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [number], true, advBaseEffectReduceHPEffect,function(){
				// 唐雪见【追打】技能
				advSkillCharactersTangxuejianZhuida(function(){
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