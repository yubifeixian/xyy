//李逍遥【侠骨柔情】
function skillCharacters_LixiaoyaoXiagurouchang(nowplayer, callBack) {
    if (nowplayer != null && nowplayer.hp > 0
        && nowplayer.skillNameList.containsObject(skillnameXiagurouchang)
        && fight_Trigger[0].sex == 1) {
        mainScene.addChild(new skillAnimationLayer(nowplayer.animation));
        myAudioPlayer(audioLixiaoyaoXiagurouchang);
        textAreaAddMessage("李逍遥【侠骨柔肠】效果触发，自身命中+1", myText, listView, function () {
            if (nowplayer._name == player1._name) {
                AchivementProgress.addAchivementProgress(nowplayer);
            }
            baseEffectAddTempExtent(nowplayer);
            callBack();
        });
    } else {
        callBack();
    }
}

// 李逍遥【飞龙探云手】
function skillCharacters_LixiaoyaoFeilongtanyunshou(callBack) {
    if (fight_FirstMonster.dodge > 2) {
        callBack();
        return;
    }
    for (var i = 0; i < fight_Trigger.length; i++) {
        if (fight_Trigger[i].hp > 0 && fight_Trigger[i].skillNameList.containsObject(skillnameFeilongtanyunshou)) {
            myAudioPlayer(audioLixiaoyaoFeilongtanyunshou);
            textAreaAddMessage(fight_Trigger[i]._name + "【飞龙探云手】效果触发，抽取每名妨碍者1张手牌", myText, listView);
            if (fight_Monster.length == 0) {
                textAreaAddMessage("无妨碍者", myText, listView);
                break;
            } else if (fight_Monster[0].handCard.length == 0) {
                textAreaAddMessage("妨碍者无手牌", myText, listView);
                break;
            } else {
                var tempNumber = parseInt(Math.random() * fight_Monster[0].handCard.length, 10);
                var card = fight_Monster[0].handCard[tempNumber];
                fight_Trigger[i].handCard.push(card);
                if (fight_Trigger[i]._name == player1._name) {
                    handCardZone.pushBackCustomItem(card);
                }
                fight_Monster[0].handCard.removeObject(card);
                if (fight_Monster[0]._name == player1._name) {
                    card.removeFromParent();
                }
                textAreaAddMessage(fight_Trigger[i]._name + "获得" + fight_Monster[0]._name + "1张手牌", myText, listView);
                mainScene.addChild(new NormalSkillAnimationLayer(skillnameFeilongtanyunshou, fight_Trigger[i].hadImageView));
            }
        }
    }
    callBack();
}


// 赵灵儿【双剑】
function skillCharacters_ZhaolingerShuangjian(player, callBack, callBack2) {
    var updateArm = 1;
    if (player.skillNameList.containsObject(skillnameShuangjian)) {
        if (player.arms1 == Text.nil) {
            updateArm = 1;
            callBack(player, updateArm, callBack2);
        }
        else if (player.arms2 == Text.nil) {
            updateArm = 2;
            callBack(player, updateArm, callBack2);
        } else {
            if (player._name == player1._name) {
                addDialog(mainScene, new ChooseZoneLayer("“双剑”:替换第二把武器？(否则为第一把)", function (result) {
                    updateArm = result ? 2 : 1;
                    if (result) {
                        mainScene.addChild(new NormalSkillAnimationLayer(skillnameShuangjian, player.hadImageView, function () {
                            myAudioPlayer(audioZhaolingerShuangjian);
                            textAreaAddMessage(player._name + "发动“双剑”效果", myText, listView);
                        }));
                    }
                    callBack(player, updateArm, callBack2);
                }));

            } else {
                // AI决定是否发动【双剑】
                updateArm = player.arms1 == Text.nil ? 1 : 2;
                if (updateArm == 2) {
                    mainScene.addChild(new NormalSkillAnimationLayer(skillnameShuangjian, player.hadImageView, function () {
                        myAudioPlayer(audioZhaolingerShuangjian);
                        textAreaAddMessage(player._name + "发动“双剑”效果", myText, listView);
                    }));
                }
                callBack(player, updateArm, callBack2);
            }
        }
    } else {
        callBack(player, updateArm, callBack2);
    }
}

// 赵灵儿【梦蛇】
function skillCharacters_ZhaolingerMengshe() {
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        var tempHP = 0;
        var tempArms1 = Text.nil, tempArms2 = Text.nil, tempDefense = Text.nil, tempPet1, tempPet2, tempPet3, tempPet4, tempPet5;
        if (nowPlayerTerm[i].hp > 0
            && nowPlayerTerm[i]._name == nameZhaolinger) {
            var petNum = 0;
            var isFriend = false;
            for (var x = 0; x < nowPlayerTerm.length; x++) {
                if (!player1IsPlayer2Friend(nowPlayerTerm[x], nowPlayerTerm[i])) {
                    petNum += baseEffectCountPets(nowPlayerTerm[x]);
                }
            }
            if (petNum >= 3) {
                AchivementProgress.addAchivementProgress(nowPlayerTerm[i]);
                tempHP = nowPlayerTerm[i].hp;
                tempArms1 = nowPlayerTerm[i].arms1;
                tempArms2 = nowPlayerTerm[i].arms2;
                tempDefense = nowPlayerTerm[i].defense;
                tempPet1 = nowPlayerTerm[i].pet_Feng;
                tempPet2 = nowPlayerTerm[i].pet_Lei;
                tempPet3 = nowPlayerTerm[i].pet_Shui;
                tempPet4 = nowPlayerTerm[i].pet_Huo;
                tempPet5 = nowPlayerTerm[i].pet_Tu;
                nowPlayerTerm[i]._name = "赵灵儿(梦蛇)";
                mainScene.addChild(new skillAnimationLayer(nowPlayerTerm[i].animation, function () {
                    characterCardManager(nowPlayerTerm[i], 26);
                    loadCharacterSkillAnimation(nowPlayerTerm[i]);
                    myAudioPlayer(audioZhaolingerMengshe);
                    textAreaAddMessage("赵灵儿“梦蛇”效果触发，变身为" + nameZhaolingerMengshe, myText, listView);
                    nowPlayerTerm[i].hadImageView.loadTexture(nowPlayerTerm[i].playerPicSrc);
                    nowPlayerTerm[i].hp = tempHP;
                    nowPlayerTerm[i].arms1 = tempArms1;
                    nowPlayerTerm[i].arms2 = tempArms2;
                    nowPlayerTerm[i].defense = tempDefense;
                    nowPlayerTerm[i].pet_Feng = tempPet1;
                    nowPlayerTerm[i].pet_Lei = tempPet2;
                    nowPlayerTerm[i].pet_Shui = tempPet3;
                    nowPlayerTerm[i].pet_Huo = tempPet4;
                    nowPlayerTerm[i].pet_Tu = tempPet5;
                }));
            }
            return;
        } else if (nowPlayerTerm[i].hp > 0
            && nowPlayerTerm[i]._name == nameZhaolingerMengshe) {
            var petNum = 0;
            for (var x = 0; x < nowPlayerTerm.length; x++) {
                if (!player1IsPlayer2Friend(nowPlayerTerm[x], nowPlayerTerm[i])) {
                    petNum += baseEffectCountPets(nowPlayerTerm[x]);
                }
            }
            if (petNum < 3) {
                tempHP = nowPlayerTerm[i].hp;
                tempArms1 = nowPlayerTerm[i].arms1;
                tempArms2 = nowPlayerTerm[i].arms2;
                tempDefense = nowPlayerTerm[i].defense;
                tempPet1 = nowPlayerTerm[i].pet_Feng;
                tempPet2 = nowPlayerTerm[i].pet_Lei;
                tempPet3 = nowPlayerTerm[i].pet_Shui;
                tempPet4 = nowPlayerTerm[i].pet_Huo;
                tempPet5 = nowPlayerTerm[i].pet_Tu;
                characterCardManager(nowPlayerTerm[i], 2);
                loadCharacterSkillAnimation(nowPlayerTerm[i]);
                myAudioPlayer(audioZhaolingerMengsheBianshen);
                textAreaAddMessage(nameZhaolingerMengshe + "“变身”效果触发，还原为" + nameZhaolinger, myText, listView);
                nowPlayerTerm[i].hadImageView.loadTexture(nowPlayerTerm[i].playerPicSrc);
                nowPlayerTerm[i].hp = tempHP;
                nowPlayerTerm[i].arms1 = tempArms1;
                nowPlayerTerm[i].arms2 = tempArms2;
                nowPlayerTerm[i].defense = tempDefense;
                nowPlayerTerm[i].pet_Feng = tempPet1;
                nowPlayerTerm[i].pet_Lei = tempPet2;
                nowPlayerTerm[i].pet_Shui = tempPet3;
                nowPlayerTerm[i].pet_Huo = tempPet4;
                nowPlayerTerm[i].pet_Tu = tempPet5;
            }
            return;
        }

    }
}


// 赵灵儿（梦蛇）【女娲】
function skillCharacters_ZhaolingerMengsheNvwa(callBack) {
    var zhaolingerMengshe = null;
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0
            && nowPlayerTerm[i].skillNameList.containsObject(skillnameNvwa)) {
            zhaolingerMengshe = nowPlayerTerm[i];
            break;
        }
    }

    if (zhaolingerMengshe != null) {
        var isFriend = player1IsPlayer2Friend(zhaolingerMengshe, nowPlayerTerm[nowPlayerNumber]);
        if (isFriend) {
            addTrigerCombat(2);
        } else {
            addMonsterCombat(2);
        }
        mainScene.addChild(new skillAnimationLayer(zhaolingerMengshe.animation));
        AchivementProgress.addAchivementProgress(zhaolingerMengshe);
        myAudioPlayer(audioZhaolingerMengsheNvwa);
        textAreaAddMessage("赵灵儿(梦蛇)“女娲”效果触发，本方战力+2", myText, listView, callBack);
    } else {
        callBack();
    }
}

/**
 * 嫉恶如仇效果处理
 * 
 * @param skillUser
 *            当前发动技能的角色
 * @param endUser
 *            最后一位发动技能的角色
 * @param useSkillList
 *            可发动技能的角色列表
 * @param targetList
 *            即将受伤的角色列表
 * @param callBack
 */
function jieruchouHandle(skillUser, endUser, useSkillList, targetList, callBack) {
    cc.log("endPalyerName = " + endUser._name);
    var nextUserIndex = 0;
    for (var i = 0; i < useSkillList.length; i++) {
        if (useSkillList[i]._name == skillUser._name) {
            nextUserIndex = i + 1;
            nextUserIndex %= useSkillList.length;
            break;
        }
    }
    mainScene.addChild(new skillAnimationLayer(skillUser.animation, function () {
        myAudioPlayer(audioLinyueruJieruchou);
        textAreaAddMessage(skillUser._name + "【嫉恶如仇】效果触发，敌方所有参战者HP-1", myText, listView);
        if (skillUser._name == player1._name && skillUser._name == nameLinyueru) {
            AchivementProgress.addAchivementProgress(skillUser);
        }
        var tempHeartList = new Array();
        var tempHeartNumberList = new Array();
        for (var t = 0; t < targetList.length; t++) {
            if (targetList[t].hp > 0 && !targetList[t]._name.endsWith(nameJinchanguimu)) {
                tempHeartList.push(targetList[t]);
                tempHeartNumberList.push(1);
            }
        }
        useYingu(tempHeartList, tempHeartList[0], tempHeartList[0], tempHeartNumberList, true, baseEffectReduceHPEffect, function () {
            // 唐雪见【追打】技能
            skillCharactersTangxuejianZhuida(function () {
                heartList = [];
                if (skillUser._name == endUser._name) {
                    if (callBack != null) {
                        callBack();
                    }
                    return;
                }
                jieruchouHandle(useSkillList[nextUserIndex], endUser, useSkillList, targetList, callBack);
            });
        });
    }));

}


// 林月如[嫉恶如仇]
function skillCharacters_LinyueruJieruchou(vector1, vector2, callBack) {
    var hasLingyueru = false;
    if (vector2.length == 0) {
        if (callBack != null) {
            callBack();
        }
        return;
    }
    var _useList = [];
    for (var i = 0; i < vector1.length; i++) {
        if (vector1[i].hp > 0 && vector1[i].skillNameList.containsObject(skillnameJieruchou)) {
            _useList.push(vector1[i]);
        }
    }
    if (_useList.length == 0) {
        if (callBack != null) {
            callBack();
        }
        return;
    }
    jieruchouHandle(_useList[0], _useList[_useList.length - 1], _useList, vector2, callBack);
}

// 林月如【林家剑法】
function skillCharacter_LinyueruLinjiajianfa(temPlayer) {
    if (temPlayer.skillNameList.containsObject(skillnameLinjiajianfa)) {
        mainScene.addChild(new NormalSkillAnimationLayer(skillnameLinjiajianfa, temPlayer.hadImageView, function () {
            if (!skillXiejianxian_HasXiejianxian(temPlayer)) {
                temPlayer.arms1Combat += 1;
            }
            myAudioPlayer(audioLinyueruLinjiajianfa);
            textAreaAddMessage(temPlayer._name + "【林家剑法】效果触发，战力额外+1", myText, listView);
        }));
    }
}
// 赵灵儿sp【林家剑法】回合结束恢复
function skillCharacter_ZhaolingerspLinjiajianfaEnd(player) {
    if (!player.skillNameList.containsObject(skillnameLinjiajianfa)) {
        return;
    }
    // 判断邪剑仙宠物效果
    if (skillXiejianxian_HasXiejianxian(player)) {
        player.xiejianxian_Arms1Combat--;
    } else {
        player.arms1Combat--;
    }
}

// 阿奴【万蛊蚀天】
function skillCharacters_AnuWangushitian(callBack) {
    if (nowPlayerTerm[nowPlayerNumber].skillNameList.containsObject(skillnameWangushitian)
        && nowPlayerTerm[nowPlayerNumber].handCard.length == 0) {
        var addCardPlayerList = new Array();
        var addCardNumberList = new Array();
        var tempHeartList = new Array();
        var tempHeartNumberList = new Array();
        mainScene.addChild(new NormalSkillAnimationLayer(skillnameWangushitian, nowPlayerTerm[nowPlayerNumber].hadImageView, function () {
            myAudioPlayer(audioAnuWangushitian);
            textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name + "触发【万蛊蚀天】效果，我方全体补1张牌后，除自己以外的所有角色HP-1", myText, listView, function () {
                for (var i = 0; i < nowPlayerTerm.length; i++) {
                    if (player1IsPlayer2Friend(nowPlayerTerm[i], nowPlayerTerm[nowPlayerNumber])) {
                        addCardPlayerList.push(nowPlayerTerm[i]);
                        addCardNumberList.push(1);
                    }
                    if (nowPlayerTerm[i].hp > 0 && nowPlayerTerm[i]._name != nowPlayerTerm[nowPlayerNumber]._name) {
                        tempHeartList.push(nowPlayerTerm[i]);
                        tempHeartNumberList.push(1);
                    }
                }
                addHandCard(addCardPlayerList, addCardPlayerList[0], addCardPlayerList[0], null, addCardNumberList, true, true, function () {
                    useYingu(tempHeartList, tempHeartList[0], tempHeartList[0], tempHeartNumberList, true, baseEffectReduceHPEffect, function () {
                        // 唐雪见【追打】技能
                        skillCharactersTangxuejianZhuida(function () {
                            heartList = new Array();
                            callBack();
                        });
                    });
                });
            });
        }));
    } else {
        callBack();
    }
}


// 阿奴【鬼灵精】
function skillCharacters_AnuGuilingjing() {
    var anu = nowPlayerTerm[nowPlayerNumber];
    if (anu._name == player1._name && player1.handCard.length > 0) {
        var canUseGuilingjing = false;
        for (var i = 0; i < nowPlayerTerm.length; i++) {
            if (nowPlayerTerm[i].hp > 0 && (nowPlayerTerm[i]._name != nameAnu && nowPlayerTerm[i]._name != nameChonglouSp)) {
                canUseGuilingjing = true;
                break;
            }
        }
        if (canUseGuilingjing) {
            addDialog(mainScene, new selectCardDialogLayer(anu._name + "“鬼灵精”效果:请选择手牌", anu.handCard, 1, anu.handCard.length, true, function (result) {
                if (result != null) {
                    var sendCardList = result;
                    var player2Shown = player2._name != nameChonglouSp ? true : false;
                    var player3Shown = player3._name != nameChonglouSp ? true : false;
                    var player4Shown = player4._name != nameChonglouSp ? true : false;
                    addDialog(mainScene, new selectPlayerDialogLayer(false, player2Shown, player3Shown, player4Shown,
                        anu._name + "“鬼灵精”效果:请选择交予的玩家", false, false, function (selectPlayer) {
                            mainScene.addChild(new skillAnimationLayer(anu.animation, function () {
                                myAudioPlayer(audioAnuGuilingjing);
                                textAreaAddMessage(anu._name + "发动“鬼灵精”效果", myText, listView);
                                textAreaAddMessage("将" + sendCardList.length + "张手牌交给" + selectPlayer._name, myText, listView);
                                for (var i = 0; i < sendCardList.length; i++) {
                                    selectPlayer.handCard.push(sendCardList[i]);
                                    player1.handCard.removeObject(sendCardList[i]);
                                    sendCardList[i].removeFromParent();
                                }
                                AchivementProgress.addAchivementProgress(player1);
                            }));
                        }));
                }
            }));
        }
    } else {
        if (anu.handCard.length > 0 && anu.friendList[1].hp > 0 && anu.friendList[1]._name != nameChonglouSp) {
            var selectedCard = anu.handCard[parseInt(Math.random() * anu.handCard.length, 10)];
            var selectPlayer = anu.friendList[1];
            selectPlayer.handCard.push(selectedCard);
            if (selectPlayer._name == player1._name) {
                handCardZone.pushBackCustomItem(selectedCard);
            }
            anu.handCard.removeObject(selectedCard);
            textAreaAddMessage("阿奴发动【鬼灵精】，交给" + selectPlayer._name + "1张手牌", myText, listView);
        }
    }
}

// 酒剑仙【醉仙望月步】
function skillCharacters_JiujianxianZuixianwangyubu() {
    var jiujianxian = nowPlayerTerm[nowPlayerNumber];
    if (jiujianxian.hp > 0
        && jiujianxian.skillNameList.containsObject(skillnameZuixianwangyuebu)
        && jiujianxianZuiXianWangYueBu == 0) {
        if (jiujianxian._name == player1._name) {
            addDialog(mainScene, new ChooseZoneLayer("是否发动【醉仙望月步】再次打怪？", function (result) {
                if (result) {
                    if (player1._name == nameJiujianxian) {
                        AchivementProgress.addAchivementProgress(player1);
                    }
                    mainScene.addChild(new skillAnimationLayer(jiujianxian.animation, function () {
                        jiujianxianZuiXianWangYueBu = 1;
                        nextStep = 3;
                        roundAttactk1Handle(true);
                    }));
                }
            }));
        } else {
            // AI决定是否发动【醉仙望月步】
            /*
			 * if (BaseEffect.haveHowManyCardOfType(jiujianxian,
			 * CardType.fight_card) > 0 && jiujianxian.friendList.get(1).hp > 0 &&
			 * jiujianxian.hp > 2) { InitGameActivity.lock = false; opinion =
			 * YesorNoDialog.YES_OPTION; }
			 */
        }
    }
}

// 酒剑仙【御剑术】
function skillCharacters_JiujianxianYujianshu(temPlayer) {
    if (temPlayer.skillNameList.containsObject(skillnameYujianshu)) {
        if (!skillXiejianxian_HasXiejianxian(temPlayer)) {
            temPlayer.arms1Extent += 1;
        }
        mainScene.addChild(new NormalSkillAnimationLayer(skillnameYujianshu, temPlayer.hadImageView, function () {
            textAreaAddMessage(temPlayer._name + "【御剑术】效果触发，命中额外+1", myText, listView);
        }));
    }
}

// 赵灵儿sp【御剑术】回合结束恢复
function skillCharacter_ZhaolingerspYujianshuEnd(player) {
    if (!player.skillNameList.containsObject(skillnameYujianshu)) {
        return;
    }
    // 判断邪剑仙宠物效果
    if (skillXiejianxian_HasXiejianxian(player)) {
        player.xiejianxian_Arms1Extent--;
    } else {
        player.arms1Extent--;
    }
}

// 拜月教主【召唤水魔兽】
function skillCharacters_BaiyueZhaohuanshuimoshou(usePlayer) {
    if (usePlayer.skillNameList.containsObject(skillnameZhaohuanshuimoshou) && usePlayer.handCard.length >= 2 && !usePlayer.usedAttackCard) {
        if (usePlayer._name == player1._name) {
            addDialog(mainScene, new selectCardDialogLayer("请丢弃2张牌发动【召唤水魔兽】", usePlayer.handCard, 2, 2, true, function (result) {
                if (result) {
                    if (usePlayer._name == nameBaiyuejiaozhu) {
                        AchivementProgress.addAchivementProgress(player1);
                    }
                    usePlayer.usedAttackCard = true;
                    for (var i = 0; i < result.length; i++) {
                        remove_Card_Into_DropDeck(result[i].name);
                        usePlayer.handCard.removeObject(result[i]);
                        result[i].removeFromParent();
                    }
                    mainScene.addChild(new NormalSkillAnimationLayer(skillnameZhaohuanshuimoshou, usePlayer.hadImageView, function () {
                        textAreaAddMessage(usePlayer._name + "发动【召唤水魔兽】，本场战斗中我方战力+5", myText, listView, function () {
                            if (player1IsPlayer2Friend(player1, nowPlayerTerm[nowPlayerNumber])) {
                                addTrigerCombat(5);
                            } else {
                                addMonsterCombat(5);
                            }
                        });
                    }));
                }
            }));
        } else {
            // AI处理召唤水魔兽
        }
    }
}

function shuimoshouhetiHandle(skillUser, endUser, userList, callBack) {
    var nextUserIndex = 0;
    for (var i = 0; i < userList.length; i++) {
        if (userList[i]._name == skillUser._name) {
            nextUserIndex = i + 1;
            break;
        }
    }
    mainScene.addChild(new NormalSkillAnimationLayer(skillnameShuimoshouheti, skillUser.hadImageView, function () {
        textAreaAddMessage(skillUser._name + "【水魔兽合体】效果触发，自身战力+2", myText, listView, function () {
            baseEffectAddSkillCombat(skillUser, 2);
            if (skillUser._name == endUser._name) {
                callBack();
                return;
            }
            shuimoshouhetiHandle(userList[nextUserIndex], endUser, userList, callBack);
        });
    }));
}

// 拜月【水魔兽合体】
function skillCharacters_BaiyueShuimoshouheti(callBack) {
    var _skillUser = [];
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].skillNameList.containsObject(skillnameShuimoshouheti)
            && nowPlayerTerm[i].joinAttack == true
            && (fight_FirstMonster.nature == Text.natureShui || fight_FirstMonster.nature == Text.natureHuo)) {
            _skillUser.push(nowPlayerTerm[i]);
        }
    }
    if (_skillUser.length == 0) {
        callBack();
        return;
    }
    shuimoshouhetiHandle(_skillUser[0], _skillUser[_skillUser.length - 1], _skillUser, callBack);
}


function fahuibuwendingHandle(skillUser, endUser, userList, callBack) {
    var nextUserIndex = 0;
    for (var i = 0; i < userList.length; i++) {
        if (skillUser._name == userList[i]._name) {
            nextUserIndex = i + 1;
            break;
        }
    }

    var faHuiBuWenDing = 0;
    mainScene.addChild(new NormalSkillAnimationLayer(skillnameFahuibuwending, skillUser.hadImageView, function () {
        textAreaAddMessage(skillUser._name + "【发挥不稳定】效果，进行掷骰判定(1、6算0点)", myText, listView, function () {
            faHuiBuWenDing = parseInt(Math.random() * 6, 10) + 1;
            textAreaAddMessage("掷骰点数为：" + faHuiBuWenDing, myText, listView, function () {
                skillCharacters_WangxiaohuBuqubunao(skillUser, faHuiBuWenDing, function (result) {
                    if (result == 1 || result == 6) {
                        result = 0;
                    }
                    if (skillUser._name == nameWangxiaohu) {
                        AchivementProgress.addAchivementProgress(skillUser);
                    }
                    textAreaAddMessage(Text.addCombat.format(skillUser._name, result), myText, listView, function () {
                        baseEffectAddSkillCombat(skillUser, result);
                        if (skillUser._name == endUser._name) {
                            callBack();
                            return;
                        }
                        fahuibuwendingHandle(userList[nextUserIndex], endUser, userList, callBack);
                    });
                });
            });
        });
    }));
}


// 王小虎【发挥不稳定】
function skillCharacters_WangxiaohuFahuibuwending(callBack) {
    var _userList = [];
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0
            && nowPlayerTerm[i].skillNameList.containsObject(skillnameFahuibuwending)
            && nowPlayerTerm[i].joinAttack) {
            if (nowPlayerTerm[i]._name == nameWangxiaohu) {
                if (nowPlayerTerm[i].everyRoundSkill_1 == true) {
                    return;
                }
                nowPlayerTerm[i].everyRoundSkill_1 = true;
            } else if (nowPlayerTerm[i]._name == nameZhaolingerSp) {
                if (nowPlayerTerm[i].everyRoundSkill_3 == true) {
                    return;
                }
                nowPlayerTerm[i].everyRoundSkill_3 = true;
            }
            _userList.push(nowPlayerTerm[i]);
        }
    }
    if (_userList.length == 0) {
        callBack();
        return;
    }
    fahuibuwendingHandle(_userList[0], _userList[_userList.length - 1], _userList, callBack);
}


// 王小虎_不屈不挠
function skillCharacters_WangxiaohuBuqubunao(usePlayer, xiaohuNum, callBack) {
    if (usePlayer._name == player1._name && usePlayer.skillNameList.containsObject(skillnameBuqubunao) && usePlayer.handCard.length > 0) {
        addDialog(mainScene, new ChooseZoneLayer("【不屈不挠】:是否弃1张手牌重新掷骰？", function (result) {
            if (result) {
                addDialog(mainScene, new selectCardDialogLayer("请选择丢弃的牌", usePlayer.handCard, 1, 1, false, function (result) {
                    var card = result.pop();
                    remove_Card_Into_DropDeck(card.name);
                    usePlayer.handCard.removeObject(card);
                    card.removeFromParent();
                    mainScene.addChild(new NormalSkillAnimationLayer(skillnameBuqubunao, usePlayer.hadImageView, function () {
                        textAreaAddMessage("王小虎发动【不屈不挠】效果,丢1张牌后重新掷骰", myText, listView, function () {
                            xiaohuNum = parseInt(Math.random() * 6, 10) + 1;
                            textAreaAddMessage("王小虎掷骰点数为：" + xiaohuNum, myText, listView, function () {
                                skillCharacters_WangxiaohuBuqubunao(usePlayer, xiaohuNum, callBack);
                            });
                        });
                    }));
                }));
            } else {
                callBack(xiaohuNum);
            }
        }));
    } else {
        // textAreaAddMessage("王小虎不发动【不屈不挠】效果", myText, listView);
        callBack(xiaohuNum);
    }
}

// 苏媚[狡猾]
function skillCharacters_SumeiJiaohua(nowplayer, callBack) {
    if (nowplayer._name == player1._name && nowplayer.skillNameList.containsObject(skillnameJiaohua)) {
        if (nowplayer._name == nameSumei) {
            if (nowplayer.everyRoundSkill_1 == true) {
                callBack();
                return;
            }

        } else if (nowplayer._name == nameZhaolingerSp) {
            if (nowplayer.everyRoundSkill_3 == true) {
                callBack();
                return;
            }

        }
        useDongmingbaojing(nowplayer, function () {
            addDialog(mainScene, new ChooseZoneLayer("【狡猾】:是否翻取下一张怪牌？", function (result) {
                if (result) {
                    mainScene.addChild(new NormalSkillAnimationLayer(skillnameJiaohua, nowplayer.hadImageView, function () {
                        if (nowplayer._name == nameSumei) {
                            nowplayer.everyRoundSkill_1 = true;
                        } else if (nowplayer._name == nameZhaolingerSp) {
                            nowplayer.everyRoundSkill_3 = true;
                        }
                        myAudioPlayer(audioSumeiJiaohua);
                        if (game_MonsterDeck.length <= 0) {
                            judgeWinorLose();
                        } else {
                            textAreaAddMessage(nowplayer._name + "发动【狡猾】，重新翻取一张怪物牌", myText, listView, function () {
                                fight_FirstMonster = topMonsterCard(game_MonsterDeck.shift());
                                turnMonsterCardLayer.instead();
                                turnMonsterCardLayer = new TurnMonsterCardLayer(fight_FirstMonster);
                                mainScene.addChild(turnMonsterCardLayer);
                                tempMonster = fight_FirstMonster;
                                callBack();
                            });
                        }
                    }));
                } else {
                    textAreaAddMessage(nowplayer._name + "不发动【狡猾】，继续打怪", myText, listView, callBack);
                }
            }));
        });
    } else {
        callBack();
    }
}

// 苏媚【拒绝】
function skillCharacters_SumeiJujue(player, callBack1, callBack2) {
    if (player.hp > 0 && player.skillNameList.containsObject(skillnameJujue) && baseEffectHaveHowManyCardOfType(player, CARDTYPE.SPECIALCARD) > 0) {
        var tempList = new Array();
        for (var i = 0; i < player.handCard.length; i++) {
            if (player.handCard[i].cardType == CARDTYPE.SPECIALCARD) {
                tempList.push(player.handCard[i]);
            }
        }
        if (player._name == player1._name) {
            addDialog(mainScene, new ChooseZoneLayer("“拒绝”:是否发动将一张特殊类手牌当作【冰心诀】使用？", function (result) {
                if (result) {
                    addDialog(mainScene, new selectCardDialogLayer("请选择1张特殊类手牌", tempList, 1, 1, false, function (selectCard) {
                        myAudioPlayer(audioSumeiJujue);
                        if (player._name == nameSumei) {
                            AchivementProgress.addAchivementProgress(player1);
                        }
                        var card = selectCard.pop();
                        remove_Card_Into_DropDeck(card.name);
                        player.handCard.removeObject(card);
                        card.removeFromParent();
                        mainScene.addChild(new skillAnimationLayer(player.animation, callBack1));
                        // callBack1();
                    }));
                } else {
                    // 不发动拒绝的处理
                    callBack2();
                }
            }));
        } else {
            // AI默认不发动拒绝
            callBack2();
        }
    } else {
        // 不满足【拒绝】条件，默认不发动
        callBack2();
    }
}


// 沈欺霜【仙霞五奇】
function skillCharacters_ShenqishuangXianxiawuqi(isWuren, zhenyin, targetObject) {
    var message1 = null;
    var message2 = null;

    for (var t = 0; t < zhenyin.friendList.length; t++) {
        if (zhenyin.friendList[t].hp > 0 && zhenyin.friendList[t].skillNameList.containsObject(skillnameXianxiawuqi)) {
            if (targetObject instanceof Player) {
                if (isWuren) {
                    message1 = "无人支援,";
                } else {
                    message1 = "支援失败，";
                }
                message2 = "触发者";
                triggerCombat -= fight_Trigger[0].combat;
                baseEffectAddSkillCombat(targetObject, 3);
                triggerCombat += fight_Trigger[0].combat;
            } else if (targetObject instanceof BaseMonster) {
                if (isWuren) {
                    message1 = "无人妨碍,";
                } else {
                    message1 = "妨碍失败，";
                }
                message2 = "怪物方";
                monsterCombat -= targetObject.combat;
                targetObject.combat += 3;
                monsterCombat += targetObject.combat;
            }
            mainScene.addChild(new NormalSkillAnimationLayer(skillnameXianxiawuqi, zhenyin.friendList[t].hadImageView));
            myAudioPlayer(audioShenqishuangXianxiawuqi);
            textAreaAddMessage(message2 + message1 + zhenyin.friendList[t]._name + "发动【仙霞五奇】效果," + message2 + "战力+3", myText, listView);
            if (zhenyin.friendList[t]._name == nameShenqishuang) {
                AchivementProgress.addAchivementProgress(zhenyin.friendList[t]);
            }
            break;
        }
    }
}

// 沈欺霜【元灵归心术】
function skillCharacters_ShenqishuangYuanlingguixinshu(player) {
    if (player._name == player1._name && baseEffectHaveHowManyCardOfType(player, CARDTYPE.SKILLCARD) > 0) {
        var skillCardList = new Array();
        for (var i = 0; i < player.handCard.length; i++) {
            if (player.handCard[i].cardType == CARDTYPE.SKILLCARD) {
                skillCardList.push(player.handCard[i]);
            }
        }
        addDialog(mainScene, new selectCardDialogLayer("请选择丢弃的技牌(每丢弃1张可回复任意玩家2点HP)", skillCardList, 1, skillCardList.length, true, function (selectList) {
            if (selectList != null) {
                var player2Shown = player2._name != nameChonglouSp ? true : false;
                var player3Shown = player3._name != nameChonglouSp ? true : false;
                var player4Shown = player4._name != nameChonglouSp ? true : false;
                addDialog(mainScene, new selectPlayerDialogLayer(true, player2Shown, player3Shown, player4Shown,
                    "请选择玩家", false, false, function (selectPlayer) {
                        for (var i = 0; i < selectList.length; i++) {
                            remove_Card_Into_DropDeck(selectList[i].name);
                            player.handCard.removeObject(selectList[i]);
                            selectList[i].removeFromParent();
                            for (var t = 0; t < 2; t++) {
                                baseEffectAddHP(selectPlayer);
                            }
                            has_Tianshezhang(selectPlayer);
                        }
                        mainScene.addChild(new skillAnimationLayer(player.animation));
                        myAudioPlayer(audioShenqishuangYuanlingguixinshu);
                        textAreaAddMessage(player._name + "发动【元灵归心术】效果,指定" + selectPlayer._name + "恢复HP", myText, listView);
                    }));
            }
        }));
    }
}

// 孔璘【辣手摧花】
function skillCharacters_KonglinLashoucuihua() {
    var Havefemale = false;
    var female = 0;
    if (nowPlayerTerm[nowPlayerNumber]._name == player1._name && player1.skillNameList.containsObject(skillnameLashoucuihua)) {
        for (var i = 0; i < nowPlayerTerm.length; i++) {
            if (nowPlayerTerm[i]._name != player1._name && nowPlayerTerm[i].sex == 1) {
                Havefemale = true;
                ++female;
            }
        }
        if (player1.hp >= 2 && Havefemale
            && laShouCuiHuaList.length + 1 <= female) {
            var Plyer2 = player2.sex == 0 ? false : true;
            var Plyer3 = player3.sex == 0 ? false : true;
            var Plyer4 = player4.sex == 0 ? false : true;
            for (var i = 0; i < laShouCuiHuaList.length; i++) {
                if (player2._name == laShouCuiHuaList[i]._name)
                    Plyer2 = false;
                if (player3._name == laShouCuiHuaList[i]._name)
                    Plyer3 = false;
                if (player4._name == laShouCuiHuaList[i]._name)
                    Plyer4 = false;
            }
            addDialog(mainScene, new selectPlayerDialogLayer(false, Plyer2, Plyer3, Plyer4, "请选择一名女性角色", false, false, function (selectPlayer) {
                mainScene.addChild(new NormalSkillAnimationLayer(skillnameLashoucuihua, player1.hadImageView, function () {
                    laShouCuiHuaList.push(selectPlayer);
                    useYingu([player1, selectPlayer], player1, player1, [1, 1], true, baseEffectReduceHPEffect, function () {
                        // 唐雪见【追打】技能
                        skillCharactersTangxuejianZhuida(function () {
                            heartList = new Array();
                            AchivementProgress.addAchivementProgress(player1);
                        });
                    });
                }));
            }));
        }
    }
}


// 孔璘[生命献祭]
function skillCharacters_KonglinShengmingxianji(nowplayer) {
    var who = 0;// 0表示未参战，1表示触发者，2表示支援者，3表示妨碍者
    if (nowplayer.joinAttack) {
        for (var i = 0; i < fight_Trigger.length; i++) {
            if (fight_Trigger[i]._name == nowplayer._name) {
                who = nowplayer._name == nowPlayerTerm[nowPlayerNumber]._name ? 1 : 2;
                break;
            }
        }
        if (who == 0) {
            for (var i = 0; i < fight_Monster.length; i++) {
                if (fight_Monster[i]._name == nowplayer._name) {
                    who = 3;
                    break;
                }
            }
        }
    }
    characterCardManager(nowplayer, 25);
    mainScene.addChild(new NormalSkillAnimationLayer(skillnameShengmingxianji, nowplayer.hadImageView, function () {
        textAreaAddMessage(nameKonglin + "【生命献祭】技能触发，变身为“魔尊”", myText, listView);
        // 将【孔璘】替换为【魔尊】
        nowplayer.hadImageView.loadTexture(nowplayer.playerPicSrc);
        switch (who) {
            case 1:
                fight_Trigger[0] = nowplayer;
                break;
            case 2:
                fight_Trigger[1] = nowplayer;
                break;
            case 3:
                fight_Monster[0] = nowplayer;
                break;
        }
    }));
}

// 魔尊【蓄势待发】技能
function skillCharacters_MozunXushidaifa() {
    if (nowPlayerTerm[nowPlayerNumber].skillNameList
            .containsObject(skillnameXushidaifa)) {
        mainScene.addChild(new NormalSkillAnimationLayer(skillnameXushidaifa, nowPlayerTerm[nowPlayerNumber].hadImageView, function () {
            textAreaAddMessage("魔尊【蓄势待发】技能触发，补充1张手牌", myText, listView, function () {
                if (nowPlayerTerm[nowPlayerNumber]._name == player1._name) {
                    AchivementProgress.addAchivementProgress(nowPlayerTerm[nowPlayerNumber]);
                }
                addHandCard([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], null, [1], true, true);
            });
        }));
    }
}

// 魔尊【崩坏】技能
function skillCharacters_MozunBenghuai() {
    if (nowPlayerTerm[nowPlayerNumber].skillNameList.containsObject(skillnameBenghuai)
        && nowPlayerTerm[nowPlayerNumber].hp > 0) {
        mainScene.addChild(new NormalSkillAnimationLayer(skillnameBenghuai, nowPlayerTerm[nowPlayerNumber].hadImageView));
        textAreaAddMessage("魔尊【崩坏】效果触发，HP-1", myText, listView);
        useYingu([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], [1], true, baseEffectReduceHPEffect, function () {
            // 唐雪见【追打】技能
            skillCharactersTangxuejianZhuida(function () {
                heartList = new Array();
            });
        });
    }
}

function zhuidaHandle(skillUser, endUser, userList, cancelList, callBack) {
    var nextIndex = 0;
    for (var i = 0; i < userList.length; i++) {
        if (userList[i]._name == skillUser._name) {
            nextIndex = i + 1;
            break;
        }
    }
    if (skillUser._name == player1._name && skillUser.handCard.length > 0) {
        addDialog(mainScene, new ChooseZoneLayer("是否发动“追打”？", function (result) {
            if (result) {
                addDialog(mainScene, new selectCardDialogLayer("请丢弃1张手牌", skillUser.handCard, 1, 1, false, function (selectCard) {
                    mainScene.addChild(new NormalSkillAnimationLayer(skillnameZhuida, skillUser.hadImageView, function () {
                        if (skillUser._name == nameTangxuejian) {
                            AchivementProgress.addAchivementProgress(skillUser);
                        }
                        var card = selectCard.pop();
                        remove_Card_Into_DropDeck(card.name);
                        skillUser.handCard.removeObject(card);
                        card.removeFromParent();
                        var tempHeartList = new Array();
                        var tempHeartNumberList = new Array();
                        for (var t = 0; t < heartList.length; t++) {
                            tempHeartList.push(heartList[t]);
                            tempHeartNumberList.push(1);
                        }
                        heartList = new Array();
                        useYingu(tempHeartList, tempHeartList[0], tempHeartList[0], tempHeartNumberList, true, baseEffectReduceHPEffect, function () {
                            if (skillUser._name == endUser._name) {
                                // 唐雪见【追打】技能
                                skillCharactersTangxuejianZhuida(callBack, cancelList);
                                return;
                            }
                            zhuidaHandle(userList[nextIndex], endUser, userList, cancelList, callBack);
                        });
                    }));
                }));
            } else {
                cancelList.pushUnique(skillUser);
                if (skillUser._name == endUser._name) {
                    // 唐雪见【追打】技能
                    skillCharactersTangxuejianZhuida(callBack, cancelList);
                    return;
                }
                zhuidaHandle(userList[nextIndex], endUser, userList, cancelList, callBack);
            }
        }));
    } else {
        // AI处理【追打】
        if (skillUser.handCard.length > 2) {
            var canUseZhuida = true;
            for (var t = 0; t < heartList.length; t++) {
                if (player1IsPlayer2Friend(heartList[t], skillUser)) {
                    canUseZhuida = false;
                    break;
                }
            }
            if (canUseZhuida) {
                mainScene.addChild(new NormalSkillAnimationLayer(skillnameZhuida, skillUser.hadImageView, function () {
                    var tempHandCard = skillUser.handCard[parseInt(Math.random() * skillUser.handCard.length, 10)];
                    skillUser.handCard.removeObject(tempHandCard);
                    remove_Card_Into_DropDeck(tempHandCard.name);
                    textAreaAddMessage(skillUser._name + "舍弃1张手牌" + tempHandCard.name + "发动“追打”，本次所有HP减少的玩家(可能包括唐雪见自己)HP额外-1", myText, listView, function () {
                        var tempHeartList = new Array();
                        var tempHeartNumberList = new Array();
                        for (var i = 0; i < heartList.length; i++) {
                            tempHeartList.push(heartList[i]);
                            tempHeartNumberList.push(1);
                        }
                        heartList = new Array();
                        useYingu(tempHeartList, tempHeartList[0], tempHeartList[0], tempHeartNumberList, true, baseEffectReduceHPEffect, function () {
                            if (skillUser._name == endUser._name) {
                                // 唐雪见【追打】技能
                                skillCharactersTangxuejianZhuida(callBack, cancelList);
                                return;
                            }
                            zhuidaHandle(userList[nextIndex], endUser, userList, cancelList, callBack);
                        });
                    });
                }));
            } else {
                cancelList.pushUnique(skillUser);
                if (skillUser._name == endUser._name) {
                    skillCharactersTangxuejianZhuida(callBack, cancelList);
                    return;
                }
                zhuidaHandle(userList[nextIndex], endUser, userList, cancelList, callBack);
            }
        } else {
            cancelList.pushUnique(skillUser);
            if (skillUser._name == endUser._name) {
                // 唐雪见【追打】技能
                skillCharactersTangxuejianZhuida(callBack, cancelList);
                return;
            }
            zhuidaHandle(userList[nextIndex], endUser, userList, cancelList, callBack);
        }
    }

}


// 唐雪见【追打】
function skillCharactersTangxuejianZhuida(callBack, cancelList) {
    if (cancelList == null) {
        cancelList = [];
    }
    if (heartList.length > 0) {
        var _skillUser = [];
        for (var i = 0; i < nowPlayerTerm.length; i++) {
            if (nowPlayerTerm[i].hp > 0
                && nowPlayerTerm[i].skillNameList.containsObject(skillnameZhuida)) {
                _skillUser.push(nowPlayerTerm[i]);
            }
        }
        if (_skillUser.length == 0 || cancelList.length == _skillUser.length) {
            if (callBack != null) {
                callBack();
            }
            return;
        }
        zhuidaHandle(_skillUser[0], _skillUser[_skillUser.length - 1], _skillUser, cancelList, callBack);
    } else if (callBack != null) {
        callBack();
    }
}

// 唐雪见【连击】
function skillCharacters_TangxuejianLianji() {
    var useCardList = new Array();
    for (var i = 0; i < player1.handCard.length; i++) {
        if (player1.handCard[i].cardType != CARDTYPE.FIGHTCARD) {
            useCardList.push(player1.handCard[i]);
        }
    }
    if (useCardList.length > 0) {
        addDialog(mainScene, new selectCardDialogLayer("请选择丢弃的牌(每1张可令您在本场战斗中增加2点战力)", useCardList, 1, useCardList.length, true, function (selectCardList) {
            if (selectCardList != null) {
                for (var i = 0; i < selectCardList.length; i++) {
                    remove_Card_Into_DropDeck(selectCardList[i].name);
                    player1.handCard.removeObject(selectCardList[i]);
                    selectCardList[i].removeFromParent();
                    baseEffectAddTempCombat(player1, 2);
                    for (var t = 0; t < fight_Trigger.length; t++) {
                        if (fight_Trigger[t].skillNameList.containsObject(skillnameLianji)) {
                            triggerCombat += 2;
                            break;
                        }
                    }
                    if (fight_Monster.length > 0
                        && fight_Monster[0].skillNameList.containsObject(skillnameLianji)) {
                        monsterCombat += 2;
                    }
                }
                mainScene.addChild(new NormalSkillAnimationLayer(skillnameLianji, player1.hadImageView, function () {
                    myAudioPlayer(audioTangxuejianLianji);
                    textAreaAddMessage(player1._name + "发动【连击】，增加自身战力", myText, listView);
                }));
            }
        }));
    }
}

// 唐雪见【好胜】
function skillCharacters_TangxuejianHaosheng() {
    if ((player1.defense == string_handCardNameLonghunzhankai && player1.hp >= 1)
        || ((player1.hp >= 2) && player1.joinAttack && !player1.everyRoundSkill_3)) {
        addDialog(mainScene, new ChooseZoneLayer("是否发动“好胜”？", function (result) {
            if (result) {
                mainScene.addChild(new skillAnimationLayer(player1.animation, function () {
                    myAudioPlayer(audioTangxuejianHaosheng);
                    textAreaAddMessage(player1._name + "发动“好胜”效果，扣减自己2点Hp后补2张牌(本伤害隐蛊无效)", myText, listView, function () {
                        baseEffectReduceHPEffect(player1, [player1], 2, true, function () {
                            skillCharactersTangxuejianZhuida(function () {
                                heartList = new Array();
                                textAreaAddMessage(player1._name + "补了2张牌", myText, listView);
                                player1.everyRoundSkill_3 = true;
                                addHandCard([player1], player1, player1, null, [2], true, true);
                            });
                        });
                    });
                }));
            }
        }));
    }
}

function guanaiHandle(skillUser, endUser, userList, callBack) {
    var nextIndex = 0;
    for (var i = 0; i < userList.length; i++) {
        if (userList[i]._name == skillUser._name) {
            nextIndex = i + 1;
            break;
        }
    }
    var selectPlayer = null;
    textAreaAddMessage(skillUser._name + "【关爱】效果触发，指定一人补2张手牌", myText, listView, function () {
        if (skillUser._name == player1._name) {
            var player2Shown = player2._name != nameChonglouSp ? true : false;
            var player3Shown = player3._name != nameChonglouSp ? true : false;
            var player4Shown = player4._name != nameChonglouSp ? true : false;
            addDialog(mainScene, new selectPlayerDialogLayer(true, player2Shown, player3Shown, player4Shown,
                "请指定一人补2张牌", false, false, function (selectResult) {
                    if (player1._name == nameZixuan) {
                        AchivementProgress.addAchivementProgress(player1);
                    }
                    mainScene.addChild(new skillAnimationLayer(player1.animation));
                    myAudioPlayer(audioZixuanGuanai);
                    textAreaAddMessage(selectResult._name + "补了2张牌", myText, listView);
                    addHandCard([selectResult], selectResult, selectResult, null, [2], true, true, function () {
                        if (skillUser._name == endUser._name) {
                            if (callBack != null) {
                                callBack();
                            }
                            return;
                        }
                        guanaiHandle(userList[nextIndex], endUser, userList, callBack);
                    });
                }));
        } else {
            // AI处理【关爱】效果
            selectPlayer = skillUser.friendList[i];
            if (selectPlayer.friendList[0].hp > 0 && selectPlayer.friendList[1]._name != nameChonglouSp
                && selectPlayer.friendList[1].handCard.length < selectPlayer.handCard.length) {
                selectPlayer = selectPlayer.friendList[1];
            }
            mainScene.addChild(new NormalSkillAnimationLayer(skillnameGuanai, skillUser.hadImageView, function () {
                myAudioPlayer(audioZixuanGuanai);
                textAreaAddMessage(selectPlayer._name + "补了2张牌", myText, listView);
                addHandCard([selectPlayer], selectPlayer, selectPlayer, null, [2], true, true, function () {
                    if (skillUser._name == endUser._name) {
                        if (callBack != null) {
                            callBack();
                        }
                        return;
                    }
                    guanaiHandle(userList[nextIndex], endUser, userList, callBack);
                });
            }));
        }
    });
}

// 紫萱【关爱】
function skillCharacters_ZixuanGuanai(tempPlayer, callBack) {
    var _userList = [];
    for (var i = 0; i < tempPlayer.friendList.length; i++) {
        if (tempPlayer.friendList[i].hp > 0
            && tempPlayer.friendList[i].skillNameList.containsObject(skillnameGuanai)) {
            _userList.push(tempPlayer.friendList[i]);
        }
    }
    if (_userList.length == 0) {
        if (callBack != null) {
            callBack();
        }
        return;
    }
    guanaiHandle(_userList[0], _userList[_userList.length - 1], _userList, callBack);
}

// 紫萱【神圣】
function skillCharacters_ZixuanShensheng(player, monsterModel, callBack) {
    if (player.skillNameList.containsObject(skillnameShensheng)) {
        mainScene.addChild(new NormalSkillAnimationLayer(skillnameShensheng, player.hadImageView, function () {
            myAudioPlayer(audioZixuanShensheng);
            textAreaAddMessage("紫萱“神圣”效果触发，" + monsterModel.name + "战力+3", myText, listView);
            monsterModel.combat += 3;
            if (monsterModel.name == nameJinchanguimu) {
                jinchanguimu.combat += 3;
            }
            if (callBack != null) {
                callBack();
            }
        }));
    } else if (callBack != null) {
        callBack();
    }
}

function zixuan_ShenshengEnd(player, monsterModel) {
    if (monsterModel != null && monsterModel != undefined) {
        if (player.skillNameList.containsObject(skillnameShensheng)) {
            textAreaAddMessage("紫萱“神圣”效果失效，" + monsterModel.name + "战力-3", myText, listView);
            monsterModel.combat -= 3;
            if (monsterModel.name == nameJinchanguimu) {
                jinchanguimu.combat -= 3;
            }
        }
    } else {
        textAreaAddMessage("紫萱退场，“神圣”效果解除", myText, listView);
        var monsterModelList = new Array();
        monsterModelList[0] = player.pet_FengMonster;
        monsterModelList[1] = player.pet_LeiMonster;
        monsterModelList[2] = player.pet_ShuiMonster;
        monsterModelList[3] = player.pet_HuoMonster;
        monsterModelList[4] = player.pet_TuMonster;
        for (var i = 0; i < monsterModelList.length; i++) {
            if (monsterModelList[i] != null) {
                monsterModelList[i].combat -= 3;
                if (monsterModelList[i].name == nameJinchanguimu) {
                    jinchanguimu.combat -= 3;
                }

            }
        }
    }

}

// 重楼【决斗】
function skillCharacters_ChonglouJuedou() {
    var juedouList = new Array();
    if (nowPlayerTerm[nowPlayerNumber]._name == player1._name && player1._name == nameChonglou && player1.handCard.length >= chonglou_JueDou) {
        addDialog(mainScene, new selectCardDialogLayer("请选择丢弃的牌", player1.handCard, chonglou_JueDou + 1, chonglou_JueDou + 1, true, function (selectCardList) {
            if (selectCardList != null) {
                mainScene.addChild(new skillAnimationLayer(nowPlayerTerm[nowPlayerNumber].animation, function () {
                    chonglou_JueDou++;
                    for (var i = 0; i < selectCardList.length; i++) {
                        remove_Card_Into_DropDeck(selectCardList[i].name);
                        player1.handCard.removeObject(selectCardList[i]);
                        selectCardList[i].removeFromParent();
                    }
                    addDialog(mainScene, new selectPlayerDialogLayer(false, true, true, true,
                        "请选择1名决斗的角色", false, false, function (jueDouPlayer1) {
                            juedouList.push(jueDouPlayer1);
                            if (baseEffectCountLivePlayer() > 2) {
                                var temp2 = juedouList[0]._name == player2._name ? false : true;
                                var temp3 = juedouList[0]._name == player3._name ? false : true;
                                var temp4 = juedouList[0]._name == player4._name ? false : true;
                                addDialog(mainScene, new selectPlayerDialogLayer(false, temp2, temp3, temp4,
                                    "请选择第2名决斗的角色或取消", true, false, function (jueDouPlayer2) {
                                        if (jueDouPlayer2 != null) {
                                            juedouList.push(jueDouPlayer2);
                                        }
                                        juedouHandle(juedouList, 0);
                                    }));
                            } else {
                                // 无法选择第二名角色的处理
                                juedouHandle(juedouList, 0);
                            }
                        }));
                }));
            }
        }));
    }
}

function juedouHandle(juedouList, index) {
    var shouxialiuqing = false;// 判断是否发动【手下留情】
    var heart = 0;
    var number1 = 0, number2 = 0;
    number1 = parseInt(Math.random() * 6, 10) + 1;
    textAreaAddMessage("重楼骰子点数为" + number1, myText, listView, function () {
        number2 = parseInt(Math.random() * 6, 10) + 1;
        textAreaAddMessage(juedouList[index]._name + "骰子点数为：" + number2, myText, listView, function () {
            skillCharacters_WangxiaohuBuqubunao(juedouList[index], number2, function () {
                if (number1 > number2) {
                    heart = 3;
                    textAreaAddMessage("重楼获胜", myText, listView, function () {
                        AchivementProgress.addAchivementProgress(player1);
                        if (juedouList[index].hp >= 2) {
                            shouxialiuqing = true;
                        }
                        if (juedouList[index].hp - 3 <= 0 && shouxialiuqing) {
                            heart = juedouList[index].hp - 1;
                            mainScene.addChild(new NormalSkillAnimationLayer(skillnameShouxialiuqing, player1.hadImageView, function () {
                                textAreaAddMessage("重楼“手下留情”效果发动，HP大于等于2的一方，决斗后至少保留1点HP", myText, listView);
                            }));
                        }
                        baseEffectReduceHPEffect(juedouList[index], [juedouList[index]], heart, true, function () {
                            // 唐雪见【追打】
                            skillCharactersTangxuejianZhuida(function () {
                                heartList = new Array();
                                if (index < juedouList.length - 1) {
                                    juedouHandle(juedouList, index + 1);
                                }
                            });
                        });
                    });
                } else if (number1 == number2) {
                    heart = 2;
                    textAreaAddMessage("平局，双方HP-2", myText, listView);
                    if (player1.hp == 2) {
                        mainScene.addChild(new NormalSkillAnimationLayer(skillnameShouxialiuqing, player1.hadImageView, function () {
                            textAreaAddMessage("重楼“手下留情”效果发动，HP大于等于2的一方，决斗后至少保留1点HP", myText, listView);
                        }));
                        baseEffectReduceHPEffect(player1, [player1], 1, true, null);
                    } else {
                        baseEffectReduceHPEffect(player1, [player1], 2, true, null);
                    }
                    if (juedouList[index].hp == 2) {
                        mainScene.addChild(new NormalSkillAnimationLayer(skillnameShouxialiuqing, player1.hadImageView, function () {
                            textAreaAddMessage("重楼“手下留情”效果发动，HP大于等于2的一方，决斗后至少保留1点HP", myText, listView);
                        }));
                        baseEffectReduceHPEffect(juedouList[index], [juedouList[index]], 1, true, null);
                    } else {
                        baseEffectReduceHPEffect(juedouList[index], [juedouList[index]], 2, true, null);
                    }
                    // 唐雪见【追打】
                    skillCharactersTangxuejianZhuida(function () {
                        heartList = new Array();
                        if (index < juedouList.length - 1) {
                            juedouHandle(juedouList, index + 1);
                        }
                    });
                } else if (number1 < number2) {
                    heart = 3;
                    textAreaAddMessage(juedouList[index]._name + "获胜", myText, listView);
                    if (player1.hp >= 2)
                        shouxialiuqing = true;
                    if (player1.hp - 3 <= 0 && shouxialiuqing) {
                        mainScene.addChild(new NormalSkillAnimationLayer(skillnameShouxialiuqing, player1.hadImageView, function () {
                            textAreaAddMessage("重楼“手下留情”效果发动，HP大于等于2的一方，决斗后至少保留1点HP", myText, listView);
                        }));
                        heart = player1.hp - 1;
                    }

                    baseEffectReduceHPEffect(player1, [player1], heart, true, function () {
                        // 唐雪见【追打】
                        skillCharactersTangxuejianZhuida(function () {
                            heartList = new Array();
                            if (index < juedouList.length - 1) {
                                juedouHandle(juedouList, index + 1);
                            }
                        });
                    });
                }
            });
        });
    });
}

// 重楼【降临】
function skillCharacters_ChonglouJianglin() {
    if (fight_Monster.length > 0) {
        if (fight_Monster[0].skillNameList.containsObject(skillnameJianglin)) {
            mainScene.addChild(new NormalSkillAnimationLayer(skillnameJianglin, fight_Monster[0].hadImageView, function () {
                textAreaAddMessage("重楼“降临”技能触发，命中额外+2", myText, listView);
                for (var i = 0; i < 2; i++) {
                    baseEffectAddTempExtent(fight_Monster[0]);
                }
            }));
        }
    }
}

// 南宫煌【占卜】
function skillCharacters_NangonghuangZhanbu() {
    if (nowPlayerTerm[nowPlayerNumber]._name == player1._name && player1.skillNameList.containsObject(skillnameZhanbu)
        && player1.handCard.length > 0) {
        if (player1._name == nameNangonghuang) {
            if (player1.everyRoundSkill_1 == true) {
                return;
            }
        } else if (player1._name == nameZhaolingerSp) {
            if (player1.everyRoundSkill_3 == true) {
                return;
            }
        }
        addDialog(mainScene, new selectCardDialogLayer("请弃掉1张牌发动“占卜”", player1.handCard, 1, 1, true, function (result) {
            if (result) {
                if (player1._name == nameNangonghuang) {
                    player1.everyRoundSkill_1 = true;
                    AchivementProgress.addAchivementProgress(player1);
                } else if (player1._name == nameZhaolingerSp) {
                    player1.everyRoundSkill_3 = true;
                }
                var card = result.pop();
                remove_Card_Into_DropDeck(card.name);
                player1.handCard.removeObject(card);
                card.removeFromParent();
                mainScene.addChild(new skillAnimationLayer(player1.animation, function () {
                    myAudioPlayer(audioNangonghuangZhanbu);
                    textAreaAddMessage(player1._name + "发动“占卜”效果，观看怪物牌堆", myText, listView);
                    var message = "";
                    var monsterList = new Array();
                    var monsterNumber = 0;
                    var isNormal = true;
                    if (game_MonsterDeck.length >= 3) {
                        message = "请选择留下的牌（其余将被丢弃）";
                        monsterNumber = 3;
                    } else {
                        message = "怪物牌堆不足3张，请确认要丢弃的牌：";
                        isNormal = false;
                        monsterNumber = game_MonsterDeck.length;
                    }
                    for (var i = 0; i < monsterNumber; i++) {
                        monsterList.push(game_MonsterDeck[i]);
                    }
                    addDialog(mainScene, new selectMonsterDialogLayer(message, monsterList, function (selectMonster) {
                        if (isNormal) {
                            // 怪物牌堆大于等于3张时的处理
                            for (var i = 0; i < monsterList.length; i++) {
                                if (topMonsterCard(monsterList[i]).name != selectMonster.name) {
                                    textAreaAddMessage(player1._name + "丢弃了【" + topMonsterCard(monsterList[i]).name + "】", myText, listView);
                                    game_MonsterDeck.removeObject(monsterList[i]);
                                }

                            }
                        } else {
                            // 怪物牌堆小于3张时的处理
                            game_MonsterDeck = new Array();
                        }
                    }));
                }));
            }
        }));
    }
}


// 南宫煌【摄灵法阵】
function skillCharacters_NangonghuangShelingfazheng(pet_Shuxing, callBack) {
    if (nowPlayerTerm[nowPlayerNumber].skillNameList
            .containsObject(skillnameShelingfazhen)) {
        var havePet = false;
        if (pet_Shuxing == Text.natureFeng
            && ((player3._name != nameChonglouSp && player3.pet_FengMonster != null ) || (player4._name != nameChonglouSp && player4.pet_FengMonster != null)))
            havePet = true;
        else if (pet_Shuxing == Text.natureLei
            && ((player3._name != nameChonglouSp && player3.pet_LeiMonster != null) || (player4._name != nameChonglouSp && player4.pet_LeiMonster != null)))
            havePet = true;
        else if (pet_Shuxing == Text.natureShui
            && ((player3._name != nameChonglouSp && player3.pet_ShuiMonster != null) || (player4._name != nameChonglouSp && player4.pet_ShuiMonster != null)))
            havePet = true;
        else if (pet_Shuxing == Text.natureHuo
            && ((player3._name != nameChonglouSp && player3.pet_HuoMonster != null) || (player4._name != nameChonglouSp && player4.pet_HuoMonster != null)))
            havePet = true;
        else if (pet_Shuxing == Text.natureTu
            && ((player3._name != nameChonglouSp && player3.pet_TuMonster != null) || (player4._name != nameChonglouSp && player4.pet_TuMonster != null)))
            havePet = true;

        if (havePet) {
            if (nowPlayerTerm[nowPlayerNumber]._name == player1._name) {
                addDialog(mainScene, new ChooseZoneLayer("是否发动“摄灵法阵”？", function (result) {
                    if (result) {
                        var player3Shown = false;
                        var player4Shown = false;
                        if (pet_Shuxing == Text.natureFeng) {
                            player3Shown = (player3._name != nameChonglouSp && player3.pet_FengMonster != null) ? true : false;
                            player4Shown = (player4._name != nameChonglouSp && player4.pet_FengMonster != null) ? true : false;
                        } else if (pet_Shuxing == Text.natureLei) {
                            player3Shown = (player3._name != nameChonglouSp && player3.pet_LeiMonster != null) ? true : false;
                            player4Shown = (player4._name != nameChonglouSp && player4.pet_LeiMonster != null) ? true : false;
                        } else if (pet_Shuxing == Text.natureShui) {
                            player3Shown = (player3._name != nameChonglouSp && player3.pet_ShuiMonster != null) ? true : false;
                            player4Shown = (player4._name != nameChonglouSp && player4.pet_ShuiMonster != null) ? true : false;
                        } else if (pet_Shuxing == Text.natureHuo) {
                            player3Shown = (player3._name != nameChonglouSp && player3.pet_HuoMonster != null) ? true : false;
                            player4Shown = (player4._name != nameChonglouSp && player4.pet_HuoMonster != null) ? true : false;
                        } else if (pet_Shuxing == Text.natureTu) {
                            player3Shown = (player3._name != nameChonglouSp && player3.pet_TuMonster != null) ? true : false;
                            player4Shown = (player3._name != nameChonglouSp && player4.pet_TuMonster != null) ? true : false;
                        }
                        addDialog(mainScene, new selectPlayerDialogLayer(false, false, player3Shown, player4Shown,
                            "请选择目标", false, false, function (selectPlayer) {
                                mainScene.addChild(new NormalSkillAnimationLayer(skillnameShelingfazhen, player1.hadImageView, function () {
                                    myAudioPlayer(audioNangonghuangShelingfazhen);
                                    textAreaAddMessage(player1._name + "发动“摄灵法阵”消灭" + selectPlayer._name + "的" + pet_Shuxing + "属性宠物", myText, listView);
                                    baseEfectPerishPet(pet_Shuxing, selectPlayer);
                                    if (callBack != null) {
                                        callBack();
                                    }
                                }));
                            }));
                    } else if (callBack != null) {
                        callBack();
                    }
                }));
            } else {
                // AI决定是否触发【摄灵法阵】
                if (callBack != null) {
                    callBack();
                }
            }
        } else if (callBack != null) {
            callBack();
        }
    } else if (callBack != null) {
        callBack();
    }
}


// 温慧【阵法】
function skillCharacters_WenhuiZhenfa() {
    if (fight_Trigger[0].skillNameList.containsObject(skillnameZhenfa)) {
        if (fight_Trigger[0]._name == nameWenhui) {
            AchivementProgress.addAchivementProgress(player1);
        }
        myAudioPlayer(audioWenhuiZhenfa);
        mainScene.addChild(new NormalSkillAnimationLayer(skillnameZhenfa, fight_Trigger[0].hadImageView, function () {
            textAreaAddMessage("我方支援命中，" + fight_Trigger[0]._name + "“阵法”效果触发，自身战力额外+3", myText, listView);
            baseEffectAddSkillCombat(fight_Trigger[0], 3);
        }));
    }
}

// 温慧【蛮横】
function skillCharacters_WenhuiManheng(callBack) {
    if (nowPlayerTerm[nowPlayerNumber].hp > 0 && nowPlayerTerm[nowPlayerNumber].skillNameList.containsObject(skillnameManheng)) {
        if (nowPlayerTerm[nowPlayerNumber]._name == player1._name) {
            var player2Shown = player2._name != nameChonglouSp ? true : false;
            var player3Shown = player3._name != nameChonglouSp ? true : false;
            var player4Shown = player4._name != nameChonglouSp ? true : false;
            addDialog(mainScene, new selectPlayerDialogLayer(true, player2Shown, player3Shown, player4Shown,
                "请指定“蛮横”的目标或取消", true, false, function (selectPlayer) {
                    if (selectPlayer != null) {
                        mainScene.addChild(new skillAnimationLayer(nowPlayerTerm[nowPlayerNumber].animation, function () {
                            myAudioPlayer(audioWenhuiManheng);
                            textAreaAddMessage(nowPlayerTerm[nowPlayerNumber]._name + "“蛮横”效果发动，指定" + selectPlayer._name + "HP-2", myText, listView);
                            useYingu([selectPlayer], selectPlayer, selectPlayer, [2], true, baseEffectReduceHPEffect, function () {
                                skillCharactersTangxuejianZhuida(function () {
                                    heartList = new Array();
                                    callBack();
                                });
                            });
                        }));
                    }
                }));
        } else {
            // AI决定是否发动【蛮横】
            var selectPlayer = getPlayerFromEnemy(nowPlayerTerm[nowPlayerNumber]);
            if (selectPlayer != null && selectPlayer._name != nameChonglouSp) {
                myAudioPlayer(audioWenhuiManheng);
                textAreaAddMessage("温慧“蛮横”效果发动，指定" + selectPlayer._name + "HP-2", myText, listView);
                useYingu([selectPlayer], selectPlayer, selectPlayer, [2], true, baseEffectReduceHPEffect, function () {
                    skillCharactersTangxuejianZhuida(function () {
                        heartList = new Array();
                        callBack();
                    });
                });
            } else {
                textAreaAddMessage("温慧不发动“蛮横”效果", myText, listView, callBack);
            }
        }
    } else {
        callBack();
    }
}

// 星璇【兄弟】
function skillCharacters_XingxuanXiongdi() {
    if (nowPlayerTerm[nowPlayerNumber]._name == player1._name
        && player1.skillNameList.containsObject(skillnameXiongdi) && player1.friendList[1].hp > 0
        && (player1.handCard.length + player1.friendList[1].handCard.length > 0)) {
        if (player1._name == nameXingxuan) {
            if (player1.everyRoundSkill_1 == true) {
                return;
            }
            player1.everyRoundSkill_1 = true;
        } else if (player1._name == nameZhaolingerSp) {
            if (player1.everyRoundSkill_3 == true) {
                return;
            }
            player1.everyRoundSkill_3 = true;
        }
        mainScene.addChild(new skillAnimationLayer(player1.animation, function () {
            myAudioPlayer(audioXingxuanXiongdi);
            textAreaAddMessage(player1._name + "发动“兄弟”效果，收取队友手牌后任意分配", myText, listView);
            if (player1.friendList[1].handCard.length > 0) {
                textAreaAddMessage(player1._name + "收取队友的手牌，等待分配", myText, listView);
                for (var i = 0; i < player1.friendList[1].handCard.length; i++) {
                    player1.handCard.push(player1.friendList[1].handCard[i]);
                    handCardZone.pushBackCustomItem(player1.friendList[1].handCard[i]);
                }
                player1.friendList[1].handCard = new Array();
            }
            addDialog(mainScene, new selectCardDialogLayer("请选择分配给队友的手牌或取消", player1.handCard, 1, player1.handCard.length, true, function (selectCardList) {
                if (selectCardList != null) {
                    for (var i = 0; i < selectCardList.length; i++) {
                        player1.friendList[1].handCard.push(selectCardList[i]);
                        player1.handCard.removeObject(selectCardList[i]);
                        selectCardList[i].removeFromParent();
                    }
                }
            }));
        }));
    }
}


// 星璇 【烹饪】(技牌阶段)
function skillCharacters_XingxuanPengren() {
    if (nowPlayerTerm[nowPlayerNumber]._name == player1._name
        && player1.skillNameList.containsObject(skillnamePengren) && player1.handCard.length >= 2) {
        addDialog(mainScene, new selectCardDialogLayer("请将2张手牌当作【灵葫仙丹】使用", player1.handCard, 2, 2, true, function (selectCard) {
            if (selectCard != null) {
                for (var i = 0; i < selectCard.length; i++) {
                    textAreaAddMessage(player1._name + "丢弃" + selectCard[i].name, myText, listView);
                    remove_Card_Into_DropDeck(selectCard[i].name);
                    player1.handCard.removeObject(selectCard[i]);
                    selectCard[i].removeFromParent();
                }
                if (player1._name == nameXingxuan) {
                    AchivementProgress.addAchivementProgress(player1);
                }
                myAudioPlayer(audioXingxuanPengren);
                textAreaAddMessage(player1._name + "发动“烹饪”效果，将2张手牌当作【灵葫仙丹】使用", myText, listView);
                handCardLinghuxiandan.effect(player1, player1, false, false);
            }
        }));
    }
}

// 星璇【烹饪】(有角色阵亡时的询问)
// startPlayer:当前死亡求灵狐的玩家
// usePlayer：当前被求出灵狐的玩家，检测是不是星璇
// callBack:该干嘛干嘛
function skillCharacters_XingxuanPengrenWhenDeath(startPlayer, usePlayer, callBack, callBack2) {
    if (usePlayer.skillNameList.containsObject(skillnamePengren) && usePlayer.handCard.length >= 2) {
        if (usePlayer._name == player1._name) {
            addDialog(mainScene, new ChooseZoneLayer("是否对" + startPlayer._name + "发动“烹饪”效果？", function (result) {
                if (result) {
                    addDialog(mainScene, new selectCardDialogLayer("请选择丢弃的2张牌", usePlayer.handCard, 2, 2, false, function (selectCardList) {
                        for (var i = 0; i < selectCardList.length; i++) {
                            textAreaAddMessage(usePlayer._name + "弃置：" + selectCardList[i].name, myText, listView);
                            remove_Card_Into_DropDeck(selectCardList[i].name);
                            usePlayer.handCard.removeObject(selectCardList[i]);
                            selectCardList[i].removeFromParent();
                        }
                        myAudioPlayer(audioXingxuanPengren);
                        textAreaAddMessage(usePlayer._name + "发动“烹饪”效果，对" + startPlayer._name + "使用【灵葫仙丹】", myText, listView);
                        useBingxingjue(usePlayer, usePlayer, function () {
                            LinghuxiandanHandle(startPlayer, usePlayer, null, callBack2);
                        });
                    }));
                } else {
                    callBack();
                }
            }));
        } else {
            // AI处理烹饪效果，默认不鸟他
            if (player1IsPlayer2Friend(startPlayer, usePlayer)) {
                for (var i = 0; i < 2; i++) {
                    var tempHandCard = usePlayer.handCard[parseInt(Math.random() * usePlayer.handCard.length, 10)];
                    usePlayer.handCard.removeObject(tempHandCard);
                    remove_Card_Into_DropDeck(tempHandCard.name);
                }
                myAudioPlayer(audioXingxuanPengren);
                textAreaAddMessage("星璇发动“烹饪”效果，对" + startPlayer._name + "使用【灵葫仙丹】", myText, listView);
                useBingxingjue(usePlayer, usePlayer, function () {
                    LinghuxiandanHandle(startPlayer, usePlayer, null, callBack2);
                });
            } else {
                callBack();
            }
        }
    } else {
        callBack();
    }
}

// 王蓬絮【饕餮】
function skillCharacters_WangpengxuTaotie() {
    if (nowPlayerTerm[nowPlayerNumber]._name == player1._name && player1.skillNameList.containsObject(skillnameTaotie) && baseEffectCountequment(player1) + player1.handCard.length > 0) {
        addDialog(mainScene, new ChooseZoneLayer("是否发动“饕餮”？", function (result) {
            if (result) {
                if (player1._name == nameWangpengxu) {
                    AchivementProgress.addAchivementProgress(player1);
                }
                addDialog(mainScene, new selectCardTypeDialogLayer("请选择丢弃的装备或手牌", player1, function (result) {
                    switch (result) {
                        case SelectCardType.ARMS1:
                            remove_Card_Into_DropDeck(player1.arms1);
                            player1.arms1Combat = 0;
                            player1.arms1Extent = 0;
                            player1.arms1 = Text.nil;
                            break;
                        case SelectCardType.ORNAMENT:
                            addDialog(mainScene, new selectCardDialogLayer("请选择放弃的饰品", player1.skillTempList, 1, 1, false, function (selectCard) {
                                var card = selectCard.pop();
                                remove_Card_Into_DropDeck(card.name);
                                player1.skillTempList
                                    .removeObject(card);
                                player1.maxCombat--;
                            }));
                            break;
                        case SelectCardType.DEFENSE:
                            remove_Card_Into_DropDeck(player1.defense);
                            player1.defenseCombat = 0;
                            player1.defenseExtent = 0;
                            player1.defense = Text.nil;
                            break;
                        case SelectCardType.HANDCARD:
                            addDialog(mainScene, new selectCardDialogLayer("请选择放弃的手牌", player1.handCard, 1, 1, false, function (selectCard) {
                                var card = selectCard.pop();
                                remove_Card_Into_DropDeck(card.name);
                                card.removeFromParent();
                                player1.handCard.removeObject(card);
                            }));
                            break;
                    }
                    myAudioPlayer(audioWangpengxuTaotie);
                    for (var i = 0; i < 2; i++) {
                        baseEffectAddHP(player1);
                    }
                    mainScene.addChild(new skillAnimationLayer(nowPlayerTerm[nowPlayerNumber].animation));
                    has_Tianshezhang(player1);
                }));
            }
        }));
    }
}


function hechengshipingHandle(player, callBack) {
    if (player.skillNameList.containsObject(skillnameHechengshipin)) {
        var tempList = new Array();
        for (var i = 0; i < player.handCard.length; i++) {
            if (player.handCard[i].cardType != CARDTYPE.ARMCARD &&
                player.handCard[i].cardType != CARDTYPE.DEFENSECARD) {
                tempList.push(player.handCard[i]);
            }
        }
        if (tempList.length > 0) {
            if (player._name == player1._name) {
                addDialog(mainScene, new selectCardDialogLayer("请选择要当作饰品的牌或取消", tempList, 1, 1, true, function (result) {
                    if (result != null) {
                        var card = result.pop();
                        mainScene.addChild(new NormalSkillAnimationLayer(skillnameHechengshipin, player.hadImageView, function () {
                            textAreaAddMessage(player._name + "发动“合成饰品”效果，将【" + card.name + "】当作饰品装备", myText, listView);
                        }));
                        player.handCard.removeObject(card);
                        card.removeFromParent();
                        if (player.skillTempList.length >= 5) {
                            addDialog(mainScene, new selectCardDialogLayer("饰品超过上限(5个)，请选择要丢弃的", player1.skillTempList, 1, 1, false, function (oldCardList) {
                                var oldShipin = oldCardList.pop();
                                remove_Card_Into_DropDeck(oldShipin.name);
                                player.skillTempList.removeObject(oldShipin);
                                player.skillTempList.push(card);
                                if (callBack != null) {
                                    skillCharacters_WangpengxuHechengshipin(callBack);
                                }
                            }));
                        } else {
                            player.skillTempList.push(card);
                            player.maxCombat++;
                            // 若此时已经处于打怪阶段，则双方战力要重新计算
                            if (fight_Trigger.length > 0) {
                                for (var i = 0; i < fight_Trigger.length; i++) {
                                    if (fight_Trigger[i]._name == nameWangpengxu) {
                                        triggerCombat++;
                                        break;
                                    }
                                }
                                for (var i = 0; i < fight_Monster.length; i++) {
                                    if (fight_Monster[i]._name == nameWangpengxu) {
                                        monsterCombat++;
                                        break;
                                    }
                                }
                            }
                            if (callBack != null) {
                                skillCharacters_WangpengxuHechengshipin(callBack);
                            }
                        }
                    } else if (callBack != null) {
                        callBack();
                    }
                }));
            } else if (callBack != null) {
                callBack();
            }
        } else if (callBack != null) {
            callBack();
        }
    }
}

// 王蓬絮【合成饰品】
function skillCharacters_WangpengxuHechengshipin(callBack) {
    var wangpengxuPlayer = null;
    for (var x = 0; x < nowPlayerTerm.length; x++) {
        if (nowPlayerTerm[x].hp > 0 && nowPlayerTerm[x]._name == nameWangpengxu) {
            wangpengxuPlayer = nowPlayerTerm[x];
            break;
        }
    }
    if (wangpengxuPlayer != null) {
        hechengshipingHandle(wangpengxuPlayer, callBack);
    } else if (callBack != null) {
        callBack();
    }
}


// 云天河【天河剑】
function skillCharacterss_YuntianheTianhejian(callBack) {
    var effect = false;
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0
            && nowPlayerTerm[i].skillNameList.containsObject(skillnameTianhejian)
            && nowPlayerTerm[i].joinAttack) {
            if (fight_FirstMonster.dodge > 0
                && (nowPlayerTerm[i].extent - fight_FirstMonster.dodge) >= 4) {
                effect = true;
                break;
            }
        }
    }
    if (effect) {
        mainScene.addChild(new NormalSkillAnimationLayer(skillnameTianhejian, nowPlayerTerm[i].hadImageView, function () {
            textAreaAddMessage(nowPlayerTerm[i]._name + "“天河剑”效果触发，自身战力额外+2", myText, listView, function () {
                baseEffectAddSkillCombat(nowPlayerTerm[i], 2);
                callBack();
            });
        }));
    } else {
        callBack();
    }
}


// 云天河【后羿射日弓】
function skillCharacters_YuntianheHouyisherigong(usePlayer) {
    if (usePlayer._name == player1._name && player1.skillNameList.containsObject(skillnameHouyisherigong)) {

        if (player1._name == nameYuntianhe) {
            if (yuntianhe_HouYiSheRiGong != 0) {
                return;
            }
        } else if (player1._name == nameZhaolingerSp) {
            if (zhaolingerSp_HouYiSheRiGong != 0) {
                return;
            }
        }
        addDialog(mainScene, new ChooseZoneLayer("是否发动“后羿射日弓”?", function (result) {
            if (result) {
                mainScene.addChild(new skillAnimationLayer(usePlayer.animation));
                textAreaAddMessage(usePlayer._name + "发动“后羿射日弓”效果，本场战斗我方战力额外+8", myText, listView);
                if (player1IsPlayer2Friend(usePlayer, nowPlayerTerm[nowPlayerNumber])) {
                   addTrigerCombat(8);
                    textAreaAddMessage("触发方战力+8", myText, listView);
                } else {
                    addMonsterCombat(8);
                    textAreaAddMessage("怪物方战力+8", myText, listView);
                }
                if (player1._name == nameYuntianhe) {
                    AchivementProgress.addAchivementProgress(player1);
                    yuntianhe_HouYiSheRiGong = 1;
                } else if (player1._name == nameZhaolingerSp) {
                    zhaolingerSp_HouYiSheRiGong = 1;
                }
            }
        }));
    }
}


function skillCharacters_YuntianheHouyisheriongEnd() {
    if (yuntianhe_HouYiSheRiGong == 1) {
        textAreaAddMessage("由于“后羿射日弓”效果，云天河命中永久变为0", myText, listView);
        for (var i = 0; i < nowPlayerTerm.length; i++) {
            if (nowPlayerTerm[i]._name == nameYuntianhe) {
                nowPlayerTerm[i].maxExtent = 0;
                yuntianhe_HouYiSheRiGong = 2;
            }
        }
    }
    if (zhaolingerSp_HouYiSheRiGong == 1) {
        textAreaAddMessage("由于“后羿射日弓”效果，赵灵儿sp命中永久变为0", myText, listView);
        for (var i = 0; i < nowPlayerTerm.length; i++) {
            if (nowPlayerTerm[i]._name == nameZhaolingerSp) {
                nowPlayerTerm[i].maxExtent = 0;
                zhaolingerSp_HouYiSheRiGong = 2;
            }
        }
    }
}


// 韩菱纱【搜囊探宝】
function skillCharacters_HanlinshaSounangtanbao(usePlayer) {
    if (usePlayer.skillNameList.containsObject(skillnameSounangtanbao)
        && usePlayer.handCard.length > 0) {
        if (usePlayer._name == player1._name) {
            if (usePlayer._name == nameHanlingsha) {
                if (player1.everyRoundSkill_1 == true) {
                    return;
                }
            } else if (usePlayer._name == nameZhaolingerSp) {
                if (player1.everyRoundSkill_3 == true) {
                    return;
                }
            }
            addDialog(mainScene, new selectCardDialogLayer("请选择舍弃的1张手牌", player1.handCard, 1, 1, true, function (selectCardList) {
                if (selectCardList != null) {
                    if (usePlayer._name == nameHanlingsha) {
                        player1.everyRoundSkill_1 = true;
                        AchivementProgress.addAchivementProgress(player1);
                    } else if (usePlayer._name == nameZhaolingerSp) {
                        player1.everyRoundSkill_3 = true;
                    }
                    myAudioPlayer(audioHanlingshaSounangtanbao);
                    mainScene.addChild(new skillAnimationLayer(usePlayer.animation, function () {
                        var card = selectCardList.pop();
                        usePlayer.everyRoundSkill_1 = true;
                        remove_Card_Into_DropDeck(card.name);
                        usePlayer.handCard.removeObject(card);
                        card.removeFromParent();
                        addDialog(mainScene, new ChooseZoneLayer("是否当作【偷盗】使用?(否则当作【铜钱镖】)", function (choose) {
                            if (choose) {
                                handCardToudao.effect(usePlayer, usePlayer, false, false);
                            } else {
                                handCardTongqianbiao.effect(usePlayer, usePlayer, false, false);
                            }
                        }));
                    }));
                }
            }));
        } else {
            // AI处理搜囊探宝
        }
    }
}


// 韩菱纱【劫富济贫】
function skillCharacters_HanlinshaJiefujipin(usePlayer) {
    if (usePlayer._name == nameHanlingsha && !usePlayer.everyRoundSkill_2) {
        if (usePlayer._name == player1._name) {
            addDialog(mainScene, new ChooseZoneLayer("是否发动“劫富济贫”？", function (result) {
                if (result) {
                    mainScene.addChild(new NormalSkillAnimationLayer(skillnameJiefujipin, usePlayer.hadImageView, function () {
                        usePlayer.everyRoundSkill_2 = true;
                        addHandCard([usePlayer], usePlayer, usePlayer, null, [1], true, true, function () {
                            myAudioPlayer(audioHanlingshaJiefujipin);
                            textAreaAddMessage("韩菱纱发动“劫富济贫”，从牌堆中补了1张牌", myText, listView);
                            if (usePlayer.handCard.length >= 2) {
                                textAreaAddMessage("韩菱纱手牌大于等于2，需要丢1张牌", myText, listView);
                                addDialog(mainScene, new selectCardDialogLayer("请选择丢弃的1张牌", usePlayer.handCard, 1, 1, false, function (selectCardList) {
                                    var card = selectCardList.pop();
                                    remove_Card_Into_DropDeck(card.name);
                                    usePlayer.handCard.removeObject(card);
                                    card.removeFromParent();
                                    textAreaAddMessage("韩菱纱丢弃了【" + card.name + "】", myText, listView);
                                }));
                            }
                        });
                    }));
                }
            }));
        } else {
            // AI处理劫富济贫
        }
    }
}


function daomuHandle(hanlinsha, cardList, callBack) {
    addDialog(mainScene, new selectCardDialogLayer("请选择要分配的牌", cardList, 1, cardList.length, false, function (selectCardList) {
        addDialog(mainScene, new selectPlayerDialogLayer(true, true, true, true,
            "请选择分配的角色", false, false, function (selectPlayer) {
                for (var i = 0; i < selectCardList.length; i++) {
                    selectPlayer.handCard.push(selectCardList[i]);
                    if (selectPlayer._name == player1._name) {
                        handCardZone.pushBackCustomItem(selectCardList[i]);
                    }
                    cardList.removeObject(selectCardList[i]);
                }
                if (cardList.length > 0) {
                    daomuHandle(hanlinsha, cardList, callBack);
                } else {
                    useYingu([hanlinsha], hanlinsha, hanlinsha, [1], true, baseEffectReduceHPEffect, function () {
                        skillCharactersTangxuejianZhuida(function () {
                            heartList = new Array();
                            callBack();
                        });
                    });
                }
            }));
    }));
}

function judgeDeathPlayerEqument(deathPlayer) {
    var count = 0;
    var value = Text.nil;
    if (deathPlayer.arms1 != value && !deathPlayer.arms1.endsWith(Text.baofa))
        count++;
    if (deathPlayer.arms2 != value && !deathPlayer.arms2.endsWith(Text.baofa))
        count++;
    if (deathPlayer.defense != value && !deathPlayer.defense.endsWith(Text.baofa))
        count++;
    if (deathPlayer._name == nameWangpengxu) {
        count += deathPlayer.skillTempList.length;
    }
    return count;
}

// 韩菱纱【盗墓】
function skillCharacters_HanlinshaDaomu(player, callBack, callBack2) {
    if (player.handCard.length == 0 && judgeDeathPlayerEqument(player) == 0) {
        callBack();
        callBack2();
    } else {
        var hasHanlinsha = false;
        for (var i = 0; i < nowPlayerTerm.length; i++) {
            if (nowPlayerTerm[i].hp > 0
                && nowPlayerTerm[i].skillNameList.containsObject(skillnameDaomu)) {
                hasHanlinsha = true;
                var tempCardList = new Array();
                if (player.arms1 != Text.nil) {
                    if (!player.arms1.endsWith(Text.baofa)) {
                        tempCardList.push(getArmCardWithName(player, 1));
                    } else {
                        remove_Card_Into_DropDeck(player.arms1);
                        player.arms1 = Text.nil;
                    }
                }
                if (player.arms2 != Text.nil) {
                    if (!player.arms2.endsWith(Text.baofa)) {
                        tempCardList.push(getArmCardWithName(player, 2));
                    } else {
                        remove_Card_Into_DropDeck(player.arms2);
                        player.arms2 = Text.nil;
                    }
                }
                if (player.defense != Text.nil) {
                    if (!player.defense.endsWith(Text.baofa)) {
                        tempCardList.push(getDefenseCardWithName(player));
                    } else {
                        remove_Card_Into_DropDeck(player.defense);
                        player.defense = Text.nil;
                    }
                }
                for (var t = 0; t < player.handCard.length; t++) {
                    tempCardList.push(player.handCard[t]);
                }
                player.handCard = [];
                myAudioPlayer(audioHanlingshaDaomu);
                mainScene.addChild(new NormalSkillAnimationLayer(skillnameDaomu, nowPlayerTerm[i].hadImageView));
                textAreaAddMessage("韩菱纱“盗墓”效果触发，韩菱纱得到" + player._name + "所有手牌、装备并任意分配", myText, listView);
                if (nowPlayerTerm[i]._name == player1._name) {
                    daomuHandle(nowPlayerTerm[i], tempCardList, function () {
                        callBack();
                        callBack2();
                    });
                } else {
                    // AI处理盗墓
                    for (var d = 0; d < tempCardList.length; d++) {
                        nowPlayerTerm[i].handCard.push(tempCardList[d]);
                    }
                    useYingu([nowPlayerTerm[i]], nowPlayerTerm[i], nowPlayerTerm[i], [1], true, baseEffectReduceHPEffect, function () {
                        skillCharactersTangxuejianZhuida(function () {
                            heartList = new Array();
                            callBack();
                            callBack2();
                        });
                    });
                }
                break;
            }
        }
        if (!hasHanlinsha) {
            callBack();
            callBack2();
        }
    }
}

function zengjian_Arm1(selectPlayer) {
    // 丢掉第一把武器
    if (selectPlayer.arms1 != Text.nil) {
        remove_Card_Into_DropDeck(selectPlayer.arms1);
    }
    selectPlayer.arms1 = Text.nil;

    if (skillXiejianxian_HasXiejianxian(player1)) {
        player1.arms1Combat = player1.xiejianxian_Arms1Combat;
        player1.arms1Extent = player1.xiejianxian_Arms1Extent;

    }
    selectPlayer.arms1Combat = player1.arms1Combat;
    selectPlayer.arms1Extent = player1.arms1Extent;
    // 林月如【林家剑法】
    skillCharacter_LinyueruLinjiajianfa(selectPlayer);
    // 酒剑仙【御剑术】
    skillCharacters_JiujianxianYujianshu(selectPlayer);
    selectPlayer.arms1 = player1.arms1;
    selectPlayer.arms1 = selectPlayer.arms1.replace("(扣置)", "");

    player1.arms1Combat = 0;
    player1.arms1Extent = 0;
    player1.arms1 = Text.nil;
    player1.tempZhuangbeiSkillCombat = 0;
    player1.tempZhuangbeiSkillExtent = 0;
    textAreaAddMessage("慕容紫英补2张牌", myText, listView);
    addHandCard([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], null, [2], true, true);
}
function zengjian_Arm2(selectPlayer) {
    // 丢掉第二把武器
    if (selectPlayer.arms2 != Text.nil) {
        remove_Card_Into_DropDeck(selectPlayer.arms2);
    }
    selectPlayer.arms2 = Text.nil;

    if (skillXiejianxian_HasXiejianxian(player1)) {
        player1.arms2Combat = player1.xiejianxian_Arms2Combat;
        player1.arms2Extent = player1.xiejianxian_Arms2Extent;

    }
    selectPlayer.arms2Combat = player1.arms1Combat;
    selectPlayer.arms2Extent = player1.arms1Extent;
    selectPlayer.arms2 = player1.arms1;
    selectPlayer.arms2 = selectPlayer.arms2.replace("(扣置)", "");
    player1.arms1Combat = 0;
    player1.arms1Extent = 0;
    player1.arms1 = Text.nil;
    textAreaAddMessage("慕容紫英补2张牌", myText, listView);
    addHandCard([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], null, [2], true, true);
}


// 慕容紫英【赠剑】（武器）
function skillCharacters_MurongziyingZengjian_Arm() {
    if (nowPlayerTerm[nowPlayerNumber]._name == player1._name && player1.skillNameList.containsObject(skillnameZengjian) && zengJian.length < nowPlayerTerm.length - 1) {
        addDialog(mainScene, new ChooseZoneLayer("是否对武器发动“赠剑”？", function (result) {
            if (result) {
                if (player1._name == nameMurongziying) {
                    AchivementProgress.addAchivementProgress(player1);
                }
                mainScene.addChild(new skillAnimationLayer(nowPlayerTerm[nowPlayerNumber].animation, function () {
                    var player2Shown = true, player3Shown = true, player4Shown = true;
                    for (var i = 0; i < zengJian.length; i++) {
                        if (zengJian[i]._name == player2._name) {
                            player2Shown = false;
                        } else if (zengJian[i]._name == player3._name) {
                            player3Shown = false;
                        } else if (zengJian[i]._name == player4._name) {
                            player4Shown = false;
                        }
                    }
                    if (player2.hp == 0) {
                        zengJian.push(player2);
                    }
                    if (player3.hp == 0) {
                        zengJian.push(player3);
                    }
                    if (player4.hp == 0) {
                        zengJian.push(player4);
                    }
                    addDialog(mainScene, new selectPlayerDialogLayer(false, player2Shown, player3Shown, player4Shown,
                        "请选择“赠剑”的目标", true, false, function (selectPlayer) {
                            if (selectPlayer != null) {
                                zengJian.push(selectPlayer);
                                if (!selectPlayer.skillNameList.containsObject(skillnameShuangjian)) {
                                    zengjian_Arm1(selectPlayer);
                                } else {
                                    addDialog(mainScene, new ChooseZoneLayer("是否移动到武器2？(否则为武器1)", function (result) {
                                        if (result) {
                                            zengjian_Arm2(selectPlayer);
                                        } else {
                                            zengjian_Arm1(selectPlayer);
                                        }
                                    }));
                                }
                            }
                        }));
                }));
            }
        }));
    }
}


function zengjian_Defense(selectPlayer) {
    // 丢掉防具
    if (selectPlayer.defense != Text.nil) {
        remove_Card_Into_DropDeck(selectPlayer.defense);
    }
    selectPlayer.defenseCombat = player1.defenseCombat;
    selectPlayer.defenseExtent = player1.defenseExtent;
    selectPlayer.defense = player1.defense;
    player1.defenseCombat = 0;
    player1.defenseExtent = 0;
    player1.defense = Text.nil;
    textAreaAddMessage("慕容紫英补2张牌", myText, listView);
    addHandCard([nowPlayerTerm[nowPlayerNumber]], nowPlayerTerm[nowPlayerNumber], nowPlayerTerm[nowPlayerNumber], null, [2], true, true);
}


// 慕容紫英【赠剑】（防具）
function skillCharacters_MurongziyingZengjian_Defense() {
    if (nowPlayerTerm[nowPlayerNumber]._name == player1._name && player1.skillNameList.containsObject(skillnameZengjian) && zengJian.length < nowPlayerTerm.length - 1) {
        addDialog(mainScene, new ChooseZoneLayer("是否对防具发动“赠剑”？", function (result) {
            if (result) {
                if (player1._name == nameMurongziying) {
                    AchivementProgress.addAchivementProgress(player1);
                }
                mainScene.addChild(new skillAnimationLayer(nowPlayerTerm[nowPlayerNumber].animation, function () {
                    var player2Shown = true, player3Shown = true, player4Shown = true;
                    for (var i = 0; i < zengJian.length; i++) {
                        if (zengJian[i]._name == player2._name) {
                            player2Shown = false;
                        } else if (zengJian[i]._name == player3._name) {
                            player3Shown = false;
                        } else if (zengJian[i]._name == player4._name) {
                            player4Shown = false;
                        }
                    }
                    if (player2.hp == 0) {
                        zengJian.push(player2);
                    }
                    if (player3.hp == 0) {
                        zengJian.push(player3);
                    }
                    if (player4.hp == 0) {
                        zengJian.push(player4);
                    }
                    addDialog(mainScene, new selectPlayerDialogLayer(false, player2Shown, player3Shown, player4Shown,
                        "请选择“赠剑”的目标", true, false, function (selectPlayer) {
                            if (selectPlayer != null) {
                                zengJian.push(selectPlayer);
                                zengjian_Defense(selectPlayer);
                            }
                        }));
                }));
            }
        }));
    }
}

// 柳梦璃【妖王】
function skillcharacters_LiumengliYaowang(player, isAdd) {
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0
            && nowPlayerTerm[i].skillNameList.containsObject(skillnameYaowang)) {
            if (nowPlayerTerm[i]._name == player1._name) {
                AchivementProgress.addAchivementProgress(player1);
            }
            if (player1IsPlayer2Friend(player, nowPlayerTerm[i])) {
                if (isAdd) {
                    mainScene.addChild(new NormalSkillAnimationLayer(skillnameYaowang, nowPlayerTerm[i].hadImageView, function () {
                        textAreaAddMessage("柳梦璃【妖王】效果触发，我方宠物额外获得“主人战力+1”效果", myText, listView);
                        player.petsCombat += 1;
                    }));
                } else {
                    textAreaAddMessage("失去宠物，柳梦璃【妖王】效果触发", myText, listView);
                    player.petsCombat -= 1;
                }
            }
            break;
        }
    }
}

// 柳梦璃【妖王】结束
function skillCharacters_LiumengliYaowangEnd(player) {
    for (var i = 0; i < player.friendList.length; i++) {
        if (player.friendList[i].hp > 0) {
            var number = baseEffectCountPets(player.friendList[i]);
            player.friendList[i].petsCombat -= number;
            if (player.friendList[i].petsCombat < 0)
                player.friendList[i].petsCombat = 0;
            textAreaAddMessage("柳梦璃退场，【妖王】效果解除", myText, listView);
            player.combat = player.maxCombat + player.arms1Combat
                + player.arms2Combat + player.defenseCombat
                + player.petsCombat;
        }
    }
}

// 柳梦璃【梦傀儡】
function skillCharacters_LiumengliMengkuilei(player) {
    mainScene.addChild(new skillAnimationLayer(player.animation));
    textAreaAddMessage("柳梦璃“梦傀儡”技能触发，命中变为5，仍可进行支援妨碍", myText, listView);
    player._name = nameLiumengliMengkuilei;
    player.maxCombat = 3;
    player.maxExtent = 5;
}

// 柳梦璃【梦傀儡】结束
function skillCharacters_liumengliMengkuileiEnd() {
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i]._name == nameLiumengliMengkuilei) {
            nowPlayerTerm[i]._name = nameLiumengli + "(退场)";
            break;
        }
    }
}


// 玄霄【结拜】
function skillCharacters_XuanxiaoJiebai(callBack) {
    var hasXuanxiao = false;
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].skillNameList.containsObject(skillnameJiebai)) {
            hasXuanxiao = true;
            if (nowPlayerTerm[i]._name == player1._name) {
                addDialog(mainScene, new selectPlayerDialogLayer(false, true, true, true,
                    "请选择玄霄结拜的角色", false, false, function (result) {
                        xuanxiao_JieBai = result._name;
                        myAudioPlayer(audioXuanxiaoJiebai);
                        textAreaAddMessage("玄霄与" + result._name + "结拜，对其支援妨碍时命中额外+1", myText, listView);
                        if (callBack != null) {
                            callBack();
                        }
                    }));
            } else {
                // AI处理玄霄【结拜】效果
                xuanxiao_JieBai = nowPlayerTerm[i].friendList[1]._name;
                myAudioPlayer(audioXuanxiaoJiebai);
                textAreaAddMessage("玄霄与" + nowPlayerTerm[i].friendList[1]._name + "结拜，对其支援妨碍时命中额外+1", myText, listView);
                if (callBack != null) {
                    callBack();
                }
            }
            break;
        }
    }
    if (!hasXuanxiao && callBack != null) {
        callBack();
    }
}

// 玄霄【结拜】效果处理
function skillCharacters_XuanxiaoJiebaiHandle() {
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0
            && nowPlayerTerm[i]._name == nameXuanxiao) {
            if (nowPlayerTerm[nowPlayerNumber]._name == xuanxiao_JieBai) {
                mainScene.addChild(new NormalSkillAnimationLayer(skillnameJiebai, nowPlayerTerm[i].hadImageView, function () {
                    textAreaAddMessage("玄霄“结拜”效果触发，自身命中+1", myText, listView);
                    baseEffectAddTempExtent(nowPlayerTerm[i]);
                }));
            }
            break;
        }
    }
}


// 玄霄【凝冰焚炎】
var skillCharacters_XuanxiaoNingbingfenyan = function (player) {
    if (player.hp > 0 && player.skillNameList.containsObject(skillnameNingbingfenyan)) {
        if (player._name == player1._name && player._name == nameXuanxiao) {
            AchivementProgress.addAchivementProgress(player);
        }
        mainScene.addChild(new NormalSkillAnimationLayer(skillnameNingbingfenyan, player.hadImageView));
        myAudioPlayer(audioXuanxiaoNingbingfenyan);
        textAreaAddMessage(player._name + "“凝冰焚炎”效果被触发，水、火属性伤害对其无效", myText, listView);
        return true;
    }
    return false;
}


// 龙幽【表现欲】
function skillCharacters_LongyouBiaoxianyu(callBack) {
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0
            && nowPlayerTerm[i].skillNameList.containsObject(skillnameBiaoxianyu)
            && nowPlayerTerm[i].joinAttack) {
            for (var t = 0; t < nowPlayerTerm.length; t++) {
                if (nowPlayerTerm[t].sex == 1 && nowPlayerTerm[t].joinAttack
                    && nowPlayerTerm[t].hp > 0) {
                    myAudioPlayer(audioLongyouBiaoxianyu);
                    textAreaAddMessage(nowPlayerTerm[i]._name + "“表现欲”效果触发，自身战力+1", myText, listView);
                    baseEffectAddSkillCombat(nowPlayerTerm[i], 1);
                }
            }
        }
    }
    callBack();
}

// 龙幽【表现欲】后续处理
function skillCharacters_LongyouBiaoxianyuHandle(callBack) {
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0
            && nowPlayerTerm[i].skillNameList.containsObject(skillnameBiaoxianyu)
            && nowPlayerTerm[i].joinAttack) {
            for (var t = 0; t < nowPlayerTerm.length; t++) {
                if (nowPlayerTerm[t].sex == 1 && nowPlayerTerm[t].joinAttack
                    && nowPlayerTerm[t].hp <= 0) {
                    textAreaAddMessage(nowPlayerTerm[t]._name + "死亡退场，" + nowPlayerTerm[i]._name + "“表现欲”效果触发，自身战力-1", myText, listView);
                    baseEffectReduceSkillCombat(nowPlayerTerm[i], 1);
                }
            }
        }
    }
    callBack();
}


// 小蛮【无法无天】
function skillCharacters_XiaomanWufawutian(callBack) {
    var hasXiaoman = false;
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0 && nowPlayerTerm[i]._name == nameXiaoman) {
            hasXiaoman = true;
            var tempList = new Array();
            for (var t = 0; t < nowPlayerTerm[i].handCard.length; t++) {
                if (nowPlayerTerm[i].handCard[t].cardType == CARDTYPE.SKILLCARD) {
                    tempList.push(nowPlayerTerm[i].handCard[t]);
                }
            }
            if (tempList.length > 0) {
                // 有技牌，可以发动无法无天
                if (nowPlayerTerm[i]._name == player1._name) {
                    addDialog(mainScene, new selectCardDialogLayer("“无法无天”效果:请选择要使用的技牌或取消", tempList, 1, 1, true, function (selectCardList) {
                        if (selectCardList != null) {
                            myAudioPlayer(audioXiaomanWufawutian);
                            mainScene.addChild(new skillAnimationLayer(nowPlayerTerm[i].animation, function () {
                                var card = selectCardList.pop();
                                nowPlayerTerm[i].handCard.removeObject(card);
                                card.removeFromParent();
                                switch (card.name) {
                                    case string_handCardNameShuerguo:
                                        handCardShuerguo.effect(nowPlayerTerm[i], nowPlayerTerm[i], true, false, function () {
                                            skillCharacters_XiaomanWufawutian(callBack);
                                        });
                                        break;
                                    case string_handCardNameKuicetianji:
                                        handCardKuicetianji.effect(nowPlayerTerm[i], nowPlayerTerm[i], true, false, function () {
                                            skillCharacters_XiaomanWufawutian(callBack);
                                        });
                                        break;
                                    case string_handCardNameToudao:
                                        handCardToudao.effect(nowPlayerTerm[i], nowPlayerTerm[i], true, false, function () {
                                            skillCharacters_XiaomanWufawutian(callBack);
                                        });
                                        break;
                                    case string_handCardNameTongqianbiao:
                                        handCardTongqianbiao.effect(nowPlayerTerm[i], nowPlayerTerm[i], true, false, function () {
                                            skillCharacters_XiaomanWufawutian(callBack);
                                        });
                                        break;
                                    case string_handCardNameTianleipo:
                                        handCardTianleipo.effect(nowPlayerTerm[i], nowPlayerTerm[i], true, false, function () {
                                            skillCharacters_XiaomanWufawutian(callBack);
                                        });
                                        break;
                                    case string_handCardNameWuqichaoyuan:
                                        handCardWuqichaoyuan.effect(nowPlayerTerm[i], nowPlayerTerm[i], true, false, function () {
                                            skillCharacters_XiaomanWufawutian(callBack);
                                        });
                                        break;
                                }
                            }));
                        } else {
                            callBack();
                        }
                    }));
                } else {
                    // AI处理无法无天
                    callBack();
                }
            } else {
                callBack();
            }
            break;
        }
    }
    if (!hasXiaoman && callBack != null) {
        callBack();
    }
}

function huoliHandle(skillUser, endUser, userList, callBack) {
    var nextIndex = 0;
    for (var i = 0; i < userList.length; i++) {
        if (skillUser._name == userList[i]._name) {
            nextIndex = i + 1;
            break;
        }
    }
    myAudioPlayer(audioXiaomanHuoli);
    textAreaAddMessage(skillUser._name + "“活力”效果触发，补1张手牌", myText, listView);
    if (skillUser._name == player1._name && player1._name == nameXiaoman) {
        AchivementProgress.addAchivementProgress(skillUser);
    }
    addHandCard([skillUser], skillUser, skillUser, null, [1], true, true, function () {
        if (skillUser._name == endUser._name) {
            callBack();
            return;
        }
        huoliHandle(userList[nextIndex], userList[userList.length - 1], userList, callBack);
    });

}


// 小蛮【活力】
function skillCharacters_XiaomanHuoli(callBack) {
    var _userList = [];
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].skillNameList.containsObject(skillnameHuoli)
            && nowPlayerTerm[i].joinAttack) {
            _userList.push(nowPlayerTerm[i]);
        }
    }
    if (_userList == 0) {
        callBack();
        return;
    }
    huoliHandle(_userList[0], _userList[_userList.length - 1], _userList, callBack);
}


// 小蛮【炼药】
function skillCharacters_XiaomanLianyao(callBack) {
    var hasXiaoman = false;
    for (var t = 0; t < nowPlayerTerm.length; t++) {
        if (nowPlayerTerm[t].hp > 0 && nowPlayerTerm[t]._name == nameXiaoman
            && nowPlayerTerm[t]._name == player1._name && nowPlayerTerm[t].handCard.length >= 2) {
            hasXiaoman = true;
            addDialog(mainScene, new selectCardDialogLayer("请选择发动“炼药”丢弃的2张牌或取消", nowPlayerTerm[t].handCard, 2, 2, true, function (selectCardList) {
                if (selectCardList != null) {
                    for (var i = 0; i < selectCardList.length; i++) {
                        remove_Card_Into_DropDeck(selectCardList[i].name);
                        nowPlayerTerm[t].handCard.removeObject(selectCardList[i]);
                        selectCardList[i].removeFromParent();
                        textAreaAddMessage("小蛮弃置【" + selectCardList[i].name + "】", myText, listView);
                    }
                    var player2Shown = player2._name != nameChonglouSp ? true : false;
                    var player3Shown = player3._name != nameChonglouSp ? true : false;
                    var player4Shown = player4._name != nameChonglouSp ? true : false;
                    addDialog(mainScene, new selectPlayerDialogLayer(true, player2Shown, player3Shown, player4Shown,
                        "请选择补牌目标", false, false, function (selectPlayer) {
                            myAudioPlayer(audioXiaomanLianyao);
                            mainScene.addChild(new NormalSkillAnimationLayer(skillnameLianyao, nowPlayerTerm[t].hadImageView));
                            textAreaAddMessage("小蛮指定" + selectPlayer._name + "补了1张手牌", myText, listView);
                            addHandCard([selectPlayer], selectPlayer, selectPlayer, null, [1], true, true, function () {
                                if (callBack != null) {
                                    skillCharacters_XiaomanLianyao(callBack);
                                }
                            });
                        }));
                } else if (callBack != null) {
                    callBack();
                }
            }));
            break;
        }
    }
    if (!hasXiaoman && callBack != null) {
        callBack();
    }
}

function skillCharacters_JiangyunfanKuanglongxunyingzhan(player) {
    var result = false;
    if (player.skillNameList
            .containsObject(skillnameKuanglongxunyingzhan)) {
        result = true;
        player.usedAttackCard = false;
        mainScene.addChild(new NormalSkillAnimationLayer(skillnameKuanglongxunyingzhan, player.hadImageView));
        if (player._name == player1._name && player._name == nameJiangyunfan) {
            AchivementProgress.addAchivementProgress(player);
        }
        textAreaAddMessage(player._name + "“狂龙迅影斩”效果，可使用任意数量的战牌", myText, listView);
    }
    return result;
}


// 姜云凡【山贼】
function skillCharacters_JiangyunfanShanzei(player, handCardList, callBack) {
    var tempPlayer = player.friendList[1];
    if (tempPlayer.hp > 0
        && tempPlayer.skillNameList.containsObject(skillnameShanzei)) {
        if (player._name == player1._name) {
            addDialog(mainScene, new selectCardDialogLayer("请选择“山贼”效果交给队友的牌或取消", handCardList, 1, 1, true, function (result) {
                if (result != null) {
                    var card = result.pop();
                    player.handCard.removeObject(card);
                    if (player._name == player1._name) {
                        card.removeFromParent();
                        card.release();
                    }
                    mainScene.addChild(new NormalSkillAnimationLayer(skillnameShanzei, tempPlayer.hadImageView, function () {
                        textAreaAddMessage(player._name + "发动“山贼”效果，交给队友一张牌", myText, listView, function () {
                            tempPlayer.handCard.push(card);
                            if (callBack != null) {
                                callBack();
                            }
                        });
                    }));
                } else if (callBack != null) {
                    callBack();
                }
            }));
        } else {
            // AI决定是否触发【山贼】
            if (handCardList.length > 1) {
                // 触发
                var index = parseInt(Math.random() * handCardList.length, 10);
                var tempHandCard = handCardList[index];
                player.handCard.removeObject(tempHandCard);
                tempPlayer.handCard.push(tempHandCard);
                if (tempPlayer._name == player1._name) {
                    handCardZone.pushBackCustomItem(tempHandCard);
                }
                mainScene.addChild(new NormalSkillAnimationLayer(skillnameShanzei, tempPlayer.hadImageView, function () {
                    textAreaAddMessage(player._name + "发动“山贼”效果，交给队友一张牌", myText, listView, callBack);
                }));
            } else if (callBack != null) {
                callBack();
            }
        }
    } else if (callBack != null) {
        callBack();
    }
}


// 唐雨柔【咏圣调】(非隐蛊时的询问)
function skillCharacters_TangyurouYongshengdiao(usePlayer, cardEffectCallBack, callBack) {
    if (usePlayer.skillNameList.containsObject(skillnameYongshengdiao)) {
        if (usePlayer._name == player1._name) {
            addDialog(mainScene, new selectPlayerDialogLayer(false, true, true, true,
                usePlayer._name + "“咏圣调”效果，请选择目标角色或取消", true, false, function (result) {
                    if (result != null) {
                        mainScene.addChild(new NormalSkillAnimationLayer(skillnameYongshengdiao, usePlayer.hadImageView, function () {
                            myAudioPlayer(audioTangyurouYonshengdiao);
                            cardEffectCallBack(result, callBack);
                        }));
                    } else {
                        cardEffectCallBack(usePlayer, callBack);
                    }
                }, false));
        } else {
            // AI决定咏圣调的对象
            cardEffectCallBack(usePlayer, callBack);
        }
    } else {
        cardEffectCallBack(usePlayer, callBack);
    }
}


// 唐雨柔【咏圣调】隐蛊时的询问
// callBack为唐雨柔决定是否发动技能之后要执行的动作
function skillCharacters_TangyurouYongshengdiao_yingu(heartList, firstPlayer, usePlayer, heartNumberList, canUseLonghunzhankai, callBack, callBack2) {
    var useYongshengdiao = false;
    var tangyurouPlayer = null;
    var hasTiandijifu = false;
    var yinguCard = null;
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0 && nowPlayerTerm[i].handCard.length > 0 && nowPlayerTerm[i]._name == nameTangyurou) {
            tangyurouPlayer = nowPlayerTerm[i];
            hasTiandijifu = (tangyurouPlayer.defense == string_handCardNameTiandijifu);
            break;
        }
    }
    if (tangyurouPlayer != null) {
        for (var t = 0; t < tangyurouPlayer.handCard.length; t++) {
            if (tangyurouPlayer.handCard[t].name == string_handCardNameYingu) {
                yinguCard = tangyurouPlayer.handCard[t];
                break;
            }
        }
        if (tangyurouPlayer._name == player1._name) {
            if (hasTiandijifu) {
                addDialog(mainScene, new ChooseZoneLayer("是否发动【天帝祭服】效果，将任意手牌当【隐蛊】使用？", function (result) {
                    if (result) {
                        addDialog(mainScene, new selectCardDialogLayer("请选择1张手牌当作【隐蛊】使用", tangyurouPlayer.handCard, 1, 1, false, function (selectCard) {
                            var card = selectCard.pop();
                            remove_Card_Into_DropDeck(card.name);
                            tangyurouPlayer.handCard.removeObject(card);
                            card.removeFromParent();
                            useBingxingjue(tangyurouPlayer, tangyurouPlayer, function () {
                                if (game_Bingxingjue) {
                                    game_Bingxingjue = false;
                                    skillCharacters_TangyurouYongshengdiao_yingu(heartList, firstPlayer, usePlayer, heartNumberList, canUseLonghunzhankai, callBack, callBack2);
                                } else {
                                    yinguHandle(heartList, firstPlayer, usePlayer, true, heartNumberList, canUseLonghunzhankai, callBack, callBack2);
                                }
                            });
                        }));
                    } else if (yinguCard != null) {
                        addDialog(mainScene, new ChooseZoneLayer("是否发动“咏圣调”效果，打出一张隐蛊？", function (result) {
                            if (result) {
                                remove_Card_Into_DropDeck(yinguCard.name);
                                tangyurouPlayer.handCard.removeObject(yinguCard);
                                yinguCard.removeFromParent();
                                useBingxingjue(tangyurouPlayer, tangyurouPlayer, function () {
                                    if (game_Bingxingjue) {
                                        game_Bingxingjue = false;
                                        skillCharacters_TangyurouYongshengdiao_yingu(heartList, firstPlayer, usePlayer, heartNumberList, canUseLonghunzhankai, callBack, callBack2);
                                    } else {
                                        yinguHandle(heartList, firstPlayer, usePlayer, true, heartNumberList, canUseLonghunzhankai, callBack, callBack2);
                                    }
                                });
                            } else {
                                yinguHandle(heartList, firstPlayer, usePlayer, false, heartNumberList, canUseLonghunzhankai, callBack, callBack2);
                            }
                        }));
                    } else {
                        yinguHandle(heartList, firstPlayer, usePlayer, false, heartNumberList, canUseLonghunzhankai, callBack, callBack2);
                    }
                }));
            } else if (yinguCard != null) {
                addDialog(mainScene, new ChooseZoneLayer("是否发动“咏圣调”效果，打出一张隐蛊？", function (result) {
                    if (result) {
                        remove_Card_Into_DropDeck(yinguCard.name);
                        tangyurouPlayer.handCard.removeObject(yinguCard);
                        yinguCard.removeFromParent();
                        useBingxingjue(tangyurouPlayer, tangyurouPlayer, function () {
                            if (game_Bingxingjue) {
                                game_Bingxingjue = false;
                                skillCharacters_TangyurouYongshengdiao_yingu(heartList, firstPlayer, usePlayer, heartNumberList, canUseLonghunzhankai, callBack, callBack2);
                            } else {
                                yinguHandle(heartList, firstPlayer, usePlayer, true, heartNumberList, canUseLonghunzhankai, callBack, callBack2);
                            }
                        });
                    } else {
                        yinguHandle(heartList, firstPlayer, usePlayer, false, heartNumberList, canUseLonghunzhankai, callBack, callBack2);
                    }
                }));
            } else {
                yinguHandle(heartList, firstPlayer, usePlayer, false, heartNumberList, canUseLonghunzhankai, callBack, callBack2);
            }
        } else {
            // AI决定是否发动【咏圣调】出隐蛊
            yinguHandle(heartList, firstPlayer, usePlayer, false, heartNumberList, canUseLonghunzhankai, callBack, callBack2);
        }
    } else {
        yinguHandle(heartList, firstPlayer, usePlayer, false, heartNumberList, canUseLonghunzhankai, callBack, callBack2);
    }
}

// 唐雨柔【逆天阵】
function skillCharacters_TangyurouNitianzhen(tangyurou) {
    if (tangyurou._name == nameTangyurou && tangyurou._name == nowPlayerTerm[nowPlayerNumber]._name
        && tangyurou._name == player1._name && tangyurou.hp > 0) {
        addDialog(mainScene, new ChooseZoneLayer("是否发动“逆天阵”效果(您将强制死亡退场)？", function (result) {
            if (result) {
                myAudioPlayer(audioTangyurouNitianzhen);
                AchivementProgress.addAchivementProgress(tangyurou);
                // cc.log("当前进度是"+tangyurou.playerAchievement.progress);
                mainScene.addChild(new skillAnimationLayer(tangyurou.animation, function () {
                    tangyurou.hp = 0;
                    handleDeath(tangyurou, function () {
                        var petModel = topMonsterCard(game_MonsterDeck[0]);
                        game_MonsterDeck.remove(0);
                        if (tangyurou.friendList[1].hp > 0) {
                            monsterLabel.setVisible(true);
                            monsterLabel.loadTexture(petModel.monsterPicSrc);
                            textAreaAddMessage("翻取一张怪物牌:" + petModel.name, myText, listView, function () {
                                if (petModel.dodge != 0) {
                                    calculate_Pets(tangyurou.friendList[1],
                                        petModel);
                                } else {
                                    textAreaAddMessage("NPC无法作为宠物，“逆天阵”效果无效", myText, listView);
                                }
                                // monsterLabel.setVisible(false);
                            });
                        }
                    });
                }));
            }
        }));
    }
}

// 姜世离【魔君】
function skillCharacters_JiangshiliMojun(callBack) {
    // 判断战斗是否开始
    if (fight_Trigger.length > 0) {
        var addCombat = 0;
        // 判断支援者是否为姜世离
        if (fight_Trigger.length > 1) {
            if (fight_Trigger[1].hp > 0
                && fight_Trigger[1].skillNameList
                    .containsObject(skillnameMojun)) {
                addCombat = fight_Trigger[1].maxHP - fight_Trigger[1].hp;
                addTrigerCombat(addCombat);
                mainScene.addChild(new NormalSkillAnimationLayer(skillnameMojun, fight_Trigger[1].hadImageView, function () {
                    textAreaAddMessage("姜世离“魔君”效果触发，触发方战力+" + addCombat, myText, listView, callBack);
                }));
                return;
            }
        }
        if (fight_Monster.length > 0
            && fight_Monster[0].hp > 0
            && fight_Monster[0].skillNameList
                .containsObject(skillnameMojun)) {
            addCombat = fight_Monster[0].maxHP
                - fight_Monster[0].hp;
            addMonsterCombat(addCombat);
            mainScene.addChild(new NormalSkillAnimationLayer(skillnameMojun, fight_Monster[0].hadImageView, function () {
                textAreaAddMessage("姜世离“魔君”效果触发，怪物方战力+" + addCombat, myText, listView, callBack);
            }));
            return;
        } else {
            callBack();
        }
    } else {
        callBack();
    }
}


// 姜世离【牺牲】
function skillCharacters_JiangshiliXishen(player) {
    if (player.hp > 0 && player.joinAttack && player._name == nameJiangshili && player._name == player1._name) {
        addDialog(mainScene, new ChooseZoneLayer("是否发动“牺牲”效果？(您将强制死亡退场)", function (result) {
            if (result) {
                mainScene.addChild(new NormalSkillAnimationLayer(skillnameXishen, player.hadImageView, function () {
                    AchivementProgress.addAchivementProgress(player);
                    jiangshili_xisheng = true;
                    textAreaAddMessage("姜世离发动“牺牲”效果，本场战斗中，我方直接取胜", myText, listView);
                    nextStep = 5;
                    roundAttack3();
                }));
            }
        }));
    }
}

// 姜世离【牺牲】：战斗结束阶段的死亡退场处理
function skillCharacters_JiangshiliXishenHandle() {
    var jiangshili = null;
    if (jiangshili_xisheng) {
        jiangshili_xisheng = false;
        for (var i = 0; i < nowPlayerTerm.length; i++) {
            if (nowPlayerTerm[i].hp > 0 && nowPlayerTerm[i]._name == nameJiangshili) {
                jiangshili = nowPlayerTerm[i];
                break;
            }
        }
        if (jiangshili != null) {
            mainScene.addChild(new NormalSkillAnimationLayer(skillnameXishen, jiangshili.hadImageView, function () {
                textAreaAddMessage("姜世离“牺牲”效果触发，强制死亡退场", myText, listView, function () {
                    jiangshili.hp = 0;
                    handleDeath(jiangshili);
                });
            }));
        }
    }
}


// 欧阳慧【雷灵】
function skillCharacters_OuyanghuiLeiling(callBack) {
    var ouyanghui = null;
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0
            && nowPlayerTerm[i].skillNameList.containsObject(skillnameLeiling)
            && nowPlayerTerm[i].joinAttack
            && nowPlayerTerm[i].skillTempList.length < 4) {
            ouyanghui = nowPlayerTerm[i];
            break;
        }
    }
    if (ouyanghui != null) {
        var leiling = new createHandCardImageView("雷灵");
        ouyanghui.maxExtent -= parseInt(ouyanghui.skillTempList.length / 2);
        ouyanghui.skillTempList.push(leiling);
        ouyanghui.maxExtent += parseInt(ouyanghui.skillTempList.length / 2);
        var number = ouyanghui.skillTempList.length;
        mainScene.addChild(new NormalSkillAnimationLayer(skillnameLeiling, ouyanghui.hadImageView, function () {
            textAreaAddMessage("欧阳慧“雷灵”效果触发，获得一张雷灵牌(每放置2张雷灵牌您的命中+1,最多放置4张)", myText, listView);
            textAreaAddMessage("当前雷灵数:" + number, myText, listView, callBack);
        }));
    } else {
        callBack();
    }
    // callBack();
}

// 欧阳慧【雷屏】
function skillCharacters_OuyanghuiLeiping(heartPlayer, playerList, number, canUseLonghunzhankai, callBack, isNotLoverEffect) {
    var maxNumber = 0;
    var ouyanghuiPlayer = null;
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0
            && nowPlayerTerm[i].skillNameList.containsObject(skillnameLeiping)
            && nowPlayerTerm[i].skillTempList.length > 0) {
            ouyanghuiPlayer = nowPlayerTerm[i];
            maxNumber = ouyanghuiPlayer.skillTempList.length < number ? ouyanghuiPlayer.skillTempList.length : number;
            break;
        }
    }
    if (isNotLoverEffect && ouyanghuiPlayer != null) {
        if (ouyanghuiPlayer._name == player1._name) {
            addDialog(mainScene, new selectNumberDialogLayer(heartPlayer._name + "将受到" + number + "点伤害，请选择使用雷灵为其抵消伤害或取消", maxNumber, function (result) {
                if (result == null || result == 0) {
                    // 不使用雷屏
                    baseEffectReduceHP(heartPlayer, playerList, number, canUseLonghunzhankai, callBack, isNotLoverEffect);
                } else {
                    leipingHandle(number, result, ouyanghuiPlayer, function (newNumber) {
                        baseEffectReduceHP(heartPlayer, playerList, newNumber, canUseLonghunzhankai, callBack, isNotLoverEffect);
                    });
                }
            }));
        } else {
            // AI决定使用雷屏
            if (player1IsPlayer2Friend(heartPlayer, ouyanghuiPlayer)) {
                var defense = (number < ouyanghuiPlayer.skillTempList.length) ? 0
                    : number - ouyanghuiPlayer.skillTempList.length;
                if (heartPlayer.hp - number <= 0
                    && heartPlayer.hp - defense > 0) {
                    var result = (number > ouyanghuiPlayer.skillTempList.length) ? ouyanghuiPlayer.skillTempList
                        .length : number;
                    leipingHandle(number, result, ouyanghuiPlayer, function (newNumber) {
                        baseEffectReduceHP(heartPlayer, playerList, newNumber, canUseLonghunzhankai, callBack, isNotLoverEffect);
                    });
                } else {
                    baseEffectReduceHP(heartPlayer, playerList, number, canUseLonghunzhankai, callBack, isNotLoverEffect);
                }
            } else {
                baseEffectReduceHP(heartPlayer, playerList, number, canUseLonghunzhankai, callBack, isNotLoverEffect);
            }
        }
    } else {
        baseEffectReduceHP(heartPlayer, playerList, number, canUseLonghunzhankai, callBack, isNotLoverEffect);
    }
}

// 使用雷屏的处理
function leipingHandle(number, result, ouyanghuiPlayer, callBack) {
    mainScene.addChild(new NormalSkillAnimationLayer(skillnameLeiping, ouyanghuiPlayer.hadImageView, function () {
        // 使用了雷屏
        ouyanghuiPlayer.maxExtent -= parseInt(ouyanghuiPlayer.skillTempList.length / 2);
        for (var i = 0; i < result; i++) {
            ouyanghuiPlayer.skillTempList.pop();
        }
        ouyanghuiPlayer.maxExtent += parseInt(ouyanghuiPlayer.skillTempList.length / 2);
        textAreaAddMessage("欧阳慧消耗雷屏，抵消" + result + "点伤害", myText, listView, function () {
            // 若此时已经处于打怪阶段，则双方战力要重新计算
            if ((nextStep == 3 || nextStep == 4) && fight_Trigger.length > 0
                && ((fight_Trigger.length > 1 && fight_Trigger[1]._name == nameOuyanghui)
                || (fight_Monster[0] != null && fight_Monster[0]._name == nameOuyanghui))) {
                if (!attactIsMiss(ouyanghuiPlayer, fight_FirstMonster)) {
                    for (var i = 0; i < fight_Trigger.length; i++) {
                        if (fight_Trigger[i]._name == nameOuyanghui) {
                            textAreaAddMessage("欧阳慧命中下降，支援失败", myText, listView);
                            triggerCombat -= ouyanghuiPlayer.combat;
                            break;
                        }
                    }
                    for (var i = 0; i < fight_Monster.length; i++) {
                        if (fight_Monster[i]._name == nameOuyanghui) {
                            textAreaAddMessage("欧阳慧命中下降，妨碍失败", myText, listView);
                            monsterCombat -= ouyanghuiPlayer.combat;
                            break;
                        }
                    }
                }
            }
            number -= result;
            callBack(number);
        });
    }));
}


// 欧阳慧【雳天击】
function skillCharacters_OuyanghuiLitianji(ouyanghui) {
    if (ouyanghui._name == nameOuyanghui && ouyanghui._name == player1._name
        && ouyanghui.skillTempList.length > 0) {
        addDialog(mainScene, new ChooseZoneLayer("是否发动“雳天击”？(将消耗所有雷灵)", function (result) {
            if (result) {
                AchivementProgress.addAchivementProgress(ouyanghui);
                textAreaAddMessage("欧阳慧消耗所有雷灵发动“雳天击”效果", myText, listView, function () {
                    var heart = parseInt(ouyanghui.skillTempList.length / 2);
                    for (var i = 0; i < ouyanghui.skillTempList.length; i++) {
                        ouyanghui.skillTempList[i].release();
                    }
                    ouyanghui.skillTempList = new Array();
                    mainScene.addChild(new skillAnimationLayer(ouyanghui.animation, function () {
                        if (heart == 0) {
                            textAreaAddMessage("雷灵不足以对敌方全体造成伤害", myText, listView);
                        } else {
                            ouyanghui.maxExtent -= heart;
                            var tempHeartPlayerList = new Array();
                            var tempHeartNumberList = new Array();
                            for (var i = 0; i < nowPlayerTerm.length; i++) {
                                if (nowPlayerTerm[i].hp > 0 && !player1IsPlayer2Friend(nowPlayerTerm[i], ouyanghui)) {
                                    tempHeartPlayerList.push(nowPlayerTerm[i]);
                                    tempHeartNumberList.push(heart);
                                }
                            }
                            useYingu(tempHeartPlayerList, tempHeartPlayerList[0], tempHeartPlayerList[0], tempHeartNumberList, true, baseEffectReduceHPEffect, function () {
                                skillCharactersTangxuejianZhuida(function () {
                                    heartList = new Array();
                                });
                            });
                        }
                    }));
                });
            }
        }));
    }
}


// 魔翳【锁魂】(收为傀儡)
function skillCharacters_MoyiSuohun(deathPlayer) {
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0
            && nowPlayerTerm[i].skillNameList.containsObject(skillnameSuohun)) {
            nowPlayerTerm[i].skillTempList.push(deathPlayer);
            if (nowPlayerTerm[i]._name == player1._name) {
                AchivementProgress.addAchivementProgress(player1);
            }
            textAreaAddMessage("魔翳“锁魂”效果发动，将" + deathPlayer._name + "收为傀儡", myText, listView);
            mainScene.addChild(new NormalSkillAnimationLayer(skillnameSuohun, nowPlayerTerm[i].hadImageView));
            break;
        }
    }
}

// 魔翳【锁魂】(加战力)
function skillCharacters_MoyiSuohunAddCombat(callBack) {
    var effect = false;
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0
            && nowPlayerTerm[i].skillNameList.containsObject(skillnameSuohun)
            && nowPlayerTerm[i].skillTempList.length > 0) {
            if (player1IsPlayer2Friend(fight_Trigger[0], nowPlayerTerm[i])) {
                addTrigerCombat(nowPlayerTerm[i].skillTempList.length);
            } else {
                addMonsterCombat(nowPlayerTerm[i].skillTempList.length);
            }
            effect = true;
            break;
        }
    }
    if (effect) {
        textAreaAddMessage("魔翳“锁魂”效果发动，我方战力+" + nowPlayerTerm[i].skillTempList.length, myText, listView, callBack);
    } else {
        callBack();
    }
}

// 魔翳【底牌】
function skillCharacters_MoyiDipai(deathPlayer) {
    var moyi = deathPlayer.friendList[1];
    if (moyi.hp > 0
        && moyi.skillNameList.containsObject(skillnameDipai)) {
        mainScene.addChild(new skillAnimationLayer(moyi.animation));
        // suoHunList=new Array();
        moyi.skillTempList = new Array();
        for (var i = 0; i < moyi.handCard.length; i++) {
            remove_Card_Into_DropDeck(
                moyi.handCard[i].name);
        }
        moyi.handCard = new Array();
        remove_Card_Into_DropDeck(moyi.arms1);
        remove_Card_Into_DropDeck(moyi.arms2);
        remove_Card_Into_DropDeck(moyi.defense);
        moyi.arms1 = Text.nil;
        moyi.arms1Combat = 0;
        moyi.arms1Combat = 0;
        moyi.tempZhuangbeiSkillCombat = 0;
        moyi.tempZhuangbeiSkillExtent = 0;
        moyi.arms2 = Text.nil;
        moyi.arms2Combat = 0;
        moyi.arms2Extent = 0;
        moyi.defense = Text.nil;
        moyi.defenseCombat = 0;
        moyi.defenseExtent = 0;
        updata_PetsEffect(moyi.pet_FengMonster, moyi);
        moyi.pet_FengMonster = null;
        moyi.pet_Feng = "风系宠物";
        updata_PetsEffect(moyi.pet_LeiMonster, moyi);
        moyi.pet_LeiMonster = null;
        moyi.pet_Lei = "雷系宠物";
        updata_PetsEffect(moyi.pet_ShuiMonster, moyi);
        moyi.pet_ShuiMonster = null;
        moyi.pet_Shui = "水系宠物";
        updata_PetsEffect(moyi.pet_HuoMonster, moyi);
        moyi.pet_HuoMonster = null;
        moyi.pet_Huo = "火系宠物";
        updata_PetsEffect(moyi.pet_TuMonster, moyi);
        moyi.pet_TuMonster = null;
        moyi.pet_Tu = "土系宠物";
        moyi.petsCombat = 0;
        moyi.petsExtent = 0;
        if (player1._name == moyi._name) {
            handCardZone.removeAllItems();
        }
        textAreaAddMessage("队友阵亡，魔翳“底牌”效果触发，变身为“湮世穹兵”", myText, listView);
        characterCardManager(moyi, 32);
        moyi.hadImageView.loadTexture(moyi.playerPicSrc);
    }
}


// 湮世穹兵【侵略如火】
function skillCharacters_YanshiqiongbingQinlueruhuo() {
    if (nowPlayerTerm[nowPlayerNumber].hp > 0 && nowPlayerTerm[nowPlayerNumber].skillNameList.containsObject(skillnameQinlueruhuo)) {
        mainScene.addChild(new NormalSkillAnimationLayer(skillnameQinlueruhuo, nowPlayerTerm[nowPlayerNumber].hadImageView, function () {
            textAreaAddMessage("湮世穹兵“侵略如火”效果触发，您的战力+2", myText, listView);
            baseEffectAddSkillCombat(nowPlayerTerm[nowPlayerNumber], 2);
        }));
    }
}

// 湮世穹兵【毁天灭地】
function skillCharacters_YanshiqiongbingHuitianmiedi(player) {
    if (!player.everyRoundSkill_2 && player.hp > 0 && player._name == nameYanshiqionbing && player._name == player1._name) {
        addDialog(mainScene, new ChooseZoneLayer("是否发动“毁天灭地”效果？", function (result) {
            if (result) {
                player.everyRoundSkill_2 = true;
                var number = parseInt(Math.random() * 6, 10) + 1;
                textAreaAddMessage("湮世穹兵发动“毁天灭地”效果，掷骰判定点数为：" + number, myText, listView, function () {
                    if (number >= 5) {
                        AchivementProgress.addAchivementProgress(player);
                        textAreaAddMessage("除湮世穹兵外的所有角色HP-2", myText, listView);
                        var tempHeartPlayerList = new Array();
                        var tempHeartNumberList = new Array();
                        for (var i = 0; i < nowPlayerTerm.length; i++) {
                            if (nowPlayerTerm[i].hp > 0 && nowPlayerTerm[i]._name != nameYanshiqionbing) {
                                tempHeartPlayerList.push(nowPlayerTerm[i]);
                                tempHeartNumberList.push(2);
                            }
                        }
                        useYingu(tempHeartPlayerList, tempHeartPlayerList[0], tempHeartPlayerList[0], tempHeartNumberList, true, baseEffectReduceHPEffect, function () {
                            skillCharactersTangxuejianZhuida(function () {
                                heartList = new Array();
                            });
                        });
                    } else {
                        textAreaAddMessage("判定点数小于5，技能无效", myText, listView);
                    }
                });
            }
        }));
    }
}


// 具体处理龙葵变身为龙葵鬼的效果
function longkuiBianshenHandle(longkui, callBack) {
    mainScene.addChild(new NormalSkillAnimationLayer(skillnameBianshen, longkui.hadImageView, function () {
        textAreaAddMessage("龙葵发动“变身”效果，变身为龙葵鬼", myText, listView);
        var tempHp = longkui.hp;
        cc.spriteFrameCache.removeSpriteFramesFromFile(longkui.skillUrl);
        characterCardManager(longkui, 34);
        loadCharacterSkillAnimation(longkui);
        longkui.hadImageView.loadTexture(longkui.playerPicSrc);
        longkui.hp = tempHp;
        callBack();
    }));
}


// 龙葵/龙葵鬼 【变身】
function longkui_Bianshen(callBack) {
    var longkui = nowPlayerTerm[nowPlayerNumber];
    if (longkui._name == nameLongkui) {
        if (player1._name == longkui._name) {
            addDialog(mainScene, new ChooseZoneLayer("是否变身为龙葵鬼？", function (result) {
                if (result) {
                    // 变身为龙葵鬼的操作
                    longkuiBianshenHandle(longkui, callBack);
                } else {
                    callBack();
                }
            }));
        } else {
            // AI决定是否变身
            if (longkui.friendList[1].hp == 0) {
                longkuiBianshenHandle(longkui, callBack);
            } else {
                callBack();
            }
        }
    } else if (longkui._name == nameLongkuigui) {
        if (player1._name == longkui._name) {
            addDialog(mainScene, new ChooseZoneLayer("是否变身为龙葵？", function (result) {
                if (result) {
                    mainScene.addChild(new NormalSkillAnimationLayer(skillnameBianshen, longkui.hadImageView, function () {
                        // 变身为龙葵的操作
                        textAreaAddMessage("龙葵鬼发动“变身”效果，变身为龙葵", myText, listView);
                        cc.spriteFrameCache.removeSpriteFramesFromFile(longkui.skillUrl);
                        var tempHp = longkui.hp;
                        characterCardManager(longkui, 33);
                        loadCharacterSkillAnimation(longkui);
                        longkui.hadImageView.loadTexture(longkui.playerPicSrc);
                        longkui.hp = tempHp;
                        callBack();
                    }));
                } else {
                    callBack();
                }
            }));
        } else {
            // AI决定是否变身
            callBack();
        }
    } else {
        callBack();
    }
}

// 龙葵【熔铸】
function skillCharacters_LongkuiRongzhu(longkui) {
    if (longkuiRongzhuCardName != null && longkui._name == nameLongkui && !longkui.everyRoundSkill_2 && longkui._name == player1._name) {
        addDialog(mainScene, new ChooseZoneLayer("是否发动“熔铸”，再次打出【" + longkuiRongzhuCardName + "】？", function (result) {
            if (result) {
                longkui.everyRoundSkill_2 = true;
                useYingu([longkui], longkui, longkui, [1], true, baseEffectReduceHPEffect, function () {
                    skillCharactersTangxuejianZhuida(function () {
                        heartList = new Array();
                        if (longkui.hp > 0) {
                            var cardName = longkuiRongzhuCardName;
                            if (cardName == string_handCardNameTianleipo) {
                                handCardTianleipo.effect(longkui, longkui, false, false);
                            } else if (cardName == string_handCardNameShuerguo) {
                                handCardShuerguo.effect(longkui, longkui, false, false);
                            } else if (cardName == string_handCardNameTongqianbiao) {
                                handCardTongqianbiao.effect(longkui, longkui, false, false);
                            } else if (cardName == string_handCardNameToudao) {
                                handCardToudao.effect(longkui, longkui, false, false);
                            } else if (cardName == string_handCardNameWuqichaoyuan) {
                                handCardWuqichaoyuan.effect(longkui, longkui, false, false);
                            } else if (cardName == string_handCardNameKuicetianji) {
                                handCardKuicetianji.effect(longkui, longkui, false, false);
                            }
                            AchivementProgress.addAchivementProgress(longkui);
                        }
                    });
                });
            }
        }));
    }
}

// 龙葵【剑灵】
function skillCharacters_LongkuiJianling(player, equmentName, showName) {
    if (player._name == nameLongkui && eval("!" + equmentName + ".endsWith('(爆发)')")) {
        addDialog(mainScene, new ChooseZoneLayer("是否发动“剑灵”效果，爆发【" + showName + "】?", function (result) {
            if (result) {
                AchivementProgress.addAchivementProgress(player);
                mainScene.addChild(new skillAnimationLayer(player.animation));
                textAreaAddMessage("龙葵发动“剑灵”效果，爆发【" + showName + "】,自身战力+3", myText, listView);
                eval(equmentName + "+='(爆发)'");
                baseEffectAddTempCombat(player, 3);
                if (fight_Trigger.length > 0) {
                    var over = false;
                    if (fight_Trigger[0]._name == nameLongkui
                        || (fight_Trigger.length > 1 && fight_Trigger[1]._name == nameLongkui)) {
                        triggerCombat += 3;
                        over = true;
                    }
                    if (!over
                        && fight_Monster.length > 0
                        && fight_Monster[0]._name == nameLongkui) {
                        monsterCombat += 3;
                    }
                }
            }
        }));
    }
}

// 龙葵鬼【控剑】
function skillCharacters_LongkuiguiKongjian(longkuigui) {
    if (longkuigui._name == nameLongkuigui && longkuigui._name == nowPlayerTerm[nowPlayerNumber]._name &&
        baseEffectCountequment(longkuigui.friendList[1]) > 0) {
        addDialog(mainScene, new ChooseZoneLayer("是否发动“控剑”效果?", function (result) {
            if (result) {
                addDialog(mainScene, new selectEqumentDialogLayer("请选择要收做手牌的装备", longkuigui.friendList[1], function (selectResult) {
                    switch (selectResult) {
                        case SelectCardType.ARMS1:
                            player1GetPlayer2Equment(longkuigui, longkuigui.friendList[1].arms1);
                            longkuigui.friendList[1].arms1Combat = 0;
                            longkuigui.friendList[1].arms1Extent = 0;
                            longkuigui.friendList[1].arms1 = Text.nil;
                            longkuigui.friendList[1].tempZhuangbeiSkillCombat = 0;
                            longkuigui.friendList[1].tempZhuangbeiSkillExtent = 0;
                            break;
                        case SelectCardType.ARMS2:
                            player1GetPlayer2Equment(longkuigui, longkuigui.friendList[1].arms2);
                            longkuigui.friendList[1].arms2Combat = 0;
                            longkuigui.friendList[1].arms2Extent = 0;
                            longkuigui.friendList[1].arms2 = Text.nil;
                            break;
                        case SelectCardType.DEFENSE:
                            player1GetPlayer2Equment(longkuigui, longkuigui.friendList[1].defense);
                            longkuigui.friendList[1].defenseCombat = 0;
                            longkuigui.friendList[1].defenseExtent = 0;
                            longkuigui.friendList[1].defense = Text.nil;
                            break;
                        case SelectCardType.ORNAMENT:
                            addDialog(mainScene, new selectCardDialogLayer("请选择抽取的饰品", longkuigui.friendList[1].skillTempList, 1, 1, false, function (result) {
                                var card = result.pop();
                                longkuigui.friendList[1].skillTempList.removeObject(card);
                                longkuigui.friendList[1].maxCombat--;
                                longkuigui.handCard.push(card);
                                handCardZone.pushBackCustomItem(card);
                            }));
                            break;
                    }
                }));
            }
        }));
    }
}

// 龙葵鬼【剑魂】
function skillCharacters_LongkuiguiJianhun(longkuigui, equmentName, showName, equmentType) {
    if (!longkuigui.everyRoundSkill_2 && longkuigui._name == nameLongkuigui && longkuigui._name == nowPlayerTerm[nowPlayerNumber]._name) {
        addDialog(mainScene, new ChooseZoneLayer("是否发动“剑魂”效果，爆发【" + showName + "】?", function (result) {
            if (result) {
                longkuigui.everyRoundSkill_2 = true;
                var player2Shown = player2._name != nameChonglouSp ? true : false;
                var player3Shown = player3._name != nameChonglouSp ? true : false;
                var player4Shown = player4._name != nameChonglouSp ? true : false;
                addDialog(mainScene, new selectPlayerDialogLayer(true, player2Shown, player3Shown, player4Shown,
                    "请指定一名角色HP-3", false, false, function (selectPlayer) {
                        mainScene.addChild(new skillAnimationLayer(longkuigui.animation));
                        AchivementProgress.addAchivementProgress(longkuigui);
                        textAreaAddMessage("龙葵鬼发动“剑魂”效果，爆发【" + showName + "】，指定" + selectPlayer._name + "HP-3", myText, listView);
                        eval(equmentName + "+='(爆发)'");
                        useYingu([selectPlayer], selectPlayer, selectPlayer, [3], true, baseEffectReduceHPEffect, function () {
                            skillCharactersTangxuejianZhuida(function () {
                                heartList = new Array();
                                switch (equmentType) {
                                    case SelectCardType.ARMS1:
                                        remove_Card_Into_DropDeck(longkuigui.arms1);
                                        longkuigui.arms1 = Text.nil;
                                        longkuigui.arms1Combat = 0;
                                        longkuigui.arms1Extent = 0;
                                        break;
                                    case SelectCardType.DEFENSE:
                                        remove_Card_Into_DropDeck(longkuigui.defense);
                                        longkuigui.defense = Text.nil;
                                        longkuigui.defenseCombat = 0;
                                        longkuigui.defenseExtent = 0;
                                        break;
                                }
                            });
                        });
                    }));
            }
        }));
    }
}

// 景天sp鉴宝
function skillCharacters_JingtianSpJianbao(player, cardList, callBack) {
    if (player._name == nameJingtianSp) {
        if (player._name == player1._name) {
            addDialog(mainScene, new selectCardDialogLayer("景天sp“鉴宝”效果，请选择丢弃的1张牌", cardList, 1, 1, false, function (result) {
                var selectCard = result.pop();
                remove_Card_Into_DropDeck(selectCard.name);
                player1.handCard.removeObject(selectCard);
                cardList.removeObject(selectCard);
                selectCard.removeFromParent();
                AchivementProgress.addAchivementProgress(player.playerAchievement);
                textAreaAddMessage("景天sp丢弃了" + "【" + selectCard.name + "】", myText, listView, function () {
                    callBack(cardList);
                });
            }));
        } else {
            // AI处理丢牌效果
            var number = parseInt(Math.random() * cardList.length, 10);
            var tempCard = player.handCard[number];
            remove_Card_Into_DropDeck(tempCard.name);
            cardList.removeObject(tempCard);
            player.handCard.removeObject(tempCard);
            textAreaAddMessage("景天sp丢弃了" + "【" + tempCard.name + "】", myText, listView, function () {
                callBack(cardList);
            });
        }
    } else {
        callBack(cardList);
    }
}

var TaojiahuanjianCardModel = cc.Class.extend({
    cardType: 0,
    // 0：未发动效果；1：手牌 2：武器1 3：武器2 4：防具 5：饰品
    cardName: "",
    player: null,
    getCardType: function () {
        return this.cardType;
    },
    setCardType: function (cardType) {
        this.cardType = cardType;
    },
    getCardName: function () {
        return this.cardName;
    },
    setCardName: function (cardName) {
        this.cardName = cardName;
    },
    getPlayer: function () {
        return this.player;
    },
    setPlayer: function (player) {
        this.player = player;
    }
})

// 景天sp【讨价还价】
function skillCharacters_JingtianSpTaojiahuanjia(callBack) {
    var taojiahuanjiaCard = new TaojiahuanjianCardModel();
    var jingtianSp = null;
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0 && nowPlayerTerm[i]._name == nameJingtianSp) {
            jingtianSp = nowPlayerTerm[i];
            break;
        }
    }
    if (jingtianSp != null && (baseEffectCountequment(jingtianSp) + jingtianSp.handCard.length + baseEffectCountequment(jingtianSp.friendList[1]) > 0)) {
        if (jingtianSp._name == player1._name) {
            var shownPlayer1 = (baseEffectCountequment(player1) + player1.handCard.length > 0) ? true : false;
            var shownPlayer2 = (player2._name != nameChonglouSp && baseEffectCountequment(player2) > 0) ? true : false;
            addDialog(mainScene, new selectPlayerDialogLayer(shownPlayer1, shownPlayer2, false, false,
                "请选择“讨价还价”的目标或取消", true, false, function (selectPlayer) {
                    if (selectPlayer != null) {
                        taojiahuanjiaCard.setPlayer(selectPlayer);
                        var selectCardTypeDiaog = new selectCardTypeDialogLayer("请选择“讨价还价”对应的效果牌", selectPlayer, function (selectCardType) {
                            switch (selectCardType) {
                                case SelectCardType.ARMS1:
                                    tempArms1Name = selectPlayer.arms1.replaceAll("(扣置)");
                                    tempArms1Name = selectPlayer.arms1.replaceAll(Text.baofa);
                                    taojiahuanjiaCard.setCardName(tempArms1Name);
                                    taojiahuanjiaCard.setCardType(2);
                                    callBack(taojiahuanjiaCard);
                                    break;
                                case SelectCardType.ARMS2:
                                    tempArms2Name = selectPlayer.arms2.replaceAll("(扣置)");
                                    tempArms2Name = selectPlayer.arms2.replaceAll(Text.baofa);
                                    taojiahuanjiaCard.setCardName(tempArms2Name);
                                    taojiahuanjiaCard.setCardType(3);
                                    callBack(taojiahuanjiaCard);
                                    break;
                                case SelectCardType.DEFENSE:
                                    tempDefenseName = selectPlayer.defense.replaceAll(Text.baofa);
                                    taojiahuanjiaCard.setCardName(tempDefenseName);
                                    taojiahuanjiaCard.setCardType(4);
                                    callBack(taojiahuanjiaCard);
                                    break;
                                case SelectCardType.HANDCARD:
                                    taojiahuanjiaCard.setCardType(1);
                                    addDialog(mainScene, new selectCardDialogLayer("请选择1张手牌", selectPlayer.handCard, 1, 1, false, function (result) {
                                        var card = result.pop();
                                        taojiahuanjiaCard.setCardName(card.name);
                                        callBack(taojiahuanjiaCard);
                                    }));
                                    break;
                                case SelectCardType.ORNAMENT:
                                    taojiahuanjiaCard.setCardType(5);
                                    addDialog(mainScene, new selectCardDialogLayer("请选择1张饰品", selectPlayer.skillTempList, 1, 1, false, function (result) {
                                        var card = result.pop();
                                        taojiahuanjiaCard.setCardName(card.name);
                                        callBack(taojiahuanjiaCard);
                                    }));
                                    break;
                            }
                        });
                        if (selectPlayer._name != nameJingtianSp) {
                            selectCardTypeDiaog.selectButton4.setVisible(false);
                        }
                        addDialog(mainScene, selectCardTypeDiaog);
                    } else {
                        // 不发动【讨价还价】
                        callBack();
                    }
                }, false));
        } else {
            // AI处理【讨价还价】
            callBack();
        }
    } else {
        callBack();
    }
}

// 唐雨柔sp【入梦调】
function skillCharacters_TangyurouSpRumengdiao(callBack) {
    var tangyurouSp = null;
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0
            && nowPlayerTerm[i].skillNameList.containsObject(skillnameRumengdiao)
            && nowPlayerTerm[i].joinAttack) {
            tangyurouSp = nowPlayerTerm[i];
            break;
        }
    }
    if (tangyurouSp == null) {
        callBack();
    } else {
        if (tangyurouSp._name == player1._name) {
            mainScene.addChild(new skillAnimationLayer(player1.animation, function () {
                var player2Shown = player2._name != nameChonglouSp ? true : false;
                var player3Shown = player3._name != nameChonglouSp ? true : false;
                var player4Shown = player4._name != nameChonglouSp ? true : false;
                addDialog(mainScene, new selectPlayerDialogLayer(true, player2Shown, player3Shown, player4Shown,
                    "可选择一名玩家禁止其在本场战斗中使用战牌", true, false, function (result) {
                        skillCharacters_TangyurouSpRumengdiaoHandle(result, callBack);
                    }));
            }));
        } else {
            var selectPlayer = null;
            // AI选择是否执行【入梦调】
            if (player2._name == tangyurouSp._name) {
                if (player3._name != nameChonglouSp && player4._name != nameChonglouSp) {
                    selectPlayer = player3;
                    if (player4.hp > 0 && player4.handCard.length >= player3.handCard.length) {
                        selectPlayer = player4;
                    }
                } else {
                    if (player3._name == nameChonglouSp && player4.hp > 0) {
                        selectPlayer = player4;
                    } else if (player4._name == nameChonglouSp && player3.hp > 0) {
                        selectPlayer = player3;
                    }
                }
            } else if (player3._name == tangyurouSp._name
                || player4._name == tangyurouSp._name) {
                if (player1._name != nameChonglouSp && player2._name != nameChonglouSp) {
                    selectPlayer = player1;
                    if (player2.hp > 0
                        && player2.handCard.length > player1.handCard.length) {
                        selectPlayer = player2;
                    }
                } else {
                    if (player1._name == nameChonglouSp && player2.hp > 0) {
                        selectPlayer = player2;
                    } else if (player2._name == nameChonglouSp && player1.hp > 0) {
                        selectPlayer = player1;
                    }
                }
            }
            skillCharacters_TangyurouSpRumengdiaoHandle(selectPlayer, callBack);
        }
    }
}

// 唐雨柔sp【入梦调】效果处理
function skillCharacters_TangyurouSpRumengdiaoHandle(selectPlayer, callBack) {
    var message = null;
    if (selectPlayer != null) {
        selectPlayer.usedAttackCard = true;
        message = "唐雨柔sp发动“入梦调”效果，禁止" + selectPlayer._name + "在本场战斗中使用战牌";
    } else {
        message = "唐雨柔sp不发动“入梦调”效果";
    }
    textAreaAddMessage(message, myText, listView, callBack);
}

// 唐雨柔sp 【玉殇】
function skillCharacters_TangyurouSpYushang(tangyurouSP, callBack) {
    if (tangyurouSP.skillNameList.containsObject(skillnameYushang)) {
        if (player1._name == tangyurouSP._name) {
            var select1 = null;
            var select2 = null;
            addDialog(mainScene, new selectPlayerDialogLayer(false, true, true, true,
                "请选择交换宠物的第一名角色或取消", true, false, function (selectPlayer1) {
                    if (selectPlayer1 != null) {
                        select1 = selectPlayer1;
                        var list = [true, true, true];
                        if (select1._name == player2._name) {
                            list[0] = false;
                        }
                        if (select1._name == player3._name) {
                            list[1] = false;
                        }
                        if (select1._name == player4._name) {
                            list[2] = false;
                        }
                        addDialog(mainScene, new selectPlayerDialogLayer(false, list[0], list[1], list[2], "请选择交换宠物的第二名角色", false, false, function (selectPlayer2) {
                            select2 = selectPlayer2;
                            var shuxingList = [Text.natureFeng, Text.natureLei, Text.natureShui, Text.natureHuo, Text.natureTu0];
                            for (var i = 0; i < shuxingList.length; i++) {
                                baseEffectChangepets(select1, select2,
                                    shuxingList[i]);
                            }
                            textAreaAddMessage("唐雨柔sp发动“玉殇”效果，" + select1._name + "与" + select2._name + "所有宠物对调", myText, listView, callBack);
                        }));
                    } else {
                        callBack();
                    }
                }));
        } else {
            // AI决定是否发动【玉殇】效果
            textAreaAddMessage("唐雨柔sp不发动“玉殇”效果", myText, listView, callBack);
        }
    } else {
        callBack();
    }
}


// 重楼sp【霸气】
function skillCharacters_ChonglouSpBaqi(monsterCard, callBack) {
    var canUseBaqi = false;
    for (var i = 0; i < fight_Trigger.length; i++) {
        if (fight_Trigger[i].hp > 0 && fight_Trigger[i]._name == nameChonglouSp) {
            canUseBaqi = true;
            break;
        }
    }
    if (canUseBaqi) {
        textAreaAddMessage("重楼sp“霸气”效果被触发，" + monsterCard.name + "战力-2", myText, listView, function () {
            monsterCard.combat = monsterCard.combat - 2 <= 0 ? 0 : monsterCard.combat - 2;
            if (fight_Monster.length > 0) {
                textAreaAddMessage("妨碍者命中-1", myText, listView, function () {
                    fight_Monster[0].tempAddExtent = -1;
                    callBack();
                });
            } else {
                callBack();
            }
        });
    } else {
        callBack();
    }
}

// 重楼sp【霸气】后续处理
function skillCharacters_ChonglouSpBaqiHandle(callBack) {
    if (fight_Trigger.length > 1 && fight_Trigger[1]._name == nameChonglouSp && fight_Trigger[1].hp == 0) {
        fight_FirstMonster.combat += 2;
        if (fight_Monster.length > 0) {
            fight_Monster[0].tempAddExtent = 0;
        }
    }
    callBack();
}

// 龙幽sp【侦查】技能
function skillCharacters_LongyouSpZhencha(player) {
    if (player._name == player1._name && player1._name == nameLongyouSp && player.handCard.length > 0) {
        addDialog(mainScene, new selectCardDialogLayer("龙幽SP【侦查】效果：请丢弃1张技牌后指定任意角色展示所有手牌", player.handCard, 1, 1, true, function (result) {
            if (result != null) {
                var selectCard = result.pop();
                remove_Card_Into_DropDeck(selectCard.name);
                player.handCard.removeObject(selectCard);
                selectCard.removeFromParent();
                var player2Shown = player2._name != nameChonglouSp ? true : false;
                var player3Shown = player3._name != nameChonglouSp ? true : false;
                var player4Shown = player4._name != nameChonglouSp ? true : false;
                addDialog(mainScene, new selectPlayerDialogLayer(true, player2Shown, player3Shown, player4Shown,
                    "请选择1名角色", false, false, function (selectCharacter) {
                        if (selectCharacter.handCard.length > 0) {
                            addDialog(mainScene, new selectCardDialogLayer("请查看" + selectCharacter._name + "的全部手牌", selectCharacter.handCard, 1, 1, false, null));
                        } else {
                            textAreaAddMessage(selectCharacter._name + "无手牌", myText, listView);
                        }
                    }));
            }
        }));
    }
}

// 龙幽sp【妖枪】技能
function skillCharacters_Yaoqiang(callBack) {
    var longyouSp = null;
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0 && nowPlayerTerm[i].maxCombat > 0 && nowPlayerTerm[i]._name == nameLongyouSp && nowPlayerTerm[i]._name == player1._name) {
            longyouSp = nowPlayerTerm[i];
            break;
        }
    }
    if (longyouSp != null) {
        addDialog(mainScene, new ChooseZoneLayer("是否发动妖枪？", function (result) {
            if (result) {
                addDialog(mainScene, new selectNumberDialogLayer("请选择要转换为命中的数量", longyouSp.maxCombat, function (number) {
                    longyouSp.maxCombat -= number;
                    longyouSp.maxExtent += number;
                    textAreaAddMessage("龙幽sp发动“妖枪”效果，将" + number + "点战力转化为命中", myText, listView, callBack);
                }));
            } else {
                callBack();
            }
        }));
    } else {
        callBack();
    }
}

// 龙幽sp【妖枪】结束处理
function skillCharacters_YaoqiangEnd() {
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0 && nowPlayerTerm[i]._name == nameLongyouSp) {
            nowPlayerTerm[i].maxCombat = 5;
            nowPlayerTerm[i].maxExtent = 1;
        }
    }
}

// 姜云凡sp【狂风寨】效果
function skillCharacters_JiangyunfanSpKuangfengzhai(callBack) {
    var jiangyunfanSp = null;
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0 && nowPlayerTerm[i]._name == nameJiangyunfanSp && nowPlayerTerm[i].joinAttack) {
            jiangyunfanSp = nowPlayerTerm[i];
            break;
        }
    }
    if (jiangyunfanSp != null) {
        if (player1IsPlayer2Friend(jiangyunfanSp, nowPlayerTerm[nowPlayerNumber])) {
            addTrigerCombat(1);
        } else {
            addMonsterCombat(1);
        }
        textAreaAddMessage("姜云凡sp“狂风寨”效果触发，本方战力+1", myText, listView, callBack);
    } else {
        callBack();
    }
}

// 姜云凡sp【父爱】效果
function skillCharacters_JiangyunfanSpFuai(daguaiCallBack, passDaguaiCallBack) {
    var jiangyunfanSp = null;
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0 && nowPlayerTerm[i]._name == nameJiangyunfanSp && nowPlayerTerm[i].handCard.length >= 2) {
            jiangyunfanSp = nowPlayerTerm[i];
            break;
        }
    }
    if (jiangyunfanSp != null) {
        if (jiangyunfanSp._name == player1._name) {
            addDialog(mainScene, new selectCardDialogLayer("请选择舍弃 2张牌跳过打怪结算或取消", jiangyunfanSp.handCard, 2, 2, true, function (result) {
                if (result != null) {
                    for (var i = 0; i < result.length; i++) {
                        remove_Card_Into_DropDeck(result[i].name);
                        jiangyunfanSp.handCard.removeObject(result[i]);
                        result[i].removeFromParent();
                    }
                    textAreaAddMessage("姜云凡sp发动“父爱”效果，弃置2张手牌跳过本次打怪结算", myText, listView, passDaguaiCallBack);
                } else {
                    daguaiCallBack();
                }
            }));
        } else {
            // AI决定是否发动【父爱】效果
            daguaiCallBack();
        }
    } else {
        daguaiCallBack();
    }
}


// 小蛮sp【嘟儿的礼物】
function skillCharacters_XiaomanSpDuerdeliwu(callBack) {
    var xiaomanSp = null;
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0 && nowPlayerTerm[i]._name == nameXiaomanSp && nowPlayerTerm[i].joinAttack) {
            xiaomanSp = nowPlayerTerm[i];
            break;
        }
    }
    if (xiaomanSp != null) {
        if (xiaomanSp._name == player1._name) {
            var player2Shown = (player2._name != nameChonglouSp) ? true : false;
            var player3Shown = (player3._name != nameChonglouSp) ? true : false;
            var player4Shown = (player4._name != nameChonglouSp) ? true : false;
            addDialog(mainScene, new selectPlayerDialogLayer(true, player2Shown, player3Shown, player4Shown,
                "请指定一名角色补1张牌或取消", true, false, function (result) {
                    addHandCard([result], result, result, null, [1], true, true, callBack);
                }));
        } else {
            addHandCard([xiaomanSp], xiaomanSp, xiaomanSp, null, [1], true, true, callBack);
        }
    } else {
        callBack();
    }
}

// 小蛮sp【觉醒】
function skillCharacters_XiaomanSpJuexing(callBack) {
    var xiaomanSp = null
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        if (nowPlayerTerm[i].hp > 0 && nowPlayerTerm[i]._name == nameXiaomanSp) {
            xiaomanSp = nowPlayerTerm[i];
            break;
        }
    }
    if (xiaomanSp != null) {
        if (xiaomanSp._name == player1._name) {
            var player3BossPetsNumber = (player3._name != nameChonglouSp) ? judgeMonsterLevelNotBoss(player3) : false;
            var player4BossPetsNumber = (player4._name != nameChonglouSp) ? judgeMonsterLevelNotBoss(player4) : false;
            if (player3BossPetsNumber || player4BossPetsNumber) {
                addDialog(mainScene, new selectPlayerDialogLayer(false, false, player3BossPetsNumber, player4BossPetsNumber,
                    "请选择一名角色，消灭其1只非boss级宠物或取消", true, false, function (selectPlayer) {
                        if (selectPlayer != null) {
                            var selectNotBossLevelPetDialog = new selectPetsDialogLayer("请选择要消灭的非boss级宠物", selectPlayer, function (pet) {
                                perishPet(pet.nature, selectPlayer);
                                callBack();
                            });
                            if (selectPlayer.pet_FengMonster != null && selectPlayer.pet_FengMonster.level == "BOSS") {
                                buttonManager(selectNotBossLevelPetDialog.pet1Button, false, false);
                            }
                            if (selectPlayer.pet_LeiMonster != null && selectPlayer.pet_LeiMonster.level == "BOSS") {
                                buttonManager(selectNotBossLevelPetDialog.pet2Button, false, false);
                            }
                            if (selectPlayer.pet_ShuiMonster != null && selectPlayer.pet_ShuiMonster.level == "BOSS") {
                                buttonManager(selectNotBossLevelPetDialog.pet3Button, false, false);
                            }
                            if (selectPlayer.pet_HuoMonster != null && selectPlayer.pet_HuoMonster.level == "BOSS") {
                                buttonManager(selectNotBossLevelPetDialog.pet4Button, false, false);
                            }
                            if (selectPlayer.pet_TuMonster != null && selectPlayer.pet_TuMonster.level == "BOSS") {
                                buttonManager(selectNotBossLevelPetDialog.pet5Button, false, false);
                            }
                            addDialog(mainScene, selectNotBossLevelPetDialog);
                        } else {
                            callBack();
                        }
                    }));
            } else {
                // cc.log("没有非BOSS宠物");
                callBack()
            }
        } else {
            callBack();
        }
    } else {
        callBack();
    }
}

// 林月如sp【比武招亲】
function skillCharacters_LinyueruBiwuzhaoqin(linyueruSp) {
    var tempMaleList = [];
    var tempFemaleList = [];
    var showMaleList = [false, false, false, false];
    var showFemaleList = [false, false, false, false];
    var chooseMaleCharacter = null;
    var chooseFemaleCharacter = null;
    for (var i = 0; i < nowPlayerTerm.length; i++) {
        var isEffected = false;
        switch (nowPlayerTerm[i].sex) {
            case 0:
                for (var t = 0; t < linyueruSpBiwuzhaoqinMaleList.length; t++) {
                    if (nowPlayerTerm[i]._name == linyueruSpBiwuzhaoqinMaleList[t]._name) {
                        isEffected = true;
                        break;
                    }
                }
                if (!isEffected) {
                    showMaleList[i] = true;
                    tempMaleList.push(nowPlayerTerm[i]);
                }
                break;
            case 1:
                for (var t = 0; t < linyueruSpBiwuzhaoqinFemaleList.length; t++) {
                    if (nowPlayerTerm[i]._name == linyueruSpBiwuzhaoqinFemaleList[t]._name) {
                        isEffected = true;
                        break;
                    }
                }
                if (!isEffected) {
                    showFemaleList[i] = true;
                    tempFemaleList.push(nowPlayerTerm[i]);
                }
                break;
        }
    }
    if (linyueruSp.handCard.length > 0 && tempMaleList.length > 0 && tempFemaleList.length > 0) {
        addDialog(mainScene, new selectCardDialogLayer("请弃置1张手牌发动【比武招亲】或取消", linyueruSp.handCard, 1, 1, true, function (selectCardList) {
            if (selectCardList != null) {
                var card = selectCardList.pop();
                remove_Card_Into_DropDeck(card.name);
                linyueruSp.handCard.removeObject(card);
                card.removeFromParent();
                addDialog(mainScene, new selectPlayerDialogLayer(showMaleList[0], showMaleList[2], showMaleList[1], showMaleList[3],
                    "【比武招亲】:请选择1名男性角色:", false, false, function (selectMale) {
                        chooseMaleCharacter = selectMale;
                        linyueruSpBiwuzhaoqinMaleList.push(chooseMaleCharacter);
                        var maleNumber = parseInt(Math.random() * 6, 10) + 1;
                        addDialog(mainScene, new selectPlayerDialogLayer(showFemaleList[0], showFemaleList[2], showFemaleList[1], showFemaleList[3],
                            "【比武招亲】:请选择1名女性角色:", false, false, function (selectFemale) {
                                chooseFemaleCharacter = selectFemale;
                                linyueruSpBiwuzhaoqinFemaleList.push(chooseFemaleCharacter);
                                var femaleNumber = parseInt(Math.random() * 6, 10) + 1;
                                textAreaAddMessage("林月如sp指定" + chooseMaleCharacter._name + "与" + chooseFemaleCharacter._name + "进行拼点", myText, listView, function () {
                                    textAreaAddMessage(chooseMaleCharacter._name + "点数为" + maleNumber, myText, listView, function () {
                                        textAreaAddMessage(chooseFemaleCharacter._name + "点数为:" + femaleNumber, myText, listView, function () {
                                            addDialog(mainScene, new yesOrNoDialogLayer("是否发动【刁蛮】令双方重投1次骰子？", function (result) {
                                                if (result) {
                                                    maleNumber = parseInt(Math.random() * 6, 10) + 1;
                                                    textAreaAddMessage(chooseMaleCharacter._name + "点数为:" + maleNumber, myText, listView, function () {
                                                        femaleNumber = parseInt(Math.random() * 6, 10) + 1;
                                                        textAreaAddMessage(chooseFemaleCharacter._name + "点数为:" + femaleNumber, myText, listView, function () {
                                                            skillCharacters_LinyueruSpBiwuzhaoqinHandle(chooseMaleCharacter, maleNumber, chooseFemaleCharacter, femaleNumber);
                                                        });
                                                    });
                                                } else {
                                                    skillCharacters_LinyueruSpBiwuzhaoqinHandle(chooseMaleCharacter, maleNumber, chooseFemaleCharacter, femaleNumber);
                                                }
                                            }));
                                        });
                                    });

                                });
                            }));
                    }));
            }
        }));
    }
}

// 林月如【比武招亲】结果处理
function skillCharacters_LinyueruSpBiwuzhaoqinHandle(maleCharacter, maleNumber, femaleCharacter, femaleNumber) {
    var heartPlayer = null;
    if (maleNumber > femaleNumber) {
        heartPlayer = femaleCharacter;
    } else if (femaleNumber > maleNumber) {
        heartPlayer = maleCharacter;
    }
    if (heartPlayer != null) {
        textAreaAddMessage(heartPlayer._name + "拼点失败，HP-3", myText, listView, function () {
            baseEffectReduceHPEffect(heartPlayer, [heartPlayer], 3, true, null);
            // 唐雪见【追打】
            skillCharactersTangxuejianZhuida(function () {
                heartList = new Array();
            });
        });
    } else {
        textAreaAddMessage("平局，双方均不受伤", myText, listView);
    }
    AchivementProgress.addAchivementProgress(initSpecialAchivement.achivementHuiyiZhaoqin);
}

// 赵灵儿sp【回魂仙梦】
function skillCharacters_Zhaolinguihunxianmeng(usePlayer) {
    var _showPlayer2 = (player2.hp > 0 && player2.mode == MODE.NORMAL) ? true : false;
    var _showPlayer3 = (player3.hp > 0 && player3.mode == MODE.NORMAL) ? true : false;
    var _showPlayer4 = (player4.hp > 0 && player4.mode == MODE.NORMAL) ? true : false;
    if (!_showPlayer2 && !_showPlayer3 && !_showPlayer4) {
        return;
    }
    if (usePlayer._name == player1._name && usePlayer._name == nameZhaolingerSp && !player1.everyRoundSkill_1
        && usePlayer.handCard.length > 0) {
        if (usePlayer._name == player1._name) {
            addDialog(mainScene, new selectCardDialogLayer("请选择舍弃的1张手牌", player1.handCard, 1, 1, true, function (selectCardList) {
                if (selectCardList != null) {
                    var card = selectCardList.pop();
                    usePlayer.everyRoundSkill_1 = true;
                    remove_Card_Into_DropDeck(card.name);
                    usePlayer.handCard.removeObject(card);
                    card.removeFromParent();
                    addDialog(mainScene, new selectPlayerDialogLayer(false, _showPlayer2, _showPlayer3, _showPlayer4,
                        "请选择目标角色,获得其一个技能", false, false, function (choosePlayer) {
                            addDialog(mainScene, new SelectSkillDialogLayer(choosePlayer, function (skillIndex) {
                                var targetSkillName;
                                var targetSkillButton;
                                var targetSkillEffectText;
                                switch (skillIndex) {
                                    case 1:
                                        targetSkillName = choosePlayer.skill_1;
                                        targetSkillButton = choosePlayer.skillButton1;
                                        targetSkillEffectText = choosePlayer.skill1Effect;
                                        break;
                                    case 2:
                                        targetSkillName = choosePlayer.skill_2;
                                        targetSkillButton = choosePlayer.skillButton2;
                                        targetSkillEffectText = choosePlayer.skill2Effect;
                                        break;
                                    case 3:
                                        targetSkillName = choosePlayer.skill_3;
                                        targetSkillButton = choosePlayer.skillButton3;
                                        targetSkillEffectText = choosePlayer.skill3Effect;
                                        break;
                                }
                                usePlayer.skillNameList.push(targetSkillName);
                                usePlayer.skill_3 = targetSkillName;
                                usePlayer.skillButton3 = targetSkillButton;
                                usePlayer.skill3Effect = targetSkillEffectText;

                            }));
                        }));
                }
            }));
        } else {
            // AI处理回魂仙梦
        }
    }
}

// 赵灵儿sp【回魂仙梦】结束
function skillCharacters_ZhaolingerHuihunxianmengEnd() {
    if (nowPlayerTerm[nowPlayerNumber]._name == nameZhaolingerSp
        && nowPlayerTerm[nowPlayerNumber].skillNameList.length > 2) {
        // 【林家剑法】效果恢复
        skillCharacter_ZhaolingerspLinjiajianfaEnd(nowPlayerTerm[nowPlayerNumber]);
        // 【御剑术】效果恢复
        skillCharacter_ZhaolingerspYujianshuEnd(nowPlayerTerm[nowPlayerNumber]);
        textAreaAddMessage("赵灵儿sp【回魂仙梦】效果结束", myText, listView);
        // 【合成饰品】回合结束后清空饰品列表并修正战力
        if (nowPlayerTerm[nowPlayerNumber].skillNameList.containsObject(skillnameHechengshipin)) {
            nowPlayerTerm[nowPlayerNumber].maxCombat -= nowPlayerTerm[nowPlayerNumber].skillTempList.length;
            for (var i = 0; i < nowPlayerTerm[nowPlayerNumber].skillTempList.length; i++) {
                remove_Card_Into_DropDeck(nowPlayerTerm[nowPlayerNumber].skillTempList[nowPlayerNumber].name);
            }
            nowPlayerTerm[nowPlayerNumber].skillTempList = [];
        }
        nowPlayerTerm[nowPlayerNumber].skillNameList.removeObject(nowPlayerTerm[nowPlayerNumber].skill_3);
        nowPlayerTerm[nowPlayerNumber].skill_3 = Text.nil;
        nowPlayerTerm[nowPlayerNumber].skillButton3 = "";
        nowPlayerTerm[nowPlayerNumber].skill3Effect = "";
    }
}

// 赵灵儿sp【回魂仙梦】技能触发选择器
function skillCharacters_ZhaolingerspHuihunxianmengChooser(player, step) {
    if (player._name != nameZhaolingerSp) {
        return;
    }
    switch (step) {
        case 2:
            switch (player.skill_3) {
                case skillnameGuilingjing:
                    skillCharacters_AnuGuilingjing();
                    break;
                case skillnameYuanlingguixinshu:
                    skillCharacters_ShenqishuangYuanlingguixinshu(player);
                    break;
                case skillnameLashoucuihua:
                    skillCharacters_KonglinLashoucuihua();
                    break;
                case skillnameZhanbu:
                    skillCharacters_NangonghuangZhanbu();
                    break;
                case skillnameXiongdi:
                    skillCharacters_XingxuanXiongdi();
                    break;
                case skillnamePengren:
                    skillCharacters_XingxuanPengren();
                    break;
                case skillnameTaotie:
                    skillCharacters_WangpengxuTaotie();
                    break;
                case skillnameHechengshipin:
                    hechengshipingHandle(player);
                    break;
                case skillnameSounangtanbao:
                    skillCharacters_HanlinshaSounangtanbao(player);
                    break;
            }
            break;
        case 3:
            switch (player.skill_3) {
                case skillnameZhaohuanshuimoshou:
                    skillCharacters_BaiyueZhaohuanshuimoshou(player);
                    break;
                case skillnameLianji:
                    skillCharacters_TangxuejianLianji();
                    break;
                case skillnameHaosheng:
                    skillCharacters_TangxuejianHaosheng();
                    break;
                case skillnameHouyisherigong:
                    skillCharacters_YuntianheHouyisherigong(player);
                    break;
            }
            break;
        case 4:
            switch (player.skill_3) {
                case skillnameLianji:
                    skillCharacters_TangxuejianLianji();
                    break;
                case skillnameHaosheng:
                    skillCharacters_TangxuejianHaosheng();
                    break;
                case skillnameHouyisherigong:
                    skillCharacters_YuntianheHouyisherigong(player);
                    break;
            }
            break;
    }
}

// 赵灵儿sp【圣灵】
function skillCharacters_ZhaolingerspShengling(player) {
    if (player._name == player1._name && baseEffectHaveHowManyCardOfType(player, CARDTYPE.SKILLCARD) > 0) {
        var skillCardList = new Array();
        for (var i = 0; i < player.handCard.length; i++) {
            if (player.handCard[i].cardType == CARDTYPE.SKILLCARD) {
                skillCardList.push(player.handCard[i]);
            }
        }
        addDialog(mainScene, new selectCardDialogLayer("请选择1张技牌当作【五气朝元】使用或典当", skillCardList, 1, 1, true, function (selectList) {
            if (selectList != null) {
                var selectCard = selectList.pop();
                remove_Card_Into_DropDeck(selectCard.name);
                player.handCard.removeObject(selectCard);
                selectCard.removeFromParent();
                handCardWuqichaoyuan.effect(player, player, false, true);
            }
        }));
    }
}

// 徐长卿【掌门人】
function skillCharacter_Zhangmenren(player){
	if(!player.friendList[1].skillNameList.containsObject(skillnameZhangmenren)||!player.friendList[1].hp<=0){
		return;
	}	
	if(nextStep!=2){
		return;
	}
	if(player.handCard.length==0){
		return;
	}
	addDialog(mainScene, new selectCardDialogLayer("请选择任意数量的手牌交给队友【徐长卿】", player.handCard, 1, player.handCard.length, true, function (selectList) {
		if (selectList != null) {
			for(var i=0;i<selectList.length;i++){
				var selectCard = selectList[i];
				remove_Card_Into_DropDeck(selectCard.name);
				player.handCard.removeObject(selectCard);
				selectCard.removeFromParent();
				player.friendList[1].handCard.push(selectCard);
			}
		}
	}));
}


// 徐长卿【蜀山剑决】
function skillCharacters_XuchangqingShushanjianjue(player) {
    if (player._name != player1._name || player.handCard.length == 0 || !player.skillNameList.containsObject(skillnameShushanjianjue)) {
    	return;
    }
    addDialog(mainScene, new selectCardDialogLayer("请舍弃1张手牌，发动【蜀山剑诀】效果", player.handCard, 1, 1, true, function (result) {
        if (result == null) {
            return;
        }
        var _card = result.pop();
        remove_Card_Into_DropDeck(_card.name);
        player.handCard.removeObject(_card);
        _card.removeFromParent();
        addDialog(mainScene, new yesOrNoDialogLayer("是否增加1点战力？(否则增加1点命中)", function (ret) {
            if (ret) {
            	textAreaAddMessage("徐长卿发动【蜀山剑诀】,战力+1",myText, listView);
                baseEffectAddTempCombat(player, 1);
            } else {
            	textAreaAddMessage("徐长卿发动【蜀山剑诀】,命中+1",myText, listView);
                baseEffectAddTempExtent(player, 1);
            }
            // 重新计算当前战斗的情况
            countBattle();
        }));
    }));
}

// 景天【永安当】主动使用时的效果
function skillCharacters_JingtianYongandang(player,step,callback){
	if(!player.skillNameList.containsObject(skillnameYongandang)&&
			(!player.friendList[1].skillNameList.containsObject(skillnameYongandang)
					||player.friendList[1].hp<=0)){
		return;
	}
	if((step<2||step>4)||player.usedAttackCard){
		return;
	}
	var _yongandangpiao=null
	for(var i=0;i<player.handCard.length;i++){
		if(player.handCard[i].name==string_handCardNameYongandangpiao){
			_yongandangpiao=player.handCard[i];
			break;
		}
	}
	if(_yongandangpiao==null){
		return;
	}
	addDialog(mainScene, new ChooseZoneLayer("是否发动【永安当】效果?",function(ret){
		if(ret){
			remove_Card_Into_DropDeck(_yongandangpiao.name);
			player.handCard.removeObject(_yongandangpiao);
			_yongandangpiao.removeFromParent();
			addDialog(mainScene, new AnyCardDialog(step==2?1:2,player,player,callback));
		}
	}));
}

function skillCharacters_JingtianYongandangAsk(callback,targetCardName,player){
	if(!player.skillNameList.containsObject(skillnameYongandang)&&
			(!player.friendList[1].skillNameList.containsObject(skillnameYongandang)
					||player.friendList[1].hp<=0)){
		callback(false);
		return;
	}
	var _yongandangpiao=null
	for(var i=0;i<player.handCard.length;i++){
		if(player.handCard[i].name==string_handCardNameYongandangpiao){
			_yongandangpiao=player.handCard[i];
			break;
		}
	}
	if(_yongandangpiao==null){
		callback(false);
		return;
	}
	if(player._name!=player1._name){
		callback(false);
		return;
	}
	addDialog(mainScene, new ChooseZoneLayer("是否发动【永安当】效果,将【永安当票】视作【"+targetCardName+"】使用?",function(ret){
		if(ret){
			remove_Card_Into_DropDeck(_yongandangpiao.name);
			player.handCard.removeObject(_yongandangpiao);
			_yongandangpiao.removeFromParent();
			callback(true);
		}else{
			callback(false);
		}
	}));
}

// 景天：主动使用【典当】效果时的判断
function skillCharacters_JingtianLaobanAsk(player){
	if(player.skillNameList.containsObject(skillnameLaoban)){
		textAreaAddMessage("景天【老板】效果发动，无法使用典当效果",myText, listView);
		return false;
	}
	return true;
}

// 景天：敌方玩家使用【典当】效果时的处理
function skillCharacters_JingtianLaoban(player,cardNumber,dropCardCallback,callback){
	var _jingtian=null;
	for (var i = 0; i < nowPlayerTerm.length; i++) {
		if (nowPlayerTerm[i].hp > 0
				&& nowPlayerTerm[i].skillNameList.containsObject(skillnameLaoban)) {
			_jingtian=nowPlayerTerm[i];
			break;
		}
	}
	if(_jingtian==null||player1IsPlayer2Friend(_jingtian, player)){
		if(callback!=null){
			callback();
		}
		return;
	}
	if(dropCardCallback!=null){
		dropCardCallback();
	}
	textAreaAddMessage("景天【老板】效果发动，获得敌方典当的牌",myText, listView);
	addHandCard([_jingtian],_jingtian,_jingtian,cardNumber,[1],false,false,callback);
}

// 景天【大团圆】效果
function skillCharacter_JingtianDatuanyuan(deathPlayer,callback){
	var _jingtianArray=[];
	for (var i = 0; i < nowPlayerTerm.length; i++) {
		if (nowPlayerTerm[i].hp<=0||
				nowPlayerTerm[i].handCard.length+baseEffectCountequment(nowPlayerTerm[i])+baseEffectCountOrnament(nowPlayerTerm[i])<2||
				!nowPlayerTerm[i].skillNameList.containsObject(skillnameDatuanyuan)) {
			continue;
		}
		_jingtianArray.push(nowPlayerTerm[i]);
	}
	if(_jingtianArray.length==0){
		callback();
	}else{
		datuanyuanHandle(_jingtianArray,_jingtianArray[0],deathPlayer,callback);
	}
}

function datuanyuanHandle(playerArray,targetPlayer,deathPlayer,callback){
	var _nextIndex=null;
	for(var i=0;i<playerArray.length;i++){
		if(playerArray[i]._name==targetPlayer._name){
			_nextIndex=i+1;
			break;
		}
	}
	var _nextPlayer=null;
	if(_nextIndex<playerArray.length){
		_nextPlayer=playerArray[_nextIndex];
	}
	if(targetPlayer._name==player1._name){
		addDialog(mainScene, new selectAnyCardDialogLayer("请选择舍弃2张牌发动【大团圆】",
				2,true,targetPlayer,function(resultList){
			for(var i=0;i<resultList.length;i++){
				var _tmpCard=resultList[i];
				switch(_tmpCard.cardType){
				case SELECTANYCARD_TYPE.HANDCARD:
					remove_Card_Into_DropDeck(_tmpCard.name);
					targetPlayer.handCard.removeObject(_tmpCard);
					_tmpCard.extraData.removeFromParent();
					break;
				case SELECTANYCARD_TYPE.ARM_1:
					remove_Card_Into_DropDeck(targetPlayer.arms1);
					targetPlayer.arms1 = "无";
					targetPlayer.arms1Combat = 0;
					targetPlayer.arms1Extent = 0;
					targetPlayer.tempZhuangbeiSkillCombat=0;
					targetPlayer.tempZhuangbeiSkillExtent=0;
					break;
				case SELECTANYCARD_TYPE.ARM_2:
					remove_Card_Into_DropDeck(targetPlayer.arms2);
					targetPlayer.arms2 = "无";
					targetPlayer.arms2Combat = 0;
					targetPlayer.arms2Extent = 0;
					break;
				case SELECTANYCARD_TYPE.DEFENSE:
					remove_Card_Into_DropDeck(targetPlayer.defense);
					targetPlayer.defense = "无";
					targetPlayer.defenseCombat = 0;
					targetPlayer.defenseExtent = 0;
					break;
				case SELECTANYCARD_TYPE.ORNAMENT:
					remove_Card_Into_DropDeck(_tmpCard.name);
					targetPlayer.skillTempList.removeObject(card);
					targetPlayer.maxCombat--;
					break;
				}
			}
			// 重新设定死亡角色的倾慕者
			addDialog(mainScene, new selectLoverDialogLayer(4,function(loverList){
				deathPlayer.lover1=Text.nil;
				deathPlayer.lover2=Text.nil;
				deathPlayer.lover3=Text.nil;
				deathPlayer.lover4=Text.nil;
				if(loverList.length==0){
					textAreaAddMessage(targetPlayer._name+"发动【大团圆】，将 "+deathPlayer._name+"的倾慕者修改为:无", myText, listView, null);
					return;
				}
				var _str="";
				for(var i=0;i<loverList.length;i++){
					eval("deathPlayer.lover"+(i+1)+"=loverList[i]");
					_str+=loverList[i];
					if(i<loverList.length-1){
						_str+=",";
					}
				}
				textAreaAddMessage(targetPlayer._name+"发动【大团圆】，将 "+deathPlayer._name+"的倾慕者修改为:"+_str, myText, listView, null);
				cc.log(deathPlayer.lover1);
				cc.log(deathPlayer.lover2);
				cc.log(deathPlayer.lover3);
				cc.log(deathPlayer.lover4);
			},callback));
		},callback));
	}else{
		// AI选择大团圆的执行情况，默认不发动
		if(_nextPlayer==null){
			callback();
		}else{
			datuanyuanHandle(playerArray, _nextPlayer, deathPlayer, callback);
		}
	}
}
















