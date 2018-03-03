var HuayaoMonster = BaseMonster.extend({
	ctor: function () {
		this.name = nameHuayao;
		this.ID = 0;
		this.combat = 6;
		this.dodge = 5;
		this.finalMark = 6;
		this.openEffectText = "无";
		this.winEffectText = "触发者补1张牌";
		this.loseEffectText = "触发者HP-2,角色横置";
		this.petEffectText = "我方成员在使用技牌阶段,可以从牌堆中换1张手牌";
		this.nature = "水";
		this.lover1 = "无";
		this.lover2 = "无";
		this.lover3 = "无";
		this.lover4 = "无";
		this.monsterPicSrc = resPng.monster_huayao_png;
		this.level = "强";
	},
	winEffect: function (callBack) {
		this._super();
		addHandCard([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], null, [1], true, true, callBack);
	},
	loseEffect: function (callBack) {
		this._super();
		var _that = this;
		if (!skillCharacters_XuanxiaoNingbingfenyan(nowPlayerTerm[nowPlayerNumber])) {
			mainScene.addChild(new MagicLayer(nowPlayerTerm[nowPlayerNumber].hadImageView, new MagicNodeShui(), function () {
				useYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [2], true, baseEffectReduceHPEffect, function () {
					// 唐雪见【追打】效果
					skillCharactersTangxuejianZhuida(function () {
						heartList = new Array();
						_that.takeOverHandle(callBack);
					});
				});
			}));
		} else {
			_that.takeOverHandle(callBack);
		}
	},
	takeOverHandle: function (callBack) {
		if (nowPlayerTerm[nowPlayerNumber].takeOver) {
			textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name + "已经被横置，本次横置无效", myText, listView), callBack;
		} else {
			nowPlayerTerm[nowPlayerNumber].takeOver = true;
			textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name + "被横置", myText, listView, callBack);
		}
	}
})