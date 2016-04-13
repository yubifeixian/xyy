isLongClick=false;
var AdvGameSceneLayer=cc.Layer.extend({
	type:null,
	root:null,
	stage:null,
	ctor:function(type,stage){
		this._super();
		this.type=type;
		this.stage=stage;
		var temp=this;
		this.loadJsonFile(type);
		var nowStageCanUseCharacterList=[];
		for(var i=0;i<canUseCharacterList.length;i++){
			var player=new Player();
			characterCardManager(player, canUseCharacterList[i]);
			nowStageCanUseCharacterList.push(player);
		}


		this.addChild(new ChooseCharacterDialog(nowStageCanUseCharacterList,Text.advChoosePlayerRole.format(1), function(choose1){
			player1=choose1;
			nowStageCanUseCharacterList.removeObject(choose1);
			temp.addChild(new ChooseCharacterDialog(nowStageCanUseCharacterList,Text.advChoosePlayerRole.format(2),function(choose2){
				player2=choose2;
				nowStageCanUseCharacterList.removeObject(choose2);
				temp.addChild(new ChooseCharacterDialog(nowStageCanUseCharacterList,Text.advChoosePlayerRole.format(3),function(choose3){
					player3=choose3;
					player1PicLabel.loadTexture(player1.playerPicSrc,ccui.Widget.LOCAL_TEXTURE);
					player2PicLabel.loadTexture(player2.playerPicSrc,ccui.Widget.LOCAL_TEXTURE);
					player3PicLabel.loadTexture(player3.playerPicSrc,ccui.Widget.LOCAL_TEXTURE);
					player1.hadImageView=player1PicLabel;
					player2.hadImageView=player2PicLabel;
					player3.hadImageView=player3PicLabel;
					loadCharacterSkillAnimation(player1);
					loadCharacterSkillAnimation(player2);
					loadCharacterSkillAnimation(player3);
					boss.hadImageView=bossPicLabel;
					boss.hadImageView.loadTexture(boss.playerPicSrc,ccui.Widget.LOCAL_TEXTURE);
					textAreaAddMessage(Text.showPlayerSelectedCharacter.format(1,player1._name), myText, listView);
					textAreaAddMessage(Text.showPlayerSelectedCharacter.format(2,player2._name), myText, listView);
					textAreaAddMessage(Text.showPlayerSelectedCharacter.format(3,player3._name), myText, listView);
					initAdvPlayer();
					initAdvGameValue();
					temp.initSkillButton();
					textAreaAddMessage(Text.stepRoundStart.format(player1._name), myText, listView);
					temp.schedule(temp.updateUI, 0.1);
				}));
			}));
		}));
		/*player1PicLabel.loadTexture(player1.playerPicSrc,ccui.Widget.LOCAL_TEXTURE);
		player2PicLabel.loadTexture(player2.playerPicSrc,ccui.Widget.LOCAL_TEXTURE);
		player3PicLabel.loadTexture(player3.playerPicSrc,ccui.Widget.LOCAL_TEXTURE);
		this.schedule(this.updateUI, 0.1);*/
	},
	loadJsonFile:function(type){
		var root;
		switch(type){
		case ADVGAMESCENEMODEL.LEFT:
			root=ccs.load(res.gameSceneLeft_Json).node;
			break;
		case ADVGAMESCENEMODEL.CENTER:
			root=ccs.load(res.gameSceneCenter_Json).node;
			break;
		case ADVGAMESCENEMODEL.RIGHT:
			root=ccs.load(res.gameSceneRight_Json).node;
			break;
		}

		boss=this.stage.stageBoss;
		initAdvGameView(root);
		boss.dongmingbaojingList=[];
		boss.bingxingjueList=[];
		boss.yinguList=[];
		boss.lingquanList=[];
		boss.monsterList=[];
		placeMessageLabel.setString(this.stage.stagePlace);
		back.addClickEventListener(function(){
			addDialog(mainScene, new yesOrNoDialogLayer(Text.back,function(result){
				if(result){
					cc.director.runScene(new IndexScene());
				}
			}));
		});
		order1Button.addTouchEventListener(function(sender,type){
			if(type==2&&selectHandCard!=null){
				if(!dropCarding && !isBusiness){
					myControlPlayer.handCard.removeObject(selectHandCard);
					handCardZone.removeChild(selectHandCard,true);
					if(selectHandCard.name==string_handCardNameTianshezhang){
						// selectHandCard.removeFromParent();
						handCardTianshezhang.advEffect(myControlPlayer, myControlPlayer, false, false);
					}else if(selectHandCard.name==string_handCardNameModaotianzha){
						handCardModaotianzha.advEffect(myControlPlayer, myControlPlayer, false, false);
					}else if(selectHandCard.name==string_handCardNameMojian){
						handCardMojian.advEffect(myControlPlayer, myControlPlayer, false, false);
					}else if(selectHandCard.name==string_handCardNameWuchenjian){
						// selectHandCard.removeFromParent();
						handCardWuchenjian.advEffect(myControlPlayer, myControlPlayer, false, false);
					}else if(selectHandCard.name==string_handCardNameCaihuan){
						// selectHandCard.removeFromParent();
						handCardCaihuan.advEffect(myControlPlayer, myControlPlayer, false, false);
					}else if(selectHandCard.name==string_handCardNameLinghuxiandan){
						// selectHandCard.removeFromParent();
						handCardLinghuxiandan.advEffect(myControlPlayer, myControlPlayer, true, false);
					}else if(selectHandCard.name==string_handCardNameTianleipo){
						// selectHandCard.removeFromParent();
						handCardTianleipo.advEffect(myControlPlayer, myControlPlayer, true, false);
					}else if(selectHandCard.name==string_handCardNameShuerguo){
						// selectHandCard.removeFromParent();
						handCardShuerguo.advEffect(myControlPlayer, myControlPlayer, true, false);
					}else if(selectHandCard.name==string_handCardNameKuicetianji){
						// selectHandCard.removeFromParent();
						handCardKuicetianji.advEffect(myControlPlayer, myControlPlayer, true, false);

					}else if(selectHandCard.name==string_handCardNameToudao){
						// selectHandCard.removeFromParent();
						handCardToudao.advEffect(myControlPlayer, myControlPlayer, true, false);
					}else if(selectHandCard.name==string_handCardNameTongqianbiao){
						// selectHandCard.removeFromParent();
						handCardTongqianbiao.advEffect(myControlPlayer, myControlPlayer, true, false);
					}else if(selectHandCard.name==string_handCardNameWuqichaoyuan){
						// selectHandCard.removeFromParent();
						handCardWuqichaoyuan.advEffect(myControlPlayer, myControlPlayer, true, true);
					}else if(selectHandCard.name==string_handCardNameSoubaoshu){
						handCardSoubaoshu.advEffect(myControlPlayer, myControlPlayer, true, false);
					}else if(selectHandCard.name==string_handCardNameJimushui){
						handCardJimushui.advEffect(myControlPlayer, myControlPlayer, true, false);
					}else if(selectHandCard.name==string_handCardNameTianjian){
						handCardTianjian.advEffect(myControlPlayer, myControlPlayer, true, false);
					}else if(selectHandCard.name==string_handCardNameQiankundaopao){
						handCardQiankundaopao.advEffect(myControlPlayer, myControlPlayer, false, false);
					}else if(selectHandCard.name==string_handCardNameTayunxue){
						handCardTayunxue.advEffect(myControlPlayer, myControlPlayer, false, false);
					}else if(selectHandCard.name==string_handCardNameLonghunzhankai){
						handCardLonghunzhankai.advEffect(myControlPlayer, myControlPlayer, false, false);
					}else if(selectHandCard.name==string_handCardNameTiandijifu){
						handCardTiandijifu.advEffect(myControlPlayer, myControlPlayer, false, false);
					}else if(selectHandCard.name==string_handCardNameWucaixiayi){
						handCardWucaixiayi.advEffect(myControlPlayer, myControlPlayer, false, false);
					}else if(selectHandCard.name==string_handCardNameTianxuanwuyin){
						myControlPlayer.usedAttackCard=true;
						handCardTianxuanwuyin.advEffect(myControlPlayer, myControlPlayer, true, false);
					}else if(selectHandCard.name==string_handCardNameJincanwang){
						myControlPlayer.usedAttackCard=true;
						handCardJincanwang.advEffect(myControlPlayer,myControlPlayer,true,false);
					}else if(selectHandCard.name==string_handCardNameTiangangzhanqi){
						myControlPlayer.usedAttackCard=true;
						handCardTiangangzhanqi.advEffect(myControlPlayer, myControlPlayer, true, false);
					}else if(selectHandCard.name==string_handCardNameJinchantuoqiao){
						myControlPlayer.usedAttackCard=true;
						handCardJinchantuoqiao.advEffect(myControlPlayer, myControlPlayer, true, false);
					}else if(selectHandCard.name==string_handCardNameJiushen){
						myControlPlayer.usedAttackCard=true;
						handCardJiushen.advEffect(myControlPlayer, myControlPlayer, true, false);
					}else if(selectHandCard.name==string_handCardNameXiukoujinxinzhou){
						myControlPlayer.usedAttackCard=true;
						handCardXiukoujinxinzhou.advEffect(myControlPlayer, myControlPlayer, true, false);
					}else if(selectHandCard.name==string_handCardNameKaoya){
						myControlPlayer.usedAttackCard=true;
						handCardKaoya.advEffect(myControlPlayer, myControlPlayer, true, false);
					}else if(selectHandCard.name==string_handCardNameTianxiangxuminglu){
						handCardTianxiangxuminglu.advEffect(myControlPlayer, myControlPlayer, true, false);
					}else if(selectHandCard.name==string_handCardNameHuanmeihuazhou){
						handCardHuanmeihuazhou.advEffect(myControlPlayer, myControlPlayer, true, false);
					}else if(selectHandCard.name==string_handCardNameTiangangdouyi){
						handCardTiangangdouyi.advEffect(myControlPlayer, myControlPlayer, false, false);
					}else if(selectHandCard.name==string_handCardNameShiziyaoshuo){
						handCardShiziyaoshuo.advEffect(myControlPlayer, myControlPlayer, false, false);
					}
					selectHandCard=null;
				}else if(selectHandCard.clicked
						&& dropCarding  && !isBusiness ){
					selectHandCard.removeFromParent();
					selectHandCard.clicked = false;
					advRemove_Card_Into_DropDeck(selectHandCard.name);
					selectHandCard.release();
					myControlPlayer.handCard.removeObject(selectHandCard);
					var tempPlayer = nowPlayerTerm[nowPlayerNumber];
					var MAX = 3;
					if(boss._name==bossNameSheyaonan){
						MAX=1;
					}
					if (tempPlayer.skillNameList.containsObject(skillnameJianxia)) {
						MAX = 5;
					}
					if (tempPlayer.handCard.length<= MAX) {
						textAreaAddMessage(Text.dropHandCardOver, myText, listView);
						buttonManager(order1Button, false, false);
						buttonManager(order2Button, true, true);
						dropCarding = false;
					}
				}
			}
		}, this);
		//order2Button=ccui.helper.seekWidgetByName(mainscene.node, "order2");
		order2Button.addClickEventListener(function(){
			selectHandCard=null;
			for(var i=0;i<myControlPlayer.handCard.length;i++){
				myControlPlayer.handCard[i].clicked=false;
				myControlPlayer.handCard[i].setOpacity(200);
			}
			buttonManager(order2Button, false, false);
			nextStep++;
			advSendRoundMessageManager();
		});


		this.addChild(root);
	},
	initSkillButton:function(){
		player1.skill1Button=player1SkillButton1;
		player1.skill2Button=player1SkillButton2;
		player1.skill3Button=player1SkillButton3;
		player1.playerArmText=player1ArmText;
		player1.playerDefenseText=player1DefenseText;
		player1.playerPet1Text=player1Pet1Text;
		player1.playerPet2Text=player1Pet2Text;
		player1.playerPet3Text=player1Pet3Text;
		player1.playerPet4Text=player1Pet4Text;
		player1.playerPet5Text=player1Pet5Text;

		player2.skill1Button=player2SkillButton1;
		player2.skill2Button=player2SkillButton2;
		player2.skill3Button=player2SkillButton3;
		player2.playerArmText=player2ArmText;
		player2.playerDefenseText=player2DefenseText;
		player2.playerPet1Text=player2Pet1Text;
		player2.playerPet2Text=player2Pet2Text;
		player2.playerPet3Text=player2Pet3Text;
		player2.playerPet4Text=player2Pet4Text;
		player2.playerPet5Text=player2Pet5Text;

		player3.skill1Button=player3SkillButton1;
		player3.skill2Button=player3SkillButton2;
		player3.skill3Button=player3SkillButton3;
		player3.playerArmText=player3ArmText;
		player3.playerDefenseText=player3DefenseText;
		player3.playerPet1Text=player3Pet1Text;
		player3.playerPet2Text=player3Pet2Text;
		player3.playerPet3Text=player3Pet3Text;
		player3.playerPet4Text=player3Pet4Text;
		player3.playerPet5Text=player3Pet5Text;
		//玩家1技能1的长按说明
		var longClikcFunction_player1Skill1=function(){
			isLongClick=true;
			mainScene.addChild(new messageDialogLayer(myControlPlayer.skill_1+"\n"+myControlPlayer.skill1Effect,function(){
				isLongClick=false;
			}));
		}

		myControlPlayer.skill1Button.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(longClikcFunction_player1Skill1, 1);
			}else if(type==2){
				this.unschedule(longClikcFunction_player1Skill1);
				if(isLongClick){
					isLongClick=false;
				}else{
					if(nextStep==1&&!skill2Useing&& !skill3Useing){
						// 技牌阶段可以使用的技能
						if(nowPlayerTerm[nowPlayerNumber]._name==nameAnu){
							advSkillCharacters_AnuGuilingjing();
						}else{
							advSkillCharacters_KonglinLashoucuihua();
							advSkillCharacters_ChonglouJuedou();
							advSkillCharacters_NangonghuangZhanbu();
							advSkillCharacters_XingxuanPengren();
							advSkillCharacters_WangpengxuTaotie();
							advSkillCharacters_HanlinshaSounangtanbao(myControlPlayer);
						}
					}
				}
			}
		}, myControlPlayer.skill1Button);

		//玩家1技能2的长按说明
		var longClikcFunction_player1Skill2=function(){
			isLongClick=true;
			mainScene.addChild(new messageDialogLayer(myControlPlayer.skill_2+"\n"+myControlPlayer.skill2Effect,function(){
				isLongClick=false;
			}));
		}
		myControlPlayer.skill2Button.addTouchEventListener(function(sender,type){
			if(type==0){
				player1SkillButton2.scheduleOnce(longClikcFunction_player1Skill2, 1);
			}else if(type==2){
				player1SkillButton2.unschedule(longClikcFunction_player1Skill2);
				if(isLongClick){
					isLongClick=false;
					return;
				}else{
					if(nextStep==1){
						if(myControlPlayer._name==nameShenqishuang){
							advSkillCharacters_ShenqishuangYuanlingguixinshu(nowPlayerTerm[nowPlayerNumber]);
						}else{
							advSkillCharacters_XingxuanXiongdi();
							advSkillCharacters_HanlinshaJiefujipin(myControlPlayer);
							advSkillCharacters_TangyurouNitianzhen(myControlPlayer);
							advSkillCharacters_YanshiqiongbingHuitianmiedi(myControlPlayer)
							advSkillCharacters_LongkuiRongzhu(myControlPlayer);
							advSkillCharacters_LongkuiguiKongjian(myControlPlayer);
						}
					}
					else if(nextStep==2||nextStep==3){
						if(myControlPlayer._name==nameTangxuejian){
							advSkillCharacters_TangxuejianLianji();
						}else{
							advSkillCharacters_BaiyueZhaohuanshuimoshou(myControlPlayer);
							advSkillCharacters_YuntianheHouyisherigong(myControlPlayer);
							advSkillCharacters_JiangshiliXishen(myControlPlayer);
						}
					}
					advSkillCharacters_WangpengxuHechengshipin();
				}
			}
		}, myControlPlayer.skill2Button);

		//玩家1技能3的长按说明
		var longClikcFunction_player1Skill3=function(){
			isLongClick=true;
			mainScene.addChild(new messageDialogLayer(myControlPlayer.skill_3+"\n"+myControlPlayer.skill3Effect,function(){
				isLongClick=false;
			}));
		}
		myControlPlayer.skill3Button.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(longClikcFunction_player1Skill3, 1);
			}else if(type==2){
				this.unschedule(longClikcFunction_player1Skill3);
				if(isLongClick){
					isLongClick=false;
				}else{
					advSkillCharacters_XiaomanLianyao();
					if(nextStep==1){
						advSkillCharacters_OuyanghuiLitianji(myControlPlayer);
					}else if(nextStep==2||nextStep==3){
						if(myControlPlayer._name==nameTangxuejian){
							advSkillCharacters_TangxuejianHaosheng();
						}
					}
				}
			}
		}, myControlPlayer.skill3Button);


		//玩家2技能1的长按说明
		var longClikcFunction_player2Skill1=function(){
			isLongClick=true;
			mainScene.addChild(new messageDialogLayer(otherControlPlayer1.skill_1+"\n"+otherControlPlayer1.skill1Effect,function(){
				isLongClick=false;
			}));
		}
		//player2SkillButton1=ccui.helper.seekWidgetByName(mainscene.node, "player2Skill1Button");
		otherControlPlayer1.skill1Button.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(longClikcFunction_player2Skill1, 1);
			}else if(type==2){
				this.unschedule(longClikcFunction_player2Skill1);
				if(isLongClick){
					isLongClick=false;
				}
			}
		}, otherControlPlayer1.skill1Button);

		//玩家2技能2的长按说明
		var longClikcFunction_player2Skill2=function(){
			isLongClick=true;
			mainScene.addChild(new messageDialogLayer(otherControlPlayer1.skill_2+"\n"+otherControlPlayer1.skill2Effect,function(){
				isLongClick=false;
			}));
		}
		otherControlPlayer1.skill2Button.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(longClikcFunction_player2Skill2, 1);
			}else if(type==2){
				this.unschedule(longClikcFunction_player2Skill2);
				if(isLongClick){
					isLongClick=false;
				}
			}
		}, otherControlPlayer1.skill2Button);

		//玩家2技能3的长按说明
		var longClikcFunction_player2Skill3=function(){
			isLongClick=true;
			mainScene.addChild(new messageDialogLayer(otherControlPlayer1.skill_3+"\n"+otherControlPlayer1.skill3Effect,function(){
				isLongClick=false;
			}));
		}
		otherControlPlayer1.skill3Button.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(longClikcFunction_player2Skill3, 1);
			}else if(type==2){
				this.unschedule(longClikcFunction_player2Skill3);
				if(isLongClick){
					isLongClick=false;
				}
			}
		}, otherControlPlayer1.skill3Button);

		//玩家3技能1的长按说明
		var longClikcFunction_player3Skill1=function(){
			isLongClick=true;
			mainScene.addChild(new messageDialogLayer(otherControlPlayer2.skill_1+"\n"+otherControlPlayer2.skill1Effect,function(){
				isLongClick=false;
			}));
		}
		otherControlPlayer2.skill1Button.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(longClikcFunction_player3Skill1, 1);
			}else if(type==2){
				this.unschedule(longClikcFunction_player3Skill1);
				if(isLongClick){
					isLongClick=false;
				}
			}
		}, otherControlPlayer2.skill1Button);

		//玩家3技能2的长按说明
		var longClikcFunction_player3Skill2=function(){
			isLongClick=true;
			mainScene.addChild(new messageDialogLayer(otherControlPlayer2.skill_2+"\n"+otherControlPlayer2.skill2Effect,function(){
				isLongClick=false;
			}));
		}
		//player3SkillButton2=ccui.helper.seekWidgetByName(mainscene.node, "player3Skill2Button");
		otherControlPlayer2.skill2Button.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(longClikcFunction_player3Skill2, 1);
			}else if(type==2){
				this.unschedule(longClikcFunction_player3Skill2);
				if(isLongClick){
					isLongClick=false;
				}
			}

		}, otherControlPlayer2.skill2Button);

		//玩家3技能3的长按说明
		var longClikcFunction_player3Skill3=function(){
			isLongClick=true;
			mainScene.addChild(new messageDialogLayer(otherControlPlayer2.skill_3+"\n"+otherControlPlayer2.skill3Effect,function(){
				isLongClick=false;
			}));
		}
		otherControlPlayer2.skill3Button.addTouchEventListener(function(sender,type){
			if(type==0){
				this.scheduleOnce(longClikcFunction_player3Skill3, 1);
			}else if(type==2){
				this.unschedule(longClikcFunction_player3Skill3);
				if(isLongClick){
					isLongClick=false;
				}
			}

		}, otherControlPlayer2.skill3Button);


		bossSkillButton.addClickEventListener(function(){
			mainScene.addChild(new messageDialogLayer(boss.skill_1));
		});

		// 设置武器
		myControlPlayer.playerArmText.addTouchEventListener(function(sender,type){
			if(type==2&&nowPlayerTerm[nowPlayerNumber]._name==myControlPlayer._name){
				switch(nextStep){
				case 1:
					mojianDiandangEffectInEqumentZone(function(){
						if(myControlPlayer.arms1!=Text.nil){
							advSkillCharacters_MurongziyingZengjian_Arm();
							advSkillCharacters_LongkuiguiJianhun(myControlPlayer,"myControlPlayer.arms1",myControlPlayer.arms1,SelectCardType.ARMS1);
						}
					});
					break;
				case 2:
				case 3:
					if(myControlPlayer.arms1!=Text.nil){
						advSkillCharacters_LongkuiJianling(myControlPlayer, "myControlPlayer.arms1",myControlPlayer.arms1);
					}
					break;
				}
			}
		}, myControlPlayer.playerArmText);

		// 设置防具
		//player1DefenseText=ccui.helper.seekWidgetByName(mainscene.node, "player1DefenseText");
		myControlPlayer.playerDefenseText.addTouchEventListener(function(sender,type){
			if(type==2){
				if(myControlPlayer.defense!=Text.nil){
					switch (nextStep) {
					case 1:
						advSkillCharacters_MurongziyingZengjian_Defense();
						advSkillCharacters_LongkuiguiJianhun(myControlPlayer,"myControlPlayer.defense",myControlPlayer.defense,SelectCardType.DEFENSE);
						break;
					case 2:
					case 3:
						advSkillCharacters_LongkuiJianling(myControlPlayer, "myControlPlayer.defense",myControlPlayer.defense);
						break;
					}
				}
			}
		}, myControlPlayer.playerDefenseText);

		// 设置宠物
		myControlPlayer.playerPet1Text.addTouchEventListener(function(sender,type){
			if(type==2){
				if(myControlPlayer.pet_FengMonster != null
						&& myControlPlayer.pet_FengMonster.name==nameGoumang){
					addDialog(mainScene, new yesOrNoDialogLayer(Text.askBaofaGoumang,function(result){
						if(result){
							if(fight_Trigger.length>0){
								myControlPlayer.pet_FengMonster.name+=Text.baofa;
							}else{
								updata_PetsEffect(myControlPlayer.pet_FengMonster,myControlPlayer);
								myControlPlayer.pet_FengMonster = null;
								myControlPlayer.pet_Feng = Text.petFeng;
								advSkillCharacters_ZhaolingerMengshe();
							}
							var tempList = new Array();
							for(var i=0;i<myControlPlayer.friendList.length;i++){
								if(myControlPlayer.friendList[i].hp>0){
									tempList.push(myControlPlayer.friendList[i]);
								}
							}
							var addCardPlayerList=new Array();
							var addCardNumberList=new Array();
							for (var i=0;i<tempList.length;i++) {
								var tempNum = tempList[i].handCard.length;
								for(var t=0;t<tempList[i].handCard.length;t++){
									advRemove_Card_Into_DropDeck(tempList[i].handCard[t].name);
									if(tempList[i]._name==myControlPlayer._name){
										tempList[i].handCard[t].removeFromParent();
									}
								}
								tempList[i].handCard=new Array();
								addCardPlayerList.push(tempList[i]);
								addCardNumberList.push(tempNum);
								textAreaAddMessage(Text.changeCardFromDeck.format(tempList[i]._name), myText, listView);
							}
							advAddHandCard(addCardPlayerList,addCardPlayerList[0],addCardPlayerList[0],null,addCardNumberList,true,true);
						}
					}));
				}
			}
		});
		myControlPlayer.playerPet4Text.addClickEventListener(function(){
			if(myControlPlayer.pet_HuoMonster != null
					&& myControlPlayer.pet_HuoMonster.name==nameFeifei&&(nextStep==2||nextStep==3)){
				addDialog(mainScene, new yesOrNoDialogLayer(Text.askBaofaFeifei,function(result){
					if(result){
						textAreaAddMessage(Text.baofaFeifeiEffect.format(myControlPlayer._name), myText, listView);
						triggerCombat += 3;
						myControlPlayer.pet_HuoMonster.name+= Text.baofa;
					}
				}));
			}

		});

		var monsterLabelLongClickFunction=function(){
			isLongClick=true;
			var message;
			if(tempMonster.dodge>0){
				message=Text.monsterMsgShow.format(tempMonster.name,tempMonster.combat,tempMonster.dodge,tempMonster.petEffectText,tempMonster.openEffectText,tempMonster.winEffectText,tempMonster.loseEffectText);
			}else if(tempMonster.level!=Text.crisis){
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
	},
	updateUI:function(){
		handCardDeckNumber.setString(Text.handCardDeck.format(game_HandCard_Start.length));
		monsterCardDeckNumber.setString(Text.monsterDeck.format(game_MonsterDeck.length));
		dropCardDeckNumber.setString(Text.dropDeck.format(game_DropHandCard.length));

		triggerCombatBMFont.setString(triggerCombat);
		monsterCombatBMFont.setString(monsterCombat);
		if(boss.dongmingbaojingList!=undefined){
			bossDongmingbaojingText.setString(boss.dongmingbaojingList.length);
		}
		if(boss.bingxingjueList!=undefined){
			bossBingxinjueText.setString(boss.bingxingjueList.length);	//boss当前冰心诀数量
		}
		if(boss.yinguList!=undefined){
			bossYinguText.setString(boss.yinguList.length);	//boss当前隐蛊数量
		}
		if(boss.lingquanList!=undefined){
			bossLingquanText.setString(boss.lingquanList.length); //boss当前灵泉数量
		}
		if(boss.monsterList!=undefined){
			bossPetText.setString(boss.monsterList.length);; //boss当前获得的怪物数量
		}
		player1hpText.setString(player1.hp+"/"+player1.maxHP);
		player2hpText.setString(player2.hp+"/"+player2.maxHP);
		player3hpText.setString(player3.hp+"/"+player3.maxHP);
		if(boss._name==bossNameMoyiYanshiqiongbing){
			bosshpText.setString(Text.infinite);
		}else{
			bosshpText.setString(boss.hp+"/"+boss.maxHP);
		}

		if(player1HandCardText!=null){
			player1HandCardText.setString(player1.handCard.length);
		}
		if(player2HandCardText!=null){
			player2HandCardText.setString(player2.handCard.length);
		}
		if(player3HandCardText!=null){
			player3HandCardText.setString(player3.handCard.length);
		}
		bossHandCardText.setString(boss.handCard.length);

		
		myControlPlayer.skill1Button.loadTextures(myControlPlayer.skillButton1,myControlPlayer.skillButton1,myControlPlayer.skillButton1,ccui.Widget.LOCAL_TEXTURE);
		myControlPlayer.skill2Button.loadTextures(myControlPlayer.skillButton2,myControlPlayer.skillButton2,myControlPlayer.skillButton2,ccui.Widget.LOCAL_TEXTURE);
		//player1SkillButton1.loadTextures(player1.skillButton1,player1.skillButton1,player1.skillButton1,ccui.Widget.LOCAL_TEXTURE);
		//player1SkillButton2.loadTextures(player1.skillButton2,player1.skillButton2,player1.skillButton2,ccui.Widget.LOCAL_TEXTURE);
		if(myControlPlayer.skill_3==Text.nil||myControlPlayer.skill_3==""){
			myControlPlayer.skill3Button.setVisible(false);
		}else{
			myControlPlayer.skill3Button.setVisible(true);
			myControlPlayer.skill3Button.loadTextures(myControlPlayer.skillButton3,myControlPlayer.skillButton3,myControlPlayer.skillButton3,ccui.Widget.LOCAL_TEXTURE);
		}
		/*if(player1.skill_3==Text.nil||player1.skill_3==""){
			player1SkillButton3.setVisible(false);
		}else{
			player1SkillButton3.setVisible(true);
			player1SkillButton3.loadTextures(player1.skillButton3,player1.skillButton3,player1.skillButton3,ccui.Widget.LOCAL_TEXTURE);
		}
		player2SkillButton1.loadTextures(player2.skillButton1,player2.skillButton1,player2.skillButton1,ccui.Widget.LOCAL_TEXTURE);
		player2SkillButton2.loadTextures(player2.skillButton2,player2.skillButton2,player2.skillButton2,ccui.Widget.LOCAL_TEXTURE);
		if(player2.skill_3==Text.nil||player2.skill_3==""){
			player2SkillButton3.setVisible(false);
		}else{
			player2SkillButton3.setVisible(true);
			player2SkillButton3.loadTextures(player2.skillButton3,player2.skillButton3,player2.skillButton3,ccui.Widget.LOCAL_TEXTURE);
		}
		player3SkillButton1.loadTextures(player3.skillButton1,player3.skillButton1,player3.skillButton1,ccui.Widget.LOCAL_TEXTURE);
		player3SkillButton2.loadTextures(player3.skillButton2,player3.skillButton2,player3.skillButton2,ccui.Widget.LOCAL_TEXTURE);
		if(player3.skill_3==Text.nil||player3.skill_3==Text.nil){
			player3SkillButton3.setVisible(false);
		}else{
			player3SkillButton3.setVisible(true);
			player3SkillButton3.loadTextures(player3.skillButton3,player3.skillButton3,player3.skillButton3,ccui.Widget.LOCAL_TEXTURE);
		}*/
		/*if(boss.skill_1==Text.nil){
			bossSkillButton.setVisible(false);
		}else{
			bossSkillButton.setVisible(true);
			bossSkillButton.loadTextures(boss.skillButton1,boss.skillButton1,boss.skillButton1,ccui.Widget.LOCAL_TEXTURE);
		}*/

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
		boss.combat = boss.maxCombat+boss.arms1Combat+boss.arms2Combat+boss.defenseCombat+boss.petsCombat+boss.skillAddCombat+boss.tempAddCombat+boss.tempZhuangbeiSkillCombat;
		if(boss.combat<0){
			boss.combat=0;
		}
		if(boss.hp>0){
			bossCombatText.setString(boss.combat);
		}else{
			bossCombatText.setString(boss.maxCombat);
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
		bossArmText.setString(boss.arms1);

		player1DefenseText.setString(player1.defense);
		player2DefenseText.setString(player2.defense);
		player3DefenseText.setString(player3.defense);
		bossDefenseText.setString(boss.defense);

		if(player1.pet_FengMonster!=null){
			player1Pet1Text.setString(player1.pet_FengMonster.name);
		}else{
			player1Pet1Text.setString(Text.petFeng);
		}
		if(player1.pet_LeiMonster!=null){
			player1Pet2Text.setString(player1.pet_LeiMonster.name);
		}else{
			player1Pet2Text.setString(Text.petLei);
		}
		if(player1.pet_ShuiMonster!=null){
			player1Pet3Text.setString(player1.pet_ShuiMonster.name);
		}else{
			player1Pet3Text.setString(Text.petShui);
		}
		if(player1.pet_HuoMonster!=null){
			player1Pet4Text.setString(player1.pet_HuoMonster.name);
		}else{
			player1Pet4Text.setString(Text.petHuo);
		}
		if(player1.pet_TuMonster!=null){
			player1Pet5Text.setString(player1.pet_TuMonster.name);
		}else{
			player1Pet5Text.setString(Text.petTu);
		}

		if(player2.pet_FengMonster!=null){
			player2Pet1Text.setString(player2.pet_FengMonster.name);
		}else{
			player2Pet1Text.setString(Text.petFeng);
		}
		if(player2.pet_LeiMonster!=null){
			player2Pet2Text.setString(player2.pet_LeiMonster.name);
		}else{
			player2Pet2Text.setString(Text.petLei);
		}
		if(player2.pet_ShuiMonster!=null){
			player2Pet3Text.setString(player2.pet_ShuiMonster.name);
		}else{
			player2Pet3Text.setString(Text.petShui);
		}
		if(player2.pet_HuoMonster!=null){
			player2Pet4Text.setString(player2.pet_HuoMonster.name);
		}else{
			player2Pet4Text.setString(Text.petHuo);
		}
		if(player2.pet_TuMonster!=null){
			player2Pet5Text.setString(player2.pet_TuMonster.name);
		}else{
			player2Pet5Text.setString(Text.petTu);
		}

		if(player3.pet_FengMonster!=null){
			player3Pet1Text.setString(player3.pet_FengMonster.name);
		}else{
			player3Pet1Text.setString(Text.petFeng);
		}
		if(player3.pet_LeiMonster!=null){
			player3Pet2Text.setString(player3.pet_LeiMonster.name);
		}else{
			player3Pet2Text.setString(Text.petLei);
		}
		if(player3.pet_ShuiMonster!=null){
			player3Pet3Text.setString(player3.pet_ShuiMonster.name);
		}else{
			player3Pet3Text.setString(Text.petShui);
		}
		if(player3.pet_HuoMonster!=null){
			player3Pet4Text.setString(player3.pet_HuoMonster.name);
		}else{
			player3Pet4Text.setString(Text.petHuo);
		}
		if(player3.pet_TuMonster!=null){
			player3Pet5Text.setString(player3.pet_TuMonster.name);
		}else{
			player3Pet5Text.setString(Text.petTu);
		}
	}
})