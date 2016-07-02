// 初始化30张怪物牌
function initMonsterDeck() {
	var _monsterDeck=[];
	var _npcDeck=[];
	for(var i=20;i<43;i++){
		_npcDeck.push(i);
	}
	_npcDeck.sort(function(){ return 0.5 - Math.random() }) ;
	for(var i=0;i<30;i++){
		if(i<20){
			_monsterDeck.push(i);
		}else{
			_monsterDeck.push(_npcDeck.shift());
		}
		_monsterDeck.sort(function(){ return 0.5 - Math.random() }) ;
	}
	// sp开关开启，加入【火麒麟】
	if(spSwitch){
		_monsterDeck.push(-1);
	}
	_monsterDeck.sort(function(){ return 0.5 - Math.random() }) ;
	return _monsterDeck;
}

function addHandCard(playerList,startPlayer,nowPlayer,cardNumber,countList,isRandom,canUseShanzei,callBack){
	var nowNumber=0;
	var nextNumber=0;
	for(var i=0;i<playerList.length;i++){
		if(playerList[i]._name==nowPlayer._name){
			nowNumber=i;
			break;
		}
	}
	nextNumber=nowNumber+1;
	nextNumber%=playerList.length;
	if(playerList.length>0){
		if(countList[nowNumber]>0){
			// cc.log("come in second");
			if(isRandom){
				cardNumber=randHandCardNumber(
						game_HandCard_Start,
						game_DropHandCard);
			}
			newHandCard(cardNumber, nowPlayer, countList[nowNumber], isRandom,canUseShanzei,function(){
				if(playerList[nextNumber]._name!=startPlayer._name){
					nowPlayer=playerList[nextNumber];
					addHandCard(playerList, startPlayer, nowPlayer, cardNumber, countList, isRandom, canUseShanzei, callBack);
				}else if(callBack!=null){
					callBack();
				}
			});
		}else{
			if(playerList[nextNumber]._name!=startPlayer._name){
				nowPlayer=playerList[nextNumber];
				addHandCard(playerList, startPlayer, nowPlayer, cardNumber, countList, isRandom, canUseShanzei, callBack);
			}else if(callBack!=null){
				callBack();
			}
		}
	}else if(callBack!=null){
		callBack();
	}
}

// 冒险模式：补牌
function advAddHandCard(playerList,startPlayer,nowPlayer,cardNumber,countList,isRandom,canUseShanzei,callBack){
	var nowNumber=0;
	var nextNumber=0;
	for(var i=0;i<playerList.length;i++){
		if(playerList[i]._name==nowPlayer._name){
			nowNumber=i;
			break;
		}
	}
	nextNumber=nowNumber+1;
	nextNumber%=playerList.length;
	if(playerList.length>0){
		if(countList[nowNumber]>0){
			// cc.log("come in second");
			if(isRandom){
				cardNumber=randHandCardNumber(
						game_HandCard_Start,
						game_DropHandCard);
			}
			// cc.log("数字是"+cardNumber);
			advNewHandCard(cardNumber, nowPlayer, countList[nowNumber], isRandom,canUseShanzei,function(){
				if(playerList[nextNumber]._name!=startPlayer._name){
					nowPlayer=playerList[nextNumber];
					advAddHandCard(playerList, startPlayer, nowPlayer, cardNumber, countList, isRandom, canUseShanzei, callBack);
				}else if(callBack!=null){
					callBack();
				}
			});
		}else{
			if(playerList[nextNumber]._name!=startPlayer._name){
				nowPlayer=playerList[nextNumber];
				advAddHandCard(playerList, startPlayer, nowPlayer, cardNumber, countList, isRandom, canUseShanzei, callBack);
			}else if(callBack!=null){
				callBack();
			}
		}
	}else if(callBack!=null){
		callBack();
	}
}



// 随机发手牌
function randHandCardNumber(listA,listB) {
	if (game_HandCard_Start.length == 0 && game_DropHandCard.length != 0) { // 判断现在的手牌堆此时是否为空，如果空，则将弃牌堆的所有牌放入手牌堆，并清空弃牌堆
		for(var i=0;i<game_DropHandCard.length;i++){
			game_HandCard_Start.push(game_DropHandCard[i]);
		}
		game_DropHandCard=new Array();
	}
	var temp = 0;
	// index = parseInt(Math.random()*game_HandCard_Start.length, 10);
	temp = game_HandCard_Start.pop();
	if (game_HandCard_Start.length == 0 && game_DropHandCard.length != 0) { // 判断现在的手牌堆此时是否为空，如果空，则将弃牌堆的所有牌放入手牌堆，并清空弃牌堆
		for(var i=0;i<game_DropHandCard.length;i++){
			game_HandCard_Start.push(game_DropHandCard[i]);
		}
		game_DropHandCard=new Array();
	}
	return temp;
}

function randomGetHandCard(number){
	var handCard=null;
	if (number >= 1 && number <= 8) {
		handCard=new createHandCardImageView(string_handCardNameTianxuanwuyin,
				number,resPng.tianxuanwuyin_png,CARDTYPE.FIGHTCARD,Text.tianxuanwuyinDesc);
	} else if (number >= 9 && number <= 13) {
		handCard=new createHandCardImageView(string_handCardNameJincanwang,
				number,resPng.jincanwang_png,CARDTYPE.FIGHTCARD,Text.jincanwangDesc);
	} else if (number >= 14 && number <= 17) {
		handCard=new createHandCardImageView(string_handCardNameDongmingbaojing,
				number,resPng.dongmingbaojing_png,CARDTYPE.SPECIALCARD, 
				Text.dongmingbaojingDesc);
	} else if (number >= 18 && number <= 21) {
		handCard=new createHandCardImageView(string_handCardNameYingu,
				number,resPng.yingu_png,CARDTYPE.SPECIALCARD, 
				Text.yinguDesc);
	} else if (number >= 22 && number <= 24) {
		handCard=new createHandCardImageView(string_handCardNameShuerguo,
				number,resPng.shuerguo_png,CARDTYPE.SKILLCARD, 
				Text.shuerguoDesc);
	} else if (number >= 25 && number <= 27) {
		handCard=new createHandCardImageView(string_handCardNameLinghuxiandan,
				number,resPng.linghuxiandan_png,CARDTYPE.SPECIALCARD, 
				Text.linghuxiandanDesc);
	} else if (number >= 28 && number <= 30) {
		handCard=new createHandCardImageView(string_handCardNameBingxinjue,
				number,resPng.bingxinjue_png,CARDTYPE.SPECIALCARD, 
				Text.bingxinjueDesc);
	} else if (number >= 31 && number <= 33) {
		handCard=new createHandCardImageView(string_handCardNameTongqianbiao,
				number,resPng.tongqianbiao_png,CARDTYPE.SKILLCARD, 
				Text.tongqianbiaoDesc);
	} else if (number >= 34 && number <= 36) {
		handCard=new createHandCardImageView(string_handCardNameTianleipo,
				number,resPng.tianleipo_png,CARDTYPE.SKILLCARD, 
				Text.tianleipoDesc);
	} else if (number == 37 || number == 38) {
		handCard=new createHandCardImageView(string_handCardNameTiangangzhanqi,
				number,resPng.tiangangzhanqi_png,CARDTYPE.FIGHTCARD, 
				Text.tiangangzhanqiDesc);
	} else if (number == 39 || number == 40) {
		handCard=new createHandCardImageView(string_handCardNameJinchantuoqiao,
				number,resPng.jinchantuoqiao_png,CARDTYPE.FIGHTCARD, 
				Text.jinchantuoqiaoDesc);
	} else if (number == 41 || number == 42) {
		handCard=new createHandCardImageView(string_handCardNameKuicetianji,
				number,resPng.kuicetianji_png,CARDTYPE.SKILLCARD, 
				Text.kuicetianjiDesc);
	} else if (number == 43 || number == 44) {
		handCard=new createHandCardImageView(string_handCardNameToudao,
				number,resPng.toudao_png,CARDTYPE.SKILLCARD, 
				Text.toudaoDesc);
	} else if (number == 45 || number == 46) {
		handCard=new createHandCardImageView(string_handCardNameWuqichaoyuan,
				number,resPng.wuqichaoyuan_png,CARDTYPE.SKILLCARD, 
				Text.wuqichaoyuanDesc);
	} else if (number == 47) {
		handCard=new createHandCardImageView(string_handCardNameMojian,
				number,resPng.mojian_png,CARDTYPE.ARMCARD, 
				Text.mojianDesc);
	} else if (number == 48) {
		handCard=new createHandCardImageView(string_handCardNameCaihuan,
				number,resPng.caihuan_png,CARDTYPE.ARMCARD, 
				Text.caihuanDesc);
	} else if (number == 49) {
		handCard=new createHandCardImageView(string_handCardNameModaotianzha,
				number,resPng.tianzha_png,CARDTYPE.ARMCARD, 
				Text.modaotianzhaDesc);
	} else if (number == 50) {
		handCard=new createHandCardImageView(string_handCardNameTianshezhang,
				number,resPng.tianshezhang_png,CARDTYPE.ARMCARD, 
				Text.tianshezhangDesc);
	} else if (number == 51) {
		handCard=new createHandCardImageView(string_handCardNameWuchenjian,
				number,resPng.wuchenjian_png,CARDTYPE.ARMCARD, 
				Text.wuchenjianDesc);
	} else if (number == 52) {
		handCard=new createHandCardImageView(string_handCardNameTiandijifu,
				number,resPng.tiandijifu_png,CARDTYPE.DEFENSECARD, 
				Text.tiandijifuDesc);
	} else if (number == 53) {
		handCard=new createHandCardImageView(string_handCardNameQiankundaopao,
				number,resPng.qiankundaopao_png,CARDTYPE.DEFENSECARD, 
				Text.qiankundaopaoDesc);
	} else if (number == 54) {
		handCard=new createHandCardImageView(string_handCardNameWucaixiayi,
				number,resPng.wucaixiayi_png,CARDTYPE.DEFENSECARD, 
				Text.wucaixiayiDesc);
	} else if (number == 55) {
		handCard=new createHandCardImageView(string_handCardNameTayunxue,
				number,resPng.tayunxue_png,CARDTYPE.DEFENSECARD, 
				Text.tayunxueDesc);
	} else if (number == 56) {
		handCard=new createHandCardImageView(string_handCardNameLonghunzhankai,
				number,resPng.longhunzhankai_png,CARDTYPE.DEFENSECARD, 
				Text.longhunzhankaiDesc);
	}else if(number==57){
		handCard=new createHandCardImageView(string_handCardNameSoubaoshu,
				number,resPng.soubaoshu_png,CARDTYPE.SKILLCARD, 
				Text.soubaoshuDesc,true);
	}else if(number==58){
		handCard=new createHandCardImageView(string_handCardNameJimushui,
				number,resPng.jimushui_png,CARDTYPE.SKILLCARD, 
				Text.jimushuiDesc,true);
	}else if(number==59){
		handCard=new createHandCardImageView(string_handCardNameTianjian,
				number,resPng.tianjian_png,CARDTYPE.SKILLCARD, 
				Text.tianjianDesc,true);
	}else if(number>59&&number<62){
		handCard=new createHandCardImageView(string_handCardNameJiushen,
				number,resPng.jiushen_png,CARDTYPE.FIGHTCARD, 
				Text.jiushenDesc,true);
	}else if(number==62){
		handCard=new createHandCardImageView(string_handCardNameXiukoujinxinzhou,
				number,resPng.xiukoujinxinzhou_png,CARDTYPE.FIGHTCARD, 
				Text.xiukoujinxinzhouDesc,true);
	}else if(number==63){
		handCard=new createHandCardImageView(string_handCardNameKaoya,
				number,resPng.kaoya_png,CARDTYPE.FIGHTCARD, 
				Text.kaoyaDesc,true);
	}else if(number==64){
		handCard=new createHandCardImageView(string_handCardNameWulingjingxie,
				number,resPng.wulingjingxie_png,CARDTYPE.SPECIALCARD, 
				Text.wulingjingxieDesc,true);
	}else if(number==65){
		handCard=new createHandCardImageView(string_handCardNameTianxiangxuminglu,
				number,resPng.tianxiangxuminglu_png,CARDTYPE.SPECIALCARD, 
				Text.tianxiangxumingluDesc,true);
	}else if(number==66){
		handCard=new createHandCardImageView(string_handCardNameHuanmeihuazhou,
				number,resPng.huanmeihuazhou_png,CARDTYPE.SPECIALCARD, 
				Text.huanmeihuazhouDesc,true);
	}else if(number==67){
		handCard=new createHandCardImageView(string_handCardNameShiziyaoshuo,
				number,resPng.shiziyaoshuo_png,CARDTYPE.ARMCARD, 
				Text.shiziyaoshuoDesc,true);
	}else if(number==68){
		handCard=new createHandCardImageView(string_handCardNameTiangangdouyi,
				number,resPng.tiangangdouyi_png,CARDTYPE.DEFENSECARD, 
				Text.tiangangdouyiDesc,true);
	}
	return handCard;
}
