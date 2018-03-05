var CaishenyeMonster = BaseMonster.extend({
    ctor: function () {
        this.name = nameCaishenye;
        this.ID = 0;
        this.combat = 3;
        this.dodge = 2;
        this.finalMark = 3;
        this.openEffectText = "本场战斗中，妨碍者战力加倍(含装备，不含战牌加成)";
        this.winEffectText = "触发者，支援者各补1张牌";
        this.loseEffectText = "妨碍者补2张牌";
        this.petEffectText = "主人手牌上限+1";
        this.nature = "土";
        this.lover1 = "无";
        this.lover2 = "无";
        this.lover3 = "无";
        this.lover4 = "无";
        this.monsterPicSrc = resPng.monster_caishenye_png;
        this.level = "BOSS";
    },
    openEffect: function (callBack) {
    	textAreaAddMessage(this.name + "出场效果：" + this.openEffectText, myText, listView);
        if (fight_Monster.length > 0) {
        	var _addCombatVal=fight_Monster[0].maxCombat + fight_Monster[0].arms1Combat
        	+ fight_Monster[0].arms2Combat + fight_Monster[0].defenseCombat
        	+ fight_Monster[0].petsCombat ;
        	textAreaAddMessage(fight_Monster[0]._name+"战力+"+_addCombatVal, myText, listView);
        	baseEffectAddSkillCombat(fight_Monster[0],_addCombatVal);
           
        } else {
            textAreaAddMessage("无妨碍者,财神爷出场效果无效", myText, listView);
        }
        callBack();
    },
    winEffect: function (callBack) {
        this._super();
        var _addCardPlayerList = [nowPlayerTerm[nowPlayerNumber]];
        var _addCardNumberList = [1];
        if (fight_Trigger.length > 1) {
            if (!isJinchanguimu(fight_Trigger[1], "财神爷胜利结算对金蟾鬼母无效")) {
                if (fight_Trigger[1].hp > 0) {
                    _addCardPlayerList.push(fight_Trigger[1]);
                    _addCardNumberList.push(1);
                }
            }
        }

        addHandCard(_addCardPlayerList, _addCardPlayerList[0], _addCardPlayerList[0], null, _addCardNumberList, true, true);
        callBack();
    },
    loseEffect: function (callBack) {
        this._super();
        if (fight_Monster.length > 1) {
            if (!isJinchanguimu(fight_Monster[0], "财神爷失败结算对金蟾鬼母无效")) {
                if (fight_Monster[0].hp > 0) {
                    addHandCard([fight_Monster[0]], fight_Monster[0], fight_Monster[0], null, [2], true, true);
                }
            }
        }
        callBack();
    }
})