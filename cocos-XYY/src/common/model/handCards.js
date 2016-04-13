var Card=function(name){
	this.name=name;
}

// 挑战模式卡牌效果
Card.prototype.effect=function(usePlayer,effectPlayer,shouldDrop,canDiandang,callBack){
	var temp=this;
	if(shouldDrop){
		remove_Card_Into_DropDeck(this.name);
	}
	if(this.name==string_handCardNameLinghuxiandan){
		AchivementProgress.addAchivementProgress(initAchivement.achivementLinghuxiandan);
		mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
			textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,temp.name), myText, listView,function(){
				playCardAnimation("res/drawable-hdpi/linghuxiandan.png",function(){
					useBingxingjue(usePlayer, usePlayer, function(){
						skillCharacters_TangyurouYongshengdiao(effectPlayer,linghuxiandanEffect,callBack);
						// linghuxiandanEffect(effectPlayer,callBack)
					});
				});
			});
		}));

	}else if(this.name==string_handCardNameTianleipo){
		AchivementProgress.addAchivementProgress(initAchivement.achivementTianleipo);
		mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
			textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,temp.name), myText, listView,function(){
				playCardAnimation("res/drawable-hdpi/tianleipo.png", function(){
					useBingxingjue(usePlayer, usePlayer, function(){
						tianleipoEffect(usePlayer,callBack)
					});
				});
			});
		}));
	}else if(this.name==string_handCardNameShuerguo){
		AchivementProgress.addAchivementProgress(initAchivement.achivementShuerguo);
		mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
			textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,temp.name), myText, listView,function(){
				playCardAnimation("res/drawable-hdpi/shuerguo.png", function(){
					useBingxingjue(usePlayer, usePlayer, function(){
						shuerguoEffect(effectPlayer,callBack)
					});
				});
			});
		}));
	}else if(this.name==string_handCardNameKuicetianji){
		AchivementProgress.addAchivementProgress(initAchivement.achivementKuicetianji);
		mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
			textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,temp.name), myText, listView,function(){
				playCardAnimation("res/drawable-hdpi/kuicetianji.png", function(){
					useBingxingjue(usePlayer, usePlayer, function(){
						kuicetianjiEffect(usePlayer,callBack);
					});
				});
			});
		}));
	}else if(this.name==string_handCardNameToudao){
		AchivementProgress.addAchivementProgress(initAchivement.achivementToudao);
		mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
			textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,temp.name), myText, listView,function(){
				playCardAnimation("res/drawable-hdpi/toudao.png", function(){
					useAnyTimeSkill(function(){
						useBingxingjue(usePlayer, usePlayer, function(){
							toudaoEffect(usePlayer,callBack);
						});
					})
				});
			});
		}));
	}else if(this.name==string_handCardNameTongqianbiao){
		AchivementProgress.addAchivementProgress(initAchivement.achivementTongqianbiao);
		mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
			textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,temp.name), myText, listView,function(){
				playCardAnimation("res/drawable-hdpi/tongqianbiao.png", function(){
					useAnyTimeSkill(function(){
						useBingxingjue(usePlayer, usePlayer, function(){
							tongqianbiaoEffect(usePlayer,callBack)
						});
					});
				});
			});
		}));
	}else if(this.name==string_handCardNameWuqichaoyuan){
		AchivementProgress.addAchivementProgress(initAchivement.achivementWuqichaoyuan);
		mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
			textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,temp.name), myText, listView,function(){
				playCardAnimation("res/drawable-hdpi/wuqichaoyuan.png", function(){
					wuqichaoyuanEffect(usePlayer,canDiandang,callBack);
				});
			});
		}));
	}else if(this.name==string_handCardNameCaihuan){
		mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
			textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,temp.name), myText, listView,function(){
				playCardAnimation("res/drawable-hdpi/caihuan.png", function(){
					skillCharacters_ZhaolingerShuangjian(usePlayer, caihuanEffect,callBack);
				});
			});
		}));
	}else if(this.name==string_handCardNameTianshezhang){
		mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
			textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,temp.name), myText, listView,function(){
				playCardAnimation("res/drawable-hdpi/tianshezhang.png", function(){
					skillCharacters_ZhaolingerShuangjian(usePlayer, tianshezhangEffect,callBack);
				});
			});
		}));
	}else if(this.name==string_handCardNameWuchenjian){
		mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
			textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,temp.name), myText, listView,function(){
				playCardAnimation("res/drawable-hdpi/wuchenjian.png", function(){
					skillCharacters_ZhaolingerShuangjian(usePlayer, wuchenjianEffect,callBack);
				});
			});
		}));
	}else if(this.name==string_handCardNameModaotianzha){
		textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,temp.name), myText, listView,function(){
			playCardAnimation("res/drawable-hdpi/tianzha.png", function(){
				skillCharacters_ZhaolingerShuangjian(usePlayer, modaotianzhaEffect,callBack);
			});
		});
	}else if(this.name==string_handCardNameMojian){
		if(usePlayer._name==player1._name){
			addDialog(mainScene, new ChooseZoneLayer(Text.askDiandang,function(result){
				if(result){
					remove_Card_Into_DropDeck(string_handCardNameMojian);
					textAreaAddMessage(Text.addHandCard.format(usePlayer._name,2), myText, listView);
					addHandCard([usePlayer],usePlayer,usePlayer,null,[2],true,true,callBack);
				}else{
					mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
						textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,temp.name), myText, listView,function(){
							playCardAnimation("res/drawable-hdpi/mojian.png", function(){
								skillCharacters_ZhaolingerShuangjian(usePlayer, mojianEffect,callBack);
							});
						});
					}));
				}
			}));
		}else{
			// AI处理典当或装备魔剑
			if(usePlayer.arms1!=Text.nil||usePlayer.handCard.length==0){
				remove_Card_Into_DropDeck(string_handCardNameMojian);
				textAreaAddMessage(Text.diandangMojian.format(usePlayer._name), myText, listView);
				addHandCard([usePlayer],usePlayer,usePlayer,null,[2],true,true,callBack);
			}else{
				mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
					textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,temp.name), myText, listView,function(){
						playCardAnimation("res/drawable-hdpi/mojian.png", function(){
							skillCharacters_ZhaolingerShuangjian(usePlayer, mojianEffect,callBack);
						});
					});
				}));
			}
		}
		
	}else if(this.name==string_handCardNameQiankundaopao){
		mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
			textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,temp.name), myText, listView,function(){
				playCardAnimation("res/drawable-hdpi/qiankundaopao.png", function(){
					qiankundaopaoEffect(usePlayer,callBack);
				});
			});
		}));
	}else if(this.name==string_handCardNameTayunxue){
		mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
			textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,temp.name), myText, listView,function(){
				playCardAnimation("res/drawable-hdpi/tayunxue.png", function(){
					tayunxueEffect(usePlayer,callBack);
				});
			});
		}));
	}else if(this.name==string_handCardNameLonghunzhankai){
		mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
			textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,temp.name), myText, listView,function(){
				playCardAnimation("res/drawable-hdpi/longhunzhankai.png", function(){
					longhunzhankaiEffect(usePlayer,callBack);
				});
			});
		}));
	}else if(this.name==string_handCardNameTiandijifu){
		mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
			textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,temp.name), myText, listView,function(){
				playCardAnimation("res/drawable-hdpi/tiandijifu.png", function(){
					tiandijifuEffect(usePlayer,callBack);
				});
			});
		}));
	}else if(this.name==string_handCardNameWucaixiayi){
		mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
			textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,temp.name), myText, listView,function(){
				playCardAnimation("res/drawable-hdpi/wucaixiayi.png", function(){
					wucaixiayiEffect(usePlayer,callBack);
				});
			});
		}));
	}else if(this.name==string_handCardNameTianxuanwuyin){
		mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
			textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,temp.name), myText, listView,function(){
				if(!skillCharacters_JiangyunfanKuanglongxunyingzhan(usePlayer)){
					usePlayer.usedAttackCard=true;
				}
				playCardAnimation("res/drawable-hdpi/tianxuanwuyin.png", function(){
					useBingxingjue(usePlayer, usePlayer, function(){
						tianxuanwuyinEffect(usePlayer,callBack);
					});
				});
			});
		}));
	}else if(this.name==string_handCardNameJincanwang){
		mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
			textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,temp.name), myText, listView,function(){
				if(!skillCharacters_JiangyunfanKuanglongxunyingzhan(usePlayer)){
					usePlayer.usedAttackCard=true;
				}
				playCardAnimation("res/drawable-hdpi/jincanwang.png", function(){
					useBingxingjue(usePlayer, usePlayer, function(){
						skillCharacters_TangyurouYongshengdiao(usePlayer,jincanwangEffect,callBack);
					});
				});
			});
		}));
	}else if(this.name==string_handCardNameTiangangzhanqi){
		mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
			textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,temp.name), myText, listView,function(){
				if(!skillCharacters_JiangyunfanKuanglongxunyingzhan(usePlayer)){
					usePlayer.usedAttackCard=true;
				}
				playCardAnimation("res/drawable-hdpi/tiangangzhanqi.png", function(){
					useBingxingjue(usePlayer, usePlayer, function(){
						skillCharacters_TangyurouYongshengdiao(usePlayer,tiangangzhanqiEffect,callBack);
					});
				});
			});
		}));
	}else if(this.name==string_handCardNameJinchantuoqiao){
		mainScene.addChild(new AttackTargetLayer(usePlayer.hadImageView,cardAnimationLabel,function(){
			textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,temp.name), myText, listView,function(){
				if(!skillCharacters_JiangyunfanKuanglongxunyingzhan(usePlayer)){
					usePlayer.usedAttackCard=true;
				}
				useBingxingjue(usePlayer, usePlayer, function(){
					playCardAnimation("res/drawable-hdpi/jinchantuoqiao.png", function(){
						jinchantuoqiaoEffect(usePlayer,callBack);
					});
				});
			});
		}));
	}
}


// 冒险模式卡牌效果
Card.prototype.advEffect=function(usePlayer,effectPlayer,shouldDrop,canDiandang,callBack){
	if(shouldDrop){
		advRemove_Card_Into_DropDeck(this.name);
	}
	if(this.name==string_handCardNameLinghuxiandan){
		textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,this.name), myText, listView,function(){
			dropCardXueshouDuying(usePlayer,function(){
				playCardAnimation(resPng.linghuxiandan_png, function(){
					advUseBingxingjue(usePlayer, usePlayer, function(){
						advSkillCharacters_TangyurouYongshengdiao(effectPlayer,linghuxiandanEffect,callBack);
					});
				});
			},callBack);
		});
	}else if(this.name==string_handCardNameTianleipo){
		// AchivementProgress.addAchivementProgress(initAchivement.achivementTianleipo);
		textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,this.name), myText, listView,function(){
			dropCardXueshouDuying(usePlayer, function(){
				playCardAnimation(resPng.tianleipo_png, function(){
					advUseBingxingjue(usePlayer, usePlayer, function(){
						advTianleipoEffect(usePlayer,callBack)
					});
				});
			}, callBack);
		});
	}else if(this.name==string_handCardNameShuerguo){
		// AchivementProgress.addAchivementProgress(initAchivement.achivementShuerguo);
		textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,this.name), myText, listView,function(){
			dropCardXueshouDuying(usePlayer,function(){
				playCardAnimation(resPng.shuerguo_png, function(){
					advUseBingxingjue(usePlayer, usePlayer, function(){
						advShuerguoEffect(effectPlayer,callBack)
					});
				});
			},callBack);
		});
	}else if(this.name==string_handCardNameKuicetianji){
		// AchivementProgress.addAchivementProgress(initAchivement.achivementKuicetianji);
		textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,this.name), myText, listView,function(){
			dropCardXueshouDuying(usePlayer,function(){
				playCardAnimation(resPng.kuicetianji_png, function(){
					advUseBingxingjue(usePlayer, usePlayer, function(){
						advKuicetianjiEffect(usePlayer,callBack)
					});
				});
			},callBack);
		});
	}else if(this.name==string_handCardNameToudao){
		textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,this.name), myText, listView,function(){
			advUseAnyTimeSkill(function(){
				dropCardXueshouDuying(usePlayer,function(){
					playCardAnimation(resPng.toudao_png, function(){
						advUseBingxingjue(usePlayer, usePlayer, function(){
							advToudaoEffect(usePlayer,callBack)
						});
					});
				},callBack);
			})
		});
	}else if(this.name==string_handCardNameTongqianbiao){
		textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,this.name), myText, listView,function(){
			advUseAnyTimeSkill(function(){
				dropCardXueshouDuying(usePlayer,function(){
					playCardAnimation(resPng.tongqianbiao_png, function(){
						advUseBingxingjue(usePlayer, usePlayer, function(){
							advTongqianbiaoEffect(usePlayer,callBack)
						});
					});
				},callBack);
			});
		});
	}else if(this.name==string_handCardNameWuqichaoyuan){
		textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,this.name), myText, listView,function(){
			dropCardXueshouDuying(usePlayer,function(){
				playCardAnimation(resPng.wuqichaoyuan_png, function(){
					advWuqichaoyuanEffect(usePlayer,canDiandang,callBack);
				});
			},callBack);
		});
	}else if(this.name==string_handCardNameCaihuan){
		textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,this.name), myText, listView,function(){
			playCardAnimation(resPng.caihuan_png, function(){
				advSkillCharacters_ZhaolingerShuangjian(usePlayer, caihuanEffect,callBack);
			});
		});
	}else if(this.name==string_handCardNameTianshezhang){
		textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,this.name), myText, listView,function(){
			playCardAnimation(resPng.tianshezhang_png, function(){
				advSkillCharacters_ZhaolingerShuangjian(usePlayer, tianshezhangEffect,callBack);
			});
		});
	}else if(this.name==string_handCardNameWuchenjian){
		textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,this.name), myText, listView,function(){
			playCardAnimation(resPng.wuchenjian_png, function(){
				advSkillCharacters_ZhaolingerShuangjian(usePlayer, wuchenjianEffect,callBack);
			});
		});
	}else if(this.name==string_handCardNameModaotianzha){
		textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,this.name), myText, listView,function(){
			playCardAnimation(resPng.tianzha_png, function(){
				advSkillCharacters_ZhaolingerShuangjian(usePlayer, modaotianzhaEffect,callBack);
			});
		});
	}else if(this.name==string_handCardNameMojian){
		if(usePlayer._name==myControlPlayer._name){
			var temp=this;
			addDialog(mainScene, new yesOrNoDialogLayer(Text.askDiandang,function(result){
				if(result){
					advRemove_Card_Into_DropDeck(string_handCardNameMojian);
					textAreaAddMessage(Text.addHandCard.format(usePlayer._name,2), myText, listView);
					advAddHandCard([usePlayer],usePlayer,usePlayer,null,[2],true,true,callBack);
				}else{
					textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,temp.name), myText, listView,function(){
						playCardAnimation(resPng.mojian_png, function(){
							advSkillCharacters_ZhaolingerShuangjian(usePlayer, mojianEffect,callBack);
						});
					});
				}
			}));
		}else{
			// AI处理典当或装备魔剑
			if(usePlayer.arms1!=Text.nil||usePlayer.handCard.length==0){
				advRemove_Card_Into_DropDeck(string_handCardNameMojian);
				textAreaAddMessage(Text.diandangMojian.format(usePlayer._name), myText, listView);
				advAddHandCard([usePlayer],usePlayer,usePlayer,null,[2],true,true,callBack);
			}else{
				textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,this.name), myText, listView,function(){
					playCardAnimation(resPng.mojian_png, function(){
						advSkillCharacters_ZhaolingerShuangjian(usePlayer, mojianEffect,callBack);
					});
				});
			}
		}

	}else if(this.name==string_handCardNameQiankundaopao){
		textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,this.name), myText, listView,function(){
			playCardAnimation(resPng.qiankundaopao_png, function(){
				qiankundaopaoEffect(usePlayer,callBack);
			});
		});
	}else if(this.name==string_handCardNameTayunxue){
		textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,this.name), myText, listView,function(){
			playCardAnimation(resPng.tayunxue_png, function(){
				tayunxueEffect(usePlayer,callBack);
			});
		});
	}else if(this.name==string_handCardNameLonghunzhankai){
		textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,this.name), myText, listView,function(){
			playCardAnimation(resPng.longhunzhankai_png, function(){
				longhunzhankaiEffect(usePlayer,callBack);
			});
		});
	}else if(this.name==string_handCardNameTiandijifu){
		textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,this.name), myText, listView,function(){
			playCardAnimation(resPng.tiandijifu_png, function(){
				tiandijifuEffect(usePlayer,callBack);
			});
		});
	}else if(this.name==string_handCardNameWucaixiayi){
		textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,this.name), myText, listView,function(){
			playCardAnimation(resPng.wucaixiayi_png, function(){
				wucaixiayiEffect(usePlayer,callBack);
			});
		});
	}else if(this.name==string_handCardNameTianxuanwuyin){
		textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,this.name), myText, listView,function(){
			if(!skillCharacters_JiangyunfanKuanglongxunyingzhan(usePlayer)){
				usePlayer.usedAttackCard=true;
			}
			dropCardXueshouDuying(usePlayer,function(){
				playCardAnimation(resPng.tianxuanwuyin_png, function(){
					advUseBingxingjue(usePlayer, usePlayer, function(){
						advTianxuanwuyinEffect(usePlayer,callBack);
					});
				});
			},callBack);
		});
	}else if(this.name==string_handCardNameJincanwang){
		textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,this.name), myText, listView,function(){
			if(!skillCharacters_JiangyunfanKuanglongxunyingzhan(usePlayer)){
				usePlayer.usedAttackCard=true;
			}
			dropCardXueshouDuying(usePlayer,function(){
				playCardAnimation(resPng.jincanwang_png, function(){
					advUseBingxingjue(usePlayer, usePlayer, function(){
						advSkillCharacters_TangyurouYongshengdiao(usePlayer,jincanwangEffect,callBack);
					});
				});
			},callBack);
		});
	}else if(this.name==string_handCardNameTiangangzhanqi){
		textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,this.name), myText, listView,function(){
			if(!skillCharacters_JiangyunfanKuanglongxunyingzhan(usePlayer)){
				usePlayer.usedAttackCard=true;
			}
			dropCardXueshouDuying(usePlayer,function(){
				playCardAnimation(resPng.tiangangzhanqi_png, function(){
					advUseBingxingjue(usePlayer, usePlayer, function(){
						advSkillCharacters_TangyurouYongshengdiao(usePlayer,tiangangzhanqiEffect,callBack);
					});
				});
			},callBack);
		});
	}else if(this.name==string_handCardNameJinchantuoqiao){
		textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,this.name), myText, listView,function(){
			if(!skillCharacters_JiangyunfanKuanglongxunyingzhan(usePlayer)){
				usePlayer.usedAttackCard=true;
			}
			dropCardXueshouDuying(usePlayer,function(){
				playCardAnimation(resPng.jinchantuoqiao_png, function(){
					advUseBingxingjue(usePlayer, usePlayer, function(){
						advJinchantuoqiaoEffect(usePlayer,callBack);
					});
				});
			},callBack);
		});
	}else if(this.name==string_handCardNameSoubaoshu){
		textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,this.name), myText, listView,function(){
			advUseAnyTimeSkill(function(){
				dropCardXueshouDuying(usePlayer,function(){
					playCardAnimation(resPng.soubaoshu_png, function(){
						advUseBingxingjue(usePlayer, usePlayer, function(){
							soubaoshuEffect(usePlayer,callBack);
						});
					});
				},callBack);
			})
		});
	}else if(this.name==string_handCardNameJimushui){
		textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,this.name), myText, listView,function(){
			advUseAnyTimeSkill(function(){
				dropCardXueshouDuying(usePlayer,function(){
					playCardAnimation(resPng.jimushui_png, function(){
						advUseBingxingjue(usePlayer, usePlayer, function(){
							jimushuiEffect(usePlayer,callBack);
						});
					});
				},callBack);
			})
		});
	}else if(this.name==string_handCardNameTianjian){
		textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,this.name), myText, listView,function(){
			dropCardXueshouDuying(usePlayer,function(){
				playCardAnimation(resPng.tianjian_png, function(){
					advUseBingxingjue(usePlayer, usePlayer, function(){
						tianjianEffect(usePlayer,callBack);
					});
				});
			},callBack);
		});
	}else if(this.name==string_handCardNameJiushen){
		textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,this.name), myText, listView,function(){
			if(!skillCharacters_JiangyunfanKuanglongxunyingzhan(usePlayer)){
				usePlayer.usedAttackCard=true;
			}
			dropCardXueshouDuying(usePlayer,function(){
				playCardAnimation(resPng.jiushen_png, function(){
					advUseBingxingjue(usePlayer, usePlayer, function(){
						jiushenEffect(usePlayer,callBack);
					});
				});
			},callBack);
		});
	}else if(this.name==string_handCardNameXiukoujinxinzhou){
		textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,this.name), myText, listView,function(){
			if(!skillCharacters_JiangyunfanKuanglongxunyingzhan(usePlayer)){
				usePlayer.usedAttackCard=true;
			}
			dropCardXueshouDuying(usePlayer,function(){
				playCardAnimation(resPng.xiukoujinxinzhou_png, function(){
					advUseBingxingjue(usePlayer, usePlayer, function(){
						xiukoujinxinzhouEffect(usePlayer,callBack);
					});
				});
			},callBack);
		});
	}else if(this.name==string_handCardNameKaoya){
		textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,this.name), myText, listView,function(){
			if(!skillCharacters_JiangyunfanKuanglongxunyingzhan(usePlayer)){
				usePlayer.usedAttackCard=true;
			}
			dropCardXueshouDuying(usePlayer,function(){
				playCardAnimation(resPng.kaoya_png, function(){
					advUseBingxingjue(usePlayer, usePlayer, function(){
						kaoyaEffect(usePlayer,callBack);
					});
				});
			},callBack);
		});
	}else if(this.name==string_handCardNameTianxiangxuminglu){
		textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,this.name), myText, listView,function(){
			dropCardXueshouDuying(usePlayer,function(){
				playCardAnimation(resPng.tianxiangxuminglu_png, function(){
					advUseBingxingjue(usePlayer, usePlayer, function(){
						advSkillCharacters_TangyurouYongshengdiao(effectPlayer,tianxiangxumingluEffect,callBack);
					});
				});
			},callBack);
		});
	}else if(this.name==string_handCardNameHuanmeihuazhou){
		textAreaAddMessage(Text.playerUsedCard.format(usePlayer._name,this.name), myText, listView,function(){
			dropCardXueshouDuying(usePlayer,function(){
				playCardAnimation(resPng.huanmeihuazhou_png, function(){
					advUseBingxingjue(usePlayer, usePlayer, function(){
						huanmeihuazhouEffect(usePlayer,callBack);
					});
				});
			},callBack);
		});
	}else if(this.name==string_handCardNameTiangangdouyi){
		textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,this.name), myText, listView,function(){
			playCardAnimation(resPng.tiangangdouyi_png, function(){
				tiangangdouyiEffect(usePlayer,callBack);
			});
		});
	}else if(this.name==string_handCardNameShiziyaoshuo){
		textAreaAddMessage(Text.playerEquipCard.format(usePlayer._name,this.name), myText, listView,function(){
			playCardAnimation(resPng.shiziyaoshuo_png, function(){
				advSkillCharacters_ZhaolingerShuangjian(usePlayer, shiziyaoshuoEffect,callBack);
			});
		});
	}
}

var handCardLinghuxiandan=new Card(string_handCardNameLinghuxiandan);
var handCardQiankundaopao=new Card(string_handCardNameQiankundaopao);
var handCardModaotianzha=new Card(string_handCardNameModaotianzha);
var handCardWuchenjian=new Card(string_handCardNameWuchenjian);
var handCardTianshezhang=new Card(string_handCardNameTianshezhang);
var handCardCaihuan=new Card(string_handCardNameCaihuan);
var handCardTianleipo=new Card(string_handCardNameTianleipo);
var handCardShuerguo=new Card(string_handCardNameShuerguo);
var handCardKuicetianji=new Card(string_handCardNameKuicetianji);
var handCardToudao=new Card(string_handCardNameToudao);
var handCardTongqianbiao=new Card(string_handCardNameTongqianbiao);
var handCardMojian=new Card(string_handCardNameMojian);
var handCardWuqichaoyuan=new Card(string_handCardNameWuqichaoyuan);
var handCardTayunxue=new Card(string_handCardNameTayunxue);
var handCardLonghunzhankai=new Card(string_handCardNameLonghunzhankai);
var handCardTiandijifu=new Card(string_handCardNameTiandijifu);
var handCardWucaixiayi=new Card(string_handCardNameWucaixiayi);
var handCardTianxuanwuyin=new Card(string_handCardNameTianxuanwuyin);
var handCardJincanwang=new Card(string_handCardNameJincanwang);
var handCardTiangangzhanqi=new Card(string_handCardNameTiangangzhanqi);
var handCardJinchantuoqiao=new Card(string_handCardNameJinchantuoqiao);
var handCardSoubaoshu=new Card(string_handCardNameSoubaoshu);
var handCardJimushui=new Card(string_handCardNameJimushui);
var handCardTianjian=new Card(string_handCardNameTianjian);
var handCardJiushen=new Card(string_handCardNameJiushen);
var handCardXiukoujinxinzhou=new Card(string_handCardNameXiukoujinxinzhou);
var handCardKaoya=new Card(string_handCardNameKaoya);
var handCardTianxiangxuminglu=new Card(string_handCardNameTianxiangxuminglu);
var handCardHuanmeihuazhou=new Card(string_handCardNameHuanmeihuazhou);
var handCardTiangangdouyi=new Card(string_handCardNameTiangangdouyi);
var handCardShiziyaoshuo=new Card(string_handCardNameShiziyaoshuo);