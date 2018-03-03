var ZhimaMonster = BaseMonster.extend({
	ctor: function () {
		this.name = nameZhima;
		this.ID = 0;
		this.combat = 3;
		this.dodge = 3;
		this.finalMark = 3;
		this.openEffectText = "触发者掷骰判定,纸马实际战力=基础战力+骰子点数(4、5、6分别算作1、2、3)";
		this.winEffectText = "触发者掷骰判定,对指定玩家造成骰子点数的伤害(4、5、6分别算作1、2、3)";
		this.loseEffectText = "触发者掷骰判定,自身受到骰子点数的伤害(4、5、6分别算作1、2、3)";
		this.petEffectText = "爆发:任何一场打怪战结束时使用,放弃纸马，敌方所有参战者HP-3";
		this.nature = "雷";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_zhima_png;
		this.level = "弱";
	},
	openEffect: function (callBack) {
		var _that=this;
		var _addCombat = parseInt(Math.random() * 6, 10) + 1;
		textAreaAddMessage("骰子点数为:" + _addCombat + "(4、5、6分别算作1、2、3)", myText, listView, function () {
			skillCharacters_WangxiaohuBuqubunao(nowPlayerTerm[nowPlayerNumber], _addCombat, function (xiaohuNumber) {
				cc.log("xiaohuNumber = "+xiaohuNumber);
				_addCombat = xiaohuNumber > 3 ? xiaohuNumber - 3 : xiaohuNumber;
				_that.combat += _addCombat;
				monsterCombat+=_addCombat;
				textAreaAddMessage("纸马实际战力+" + _addCombat, myText, listView, callBack);
			});
		});
	},
	winEffect: function (callBack) {
		this._super();
		var _hurtNumber = parseInt(Math.random() * 6, 10) + 1;
		textAreaAddMessage("骰子点数为:" + _hurtNumber + "(4、5、6分别算作1、2、3)", myText, listView, function () {
			skillCharacters_WangxiaohuBuqubunao(nowPlayerTerm[nowPlayerNumber], _hurtNumber, function (xiaohuNumber) {
				_hurtNumber = xiaohuNumber > 3 ? xiaohuNumber - 3 : xiaohuNumber;
				var _selectPlayer = null;
				// 玩家选择掉血目标
				if (nowPlayerTerm[nowPlayerNumber]._name == player1._name) {
					addDialog(mainScene, new selectPlayerDialogLayer(true, true, true, true,
							"请选择一人HP-" + _hurtNumber, false, false, function (result) {
						mainScene.addChild(new MagicLayer(result.hadImageView, new MagicNodeLei(), function () {
							useYingu([result], result, result, [_hurtNumber], true, baseEffectReduceHPEffect, function () {
								skillCharactersTangxuejianZhuida(function () {
									heartList = new Array();
									if (callBack != null) {
										callBack();
									}
								});
							});
						}));
					}));

				} else {// AI选择掉血目标
					if (nowPlayerTerm[nowPlayerNumber]._name == player2._name) {
						_selectPlayer = player3;
						if (player3.hp == 0 || (player4.hp > 0 && player4.hp < player3.hp)) {
							_selectPlayer = player4;
						}

					} else if (nowPlayerTerm[nowPlayerNumber]._name == player3._name ||
							nowPlayerTerm[nowPlayerNumber]._name == player4._name) {
						_selectPlayer = (player2.hp > 0 && player2.hp < player1.hp) ? player2 : player1;
					}
					mainScene.addChild(new MagicLayer(_selectPlayer.hadImageView, new MagicNodeLei(), function () {
						useYingu([_selectPlayer], _selectPlayer, _selectPlayer, [_hurtNumber], true, baseEffectReduceHPEffect, function () {
							// 唐雪见【追打】效果
							skillCharactersTangxuejianZhuida(function () {
								heartList = new Array();
								if (callBack != null) {
									callBack();
								}
							});
						});
					}));
				}
			})
		});
	},
	loseEffect: function (callBack) {
		this._super();
		var _hurtNumber = parseInt(Math.random() * 6, 10) + 1;
		textAreaAddMessage("骰子点数为:" + _hurtNumber + "(4、5、6分别算作1、2、3)", myText, listView, function () {
			skillCharacters_WangxiaohuBuqubunao(nowPlayerTerm[nowPlayerNumber], _hurtNumber, function (xiaohuNumber) {
				_hurtNumber = xiaohuNumber > 3 ? xiaohuNumber - 3 : xiaohuNumber;
				mainScene.addChild(new MagicLayer(nowPlayerTerm[nowPlayerNumber].hadImageView, new MagicNodeLei(), function () {
					useYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber],
							[_hurtNumber], true, baseEffectReduceHPEffect, function () {
						// 唐雪见【追打】技能
						skillCharactersTangxuejianZhuida(function () {
							heartList = new Array();
							if (callBack != null) {
								callBack();
							}
						});
					});
				}));
			});
		});
	}
})

function zhimaPetEffect(callBack) {
	var _hasZhimaPlayer = null;
	// 检测场上是否有玩家拥有纸马
	for (var i = 0; i < nowPlayerTerm.length; i++) {
		if (nowPlayerTerm[i].hp <= 0 || nowPlayerTerm[i].pet_LeiMonster==null||nowPlayerTerm[i].pet_LeiMonster.name != nameZhima) {
			continue;
		}
		_hasZhimaPlayer = nowPlayerTerm[i];
		break;
	}

	if (_hasZhimaPlayer == null) {
		callBack();
		return;
	}
	// 玩家决定是否爆发纸马
	if (_hasZhimaPlayer._name == player1._name) {
		addDialog(mainScene, new ChooseZoneLayer("是否爆发纸马，令敌方所有参战者HP-3?", function (result) {
			if (result) {
				_hasZhimaPlayer.pet_LeiMonster.name += Text.baofa;
				// 找到所有敌方参战者，令他们HP-3
				var _tempHeartList = new Array();
				var _tempHeartNumberList = new Array();
				for (var i = 0; i < nowPlayerTerm.length; i++) {
					if (nowPlayerTerm[i].hp <= 0
							|| player1IsPlayer2Friend(nowPlayerTerm[i],
									_hasZhimaPlayer) || !nowPlayerTerm[i].joinAttack) {
						continue;
					}
					_tempHeartList.push(nowPlayerTerm[i]);
					_tempHeartNumberList.push(3);
					mainScene.addChild(new MagicLayer(nowPlayerTerm[i].hadImageView, new MagicNodeLei()));
				}
				if (_tempHeartList.length == 0) {
					// 没有符合条件的敌方参战者，直接结束
					callBack();
					return;
				}
				useYingu(_tempHeartList, _tempHeartList[0], _tempHeartList[0], _tempHeartNumberList, true, baseEffectReduceHPEffect, function () {
					// 唐雪见【追打】技能
					skillCharactersTangxuejianZhuida(function () {
						heartList = new Array();
						if (callBack != null) {
							callBack();
						}
					});
				});
			} else {
				callBack();
			}
		}));

	} else {
		// AI决定是否爆发纸马
		// TODO: AI无脑不爆发
		callBack();
	}

}