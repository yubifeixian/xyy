function bossUseHandCard(canUseWulingjingxie,callBack){
	if(boss.handCard.length>0){
		if(boss._name==bossNameShushanqisheng&&boss.handCard.length>=7&&!boss.everyRoundSkill_1){
			textAreaAddMessage(Text.bossForceTakeOverHandCard, myText, listView);
			boss.everyRoundSkill_1=true;
		}
		var cardName=boss.handCard[0].name;
		boss.handCard.remove(0);
		switch(cardName){
		case string_handCardNameLinghuxiandan:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.linghuxiandan_png, function(){
					useWulingjingxie(player1,canUseWulingjingxie,function(){
						advUseBingxingjue(boss, boss, function(){
							bossLinghuxiandanEffect(function(){
								bossUseHandCardHelper(cardName,true,callBack);
							});
						},function(){
							bossUseHandCardHelper(cardName,true,callBack);
						});
					});
				});
			});
			break;
		case string_handCardNameYingu:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.yingu_png, function(){
					useWulingjingxie(player1, canUseWulingjingxie,function(){
						boss.yinguList.push(boss.handCard[0]);
						bossUseHandCardHelper(cardName,false,callBack);
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameKuicetianji:
			textAreaAddMessage(Text.bossForceHunzhan.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.kuicetianji_png, function(){
					useWulingjingxie(player1, canUseWulingjingxie,function(){
						bossUseDongmingbaojing=true;
						bossUseHandCardHelper(cardName,true,callBack);
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameDongmingbaojing:
			textAreaAddMessage(Text.bossForceHunzhan.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.dongmingbaojing_png, function(){
					useWulingjingxie(player1,canUseWulingjingxie, function(){
						bossUseDongmingbaojing=true;
						bossUseHandCardHelper(cardName,true,callBack);
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameBingxinjue:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				boss.bingxingjueList.push(boss.handCard[0]);
				playCardAnimation(resPng.bingxinjue_png, function(){
					useWulingjingxie(player1,canUseWulingjingxie, function(){
						bossUseHandCardHelper(cardName,false,callBack);
					}, callBack);
				});
			});
			break;
		case string_handCardNameWuqichaoyuan:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.wuqichaoyuan_png, function(){
					useWulingjingxie(player1,canUseWulingjingxie, function(){
						advUseBingxingjue(boss, boss, function(){
							bossWuqichaoyuanEffect(function(){
								bossUseHandCardHelper(cardName,true,callBack);
							});
						});
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameTianleipo:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.tianleipo_png, function(){
					useWulingjingxie(player1,canUseWulingjingxie, function(){
						advUseBingxingjue(boss, boss, function(){
							bossTianleipoEffect(function(){
								bossUseHandCardHelper(cardName,true,callBack);
							});
						});
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameTongqianbiao:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.tongqianbiao_png, function(){
					useWulingjingxie(player1,canUseWulingjingxie, function(){
						advUseBingxingjue(boss, boss, function(){
							bossTongqianbiaoEffect(function(){
								bossUseHandCardHelper(cardName,true,callBack);
							});
						});
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameToudao:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.toudao_png, function(){
					useWulingjingxie(player1,canUseWulingjingxie, function(){
						advUseBingxingjue(boss, boss, function(){
							bossToudaoEffect(function(){
								bossUseHandCardHelper(cardName,true,callBack);
							});
						});
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameShuerguo:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.shuerguo_png, function(){
					useWulingjingxie(player1, canUseWulingjingxie,function(){
						advUseBingxingjue(boss, boss, function(){
							bossShuerguoEffect(function(){
								bossUseHandCardHelper(cardName,true,callBack);
							});
						});
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameTiangangzhanqi:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.tiangangzhanqi_png, function(){
					useWulingjingxie(player1, canUseWulingjingxie,function(){
						advUseBingxingjue(boss, boss, function(){
							bossTiangangzhanqiEffect(function(){
								bossUseHandCardHelper(cardName,true,callBack);
							});
						});
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameTianxuanwuyin:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.tianxuanwuyin_png, function(){
					useWulingjingxie(player1, canUseWulingjingxie,function(){
						advUseBingxingjue(boss, boss, function(){
							bossTianxuanwuyinEffect(function(){
								bossUseHandCardHelper(cardName,true,callBack);
							});
						});
					},  function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameJincanwang:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.jincanwang_png, function(){
					useWulingjingxie(player1, canUseWulingjingxie,function(){
						advUseBingxingjue(boss, boss, function(){
							bossJincanwangEffect(function(){
								bossUseHandCardHelper(cardName,true,callBack);
							});
						});
					},  function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameJinchantuoqiao:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.jinchantuoqiao_png, function(){
					useWulingjingxie(player1,canUseWulingjingxie, function(){
						advUseBingxingjue(boss, boss, function(){
							bossJinchantuoqiaoEffect(function(){
								nextStep=5;
								roundAttackEnd();
							},function(){
								bossUseHandCardHelper(cardName,true,callBack);
							});
						});
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameMojian:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.mojian_png, function(){
					useWulingjingxie(player1,canUseWulingjingxie, function(){
						bossMojianEffect(function(){
							bossUseHandCardHelper(cardName,false,callBack);
						});
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameModaotianzha:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.tianzha_png, function(){
					useWulingjingxie(player1,canUseWulingjingxie, function(){
						bossModaotianzhaEffect(function(){
							bossUseHandCardHelper(cardName,false,callBack);
						});
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameWuchenjian:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.wuchenjian_png, function(){
					useWulingjingxie(player1,canUseWulingjingxie, function(){
						bossWuchenjianEffect(function(){
							bossUseHandCardHelper(cardName,false,callBack);
						});
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameTianshezhang:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.tianshezhang_png, function(){
					useWulingjingxie(player1,canUseWulingjingxie, function(){
						bossTianshezhangEffect(function(){
							bossUseHandCardHelper(cardName,false,callBack);
						});
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameCaihuan:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.caihuan_png, function(){
					useWulingjingxie(player1, canUseWulingjingxie,function(){
						bossCaihuanEffect(function(){
							bossUseHandCardHelper(cardName,false,callBack);
						});
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameQiankundaopao:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.qiankundaopao_png, function(){
					useWulingjingxie(player1, canUseWulingjingxie,function(){
						qiankundaopaoEffect(boss,function(){
							monsterCombat+=1;
							bossUseHandCardHelper(cardName,false,callBack);
						});
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameLonghunzhankai:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.longhunzhankai_png, function(){
					useWulingjingxie(player1, canUseWulingjingxie,function(){
						longhunzhankaiEffect(boss,function(){
							bossUseHandCardHelper(cardName,false,callBack);
						});
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameTiandijifu:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.tiandijifu_png, function(){
					useWulingjingxie(player1, canUseWulingjingxie,function(){
						tiandijifuEffect(boss,function(){
							bossUseHandCardHelper(cardName,false,callBack);
						});
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameTayunxue:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.tayunxue_png, function(){
					useWulingjingxie(player1, canUseWulingjingxie,function(){
						tayunxueEffect(boss,function(){
							bossUseHandCardHelper(cardName,false,callBack);
						});
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		case string_handCardNameWucaixiayi:
			textAreaAddMessage(Text.bossTakeOverCard.format(boss._name,cardName), myText, listView,function(){
				playCardAnimation(resPng.wucaixiayi_png, function(){
					useWulingjingxie(player1, canUseWulingjingxie,function(){
						wucaixiayiEffect(boss,function(){
							monsterCombat+=1;
							bossUseHandCardHelper(cardName,false,callBack);
						});
					}, function(){
						bossUseHandCardHelper(cardName,true,callBack);
					});
				});
			});
			break;
		default:
			textAreaAddMessage(Text.bossTakeOverXianbao.format(boss._name,cardName), myText, listView,function(){
				useWulingjingxie(player1, canUseWulingjingxie,function(){
					bossUseHandCardHelper(cardName,true, callBack);
				}, function(){
					bossUseHandCardHelper(cardName,true, callBack);
				});
			});
			break;
		}
	}else{
		callBack();
	}
}


function bossUseHandCardHelper(cardName,shouldDrop,callBack){
	if(shouldDrop){
		remove_Card_Into_DropDeck(cardName);
	}
	if(boss.handCard.length>0){
		// 当魔主是“蜀山七圣”，且手牌数量小于7张时的处理：
		if(boss._name==bossNameShushanqisheng&&!boss.everyRoundSkill_1){
			mainScene.runAction(cc.Sequence.create( cc.DelayTime.create(0.3), cc.CallFunc.create(function () {
				addDialog(mainScene, new yesOrNoDialogLayer("是否继续翻开并执行下一张魔主手牌?",function(result){
					if(result){
						bossUseHandCard(false,callBack);
					}else{
						callBack();
					}
				}));
			}))); 
		}else{
			mainScene.runAction(cc.Sequence.create( cc.DelayTime.create(0.3), cc.CallFunc.create(function () {
				// 执行下一个代码
				bossUseHandCard(false,callBack);
			}))); 
		}
	}else{
		textAreaAddMessage(boss._name+"的手牌翻取完毕", myText, listView);
		callBack();
		buttonManager(order2Button, true, true);
	}
}