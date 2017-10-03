var GameLayer=cc.Layer.extend({
	ctor:function(){
		this._super();
		// player1=player;
		this.init();
		initGameValue();
		// this.schedule(this.updateUI);
		this.mySchedule(this.updateUI,0.01);
		// this.schedule(skillCharacters_ZhaolingerMengshe);
		// this.mySchedule(skillCharacters_ZhaolingerMengshe, 0.1);
		// var button=new ccui.Button();
		// this.addChild(button);
		
	},
	init:function(){
		initPlayer();
		if(mainScene==null){
			initGameView();
		}
		back.addClickEventListener(function(){
			playButtonClickedAudio();
			addDialog(mainScene, new yesOrNoDialogLayer(Text.back,function(result){
				if(result){
					cc.director.runScene(new IndexScene());
				}
			}));
		});
		var longClickFunction=function(player){
			isLongClick=true;
			addDialog(mainScene,new detailDialogLayer(player,function(){
				isLongClick=false;
			}));
		}
		player1PicLabel.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(function(){
					longClickFunction(player1);
				}, 1);
			}else if(type==2){
				this.unschedule(longClickFunction);
				if(isLongClick){
					isLongClick=false;
				}
			}
		}, player1PicLabel);
		
		player2PicLabel.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(function(){
					longClickFunction(player2);
				}, 1);
			}else if(type==2){
				this.unschedule(longClickFunction);
				if(isLongClick){
					isLongClick=false;
				}
			}
		}, player2PicLabel);
		
		player3PicLabel.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(function(){
					longClickFunction(player3);
				}, 1);
			}else if(type==2){
				this.unschedule(longClickFunction);
				if(isLongClick){
					isLongClick=false;
				}
			}
		}, player3PicLabel);
		
		player4PicLabel.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(function(){
					longClickFunction(player4);
				}, 1);
			}else if(type==2){
				this.unschedule(longClickFunction);
				if(isLongClick){
					isLongClick=false;
				}
			}
		}, player4PicLabel);
		
		// 设置技能
		player1SkillButton1.addTouchEventListener(function(sender,type){
			if(type==2){
				if(nextStep==2&&!skill2Useing&& !skill3Useing){
					// 技牌阶段可以使用的技能
					if(nowPlayerTerm[nowPlayerNumber]._name==nameAnu){
						skillCharacters_AnuGuilingjing();
					}else if(nowPlayerTerm[nowPlayerNumber]._name==nameLinyueruSp){
						skillCharacters_LinyueruBiwuzhaoqin(nowPlayerTerm[nowPlayerNumber]);
					}else if(nowPlayerTerm[nowPlayerNumber]._name==nameZhaolingerSp){
						skillCharacters_Zhaolinguihunxianmeng(nowPlayerTerm[nowPlayerNumber]);
					}else{
						skillCharacters_KonglinLashoucuihua();
						skillCharacters_ChonglouJuedou();
						skillCharacters_NangonghuangZhanbu();
						skillCharacters_XingxuanPengren();
						skillCharacters_WangpengxuTaotie();
						skillCharacters_HanlinshaSounangtanbao(player1);
						skillCharacters_LongyouSpZhencha(player1);
					}
				}
			}
		}, player1SkillButton1);

		
		player1SkillButton2.addTouchEventListener(function(sender,type){
			if(type==2){
					if(nextStep==2){
						if(player1._name==nameShenqishuang){
							skillCharacters_ShenqishuangYuanlingguixinshu(nowPlayerTerm[nowPlayerNumber]);
						}else if(player1._name==nameZhaolingerSp){
							skillCharacters_ZhaolingerspShengling(player1);
						}else{
							skillCharacters_XingxuanXiongdi();
							skillCharacters_HanlinshaJiefujipin(player1);
							skillCharacters_TangyurouNitianzhen(player1);
							skillCharacters_YanshiqiongbingHuitianmiedi(player1)
							skillCharacters_LongkuiRongzhu(player1);
							skillCharacters_LongkuiguiKongjian(player1);
						}
					}
					else if(nextStep==3||nextStep==4){
						if(player1._name==nameTangxuejian){
							skillCharacters_TangxuejianLianji();
						}else{
							skillCharacters_BaiyueZhaohuanshuimoshou(player1);
							skillCharacters_YuntianheHouyisherigong(player1);
							skillCharacters_JiangshiliXishen(player1);
							skillCharacters_XuchangqingShushanjianjue(player1);
						}
					}
					skillCharacters_WangpengxuHechengshipin();
			}
		}, player1SkillButton2);
		player1SkillButton3.addTouchEventListener(function(sender,type){
			if(type==2){
				skillCharacters_XiaomanLianyao();
				if(nextStep==2){
					skillCharacters_OuyanghuiLitianji(player1);
					skillCharacters_ZhaolingerspHuihunxianmengChooser(player1,nextStep);
				}else if(nextStep==3||nextStep==4){
					skillCharacters_ZhaolingerspHuihunxianmengChooser(player1,nextStep);
					if(player1._name==nameTangxuejian){
						skillCharacters_TangxuejianHaosheng();
					}
				}
			}
		}, player1SkillButton3);



		// 玩家2技能1的长按说明
		var longClikcFunction_player2Skill1=function(){
			isLongClick=true;
			addDialog(mainScene,new messageDialogLayer(Text.skillShow.format(player2.skill_1,player2.skill1Effect),function(){
				isLongClick=false;
			}));
		}
		// player2SkillButton1=ccui.helper.seekWidgetByName(mainScene,
		// "player2Skill1Button");
		player2SkillButton1.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(longClikcFunction_player2Skill1, 1);
			}else if(type==2){
				this.unschedule(longClikcFunction_player2Skill1);
				if(isLongClick){
					isLongClick=false;
				}
			}
		}, player2SkillButton1);
		
		// 玩家2技能2的长按说明
		var longClikcFunction_player2Skill2=function(){
			isLongClick=true;
			mainScene.addChild(new messageDialogLayer(Text.skillShow.format(player2.skill_2,player2.skill2Effect),function(){
				isLongClick=false;
			}));
		}
		// player2SkillButton2=ccui.helper.seekWidgetByName(mainScene,
		// "player2Skill2Button");
		player2SkillButton2.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(longClikcFunction_player2Skill2, 1);
			}else if(type==2){
				this.unschedule(longClikcFunction_player2Skill2);
				if(isLongClick){
					isLongClick=false;
				}
			}
		}, player2SkillButton2);
		
		// 玩家2技能3的长按说明
		var longClikcFunction_player2Skill3=function(){
			isLongClick=true;
			mainScene.addChild(new messageDialogLayer(Text.skillShow.format(player2.skill_3,player2.skill3Effect),function(){
				isLongClick=false;
			}));
		}
		// player2SkillButton3=ccui.helper.seekWidgetByName(mainScene,
		// "player2Skill3Button");
		player2SkillButton3.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(longClikcFunction_player2Skill3, 1);
			}else if(type==2){
				this.unschedule(longClikcFunction_player2Skill3);
				if(isLongClick){
					isLongClick=false;
				}
			}
		}, player2SkillButton3);

		
		// 玩家3技能1的长按说明
		var longClikcFunction_player3Skill1=function(){
			isLongClick=true;
			mainScene.addChild(new messageDialogLayer(Text.skillShow.format(player3.skill_1,player3.skill1Effect),function(){
				isLongClick=false;
			}));
		}
		// player3SkillButton1=ccui.helper.seekWidgetByName(mainScene,
		// "player3Skill1Button");
		player3SkillButton1.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(longClikcFunction_player3Skill1, 1);
			}else if(type==2){
				this.unschedule(longClikcFunction_player3Skill1);
				if(isLongClick){
					isLongClick=false;
				}
			}
		}, player3SkillButton1);
		
		
		// 玩家3技能2的长按说明
		var longClikcFunction_player3Skill2=function(){
			isLongClick=true;
			mainScene.addChild(new messageDialogLayer(Text.skillShow.format(player3.skill_2,player3.skill2Effect),function(){
				isLongClick=false;
			}));
		}
		// player3SkillButton2=ccui.helper.seekWidgetByName(mainScene,
		// "player3Skill2Button");
		player3SkillButton2.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(longClikcFunction_player3Skill2, 1);
			}else if(type==2){
				this.unschedule(longClikcFunction_player3Skill2);
				if(isLongClick){
					isLongClick=false;
				}
			}
			
		}, player3SkillButton2);
		
		
		// 玩家3技能3的长按说明
		var longClikcFunction_player3Skill3=function(){
			isLongClick=true;
			mainScene.addChild(new messageDialogLayer(Text.skillShow.format(player3.skill_3,player3.skill3Effect),function(){
				isLongClick=false;
			}));
		}
		// player3SkillButton3=ccui.helper.seekWidgetByName(mainScene,
		// "player3Skill3Button");
		player3SkillButton3.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(longClikcFunction_player3Skill3, 1);
			}else if(type==2){
				this.unschedule(longClikcFunction_player3Skill3);
				if(isLongClick){
					isLongClick=false;
				}
			}
			
		}, player3SkillButton3);
		
		
		
		// 玩家4技能1的长按说明
		var longClikcFunction_player4Skill1=function(){
			isLongClick=true;
			mainScene.addChild(new messageDialogLayer(Text.skillShow.format(player4.skill_1,player4.skill1Effect),function(){
				isLongClick=false;
			}));
		}
		// player4SkillButton1=ccui.helper.seekWidgetByName(mainScene,
		// "player4Skill1Button");
		player4SkillButton1.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(longClikcFunction_player4Skill1,1);
			}else if(type==2){
				this.unschedule(longClikcFunction_player4Skill1);
				if(isLongClick){
					isLongClick=false;
				}
			}
			
		}, player4SkillButton1);
		
		// 玩家4技能2的长按说明
		var longClikcFunction_player4Skill2=function(){
			isLongClick=true;
			mainScene.addChild(new messageDialogLayer(Text.skillShow.format(player4.skill_2,player4.skill2Effect),function(){
				isLongClick=false;
			}));
		}
		// player4SkillButton2=ccui.helper.seekWidgetByName(mainScene,
		// "player4Skill2Button");
		player4SkillButton2.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(longClikcFunction_player4Skill2, 1);
			}else if(type==2){
				this.unschedule(longClikcFunction_player4Skill2);
				if(isLongClick){
					isLongClick=false;
				}
			}
		}, player4SkillButton2);
		
		
		// 玩家4技能3的长按说明
		var longClikcFunction_player4Skill3=function(){
			isLongClick=true;
			mainScene.addChild(new messageDialogLayer(Text.skillShow.format(player4.skill_3,player4.skill3Effect),function(){
				isLongClick=false;
			}));
		}
		// player4SkillButton3=ccui.helper.seekWidgetByName(mainScene,
		// "player4Skill3Button");
		player4SkillButton3.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(longClikcFunction_player4Skill3, 1);
			}else if(type==2){
				this.unschedule(longClikcFunction_player4Skill3);
				if(isLongClick){
					isLongClick=false;
				}
			}
		}, player4SkillButton3);

		// 设置武器
		// player1ArmText=ccui.helper.seekWidgetByName(mainScene,
		// "player1ArmText");
		player1ArmText.addTouchEventListener(function(sender,type){
			if(type==2&&nowPlayerTerm[nowPlayerNumber]._name==player1._name){
				switch(nextStep){
					case 2:
						mojianDiandangEffectInEqumentZone(function(){
							if(player1.arms1!=Text.nil){
								skillCharacters_MurongziyingZengjian_Arm();
								skillCharacters_LongkuiguiJianhun(player1,"player1.arms1",player1.arms1,SelectCardType.ARMS1);
							}
						});
						break;
					case 3:
					case 4:
						if(player1.arms1!=Text.nil){
							skillCharacters_LongkuiJianling(player1, "player1.arms1",player1.arms1);
						}
						break;
				}
			}
		}, player1ArmText);
		// player2ArmText=ccui.helper.seekWidgetByName(mainScene,
		// "player2ArmText");
		// player3ArmText=ccui.helper.seekWidgetByName(mainScene,
		// "player3ArmText");
		// player4ArmText=ccui.helper.seekWidgetByName(mainScene,
		// "player4ArmText");


		// 设置防具
		// player1DefenseText=ccui.helper.seekWidgetByName(mainScene,
		// "player1DefenseText");
		player1DefenseText.addTouchEventListener(function(sender,type){
			if(type==2){
				if(player1.defense!=Text.nil){
					switch (nextStep) {
					case 2:
						skillCharacters_MurongziyingZengjian_Defense();
						skillCharacters_LongkuiguiJianhun(player1,"player1.defense",player1.defense,SelectCardType.DEFENSE);
						break;
					case 3:
					case 4:
						skillCharacters_LongkuiJianling(player1, "player1.defense",player1.defense);
						break;
					}
				}
			}
		}, player1DefenseText);


		// player2DefenseText=ccui.helper.seekWidgetByName(mainScene,
		// "player2DefenseText");
		// player3DefenseText=ccui.helper.seekWidgetByName(mainScene,
		// "player3DefenseText");
		// player4DefenseText=ccui.helper.seekWidgetByName(mainScene,
		// "player4DefenseText");

		// 设置宠物
		// player1Pet1Text=ccui.helper.seekWidgetByName(mainScene,
		// "player1Pet1Text");
		player1Pet1Text.addTouchEventListener(function(sender,type){
			if(type==2){
				if(player1.pet_FengMonster != null
						&& player1.pet_FengMonster.name==nameGoumang){
					var canBaofa=false;
					if(nextStep==2){
						canBaofa=player1IsPlayer2Friend(nowPlayerTerm[nowPlayerNumber], player1);
					}else if(nextStep==3||nextStep==4){
						canBaofa=true;
					}
					if(canBaofa){
						addDialog(mainScene, new yesOrNoDialogLayer(Text.askBaofaGoumang,function(result){
							if(result){
								if(fight_Trigger.length>0){
									player1.pet_FengMonster.name+=Text.baofa;
								}else{
									updata_PetsEffect(player1.pet_FengMonster,player1);
									player1.pet_FengMonster = null;
									player1.pet_Feng = Text.petFeng;
									skillCharacters_ZhaolingerMengshe();
								}
								var tempList = new Array();
								tempList.push(player1);
								if (player2.hp != 0) {
									tempList.push(player2);
								}
								var addCardPlayerList=new Array();
								var addCardNumberList=new Array();
								for (var i=0;i<tempList.length;i++) {
									var tempNum = tempList[i].handCard.length;
									for(var t=0;t<tempList[i].handCard.length;t++){
										remove_Card_Into_DropDeck(tempList[i].handCard[t].name);
										if(tempList[i]._name==player1._name){
											tempList[i].handCard[t].removeFromParent();
										}
									}
									tempList[i].handCard=new Array();
									addCardPlayerList.push(tempList[i]);
									addCardNumberList.push(tempNum);
									textAreaAddMessage(Text.changeCardFromDeck.format(tempList[i]._name), myText, listView);
								}
								addHandCard(addCardPlayerList,addCardPlayerList[0],addCardPlayerList[0],null,addCardNumberList,true,true);
							}
						}));
					}
				}
			}
		});
		
		// player1Pet2Text=ccui.helper.seekWidgetByName(mainScene,
		// "player1Pet2Text");
		// player1Pet3Text=ccui.helper.seekWidgetByName(mainScene,
		// "player1Pet3Text");
		// player1Pet4Text=ccui.helper.seekWidgetByName(mainScene,
		// "player1Pet4Text");
		player1Pet4Text.addClickEventListener(function(){
			if(player1.pet_HuoMonster != null
				&& player1.pet_HuoMonster.name==nameFeifei&&(nextStep==3||nextStep==4)){
				addDialog(mainScene, new yesOrNoDialogLayer(Text.askBaofaFeifei,function(result){
					if(result){
						textAreaAddMessage(Text.baofaFeifeiEffect.format(player1._name), myText, listView);
						var effected = false;
						for (var i=0;i<fight_Trigger.length;i++) {
							if (fight_Trigger[i]._name==player1._name) {
								addTrigerCombat(3);
								effected = true;
								break;
							}
						}
						if (!effected) {
							for (var i=0;i<fight_Monster.length;i++) {
								if (fight_Monster[i]._name==player1._name) {
									addMonsterCombat(3);
									break;
								}
							}
						}
						// player1.pet_Huo = "火系宠物";
						// updata_PetsEffect(player1.pet_HuoMonster,player1);
						player1.pet_HuoMonster.name+= Text.baofa;
					}
				}));
			}
			
		});
		var monsterLabelLongClickFunction=function(){
			isLongClick=true;
			var message;
			if(tempMonster==null){
				return;
			}
			if(tempMonster.dodge>0){
				message=Text.monsterMsgShow.format(tempMonster.name,tempMonster.combat,tempMonster.dodge,tempMonster.petEffectText,
						tempMonster.openEffectText,tempMonster.winEffectText,tempMonster.loseEffectText);
			}else{
				message=Text.npcMsgShow.format(tempMonster.name,tempMonster.combat,tempMonster.winEffectText,tempMonster.loseEffectText);
			}
			mainScene.addChild(new messageDialogLayer(message,function(){
				isLongClick=false;
			}));
		}
		monsterLabel.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(monsterLabelLongClickFunction, 1);
			}else if(type==2){
				this.unschedule(monsterLabelLongClickFunction);
			}
		}, monsterLabel);


		// 设置Button
		// back=ccui.helper.seekWidgetByName(mainScene, "back");
		// order1Button=ccui.helper.seekWidgetByName(mainScene, "order1");
		/*
		 * var handleHandCard=function(selectHandCard){
		 * player1.handCard.removeObject(selectHandCard);
		 * handCardZone.removeChild(selectHandCard,true); selectHandCard=null; }
		 */
		order1Button.addTouchEventListener(function(sender,type){
			if(type==2&&selectHandCard!=null){
				playButtonClickedAudio();
				if(!dropCarding && !isBusiness){
					player1.handCard.removeObject(selectHandCard);
					handCardZone.removeChild(selectHandCard,true);
					if(selectHandCard.name==string_handCardNameTianshezhang){
						handCardTianshezhang.effect(player1, player1, false, false);
					}else if(selectHandCard.name==string_handCardNameModaotianzha){
						handCardModaotianzha.effect(player1, player1, false, false);
					}else if(selectHandCard.name==string_handCardNameMojian){
						handCardMojian.effect(player1, player1, false, false);
					}else if(selectHandCard.name==string_handCardNameWuchenjian){
						handCardWuchenjian.effect(player1, player1, false, false);
					}else if(selectHandCard.name==string_handCardNameCaihuan){
						handCardCaihuan.effect(player1, player1, false, false);
					}else if(selectHandCard.name==string_handCardNameLinghuxiandan){
						handCardLinghuxiandan.effect(player1, player1, true, false);
					}else if(selectHandCard.name==string_handCardNameTianleipo){
						handCardTianleipo.effect(player1, player1, true, false);
					}else if(selectHandCard.name==string_handCardNameShuerguo){
						handCardShuerguo.effect(player1, player1, true, false);
					}else if(selectHandCard.name==string_handCardNameKuicetianji){
						handCardKuicetianji.effect(player1, player1, true, false);
					}else if(selectHandCard.name==string_handCardNameToudao){
						handCardToudao.effect(player1, player1, true, false);
					}else if(selectHandCard.name==string_handCardNameTongqianbiao){
						handCardTongqianbiao.effect(player1, player1, true, false);
					}else if(selectHandCard.name==string_handCardNameWuqichaoyuan){
						handCardWuqichaoyuan.effect(player1, player1, true, true);
					}else if(selectHandCard.name==string_handCardNameQiankundaopao){
						handCardQiankundaopao.effect(player1, player1, false, false);
					}else if(selectHandCard.name==string_handCardNameTayunxue){
						handCardTayunxue.effect(player1, player1, false, false);
					}else if(selectHandCard.name==string_handCardNameLonghunzhankai){
						handCardLonghunzhankai.effect(player1, player1, false, false);
					}else if(selectHandCard.name==string_handCardNameTiandijifu){
						handCardTiandijifu.effect(player1, player1, false, false);
					}else if(selectHandCard.name==string_handCardNameWucaixiayi){
						handCardWucaixiayi.effect(player1, player1, false, false);
					}else if(selectHandCard.name==string_handCardNameTianxuanwuyin){
						player1.usedAttackCard=true;
						handCardTianxuanwuyin.effect(player1, player1, true, false);
					}else if(selectHandCard.name==string_handCardNameJincanwang){
						player1.usedAttackCard=true;
						handCardJincanwang.effect(player1,player1,true,false);
					}else if(selectHandCard.name==string_handCardNameTiangangzhanqi){
						player1.usedAttackCard=true;
						handCardTiangangzhanqi.effect(player1, player1, true, false);
					}else if(selectHandCard.name==string_handCardNameJinchantuoqiao){
						player1.usedAttackCard=true;
						handCardJinchantuoqiao.effect(player1, player1, true, false);
					}
					selectHandCard=null;
				}else if(selectHandCard.clicked
						&& dropCarding  && !isBusiness ){
					selectHandCard.removeFromParent();
					selectHandCard.clicked = false;
					remove_Card_Into_DropDeck(selectHandCard.name);
					selectHandCard.release();
					player1.handCard.removeObject(selectHandCard);
					var tempPlayer = nowPlayerTerm[nowPlayerNumber];
					var MAX = 3;
					if (tempPlayer.skillNameList.containsObject(skillnameJianxia)) {
						MAX = 5;
					}
					if (tempPlayer.handCard.length<= MAX) {
						textAreaAddMessage("手牌弃置完毕", myText, listView);
						buttonManager(order1Button, false, false);
						//buttonManager(order2Button, true, true);
						dropCarding = false;
						autoNextStep();
					}
				}
			}
		}, this);
		order2Button.addClickEventListener(function(){
			playButtonClickedAudio();
			selectHandCard=null;
			for(var i=0;i<player1.handCard.length;i++){
				player1.handCard[i].clicked=false;
				player1.handCard[i].setOpacity(200);
			}
			buttonManager(order2Button, false, false);
			nextStep++;
			sendRoundMessageManager();
		});
		player1.deathImageView=player1DeathImageView;
		player1.deathImageView.setVisible(false);
		player1.deathImageView.retain();
		
		player1PicLabel.loadTexture(player1.playerPicSrc,ccui.Widget.LOCAL_TEXTURE);
		player1.hadImageView=player1PicLabel;
		player1.hadImageView.retain();
		player1.playerArmText=player1ArmText;
		player1.playerDefenseText=player1DefenseText;
		player1.playerPet1Text=player1Pet1Text;
		player1.playerPet2Text=player1Pet2Text;
		player1.playerPet3Text=player1Pet3Text;
		player1.playerPet4Text=player1Pet4Text;
		player1.playerPet5Text=player1Pet5Text;
		
		player2.deathImageView=player2DeathImageView;
		player2.deathImageView.setVisible(false);
		player2.deathImageView.retain();
		
		player2PicLabel.loadTexture(player2.playerPicSrc,ccui.Widget.LOCAL_TEXTURE);
		player2.hadImageView=player2PicLabel;
		player2.hadImageView.retain();
		player2.playerArmText=player2ArmText;
		player2.playerDefenseText=player2DefenseText;
		player2.playerPet1Text=player2Pet1Text;
		player2.playerPet2Text=player2Pet2Text;
		player2.playerPet3Text=player2Pet3Text;
		player2.playerPet4Text=player2Pet4Text;
		player2.playerPet5Text=player2Pet5Text;
		
		player3.deathImageView=player3DeathImageView;
		player3.deathImageView.setVisible(false);
		player3.deathImageView.retain();
		
		player3PicLabel.loadTexture(player3.playerPicSrc,ccui.Widget.LOCAL_TEXTURE);
		player3.hadImageView=player3PicLabel;
		player3.hadImageView.retain();
		player3.playerArmText=player3ArmText;
		player3.playerDefenseText=player3DefenseText;
		player3.playerPet1Text=player3Pet1Text;
		player3.playerPet2Text=player3Pet2Text;
		player3.playerPet3Text=player3Pet3Text;
		player3.playerPet4Text=player3Pet4Text;
		player3.playerPet5Text=player3Pet5Text;
		
		player4.deathImageView=player4DeathImageView;
		player4.deathImageView.setVisible(false);
		player4.deathImageView.retain();
		
		player4PicLabel.loadTexture(player4.playerPicSrc,ccui.Widget.LOCAL_TEXTURE);
		player4.hadImageView=player4PicLabel;
		player4.hadImageView.retain();
		player4.playerArmText=player4ArmText;
		player4.playerDefenseText=player4DefenseText;
		player4.playerPet1Text=player4Pet1Text;
		player4.playerPet2Text=player4Pet2Text;
		player4.playerPet3Text=player4Pet3Text;
		player4.playerPet4Text=player4Pet4Text;
		player4.playerPet5Text=player4Pet5Text;
		
		textAreaAddMessage("玩家1(您)选择了"+player1._name,myText,listView);
		textAreaAddMessage("玩家2(队友)选择了"+player2._name,myText,listView);
		textAreaAddMessage("玩家3选择了"+player3._name,myText,listView);
		textAreaAddMessage("玩家4选择了"+player4._name,myText,listView);
		this.addChild(mainScene);
	},
	updateUI:function(){
		handCardDeckNumber.setString("牌堆："+game_HandCard_Start.length);
		monsterCardDeckNumber.setString(game_MonsterDeck.length);
		eventCardDeckNumber.setString(game_EventCardDeck.length);
		dropCardDeckNumber.setString("弃牌："+game_DropHandCard.length);
		triggerCombatBMFont.setString(triggerCombat);
		monsterCombatBMFont.setString(monsterCombat);
		player1hpText.setString(player1.hp+"/"+player1.maxHP);
		player2hpText.setString(player2.hp+"/"+player2.maxHP);
		player3hpText.setString(player3.hp+"/"+player3.maxHP);
		player4hpText.setString(player4.hp+"/"+player4.maxHP);

		player2HandCardText.setString(player2.handCard.length);
		player3HandCardText.setString(player3.handCard.length);
		player4HandCardText.setString(player4.handCard.length);

		player1SkillButton1.loadTextures(player1.skillButton1,player1.skillButton1,player1.skillButton1,ccui.Widget.LOCAL_TEXTURE);
		player1SkillButton2.loadTextures(player1.skillButton2,player1.skillButton2,player1.skillButton2,ccui.Widget.LOCAL_TEXTURE);
		if(player1.skill_3==""||player1.skill_3==Text.nil){
			player1SkillButton3.setVisible(false);
		}else{
			player1SkillButton3.setVisible(true);
			player1SkillButton3.loadTextures(player1.skillButton3,player1.skillButton3,player1.skillButton3,ccui.Widget.LOCAL_TEXTURE);
		}

		player1.combat = player1.maxCombat+player1.arms1Combat+player1.arms2Combat+player1.defenseCombat+player1.petsCombat+player1.skillAddCombat+player1.tempAddCombat+player1.tempZhuangbeiSkillCombat;
		if(player1.combat<0){
			player1.combat=0;
		}
		if(player1.hp>0){
			player1CombatText.setString(player1.combat);
		}else{
			player1CombatText.setString(player1.maxCombat);
		}
		player2.combat = player2.maxCombat+player2.arms1Combat+player2.arms2Combat+player2.defenseCombat+player2.petsCombat+player2.skillAddCombat+player2.tempAddCombat+player2.tempZhuangbeiSkillCombat;
		if(player2.combat<0){
			player2.combat=0;
		}
		if(player2.hp>0){
			player2CombatText.setString(player2.combat);
		}else{
			player2CombatText.setString(player2.maxCombat);
		}
		player3.combat = player3.maxCombat+player3.arms1Combat+player3.arms2Combat+player3.defenseCombat+player3.petsCombat+player3.skillAddCombat+player3.tempAddCombat+player3.tempZhuangbeiSkillCombat;
		if(player3.combat<0){
			player3.combat=0;
		}
		if(player3.hp>0){
			player3CombatText.setString(player3.combat);
		}else{
			player3CombatText.setString(player3.maxCombat);
		}
		player4.combat = player4.maxCombat+player4.arms1Combat+player4.arms2Combat+player4.defenseCombat+player4.petsCombat+player4.skillAddCombat+player4.tempAddCombat+player4.tempZhuangbeiSkillCombat;
		if(player4.combat<0){
			player4.combat=0;
		}
		if(player4.hp>0){
			player4CombatText.setString(player4.combat);
		}else{
			player4CombatText.setString(player4.maxCombat);
		}

		player1.extent = player1.maxExtent+ player1.arms1Extent	+ player1.arms2Extent+ player1.defenseExtent+ player1.petsExtent+ player1.tempAddExtent+ player1.tempZhuangbeiSkillExtent;
		if(player1.extent<0){
			player1.extent=0;
		}
		if (player1.hp > 0) {
			player1ExtentText.setString(player1.extent);
		} else {
			player1ExtentText.setString(player1.maxExtent);
		}
		player2.extent = player2.maxExtent+ player2.arms1Extent	+ player2.arms2Extent+ player2.defenseExtent+ player2.petsExtent+ player2.tempAddExtent+ player2.tempZhuangbeiSkillExtent;
		if(player2.extent<0){
			player2.extent=0;
		}
		if (player2.hp > 0) {
			player2ExtentText.setString(player2.extent);
		} else {
			player2ExtentText.setString(player2.maxExtent);
		}
		player3.extent = player3.maxExtent+ player3.arms1Extent	+ player3.arms2Extent+ player3.defenseExtent+ player3.petsExtent+ player3.tempAddExtent+ player3.tempZhuangbeiSkillExtent;
		if(player3.extent<0){
			player3.extent=0;
		}
		if (player3.hp > 0) {
			player3ExtentText.setString(player3.extent);
		} else {
			player3ExtentText.setString(player3.maxExtent);
		}
		player4.extent = player4.maxExtent+ player4.arms1Extent	+ player4.arms2Extent+ player4.defenseExtent+ player4.petsExtent+ player4.tempAddExtent+ player4.tempZhuangbeiSkillExtent;
		if(player4.extent<0){
			player4.extent=0;
		}
		if (player4.hp > 0) {
			player4ExtentText.setString(player4.extent);
		} else {
			player4ExtentText.setString(player4.maxExtent);
		}

		if(player1.skill_1==skillnameShuangjian){
			player1ArmText.setString(player1.arms1+"\n"+player1.arms2);
		}else{
			player1ArmText.setString(player1.arms1);
		}

		if(player2.skill_1==skillnameShuangjian){
			player2ArmText.setString(player2.arms1+"\n"+player2.arms2);
		}else{
			player2ArmText.setString(player2.arms1);
		}

		if(player3.skill_1==skillnameShuangjian){
			player3ArmText.setString(player3.arms1+"\n"+player3.arms2);
		}else{
			player3ArmText.setString(player3.arms1);
		}

		if(player4.skill_1==skillnameShuangjian){
			player4ArmText.setString(player4.arms1+"\n"+player4.arms2);
		}else{
			player4ArmText.setString(player4.arms1);
		}

		player1DefenseText.setString(player1.defense);
		player2DefenseText.setString(player2.defense);
		player3DefenseText.setString(player3.defense);
		player4DefenseText.setString(player4.defense);

		if(player1.pet_FengMonster!=null){
			player1Pet1Text.setString(player1.pet_FengMonster.name);
		}else{
			player1Pet1Text.setString("风系宠物");
		}
		if(player1.pet_LeiMonster!=null){
			player1Pet2Text.setString(player1.pet_LeiMonster.name);
		}else{
			player1Pet2Text.setString("雷系宠物");
		}
		if(player1.pet_ShuiMonster!=null){
			player1Pet3Text.setString(player1.pet_ShuiMonster.name);
		}else{
			player1Pet3Text.setString("水系宠物");
		}
		if(player1.pet_HuoMonster!=null){
			player1Pet4Text.setString(player1.pet_HuoMonster.name);
		}else{
			player1Pet4Text.setString("火系宠物");
		}
		if(player1.pet_TuMonster!=null){
			player1Pet5Text.setString(player1.pet_TuMonster.name);
		}else{
			player1Pet5Text.setString("土系宠物");
		}

		if(player2.pet_FengMonster!=null){
			player2Pet1Text.setString(player2.pet_FengMonster.name);
		}else{
			player2Pet1Text.setString("风系宠物");
		}
		if(player2.pet_LeiMonster!=null){
			player2Pet2Text.setString(player2.pet_LeiMonster.name);
		}else{
			player2Pet2Text.setString("雷系宠物");
		}
		if(player2.pet_ShuiMonster!=null){
			player2Pet3Text.setString(player2.pet_ShuiMonster.name);
		}else{
			player2Pet3Text.setString("水系宠物");
		}
		if(player2.pet_HuoMonster!=null){
			player2Pet4Text.setString(player2.pet_HuoMonster.name);
		}else{
			player2Pet4Text.setString("火系宠物");
		}
		if(player2.pet_TuMonster!=null){
			player2Pet5Text.setString(player2.pet_TuMonster.name);
		}else{
			player2Pet5Text.setString("土系宠物");
		}

		if(player3.pet_FengMonster!=null){
			player3Pet1Text.setString(player3.pet_FengMonster.name);
		}else{
			player3Pet1Text.setString("风系宠物");
		}
		if(player3.pet_LeiMonster!=null){
			player3Pet2Text.setString(player3.pet_LeiMonster.name);
		}else{
			player3Pet2Text.setString("雷系宠物");
		}
		if(player3.pet_ShuiMonster!=null){
			player3Pet3Text.setString(player3.pet_ShuiMonster.name);
		}else{
			player3Pet3Text.setString("水系宠物");
		}
		if(player3.pet_HuoMonster!=null){
			player3Pet4Text.setString(player3.pet_HuoMonster.name);
		}else{
			player3Pet4Text.setString("火系宠物");
		}
		if(player3.pet_TuMonster!=null){
			player3Pet5Text.setString(player3.pet_TuMonster.name);
		}else{
			player3Pet5Text.setString("土系宠物");
		}

		if(player4.pet_FengMonster!=null){
			player4Pet1Text.setString(player4.pet_FengMonster.name);
		}else{
			player4Pet1Text.setString("风系宠物");
		}
		if(player4.pet_LeiMonster!=null){
			player4Pet2Text.setString(player4.pet_LeiMonster.name);
		}else{
			player4Pet2Text.setString("雷系宠物");
		}
		if(player4.pet_ShuiMonster!=null){
			player4Pet3Text.setString(player4.pet_ShuiMonster.name);
		}else{
			player4Pet3Text.setString("水系宠物");
		}
		if(player4.pet_HuoMonster!=null){
			player4Pet4Text.setString(player4.pet_HuoMonster.name);
		}else{
			player4Pet4Text.setString("火系宠物");
		}
		if(player4.pet_TuMonster!=null){
			player4Pet5Text.setString(player4.pet_TuMonster.name);
		}else{
			player4Pet5Text.setString("土系宠物");
		}

	},
	mySchedule:function(callBack,interval){
		var then=Date.now();
		interval*=1000;
		this.schedule(function(){
			var now=Date.now();
			var delta=now-then;
			if(delta>interval){
				then=now-(delta%interval);
				callBack.call(this);
			}
		}.bind(this), 0);
	}
});

var GameScene = cc.Scene.extend({
	layer:null,
	onEnter:function () {
		this._super();
		this.layer = new GameLayer();
		this.addChild(this.layer);
		var touchLayer=new TouchLayer();
		this.addChild(touchLayer);
		skillCharacters_XuanxiaoJiebai(round_Start);
	},
	onEnterTransitionDidFinish:function(){
		this._super();
		if(musicSwitch=="true"){
			audioEngine.playMusic("res/audio/bgm.mp3", true);
		}
	},
	onExit:function(){
		this._super();
		this.layer.unscheduleAllCallbacks();
		if(cc.sys.isObjectValid(myText)){
			myText.release();
		}
		if(cc.sys.isObjectValid(handCardExample)){
			handCardExample.release();
		}
		chooseZone.release();
		releaseGameView();
		for(var i=0;i<nowPlayerTerm.length;i++){
			for(var t=0;t<nowPlayerTerm[i].handCard.length;t++){
				if(cc.sys.isObjectValid(nowPlayerTerm[i].handCard[t])){
					nowPlayerTerm[i].handCard[t].release();
				}
			}
			if(nowPlayerTerm[i].skillUrl!=null){
				cc.spriteFrameCache.removeSpriteFramesFromFile(nowPlayerTerm[i].skillUrl);
			}
			if(nowPlayerTerm[i].animation!=null){
				nowPlayerTerm[i].animation.release();
			}
		}
		cc.textureCache.removeAllTextures();
	},
	onExitTransitionDidStart:function(){
		this._super();
		if(audioEngine.isMusicPlaying()){
			audioEngine.stopAllEffects();
			audioEngine.stopMusic(true);
		}
	}
});