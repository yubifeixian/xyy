//初始化手牌
function initHandCardDeck(array) {
	// {/*天玄五音*/1,2,3,4,5,6,7,8,/*金蚕王*/9,10,11,12,13,/*洞冥宝镜*/14,15,16,17,/*隐蛊*/18,19,20,21,
	// /*鼠儿果*/22,23,24,/*灵葫仙丹*/25,26,27,/*冰心诀*/28,29,30,/*铜钱镖*/31,32,33,/*天雷破*/34,35,36,/*天罡战气*/37,38,
	// /*金蝉脱壳*/39,40,/*窥测天机*/41,42,/*偷盗*/43,44,/*五气朝元*/45,46,/*魔剑*/47,/*彩环*/48,/*魔刀天吒*/49,/*天蛇仗*/50,
	// /*无尘剑*/51,/*天帝祭服*/52,/*乾坤道袍*/53,/*五彩霞衣*/54,/*踏云靴*/55,/*龙魂战铠*/56};
	for (var i = 1; i < 57; i++){
		array.push(i);
		array.sort(function(){ return 0.5 - Math.random() }) ;
	}
	// 57,58,59 :永安当票
	//TODO *羲和*/60 /*望舒*/61
	for(var i=57;i<60;i++){
		array.push(i);
		array.sort(function(){ return 0.5 - Math.random() }) ;
	}
	
	
	return array;
}

// 补牌方法
function newHandCard(cardNumber, player, count,isRandom,canUseShanzei,callBack) {
	if (player.hp <= 0) {
		if(callBack!=null){
			callBack();
		}else{
			return;
		}
	}
	if(canUseShanzei&&player._name==nameJingtianSp){
		textAreaAddMessage("景天sp“鉴宝”效果触发，多补1张牌", myText, listView);
		count+=1;
	}
	var tempCardList = new Array();
	// 补牌动画
	mainScene.addChild(new AddCardAnimationLayer(player.hadImageView,count));
	for (var temp = 0; temp < count; temp++) {
		if (player.hp > 0) {
			if (cardNumber >= 1 && cardNumber <= 8) {
				var tianxuanwuyin=new createHandCardImageView(string_handCardNameTianxuanwuyin,
						cardNumber,"res/drawable-hdpi/tianxuanwuyin.png",CARDTYPE.FIGHTCARD, 
						"【"+string_handCardNameTianxuanwuyin+
				"】您指定一方本场战斗中战力+2未参战亦可使用");
				player.handCard.push(tianxuanwuyin);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(tianxuanwuyin);
				}
			} else if (cardNumber >= 9 && cardNumber <= 13) {
				var jincanwang=new createHandCardImageView(string_handCardNameJincanwang,
						cardNumber,"res/drawable-hdpi/jincanwang.png",CARDTYPE.FIGHTCARD, 
						"【"+string_handCardNameJincanwang+
				"】本场战斗中您的战力+3参战并命中才会生效");
				player.handCard.push(jincanwang);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(jincanwang);
				}
			} else if (cardNumber >= 14 && cardNumber <= 17) {
				var dongmingbaojing=new createHandCardImageView(string_handCardNameDongmingbaojing,
						cardNumber,"res/drawable-hdpi/dongmingbaojing.png",CARDTYPE.SPECIALCARD, 
						"【"+string_handCardNameDongmingbaojing+
				"】任意玩家决定是否翻取怪物牌前使用，指定一名玩家翻取怪物牌堆顶上的一张，检视后放回原处");
				player.handCard.push(dongmingbaojing);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(dongmingbaojing);
				}
			} else if (cardNumber >= 18 && cardNumber <= 21) {
				var yingu=new createHandCardImageView(string_handCardNameYingu,
						cardNumber,"res/drawable-hdpi/yingu.png",CARDTYPE.SPECIALCARD, 
						"【"+string_handCardNameYingu+
				"】抵消一次您自己收到的HP伤害（倾慕除外）");
				player.handCard.push(yingu);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(yingu);
				}
			} else if (cardNumber >= 22 && cardNumber <= 24) {
				var shuerguo=new createHandCardImageView(string_handCardNameShuerguo,
						cardNumber,"res/drawable-hdpi/shuerguo.png",CARDTYPE.SKILLCARD, 
						"【"+string_handCardNameShuerguo+
				"】您指定一人补2张手牌");
				player.handCard.push(shuerguo);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(shuerguo);
				}
			} else if (cardNumber >= 25 && cardNumber <= 27) {
				var linghuxiandan=new createHandCardImageView(string_handCardNameLinghuxiandan,
						cardNumber,"res/drawable-hdpi/linghuxiandan.png",CARDTYPE.SPECIALCARD, 
						"【"+string_handCardNameLinghuxiandan+
				"】您的技牌阶段使用，您自己的HP+2,当有玩家HP为0时，可令其复活并恢复2点HP");
				player.handCard.push(linghuxiandan);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(linghuxiandan);
				}
			} else if (cardNumber >= 28 && cardNumber <= 30) {
				var bingxinjue=new createHandCardImageView(string_handCardNameBingxinjue,
						cardNumber,"res/drawable-hdpi/bingxinjue.png",CARDTYPE.SPECIALCARD, 
						"【"+string_handCardNameBingxinjue+
				"】任意玩家使用技牌、战牌、特殊牌时打出。可令当前打出的这张牌无效");
				player.handCard.push(bingxinjue);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(bingxinjue);
				}
			} else if (cardNumber >= 31 && cardNumber <= 33) {
				var tongqianbiao=new createHandCardImageView(string_handCardNameTongqianbiao,
						cardNumber,"res/drawable-hdpi/tongqianbiao.png",CARDTYPE.SKILLCARD, 
						"【"+string_handCardNameTongqianbiao+
				"】弃掉任意玩家的1张手牌或装备");
				player.handCard.push(tongqianbiao);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(tongqianbiao);
				}
			} else if (cardNumber >= 34 && cardNumber <= 36) {
				var tianleipo=new createHandCardImageView(string_handCardNameTianleipo,
						cardNumber,"res/drawable-hdpi/tianleipo.png",CARDTYPE.SKILLCARD, 
						"【"+string_handCardNameTianleipo+
				"】您指定一名玩家HP-2（此伤害为雷属性）");
				player.handCard.push(tianleipo);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(tianleipo);
				}
			} else if (cardNumber == 37 || cardNumber == 38) {
				var tiangangzhanqi=new createHandCardImageView(string_handCardNameTiangangzhanqi,
						cardNumber,"res/drawable-hdpi/tiangangzhanqi.png",CARDTYPE.FIGHTCARD, 
						"【"+string_handCardNameTiangangzhanqi+
				"】本场战斗中您的战力（含装备、宠物）加倍。但对战牌、爆发等临时增加的战力无效参战并命中才会生效");
				player.handCard.push(tiangangzhanqi);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(tiangangzhanqi);
				}
			} else if (cardNumber == 39 || cardNumber == 40) {
				var jinchantuoqiao=new createHandCardImageView(string_handCardNameJinchantuoqiao,
						cardNumber,"res/drawable-hdpi/jinchantuoqiao.png",CARDTYPE.FIGHTCARD, 
						"【"+string_handCardNameJinchantuoqiao+
				"】强制结束本场战斗，胜利条件、失败条件皆无效参战者可使用，即使未命中");
				player.handCard.push(jinchantuoqiao);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(jinchantuoqiao);
				}
			} else if (cardNumber == 41 || cardNumber == 42) {
				var kuicetianji=new createHandCardImageView(string_handCardNameKuicetianji,
						cardNumber,"res/drawable-hdpi/kuicetianji.png",CARDTYPE.SKILLCARD, 
						"【"+string_handCardNameKuicetianji+
				"】您从怪物牌组顶端翻去两张怪牌，检视后放回原位允许改变二者之间的顺序");
				player.handCard.push(kuicetianji);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(kuicetianji);
				}
			} else if (cardNumber == 43 || cardNumber == 44) {
				var toudao=new createHandCardImageView(string_handCardNameToudao,
						cardNumber,"res/drawable-hdpi/toudao.png",CARDTYPE.SKILLCARD, 
						"【"+string_handCardNameToudao+
				"】您抽取任意玩家的1张手牌");
				player.handCard.push(toudao);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(toudao);
				}
			} else if (cardNumber == 45 || cardNumber == 46) {
				var wuqichaoyuan=new createHandCardImageView(string_handCardNameWuqichaoyuan,
						cardNumber,"res/drawable-hdpi/wuqichaoyuan.png",CARDTYPE.SKILLCARD, 
						"【"+string_handCardNameWuqichaoyuan+
				"】我方全体HP+1;典当:您的技牌阶段，可以弃掉此牌，补1张牌");
				player.handCard.push(wuqichaoyuan);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(wuqichaoyuan);
				}
			} else if (cardNumber == 47) {
				var mojian=new createHandCardImageView(string_handCardNameMojian,
						cardNumber,"res/drawable-hdpi/mojian.png",CARDTYPE.ARMCARD, 
						"【"+string_handCardNameMojian+
						"】命中+1;典当：您的技牌阶段，可以放弃"+
						string_handCardNameMojian+"（是否装备均可），之后您补2张牌");
				player.handCard.push(mojian);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(mojian);
				}
			} else if (cardNumber == 48) {
				var caihuan=new createHandCardImageView(string_handCardNameCaihuan,
						cardNumber,"res/drawable-hdpi/caihuan.png",CARDTYPE.ARMCARD, 
						"【"+string_handCardNameCaihuan+	"】命中+2");
				player.handCard.push(caihuan);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(caihuan);
				}
			} else if (cardNumber == 49) {
				var tianzha=new createHandCardImageView(string_handCardNameModaotianzha,
						cardNumber,"res/drawable-hdpi/tianzha.png",CARDTYPE.ARMCARD, 
						"【"+string_handCardNameModaotianzha+"】战力+2");
				player.handCard.push(tianzha);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(tianzha);
				}
			} else if (cardNumber == 50) {
				var tianshezhang=new createHandCardImageView(string_handCardNameTianshezhang,
						cardNumber,"res/drawable-hdpi/tianshezhang.png",CARDTYPE.ARMCARD, 
						"【"+string_handCardNameTianshezhang+"】战力+1装备"+
						string_handCardNameTianshezhang+"的角色，如果HP得到回复" +
				"（倾慕除外），HP回复额外+1");
				player.handCard.push(tianshezhang);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(tianshezhang);
				}
			} else if (cardNumber == 51) {
				var wuchenjian=new createHandCardImageView(string_handCardNameWuchenjian,
						cardNumber,"res/drawable-hdpi/wuchenjian.png",CARDTYPE.ARMCARD, 
						"【"+string_handCardNameWuchenjian+"】战力+1，命中+1");
				player.handCard.push(wuchenjian);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(wuchenjian);
				}
			} else if (cardNumber == 52) {
				var tiandijifu=new createHandCardImageView(string_handCardNameTiandijifu,
						cardNumber,"res/drawable-hdpi/tiandijifu.png",CARDTYPE.DEFENSECARD, 
						"【"+string_handCardNameTiandijifu+"】装备后，" +
				"您可将任意手牌当作【隐蛊】使用");
				player.handCard.push(tiandijifu);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(tiandijifu);
				}
			} else if (cardNumber == 53) {
				var qiankundaopao=new createHandCardImageView(string_handCardNameQiankundaopao,
						cardNumber,"res/drawable-hdpi/qiankundaopao.png",CARDTYPE.DEFENSECARD, 
						"【"+string_handCardNameQiankundaopao+"】战力+1；装备后，" +
				"您免疫技牌导致的HP伤害");
				player.handCard.push(qiankundaopao);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(qiankundaopao);
				}
			} else if (cardNumber == 54) {
				var wucaixiayi=new createHandCardImageView(string_handCardNameWucaixiayi,
						cardNumber,"res/drawable-hdpi/wucaixiayi.png",CARDTYPE.DEFENSECARD, 
						"【"+string_handCardNameWucaixiayi+"】战力+1爆发：装备后，您HP为0时，可丢弃" +
						string_handCardNameWucaixiayi+"复活并恢复2点HP");
				player.handCard.push(wucaixiayi);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(wucaixiayi);
				}
			} else if (cardNumber == 55) {
				var tayunxue=new createHandCardImageView(string_handCardNameTayunxue,
						cardNumber,"res/drawable-hdpi/tayunxue.png",CARDTYPE.DEFENSECARD, 
						"【"+string_handCardNameTayunxue+"】命中+1爆发：装备后收到伤害时（倾慕除外）,您可丢弃" +
						string_handCardNameTayunxue+"，免疫本次伤害，并令HP回复1点");
				player.handCard.push(tayunxue);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(tayunxue);
				}
			} else if (cardNumber == 56) {
				var longhunzhankai=new createHandCardImageView(string_handCardNameLonghunzhankai,
						cardNumber,"res/drawable-hdpi/longhunzhankai.png",CARDTYPE.DEFENSECARD, 
						"【"+string_handCardNameLonghunzhankai+"】装备后，您受到任何伤害（倾慕除外），HP损失降低1点，最低可降至0");
				player.handCard.push(longhunzhankai);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(longhunzhankai);
				}
			}else if(cardNumber>=57&&cardNumber<=59){
				var yongandangpiao=new createHandCardImageView(string_handCardNameYongandangpiao,
						cardNumber,"res/drawable-hdpi/yongandangpiao.png",CARDTYPE.SKILLCARD, 
						"【"+string_handCardNameYongandangpiao+"】我方全体各补1张手牌");
				player.handCard.push(yongandangpiao);
				if (player._name==player1._name) {
					handCardZone.pushBackCustomItem(yongandangpiao);
				}
			}else if(cardNumber==60){
				var xihe=new createHandCardImageView(string_handCardNameXihe,cardNumber,"res/drawable-hdpi/xihejian.jpg",CARDTYPE.ARMCARD,
						"【"+string_handCardNameXihe+"】战力+2，场上有望舒被装备时，羲和额外获得命中+2的数值");
				player.handCard.push(xihe);
				if(player._name==player1._name){
					handCardZone.pushBackCustomItem(xihe);
				}
			}else if(cardNumber==61){
				var wangshu=new createHandCardImageView(string_handCardNameWangshu,cardNumber,"res/drawable-hdpi/wangshujian.jpg",CARDTYPE.ARMCARD,
						"【"+string_handCardNameWangshu+"】命中+2，场上有羲和被装备时，望舒额外获得战力+2的数值");
				player.handCard.push(wangshu);
				if(player._name==player1._name){
					handCardZone.pushBackCustomItem(wangshu);
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
		skillCharacters_JingtianSpJianbao(player, tempCardList, function(resultCardList){
			skillCharacters_JiangyunfanShanzei(player, resultCardList, callBack);
		});
	}else if(callBack!=null){
		callBack();
	}
}

// 初始化事件牌
function initEventCardDeck() {
	// /*误闯神魔之隙*/1,/*大军围蜀山*/2,/*深入将军冢*/3,/*寻找天使绘卷*/4,/*闯荡试练窟*/5,6,/*仙灵岛的邂逅*/7,8,
	// /*走出圣姑小屋*/9,10,/*绝世美味的诞生*/11,/*神树与夕瑶*/12,13,/*拜访石沉溪洞*/14,15,/*三世轮回*/16,17,
	// /*束缚幻冥界*/18,/*封印锁妖塔*/19,/*破除禁咒空间*/20
	for (var i = 0; i < 20; i++)
		game_EventCardDeck.push(i + 1);
	return game_EventCardDeck;
}

function askChuangdangshilianku(startPlayer,nowAskPlayer,cardList,callBack){
	var nowAskPlayerNumber=0;
	for(var i=0;i<nowPlayerTerm.length;i++){
		if(nowPlayerTerm[i]._name==nowAskPlayer._name){
			nowAskPlayerNumber=i;
			break;
		}
	}
	nowAskPlayerNumber++;
	nowAskPlayerNumber%=nowPlayerTerm.length;
	var nextAskPlayer=nowPlayerTerm[nowAskPlayerNumber];
	if(nowAskPlayer._name==player1._name||nowAskPlayer._name==player2._name){
		addDialog(mainScene, new selectCardDialogLayer("请选择需要的牌",cardList,1,1,false,function(result){
				var selectCard=result.pop();
				addDialog(mainScene, new selectPlayerDialogLayer(true,true, true, true,
						"请选择要分配的角色", false, false,function(player){
					player.handCard.push(selectCard);
					cardList.removeObject(selectCard);
					if(player._name==player1._name){
						handCardZone.pushBackCustomItem(selectCard);
					}
					textAreaAddMessage(player._name+"获得卡牌"+selectCard.name, myText, listView);
					if(nextAskPlayer._name!=startPlayer._name){
						askChuangdangshilianku(startPlayer, nextAskPlayer, cardList,callBack);
					}else{
						callBack();
					}
				}));
		}));
	}else{
		// 敌方AI分配牌
		var selectPlayer=nowAskPlayer;
		var selectNumber = parseInt(Math.random()*cardList.length, 10);
		var tempCard = cardList[selectNumber];
		if (selectPlayer.hp <= 0) {
			selectPlayer = selectPlayer.friendList[1];
		}
		selectPlayer.handCard.push(tempCard);
		textAreaAddMessage(selectPlayer._name+"获得卡牌"+tempCard.name, myText, listView);
		cardList.removeObject(tempCard);
		if(nextAskPlayer._name!=startPlayer._name){
			askChuangdangshilianku(startPlayer, nextAskPlayer, cardList,callBack);
		}else{
			callBack();
		}
	}
}
function sanshilunhuiHandle(startPlayer,nowPlayer,callBack){
	var nextPlayerNumber=0;
	for(var i=0;i<nowPlayerTerm.length;i++){
		if(nowPlayerTerm[i]._name==nowPlayer._name){
			nextPlayerNumber=i;
			break;
		}
	}
	nextPlayerNumber++;
	nextPlayerNumber%=nowPlayerTerm.length;
	var nextPlayer=nowPlayerTerm[nextPlayerNumber];
	var number=nowPlayer.handCard.length;
	if(nowPlayer.hp<=0||number==3){
		if(nextPlayer._name!=startPlayer._name){
			sanshilunhuiHandle(startPlayer, nextPlayer,callBack);
		}else{
			callBack();
		}
		return;
	}
	var count=Math.abs(number-3);
	if(number>3){
		if(nowPlayer._name==player1._name){
			addDialog(mainScene, new selectCardDialogLayer("请将手牌调整(弃置)至3张)",nowPlayer.handCard,count,count,false,function(result){
				for(var i=0;i<result.length;i++){
					remove_Card_Into_DropDeck(result[i].name);
					nowPlayer.handCard.removeObject(result[i]);
					result[i].removeFromParent();
					textAreaAddMessage(nowPlayer._name+"弃置了【"+result[i].name+"】", myText, listView);
				}
				if(nextPlayer._name!=startPlayer._name){
					sanshilunhuiHandle(startPlayer, nextPlayer,callBack);
				}else{
					callBack();
				}
			}));
		}else{
			// AI处理弃牌
			for (var x = 0; x < count; x++) {
				var number=parseInt(Math.random()*nowPlayer.handCard.length, 10);
				remove_Card_Into_DropDeck(nowPlayer.handCard[number].name);
				textAreaAddMessage(nowPlayer._name+"弃置了【"+nowPlayer.handCard[number].name+"】", myText, listView);
				nowPlayer.handCard.removeObject(nowPlayer.handCard[number]);
			}
			if(nextPlayer._name!=startPlayer._name){
				sanshilunhuiHandle(startPlayer, nextPlayer,callBack);
			}else{
				callBack();
			}
		}
	}else{
		textAreaAddMessage(nowPlayer._name+"需要补"+count+"张牌", myText, listView);
		addHandCard([nowPlayer],nowPlayer,nowPlayer,null,[count],
				true,true,function(){
			if(nextPlayer._name!=startPlayer._name){
				sanshilunhuiHandle(startPlayer, nextPlayer,callBack);
			}else{
				callBack();
			}
		});
	}
}

function event_Effect(cardNumber,callBack) {
	if (cardNumber == 1/* 误闯神魔之隙 */) {
		baseEventEffect_Wuchuangshenmozhixi(callBack);
	} else if (cardNumber == 2/* 大军围蜀山 */) {
		baseEventEffect_Dajunweishushan(callBack);
	} else if (cardNumber == 3/* 深入将军冢 */) {
		baseEventEffect_Shenrujiangjunzhong(callBack);
	} else if (cardNumber == 4/* 寻找天使绘卷 */) {
		baseEventEffect_Xunzhaotianshihuijuan(callBack);
	} else if (cardNumber == 5 || cardNumber == 6) {
		baseEventEffect_Chuangdangshilianku(callBack);
	} else if (cardNumber == 7 || cardNumber == 8) {
		baseEventEffect_Xianlingdaodexianhou(callBack);
	}else if (cardNumber == 9 || cardNumber == 10) {
		baseEventEffect_Zouchushengguxiaowu(callBack);
	} else if (cardNumber == 11) {
		baseEventEffect_Jueshimeiweidedansheng(callBack);
	} else if (cardNumber == 12 || cardNumber == 13) {
		baseEventEffect_Shenshuyuxiyao(callBack);
	}else if (cardNumber == 14 || cardNumber == 15) {
		baseEventEffect_Baifangshichenxidong(callBack);
	} else if (cardNumber == 16 || cardNumber == 17) {
		baseEventEffect_Sanshilunhui(callBack);
	} else if (cardNumber == 18) {
		baseEventEffect_Shufuhuanmingjie(callBack);
	} else if (cardNumber == 19) {
		baseEventEffect_Fengyinsuoyaota(callBack);
	} else if (cardNumber == 20) {
		baseEventEffect_Pochujinzhoukongjian(callBack);
	}
}

function equmentNameMappingCardInfo(equmentName){
	equmentName=equmentName.replaceAll("\\(扣置\\)");
	var _cardInfo={
			name:"",
			cardID:0,
			cardSrcID:0,
			cardType:0, 
			cardMessage:""
			
	};
	_cardInfo.name=equmentName;
	switch (equmentName) {
	case string_handCardNameMojian:
		_cardInfo.cardID=47;
		_cardInfo.cardSrcID="res/drawable-hdpi/mojian.png";
		_cardInfo.cardType=CARDTYPE.ARMCARD; 
		_cardInfo.cardMessage="【"+string_handCardNameMojian+
		"】命中+1;典当：您的技牌阶段，可以放弃"+
		string_handCardNameMojian+"（是否装备均可），之后您补2张牌";
		break;
	case string_handCardNameCaihuan:
		_cardInfo.cardID=48;
		_cardInfo.cardSrcID="res/drawable-hdpi/caihuan.png";
		_cardInfo.cardType=CARDTYPE.ARMCARD; 
		_cardInfo.cardMessage="【"+string_handCardNameCaihuan+	"】命中+2";
		break;
	case string_handCardNameModaotianzha:
		_cardInfo.cardID=49;
		_cardInfo.cardSrcID="res/drawable-hdpi/tianzha.png";
		_cardInfo.cardType=CARDTYPE.ARMCARD; 
		_cardInfo.cardMessage="【"+string_handCardNameModaotianzha+"】战力+2";
		break;
	case string_handCardNameTianshezhang:
		_cardInfo.cardID=50;
		_cardInfo.cardSrcID="res/drawable-hdpi/tianshezhang.png";
		_cardInfo.cardType=CARDTYPE.ARMCARD; 
		_cardInfo.cardMessage="【"+string_handCardNameTianshezhang+"】战力+1装备"+
		string_handCardNameTianshezhang+"的角色，如果HP得到回复" +
		"（倾慕除外），HP回复额外+1";
		break;
	case string_handCardNameWuchenjian:
		_cardInfo.cardID=51;
		_cardInfo.cardSrcID="res/drawable-hdpi/wuchenjian.png";
		_cardInfo.cardType=CARDTYPE.ARMCARD; 
		_cardInfo.cardMessage="【"+string_handCardNameWuchenjian+"】战力+1，命中+1";
		break;
	case string_handCardNameTiandijifu:
		_cardInfo.cardID=52;
		_cardInfo.cardSrcID="res/drawable-hdpi/tiandijifu.png";
		_cardInfo.cardType=CARDTYPE.DEFENSECARD; 
		_cardInfo.cardMessage="【"+string_handCardNameTiandijifu+"】装备后，" +
		"您可将任意手牌当作【隐蛊】使用";
		break;
	case string_handCardNameQiankundaopao:
		_cardInfo.cardID=53;
		_cardInfo.cardSrcID="res/drawable-hdpi/qiankundaopao.png";
		_cardInfo.cardType=CARDTYPE.DEFENSECARD; 
		_cardInfo.cardMessage="【"+string_handCardNameQiankundaopao+"】战力+1；装备后，" +
		"您免疫技牌导致的HP伤害";
		break;
	case string_handCardNameWucaixiayi:
		_cardInfo.cardID=54;
		_cardInfo.cardSrcID="res/drawable-hdpi/wucaixiayi.png";
		_cardInfo.cardType=CARDTYPE.DEFENSECARD; 
		_cardInfo.cardMessage="【"+string_handCardNameWucaixiayi+"】战力+1爆发：装备后，您HP为0时，可丢弃" +
		string_handCardNameWucaixiayi+"复活并恢复2点HP";
		break;
	case string_handCardNameTayunxue:
		_cardInfo.cardID=55;
		_cardInfo.cardSrcID="res/drawable-hdpi/tayunxue.png";
		_cardInfo.cardType=CARDTYPE.DEFENSECARD; 
		_cardInfo.cardMessage="【"+string_handCardNameTayunxue+"】命中+1爆发：装备后收到伤害时（倾慕除外）,您可丢弃" +
		string_handCardNameTayunxue+"，免疫本次伤害，并令HP回复1点";
		break;
	case string_handCardNameLonghunzhankai:
		_cardInfo.cardID=56;
		_cardInfo.cardSrcID="res/drawable-hdpi/longhunzhankai.png";
		_cardInfo.cardType=CARDTYPE.DEFENSECARD; 
		_cardInfo.cardMessage="【"+string_handCardNameLonghunzhankai+"】装备后，您受到任何伤害（倾慕除外），HP损失降低1点，最低可降至0";
		break;
	}
	return _cardInfo;
}

// player2:装备的新主人
function player1GetPlayer2Equment(nowPlayer,equmentName){
	/*equmentName=equmentName.replaceAll("\\(扣置\\)");
	if (equmentName==string_handCardNameMojian) {
		// newHandCard(47,nowPlayer, 1, false);
		addHandCard([nowPlayer],nowPlayer,nowPlayer,47,[1],false,false);
	} else if (equmentName==string_handCardNameWuchenjian
	 ||equmentName==string_handCardNameWuchenjian+"(扣置)" ) {
		// newHandCard(51,nowPlayer, 1, false);
		addHandCard([nowPlayer],nowPlayer,nowPlayer,51,[1],false,false);
	} else if (equmentName==string_handCardNameTianshezhang
	 ||equmentName==string_handCardNameTianshezhang+"(扣置)" ) {
		// newHandCard(50,nowPlayer, 1, false);
		addHandCard([nowPlayer],nowPlayer,nowPlayer,50,[1],false,false);
	} else if (equmentName==string_handCardNameCaihuan
	 ||equmentName==string_handCardNameCaihuan+"(扣置)" ) {
		// newHandCard(48,nowPlayer, 1, false);
		addHandCard([nowPlayer],nowPlayer,nowPlayer,48,[1],false,false);
	} else if (equmentName==string_handCardNameModaotianzha
	 ||equmentName==string_handCardNameModaotianzha+"(扣置)" ) {
		// newHandCard(49,nowPlayer, 1, false);
		addHandCard([nowPlayer],nowPlayer,nowPlayer,49,[1],false,false);
	}else if (equmentName==string_handCardNameQiankundaopao
	 ||equmentName==string_handCardNameQiankundaopao+"(扣置)" ) {
		// newHandCard(53,nowPlayer, 1, false);
		addHandCard([nowPlayer],nowPlayer,nowPlayer,53,[1],false,false);
	} else if (equmentName==string_handCardNameTiandijifu
	 ||equmentName==string_handCardNameTiandijifu+"(扣置)" ){
		// newHandCard(52,nowPlayer, 1, false, true);
		addHandCard([nowPlayer],nowPlayer,nowPlayer,52,[1],false,false);
	}
	else if (equmentName==string_handCardNameLonghunzhankai
	 ||equmentName==string_handCardNameLonghunzhankai+"(扣置)" ){
		// newHandCard(56,nowPlayer, 1, false, true);
		addHandCard([nowPlayer],nowPlayer,nowPlayer,56,[1],false,false);
	}
	else if (equmentName==string_handCardNameWucaixiayi
	 ||equmentName==string_handCardNameWucaixiayi+"(扣置)" ) {
		// newHandCard(54,nowPlayer, 1, false, true);
		addHandCard([nowPlayer],nowPlayer,nowPlayer,54,[1],false,false);
	} else if (equmentName==string_handCardNameTayunxue
	 ||equmentName==string_handCardNameTayunxue+"(扣置)" ) {
		// newHandCard(55,nowPlayer, 1, false, true);
		addHandCard([nowPlayer],nowPlayer,nowPlayer,55,[1],false,false);
	}*/
	addHandCard([nowPlayer],nowPlayer,nowPlayeequmentNameMappingCardInfoId(equmentName).cardID,[1],false,false);
}

function topMonsterCard(number) {
	var monster = null;
	if(number == -1){
		monster = new HuoqilinMonster();
	}else if (number == 0) {
		monster = new YelingMonster();
	} else if (number == 1) {
		monster=new AnxiangMonster();
	} else if (number == 2) {
		monster=new GoumangMonster();
	} else if (number == 3) {
		monster=new DiejingMonster();
	} else if (number == 4) {
		monster=new JiliangyinzheMonster();
	} else if (number == 5) {
		monster=new ChiguiwangMonster();
	} else if (number == 6) {
		monster=new DuniangziMonster();
	} else if (number == 7) {
		monster=new XiejianxianMonster();
	} else if (number == 8) {
		monster=new QianbeibuzuiMonster();
	} else if (number == 9) {
		monster=new WudushouMonster();
	} else if (number == 10) {
		monster=new SheyaonanMonster();
	} else if (number == 11) {
		monster=new ShuimoshouMonster();
	} else if (number == 12) {
		monster=new YanyueMonster();
	} else if (number == 13) {
		monster=new FeifeiMonster();
	} else if (number == 14) {
		monster=new HuyaonvMonster();
	} else if (number == 15) {
		monster=new RongyanshouwangMonster();
	} else if (number == 16) {
		monster=new JinchanguimuMonster();
	} else if (number == 17) {
		monster=new XuanguiMonster();
	} else if (number == 18) {
		monster=new XingtianMonster();
	} else if (number == 19) {
		monster=new TianguihuangMonster();
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
	}
	return monster;
}