//初始化adv手牌
function initAdvHandCardDeck(array) {
	// {/*天玄五音*/1,2,3,4,5,6,7,8,/*金蚕王*/9,10,11,12,13,/*洞冥宝镜*/14,15,16,17,/*隐蛊*/18,19,20,21,
	// /*鼠儿果*/22,23,24,/*灵葫仙丹*/25,26,27,/*冰心诀*/28,29,30,/*铜钱镖*/31,32,33,/*天雷破*/34,35,36,/*天罡战气*/37,38,
	// /*金蝉脱壳*/39,40,/*窥测天机*/41,42,/*偷盗*/43,44,/*五气朝元*/45,46,/*魔剑*/47,/*彩环*/48,/*魔刀天吒*/49,/*天蛇仗*/50,
	// /*无尘剑*/51,/*天帝祭服*/52,/*乾坤道袍*/53,/*五彩霞衣*/54,/*踏云靴*/55,/*龙魂战铠*/56};
	// /*搜宝鼠*/ 57 /*极目水*/58 /*天剑*/ 59  /*酒神*/60 61 /*秀口锦心咒*/ 62 /*烤鸭*/63
	// /*五灵净邪*/ 64  /*天香续命露*/65 /*幻魅画轴*/ 66 /*十字妖槊*/ 67 /*天罡斗衣*/ 68
	for (var i = 1; i < 57; i++){
		array.push(i);
		array.sort(function(){ return 0.5 - Math.random() }) ;
	}
	return array;
}

//加入危机牌
function addCrisisCard(monsterDeck,crisisCardNumberList){
	cc.log(crisisCardNumberList);
	for(var i=0;i<crisisCardNumberList.length;i++){
		monsterDeck.push(crisisCardNumberList[i]);
	}
	monsterDeck.sort(function(){ return 0.5 - Math.random() }) ;
	return monsterDeck;
}


//补牌方法
function advNewHandCard(cardNumber, player, count,isRandom,canUseShanzei,callBack) {
	if (player.hp <= 0) {
		if(callBack!=null){
			callBack();
		}else{
			return;
		}
	}
	var tempCardList = new Array();
	for (var temp = 0; temp < count; temp++) {
		if (player.hp > 0) {
			if (cardNumber >= 1 && cardNumber <= 8) {
				var tianxuanwuyin=new createAdvHandCardImageView(string_handCardNameTianxuanwuyin,
						cardNumber,resPng.tianxuanwuyin_png,CARDTYPE.FIGHTCARD, 
						"【"+string_handCardNameTianxuanwuyin+
				"】您指定一方本场战斗中战力+2未参战亦可使用");
				player.handCard.push(tianxuanwuyin);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(tianxuanwuyin);
				}
			} else if (cardNumber >= 9 && cardNumber <= 13) {
				var jincanwang=new createAdvHandCardImageView(string_handCardNameJincanwang,
						cardNumber,resPng.jincanwang_png,CARDTYPE.FIGHTCARD, 
						"【"+string_handCardNameJincanwang+
				"】本场战斗中您的战力+3参战并命中才会生效");
				player.handCard.push(jincanwang);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(jincanwang);
				}
			} else if (cardNumber >= 14 && cardNumber <= 17) {
				var dongmingbaojing=new createAdvHandCardImageView(string_handCardNameDongmingbaojing,
						cardNumber,resPng.dongmingbaojing_png,CARDTYPE.SPECIALCARD, 
						"【"+string_handCardNameDongmingbaojing+
				"】任意玩家决定是否翻取怪物牌前使用，指定一名玩家翻取怪物牌堆顶上的一张，检视后放回原处");
				player.handCard.push(dongmingbaojing);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(dongmingbaojing);
				}
			} else if (cardNumber >= 18 && cardNumber <= 21) {
				var yingu=new createAdvHandCardImageView(string_handCardNameYingu,
						cardNumber,resPng.yingu_png,CARDTYPE.SPECIALCARD, 
						"【"+string_handCardNameYingu+
				"】抵消一次您自己收到的HP伤害（倾慕除外）");
				player.handCard.push(yingu);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(yingu);
				}
			} else if (cardNumber >= 22 && cardNumber <= 24) {
				var shuerguo=new createAdvHandCardImageView(string_handCardNameShuerguo,
						cardNumber,resPng.shuerguo_png,CARDTYPE.SKILLCARD, 
						"【"+string_handCardNameShuerguo+
				"】您指定一人补2张手牌");
				player.handCard.push(shuerguo);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(shuerguo);
				}
			} else if (cardNumber >= 25 && cardNumber <= 27) {
				var linghuxiandan=new createAdvHandCardImageView(string_handCardNameLinghuxiandan,
						cardNumber,resPng.linghuxiandan_png,CARDTYPE.SPECIALCARD, 
						"【"+string_handCardNameLinghuxiandan+
				"】您的技牌阶段使用，您自己的HP+2,当有玩家HP为0时，可令其复活并恢复2点HP");
				player.handCard.push(linghuxiandan);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(linghuxiandan);
				}
			} else if (cardNumber >= 28 && cardNumber <= 30) {
				var bingxinjue=new createAdvHandCardImageView(string_handCardNameBingxinjue,
						cardNumber,resPng.bingxinjue_png,CARDTYPE.SPECIALCARD, 
						"【"+string_handCardNameBingxinjue+
				"】任意玩家使用技牌、战牌、特殊牌时打出。可令当前打出的这张牌无效");
				player.handCard.push(bingxinjue);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(bingxinjue);
				}
			} else if (cardNumber >= 31 && cardNumber <= 33) {
				var tongqianbiao=new createAdvHandCardImageView(string_handCardNameTongqianbiao,
						cardNumber,resPng.tongqianbiao_png,CARDTYPE.SKILLCARD, 
						"【"+string_handCardNameTongqianbiao+
				"】弃掉任意玩家的1张手牌或装备");
				player.handCard.push(tongqianbiao);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(tongqianbiao);
				}
			} else if (cardNumber >= 34 && cardNumber <= 36) {
				var tianleipo=new createAdvHandCardImageView(string_handCardNameTianleipo,
						cardNumber,resPng.tianleipo_png,CARDTYPE.SKILLCARD, 
						"【"+string_handCardNameTianleipo+
				"】您指定一名玩家HP-2（此伤害为雷属性）");
				player.handCard.push(tianleipo);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(tianleipo);
				}
			} else if (cardNumber == 37 || cardNumber == 38) {
				var tiangangzhanqi=new createAdvHandCardImageView(string_handCardNameTiangangzhanqi,
						cardNumber,resPng.tiangangzhanqi_png,CARDTYPE.FIGHTCARD, 
						"【"+string_handCardNameTiangangzhanqi+
				"】本场战斗中您的战力（含装备、宠物）加倍。但对战牌、爆发等临时增加的战力无效参战并命中才会生效");
				player.handCard.push(tiangangzhanqi);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(tiangangzhanqi);
				}
			} else if (cardNumber == 39 || cardNumber == 40) {
				var jinchantuoqiao=new createAdvHandCardImageView(string_handCardNameJinchantuoqiao,
						cardNumber,resPng.jinchantuoqiao_png,CARDTYPE.FIGHTCARD, 
						"【"+string_handCardNameJinchantuoqiao+
				"】强制结束本场战斗，胜利条件、失败条件皆无效参战者可使用，即使未命中");
				player.handCard.push(jinchantuoqiao);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(jinchantuoqiao);
				}
			} else if (cardNumber == 41 || cardNumber == 42) {
				var kuicetianji=new createAdvHandCardImageView(string_handCardNameKuicetianji,
						cardNumber,resPng.kuicetianji_png,CARDTYPE.SKILLCARD, 
						"【"+string_handCardNameKuicetianji+
				"】您从怪物牌组顶端翻去两张怪牌，检视后放回原位允许改变二者之间的顺序");
				player.handCard.push(kuicetianji);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(kuicetianji);
				}
			} else if (cardNumber == 43 || cardNumber == 44) {
				var toudao=new createAdvHandCardImageView(string_handCardNameToudao,
						cardNumber,resPng.toudao_png,CARDTYPE.SKILLCARD, 
						"【"+string_handCardNameToudao+
				"】您抽取任意玩家的1张手牌");
				player.handCard.push(toudao);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(toudao);
				}
			} else if (cardNumber == 45 || cardNumber == 46) {
				var wuqichaoyuan=new createAdvHandCardImageView(string_handCardNameWuqichaoyuan,
						cardNumber,resPng.wuqichaoyuan_png,CARDTYPE.SKILLCARD, 
						"【"+string_handCardNameWuqichaoyuan+
				"】我方全体HP+1;典当:您的技牌阶段，可以弃掉此牌，补1张牌");
				player.handCard.push(wuqichaoyuan);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(wuqichaoyuan);
				}
			} else if (cardNumber == 47) {
				var mojian=new createAdvHandCardImageView(string_handCardNameMojian,
						cardNumber,resPng.mojian_png,CARDTYPE.ARMCARD, 
						"【"+string_handCardNameMojian+
						"】命中+1;典当：您的技牌阶段，可以放弃"+
						string_handCardNameMojian+"（是否装备均可），之后您补2张牌");
				player.handCard.push(mojian);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(mojian);
				}
			} else if (cardNumber == 48) {
				var caihuan=new createAdvHandCardImageView(string_handCardNameCaihuan,
						cardNumber,resPng.caihuan_png,CARDTYPE.ARMCARD, 
						"【"+string_handCardNameCaihuan+	"】命中+2");
				player.handCard.push(caihuan);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(caihuan);
				}
			} else if (cardNumber == 49) {
				var tianzha=new createAdvHandCardImageView(string_handCardNameModaotianzha,
						cardNumber,resPng.tianzha_png,CARDTYPE.ARMCARD, 
						"【"+string_handCardNameModaotianzha+"】战力+2");
				player.handCard.push(tianzha);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(tianzha);
				}
			} else if (cardNumber == 50) {
				var tianshezhang=new createAdvHandCardImageView(string_handCardNameTianshezhang,
						cardNumber,resPng.tianshezhang_png,CARDTYPE.ARMCARD, 
						"【"+string_handCardNameTianshezhang+"】战力+1装备"+
						string_handCardNameTianshezhang+"的角色，如果HP得到回复" +
				"（倾慕除外），HP回复额外+1");
				player.handCard.push(tianshezhang);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(tianshezhang);
				}
			} else if (cardNumber == 51) {
				var wuchenjian=new createAdvHandCardImageView(string_handCardNameWuchenjian,
						cardNumber,resPng.wuchenjian_png,CARDTYPE.ARMCARD, 
						"【"+string_handCardNameWuchenjian+"】战力+1，命中+1");
				player.handCard.push(wuchenjian);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(wuchenjian);
				}
			} else if (cardNumber == 52) {
				var tiandijifu=new createAdvHandCardImageView(string_handCardNameTiandijifu,
						cardNumber,resPng.tiandijifu_png,CARDTYPE.DEFENSECARD, 
						"【"+string_handCardNameTiandijifu+"】装备后，" +
				"您可将任意手牌当作【隐蛊】使用");
				player.handCard.push(tiandijifu);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(tiandijifu);
				}
			} else if (cardNumber == 53) {
				var qiankundaopao=new createAdvHandCardImageView(string_handCardNameQiankundaopao,
						cardNumber,resPng.qiankundaopao_png,CARDTYPE.DEFENSECARD, 
						"【"+string_handCardNameQiankundaopao+"】战力+1；装备后，" +
				"您免疫技牌导致的HP伤害");
				player.handCard.push(qiankundaopao);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(qiankundaopao);
				}
			} else if (cardNumber == 54) {
				var wucaixiayi=new createAdvHandCardImageView(string_handCardNameWucaixiayi,
						cardNumber,resPng.wucaixiayi_png,CARDTYPE.DEFENSECARD, 
						"【"+string_handCardNameWucaixiayi+"】战力+1爆发：装备后，您HP为0时，可丢弃" +
						string_handCardNameWucaixiayi+"复活并恢复2点HP");
				player.handCard.push(wucaixiayi);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(wucaixiayi);
				}
			} else if (cardNumber == 55) {
				var tayunxue=new createAdvHandCardImageView(string_handCardNameTayunxue,
						cardNumber,resPng.tayunxue_png,CARDTYPE.DEFENSECARD, 
						"【"+string_handCardNameTayunxue+"】命中+1爆发：装备后收到伤害时（倾慕除外）,您可丢弃" +
						string_handCardNameTayunxue+"，免疫本次伤害，并令HP回复1点");
				player.handCard.push(tayunxue);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(tayunxue);
				}
			} else if (cardNumber == 56) {
				var longhunzhankai=new createAdvHandCardImageView(string_handCardNameLonghunzhankai,
						cardNumber,resPng.longhunzhankai_png,CARDTYPE.DEFENSECARD, 
						"【"+string_handCardNameLonghunzhankai+"】装备后，您受到任何伤害（倾慕除外），HP损失降低1点，最低可降至0");
				player.handCard.push(longhunzhankai);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(longhunzhankai);
				}
			}else if(cardNumber==57){
				var soubaoshu=new createAdvHandCardImageView(string_handCardNameSoubaoshu,
						cardNumber,resPng.soubaoshu_png,CARDTYPE.SKILLCARD, 
						"【"+string_handCardNameSoubaoshu+"】您从手牌堆上方翻取5张牌，拿取其中的3张并任意分配。其余2张弃掉",true);
				player.handCard.push(soubaoshu);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(soubaoshu);
				}
			}else if(cardNumber==58){
				var jimushui=new createAdvHandCardImageView(string_handCardNameJimushui,
						cardNumber,resPng.jimushui_png,CARDTYPE.SKILLCARD, 
						"【"+string_handCardNameJimushui+"】您从怪物牌堆上方翻取3张牌，检视后弃掉其中的0～3张，其余放回怪物牌堆上方。可任意改变它们之间的顺序",true);
				player.handCard.push(jimushui);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(jimushui);
				}
			}else if(cardNumber==59){
				var tianjian=new createAdvHandCardImageView(string_handCardNameTianjian,
						cardNumber,resPng.tianjian_png,CARDTYPE.SKILLCARD, 
						"【"+string_handCardNameTianjian+"】您指定一名角色HP-4",true);
				player.handCard.push(tianjian);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(tianjian);
				}
			}else if(cardNumber>59&&cardNumber<62){
				var jiushen=new createAdvHandCardImageView(string_handCardNameJiushen,
						cardNumber,resPng.jiushen_png,CARDTYPE.FIGHTCARD, 
						"【"+string_handCardNameJiushen+"】您指定一方，本场战斗中战力+5.未参战亦可使用",true);
				player.handCard.push(jiushen);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(jiushen);
				}
			}else if(cardNumber==62){
				var xiukoujinxinzhou=new createAdvHandCardImageView(string_handCardNameXiukoujinxinzhou,
						cardNumber,resPng.xiukoujinxinzhou_png,CARDTYPE.FIGHTCARD, 
						"【"+string_handCardNameXiukoujinxinzhou+"】本场战斗未触发混战时使用。您从怪物牌弃牌堆中选择1张怪物牌或NPC牌，用其触发混战.未参战亦可使用",true);
				player.handCard.push(xiukoujinxinzhou);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(xiukoujinxinzhou);
				}
			}else if(cardNumber==63){
				var kaoya=new createAdvHandCardImageView(string_handCardNameKaoya,
						cardNumber,resPng.kaoya_png,CARDTYPE.FIGHTCARD, 
						"【"+string_handCardNameKaoya+"】您扣除自己的n点HP，本场战斗中您的战力增加，增加量=n*2.使用此牌后您至少要保留1点HP.本牌导致的伤害隐蛊、踏云靴无效",true);
				player.handCard.push(kaoya);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(kaoya);
				}
			}else if(cardNumber==64){
				var wulingjingxie=new createAdvHandCardImageView(string_handCardNameWulingjingxie,
						cardNumber,resPng.wulingjingxie_png,CARDTYPE.SPECIALCARD, 
						"【"+string_handCardNameWulingjingxie+"】当魔主翻开手牌后打出，本次魔主全部手牌无效",true);
				player.handCard.push(wulingjingxie);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(wulingjingxie);
				}
			}else if(cardNumber==65){
				var tianxiangxuminglu=new createAdvHandCardImageView(string_handCardNameTianxiangxuminglu,
						cardNumber,resPng.tianxiangxuminglu_png,CARDTYPE.SPECIALCARD, 
						"【"+string_handCardNameTianxiangxuminglu+"】您的技牌阶段使用，指定一人HP+5.当有玩家HP为0时使用，可令其复活并恢复5点HP.",true);
				player.handCard.push(tianxiangxuminglu);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(tianxiangxuminglu);
				}
			}else if(cardNumber==66){
				var huanmeihuazhou=new createAdvHandCardImageView(string_handCardNameHuanmeihuazhou,
						cardNumber,resPng.huanmeihuazhou_png,CARDTYPE.SPECIALCARD, 
						"【"+string_handCardNameHuanmeihuazhou+"】当有危机牌被翻出后打出，可令本张危机牌无效。之后，您从手牌弃牌堆中选择1张牌，加入您的手牌.\n技牌阶段打出，可弃掉一张场内的危机牌。之后，您从手牌弃牌堆中选择1张牌，加入您的手牌",true);
				player.handCard.push(huanmeihuazhou);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(huanmeihuazhou);
				}
			}else if(cardNumber==67){
				var shiziyaoshuo=new createAdvHandCardImageView(string_handCardNameShiziyaoshuo,
						cardNumber,resPng.shiziyaoshuo_png,CARDTYPE.ARMCARD, 
						"【"+string_handCardNameShiziyaoshuo+"】战力+1\n当您参战时，我方战力额外+2",true);
				player.handCard.push(shiziyaoshuo);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(shiziyaoshuo);
				}
			}else if(cardNumber==68){
				var tiangangdouyi=new createAdvHandCardImageView(string_handCardNameTiangangdouyi,
						cardNumber,resPng.tiangangdouyi_png,CARDTYPE.DEFENSECARD, 
						"【"+string_handCardNameTiangangdouyi+"】战力+1 命中+1\n此装备进入您的装备区时，您的HP回复到满值",true);
				player.handCard.push(tiangangdouyi);
				if (player._name==myControlPlayer._name) {
					handCardZone.pushBackCustomItem(tiangangdouyi);
				}
			}
		}
		tempCardList.push(player.handCard[player.handCard.length - 1]);
		if (isRandom && temp < count - 1) {
			cardNumber = 
				randHandCardNumber(game_HandCard_Start,	game_DropHandCard);
		}
	}
	if (tempCardList.length > 0 && canUseShanzei) {
		advSkillCharacters_JiangyunfanShanzei(player, tempCardList, callBack);
	}else if(callBack!=null){
		callBack();
	}
}

function advRandomGetHandCard(number){
	var handCard=null;
	if (number >= 1 && number <= 8) {
		handCard=new createAdvHandCardImageView(string_handCardNameTianxuanwuyin,
				number,resPng.tianxuanwuyin_png,CARDTYPE.FIGHTCARD, 
				"【"+string_handCardNameTianxuanwuyin+
		"】您指定一方本场战斗中战力+2未参战亦可使用");
	} else if (number >= 9 && number <= 13) {
		handCard=new createAdvHandCardImageView(string_handCardNameJincanwang,
				number,resPng.jincanwang_png,CARDTYPE.FIGHTCARD, 
				"【"+string_handCardNameJincanwang+
		"】本场战斗中您的战力+3参战并命中才会生效");
	} else if (number >= 14 && number <= 17) {
		handCard=new createAdvHandCardImageView(string_handCardNameDongmingbaojing,
				number,resPng.dongmingbaojing_png,CARDTYPE.SPECIALCARD, 
				"【"+string_handCardNameDongmingbaojing+
		"】任意玩家决定是否翻取怪物牌前使用，指定一名玩家翻取怪物牌堆顶上的一张，检视后放回原处");
	} else if (number >= 18 && number <= 21) {
		handCard=new createAdvHandCardImageView(string_handCardNameYingu,
				number,resPng.yingu_png,CARDTYPE.SPECIALCARD, 
				"【"+string_handCardNameYingu+
		"】抵消一次您自己收到的HP伤害（倾慕除外）");
	} else if (number >= 22 && number <= 24) {
		handCard=new createAdvHandCardImageView(string_handCardNameShuerguo,
				number,resPng.shuerguo_png,CARDTYPE.SKILLCARD, 
				"【"+string_handCardNameShuerguo+
		"】您指定一人补2张手牌");
	} else if (number >= 25 && number <= 27) {
		handCard=new createAdvHandCardImageView(string_handCardNameLinghuxiandan,
				number,resPng.linghuxiandan_png,CARDTYPE.SPECIALCARD, 
				"【"+string_handCardNameLinghuxiandan+
		"】您的技牌阶段使用，您自己的HP+2当有玩家HP为0时，可令其复活并恢复2点HP");
	} else if (number >= 28 && number <= 30) {
		handCard=new createAdvHandCardImageView(string_handCardNameBingxinjue,
				number,resPng.bingxinjue_png,CARDTYPE.SPECIALCARD, 
				"【"+string_handCardNameBingxinjue+
		"】任意玩家使用技牌、战牌、特殊牌时打出。可令当前打出的这张牌无效");
	} else if (number >= 31 && number <= 33) {
		handCard=new createAdvHandCardImageView(string_handCardNameTongqianbiao,
				number,resPng.tongqianbiao_png,CARDTYPE.SKILLCARD, 
				"【"+string_handCardNameTongqianbiao+
		"】弃掉任意玩家的1张手牌或装备");
	} else if (number >= 34 && number <= 36) {
		handCard=new createAdvHandCardImageView(string_handCardNameTianleipo,
				number,resPng.tianleipo_png,CARDTYPE.SKILLCARD, 
				"【"+string_handCardNameTianleipo+
		"】您指定一名玩家HP-2（此伤害为雷属性）");
	} else if (number == 37 || number == 38) {
		handCard=new createAdvHandCardImageView(string_handCardNameTiangangzhanqi,
				number,resPng.tiangangzhanqi_png,CARDTYPE.FIGHTCARD, 
				"【"+string_handCardNameTiangangzhanqi+
		"】本场战斗中您的战力（含装备、宠物）加倍。但对战牌、爆发等临时增加的战力无效参战并命中才会生效");
	} else if (number == 39 || number == 40) {
		handCard=new createAdvHandCardImageView(string_handCardNameJinchantuoqiao,
				number,resPng.jinchantuoqiao_png,CARDTYPE.FIGHTCARD, 
				"【"+string_handCardNameJinchantuoqiao+
		"】强制结束本场战斗，胜利条件、失败条件皆无效参战者可使用，即使未命中");
	} else if (number == 41 || number == 42) {
		handCard=new createAdvHandCardImageView(string_handCardNameKuicetianji,
				number,resPng.kuicetianji_png,CARDTYPE.SKILLCARD, 
				"【"+string_handCardNameKuicetianji+
		"】您从怪物牌组顶端翻去两张怪牌，检视后放回原位允许改变二者之间的顺序");
	} else if (number == 43 || number == 44) {
		handCard=new createAdvHandCardImageView(string_handCardNameToudao,
				number,resPng.toudao_png,CARDTYPE.SKILLCARD, 
				"【"+string_handCardNameToudao+
		"】您抽取任意玩家的1张手牌");
	} else if (number == 45 || number == 46) {
		handCard=new createAdvHandCardImageView(string_handCardNameWuqichaoyuan,
				number,resPng.wuqichaoyuan_png,CARDTYPE.SKILLCARD, 
				"【"+string_handCardNameWuqichaoyuan+
		"】我方全体HP+1;典当:您的技牌阶段，可以弃掉此牌，补1张牌");
	} else if (number == 47) {
		handCard=new createAdvHandCardImageView(string_handCardNameMojian,
				number,resPng.mojian_png,CARDTYPE.ARMCARD, 
				"【"+string_handCardNameMojian+
				"】命中+1;典当：您的技牌阶段，可以放弃"+
				string_handCardNameMojian+"（是否装备均可），之后您补2张牌");
	} else if (number == 48) {
		handCard=new createAdvHandCardImageView(string_handCardNameCaihuan,
				number,resPng.caihuan_png,CARDTYPE.ARMCARD, 
				"【"+string_handCardNameCaihuan+	"】命中+2");
	} else if (number == 49) {
		handCard=new createAdvHandCardImageView(string_handCardNameModaotianzha,
				number,resPng.tianzha_png,CARDTYPE.ARMCARD, 
				"【"+string_handCardNameModaotianzha+"】战力+2");
	} else if (number == 50) {
		handCard=new createAdvHandCardImageView(string_handCardNameTianshezhang,
				number,resPng.tianshezhang_png,CARDTYPE.ARMCARD, 
				"【"+string_handCardNameTianshezhang+"】战力+1装备"+
				string_handCardNameTianshezhang+"的角色，如果HP得到回复" +
		"（倾慕除外），HP回复额外+1");
	} else if (number == 51) {
		handCard=new createAdvHandCardImageView(string_handCardNameWuchenjian,
				number,resPng.wuchenjian_png,CARDTYPE.ARMCARD, 
				"【"+string_handCardNameWuchenjian+"】战力+1，命中+1");
	} else if (number == 52) {
		handCard=new createAdvHandCardImageView(string_handCardNameTiandijifu,
				number,resPng.tiandijifu_png,CARDTYPE.DEFENSECARD, 
				"【"+string_handCardNameTiandijifu+"】装备后，" +
		"您可将任意手牌当作【隐蛊】使用");
	} else if (number == 53) {
		handCard=new createAdvHandCardImageView(string_handCardNameQiankundaopao,
				number,resPng.qiankundaopao_png,CARDTYPE.DEFENSECARD, 
				"【"+string_handCardNameQiankundaopao+"】战力+1；装备后，" +
		"您免疫技牌导致的HP伤害");
	} else if (number == 54) {
		handCard=new createAdvHandCardImageView(string_handCardNameWucaixiayi,
				number,resPng.wucaixiayi_png,CARDTYPE.DEFENSECARD, 
				"【"+string_handCardNameWucaixiayi+"】战力+1爆发：装备后，您HP为0时，可丢弃" +
				string_handCardNameWucaixiayi+"复活并恢复2点HP");
	} else if (number == 55) {
		handCard=new createAdvHandCardImageView(string_handCardNameTayunxue,
				number,resPng.tayunxue_png,CARDTYPE.DEFENSECARD, 
				"【"+string_handCardNameTayunxue+"】命中+1爆发：装备后收到伤害时（倾慕除外）,您可丢弃" +
				string_handCardNameTayunxue+"，免疫本次伤害，并令HP回复1点");
	} else if (number == 56) {
		handCard=new createAdvHandCardImageView(string_handCardNameLonghunzhankai,
				number,resPng.longhunzhankai_png,CARDTYPE.DEFENSECARD, 
				"【"+string_handCardNameLonghunzhankai+"】装备后，您受到任何伤害（倾慕除外），HP损失降低1点，最低可降至0");
	}else if(number==57){
		handCard=new createAdvHandCardImageView(string_handCardNameSoubaoshu,
				number,resPng.soubaoshu_png,CARDTYPE.SKILLCARD, 
				"【"+string_handCardNameSoubaoshu+"】您从手牌堆上方翻取5张牌，拿取其中的3张并任意分配。其余2张弃掉",true);
	}else if(number==58){
		handCard=new createAdvHandCardImageView(string_handCardNameJimushui,
				number,resPng.jimushui_png,CARDTYPE.SKILLCARD, 
				"【"+string_handCardNameJimushui+"】您从怪物牌堆上方翻取3张牌，检视后弃掉其中的0～3张，其余放回怪物牌堆上方.可任意改变它们之间的顺序",true);
	}else if(number==59){
		handCard=new createAdvHandCardImageView(string_handCardNameTianjian,
				number,resPng.tianjian_png,CARDTYPE.SKILLCARD, 
				"【"+string_handCardNameTianjian+"】您指定一名角色HP-4",true);
	}else if(number>59&&number<62){
		handCard=new createAdvHandCardImageView(string_handCardNameJiushen,
				number,resPng.jiushen_png,CARDTYPE.FIGHTCARD, 
				"【"+string_handCardNameJiushen+"】您指定一方，本场战斗中战力+5.未参战亦可使用",true);
	}else if(number==62){
		handCard=new createAdvHandCardImageView(string_handCardNameXiukoujinxinzhou,
				number,resPng.xiukoujinxinzhou_png,CARDTYPE.FIGHTCARD, 
				"【"+string_handCardNameXiukoujinxinzhou+"】本场战斗未触发混战时使用.您从怪物牌弃牌堆中选择1张怪物牌或NPC牌，用其触发混战.未参战亦可使用",true);
	}else if(number==63){
		handCard=new createAdvHandCardImageView(string_handCardNameKaoya,
				number,resPng.kaoya_png,CARDTYPE.FIGHTCARD, 
				"【"+string_handCardNameKaoya+"】您扣除自己的n点HP，本场战斗中您的战力增加，增加量=n*2.使用此牌后您至少要保留1点HP.本牌导致的伤害隐蛊、踏云靴无效",true);
	}else if(number==64){
		handCard=new createAdvHandCardImageView(string_handCardNameWulingjingxie,
				number,resPng.wulingjingxie_png,CARDTYPE.SPECIALCARD, 
				"【"+string_handCardNameWulingjingxie+"】当魔主翻开手牌后打出，本次魔主全部手牌无效",true);
	}else if(number==65){
		handCard=new createAdvHandCardImageView(string_handCardNameTianxiangxuminglu,
				number,resPng.tianxiangxuminglu_png,CARDTYPE.SPECIALCARD, 
				"【"+string_handCardNameTianxiangxuminglu+"】您的技牌阶段使用，指定一人HP+5.当有玩家HP为0时使用，可令其复活并恢复5点HP.",true);
	}else if(number==66){
		handCard=new createAdvHandCardImageView(string_handCardNameHuanmeihuazhou,
				number,resPng.huanmeihuazhou_png,CARDTYPE.SPECIALCARD, 
				"【"+string_handCardNameHuanmeihuazhou+"】当有危机牌被翻出后打出，可令本张危机牌无效.之后，您从手牌弃牌堆中选择1张牌，加入您的手牌.\n技牌阶段打出，可弃掉一张场内的危机牌。之后，您从手牌弃牌堆中选择1张牌，加入您的手牌",true);
	}else if(number==67){
		handCard=new createAdvHandCardImageView(string_handCardNameShiziyaoshuo,
				number,resPng.shiziyaoshuo_png,CARDTYPE.ARMCARD, 
				"【"+string_handCardNameShiziyaoshuo+"】战力+1\n当您参战时，我方战力额外+2",true);
	}else if(number==68){
		handCard=new createAdvHandCardImageView(string_handCardNameTiangangdouyi,
				number,resPng.tiangangdouyi_png,CARDTYPE.DEFENSECARD, 
				"【"+string_handCardNameTiangangdouyi+"】战力+1 命中+1\n此装备进入您的装备区时，您的HP回复到满值",true);
	}
	return handCard;
}

//挑选本关想要加入的【成长牌】效果
function initGropCard(callBack){
	var tempNumber=[57,58,59,60,61,62,63,64,65,66];
	var tempList=[];
	for(var i=0;i<tempNumber.length;i++){
		tempList.push(advRandomGetHandCard(tempNumber[i]));
	}
	if(haveTiangangdouyi=="true"){
		game_HandCard_Start.push(68);
	}
	if(haveShiziyaoshuo=="true"){
		game_HandCard_Start.push(67);
	}
	game_HandCard_Start.sort(function(){ return 0.5 - Math.random() }) ;
	if(nowStage.stageCanUseGrowUpCard>0){
		addDialog(mainScene, new selectCardDialogLayer("请选择本关要使用的成长牌(共"+nowStage.stageCanUseGrowUpCard+"张)",
				tempList,nowStage.stageCanUseGrowUpCard,nowStage.stageCanUseGrowUpCard,false,function(selectCards){
			for(var i=0;i<selectCards.length;i++){
				game_HandCard_Start.push(selectCards[i].cardID);
			}
			game_HandCard_Start.sort(function(){ return 0.5 - Math.random() }) ;
			callBack();
		}));
	}else{
		callBack();
	}
}

//player2:装备的新主人
function advPlayer1GetPlayer2Equment(nowPlayer,equmentName){
	equmentName=equmentName.replaceAll("(扣置)");
	if (equmentName==string_handCardNameMojian
	/*||equmentName==string_handCardNameMojian+"(扣置)"*/) {
		//newHandCard(47,nowPlayer, 1, false);
		advAddHandCard([nowPlayer],nowPlayer,nowPlayer,47,[1],false,false);
	} else if (equmentName==string_handCardNameWuchenjian
	/*||equmentName==string_handCardNameWuchenjian+"(扣置)"*/) {
		//newHandCard(51,nowPlayer, 1, false);
		advAddHandCard([nowPlayer],nowPlayer,nowPlayer,51,[1],false,false);
	} else if (equmentName==string_handCardNameTianshezhang
	/*||equmentName==string_handCardNameTianshezhang+"(扣置)"*/) {
		//newHandCard(50,nowPlayer, 1, false);
		advAddHandCard([nowPlayer],nowPlayer,nowPlayer,50,[1],false,false);
	} else if (equmentName==string_handCardNameCaihuan
	/*||equmentName==string_handCardNameCaihuan+"(扣置)"*/) {
		//newHandCard(48,nowPlayer, 1, false);
		advAddHandCard([nowPlayer],nowPlayer,nowPlayer,48,[1],false,false);
	} else if (equmentName==string_handCardNameModaotianzha
	/*||equmentName==string_handCardNameModaotianzha+"(扣置)"*/) {
		//newHandCard(49,nowPlayer, 1, false);
		advAddHandCard([nowPlayer],nowPlayer,nowPlayer,49,[1],false,false);
	}else if (equmentName==string_handCardNameQiankundaopao
	/*||equmentName==string_handCardNameQiankundaopao+"(扣置)"*/) {
		//newHandCard(53,nowPlayer, 1, false);
		advAddHandCard([nowPlayer],nowPlayer,nowPlayer,53,[1],false,false);
	} else if (equmentName==string_handCardNameTiandijifu
	/*||equmentName==string_handCardNameTiandijifu+"(扣置)"*/){
		//newHandCard(52,nowPlayer, 1, false, true);
		advAddHandCard([nowPlayer],nowPlayer,nowPlayer,52,[1],false,false);
	}
	else if (equmentName==string_handCardNameLonghunzhankai
	/*||equmentName==string_handCardNameLonghunzhankai+"(扣置)"*/){
		//newHandCard(56,nowPlayer, 1, false, true);
		advAddHandCard([nowPlayer],nowPlayer,nowPlayer,56,[1],false,false);
	}
	else if (equmentName==string_handCardNameWucaixiayi
	/*||equmentName==string_handCardNameWucaixiayi+"(扣置)"*/) {
		//newHandCard(54,nowPlayer, 1, false, true);
		advAddHandCard([nowPlayer],nowPlayer,nowPlayer,54,[1],false,false);
	} else if (equmentName==string_handCardNameTayunxue
	/*||equmentName==string_handCardNameTayunxue+"(扣置)"*/) {
		//newHandCard(55,nowPlayer, 1, false, true);
		advAddHandCard([nowPlayer],nowPlayer,nowPlayer,55,[1],false,false);
	}
}

function advTopMonsterCard(number) {
	var monster = null;
	if (number == 0) {
		monster = new YelingMonster(number);
	} else if (number == 1) {
		monster=new AdvAnxiangMonster(number);
	} else if (number == 2) {
		monster=new AdvGoumangMonster(number);
	} else if (number == 3) {
		monster=new AdvDiejingMonster(number);
	} else if (number == 4) {
		monster=new AdvJiliangyinzheMonster(number);
	} else if (number == 5) {
		monster=new AdvChiguiwangMonster(number);
	} else if (number == 6) {
		monster=new AdvDuniangziMonster(number);
	} else if (number == 7) {
		monster=new AdvXiejianxianMonster(number);
	} else if (number == 8) {
		monster=new AdvQianbeibuzuiMonster(number);
	} else if (number == 9) {
		monster=new AdvWudushouMonster(number);
	} else if (number == 10) {
		monster=new AdvSheyaonanMonster(number);
	} else if (number == 11) {
		monster=new AdvShuimoshouMonster(number);
	} else if (number == 12) {
		monster=new AdvYanyueMonster(number);
	} else if (number == 13) {
		monster=new AdvFeifeiMonster(number);
	} else if (number == 14) {
		monster=new AdvHuyaonvMonster(number);
	} else if (number == 15) {
		monster=new AdvRongyanshouwangMonster(number);
	} else if (number == 16) {
		monster=new AdvJinchanguimuMonster(number);
	} else if (number == 17) {
		monster=new AdvXuanguiMonster(number);
	} else if (number == 18) {
		monster=new AdvXingtianMonster(number);
	} else if (number == 19) {
		monster=new AdvTianguihuangMonster(number);
	} else if (number == 20) {
		monster=new Npc(nameLixiaoyao,1,4,"助战","加入",nameZhaolinger,nameLinyueru,nameAnu,nameZhaolingerMengshe,resPng.npc_xiaoyao_png,number);
	} else if (number == 21) {
		monster=new Npc(nameZhaolinger,2,3,"助战","加入",nameLixiaoyao,"无", "无", "无",resPng.npc_zhaolinger_png,number);
	} else if (number == 22) {
		monster=new Npc(nameZhaolingerMengshe,25,4,"助战","驯化",nameLixiaoyao,"无", "无", "无",resPng.npc_mengshe_png,number);
	} else if (number == 23) {
		monster=new Npc(nameLinyueru,3,2,"交易","加入",nameLixiaoyao,"无", "无", "无",resPng.npc_yueru_png,number);
	} else if (number == 24) {
		monster=new Npc(nameAnu,4,4,"助战","加入","无","无", "无", "无",resPng.npc_anu_png,number);
	} else if (number == 25) {
		monster=new Npc(nameJiujianxian,5,5,"传功","加入","无","无", "无", "无",resPng.npc_jiujianxian_png,number);
	} else if (number == 26) {
		monster=new Npc(nameBaiyuejiaozhu,6,3,"驯化","加入","无","无", "无", "无",resPng.npc_baiyue_png,number);
	} else if (number == 27) {
		monster=new Npc(nameWangxiaohu,7,2,"修炼","加入",nameSumei,nameShenqishuang, "无", "无",resPng.npc_wangxiaohu_png,number);
	} else if (number == 28) {
		monster=new Npc(nameSumei,8,3,"袭击","加入",nameWangxiaohu,"无", "无", "无",resPng.npc_sumei_png,number);
	} else if (number == 29) {
		monster=new Npc(nameShenqishuang,9,3,"治疗","加入",nameWangxiaohu,"无", "无", "无",resPng.npc_shengqishuang_png,number);
	} else if (number == 30) {
		monster=new Npc(nameKonglin,10,4,"袭击","加入","无","无", "无", "无",resPng.npc_konglin_png,number);
	} else if (number == 31) {
		monster=new Npc(nameMozun,26,8,"袭击","传功","无","无", "无", "无",resPng.npc_mozun_png,number);
	} else if (number == 32) {
		monster=new Npc(nameTangxuejian,11,2,"交易","加入","景天","无", "无", "无",resPng.npc_xuejian_png,number);
	} else if (number == 33) {
		monster=new Npc(nameZixuan,12,3,"治疗","加入",nameChonglou,"徐长卿", "无", "无",resPng.npc_zixuan_png,number);
	} else if (number == 34) {
		monster=new Npc(nameChonglou,13,5,"助战","加入","无","无", "无", "无",resPng.npc_chonglou_png,number);
	} else if (number == 35) {
		monster=new Npc(nameNangonghuang,14,4,"驯化","加入",nameWenhui,nameWangpengxu, "无", "无",resPng.npc_nangonghuang_png,number);
	} else if (number == 36) {
		monster=new Npc(nameWenhui,15,2,"助战","加入",nameNangonghuang,"雷元戈", "无", "无",resPng.npc_wenhui_png,number);
	} else if (number == 37) {
		monster=new Npc(nameXingxuan,16,2,"治疗","加入",nameWangpengxu,"无", "无", "无",resPng.npc_xingxuan_png,number);
	} else if (number == 38) {
		monster=new Npc(nameWangpengxu,17,1,"治疗","加入",nameXingxuan,"无", "无", "无",resPng.npc_wangpengxu_png,number);
	} else if (number == 39) {
		monster=new Npc(nameYuntianhe,18,2,"助战","加入",nameHanlingsha,nameLiumengli, "无", "无",resPng.npc_tianhe_png,number);
	} else if (number == 40) {
		monster=new Npc(nameHanlingsha,19,2,"盗窃","加入",nameYuntianhe,"无", "无", "无",resPng.npc_lingsha_png,number);
	} else if (number == 41) {
		monster=new Npc(nameLiumengli,20,3,"驯化","加入",nameYuntianhe,"无", "无", "无",resPng.npc_mengli_png,number);
	} else if (number == 42) {
		monster=new Npc(nameMurongziying,21,4,"修炼","加入","无","无", "无", "无",resPng.npc_ziying_png,number);
	} else if (number == 43) {
		monster=new Npc(nameXuanxiao,22,5,"传功","加入","夙玉","无", "无", "无",resPng.npc_xuanxiao_png,number);
	} else if (number == 44) {
		monster=new Npc(nameLongyou,23,2,"助战","加入",nameXiaoman,"无", "无", "无",resPng.npc_longyou_png,number);
	} else if (number == 45) {
		monster=new Npc(nameXiaoman,24,1,"盗窃","加入","无","无", "无", "无",resPng.npc_xiaoman_png,number);
	}else if(number==46){
		monster=new AdvLingquan(number);
	}else if(number==47){
		monster=new AdvGuanyinmizhen(number);
	}else if(number==48){
		monster=new AdvTantadeqiongding(number);
	}else if(number==49){
		monster=new AdvZhefu(number);
	}else if(number==50){
		monster=new AdvXingfengxueyu(number);
	}else if(number==51){
		monster=new AdvMuhoudeyinmou(number);
	}else if(number==52){
		monster=new AdvHuayaoshui(number);
	}else if(number==53){
		monster=new AdvJushentiantu(number);
	}
	return monster;
}
